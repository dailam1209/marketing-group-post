import React from "react"
// import Header from "../components/header/Header"
// import Footer from "../components/footer/Footer"

import router from "../utils/router"
import Head from "next/head";

//const inter = Inter({ subsets: [latin] })
export default function admin() {
    return (
        <>

            <Head>
                <>
                    <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
                    <title>Administrator</title>
                    {/* / <base href="https://vieclamtaihanoi.com.vn/" /> */}
                    <link href="#" rel="shortcut icon" />
                    <link rel="stylesheet" href="css/admin.css" type="text/css" />
                    <link href="css/ui-lightness/jquery-ui-1.10.4.custom.css" rel="stylesheet" />
                </>

            </Head>
            <>
                <div id="header">
                    <div className="logo">
                        <a href="https://vieclamtaihanoi.com.vn/admin">
                            <img src="img/admin-logo.png" />
                        </a>
                    </div>
                    <div className="header-right">
                        Chào{" "}
                        <a
                            href="https://vieclamtaihanoi.com.vn/admin/edit_thanhvien/2"
                            className="name-admin"
                        >
                            Administrator
                        </a>
                        <a className="exit" href="https://vieclamtaihanoi.com.vn/admin/thoat">
                            Thoát
                        </a>
                    </div>
                </div>
                <div id="mainmenu">
                    <div className="navbar-inner">
                        <ul>
                            <li>
                                <a href="https://vieclamtaihanoi.com.vn/admin">Quản trị</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Module phụ</a>
                                <ul className="sub-menu">
                                    {/*<li><a href="https://vieclamtaihanoi.com.vn/admin/banner">Banner</a></li>
          <li><a href="https://vieclamtaihanoi.com.vn/admin/slider">Slider</a></li>*/}
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/custom">
                                            Custom HTML
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Quản lý bài viết</a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/chuyenmuc">
                                            Chuyên mục
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/baiviet">
                                            Bài viết
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/modules_footer">
                                            SEO TT
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/nganhnghecv">
                                            Bài Viết Ngành Nghề CV
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/ngonngucv">
                                            Bài Viết Ngôn Ngữ CV
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/nganhnghethu">
                                            Bài Viết Ngành Nghề Thư XV
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/nganhnghedon">
                                            Bài Viết Ngành Nghề Đơn XV
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Quản lý việc làm</a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/vieclam">
                                            tất cả việc làm
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/doanhnghiep">
                                            Quản lý doanh nghiệp
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/ungvien">
                                            Quản lý ứng viên
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Quản lý CV</a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/maucv">Mẫu Cv</a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/danhmuccv">
                                            Danh mục Cv
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/ngonngucv">
                                            Ngôn ngữ Cv{" "}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/nganhnghecv">
                                            Ngành nghề Cv
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Quản lý Đơn-Thư-Sơ Yếu Lý Lịch </a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/maudxv">Mẫu Đơn </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/mautxv">Mẫu Thư </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/maulylich">
                                            Quản lý Sơ Yếu Lý Lịch
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/nganhnghethu">
                                            Ngành nghề Thư
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/nganhnghedon">
                                            Ngành nghề Đơn
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Chấm công 365</a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/danhsachcongty">
                                            Danh sách công ty
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/danhsachnv">
                                            Danh sách nhân viên
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/nhanviencty">
                                            Theo dõi nhân viên chấm công
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/dsnv_chamcong">
                                            Ds nhân viên chấm công
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/dsnv_kochamcong">
                                            Ds nhân viên không chấm công
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/ds_tt_error">
                                            Danh sách báo lỗi
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/ds_tt_feedback">
                                            Danh sách đánh giá
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/ds_tuvan">
                                            Ds đặt lịch tư vấn
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/ds_cauhoi">
                                            Danh sách câu hỏi
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" href="https://vieclamtaihanoi.com.vn/adminCC">
                                            Hỗ trợ cài đặt chấm công
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://phanmemnhansu.timviec365.vn/admin/auth/login"
                                >
                                    HR 365
                                </a>
                            </li>
                            <li>
                                <a href="admin/pagemeta">Quản lý Meta</a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/edit_meta/1">
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/edit_meta/2">
                                            Tin tuyển dụng
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/edit_meta/3">
                                            Nhà tuyển dụng
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://vieclamtaihanoi.com.vn/admin/edit_meta/4">
                                            Ứng viên
                                        </a>
                                    </li>
                                    {/*
          
          
          
          <li><a href="https://vieclamtaihanoi.com.vn/admin/edit_footer/4">Form ước tính lương</a>
          </li>*/}
                                </ul>
                            </li>
                            <li>
                                <a href="https://vieclamtaihanoi.com.vn/admin/edit_footer/1">
                                    Thông số chung
                                </a>
                            </li>
                            <li>
                                <a href="https://vieclamtaihanoi.com.vn/admin/tbladmin">Thành viên</a>
                            </li>
                        </ul>
                    </div>{" "}
                </div>
                <div id="main" className="container">
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td valign="top" id="left" width={230}>
                                    <div className="left-inner">
                                        <div className="module">
                                            <div className="module-inner">
                                                <div className="module-ct">
                                                    <div id="lich" className="hasDatepicker">
                                                        <div
                                                            className="ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"
                                                            style={{ display: "block" }}
                                                        >
                                                            <div className="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
                                                                <a
                                                                    className="ui-datepicker-prev ui-corner-all"
                                                                    data-handler="prev"
                                                                    data-event="click"
                                                                    title="<Trước"
                                                                >
                                                                    <span className="ui-icon ui-icon-circle-triangle-w">&lt;Trước</span>
                                                                </a>
                                                                <a
                                                                    className="ui-datepicker-next ui-corner-all"
                                                                    data-handler="next"
                                                                    data-event="click"
                                                                    title="Tiếp>"
                                                                >
                                                                    <span className="ui-icon ui-icon-circle-triangle-e">Tiếp&gt;</span>
                                                                </a>
                                                                <div className="ui-datepicker-title">
                                                                    <span className="ui-datepicker-month">Tháng Bảy</span>&nbsp;
                                                                    <span className="ui-datepicker-year">2023</span>
                                                                </div>
                                                            </div>
                                                            <table className="ui-datepicker-calendar">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="ui-datepicker-week-end">
                                                                            <span title="Chủ Nhật">CN</span>
                                                                        </th>
                                                                        <th>
                                                                            <span title="Thứ Hai">T2</span>
                                                                        </th>
                                                                        <th>
                                                                            <span title="Thứ Ba">T3</span>
                                                                        </th>
                                                                        <th>
                                                                            <span title="Thứ Tư">T4</span>
                                                                        </th>
                                                                        <th>
                                                                            <span title="Thứ Năm">T5</span>
                                                                        </th>
                                                                        <th>
                                                                            <span title="Thứ Sáu">T6</span>
                                                                        </th>
                                                                        <th className="ui-datepicker-week-end">
                                                                            <span title="Thứ Bảy">T7</span>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td
                                                                            className=" ui-datepicker-week-end ui-datepicker-days-cell-over  ui-datepicker-current-day ui-datepicker-today"
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a
                                                                                className="ui-state-default ui-state-highlight ui-state-active"
                                                                                href="#"
                                                                            >
                                                                                1
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            className=" ui-datepicker-week-end "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                2
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                3
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                4
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                5
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                6
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                7
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" ui-datepicker-week-end "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                8
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            className=" ui-datepicker-week-end "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                9
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                10
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                11
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                12
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                13
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                14
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" ui-datepicker-week-end "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                15
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            className=" ui-datepicker-week-end "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                16
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                17
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                18
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                19
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                20
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                21
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" ui-datepicker-week-end "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                22
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            className=" ui-datepicker-week-end "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                23
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                24
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                25
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                26
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                27
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                28
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" ui-datepicker-week-end "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                29
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            className=" ui-datepicker-week-end "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                30
                                                                            </a>
                                                                        </td>
                                                                        <td
                                                                            className=" "
                                                                            data-handler="selectDay"
                                                                            data-event="click"
                                                                            data-month={6}
                                                                            data-year={2023}
                                                                        >
                                                                            <a className="ui-state-default" href="#">
                                                                                31
                                                                            </a>
                                                                        </td>
                                                                        <td className=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">
                                                                            &nbsp;
                                                                        </td>
                                                                        <td className=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">
                                                                            &nbsp;
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>{" "}
                                    <div className="clr" />
                                </td>
                                <td valign="top" id="content">
                                    <div className="content-inner">
                                        <form
                                            name="frmxoaall"
                                            id="frmxoaall"
                                            method="post"
                                            action="https://vieclamtaihanoi.com.vn/admin/del_chuyenmuc"
                                        >
                                            <p className="sidebar">
                                                <a href="https://vieclamtaihanoi.com.vn/admin/frmchuyenmuc">
                                                    Thêm mới
                                                </a>
                                                {/*  <input type="submit" name="submit" value="Xóa" /> */}
                                            </p>
                                            <table width="100%">
                                                <tbody>
                                                    <tr className="title">
                                                        <td width="5%" align="center">
                                                            <input
                                                                type="checkbox"
                                                                onclick="checkall('checkbox', this)"
                                                                name="check"
                                                            />
                                                        </td>
                                                        <td>Tên</td>
                                                        <td>Đường dẫn</td>
                                                        <td>Chuyên mục cha</td>
                                                        <td width="10%">Menu</td>
                                                        <td width="8%">Thứ tự</td>
                                                        <td width="8%">Trạng thái</td>
                                                        <td width="5%" align="center">
                                                            id
                                                        </td>
                                                    </tr>
                                                    <tr className="odd">
                                                        <td align="center">
                                                            <div id="request-form">
                                                                <input
                                                                    type="checkbox"
                                                                    name="checkbox[]"
                                                                    className="checkbox"
                                                                    defaultValue={3}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a href="https://vieclamtaihanoi.com.vn/admin/edit_chuyenmuc/3">
                                                                Câu hỏi tuyển dụng
                                                            </a>
                                                        </td>
                                                        <td>cau-hoi-tuyen-dung</td>
                                                        <td>-</td>
                                                        <td align="center">Có</td>
                                                        <td align="center">3</td>
                                                        <td align="center">
                                                            <a
                                                                className="status"
                                                                onclick="check_status(3,'tbl_chuyenmuc','chuyenmuc')"
                                                            >
                                                                <img src="images/toolbar/tick.png" />
                                                            </a>
                                                        </td>
                                                        <td align="center">3</td>
                                                    </tr>
                                                    <tr className="even">
                                                        <td align="center">
                                                            <div id="request-form">
                                                                <input
                                                                    type="checkbox"
                                                                    name="checkbox[]"
                                                                    className="checkbox"
                                                                    defaultValue={2}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a href="https://vieclamtaihanoi.com.vn/admin/edit_chuyenmuc/2">
                                                                Kinh nghiệm việc làm
                                                            </a>
                                                        </td>
                                                        <td>kinh-nghiem-viec-lam</td>
                                                        <td>-</td>
                                                        <td align="center">Có</td>
                                                        <td align="center">2</td>
                                                        <td align="center">
                                                            <a
                                                                className="status"
                                                                onclick="check_status(2,'tbl_chuyenmuc','chuyenmuc')"
                                                            >
                                                                <img src="images/toolbar/tick.png" />
                                                            </a>
                                                        </td>
                                                        <td align="center">2</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                        <div className="clr" />
                                        <div className="pagation"></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="clr" />
                <div id="footer">
                    <p className="copyright">© BẢN QUYỀN THUỘC VỀ HIỆP.</p>{" "}
                </div>
            </>





        </>
    )
}