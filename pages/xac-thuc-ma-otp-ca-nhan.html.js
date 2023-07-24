import React, { useState } from 'react';
import handleVerifyOtp from '../utils/firebaseEvents';
import Cookies from "js-cookie";
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import Seo from '../components/head'
import { CheckLogin2 } from "../utils/function"
import { useRouter } from 'next/router';
import { infoPersonal } from '../utils/handleApi';
import { useEffect } from 'react';
import { getServerSideProps } from '../utils/function'

export { getServerSideProps }
export default function AuthenticPersonal() {
    CheckLogin2();
    const router = useRouter();
    const btnReSend = () => {
        router.reload();
    }
    const [textNhanMa, setNhanMa] = useState('Vui lòng bấm "Nhận mã" để nhận mã xác thực về số điện thoại');
    const onClickSendOtp = () => {
        setNhanMa(' Vui lòng nhập mã OTP gồm 6 chữ số được gửi về email hoặc số điện thoại đăng ký tài khoản!')
        handleVerifyOtp(true, Cookies.get('phone'), '');
    }

    const onClickVerifyOtp = () => {
        handleVerifyOtp(false, Cookies.get('phone'), document.querySelector('#partitioned').value);
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && Cookies.get('token_base365')) {
            const getData = async () => {
                try {
                    let response = await infoPersonal();
                    if (response.data.ep_authentic == 1) {
                        router.push('/quan-ly-ung-dung-ca-nhan.html');
                    }

                } catch (error) {
                    console.log('Error:', error);
                }
            };

            getData();
        }
    }, []);
    return (
        <>
            <Seo
                seo=''
                title='Trang xác thực mã OTP cá nhân'
            />
            <Header />
            <div className='register_ctnv sty_otp' id='otp_nv'>
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
                                                    {textNhanMa}
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
                                                                type="submit"
                                                                className="share_clr_four cr_weight share_fsize_three share_cursor gui_lai"
                                                                data1={1}
                                                                onClick={btnReSend}
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
                                                        onClick={onClickSendOtp}
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
            </div>
            <Footer />
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
        </>
    )
};
