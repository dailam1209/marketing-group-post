
import React, { useState } from "react"
import Header from "/components/header/Header";
import Footer from "/components/footer/Footer";
import Head from "next/head";
import Link from 'next/link'
import router from "../utils/router"
import Side_bar from "/components/person_login/sidebar";
import { useRouter } from 'next/navigation'
import axios from "axios";
import Cookies from "js-cookie";
import callApi from "./api/call_api";
import { useEffect } from "react";

export default function thong_tin_tai_khoan() {

    var token = Cookies.get("access_token");
    const [infoAcc, setInfoAcc] = useState({});

    const headers = {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    let data = {};
    axios.post("http://210.245.108.202:3000/api/qlc/individual/info", data, {
        headers: headers
    })
        .then((response) => {
            //  console.log(response.data.data.data._id);
            setInfoAcc(response.data.data.data);
        })
        .catch((error) => {
            console.log(error)
        })
    console.log();

    return (
        <>
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
                <link rel="preload" as="style" href="../css/dat.css" />
                <link
                    rel="stylesheet"
                    media="all"
                    href="../css/dat.css"
                    onload="if (media != 'all')media='all'"
                />
                <link rel="preload" as="style" href="../css/style.css" />
                <link
                    rel="stylesheet"
                    media="all"
                    href="../css/style.css"
                    onload="if (media != 'all')media='all'"
                />
                <title>Thông tin tài khoản nhân viên</title>
            </>
            <>
                <div id="tt_taikhoan_ct">
                    <div className="wrapper">
                        <div className="left_ql">
                            <div className="ctn_qly_left">
                                <div className="logo_qly">
                                    <div className="avt_qly">
                                        <a href="https://timviec365.vn/" target="_blank">
                                            <picture>
                                                <img src="../img/logo_qly.png" alt="timviec365.vn" />
                                            </picture>
                                        </a>
                                    </div>
                                </div>
                                <div className="nav_qly">
                                    <ul className="navbar-nav">
                                        <a href="person_sau_dang_nhap" className="nav-item ">
                                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                <span className="item_ic">
                                                    <img src="../img/ung-dung.png" alt="Ứng dụng" />
                                                </span>
                                                Ứng dụng
                                            </li>
                                        </a>
                                        <a
                                            href="quan-ly-thong-tin-tai-khoan-nhan-vien "
                                            className="nav-item active"
                                        >
                                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                <span className="item_ic">
                                                    <img
                                                        src="../img/qly-tttaikhoan.png"
                                                        alt="Thông tin tài khoản"
                                                    // onClick={Show_info}
                                                    />
                                                </span>
                                                Thông tin tài khoản
                                            </li>
                                        </a>
                                        <a href="quan-ly-thong-tin-viec-lam" className="nav-item ">
                                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                <span className="item_ic">
                                                    <img
                                                        src="../img/qly-ttvieclam.png"
                                                        alt="Thiết lập tài khoản nhân viên"
                                                    />
                                                </span>
                                                Thiết lập tài khoản nhân viên
                                            </li>
                                        </a>
                                    </ul>
                                </div>
                            </div>{" "}
                        </div>
                        <div className="right_ql">
                            <div className="header_rigth_qly">
                                <div className="ctn_header_qly">
                                    <div className="img_ic_mobi show_sidebar">
                                        <img src="../img/mobi_4.png" alt="" className="btx_header_nv" />
                                        <div className="menu_header">
                                            <div className="modal-content">
                                                <div className="ctn_ind share_bgr_one">
                                                    <div className="modal-body">
                                                        <div className="ind__header_one">
                                                            <div className="avt_log_head tex_center">
                                                                <img src="../img/logo.png" alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="ind-tow">
                                                            <div className="ctn_ulli">
                                                                <ul className="navbar-nav">
                                                                    <a
                                                                        href="quan-ly-ung-dung-nhan-vien.html"
                                                                        className="nav-item jhjh"
                                                                    >
                                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                                            <span className="item_ic">
                                                                                <img src="../img/ung-dung.png" alt="" />
                                                                            </span>
                                                                            Ứng dụng
                                                                        </li>
                                                                    </a>
                                                                    <a
                                                                        href="quan-ly-thong-tin-tai-khoan-nhan-vien.html"
                                                                        className="nav-item active"
                                                                    >
                                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                                            <span className="item_ic">
                                                                                <img src="../img/qly-tttaikhoan.png" alt="" />
                                                                            </span>
                                                                            Thông tin tài khoản
                                                                        </li>
                                                                    </a>
                                                                    <a
                                                                        href="quan-ly-thong-tin-viec-lam.html"
                                                                        className="nav-item "
                                                                    >
                                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                                            <span className="item_ic">
                                                                                <img
                                                                                    src="../img/qly-ttvieclam.png"
                                                                                    alt="Thiết lập tài khoản nhân viên"
                                                                                />
                                                                            </span>
                                                                            Thiết lập tài khoản nhân viên
                                                                        </li>
                                                                    </a>
                                                                    {/*                                 <a href="quan-ly-cai-dat-nhan-vien.html"
                              class="nav-item ">
                              <li class="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                  <span class="item_ic"><img src="../img/cai-dat.png" alt=""></span>
                                  Cài đặt
                              </li>
                          </a> */}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>{" "}
                                    <div className="left_header_qly">
                                        <p className="share_clr_one font_14">Thông tin tài khoản</p>
                                    </div>
                                    <div className="right_header_qly" id="header_qly_nv">
                                        <div className="ic_nhanh">
                                            <div className="img_ic share_cursor">
                                                <picture>
                                                    <source
                                                        media="(max-width:1024px)"
                                                        srcSet="../img/mobi_2.png"
                                                    />
                                                    <img
                                                        src="../img/mess-qly.png"
                                                        alt=""
                                                        className="cli_show_mess"
                                                    />
                                                </picture>
                                                <span className="item_num">0</span>
                                            </div>
                                        </div>
                                        <div className="ic_nhanh">
                                            <div className="img_ic share_cursor">
                                                <picture>
                                                    <source
                                                        media="(max-width:1024px)"
                                                        srcSet="../img/mobi_1.png"
                                                    />
                                                    <img
                                                        src="../img/nhac-nho.png"
                                                        alt=""
                                                        className="cli_show_mess ic_nhacnho"
                                                    />
                                                </picture>
                                                <span className="item_num">0</span>
                                            </div>
                                        </div>
                                        <div className="ic_nhanh">
                                            <div className="img_ic share_cursor">
                                                <picture>
                                                    <source
                                                        media="(max-width:1024px)"
                                                        srcSet="../img/mobi_3.png"
                                                    />
                                                    <img
                                                        src="../img/thong-bao.png"
                                                        alt=""
                                                        className="cli_show_mess ic_thongbao"
                                                    />
                                                </picture>
                                                <span className="item_num">0</span>
                                            </div>
                                        </div>
                                        <div className="ic_nhanh_avt">
                                            <div className="img_ic">
                                                <picture>
                                                    <img
                                                        src="../img/logo_com.png"
                                                        alt=""
                                                        className="avt_img_tk"
                                                    />
                                                </picture>
                                                <p className="logout_fname share_clr_one">nguyen van trung</p>
                                            </div>
                                            <div className="avt_log_posti share_bgr_tow">
                                                <ul className="navbar-nav">
                                                    <a
                                                        href="/quan-ly-thong-tin-tai-khoan-nhan-vien.html"
                                                        className="nav-item"
                                                    >
                                                        <li className="nav-child-item share_clr_one share_fsize_one">
                                                            <span className="item_ic">
                                                                <img src="../img/inf_tk.png" alt="" />
                                                            </span>
                                                            Thông tin tài khoản
                                                        </li>
                                                    </a>
                                                    <a className="nav-item">
                                                        <li className="nav-child-item share_clr_one share_fsize_one btx_logout">
                                                            <span className="item_ic">
                                                                <img src="../img/dang-xuat.png" alt="" />
                                                            </span>
                                                            Đăng xuất
                                                        </li>
                                                    </a>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ctn_right_qly ">
                                <div className="ctn_res_qly">
                                    <div className="left_header_qly">
                                        <p className="share_clr_one font_14">Thông tin tài khoản</p>
                                    </div>
                                    <div className="list_all_qly">
                                        <div className="main_tt main_tt_taikhoan_ct">
                                            <div className="container_taikhoan">
                                                <div className="item dd_flex">
                                                    <div className="avt_taikhoan ">
                                                        <div className="container_avt">
                                                            <div className="position_r text_a_c com_log_n">

                                                            </div>
                                                            <p className="id">ID - {infoAcc._id}</p>
                                                        </div>
                                                    </div>
                                                    <div className="info_taikhoan">
                                                        <div className="cont">
                                                            <p className="d_title font_20">{infoAcc.userName}</p>
                                                            <p className="d_title font_18" />
                                                            <p className="d_title font_16" />

                                                            <p className="content d_flex">
                                                                <span style={{ fontSize: 15 }}>
                                                                    Nhân viên chính thức
                                                                </span>
                                                            </p>
                                                            <p className="content d_flex">
                                                                <span>Kinh nghiệm làm việc:</span>
                                                                <span> {(infoAcc.inForPerson && infoAcc.inForPerson.account && infoAcc.inForPerson.account.experience) ? infoAcc.inForPerson.account.experience : ""}</span>
                                                            </p>
                                                            <p className="content d_flex">
                                                                <span>Ngày bắt đầu làm việc:</span>
                                                                <span>15/06/2023 </span>
                                                            </p>
                                                            <p className="content d_flex">
                                                                <span>Tài khoản đăng nhập:</span>
                                                                <span>{infoAcc.phoneTK}</span>
                                                            </p>
                                                            <p className="content d_flex">
                                                                <span>Số điện thoại:</span>
                                                                <span>{infoAcc.phone}</span>
                                                            </p>
                                                            <p className="content d_flex">
                                                                <span>Ngày sinh:</span>
                                                                {(data.inForPerson && data.inForPerson.account && data.inForPerson.account.birthday) ? data.inForPerson.account.birthday : ""}
                                                            </p>
                                                            <p className="content d_flex">
                                                                <span>Giới tính:</span>
                                                                <span> {(data.inForPerson && data.inForPerson.account && data.inForPerson.account.gender) ? data.inForPerson.account.gender : ""}</span>
                                                            </p>
                                                            <p className="content d_flex">
                                                                <span>Trình độ học vấn:</span>
                                                                <span>  {(data.inForPerson && data.inForPerson.account && data.inForPerson.account.education) ? data.inForPerson.account.education : ""}</span>
                                                            </p>
                                                            <p className="content d_flex">
                                                                <span>Địa chỉ:</span>
                                                                <span>{infoAcc.address}</span>
                                                            </p>
                                                            <p className="content d_flex">
                                                                <span>Tình trạng hôn nhân:</span>
                                                                <span>{infoAcc.married}</span>
                                                            </p>
                                                        </div>
                                                        <div className="d_flex container_btn">
                                                            <Link href="/chinh_sua_thong_tin_tai_khoan_nhan_vien">
                                                                <button className="btn_d btn_168 btn_trang">
                                                                    Chỉnh sửa thông tin
                                                                </button>
                                                            </Link>
                                                            <button className="btn_edit_mk btn_d btn_168 btn_xanh ">
                                                                Đổi mật khẩu
                                                            </button>
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
                </div>

                <div className="modal_share modal_share_four logout_ht">
                    <div className="modal-content">
                        <div className="info_modal">
                            <div className="modal-header">
                                <div className="header_ctn_share">
                                    <h4 className="ctn_share_h share_clr_tow tex_center cr_weight_bold">
                                        Đăng xuất
                                    </h4>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="ctn_body_modal">
                                    <div className="madal_form">
                                        <div className="edit_share_form share_distance_big logout_ht_form">
                                            <div className="titl_dele_nv">
                                                <p className="share_fsize_tow share_clr_one tex_center log_tlt">
                                                    Bạn có muốn đăng xuất ra khỏi hệ thống?
                                                </p>
                                            </div>
                                            <div className="form_butt_ht">
                                                <div className="tow_butt_flex">
                                                    <button
                                                        type="button"
                                                        className="share_fsize_three cr_weight share_cursor share_clr_four share_bgr_tow huy_button"
                                                    >
                                                        Hủy
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="share_clr_tow cr_weight share_cursor share_fsize_three share_bgr_one dongy_button logout_all"
                                                    >
                                                        Đồng ý
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{" "}
                {/* chỉnh sửa thông tin */}
                <div className="modal_share modal_share_tow edit_tt_taikhoan">
                    <div className="modal-content">
                        <div className="info_modal">
                            <div className="modal-header">
                                <div className="header_ctn_share">
                                    <h4 className="ctn_share_h share_clr_tow tex_center cr_weight_bold">
                                        Chỉnh sửa thông tin
                                    </h4>
                                    <span className="close_detl close_dectl">×</span>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="ctn_body_modal">
                                    <div className="madal_form">
                                        <form
                                            action=""
                                            method=""
                                            encType="multipart/form-data"
                                            className="edit_share_form share_distance edit_tt_taikhoan_form"
                                        >
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                    Tên công ty <span className="cr_red">*</span>
                                                </label>
                                                {/* <input type="text" name="name_ct" class="form-control share_fsize_one share_clr_one"
                              placeholder="Nhập tên công ty"
                              value=""> */}
                                                <textarea
                                                    type="text"
                                                    id="user_name"
                                                    className="user_name"
                                                    name="name_ct"
                                                    style={{
                                                        resize: "none",
                                                        height: "auto",
                                                        minHeight: 92,
                                                        fontSize: 16,
                                                        lineHeight: 24,
                                                        padding: "10px 15px",
                                                        width: "100%",
                                                        color: "#666666",
                                                        borderRadius: 5,
                                                        border: "1px solid #DDDDDD"
                                                    }}
                                                    placeholder="Nhập tên công ty"
                                                    value=""
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                    Số điện thoại <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    className="form-control share_fsize_one share_clr_one"
                                                    placeholder="Nhập số điện thoại"
                                                    defaultValue=""
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                    Email <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className="form-control share_fsize_one share_clr_one"
                                                    placeholder="Nhập địa chỉ email"
                                                    defaultValue=""
                                                    readOnly=""
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                    Địa chỉ <span className="cr_red">*</span>
                                                </label>
                                                {/* <input type="text" name="address" class="form-control share_fsize_one share_clr_one"
                              placeholder="Nhập địa chỉ công ty"
                              value=""> */}
                                                <textarea
                                                    type="text"
                                                    id="user_address"
                                                    className="user_address"
                                                    name="address"
                                                    value=""
                                                    style={{
                                                        resize: "none",
                                                        height: "auto",
                                                        minHeight: 92,
                                                        fontSize: 16,
                                                        lineHeight: 24,
                                                        padding: "10px 15px",
                                                        width: "100%",
                                                        color: "#666666",
                                                        borderRadius: 5,
                                                        border: "1px solid #DDDDDD"
                                                    }}
                                                    placeholder="Nhập địa chỉ"
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div className="form_butt_ht">
                                                <div className="tow_butt_flex">
                                                    <button
                                                        type="button"
                                                        className="js_btn_huy btn_d btn_trang btn_140"
                                                    >
                                                        Hủy
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn_d btn_xanh btn_140 com_save"
                                                    >
                                                        Hoàn thành
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* thay đổi mật khẩu */}
                <div className="modal_share modal_share_tow edit_tt_matkhau" >
                    <div className="modal-content">
                        <div className="info_modal">
                            <div className="modal-header">
                                <div className="header_ctn_share" >
                                    <h4 className="ctn_share_h share_clr_tow tex_center cr_weight_bold">
                                        Thay đổi mật khẩu
                                    </h4>
                                    <span className="close_detl close_dectl">×</span>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="ctn_body_modal">
                                    <div className="madal_form">
                                        <form className="edit_share_form share_distance edit_tt_matkhau_form">
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                    Mật khẩu cũ<span className="cr_red">*</span>
                                                </label>
                                                {/* <span class="see_log" toggle="#old_password"></span> */}
                                                <input
                                                    type="password"
                                                    name="old_password"
                                                    className="form-control"
                                                    placeholder="Nhật mật khẩu cũ"
                                                    id="old_password"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                    Mật khẩu mới<span className="cr_red">*</span>
                                                </label>
                                                {/* <span class="see_log" toggle="#new_password"></span> */}
                                                <input
                                                    type="password"
                                                    name="new_password"
                                                    className="form-control"
                                                    id="new_password"
                                                    placeholder="Nhật mật khẩu mới"
                                                />
                                                <span className="loi_error share_dnone">
                                                    Hãy nhập mật khẩu từ 8 đến 16 ký tự bao gồm chữ hoa, chữ
                                                    thường và ít nhất một chữ số và không chứa khoảng trắng
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                    Nhập lại mật khẩu<span className="cr_red">*</span>
                                                </label>
                                                {/* <span class="see_log" toggle="#pass_new"></span> */}
                                                <input
                                                    type="password"
                                                    name="res_password"
                                                    className="form-control"
                                                    placeholder="Nhập lại mật khẩu mới"
                                                    id="pass_new"
                                                />
                                            </div>
                                            <div className="form_butt_ht">
                                                <div className="tow_butt_flex">
                                                    <button
                                                        type="button"
                                                        className="js_btn_huy btn_d btn_trang btn_140"
                                                    >
                                                        Hủy
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn_d btn_xanh btn_140 com_save_pass"
                                                    >
                                                        Hoàn thành
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* chỉnh sửa tt thành công  */}
                <div className="modal_share modal_share_three edit_tt_success">
                    <div className="modal-content">
                        <div className="info_modal">
                            <div className="modal-body">
                                <div className="ctn_body_modal">
                                    <div className="content_notif">
                                        <div className="avt_notif notif_mar">
                                            <img src="../img/thongbao.png" alt="" />
                                        </div>
                                        <p className="titl_notif">Chỉnh sửa thông tin thành công!</p>
                                        <div className="form_butt_ht">
                                            <div className="tow_butt_flex">
                                                <button
                                                    type="button"
                                                    className="font_s15 share_clr_tow share_bgr_one dong_button close_button_share"
                                                >
                                                    Đóng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* thay đổi mật khẩu thành công */}
                <div className="modal_share modal_share_three edit_mk_success">
                    <div className="modal-content">
                        <div className="info_modal">
                            <div className="modal-body">
                                <div className="ctn_body_modal">
                                    <div className="content_notif">
                                        <div className="avt_notif notif_mar">
                                            <img src="../img/thongbao.png" alt="" />
                                        </div>
                                        <p className="titl_notif">Đổi mật khẩu thành công!</p>
                                        <div className="form_butt_ht">
                                            <div className="tow_butt_flex">
                                                <button
                                                    type="submit"
                                                    className="font_s15 share_clr_tow share_bgr_one dong_button close_button_share"
                                                >
                                                    Đóng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* chỉnh sửa tt thất bại */}
                <div className="modal_share modal_share_three edit_tt_fall ">
                    <div className="modal-content">
                        <div className="info_modal">
                            <div className="modal-body">
                                <div className="ctn_body_modal">
                                    <div className="content_notif">
                                        <div className="avt_notif notif_mar">
                                            <img src="../img/notif_thatbai.png" alt="" />
                                        </div>
                                        <p className="titl_notif">
                                            Chỉnh sửa thông tin thất bại, vui lòng thử lại sau!{" "}
                                        </p>
                                        <div className="form_butt_ht">
                                            <div className="tow_butt_flex">
                                                <button
                                                    type="submit"
                                                    className="font_s15 share_clr_tow share_bgr_one dong_button close_button_share"
                                                >
                                                    Đóng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* thay đổi mật khẩu thất bại */}
                <div className="modal_share modal_share_three edit_mk_fall ">
                    <div className="modal-content">
                        <div className="info_modal">
                            <div className="modal-body">
                                <div className="ctn_body_modal">
                                    <div className="content_notif">
                                        <div className="avt_notif notif_mar">
                                            <img src="../img/notif_thatbai.png" alt="" />
                                        </div>
                                        <p className="titl_notif">
                                            Đổi mật khẩu thất bại, vui lòng thử lại sau!{" "}
                                        </p>
                                        <div className="form_butt_ht">
                                            <div className="tow_butt_flex">
                                                <button
                                                    type="submit"
                                                    className="font_s15 share_clr_tow share_bgr_one dong_button close_button_share"
                                                >
                                                    Đóng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>


        </>
    )
}

