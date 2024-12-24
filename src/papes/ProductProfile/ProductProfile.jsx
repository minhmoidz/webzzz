import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../cart/CartContext.jsx";
import Header from "../Trangchu/Header";
import Footer from "../Trangchu/Footer";
import axios from "axios";  // Import axios để gọi API

const ProductProfile = () => {
  const { productId } = useParams(); // Lấy ID sản phẩm từ URL
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null); // Sản phẩm chi tiết
  const [quantity, setQuantity] = useState(1); // Quản lý số lượng
  const [relatedProducts, setRelatedProducts] = useState([]); // Sản phẩm liên quan
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading

  // Hàm gọi API để lấy thông tin sản phẩm
  useEffect(() => {
    // Gọi API để lấy dữ liệu sản phẩm
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/products`);
        const productData = response.data;

        // Tìm sản phẩm theo productId từ dữ liệu API
        const selectedProduct = productData.find((product) => product.medicineId === parseInt(productId));
        if (selectedProduct) {
          setProduct(selectedProduct);

          // Tìm các sản phẩm liên quan (giả sử cùng loại)
          const related = productData.filter(
            (p) => p.medicineType === selectedProduct.medicineType && p.medicineId !== selectedProduct.medicineId
          );
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);  // Kết thúc việc gọi API
      }
    };

    fetchProduct();
  }, [productId]);  // Thực hiện lại khi productId thay đổi

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate("/cart");
  };

  if (loading) {
    return <div>Loading...</div>;  // Hiển thị khi dữ liệu đang được tải
  }

  if (!product) {
    return <div>Product not found!</div>;  // Nếu không tìm thấy sản phẩm
  }

  return (
    <div className="product-profile">
      <Header />
      <div className="product-profile-box">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.medicineName} />
        </div>
        <div className="product-details">
          <h2>{product.medicineName}</h2>
          <p className="product-price">
            <b>{product.price}</b>/ Hộp
          </p>
          <p className="product-description">{product.treat}</p>
          <p className="product-details-text">Hạn sử dụng: {product.expDate}</p>

          <div className="product-quantity">
            <label>Số lượng:</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={handleQuantityChange} 
              min="1" 
              step="1"
            />
          </div>

          <div className="product-actions">
            <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
            <button onClick={handleBuyNow}>Mua ngay</button>
          </div>
        </div>
      </div>

      {/* Hiển thị sản phẩm liên quan */}
      <div className="related-products">
        <h3 style={{ textAlign: "center" }}>Sản phẩm liên quan</h3>
        <div className="product-list">
          {relatedProducts.map((related) => (
            <div className="product-item" key={related.medicineId}>
              <img src={related.imageUrl} alt={related.medicineName} />
              <h4>
                <Link to={`/products/${related.medicineId}`}>{related.medicineName}</Link>
              </h4>
              <p><b>{related.price}</b>/ Hộp</p>
              <button onClick={() => addToCart({ ...related, quantity: 1 })}>
                Thêm vào giỏ hàng
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductProfile;
