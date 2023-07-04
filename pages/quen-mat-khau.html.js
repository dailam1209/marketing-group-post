import {React, useState, useEffect} from "react"
import { useForm } from 'react-hook-form';
import callApi from './api/call_api';
import Seo from '../components/head'
import { useRouter } from 'next/router';

export default function forgetPassword() {
    // handle seo
    const router = useRouter();
    const type = router.query.type 
    const [title, getTitle] = useState()
    const [des, getDes] = useState()
    useEffect(() => {
        console.log(type)
        if(type == 2) {
            getTitle('Khôi phục ngay tài khoản với tính năng lấy lại mật khẩu dễ dàng')
            getDes('Dễ dàng để Lấy lại mật khẩu cho tài khoản chuyển đổi số nhân viên khi bạn quên. Mật khẩu được khôi phục rất nhanh, đảm bảo quá trình sử dụng hiệu quả.')
        } else {
            getTitle('Chuyển đổi số nhanh, khôi phục mật khẩu không lo chậm')
            getDes('Trong 1 nốt nhạc, doanh nghiệp bạn có thể lấy lại mật khẩu tài khoản chuyển đổi số lỡ quên. Click tại Quên mật khẩu ngay và làm theo hướng dẫn vô cùng đơn giản.')
        }
    }, [type])

    // handle validate
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        // delete data.res_password;
        // let response = await callApi.registerPersonal(data);
        // if (response.data && response.data.data && response.data.data.result == true) {
        //     Cookies.set('phone', data.phoneTK);
        //     Cookies.set('acc_token', response.data.data.data.access_token)
        //     Cookies.set('rf_token', response.data.data.data.refresh_token)
        //     window.location.href = "/xac-thuc-ma-otp-ca-nhan.html";
        // } else {
        //     alert(response)
        // }
    };
    return (
        <>
            <Seo
                seo='true'
                title = {title}
                des = {des}
                url = 'https://quanlychung.timviec365.vn/quen-mat-khau.html'
            />

            <div className="content_ql ctn_bgr_body">
                <div className="content_nv">
                    <div className="container">
                        <div className="ctn_qmk">
                            <form action="" className="qmk_form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="one_page_qmk tow_reg_ql share_reg_log share_brd_radius share_bgr_tow">
                                    <div className="header_qmk">
                                        <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                                            Lấy lại mật khẩu tài khoản chuyển đổi số nhân viên cực dễ, cực
                                            an toàn
                                        </h1>
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
                                                {...register("email", {
                                                    required: "Không được để trống",
                                                    pattern: {
                                                        value: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/,
                                                        message: "Nhập đúng định dạng email hoặc số điện thoại"

                                                    }
                                                })}
                                            />
                                            {errors.email && <label className="error">{errors.email.message}</label>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                Mã Captcha <span className="cr_red">*</span>
                                            </label>
                                            <img
                                                style={{ float: "right", paddingTop: 5, marginRight: 5 }}
                                                alt="captcha"
                                                src="../captcha/image.php?rand=' + Math.random())"
                                                id="img-captcha"
                                            />
                                            <input
                                                style={{ width: "calc(100% - 140px)" }}
                                                type="text"
                                                name="captcha"
                                                id="captcha_qmk"
                                                className="form-control"
                                                placeholder="Nhập mã Captcha"
                                                {...register("p", {
                                                    required: "Không được để trống",

                                                })}
                                            />
                                            {errors.email && <label className="error">{errors.email.message}</label>}
                                        </div>
                                        <div className="form-butt-one">
                                            <input
                                                //  type="button"
                                                type="submit"
                                                className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
                                                defaultValue="Tiếp tục"
                                            />
                                            <p className="bo_qua tex_center share_cursor" data={1}>
                                                <a className="share_fsize_three share_clr_one">Quay lại</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
        </>
    )
};