import React from "react"
import Header from "/components/header/Header";
import Footer from "/components/footer/Footer";
import Head from "next/head";
import Link from 'next/link'
import router from "../utils/router"

import { useRouter } from 'next/navigation'



//const inter = Inter({ subsets: [latin] })
export default function register() {
    return (
        <>
                <>
                <>
  <meta name="robots" content="index,follow" />
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
</>

                </>

   
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
                                        <Link href={router.registerCom1} as="/dang-ky-tai-khoan-cong-ty" className="ct_butt">
                                            <div className="titl_del">
                                                <p className="share_fsize_tow cr_weight">Công ty</p>
                                                <p className="share_fsize_one share_clr_three">
                                                    Tài khoản công ty
                                                </p>
                                            </div>
                                        </Link>
                                        <Link href={router.registerEmp1} as="/dang-ky-tai-khoan-nhan-vien" className="nv_butt">
                                            <div className="titl_del">
                                                <p className="share_fsize_tow cr_weight">Nhân viên</p>
                                                <p className="share_fsize_one share_clr_three">
                                                    Tài khoản nhân viên
                                                </p>
                                            </div>
                                        </Link>

                                        <Link href={router.registerPer1} as="/dang-ky-tai-khoan-ca-nhan" className="nv_butt">

                                            <div className="titl_del">
                                                <p className="share_fsize_tow cr_weight">Cá nhân</p>
                                                <p className="share_fsize_one share_clr_three">
                                                    Tài khoản cá nhân
                                                </p>
                                            </div>
                                        </Link>

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
