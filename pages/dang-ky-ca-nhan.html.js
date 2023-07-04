import React from "react"
import Seo from "../components/head";
import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";
import CallApi from './api/call_api';

export default function RegisterPersonal() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const validatePhone = (value) => {
        if (value) {
            return /^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/i.test(value);
        }
        return true;
    };

    const onSubmit = async data => {
        delete data.res_password;
        let response = await CallApi.registerPersonal(data);
        if (response.data && response.data.data && response.data.data.result == true) {
            Cookies.set('phone', data.phoneTK);
            Cookies.set('acc_token', response.data.data.data.access_token)
            Cookies.set('rf_token', response.data.data.data.refresh_token)
            window.location.href = "/xac-thuc-ma-otp-ca-nhan.html";
        } else {
            alert(response)
        }
    };

    return (
        <>
            <Seo
                seo='true'
                title='Tích cực chuyển đổi số, quanlychung.timviec365.vn giúp bạn đổi đời, phát triển'
                des='Thời đại công nghệ số đòi hỏi mỗi cá nhân phải tân tiến và tự mình “chuyển đổi số” để thành công. Cùng timviec365.vn chuyển đổi số, tận dụng nhiều phần mềm cần thiết.'
                url='https://quanlychung.timviec365.vn/dang-ky-ca-nhan.html'
            />

            <div className="content_ql ctn_bgr_body">
                <div className="content_nv">
                    <div className="container">
                        <div className="ctn_qmk">
                            <form action="" className="register_form" autoComplete="false" onSubmit={handleSubmit(onSubmit)} >
                                <div className="one_page_qmk one_reg_ql share_reg_log share_brd_radius share_bgr_tow">
                                    <div className="header_qmk">
                                        <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                                            Đăng ký tài khoản cá nhân trên nền tảng chuyển đổi số lớn nhất
                                        </h1>
                                    </div>
                                    <div className="ctn_form share_distance">
                                        <div className="form-group" >
                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                Tài khoản đăng nhập<span className="cr_red">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="phoneTK"
                                                id="email_nv"
                                                className="form-control"
                                                placeholder="Nhập số điện thoại"
                                                {...register("phoneTK", {
                                                    required: 'Vui lòng nhập số điện thoại',
                                                    validate: {
                                                        validatePhone: (value) => validatePhone(value) || "Hãy nhập đúng định dạng số điện thoại"
                                                    }
                                                })}
                                            />
                                            {errors.phoneTK && <label className="error">{errors.phoneTK.message}</label>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                Tên người dùng <span className="cr_red">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="userName"
                                                className="form-control"
                                                placeholder="Nhập tên người dùng"
                                                {...register("userName", {
                                                    required: 'Họ và tên không được để trống',
                                                })}
                                            />
                                            {errors.userName && <label className="error">{errors.userName.message}</label>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                Nhập mật khẩu <span className="cr_red">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Nhập mật khẩu"
                                                {...register('password', {
                                                    required: 'Vui lòng nhập mật khẩu',
                                                    pattern: {
                                                        value: passwordPattern,
                                                        message:
                                                            'Mật khẩu phải gồm 6 ký tự trở lên, bao gồm ít nhất một chữ cái và ít nhất một chữ số, không chứa khoảng trắng.',
                                                    },
                                                })}
                                            />
                                            {errors && errors.password && <label className="error">{errors.password.message}</label>}

                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                Nhập lại mật khẩu <span className="cr_red">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                name="res_password"
                                                className="form-control"
                                                placeholder="Nhập lại mật khẩu"
                                                {...register('res_password', {
                                                    required: 'Vui lòng nhập mật khẩu xác nhận',
                                                    validate: (value) => {
                                                        const password = watch('password');
                                                        return value === password || 'Mật khẩu không khớp';
                                                    },
                                                })}
                                            />
                                            {errors && errors.res_password && <label className="error">{errors.res_password.message}</label>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                Số điện thoại
                                            </label>
                                            <input
                                                type="text"
                                                name="phoneContact"
                                                className="form-control"
                                                placeholder="Nhập số điện thoại"
                                                onChange={e => { setPhoneNumber(e.currentTarget.value); }}
                                                {...register('phoneContact', {
                                                    validate: {
                                                        validatePhone: (value) => validatePhone(value) || "Hãy nhập đúng định dạng số điện thoại"
                                                    }
                                                })}
                                            />
                                            {errors && errors.phoneContact && <label className="error">{errors.phoneContact.message}</label>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                Địa chỉ <span className="cr_red">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                className="form-control"
                                                placeholder="Nhập địa chỉ"
                                                {...register('address', {
                                                    required: 'Địa chỉ không được để trống'
                                                })}
                                            />
                                            {errors && errors.address && <label className="error">{errors.address.message}</label>}
                                        </div>
                                    </div>
                                    <div className="form-butt-one">
                                        <button
                                            type="submit"
                                            className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
                                        >
                                            Tiếp tục
                                        </button>
                                        <p className="bo_qua tex_center">
                                            <a
                                                href="/lua-chon-dang-ky.html"
                                                className="share_fsize_three share_clr_one"
                                            >
                                                Quay lại
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
        </>
    )
};