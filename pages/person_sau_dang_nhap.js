import React from "react"
import Header from "/components/header/Header";
import Footer from "/components/footer/Footer";
import Head from "next/head";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from "next/link";
import Cookies from "js-cookie";
export default function sau_đang_nhap_ca_nhan() {
    const acc_token = Cookies.get('access_token');
    console.log("acc_token1" + acc_token);
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
                <link rel="stylesheet" href="../css/select2.min.css" />
                <link rel="preload" as="style" href="../css/style.css?v=140" />
                <link
                    rel="stylesheet"
                    media="all"
                    href="../css/style.css?v=140"
                    onload="if (media != 'all')media='all'"
                />
                <title>Quản lý ứng dụng</title>
            </>
            <>
                <div id="qly_ungdung_nv" className="qly_ungdung">
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
                                        <a href="person_sau_dang_nhap" className="nav-item  active">
                                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                <span className="item_ic">
                                                    <img src="../img/ung-dung.png" alt="Ứng dụng" />
                                                </span>
                                                Ứng dụng
                                            </li>
                                        </a>
                                        <Link
                                            href='/quan-ly-thong-tin-tai-khoan-nhan-vien'
                                            className="nav-item "
                                        >
                                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                <span className="item_ic">
                                                    <img
                                                        src="../img/qly-tttaikhoan.png"
                                                        alt="Thông tin tài khoản"
                                                    />
                                                </span>
                                                Thông tin tài khoản
                                            </li>
                                        </Link>
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
                                                                        href="quan-ly-ung-dung-ca-nhan.html"
                                                                        className="nav-item active"
                                                                    >
                                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                                            <span className="item_ic">
                                                                                <img src="../img/ung-dung.png" alt="" />
                                                                            </span>
                                                                            Ứng dụng
                                                                        </li>
                                                                    </a>
                                                                    <a
                                                                        href="quan-ly-thong-tin-tai-khoan-ca-nhan.html"
                                                                        className="nav-item "
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
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>{" "}
                                    <div className="left_header_qly">
                                        <p className="share_fsize_one ">
                                            Ứng dụng / <span className="thay_doi">Tất cả</span>
                                        </p>
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
                                                <p className="logout_fname share_clr_one">n van trung</p>
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
                            <div className="ctn_right_qly">
                                <div className="ctn_res_qly">
                                    <div className="left_header_qly">
                                        <p className="share_clr_one share_fsize_one">
                                            Ứng dụng / <span className="thay_doi">Tất cả</span>
                                        </p>
                                    </div>
                                    <div className="search_qly">
                                        <form className="form_timkiem">
                                            <div className="tim-kiem">
                                                <input
                                                    type="text"
                                                    name="search"
                                                    id="myInput"
                                                    placeholder="Nhập tên phần mềm"
                                                    className="form-serach share_fsize_one share_clr_three share_bgr_tow"
                                                />
                                                <span className="ico_search" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="list_all_qly">
                                        <div className="ctn_chile_tow">
                                            <div className="content_delt_all active" id="ungdung_one">
                                                <div className="delt_titl_ud share_bgr_tow">
                                                    <div
                                                        className="detl_nv_count"
                                                        style={{ padding: 15, marginBottom: 0 }}
                                                    >
                                                        <div className="titl_qlyud">
                                                            <a
                                                                className="avt_qlyc"
                                                                href="https://chat365.timviec365.vn/conversation-cYytiQ3FEU0haenQxcFpUR2N4dDlEdz09-uWE0zWmQwQWs1RWF2RnFIdVFrVlhaZz09"
                                                                target="_blank"
                                                            >
                                                                <img src="../img/ql-chat365.png" alt="Chat365" />
                                                            </a>
                                                            <div className="titl_delt">
                                                                <h4
                                                                    className="share_fsize_tow share_clr_four"
                                                                    style={{ paddingTop: 10 }}
                                                                >
                                                                    <a
                                                                        href="https://chat365.timviec365.vn/conversation-cYytiQ3FEU0haenQxcFpUR2N4dDlEdz09-uWE0zWmQwQWs1RWF2RnFIdVFrVlhaZz09"
                                                                        className="share_clr_four"
                                                                        target="_blank"
                                                                    >
                                                                        Chat365
                                                                    </a>
                                                                </h4>
                                                                <div className="count_qlyud" />
                                                            </div>
                                                        </div>
                                                        <div className="count_qlyud" />
                                                    </div>
                                                </div>
                                                <div className="delt_titl_ud share_bgr_tow">
                                                    <div
                                                        className="detl_nv_count"
                                                        style={{ padding: 15, marginBottom: 0 }}
                                                    >
                                                        <div className="titl_qlyud">
                                                            <a
                                                                className="avt_qlyc"
                                                                href="https://cardvisitthongminh.timviec365.vn/"
                                                                rel="nofollow"
                                                                target="_blank"
                                                            >
                                                                <img src="../img/dms_ql.png" alt="SMARTID365" />
                                                            </a>
                                                            <div className="titl_delt">
                                                                <h4
                                                                    className="share_fsize_tow share_clr_four"
                                                                    style={{ paddingTop: 10 }}
                                                                >
                                                                    <a
                                                                        href="https://cardvisitthongminh.timviec365.vn/"
                                                                        rel="nofollow"
                                                                        className="share_clr_four"
                                                                        target="_blank"
                                                                    >
                                                                        SMARTID365
                                                                    </a>
                                                                </h4>
                                                                <div className="count_qlyud"></div>
                                                            </div>
                                                        </div>
                                                        <div className="count_qlyud"></div>
                                                    </div>
                                                </div>
                                                <div className="delt_titl_ud share_bgr_tow">
                                                    <div
                                                        className="detl_nv_count"
                                                        style={{ padding: 15, marginBottom: 0 }}
                                                    >
                                                        <div className="titl_qlyud">
                                                            <a
                                                                className="avt_qlyc"
                                                                href="https://crm.timviec365.vn/"
                                                                target="_blank"
                                                            >
                                                                <img src="../img/crm_ql.png" alt="Phần mềm CRM" />
                                                            </a>
                                                            <div className="titl_delt">
                                                                <h4
                                                                    className="share_fsize_tow share_clr_four"
                                                                    style={{ paddingTop: 10 }}
                                                                >
                                                                    <a
                                                                        href="https://crm.timviec365.vn/"
                                                                        className="share_clr_four"
                                                                        target="_blank"
                                                                    >
                                                                        Phần mềm CRM
                                                                    </a>
                                                                </h4>
                                                                <div className="count_qlyud"></div>
                                                            </div>
                                                        </div>
                                                        <div className="count_qlyud"></div>
                                                    </div>
                                                </div>
                                                <div className="delt_titl_ud share_bgr_tow">
                                                    <div className="detl_nv_count">
                                                        <div className="titl_qlyud">
                                                            <a
                                                                className="avt_qlyc"
                                                                href="https://truyenthongnoibo.timviec365.vn/"
                                                                target="_blank"
                                                            >
                                                                <img
                                                                    src="../img/tt-vanhoa.png"
                                                                    alt="Truyền thông văn hóa"
                                                                />
                                                            </a>
                                                            <div className="titl_delt">
                                                                <h4 className="share_fsize_tow share_clr_four">
                                                                    <a
                                                                        href="https://truyenthongnoibo.timviec365.vn/"
                                                                        className="share_clr_four"
                                                                        target="_blank"
                                                                    >
                                                                        Truyền thông văn hóa
                                                                    </a>
                                                                </h4>
                                                                <div className="count_qlyud"></div>
                                                            </div>
                                                        </div>
                                                        <div className="count_qlyud"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content_delt_all" id="ungdung_two" />
                                            <div className="content_delt_all" id="ungdung_three" />
                                            <div className="content_delt_all" id="ungdung_four" />
                                            <div className="content_delt_all" id="ungdung_five" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal */}
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
                </div>
                {/* Thông báo chat  */}
                <link
                    rel="stylesheet"
                    media="all"
                    href="../css/style_chat_notify.css?v=140"
                    onload="if (media != 'all')media='all'"
                />
                <div className="tb_chat365" style={{ display: "none" }}>
                    <div className="wapper">
                        <div className="auth_form">
                            <p className="post_title">
                                Thông báo
                                <img
                                    className="close_pop_login"
                                    onclick="close_tb()"
                                    src="/img/close_btndo.png"
                                    alt="close"
                                />
                            </p>
                            <div className="frame_tbmess">
                                <p className="post_info">
                                    Bạn có tin nhắn mới từ <span className="name">Phạm Thanh Long</span>
                                    : <span className="nd col_blu">test</span>
                                </p>
                            </div>
                            <a
                                target="_blank"
                                href="https://chat365.timviec365.vn/conversation-cRFoxQmlTMkFMUnVhZXREak4rUEIvUT09-ubnVHWE1rMXFlZ040bnkwSWpTNElVQT09"
                                rel="nofollow"
                                onclick="close_tb()"
                                className="btn_login"
                            >
                                <img
                                    src="/img/iconchat_green.png"
                                    alt="Trả lời"
                                    width="16px"
                                    height="16px"
                                />{" "}
                                Trả lời
                            </a>
                        </div>
                    </div>
                </div>
            </>
        </>)
};