import './index.scss';
import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client, Message as StompMessage } from 'stompjs';
import IcImage from '/assets/images/image.svg';
import IcNotAvatar from '/assets/images/not-avatar.svg';
import { SearchNormal, Send2 } from 'iconsax-react';
import { useSearchParams } from 'react-router-dom';
import { Input, Image, Spin } from 'antd';
import { useAuth } from "@/admin/components/AuthProvider";
import { LoadingOutlined } from "@ant-design/icons"
import {
  getUserChat,
  getUserChatSearch,
  getSummaryUser,
  putMarkRead,
  getChatRoomHistory,
  createRoomSenderReceiver
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
  const [users, setUsers] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
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
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const [previewMap, setPreviewMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!adminId) return;
    setLoading(true)
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

  // Xử lý đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    const query: any = new URLSearchParams({
      page: (pageIndex - 1).toString(),
      size: pageSize.toString(),
      role: "ROLE_EMPLOYEE"
    });
    try {
      const data = await getUserChat(query);
      setUsers(data.data);
      if (data.data.length && isFirstLoad) {
        handleSelectUser(data.data[0]);
        setIsFirstLoad(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false)
    }
  };

  const handleSearch = async (value: string) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setIsSearching(true);
    try {
      const query = new URLSearchParams({
        search: value.trim(),
        role: "ROLE_EMPLOYEE"
      });

      const data = await getUserChatSearch(query.toString());
      setSearchResults(data.data || []);
      setShowSearchDropdown(true);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      // Fallback về getUserChat nếu search thất bại
      try {
        const query = new URLSearchParams({
          page: "0",
          size: "20",
          role: "ROLE_EMPLOYEE"
        });
        const data = await getUserChat(query.toString());
        setSearchResults(data.data || []);
        setShowSearchDropdown(true);
      } catch (fallbackError) {
        console.error('Lỗi fallback:', fallbackError);
        setSearchResults([]);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchUser = async (user: any) => {
    try {
      // Tạo room mới với user được chọn
      const roomData = await createRoomSenderReceiver(adminId, user.id);
      console.log('Room created:', roomData);

      // Cập nhật danh sách users và chọn user mới
      await fetchUsers();

      // Tạo user object để select
      const newUser = {
        id: user.id,
        username: user.username || user.fullName,
        roomId: roomData.id,
        withUserFullName: user.fullName || user.username,
        lastMessage: "",
        image: user.avatar,
        isRead: true,
        lastSenderId: ""
      };

      setSelectedUser(newUser);
      setSelectedUserId(newUser.id.toString());
      await loadMessages(newUser.roomId);
      subscribeToUserQueue(newUser.roomId);

      // Đóng dropdown và reset search
      setShowSearchDropdown(false);
      setSearchTerm('');
      setSearchResults([]);
    } catch (error) {
      console.error('Lỗi khi tạo room:', error);
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

  const handleSelectUser = async (user: any) => {
    setSelectedUser(user);
    setSelectedUserId(user.id.toString());
    if (!user.isRead) await handleMarkRead(user.id);
    await loadMessages(user.id);
    subscribeToUserQueue(user.id);
  };

  const sendMessage = () => {
    const trimmed = messageContent.trim();
    if (!trimmed || !selectedUserId || !selectedUser || !stompClientRef.current?.connected) return;

    const payload = {
      roomId: selectedUser.roomId,
      message: trimmed,
      senderId: adminId,
      type: 0 // 0 = message, 1 = file
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
        <div className="relative">
          <Input
            size="large"
            placeholder="Tìm kiếm tin nhắn"
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            prefix={<SearchNormal color='#8F9499' />}
            className='!rounded-full'
          />
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto" ref={searchDropdownRef}>
              {isSearching ? (
                <div className="p-3 text-center text-gray-500">Đang tìm kiếm...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <div
                    key={user.id}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSelectSearchUser(user)}
                  >
                    <div className="flex items-center">
                      <img
                        src={user.avatar || IcNotAvatar}
                        alt=""
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium text-sm">
                          {user.fullName || user.username || 'Khách hàng ẩn danh'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email || user.phone || ''}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500">Không tìm thấy kết quả</div>
              )}
            </div>
          )}
        </div>
        {
          loading ?
            <div className="flex items-center justify-center mt-8">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 50, color: "#BB2C26" }} spin />} size="large" />
            </div>
            :
            <ul className="user-list mt-5">
              {users
                // .filter(u => activeTab === 'all' || !u.isRead)
                .map(u => (
                  <li
                    key={u.id}
                    onClick={() => handleSelectUser(u)}
                    className={selectedUserId === u.id ? 'selected' : ''}
                  >
                    <div className="user-item">
                      <img src={u.avatar || IcNotAvatar} alt="" className="user-image" />
                      <div>
                        <div className={!u.isRead ? 'user-name' : 'user-name-read'}>
                          {u.username || 'Khách hàng ẩn danh'}
                        </div>
                        {/* <div className={!u.isRead ? 'user-message' : 'user-message-read'}>
                      {u.lastMessage && (u.lastSenderId == adminId) ? `Bạn: ${u.lastMessage}` : u.lastMessage}
                    </div> */}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
        }
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
