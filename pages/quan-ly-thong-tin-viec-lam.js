import React from "react"
import Header from "/components/header/Header";
import Footer from "/components/footer/Footer";
import Head from "next/head";
import Link from 'next/link'
import router from "../utils/router"

import { useRouter } from 'next/navigation'



//const inter = Inter({ subsets: [latin] })
export default function thiet_lap_tai_khoan_ca_nhan() {
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
                <title>Thông tin việc làm nhân viên</title>
            </>
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
                                        href="/quan-ly-thong-tin-tai-khoan-nhan-vien"
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
                                    </a>
                                    <Link href="/thiet_lap_tai_khoan_nhan_vien" className="nav-item active">
                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                            <span className="item_ic">
                                                <img
                                                    src="../img/qly-ttvieclam.png"
                                                    alt="Thiết lập tài khoản nhân viên"
                                                />
                                            </span>
                                            Thiết lập tài khoản nhân viên
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        </div>{" "}
                    </div>
                    <div className="right_ql">
                        <div className="header_rigth_qly">
                            <div className="ctn_header_qly">
                                <div className="img_ic_mobi show_sidebar">
                                    <img src="../img/mobi_4.png" alt="" className="btx_header_nv" />

                                </div>{" "}
                                <div className="left_header_qly">
                                    <p className="share_clr_one font_14">Thiết lập việc làm</p>
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
                                        <div
                                            className="avt_log_posti share_bgr_tow"
                                            style={{ display: "none" }}
                                        >
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
                                    <p className="share_clr_one font_14">Thiết lập việc làm</p>
                                </div>
                                <div className="list_all_qly">
                                    <div className="main_tt main_tt_taikhoan_ct">
                                        <button className="btn_UT ">
                                            <img src="/img/ungtuyen_vl.png" /> Ứng tuyển
                                        </button>
                                        <table
                                            className="page_table_one"
                                            style={{ boxShadow: "0px 0px 10px rgb(0 0 0 / 10%)" }}
                                        >
                                            <thead className="share_thead share_bgr_one">
                                                <tr>
                                                    <th className="share_clr_tow tex_center share_fsize_tow cr_weight">
                                                        STT
                                                    </th>
                                                    <th className="share_clr_tow tex_center share_fsize_tow cr_weight">
                                                        ID công ty
                                                    </th>
                                                    <th className="share_clr_tow tex_center share_fsize_tow cr_weight">
                                                        Tên công ty
                                                    </th>
                                                    <th className="share_clr_tow tex_center share_fsize_tow cr_weight">
                                                        Trạng thái lao động
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="share_fsize_one share_clr_one tex_center">
                                                        1
                                                    </td>
                                                    <td className="share_fsize_one share_clr_one tex_center">
                                                        1763
                                                    </td>
                                                    <td
                                                        className="share_fsize_one share_clr_one tex_left"
                                                        style={{ fontWeight: 500 }}
                                                    >
                                                        le anh tuan12
                                                    </td>
                                                    <td className="share_fsize_one share_clr_one tex_center">
                                                        <p style={{ color: "#FF3333" }}>Đã nghỉ việc</p>{" "}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >




        </>)
}