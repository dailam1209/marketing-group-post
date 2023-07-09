import React, { useState, useEffect } from "react";
import Seo from '../components/head'
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';
import Cookies from "js-cookie";
import { getEducation, getGender, getExperience, getMarried, getPosition, ConvertIntToDate } from "../utils/function";
import { useForm } from 'react-hook-form';
import { infoEp, infoPersonal, changePassEp, changePassPersonal } from '../utils/handleApi';


export default function DetailEmployee() {
    // fix first render 
    const [hydrated, setHydrated] = useState(false);

    // gọi api lấy thông tin nhân viên
    const [data, setData] = useState([]);
    let type = Cookies.get('role');

    useEffect(() => {
        const getData = async () => {
            if (type == '2') {
                let response = await infoEp();
                setData(response.data)
            } else {
                let response = await infoPersonal();
                setData(response.data)
            }
        }
        getData()
        setHydrated(true)
    }, [])
    console.log(data)

    // show popup change password
    const [isClicked, setIsClicked] = useState(false);
    const showPopup = () => {
        setIsClicked(true);
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
    const onSubmit = async data => {
        if (type == '2') {
            let response = await changePassEp(data);
            if (response.result == true) {
                setIsSuccess(true);
            } else {
                alert(response.data.error.message)
            }
        } else {
            let response = await changePassPersonal(data);
            if (response.result == true) {
                setIsSuccess(true);
            } else {
                alert(response.data.error.message)
            }
        }
    };

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <>
            <Seo
                seo=''
                title='Thông tin tài khoản nhân viên'
            />
            <div id="qly_ungdung_nv" className="qly_ungdung">
                <div className="wrapper">
                    <div className="left_ql">
                        <SideBar />
                    </div>
                    <div className="right_ql">
                        <div className="header_rigth_qly">
                            <div className="ctn_header_qly">
                                <div className="left_header_qly">
                                    <p className="share_fsize_one ">Thông tin tài khoản</p>
                                </div>
                                <HeaderLogin />
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
                                                            <img src={data.avatarUser || '../img/icon_avt.png'}
                                                                alt="" className="img_avt" id="myimage" />
                                                            <img src="../img/icon_mayanh.png" alt=""
                                                                className="img_mayanh position_a" />
                                                            <input type="file" className="img_taianh display_none"
                                                                defaultValue={''} />
                                                        </div>

                                                        <p className="id">{data._id}</p>
                                                    </div>
                                                </div>
                                                <div className="info_taikhoan">
                                                    <div className="cont">
                                                        <p className="d_title font_20">{data.userName}</p>
                                                        {(type == 2) && (
                                                            <>
                                                                <p className="d_title font_18">{data.companyName}</p>
                                                                <p className="d_title font_16">{data.departmentName}</p>
                                                                <p className="content d_flex">
                                                                    <span style={{ fontsize: '15px' }}>{getPosition(data.position_id)}</span>
                                                                </p>
                                                            </>
                                                        )}
                                                        <p className="content d_flex">
                                                            <span>Kinh nghiệm làm việc:</span>
                                                            <span>{getExperience(data.experience)}</span>
                                                        </p>
                                                        {(type == '2') ? (
                                                            <p className="content d_flex">
                                                                <span>Ngày bắt đầu làm việc:</span>
                                                                <span>{(data.start_working_time != 0) ? ConvertIntToDate(data.start_working_time)[0] : 'Chưa cập nhật'}</span>
                                                            </p>
                                                        ) : ''}
                                                        <p className="content d_flex">
                                                            <span>Tài khoản đăng nhập:</span>
                                                            <span>{data.email ? data.email : data.phoneTK}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Số điện thoại:</span>
                                                            <span>{data.phone}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Ngày sinh:</span>
                                                            <span>{(data.birthday) ? data.inForPerson.account.birthday : 'Chưa cập nhật'}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Giới tính:</span>
                                                            <span>{getGender(data.gender)}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Trình độ học vấn:</span>
                                                            <span>{(data.education) ? getEducation(data.education) : 'Chưa cập nhật'}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Địa chỉ:</span>
                                                            <span>{data.address}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Tình trạng hôn nhân:</span>
                                                            <span>{getMarried(data.married)}</span>
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
                                                placeholder="Nhật mật khẩu cũ" id="old_password" {...register('old_password', {
                                                    required: 'Vui lòng nhập mật khẩu cũ',
                                                })} />
                                            {errors && errors.old_password && <label className="error">{errors.old_password.message}</label>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">Mật khẩu
                                                mới<span className="cr_red">*</span></label>
                                            {/* <span className="see_log" toggle="#new_password"></span> */}
                                            <input type="password" name="new_password" className="form-control" id="new_password"
                                                placeholder="Nhật mật khẩu mới"  {...register('password', {
                                                    required: 'Vui lòng nhập mật khẩu',
                                                    pattern: {
                                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
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
                                                placeholder="Nhập lại mật khẩu mới" id="pass_new" {...register('re_password', {
                                                    required: 'Vui lòng nhập mật khẩu xác nhận',
                                                    validate: (value) => {
                                                        const password = watch('password');
                                                        return value === password || 'Mật khẩu không khớp';
                                                    },
                                                })} />
                                            {errors && errors.re_password && <label className="error">{errors.re_password.message}</label>}
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