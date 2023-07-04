import React from "react"
import Head from "../components/head";
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
    const closeGuild = () => {
        const close = document.querySelector('.popup_helper_qr');
        close.classList.add('dbn');
    }

    return (
        <>
            <Head
                seo='true'
                title='Thành công trong tầm với, chuyển đổi số cùng quanlychung.timviec365.vn ngay'
                des='Cơ hội phát triển bản thân cực lớn nằm ngay trong hệ sinh thái chuyển đổi số của timviec365.vn. Truy cập, trải nghiệm để vạch ra kế hoạch chuyển đổi số hiệu quả nhé.'
                url='https://quanlychung.timviec365.vn/dang-nhap-ca-nhan.html'
            />

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
                                                src="../img/qr_login.png"
                                            />
                                        </div>
                                        <p className="text_qr">Sử dụng ứng dụng Chat365 để quét mã QR</p>
                                        <button type="button" className="help_qr" onClick={helper_login}>Hướng dẫn quét</button>
                                    </div>
                                    {/* ----- model popup hướng dẫn ----- */}
                                    <div className="popup popup_helper_qr dbn" >
                                        <div className="content_body">
                                            <button type="button" className="btn_close" onClick={closeGuild}>
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
                                                <img src="../img/qr_login.png"
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
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />

        </>)
}