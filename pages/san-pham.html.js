import { React, useEffect, useState } from "react"
import Seo from '../components/head'
import { CheckLogin2 } from "../utils/function"
import QlNhanluc from "../components/ql_nhanluc"
import QlCongviec from "../components/ql_congviec"
import QlNoibo from "../components/ql_noibo"
import QlBanhang from "../components/ql_banhang"
import QlConlai from "../components/ql_conlai"
import Cookies from 'js-cookie';
import Header from '../components/header/Header'
import Footer from "../components/footer/Footer"

export default function Product() {

    const [show, setShow] = useState('all')
    const [active, setActive] = useState('all')

    const showAll = () => {
        setShow('all')
        setActive('all')
    }
    const showNhanluc = () => {
        setShow('nhan_luc')
        setActive('nhan_luc')
    }
    const showCongviec = () => {
        setShow('cong_viec')
        setActive('cong_viec')
    }
    const showNoibo = () => {
        setShow('noi_bo')
        setActive('noi_bo')
    }
    const showBanhang = () => {
        setShow('ban_hang')
        setActive('ban_hang')
    }
    const [hasTokens, setHasTokens] = useState(false);

    useEffect(() => {
        const accToken = Cookies.get('token_base365');
        const rfToken = Cookies.get('rf_token');
        const userRole = Cookies.get('role');

        if (accToken && rfToken && userRole) {
            setHasTokens(true);
        }
    }, []);

    return (
        <>
            <Seo
                seo=''
                title='Trang sản phẩm'
            />
            {hasTokens ? (
                <Header acc_token={Cookies.get('token_base365')} rf_token={Cookies.get('rf_token')} />
            ) : null}
            <div className="content_ql share_sp">
                <div className="cnt_ttone">
                    <div className="one_bod_td">
                        <div className="container">
                            <h2 className="share_clr_one cr_weight_bold tex_center h_share">
                                Hệ thống phần mềm chuyển đổi số 365
                            </h2>
                            <p className="tieu_de share_clr_one tex_center">
                                Tích hợp tất cả các ứng dụng doanh nghiệp của bạn đang cần trên cùng
                                một nền tảng duy nhất.
                            </p>
                        </div>
                    </div>
                    <div className="cnt_count_tab">
                        <div className="cnt_counts_one">
                            <div className="cnt_counts">
                                <label
                                    htmlFor=""
                                    className={`pmc_all ${(active == 'all') ? 'active' : ''}`}
                                    data-tab="list_detl_one"
                                >
                                    <p className="share_fsize_three share_clr_one tex_center share_cursor" onClick={showAll}>
                                        Tất cả
                                    </p>
                                </label>
                            </div>
                            <div className="cnt_counts">
                                <label htmlFor="" className={`pmc_all ${(active == 'nhan_luc') ? 'active' : ''}`} data-tab="list_detl_two">
                                    <p className="share_fsize_three share_clr_one tex_center share_cursor" onClick={showNhanluc}>
                                        Quản lý nhân lực
                                    </p>
                                </label>
                            </div>
                            <div className="cnt_counts">
                                <label htmlFor="" className={`pmc_all ${(active == 'cong_viec') ? 'active' : ''}`} data-tab="list_detl_three">
                                    <p className="share_fsize_three share_clr_one tex_center share_cursor" onClick={showCongviec}>
                                        Quản lý công việc
                                    </p>
                                </label>
                            </div>
                        </div>
                        <div className="cnt_counts_tow">
                            <div className="cnt_counts">
                                <label htmlFor="" className={`pmc_all ${(active == 'noi_bo') ? 'active' : ''}`} data-tab="list_detl_four">
                                    <p className="share_fsize_three share_clr_one tex_center share_cursor" onClick={showNoibo}>
                                        Quản lý nội bộ
                                    </p>
                                </label>
                            </div>
                            <div className="cnt_counts">
                                <label htmlFor="" className={`pmc_all ${(active == 'ban_hang') ? 'active' : ''}`} data-tab="list_detl_five">
                                    <p className="share_fsize_three share_clr_one tex_center share_cursor" onClick={showBanhang}>
                                        Quản lý bán hàng
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="cnt_count_detail tab_active">
                        <div className="container t_flex">
                            <div className="detal_titl">
                                {
                                    (show == 'all') ? (
                                        <>
                                            <QlConlai />
                                            <QlNhanluc />
                                            <QlCongviec />
                                            <QlNoibo />
                                            <QlBanhang />
                                        </>
                                    ) : ''

                                }
                                {
                                    (show == 'nhan_luc') ? (
                                        <>
                                            <QlNhanluc />
                                        </>
                                    ) : ''
                                }
                                {
                                    (show == 'cong_viec') ? (
                                        <>
                                            <QlCongviec />
                                        </>
                                    ) : ''
                                }
                                {
                                    (show == 'noi_bo') ? (
                                        <>
                                            <QlNoibo />
                                        </>
                                    ) : ''
                                }
                                {
                                    (show == 'ban_hang') ? (
                                        <>
                                            <QlBanhang />
                                        </>
                                    ) : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            {hasTokens ? (
                <Footer />
            ) : null}
        </>
    )
}
