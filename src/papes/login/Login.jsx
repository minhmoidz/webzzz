import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.scss";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [forgotEmail, setForgotEmail] = useState('');
    const [otp, setOtp] = useState('');  // Trạng thái OTP
    const [newPassword, setNewPassword] = useState('');  // Trạng thái mật khẩu mới
    const [loading, setLoading] = useState(false);
    const [accountType, setAccountType] = useState('client');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);  // Trạng thái OTP
    const [showChangePassword, setShowChangePassword] = useState(false);  // Trạng thái thay đổi mật khẩu
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            toast.error('Email và mật khẩu không được để trống!');
            return;
        }
    
        setLoading(true);
    
        try {
            // API endpoint tùy thuộc vào loại tài khoản
            const apiEndpoint = accountType === 'admin' 
                ? 'http://localhost:1000/admin/login' 
                : 'http://localhost:1000/login';
    
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.success(result.message);
                navigate(accountType === 'admin' ? '/home' : '/');
            } else {
                toast.error(result.message || 'Đăng nhập thất bại!');
            }
        } catch (error) {
            toast.error('Lỗi kết nối đến server!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleForgotPassword = async (e) => {
        e.preventDefault();
    
        if (!forgotEmail) {
            toast.error('Email không được để trống!');
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await fetch('http://localhost:1000/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: forgotEmail }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.success(result.message);
                setShowOtpInput(true);  // Hiển thị trường OTP
                setShowForgotPassword(false); // Ẩn form quên mật khẩu
            } else {
                toast.error(result.message || 'Không thể gửi email!');
            }
        } catch (error) {
            toast.error('Lỗi kết nối đến server!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
    
        if (!forgotEmail || !otp || !newPassword) {
            toast.error('Vui lòng nhập đầy đủ email, mã OTP và mật khẩu mới!');
            return;
        }
    
        setLoading(true);
    
        try {
            const otpNumber = parseInt(otp, 10);
            
            const response = await fetch('http://localhost:1000/verify-reset-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: forgotEmail,
                    otp: otpNumber,
                    new_password: newPassword 
                }),
            });
    
            const result = await response.json();
            
            if (response.ok) {
                toast.success('Mật khẩu đã được cập nhật thành công!');
                setShowOtpInput(false);
                setShowChangePassword(false);
                // Trở về form đăng nhập
                setShowForgotPassword(false);
            } else {
                toast.error(result.message || 'Xác minh OTP thất bại!');
            }
        } catch (error) {
            toast.error('Lỗi kết nối đến server!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleNewPasswordSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword) {
            toast.error('Mật khẩu mới không được để trống!');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:1000/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: forgotEmail, newPassword }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Mật khẩu đã được cập nhật thành công!');
                setShowForgotPassword(false);  // Trở lại đăng nhập
                setShowOtpInput(false);  // Ẩn trường OTP
                setShowChangePassword(false);  // Ẩn form thay đổi mật khẩu
            } else {
                toast.error(result.message || 'Cập nhật mật khẩu thất bại!');
            }
        } catch (error) {
            toast.error('Lỗi kết nối đến server!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccountTypeChange = (type) => {
        setAccountType(type);
    };

    return (
        <div className="login-container">
            <div className="background"></div>
            <div className="login-box-container">
                {loading && (
                    <div className="loading-overlay">
                        <div className="loading-message">Đang xử lý, xin đợi một chút...</div>
                    </div>
                )}
                <div className="login-box">
                    <h2 className="login-title">MEDICINE APP</h2>
                    {showForgotPassword ? (
                        <form onSubmit={handleForgotPassword} className="forgot-password-form">
                            <div className="input-group">
                                <i className="icon-envelope input-icon"></i>
                                <input
                                    type="email"
                                    id="forgot-email"
                                    placeholder="Nhập email của bạn"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    className="login-input"
                                />
                            </div>
                            <button className="login-button" type="submit" disabled={loading}>
                                {loading ? 'Đang gửi...' : 'Gửi Email'}
                            </button>
                            <div className="login-options">
                                <a href="#" onClick={() => setShowForgotPassword(false)}>
                                    Trở lại đăng nhập
                                </a>
                            </div>
                        </form>
                    ) : showOtpInput ? (
                        <form onSubmit={handleVerifyOtp} className="verify-otp-form">
                            <div className="input-group">
                                <i className="icon-key input-icon"></i>
                                <input
                                    type="text"
                                    id="otp"
                                    placeholder="Nhập mã OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="login-input"
                                />
                            </div>
                            <div className="input-group">
                                <i className="icon-lock input-icon"></i>
                                <input
                                    type="password"
                                    id="new-password"
                                    placeholder="Nhập mật khẩu mới"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="login-input"
                                />
                            </div>
                            <button 
                                className="login-button" 
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Đang xác thực...' : 'Xác nhận'}
                            </button>
                            <div className="login-options">
                                <a href="#" onClick={() => {
                                    setShowOtpInput(false);
                                    setShowForgotPassword(true);
                                }}>
                                    Gửi lại mã OTP
                                </a>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="account-type-buttons">
                                <button
                                    type="button"
                                    className={`account-type-btn ${accountType === 'client' ? 'active' : ''}`}
                                    onClick={() => handleAccountTypeChange('client')}
                                >
                                    Client
                                </button>
                                <button
                                    type="button"
                                    className={`account-type-btn ${accountType === 'admin' ? 'active' : ''}`}
                                    onClick={() => handleAccountTypeChange('admin')}
                                >
                                    Admin
                                </button>
                            </div>
                            <form onSubmit={handleLogin} className="login-form">
                                <div className="input-group">
                                    <i className="icon-envelope input-icon"></i>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Nhập email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="login-input"
                                    />
                                </div>
                                <div className="input-group">
                                    <i className="icon-lock input-icon"></i>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="login-input"
                                    />
                                </div>
                                <div className="login-options">
                                    <label>
                                        <input type="checkbox" /> Remember me
                                    </label>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        setShowForgotPassword(true);
                                    }}>
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <button 
                                    className="login-button" 
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                </button>
                            </form>
                        </>
                    )}
                    {!showForgotPassword && !showOtpInput && (
                        <Link to="/dangky" className="register-link">
                            Bạn chưa có tài khoản? Đăng ký ngay!
                        </Link>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
    
};

export default Login;
