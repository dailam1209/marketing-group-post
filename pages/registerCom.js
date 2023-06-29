import React from "react"
import Head from "next/head";
// import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { Link } from "react-router-dom"
import { useState } from "react";




export default function register_com() {
  const router = useRouter()
  const [ username , setUsername] = useState("")
  const [ password , setPassword] = useState("")
  const [ re_password , setRePassword] = useState("")
  const [ email_tk , setEmailTK] = useState("")
  const [ email , setEmail] = useState("")
  const [ address , setAddress] = useState("")
    
  const handleSubmit = (e) =>{
    e.preventDefault()
    const newUser = {
      username :username,
      email_tk :email_tk,
      email :email,
      password :password,
      re_password :re_password,
      address :address,
    }
  }
  
  return (

        <>
	<>      
  <meta charSet="UTF-8" />
  <title>
    Hệ thống chuyển đổi số hàng đầu Việt Nam, đăng ký để trải nghiệm
  </title>
  <meta
    name="description"
    content="Khám phá một hệ sinh thái chuyển đổi số lớn, tích hợp nhiều tiện ích trong một nền tảng giúp công ty quản trị nguồn nhân lực hiệu quả, tối ưu và tiết kiệm."
  />
  <meta
    property="og:title"
    content="Hệ thống chuyển đổi số hàng đầu Việt Nam, đăng ký để trải nghiệm"
  />
  <meta
    property="og:description"
    content="Khám phá một hệ sinh thái chuyển đổi số lớn, tích hợp nhiều tiện ích trong một nền tảng giúp công ty quản trị nguồn nhân lực hiệu quả, tối ưu và tiết kiệm."
  />
  <meta
    property="og:url"
    content="https://quanlychung.timviec365.vn/dang-ky-cong-ty.html"
  />
  <meta
    property="og:image:url"
    content="https://quanlychung.timviec365.vn/img/bgr_banner.png"
  />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="vi_VN" />
  <link
    rel="canonical"
    href="https://quanlychung.timviec365.vn/dang-ky-cong-ty.html"
  />
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

<>
<form onSubmit={handleSubmit(onSubmit)} className="regnv_form regnv_form_dk">

  <div className="content_ql ctn_bgr_body">
    <div className="content_nv">
      <div className="container">
        <div className="ctn_qmk">
          <form action="" className="register_form">
            <div className="one_page_qmk one_reg_ql share_reg_log share_brd_radius share_bgr_tow">
              <div className="header_qmk">
                <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                  Đăng ký tài khoản công ty, chuyển đổi số nhanh, tiện ích lớn
                </h1>
                <div className="qmk_avt_ic tex_center">
                  <img src="../img/one_ic_register.png" alt="" />
                </div>
              </div>
              <div className="ctn_form share_distance">
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Tài khoản đăng nhập <span className="cr_red">*</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email_dk"
                    className="form-control"
                    placeholder="Nhập email đăng kí"
                    onChange={(e) => setEmailTK(e.target.value)}
                  //   {...register("name", {
                  //     required: true,
                  //     pattern: {
                  //         value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  //         message: "vui lòng nhập email đăng kí."
                  //     },
                  // })}
                />
              {/* {errors && <label className="error">Vui lòng nhập email</label>} */}
                </div>
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Tên công ty <span className="cr_red">*</span>
                  </label>
                  <input
                    type="text"
                    name="name_cty"
                    className="form-control"
                    placeholder="Nhập tên công ty của bạn"
                    onChange={(e) => setUsername(e.target.value)}

                  //   {...register("name", {
                  //     required: true,
                  //     pattern: {
                  //         value: /^\d+$/,
                          
                  //         message: "Vui lòng nhập tên công ty của bạn"
                  //     },
                  // })}
                />
              {/* {errors && <label className="error">Vui lòng nhập tên công ty của bạn</label>} */}
                </div>
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Email
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Nhập số email"
                    onChange={(e) => setEmail(e.target.value)}

                  //   {...register("name", {
                  //     required: true,
                  //     pattern: {
                  //         value: /^\d+$/,
                  //         message: "This input is number only."
                  //     },
                  // })}
                />
              {/* {errors && errors.id_company && <label className="error">Vui lòng nhập email</label>} */}
                </div>
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Nhập mật khẩu <span className="cr_red">*</span>
                  </label>
                  <span className="see_log" toggle="#password-field-three" />
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password-field-three"
                    placeholder="Nhập mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                    
                  //   {...register("name", {
                  //     required: true,
                  //     pattern: {
                  //         value: /^\d+$/,
                  //         message: "This input is number only."
                  //     },
                  // })}
                />
              {/* {errors && errors.id_company && <label className="error">Vui lòng nhập email</label>} */}
                  {/* <span class="loi_error share_dnone">Hãy nhập mật khẩu từ 8 đến 16 ký tự bao gồm chữ hoa, chữ thường và ít nhất một chữ số và không chứa khoảng trắng</span> */}
                </div>
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Nhập lại mật khẩu <span className="cr_red">*</span>
                  </label>
                  <span className="see_log" toggle="#password-field-four" />
                  <input
                    type="password"
                    name="res_password"
                    className="form-control"
                    id="password-field-four"
                    placeholder="Nhập lại mật khẩu"
                    onChange={(e) => setRePassword(e.target.value)}

                  //   {...register("name", {
                  //     required: true,
                  //     pattern: {
                  //         value: /^\d+$/,
                  //         message: "This input is number only."
                  //     },
                  // })}
                />
              {errors && errors.id_company && <label className="error">Vui lòng nhập email</label>}
                </div>
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Địa chỉ <span className="cr_red">*</span>
                  </label>
                  <input type="text" name="address" class="form-control"
                                          placeholder="Nhập địa chỉ"
                    onChange={(e) => setAddress(e.target.value)}

                                        //   {...register("name", {
                                        //     required: true,
                                        //     pattern: {
                                        //         value: /^\d+$/,
                                        //         message: "This input is number only."
                                        //     },
                                        // })}
                                      />
                                    {/* {errors && errors.id_company && <label className="error">Vui lòng nhập email</label>} */}
                  {/* <textarea
                    type="text"
                    id="user_name"
                    name="address"
                    style={{
                      resize: "none",
                      height: "auto",
                      minHeight: 42,
                      fontSize: 14,
                      lineHeight: 22,
                      padding: "10px 15px",
                      width: "100%",
                      color: "#666666",
                      borderRadius: 5,
                      border: "1px solid #DDDDDD"
                    }}
                    placeholder="Nhập địa chỉ công ty"
                    value="Công ty test 123"
                    defaultValue={""}
                  /> */}
                </div>
              </div>
              <div className="form-butt-one">
                <button
                  type="summit"
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
  </div>
  <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
  </form>




</>



        </>
    )
}
    