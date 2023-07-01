// import axios from 'axios';
// import { initializeApp } from 'firebase/app';
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { useRouter } from 'next/router';


// const handleVerifyOtp = async (account) => {
//     const btn_confirm = document.querySelector('.verify_otp');
//     const partitioned = document.querySelector('#partitioned');
//     if (!btn_confirm.classList.contains('confirm_otp')) {
//         try {
//             const response = await axios.post('http://43.239.223.142:9000/api/users/TakeDataFireBaseOTP', { number: account });
//             const data = await response;
//             if (data && data.data && data.data.data && data.data.data.firebase) {
//                 const firebaseConfig = data.data.data.firebase;
//                 // khởi tạo cấu hình firebase
//                 const app = initializeApp(firebaseConfig);
//                 // hàm tạo captcha
//                 const generateRecaptcha = () => {
//                     window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//                         'size': 'normal',
//                         'callback': (response) => {
//                         }
//                     }, getAuth(app));
//                     recaptchaVerifier.render();
//                     const nhanMa = document.querySelector('.nhan_ma');
//                     if (nhanMa) {
//                         nhanMa.remove();
//                     }
//                     const text = document.querySelector('.change_text');
//                     if (text) {
//                         text.innerHTML = '';
//                     }

//                 }
//                 generateRecaptcha();
//                 // hàm gửi otp 
//                 let appVerifier = window.recaptchaVerifier;
//                 signInWithPhoneNumber(getAuth(app), '+84' + account, appVerifier)
//                     .then((confirmationResult) => {
//                         window.confirmationResult = confirmationResult;
//                         const text = document.querySelector('.change_text');
//                         if (text) {
//                             text.innerHTML = 'Nhập mã OTP được gửi về điện thoại của bạn';
//                         }
//                         const recaptchaContainer = document.getElementById('recaptcha-container');
//                         if (recaptchaContainer) {
//                             recaptchaContainer.innerHTML = '';
//                         }
//                         partitioned.classList.remove('hidden_t');
//                         const guiMa = document.querySelector('.gui_ma');
//                         const guiLai = document.querySelector('.gui_lai_otp');
//                         guiLai.classList.remove('hidden');
//                         guiMa.classList.remove('hidden');
//                     }).catch((error) => {
//                         console.log(error)
//                     });
//             } else {
//                 alert('Bạn đã sử dụng hết lượt OTP nhận được trong ngày. Vui lòng liên hệ với tổng đài để được hỗ trợ hoặc trở lại vào ngày hôm sau!');
//             }
//         } catch (error) {
//             alert(error.message);
//         }
//     }
//     // Xác thực OTP
//     else {
//         try {
//             confirmationResult.confirm(account).then((result) => {
//                 alert('Xác thực thành công')
//                 router.replace('/');
//             }).catch((error) => {
//                 alert('Mã OTP không khớp, vui lòng thử lại!')
//                 // $('.txt_nd_modal').html('Mã OTP không khớp, vui lòng thử lại!');
//                 // $('.modal_tbcc .nd_modal').css("width", "420px");
//                 // $('.modal_tbcc').show();
//             });
//         } catch (error) {
//             console.error(error);
//         }

//     }
// };

// export default handleVerifyOtp;
import React from 'react';
import Head from "next/head";
import handleVerifyOtp from '../utils/firebaseEvents';
import Cookies from "js-cookie";

export default function xac_thuc_otp_nhan_vien() {
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
                    <title>Trang xác thực mã OTP nhân viên</title>
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
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
        </>
    )
};