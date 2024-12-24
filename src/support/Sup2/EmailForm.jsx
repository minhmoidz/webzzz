import React, { useState, useEffect, useRef } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import Avatar from '../Avartar.jsx';
import { styles } from "../styles";
import './ChatStyles.css';

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [chatStarted, setChatStarted] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [roomId, setRoomId] = useState(null); // Thêm state cho roomId

    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const welcomeMessageSent = useRef(false);

    useEffect(() => {
        if (messagesEndRef.current && messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    useEffect(() => {
        if (!email || !chatStarted || !roomId) return;

        const ws = new WebSocket('ws://localhost:5000/chat');
        
        ws.onopen = () => {
            console.log('Kết nối WebSocket đã được thiết lập');
            // Gửi thông tin join với email và roomId
            ws.send(JSON.stringify({ 
                type: 'join', 
                email: email,
                sender: email,
                roomId: roomId  // Gửi roomId khi join
            }));
        };
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Nhận tin nhắn:', data);
            
            // Chỉ xử lý tin nhắn thuộc về phòng hiện tại
            if (data.roomId === roomId) {
                setChatMessages(prevMessages => {
                    const messageId = data.id || `${data.timestamp}-${data.sender}`;
                    const isDuplicate = prevMessages.some(msg => 
                        (msg.id && msg.id === messageId) || 
                        (msg.timestamp === data.timestamp && 
                         msg.text === data.text && 
                         msg.sender === data.sender)
                    );
                    
                    if (!isDuplicate) {
                        return [...prevMessages, {
                            id: messageId,
                            sender: data.sender,
                            text: data.text,
                            timestamp: new Date().toLocaleTimeString(),
                            roomId: data.roomId
                        }];
                    }
                    return prevMessages;
                });
            }
        };
        
        ws.onerror = (error) => {
            console.error('Lỗi WebSocket:', error);
            setMessage('Lỗi kết nối chat. Vui lòng thử lại.');
            setLoading(false);
        };
        
        ws.onclose = () => {
            console.log('Kết nối WebSocket bị đóng');
            // Có thể thêm logic reconnect ở đây nếu cần
        };
        
        setSocket(ws);
        
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [email, chatStarted, roomId]);

    const sendMessage = async (event) => {
        event.preventDefault();
        
        if (currentMessage.trim() && socket?.readyState === WebSocket.OPEN) {
            const messageId = `${Date.now()}-${email}`;
            const messageToSend = {
                type: 'message',
                id: messageId,
                sender: email,
                text: currentMessage.trim(),
                timestamp: new Date().toISOString(),
                roomId: roomId  // Thêm roomId vào tin nhắn
            };

            socket.send(JSON.stringify(messageToSend));

            setChatMessages(prevMessages => [...prevMessages, {
                ...messageToSend,
                timestamp: new Date().toLocaleTimeString()
            }]);
            
            setCurrentMessage('');
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const generateRoomId = (email) => {
        // Tạo roomId dựa trên email và timestamp
        return `room_${email.split('@')[0]}_${Date.now()}`;
    };

    const handleEmailSubmit = (event) => {
        event.preventDefault();
        if (email.trim()) {
            setLoading(true);
            // Tạo roomId mới cho mỗi phiên chat
            const newRoomId = generateRoomId(email);
            setRoomId(newRoomId);
            setChatStarted(true);
            
            // Thêm tin nhắn chào mừng với roomId
            setChatMessages([{
                id: `welcome-${Date.now()}`,
                sender: 'admin',
                text: `Xin chào! Tôi có thể giúp gì cho bạn? (Mã phòng: ${newRoomId})`,
                timestamp: new Date().toLocaleTimeString(),
                roomId: newRoomId
            }]);
            
            setLoading(false);
        } else {
            setMessage("Vui lòng nhập email hợp lệ!");
        }
    };

    if (chatStarted) {
        return (
            <div className="chat-container">
                <h2>Welcome to the chat, {email}!</h2>
                <div className="room-info">
                    <span className="room-id">Mã phòng: {roomId}</span>
                </div>
                <div className="messages-container" ref={messagesContainerRef}>
                    {chatMessages.map((message, index) => (
                        <div 
                            key={message.id || `${message.timestamp}-${message.sender}-${index}`}
                            className={`message ${message.sender === 'admin' ? 'admin-message' : 'user-message'}`}
                        >
                            <strong>{message.sender}</strong>
                            <p>{message.text}</p>
                            <span className="timestamp">{message.timestamp}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="input-container">
                    <input 
                        type="text" 
                        value={currentMessage} 
                        onChange={e => setCurrentMessage(e.target.value)}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                sendMessage(e);
                            }
                        }}
                        placeholder="Type a message..." 
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{...styles.emailFormWindow, height: '100%', opacity: '1'}}>
            <div style={{ height: '0px' }}>
                <div style={styles.stripe} />
            </div>

            <div 
                className='transition-5'
                style={{
                    ...styles.loadingDiv,
                    zIndex: loading ? '10' : '-1',
                    opacity: loading ? '0.33' : '0',
                }}
            />
            <LoadingOutlined
                className='transition-5'
                style={{
                    ...styles.loadingIcon,
                    zIndex: loading ? '10' : '-1',
                    opacity: loading ? '1' : '0',
                    fontSize: '82px',
                    top: 'calc(50% - 41px)',
                    left: 'calc(50% - 41px)',
                }}
            />

            <div style={{ position: 'absolute', height: '100%', width: '100%', textAlign: 'center' }}>
                <Avatar 
                    style={{ 
                        position: 'relative',
                        left: 'calc(50% - 44px)',
                        top: '10%',
                    }}
                />

                <div style={styles.topText}>
                    Welcome to my <br /> support 👋
                </div>

                <form
                    onSubmit={handleEmailSubmit}
                    style={{ position: 'relative', width: '100%', top: '19.75%' }}
                >
                    <input
                        type="text"
                        placeholder="Nhập email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                handleEmailSubmit(e);
                            }
                        }}
                    />
                </form>

                {message && (
                    <div style={{ color: message.includes('success') ? 'green' : 'red', marginTop: '10px' }}>
                        {message}
                    </div>
                )}

                <div style={styles.bottomText}>
                    Enter your email <br /> to get started.
                </div>
            </div>
        </div>
    );
};

export default EmailForm;