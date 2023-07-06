import { React, useState, useEffect } from "react";
import CallApi from '../api/call_api';
import { useForm } from 'react-hook-form'
import Cookies from "js-cookie";
import Seo from '../../components/head'

export default function AdminHome() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        if (data.name == 'admin' && data.password == 'Hhp@123') {
            Cookies.set('admin', 123)
            window.location.href = '/admin/danh-sach-cong-ty'
        } else {
            alert('sai tên tài khoản hoặc mật khẩu')
        }
    };

    // fix first render 
    const [hydrated, setHydrated] = useState(false); useEffect(() => {
        setHydrated(true)
    }, [])

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <>
            <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
            <title>Administrator</title>
            {/* <base href="https://vieclamtaihanoi.com.vn/" /> */}
            {/* <link href="#" rel="shortcut icon" /> */}
            <link rel="stylesheet" href="../css/admin.css" type="text/css" />

            <div class="page-login">
                <img src="../img/admin-logo.png" />
                <form onSubmit={handleSubmit(onSubmit)} name="frmlogin" action="https://vieclamtaihanoi.com.vn/admin/dologin" method="post">
                    <table>
                        <tr>
                            <td style={{ border: 'none' }}><label>Tài khoản đăng nhập</label>
                                <input type="text" name="name" defaultValue=""
                                    {...register("name", {
                                        required: 'Không để trống',

                                    })}
                                />
                                {errors && errors.name && <label className="error">{errors.name.message}</label>}

                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: 'none' }}><label>Mật khẩu</label>
                                <input type="password" name="pass" defaultValue=""
                                    {...register("password", {
                                        required: 'Không để trống',

                                    })}
                                />
                                {errors && errors.password && <label className="error">{errors.password.message}</label>}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: 'none' }} colspan="2">
                                <input type="submit" value="Đăng nhập" />
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />

        </>
    )
}