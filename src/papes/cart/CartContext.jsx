import React, { createContext, useContext, useState } from "react";

// Tạo Context cho giỏ hàng
const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Nếu sản phẩm đã có trong giỏ, tăng số lượng
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity } // Cập nhật số lượng sản phẩm
            : item
        );
      }
      // Nếu sản phẩm chưa có, thêm sản phẩm mới
      return [...prevCart, { ...product, quantity: product.quantity }];
    });
  };

  // Tăng số lượng sản phẩm
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Giảm số lượng sản phẩm
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Loại bỏ sản phẩm có số lượng bằng 0
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Trả về context với các hàm quản lý giỏ hàng
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng CartContext dễ dàng hơn
export const useCart = () => useContext(CartContext);
