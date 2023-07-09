import { React, useState, useEffect } from 'react'
import Cookies from "js-cookie";
import Seo from "../components/head";
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';
import { vote } from "../utils/handleApi";

export default function Danhgia() {

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    let role = Cookies.get('role')
    if (role == 2) {
        window.location.href = '/quan-ly-ung-dung-nhan-vien'
    } else if (role == 0) {
        window.location.href = '/quan-ly-ung-dung-ca-nhan'
    }

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <>
            <Seo
                seo=''
                title='Cài đặt thiết lập dải IP cho phần mề'
            />
            <div id="qly_ungdung_nv" className="qly_ungdung">
                <div className="wrapper">
                    <div className="left_ql">
                        <SideBar />
                    </div>
                    <div className="right_ql">
                        <div className="header_rigth_qly">
                            <div className="ctn_header_qly">
                                <div className="left_header_qly">
                                    <p className="share_fsize_one ">Cài đặt / Thiết lập dải IP cho phần mềm</p>
                                </div>
                                <HeaderLogin />
                            </div>
                        </div>
                        <div className="ctn_right_qly ">
                            <div className="ctn_res_qly">
                                <div className="left_header_qly">
                                    <p className="share_clr_one font_14">Thông tin tài khoản</p>
                                </div>
                                <div className="list_all_qly">
                                    <div className="main_tt main_tt_taikhoan">
                                        <div className="container_taikhoan">
                                            <div className="box_error">
                                                <img src="../img/error_report.png" alt="bao_loi" />
                                                <textarea className="text_dg" placeholder="Nhập mô tả lỗi để chúng tôi hiểu rõ hơn" onChange={handleCommentChange}></textarea>
                                                <span className="error" style={{ textAlign: 'left', display: error ? ' block' : 'none' }}>Mô tả lỗi không được bỏ trống</span>
                                                <p className="sm_danhgia" onClick={handleSubmit}>Gửi báo lỗi</p>
                                                {/* <p className="img_error">Chọn ảnh lỗi </p> */}
                                                {/* <input type="file" className="file_error hidden" multiple="multiple" accept=".png,.gif,.jpg,.jpeg,.jtif,.PNG"> */}
                                            </div>
                                            {/* <div style="float: left;width: 100%;margin: 35px 0;text-align: center;">
                                                <iframe className="video_hd" width="800" height="420" src="https://www.youtube.com/embed/XMOT4egzVx0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                            </div> */}
                                        </div>

                                        <div className="box_popup box_done">
                                            <div className="popup_2">
                                                <div className="box_popup_3">
                                                    <img src="/images/bao_loi.png" alt="bao_loi" />
                                                    <p className="pop_note">Cảm ơn các bạn đã đóng góp ý kiến về lỗi phần mềm của chúng tôi!!</p>
                                                    <p className="sm_pop_3 sm_done">Xác nhận</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="box_popup box_done" style={{ display: popup ? 'block' : 'none' }}>
                <div className="popup_2">
                    <div className="box_popup_3">
                        <img src="../img/bao_loi_success.png" alt="icon" />
                        <p className="pop_note">Cảm ơn các bạn đã đóng góp ý kiến về lỗi phần mềm của chúng tôi!!</p>
                        <p className="sm_pop_3 sm_done" onClick={closePopup}>Xác nhận</p>
                    </div>
                </div>
            </div>
        </>
    )
}