import React from "react"
import Head from "next/head";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";

export default function info_register_emp() {
    // xử lý validate
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const validatePhone = (value) => {
        if(value) {
            return /^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/i.test(value);
        }
        return true;
    };

    // lấy cookie idCom
    let idCom = Cookies.get('idCom');

    const onSubmit = data => {
        console.log(data)
    };

    return (
        <>
            <Head>
                <>
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
                    <link rel="stylesheet" href="../css/select2.min.css" />
                    <link rel="preload" as="style" href="../css/style.css?5" />
                    <link
                        rel="stylesheet"
                        media="all"
                        href="../css/style.css"
                        onload="if (media != 'all')media='all'"
                    />
                    <title>Trang đăng ký nhân viên</title>
                </>

            </Head>
            <>
                <div className="content_ql ctn_bgr_body">
                    <div className="content_nv">
                        <div className="ctn_register_nv">
                            <form onSubmit={handleSubmit(onSubmit)} className="regnv_form regnv_form_dk">
                                <div className="three_page_qmk">
                                    <div className="container">
                                        <div className="cnt_page_one">
                                            <div className="one_reg_ql share_reg_log share_brd_radius share_bgr_tow ctn_register_nv">
                                                <div className="header_qmk">
                                                    <h3 className="share_clr_four cr_weight_bold tex_center">
                                                        Đăng ký tài khoản nhân viên
                                                    </h3>
                                                    {/* <div class="qmk_avt_ic tex_center">
                                              <img src="../img/tow_ic_reg_nv.png" alt="">
                                          </div> */}
                                                </div>
                                                <div className="ctn_form edit_tt_form share_distance">
                                                    <p className="com_id hidden" data={3321} />
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Tài khoản đăng nhập <span className="cr_red">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="phone_tk"
                                                                className="form-control"
                                                                id="phone_tk"
                                                                placeholder="Nhập số điện thoại"
                                                                {...register("phone_tk", {
                                                                    required: 'Vui lòng nhập số điện thoại',
                                                                    validate: {
                                                                        validatePhone: (value) => validatePhone(value) || "Hãy nhập đúng định dạng số điện thoại"
                                                                    }
                                                                })}
                                                            />
                                                            {errors && errors.phone_tk && <label className="error">{errors.phone_tk.message}</label>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Họ tên <span className="cr_red">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="userName"
                                                                className="form-control"
                                                                placeholder="Nhập họ và tên"
                                                                {...register("userName", {
                                                                    required: 'Họ và tên không được để trống',
                                                                })}
                                                            />
                                                            {errors && errors.userName && <label className="error">{errors.userName.message}</label>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Nhập mật khẩu <span className="cr_red">*</span>
                                                            </label>
                                                            <span className="see_log" toggle="#password_nv" />
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                className="form-control"
                                                                id="password_nv"
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
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Nhập lại mật khẩu <span className="cr_red">*</span>
                                                            </label>
                                                            <span
                                                                className="see_log"
                                                                toggle="#password-field-six"
                                                            />
                                                            <input
                                                                type="password"
                                                                name="res_password"
                                                                className="form-control"
                                                                id="password-field-six"
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
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Số điện thoại
                                                                <input
                                                                    type="text"
                                                                    name="phone"
                                                                    className="form-control"
                                                                    placeholder="Nhập số điện thoại liên hệ"
                                                                    {...register('phone', {
                                                                        validate: {
                                                                            validatePhone: (value) => validatePhone(value) || "Hãy nhập đúng định dạng số điện thoại"
                                                                        }
                                                                    })}
                                                                />
                                                                {errors && errors.phone && <label className="error">{errors.phone.message}</label>}
                                                            </label>
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
                                                                {...register('address', {
                                                                    required: 'Địa chỉ không được để trống'
                                                                })}
                                                            />
                                                            {errors && errors.address && <label className="error">{errors.address.message}</label>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Giới tính <span className="cr_red">*</span>
                                                            </label>
                                                            <select name="gender" className="form-control">
                                                                <option value={1}>
                                                                    Nam
                                                                </option>
                                                                <option value={2}>Nữ</option>
                                                                <option value={3}>Khác</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Ngày sinh <span className="cr_red">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                name="birthday"
                                                                id="birthday"
                                                                className="form-control"
                                                                {...register('birthday', {
                                                                    required: 'Ngày sinh không được để trống'
                                                                })}
                                                            />
                                                            {errors && errors.birthday && <label className="error">{errors.birthday.message}</label>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Trình độ học vấn <span className="cr_red"></span>
                                                            </label>
                                                            <select {...register('academicLevel')} defaultValue={0} name="academic_level" className="form-control">
                                                                <option value={0}>Chọn trình độ học vấn</option>
                                                                <option value={1}>Trên Đại học</option>
                                                                <option value={2}>Đại học</option>
                                                                <option value={3}>Cao đẳng</option>
                                                                <option value={4}>Trung cấp</option>
                                                                <option value={5}>Đào tạo nghề</option>
                                                                <option value={6}>Trung học phổ thông</option>
                                                                <option value={7}>Trung học cơ sở</option>
                                                                <option value={8}>Tiểu học</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Tình trạng hôn nhân{" "}
                                                            </label>
                                                            <select {...register('marriage')} name="marriage" className="form-control">
                                                                <option value={1}>
                                                                    Độc thân
                                                                </option>
                                                                <option value={2}>Đã lập gia đình</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Kinh nghiệm làm việc <span className="cr_red"></span>
                                                            </label>
                                                            <select {...register('experJob')} defaultValue={2} name="exper_job" className="form-control">
                                                                <option value={1}>Chưa có kinh nghiệm</option>
                                                                <option value={2}>Dưới 1 năm kinh nghiệm</option>
                                                                <option value={3}>1 năm</option>
                                                                <option value={4}>2 năm</option>
                                                                <option value={5}>3 năm</option>
                                                                <option value={6}>4 năm</option>
                                                                <option value={7}>5 năm</option>
                                                                <option value={8}>Trên 5 năm</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group share_dnone">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Ngày bắt đầu làm việc
                                                            </label>
                                                            <input
                                                                type="date"
                                                                name="start_day"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Chức vụ
                                                            </label>
                                                            <select
                                                                id="chuc_vu"
                                                                name="chuc_vu"
                                                                className="form-control"
                                                                defaultValue={3}
                                                                {...register('position')}
                                                            >
                                                                <option value={1}>SINH VIÊN THỰC TẬP</option>
                                                                <option value={2}>NHÂN VIÊN THỬ VIỆC</option>
                                                                <option value={9}>NHÂN VIÊN PART TIME</option>
                                                                <option value={3}>NHÂN VIÊN CHÍNH THỨC</option>
                                                                <option value={20}>NHÓM PHÓ</option>
                                                                <option value={4}>TRƯỞNG NHÓM</option>
                                                                <option value={12}>PHÓ TỔ TRƯỞNG</option>
                                                                <option value={13}>TỔ TRƯỞNG</option>
                                                                <option value={10}>PHÓ BAN DỰ ÁN</option>
                                                                <option value={11}>TRƯỞNG BAN DỰ ÁN</option>
                                                                <option value={5}>PHÓ TRƯỞNG PHÒNG</option>
                                                                <option value={6}>TRƯỞNG PHÒNG</option>
                                                                <option value={7}>PHÓ GIÁM ĐỐC</option>
                                                                <option value={8}>GIÁM ĐỐC</option>
                                                                <option value={14}>PHÓ TỔNG GIÁM ĐỐC</option>
                                                                <option value={16}>TỔNG GIÁM ĐỐC</option>
                                                                <option value={22}>PHÓ TỔNG GIÁM ĐỐC TẬP ĐOÀN</option>
                                                                <option value={21}>TỔNG GIÁM ĐỐC TẬP ĐOÀN</option>
                                                                <option value={18}>
                                                                    PHÓ CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ
                                                                </option>
                                                                <option value={19}>CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ</option>
                                                                <option value={17}>
                                                                    THÀNH VIÊN HỘI ĐỒNG QUẢN TRỊ
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group share_select_dep">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Phòng ban
                                                            </label>
                                                            <select
                                                                name="phong_ban"
                                                                className="form-control n_phong_ban"
                                                            >
                                                                <option value="">Chọn phòng ban</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Tổ
                                                            </label>
                                                            <select name="name_to" className="form-control">
                                                                <option value="">Chọn tổ</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Nhóm
                                                            </label>
                                                            <select name="name_nhom" className="form-control">
                                                                <option value="">Chọn nhóm</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-butt-one">
                                                    <div className="form_butt_mar">
                                                        <div className="ctn_register_nv">
                                                            <input
                                                                type="submit"
                                                                className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_tow save_register_nv"
                                                                defaultValue="Tiếp tục"
                                                            />
                                                            <p className="quay_lai share_clr_one tex_center share_fsize_three share_cursor">
                                                                Quay lại
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
        </>
    )
};
