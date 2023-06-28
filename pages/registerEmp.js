import React from "react"

import Head from "next/head";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

// const router = useRouter();
// const comId = router.query.com_id;
// console.log(comId);

//const inter = Inter({ subsets: [latin] })
export default function info_register_emp() {
    const { register, handleSubmit,watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    };
    console.log(watch())
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
                                                                name="email"
                                                                className="form-control"
                                                                id="email_nv"
                                                                placeholder="Nhập số điện thoại"
                                                                {...register("name", {
                                                                    required: true,
                                                                    pattern: {
                                                                        value: /^\d+$/,
                                                                        message: "This input is number only."
                                                                    },
                                                                })}
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Họ tên <span className="cr_red">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="name_nv"
                                                                className="form-control"
                                                                placeholder="Nhập họ và tên"
                                                            />
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
                                                            />
                                                            {/* <span class="loi_error share_dnone">Hãy nhập mật khẩu từ 8 đến
                                                      16 ký tự bao gồm chữ hoa, chữ thường và ít nhất một chữ số
                                                      và không chứa khoảng trắng</span> */}
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
                                                            />
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
                                                                />
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
                                                            />
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
                                                                name="brithday"
                                                                id="brithday"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Trình độ học vấn <span className="cr_red">*</span>
                                                            </label>
                                                            <select defaultValue={0} name="academic_level" className="form-control">
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
                                                            <select name="marriage" className="form-control">
                                                                <option value={2}>Đã lập gia đình</option>
                                                                <option value={1}>
                                                                    Độc thân
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Kinh nghiệm làm việc <span className="cr_red">*</span>
                                                            </label>
                                                            <select defaultValue={1} name="exper_job" className="form-control">
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
                                                                defaultValue={1}
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
                                                                data={3321}
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
                                                                type="button"
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
