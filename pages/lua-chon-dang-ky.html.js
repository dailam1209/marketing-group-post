import React from "react"
import Header from "/components/header/Header";
import Footer from "/components/footer/Footer";
import Head from "next/head";




//const inter = Inter({ subsets: [latin] })
export default function register() {
    return (
        <>
            <Head>
                <>
                    <meta charSet="UTF-8" />
                    <meta name="robots" content="index,follow" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link href="https://timviec365.vn/favicon.ico" rel="shortcut icon" />
                    <title>
                        Đăng ký tài khoản trên hệ sinh thái chuyển đổi số 365, bạn được gì?
                    </title>
                    <meta
                        name="description"
                        content="Chuyển đổi số 365 là một nền tảng công nghệ lớn, nơi các tiện ích được chuyển đổi nhanh, đem đến sự thuận tiện phục vụ đa dạng yêu cầu công việc. Đăng ký ngay!"
                    />
                    <meta
                        property="og:title"
                        content="Đăng ký tài khoản trên hệ sinh thái chuyển đổi số 365, bạn được gì?"
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:locale" content="vi_VN" />
                    <meta
                        property="og:description"
                        content="Chuyển đổi số 365 là một nền tảng công nghệ lớn, nơi các tiện ích được chuyển đổi nhanh, đem đến sự thuận tiện phục vụ đa dạng yêu cầu công việc. Đăng ký ngay!"
                    />
                    <meta
                        property="og:image"
                        content="https://quanlychung.timviec365.vn/img/bgr_nentang.png"
                    />
                    <meta
                        property="og:url"
                        content="https://quanlychung.timviec365.vn/lua-chon-dang-ky.html"
                    />
                    <link
                        rel="canonical"
                        href="https://quanlychung.timviec365.vn/lua-chon-dang-ky.html"
                    />
                    <link
                        rel="preload"
                        href="/fonts/Roboto-Bold.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/Roboto-Medium.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/Roboto-Regular.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link rel="preload" as="style" href="/css/style.css" />
                    <link
                        rel="stylesheet"
                        media="all"
                        href="/css/style.css"
                        onload="if (media != 'all')media='all'"
                    />
                </>

            </Head>
            <Header />
            <>
                <div className="content_ql ctn_bgr_body">
                    <div className="content_nv log_reg">
                        <div className="container">
                            <div className="form_log">
                                <div className="titl_log tex_center">
                                    <h1 className="share_clr_tow cr_weight_bold h1">
                                        Chuyển đổi số nhanh, nhận ngay tiện ích lớn, đừng bỏ lỡ
                                    </h1>
                                    <p className="share_clr_tow share_fsize_tow">
                                        Để tiếp tục đăng ký bạn vui lòng chọn loại tài khoản.
                                    </p>
                                </div>
                                <div className="titl_form">
                                    <div className="ctn_log_butt">
                                        <a href="dang-ky-cong-ty.html" className="ct_butt">
                                            <div className="titl_del">
                                                <p className="share_fsize_tow cr_weight">Công ty</p>
                                                <p className="share_fsize_one share_clr_three">
                                                    Tài khoản công ty
                                                </p>
                                            </div>
                                        </a>
                                        <a href="dang-ky-nhan-vien.html" className="nv_butt">
                                            <div className="titl_del">
                                                <p className="share_fsize_tow cr_weight">Nhân viên</p>
                                                <p className="share_fsize_one share_clr_three">
                                                    Tài khoản nhân viên
                                                </p>
                                            </div>
                                        </a>
                                        <a href="dang-ky-ca-nhan.html" className="nv_butt">
                                            <div className="titl_del">
                                                <p className="share_fsize_tow cr_weight">Cá nhân</p>
                                                <p className="share_fsize_one share_clr_three">
                                                    Tài khoản cá nhân
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
            <Footer />
        </>)
};
