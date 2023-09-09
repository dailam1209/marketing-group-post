import React, { useEffect, useState } from 'react';
import styles from '@/styles/HomeBeforeLoginHr.module.css'
import HeaderHomeBeforeHr from './HomeBefore/hr/header';
import SidebarHomeBefore from './HomeBefore/hr/sidebar';
import FooterQLC from "@/components/footerQLC/FooterQLC.jsx";
import Cookies from 'js-cookie'
import Head from 'next/head';

export default function HomeBeforeLoginHr() {

    const [openSidebar, setOpenSidebar] = useState(false)
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [table_of_content2, setTable_of_content2] = useState(false)
    const [table_of_content3, setTable_of_content3] = useState(false)

    useEffect(() => {
        const acc_token = Cookies.get('token_base365')
        const rf_token = Cookies.get('rf_token')
        const role = Cookies.get('role')
        if (acc_token && rf_token && role) {
            window.location.href = "/phan-mem-nhan-su/quan-ly-chung"
        }
    }, [])

    const handleOpentableOfContent2 = () => {
        setTable_of_content2(pre => !pre)
    }
    const handleOpentableOfContent3 = () => {
        setTable_of_content3(pre => !pre)
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 1024) {
                setOpenSidebar(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Xóa bỏ sự kiện lắng nghe khi component bị hủy
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
            <Head>
                <title>Quản trị doanh nghiệp hiệu quả với công cụ hỗ trợ tốt nhất thị trường</title>
                <meta http-equiv="Content-Type" content="text/html;charset=utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <link rel="canonical" href="https://hungha365.com/phan-mem-nhan-su"></link>
                <meta name="description" content="Phần mềm HR tại hungha365.com là công cụ quản trị nhân sự đắc lực bất kể doanh nghiệp nào cũng cần sở hữu. Được tích hợp toàn diện các tính năng quản trị doanh nghiệp cần thiết từ cơ bản đến nâng cao, phần mềm đem đến một quy trình quản trị chuẩn với cách sử dụng dễ dàng cho nhà tuyển dụng."></meta>
                <meta name="Keywords" content="phần mềm quản trị nhân sự, phần mềm quản lý nhân sự, phần mềm nhân sự"></meta>
                <meta name="robots" content="noindex,nofollow"></meta>
                <meta property="og:locale" content="vi_VN"></meta>
                <meta property="og:type" content="website"></meta>
                <meta property="og:title" content="Phần Mềm Quản Trị Nhân Sự Miễn Phí, Tốt Nhất 2023 - HRM365"></meta>
                <meta property="og:description" content="Phần mềm quản trị nhân sự 365 chuyên nghiệp, giải pháp hàng đầu cho việc quản lý nhân sự của các doanh nghiệp. Download phần mềm quản lý nhân sự miễn phí"></meta>
                <meta property="og:image" content="https://hungha365.com/bg-header-home-mb.png"></meta>
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
                        "url": "https://hungha365.com/phan-mem-nhan-su",
                        "additionaltype": ["https://en.wikipedia.org/wiki/Human_resource_management", "https://www.wikidata.org/wiki/Q1056396"]}`
                    }} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `"@context": "https://schema.org",
                        "@type": "FAQPage",
                    "name": "Câu hỏi thường gặp về phần mềm quản trị nhân sự",
                    "url":"https://hungha365.com/phan-mem-nhan-su",
                    "inLanguage": "vi-VN",
                        "description": "Các câu hỏi, thắc mắc thường gặp khi tìm hiểu về phần mềm quản trị nhân sự",
                        "mainEntity": [{
                        "@type": "Question",
                        "position": 0,
                        "name": "Phần mềm quản trị nhân sự nào tốt nhất hiện nay?",
                    "answerCount": 1,
                        "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Để được đánh giá là phần mềm quản trị nhân sự tốt nhất thì phần mềm đó cần có đầy đủ tính năng cần thiết cho người sử dụng cũng như có độ ổn định trong quá trình sử dụng. Phần mềm quản trị nhân sự 365 hiện đang là một trong 5 <a href=\"https://hungha365.com/phan-mem-nhan-su\">phần mềm quản trị nhân sự tốt nhất</a> hiện nay với tính năng quản trị hồ sơ nhân sự, quản lý quy trình tuyển dụng, quản lý các quy trình đào tạo và phát triển của công ty."
                        }
                        },{
                        "@type": "Question",
                    "position": 1,
                        "name": "Có được sử dụng miễn phí phần mềm quản trị nhân sự không?",
                    "answerCount": 1,
                        "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Đa số các phần mềm quản trị nhân sự đều được sử dụng miễn phí để bạn có thể trải nghiệm những tính năng của phần mềm sau đó sẽ tính phí theo tháng. Tùy theo từng đơn vị cung cấp mà thời gian sử dụng miễn phí sẽ khác nhau. <a href=\"https://hungha365.com/phan-mem-nhan-su\">Phần mềm Quản trị nhân sự 365</a> thì có thời gian sử dụng miễn phí mãi mãi, không áp dụng thu phí đối với khách hàng."
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
                        "text": "Bạn chỉ cần truy cập vào địa chỉ https://hungha365.com/phan-mem-nhan-su là bạn đã có thể download phần mềm quản lý nhân sự miễn phí"
                        }
                        }]
                        }`
                    }} />
            </Head >
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.sidebar}`}>
                        <SidebarHomeBefore />
                    </div>
                    <div className={`${styles.content}`}>
                        <div className={`${styles.header}`}>
                            <HeaderHomeBeforeHr />
                        </div>
                        <div className={`${styles.content_body}`}>
                            <div className={`${styles.content_body_left}`}>
                                <div className={`${styles.table_of_content}`}>
                                    <img className={`${styles.table_of_content_img1}`} src="/Frame 1321315775.png" alt="" />
                                    <img className={`${styles.table_of_content_img2}`} src="/Frame 1321315775 (1).png" alt="" />
                                </div>
                                <div className={`${styles.numerical}`}>
                                    <ul>
                                        <li>
                                            <img src="/arrow-square-down.png" alt="" />
                                            <p>1. Vai trò của CV xin việc quan trọng ra sao ?</p>
                                        </li>
                                        <li onClick={handleOpentableOfContent2}>
                                            <img src={table_of_content2 ? "/hide.png" : "hide1.png"} alt="" />
                                            <p>2. Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên ?</p>
                                        </li>
                                        {table_of_content2 &&
                                            <div>
                                                <li>
                                                    <img src="/arrow-square-down.png" alt="" />
                                                    <p>2.1. CV làm tốt vai trò cầu nối giữa ứng viên với doanh nghiệp ?</p>
                                                </li>
                                                <li>
                                                    <img src="/arrow-square-down.png" alt="" />
                                                    <p>2.2. Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên ?</p>
                                                </li>
                                            </div>
                                        }
                                        <li onClick={handleOpentableOfContent3}>
                                            <img src={table_of_content3 ? "/hide.png" : "hide1.png"} alt="" />
                                            <p>3. CV làm tốt vai trò cầu nối giữa ứng viên với doanh nghiệp ?</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={`${styles.content_body_right}`}>

                            </div>
                        </div>
                    </div>

                </div>
                <FooterQLC />
            </div >
        </>
    )
}