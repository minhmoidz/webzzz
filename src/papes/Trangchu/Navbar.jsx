import "./Navbar.scss"
const Navbar = ({setFilterType}) =>{
    const handleCategoryFilter = (type) => {
        setFilterType(type); // Truyền type để lọc sản phẩm
      };
    return(
        <nav className="trangchu_navbar">
        <ul>
          <li onClick={() => handleCategoryFilter("thuoc")}>Thuốc</li>
          <li onClick={() => handleCategoryFilter("duoc-my-pham")}>Dược mỹ phẩm</li>
          <li onClick={() => handleCategoryFilter("thiet-bi-y-te")}>Thiết bị y tế</li>
          <li onClick={() => handleCategoryFilter("vitamin")}>Vitamin</li>
          <li onClick={() => handleCategoryFilter("thuc-pham-chuc-nang")}>Thực phẩm chức năng</li>
        </ul>
      </nav>
    )
}
export default Navbar