import { React, useState, useEffect } from 'react';
import Seo from "../components/head";
import Header from '../components/header/Header'
import Footer from "../components/footer/Footer"
import Cookies from 'js-cookie';

export default function noticeVip() {
    const [hasTokens, setHasTokens] = useState(false);

    useEffect(() => {
        const accToken = Cookies.get('token_base365');
        const rfToken = Cookies.get('rf_token');
        const userRole = Cookies.get('role');

        if (accToken && rfToken && userRole) {
            setHasTokens(true);
        }
    }, []);

    return (
        <>
            <Seo
                seo=''
                title='Trang thông báo về tài khoản VIP'
            />

            {hasTokens ? (
                <Header acc_token={Cookies.get('token_base365')} rf_token={Cookies.get('rf_token')} />
            ) : null}

            <div className="content_ql ctn_bgr_body">
                <div className="content_nv">
                    <div className="ctn_register_nv">
                        <form className="regnv_form regnv_form_id">
                            <div className="one_page_qmk">
                                <div className="container">
                                    <div className="ctn_qmk">
                                        <div className="share_brd_radius share_bgr_tow ctn_set_vip">
                                            <img className="wn_vip" src="/img/bgd_ncapv.png" alt="cảnh báo đăng ký" />
                                            <p className="wn_text_1">Để đăng ký thêm tài khoản <br />Vui lòng liên hệ với chúng tôi để được hỗ trợ tốt nhất.</p>
                                            <div className="ctn_phone_box">
                                                {/* <a className="phone_box phone_box_1" rel="nofollow" target="_blank" href="tel:0982079209">
                                                        <img src="/img/phone_vip.png" alt="liên hệ vip">
                                                            <span>Hotline: <b>0982.079.209</b></span>
                                                    </a>
                                                    <a className="phone_box phone_box_2" rel="nofollow" target="_blank" href="skype:live:binhminhmta123?chat">
                                                        <img src="/img/skype_vip.png" alt="liên hệ vip">
                                                            <span><b>Skype</b></span>
                                                    </a>
                                                    <a className="phone_box phone_box_3" rel="nofollow" target="_blank" href="https://zalo.me/0982079209">
                                                        <img src="/img/zalo_vip.png" alt="liên hệ vip">
                                                            <span><b>Zalo</b></span>
                                                    </a>
                                                    <a className="phone_box phone_box_4" rel="nofollow" href="javascript:void(Tawk_API.toggle())">
                                                        <span><b>Chat với chúng tôi</b></span>
                                                    </a> */}
                                                <div className="box_hl_chat">
                                                    <div className="ctn_hotline ctn_vipchung">
                                                        <a rel="nofollow" target="_blank" href="tel:0983407428">
                                                            <img src="/img/exp_holine_vip.png" />
                                                            <span>Hotline: <b>0983407428</b></span>
                                                        </a>
                                                    </div>
                                                    <div className="ctn_chat_vip ctn_vipchung">
                                                        <a className="share_cursor">
                                                            <img src="/img/chat_365.png" />
                                                            <span className="cr_weight">Chat 365</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                {/* <div className="box_banggia">
                                                        <a href="https://chamcong.timviec365.vn/bang-gia.html" rel="nofollow" target="_blank">Bảng giá</a>
                                                    </div> */}
                                            </div>
                                            <p className="wn_text_2">Nâng cấp Vip để đăng ký không giới hạn các tài khoản cho công ty.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
        </>
    )
}