import { React, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import OptionUser from '../optionUser/OptionUser';
import { infoCom, infoEp, infoPersonal } from '../../utils/handleApi';
import { CheckLogin2 } from '../../utils/function';

export default function HeaderLogin() {
    CheckLogin2()

    const type = () => {
        return Cookies.get('role');
    };

    const [data, setData] = useState([]);

    const [option, setOption] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false)
    const optionUser = () => {
        if (option) {
            setOption(false)
        } else {
            setOption(true)
            setShowSideBar(false)
        }
    }
    const [linkHome, setLinkHome] = useState('')

    useEffect(() => {
        const getData = async () => {
            try {
                if (type() === '2') {
                    let response = await infoEp();
                    setData(response.data);
                } else if (type() === '1') {
                    let response = await infoCom();
                    setData(response.data);
                } else {
                    let response = await infoPersonal();
                    setData(response.data);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
        getData()
        if (type() === '1') {
            setLinkHome('quan-ly-ung-dung-cong-ty.html')
        }
        else if (type() === '0') {
            setLinkHome('quan-ly-ung-dung-ca-nhan.html')
        } else {
            setLinkHome('quan-ly-ung-dung-nhan-vien.html')

        }
    }, [])

    const handleSideBar = () => {
        if (showSideBar == false) {
            setShowSideBar(true)
            setOption(false)
        } else {
            setShowSideBar(false)
            setOption(true)
        }
    }

    return (
        <>
            <div className="img_ic_mobi show_sidebar" style={{ cursor: 'pointer' }} onClick={handleSideBar}>
                <img src="../img/mobi_4.png" alt="" className="btx_header_ql" />
                <div className="menu_header" style={{ display: showSideBar ? 'block' : 'none' }}>
                    <div className="modal-content">
                        <div className="ctn_ind share_bgr_one">
                            <div className="modal-body">
                                <div className="ind__header_one">
                                    <div className="avt_log_head tex_center">
                                        <a href="/"><img src="../img/logo.png" alt="" /></a>
                                    </div>
                                </div>
                                <div className="ind-tow">
                                    <div className="ctn_ulli">
                                        <ul className="navbar-nav">
                                            {linkHome === 'quan-ly-ung-dung-cong-ty.html' && (
                                                <>
                                                    <a href="/quan-ly-ung-dung-cong-ty.html"
                                                        className="nav-item">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/ung-dung.png" alt="" /></span>
                                                            Ứng dụng
                                                        </li>
                                                    </a>
                                                    {/* <a href="#"
                                                        className="nav-item">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/qly-nhanvien.png" alt="" /></span>
                                                            Quản lý nhân viên
                                                        </li>
                                                    </a>
                                                    <a href="#"
                                                        className="nav-item ">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/qly-phongban.png" alt="" /></span>
                                                            Quản lý phòng ban
                                                        </li>
                                                    </a>
                                                    <a href="#"
                                                        className="nav-item">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/qly-ctycon.png" alt="" /></span>
                                                            Quản lý công ty con
                                                        </li>
                                                    </a>
                                                    <a href="#"
                                                        className="nav-item">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/qly-cctochuc.png" alt="" /></span>
                                                            Sơ đồ cơ cấu tổ chức
                                                        </li>
                                                    </a> */}

                                                    <a href="#"
                                                        className="nav-item">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/delete_data.png" alt="Xóa dữ liệu ứng dụng" /></span>
                                                            Xóa dữ liệu ứng dụng
                                                        </li>
                                                    </a>
                                                    <a href="/quan-ly-thong-tin-tai-khoan-cong-ty.html"
                                                        className="nav-item">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/qly-tttaikhoan.png" alt="" /></span>
                                                            Thông tin tài khoản
                                                        </li>
                                                    </a>
                                                    <a href="/danh-gia.html"
                                                        className="nav-item">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/ic_dg.png" alt="" /></span>
                                                            Đánh giá
                                                        </li>
                                                    </a>
                                                    <a href="/bao-loi.html"
                                                        className="nav-item">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/ic_bl.png" alt="" /></span>
                                                            Báo lỗi
                                                        </li>
                                                    </a>
                                                    <a href="/cai-dat-thiet-lap-dai-ip-phan-mem.html"
                                                        className="nav-item ">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/cai-dat.png" alt="" /></span>
                                                            Cài đặt
                                                        </li>
                                                    </a>
                                                </>
                                            )}
                                            {(linkHome !== 'quan-ly-ung-dung-cong-ty.html') && (
                                                <>
                                                    <a href={linkHome} className="nav-item">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/ung-dung.png" alt="Ứng dụng" /></span>
                                                            Ứng dụng
                                                        </li>
                                                    </a>
                                                    <a href="quan-ly-thong-tin-tai-khoan-nhan-vien.html" className="nav-item">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/qly-tttaikhoan.png" alt="Thông tin tài khoản" /></span>
                                                            Thông tin tài khoản
                                                        </li>
                                                    </a>
                                                    <a href="#" className="nav-item">
                                                        <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                            <span className="item_ic"><img src="../img/qly-ttvieclam.png" alt="Thiết lập tài khoản nhân viên" /></span>
                                                            Thiết lập tài khoản nhân viên
                                                        </li>
                                                    </a>
                                                    {(type() === 2) && (
                                                        <a href="#" className="nav-item">
                                                            <li className="nav-child-item cr_weight_bold share_fsize_tow share_clr_tow d_flex">
                                                                <span className="item_ic"><img src="../img/qly-ttnghiviec.png" alt="Chấm dứt lao động" /></span>
                                                                Chấm dứt lao động
                                                            </li>
                                                        </a >
                                                    )}
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

            <div className="left_header_qly">
                <p className="share_fsize_one ">Ứng dụng / <span className="thay_doi">Tất cả</span></p>
            </div>

            <div className="right_header_qly" id="header_qly_nv">
                <div className="ic_nhanh">
                    <div className="img_ic share_cursor">
                        <picture>
                            <source media="(max-width:1024px)" srcSet="../img/mobi_2.png" />
                            <img src="../img/mess-qly.png" alt="" className="cli_show_mess" />
                        </picture>
                        <span className="item_num">0</span>
                    </div>
                </div>
                <div className="ic_nhanh">
                    <div className="img_ic share_cursor">
                        <picture>
                            <source media="(max-width:1024px)" srcSet="../img/mobi_1.png" />
                            <img src="../img/nhac-nho.png" className="cli_show_mess ic_nhacnho" />
                        </picture>
                        <span className="item_num">0</span>
                    </div>
                </div>
                <div className="ic_nhanh">
                    <div className="img_ic share_cursor">
                        <picture>
                            <source media="(max-width:1024px)" srcSet="../img/mobi_3.png" />
                            <img src="../img/thong-bao.png" alt="" className="cli_show_mess ic_thongbao" />
                        </picture>
                        <span className="item_num">0</span>
                    </div>

                </div>
                <div className="ic_nhanh_avt">
                    <div className="img_ic" onClick={optionUser}>
                        {
                            data.avatarUser ? (<img src={data.avatarUser} alt="" className="avt_img_tk" />) : (<img src="../img/logo_com.png" alt="" className="avt_img_tk" />)
                        }
                        {(linkHome === 'quan-ly-ung-dung-cong-ty.html') ? (
                            <>
                                <div className="logout_fname share_clr_one" onClick={optionUser}>
                                    <p className="show_dow_p" >{data.userName}</p>
                                    <p className="show_dow_p" >ID: {data._id}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="logout_fname share_clr_one" onClick={optionUser}>{data.userName}</p>
                            </>
                        )}
                    </div>
                    {(option) && <OptionUser type={type()} />}
                </div>
            </div>
        </>
    )
}
