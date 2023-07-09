import { React, useState, useEffect } from 'react'
import Cookies from "js-cookie";
import Seo from "../components/head";
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';
import { vote } from "../utils/handleApi";

export default function SetupIp() {

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    let role = Cookies.get('role')
    if (role == 2) {
        window.location.href = '/quan-ly-ung-dung-nhan-vien'
    } else if (role == 0) {
        window.location.href = '/quan-ly-ung-dung-ca-nhan'
    }

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
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
                                <HeaderLogin />
                            </div>
                        </div>
                        <div class="ctn_right_qly">
                            <div class="ctn_res_qly">
                                <div class="left_header_qly">
                                    <p class="share_clr_one">Cài đặt / <span class="thay_doi">Thiết lập dải IP cho phần mềm</span></p>
                                </div>
                                <div class="list_all_qly">
                                    <div class="ctn_nv_one top_share">
                                        <div class="tab_sett_one tab_bor_bottom">
                                            <div class="tab_titl share_dnone">
                                                <label class="tab_label tab_label_one">
                                                    <p class="share_fsize_one share_clr_one">
                                                        <a href="/quan-ly-cai-dat-cong-ty.html" class="share_clr_one font_14">Cài đặt chung</a>
                                                    </p>
                                                </label>
                                            </div>
                                            <div class="tab_titl share_dnone">
                                                <label class="tab_label tab_label_four">
                                                    <p class="share_fsize_one share_clr_one">Bảo mật theo dải IP</p>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="tab_sett_two tab_bor_bottom">
                                            <div class="tab_titl">
                                                <label class="tab_label tab_label_six active">
                                                    <p class="share_fsize_one share_clr_one">
                                                        <a href="/cai-dat-thiet-lap-dai-ip-phan-mem.html" class="share_clr_one font_14">Thiết lập dải IP cho phần mềm</a>
                                                    </p>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="tab_sett_three tab_bor_bottom">
                                            <div class="tab_titl share_dnone">
                                                <label class="tab_label tab_label_tow">
                                                    <p class="share_fsize_one share_clr_one">Nhật ký hoạt động</p>
                                                </label>
                                            </div>
                                            <div class="tab_titl share_dnone">
                                                <label class="tab_label tab_label_three">
                                                    <p class="share_fsize_one share_clr_one">Quản lý thiết bị</p>
                                                </label>
                                            </div>
                                            <div class="tab_titl share_dnone">
                                                <label class="tab_label tab_label_five">
                                                    <p class="share_fsize_one share_clr_one">Ứng dụng di động</p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ctn_chile_tow">
                                        <div class="setting_delt setting_delt_six">
                                            <div class="search_qly">
                                                <div class="form_timkiem">
                                                    <div class="tim-kiem share_form_select">
                                                        <select name="search" class="form-serach" data="<?= $from_site ?>">
                                                            <option value="">Tìm kiếm phần mềm</option>
                                                        </select>
                                                        <span class="share_search"><img src="../img/tim-kiem.png" alt="" /></span>
                                                    </div>
                                                </div>
                                                <div class="btx_creart_ip_pm btn_dd btn_138 btn_xanh" data="<?= $id_com ?>">
                                                    <div class="d_flex">
                                                        <img src="../img/cre_nv.png" alt="" class="m_r10" />
                                                        <p>Thêm mới</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="detl_nv_table detl_sett_table">
                                                <div class="ctn_delt_table over_fl_sett">
                                                    <div class="wid_overf_tabl">
                                                        <table class="page_table_one">
                                                            <thead class="share_thead share_bgr_one tabl_thead_four">
                                                                <tr>
                                                                    <th class="share_th share_clr_tow tex_center share_fsize_tow cr_weight">
                                                                        STT</th>
                                                                    <th class="share_th_eleven share_clr_tow tex_center share_fsize_tow cr_weight">
                                                                        Ứng dụng</th>
                                                                    <th class="share_th_nine share_clr_tow tex_center share_fsize_tow cr_weight">
                                                                        Dải IP truy cập</th>
                                                                    <th class="share_th_three share_clr_tow tex_center share_fsize_tow cr_weight">
                                                                        Thời gian tạo</th>
                                                                    <th class="share_th_three share_clr_tow tex_center share_fsize_tow cr_weight">
                                                                        Chức năng</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                <tr>
                                                                    <td class="share_fsize_one share_clr_one tex_center" data=""></td>

                                                                    <td class="share_fsize_one share_clr_one tex_left cr_weight">
                                                                        <div class="cnt_ten_pm d_flex">

                                                                            <p class="share_fsize_one share_clr_one ten_pm_cd"></p>
                                                                        </div>
                                                                    </td>

                                                                    <td class="share_fsize_one share_clr_one tex_center"></td>
                                                                    <td class="share_fsize_one share_clr_one tex_center"></td>
                                                                    <td class="share_clr_one tex_center">
                                                                        <div class="d_flex dflex_jc td_padd">
                                                                            <p class="js_edit_pb share_cursor edit_pb share_clr_four cr_weight btx_edit_ip_pm" data="<?= $ip[$i]['id_acc'] ?>" onclick="id_sua(this)"> Sửa </p>
                                                                            <span class="share_clr_four">|</span>
                                                                            <p class="share_cursor js_delete_phong cr_red cr_weight" data="<?= $ip[$i]['id_acc'] ?>" data1="<?= $array_pm[$ip[$i]['from_site']] ?>" onclick="id_pm(this)"> Xóa</p>
                                                                        </div>
                                                                    </td>
                                                                </tr>
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
        </>
    )
}