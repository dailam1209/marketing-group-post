import { React, useState, useEffect } from "react"
import { useForm } from 'react-hook-form';
import Cookies from "js-cookie";
import Seo from '../components/head'
import { validatePhone } from "../utils/function";
import { registerEp, listDepartments, listTeams, listGroups } from "../utils/handleApi";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import requestIp from 'request-ip';
import { useRouter } from "next/router";
import { checkIP } from "../utils/function";
export async function getServerSideProps({ req }) {

    const clientIp = requestIp.getClientIp(req);

    return {
        props: {
            clientIp,
        },
    };
}
export default function RegisterEp({ clientIp }) {
    const router = new useRouter();
    useEffect(() => {
        checkIP(clientIp, router)
    }, [])
    // get cookie idCom
    let idCom = Cookies.get('idCom');

    // validate and submit
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        let form = new FormData();
        console.log(data)
        form.append('phoneTK', data.phoneTK);
        form.append('userName', data.userName);
        form.append('password', data.password);
        form.append('address', data.address);
        form.append('dep_id', data.dep_id);
        form.append('com_id', idCom);
        form.append('position_id', data.position);
        form.append('birthday', data.birthday);
        form.append('gender', data.gender);
        form.append('married', data.married);
        form.append('experience', data.experience);
        form.append('education', data.education);
        form.append('group_id', data.group_id);
        form.append('team_id', data.team_id);
        form.append('phone', data.phone);
        delete data.res_password;
        registerEp(form, data);
    };

    // get list department, group, team
    const [deps, setDep] = useState([]);
    const [groups, setGroup] = useState([]);
    const [teams, setTeam] = useState([]);
    const [selectedDep, setSelectedDep] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    // chose department
    useEffect(() => {
        apiDeps();
    }, []);

    const apiDeps = async () => {
        let data = {
            com_id: idCom
        }
        let response = await listDepartments(data)

        setDep(response.data);
    };

    // chose group
    useEffect(() => {
        if (selectedDep) {
            apiGroups(selectedDep, idCom);
        }
        setTeam([]);
    }, [selectedDep]);

    const apiGroups = async (selectedDep, idCom) => {
        let data = {
            com_id: idCom,
            dep_id: selectedDep
        }
        let response = await listGroups(data);
        setGroup(response.data.data);
    };

    // chose team
    useEffect(() => {
        if (selectedGroup) {
            apiTeams(selectedDep, selectedGroup, idCom);
        }
    }, [selectedGroup]);

    const apiTeams = async (selectedDep, selectedGroup, idCom) => {
        let data = {
            com_id: idCom,
            dep_id: selectedDep,
            team_id: selectedGroup
        }
        let response = await listTeams(data);
        setTeam(response);
    };

    // hide pass
    const [hidePass, setHidePass] = useState(true)
    const [hidePass2, setHidePass2] = useState(true)

    const showPass = () => {
        if (hidePass == true) {
            setHidePass(false)
        } else {
            setHidePass(true)
        }
    }

    const showPass2 = () => {
        if (hidePass2 == true) {
            setHidePass2(false)
        } else {
            setHidePass2(true)
        }
    }

    return (
        <>
            <Seo
                seo=''
                title='Trang đăng ký nhân viên'
            />
            <Header />
            <div class="register_ctnv" id="register_nv">
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
                                                    <p className="com_id hidden" />
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Tài khoản đăng nhập <span className="cr_red">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="phoneTK"
                                                                className="form-control"
                                                                id="phoneTK"
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
                                                            <span
                                                                className={`see_log ${hidePass ? '' : 'no_see_log'}`}
                                                                toggle="#password_nv"
                                                                onClick={showPass} />
                                                            <input
                                                                type={hidePass ? 'password' : 'text'}
                                                                name="password"
                                                                className="form-control"
                                                                placeholder="Nhập mật khẩu"
                                                                {...register('password', {
                                                                    required: 'Vui lòng nhập mật khẩu',
                                                                    pattern: {
                                                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
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
                                                                className={`see_log ${hidePass2 ? '' : 'no_see_log'}`}
                                                                toggle="#password-field-six"
                                                                onClick={showPass2}
                                                            />
                                                            <input
                                                                type={hidePass2 ? 'password' : 'text'}
                                                                name="res_password"
                                                                className="form-control"
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
                                                                {errors && errors.phoneContact && <label className="error">{errors.phoneContact.message}</label>}
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
                                                            <select {...register('gender')} name="gender" className="form-control">
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
                                                            <select {...register('education')} defaultValue={0} name="education" className="form-control">
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
                                                            <select {...register('married')} name="married" className="form-control">
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
                                                            <select {...register('experience')} defaultValue={2} name="exper_job" className="form-control">
                                                                <option value={0}>Chưa có kinh nghiệm</option>
                                                                <option value={1}>Dưới 1 năm kinh nghiệm</option>
                                                                <option value={2}>1 năm</option>
                                                                <option value={3}>2 năm</option>
                                                                <option value={4}>3 năm</option>
                                                                <option value={5}>4 năm</option>
                                                                <option value={6}>5 năm</option>
                                                                <option value={7}>Trên 5 năm</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Chức vụ
                                                            </label>
                                                            <select
                                                                id="chuc_vu"
                                                                name="position_id"
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
                                                                {...register('dep_id')}
                                                                name="dep_id"
                                                                className="form-control n_phong_ban"
                                                                value={selectedDep}
                                                                onChange={(e) => setSelectedDep(e.target.value)}
                                                            >
                                                                <option value="">Chọn phòng ban</option>
                                                                {
                                                                    deps && deps != '' && deps.map((dep) => (
                                                                        <option key={dep.dep_id} value={dep.dep_id}>
                                                                            {dep.dep_name}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Tổ
                                                            </label>
                                                            <select
                                                                {...register('team_id')}
                                                                name="team_id"
                                                                className="form-control"
                                                                value={selectedGroup}
                                                                onChange={(e) => setSelectedGroup(e.target.value)}
                                                            >
                                                                <option value="">Chọn tổ</option>
                                                                {
                                                                    groups && groups != '' && groups.map((group) => (
                                                                        <option key={group._id} value={group._id}>
                                                                            {group.teamName}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                                Nhóm
                                                            </label>
                                                            <select
                                                                {...register('group_id')}
                                                                name="group_id"
                                                                className="form-control"
                                                                value={selectedTeam}
                                                                onChange={(e) => setSelectedTeam(e.target.value)}
                                                            >
                                                                <option value="">Chọn nhóm</option>
                                                                {
                                                                    teams && teams != '' && teams.map((team) => (
                                                                        <option key={team._id} value={team._id}>
                                                                            {team.groupName}
                                                                        </option>
                                                                    ))
                                                                }
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
                                                                <a href="/dang-ky-nhan-vien.html">Quay lại</a>
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
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            <Footer />
        </>
    )
};
