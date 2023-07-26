import { React, useState, useEffect } from "react"
import Seo from "../components/head";
import SideBar from '../components/sideBar/SideBar';
import HeaderLogin from '../components/headerLogin/HeaderLogin';
import QlNhanluc from "../components/ql_nhanluc2"
import QlCongviec from "../components/ql_congviec2"
import QlNoibo from "../components/ql_noibo2"
import QlBanhang from "../components/ql_banhang2"
import { infoCom } from "../utils/handleApi";
import { parse, format, differenceInSeconds } from 'date-fns';
import { getServerSideProps } from '../utils/function'

export { getServerSideProps }
export default function HomeCompany() {
    const [show, setShow] = useState('all')
    const [active, setActive] = useState('all')
    const [nameList, setNameList] = useState('Tất cả')
    const [textVip, setTextVip] = useState('');

    const showAll = () => {
        setShow('all')
        setActive('all')
        setNameList('Tất cả')
    }
    const showNhanluc = () => {
        setText(<>Ứng dụng / <span className="thay_doi">Quản lý nhân lực</span></>)
        setShow('nhan_luc')
        setActive('nhan_luc')
        setNameList('Quản lý nhân sự')

    }
    const showCongviec = () => {
        setText(<>Ứng dụng / <span className="thay_doi">Quản lý công việc</span></>)
        setShow('cong_viec')
        setActive('cong_viec')
        setNameList('Quản lý công việc')

    }
    const showNoibo = () => {
        setText(<>Ứng dụng / <span className="thay_doi">Quản lý nội bộ</span></>)
        setShow('noi_bo')
        setActive('noi_bo')
        setNameList('Quản lý nội bộ')

    }
    const showBanhang = () => {
        setText(<>Ứng dụng / <span className="thay_doi">Quản lý bán hàng</span></>)
        setShow('ban_hang')
        setActive('ban_hang')
        setNameList('Quản lý bán hàng')
    }

    // search
    function search() {
        const searchTerm = document.getElementById("myInput").value.toLowerCase();

        const items = document.getElementsByClassName("delt_titl_ud");

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let content = item.getElementsByTagName("h4")[0].innerText.toLowerCase();

            if (content.includes(searchTerm)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        }
    }

    const [getText, setText] = useState(<>Ứng dụng / <span className="thay_doi">Tất cả</span></>)

    const [getVip, setVip] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                let response = await infoCom();
                // Chuyển đổi chuỗi thành đối tượng ngày
                const dateObj = parse('20-05-2023', 'dd-MM-yyyy', new Date());

                // Lấy số giây kể từ ngày 1/1/1970
                const seconds = differenceInSeconds(dateObj, new Date(0));
                if (parseInt(seconds) > (parseInt(response.data.createdAt))) {
                    setVip('Tài khoản của bạn có thể đăng ký tối đa 10000 nhân viên');
                } else {
                    if (response.data.com_vip === 1) {
                        setVip('Tài khoản của bạn có thể đăng ký tối đa 10000 nhân viên');
                    } else {
                        setVip('Tài khoản công ty bạn chưa phải là tài khoản VIP! Tài khoản của bạn chỉ đăng ký tối đa 5 nhân viên');
                    }
                }
            } catch (error) {
                console.log('Error:', error);
            }
        };

        getData();

    }, []);

    return (
        <>
            <Seo
                seo=''
                title='Quản lý ứng dụng'
            />

            <div id="qly_ungdung_nv" className="qly_ungdung">
                <div className="wrapper">
                    <div className="left_ql">
                        <SideBar />
                    </div>
                    <div className="right_ql">
                        <div className="header_rigth_qly">
                            <div className="ctn_header_qly">
                                <HeaderLogin text={getText} />
                            </div>
                        </div>
                        <div className="ctn_right_qly">
                            <div className="ctn_res_qly">
                                <div className="left_header_qly">
                                    <p className="share_clr_one share_fsize_one">Ứng dụng / <span className="thay_doi">{nameList}</span></p>
                                </div>
                                <div className="tbao_nangcap share_bgr_tow">
                                    <div className="tbao_ncap">
                                        <div className="tde_tbao_ncap">
                                            <h4 className="hd_chuavip davip_ncap">{getVip}</h4>
                                        </div>
                                        <div className="nang_capv">
                                            <p className="share_fsize_one ncap_tkhoan">
                                                <a href="/thong-bao-tai-khoan-vip.html"><img src="/img/napcap_vip.png" className="ncap_vip" /> Nâng cấp tài khoản</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="search_qly">
                                    <form className="form_timkiem">
                                        <div className="v_form_timkiem">
                                            <div className="tim_kiem">
                                                <input type="text" name="search" id="myInput" onKeyUp={search} placeholder="Nhập tên phần mềm" className="form-serach share_fsize_one share_clr_three share_bgr_tow" />
                                                <span className="ico_search"></span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="list_all_qly">
                                    <div className="ctn_chile_one">
                                        <div className={`tab_content ${(active == 'all') ? 'active' : ''}`}>
                                            <div className="ctn_detl_tab" onClick={showAll}>
                                                <label className="tab_label">
                                                    <div className="avt_detl_tab">
                                                        <h3>27</h3>
                                                        <p>Tất cả</p>
                                                        <input type="radio" name="gs-gd" value="1" defaultChecked={true} />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className={`tab_content ${(active == 'nhan_luc') ? 'active' : ''}`}>
                                            <div className="ctn_detl_tab" onClick={showNhanluc}>
                                                <label className="tab_label">
                                                    <h3>05</h3>
                                                    <p>Quản lý nhân lực</p>
                                                    <input type="radio" name="gs-gd" value="2" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className={`tab_content ${(active == 'cong_viec') ? 'active' : ''}`}>
                                            <div className="ctn_detl_tab" onClick={showCongviec}>
                                                <label className="tab_label">
                                                    <h3>04</h3>
                                                    <p>Quản lý công việc</p>
                                                    <input type="radio" name="gs-gd" value="3" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className={`tab_content ${(active == 'noi_bo') ? 'active' : ''}`}>
                                            <div className="ctn_detl_tab" onClick={showNoibo}>
                                                <label className="tab_label">
                                                    <h3>07</h3>
                                                    <p>Quản lý nội bộ</p>
                                                    <input type="radio" name="gs-gd" value="4" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className={`tab_content ${(active == 'ban_hang') ? 'active' : ''}`}>
                                            <div className="ctn_detl_tab" onClick={showBanhang}>
                                                <label className="tab_label">
                                                    <h3>10</h3>
                                                    <p>Quản lý bán hàng</p>
                                                    <input type="radio" name="gs-gd" value="5" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ctn_chile_tow">
                                        {
                                            (show == 'all') ? (
                                                <>
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
                </div>
            </div>
            <>
                <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            </>
        </>

    )
};
