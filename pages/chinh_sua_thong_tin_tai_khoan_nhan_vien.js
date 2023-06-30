import React from "react"
// import Header from "../components/header/Header"
// import Footer from "../components/footer/Footer"
import Cookies from "js-cookie";
import router from "../utils/router"
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

//const inter = Inter({ subsets: [latin] })
export default function ecosystem() {
    var token = Cookies.get("access_token");
    const [infoAcc, setInfoAcc] = useState({});

    const headers = {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    let data1 = {};
    axios.post("http://210.245.108.202:3000/api/qlc/individual/info", data1, {
        headers: headers
    })
        .then((response) => {
            //  console.log(response.data.data.data._id);
            setInfoAcc(response.data.data.data);
        })
        .catch((error) => {
            console.log(error)
        })
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        axios.post("http://210.245.108.202:3000/api/qlc/employee/updateInfoEmployee", data, {
            headers: headers
        })
            .then((response) => {
                console.log(response);
                window.location.href = "/quan-ly-thong-tin-tai-khoan-nhan-vien";
            })
            .catch((error) => {
                console.log(error)
            })

    }

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
                <title>Chỉnh sửa tài khoản nhân viên</title>
            </>

            <div id="tt_taikhoan_bang">
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
                                    <a href="quan-ly-ung-dung-ca-nhan.html" className="nav-item ">
                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                            <span className="item_ic">
                                                <img src="../img/ung-dung.png" alt="Ứng dụng" />
                                            </span>
                                            Ứng dụng
                                        </li>
                                    </a>
                                    <a
                                        href="quan-ly-thong-tin-tai-khoan-nhan-vien.html"
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
                                    <a href="quan-ly-thong-tin-viec-lam.html" className="nav-item ">
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
                                    <p className="share_clr_one font_14">
                                        <a
                                            className="avt_href_share share_fsize_one share_clr_one"
                                            href="/quan-ly-thong-tin-tai-khoan-nhan-vien.html"
                                        >
                                            <img src="../img/href_pre.png" />
                                        </a>
                                        Thông tin tài khoản / Chỉnh sửa thông tin
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
                        <div className="ctn_right_qly color_gray">
                            <div className="ctn_res_qly">
                                <div className="left_header_qly">
                                    <p className="share_clr_one font_14">
                                        <a
                                            className="avt_href_share share_fsize_one share_clr_one"
                                            href="/quan-ly-thong-tin-tai-khoan-nhan-vien.html"
                                        >
                                            <img src="../img/href_pre.png" />
                                        </a>
                                        Thông tin tài khoản / Chỉnh sửa thông tin
                                    </p>
                                </div>
                                <div className="list_all_qly">
                                    <div className="main_tt main_tt_taikhoan_bang">
                                        <form className="edit_share_form share_distance edit_tt_taikhoan_to_form" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        ID
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name_id"
                                                        className="form-control share_fsize_one share_clr_one"
                                                        placeholder="Nhập ID"
                                                        defaultValue={infoAcc._id}
                                                        readOnly=""
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Công ty
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="congty"
                                                        className="form-control share_fsize_one share_clr_one"
                                                        placeholder="Nhập tên công ty"
                                                        defaultValue=""
                                                        readOnly=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Họ và tên<span className="cr_red">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name_nv"
                                                        className="form-control share_fsize_one share_clr_one"
                                                        placeholder="Nhập họ và tên"
                                                        defaultValue={infoAcc.userName}
                                                        {...register("name_nv", {
                                                            required: true,

                                                        })}
                                                    />
                                                    {errors.name_nv && <label className="error">Không được để trống</label>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Email<span className="cr_red">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        className="form-control share_fsize_one share_clr_one"
                                                        placeholder="Nhập email"
                                                        defaultValue=""
                                                        readOnly=""
                                                        {...register("email", {
                                                            // required: true,

                                                        })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Số điện thoại <span className="cr_red">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        className="form-control share_fsize_one share_clr_one"
                                                        placeholder="Nhập số điện thoại"
                                                        defaultValue={infoAcc.phone}
                                                        {...register("phone", {
                                                            required: true,

                                                        })}
                                                    />
                                                    {errors.phone && <label className="error">Không được để trống</label>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Địa chỉ <span className="cr_red">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        className="form-control share_fsize_one share_clr_one"
                                                        placeholder="Nhập địa chỉ nơi ở"
                                                        defaultValue={infoAcc.address}
                                                        {...register("address", {
                                                            required: true,

                                                        })}
                                                    />
                                                    {errors.address && <label className="error">Không được để trống</label>}
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Giới tính<span className="cr_red">*</span>
                                                    </label>
                                                    <select name="gioitinh" className="form-control"
                                                        {...register("gioitinh", {
                                                            //required: true,

                                                        })}>
                                                        <option value={1} selected="">
                                                            Nam
                                                        </option>
                                                        <option value={2}>Nữ</option>
                                                        <option value={3}>Khác</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Ngày sinh <span className="cr_red">*</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="ngaysinh"
                                                        defaultValue={(infoAcc.inForPerson && infoAcc.inForPerson.account && infoAcc.inForPerson.account.birthday) ? infoAcc.inForPerson.account.birthday : ""}
                                                        className="form-control share_fsize_one share_clr_one"
                                                        placeholder="Nhập ngày sinh của bạn"
                                                        {...register("ngaysinh", {
                                                            required: true,

                                                        })}
                                                    />
                                                    {errors.ngaysinh && <label className="error">Không được để trống</label>}
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Trình độ học vấn <span className="cr_red">*</span>
                                                    </label>
                                                    <select name="trinhdo" className="form-control"
                                                        {...register("trinhdo", {
                                                            //required: true,

                                                        })}>
                                                        <option value={1}>Trên đại học</option>
                                                        <option value={2} selected="">
                                                            Đại học
                                                        </option>
                                                        <option value={3}>Cao đẳng</option>
                                                        <option value={4}>Trung cấp</option>
                                                        <option value={5}>Đào tạo nghề</option>
                                                        <option value={6}>Trung học phổ thông</option>
                                                        <option value={7}>Trung học cơ sở</option>
                                                        <option value={8}>Tiểu học</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Tình trạng hôn nhân<span className="cr_red">*</span>
                                                    </label>
                                                    <select name="tinhtrang" className="form-control"
                                                        {...register("tinhtrang", {
                                                            //required: true,

                                                        })}>
                                                        <option value={2}>Đã có gia đình</option>
                                                        <option value={1} selected="">
                                                            Độc thân
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Kinh nghiệm làm việc <span className="cr_red">*</span>
                                                    </label>
                                                    <select name="kinhnghiem" className="form-control"
                                                        {...register("kinhnghiem", {
                                                            //required: true,

                                                        })}>
                                                        <option value={1}>Chưa có kinh nghiệm</option>
                                                        <option value={2} selected="">
                                                            Dưới 1 năm kinh nghiệm
                                                        </option>
                                                        <option value={3}>1 năm</option>
                                                        <option value={4}>2 năm</option>
                                                        <option value={5}>3 năm</option>
                                                        <option value={6}>4 năm</option>
                                                        <option value={7}>5 năm</option>
                                                        <option value={8}>Trên 5 năm</option>
                                                    </select>
                                                </div>
                                                <div className="form-group share_done">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Ngày bắt đầu làm việc<span className="cr_red">*</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="ngaylamviec"
                                                        className="form-control share_fsize_one share_clr_one"
                                                        defaultValue="2023-06-15"
                                                        disabled=""
                                                        {...register("ngaylamviec", {
                                                            //required: true,

                                                        })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Phòng ban{" "}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="phongban"
                                                        className="form-control share_fsize_one share_clr_one"
                                                        placeholder="Nhập tên phòng ban"
                                                        defaultValue=""
                                                        data=""
                                                        readOnly=""
                                                        {...register("phongban", {
                                                            //required: true,

                                                        })}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Chức vụ<span className="cr_red">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="chuc_vu"
                                                        defaultValue="Nhân viên chính thức"
                                                        data={3}
                                                        readOnly=""
                                                        {...register("chuc_vu", {
                                                            //required: true,

                                                        })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        {" "}
                                                        Tổ{" "}
                                                    </label>
                                                    <select name="to" id="to_id" className="form-control"

                                                        {...register("to", {
                                                            //required: true,

                                                        })}>
                                                        <option value="">Chọn tổ</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        {" "}
                                                        Nhóm
                                                    </label>
                                                    <select name="nhom" id="nhom_id" className="form-control"
                                                        {...register("nhom", {
                                                            //required: true,

                                                        })}>
                                                        <option value="">Chọn nhóm</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="d_form_item d_flex content_c">
                                                <button
                                                    type="button"
                                                    className="btn_d huy_luu btn_trang btn_168"
                                                >
                                                    {" "}
                                                    Hủy{" "}
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="btn_d btn_xanh btn_168 edit_inf_nv"
                                                >
                                                    {" "}
                                                    Lưu{" "}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}