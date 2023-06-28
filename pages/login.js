import React from "react"
import Header from "/components/header/Header";
import Footer from "/components/footer/Footer";
import Head from "next/head";




//const inter = Inter({ subsets: [latin] })
export default function register() {
  return (
    <>
      <>
        <meta charSet="UTF-8" />
        <meta name="robots" content="index,follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://timviec365.vn/favicon.ico" rel="shortcut icon" />
        <title>Chuyển đổi số tại timviec365.vn giúp tối ưu công việc hiệu quả</title>
        <meta
          name="description"
          content="Đăng nhập để trải nghiệm nhiêu phần mềm, ứng dụng tiện ích lớn như tính lương, chấm công, quản trị nhân sự, đánh giá năng lực, ... tại hệ thống chuyển đổi số 365."
        />
        <meta
          property="og:title"
          content="Chuyển đổi số tại timviec365.vn giúp tối ưu công việc hiệu quả"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="vi_VN" />
        <meta
          property="og:description"
          content="Đăng nhập để trải nghiệm nhiêu phần mềm, ứng dụng tiện ích lớn như tính lương, chấm công, quản trị nhân sự, đánh giá năng lực, ... tại hệ thống chuyển đổi số 365."
        />
        <meta
          property="og:image"
          content="https://quanlychung.timviec365.vn/img/bgr_nentang.png"
        />
        <meta
          property="og:url"
          content="https://quanlychung.timviec365.vn/lua-chon-dang-nhap.html"
        />
        <link
          rel="canonical"
          href="https://quanlychung.timviec365.vn/lua-chon-dang-nhap.html"
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
      {/* content-------------------------------------------------------------------------- */}
      <>
        <div className="content_ql ctn_bgr_body">
          <div className="content_nv log_reg">
            <div className="container">
              <div className="form_log">
                <div className="titl_log tex_center">
                  <h1 className="share_clr_tow cr_weight_bold h1">
                    Vô vàn ứng dụng tiện ích tại hệ thống chuyển đổi số hàng đầu Việt
                    Nam
                  </h1>
                  <p className="share_clr_tow share_fsize_tow">
                    Để tiếp tục đăng nhập bạn vui lòng chọn loại tài khoản.
                  </p>
                </div>
                <div className="titl_form">
                  <div className="ctn_log_butt">
                    <a href="dang-nhap-cong-ty.html" className="ct_butt">
                      <div className="titl_del">
                        <h4 className="share_fsize_tow cr_weight">Công ty</h4>
                        <p className="share_fsize_one share_clr_three">
                          Tài khoản công ty
                        </p>
                      </div>
                    </a>
                    <a href="dang-nhap-nhan-vien.html" className="nv_butt">
                      <div className="titl_del">
                        <h4 className="share_fsize_tow cr_weight">Nhân viên</h4>
                        <p className="share_fsize_one share_clr_three">
                          Tài khoản nhân viên
                        </p>
                      </div>
                    </a>
                    <a href="dang-nhap-ca-nhan.html" className="nv_butt">
                      <div className="titl_del">
                        <h4 className="share_fsize_tow cr_weight">Cá nhân</h4>
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



    </>)
};
