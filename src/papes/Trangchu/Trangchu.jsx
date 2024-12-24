import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./Trangchu.scss";
import Header from "./Header";
import { useCart } from "../cart/CartContext"; 
import Slideshow from "./SlideShow.jsx";
import Footer from "./Footer.jsx";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar.jsx";
import Sup from "../../support/SupPage.jsx";

const TrangChu = () => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filterType, setFilterType] = useState(""); 
  const [products, setProducts] = useState([]); // Lưu danh sách sản phẩm
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Gọi API khi trang được tải
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products");
        if (!response.ok) {
          throw new Error("Lỗi khi gọi API");
        }
        const data = await response.json();
        // Định dạng dữ liệu trước khi lưu vào state
        const formattedProducts = data.map((item) => ({
          id: item.medicineId,
          name: item.medicineName,
          image: item.imageUrl,
          price: item.price,
          type: item.medicineType,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Lỗi:", error);
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Lọc sản phẩm theo từ khóa tìm kiếm và bộ lọc loại
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "" || product.type === filterType)
  );

  // Thêm sản phẩm vào giỏ hàng
  const themSanPham = (product) => {
    const quantity = 1;
    addToCart({ ...product, quantity });
    toast.success("Đã thêm vào giỏ hàng");
  };

  if (isLoading) {
    return <div className="loading">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="trangchu">
      <ToastContainer />
      <Header setSearchTerm={setSearchTerm} setFilterType={setFilterType} />
      <Navbar setFilterType={setFilterType} />

      <Slideshow />
      <div className="content">
        <h2>Sản phẩm nổi bật</h2>
        <div className="product-list" id="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-item" key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <p>{product.price}</p>
                <button onClick={() => themSanPham(product)}>Thêm vào giỏ hàng</button>
              </div>
            ))
          ) : (
            <p>Không tìm thấy sản phẩm nào phù hợp.</p>
          )}
        </div>
      </div>
      <Sup />
      <Footer />
    </div>
  );
};

export default TrangChu;
