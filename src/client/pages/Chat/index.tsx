import './index.scss';
import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client, Message as StompMessage } from 'stompjs';
import IcImage from '/assets/images/image.svg';
import IcNotAvatar from '/assets/images/not-avatar.svg';
import { SearchNormal, Send2 } from 'iconsax-react';
import { useSearchParams } from 'react-router-dom';
import { Input, Image, Tabs } from 'antd';
import { useAuth } from "@/admin/components/AuthProvider";
import {
  getSummaryUser,
  putMarkRead,
  getChatRoomHistory
} from '@/client/apis/chat';

interface ChatUser {
  id: number;
  username: string;
  roomId: string;
  withUserFullName: string;
  lastMessage: string;
  image?: string;
  isRead: boolean;
  lastSenderId: string | number;
}

interface Message {
  senderId: string;
  message: string;
}

const ChatList: React.FC = () => {
  const token = localStorage.getItem("authToken");
  const { userData } = useAuth();
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const pageIndex = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("size") || "20", 10);

  const adminId = userData?.info?.id || '';
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const wsUrl = `${baseUrl.replace(/\/$/, '')}/ws/chat`;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const stompClientRef = useRef<Client | null>(null);
  const currentSubscriptionRef = useRef<any>(null);
  const [previewMap, setPreviewMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!adminId) return;

    const socket = new SockJS(wsUrl);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, async () => {
      await fetchUsers();
    }, (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect(() => {
          console.log('WebSocket disconnected');
        });
      }
    };
  }, [adminId]);

  useEffect(() => {
    const loadImagePreviews = async () => {
      const newMap: Record<string, string> = {};

      for (const m of messages) {
        if (
          m.message.includes(`${baseUrl}/file/download-file?fileKey`) &&
          !previewMap[m.message]
        ) {
          const url = await fetchImagePreview(m.message);
          newMap[m.message] = url;
        }
      }

      if (Object.keys(newMap).length > 0) {
        setPreviewMap(prev => ({ ...prev, ...newMap }));
      }
    };

    loadImagePreviews();
  }, [messages]);


  const subscribeToUserQueue = (roomId: string) => {
    if (!stompClientRef.current || !stompClientRef.current.connected) return;

    if (currentSubscriptionRef.current) {
      currentSubscriptionRef.current.unsubscribe();
    }

    const sub = stompClientRef.current.subscribe(`/topic/room/${roomId}`, (msg: StompMessage) => {
      const body = JSON.parse(msg.body);
      setMessages(prev => [...prev, { senderId: body.senderId, message: body.message }]);
      fetchUsers();
      scrollToBottom();
    });


    currentSubscriptionRef.current = sub;
  };

  const fetchUsers = async () => {
    try {
      const data = await getSummaryUser(adminId);
      setUsers(data);
      if (data.length && isFirstLoad) {
        handleSelectUser(data[0]);
        setIsFirstLoad(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loadMessages = async (roomId: string) => {
    try {
      const query: any = new URLSearchParams({
        page: (pageIndex - 1).toString(),
        size: pageSize.toString(),
        roomId: roomId.toString()
      });
      const resp = await getChatRoomHistory(query);
      setMessages(resp.content.reverse());
      scrollToBottom();
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkRead = async (roomId: string) => {
    try {
      await putMarkRead(roomId);
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectUser = async (user: ChatUser) => {
    setSelectedUser(user);
    setSelectedUserId(user.roomId);
    if (!user.isRead) await handleMarkRead(user.roomId);
    await loadMessages(user.roomId);
    subscribeToUserQueue(user.roomId);
  };

  const sendMessage = () => {
    const trimmed = messageContent.trim();
    if (!trimmed || !selectedUserId || !selectedUser || !stompClientRef.current?.connected) return;

    const payload = {
      roomId: selectedUser.roomId,
      message: trimmed,
      senderId: adminId
    };

    stompClientRef.current.send("/app/chat.sendMessage", {}, JSON.stringify(payload));
    // setMessages(prev => [...prev, { senderId: adminId, message: trimmed }]);
    setMessageContent('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const c = document.querySelector('.messages');
      if (c) c.scrollTop = c.scrollHeight;
    }, 0);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetch(`${baseUrl}/file/push-file`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });
      const text = await res.text();
      const json = JSON.parse(text);
      console.log('json', json);
      if (json) {
        setMessageContent(json?.fileUrl);
        sendMessage();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchImagePreview = async (messageUrl: string) => {
    try {
      const urlObj = new URL(messageUrl);
      const rawKey = urlObj.searchParams.get('fileKey') || '';

      // Nếu rawKey lại là 1 URL → tiếp tục tách lần 2
      const actualKey: any = rawKey.startsWith('http')
        ? new URL(rawKey).searchParams.get('fileKey') || ''
        : rawKey;

      if (!actualKey) throw new Error('Không tìm thấy fileKey hợp lệ');

      // const blob = await getFileImage(actualKey);
      return URL.createObjectURL(actualKey);
    } catch (error) {
      console.error("Lỗi khi xử lý ảnh xem trước:", error);
      return ''; // fallback ảnh trống
    }
  };

  return (
    <div className="chat-container container mx-auto">
      <div className="sidebar">
        <Tabs
          className="half-width-tabs"
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as 'all' | 'unread')}
          items={[
            {
              key: 'all',
              label: 'Tất cả',
            },
            {
              key: 'unread',
              label: 'Chưa đọc',
            },
          ]}
        />
        <Input
          size="large"
          placeholder="Tìm kiếm tin nhắn"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          prefix={<SearchNormal color='#8F9499' />}
        />
        <ul className="user-list mt-5">
          {users
            .filter(u => activeTab === 'all' || !u.isRead)
            .map(u => (
              <li
                key={u.roomId}
                onClick={() => handleSelectUser(u)}
                className={selectedUserId === u.roomId ? 'selected' : ''}
              >
                <div className="user-item">
                  <img src={u.image || IcNotAvatar} alt="" className="user-image" />
                  <div>
                    <div className={!u.isRead ? 'user-name' : 'user-name-read'}>
                      {u.withUserFullName || 'Khách hàng ẩn danh'}
                    </div>
                    <div className={!u.isRead ? 'user-message' : 'user-message-read'}>
                      {u.lastMessage && (u.lastSenderId == adminId) ? `Bạn: ${u.lastMessage}` : u.lastMessage}
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="chat">
        <div className="chat-header">
          <div className="user-info">
            <img src={selectedUser?.image || IcNotAvatar} alt="" className="user-image" />
            <div className="user-name">
              {selectedUser?.withUserFullName || 'Không có người chọn'}
            </div>
          </div>
        </div>

        <div className="messages">
          {messages.map((m, i) => (
            <div key={i} className={m.senderId === adminId ? 'admin-msg' : 'user-msg'}>
              {m.message.includes(`${baseUrl}/file/download-file?fileKey`) ? (
                previewMap[m.message] ? (
                  <Image width={200} src={previewMap[m.message]} />
                ) : (
                  <span>Đang tải ảnh...</span>
                )
              ) : (
                <div className={m.senderId === adminId ? 'admin-msg-content' : 'user-msg-content'}>
                  <span>{m.message}</span>
                </div>
              )}
            </div>
          ))}
        </div>


        <div className="message-input-container">
          <div className="message-input">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              onKeyUp={(e) => (e.key === 'Enter' ? sendMessage() : null)}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <div onClick={() => fileInputRef.current?.click()} className="option-message">
              <img alt="Upload Image" src={IcImage} />
            </div>
            <div onClick={sendMessage} className="send-message bg-[#BB2C26] p-3 rounded-[8px] cursor-pointer">
              <Send2 color='#fff' variant="Bold" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
