import React from "react"
import Header from "/components/header/Header";
import Footer from "/components/footer/Footer";
import Head from "next/head";
import { useForm } from 'react-hook-form';



//const inter = Inter({ subsets: [latin] })
export default function side_bar() {

    return (
        <>
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
                            <a href="quan-ly-ung-dung-ca-nhan.html" className="nav-item ">
                                <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                    <span className="item_ic">
                                        <img src="../img/ung-dung.png" alt="Ứng dụng" />
                                    </span>
                                    Ứng dụng
                                </li>
                            </a>
                            <a
                                href="thong_tin_tai_khoan"
                                className="nav-item active"
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
                            <a href="thiet_lap_tai_khoan_nhan_vien" className="nav-item ">
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
        </>)
}
