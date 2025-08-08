import './index.scss';
import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client, Message as StompMessage } from 'stompjs';
import IcImage from '/assets/images/image.svg';
import IcAttachment from '/assets/images/attachment.svg';
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
import IcPdf from '/assets/images/IcPdf.svg';
import IcDoc from '/assets/images/IcDoc.svg';
import IcTxt from '/assets/images/iconPdf.svg'; // Sử dụng icon PDF cho txt tạm thời
import IcXlsx from '/assets/images/iconPdf.svg'; // Sử dụng icon PDF cho xlsx tạm thời

interface ChatUser {
  id: number;
  username: string;
  roomId: string;
  tourName: string;
  tourId: number;
  withUserFullName: string;
  withUsername?: string;
  lastMessage: string;
  image?: string;
  isRead: boolean;
  lastSenderId: string | number;
}

interface Message {
  id: number;
  roomId: number;
  senderId: number;
  senderName: string;
  message: string;
  sentTime: string;
  isRead: boolean;
  tourId: number | null;
  type: number;
  fileName?: string; // Thêm fileName để lưu tên file
}

const ChatList: React.FC = () => {
  const token = localStorage.getItem("authToken");
  const { userData } = useAuth();
  console.log('userData', userData);

  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const pageIndex = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("size") || "20", 10);

  const adminId = userData?.info?.id || userData?.id || '';
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const wsUrl = `${baseUrl.replace(/\/$/, '')}/ws/chat`;

  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const stompClientRef = useRef<Client | null>(null);
  const currentSubscriptionRef = useRef<any>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  // Xóa previewMap vì không cần thiết nữa
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!adminId) {
      return;
    }
    setLoading(true)
    const socket = new SockJS(wsUrl);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, async () => {
      await fetchUsers();
      await loadFirstUser();
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

  // Xóa useEffect loadImagePreviews vì không cần thiết nữa - ảnh sẽ hiển thị trực tiếp từ URL


  const subscribeToUserQueue = (roomId: string) => {
    if (!stompClientRef.current || !stompClientRef.current.connected) {
      return;
    }

    if (currentSubscriptionRef.current) {
      currentSubscriptionRef.current.unsubscribe();
    }

    const sub = stompClientRef.current.subscribe(`/topic/room/${roomId}`, (msg: StompMessage) => {
      const body = JSON.parse(msg.body);
      const newMessage: Message = {
        id: body.id || Date.now(),
        roomId: parseInt(roomId),
        senderId: parseInt(body.senderId),
        senderName: body.senderName || 'ADMIN',
        message: body.message,
        sentTime: body.sentTime || new Date().toISOString(),
        isRead: false,
        tourId: body.tourId || null,
        type: body.type || 0,
        fileName: body.fileName || undefined // Lưu fileName từ WebSocket
      };
      setMessages(prev => [...prev, newMessage]);
      // Không gọi fetchUsers() ở đây để tránh vòng lặp vô hạn
      scrollToBottom();
    });

    currentSubscriptionRef.current = sub;
  };

  const fetchUsers = async () => {
    try {
      const data = await getSummaryUser(adminId);
      setUsers(data);
    } catch (e) {
      console.error('Error fetching users:', e);
    } finally {
      setLoading(false)
    }
  };

  const loadFirstUser = async () => {
    try {
      const data = await getSummaryUser(adminId);
      setUsers(data);
      if (data.length > 0) {
        handleSelectUser(data[0]);
      }
    } catch (e) {
      console.error('Error fetching users:', e);
    } finally {
      setLoading(false)
    }
  };

  const loadUsersWithSearch = async (value: string) => {
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
        page: "0",
        size: "100",
        role: userData?.info?.role
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
          role: userData?.info?.role
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
      const query = new URLSearchParams({
        senderId: adminId,
        receiverId: user.id,
        preOrder: "1"
      });
      const roomData = await createRoomSenderReceiver(query.toString());
      await fetchUsers();

      // Tạo user object để select
      const newUser = {
        id: user.id,
        username: user.username || user.fullName,
        roomId: roomData.id,
        tourId: roomData?.tourId,
        tourName: roomData?.tourName,
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
      console.error('Error loading messages:', e);
    }
  };

  const handleMarkRead = async (roomId: string) => {
    try {
      await putMarkRead(roomId);
      fetchUsers();
    } catch (e) {
      console.error('Error marking read:', e);
    }
  };

  const handleSelectUser = async (user: any) => {
    setSelectedUser(user);
    setSelectedUserId(user.roomId);
    await handleMarkRead(user.roomId);
    await loadMessages(user.roomId);
    subscribeToUserQueue(user.roomId);
  };

  const sendMessage = () => {
    const trimmed = messageContent.trim();

    if (!trimmed || !selectedUserId || !selectedUser || !adminId || !stompClientRef.current?.connected) {
      return;
    }

    const payload = {
      roomId: selectedUser.roomId.toString(),
      message: trimmed,
      senderId: adminId.toString(),
      type: 0 // 0 = message, 1 = file
    };

    try {
      stompClientRef.current.send("/app/chat.sendMessage", {}, JSON.stringify(payload));
      setMessageContent('');
      scrollToBottom();
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
    }
  };

  const sendMessageWithType = (type: number) => {
    const trimmed = messageContent.trim();

    if (!trimmed || !selectedUserId || !selectedUser || !adminId || !stompClientRef.current?.connected) {
      return;
    }

    const payload = {
      roomId: selectedUser.roomId.toString(),
      message: trimmed,
      senderId: adminId.toString(),
      type: type // 0 = message, 1 = file
    };

    stompClientRef.current.send("/app/chat.sendMessage", {}, JSON.stringify(payload));
    setMessageContent('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const c = document.querySelector('.messages');
      if (c) {
        c.scrollTop = c.scrollHeight;
      }
    }, 0);
  };

  const handleFileView = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tải file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Tạo iframe để xem file (chỉ hoạt động với PDF)
      if (fileName.toLowerCase().endsWith('.pdf')) {
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.width = '100%';
        iframe.style.height = '600px';
        iframe.style.border = 'none';

        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head><title>${fileName}</title></head>
              <body style="margin:0;padding:0;">
                <iframe src="${url}" width="100%" height="100%" style="border:none;"></iframe>
              </body>
            </html>
          `);
          newWindow.document.close();
        }
      } else {
        // Với file khác, tải về luôn
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Lỗi khi xem file:', error);
      alert('Không thể xem file này. Vui lòng tải về để xem.');
    }
  };

  const handleFileDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tải file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Lỗi khi tải file:', error);
      alert('Không thể tải file. Vui lòng thử lại.');
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().split('.').pop();
    switch (extension) {
      case 'pdf':
      case 'pptx':
        return IcPdf;
      case 'doc':
      case 'docx':
        return IcDoc;
      case 'txt':
        return IcTxt;
      case 'xlsx':
      case 'xls':
        return IcXlsx;
      default:
        return IcDoc; // Default icon
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append('files', file);

    try {
      const res = await fetch(`${baseUrl}/file/push`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });
      const text = await res.text();
      const json = JSON.parse(text);
      if (json[0]) {
        const imageUrl = `${baseUrl}/file/download-file-all-type?fileKey=${json[0]}`;
        // Gửi tin nhắn với type = 1 cho file và truyền fileName
        const payload = {
          roomId: selectedUser?.roomId.toString(),
          message: imageUrl,
          senderId: adminId.toString(),
          fileName: file.name, // Truyền tên file khi upload
          type: 1 // 1 = file
        };

        if (stompClientRef.current?.connected && selectedUser) {
          stompClientRef.current.send("/app/chat.sendMessage", {}, JSON.stringify(payload));
          scrollToBottom();
        }
      }
    } catch (err) {
      console.error('Error uploading file:', err);
    }

    // Reset file input để có thể upload cùng file nhiều lần
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    if (documentInputRef.current) {
      documentInputRef.current.value = '';
    }
  };

  // Xóa fetchImagePreview vì không cần thiết nữa

  return (
    <div className='container mx-auto'>
      <div className="chat-container">
        <div className="sidebar">
          <div className="relative">
            <Input
              size="large"
              placeholder="Tìm kiếm tin nhắn"
              value={searchTerm}
              onChange={e => loadUsersWithSearch(e.target.value)}
              prefix={<SearchNormal color='#8F9499' />}
              className='!rounded-full mb-4'
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
                      key={u.roomId}
                      onClick={() => handleSelectUser(u)}
                      className={selectedUserId === u.roomId ? 'selected' : ''}
                    >
                      <div className="user-item">
                        <img src={u.avatar || IcNotAvatar} alt="" className="user-image" />
                        <div>
                          <div className={`{!u.isRead ? 'user-name' : 'user-name-read'} font-[500]`}>
                            {u.withUserFullName || u.withUsername || 'Khách hàng ẩn danh'}
                          </div>
                          <div className='user-tour-name'>
                            {u.tourName ? u.tourName : ''}
                          </div>
                          <div className={`${!u.isRead ? 'user-message' : 'user-message-read'} text-[14px]`}>
                            {u.lastMessage && (u.lastSenderId == adminId) ? `Bạn: ${u.lastMessage}` : u.lastMessage}
                          </div>
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
              <div>
                <div className="user-name">
                  {selectedUser?.withUserFullName || selectedUser?.withUsername || 'Không có người chọn'}
                </div>
                <div className='user-tour-name !max-w-[44vw] !text-[#767A7F]'>{selectedUser?.tourName || selectedUser?.tourName || ''}</div>
              </div>
            </div>
          </div>

          <div className="messages">
            {messages.map((m, i) => (
              <div key={m.id || i} className={m.senderId.toString() === adminId.toString() ? 'admin-msg' : 'user-msg'}>
                {m.type === 1 || m.message.includes(`${baseUrl}/file/download-file-all-type?fileKey`) ? (
                  <div>
                    {/* Kiểm tra nếu là file (không phải ảnh) */}
                    {m.fileName && !m.fileName.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i) ? (
                      <div className="file-message">
                        <div
                          className="file-content cursor-pointer"
                          onClick={() => handleFileDownload(m.message, m.fileName)}
                        >
                          <img src={getFileIcon(m.fileName)} alt="File" className="file-icon" />
                          <span className="file-name">{m.fileName}</span>
                        </div>
                      </div>
                    ) : (
                      /* Nếu là ảnh */
                      <Image
                        width={200}
                        src={m.message}
                        alt="Chat image"
                        style={{ maxWidth: '200px', borderRadius: '8px' }}
                      />
                    )}
                  </div>
                ) : (
                  <div className={m.senderId.toString() === adminId.toString() ? 'admin-msg-content' : 'user-msg-content'}>
                    <span>{m.message}</span>
                  </div>
                )}
              </div>
            ))}
          </div>


          <div className="message-input-container">
            <div className='flex item-center gap-4 mt-3 ml-3'>
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <div onClick={() => imageInputRef.current?.click()} className="option-message cursor-pointer">
                <img alt="Upload Image" src={IcImage} />
              </div>
              <input
                type="file"
                ref={documentInputRef}
                onChange={handleImageChange}
                accept=".pdf,.doc,.docx,.txt,.xlsx,.xls,.pptx,.ppt"
                style={{ display: 'none' }}
              />
              <div onClick={() => documentInputRef.current?.click()} className="option-message cursor-pointer">
                <img alt="Upload Document" src={IcAttachment} />
              </div>
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                onKeyUp={(e) => (e.key === 'Enter' ? sendMessage() : null)}
              />
              <div onClick={sendMessage} className="send-message bg-[#BB2C26] p-3 rounded-[8px] cursor-pointer">
                <Send2 color='#fff' variant="Bold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
