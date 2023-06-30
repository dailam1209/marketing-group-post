import React from "react"
import Head from "next/head";
import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";
import callApi from '../pages/api/call_api';
import axios from 'axios'

export default function register_emp() {
    // Xử lý validate form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        // let checkVip = await callApi.checkVip(data.id_company)
        // if(checkVip == 0) {
        //     Cookies.set('idCom', data.id_company);
        //     window.location.href = "/thong-tin-dang-ky-nhan-vien.html"
        // } else {
        //     window.location.href = "/thong-bao-tai-khoan-vip.html"
        // }
        let response = '';
        const call = await axios.post('http://210.245.108.202:3000/api/qlc/CheckVip', { idCom: data });
        response = call;
        console.log(response);
    };

    return (
        <>  
<>
  <title>Sự nghiệp thăng tiến nếu biết tận dụng hệ thống chuyển đổi số</title>
  <meta
    name="description"
    content="Chuyển đổi số đơn giản, dễ thực hiện, đem đến cơ hội phát triển bản thân vô cùng lớn dành cho mỗi nhân viên tại doanh nghiệp. Đăng nhập ngay để kiến tạo tương lai."
  />
  <meta
    property="og:title"
    content="Sự nghiệp thăng tiến nếu biết tận dụng hệ thống chuyển đổi số"
  />
  <meta
    property="og:description"
    content="Chuyển đổi số đơn giản, dễ thực hiện, đem đến cơ hội phát triển bản thân vô cùng lớn dành cho mỗi nhân viên tại doanh nghiệp. Đăng nhập ngay để kiến tạo tương lai."
  />
  <meta
    property="og:url"
    content="https://quanlychung.timviec365.vn/dang-nhap-nhan-vien.html"
  />
  <meta
    property="og:image:url"
    content="https://quanlychung.timviec365.vn/img/bgr_nentang.png"
  />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="vi_VN" />
  <link
    rel="canonical"
    href="https://quanlychung.timviec365.vn/dang-nhap-nhan-vien.html"
  />
  <meta charSet="UTF-8" />
  <meta name="robots" content="index,follow" />
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
  <link rel="preload" as="style" href="../css/style.css" />
  <link
    rel="stylesheet"
    media="all"
    href="../css/style.css"
    onload="if (media != 'all')media='all'"
  />
  <link rel="preload" as="style" href="../css/login_qr.css" />
  <link
    rel="stylesheet"
    media="all"
    href="../css/login_qr.css"
    onload="if (media != 'all')media='all'"
  />
</>
<>
  <div className="content_ql">
    <div className="ctn_content">
      <div className="left_bgr_nv">
        <div className="bgr_img_nv">
          <picture>
            <img src="../img/bgr_nua.png" alt="" />
          </picture>
        </div>
      </div>
      <div className="right_bgr_nv">
        <div className="tro_lai">
          <a
            href="lua-chon-dang-nhap.html"
            className="share_fsize_one share_clr_four"
          >
            Quay lại
          </a>
        </div>
        <div className="form_dangnhap">
          <div className="ctn_dangnhap">
            <div className="cont_dangnhap">
              <h1 className="share_clr_four cr_weight_bold tex_center qlc_tieude_moi">
                Cùng doanh nghiệp chuyển đổi số, phát triển bản thân, gây dựng
                tập thể
              </h1>
              <p className="error_lg hidden tex_center share_fsize_three">
                Thông tin tài khoản hoặc mật khẩu không chính xác
              </p>
              <div className="box_select_type">
                <button className="select_login lg_qr active">
                  QUÉT MÃ QR
                </button>
                <div className="line" />
                <button className="select_login login_tk">
                  TÀI KHOẢN<span className="text">(email)</span>
                </button>
              </div>
              <form className="share_distance form_vali form_login_staff form_tk dbn">
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Tài khoản đăng nhập <span className="cr_red">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dn_mail"
                    name="email"
                    placeholder="Nhập email hoặc số điện thoại"
                  />
                </div>
                <div className="form-group">
                  <label className="form_label share_fsize_three share_clr_one cr_weight">
                    Mật khẩu <span className="cr_red">*</span>
                  </label>
                  {/* <span class="see_log" toggle="#pass_field"></span> */}
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="pass_field"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
                <div className="qmk_login">
                  <p className="tex_right">
                    <a
                      href="quen-mat-khau.html?type=1"
                      className="share_clr_four share_fsize_three cr_weight"
                    >
                      Quên mật khẩu?
                    </a>
                  </p>
                </div>
                <div className="form_button">
                  <input
                    type="button"
                    className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor btn_luu"
                    defaultValue="Đăng nhập"
                  />
                </div>
                <p className="tex_center cr_weight share_fsize_three no_login">
                  Bạn chưa có tài khoản?{" "}
                  <a href="/dang-ky-nhan-vien.html">Đăng ký ngay</a>
                </p>
              </form>
              <div className="login_qr scan_qr">
                <div className="qrcode" id="qrcode"></div>
                <p className="text_qr">
                  Sử dụng ứng dụng Chat365 để quét mã QR
                </p>
                <button className="help_qr">Hướng dẫn quét</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* ----- model popup hướng dẫn ----- */}
  <div className="popup popup_helper_qr" style={{ display: "none" }}>
    <div className="content_body">
      <button type="button" className="btn_close">
        <span className="cl_c" aria-hidden="true">
          
        </span>
      </button>
      <p className="title_popup">Hướng dẫn quét QR{/*ơ*/}</p>
      <div className="img_qr" id="qrcode_popup"></div>
      <div className="ct_list">
        <div className="item_l">
          <div className="cicle_list">1</div>
          <p>Đăng nhập ứng dụng Chat365 trên điện thoại của bạn</p>
        </div>
        <div className="item_l">
          <div className="cicle_list">2</div>
          <p>
            <span>Tại ứng dụng chọn biểu tượng</span>{" "}
            <span>
              <img
                style={{ marginBottom: "-5px" }}
                src="/images/login_qr/qr-code.png"
                alt="QR core"
              />
            </span>
            <span>Trên thanh tìm kiếm</span>
          </p>
        </div>
        <div className="item_l">
          <div className="cicle_list">3</div>
          <p>Di chuyển Camera đến mã QR trên màn hình máy tính để đăng nhập</p>
        </div>
      </div>
    </div>
  </div>
  <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
</>











</>
    )
};