import React from "react"
import Link from 'next/link'
export default function sideBar() {
    return (
        <>
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
                        <a href="quan-ly-ung-dung-nhan-vien.html" className="nav-item">
                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                <span className="item_ic"><img src="../img/ung-dung.png" alt="Ứng dụng" /></span>
                                Ứng dụng
                            </li>
                        </a>
                        <a href="quan-ly-thong-tin-tai-khoan-nhan-vien.html" className="nav-item">
                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                <span className="item_ic"><img src="../img/qly-tttaikhoan.png" alt="Thông tin tài khoản" /></span>
                                Thông tin tài khoản
                            </li>
                        </a>
                        <a href="quan-ly-thong-tin-viec-lam.html" className="nav-item">
                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                <span className="item_ic"><img src="../img/qly-ttvieclam.png" alt="Thiết lập tài khoản nhân viên" /></span>
                                Thiết lập tài khoản nhân viên
                            </li>
                        </a>
                        <a href="quan-ly-nghi-viec.html" className="nav-item">
                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                <span className="item_ic"><img src="../img/qly-ttnghiviec.png" alt="Chấm dứt lao động" /></span>
                                Chấm dứt lao động
                            </li>
                        </a >

                    </ul >
                </div >
            </div >
        </>
    )
}

