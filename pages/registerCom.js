import React, { useState } from "react";
import { useRouter } from 'next/router'
// import Link from "next/link"
import {
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormFeedback,
  FormLabel,
  FormControl,
  Button,
  Row,
  Spinner,
  FormText
} from "react-bootstrap";
import Link from "next/link";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import fetch from "isomorphic-unfetch";
// import { login } from "../../utils/auth";


//const inter = Inter({ subsets: [latin] })
export default function register_com() {
  const router = useRouter()
  
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleUsername = (e) => { setUsername(e.target.value) };
    const handleEmail = (e) => { setEmail(e.target.value) };
    const handlePassword = (e) => { setPassword(e.target.value) };
  
  
    const RegisterAccount = () =>
    {
      //check if email is actually an email
      var res = email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
      if(res === null){
        ErrorAlert('Please enter a valid email address');
        return;
      }
  
      Axios.post("http://127.0.0.1:3000/users-create",
      {
        name: username,
        email: email,
        pass: password,
      }).then((response) => {
          if(response.data.status == 0){
            ErrorAlert(response.data.message);
          }
          else{
            SucessAlert(response.data.message);
          }
      });
      return;
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
                    placeholder="Nhập số điện thoại"
                  />
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
                  />
                </div>
                
                <div className="form-group">
                <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormControl type="text" placeholder="Email" className="form_label share_fsize_three share_clr_one cr_weight" id="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        required="true" title="Enter valid email" />
                       
                    </FormGroup>
                </div>
                <div className="form-group">
                  
                  <FormGroup>
                        <FormLabel>Nhập mật khẩu</FormLabel>
                        <FormControl type="password" placeholder="Password" className="form_label share_fsize_three share_clr_one cr_weight" id="password" name="password"
                        required="true" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                        />
                        
                    </FormGroup>
                  {/* <span class="loi_error share_dnone">Hãy nhập mật khẩu từ 8 đến 16 ký tự bao gồm chữ hoa, chữ thường và ít nhất một chữ số và không chứa khoảng trắng</span> */}
                </div>
                <div className="form-group">
                <FormGroup>
                        <FormLabel>Nhập lại mật khẩu</FormLabel>
                        <FormControl type="password" placeholder="Nhập lại mật khẩu" className="form_label share_fsize_three share_clr_one cr_weight" id="password-field-four" name="res_password"
                        required="true" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Nhập lại mật khẩu"
                        />
                        
                    </FormGroup>
                  {/* <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Nhập lại mật khẩu <span className="cr_red">*</span>
                  </label>
                  <span className="see_log" toggle="#password-field-four" />
                  <input
                    type="password"
                    name="res_password"
                    className="form-control"
                    id="password-field-four"
                    placeholder="Nhập lại mật khẩu"
                  /> */}
                </div>
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Địa chỉ <span className="cr_red">*</span>
                  </label>
                  <input type="text" name="address" class="form-control"
                                          placeholder="Nhập địa chỉ"/>
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
                   onClick={() => router.push("/sendOTP_Com")}
                  className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one" type="submit" variant="primary" 
                >
                  Tiếp tục
                </button>
                {/* <Button onClick={() => router.push("/register/sendOTP_Com")}
                  className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one" type="submit" variant="primary">Tiếp tục</Button> */}
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
    