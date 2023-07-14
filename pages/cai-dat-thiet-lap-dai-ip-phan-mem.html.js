import { React, useState, useEffect } from 'react'
import Cookies from "js-cookie";
import Seo from "../components/head";
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';
import { getSoftware } from '../utils/function';
import { useForm } from 'react-hook-form';
import { createIp, listIp, delIp } from '../utils/handleApi';

export default function SetupIp() {
    const [data, setData] = useState([])
    let comId = Cookies.get('UID');

    useEffect(() => {
        const getData = async () => {
            let data1 = { com_id: comId }
            let result = await listIp(data1);
            setData(result.data)
        }
        getData()
    }, [])

    let role = Cookies.get('role')
    if (role == 2) {
        window.location.href = '/quan-ly-ung-dung-nhan-vien'
    } else if (role == 0) {
        window.location.href = '/quan-ly-ung-dung-ca-nhan'
    }

    // popup
    const [popupAdd, setPopupAdd] = useState(false)
    const handlePopupAdd = () => {
        if (popupAdd == false) {
            setPopupAdd(true)
        } else {
            setPopupAdd(false)
        }
    }

    const [popupDel, setPopupDel] = useState(false)
    const [nameSoftware, setNameSoftWare] = useState('')
    const [idIp, setIdIp] = useState()
    const handlePopupDel = (name, id) => {
        if (popupDel == false) {
            setNameSoftWare(name)
            setIdIp(id)
            setPopupDel(true)
        } else {
            setPopupDel(false)
        }
    }
    const deleteIp = () => {
        let data = {
            com_id: comId,
            _id: idIp
        }
        delIp(data)
        // window.location.reload()
    }

    // validate and submit
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async data => {
        data.com_id = comId
        createIp(data)
        window.location.reload()
    };

    return (
        <>
            <Seo
                seo=''
                title='Cài đặt thiết lập dải IP cho phần mề'
            />
            <div id="qly_ungdung_nv" className="qly_ungdung">
                <div className="wrapper">
                    <div className="left_ql">
                        <SideBar />
                    </div>
                    <div className="right_ql">
                        <div className="header_rigth_qly">
                            <div className="ctn_header_qly">
                                <HeaderLogin text={<>Cài đặt / <span className="thay_doi">Thiết lập dải IP cho phần mềm</span></>} />
                            </div>
                        </div>
                        <div className="ctn_right_qly">
                            <div className="ctn_res_qly">
                                <div className="left_header_qly">
                                    <p className="share_clr_one">Cài đặt / <span className="thay_doi">Thiết lập dải IP cho phần mềm</span></p>
                                </div>
                                <div className="list_all_qly">
                                    <div className="ctn_nv_one top_share">
                                        <div className="tab_sett_one tab_bor_bottom">
                                            <div className="tab_titl share_dnone">
                                                <label className="tab_label tab_label_one">
                                                    <p className="share_fsize_one share_clr_one">
                                                        <a href="/quan-ly-cai-dat-cong-ty.html" className="share_clr_one font_14">Cài đặt chung</a>
                                                    </p>
                                                </label>
                                            </div>
                                            <div className="tab_titl share_dnone">
                                                <label className="tab_label tab_label_four">
                                                    <p className="share_fsize_one share_clr_one">Bảo mật theo dải IP</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="tab_sett_two tab_bor_bottom">
                                            <div className="tab_titl">
                                                <label className="tab_label tab_label_six active">
                                                    <p className="share_fsize_one share_clr_one">
                                                        <a href="/cai-dat-thiet-lap-dai-ip-phan-mem.html" className="share_clr_one font_14">Thiết lập dải IP cho phần mềm</a>
                                                    </p>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="tab_sett_three tab_bor_bottom">
                                            <div className="tab_titl share_dnone">
                                                <label className="tab_label tab_label_tow">
                                                    <p className="share_fsize_one share_clr_one">Nhật ký hoạt động</p>
                                                </label>
                                            </div>
                                            <div className="tab_titl share_dnone">
                                                <label className="tab_label tab_label_three">
                                                    <p className="share_fsize_one share_clr_one">Quản lý thiết bị</p>
                                                </label>
                                            </div>
                                            <div className="tab_titl share_dnone">
                                                <label className="tab_label tab_label_five">
                                                    <p className="share_fsize_one share_clr_one">Ứng dụng di động</p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ctn_chile_tow">
                                        <div className="setting_delt setting_delt_six">
                                            <div className="search_qly">
                                                <div className="form_timkiem">
                                                    <div className="tim-kiem share_form_select">
                                                        <select name="search" className="form-serach" data="<?= $from_site ?>">
                                                            <option value="">Tìm kiếm phần mềm</option>
                                                        </select>
                                                        <span className="share_search"><img src="../img/tim-kiem.png" alt="" /></span>
                                                    </div>
                                                </div>
                                                <div className="btx_creart_ip_pm btn_dd btn_138 btn_xanh" onClick={handlePopupAdd}>
                                                    <div className="d_flex">
                                                        <img src="../img/cre_nv.png" alt="" className="m_r10" />
                                                        <p>Thêm mới</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="detl_nv_table detl_sett_table">
                                                <div className="ctn_delt_table over_fl_sett">
                                                    <div className="wid_overf_tabl">
                                                        <table className="page_table_one">
                                                            <thead className="share_thead share_bgr_one tabl_thead_four">
                                                                <tr>
                                                                    <th className="share_th share_clr_tow tex_center share_fsize_tow cr_weight">
                                                                        STT</th>
                                                                    <th className="share_th_eleven share_clr_tow tex_center share_fsize_tow cr_weight">
                                                                        Ứng dụng</th>
                                                                    <th className="share_th_nine share_clr_tow tex_center share_fsize_tow cr_weight">
                                                                        Dải IP truy cập</th>
                                                                    <th className="share_th_three share_clr_tow tex_center share_fsize_tow cr_weight">
                                                                        Thời gian tạo</th>
                                                                    <th className="share_th_three share_clr_tow tex_center share_fsize_tow cr_weight">
                                                                        Chức năng</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data?.map((value, index) => (
                                                                    <>
                                                                        <tr>
                                                                            <td className="share_fsize_one share_clr_one tex_center" data="">{index + 1}</td>

                                                                            <td className="share_fsize_one share_clr_one tex_left cr_weight">
                                                                                <div className="cnt_ten_pm d_flex">
                                                                                    <p className="share_fsize_one share_clr_one ten_pm_cd">{getSoftware[value.fromSite]}</p>
                                                                                </div>
                                                                            </td>

                                                                            <td className="share_fsize_one share_clr_one tex_center">{value.accessIP}</td>
                                                                            <td className="share_fsize_one share_clr_one tex_center">{value.createAt.split('T')[0]}</td>
                                                                            <td className="share_clr_one tex_center">
                                                                                <div className="d_flex dflex_jc td_padd">
                                                                                    <p className="js_edit_pb share_cursor edit_pb share_clr_four cr_weight btx_edit_ip_pm" data="<?= $ip[$i]['id_acc'] ?>"> Sửa </p>
                                                                                    <span className="share_clr_four">|</span>
                                                                                    <p className="share_cursor js_delete_phong cr_red cr_weight" data="<?= $ip[$i]['id_acc'] ?>" data1="<?= $array_pm[$ip[$i]['from_site']] ?>" onClick={(e) => handlePopupDel(getSoftware[value.fromSite], value._id)}> Xóa</p>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                ))}
                                                            </tbody>
                                                        </table>
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

            {/* them moi */}
            <div className="modal_share modal_share_tow creart_ip_pm" style={{ display: popupAdd ? 'block' : 'none' }}>
                <div className="modal-content">
                    <div className="info_modal">
                        <div className="modal-header">
                            <div className="header_ctn_share">
                                <h4 className="ctn_share_h share_clr_tow tex_center cr_weight_bold">Thiết lập dải IP cho phần mềm</h4>
                                <span className="close_detl close_dectl" onClick={handlePopupAdd}>&times;</span>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="ctn_body_modal">
                                <div className="madal_form">
                                    <form onSubmit={handleSubmit(onSubmit)} className="edit_share_form share_distance creart_ip_pm_form">
                                        <div className="form-group share_select2">
                                            <label className="form_label share_fsize_three">Phần mềm thiết lập dải IP <span className="cr_red cr_weight">*</span></label>
                                            <select
                                                {...register("fromSite", {
                                                    required: 'Chưa chọn phần mềm',
                                                })}
                                                name="fromSite"
                                                className="form-control"
                                                id="all_name_pm"
                                            >
                                                <option value="">Chọn phần mềm</option>
                                                {
                                                    getSoftware.map((item, index) => (
                                                        <option key={item} value={index}>{item}</option>
                                                    ))
                                                }
                                            </select>
                                            {errors.fromSite && <label className="error">{errors.fromSite.message}</label>}

                                        </div>
                                        <span className="thong_bao_n" style={{ display: 'none' }}>Không được để trống</span>
                                        <div className="form-group address_ip_t">
                                            <label className="form_label share_fsize_three">Địa chỉ IP <span className="cr_red cr_weight">*</span></label>
                                            <input
                                                text="text"
                                                name="accessIP"
                                                className="form-control diachi_ip"
                                                placeholder="Nhập địa chỉ IP "
                                                {...register("accessIP", {
                                                    required: 'Chưa điền địa chỉ IP',
                                                })}
                                            />
                                            {errors.accessIP && <label className="error">{errors.accessIP.message}</label>}
                                        </div>
                                        <div className="bang">
                                            <div className="bang_ct">
                                                <p className="box_share stt">STT</p>
                                                <p className="box_share box_2">Dải IP</p>
                                                <p className="box_share box_3">Tên phần mềm(viết tắt)</p>
                                                <p className="box_share box_4"></p>
                                            </div>
                                        </div>
                                        <div className="form_butt_ht">
                                            <div className="tow_butt_flex">
                                                <button type="button" className="share_fsize_three cr_weight share_cursor share_clr_four share_bgr_tow huy_button" onClick={handlePopupAdd}>Hủy</button>
                                                <button type="submit" className="share_clr_tow cr_weight share_cursor share_fsize_three share_bgr_one hoan-thanh luu_ip">Hoàn thành</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* chinh sua */}
            <div className="modal_share modal_share_tow edit_ip_pm">
                <div className="modal-content">
                    <div className="info_modal">
                        <div className="modal-header">
                            <div className="header_ctn_share">
                                <h4 className="ctn_share_h share_clr_tow tex_center cr_weight_bold">
                                    Chỉnh sửa dải IP cho phần mềm
                                </h4>
                                <span className="close_detl close_dectl">×</span>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="ctn_body_modal">
                                <div className="madal_form">
                                    <form className="edit_share_form share_distance edit_ip_pm_form">
                                        <div className="form-group share_select2">
                                            <label className="form_label share_fsize_three">
                                                Phần mềm thiết lập dải IP*{" "}
                                                <span className="cr_red cr_weight">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                defaultValue=""
                                                readOnly=""
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three">
                                                Địa chỉ IP <span className="cr_red cr_weight">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="diachi_ip"
                                                id="addr_ip"
                                                className="form-control"
                                                defaultValue=""
                                            />
                                        </div>
                                        <div className="form_butt_ht">
                                            <div className="tow_butt_flex">
                                                <button
                                                    type="button"
                                                    className="share_fsize_three cr_weight share_cursor share_clr_four share_bgr_tow huy_button"
                                                >
                                                    Hủy
                                                </button>
                                                <button
                                                    type="button"
                                                    className="share_clr_tow cr_weight share_cursor share_fsize_three share_bgr_one hoan-thanh luu_save_ip_pm"
                                                >
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

            {/* xóa ip phần mềm */}
            <div className="modal_share modal_share_tow delete_ip_pm" style={{ display: popupDel ? 'block' : 'none' }}>
                <div className="modal-content">
                    <div className="info_modal">
                        <div className="modal-header">
                            <div className="header_ctn_share">
                                <h4 className="ctn_share_h share_clr_tow tex_center cr_weight_bold">
                                    Xóa địa chỉ IP phần mềm
                                </h4>
                                <span className="close_detl close_dectl" onClick={handlePopupDel}>
                                    ×
                                </span>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="ctn_body_modal">
                                <div className="madal_form">
                                    <div className="edit_share_form share_distance remove_nhom_form">
                                        <p className="share_remove share_clr_one tex_center">
                                            Bạn có muốn xóa thiết lập dải IP truy cập cho phần mềm
                                            <span className="cr_weight name_pm">
                                                {" "}
                                                {"{"}nameSoftware{"}"}
                                            </span>{" "}
                                            ?
                                        </p>
                                        <div className="form_butt_ht">
                                            <div className="tow_butt_flex">
                                                <button
                                                    type="button"
                                                    className="share_fsize_three cr_weight share_cursor share_clr_four share_bgr_tow huy_button"
                                                    onClick={handlePopupDel}
                                                >
                                                    Hủy
                                                </button>
                                                <button
                                                    type="button"
                                                    className="share_clr_tow cr_weight share_cursor share_fsize_three share_bgr_one dongy_button remove_ip_pm"
                                                    data=""
                                                    onClick={deleteIp}
                                                >
                                                    Đồng ý
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}