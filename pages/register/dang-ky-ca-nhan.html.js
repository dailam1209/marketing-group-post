import React from "react"
import Header from "/components/header/Header";
import Footer from "/components/footer/Footer"
import Head from "next/head";



//const inter = Inter({ subsets: [latin] })
export default function dang_ki_ca_nhan() {
    return (
        <>
            <Head>
                <>
                    <title>
                        Tích cực chuyển đổi số, quanlychung.timviec365.vn giúp bạn đổi đời, phát
                        triển
                    </title>
                    <meta
                        name="description"
                        content="Thời đại công nghệ số đòi hỏi mỗi cá nhân phải tân tiến và tự mình “chuyển đổi số” để thành công. Cùng timviec365.vn chuyển đổi số, tận dụng nhiều phần mềm cần thiết."
                    />
                    <meta
                        property="og:title"
                        content="Tích cực chuyển đổi số, quanlychung.timviec365.vn giúp bạn đổi đời, phát triển"
                    />
                    <meta
                        property="og:description"
                        content="Thời đại công nghệ số đòi hỏi mỗi cá nhân phải tân tiến và tự mình “chuyển đổi số” để thành công. Cùng timviec365.vn chuyển đổi số, tận dụng nhiều phần mềm cần thiết."
                    />
                    <meta
                        property="og:url"
                        content="https://quanlychung.timviec365.vn/dang-ky-ca-nhan.html"
                    />
                    <meta
                        property="og:image:url"
                        content="https://quanlychung.timviec365.vn/img/bgr_nentang.png"
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:locale" content="vi_VN" />
                    <link
                        rel="canonical"
                        href="https://quanlychung.timviec365.vn/dang-ky-ca-nhan.html"
                    />
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
                    <link rel="preload" as="style" href="../css/style.css?" />
                    <link
                        rel="stylesheet"
                        media="all"
                        href="../css/style.css"
                        onload="if (media != 'all')media='all'"
                    />
                </>

            </Head>
            <Header />
            <>
                <div className="content_ql ctn_bgr_body">
                    <div className="content_nv">
                        <div className="container">
                            <div className="ctn_qmk">
                                <form action="" className="register_form" autoComplete="false">
                                    <div className="one_page_qmk one_reg_ql share_reg_log share_brd_radius share_bgr_tow">
                                        <div className="header_qmk">
                                            <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                                                Đăng ký tài khoản cá nhân trên nền tảng chuyển đổi số lớn nhất
                                            </h1>
                                        </div>
                                        <div className="ctn_form share_distance">
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Tài khoản đăng nhập<span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email_nv"
                                                    className="form-control"
                                                    placeholder="Nhập số điện thoại"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Tên người dùng <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name_tk"
                                                    className="form-control"
                                                    placeholder="Nhập tên người dùng"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Nhập mật khẩu <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    id="mk_tkcn"
                                                    placeholder="Nhập mật khẩu"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Nhập lại mật khẩu <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="res_password"
                                                    className="form-control"
                                                    id="nlmk_tkcn"
                                                    placeholder="Nhập lại mật khẩu"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Số điện thoại
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="Nhập số điện thoại"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Địa chỉ <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    className="form-control"
                                                    placeholder="Nhập địa chỉ"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-butt-one">
                                            <button
                                                type="button"
                                                className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
                                            >
                                                Tiếp tục
                                            </button>
                                            <p className="bo_qua tex_center">
                                                <a
                                                    href="/register/lua-chon-dang-ky.html"
                                                    className="share_fsize_three share_clr_one"
                                                >
                                                    Quay lại
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
            <Footer />

        </>
    )
};