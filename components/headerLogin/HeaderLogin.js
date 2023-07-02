import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Router from 'next/router';
import Cookies from "js-cookie";
import callApi from '../../pages/api/call_api';

export default function HeaderLogin() {
    // check login
    var token = Cookies.get('acc_token');

    // gọi api lấy thông tin nhân viên
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await callApi.getInfoEp(token);
                setData(response.data.data.data)
            }
            catch {
                console.log('Error:', error);
            }
        }
        getData()
    }, [])
    console.log(data);

    return (
        <>
            <div className="right_header_qly" id="header_qly_nv">
                <div className="ic_nhanh">
                    <div className="img_ic share_cursor">
                        <picture>
                            <img src="../img/mess-qly.png" alt="" className="cli_show_mess" />
                        </picture>
                        <span className="item_num">0</span>
                    </div>
                </div>
                <div className="ic_nhanh">
                    <div className="img_ic share_cursor">
                        <picture>
                            <img src="../img/nhac-nho.png" alt="" className="cli_show_mess ic_nhacnho" />
                        </picture>
                        <span className="item_num">0</span>
                    </div>
                </div>
                <div className="ic_nhanh">
                    <div className="img_ic share_cursor">
                        <img src="../img/thong-bao.png" alt="" className="cli_show_mess ic_thongbao" />
                        <span className="item_num">0</span>
                    </div>

                </div>
                <div className="ic_nhanh_avt">
                    <div className="img_ic">
                        {
                            data.avatarUser ? (<img src={data.avatarUser} alt="" className="avt_img_tk" />) : (<img src="../img/logo_com.png" alt="" className="avt_img_tk" />)
                        }
                        <p className="logout_fname share_clr_one"></p>
                    </div>
                    <div className="avt_log_posti share_bgr_tow">
                        <ul className="navbar-nav">
                            <a href="/quan-ly-thong-tin-tai-khoan-nhan-vien.html" className="nav-item">
                                <li className="nav-child-item share_clr_one share_fsize_one">
                                    <span className="item_ic"><img src="../img/inf_tk.png" alt="" /></span>
                                    Thông tin tài khoản
                                </li>
                            </a>
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
                            <a className="nav-item">
                                <li className="nav-child-item share_clr_one share_fsize_one btx_logout">
                                    <span className="item_ic"><img src="../img/dang-xuat.png" alt="" /></span>
                                    Đăng xuất
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
