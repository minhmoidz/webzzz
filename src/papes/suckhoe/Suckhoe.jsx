import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./suckhoe.scss";
import Header from "../Trangchu/Header.jsx"; // Giữ nguyên Header từ trước
import Navbar from "../Trangchu/Navbar.jsx"; // Thanh điều hướng Navbar
import Footer from "../Trangchu/Footer.jsx"; // Footer giữ nguyên
import Sup from "../../support/SupPage"; // Hỗ trợ trang khác
import { ToastContainer } from "react-toastify"; // Thư viện Toastify
import "react-toastify/dist/ReactToastify.css"; // Thư viện Toastify

const Suckhoe = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Lỗi nếu có

  // Giả lập dữ liệu chăm sóc sức khỏe
  const healthCareArticles = [
    {
      title: "Giấc ngủ ngon",
      description:
        "Giấc ngủ chất lượng là yếu tố quan trọng giúp cơ thể hồi phục, tái tạo năng lượng và duy trì sức khỏe tâm lý tốt. Thiếu ngủ có thể gây ra nhiều vấn đề về sức khỏe, như mệt mỏi, căng thẳng, và nguy cơ mắc bệnh tim mạch.",
      content:
        "Giấc ngủ là thời gian cơ thể nghỉ ngơi và tái tạo năng lượng, giúp hệ thần kinh hoạt động hiệu quả. Giấc ngủ chất lượng không chỉ giúp bạn cảm thấy khỏe mạnh mà còn giúp cải thiện tâm trạng và trí nhớ. Để có giấc ngủ ngon, bạn nên thiết lập một thói quen ngủ cố định, tạo không gian ngủ thoải mái, hạn chế sử dụng thiết bị điện tử trước khi ngủ và duy trì một chế độ ăn uống lành mạnh. Các nghiên cứu đã chỉ ra rằng, giấc ngủ từ 7 đến 9 giờ mỗi đêm là lý tưởng cho người trưởng thành.",
      link: "/health-care/giac-ngu-ngon",
    },
    {
      title: "Chế độ dinh dưỡng hợp lý",
      description:
        "Chế độ dinh dưỡng hợp lý giúp cơ thể nhận được đủ dưỡng chất để duy trì các chức năng bình thường và ngăn ngừa bệnh tật. Một chế độ ăn uống lành mạnh bao gồm việc ăn nhiều rau củ, trái cây, và các nguồn protein lành mạnh.",
      content:
        "Chế độ dinh dưỡng hợp lý bao gồm việc duy trì một sự cân bằng giữa các nhóm thực phẩm như rau, trái cây, ngũ cốc nguyên hạt, protein từ động vật và thực vật, và các chất béo lành mạnh. Bạn nên tránh ăn quá nhiều thực phẩm chế biến sẵn, thực phẩm chứa nhiều đường và muối. Bữa ăn nên bao gồm ít nhất ba phần rau và trái cây mỗi ngày, đồng thời bổ sung đủ nước cho cơ thể. Ngoài ra, một số loại thực phẩm như cá béo, hạt chia, và dầu olive có thể giúp bạn duy trì sức khỏe tim mạch và chống viêm.",
      link: "/health-care/che-do-dinh-duong",
    },
    {
      title: "Giữ tinh thần thoải mái",
      description:
        "Sức khỏe tinh thần cũng quan trọng không kém sức khỏe thể chất. Việc giữ cho tâm trạng ổn định, giảm stress và lo âu sẽ giúp cơ thể luôn khỏe mạnh và chống lại các bệnh lý liên quan đến căng thẳng.",
      content:
        "Tinh thần là yếu tố ảnh hưởng trực tiếp đến sức khỏe tổng thể. Stress và lo âu kéo dài có thể gây ra các vấn đề về sức khỏe như huyết áp cao, bệnh tim mạch, và các vấn đề về tiêu hóa. Để duy trì một tinh thần thoải mái, bạn có thể thử các phương pháp giảm căng thẳng như thiền, yoga, tập thể dục, hoặc chỉ đơn giản là dành thời gian thư giãn. Đừng quên dành thời gian cho gia đình và bạn bè, bởi những mối quan hệ xã hội tốt giúp giảm căng thẳng và cải thiện tâm trạng.",
      link: "/health-care/giu-tinh-than-thoai-mai",
    },
    {
      title: "Tập thể dục thường xuyên",
      description:
        "Tập thể dục không chỉ giúp bạn duy trì vóc dáng mà còn mang lại nhiều lợi ích cho sức khỏe tim mạch, cơ bắp và tinh thần. Việc luyện tập thể thao đều đặn giúp giảm nguy cơ mắc các bệnh lý mãn tính và cải thiện chất lượng cuộc sống.",
      content:
        "Các bài tập thể dục như chạy bộ, đạp xe, bơi lội và tập gym giúp cơ thể khỏe mạnh, cải thiện sức bền và sự linh hoạt. Ngoài ra, thể dục còn giúp cải thiện chất lượng giấc ngủ, tăng cường khả năng miễn dịch và giảm căng thẳng. Tổ chức Y tế Thế giới khuyến nghị mỗi người trưởng thành nên tập thể dục ít nhất 150 phút mỗi tuần. Nếu bạn mới bắt đầu tập luyện, hãy bắt đầu với những bài tập nhẹ nhàng và tăng cường dần dần để đạt được kết quả tốt nhất.",
      link: "/health-care/tap-the-duc-thuong-xuyen",
    },
    {
      title: "Kiểm tra sức khỏe định kỳ",
      description:
        "Kiểm tra sức khỏe định kỳ là một trong những cách hiệu quả nhất để phát hiện bệnh sớm và ngăn ngừa các bệnh lý nghiêm trọng. Việc kiểm tra sức khỏe giúp bạn nắm bắt tình trạng cơ thể và có biện pháp điều chỉnh kịp thời.",
      content:
        "Kiểm tra sức khỏe định kỳ giúp phát hiện các dấu hiệu bệnh lý trước khi chúng trở nên nghiêm trọng. Các xét nghiệm thường bao gồm kiểm tra huyết áp, xét nghiệm máu, xét nghiệm cholesterol và kiểm tra các cơ quan như gan, thận. Việc kiểm tra sức khỏe định kỳ là cách đơn giản và hiệu quả để duy trì sức khỏe lâu dài. Nếu bạn có tiền sử bệnh lý trong gia đình hoặc có các yếu tố nguy cơ cao, việc kiểm tra sức khỏe càng trở nên quan trọng hơn.",
      link: "/health-care/kiem-tra-suc-khoe-dinh-ky",
    },
  ];

  useEffect(() => {
    // Giả lập việc tải dữ liệu
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="loading">Đang tải trang...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="health-care">
      <ToastContainer />
      <Header setSearchTerm={setSearchTerm} setFilterType={setFilterType} />
      <Navbar setFilterType={setFilterType} />
      <div className="content">
        <h2>Chăm sóc sức khỏe</h2>

        {/* Các bài viết chăm sóc sức khỏe */}
        <div className="articles">
          {healthCareArticles.map((article, index) => (
            <div key={index} className="article-item">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <Link to={article.link} className="read-more">
                Xem thêm
              </Link>
            </div>
          ))}
        </div>

        {/* Liên kết về trang chủ */}
        <div className="back-home">
          <Link to="/" className="home-link">
            Quay lại trang chủ
          </Link>
        </div>
      </div>

      {/* Giữ Footer */}
      <Sup />
      <Footer />
    </div>
  );
};

export default Suckhoe;
