import { React, useState, useEffect } from 'react'
import Cookies from "js-cookie";
import Seo from "../components/head";
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';
import { getSoftware, renderNamePM, validateIP } from '../utils/function';
import { useForm } from 'react-hook-form';
import { createIp, listIp, delIp } from '../utils/handleApi';
import FormData from 'form-data';
import { async } from '@firebase/util';
import EditIP from '../components/EditIP/editIP';
import { useRouter } from 'next/router';
import { getServerSideProps } from '../utils/function'

const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2,0);
    const month = (date.getMonth() +1).toString().padStart(2,0);
    const year = date.getFullYear();
    const time = 
    date.getHours().toString().padStart(2,0) + 
    ':' + date.getMinutes().toString().padStart(2,0) + 
    ':' + date.getSeconds().toString().padStart(2,0);
    return `${day}/${month}/${year} - ${time}`
}

export { getServerSideProps }
export default function SetupIp() {
    const [data, setData] = useState([])
    let comId = Cookies.get('UID');
    const router = new useRouter();

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
            id_acc: idIp
        }
        delIp(data)
        window.location.reload()
    }

    // validate and submit
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [getDataIP, setDataIP] = useState([]);
    const [showBtn, setShowPopup] = useState(false);

    const onSubmit = async data => {
        setDataIP([data, ...getDataIP])
        setValue('ip_access', '')
        setShowPopup(true);
    };

    const deleteIPAdd = (index) => {
        console.log("getDataIP.length:", getDataIP.length)
        if (getDataIP.length === 1) {
            setShowPopup(false);
        }
        const updatedAddresses = [...getDataIP];
        updatedAddresses.splice(index, 1);
        setDataIP(updatedAddresses);
    };

    const addIP = () => {
        const reorderedData = getDataIP.map(({ ip_access, from_site }) => ({ ip_access, from_site }));
        createIp(JSON.stringify(reorderedData))
        router.reload();
    }

    const [getEditID, setEditID] = useState([]);
    const [showEdit, setShowEdit] = useState(false)
    const editIP = (e, value) => {
        const getData = async () => {
            const form = new FormData();
            form.append('id_acc', parseInt(value));
            let result = await listIp(form);
            setEditID(result.data)
        }
        getData()
        setShowEdit(true);
    }

    const closePopEdit = () => {
        setShowEdit(false);
    }

    const searchPM = (e) => {
        const getData = async () => {
            let data1 = { com_id: comId }
            let result = await listIp(data1);
            const filteredItems = result.data.filter(item => item.from_site == e.target.value);
            setData(filteredItems)
        }
        getData();
    }
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
                                                        <select name="search" className="form-serach" onChange={(e) => searchPM(e)}>
                                                            <option value="">Tìm kiếm phần mềm</option>
                                                            {getSoftware.map((item) => (
                                                                <option value={item.id}>{item.value}</option>
                                                            ))
                                                            }
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
                                                                                    <p className="share_fsize_one share_clr_one ten_pm_cd">{renderNamePM(value.from_site)}</p>
                                                                                </div>
                                                                            </td>

                                                                            <td className="share_fsize_one share_clr_one tex_center">{value.ip_access}</td>
                                                                            <td className="share_fsize_one share_clr_one tex_center">{formatDate(new Date(value.created_time*1000))}</td>
                                                                            <td className="share_clr_one tex_center">
                                                                                <div className="d_flex dflex_jc td_padd">
                                                                                    <p className="js_edit_pb share_cursor edit_pb share_clr_four cr_weight btx_edit_ip_pm" onClick={(e) => editIP(e, value.id_acc)} > Sửa </p>
                                                                                    <span className="share_clr_four">|</span>
                                                                                    <p className="share_cursor js_delete_phong cr_red cr_weight" onClick={(e) => handlePopupDel(renderNamePM(value.from_site), value.id_acc)}> Xóa</p>
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
                                                {...register("from_site", {
                                                    required: 'Chưa chọn phần mềm',
                                                })}
                                                name="from_site"
                                                className="form-control"
                                                id="all_name_pm"
                                            >
                                                <option value="">Chọn phần mềm</option>
                                                {getSoftware.map((item) => (
                                                    <option value={item.id}>{item.value}</option>
                                                ))
                                                }

                                            </select>
                                            {errors.from_site && <label className="error">{errors.from_site.message}</label>}

                                        </div>
                                        <span className="thong_bao_n" style={{ display: 'none' }}>Không được để trống</span>
                                        <div className="form-group address_ip_t">
                                            <label className="form_label share_fsize_three">Địa chỉ IP <span className="cr_red cr_weight">*</span></label>
                                            <input
                                                text="text"
                                                name="ip_access"
                                                className="form-control diachi_ip"
                                                placeholder="Nhập địa chỉ IP "
                                                {...register("ip_access", {
                                                    required: 'Chưa điền địa chỉ IP',
                                                    validate: {
                                                        validateIP: (value) => validateIP(value) || 'Hãy nhập đúng định dạng IP'
                                                    }
                                                })}
                                            />
                                            {errors.ip_access && <label className="error">{errors.ip_access.message}</label>}
                                        </div>
                                        <div className="bang">
                                            {
                                                showBtn ?
                                                    <>
                                                        <div className="bang_ct">
                                                            <p className="box_share stt">STT</p>
                                                            <p className="box_share box_2">Dải IP</p>
                                                            <p className="box_share box_3">Tên phần mềm(viết tắt)</p>
                                                            <p className="box_share box_4"></p>
                                                        </div>
                                                    </> : ''
                                            }

                                            {
                                                getDataIP.map((item, index) => {
                                                    return (<>
                                                        <div className="body_bang_ct">
                                                            <p className="box_share stt one_stt">{index + 1}</p>
                                                            <input
                                                                type="hidden"
                                                                name="diachi_ips"
                                                                className="aa"
                                                                defaultValue={item.ip_access}
                                                            />
                                                            <p className="box_share box_2">{item.ip_access}</p>
                                                            <input type="hidden" name="ten_viet_t" defaultValue={item.from_site} />
                                                            <p className="box_share box_3">{item.from_site}</p>
                                                            <p className="box_share box_4" onClick={() => deleteIPAdd(index)}>
                                                                <img className="remove_tb" src="../img/xoa-tv.png" />
                                                            </p>
                                                        </div>

                                                    </>)
                                                })
                                            }
                                        </div>

                                        <div className="v_form_butt_ht">
                                            <button className='cl_btn_add' type='submit'>Thêm</button>
                                        </div>
                                    </form>
                                    {showBtn ? (<><div className="v_tow_butt_flex">
                                        <button type="button" className="share_fsize_three cr_weight share_cursor share_clr_four share_bgr_tow huy_button" onClick={handlePopupAdd}>Hủy</button>
                                        <button type="submit" className="share_clr_tow cr_weight share_cursor share_fsize_three share_bgr_one hoan-thanh luu_ip" onClick={addIP}>Hoàn thành</button>
                                    </div></>) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EditIP showEdit={showEdit} getEditID={getEditID} closePopEdit={closePopEdit} />

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
                                                {nameSoftware}
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