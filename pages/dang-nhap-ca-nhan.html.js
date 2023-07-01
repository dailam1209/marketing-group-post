import React from "react"
import Head from "next/head";
import { useForm } from 'react-hook-form';
import callApi from './api/call_api';
import Link from 'next/link'
import Cookies from "js-cookie";

export default function LoginPersonal() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        let response = await callApi.loginPersonal(data);
        if (response.data && response.data.data && response.data.data.data.access_token) {
            Cookies.set('acc_token', response.data.data.data.access_token);
            Cookies.set('rf_token', response.data.data.data.refresh_token);
            Cookies.set('role', 3);
            window.location.href = '/quan-ly-ung-dung-ca-nhan.html';
        }
        else {
            alert(response)
        }
    }
    const loginByAccount = () => {
        const loginByAcc = document.querySelector('.account');
        loginByAcc.classList.remove('dbn');
        const btnAcc = document.querySelector('.login_tk');
        btnAcc.classList.add('active');
        const LoginByqr = document.querySelector('.scan_qr');
        LoginByqr.classList.add('dbn');
        const btnQr = document.querySelector('.lg_qr');
        btnQr.classList.remove('active');
    }
    const loginByQr = () => {
        const loginByAcc = document.querySelector('.account');
        loginByAcc.classList.add('dbn');
        const btnAcc = document.querySelector('.login_tk');
        btnAcc.classList.remove('active');
        const LoginByqr = document.querySelector('.scan_qr');
        LoginByqr.classList.remove('dbn');
        const btnQr = document.querySelector('.lg_qr');
        btnQr.classList.add('active');
    }
    const helper_login = () => {
        const hidden_help = document.querySelector('.popup_helper_qr');
        hidden_help.classList.remove('dbn');
    }
    return (
        <>
            <>
                <title>
                    Thành công trong tầm với, chuyển đổi số cùng quanlychung.timviec365.vn ngay
                </title>
                <meta
                    name="description"
                    content="Cơ hội phát triển bản thân cực lớn nằm ngay trong hệ sinh thái chuyển đổi số của timviec365.vn. Truy cập, trải nghiệm để vạch ra kế hoạch chuyển đổi số hiệu quả nhé."
                />
                <meta
                    property="og:title"
                    content="Thành công trong tầm với, chuyển đổi số cùng quanlychung.timviec365.vn ngay"
                />
                <meta
                    property="og:description"
                    content="Cơ hội phát triển bản thân cực lớn nằm ngay trong hệ sinh thái chuyển đổi số của timviec365.vn. Truy cập, trải nghiệm để vạch ra kế hoạch chuyển đổi số hiệu quả nhé."
                />
                <meta
                    property="og:url"
                    content="https://quanlychung.timviec365.vn/dang-nhap-ca-nhan.html"
                />
                <meta
                    property="og:image:url"
                    content="https://quanlychung.timviec365.vn/img/bgr_nentang.png"
                />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="vi_VN" />
                <link
                    rel="canonical"
                    href="https://quanlychung.timviec365.vn/dang-nhap-ca-nhan.html"
                />
                <meta charSet="UTF-8" />
                <meta name="robots" content="index,follow" />
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
                <link rel="preload" as="style" href="../css/login_qr.css" />
                <link
                    rel="stylesheet"
                    media="all"
                    href="../css/login_qr.css"
                    onload="if (media != 'all')media='all'"
                />
            </>
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
                                <a
                                    href="login"
                                    className="share_fsize_one share_clr_four"
                                >
                                    Quay lại
                                </a>
                            </div>
                            <div className="form_dangnhap">
                                <div className="ctn_dangnhap">
                                    <div className="cont_dangnhap">
                                        <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                                            Đăng nhập nền tảng chuyển đổi số chất lượng, bắt trọn cơ hội
                                            phát triển
                                        </h1>
                                        <p className="error_lg hidden tex_center share_fsize_three">
                                            Thông tin tài khoản hoặc mật khẩu không chính xác
                                        </p>
                                        <div className="box_select_type">
                                            <button className="select_login lg_qr active" onClick={loginByQr}>
                                                QUÉT MÃ QR
                                            </button>
                                            <div className="line" />
                                            <button className="select_login login_tk" onClick={loginByAccount}>
                                                TÀI KHOẢN<span className="text">(email)</span>
                                            </button>
                                        </div>
                                        <form className="share_distance form_vali form_login_staff account form_tk dbn " onSubmit={handleSubmit(onSubmit)} >
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Tài khoản đăng nhập <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="dn_mail"
                                                    name="email"
                                                    placeholder="Nhập email hoặc số điện thoại"
                                                    {...register("email", {
                                                        required: "Tài khoản đăng nhập không được để trống",
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
                                                    Mật khẩu <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    id="pass_field"
                                                    placeholder="Nhập mật khẩu"
                                                    {...register("password", {
                                                        required: "Tài khoản đăng nhập không được để trống",

                                                    })}
                                                />
                                                {errors.password && <label className="error">Mật khẩu không được để trống</label>}
                                            </div>
                                            <div className="qmk_login">
                                                <p className="tex_right">
                                                    <a
                                                        href="quen_mat_khau"
                                                        className="share_clr_four share_fsize_three cr_weight"
                                                    >
                                                        Quên mật khẩu?
                                                    </a>
                                                </p>
                                            </div>
                                            <div className="form_button">
                                                <input
                                                    // type="button"
                                                    type="submit"
                                                    className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor btn_luu"
                                                    defaultValue="Đăng nhập"
                                                />
                                            </div>
                                            <p className="tex_center cr_weight share_fsize_three no_login">
                                                Bạn chưa có tài khoản?{" "}
                                                <Link href="/registerPerson">Đăng ký ngay</Link>
                                            </p>
                                        </form>

                                        <div className="login_qr scan_qr ">
                                            <div
                                                className="qrcode"
                                                id="qrcode"
                                                title='{"QRType":"QRLoginPc","idQR":"YTEyNjM0MmMtZjk1NS00YzkyLTgxOGQtMjhjNzM1ZGJkNWM5++","IdComputer":"a126342c-f955-4c92-818d-28c735dbd5c9","NameComputer":"Chrome, version: 113.0.0.0","latitude":"","longitude":"","Time":"29/5/2023 22:39"}'
                                            >
                                                <canvas width={185} height={185} style={{ display: "none" }} />
                                                <img
                                                    style={{ display: "block" }}
                                                    src="data:image/png;base64,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"
                                                />
                                            </div>
                                            <p className="text_qr">Sử dụng ứng dụng Chat365 để quét mã QR</p>
                                            <button type="button" className="help_qr" onClick={helper_login}>Hướng dẫn quét</button>
                                        </div>
                                        <div className="popup popup_helper_qr dbn" >
                                            <div className="content_body">
                                                <button type="button" className="btn_close">
                                                    <span className="cl_c" aria-hidden="true">
                                                        ×
                                                    </span>
                                                </button>
                                                <p className="title_popup">Hướng dẫn quét QR{/*ơ*/}</p>
                                                <div
                                                    className="img_qr"
                                                    id="qrcode_popup"
                                                    title='{"QRType":"QRLoginPc","idQR":"YTEyNjM0MmMtZjk1NS00YzkyLTgxOGQtMjhjNzM1ZGJkNWM5++","IdComputer":"a126342c-f955-4c92-818d-28c735dbd5c9","NameComputer":"Chrome, version: 113.0.0.0","latitude":"","longitude":"","Time":"30/5/2023 0:8"}'
                                                >
                                                    <canvas width={185} height={185} style={{ display: "none" }} />
                                                    <img
                                                        src="data:image/png;base64,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"
                                                        style={{ display: "block" }}
                                                    />
                                                </div>
                                                <div className="ct_list ">
                                                    <div className="item_l">
                                                        <div className="cicle_list">1</div>
                                                        <p>Đăng nhập ứng dụng Chat365 trên điện thoại của bạn</p>
                                                    </div>
                                                    <div className="item_l">
                                                        <div className="cicle_list">2</div>
                                                        <p>
                                                            <span>Tại ứng dụng chọn biểu tượng</span>{" "}
                                                            <span>
                                                                <img
                                                                    style={{ marginBottom: "-5px" }}
                                                                    src="/img/qr-code.png"
                                                                    alt="QR core"
                                                                />
                                                            </span>
                                                            <span>Trên thanh tìm kiếm</span>
                                                        </p>
                                                    </div>
                                                    <div className="item_l">
                                                        <div className="cicle_list">3</div>
                                                        <p>Di chuyển Camera đến mã QR trên màn hình máy tính để đăng nhập</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ----- model popup hướng dẫn ----- */}
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />

            </>

        </>)
}