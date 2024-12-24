import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.scss'; // Đảm bảo tạo file SCSS tương ứng

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Validate input
        if (!email || !password || !confirmPassword) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Mật khẩu xác nhận không khớp!');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:1000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Mã OTP đã được gửi đến email của bạn!');
                setShowOtpVerification(true);
            } else {
                toast.error(result.message || 'Đăng ký thất bại!');
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

        if (!otp) {
            toast.error('Vui lòng nhập mã OTP!');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:1000/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    otp: parseInt(otp, 10)
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Đăng ký thành công!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error(result.message || 'Xác thực OTP thất bại!');
            }
        } catch (error) {
            toast.error('Lỗi kết nối đến server!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="background"></div>
            <div className="register-box-container">
                {loading && (
                    <div className="loading-overlay">
                        <div className="loading-message">Đang xử lý, vui lòng đợi...</div>
                    </div>
                )}
                <div className="register-box">
                    <h2 className="register-title">Đăng Ký Tài Khoản</h2>
                    
                    {!showOtpVerification ? (
                        <form onSubmit={handleRegister} className="register-form">
                            <div className="input-group">
                                <i className="icon-envelope input-icon"></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="register-input"
                                />
                            </div>
                            <div className="input-group">
                                <i className="icon-lock input-icon"></i>
                                <input
                                    type="password"
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="register-input"
                                />
                            </div>
                            <div className="input-group">
                                <i className="icon-lock input-icon"></i>
                                <input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="register-input"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="register-button"
                                disabled={loading}
                            >
                                {loading ? 'Đang xử lý...' : 'Đăng Ký'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="otp-form">
                            <div className="input-group">
                                <i className="icon-key input-icon"></i>
                                <input
                                    type="text"
                                    placeholder="Nhập mã OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="register-input"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="register-button"
                                disabled={loading}
                            >
                                {loading ? 'Đang xác thực...' : 'Xác Nhận OTP'}
                            </button>
                        </form>
                    )}
                    
                    <Link to="/login" className="login-link">
                        Đã có tài khoản? Đăng nhập ngay!
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;