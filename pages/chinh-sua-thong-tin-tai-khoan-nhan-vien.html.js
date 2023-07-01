import React, { useState, useEffect } from "react";
import Head from "next/head";
import SideBar from '../components/employee/sideBar';
import HeaderEp from '../components/employee/headerEp';
import callApi from '../pages/api/call_api';
import Cookies from "js-cookie";
import { getEducation } from "../utils/function";

export default function editEmployee() {

    // const [data, setData] = useState(null);
    // const handleDataLoaded = (data) => {
    //     // Cập nhật dữ liệu từ component con vào state của page cha
    //     setData(data);
    // };

    // gọi api lấy thông tin nhân viên
    const [data, setData] = useState([]);
    // const [isDataLoaded, setIsDataLoaded] = useState(false);
    var token = Cookies.get('access_token');

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await callApi.getInfoEp(token);
                setData(response.data.data.data[0])
                // setIsDataLoaded(true);
                // onDataLoaded(data)
            }
            catch {
                console.log('Error:', error);
            }
        }
        getData()
    }, [])
    if (data.inForPerson && data.inForPerson.account && data.inForPerson.account.gender == 1) {
        var gender = 'Nam'
    } else if (data.inForPerson && data.inForPerson.account && data.inForPerson.account.gender == 2) {
        var gender = 'Nữ'
    } else if (data.inForPerson && data.inForPerson.account && data.inForPerson.account.gender == 3) {
        var gender = ' Khác'
    } else {
        var gender = ''
    }

    if (data.inForPerson && data.inForPerson.account && data.inForPerson.account.married == 1) {
        var married = 'Độc thân'
    } else if (data.inForPerson && data.inForPerson.account && data.inForPerson.account.married == 2) {
        var married = "Đã kết hôn"
    } else {
        var married = "Chưa cập nhập"
    }

    // if (!isDataLoaded) {
    //     return
    // }
    console.log(data)

    return (
        <>
            <Head>
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
                <link
                    rel="stylesheet"
                    media="all"
                    href="../css/style.css"
                />
                <link
                    rel="stylesheet"
                    media="all"
                    href="../css/detail_employee.css"
                />
                <title>Trang xác thực mã OTP nhân viên</title>
            </Head>
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
                                <HeaderEp />
                            </div>
                        </div>
                        <div className="ctn_right_qly color_gray">
                            <div className="ctn_res_qly">
                                <div className="left_header_qly">
                                    <p className="share_clr_one font_14"><a className="avt_href_share share_fsize_one share_clr_one" href="/quan-ly-thong-tin-tai-khoan-nhan-vien.html"><img src="../img/href_pre.png" /></a>
                                        Thông tin tài khoản / Chỉnh sửa thông tin</p>
                                </div>
                                <div className="list_all_qly">
                                    <div className="main_tt main_tt_taikhoan_bang">
                                        <form className="edit_share_form share_distance edit_tt_taikhoan_to_form">
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        ID</label>
                                                    <input type="text" name="name_id" className="form-control share_fsize_one share_clr_one" placeholder="Nhập ID" value={data._id || ''} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Công ty</label>
                                                    <input type="text" name="congty" className="form-control share_fsize_one share_clr_one" placeholder="Nhập tên công ty" defaultValue={data.companyName || ''} readOnly />
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Họ và tên<span className="cr_red">*</span></label>
                                                    <input type="text" name="name_nv" className="form-control share_fsize_one share_clr_one" placeholder="Nhập họ và tên" defaultValue={data.userName || ''} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Email<span className="cr_red">*</span></label>
                                                    <input type="text" name="email" className="form-control share_fsize_one share_clr_one" placeholder="Nhập email" defaultValue={data.email || ''} readOnly />
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Số điện thoại <span className="cr_red">*</span></label>
                                                    <input type="text" name="phone" className="form-control share_fsize_one share_clr_one" placeholder="Nhập số điện thoại" defaultValue={data.phoneTK || ''} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Địa chỉ <span className="cr_red">*</span></label>
                                                    <input type="text" name="address" className="form-control share_fsize_one share_clr_one" placeholder="Nhập địa chỉ nơi ở" defaultValue={data.address || ''} />
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Giới tính<span className="cr_red">*</span></label>
                                                    <select defaultValue={data.inForPerson && data.inForPerson.account && data.inForPerson.account.gender} name="gioitinh" className="form-control">
                                                        <option value="1" >Nam</option>
                                                        <option value="2" >Nữ</option>
                                                        <option value="3" >Khác</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Ngày sinh <span className="cr_red">*</span></label>
                                                    <input type="date" name="ngaysinh" defaultValue={data.birthday} className="form-control share_fsize_one share_clr_one" placeholder="Nhập ngày sinh của bạn" />
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Trình độ học vấn <span className="cr_red">*</span></label>
                                                    <select defaultValue={data.inForPerson && data.inForPerson.account && data.inForPerson.account.education} name="trinhdo" className="form-control">
                                                        <option value="1" >Trên đại học</option>
                                                        <option value="2" >Đại học</option>
                                                        <option value="3" >Cao đẳng</option>
                                                        <option value="4" >Trung cấp</option>
                                                        <option value="5" >Đào tạo nghề</option>
                                                        <option value="6" >Trung học phổ thông</option>
                                                        <option value="7" >Trung học cơ sở</option>
                                                        <option value="8" >Tiểu học</option>
                                                    </select >
                                                </div >
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Tình trạng hôn nhân<span className="cr_red">*</span></label>
                                                    <select defaultValue={data.inForPerson && data.inForPerson.account && data.inForPerson.account.married} name="tinhtrang" className="form-control">
                                                        <option value="1" >Độc thân</option>
                                                        <option value="2" >Đã có gia đình</option>
                                                    </select >
                                                </div >
                                            </div >
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Kinh nghiệm làm việc <span className="cr_red">*</span></label>
                                                    <select defaultValue={data.inForPerson && data.inForPerson.account && data.inForPerson.account.experience} name="kinhnghiem" className="form-control">
                                                        <option value="1">Chưa có kinh nghiệm</option>
                                                        <option value="2">Dưới 1 năm kinh nghiệm</option>
                                                        <option value="3">1 năm</option>
                                                        <option value="4"> 2 năm</option >
                                                        <option value="5"> 3 năm</option >
                                                        <option value="6"> 4 năm</option >
                                                        <option value="7"> 5 năm</option >
                                                        <option value="8"> Trên 5 năm</option >
                                                    </select >
                                                </div >
                                                <div className="form-group share_done">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Ngày bắt đầu làm việc<span className="cr_red">*</span>
                                                    </label>
                                                    <input type="date" name="ngaylamviec" className="form-control share_fsize_one share_clr_one" value="" readOnly />

                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">Phòng ban </label>
                                                    <input type="text" name="phongban" className="form-control share_fsize_one share_clr_one" placeholder="Nhập tên phòng ban" defaultValue={'đw'} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">Chức vụ<span className="cr_red">*</span></label>
                                                    <input type="text" className="form-control" name="chuc_vu" value={data.inForPerson && data.inForPerson.employee && data.inForPerson.employee.position_id || ''} readOnly />
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one"> Tổ </label>
                                                    <select readOnly name="to" id="to_id" className="form-control">
                                                        <option value="">Chọn tổ</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one"> Nhóm</label>
                                                    <select readOnly name="nhom" id="nhom_id" className="form-control">
                                                        <option value="">Chọn nhóm</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="d_form_item d_flex content_c">
                                                <a type="button" className="btn_d huy_luu btn_trang btn_168" href="/quan-ly-thong-tin-tai-khoan-nhan-vien.html"> Hủy </a>
                                                <button type="button" className="btn_d btn_xanh btn_168 edit_inf_nv"> Lưu </button>
                                            </div>
                                        </form >
                                    </div >
                                </div >
                            </div >
                        </div >
                    </div >
                </div >
            </div >
            <>
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
        </>
    )
}