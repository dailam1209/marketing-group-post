import React from "react"
import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";

export default function SideBar() {
    let type = Cookies.get('role')
    if (type == '2') {
        linkHome = 'quan-ly-ung-dung-nhan-vien.html'
    } else {
        linkHome = 'quan-ly-ung-dung-ca-nhan.html'
    }
    if (type == '1') {
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
                            <a href={linkHome} className="nav-item">
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
                            {(props.type == '2') && (
                                <a href="quan-ly-nghi-viec.html" className="nav-item">
                                    <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                        <span className="item_ic"><img src="../img/qly-ttnghiviec.png" alt="Chấm dứt lao động" /></span>
                                        Chấm dứt lao động
                                    </li>
                                </a >
                            )}
                        </ul >
                    </div >
                </div >
            </>
        )
    } else {
        return (
            <>
                <div class="ctn_qly_left">
                    <div class="logo_qly">
                        <div class="avt_qly">
                            <a href="https://timviec365.vn/" target="_blank">
                                <picture>
                                    <img src="../img/logo_qly.png" alt="timviec365.vn" />
                                </picture>
                            </a>
                        </div>
                    </div>
                    <div class="nav_qly">
                        <ul class="navbar-nav">
                            <a href="quan-ly-ung-dung-cong-ty.html" class="nav-item <?= ($_SERVER['REDIRECT_URL'] == '/quan-ly-ung-dung-cong-ty.html')">
                                <li class="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                    <span class="item_ic"><img src="../img/ung-dung.png" alt="Ứng dụng" /></span>
                                    Ứng dụng
                                </li>
                            </a>
                            <a href="quan-ly-nhan-vien.html" class="nav-item <?= (in_array($_SERVER['REDIRECT_URL'], $ct_nhanvien))">
                                <li class="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                    <span class="item_ic"><img src="../img/qly-nhanvien.png" alt="Quản lý nhân viên" /></span>
                                    Quản lý nhân viên
                                </li>
                            </a>
                            <a href="quan-ly-phong-ban.html" class="nav-item <?= (in_array($_SERVER['REDIRECT_URL'], $ct_phongban))">
                                <li class="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                    <span class="item_ic"><img src="../img/qly-phongban.png" alt="Quản lý phòng ban" /></span>
                                    Quản lý phòng ban
                                </li>
                            </a>
                            <a href="quan-ly-cong-ty-con.html" class="nav-item <?= ($_SERVER['REDIRECT_URL'] == '/quan-ly-cong-ty-con.html')">
                                <li class="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                    <span class="item_ic"><img src="../img/qly-ctycon.png" alt="Quản lý công ty con" /></span>
                                    Quản lý công ty con
                                </li>
                            </a >
                            <a href="https://phanmemnhansu.timviec365.vn/co-cau-to-chuc.html" target="_blank" class="nav-item">
                                <li class="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                    <span class="item_ic"><img src="../img/qly-cctochuc.png" alt="Sơ đồ cơ cấu tổ chức" /></span>
                                    Sơ đồ cơ cấu tổ chức
                                </li>
                            </a>
                            <a href="/xoa-du-lieu-ung-dung.html" class="nav-item <?= ($_SERVER['REDIRECT_URL'] == '/xoa-du-lieu-ung-dung.html')" >
                                <li class="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                    <span class="item_ic"><img src="../img/delete_data.png" alt="Xóa dữ liệu ứng dụng" /></span>
                                    Xóa dữ liệu ứng dụng
                                </li>
                            </a >

                            <a href="quan-ly-thong-tin-tai-khoan-cong-ty.html" class="nav-item <?= ($_SERVER['REDIRECT_URL'] == '/quan-ly-thong-tin-tai-khoan-cong-ty.html')" >
                                <li class="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                    <span class="item_ic"><img src="../img/qly-tttaikhoan.png" alt="Thông tin tài khoản" /></span>
                                    Thông tin tài khoản
                                </li>
                            </a >
                            <a target="_blank" href="https://chamcong.timviec365.vn/quan-ly-cong-ty/danh-gia.html" class="nav-item">
                                <li class="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                    <span class="item_ic"><img src="../img/ic_dg.png" alt="Đánh giá" /></span>
                                    Đánh giá
                                </li>
                            </a>
                            <a target="_blank" href="https://chamcong.timviec365.vn/quan-ly-cong-ty/gui-loi.html" class="nav-item">
                                <li class="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                    <span class="item_ic"><img src="../img/ic_bl.png" alt="Báo lỗi" /></span>
                                    Báo lỗi
                                </li>
                            </a>
                            <a href="cai-dat-thiet-lap-dai-ip-phan-mem.html" class="nav-item <?= (in_array($_SERVER['REDIRECT_URL'], $ct_caidat))" >
                                <li class="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                    <span class="item_ic"><img src="../img/cai-dat.png" alt=" Cài đặt" /></span>
                                    Cài đặt
                                </li>
                            </a >
                        </ul >
                    </div >
                </div >
            </>
        )
    }
}
