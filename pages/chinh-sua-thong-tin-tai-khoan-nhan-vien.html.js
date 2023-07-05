import React, { useState, useEffect } from "react";
import Seo from "../components/head";
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';
import CallApi from '../pages/api/call_api';
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form';
import { infoEp, infoPersonal, updateEp, updatePersonal } from '../utils/handleApi';
import { getEducation, formatDate, validatePhone } from "../utils/function";

export default function EditEmployee() {
    // fix first render 
    const [hydrated, setHydrated] = useState(false);

    // gọi api lấy thông tin nhân viên
    const [data, setData] = useState([]);
    let role = Cookies.get('role');

    // set values in form
    const [selectedDate, setSelectedDate] = useState('');
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    useEffect(() => {
        const getData = async () => {
            if (role == 2) {
                let response = await infoEp();
                setData(response.data)
                // setSelectedDate(formatDate(response.data.birthday))
            } else {
                let response = await infoPersonal();
                setData(response.data)
                // setSelectedDate(formatDate(response.data.birthday))
            }
        }
        getData()
        setHydrated(true)
    }, [])
    console.log(data)

    if (data.gender == 1) {
        var gender = 'Nam'
    } else if (data.gender  == 2) {
        var gender = 'Nữ'
    } else if (data.gender == 3) {
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

    // handle validate form update
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async data => {
        console.log(data)
        if (role == 2) {
            let response = await updateEp(data);
            if (response.result == true) {
                alert('Chỉnh sửa thành công')
            } else {
                alert(response.data.error.message)
            }
        } else {
            let response = await updatePersonal(data);
            if (response.result && response.result == true) {
                alert('Chỉnh sửa thành công')
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
                                <div className="left_header_qly">
                                    <p className="share_fsize_one ">Ứng dụng / <span className="thay_doi">Tất cả</span></p>
                                </div>
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
                                                        Số điện thoại <span className="cr_red"></span></label>
                                                    <input type="text" name="phone" className="form-control share_fsize_one share_clr_one" placeholder="Nhập số điện thoại" defaultValue={data.phone}
                                                        {...register("phone", {
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
                                                    <select {...register('gender')} defaultValue={data.gender} name="gioitinh" className="form-control">
                                                        <option value="2" >Nữ</option>
                                                        <option value="1" >Nam</option>
                                                        <option value="3" >Khác</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Ngày sinh <span className="cr_red">*</span></label>
                                                    <input
                                                        type="date"
                                                        name="ngaysinh"
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        className="form-control share_fsize_one share_clr_one"
                                                        placeholder="Nhập ngày sinh của bạn"
                                                        {...register("birthday", {
                                                            // required: 'Không được để trống',
                                                        })}
                                                    />
                                                    {errors.birthday && <label className="error">{errors.birthday.message}</label>}
                                                </div>
                                            </div>
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Trình độ học vấn <span className="cr_red">*</span></label>
                                                    <select {...register('education')} value={data.education} name="trinhdo" className="form-control"

                                                    >
                                                        <option value="1" >Trên đại học</option>
                                                        <option value="2" >Đại học</option>
                                                        <option value="3" >Cao đẳng</option>
                                                        <option value="4" >Trung cấp</option>
                                                        <option value="5" >Đào tạo nghề</option>
                                                        <option value="6" >Trung học phổ thông</option>
                                                        <option value="7" >Trung học cơ sở</option>
                                                        <option value="8" >Tiểu học</option>
                                                    </select >
                                                </div >
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Tình trạng hôn nhân<span className="cr_red">*</span></label>
                                                    <select {...register('married')} value={data.married || 1} name="tinhtrang" className="form-control">
                                                        <option value="1" >Độc thân</option>
                                                        <option value="2" >Đã có gia đình</option>
                                                    </select >
                                                </div >
                                            </div >
                                            <div className="d_form_item form_container d_flex">
                                                <div className="form-group">
                                                    <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                        Kinh nghiệm làm việc <span className="cr_red">*</span></label>
                                                    <select {...register('experience')} value={data.experience || 1} name="kinhnghiem" className="form-control">
                                                        <option value="1">Chưa có kinh nghiệm</option>
                                                        <option value="2">Dưới 1 năm kinh nghiệm</option>
                                                        <option value="3">1 năm</option>
                                                        <option value="4"> 2 năm</option >
                                                        <option value="5"> 3 năm</option >
                                                        <option value="6"> 4 năm</option >
                                                        <option value="7"> 5 năm</option >
                                                        <option value="8"> Trên 5 năm</option >
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
            <>
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
        </>
    )
}