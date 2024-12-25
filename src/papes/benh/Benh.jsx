import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./benh.scss";
import Header from "../Trangchu/Header.jsx";
import Navbar from "../Trangchu/Navbar.jsx";
import Footer from "../Trangchu/Footer.jsx";
import Sup from "../../support/SupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Benh = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const healthArticles = [
    {
      title: "Ung thư",
      description: "Ung thư là một trong những căn bệnh nguy hiểm nhất hiện nay. ...",
      content: "Ung thư được chia thành các giai đoạn, từ giai đoạn đầu đến giai đoạn cuối...",
      link: "/health-consultation/ung-thu",
    },
    {
      title: "Tiểu đường",
      description: "Tiểu đường là một bệnh mãn tính ảnh hưởng đến khả năng sử dụng đường của cơ thể...",
      content: "Có hai loại tiểu đường chính: Tiểu đường loại 1 và Tiểu đường loại 2...",
      link: "/health-consultation/tiểu-duong",
    },
    {
      title: "Chế độ ăn uống lành mạnh",
      description: "Chế độ ăn uống lành mạnh là một trong những yếu tố quan trọng giúp duy trì sức khỏe lâu dài...",
      content: "Chế độ ăn uống lành mạnh cần bao gồm nhiều loại thực phẩm tươi sống như rau xanh, trái cây...",
      link: "/health-consultation/che-do-an-uong",
    },
    {
      title: "Tập thể dục đều đặn",
      description: "Tập thể dục đều đặn không chỉ giúp bạn khỏe mạnh mà còn giúp ngăn ngừa nhiều bệnh lý nguy hiểm...",
      content: "Việc tập thể dục thường xuyên giúp cải thiện sức khỏe tim mạch, tăng cường hệ miễn dịch...",
      link: "/health-consultation/tap-the-duc",
    },
  ];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="loading">Đang tải trang...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="health-consultation">
      <ToastContainer />
      <Header setSearchTerm={setSearchTerm} setFilterType={setFilterType} />
      <Navbar setFilterType={setFilterType} />
      <div className="content">
        <h2>Tư vấn về bệnh và cẩm nang sức khỏe</h2>
        <div className="articles">
          {healthArticles.map((article, index) => (
            <div key={index} className="article-item">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <Link to={article.link} className="read-more">
                Xem thêm
              </Link>
            </div>
          ))}
        </div>
        <div className="back-home">
          <Link to="/" className="home-link">Quay lại trang chủ</Link>
        </div>
      </div>
      <Sup />
      <Footer />
    </div>
  );
};

export default Benh;
