import React, { useState } from "react"
import Seo from "../components/head";
import { useForm } from 'react-hook-form';
import Link from 'next/link'
import { loginPersonal } from "../utils/handleApi";
import { validatePhone } from "../utils/function";
import LoginForm from "../components/loginForm"
import LoginQr from "../components/loginQr"
import QrGuild from "../components/qrGuild"

export default function LoginPersonal() {
    // handle interaction
    const [typeLogin, setTypeLogin] = useState('login_qr')
    const [active, setActive] = useState('login_qr')
    const [qrGuild, setQrGuild] = useState(false)

    const loginByForm = () => {
        setTypeLogin('login_form');
        setActive('login_form');
    };

    const loginByQr = () => {
        setTypeLogin('login_qr');
        setActive('login_qr');
    };

    const qrGuildShow = () => {
        setQrGuild(true);
    }

    const qrGuildHide = () => {
        setQrGuild(false);
    }

    return (
        <>
            <Seo
                seo='true'
                title='Thành công trong tầm với, chuyển đổi số cùng quanlychung.timviec365.vn ngay'
                des='Cơ hội phát triển bản thân cực lớn nằm ngay trong hệ sinh thái chuyển đổi số của timviec365.vn. Truy cập, trải nghiệm để vạch ra kế hoạch chuyển đổi số hiệu quả nhé.'
                url='https://quanlychung.timviec365.vn/dang-nhap-ca-nhan.html'
            />

            <div className="content_ql">
                <div className="ctn_content">
                    <div className="left_bgr_nv">
                        <div className="bgr_img_nv">
                            <picture>
                                <img src="../img/bgr_nua.png" alt="" />
                            </picture>
                        </div>
                    </div>
                    <div className="right_bgr_nv">
                        <div className="tro_lai">
                            <a
                                href="/lua-chon-dang-nhap.html"
                                className="share_fsize_one share_clr_four"
                            >
                                Quay lại
                            </a>
                        </div>
                        <div className="form_dangnhap">
                            <div className="ctn_dangnhap">
                                <div className="cont_dangnhap">
                                    <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                                        Đăng nhập nền tảng chuyển đổi số chất lượng, bắt trọn cơ hội
                                        phát triển
                                    </h1>
                                    <p className="error_lg hidden tex_center share_fsize_three">
                                        Thông tin tài khoản hoặc mật khẩu không chính xác
                                    </p>
                                    <div className="box_select_type">
                                        <button className={`select_login lg_qr ${(active == 'login_qr') ? 'active' : ''}`} onClick={loginByQr}>
                                            QUÉT MÃ QR
                                        </button>
                                        <div className="line" />
                                        <button className={`select_login login_tk ${(active == 'login_form') ? 'active' : ''}`} onClick={loginByForm}>
                                            TÀI KHOẢN<span className="text">(email)</span>
                                        </button>
                                    </div>
                                    {typeLogin == 'login_form' && <LoginForm/>}
                                    {typeLogin == 'login_qr' && <LoginQr qrGuildShow={qrGuildShow}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {(qrGuild) && <QrGuild qrGuildHide={qrGuildHide}/>}
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />

        </>)
}