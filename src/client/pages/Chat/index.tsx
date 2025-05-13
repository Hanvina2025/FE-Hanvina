import './index.scss'
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import IcSend from '/assets/images/send.svg';
import IcImage from '/assets/images/image.svg';
import IcNotAvatar from '/assets/images/not-avatar.svg';
import { SearchNormal } from 'iconsax-react';
import { Input } from 'antd';

const ChatList = () => {
  const [messageContent, setMessageContent] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const adminId = '665c9a15b8c096001278347a';
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const socket = useRef(io(baseUrl)).current;

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('id_token');
      if (!token) {
        console.error('No token provided!');
        return;
      }
      const searchQuery = searchTerm ? `&search=${searchTerm}` : '';
      try {
        const response = await fetch(`${baseUrl}/api/chat/users/all-user-inbox?page=1&limit=20${searchQuery}`, {
          method: 'GET',
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setUsers(data.data);
        if (data.data.length > 0 && isFirstLoad) {
          setSelectedUserId(data.data[0].id);
          selectUser(data.data[0]);
          setIsFirstLoad(false);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
    socket.emit('register', { userId: adminId });

    socket.on('receive_message', (msg) => {
      if (msg.sender === selectedUserId || msg.receiver === selectedUserId) {
        setMessages((prevMessages) => [...prevMessages, { senderId: msg.sender, content: msg.content }]);
      }
      fetchUsers();
    });

  }, [baseUrl, searchTerm, selectedUserId, isFirstLoad]);

  // Fetch messages when user is selected
  useEffect(() => {
    if (!selectedUserId) return;
    const loadMessages = async () => {
      const response = await fetch(`${baseUrl}/api/chat/messages?senderId=${adminId}&receiverId=${selectedUserId}`);
      const data = await response.json();
      setMessages(data);
      scrollToBottom();
    };
    loadMessages();
  }, [selectedUserId, baseUrl]);

  const selectUser = (user) => {
    setSelectedUser(user);
    setSelectedUserId(user.id);
    getUserDetail(user.id);
    getUserOrder(user.id);
  };

  const getUserDetail = async (userId) => {
    const response = await fetch(`${baseUrl}/api/user/details/${userId}`);
    const data = await response.json();
    setSelectedUser(data);
  };

  const getUserOrder = async (userId) => {
    const token = localStorage.getItem('id_token');
    if (!token) {
      console.error('No token provided!');
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/orders/order-history-chat?userId=${userId}`, {
        method: 'GET',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setOrderHistory(data?.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const sendMessage = () => {
    if (!messageContent.trim()) return;
    socket.emit('send_message', {
      from: adminId,
      to: selectedUserId,
      content: messageContent,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId: adminId, content: messageContent },
    ]);
    setMessageContent('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const messagesContainer = document.querySelector('.messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } else {
        console.error('Messages container not found');
      }
    }, 100);
  };

  const handleImageChange = async (event) => {
    const userImgFile = event.target.files[0]; // Get the selected image file
    if (!userImgFile) return;
    const formDataUpload = new FormData();
    formDataUpload.append('file', userImgFile);
    try {
      const uploadResp = await fetch('/upload', { method: 'POST', body: formDataUpload });
      const uploadData = await uploadResp.json();
      setMessageContent(uploadData.s3Location);
      if (messageContent.trim() !== '') {
        sendMessage();
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const triggerImageUpload = () => {
    document.querySelector('input[type="file"]').click();
  };

  return (
    <div className='container mx-auto mb-[125px]'>
      <div className="chat-container">
        <div className="sidebar">
          <div className="form-search-user">
            <Input
              size='large'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm tin nhắn"
              prefix={<SearchNormal color='#8F9499'/>}
            />
          </div>
          <ul className="user-list">
            {users.filter(user => (activeTab === 'unread' ? user.read === false : true)).map((user) => (
              <li
                key={user.id}
                onClick={() => selectUser(user)}
                className={selectedUserId === user.id ? 'selected' : ''}
              >
                <div className="user-item">
                  <img alt="User Avatar" src={IcNotAvatar} className="user-image" />
                  <div>
                    <div className="user-name">
                      {user.username ? user.username : 'Khách hàng ẩn danh'}
                    </div>
                    <div className="user-message">
                      {user.lastMessage ? `Bạn: ${user.lastMessage}` : ''}
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
              <img
                src={selectedUser && selectedUser.image ? selectedUser.image : IcNotAvatar}
                alt="User Avatar"
                className="user-image"
              />
              <div className="user-name">
                {selectedUser ? selectedUser.username : 'Khách hàng ẩn danh'}
              </div>
            </div>
            {/* <div className="dot">
              <i className="bi bi-three-dots"></i>
            </div> */}
          </div>
          <div className="messages">
            {messages.map((msg) => (
              <div key={msg.id} className={msg.senderId === adminId ? 'admin-msg' : 'user-msg'}>
                <div>{msg.content}</div>
              </div>
            ))}
          </div>
          <div className="message-input-container">
            <div className='message-input'>
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                onKeyUp={(e) => (e.key === 'Enter' ? sendMessage() : null)}
              />
              <input
                type="file"
                ref={(el) => (el && (el.style.display = 'none'))}
                onChange={handleImageChange}
              />
              <div onClick={triggerImageUpload} className="option-message">
                <img alt="Upload Image" src={IcImage} />
              </div>
              <div onClick={sendMessage} className="send-message">
                <img alt="Send" src={IcSend} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
