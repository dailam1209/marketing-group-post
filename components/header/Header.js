import { React, useState, useEffect } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header(props) {
    // get pathname url
    const router = useRouter()
    let slug = router.pathname

    return (
        <>
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
                                        <Link href={'/'} className={`cr_weight_bold share_fsize_tow share_clr_tow  ${(slug == '/') ? 'active' : ''}`}>Trang chủ</Link>
                                    </li>
                                    <li>
                                        <Link href={'/san-pham.html'} className={`cr_weight_bold share_fsize_tow share_clr_tow ${(slug == '/san-pham.html') ? 'active' : ''}`}>Sản phẩm</Link>

                                    </li>
                                    <li>
                                        <Link href={'/he-sinh-thai.html'} className={`cr_weight_bold share_fsize_tow share_clr_tow ${(slug == '/he-sinh-thai.html') ? 'active' : ''}`}>Hệ sinh thái</Link>

                                    </li>
                                    <li>
                                        <Link href="https://timviec365.vn/blog" className="cr_weight_bold share_fsize_tow share_clr_tow">Tin tức</Link>

                                    </li>
                                </ul>
                                <div className="hd_log">
                                    <div className="bg_log">
                                        <p>
                                            <Link href={'lua-chon-dang-ky.html/'} className="cr_weight_bold share_fsize_tow share_clr_tow">Đăng ký</Link>
                                            /
                                            <Link href={'/lua-chon-dang-nhap.html'} className="cr_weight_bold share_fsize_tow share_clr_tow">Đăng nhập</Link>
                                        </p>
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
