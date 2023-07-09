import { React, useState, useEffect } from "react"
import Seo from '../components/head'
import { CheckLogin } from "../utils/function"
import QlNhanluc from "../components/ql_nhanluc"
import QlCongviec from "../components/ql_congviec"
import QlNoibo from "../components/ql_noibo"
import QlBanhang from "../components/ql_banhang"
import QlConlai from "../components/ql_conlai"

export default function Home() {
    CheckLogin()

    const [show, setShow] = useState('all')
    const [active, setActive] = useState('all')

    const showAll = () => {
        setShow('all')
        setActive('all')
    }
    const showNhanluc = () => {
        setShow('nhan_luc')
        setActive('nhan_luc')
    }
    const showCongviec = () => {
        setShow('cong_viec')
        setActive('cong_viec')
    }
    const showNoibo = () => {
        setShow('noi_bo')
        setActive('noi_bo')
    }
    const showBanhang = () => {
        setShow('ban_hang')
        setActive('ban_hang')
    }


    return (
        <>
            <Seo
                seo='true'
                title='Trang chủ Quản Lý Chung Chuyển đổi số 365'
                des='Trang quản lý chung Chuyển đổi số 365. Quản lý các phần mềm, tiện ích trong hệ thống chuyển đổi số 365'
                url='quanlychung.timviec365.vn'
            />
            <div className="content_ql">
                <div className="cnt_ttone">
                    <div className="one_bod_td">
                        <div className="container">
                            <h2 className="share_clr_one cr_weight_bold tex_center h_share">
                                Hệ thống phần mềm chuyển đổi số 365
                            </h2>
                            <p className="tieu_de share_clr_one tex_center">
                                Tích hợp tất cả các ứng dụng doanh nghiệp của bạn đang cần trên cùng
                                một nền tảng duy nhất.
                            </p>
                        </div>
                    </div>
                    <div className="cnt_count_tab">
                        <div className="cnt_counts_one">
                            <div className="cnt_counts">
                                <label
                                    htmlFor=""
                                    className={`pmc_all ${(active == 'all') ? 'active' : ''}`}
                                    data-tab="list_detl_one"
                                >
                                    <p className="share_fsize_three share_clr_one tex_center share_cursor" onClick={showAll}>
                                        Tất cả
                                    </p>
                                </label>
                            </div>
                            <div className="cnt_counts">
                                <label htmlFor="" className={`pmc_all ${(active == 'nhan_luc') ? 'active' : ''}`} data-tab="list_detl_two">
                                    <p className="share_fsize_three share_clr_one tex_center share_cursor" onClick={showNhanluc}>
                                        Quản lý nhân lực
                                    </p>
                                </label>
                            </div>
                            <div className="cnt_counts">
                                <label htmlFor="" className={`pmc_all ${(active == 'cong_viec') ? 'active' : ''}`} data-tab="list_detl_three">
                                    <p className="share_fsize_three share_clr_one tex_center share_cursor" onClick={showCongviec}>
                                        Quản lý công việc
                                    </p>
                                </label>
                            </div>
                        </div>
                        <div className="cnt_counts_tow">
                            <div className="cnt_counts">
                                <label htmlFor="" className={`pmc_all ${(active == 'noi_bo') ? 'active' : ''}`} data-tab="list_detl_four">
                                    <p className="share_fsize_three share_clr_one tex_center share_cursor" onClick={showNoibo}>
                                        Quản lý nội bộ
                                    </p>
                                </label>
                            </div>
                            <div className="cnt_counts">
                                <label htmlFor="" className={`pmc_all ${(active == 'ban_hang') ? 'active' : ''}`} data-tab="list_detl_five">
                                    <p className="share_fsize_three share_clr_one tex_center share_cursor" onClick={showBanhang}>
                                        Quản lý bán hàng
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="cnt_count_detail tab_active">
                        <div className="container">
                            <div className="detal_titl">
                                {
                                    (show == 'all') ? (
                                        <>
                                            <QlConlai />
                                            <QlNhanluc />
                                            <QlCongviec />
                                            <QlNoibo />
                                            <QlBanhang />
                                        </>
                                    ) : ''

                                }
                                {
                                    (show == 'nhan_luc') ? (
                                        <>
                                            <QlNhanluc />
                                        </>
                                    ) : ''
                                }
                                {
                                    (show == 'cong_viec') ? (
                                        <>
                                            <QlCongviec />
                                        </>
                                    ) : ''
                                }
                                {
                                    (show == 'noi_bo') ? (
                                        <>
                                            <QlNoibo />
                                        </>
                                    ) : ''
                                }
                                {
                                    (show == 'ban_hang') ? (
                                        <>
                                            <QlBanhang />
                                        </>
                                    ) : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ctn_tttow">
                    <div className="container">
                        <div className="ctn_mr">
                            <div className="tow_bod_bgr">
                                <div className="img_bgr">
                                    <img
                                        src="../img/bgr_nentang.png"
                                        alt="Trang chủ Quản Lý Chung Chuyển đổi số 365"
                                    />
                                </div>
                            </div>
                            <div className="one_bod_td">
                                <h2 className="ntq_titl tex_left share_clr_one h_share">
                                    Nền tảng quản trị doanh nghiệp phổ biến nhất
                                </h2>
                                <p className="ntq_titlp share_clr_one">
                                    <span className="cr_weight">Chuyển đổi số 365</span> là nền tảng
                                    quản trị doanh nghiệp phổ biến, được tin dùng bởi hơn 10,000 doanh
                                    nghiệp thuộc nhiều lĩnh vực khác nhau. Hầu hết các doanh nghiệp
                                    dẫn đầu thị trường và các công ty tăng trưởng nhanh đang dùng một
                                    trong số các sản phẩm của{" "}
                                    <span className="cr_weight">chuyển đổi số 365</span>
                                </p>
                                <p className="ntq_titlp share_clr_one">
                                    Tất cả các ứng dụng trên{" "}
                                    <span className="cr_weight">Chuyển đổi số 365</span> có thể sử
                                    dụng dễ dàng trên trình duyệt, smartphone (iOS, Android), máy tính
                                    bảng, hoặc cài đặt trên máy tính để bàn.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ctn_ttthree">
                    <div className="container">
                        <div className="one_bod_td three_bod_td">
                            <h2 className="share_clr_one cr_weight_bold tex_center h_share">
                                Hệ sinh thái phục vụ doanh nghiệp
                            </h2>
                        </div>
                        <div className="cnt_count_detail">
                            <div className="list_detl">
                                <div className="detal_titl">
                                    <div className="ctn_detl_one">
                                        <a
                                            rel="nofollow"
                                            href="https://nhatro.timviec365.vn"
                                            className="pmc_detl_one"
                                            target="_blank"
                                        >
                                            <div className="pcm_detl_img tex_center">
                                                <img src="../img/nha-tro.png" alt="tìm nhà trọ" />
                                            </div>
                                            <div className="pcm_detl_titl">
                                                <h4 className="share_clr_four cr_weight_bold tex_left">
                                                    Tìm nhà trọ
                                                </h4>
                                                <p className="share_clr_one tex_left share_fsize_one">
                                                    Giải pháp tìm phòng trọ, người thuê trọ nhanh chóng, miễn
                                                    phí.
                                                </p>
                                            </div>
                                            <div className="pcn_delt_hrf">
                                                <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                                                    Xem chi tiết{" "}
                                                    <span>
                                                        {" "}
                                                        <img src="../img/detl_bgr.png" alt="" />
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="ctn_detl_one">
                                        <a
                                            rel="nofollow"
                                            href="https://freelancer.timviec365.vn/"
                                            className="pmc_detl_one"
                                            target="_blank"
                                        >
                                            <div className="pcm_detl_img tex_center">
                                                <img src="../img/viec-lam-tu-do.png" alt="Việc làm tự do" />
                                            </div>
                                            <div className="pcm_detl_titl">
                                                <h4 className="share_clr_four cr_weight_bold tex_left">
                                                    Việc làm tự do
                                                </h4>
                                                <p className="share_clr_one tex_left share_fsize_one">
                                                    Cập nhật hàng triệu việc làm tự do với mức lương hấp dẫn.
                                                </p>
                                            </div>
                                            <div className="pcn_delt_hrf">
                                                <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                                                    Xem chi tiết{" "}
                                                    <span>
                                                        {" "}
                                                        <img src="../img/detl_bgr.png" alt="" />
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="ctn_detl_one">
                                        <a
                                            rel="nofollow"
                                            href="https://vieclamtheogio.timviec365.vn"
                                            className="pmc_detl_one"
                                            target="_blank"
                                        >
                                            <div className="pcm_detl_img tex_center">
                                                <img
                                                    src="../img/viec-lam-theo-gio.png"
                                                    alt="Việc làm theo giờ"
                                                />
                                            </div>
                                            <div className="pcm_detl_titl">
                                                <h4 className="share_clr_four cr_weight_bold tex_left">
                                                    Việc làm theo giờ
                                                </h4>
                                                <p className="share_clr_one tex_left share_fsize_one">
                                                    Việc làm theo giờ với kho tin tuyển dụng đa dạng, mức
                                                    lương hấp dẫn.
                                                </p>
                                            </div>
                                            <div className="pcn_delt_hrf">
                                                <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                                                    Xem chi tiết{" "}
                                                    <span>
                                                        {" "}
                                                        <img src="../img/detl_bgr.png" alt="" />
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="ctn_detl_one">
                                        <a
                                            rel="nofollow"
                                            href="https://giasu.timviec365.vn/"
                                            className="pmc_detl_one"
                                            target="_blank"
                                        >
                                            <div className="pcm_detl_img tex_center">
                                                <img src="../img/gia-su.png" alt="Gia sư" />
                                            </div>
                                            <div className="pcm_detl_titl">
                                                <h4 className="share_clr_four cr_weight_bold tex_left">
                                                    Gia sư
                                                </h4>
                                                <p className="share_clr_one tex_left share_fsize_one">
                                                    Kết nối với gia sư đa môn học, ở mọi tỉnh thành, dễ dàng,
                                                    nhanh chóng.
                                                </p>
                                            </div>
                                            <div className="pcn_delt_hrf">
                                                <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                                                    Xem chi tiết{" "}
                                                    <span>
                                                        {" "}
                                                        <img src="../img/detl_bgr.png" alt="" />
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="ctn_detl_one">
                                        <a
                                            rel="nofollow"
                                            href="#"
                                            className="pmc_detl_one"
                                            target="_blank"
                                        >
                                            <div className="pcm_detl_img tex_center">
                                                <img src="../img/khoa-hoc.png" alt="Khóa học" />
                                            </div>
                                            <div className="pcm_detl_titl">
                                                <h4 className="share_clr_four cr_weight_bold tex_left">
                                                    Khóa học
                                                </h4>
                                                <p className="share_clr_one tex_left share_fsize_one">
                                                    Cập nhật liên tục các khóa học đa dạng môn học từ offline
                                                    và online.
                                                </p>
                                            </div>
                                            <div className="pcn_delt_hrf">
                                                <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                                                    Xem chi tiết{" "}
                                                    <span>
                                                        {" "}
                                                        <img src="../img/detl_bgr.png" alt="" />
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="ctn_detl_one">
                                        <a
                                            href="https://timviec365.vn/trang-vang-doanh-nghiep.html"
                                            className="pmc_detl_one"
                                            target="_blank"
                                        >
                                            <div className="pcm_detl_img tex_center">
                                                <img
                                                    src="../img/trang-vang-mien-phi.png"
                                                    alt="Trang vàng miễn phí"
                                                />
                                            </div>
                                            <div className="pcm_detl_titl">
                                                <h4 className="share_clr_four cr_weight_bold tex_left">
                                                    Trang vàng miễn phí
                                                </h4>
                                                <p className="share_clr_one tex_left share_fsize_one">
                                                    Cung cấp danh bạ của tất cả các công ty lớn nhỏ trên toàn
                                                    quốc.
                                                </p>
                                            </div>
                                            <div className="pcn_delt_hrf">
                                                <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                                                    Xem chi tiết{" "}
                                                    <span>
                                                        {" "}
                                                        <img src="../img/detl_bgr.png" alt="" />
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="ctn_detl_one">
                                        <a
                                            href="https://timviec365.vn/ssl/so-sanh-luong.html"
                                            className="pmc_detl_one"
                                            target="_blank"
                                        >
                                            <div className="pcm_detl_img tex_center">
                                                <img src="../img/tra-cuu-luong.png" alt="Tra cứu lương" />
                                            </div>
                                            <div className="pcm_detl_titl">
                                                <h4 className="share_clr_four cr_weight_bold tex_left">
                                                    Tra cứu lương
                                                </h4>
                                                <p className="share_clr_one tex_left share_fsize_one">
                                                    Tra cứu thông tin lương theo vị trí công việc chính xác,
                                                    nhanh chóng.
                                                </p>
                                            </div>
                                            <div className="pcn_delt_hrf">
                                                <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                                                    Xem chi tiết{" "}
                                                    <span>
                                                        {" "}
                                                        <img src="../img/detl_bgr.png" alt="" />
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="ctn_detl_one">
                                        <a
                                            href="https://raonhanh365.vn/"
                                            className="pmc_detl_one"
                                            rel="nofollow"
                                            target="_blank"
                                        >
                                            <div className="pcm_detl_img tex_center">
                                                <img src="../img/rao-vat.png" alt="Rao vặt" />
                                            </div>
                                            <div className="pcm_detl_titl">
                                                <h4 className="share_clr_four cr_weight_bold tex_left">
                                                    Rao vặt
                                                </h4>
                                                <p className="share_clr_one tex_left share_fsize_one">
                                                    Đăng tải thông tin rao vặt miễn phí, cập nhật liên tục mỗi
                                                    ngày.
                                                </p>
                                            </div>
                                            <div className="pcn_delt_hrf">
                                                <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                                                    Xem chi tiết{" "}
                                                    <span>
                                                        {" "}
                                                        <img src="../img/detl_bgr.png" alt="" />
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="ctn_detl_one">
                                        <a
                                            href="https://hunghabay.vn/"
                                            className="pmc_detl_one"
                                            rel="nofollow"
                                            target="_blank"
                                        >
                                            <div className="pcm_detl_img tex_center">
                                                <img src="../img/ve-may-bay.png" alt="Vé máy bay" />
                                            </div>
                                            <div className="pcm_detl_titl">
                                                <h4 className="share_clr_four cr_weight_bold tex_left">
                                                    Vé máy bay
                                                </h4>
                                                <p className="share_clr_one tex_left share_fsize_one">
                                                    Thỏa sức vi vu với kho vé máy bay nội địa, quốc tế với giá
                                                    rẻ bất ngờ.
                                                </p>
                                            </div>
                                            <div className="pcn_delt_hrf">
                                                <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                                                    Xem chi tiết{" "}
                                                    <span>
                                                        {" "}
                                                        <img src="../img/detl_bgr.png" alt="" />
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="ctn_detl_one">
                                        <a
                                            href="https://banthe24h.vn/"
                                            className="pmc_detl_one"
                                            rel="nofollow"
                                            target="_blank"
                                        >
                                            <div className="pcm_detl_img tex_center">
                                                <img src="../img/theo-cao.png" alt="Thẻ cào điện thoại" />
                                            </div>
                                            <div className="pcm_detl_titl">
                                                <h4 className="share_clr_four cr_weight_bold tex_left">
                                                    Thẻ cào điện thoại
                                                </h4>
                                                <p className="share_clr_one tex_left share_fsize_one">
                                                    Thẻ điện thoại đa dạng mệnh giá, an toàn, bảo mật cao.
                                                </p>
                                            </div>
                                            <div className="pcn_delt_hrf">
                                                <p className="share_fsize_three share_clr_four tex_center delt_see_pm">
                                                    Xem chi tiết{" "}
                                                    <span>
                                                        {" "}
                                                        <img src="../img/detl_bgr.png" alt="" />
                                                    </span>
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ctn_ttfour share_dnone">
                    <div className="container">
                        <div className="detail_four">
                            <h4 className="cds_titl share_clr_one cr_weight_bold">
                                Chuyển đổi số 365 là gì?
                            </h4>
                            <p className="cds_titl share_clr_one">
                                Ngay từ thời điểm doanh nghiệp hình thành,các thiết bị chấm công kết
                                hợp với việc điểm danh cơ học của nhân sự trở thành căn cứ tiêu biểu
                                giúp các công ty ghi lại được thời điểm đến làm việc, tan làm, nghỉ
                                phép của người lao động từ đó, tính công và lương, thưởng cho người
                                lao động vào cuối tháng một cách chính xác, đồng thời góp phần nâng
                                cao ý thức làm việc và kỷ luật của nhân viên tại nơi làm việc.
                            </p>
                            <div className="bgr_ima tex_center">
                                <img src="../img/bg_tran.jpg" alt="" />
                            </div>
                            <p className="title_bgr share_clr_one">Chuyển đổi số là gì?</p>
                        </div>
                    </div>
                </div>
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
        </>
    )
}

