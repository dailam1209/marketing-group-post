import React from "react"
import Footer from "../components/footer/Footer"
import Seo from '../components/head'
import Header from "../components/header/Header"
import { CheckLogin2 } from "../utils/function"
import { getServerSideProps } from '../utils/function'

export { getServerSideProps }
export default function register() {

    return (
        <>
            <Seo
                seo='true'
                url='https://quanlychung.timviec365.vn/lua-chon-dang-nhap.html'
                title='Chuyển đổi số tại timviec365.vn giúp tối ưu công việc hiệu quả'
                des='Đăng nhập để trải nghiệm nhiêu phần mềm, ứng dụng tiện ích lớn như tính lương, chấm công, quản trị nhân sự, đánh giá năng lực, ... tại hệ thống chuyển đổi số 365.'
            />
            <Header></Header>
            <div className="content_ql ctn_bgr_body">
                <div className="content_nv log_reg">
                    <div className="container">
                        <div className="form_log">
                            <div className="titl_log tex_center">
                                <h1 className="share_clr_tow cr_weight_bold h1">
                                    Vô vàn ứng dụng tiện ích tại hệ thống chuyển đổi số hàng đầu Việt Nam
                                </h1>
                                <p className="share_clr_tow share_fsize_tow">
                                    Để tiếp tục đăng nhập bạn vui lòng chọn loại tài khoản.
                                </p>
                            </div>
                            <div className="titl_form">
                                <div className="ctn_log_butt">
                                    <a href="/dang-nhap-cong-ty.html" className="ct_butt">
                                        <div className="titl_del">
                                            <p className="share_fsize_tow cr_weight">Công ty</p>
                                            <p className="share_fsize_one share_clr_three">
                                                Tài khoản công ty
                                            </p>
                                        </div>
                                    </a>
                                    <a href="/dang-nhap-nhan-vien.html" className="nv_butt">
                                        <div className="titl_del">
                                            <p className="share_fsize_tow cr_weight">Nhân viên</p>
                                            <p className="share_fsize_one share_clr_three">
                                                Tài khoản nhân viên
                                            </p>
                                        </div>
                                    </a>
                                    <a href="/dang-nhap-ca-nhan.html" className="nv_butt">
                                        <div className="titl_del">
                                            <p className="share_fsize_tow cr_weight">Cá nhân</p>
                                            <p className="share_fsize_one share_clr_three">
                                                Tài khoản cá nhân
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            <Footer></Footer>
        </>)
};
