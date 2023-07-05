import React from "react"
import Header from "/components/header/Header";
import Footer from "/components/footer/Footer";
import Seo from '../components/head'
import { useForm } from 'react-hook-form';
import handleVerifyOtp from '../utils/firebaseEvents';
import Cookies from "js-cookie";
import { CheckLogin } from "../utils/function"


export default function info_xac_thuc_otp_mat_khau() {
    CheckLogin()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        //  window.location.href = "/login_person";
        let response = await callApi.registerPerson(data);
        alert(response);
        if (response.data && response.data.data && response.data.data.result == true) {
            Cookies.set('phone', data.phoneTK);
            window.location.href = "sendOTP_Person";
        } else {
            alert(response)
        }
    };
    return (
        <>
            <Seo
                seo=''
                title='Trang xác thực mã OTP quên mật khẩu'
            />

            <div className="content_ql ctn_bgr_body">
                <div className="content_nv">
                    <div className="container">
                        <div className="ctn_qmk">
                            <form action="" className="qmk_form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="one_page_qmk tow_reg_ql share_reg_log share_brd_radius share_bgr_tow">
                                    <div className="header_qmk">
                                        <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                                            Lấy lại mật khẩu tài khoản chuyển đổi số nhân viên cực dễ, cực
                                            an toàn
                                        </h1>
                                        <div className="qmk_avt_ic tex_center">
                                            <img src="../img/one_page_qmk.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="ctn_form share_distance">
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                Email hoặc số điện thoại đã đăng ký tài khoản{" "}
                                                <span className="cr_red">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                id="email_qmk"
                                                className="form-control"
                                                placeholder="Nhập email hoặc số điện thoại đăng ký tài khoản của bạn"

                                                {...register("email", {
                                                    required: "Không được để trống !",
                                                    pattern: {
                                                        value: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/,
                                                        message: "Nhập đúng định dạng email hoặc số điện thoại"

                                                    }
                                                })}
                                            />
                                            {errors.email && <label className="error">{errors.email.message}</label>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                Mã Captcha <span className="cr_red">*</span>
                                            </label>
                                            <img
                                                style={{ float: "right", paddingTop: 5, marginRight: 5 }}
                                                alt="captcha"
                                                src="../captcha/image.php?rand=' + Math.random())"
                                                id="img-captcha"
                                            />
                                            <input
                                                style={{ width: "calc(100% - 140px)" }}
                                                type="text"
                                                name="captcha"
                                                id="captcha_qmk"
                                                className="form-control"
                                                placeholder="Nhập mã Captcha"
                                                {...register("captcha", {
                                                    required: true,

                                                })}
                                            />
                                            {errors.captcha && <label className="error">Không được để trống !</label>}
                                        </div>
                                        <div className="form-butt-one">
                                            <input
                                                //type="button"
                                                type="submit"
                                                className=" verify_otp share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
                                                defaultValue="Tiếp tục"
                                            />
                                            <p className="bo_qua tex_center share_cursor" data={1}>
                                                <a className="share_fsize_three share_clr_one">Quay lại</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />

        </>
    )
}
