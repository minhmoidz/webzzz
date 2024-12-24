import React from "react";
import { useCart } from "../cart/CartContext";
import { Link } from "react-router-dom";
import "./cart.scss";
import Header from "../Trangchu/Header";
import Sup from "../../support/SupPage.jsx";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // Hàm chuyển đổi chuỗi giá tiền sang số
  const convertPriceToNumber = (priceString) => {
    // Loại bỏ "đ" và khoảng trắng, sau đó chuyển dấu chấm thành ''
    return parseFloat(priceString.replace(/[. đ]/g, '')) || 0;
  };
  
  // Tính tổng số lượng các sản phẩm trong giỏ hàng
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Tính tổng tiền các sản phẩm trong giỏ hàng
  const shippingCost = 20000;
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = convertPriceToNumber(item.price);
    return total + (itemPrice * item.quantity);
  }, 0) + shippingCost;

  // Format số thành định dạng tiền Việt Nam
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        <div className="cart-items">
          <h2 style={{ textAlign: "center", fontSize: "30px" }}>Giỏ hàng của bạn</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Giỏ hàng đang trống.</p>
              <Link to="/Trangchu" className="go-back">
                Quay lại mua sắm
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3>
                    <Link to={`/products/${item.id}`}>{item.name}</Link>
                  </h3>
                </div>
                <div className="price">
                  <span>{item.price}</span>
                </div>
                <div className="quantity-controls">
                  <button 
                    onClick={() => decreaseQuantity(item.id)} 
                    style={{ marginBottom: "35px" }}
                  >
                    -
                  </button>
                  <span style={{ marginLeft: "20px" }}>{item.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(item.id)} 
                    style={{ marginBottom: "35px" }}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-details">
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-summary">
            <div className="duoi">
              <h3>Thông tin thanh toán</h3>
              <p>Tổng sản phẩm: {totalQuantity}</p>
              <p>Giá vận chuyển: {formatPrice(shippingCost)} đ</p>
              <hr />
              <p style={{ marginTop: "20px" }}>
                Tổng tiền: {formatPrice(totalPrice)} đ
              </p>
              <button className="checkout-button" style={{ marginTop: "10px" }}>
                <Link to="/checkout" className="action-item">
                  Thanh toán
                </Link>
              </button>
            </div>
          </div>
        )}
        <Sup />
      </div>
    </>
  );
};

export default Cart;