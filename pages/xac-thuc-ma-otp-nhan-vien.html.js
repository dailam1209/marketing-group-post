import React from 'react';
import handleVerifyOtp from '../utils/firebaseEvents';
import Cookies from "js-cookie";
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import Head from '../components/head'

export default function AuthenticEp() {
    const onClickVerifyOtp = () => {
        const value = document.querySelector('.verify_otp');
        if (value.classList.contains('nhan_ma')) {
            let phone = Cookies.get('phone');
            handleVerifyOtp(phone);
        } else {
            var otp = document.querySelector('#partitioned').value;
            handleVerifyOtp(otp);
        }
    };
    return (
        <>
            <Head
            title = 'Trang xác thực mã OTP nhân viên'
            seo = ''
            />
            <Header/>
            <>
                <div className="content_ql ctn_bgr_body">
                    <div className="content_nv">
                        <div className="ctn_register_nv">
                            <form
                                action=""
                                className="regnv_form regnv_form_otp_nv"
                                method=""
                            >
                                <div className="tow_page_qmk">
                                    <div className="container">
                                        <div className="ctn_qmk">
                                            <div className="tow_reg_ql share_reg_log share_brd_radius share_bgr_tow ctn_register_nv">
                                                <div className="header_qmk">
                                                    <h3 className="share_clr_four cr_weight_bold tex_center">
                                                        Xác thực mã OTP
                                                    </h3>
                                                    <div className="qmk_avt_ic">
                                                        <img src="../img/three_ic_reg_nv.png" alt="" />
                                                    </div>
                                                </div>
                                                <p className="titl_form share_fsize_three share_clr_one tex_center change_text">
                                                    Vui lòng bấm "Nhận mã" để nhận mã xác thực về số điện thoại
                                                </p>
                                                <div className="center_form">
                                                    <div className="form-group">
                                                        <input
                                                            id="partitioned"
                                                            name="otp_nv"
                                                            maxLength={6}
                                                            placeholder=""
                                                            className="hidden_t"
                                                        />
                                                        <div id="recaptcha-container" className="recaptcha"></div>
                                                    </div>
                                                    <div className="gui_lai_otp hidden">
                                                        <p>
                                                            <span className="share_fsize_three share_clr_one">
                                                                Bạn chưa nhận được mã OTP?
                                                            </span>{" "}
                                                            <button
                                                                type="button"
                                                                className="share_clr_four cr_weight share_fsize_three share_cursor gui_lai"
                                                                data1={1}
                                                            >
                                                                Gửi lại
                                                            </button>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div id="recaptcha-container" className="recaptcha" />
                                                <div className="form-butt-one">
                                                    <input
                                                        type="button"
                                                        className="nhan_ma nhan_ma_2 share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one verify_otp otpSMS"
                                                        defaultValue="Nhận mã"
                                                        onClick={onClickVerifyOtp}
                                                    />
                                                    <input
                                                        type="button"
                                                        className="hidden gui_ma gui_otp share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one confirm_otp verify_otp otpSMS"
                                                        defaultValue="Tiếp tục"
                                                        onClick={onClickVerifyOtp}
                                                    />
                                                    {/* <p class="quay_lai tex_center share_clr_one share_cursor share_fsize_three">Quay lại</p> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <div className="f_xt_ntd">
                    <p>Mọi vấn đề cần hỗ trợ vui lòng liên hệ bộ phận CSKH <span>Timviec365.vn</span></p>
                    <p>Điện thoại: <span>0982.079.209</span></p>
                    <p>Gmail: <span>timviec365.vn@gmail.com</span></p>
                </div> */}
                {/* <div className="modal_tbcc">
                    <div className="nd_modal">
                        <div className="header_modal_tbcc">
                            <p>Timviec365.vn Thông báo</p> <img className="img_close_cc" src="/images/ic_close_cc.png" alt="" />
                        </div>
                        <div className="nd_modal_tbcc">
                            <p className="txt_nd_modal"></p>
                            <span className="close_modal_tbcc">Đóng</span>
                        </div>
                    </div>
                </div> */}
                <Footer/>
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
        </>
    )
};
