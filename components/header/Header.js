import { React, useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header(props) {
    // get pathname url
    const router = useRouter()
    let slug = router.pathname

    const [popup, setPopup] = useState(false)
    const showPopup = () => {
        if (popup) {
            setPopup(false)
        } else {
            setPopup(true)
        }
    }


    const [showLogout, setShowLogout] = useState(false)

    const show = () => {
        setShowLogout(true)
    }

    const no = () => {
        setShowLogout(false)
    }

    const yes = () => {
        document.cookie = 'token_base365' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'rf_token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'role' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';
    }

    const [showSideBar, setShowSideBar] = useState(false)
    const handleSideBar = () => {
        if (showSideBar == true) {
            setShowSideBar(false)
        } else {
            setShowSideBar(true)
        }
    }

    return (
        <>
            <div className="header_ql">
                <div className="cnt_header">
                    <div className="bg_wra">
                        <div className="bg_ima_menu" onClick={handleSideBar}>
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
                                {
                                    (slug == '/thong-bao-tai-khoan-vip.html' && props.acc_token && props.rf_token) ? (
                                        <>
                                            <div className="hd_log">
                                                <div className="bg_log_aff" data="97602">
                                                    <div className="bg_log_img" onClick={showPopup}>
                                                        <img src="../img/add.png" alt="" />
                                                    </div>
                                                    <div className="bg_logout">
                                                        <div className="chd_content">
                                                            <p className="chuyen_doi">
                                                                <a href="/quan-ly-ung-dung-cong-ty.html">Chuyển đổi số 365</a>
                                                            </p>
                                                            <p className="dang_xuat btx_logout">
                                                                <a>Đăng xuất</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="hd_log">
                                                <div className="bg_log">
                                                    <p>
                                                        <Link href={'lua-chon-dang-ky.html/'} className="cr_weight_bold share_fsize_tow share_clr_tow">Đăng ký </Link>
                                                        /
                                                        <Link href={'/lua-chon-dang-nhap.html'} className="cr_weight_bold share_fsize_tow share_clr_tow"> Đăng nhập</Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {(slug == '/' || slug == '/san-pham.html' || slug == '/he-sinh-thai.html') && (
                        <>
                            <div className="butt_header">
                                <div className="ctn_butth">
                                    <div className="bgr_header">
                                        <picture>
                                            <img src="../img/bgr_banner.png" alt="" />
                                        </picture>
                                    </div>
                                    <div className="bgr_froh">
                                        <div className="fonh_one">
                                            <h1 className="share_clr_tow cr_weight_bold">Chuyển đổi số 365</h1>
                                            <p className="share_clr_tow">
                                                Giải pháp chuyển đổi số được tin dùng bởi +10.000 doanh nghiệp hàng
                                                đầu. Chuyển đổi số 365 mang thành công đột phá đến doanh nghiệp.
                                            </p>
                                        </div>
                                        <div className="show_hide">
                                            <div className="name_title_dl">Tải App Chuyển đổi số 365 cho PC</div>
                                            <div>
                                                <div className="button_header">
                                                    <a
                                                        rel="nofollow"
                                                        style={{ marginRight: 24 }}
                                                        href="https://app.timviec365.vn/Download/AppElectron/Quanlychung1.0.8.exe"
                                                    >
                                                        <img src="../img/window.png" alt="" />
                                                    </a>
                                                    <a
                                                        rel="nofollow"
                                                        href="https://hungha365.com/upload_file/Quanlychung-1.0.2.dmg"
                                                    >
                                                        <img src="../img/mac.png" alt="" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="bg_logout" style={{ display: popup ? 'block' : 'none' }}>
                <div className="chd_content" >
                    <p className="chuyen_doi">
                        <a href="/quan-ly-ung-dung-cong-ty.html">Chuyển đổi số 365</a>
                    </p>
                    <p className="dang_xuat btx_logout" onClick={show}>
                        <a>Đăng xuất</a>
                    </p>
                </div>
            </div>
            <div className="modal_share modal_share_four logout_ht" style={{ display: showLogout ? 'block' : 'none' }}>
                <div className="modal-content">
                    <div className="info_modal">
                        <div className="modal-header">
                            <div className="header_ctn_share">
                                <h4 className="ctn_share_h share_clr_tow tex_center cr_weight_bold">Đăng xuất</h4>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="ctn_body_modal">
                                <div className="madal_form">
                                    <div className="edit_share_form share_distance_big logout_ht_form">
                                        <div className="titl_dele_nv">
                                            <p className="share_fsize_tow share_clr_one tex_center log_tlt">Bạn có muốn đăng xuất ra
                                                khỏi hệ thống?</p>
                                        </div>
                                        <div className="form_butt_ht">
                                            <div className="tow_butt_flex">
                                                <button type="button"
                                                    className="share_fsize_three cr_weight share_cursor share_clr_four share_bgr_tow huy_button" onClick={no}>Hủy</button>
                                                <button type="button"
                                                    className="share_clr_tow cr_weight share_cursor share_fsize_three share_bgr_one dongy_button logout_all" onClick={yes}>
                                                    Đồng ý</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal_ind share_res_header" style={{ display: showSideBar ? 'block' : 'none' }} onClick={handleSideBar}>
                <div className="modal-content">
                    <div className="ctn_ind share_bgr_one">
                        <div className="modal-body">
                            <div className="ind-tow">
                                <div className="ctn_ulli">
                                    <ul className="navbar-nav">
                                        <a href="/" className="nav-item">
                                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                <span className="item_ic"><img src="../img/home_ind.png" alt="" /></span>
                                                <p>Trang chủ</p>
                                            </li>
                                        </a>
                                        <a href="/san-pham.html" className="nav-item">
                                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                <span className="item_ic"><img src="../img/ung-dung.png" alt="" /></span>
                                                <p>Sản phẩm</p>
                                            </li>
                                        </a>
                                        <a href="/he-sinh-thai.html" className="nav-item">
                                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                <span className="item_ic"><img src="../img/he_sinhthai.png" alt="" /></span>
                                                <p>Hệ sinh thái</p>
                                            </li>
                                        </a>
                                        <a href="#" className="nav-item">
                                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                <span className="item_ic"><img src="../img/tin-tuc.png" alt="" /></span>
                                                <p>Tin tức</p>
                                            </li>
                                        </a>
                                        <a href="/lua-chon-dang-ky.html" className="nav-item">
                                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                <span className="item_ic"><img src="../img/logout_i.png" alt="" /></span>
                                                <p>Đăng ký</p>
                                            </li>
                                        </a>
                                        <a href="/lua-chon-dang-nhap.html" className="nav-item">
                                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                <span className="item_ic"><img src="../img/logout_ind.png" alt="" /></span>
                                                <p>Đăng nhập</p>
                                            </li>
                                        </a>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
