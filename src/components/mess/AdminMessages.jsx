import React, { useEffect, useState } from "react";
import "./mes.css";

const AdminMessages = () => {
    const [messagesByRoom, setMessagesByRoom] = useState({});
    const [error, setError] = useState('');
    const [responseText, setResponseText] = useState('');
    const [ws, setWs] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState(new Map());
    const [unreadMessages, setUnreadMessages] = useState({});
    const [roomsInfo, setRoomsInfo] = useState([]);
    const [activeRooms, setActiveRooms] = useState(new Map()); // Thêm dòng này

    // Fetch rooms information
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/rooms');
                const data = await response.json();
                
                // Update roomsInfo state
                setRoomsInfo(data);
                
                // Initialize activeRooms with data from API
                const newActiveRooms = new Map();
                data.forEach(room => {
                    newActiveRooms.set(room.roomId, {
                        lastMessage: "",
                        lastMessageTime: room.lastActivity,
                        messageCount: room.messageCount,
                        clientCount: room.clientCount,
                        adminCount: room.adminCount,
                        userId: room.roomId.split('_')[1] // Extracting user ID from roomId
                    });
                });
                setActiveRooms(newActiveRooms);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setError('Error loading rooms information');
            }
        };

        fetchRooms();
        const interval = setInterval(fetchRooms, 30000); // Refresh every 30 seconds

        return () => clearInterval(interval);
    }, []);

    // Fetch messages for a specific room
    const fetchRoomMessages = async (roomId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/messages/${roomId}`);
            const messages = await response.json();
            setMessagesByRoom(prev => ({
                ...prev,
                [roomId]: messages
            }));
        } catch (error) {
            console.error('Error fetching room messages:', error);
            setError('Error loading room messages');
        }
    };
    const updateActiveRoom = (roomId, messageData) => {
        setActiveRooms(prev => {
            const currentRoom = prev.get(roomId) || {
                messageCount: 0,
                clientCount: 0,
                adminCount: 0,
                userId: roomId.split('_')[1]
            };
            
            return new Map(prev.set(roomId, {
                ...currentRoom,
                lastMessage: messageData.text,
                lastMessageTime: messageData.timestamp,
                sender: messageData.sender,
                userId: currentRoom.userId
            }));
        });
    };

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5000/chat');
    
        socket.onopen = () => {
            console.log('Connected to WebSocket as Admin');
            const joinMessage = {
                type: 'adminJoin',
                email: 'admin',
                roomId: selectedRoom || '' // Gửi roomId nếu có
            };
            socket.send(JSON.stringify(joinMessage));
        };
    
        // Thêm event listener cho khi admin chọn phòng mới
        if (selectedRoom) {
            const joinRoomMessage = {
                type: 'adminJoin',
                email: 'admin',
                roomId: selectedRoom
            };
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(joinRoomMessage));
            }
        }
    
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received message:', data);
    
            switch (data.type) {
                case 'message':
                    handleMessage(data);
                    break;
                case 'adminMessage':
                    handleAdminMessage(data);
                    break;
                case 'roomJoined': // Thêm case xử lý khi join phòng thành công
                    console.log('Successfully joined room:', data.roomId);
                    break;
                default:
                    break;
            }
        };
    
        socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
            setError('Error connecting to WebSocket server.');
        };
    
        socket.onclose = () => {
            console.log('WebSocket connection closed');
            setError('WebSocket connection closed.');
        };
    
        setWs(socket);
    
        return () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, [selectedRoom]);

    const handleMessage = (data) => {
        const roomId = data.roomId;
        if (data.sender !== 'admin') {
            if (selectedRoom !== roomId) {
                setUnreadMessages(prev => ({
                    ...prev,
                    [roomId]: (prev[roomId] || 0) + 1
                }));
            }

            setMessagesByRoom(prevMessages => {
                const roomMessages = prevMessages[roomId] || [];
                const isDuplicate = roomMessages.some(msg =>
                    msg.timestamp === data.timestamp &&
                    msg.text === data.text &&
                    msg.sender === data.sender
                );

                if (!isDuplicate) {
                    updateActiveRoom(roomId, data);
                    return {
                        ...prevMessages,
                        [roomId]: [...roomMessages, data]
                    };
                }
                return prevMessages;
            });
        }
    };

    const handleAdminMessage = async (data) => {
        const roomId = data.roomId;
        try {
            await fetch(`http://localhost:5000/api/messages/${roomId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'message',
                    sender: 'admin',
                    text: data.text,
                    timestamp: new Date().toISOString(),
                    roomId: roomId
                })
            });

            // Update local state
            setMessagesByRoom(prevMessages => {
                const roomMessages = prevMessages[roomId] || [];
                return {
                    ...prevMessages,
                    [roomId]: [...roomMessages, data]
                };
            });
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Error sending message');
        }
    };

    const handleResponseChange = (event) => {
        setResponseText(event.target.value);
    };

    const handleSendResponse = () => {
        if (!selectedRoom) {
            setError('Vui lòng chọn phòng chat trước khi gửi tin nhắn');
            return;
        }
    
        if (responseText.trim() && ws?.readyState === WebSocket.OPEN) {
            // Gửi lại join message trước khi gửi tin nhắn để đảm bảo đã join phòng
            const joinMessage = {
                type: 'adminJoin',
                email: 'admin',
                roomId: selectedRoom
            };
            ws.send(JSON.stringify(joinMessage));
    
            // Sau đó mới gửi tin nhắn
            const responseMessage = {
                type: 'message',
                sender: 'admin',
                text: responseText.trim(),
                timestamp: new Date().toISOString(),
                roomId: selectedRoom
            };
    
            ws.send(JSON.stringify(responseMessage));
            setResponseText('');
        }
    };

    const handleRoomSelect = async (roomId) => {
        setSelectedRoom(roomId);
        setError('');
        setUnreadMessages(prev => ({
            ...prev,
            [roomId]: 0
        }));
    
        // Fetch messages first
        await fetchRoomMessages(roomId);
    
        // Then join the room if WebSocket is connected
        if (ws && ws.readyState === WebSocket.OPEN) {
            const joinMessage = {
                type: 'adminJoin',
                email: 'admin',
                roomId: roomId
            };
            ws.send(JSON.stringify(joinMessage));
            console.log('Sent join message for room:', roomId);
        }
    };
    const getSortedRooms = () => {
        return Array.from(activeRooms.entries())
            .map(([roomId, roomData]) => ({
                roomId,
                ...roomData,
                unreadCount: unreadMessages[roomId] || 0
            }))
            .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
    };

    return (
      <div className="messenger-container">
        {/* Sidebar */}
        <div className="SI">
          <div className="sidebar-header">
            <h2>Chat</h2>
          </div>
          <div className="conversations-list">
            {getSortedRooms().map((room) => (
              <div
                key={room.roomId}
                onClick={() => handleRoomSelect(room.roomId)}
                className={`conversation-item ${selectedRoom === room.roomId ? 'active' : ''}`}
              >
                <div className="avatar">
                  {room.userId.charAt(0).toUpperCase()}
                </div>
                <div className="conversation-content">
                  <div className="conversation-header">
                    <h3 className="user-name">{room.userId}</h3>
                    <span className="timestamp">
                      {new Date(room.lastMessageTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="last-message">
                    <p className="message-preview">
                      {room.lastMessage || `${room.messageCount} messages`}
                    </p>
                    {room.unreadCount > 0 && (
                      <span className="unread-badge">
                        {room.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    
        {/* Chat Area */}
        <div className="chat-area">
          {selectedRoom ? (
            <>
              <div className="chat-header">
                <div className="avatar">
                  {selectedRoom.split('_')[1].charAt(0).toUpperCase()}
                </div>
                <div className="chat-header-info">
                  <h3 className="chat-header-name">
                    {selectedRoom.split('_')[1]}
                  </h3>
                  <p className="active-status">Active now</p>
                </div>
              </div>
    
              <div className="messages-container">
                {error && (
                  <div className="error-message">{error}</div>
                )}
    
                {messagesByRoom[selectedRoom]?.length > 0 ? (
                  messagesByRoom[selectedRoom].map((msg, index) => (
                    <div 
                      key={`${msg.timestamp}-${msg.sender}-${index}`}
                      className={`message-row ${msg.sender === 'admin' ? 'sent' : 'received'}`}
                    >
                      {msg.sender !== 'admin' && (
                        <div className="avatar small-avatar">
                          {selectedRoom.split('_')[1].charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="message-bubble">
                        <p>{msg.text}</p>
                        <span className="message-time">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No messages yet</p>
                  </div>
                )}
              </div>
    
              <div className="input-area">
                <div className="input-container">
                  <textarea
                    value={responseText}
                    onChange={handleResponseChange}
                    placeholder="Aa"
                    className="message-input"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendResponse();
                      }
                    }}
                  />
                  <button 
                    onClick={handleSendResponse}
                    className="send-button"
                    disabled={!responseText.trim()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    );
};

export default AdminMessages;