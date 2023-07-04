import {React, useState, useEffect} from 'react';
import Seo from '../components/head'
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';

export default function HomeEmployee() {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, [])

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <>
            <Seo
                seo=''
                title='Quản lý ứng dụng'
            />

            <div id="qly_ungdung_nv" className="qly_ungdung">
                <div className="wrapper">
                    <div className="left_ql">
                        <SideBar />
                    </div>
                    <div className="right_ql">
                        <div className="header_rigth_qly">
                            <div className="ctn_header_qly">
                                <div className="left_header_qly">
                                    <p className="share_fsize_one ">Ứng dụng / <span className="thay_doi">Tất cả</span></p>
                                </div>
                                <HeaderLogin />
                            </div>
                        </div>
                        <div className="ctn_right_qly">
                            <div className="ctn_res_qly">
                                <div className="left_header_qly">
                                    <p className="share_clr_one share_fsize_one">Ứng dụng / <span className="thay_doi">Tất cả</span></p>
                                </div>
                                <div className="search_qly">
                                    <form className="form_timkiem">
                                        {/* <div className="tim-kiem share_form_select">
                                            <select name="search"
                                                className="form-serach share_fsize_one share_clr_three share_bgr_tow">
                                                <option></option>
                                            </select>
                                            <span className="ico_search"></span>
                                        </div> */}
                                        <div className="tim-kiem">
                                            <input type="text" name="search" id="myInput" placeholder="Nhập tên phần mềm" className="form-serach share_fsize_one share_clr_three share_bgr_tow" />
                                            <span className="ico_search"></span>
                                        </div>
                                    </form>
                                </div>
                                <div className="list_all_qly">
                                    <div className="ctn_chile_one">
                                        <div className="tab_content active" data-tab="ungdung_one">
                                            <div className="ctn_detl_tab">
                                                <label className="tab_label">
                                                    <div className="avt_detl_tab">
                                                        <h3>27</h3>
                                                        <p>Tất cả</p>
                                                        <input type="radio" name="gs-gd" value="1" defaultChecked={true} />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="tab_content" data-tab="ungdung_two">
                                            <div className="ctn_detl_tab">
                                                <label className="tab_label">
                                                    <h3>05</h3>
                                                    <p>Quản lý nhân lực</p>
                                                    <input type="radio" name="gs-gd" value="2" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="tab_content" data-tab="ungdung_three">
                                            <div className="ctn_detl_tab">
                                                <label className="tab_label">
                                                    <h3>04</h3>
                                                    <p>Quản lý công việc</p>
                                                    <input type="radio" name="gs-gd" value="3" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="tab_content" data-tab="ungdung_four">
                                            <div className="ctn_detl_tab">
                                                <label className="tab_label">
                                                    <h3>07</h3>
                                                    <p>Quản lý nội bộ</p>
                                                    <input type="radio" name="gs-gd" value="4" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="tab_content" data-tab="ungdung_five">
                                            <div className="ctn_detl_tab">
                                                <label className="tab_label">
                                                    <h3>10</h3>
                                                    <p>Quản lý bán hàng</p>
                                                    <input type="radio" name="gs-gd" value="5" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ctn_chile_tow">
                                        <div className="content_delt_all active" id="ungdung_one">
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://chamcong.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql-chamcong.png" alt="Chấm công" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://chamcong.timviec365.vn/" className="share_clr_four" target="_blank">Chấm công</a>
                                                            </h4>
                                                            {/* <p className="share_fsize_one">
                                                                <span className="share_clr_three">Quản lý bởi: </span>
                                                                <span className="share_clr_one">Nguyễn Văn Nam, Lê Thị Thu</span>
                                                            </p> */}
                                                            <div className="count_qlyud">
                                                                {/* <p className="share_fsize_one share_clr_one">Thành viên: <span
                                                                    className="cr_weight">60</span></p>
                                                                <p className="share_fsize_one share_clr_one">Ngày sử dụng: <span
                                                                    className="cr_weight">10/10/2021</span></p> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">
                                                        {/* <p className="share_fsize_one share_clr_one">Thành viên: <span
                                                            className="cr_weight">60</span></p>
                                                        <p className="share_fsize_one share_clr_one">Ngày sử dụng: <span
                                                            className="cr_weight">10/10/2021</span></p> */}
                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://chat365.timviec365.vn/conversation-c<?= encrypt_decrypt('') ?>-u<?= $_COOKIE['qlc_chat_id'] ?>" target="_blank">
                                                            <img src="../img/ql-chat365.png" alt="Chat365" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">

                                                                <a href="https://chat365.timviec365.vn/conversation-c<?= encrypt_decrypt('') ?>-u<?= $_COOKIE['qlc_chat_id'] ?>" className="share_clr_four" target="_blank">Chat365</a>
                                                                {/* <a href="https://chat365.timviec365.vn/" className="share_clr_four" target="_blank">Chat365</a> */}
                                                            </h4>
                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://tinhluong.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql-tinhluong.png" alt="Tính lương" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://tinhluong.timviec365.vn/" className="share_clr_four" target="_blank">Tính lương</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemnhansu.timviec365.vn/" target="_blank">
                                                            <img src="../img/qly-nhansu.png" alt="Quản trị nhân sự" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemnhansu.timviec365.vn/" className="share_clr_four" target="_blank">Quản trị nhân sự</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemgiaoviec.timviec365.vn/" target="_blank">
                                                            <img src="../img/qly-nhansu.png" alt="Phần mềm giao việc" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemgiaoviec.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm giao việc</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://vanthu.timviec365.vn/" target="_blank">
                                                            <img src="../img/vt-luutru.png" alt="Văn thư lưu trữ" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://vanthu.timviec365.vn/" className="share_clr_four" target="_blank">Văn thư lưu trữ</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://crm.timviec365.vn/" target="_blank">
                                                            <img src="../img/crm_ql.png" alt="Phần mềm CRM" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://crm.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm CRM</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlytaisan.timviec365.vn" target="_blank">
                                                            <img src="../img/quanly_taisan.png" alt="Quản lý tài sản" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlytaisan.timviec365.vn" className="share_clr_four" target="_blank">Quản lý tài sản</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemdanhgiananglucnhanvien.timviec365.vn/" target="_blank">
                                                            <img src="../img/danh-gia.png" alt="Đánh giá năng lực nhân viên" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemdanhgiananglucnhanvien.timviec365.vn/" className="share_clr_four" target="_blank">Đánh giá năng lực nhân viên</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://kpi.timviec365.vn/" target="_blank">
                                                            <img src="../img/qly-kpi.png" alt="Quản lý KPI" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://kpi.timviec365.vn/" className="share_clr_four" target="_blank">Quản lý KPI</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemsohoatailieu.timviec365.vn/" target="_blank">
                                                            <img src="../img/danh-gia.png" alt="Số hóa tài liệu" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemsohoatailieu.timviec365.vn/" className="share_clr_four" target="_blank">Số hóa tài liệu</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>


                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://dms.timviec365.vn" target="_blank">
                                                            <img src="../img/dms_ql.png" alt="DMS" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://dms.timviec365.vn" rel="nofollow" className="share_clr_four" target="_blank">Phần mềm quản lý hệ thống phân phối - DMS</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://cardvisitthongminh.timviec365.vn/" rel="nofollow" target="_blank">
                                                            <img src="../img/dms_ql.png" alt="SMARTID365" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://cardvisitthongminh.timviec365.vn/" rel="nofollow" className="share_clr_four" target="_blank">SMARTID365</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://chuyenvanbanthanhgiongnoi.timviec365.vn/trang-chu.html" target="_blank">
                                                            <img src="../img/chuyendoi_vb.png" alt="Chuyển văn bản thành giọng nói" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://chuyenvanbanthanhgiongnoi.timviec365.vn/trang-chu.html" className="share_clr_four" target="_blank">
                                                                    Chuyển văn bản thành giọng nói</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlygaraoto.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_gara.png" alt="Phần mềm quản lý Gara ô tô" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlygaraoto.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý Gara ô tô</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <div className="avt_qlyc">
                                                            <img src="../img/ql-pc365.png" alt="PC365"/>
                                                        </div>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://chamcong.work247.vn/" className="share_clr_four" target="_blank">PC365</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN sỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span></p>
                                                </div>
                                            </div> */}

                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://bienphiendich.timviec365.vn" target="_blank">
                                                            <img src="../img/phanmem_phiendich.png" alt="Phần mềm phiên dịch" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://bienphiendich.timviec365.vn" className="share_clr_four" target="_blank">Phần mềm phiên dịch</a>
                                                            </h4>
                                                            <div className="count_qlyud"></div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud"></div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlykhoxaydung.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_khvt.png" alt="Phần mềm quản lý kho vật tư xây dựng" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlykhoxaydung.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý kho vật tư xây dựng</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://loyalty.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_cungung.png" alt="Phần mềm Loyalty" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://loyalty.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm Loyalty</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlytaichinhcongtrinh.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_congtrinh.png" alt="Phần mềm quản lý công trình" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlytaichinhcongtrinh.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý tài chính công trình</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlydautuxaydung.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_congtrinh.png" alt="Phần mềm quản lý công trình" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlydautuxaydung.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý đầu tư xây dựng</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>


                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlycongtrinh.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_congtrinh.png" alt="Phần mềm quản lý công trình" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlycongtrinh.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý công trình</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlyquytrinhsanxuat.timviec365.vn" target="_blank">
                                                            <img src="../img/ql_congtrinh.png" alt="Phần mềm quản lý công trình" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlyquytrinhsanxuat.timviec365.vn" className="share_clr_four" target="_blank">Phần mềm quản lý quy trình sản xuất</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlyvantai.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_congtrinh.png" alt="Phần mềm quản lý công trình" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlyvantai.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý vận tải</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlycungung.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_cungung.png" alt="Phần mềm quản lý cung ứng" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlycungung.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý cung ứng</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://lichbieu.timviec365.vn/" target="_blank">
                                                            <img src="../img/lich-bieu.png" alt="Phần mềm quản lý lịch biểu" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://lichbieu.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý lịch biểu</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlykho.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_khvt.png" alt="Phần mềm quản lý kho 365" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlykho.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý kho 365</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://truyenthongnoibo.timviec365.vn/" target="_blank">
                                                            <img src="../img/tt-vanhoa.png" alt="Truyền thông văn hóa" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://truyenthongnoibo.timviec365.vn/" className="share_clr_four" target="_blank">Truyền thông văn hóa</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="content_delt_all" id="ungdung_two">
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://chamcong.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql-chamcong.png" alt="Chấm công" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://chamcong.timviec365.vn/" className="share_clr_four" target="_blank">Chấm công</a>
                                                            </h4>
                                                            {/* <p className="share_fsize_one">
                                                                <span className="share_clr_three">Quản lý bởi: </span>
                                                                <span className="share_clr_one">Nguyễn Văn Nam, Lê Thị Thu</span>
                                                            </p> */}
                                                            <div className="count_qlyud">
                                                                {/* <p className="share_fsize_one share_clr_one">Thành viên: <span
                                                                    className="cr_weight">60</span></p>
                                                                <p className="share_fsize_one share_clr_one">Ngày sử dụng: <span
                                                                    className="cr_weight">10/10/2021</span></p> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">
                                                        {/* <p className="share_fsize_one share_clr_one">Thành viên: <span
                                                            className="cr_weight">60</span></p> */}
                                                        {/* <p className="share_fsize_one share_clr_one">Ngày sử dụng: <span
                                                            className="cr_weight">10/10/2021</span></p> */}
                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://chat365.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql-chat365.png" alt="Chat365" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://chat365.timviec365.vn/" className="share_clr_four" target="_blank">Chat365</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://tinhluong.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql-tinhluong.png" alt="Tính lương" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://tinhluong.timviec365.vn/" className="share_clr_four" target="_blank">Tính lương</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemnhansu.timviec365.vn/" target="_blank">
                                                            <img src="../img/qly-nhansu.png" alt="Quản trị nhân sự" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemnhansu.timviec365.vn/" className="share_clr_four" target="_blank">Quản trị nhân sự</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemdanhgiananglucnhanvien.timviec365.vn/" target="_blank">
                                                            <img src="../img/danh-gia.png" alt="Đánh giá năng lực nhân viên" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemdanhgiananglucnhanvien.timviec365.vn/" className="share_clr_four" target="_blank">Đánh giá năng lực nhân viên</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content_delt_all" id="ungdung_three">
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://kpi.timviec365.vn/" target="_blank">
                                                            <img src="../img/qly-kpi.png" alt="Quản lý KPI" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://kpi.timviec365.vn/" className="share_clr_four" target="_blank">Quản lý KPI</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://crm.timviec365.vn/" target="_blank">
                                                            <img src="../img/crm_ql.png" alt="Phần mềm CRM" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://crm.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm CRM</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://lichbieu.timviec365.vn/" target="_blank">
                                                            <img src="../img/lich-bieu.png" alt="Phần mềm quản lý lịch biểu" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://lichbieu.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý lịch biểu</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemgiaoviec.timviec365.vn/" target="_blank">
                                                            <img src="../img/qly-nhansu.png" alt="Phần mềm giao việc" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemgiaoviec.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm giao việc</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content_delt_all" id="ungdung_four">
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://vanthu.timviec365.vn/" target="_blank">
                                                            <img src="../img/vt-luutru.png" alt="Văn thư lưu trữ" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://vanthu.timviec365.vn/" className="share_clr_four" target="_blank">Văn thư lưu trữ</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://truyenthongnoibo.timviec365.vn/" target="_blank">
                                                            <img src="../img/tt-vanhoa.png" alt="Truyền thông văn hóa" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://truyenthongnoibo.timviec365.vn/" className="share_clr_four" target="_blank">Truyền thông văn hóa</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://chuyenvanbanthanhgiongnoi.timviec365.vn/trang-chu.html" target="_blank">
                                                            <img src="../img/chuyendoi_vb.png" alt="Chuyển văn bản thành giọng nói" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://chuyenvanbanthanhgiongnoi.timviec365.vn/trang-chu.html" className="share_clr_four" target="_blank">
                                                                    Chuyển văn bản thành giọng nói</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlytaisan.timviec365.vn" target="_blank">
                                                            <img src="../img/quanly_taisan.png" alt="Quản lý tài sản" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlytaisan.timviec365.vn" className="share_clr_four" target="_blank">Quản lý tài sản</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://bienphiendich.timviec365.vn" target="_blank">
                                                            <img src="../img/phanmem_phiendich.png" alt="Phần mềm phiên dịch" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://bienphiendich.timviec365.vn" className="share_clr_four" target="_blank">Phần mềm phiên dịch</a>
                                                            </h4>
                                                            <div className="count_qlyud"></div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud"></div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemsohoatailieu.timviec365.vn/" target="_blank">
                                                            <img src="../img/danh-gia.png" alt="Số hóa tài liệu" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemsohoatailieu.timviec365.vn/" className="share_clr_four" target="_blank">Số hóa tài liệu</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlytaisan.timviec365.vn" target="_blank">
                                                            <img src="../img/quanly_taisan.png" alt="Quản lý tài sản" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlytaisan.timviec365.vn" className="share_clr_four" target="_blank">Quản lý tài sản</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content_delt_all" id="ungdung_five">
                                            {/* <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <div className="avt_qlyc">
                                                            <img src="../img/quanly_banhang.png" alt="Quản lý bán hàng"/>
                                                        </div>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="#" className="share_clr_four" target="_blank">Quản lý bán hàng</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span></p>
                                                </div>
                                            </div> */}
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://crm.timviec365.vn/" target="_blank">
                                                            <img src="../img/crm_ql.png" alt="Phần mềm CRM" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://crm.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm CRM</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://dms.timviec365.vn" target="_blank">
                                                            <img src="../img/dms_ql.png" alt="DMS" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://dms.timviec365.vn" rel="nofollow" className="share_clr_four" target="_blank">Phần mềm quản lý hệ thống phân phối - DMS</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://cardvisitthongminh.timviec365.vn/" rel="nofollow" target="_blank">
                                                            <img src="../img/dms_ql.png" alt="SMARTID365" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://cardvisitthongminh.timviec365.vn/" rel="nofollow" className="share_clr_four" target="_blank">SMARTID365</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlygaraoto.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_gara.png" alt="Phần mềm quản lý Gara ô tô" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlygaraoto.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý Gara ô tô</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlykhoxaydung.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_khvt.png" alt="Phần mềm quản lý kho vật tư xây dựng" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlykhoxaydung.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý kho vật tư xây dựng</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://loyalty.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_cungung.png" alt="Phần mềm Loyalty" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://loyalty.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm Loyalty</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlyvantai.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_congtrinh.png" alt="Phần mềm quản lý công trình" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlyvantai.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý vận tải</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlycungung.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_cungung.png" alt="Phần mềm quản lý cung ứng" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlycungung.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý cung ứng</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlykho.timviec365.vn/" target="_blank">
                                                            <img src="../img/ql_khvt.png" alt="Phần mềm quản lý kho 365" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlykho.timviec365.vn/" className="share_clr_four" target="_blank">Phần mềm quản lý kho 365</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a className="avt_qlyc" href="https://phanmemquanlyquytrinhsanxuat.timviec365.vn" target="_blank">
                                                            <img src="../img/ql_congtrinh.png" alt="Phần mềm quản lý công trình" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a href="https://phanmemquanlyquytrinhsanxuat.timviec365.vn" className="share_clr_four" target="_blank">Phần mềm quản lý quy trình sản xuất</a>
                                                            </h4>

                                                            <div className="count_qlyud">

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">

                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv cr_weight share_clr_three share_cursor">THÀNH VIÊN SỬ DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight com_name">$com_name</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="ctn_chile_three" id="">
                                        <div className="content_delt_all active">
                                            <div className="delt_titl_ud share_bgr_tow active">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <div className="avt_qlyc">
                                                            <img src="../img/ql-chamcong.png" alt="">
                                                        </div>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">Chấm công</h4>
                                                            <p className="share_fsize_one">
                                                                <span className="share_clr_three">Quản lý bởi: </span>
                                                                <span className="share_clr_one">Nguyễn Văn Nam, Lê Thị Thu</span>
                                                            </p>
                                                            <div className="count_qlyud">
                                                                <p className="share_fsize_one share_clr_one">Thành viên: <span
                                                                    className="cr_weight">60</span></p>
                                                                <p className="share_fsize_one share_clr_one">Ngày sử dụng: <span
                                                                    className="cr_weight">10/10/2021</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud">
                                                        <p className="share_fsize_one share_clr_one">Thành viên: <span
                                                            className="cr_weight">60</span></p>
                                                        <p className="share_fsize_one share_clr_one">Ngày sử dụng: <span
                                                            className="cr_weight">10/10/2021</span></p>
                                                    </div>
                                                </div>
                                                <div className="see_nv_all">
                                                    <p className="see_dstv no_active cr_weight share_clr_three share_cursor">THÀNH VIÊN ĐƯỢC ÁP DỤNG</p>
                                                </div>
                                                <div className="detl_nv_cty">
                                                    <p className="see_dvnv share_clr_one share_fsize_one">Tất cả thành viên trong:
                                                        <span className="cr_weight">CÔNG TY CỔ
                                                            PHẦN THANH TOÁN
                                                            HƯNG HÀ</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
        </>
    )
};
