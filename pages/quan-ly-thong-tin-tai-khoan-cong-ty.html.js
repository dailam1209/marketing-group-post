import React, { useState, useEffect, useRef } from "react";
import Seo from '../components/head'
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';
import EditCom from '../components/editCom'
import { useForm } from 'react-hook-form';
import { infoCom, changePassCom, updateCom } from "../utils/handleApi";

export default function DetailEmployy() {
    // gọi api lấy thông tin nhân viên
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await infoCom();
                setData(response.data)
            }
            catch (error) {
                console.log(error);
            }
        }
        getData()
    }, [])

    // change password
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
    // show error
    const [errorPass, setErrorPass] = useState(false)

    // validate form change password
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async data => {
        try {
            let response = await changePassCom(data);
            if (response.result && response.result == true) {
                setIsSuccess(true);
            } else {
                setErrorPass(true)
            }
        } catch (error) {
            setIsFalse(true);
        }
    };

    // update info
    // show popup form update infor
    const [showUpdate, setShowUpdate] = useState(false)
    const showPopupUpdate = () => {
        setShowUpdate(true);
    }
    const closePopupUpdate = () => {
        setShowUpdate(false);
    }

    // popup update info success
    const [updateStatus, setUpdateStatus] = useState(false)

    // handle upload avatar 
    const fileInputRef = useRef(null);

    const handleUploadAvt = () => {
        fileInputRef.current.click();
    };

    // Tạo đối tượng FileReader
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        // const imageUrl = URL.createObjectURL(file);

        if (file) {
            let data = {
                avatarUser: file
            }
            let result = await updateCom(data)
        };
    }

    return (
        <>
            <Seo
                seo=''
                title='Thông tin tài khoản công ty'
            />
            <div id="qly_ungdung_nv" className="qly_ungdung">
                <div className="wrapper">
                    <div className="left_ql">
                        <SideBar />
                    </div>
                    <div className="right_ql">
                        <div className="header_rigth_qly">
                            <div className="ctn_header_qly">
                                <HeaderLogin />
                            </div >
                        </div >
                        <div className="ctn_right_qly ">
                            <div className="ctn_res_qly">
                                <div className="left_header_qly">
                                    <p className="share_clr_one font_14">Thông tin tài khoản</p>
                                </div>
                                <div className="list_all_qly">
                                    <div className="main_tt main_tt_taikhoan">
                                        <div className="container_taikhoan">
                                            <div className="item d_flex">
                                                <div className="avt_taikhoan ">
                                                    <div className="container_avt">
                                                        <div className="position_r text_a_c com_log_n" onClick={handleUploadAvt}>
                                                            <img src={data.avatarUser || '../img/icon_avt.png'}
                                                                alt="" className="img_avt" id="myimage" />
                                                            <img src="../img/icon_mayanh.png" alt=""
                                                                className="img_mayanh position_a" />
                                                            <input
                                                                type="file"
                                                                className="img_taianh display_none"
                                                                defaultValue={''}
                                                                accept="image/*"
                                                                ref={fileInputRef}
                                                                onChange={handleFileChange}
                                                            />
                                                        </div>
                                                        <p className="id">{data._id}</p>
                                                    </div>
                                                </div>
                                                <div className="info_taikhoan">
                                                    <div className="cont">
                                                        <p className="content d_title title_20" style={{ fontsize: '20px' }}>{data.userName}</p>
                                                        <p className="content d_flex">
                                                            <span>Địa chỉ email:</span>
                                                            <span>{data.email || 'Chưa cập nhật'}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Số điện thoại:</span>
                                                            <span>{data.phone || data.phoneTK || 'Chưa cập nhật'}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Địa chỉ:</span>
                                                            <span>{data.address}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Phòng ban:</span>
                                                            <span>{data.departmentsNum}</span>
                                                        </p>
                                                        <p className="content d_flex">
                                                            <span>Nhân sự:</span>
                                                            <span>{data.userNum}</span>
                                                        </p>
                                                    </div>
                                                    <div className="d_flex container_btn">
                                                        <button className="btn_edit_tt btn_d btn_168 btn_trang" onClick={showPopupUpdate}>Chỉnh sửa thông
                                                            tin</button>
                                                        <button className="btn_edit_mk btn_d btn_168 btn_xanh" onClick={showPopup}>Đổi mật
                                                            khẩu</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >

                    {(showUpdate) && <EditCom closePopupUpdate={closePopupUpdate} data={data} setUpdateStatus={setUpdateStatus} />
                    }

                    {/* chỉnh sửa tt thành công */}
                    <div className="modal_share modal_share_three edit_tt_success" style={{ display: updateStatus ? 'block' : 'none' }}>
                        <div className="modal-content">
                            <div className="info_modal">
                                <div className="modal-body">
                                    <div className="ctn_body_modal">
                                        <div className="content_notif">
                                            <div className="avt_notif notif_mar">
                                                <img src="../img/thongbao.png" alt="" />
                                            </div>
                                            <p className="titl_notif">Chỉnh sửa thông tin thành công!</p>
                                            <div className="form_butt_ht">
                                                <div className="tow_butt_flex">
                                                    <a type="button" href="/quan-ly-thong-tin-tai-khoan-cong-ty.html"
                                                        className="font_s15 share_clr_tow share_bgr_one dong_button close_button_share" >Đóng</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* popup đổi mk */}
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
                                                    <label className="error" style={{ display: errorPass ? 'block' : 'none' }}>Mật khẩu cũ không chính xác</label>
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
                                                    <a href="/quan-ly-thong-tin-tai-khoan-cong-ty.html"
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
                                                    <a href="/quan-ly-thong-tin-tai-khoan-cong-ty.html"
                                                        className="font_s15 share_clr_tow share_bgr_one dong_button close_button_share">Đóng</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}