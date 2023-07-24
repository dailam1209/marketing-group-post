import { React, useState, useEffect } from 'react';
import Seo from '../components/head'
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';
import { getServerSideProps } from '../utils/function'

export { getServerSideProps }
export default function HomePersonal() {
    // search
    function search() {
        const searchTerm = document.getElementById("myInput").value.toLowerCase();

        const items = document.getElementsByClassName("delt_titl_ud");

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let content = item.getElementsByTagName("h4")[0].innerText.toLowerCase();

            if (content.includes(searchTerm)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    }
    return (
        <>
            <Seo
                seo=''
                title='Quản lý ứng dụng'
            />
            <>
                <link rel="stylesheet" href="../css/dat.css" />
            </>
            <div id="qly_ungdung_nv" className="qly_ungdung">
                <div className="wrapper">
                    <div className="left_ql">
                        <SideBar />
                    </div>
                    <div className="right_ql">
                        <div className="header_rigth_qly">
                            <div className="ctn_header_qly">
                                <HeaderLogin text={<>Ứng dụng / <span className="thay_doi">Tất cả</span></>} />
                            </div>
                        </div>
                        <div className="ctn_right_qly">
                            <div className="ctn_res_qly">
                                <div className="left_header_qly">
                                    <p className="share_clr_one share_fsize_one">
                                        Ứng dụng / <span className="thay_doi">Tất cả</span>
                                    </p>
                                </div>
                                <div className="search_qly">
                                    <form className="form_timkiem">
                                        <div className="tim-kiem">
                                            <input
                                                type="text"
                                                name="search"
                                                id="myInput"
                                                onKeyUp={search}
                                                placeholder="Nhập tên phần mềm"
                                                className="form-serach share_fsize_one share_clr_three share_bgr_tow"
                                            />
                                            <span className="ico_search" />
                                        </div>
                                    </form>
                                </div>
                                <div className="list_all_qly">
                                    <div className="ctn_chile_tow">
                                        <div className="content_delt_all active" id="ungdung_one">
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div
                                                    className="detl_nv_count"
                                                    style={{ padding: 15, marginBottom: 0 }}
                                                >
                                                    <div className="titl_qlyud">
                                                        <a
                                                            className="avt_qlyc"
                                                            href="https://chat365.timviec365.vn/conversation-cYytiQ3FEU0haenQxcFpUR2N4dDlEdz09-uWE0zWmQwQWs1RWF2RnFIdVFrVlhaZz09"
                                                            target="_blank"
                                                        >
                                                            <img src="../img/ql-chat365.png" alt="Chat365" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4
                                                                className="share_fsize_tow share_clr_four"
                                                                style={{ paddingTop: 10 }}
                                                            >
                                                                <a
                                                                    href="https://chat365.timviec365.vn/conversation-cYytiQ3FEU0haenQxcFpUR2N4dDlEdz09-uWE0zWmQwQWs1RWF2RnFIdVFrVlhaZz09"
                                                                    className="share_clr_four"
                                                                    target="_blank"
                                                                >
                                                                    Chat365
                                                                </a>
                                                            </h4>
                                                            <div className="count_qlyud" />
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud" />
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div
                                                    className="detl_nv_count"
                                                    style={{ padding: 15, marginBottom: 0 }}
                                                >
                                                    <div className="titl_qlyud">
                                                        <a
                                                            className="avt_qlyc"
                                                            href="https://cardvisitthongminh.timviec365.vn/"
                                                            rel="nofollow"
                                                            target="_blank"
                                                        >
                                                            <img src="../img/dms_ql.png" alt="SMARTID365" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4
                                                                className="share_fsize_tow share_clr_four"
                                                                style={{ paddingTop: 10 }}
                                                            >
                                                                <a
                                                                    href="https://cardvisitthongminh.timviec365.vn/"
                                                                    rel="nofollow"
                                                                    className="share_clr_four"
                                                                    target="_blank"
                                                                >
                                                                    SMARTID365
                                                                </a>
                                                            </h4>
                                                            <div className="count_qlyud"></div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud"></div>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div
                                                    className="detl_nv_count"
                                                    style={{ padding: 15, marginBottom: 0 }}
                                                >
                                                    <div className="titl_qlyud">
                                                        <a
                                                            className="avt_qlyc"
                                                            href="https://crm.timviec365.vn/"
                                                            target="_blank"
                                                        >
                                                            <img src="../img/crm_ql.png" alt="Phần mềm CRM" />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4
                                                                className="share_fsize_tow share_clr_four"
                                                                style={{ paddingTop: 10 }}
                                                            >
                                                                <a
                                                                    href="https://crm.timviec365.vn/"
                                                                    className="share_clr_four"
                                                                    target="_blank"
                                                                >
                                                                    Phần mềm CRM
                                                                </a>
                                                            </h4>
                                                            <div className="count_qlyud"></div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud"></div>
                                                </div>
                                            </div>
                                            <div className="delt_titl_ud share_bgr_tow">
                                                <div className="detl_nv_count">
                                                    <div className="titl_qlyud">
                                                        <a
                                                            className="avt_qlyc"
                                                            href="https://truyenthongnoibo.timviec365.vn/"
                                                            target="_blank"
                                                        >
                                                            <img
                                                                src="../img/tt-vanhoa.png"
                                                                alt="Truyền thông văn hóa"
                                                            />
                                                        </a>
                                                        <div className="titl_delt">
                                                            <h4 className="share_fsize_tow share_clr_four">
                                                                <a
                                                                    href="https://truyenthongnoibo.timviec365.vn/"
                                                                    className="share_clr_four"
                                                                    target="_blank"
                                                                >
                                                                    Truyền thông văn hóa
                                                                </a>
                                                            </h4>
                                                            <div className="count_qlyud"></div>
                                                        </div>
                                                    </div>
                                                    <div className="count_qlyud"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content_delt_all" id="ungdung_two" />
                                        <div className="content_delt_all" id="ungdung_three" />
                                        <div className="content_delt_all" id="ungdung_four" />
                                        <div className="content_delt_all" id="ungdung_five" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal */}
            <div className="modal_share modal_share_four logout_ht">
                <div className="modal-content">
                    <div className="info_modal">
                        <div className="modal-header">
                            <div className="header_ctn_share">
                                <h4 className="ctn_share_h share_clr_tow tex_center cr_weight_bold">
                                    Đăng xuất
                                </h4>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="ctn_body_modal">
                                <div className="madal_form">
                                    <div className="edit_share_form share_distance_big logout_ht_form">
                                        <div className="titl_dele_nv">
                                            <p className="share_fsize_tow share_clr_one tex_center log_tlt">
                                                Bạn có muốn đăng xuất ra khỏi hệ thống?
                                            </p>
                                        </div>
                                        <div className="form_butt_ht">
                                            <div className="tow_butt_flex">
                                                <button
                                                    type="button"
                                                    className="share_fsize_three cr_weight share_cursor share_clr_four share_bgr_tow huy_button"
                                                >
                                                    Hủy
                                                </button>
                                                <button
                                                    type="button"
                                                    className="share_clr_tow cr_weight share_cursor share_fsize_three share_bgr_one dongy_button logout_all"
                                                >
                                                    Đồng ý
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Thông báo chat  */}
            <link
                rel="stylesheet"
                media="all"
                href="../css/style_chat_notify.css?v=140"
            />
            <div className="tb_chat365" style={{ display: "none" }}>
                <div className="wapper">
                    <div className="auth_form">
                        <p className="post_title">
                            Thông báo
                            <img
                                className="close_pop_login"
                                src="/img/close_btndo.png"
                                alt="close"
                            />
                        </p>
                        <div className="frame_tbmess">
                            <p className="post_info">
                                Bạn có tin nhắn mới từ <span className="name">Phạm Thanh Long</span>
                                : <span className="nd col_blu">test</span>
                            </p>
                        </div>
                        <a
                            target="_blank"
                            href="https://chat365.timviec365.vn/conversation-cRFoxQmlTMkFMUnVhZXREak4rUEIvUT09-ubnVHWE1rMXFlZ040bnkwSWpTNElVQT09"
                            rel="nofollow"
                            className="btn_login"
                        >
                            <img
                                src="/img/iconchat_green.png"
                                alt="Trả lời"
                                width="16px"
                                height="16px"
                            />
                            Trả lời
                        </a>
                    </div>
                </div>
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
        </>)
};