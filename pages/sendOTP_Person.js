
import React from 'react';
import Head from "next/head";
import handleVerifyOtp from '../utils/firebaseEvents';
import Cookies from "js-cookie";

export default function xac_thuc_otp_ca_nhan() {
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
            <Head>
                <>
                    <meta charSet="UTF-8" />
                    <meta name="robots" content="noindex,nofollow" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link href="https://timviec365.vn/favicon.ico" rel="shortcut icon" />
                    <link
                        rel="preload"
                        href="../fonts/Roboto-Bold.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="../fonts/Roboto-Medium.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="../fonts/Roboto-Regular.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link rel="preload" as="style" href="../css/style.css" />
                    <link
                        rel="stylesheet"
                        media="all"
                        href="../css/style.css"
                        onload="if (media != 'all')media='all'"
                    />
                    <title>Trang xác thực mã OTP cá nhân</title>
                </>
            </Head>
            <>
                <div className="content_ql ctn_bgr_body">
                    <div className="content_nv">
                        <div className="ctn_register_nv">
                            <form
                                action=""
                                // onSubmit="return false"
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
                                                        {/* <p>
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
                                                        </p> */}
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
                                                        className="nhan_ma share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one verify_otp otpSMS"
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

                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
        </>
    )
};
