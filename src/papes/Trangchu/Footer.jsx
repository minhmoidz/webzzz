import './Footer.scss'
const Footer = ()=>{
    return (
        <div className="footer">
            <div className="footer_footer">
                <div className="Ve_chung_toi">
                    <h3>Về Pharmacity</h3>
                    <ul>
                        <li>Giới thiệu</li>
                        <li>Hệ thống cửa hàng</li>
                        <li>Giấy phép kinh doanh</li>
                    </ul>
                </div>
                <div className="danh_muc">
                    <h3>Danh mục</h3>
                    <li>Thuốc</li>
                    <li>Tra cứu bệnh</li>
                    <li>Thực phẩm chức năng</li>
                </div>
                <div className="tong_dai">
                    <h3>Tổng đài hỗ trợ</h3>
                    <p>Hỗ trợ đặt hàng</p>
                    <i></i><p>Facebook</p>
                    <p>1800 1515</p>
                </div>
                <div className="social_media">
                    <h3>Theo dõi chúng tôi trên</h3>
                    <div><a href="https://www.facebook.com/tri.vo.863244/" className='none'>Facebook</a></div>
                    <div><a href="https://www.facebook.com/tri.vo.863244/" className='none'>Facebook</a></div>
                    <div><a href="https://www.facebook.com/tri.vo.863244/" className='none'>Facebook</a></div>


                </div>
                
            </div>
            <div className='ngang'></div>
            <div className='footer_last'>
                <div className="left">
                    <h3>Công Ty Cổ Phần Dược Phẩm Medicine PTIT</h3>
                    <div>Địa chỉ: 12 Hoàng Quốc Việt</div>
                    <div>Điện thoại: 1800 6821 - Email: cskh@medicineapp.vn</div>
                </div>
                <div className="right">
                    <div>GCNDKDN: 0311770883 do sở KH & ĐT Hà Nội cấp lần đầu ngày 05/05/2024.</div>
                    <div>GCNDDKKDD: 6782/DDKKDDD-ĐNai ngày cấp 26/4/2022 Sở Y Tế Thành phố Hà Nội

                </div>
                </div>
            </div>
        </div>

    )
}
export default Footer;