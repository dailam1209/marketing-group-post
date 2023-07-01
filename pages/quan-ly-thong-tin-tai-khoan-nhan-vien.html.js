import React, { useState, useEffect } from "react";
import Head from "next/head";
import SideBar from '../components/employee/sideBar';
import HeaderEp from '../components/employee/headerEp';
import callApi from '../pages/api/call_api';
import Cookies from "js-cookie";
import { getEducation } from "../utils/function";
import { useForm } from 'react-hook-form';

export default function detailEmployy() {

    // const [data, setData] = useState(null);
    // const handleDataLoaded = (data) => {
    //     // Cập nhật dữ liệu từ component con vào state của page cha
    //     setData(data);
    // };

    // gọi api lấy thông tin nhân viên
    const [data, setData] = useState([]);
    // const [isDataLoaded, setIsDataLoaded] = useState(false);
    var token = Cookies.get('access_token');

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await callApi.getInfoEp(token);
                setData(response.data.data.data)
                // setIsDataLoaded(true);
                // onDataLoaded(data)
            }
            catch {
                console.log('Error:', error);
            }
        }
        getData()
    }, [])
    if (data.inForPerson && data.inForPerson.account && data.inForPerson.account.gender == 1) {
        var gender = 'Nam'
    } else if (data.inForPerson && data.inForPerson.account && data.inForPerson.account.gender == 2) {
        var gender = 'Nữ'
    } else if (data.inForPerson && data.inForPerson.account && data.inForPerson.account.gender == 3) {
        var gender = ' Khác'
    } else {
        var gender = ''
    }

    if (data.inForPerson && data.inForPerson.account && data.inForPerson.account.married == 1) {
        var married = 'Độc thân'
    } else if (data.inForPerson && data.inForPerson.account && data.inForPerson.account.married == 2) {
        var married = "Đã kết hôn"
    } else {
        var married = "Chưa cập nhập"
    }

    // show popup change password
    const [isClicked, setIsClicked] = useState(false);
    // const [show, setShow] = useState('none');
    const showPopup = () => {
        setIsClicked(true);
        // setShow('block');
    }
    const closePopup = () => {
        setIsClicked(false);
    }

    // show popup change password success
    const [isSuccess, setIsSuccess] = useState(false);
    // show popup change password false
    const [isFalse, setIsFalse] = useState(false);

    // validate form change password
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    console.log(watch());

    const onSubmit = async data => {
        var token = Cookies.get('access_token');
        delete data.res_password;
        console.log(data)
        let response = await callApi.changePass(token, data);
        if (response.data && response.data.data && response.data.data.result == true) {
            setIsSuccess(true);
        } else {
            setIsFalse(true);
        }
    };


    // if (!isDataLoaded) {
    //     return
    // }
    return (
        <>
            <Head>
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
                <link
                    rel="stylesheet"
                    media="all"
                    href="../css/style.css"
                />
                <link
                    rel="stylesheet"
                    media="all"
                    href="../css/detail_employee.css"
                />
                <title>Trang xác thực mã OTP nhân viên</title>
            </Head>
            <div id="qly_ungdung_nv" className="qly_ungdung">
                <div className="wrapper">
                    <div className="left_ql">
                        <SideBar />
                    </div>
                    <div className="right_ql">
                        <div className="header_rigth_qly">
                            <div className="ctn_header_qly">
                                <div className="left_header_qly">
                                    <p className="share_fsize_one ">Ứng dụng / <span className="thay_doi">Tất cả</span></p>
                                </div>
                                <HeaderEp />
                            </div>
                        </div>
                        <div className="ctn_right_qly ">
                            <div className="ctn_res_qly">
                                <div className="left_header_qly">
                                    <p className="share_clr_one font_14">Thông tin tài khoản</p>
                                </div>
                                <div className="list_all_qly">
                                    <div className="main_tt main_tt_taikhoan_ct">
                                        <div className="container_taikhoan">
                                            <div className="item dd_flex">
                                                <div className="avt_taikhoan ">
                                                    <div className="container_avt">
                                                        <div className="position_r text_a_c com_log_n">
                                                            <img src={data.avatarUser}
                                                                alt="" className="img_avt" id="myimage" />
                                                            <img src="../img/icon_mayanh.png" alt=""
                                                                className="img_mayanh position_a" />
                                                            <input type="file" className="img_taianh display_none"
                                                                defaultValue={''}/>
                                                        </div>

                                                        <p className="id">{data.id}</p>
                                                    </div>
                                                </div>
                                                <div className="info_taikhoan">
                                                    <div className="cont">
                                                        <p className="d_title font_20">{data.userName}</p>
                                                        <p className="d_title font_18">$com_name</p>
                                                        <p className="d_title font_16">$dep_name</p>
                                                        {/* <p className="d_title font_16">Tổ 1</p>
                                                        <p className="d_title font_16">Nhóm 1</p> */}
                                                        <p className="content d_flex">
                                                            <span style={{ fontsize: '15px' }}>$position_name</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Kinh nghiệm làm việc:</span>
                                                            <span></span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Ngày bắt đầu làm việc:</span>
                                                            <span>
                                                                ($tt_user['start_working_time'] == "") ? 'Chưa cập nhật' : date_format(date_create($tt_user['start_working_time']), 'd/m/Y');
                                                            </span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Tài khoản đăng nhập:</span>
                                                            <span>{data.email ? data.email : data.phoneTK}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Số điện thoại:</span>
                                                            <span>$ep_phone</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Ngày sinh:</span>
                                                            <span>{(data.inForPerson && data.inForPerson.account && data.inForPerson.account.birthday) ? data.inForPerson.account.birthday : 'Chưa cập nhật'}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Giới tính:</span>
                                                            <span>{gender}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Trình độ học vấn:</span>
                                                            <span>{(data.inForPerson && data.inForPerson.account && data.inForPerson.account.education) ? getEducation(data.inForPerson.account.education) : 'Chưa cập nhật'}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Địa chỉ:</span>
                                                            <span>{data.address}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Tình trạng hôn nhân:</span>
                                                            <span>{married}</span>
                                                        </p>
                                                    </div>
                                                    <div className="d_flex container_btn">
                                                        <a href="/chinh-sua-thong-tin-tai-khoan-nhan-vien.html"><button className="btn_d btn_168 btn_trang">Chỉnh sửa thông tin</button></a>
                                                        <button className="btn_edit_mk btn_d btn_168 btn_xanh" onClick={showPopup}>Đổi mật khẩu</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal_share modal_share_tow edit_tt_matkhau" style={{ display: isClicked ? 'block' : 'none' }}>
                <div className="modal-content">
                    <div className="info_modal">
                        <div className="modal-header">
                            <div className="header_ctn_share">
                                <h4 className="ctn_share_h share_clr_tow tex_center cr_weight_bold">Thay đổi mật khẩu</h4>
                                <span className="close_detl close_dectl" onClick={closePopup}>&times;</span>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="ctn_body_modal">
                                <div className="madal_form">
                                    <form onSubmit={handleSubmit(onSubmit)} className="edit_share_form share_distance edit_tt_matkhau_form">
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">Mật khẩu
                                                cũ<span className="cr_red">*</span></label>
                                            {/* <span className="see_log" toggle="#old_password"></span> */}
                                            <input type="password" name="old_password" className="form-control"
                                                placeholder="Nhật mật khẩu cũ" id="old_password" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">Mật khẩu
                                                mới<span className="cr_red">*</span></label>
                                            {/* <span className="see_log" toggle="#new_password"></span> */}
                                            <input type="password" name="new_password" className="form-control" id="new_password"
                                                placeholder="Nhật mật khẩu mới"  {...register('password', {
                                                    required: 'Vui lòng nhập mật khẩu',
                                                    pattern: {
                                                        value: passwordPattern,
                                                        message:
                                                            'Mật khẩu phải gồm 6 ký tự trở lên, bao gồm ít nhất một chữ cái và ít nhất một chữ số, không chứa khoảng trắng.',
                                                    },
                                                })} />
                                            {errors && errors.password && <label className="error">{errors.password.message}</label>}

                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">Nhập lại
                                                mật khẩu<span className="cr_red">*</span></label>
                                            {/* <span className="see_log" toggle="#pass_new"></span> */}
                                            <input type="password" name="res_password" className="form-control"
                                                placeholder="Nhập lại mật khẩu mới" id="pass_new" {...register('res_password', {
                                                    required: 'Vui lòng nhập mật khẩu xác nhận',
                                                    validate: (value) => {
                                                        const password = watch('password');
                                                        return value === password || 'Mật khẩu không khớp';
                                                    },
                                                })} />
                                            {errors && errors.res_password && <label className="error">{errors.res_password.message}</label>}
                                        </div>
                                        <div className="form_butt_ht">
                                            <div className="tow_butt_flex">
                                                <button onClick={closePopup} type="button" className="js_btn_huy btn_d btn_trang btn_140">
                                                    Hủy
                                                </button>
                                                <button type="submit" className="btn_d btn_xanh btn_140 com_save_pass">
                                                    Hoàn thành
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* thay đổi mật khẩu thành công */}
            <div className="modal_share modal_share_three edit_mk_success" style={{ display: isSuccess ? 'block' : 'none' }}>
                <div className="modal-content">
                    <div className="info_modal">
                        <div className="modal-body">
                            <div className="ctn_body_modal">
                                <div className="content_notif">
                                    <div className="avt_notif notif_mar">
                                        <img src="../img/thongbao.png" alt="" />
                                    </div>
                                    <p className="titl_notif">Đổi mật khẩu thành công!</p>
                                    <div className="form_butt_ht">
                                        <div className="tow_butt_flex">
                                            <button type="submit"
                                                className="font_s15 share_clr_tow share_bgr_one dong_button close_button_share">Đóng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* thay đổi mật khẩu thất bại */}
            <div className="modal_share modal_share_three edit_mk_fall" style={{ display: isFalse ? 'block' : 'none' }}>
                <div className="modal-content">
                    <div className="info_modal">
                        <div className="modal-body">
                            <div className="ctn_body_modal">
                                <div className="content_notif">
                                    <div className="avt_notif notif_mar">
                                        <img src="../img/notif_thatbai.png" alt="" />
                                    </div>
                                    <p className="titl_notif">Đổi mật khẩu thất bại, vui lòng thử lại sau! </p>
                                    <div className="form_butt_ht">
                                        <div className="tow_butt_flex">
                                            <a href="/quan-ly-thong-tin-tai-khoan-nhan-vien.html"
                                                className="font_s15 share_clr_tow share_bgr_one dong_button close_button_share">Đóng</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
        </>
    )
}