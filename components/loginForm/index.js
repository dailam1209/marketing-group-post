import { React, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Link from 'next/link'
import { loginPersonal, loginEp, loginCom, login } from "../../utils/handleApi";


export default function LoginForm({ setNotiError, type }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        let result = ''
        data.type = type
        result = await login(data)
        if (result == 'err') {
            setNotiError(true);
        }
    };

    let linkLogout = ''
    let linkForgetPW = ''
    if (type == '2') {
        linkLogout = '/dang-ky-nhan-vien.html'
        linkForgetPW = '/quen-mat-khau.html?type=2'
    } else if (type == '1') {
        linkLogout = '/dang-ky-cong-ty.html'
        linkForgetPW = '/quen-mat-khau.html?type=1'
    } else {
        linkLogout = '/dang-ky-ca-nhan.html'
        linkForgetPW = '/quen-mat-khau.html?type=2'
    }

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
                        name="account"
                        placeholder="Nhập email hoặc số điện thoại"
                        {...register("account", {
                            required: "Tài khoản đăng nhập không được để trống",
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
                            href={linkForgetPW}
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
                    <Link href={linkLogout}>Đăng ký ngay</Link>
                </p>
            </form>
        </>
    )
}