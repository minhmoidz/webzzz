
import React from "react";
import "./cart.scss";
import { Link } from "react-router-dom";
import TrangChu from "../../papes/Trangchu/Trangchu";
import Sup from "../../support/SupPage.jsx"

const Cart = ({ cart }) => {
  // Tính tổng số lượng sản phẩm
  const totalQuantity = cart.reduce((total, product) => total + (product.quantity || 1), 0);

  // Tính tổng tiền
  const totalPrice = cart.reduce(
    (total, product) => total + (parseFloat(product.price.replace(/,/g, "")) || 0),
    0
  );

  return (
    <div className="cart-container">
      {/* Danh sách sản phẩm */}
      <div className="cart-items">
        <h2>Giỏ hàng của bạn</h2>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Giỏ hàng đang trống.</p>
            <Link to="/" className="go-back">
              Quay lại mua sắm
            </Link>
          </div>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Giá: {item.price} VNĐ</p>
                <p>Số lượng: {item.quantity || 1}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Thông tin thanh toán */}
      <div className="cart-summary">
        <h3>Thông tin thanh toán</h3>
        <p>Tổng sản phẩm: {totalQuantity}</p>
        <p>Tổng tiền: {totalPrice.toLocaleString("vi-VN")} VNĐ</p>
        <button className="checkout-button">Thanh toán</button>
      </div>
      <Sup/>
    </div>
    
  );
};

export default Cart;
