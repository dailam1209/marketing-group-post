import React, { useState, useEffect } from "react";
import Seo from "../components/head";
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form';
import { infoEp, infoPersonal, updateEp, updatePersonal } from '../utils/handleApi';
import { getEducation, validatePhone, getExperience, getGender, getMarried, ConvertIntToDate } from "../utils/function";

export default function EditEmployee() {
    // fix first render 
    const [hydrated, setHydrated] = useState(false);

    // gọi api lấy thông tin nhân viên
    const [data, setData] = useState([]);
    let role = Cookies.get('role');
    useEffect(() => {
        const getData = async () => {
            if (role == 2) {
                let response = await infoEp();
                setData(response.data)
                setValue('userName', response.data.userName)
                setValue('address', response.data.address)
                setValue('phone', response.data.phone || response.data.phoneTK)
                setHydrated(true)

            } else {
                let response = await infoPersonal();
                setData(response.data)
                setValue('userName', response.data.userName)
                setValue('address', response.data.address)
                setValue('phone', response.data.phone || response.data.phoneTK)
                setHydrated(true)
            }
        }
        getData()
    }, [])

    // handle validate form update
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = async data => {
        console.log(data)
        let dateObject = new Date(data.birthday);
        let birthday = dateObject.getTime();
        birthday = Math.floor(birthday / 1000);
        delete data.birthday
        data.birthday = birthday
        console.log(data)
        if (role == 2) {
            let response = await updateEp(data);
            if (response.result == true) {
                setUpdateSuccess(true)
            } else {
                setUpdateFalse(true)
            }
        } else {
            let response = await updatePersonal(data);
            if (response.result && response.result == true) {
                setUpdateSuccess(true)
            } else {
                setUpdateFalse(true)
            }
        }
    };

    // handle popup
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [updateFalse, setUpdateFalse] = useState(false)

    const closeUpdate = () => {
        setUpdateSuccess(false)
        setUpdateFalse(false)
        window.location.href = '/quan-ly-thong-tin-tai-khoan-nhan-vien.html'
    }

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <>
            <Seo
                seo=''
                title='Chỉnh sửa tài khoản nhân viên'
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
                            </div>
                        </div>
                        <div className="ctn_right_qly color_gray">
                            <div className="ctn_res_qly">
                                <div className="left_header_qly">
                                    <p className="share_clr_one font_14"><a className="avt_href_share share_fsize_one share_clr_one" href="/quan-ly-thong-tin-tai-khoan-nhan-vien.html"><img src="../img/href_pre.png" /></a>
                                        Thông tin tài khoản / Chỉnh sửa thông tin</p>
                                </div>
                                <div className="list_all_qly">
                                    <div className="main_tt main_tt_taikhoan_bang">
                                        <form onSubmit={handleSubmit(onSubmit)} className="edit_share_form share_distance edit_tt_taikhoan_to_form">
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        ID</label>
                                                    <input type="text" name="name_id" className="form-control share_fsize_one share_clr_one" placeholder="Nhập ID" value={data._id || ''} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Công ty</label>
                                                    <input type="text" name="congty" className="form-control share_fsize_one share_clr_one" placeholder="Nhập tên công ty" value={data.companyName || ''} readOnly />
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Họ và tên<span className="cr_red">*</span></label>
                                                    <input type="text" name="userName" className="form-control share_fsize_one share_clr_one" placeholder="Nhập họ và tên" defaultValue={data.userName || ''}
                                                        {...register("userName", {
                                                            required: 'Họ và tên không được để trống',
                                                        })}
                                                    />
                                                    {errors.userName && <label className="error">{errors.userName.message}</label>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Email<span className="cr_red"></span></label>
                                                    <input type="text" name="email" className="form-control share_fsize_one share_clr_one" placeholder="Nhập email" value={data.email || ''} readOnly />
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Số điện thoại liên hệ <span className="cr_red"></span></label>
                                                    <input type="text" name="phone" className="form-control share_fsize_one share_clr_one" placeholder="Nhập số điện thoại" defaultValue={data.phone || data.phoneTK}
                                                        {...register("phone", {
                                                            required: 'Số điện thoại không được để trống',
                                                            validate: {
                                                                validatePhone: (value) => validatePhone(value) || "Hãy nhập đúng định dạng số điện thoại"
                                                            }
                                                        })}
                                                    />
                                                    {errors.phone && <label className="error">{errors.phone.message}</label>}
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Địa chỉ <span className="cr_red">*</span></label>
                                                    <input type="text" name="address" className="form-control share_fsize_one share_clr_one" placeholder="Nhập địa chỉ nơi ở" defaultValue={data.address || ''}
                                                        {...register("address", {
                                                            required: 'Vui lòng nhập địa chỉ',

                                                        })}
                                                    />
                                                    {errors.address && <label className="error">{errors.address.message}</label>}

                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Giới tính<span className="cr_red">*</span></label>
                                                    <select
                                                        {...register('gender')}
                                                        defaultValue={data.gender || 1}
                                                        name="gioitinh"
                                                        onChange={(e) => setValue('gender', e.target.value)}
                                                        className="form-control">
                                                        {
                                                            getGender.map((item, index) => (
                                                                <option key={item} value={index} style={{ display: (index != 0) ? 'block' : 'none' }}>{item}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Ngày sinh <span className="cr_red">*</span></label>
                                                    <input
                                                        type="date"
                                                        name="ngaysinh"
                                                        defaultValue={ConvertIntToDate(data.birthday)[1]}
                                                        className="form-control share_fsize_one share_clr_one"
                                                        placeholder="Nhập ngày sinh của bạn"
                                                        {...register("birthday", {
                                                            required: 'Không được để trống',
                                                        })}
                                                    />
                                                    {errors.birthday && <label className="error">{errors.birthday.message}</label>}
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Trình độ học vấn <span className="cr_red">*</span></label>
                                                    <select {...register('education')}
                                                        defaultValue={data.education || 1}
                                                        name="trinhdo"
                                                        className="form-control"
                                                        onChange={(e) => setValue('education', e.target.value)}
                                                    >
                                                        {
                                                            getEducation.map((item, index) => (
                                                                <option key={item} value={index} style={{ display: (index != 0) ? 'block' : 'none' }}>{item}</option>
                                                            ))
                                                        }
                                                    </select >
                                                </div >
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Tình trạng hôn nhân<span className="cr_red">*</span></label>
                                                    <select {...register('married')}
                                                        defaultValue={data.married || 1}
                                                        name="tinhtrang"
                                                        onChange={(e) => setValue('married', e.target.value)}
                                                        className="form-control">
                                                        {
                                                            getMarried.map((item, index) => (
                                                                <option key={item} value={index} style={{ display: (index != 0) ? 'block' : 'none' }}>{item}</option>
                                                            ))
                                                        }
                                                    </select >
                                                </div >
                                            </div >
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Kinh nghiệm làm việc <span className="cr_red">*</span></label>
                                                    <select {...register('experience')}
                                                        defaultValue={data.experience || 1}
                                                        name="kinhnghiem"
                                                        onChange={(e) => setValue('experience', e.target.value)}
                                                        className="form-control">
                                                        {
                                                            getExperience.map((item, index) => (
                                                                <option key={item} value={index} style={{ display: (index != 0) ? 'block' : 'none' }}>{item}</option>
                                                            ))
                                                        }
                                                    </select >
                                                </div >
                                                <div className="form-group share_done">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Ngày bắt đầu làm việc<span className="cr_red">*</span>
                                                    </label>
                                                    <input type="date" name="ngaylamviec" className="form-control share_fsize_one share_clr_one" value="" readOnly />

                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">Phòng ban </label>
                                                    <input type="text" name="phongban" className="form-control share_fsize_one share_clr_one" placeholder="Nhập tên phòng ban" defaultValue='' readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">Chức vụ<span className="cr_red">*</span></label>
                                                    <input type="text" className="form-control" name="chuc_vu" value={data.position_id || ''} readOnly />
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one"> Tổ </label>
                                                    <select readOnly name="to" id="to_id" className="form-control">
                                                        <option value="">Chọn tổ</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one"> Nhóm</label>
                                                    <select readOnly name="nhom" id="nhom_id" className="form-control">
                                                        <option value="">Chọn nhóm</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="d_form_item d_flex content_c">
                                                <a type="button" className="btn_d huy_luu btn_trang btn_168" href="/quan-ly-thong-tin-tai-khoan-nhan-vien.html"> Hủy </a>
                                                <button type="submit" className="btn_d btn_xanh btn_168 edit_inf_nv"> Lưu </button>
                                            </div>
                                        </form >
                                    </div >
                                </div >
                            </div >
                        </div >
                    </div >
                </div >
            </div >

            {/* chỉnh sửa tt thành công */}
            <div className="modal_share modal_share_three edit_tt_success" style={{ display: updateSuccess ? 'block' : 'none' }}>
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
                                            <button type="button"
                                                onClick={closeUpdate}
                                                className="font_s15 share_clr_tow share_bgr_one dong_button close_button_share">Đóng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* chỉnh sửa tt thất bại */}
            <div className="modal_share modal_share_three edit_tt_fall " style={{ display: updateFalse ? 'block' : 'none' }}>
                <div className="modal-content">
                    <div className="info_modal">
                        <div className="modal-body">
                            <div className="ctn_body_modal">
                                <div className="content_notif">
                                    <div className="avt_notif notif_mar">
                                        <img src="../img/notif_thatbai.png" alt="" />
                                    </div>
                                    <p className="titl_notif">Chỉnh sửa thông tin thất bại, vui lòng thử lại sau! </p>
                                    <div className="form_butt_ht">
                                        <div className="tow_butt_flex">
                                            <button type="button"
                                                onClick={closeUpdate}
                                                className="font_s15 share_clr_tow share_bgr_one dong_button close_button_share">Đóng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
        </>
    )
}