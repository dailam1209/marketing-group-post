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
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    var token = Cookies.get('access_token');

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await callApi.getInfoEp(token);
                setData(response.data.data.data)
                setIsDataLoaded(true);
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

    // console.log(data.inForPerson.account);
    if (!isDataLoaded) {
        return
    }
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
                        <div class="ctn_right_qly color_gray">
                            <div class="ctn_res_qly">
                                <div class="left_header_qly">
                                    <p class="share_clr_one font_14"><a class="avt_href_share share_fsize_one share_clr_one" href="/quan-ly-thong-tin-tai-khoan-nhan-vien.html"><img src="../img/href_pre.png" /></a>
                                        Thông tin tài khoản / Chỉnh sửa thông tin</p>
                                </div>
                                <div class="list_all_qly">
                                    <div class="main_tt main_tt_taikhoan_bang">
                                        <form class="edit_share_form share_distance edit_tt_taikhoan_to_form">
                                            <div class="d_form_item form_container d_flex">
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        ID</label>
                                                    <input type="text" name="name_id" class="form-control share_fsize_one share_clr_one" placeholder="Nhập ID" value={data._id} readonly />
                                                </div>
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Công ty</label>
                                                    <input type="text" name="congty" class="form-control share_fsize_one share_clr_one" placeholder="Nhập tên công ty" value={data.companyName} readonly />
                                                </div>
                                            </div>
                                            <div class="d_form_item form_container d_flex">
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Họ và tên<span class="cr_red">*</span></label>
                                                    <input type="text" name="name_nv" class="form-control share_fsize_one share_clr_one" placeholder="Nhập họ và tên" value={data.userName} />
                                                </div>
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Email<span class="cr_red">*</span></label>
                                                    <input type="text" name="email" class="form-control share_fsize_one share_clr_one" placeholder="Nhập email" value={data.email} readonly />
                                                </div>
                                            </div>
                                            <div class="d_form_item form_container d_flex">
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Số điện thoại <span class="cr_red">*</span></label>
                                                    <input type="text" name="phone" class="form-control share_fsize_one share_clr_one" placeholder="Nhập số điện thoại" value={data.phoneTK} />
                                                </div>
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Địa chỉ <span class="cr_red">*</span></label>
                                                    <input type="text" name="address" class="form-control share_fsize_one share_clr_one" placeholder="Nhập địa chỉ nơi ở" value={data.address} />
                                                </div>
                                            </div>
                                            <div class="d_form_item form_container d_flex">
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Giới tính<span class="cr_red">*</span></label>
                                                    <select name="gioitinh" class="form-control">
                                                        <option value="1" >Nam</option>
                                                        <option value="2" >Nữ</option>
                                                        <option value="3" >Khác</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Ngày sinh <span class="cr_red">*</span></label>
                                                    <input type="date" name="ngaysinh" value={data.birthday} class="form-control share_fsize_one share_clr_one" placeholder="Nhập ngày sinh của bạn" />
                                                </div>
                                            </div>
                                            <div class="d_form_item form_container d_flex">
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Trình độ học vấn <span class="cr_red">*</span></label>
                                                    <select name="trinhdo" class="form-control">
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
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Tình trạng hôn nhân<span class="cr_red">*</span></label>
                                                    <select name="tinhtrang" class="form-control">
                                                        <option value="2" >Đã có gia đình</option>
                                                        <option value="1" >Độc thân</option>
                                                    </select >
                                                </div >
                                            </div >
                                            <div class="d_form_item form_container d_flex">
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Kinh nghiệm làm việc <span class="cr_red">*</span></label>
                                                    <select name="kinhnghiem" class="form-control">
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
                                                <div class="form-group share_done">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Ngày bắt đầu làm việc<span class="cr_red">*</span>
                                                    </label>
                                                    <input type="date" name="ngaylamviec" class="form-control share_fsize_one share_clr_one" value="" disabled />

                                                </div>
                                            </div>
                                            <div class="d_form_item form_container d_flex">
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">Phòng ban </label>
                                                    <input type="text" name="phongban" class="form-control share_fsize_one share_clr_one" placeholder="Nhập tên phòng ban" value="<?= $dep_name; ?>" data="<?= $tt_user['dep_id']; ?>" readonly />
                                                </div>
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one">Chức vụ<span class="cr_red">*</span></label>
                                                    <input type="text" class="form-control" name="chuc_vu" value="<?= $position_name; ?>" data="<?= $position_id; ?>" readonly />
                                                </div>
                                            </div>
                                            <div class="d_form_item form_container d_flex">
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one"> Tổ </label>
                                                    <select name="to" id="to_id" class="form-control">
                                                        <option value="">Chọn tổ</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label class="form_label share_fsize_three tex_left cr_weight share_clr_one"> Nhóm</label>
                                                    <select name="nhom" id="nhom_id" class="form-control">
                                                        <option value="">Chọn nhóm</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="d_form_item d_flex content_c">
                                                <button type="button" class="btn_d huy_luu btn_trang btn_168"> Hủy </button>
                                                <button type="button" class="btn_d btn_xanh btn_168 edit_inf_nv"> Lưu </button>
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