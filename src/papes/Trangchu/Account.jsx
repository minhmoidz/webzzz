import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Account.scss";
import Header from "./Header";
import Sup from "../../support/SupPage.jsx";

const Account = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra dữ liệu tạm thời khi component mount
  useEffect(() => {
    // Kiểm tra xem có dữ liệu tạm thời không
    const tempData = localStorage.getItem("tempUserData");
    if (tempData) {
      // Nếu có, set dữ liệu và xóa khỏi localStorage
      const parsedData = JSON.parse(tempData);
      setFormData(parsedData);
      setIsLoggedIn(true);
      localStorage.removeItem("tempUserData"); // Xóa dữ liệu tạm thời
      localStorage.setItem("accountData", JSON.stringify(parsedData)); // Lưu vào accountData
    } else {
      // Nếu không có dữ liệu tạm thời, kiểm tra accountData bình thường
      const storedData = localStorage.getItem("accountData");
      if (storedData) {
        setFormData(JSON.parse(storedData));
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    localStorage.setItem("accountData", JSON.stringify(formData));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accountData");
    setFormData({
      username: "",
      fullname: "",
      email: "",
      phone: "",
      password: "",
    });
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <div className="sidebar__account">
          <h2>Menu</h2>
          <ul>
            <li className="active">
              <a href="#account">Tài khoản của tôi</a>
            </li>
            <li className="active">
              <a href="#orders">Đơn mua</a>
            </li>
          </ul>
        </div>

        <div className="main-content">
          <div id="account" className="content-section">
            <div className="wrap">
              <h1>Tài khoản của tôi</h1>
              <button onClick={handleLogout} className="logout-button">Đăng xuất</button>
            </div>

            {isLoggedIn ? (
              <div className="account-info">
                {isEditing ? (
                  <div className="edit-form">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input
                      type="text"
                      id="username"
                      value={formData.username}
                      disabled={true}
                    />
                    <label htmlFor="fullname">Tên cá nhân</label>
                    <input
                      type="text"
                      id="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      disabled={true}
                    />
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="text"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <div className="button-group">
                      <button onClick={handleSaveClick} className="save-button">
                        Lưu thay đổi
                      </button>
                      <button onClick={() => setIsEditing(false)} className="cancel-button">
                        Hủy bỏ
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="info-display">
                    <p><strong>Tên đăng nhập:</strong> {formData.username}</p>
                    <p><strong>Tên cá nhân:</strong> {formData.fullname || "Chưa cập nhật"}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Số điện thoại:</strong> {formData.phone || "Chưa cập nhật"}</p>
                    <button onClick={handleEditClick} className="edit-button">
                      Chỉnh sửa
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p>Vui lòng đăng nhập để xem thông tin tài khoản</p>
            )}
          </div>

          {isLoggedIn && (
            <div id="orders" className="content-section">
              <h1>Đơn mua</h1>
              <div className="order-item">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Sản phẩm"
                  className="order-image"
                />
                <div className="order-info">
                  <h3>Tên sản phẩm</h3>
                  <p>Giá: 500.000 VND</p>
                  <p>Trạng thái: Đã giao</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <Sup />
      </div>
    </div>
  );
};

export default Account;