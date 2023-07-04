import React from 'react';
import Head from "../components/head";
import Footer from "../components/footer/Footer"

export default function noticeVip() {
    return (
        <>
            <Head
                seo=''
                title='Trang thông báo về tài khoản VIP'
            />
            <div class="content_ql ctn_bgr_body">
                <div class="content_nv">
                    <div class="ctn_register_nv">
                        <form class="regnv_form regnv_form_id">
                            <div class="one_page_qmk">
                                <div class="container">
                                    <div class="ctn_qmk">
                                        <div class="share_brd_radius share_bgr_tow ctn_set_vip">
                                            <img class="wn_vip" src="/img/bgd_ncapv.png" alt="cảnh báo đăng ký" />
                                            <p class="wn_text_1">Để đăng ký thêm tài khoản <br />Vui lòng liên hệ với chúng tôi để được hỗ trợ tốt nhất.</p>
                                            <div class="ctn_phone_box">
                                                {/* <a class="phone_box phone_box_1" rel="nofollow" target="_blank" href="tel:0982079209">
                                                        <img src="/img/phone_vip.png" alt="liên hệ vip">
                                                            <span>Hotline: <b>0982.079.209</b></span>
                                                    </a>
                                                    <a class="phone_box phone_box_2" rel="nofollow" target="_blank" href="skype:live:binhminhmta123?chat">
                                                        <img src="/img/skype_vip.png" alt="liên hệ vip">
                                                            <span><b>Skype</b></span>
                                                    </a>
                                                    <a class="phone_box phone_box_3" rel="nofollow" target="_blank" href="https://zalo.me/0982079209">
                                                        <img src="/img/zalo_vip.png" alt="liên hệ vip">
                                                            <span><b>Zalo</b></span>
                                                    </a>
                                                    <a class="phone_box phone_box_4" rel="nofollow" href="javascript:void(Tawk_API.toggle())">
                                                        <span><b>Chat với chúng tôi</b></span>
                                                    </a> */}
                                                <div class="box_hl_chat">
                                                    <div class="ctn_hotline ctn_vipchung">
                                                        <a rel="nofollow" target="_blank" href="tel:0983407428">
                                                            <img src="/img/exp_holine_vip.png" />
                                                            <span>Hotline: <b>0983407428</b></span>
                                                        </a>
                                                    </div>
                                                    <div class="ctn_chat_vip ctn_vipchung">
                                                        <a class="share_cursor" onclick="clk_chat(this)">
                                                            <img src="/img/chat_365.png" />
                                                            <span class="cr_weight">Chat 365</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                {/* <div class="box_banggia">
                                                        <a href="https://chamcong.timviec365.vn/bang-gia.html" rel="nofollow" target="_blank">Bảng giá</a>
                                                    </div> */}
                                            </div>
                                            <p class="wn_text_2">Nâng cấp Vip để đăng ký không giới hạn các tài khoản cho công ty.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
        </>
    )
}