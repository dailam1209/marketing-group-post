import React from "react"
// import "../../Styles/globals.css"
import Link from 'next/link'
import router from "../../utils/router"

// import { useRouter } from 'next/navigation'
export default function Header() {
  // const router = useRouter()
  return (
    
    <>
        <>
  <meta charSet="UTF-8" />

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
</>
<div className="wrapper">
  <div className="header_ql">
    <div className="cnt_header">
      <div className="bg_wra">
        <div className="bg_ima_menu">
          <p className="menu_popup btx_modal_ind">
            <img src="../img/menu.png" alt="menu" />
          </p>
          <p></p>
        </div>
        <div className="bg_ima">
          <a href="https://timviec365.vn/">
            <img src="../img/logo.png" alt="logo công ty" />
          </a>
        </div>
        <div className="header_nav">
          <div className="nav">
            <ul>
              <li>
                    <Link href={router.home} as='/' className="cr_weight_bold share_fsize_tow share_clr_tow ">Trang chủ</Link>
              </li>
              <li>
                      <Link href={router.product} as='/san-pham.html' className="cr_weight_bold share_fsize_tow share_clr_tow active">Sản phẩm</Link>

              </li>
              <li>
                      <Link href={router.eco} as='/he-sinh-thai.html' className="cr_weight_bold share_fsize_tow share_clr_tow ">Hệ sinh thái</Link>

              </li>
              <li>
                        <Link href="https://timviec365.vn/blog" className="cr_weight_bold share_fsize_tow share_clr_tow">Tin tức</Link>

              </li>
            </ul>
            <div className="hd_log">
              <div className="bg_log">
                <p>
                        <Link href={router.register} as='/dang-ki' className="cr_weight_bold share_fsize_tow share_clr_tow">Đăng ký</Link>

                  /
                        <Link href={router.login} as='/dang-nhap' className="cr_weight_bold share_fsize_tow share_clr_tow">Đăng nhập</Link>

                </p>
              </div>
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
