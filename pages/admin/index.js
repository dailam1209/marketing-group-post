import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import Cookies from "js-cookie";
import Head from 'next/head';

export default function AdminHome() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        if (data.name === 'admin' && data.password === 'Hhp@123') {
            Cookies.set('admin', 123);
            window.location.href = '/admin/danh-sach-cong-ty';
        } else {
            alert('Sai tên tài khoản hoặc mật khẩu');
        }
    };

    return (
        <>
            <Head>
                <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
                <title>Administrator</title>

                <link rel="stylesheet" href="../css/admin.css" type="text/css" />
            </Head>

            <div className="page-login">
                <img src="../img/admin-logo.png" />
                <form onSubmit={handleSubmit(onSubmit)} name="frmlogin" action="https://vieclamtaihanoi.com.vn/admin/dologin" method="post">
                    <table>
                        <tbody>
                            <tr>
                                <td style={{ border: 'none' }}>
                                    <label>Tài khoản đăng nhập</label>
                                    <input type="text" name="name"
                                        {...register("name", {
                                            required: 'Không để trống',
                                        })}
                                    />
                                    {errors && errors.name && <label className="error">{errors.name.message}</label>}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: 'none' }}><label>Mật khẩu</label>
                                    <input type="password" name="pass"
                                        {...register("password", {
                                            required: 'Không để trống',
                                        })}
                                    />
                                    {errors && errors.password && <label className="error">{errors.password.message}</label>}
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: 'none' }} colSpan="2">
                                    <input type="submit" value="Đăng nhập" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>

        </>
    )
}