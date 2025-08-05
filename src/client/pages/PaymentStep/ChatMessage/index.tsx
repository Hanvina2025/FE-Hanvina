import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import SockJS from 'sockjs-client';
import Stomp, { Client, Message as StompMessage } from 'stompjs';
import "./index.scss";
import IcImage from "/assets/images/image.svg";
import { Send2, ArrowUp2, Message, ArrowDown2 } from 'iconsax-react';
import { useAuth } from "@/admin/components/AuthProvider";
import { Image } from "antd";
import { useSearchParams } from 'react-router-dom';
import {
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
}

const Chatbot = ({ preOrder }) => {
	const token = localStorage.getItem("authToken");
	const { userData } = useAuth();
	const [searchParams] = useSearchParams();
	const [users, setUsers] = useState<any>([]);
	const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
	const [selectedUserId, setSelectedUserId] = useState<string>('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [messageContent, setMessageContent] = useState('');
	const [isChatOpen, setIsChatOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const adminId = userData?.info?.id || userData?.id || '';
	const baseUrl = import.meta.env.VITE_API_BASE_URL;
	const wsUrl = `${baseUrl.replace(/\/$/, '')}/ws/chat`;

	const fileInputRef = useRef<HTMLInputElement>(null);
	const stompClientRef = useRef<Client | null>(null);
	const currentSubscriptionRef = useRef<any>(null);

	// Memoize các giá trị để tránh re-render không cần thiết
	const memoizedAdminId = useMemo(() => adminId, [adminId]);
	const memoizedBaseUrl = useMemo(() => baseUrl, [baseUrl]);

	useEffect(() => {
		if (!memoizedAdminId) {
			return;
		}
		setIsLoading(true)
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
	}, [memoizedAdminId]);

	const subscribeToUserQueue = useCallback((roomId: string) => {
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
				type: body.type || 0
			};
			setMessages(prev => [...prev, newMessage]);
			scrollToBottom();
		});

		currentSubscriptionRef.current = sub;
	}, []);

	const fetchUsers = useCallback(async () => {
		try {
			const data = await getSummaryUser(memoizedAdminId);
			setUsers(data);
		} catch (e) {
			console.error('Error fetching users:', e);
		} finally {
			setIsLoading(false)
		}
	}, [memoizedAdminId]);

	const loadFirstUser = useCallback(async () => {
		try {
			const data = await getSummaryUser(memoizedAdminId);
			setUsers(data);
			if (data.length > 0) {
				handleSelectUser(data[0]);
			}
		} catch (e) {
			console.error('Error fetching users:', e);
		} finally {
			setIsLoading(false)
		}
	}, [memoizedAdminId]);

	const handleSelectSearchUser = useCallback(async (preOrderId: any, preOrder: any) => {
		try {
			const query = new URLSearchParams({
				senderId: memoizedAdminId,
				receiverId: preOrder?.tourInformation?.saleId,
				preOrder: preOrderId
			});
			const roomData = await createRoomSenderReceiver(query.toString());
			await fetchUsers();

			const newUser = {
				id: preOrder?.id || Date.now(),
				username: preOrder?.tourInformation?.saleName || 'Sale',
				roomId: roomData.id,
				withUserFullName: preOrder?.tourInformation?.saleName || 'Sale',
				lastMessage: "",
				image: null,
				isRead: true,
				lastSenderId: ""
			};

			setSelectedUser(newUser);
			setSelectedUserId(newUser.roomId);
			await loadMessages(newUser.roomId);
			subscribeToUserQueue(newUser.roomId);
		} catch (error) {
			console.error('Lỗi khi tạo room:', error);
		}
	}, [memoizedAdminId, fetchUsers, subscribeToUserQueue]);

	const loadMessages = useCallback(async (roomId: string) => {
		try {
			const query: any = new URLSearchParams({
				page: "0",
				size: "20",
				roomId: roomId.toString()
			});
			const resp = await getChatRoomHistory(query);
			setMessages(resp.content.reverse());
			scrollToBottom();
		} catch (e) {
			console.error('Error loading messages:', e);
		}
	}, []);

	const handleMarkRead = useCallback(async (roomId: string) => {
		try {
			await putMarkRead(roomId);
			fetchUsers();
		} catch (e) {
			console.error('Error marking read:', e);
		}
	}, [fetchUsers]);

	const handleSelectUser = useCallback(async (user: any) => {
		setSelectedUser(user);
		setSelectedUserId(user.roomId);
		await handleMarkRead(user.roomId);
		await loadMessages(user.roomId);
		subscribeToUserQueue(user.roomId);
	}, [handleMarkRead, loadMessages, subscribeToUserQueue]);

	const sendMessage = useCallback(() => {
		const trimmed = messageContent.trim();

		if (!trimmed || !selectedUserId || !selectedUser || !memoizedAdminId || !stompClientRef.current?.connected) {
			return;
		}

		const payload = {
			roomId: selectedUser.roomId.toString(),
			message: trimmed,
			senderId: memoizedAdminId.toString(),
			type: 0
		};

		try {
			stompClientRef.current.send("/app/chat.sendMessage", {}, JSON.stringify(payload));
			setMessageContent('');
			scrollToBottom();
		} catch (error) {
			console.error('Lỗi khi gửi tin nhắn:', error);
		}
	}, [messageContent, selectedUserId, selectedUser, memoizedAdminId]);

	const scrollToBottom = useCallback(() => {
		setTimeout(() => {
			const c = document.querySelector('.messages');
			if (c) {
				c.scrollTop = c.scrollHeight;
			}
		}, 0);
	}, []);

	const handleImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const fd = new FormData();
		fd.append('files', file);

		try {
			const res = await fetch(`${memoizedBaseUrl}/file/push`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: fd,
			});
			const text = await res.text();
			const json = JSON.parse(text);
			if (json[0]) {
				const imageUrl = `${memoizedBaseUrl}/file/download-file?fileKey=${json[0]}`;
				const payload = {
					roomId: selectedUser?.roomId.toString(),
					message: imageUrl,
					senderId: memoizedAdminId.toString(),
					type: 1
				};

				if (stompClientRef.current?.connected && selectedUser) {
					stompClientRef.current.send("/app/chat.sendMessage", {}, JSON.stringify(payload));
					scrollToBottom();
				}
			}
		} catch (err) {
			console.error('Error uploading file:', err);
		}

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}, [memoizedBaseUrl, token, selectedUser, memoizedAdminId, scrollToBottom]);

	const handleOpenChat = useCallback(() => {
		setIsChatOpen(true);
		handleSelectSearchUser(preOrder?.id, preOrder)
	}, [handleSelectSearchUser, preOrder]);

	const handleCloseChat = useCallback(() => {
		setIsChatOpen(false);
	}, []);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setMessageContent(e.target.value);
	}, []);

	const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	}, [sendMessage]);

	const handleFileClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	// Memoize các component để tránh re-render
	const ChatButton = useMemo(() => (
		<div className="chat-button-container">
			<button
				className="chat-button flex justify-between items-center"
				onClick={handleOpenChat}
			>
				<div className="flex items-center gap-2">
					<div className="flex items-center justify-center w-[31px] h-[31px] bg-[#ffebea66] rounded-full">
						<Message variant="Bold" size={15} />
					</div>
					<span className="chat-text text-[16px]">Chat với sale phụ trách</span>
				</div>
				<ArrowUp2 color="#fff" />
			</button>
		</div>
	), [handleOpenChat]);

	const ChatInterface = useMemo(() => (
		<div className="chat-message">
			<div className="chat-message-header flex justify-between items-center">
				<div className="flex items-center gap-2 text-[16px] font-semibold">
					<div className="flex items-center justify-center w-[31px] h-[31px] bg-[#ffebea66] rounded-full">
						<Message variant="Bold" size={15} />
					</div>
					Chat với sale phụ trách
				</div>
				<div className="cursor-pointer pt-1" onClick={handleCloseChat}>
					<ArrowDown2 style={{ fontSize: '20px' }} />
				</div>
			</div>
			<div className="chat-history h-[655px]">
				<div className="messages">
					{isLoading && (
						<div className="loading-messages">
							<div className="loading-dots">
								<div className="dot"></div>
								<div className="dot"></div>
								<div className="dot"></div>
							</div>
							<span>Đang tải tin nhắn...</span>
						</div>
					)}
					<div className="messages">
						{messages.map((m, i) => (
							<div key={m.id || i} className={m.senderId.toString() === memoizedAdminId.toString() ? 'admin-msg' : 'user-msg'}>
								{m.type === 1 || m.message.includes(`${memoizedBaseUrl}/file/download-file?fileKey`) ? (
									<div>
										<Image
											width={200}
											src={m.message}
											alt="Chat image"
											style={{ maxWidth: '200px', borderRadius: '8px' }}
										/>
									</div>
								) : (
									<div className={m.senderId.toString() === memoizedAdminId.toString() ? 'admin-msg-content' : 'user-msg-content'}>
										<span>{m.message}</span>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="chat-input-container">
				<div className="chat-input">
					<input
						type="text"
						className="input-box"
						placeholder="Nhập tin nhắn..."
						value={messageContent}
						onChange={handleInputChange}
						onKeyUp={handleKeyUp}
					/>
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleImageChange}
						style={{ display: 'none' }}
					/>
					<div onClick={handleFileClick} className="option-message mr-2">
						<img alt="Upload Image" src={IcImage} />
					</div>
					<div onClick={sendMessage} className="send-message bg-[#BB2C26] p-2 rounded-full cursor-pointer">
						<Send2 color='#fff' variant="Bold" />
					</div>
				</div>
			</div>
		</div>
	), [isLoading, messages, memoizedAdminId, memoizedBaseUrl, messageContent, handleCloseChat, handleInputChange, handleKeyUp, handleFileClick, sendMessage, handleImageChange]);

	return (
		<>
			{!isChatOpen && ChatButton}
			{isChatOpen && ChatInterface}
		</>
	);
};

export default Chatbot;
