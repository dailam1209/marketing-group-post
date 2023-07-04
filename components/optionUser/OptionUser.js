import { React, useState, useEffect } from 'react'

export default function OptionUser(props) {
    const [link, setLink] = useState('')
    useEffect(() => {
        if (props.type == '1') {
            setLink('/quan-ly-thong-tin-tai-khoan-cong-ty.html')
        } else {
            setLink('/quan-ly-thong-tin-tai-khoan-nhan-vien.html')
        }
    })

    return (
        <>
            <div className="avt_log_posti share_bgr_tow">
                <ul className="navbar-nav">
                    <a href={link} className="nav-item">
                        <li className="nav-child-item share_clr_one share_fsize_one">
                            <span className="item_ic"><img src="../img/inf_tk.png" alt="" /></span>
                            Thông tin tài khoản
                        </li>
                    </a>
                    {
                        (props.type == '1' || props.type == '2') && (
                            <>
                                <a href="https://chamcong.timviec365.vn/quan-ly-cong-ty/danh-gia.html" target="_blank" className="nav-item">
                                    <li className="nav-child-item share_clr_one share_fsize_one">
                                        <span className="item_ic"><img src="../img/danh_gia.png" alt="" /></span>
                                        Đánh giá
                                    </li>
                                </a>
                                <a href="https://chamcong.timviec365.vn/quan-ly-cong-ty/gui-loi.html" target="_blank" className="nav-item">
                                    <li className="nav-child-item share_clr_one share_fsize_one">
                                        <span className="item_ic"><img src="../img/bao-loi.png" alt="" /></span>
                                        Báo lỗi
                                    </li>
                                </a>
                            </>
                        )
                    }
                    <a className="nav-item">
                        <li className="nav-child-item share_clr_one share_fsize_one btx_logout">
                            <span className="item_ic"><img src="../img/dang-xuat.png" alt="" /></span>
                            Đăng xuất
                        </li>
                    </a>
                </ul>
            </div>
        </>
    )
}
