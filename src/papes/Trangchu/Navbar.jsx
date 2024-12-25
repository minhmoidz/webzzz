import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./Navbar.scss";

const Navbar = ({ setFilterType }) => {
  const handleCategoryFilter = (type) => {
    setFilterType(type); // Truyền type để lọc sản phẩm
  };

  return (
    <nav className="trangchu_navbar">
      <ul>
      <li>
          <Link to="/Trangchu" style={{ textDecoration: "none" }}>Tủ thuốc</Link>
      </li>
        {/* Cập nhật Bệnh và Góc sức khỏe với Link */}
        <li>
          <Link to="/benh" style={{ textDecoration: "none" }}>Bệnh</Link>
        </li>
        <li>
          <Link to="/suckhoe" style={{ textDecoration: "none" }}>Góc sức khỏe</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
