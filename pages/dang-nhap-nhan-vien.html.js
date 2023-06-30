import React from 'react';
import Head from "next/head";
import callApi from '../pages/api/call_api';
import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";

export default function loginEmployee() {
    // xử lý validate
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const validatePhone = (value) => {
        if (value) {
            return /^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/i.test(value);
        }
        return true;
    };

    const onSubmit = async data => {
        let response = await callApi.loginEmployee(data);
        if(response.data && response.data.data && response.data.data.result == true) {
            Cookies.set('access_token', response.data.data.data.access_token);
            window.location.href = "/";
        } else {
            alert(response)
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
                <div className="content_ql">
                    <div className="ctn_content">
                        <div className="left_bgr_nv">
                            <div className="bgr_img_nv">
                                <picture>
                                    <img src="../img/bgr_nua.png" alt="" />
                                </picture>
                            </div>
                        </div>
                        <div className="right_bgr_nv">
                            <div className="tro_lai">
                                <a href="lua-chon-dang-nhap.html" className="share_fsize_one share_clr_four">Quay lại</a>
                            </div>
                            <div className="form_dangnhap">
                                <div className="ctn_dangnhap">
                                    <div className="cont_dangnhap">
                                        <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">Cùng doanh nghiệp chuyển đổi số, phát triển bản thân, gây dựng tập thể</h1>
                                        <p className="error_lg hidden tex_center share_fsize_three">Thông tin tài khoản hoặc mật khẩu không chính xác</p>
                                        <div className="box_select_type">
                                            <button className="select_login lg_qr active">QUÉT MÃ QR</button>
                                            <div className="line"></div>
                                            <button className="select_login login_tk">TÀI KHOẢN<span className="text">(email)</span></button>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)} className="share_distance form_vali form_login_staff form_tk">
                                            <div className="form-group">
                                                <label name="form_label share_fsize_three share_clr_one cr_weight">
                                                    Tài khoản đăng nhập <span className="cr_red">*</span>
                                                </label>
                                                <input type="text" className="form-control" id="phone" name="phone" placeholder="Nhập số điện thoại" {...register("phoneTK", {
                                                    required: 'Tài khoản không được để trống',
                                                    validate: {
                                                        validatePhone: (value) => validatePhone(value) || "Hãy nhập đúng định dạng số điện thoại"
                                                    }
                                                })} />
                                                {errors && errors.phoneTK && <label className="error">{errors.phoneTK.message}</label>}
                                            </div>
                                            <div className="form-group">
                                                <label name="form_label share_fsize_three share_clr_one cr_weight">
                                                    Mật khẩu <span className="cr_red">*</span>
                                                </label>
                                                <input type="password" className="form-control" name="password" id="pass_field" placeholder="Nhập mật khẩu" {...register('password', {
                                                    required: 'Mật khẩu không được để trống',
                                                })} />
                                                {errors && errors.password && <label className="error">{errors.password.message}</label>}
                                            </div>
                                            <div className="qmk_login">
                                                <p className="tex_right">
                                                    <a href="quen-mat-khau.html?type=1" className="share_clr_four share_fsize_three cr_weight">
                                                        Quên mật khẩu?</a>
                                                </p>
                                            </div>
                                            <div className="form_button">
                                                <input type="submit" className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor btn_luu" value="Đăng nhập" />
                                            </div>
                                            <p className="tex_center cr_weight share_fsize_three no_login">
                                                Bạn chưa có tài khoản? <a href="/dang-ky-nhan-vien.html">Đăng ký ngay</a></p>
                                        </form>

                                        <div className="login_qr scan_qr">
                                            <div className="qrcode" id="qrcode">

                                            </div>
                                            <p className="text_qr">Sử dụng ứng dụng Chat365 để quét mã QR</p>
                                            <button className="help_qr">Hướng dẫn quét</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* model popup hướng dẫn */}
                <div className="popup popup_helper_qr" style={{ display: 'none' }}>
                    <div className="content_body">
                        <button type="button" className="btn_close">
                            <span className="cl_c" aria-hidden="true">&times;</span>
                        </button>
                        <p className="title_popup">Hướng dẫn quét QR</p>
                        <div className="img_qr" id="qrcode_popup">

                        </div>
                        <div className="ct_list">
                            <div className="item_l">
                                <div className="cicle_list">1</div>
                                <p>Đăng nhập ứng dụng Chat365 trên điện thoại của bạn</p>
                            </div>
                            <div className="item_l">
                                <div className="cicle_list">2</div>
                                <p><span>Tại ứng dụng chọn biểu tượng</span> <span><img style={{ marginbottom: "-5px" }} src="/images/login_qr/qr-code.png" alt="QR core" /></span><span>Trên thanh tìm kiếm</span></p>
                            </div>
                            <div className="item_l">
                                <div className="cicle_list">3</div>
                                <p>Di chuyển Camera đến mã QR trên màn hình máy tính để đăng nhập</p>
                            </div>
                        </div>
                    </div>
                </div>
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
        </>

    )
};
