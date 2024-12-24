import { Link } from "react-router-dom"
import "./Account.scss"
import Header from "./Header"
import { useState } from "react";
import Sup from "../../support/SupPage.jsx"

const Account = () => {

const [formData, setFormData] = useState({
  username: "NguyenVanA",
  fullname: "Nguyễn Văn A",
  email: "nguyenvana@gmail.com",
  phone: "0123456789",
});

const handleChange = (e) => {
  const { id, value } = e.target;
  setFormData((prev) => ({ ...prev, [id]: value }));
};
    return( 
       <div>
        <Header />
        <div>
        <div className="profile-container">
  {/* Sidebar */}
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
  {/* Main Content */}
  <div className="main-content">
    {/* Account Section */}
    <div id="account" className="content-section">
      <div className="wrap">
        <h1>Tài khoản của tôi</h1>
        <h1>Đơn mua</h1>
        <h1><Link to="/login">Đăng xuất</Link></h1>
      </div>
      <form>
        <label htmlFor="username">Tên đăng nhập</label>
        <input
          type="text"
          id="username"
          defaultValue={formData.username}
          disabled="true"
          onChange={handleChange}
        />
        <label htmlFor="fullname">Tên cá nhân</label>
        <input type="text" id="fullname" defaultValue={formData.fullname} onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" defaultValue={formData.email}  onChange={handleChange} />
        <label htmlFor="phone">Số điện thoại</label>
        <input type="tel" id="phone" defaultValue={formData.phone}  onChange={handleChange} />
        <button type="button" className="btn-edit">
          Chỉnh sửa
        </button>
      </form>
    </div>
    {/* Orders Section */}
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
      
  </div>
  <Sup />
</div>

        </div>
       </div>
    )
}
export default Account