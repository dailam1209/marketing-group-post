import { React, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Link from 'next/link'
import { loginPersonal } from "../../utils/handleApi";
import { validatePhone } from "../../utils/function";

export default function LoginForm(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        await loginPersonal(data);
      };
    
    return (
        <>
            <form className="share_distance form_vali form_login_staff form_tk" onSubmit={handleSubmit(onSubmit)} >
                <div className="form-group">
                    <label className="form_label share_fsize_three share_clr_one cr_weight">
                        Tài khoản đăng nhập <span className="cr_red">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="dn_mail"
                        name="phoneTK"
                        placeholder="Nhập email hoặc số điện thoại"
                        {...register("phoneTK", {
                            required: "Tài khoản đăng nhập không được để trống",
                            validate: {
                                validatePhone: (value) => validatePhone(value) || "Hãy nhập đúng định dạng số điện thoại"
                            }
                        })}

                    />
                    {errors.phoneTK && <label className="error">{errors.phoneTK.message}</label>}
                </div>
                <div className="form-group">
                    <label className="form_label share_fsize_three share_clr_one cr_weight">
                        Mật khẩu <span className="cr_red">*</span>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="pass_field"
                        placeholder="Nhập mật khẩu"
                        {...register("password", {
                            required: "Mật khẩu không được để trống",
                        })}
                    />
                    {errors && errors.password && <label className="error">{errors.password.message}</label>}
                </div>
                <div className="qmk_login">
                    <p className="tex_right">
                        <a
                            href="/quen-mat-khau.html?type=2"
                            className="share_clr_four share_fsize_three cr_weight"
                        >
                            Quên mật khẩu?
                        </a>
                    </p>
                </div>
                <div className="form_button">
                    <input
                        type="submit"
                        className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor btn_luu"
                        defaultValue="Đăng nhập"
                    />
                </div>
                <p className="tex_center cr_weight share_fsize_three no_login">
                    Bạn chưa có tài khoản?{" "}
                    <Link href="/dang-ky-ca-nhan.html">Đăng ký ngay</Link>
                </p>
            </form>
        </>
    )
}