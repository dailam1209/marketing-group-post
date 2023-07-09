import React, { useState } from 'react';
import Seo from "../components/head";
import LoginForm from "../components/loginForm"
import LoginQr from "../components/loginQr"
import QrGuild from "../components/qrGuild"
import { CheckLogin } from "../utils/function"

export default function loginEmployee() {
    CheckLogin()

    // handle interaction
    const [typeLogin, setTypeLogin] = useState('login_qr')
    const [active, setActive] = useState('login_qr')
    const [qrGuild, setQrGuild] = useState(false)
    const [notiError, setNotiError] = useState(false)

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
                title='Sự nghiệp thăng tiến nếu biết tận dụng hệ thống chuyển đổi số'
                des='Chuyển đổi số đơn giản, dễ thực hiện, đem đến cơ hội phát triển bản thân vô cùng lớn dành cho mỗi nhân viên tại doanh nghiệp. Đăng nhập ngay để kiến tạo tương lai.'
                url='https://quanlychung.timviec365.vn/dang-nhap-nhan-vien.html'
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
                            <a href="/lua-chon-dang-nhap.html" className="share_fsize_one share_clr_four">Quay lại</a>
                        </div>
                        <div className="form_dangnhap">
                            <div className="ctn_dangnhap">
                                <div className="cont_dangnhap">
                                    <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">Cùng doanh nghiệp chuyển đổi số, phát triển bản thân, gây dựng tập thể</h1>
                                    <p className={`error_lg tex_center share_fsize_three ${(notiError == false) ? 'hidden' : ''}`}>Thông tin tài khoản hoặc mật khẩu không chính xác</p>
                                    <div className="box_select_type">
                                        <button className={`select_login lg_qr ${(active == 'login_qr') ? 'active' : ''}`} onClick={loginByQr}>QUÉT MÃ QR</button>
                                        <div className="line"></div>
                                        <button className={`select_login login_tk ${(active == 'login_form') ? 'active' : ''}`} onClick={loginByForm}>TÀI KHOẢN<span className="text">(email/số điện thoại)</span></button>
                                    </div>
                                    {typeLogin == 'login_form' && <LoginForm setNotiError={setNotiError} typeLogin='2' />}
                                    {typeLogin == 'login_qr' && <LoginQr qrGuildShow={qrGuildShow} setNotiError={setNotiError} typeLogin='2' />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {(qrGuild) && <QrGuild qrGuildHide={qrGuildHide} />}
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
        </>
    )
};
