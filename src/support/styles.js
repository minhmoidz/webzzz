export const styles = {
    chatWithMeButton: {
        cursor: 'pointer',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        borderRadius: '50%',
        backgroundImage: `url("public/chat.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '110px',
        width: '110px',
        height: '110px',
        transition: 'transform 0.3s ease',
    },
    chatContainer: {
        width: '100%',
        margin: '0 auto',
        padding: '25px',
        borderRadius: '18px',
        border: '1px solid #ddd',
        backgroundColor: '#fafafa',
        height: 'calc(80vh - 100px)', // Dành không gian cho thanh nhập và gửi
        overflowY: 'auto', // Cho phép cuộn khi có nhiều tin nhắn
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative', // Để phần tử con có thể căn vị trí
    },
    messagesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '20px',
    },
    userMessage: {
        backgroundColor: '#DFF7DF',
        padding: '12px',
        marginBottom: '12px',
        borderRadius: '12px',
        maxWidth: '80%',
        alignSelf: 'flex-end',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    adminMessage: {
        backgroundColor: '#F1F1F1',
        padding: '12px',
        marginBottom: '12px',
        borderRadius: '12px',
        maxWidth: '80%',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    timestamp: {
        fontSize: '0.75rem',
        color: '#888',
        marginTop: '5px',
        textAlign: 'right',
    },
    inputContainer: {
        position: 'absolute', // Đặt nó vào vị trí tuyệt đối trong khung chat
        bottom: '5', // Đảm bảo nó luôn ở dưới cùng
        left: '50%',
        transform: 'translateX(-50%)', // Căn giữa
        width: '80%', // Căn rộng như container chat
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#fafafa',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: '1', // Đảm bảo input không bị che khuất
    },
    
    input: {
        width: '85%',
        padding: '12px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    inputFocus: {
        borderColor: '#7a39e0',
    },
    sendButton: {
        padding: '12px 20px',
        backgroundColor: '#7a39e0',
        border: 'none',
        color: 'white',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginLeft: '10px',
    },
    sendButtonHover: {
        backgroundColor: '#5a27a0',
    },
    avatarHello: {
        position: 'absolute',
        left: 'calc(-100% - 44px - 28px)',
        top: 'calc(50% - 24px)',
        zIndex: '10000',
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        padding: '14px 16px',
        borderRadius: '24px',
        backgroundColor: '#f9f0ff',
        color: 'black',
        fontWeight: '600',
    },
    supportWindow: {
        position: 'fixed',
        bottom: '116px',
        right: '140px',
        width: '500px',
        height: '600px',
        maxWidth: 'calc(100% - 48px)',
        maxHeight: 'calc(100% - 48px)',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: `2px solid #f9f0ff`,
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
    },
    emailFormWindow: {
        width: '100%',
        overflow: 'hidden',
        transition: "all 0.5s ease",
        WebkitTransition: "all 0.5s ease",
        MozTransition: "all 0.5s ease",
    },
    stripe: {
        position: 'relative',
        top: '-45px',
        width: '100%',
        height: '308px',
        backgroundColor: '#7a39e0',
        transform: 'skewY(-12deg)',
    },
    topText: {
        position: 'relative',
        width: '100%',
        top: '15%',
        color: 'black',
        fontSize: '24px',
        fontWeight: '600',
        textAlign: 'center',
    },
    emailInput: {
        width: '66%',
        textAlign: 'center',
        outline: 'none',
        padding: '12px',
        borderRadius: '12px',
        border: '2px solid #7a39e0',
        transition: 'border-color 0.3s ease',
    },
    emailInputFocus: {
        borderColor: '#5a27a0',
    },
    bottomText: {
        position: 'absolute',
        width: '100%',
        top: '70%',
        color: '#7a39e0',
        fontSize: '24px',
        fontWeight: '600',
        textAlign: 'center',
    },
    loadingDiv: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIcon: {
        color: '#7a39e0',
        fontSize: '3rem',
        fontWeight: '600',
    },
    chatEngineWindow: {
        width: '100%',
        backgroundColor: '#fff',
    },
    
};
