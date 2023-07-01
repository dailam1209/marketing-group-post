import React from "react"
import Head from "next/head";
import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";
import callApi from './api/call_api';

export default function info_register_emp() {
  // xử lý validate
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const validatePhone = (value) => {
    if (value) {
      return /^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/i.test(value);
    }
    return true;
  };

  const onSubmit = async data => {
    data.com_id = 1;
    delete data.res_password;
    let response = await callApi.registerCom(data);
    if (response.data && response.data.data && response.data.data.result == true) {
      window.location.href = "sendOTP_Com";
    } else {
      alert(response)
    }
  };

  // Axios.post("http://127.0.0.1:8000/users-create",
  // {
  //   phoneTK: phone_tk,
  //   name: username,
  //   email: email,
  //   pass: password,
  // }).then((response) => {
  //     if(response.data.status == 0){
  //       ErrorAlert(response.data.message);
  //     }
  //     else{
  //       SucessAlert(response.data.message);
  //     }
  // })

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
        <div className="content_ql ctn_bgr_body">
          <div className="content_nv">
            <div className="container">
              <div className="ctn_qmk">
                <form onSubmit={handleSubmit(onSubmit)} className="register_form">
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
                          name="phoneTK"
                          id="phoneTK"
                          className="form-control"
                          placeholder="Nhập số điện thoại"
                          {...register("phoneTK", {
                            required: 'Vui lòng nhập số điện thoại',
                            validate: {
                              validatePhone: (value) => validatePhone(value) || "Hãy nhập đúng định dạng số điện thoại"
                            }
                          })}
                        />
                        {errors && errors.phoneTK && <label className="error">{errors.phoneTK.message}</label>}
                      </div>
                      <div className="form-group">
                        <label className="form_label share_fsize_three share_clr_one cr_weight">
                          Tên công ty <span className="cr_red">*</span>
                        </label>
                        <input
                          type="text"
                          name="userName"
                          className="form-control"
                          placeholder="Nhập tên công ty của bạn"
                          {...register("userName", {
                            required: 'Tên công ty không được để trống',
                          })}
                        />
                        {errors && errors.userName && <label className="error">{errors.userName.message}</label>}
                      </div>
                      <div className="form-group">
                        <label className="form_label share_fsize_three share_clr_one cr_weight">
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          placeholder="Nhập số email"
                          {...register("email", {
                            required: 'email không được để trống',
                          })}
                        />
                        {errors && errors.email && <label className="error">{errors.email.message}</label>}
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
                          Địa chỉ <span className="cr_red">*</span>
                        </label>
                        <input type="text" name="address" class="form-control"
                          placeholder="Nhập địa chỉ"
                          {...register("address", {
                            required: 'Địa chỉ không được để trống',
                          })}
                        />
                        {errors && errors.address && <label className="error">{errors.address.message}</label>}
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
                      {/* <button
                        type="submit"
                        className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
                      >
                        Tiếp tục
                      </button> */}
                      <input
                        type="submit"
                        className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one"
                        defaultValue="Tiếp tục"
                      />
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
      </>



    </>





  )
}
