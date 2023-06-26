import React from "react"
import Header from "/components/header/Header";
import Footer from "/components/footer/Footer";
import Head from "next/head";




//const inter = Inter({ subsets: [latin] })
export default function register_emp() {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/style.css" />
                <title>
                    Tham gia hệ thống chuyển đổi số số 1 Việt Nam, tối giản và tiện ích
                </title>
                <meta
                    name="description"
                    content="Tham gia hệ sinh thái chuyển đổi số tân tiến số 1 của quanlychung.timviec365.vn, nhân viên sẽ có cơ hội tận hưởng những phần mềm tiện ích nhất. Đăng ký tài khoản ngay"
                />
                <meta
                    property="og:title"
                    content="Tham gia hệ thống chuyển đổi số số 1 Việt Nam, tối giản và tiện ích"
                />
                <meta
                    property="og:description"
                    content="Tham gia hệ sinh thái chuyển đổi số tân tiến số 1 của quanlychung.timviec365.vn, nhân viên sẽ có cơ hội tận hưởng những phần mềm tiện ích nhất. Đăng ký tài khoản ngay"
                />
                <meta
                    property="og:url"
                    content="https://quanlychung.timviec365.vn/dang-ky-nhan-vien.html"
                />
                <meta
                    property="og:image:url"
                    content="https://quanlychung.timviec365.vn/img/bgr_nentang.png"
                />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="vi_VN" />
                <link
                    rel="canonical"
                    href="https://quanlychung.timviec365.vn/dang-ky-nhan-vien.html"
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
                <link rel="preload" as="style" href="../css/style.css" />
                <link
                    rel="stylesheet"
                    media="all"
                    href="../css/style.css"
                    onload="if (media != 'all')media='all'"
                />
            </Head>
            <Header />
            <>
                <div className="content_nv">
                    <div className="ctn_register_nv">
                        <form className="regnv_form regnv_form_id" autoComplete="off">
                            <div className="one_page_qmk">
                                <div className="container">
                                    <div className="ctn_qmk">
                                        <div className="tow_reg_ql share_reg_log share_brd_radius share_bgr_tow ctn_register_nv">
                                            <div className="header_qmk">
                                                <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                                                    Trải nghiệm điều tuyệt vời tại nền tảng chuyển đổi số lớn
                                                    nhất hiện nay
                                                </h1>
                                                {/*                                                 <div class="qmk_avt_ic tex_center">
                                              <img src="../img/one_ic_reg_nv.png" alt="">
                                          </div> */}
                                            </div>
                                            <div className="ctn_form share_distance">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                        Vui lòng nhập ID Công Ty <span className="cr_red">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name_tk"
                                                        className="form-control"
                                                        id="name_id"
                                                        placeholder="Nhập ID công ty của bạn"
                                                    />
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
            <Footer />
        </>

    )
};