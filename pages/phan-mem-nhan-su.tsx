import React, { useEffect, useState } from 'react';
import styles from "@/styles/HomeBeforeLogin.module.css"
import Image from 'next/image';
import Head from 'next/head';
import Footer from "../components/footer/Footer"
import DropDownHeaderHr from './HomeBefore/hr/dropdownHeader';
import ModalLogin from '@/components/modal/ModalLogin';
import ModalRegsiter from '@/components/modal/ModalRegsiter';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';

export default function HomePageBeforLogin({ children }: any) {
    const [openMenu, setOpenMenu] = useState<any>(false)
    const [openModalLogin, setOpenModalLogin] = useState(false)
    const [openModalRegister, setOpenModalRegister] = useState(false)
    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }
    const handleCloseMenu = () => {
        setOpenMenu(false)
    }

    useEffect(() => {
        const acc_token = Cookies.get('token_base365')
        const rf_token = Cookies.get('rf_token')
        const role = Cookies.get('role')
        if (acc_token && rf_token && role) {
            window.location.href = "/phan-mem-nhan-su/quan-ly-chung"
        }
    }, [])

    const [isClassName, setClassName] = useState<any>(false)

    function updateClassName() {
        if (window.innerWidth <= 479 && window.scrollY > 0) {
            setClassName(true)
        } else {
            setClassName(false)
        }
    }
    // Gọi hàm khi trang web tải lên và khi người dùng cuộn chuột
    window.addEventListener('load', updateClassName);
    window.addEventListener('scroll', updateClassName);
    window.addEventListener('resize', updateClassName);

    console.log(isClassName);

    return (
        <>
            <Head>
                <title>Quản trị doanh nghiệp hiệu quả với công cụ hỗ trợ tốt nhất thị trường</title>
                <meta http-equiv="Content-Type" content="text/html;charset=utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <link rel="canonical" href="https://phanmemnhansu.timviec365.vn/"></link>
                <meta name="description" content="Phần mềm HR tại hungha365.com là công cụ quản trị nhân sự đắc lực bất kể doanh nghiệp nào cũng cần sở hữu. Được tích hợp toàn diện các tính năng quản trị doanh nghiệp cần thiết từ cơ bản đến nâng cao, phần mềm đem đến một quy trình quản trị chuẩn với cách sử dụng dễ dàng cho nhà tuyển dụng."></meta>
                <meta name="Keywords" content="phần mềm quản trị nhân sự, phần mềm quản lý nhân sự, phần mềm nhân sự"></meta>
                <meta name="robots" content="index,follow"></meta>
                <meta property="og:locale" content="vi_VN"></meta>
                <meta property="og:type" content="website"></meta>
                <meta property="og:title" content="Phần Mềm Quản Trị Nhân Sự Miễn Phí, Tốt Nhất 2023 - HRM365"></meta>
                <meta property="og:description" content="Phần mềm quản trị nhân sự 365 chuyên nghiệp, giải pháp hàng đầu cho việc quản lý nhân sự của các doanh nghiệp. Download phần mềm quản lý nhân sự miễn phí"></meta>
                <meta property="og:image" content="https://phanmemnhansu.timviec365.vn/assets/images/t_images/bg-header-home-mb.png"></meta>
                <meta name="twitter:card" content="summary"></meta>
                <meta name="twitter:description" content="Phần mềm quản trị nhân sự 365 chuyên nghiệp, giải pháp hàng đầu cho việc quản lý nhân sự của các doanh nghiệp. Download phần mềm quản lý nhân sự miễn phí"></meta>
                <meta name="twitter:title" content="Phần Mềm Quản Trị Nhân Sự Miễn Phí, Tốt Nhất 2023 - HRM365"></meta>
                <meta name="google-site-verification" content="tkR0DL2EWeg8OJfQypncyEWVoR3Mvl-Vbk4yl-8q1sQ"></meta>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `{
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Phần Mềm Quản Trị Nhân Sự 365",
                        "description": "Phần mềm quản trị nhân sự 365 chuyên nghiệp, giải pháp hàng đầu cho việc quản lý nhân sự của các doanh nghiệp. Download phần mềm quản lý nhân sự miễn phí",
                        "url": "https://phanmemnhansu.timviec365.vn/",
                        "additionaltype": ["https://en.wikipedia.org/wiki/Human_resource_management", "https://www.wikidata.org/wiki/Q1056396"]}`
                    }} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `"@context": "https://schema.org",
                        "@type": "FAQPage",
                    "name": "Câu hỏi thường gặp về phần mềm quản trị nhân sự",
                    "url":"https://phanmemnhansu.timviec365.vn/",
                    "inLanguage": "vi-VN",
                        "description": "Các câu hỏi, thắc mắc thường gặp khi tìm hiểu về phần mềm quản trị nhân sự",
                        "mainEntity": [{
                        "@type": "Question",
                        "position": 0,
                        "name": "Phần mềm quản trị nhân sự nào tốt nhất hiện nay?",
                    "answerCount": 1,
                        "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Để được đánh giá là phần mềm quản trị nhân sự tốt nhất thì phần mềm đó cần có đầy đủ tính năng cần thiết cho người sử dụng cũng như có độ ổn định trong quá trình sử dụng. Phần mềm quản trị nhân sự 365 hiện đang là một trong 5 <a href=\"https://phanmemnhansu.timviec365.vn\">phần mềm quản trị nhân sự tốt nhất</a> hiện nay với tính năng quản trị hồ sơ nhân sự, quản lý quy trình tuyển dụng, quản lý các quy trình đào tạo và phát triển của công ty."
                        }
                        },{
                        "@type": "Question",
                    "position": 1,
                        "name": "Có được sử dụng miễn phí phần mềm quản trị nhân sự không?",
                    "answerCount": 1,
                        "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Đa số các phần mềm quản trị nhân sự đều được sử dụng miễn phí để bạn có thể trải nghiệm những tính năng của phần mềm sau đó sẽ tính phí theo tháng. Tùy theo từng đơn vị cung cấp mà thời gian sử dụng miễn phí sẽ khác nhau. <a href=\"https://phanmemnhansu.timviec365.vn\">Phần mềm Quản trị nhân sự 365</a> thì có thời gian sử dụng miễn phí mãi mãi, không áp dụng thu phí đối với khách hàng."
                        }
                        },{
                        "@type": "Question",
                    "position": 2,
                        "name": "Giá phần mềm quản lý nhân sự là bao nhiêu?",
                    "answerCount": 1,
                        "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Hiện nay, phần mềm quản trị nhân sự trên thị trường thường được bán với mức giá khá cao và thường giới hạn lượng người dùng. Tuy nhiên, với phần mềm quản trị nhân sự 365, bạn sẽ được HOÀN TOÀN MIỄN PHÍ."
                        }
                        },{
                        "@type": "Question",
                    "position": 3,
                        "name": "Download Phần mềm quản trị nhân sự miễn phí ở đâu?",
                    "answerCount": 1,
                        "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Bạn chỉ cần truy cập vào địa chỉ https://phanmemnhansu.timviec365.vn/ là bạn đã có thể download phần mềm quản lý nhân sự miễn phí"
                        }
                        }]
                        }`
                    }} />
            </Head >
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.header} ${styles.container_fluid}`}>
                    <div className={`${styles.t_header_home}`}>
                        <div className={`${styles.t_header_home_left}`}>
                            <a href="/">
                                <Image src="/Logo.svg" width={128} height={28} alt='/'></Image>
                            </a>
                        </div>
                        <div className={`${styles.t_header_home_right}`}>
                            <ul className={`${styles.t_ul_1} ${styles.t_ul_1_n}   `}>
                                <li><a href="/">Trang chủ</a></li>
                                <li><a target="_blank" href="">Hướng dẫn</a></li>
                                <li><a target="_blank" href="">Tin tức</a></li>
                                <li><a target="_blank" href="/">Chuyển đổi số</a></li>
                            </ul>
                            <ul className={`${styles.t_ul_1} ${styles.t_ul_1_right} `}>
                                <li><a style={{ cursor: "pointer" }} onClick={() => setOpenModalLogin(true)}>Đăng nhập</a></li>
                                <li><a style={{ cursor: "pointer" }} onClick={() => setOpenModalRegister(true)}>Đăng ký</a></li>
                            </ul>
                            {openModalRegister && (
                                <ModalRegsiter setOpenModalRegister={setOpenModalRegister} />
                            )}
                            {openModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} />}
                        </div>
                    </div>
                    <div className={`${styles.t_header_home_mb}`}>
                        <div className={`${styles.t_header_mb_left}`} onClick={handleOpenMenu}>
                            <a data-toggle="modal">
                                <Image src="/icon-menu.png" width={24} height={24} alt='icon'></Image>
                            </a>
                        </div>
                        <div className={`${styles.t_header_mb_right}`}>
                            <a href="/">
                                <Image className={`${styles.t_header_mb_right_img}`} src="/logo.svg" width={168} height={48} alt='icon'></Image>
                            </a>
                        </div>
                    </div>
                    {openMenu && <DropDownHeaderHr onCancel={handleCloseMenu} />}
                </div>
                <div className={`${styles.container_fluid}`}>
                    <div className={`${styles.t_banner_home}`} style={{ display: "flex" }}>
                        <div className={`${styles.t_banner_home_1}`} style={{ width: "50%" }}>
                            <h1 className={`${styles.t_h1}`}>NẮM TRỌN DOANH NGHIỆP TRONG TẦM TAY

                            </h1>
                            <p className={`${styles.t_h2}`}>THÔNG MINH - THUẬN TIỆN - HIỆU QUẢ
                            </p>
                            <span className={`${styles.span_line_under}`}></span>
                            <p>Nền tảng quản trị nhân sự và phát triển đội ngũ toàn diện</p>
                            <p>Bảo mật thông tin khách hàng. Phương pháp lưu trữ dữ liệu dưới điện toán đám mây</p>
                            <a style={{ cursor: "pointer" }} onClick={() => setOpenModalLogin(true)} className={`${styles.use_free}`}>Dùng miễn phí ngay</a>
                            <div className={`${styles.download_app}`}>
                                <p>Tải App dành cho PC</p>
                                <div className={`${styles.download_app_list}`}>
                                    <div className={`${styles.download_app_item}`}>
                                        <a href="https://app.timviec365.vn/Download/HR/Install/HR.exe" rel="nofollow" target="_blank">
                                            <Image style={{ verticalAlign: "middle" }} src="/downloadForWin7Black.png" width={176} height={58} alt='/'></Image>
                                        </a>
                                    </div>
                                    <div className={`${styles.download_app_item}`}>
                                        <a href="https://apps.microsoft.com/store/detail/hr-365/XPDLPKWLRRHJFC" rel="nofollow" target="_blank">
                                            <Image style={{ verticalAlign: "middle" }} src="/downloadForWin10Black.png" width={176} height={58} alt='/'></Image>
                                        </a>
                                    </div>
                                    <div className={`${styles.download_app_item}`}>
                                        <a href="https://hungha365.com/upload_file/Quanlychung-1.0.2.dmg" rel="nofollow" target="_blank">
                                            <Image style={{ verticalAlign: "middle" }} src="/dl_app_pc1 (1).png" width={176} height={58} alt='/'></Image>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className={`${styles.t_body_top_1_h2}`} style={{ marginBottom: 40 }}>Ưu điểm vượt trội của hệ sinh thái Chuyển đổi số 365</p>
                    <div className={`${styles.t_body_top_advantages}`} style={{ display: 'flex' }}>
                        <div className={`${styles.item} ${styles.md_20}`}>
                            <div > <img className={`${styles.item_image}  ${styles.item_child}`} src={`/an_toan_bao_mat.svg`} alt="" /></div>
                            <div className={`${styles.item_title}  ${styles.item_child}`}>An toàn và bảo mật</div>
                            <div className={`${styles.item_text}  ${styles.item_child}`}>An toàn, bảo mật tuyệt đối, dữ liệu được lưu trữ theo mô hình điện toán đám mây.</div>
                            <a target='blank' href="https://chamcong.timviec365.vn/uu-diem-vuot-troi.html" className={`${styles.item_detail}  ${styles.item_child}`}>Xem chi tiết <img src="/arrow-right.png" alt="" /> </a>
                        </div>
                        <div className={`${styles.item} ${styles.md_20}`}>
                            <div > <img className={`${styles.item_image} ${styles.item_child}`} src={`/mot_nen_tang_duy_nhat.svg`} alt="" /></div>
                            <div className={`${styles.item_title}  ${styles.item_child}`}>Một nền tảng duy nhất</div>
                            <div className={`${styles.item_text}  ${styles.item_child}`}>Tích hợp tất cả các ứng dụng doanh nghiệp của bạn đang cần trên cùng một nền tảng duy nhất..</div>
                            <a target='blank' href="https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#tichhop" className={`${styles.item_detail}  ${styles.item_child}`}>Xem chi tiết <img src={`/arrow-right.png`} alt="" /> </a>
                        </div>
                        <div className={`${styles.item} ${styles.md_20}`}>
                            <div > <img className={`${styles.item_image}  ${styles.item_child}`} src={`/cong_nghe_ai.svg`} alt="" /></div>
                            <div className={`${styles.item_title}  ${styles.item_child}`}>Ứng dụng công nghệ AI</div>
                            <div className={`${styles.item_text} ${styles.item_child}`}>Ứng dụng Công nghệ AI tự nhận thức phân tích hành vi người dùng giải quyết toàn diện các bài đối với từng doanh nghiệp cụ thể.</div>
                            <a target='blank' href="https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#ungdung" className={`${styles.item_detail}  ${styles.item_child}`}>Xem chi tiết <img src={`/arrow-right.png`} alt="" /> </a>
                        </div>
                        <div className={`${styles.item} ${styles.md_20}`}>
                            <div > <img className={`${styles.item_image}`} src={`/giai_phap_so_1.svg`} alt="" /></div>
                            <div className={`${styles.item_title}  ${styles.item_child}`}>Giải pháp số 1 Việt Nam</div>
                            <div className={`${styles.item_text}  ${styles.item_child}`}>Luôn đồng hành và hỗ trợ 24/7. Phù hợp với cả những tập đoàn xuyên quốc gia đến những công ty SME.</div>
                            <a target='blank' href="https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#donghanh" className={`${styles.item_detail}  ${styles.item_child}`}>Xem chi tiết <img src={`/arrow-right.png`} alt="" /> </a>
                        </div>
                        <div className={`${styles.item} ${styles.md_20}`}>
                            <div > <img className={`${styles.item_image}`} src={`/mien_phi_tron_doi.svg`} alt="" /></div>
                            <div className={`${styles.item_title}  ${styles.item_child}`}>Sử dụng miễn phí trọn đời</div>
                            <div className={`${styles.item_text}  ${styles.item_child}`}>Miễn phí trọn đời đối với tất cả các doanh nghiệp đăng ký trong đại dịch Covid 19.</div>
                            <a target='blank' href="https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#mienphi" className={`${styles.item_detail}  ${styles.item_child}`}>Xem chi tiết <img src={`/arrow-right.png`} alt="" /> </a>
                        </div>
                    </div>
                    <div className={`${styles.t_body_top_1}`} >
                        <div className={`${styles.t_body_top_1_left}`}>
                            <Image style={{ verticalAlign: "middle" }} className={`${styles.t_body_top_1_left_img}`} src="/people-banner.webp" width={353} height={611.4} alt='banner'></Image>
                        </div>
                        <div className={`${styles.t_body_top_1_right}`}>
                            <h2 className={`${styles.t_body_top_1_h2}`}>QUẢN TRỊ NHÂN SỰ TOÀN DIỆN VỚI ĐẦY ĐỦ NGHIỆP VỤ</h2>
                            <div className={`${styles.t_body_top_1_right_r} ${styles.t_body_top_1_right_r_border}`} style={{ display: 'flex' }}>
                                <div className={`${styles.t_body_top_1_right_r1} `} style={{ width: "50%" }} >
                                    <div style={{ display: 'flex' }}>
                                        <div className={`${styles.t_body_top_1_right_r1_r_left} `} style={{ width: "17%" }}>
                                            <Image src="/qly-hoi-nhap.png" width={72} height={122} alt=''
                                                style={{ paddingTop: 25, paddingBottom: 25, verticalAlign: "middle" }}></Image>
                                        </div>
                                        <div className={`${styles.t_body_top_1_right_r1_r_right} `} style={{ width: "83%" }}>
                                            <h3 className={`${styles.t_body_top_1_right_r_1_right_h3} `} >Quản lý quá trình tuyển dụng</h3>
                                            <p className={`${styles.t_body_top_1_right_r_1_right_p} `}>Giúp Doanh nghiệp quản lý quá trình tuyển dụng một cách hiệu quả, thông minh và tiện lợi</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.t_body_top_1_right_r1} `} style={{ width: "50%" }}>
                                    <div style={{ display: 'flex' }}>
                                        <div className={`${styles.t_body_top_1_right_r1_r_left} `} style={{ width: "17%" }}>
                                            <Image src="/qly-hso.png" width={72} height={122} alt=''
                                                style={{ paddingTop: 25, paddingBottom: 25, verticalAlign: "middle" }}></Image>
                                        </div>
                                        <div className={`${styles.t_body_top_1_right_r1_r_right} `} style={{ width: "83%" }}>
                                            <h3 className={`${styles.t_body_top_1_right_r_1_right_h3} `} style={{ color: "#E18484" }} >Quản lý hồ sơ nhân sự</h3>
                                            <p className={`${styles.t_body_top_1_right_r_1_right_p} `}>Giúp lưu trữ hồ sơ nhân sự, liên kết đầy đủ và toàn diện thông tin về nhân viên và ứng viên</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className={`${styles.t_body_top_1_right_r} ${styles.t_body_top_1_right_r_border}`} style={{ display: 'flex' }}>
                                <div className={`${styles.t_body_top_1_right_r1} `} style={{ width: "50%" }} >
                                    <div style={{ display: 'flex' }}>
                                        <div className={`${styles.t_body_top_1_right_r1_r_left} `} style={{ width: "17%" }}>
                                            <Image src="/qly-quy-dinh.png" width={72} height={122} alt=''
                                                style={{ paddingTop: 25, paddingBottom: 25, verticalAlign: "middle" }}></Image>
                                        </div>
                                        <div className={`${styles.t_body_top_1_right_r1_r_right} `} style={{ width: "83%" }}>
                                            <h3 className={`${styles.t_body_top_1_right_r_1_right_h3} `} style={{ color: "#84E1BA" }} >Quy định / chính sách</h3>
                                            <p className={`${styles.t_body_top_1_right_r_1_right_p} `}>Thiết kế hệ thống các quy định và chính sách hiệu quả và minh bạch</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.t_body_top_1_right_r1} `} style={{ width: "50%" }}>
                                    <div style={{ display: 'flex' }}>
                                        <div className={`${styles.t_body_top_1_right_r1_r_left} `} style={{ width: "17%" }}>
                                            <Image src="/qly-dao-tao.png" width={72} height={122} alt=''
                                                style={{ paddingTop: 25, paddingBottom: 25, verticalAlign: "middle" }}></Image>
                                        </div>
                                        <div className={`${styles.t_body_top_1_right_r1_r_right} `} style={{ width: "83%" }}>
                                            <h3 className={`${styles.t_body_top_1_right_r_1_right_h3} `} style={{ color: "#FFCB66" }} >Quá trình đào tạo và phát triển</h3>
                                            <p className={`${styles.t_body_top_1_right_r_1_right_p} `}>Tạo cho nhân viên cơ hội được học tập và phát triển để cùng kiến tạo tương lai doanh nghiệp</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.t_body_top_1_right_r} ${styles.t_body_top_1_right_r_border}`} style={{ display: 'flex' }}>
                                <div className={`${styles.t_body_top_1_right_r1} `} style={{ width: "50%" }} >
                                    <div style={{ display: 'flex' }}>
                                        <div className={`${styles.t_body_top_1_right_r1_r_left} `} style={{ width: "17%" }}>
                                            <Image src="/qly-muc-tieu.png" width={72} height={122} alt=''
                                                style={{ paddingTop: 25, paddingBottom: 25, verticalAlign: "middle" }}></Image>
                                        </div>
                                        <div className={`${styles.t_body_top_1_right_r1_r_right} `} style={{ width: "83%" }}>
                                            <h3 className={`${styles.t_body_top_1_right_r_1_right_h3} `} style={{ color: "#66B6FF" }} >Quản lý thành tích & vi phạm</h3>
                                            <p className={`${styles.t_body_top_1_right_r_1_right_p} `}>Duy trì sự thống nhất trong các mục tiêu chiến lược giữa các thành viên trong nội bộ doanh nghiệp</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.t_body_top_1_right_r1} `} style={{ width: "50%" }}>
                                    <div style={{ display: 'flex' }}>
                                        <div className={`${styles.t_body_top_1_right_r1_r_left} `} style={{ width: "17%" }}>
                                            <Image src="/qly-hoi-nhap-1.png" width={72} height={122} alt=''
                                                style={{ paddingTop: 25, paddingBottom: 25, verticalAlign: "middle" }}></Image>
                                        </div>
                                        <div className={`${styles.t_body_top_1_right_r1_r_right} `} style={{ width: "83%" }}>
                                            <h3 className={`${styles.t_body_top_1_right_r_1_right_h3} `} style={{ color: "#BC66FF" }} >Quản lý lương thưởng - phúc lợi</h3>
                                            <p className={`${styles.t_body_top_1_right_r_1_right_p} `}>Theo dõi toàn bộ lương thưởng nhân viên, quản lý các khoản chế độ phúc lợi cho nhân viên</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.t_body_top_2}`}>
                        <h2 className={`${styles.t_body_top_2_h2}`}>CHỨC NĂNG PHẦN MỀM QUẢN TRỊ NHÂN SỰ - GIẢI PHÁP SỐ 1 DÀNH CHO DOANH NGHIỆP</h2>
                        <div className={`${styles.t_body_top_2_r1}`} style={{ background: "#FCFCFC", display: "flex" }}>
                            <div className={`${styles.t_body_top_2_r1_left}`} style={{ width: "42%" }} >
                                <Image className={`${styles.t_body_top_2_r1_left_img}`} src="/gioithieu_1.webp" width={337} height={300} alt=''></Image>
                            </div>
                            <div className={`${styles.t_body_top_2_r1_right}`} style={{ width: "58%" }}>
                                <h3 className={`${styles.t_body_top_2_r1_right_h3}`}>Quản lý tuyển dụng</h3>
                                <span className={`${styles.t_border_bot}`}></span>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Xây dựng, thực hiện quy trình tuyển dụng.</p>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Tương tác với ứng viên.</p>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Hỗ trợ ứng viên và nhà tuyển dụng trong quá trình tuyển dụng.</p>
                            </div>
                        </div>
                        <div className={`${styles.t_body_top_2_r2}`} style={{ background: "#FCFCFC", display: "flex" }}>
                            <div className={`${styles.t_body_top_2_r2_left} ${styles.pull_left}`} style={{ width: "42%" }}>
                                <h3 className={`${styles.t_body_top_2_r1_right_h3}`}>Hội nhập nhân viên mới</h3>
                                <span className={`${styles.t_border_bot}`}></span>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Cung cấp thông tin công ty.</p>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Theo dõi quá trình hội nhập cho nhân viên mới.</p>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Tạo quy trình onboard nhanh với đầy đủ với các bước mặc định.</p>
                            </div>
                            <div className={`${styles.t_body_top_2_r2_right} ${styles.pull_right}`} style={{ width: "58%" }} >
                                <Image className={`${styles.t_body_top_2_r2_left_img}`} src="/gioithieu_2.webp" width={337} height={300} alt=''></Image>
                            </div>
                        </div>
                        <div className={`${styles.t_body_top_2_r1}`} style={{ background: "#FCFCFC", display: "flex" }}>
                            <div className={`${styles.t_body_top_2_r1_left}`} style={{ width: "42%" }} >
                                <Image className={`${styles.t_body_top_2_r1_left_img}`} src="/gioithieu_3.webp" width={337} height={300} alt=''></Image>
                            </div>
                            <div className={`${styles.t_body_top_2_r1_right}`} style={{ width: "58%" }}>
                                <h3 className={`${styles.t_body_top_2_r1_right_h3}`}>Hồ sơ nhân sự</h3>
                                <span className={`${styles.t_border_bot}`}></span>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Quản lý thông tin, số hóa hồ sơ nhân sự.</p>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Xây dựng kế hoạch phát triển toàn diện.</p>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Lưu trữ tập trung toàn bộ dữ liệu nhân sự tại một nền tảng với giao diện trực quan, đa chiều.</p>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Phân chia tài liệu khoa học.</p>
                            </div>
                        </div>
                        <div className={`${styles.t_body_top_2_r2}`} style={{ background: "#FCFCFC", display: "flex" }}>
                            <div className={`${styles.t_body_top_2_r2_left} ${styles.pull_left}`} style={{ width: "42%" }}>
                                <h3 className={`${styles.t_body_top_2_r1_right_h3}`}>
                                    Đào tạo, phát triển</h3>
                                <span className={`${styles.t_border_bot}`}></span>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Quản lý quy trình đào tạo, lộ trình phát triển rõ ràng với từng vị trí.</p>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Đánh giá nhân viên và đưa ra quyết định liên quan đến sự phát triển nhân sự.</p>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Hệ thống hoá hình thức ghi nhận thành tựu cho nhân viên.</p>
                            </div>
                            <div className={`${styles.t_body_top_2_r2_right} ${styles.pull_right}`} style={{ width: "58%" }} >
                                <Image className={`${styles.t_body_top_2_r2_left_img}`} src="/gioithieu_4.webp" width={337} height={300} alt=''></Image>
                            </div>
                        </div>
                        <div className={`${styles.t_body_top_2_r1}`} style={{ background: "#FCFCFC", display: "flex" }}>
                            <div className={`${styles.t_body_top_2_r1_left}`} style={{ width: "42%" }} >
                                <Image className={`${styles.t_body_top_2_r1_left_img}`} src="/gioithieu_5.webp" width={337} height={300} alt=''></Image>
                            </div>
                            <div className={`${styles.t_body_top_2_r1_right}`} style={{ width: "58%" }}>
                                <h3 className={`${styles.t_body_top_2_r1_right_h3}`}>Quy định, chính sách</h3>
                                <span className={`${styles.t_border_bot}`}></span>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>
                                    Theo dõi các thông tin về thuế/bảo hiểm/phúc lợi/phụ cấp của các nhân viên.</p>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Kiểm tra các chính sách.

                                </p>
                                <p className={`${styles.t_body_top_2_r1_right_p}`}>Đưa ra các quy định, chính sách liên quan tới nhân viên.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.container_fluid} ${styles.t_body_top_3}`} >
                    <div className={`${styles.t_body_top_3_r}`} style={{ display: "flex" }}>
                        <div className={`${styles.t_body_top_3_left} ${styles.div_youtube}`}>
                            <iframe width="560" className={`${styles.video_home}`} height="315" src="https://www.youtube.com/embed/2wS-x1li7QQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                        </div>
                        <div className={`${styles.t_body_top_3_right} `} >
                            <h3 className={`${styles.t_body_top_3_right_h3}`}>Chuyển đổi số quá trình quản lý và phát triển nhân lực doanh nghiệp</h3>
                            <p className={`${styles.t_body_top_3_right_p}`}>
                                Phát triển, quản lý nguồn nhân lực toàn diện trong kỷ nguyên số và đưa nhân lực trở thành một lợi thế cạnh tranh của doanh nghiệp. Xây dựng giải pháp nhân sự mang tính thực tiễn cao từ việc ứng dụng những lý thuyêt quản trị hiện đại.
                            </p>
                            <div className={`${styles.t_dv_button}`}>
                                <a href="/lua-chon-dang-ky" rel="nofollow" className={`${styles.t_register_now}`}>Đăng ký ngay</a>
                                <a href="" rel="nofollow" className={`${styles.t_contact}`}>Liên hệ hỗ trợ</a>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={`${styles.container_fluid} ${styles.t_body_top_5}`} style={{ display: "flex" }} >
                    <div className={`${styles.t_body_top_5_left} `}>
                        <Image className={`${styles.t_body_top_5_left_img}`} src="/CEO_timviec365.webp" width={736} height={734} alt='CEO Trương Văn Trắc'></Image>
                    </div>
                    <div className={`${styles.t_body_top_5_right} `} >
                        <Image className={`${styles.t_body_top_5_right_img} `} src="/trich_dan.webp" width={736} height={270} alt='Trích dẫn'></Image>
                    </div>
                </div>
                <div className={`${styles.container_fluid} ${styles.t_body_top_6}`}  >
                    <h2 className={`${styles.t_body_top_6_h3}`} >DOWNLOAD PHẦN MỀM QUẢN LÝ NHÂN SỰ MIỄN PHÍ</h2>
                    <div className={`${styles.t_qr_code}`} style={{ display: "flex" }}>
                        <div className={`${styles.t_body_top_6_left}`}>
                            <a href="" rel="nofollow">
                                <Image style={{ float: "right" }} src="/dl_app_pc1 (2).png" width={168} height={52} alt='phần mềm quản lý nhân sự trên MAC OS'></Image>
                            </a>
                        </div>
                        <div className={`${styles.t_body_top_6_right}`}>
                            <a href="https://apps.microsoft.com/store/detail/hr-365/XPDLPKWLRRHJFC" rel="nofollow">
                                <Image src="/app_microsoft.png" width={168} height={52} alt='phần mềm quản lý nhân sự trên MircroSoft'></Image>
                            </a>
                        </div>
                    </div>
                </div>
                <link
                    rel='stylesheet'
                    href='https://timviec365.vn/css/footer_new.css?v=2'
                />

                <Footer></Footer>
            </div>
        </>
    )
}
