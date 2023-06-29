

import React from "react"
import Header from "/components/header/Header";
import Footer from "/components/footer/Footer"
import Head from "next/head";
import { useForm } from 'react-hook-form';
//import { cookies } from 'next/headers';
import { useState } from "react";
// export function checkPhoneNumber(phoneNumber) {
//     var pattern = /^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/i;
//     console.log("check : " + pattern.test(phoneNumber))
//     return pattern.test(phoneNumber);
// }
// export function validatePassword(password) {
//     var pattern = /^\S*(?=\S{6,})(?=\S*[a-zA-Z])(?=\S*[0-9])(?=\S*[\d])\S*$/i;
//     console.log("check password : " + pattern.test(password));
//     return pattern.test(password);

// }


//const inter = Inter({ subsets: [latin] })
export default function dang_ki_ca_nhan() {
    // const cookieStore = cookies();
    const [acount, setAcount] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRe_assword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        window.location.href = "/sendOTP_Person";

    };


    return (
        <>

            <Head>
                <>
                    <title>
                        Tích cực chuyển đổi số, quanlychung.timviec365.vn giúp bạn đổi đời, phát
                        triển
                    </title>
                    <meta
                        name="description"
                        content="Thời đại công nghệ số đòi hỏi mỗi cá nhân phải tân tiến và tự mình “chuyển đổi số” để thành công. Cùng timviec365.vn chuyển đổi số, tận dụng nhiều phần mềm cần thiết."
                    />
                    <meta
                        property="og:title"
                        content="Tích cực chuyển đổi số, quanlychung.timviec365.vn giúp bạn đổi đời, phát triển"
                    />
                    <meta
                        property="og:description"
                        content="Thời đại công nghệ số đòi hỏi mỗi cá nhân phải tân tiến và tự mình “chuyển đổi số” để thành công. Cùng timviec365.vn chuyển đổi số, tận dụng nhiều phần mềm cần thiết."
                    />
                    <meta
                        property="og:url"
                        content="https://quanlychung.timviec365.vn/dang-ky-ca-nhan.html"
                    />
                    <meta
                        property="og:image:url"
                        content="https://quanlychung.timviec365.vn/img/bgr_nentang.png"
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:locale" content="vi_VN" />
                    <link
                        rel="canonical"
                        href="https://quanlychung.timviec365.vn/dang-ky-ca-nhan.html"
                    />
                    <meta charSet="UTF-8" />
                    <meta name="robots" content="noindex,nofollow" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link href="https://timviec365.vn/favicon.ico" rel="shortcut icon" />
                    <link
                        rel="preload"
                        href="../fonts/Roboto-Bold.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="../fonts/Roboto-Medium.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="../fonts/Roboto-Regular.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <link rel="preload" as="style" href="../css/style.css?" />
                    <link
                        rel="stylesheet"
                        media="all"
                        href="../css/style.css"
                        onload="if (media != 'all')media='all'"
                    />
                </>

            </Head>
            <Header />
            <>
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
                                                    name="email"
                                                    id="email_nv"
                                                    className="form-control"
                                                    placeholder="Nhập số điện thoại"
                                                    onChange={e => { setAcount(e.currentTarget.value); }}
                                                    {...register("email", {
                                                        required: "Tài khoản đăng nhập không được để trống",
                                                        pattern: {
                                                            value: /^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/i,
                                                            message: "Hãy nhập đúng định dạng số điện thoại"

                                                        }
                                                    })}
                                                />
                                                {errors.email && <label className="error">{errors.email.message}</label>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Tên người dùng <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name_tk"
                                                    className="form-control"
                                                    placeholder="Nhập tên người dùng"
                                                    onChange={e => { setUserName(e.currentTarget.value); }}
                                                    {...register("name_tk", {
                                                        required: "Tên tài khoản không được để trống"
                                                    })}
                                                />
                                                {errors.name_tk && <label className="error">{errors.name_tk.message}</label>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Nhập mật khẩu <span className="cr_red">*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    id="mk_tkcn"
                                                    placeholder="Nhập mật khẩu"
                                                    onChange={e => { setPassword(e.currentTarget.value); }}
                                                    {...register("password", {

                                                        required: "Mật khẩu không được để trống",
                                                        pattern: {
                                                            value: /^\S*(?=\S{6,})(?=\S*[a-zA-Z])(?=\S*[0-9])(?=\S*[\d])\S*$/i,
                                                            message: "Mật khẩu từ 6 ký tự trở lên gồm ít nhất một chữ cái, ít nhất một chữ số và không chứa khoảng trắng"
                                                        }
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
                                                    id="nlmk_tkcn"
                                                    placeholder="Nhập lại mật khẩu"
                                                    onChange={e => { setRe_assword(e.currentTarget.value); }}
                                                    {...register("res_password", {

                                                        required: "Nhập lại mật khẩu không được để trống",
                                                        pattern: {
                                                            value: /^\S*(?=\S{6,})(?=\S*[a-zA-Z])(?=\S*[0-9])(?=\S*[\d])\S*$/i,
                                                            message: "Mật khẩu từ 6 ký tự trở lên gồm ít nhất một chữ cái, ít nhất một chữ số và không chứa khoảng trắng"
                                                        }
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
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="Nhập số điện thoại"
                                                    onChange={e => { setPhoneNumber(e.currentTarget.value); }}
                                                    {...register("phone", {
                                                        required: "Nhập lại mật khẩu không được để trống",
                                                        pattern: {
                                                            value: /^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/i,
                                                            message: "Hãy nhập đúng định dạng số điện thoại"
                                                        }
                                                    })}
                                                />
                                                {errors && errors.phone && <label className="error">{errors.phone.message}</label>}
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
                                                    onChange={e => { setAddress(e.currentTarget.value); }}
                                                    {...register("address", {
                                                        required: true,
                                                        required: true,
                                                    })}
                                                />
                                                {errors && errors.address && <label className="error">Nhập lại mật khẩu không được để trống</label>}
                                            </div>
                                        </div>
                                        <div className="form-butt-one">
                                            <button
                                                // type="button"
                                                type="submit"
                                                className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
                                            >
                                                Tiếp tục
                                            </button>
                                            <p className="bo_qua tex_center">
                                                <a
                                                    href="/register/lua-chon-dang-ky.html"
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
            <Footer />
        </>
    )
};