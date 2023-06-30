import React from "react"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
// import Link from "next/link"
import { useForm } from 'react-hook-form';
import callApi from '../pages/api/call_api';


export default function Home() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        //  window.location.href = "/person_sau_dang_nhap";
        data.com_id = 1;
        delete data.res_password;
        let response = await callApi.loginPerson(data);
        // console.log("respone " + response);
        alert(response);
        if (response.data && response.data.data && response.data.data.result == true) {
            Cookies.set('phone', data.phoneTK);
            window.location.href = "xac_thuc_otp_mat_khau";
        } else {
            alert(response)
        }
    }
    return (
        <>
            <>
                <title>Khôi phục ngay tài khoản với tính năng lấy lại mật khẩu dễ dàng</title>
                <meta
                    name="description"
                    content="Dễ dàng để Lấy lại mật khẩu cho tài khoản chuyển đổi số nhân viên khi bạn quên. Mật khẩu được khôi phục rất nhanh, đảm bảo quá trình sử dụng hiệu quả. "
                />
                <meta
                    property="og:title"
                    content="Khôi phục ngay tài khoản với tính năng lấy lại mật khẩu dễ dàng"
                />
                <meta
                    property="og:description"
                    content="Dễ dàng để Lấy lại mật khẩu cho tài khoản chuyển đổi số nhân viên khi bạn quên. Mật khẩu được khôi phục rất nhanh, đảm bảo quá trình sử dụng hiệu quả. "
                />
                <meta
                    property="og:url"
                    content="https://quanlychung.timviec365.vn/quen-mat-khau.html"
                />
                <meta
                    property="og:image:url"
                    content="https://quanlychung.timviec365.vn/img/bgr_banner.png"
                />
                <meta property="og:image:width" content={476} />
                <meta property="og:image:height" content={249} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="vi_VN" />
                <link
                    rel="canonical"
                    href="https://quanlychung.timviec365.vn/quen-mat-khau.html"
                />
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
            </>
            <>
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
                                        <div className="ctn_form share_distance"  >

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
                                                        required: "Không được để trống",
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
                                                    {...register("p", {
                                                        required: "Không được để trống",

                                                    })}
                                                />
                                                {errors.email && <label className="error">{errors.email.message}</label>}
                                            </div>
                                            <div className="form-butt-one">
                                                <input
                                                    //  type="button"
                                                    type="submit"
                                                    className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
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

        </>
    )
};