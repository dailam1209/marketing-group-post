import React from "react"
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function Header() {
  const router = useRouter();
  return (
    <>
      <div id="san_pham" className="share_sph">
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
                        <Link href="/" className="cr_weight_bold share_fsize_tow share_clr_tow">Trang chủ</Link>
                      </li>
                      <li>
                        <Link href="/product" className="cr_weight_bold share_fsize_tow share_clr_tow active">Sản phẩm</Link>
                      </li>
                      <li>
                        <Link href="/he-sinh-thai" className="cr_weight_bold share_fsize_tow share_clr_tow ">Hệ sinh thái</Link>
                      </li>
                      <li>
                        <Link href="https://timviec365.vn/blog" className="cr_weight_bold share_fsize_tow share_clr_tow">Tin tức</Link>
                      </li>
                    </ul>
                    <div className="hd_log">
                      <div className="bg_log">
                        <p>
                          <Link href="lua-chon-dang-ky.html" className="cr_weight_bold share_fsize_tow share_clr_tow">Đăng ký</Link>
                          /
                          <Link href="lua-chon-dang-ky.html" className="cr_weight_bold share_fsize_tow share_clr_tow">Đăng nhập</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>


    </>

  )
}
