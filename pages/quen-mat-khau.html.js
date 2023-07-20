import { React, useState, useEffect, useRef } from "react"
import { set, useForm } from 'react-hook-form';
import Seo from '../components/head'
import { useRouter } from 'next/router';
import { CheckLogin } from "../utils/function"
import { generateRandomString } from "../utils/function";
import { checkAccount } from "../utils/handleApi";
import { checkExist } from '../utils/function'
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import FormData from "form-data";
import Captcha from '../components/captcha/images';

export default function forgetPassword() {
    CheckLogin()
    const router = useRouter();
    const type = router.query.type
    const [title, getTitle] = useState()
    const [des, getDes] = useState()
    const [capchaRen, setCapchaRen] = useState('');
    useEffect(() => {
        // context.fillText('Hello, world!', 10, 50);
        setCapchaRen(generateRandomString(6))
        if (type == 1 || type == 2) {
            getTitle('Khôi phục ngay tài khoản với tính năng lấy lại mật khẩu dễ dàng')
            getDes('Dễ dàng để Lấy lại mật khẩu cho tài khoản chuyển đổi số nhân viên khi bạn quên. Mật khẩu được khôi phục rất nhanh, đảm bảo quá trình sử dụng hiệu quả.')
        } else {
            getTitle('Chuyển đổi số nhanh, khôi phục mật khẩu không lo chậm')
            getDes('Trong 1 nốt nhạc, doanh nghiệp bạn có thể lấy lại mật khẩu tài khoản chuyển đổi số lỡ quên. Click tại Quên mật khẩu ngay và làm theo hướng dẫn vô cùng đơn giản.')
        }
    }, [])
    // handle validate
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        delete data.capcha
        data.type = type
        const form = new FormData();
        form.append('input', data.account);
        let response = await checkAccount(form);

        if (response.result === true) {
            window.location.href = '/xac-thuc-ma-otp-mk.html?account=' + data.account + '&type=' + type
        } else {
            alert("Tài khoản không tồn tại!");
        }
    };
    return (
        <>
            <Seo
                seo='true'
                title={title}
                des={des}
                url='https://quanlychung.timviec365.vn/quen-mat-khau.html'
            />
            <Header />
            <div className="register_ctnv" id="register_cty">
                <div className="content_ql ctn_bgr_body">
                    <div className="content_nv">
                        <div className="container">
                            <div className="ctn_qmk">
                                <form action="" className="qmk_form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="one_page_qmk tow_reg_ql share_reg_log share_brd_radius share_bgr_tow">
                                        <div className="header_qmk">
                                            {(type == 1) ? (
                                                <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                                                    Nhanh chóng, dễ dàng khôi phục tài khoản chuyển đổi số cho doanh nghiệp
                                                </h1>
                                            ) : (
                                                <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                                                    Lấy lại mật khẩu tài khoản chuyển đổi số nhân viên cực dễ, cực
                                                    an toàn
                                                </h1>
                                            )}
                                            <div className="qmk_avt_ic tex_center">
                                                <img src="../img/one_page_qmk.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="ctn_form share_distance"  >

                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Email hoặc số điện thoại đã đăng ký tài khoản{" "}
                                                    <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email_qmk"
                                                    className="form-control"
                                                    placeholder="Nhập email hoặc số điện thoại đăng ký tài khoản của bạn"
                                                    {...register("account", {
                                                        required: "Không được để trống",
                                                        pattern: {
                                                            value: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/,
                                                            message: "Nhập đúng định dạng email hoặc số điện thoại"

                                                        }
                                                    })}
                                                />
                                                {errors.account && <label className="error">{errors.account.message}</label>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Mã Captcha <span className="cr_red">*</span>
                                                </label>
                                                <br />

                                                <input
                                                    style={{ width: "calc(100% - 140px)" }}
                                                    defaultValue={''}
                                                    type="text"
                                                    name="captcha"
                                                    id="captcha_qmk"
                                                    className="form-control"
                                                    placeholder="Nhập mã Captcha"
                                                    {...register("capcha", {
                                                        required: "Không được để trống",
                                                        validate: (value) => {
                                                            return value === capchaRen || 'Mã Captcha không chính xác';
                                                        },
                                                    })}
                                                />
                                                {/* <input className="capcha" value={capchaRen} readOnly></input> */}
                                                <Captcha text={capchaRen} />
                                                {errors.capcha && <label className="error">{errors.capcha.message}</label>}
                                            </div>
                                            <div className="form-butt-one">
                                                <input
                                                    type="submit"
                                                    className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
                                                    value="Tiếp tục"
                                                />
                                                <p className="bo_qua tex_center share_cursor" data={1}>
                                                    <a className="share_fsize_three share_clr_one" href={(type == 1) ? '/dang-nhap-cong-ty.html' : "/dang-nhap-nhan-vien.html"}>Quay lại</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            <Footer />
        </>
    )
};