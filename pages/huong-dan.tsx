import React, { useEffect, useState } from 'react';
import styles from "@/styles/huong_dan.module.css"
import Image from 'next/image';
import Head from 'next/head';
import Footer from '@/components/footer/Footer';
import DropDownHeaderHr from '@/pages/HomeBefore/hr/dropdownHeader';
import ModalLogin from '@/components/modal/ModalLogin';
import ModalRegsiter from '@/components/modal/ModalRegsiter';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
import { Link } from 'react-scroll'

export default function InStruct({ children }: any) {
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

    const router = useRouter()

    const [isDiv, setDiv] = useState<any>(0)


    return (
        <>
            <Head>
                <title>Hướng dẫn sử dụng Phần mềm Quản Trị Nhân Sự 365</title>
                <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <link rel="canonical" href="https://hungha365.com/huong-dan" />
                <meta name="description" content="Hướng dẫn sử dụng phần mềm quản trị nhân sự 365 chuẩn, chi tiết nhất. Giúp bạn dễ dàng quản lý thông tin ứng viên tốt nhất. Tham khảo hướng dẫn ngay hôm nay"></meta>
                <meta name="Keywords" content="hướng dẫn sử dụng phần mềm quản trị nhân sự" />
                <meta name="robots" content="noindex,nofollow" />

                <meta property="og:locale" content="vi_VN" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Hướng dẫn sử dụng Phần mềm Quản Trị Nhân Sự 365" />
                <meta property="og:description" content="Hướng dẫn sử dụng phần mềm quản trị nhân sự 365 chuẩn, chi tiết nhất. Giúp bạn dễ dàng quản lý thông tin ứng viên tốt nhất. Tham khảo hướng dẫn ngay hôm nay" />
                <meta property="og:image" content="/bg-header-home-mb.png" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content="Hướng dẫn sử dụng phần mềm quản trị nhân sự 365 chuẩn, chi tiết nhất. Giúp bạn dễ dàng quản lý thông tin ứng viên tốt nhất. Tham khảo hướng dẫn ngay hôm nay" />
                <meta name="twitter:title" content="Hướng dẫn sử dụng Phần mềm Quản Trị Nhân Sự 365" />
                <meta name="google-site-verification" content="tkR0DL2EWeg8OJfQypncyEWVoR3Mvl-Vbk4yl-8q1sQ" />

                <script async
                    dangerouslySetInnerHTML={{
                        __html: `{
                            (function(w, d, s, l, i) {
                                w[l] = w[l] || [];
                                w[l].push({
                                    'gtm.start': new Date().getTime(),
                                    event: 'gtm.js'
                                });
                                var f = d.getElementsByTagName(s)[0],
                                    j = d.createElement(s),
                                    dl = l != 'dataLayer' ? '&l=' + l : '';
                                j.async = true;
                                j.src =
                                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                                f.parentNode.insertBefore(j, f);
                            })(window, document, 'script', 'dataLayer', 'GTM-NXVQCHN');}`
                    }} />

            </Head >
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.header} ${styles.container_fluid}`}>
                    <div className={`${styles.t_header_home}`}>
                        <div className={`${styles.t_header_home_left}`}>
                            <a href="/">
                                <Image src="/logo.svg" width={128} height={28} alt='/'></Image>
                            </a>
                        </div>
                        <div className={`${styles.t_header_home_right}`}>
                            <ul className={`${styles.t_ul_1} ${styles.t_ul_1_n}   `}>
                                <li><a href="/">Trang chủ</a></li>
                                <li><a >Hướng dẫn</a></li>
                                <li><a target="_blank" href="https://timviec365.vn/blog/c153/quan-tri-nhan-luc">Tin tức</a></li>
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
                    <div className={`${styles.t_banner_hd}`} style={{ display: "flex" }}>
                        <div className={`${styles.t_banner_hd_left}`}>
                            <h1 className={`${styles.t_banner_hd_left_h1}`} >Hướng dẫn sử dụng
                                Phần mềm quản trị nhân sự 365</h1>
                            <a href="https://apps.microsoft.com/store/detail/hr-365/XPDLPKWLRRHJFC" rel="nofollow" target="_blank">
                                <img style={{ verticalAlign: "middle" }} src="/gg_play.png" alt="dowload google play" />
                            </a>
                            <a href="https://hungha365.com/upload_file/Quanlychung-1.0.2.dmg" rel="nofollow" target="_blank">
                                <img style={{ verticalAlign: "middle" }} src="/app_store.png" alt="dowload app store" />
                            </a>
                        </div>
                        <div className={`${styles.t_ht_youtube}`}>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/UssNzo6m1p8" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                        </div>
                    </div>
                    <div className={`${styles.t_body_hd_top_1}`}>
                        <h2 className={`${styles.t_body_hd_top_1_h2}`}>Hướng dẫn chi tiết</h2>
                        <div className={`${styles.t_body_hd_top_1_r_b}`}>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/quy_trinh_tuyen_dung.svg" alt="Quy trình tuyển dụng" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Quy trình tuyển dụng</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Xây dựng quy trình tuyển dụng cho từng vị trí công việc</p>
                                <Link onClick={() => setDiv(1)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/thuc_hien_tuyen_dung.svg" alt="Thực hiện tuyển dụng" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Thực hiện tuyển dụng</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Quản lý tin tuyển dụng của doanh nghiệp</p>
                                <Link onClick={() => setDiv(2)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/danh_sach_ung_vien.svg" alt="Danh sách ứng viên" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Danh sách ứng viên</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Quản lý danh sách ứng viên, theo dõi từng ứng viên</p>
                                <Link onClick={() => setDiv(3)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                        </div>
                        <div className={`${styles.t_body_hd_top_1_r_b}`}>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/khen_thuong.svg" alt="Khen thưởng" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Khen thưởng</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Quản lý và theo dõi khen thưởng</p>
                                <Link onClick={() => setDiv(4)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/ky_luat.svg" alt="Kỷ luật" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Kỷ luật</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Quản lý các vấn đề xử phạt trong doanh nghiệp</p>
                                <Link onClick={() => setDiv(5)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/quan_ly_nhan_vien.svg" alt="Quản lý nhân viên" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Quản lý nhân viên</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Quản lý danh sách, thông tin nhân viên</p>
                                <Link onClick={() => setDiv(6)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                        </div>
                        <div className={`${styles.t_body_hd_top_1_r_b}`}>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/quy_dinh_chinh_sach.svg" alt="Quy định chính sách" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Quy định chính sách</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Thiết lập quản lý các quy định, nội quy của doanh nghiệp</p>
                                <Link onClick={() => setDiv(7)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/bien_dong_nhan_su.svg" alt="Biến động nhân sự" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Biến động nhân sự</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>uản lý sự thay đổi của nhân viên trong doanh nghiệp: luân chuyển công tác, nghỉ việc,...</p>
                                <Link onClick={() => setDiv(8)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/vi_tri_cong_viec.svg" alt="Vị trí công việc" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Vị trí công việc</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Theo dõi các vị trí trong doanh nghiệp</p>
                                <Link onClick={() => setDiv(9)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                        </div>
                        <div className={`${styles.t_body_hd_top_1_r_b}`}>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/quy_trinh_dao_tao.svg" alt="Quy trình đào tạo" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Quy trình đào tạo</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Xây dựng quy trình đào tạo cho nhân viên</p>
                                <Link onClick={() => setDiv(10)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/so_do_to_chuc.svg" alt="Sơ đồ tổ chức" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Sơ đồ tổ chức</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Cơ cấu tổ chức, sơ đồ cơ cấu chức vụ của doanh nghiệp</p>
                                <Link onClick={() => setDiv(11)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/bao_cao_nhan_su.svg" alt="Báo cáo nhân sự" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Báo cáo nhân sự</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Quản lý các thống kê nhân viên và tuyển dụng,...</p>
                                <Link onClick={() => setDiv(12)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                        </div>
                        <div className={`${styles.t_body_hd_top_1_r_b}`}>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/cai_dat.svg" alt="Cài đặt" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Cài đặt</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Thiết lập cài đặt chung, phân quyền sử dụng phần mềm cho các cá nhân trong doanh nghiệp</p>
                                <Link onClick={() => setDiv(13)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                            <div className={`${styles.t_body_hd_top_1_c}`}>
                                <img src="/da_xoa.svg" alt="Dữ liệu đã xóa" />
                                <p className={`${styles.t_body_hd_top_1_c_p_1}`}>Dữ liệu đã xóa</p>
                                <p className={`${styles.t_body_hd_top_1_c_p_2}`}>Quản lý các dữ liệu đã bị xoá, trong vòng 5 ngày kể từ thời điểm xoá doanh nghiệp có thể khôi phục lại dữ liệu</p>
                                <Link onClick={() => setDiv(14)} to="content" smooth={true} duration={500}>Xem hướng dẫn</Link>
                            </div>
                        </div>
                        <p id='content'></p>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 1 ? "block" : "none" }} >
                            <p><span><span>Để xây dựng quy trình tuyển dụng với các giai đoạn tuyển dụng khác nhau thì bạn sẽ lựa chọn mục “Thêm quy trình tuyển dụng” để tạo dữ liệu tuyển dụng cho công ty mình.</span></span></p>
                            <div style={{ textAlign: "center" }}>
                                <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                    <img alt="" height="812" src="/quy_trinh_1.png" width="960" />
                                    <figcaption>Thêm quy trình tuyển dụng</figcaption>
                                </figure>
                            </div>
                            <p>&nbsp;</p>
                            <p dir="ltr"><span><span>Hệ thống sẽ hiển thị một mẫu xây dựng quy trình tuyển dụng với các trường thông tin khác nhau. Bạn cần điền thông tin vào các trường đó để tạo ra một quy trình hoàn chỉnh.&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>Ví dụ:</span></span></p>
                            <ul dir="ltr">
                                <li><span><span>Tên quy trình: Tuyển nhân viên kinh doanh</span></span></li>
                                <li><span><span>Đối tượng áp dụng: Nhân viên kinh doanh</span></span></li>
                                <li><span><span>Tên giai đoạn: Nộp hồ sơ ứng tuyển</span></span></li>
                                <li><span><span>Bộ phận đảm nhận: Nhân sự</span></span></li>
                                <li><span><span>Mục tiêu: Chọn lọc được những hồ sơ phù hợp và đạt tiêu chuẩn dựa trên bản mô tả công việc.</span></span></li>
                                <li><span><span>Thời gian định lượng: 1/7/2021 - 30/9/2021</span></span></li>
                            </ul>
                            <p dir="ltr"><span><span>(Riêng với mục thời gian định lượng là mục thông tin không bắt buộc, do vậy mà bạn có thể không nhất thiết phải điền thông tin này. Tuỳ theo nhu cầu tuyển dụng của công ty mà có thể đề ra thời gian định lượng tương ứng sao cho phù hợp nhất).</span></span></p>
                            <p dir="ltr"><span><span>Mô tả công việc: Điền bản mô tả công việc cần thực hiện cho giai đoạn nộp hồ sơ đang được xây dựng trong quy trình tuyển dụng.</span></span></p>
                            <ul dir="ltr">
                                <li><span><span>Đăng tin tuyển dụng trên các kênh để tiếp cận ứng viên một cách tối đa.</span></span></li>
                                <li><span><span>Tổng hợp các hồ sơ ứng viên đã gửi về.</span></span></li>
                                <li><span><span>Tiến hành sàng lọc hồ sơ để chọn lựa những ứng viên phù hợp và có tiềm năng.</span></span></li>
                            </ul>
                            <p dir="ltr"><span><span>Ngoài ra, nếu như bạn xây dựng quy trình tuyển dụng với nhiều giai đoạn khác nhau thì việc thêm các giai đoạn sẽ được thực hiện bằng cách chọn “Thêm mới giai đoạn” ngay trên mục “Thêm” của quy trình tuyển dụng đang được xây dựng.</span></span></p>
                            <div style={{ textAlign: "center" }}>
                                <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                    <img alt="" height="812" src="/quy_trinh_2.png" width="960" />
                                    <figcaption>Thêm quy trình tuyển dụng</figcaption>
                                </figure>
                            </div>
                            <div>
                                <p dir="ltr"><span><span>Còn trong trường hợp bạn muốn “Thêm mới giai đoạn” sau khi đã xây dựng xong tên quy trình và giai đoạn đầu của quy trình tuyển dụng đó thì cần lựa chọn “Thêm giai đoạn tuyển dụng” ở ngay phía trên giai đoạn đầu mà bạn đã tạo hoàn chỉnh và tiến hành điền các thông tin tương tự như việc xây dựng quy trình và giai đoạn 1 ban đầu.</span></span></p>

                                <p dir="ltr"><span><span>Mỗi một giai đoạn khi hoàn thành bạn đều có thể thực hiện việc chỉnh sửa hay xóa theo nhu cầu của mình. Lựa chọn biểu tượng ba chấm bên phải màn hình và chọn “Chỉnh sửa” hoặc “Xóa” giai đoạn tuyển dụng.</span></span></p>

                                <p dir="ltr"><span><span>Để thêm một quy trình tuyển dụng mới thì bạn chỉ cần chọn “Thêm quy trình tuyển dụng” và thực hiện lại các bước theo hướng dẫn trên.</span></span></p>

                                <div>&nbsp;</div>
                            </div>
                            <div>&nbsp;</div>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 2 ? "block" : "none" }}>
                            <p dir="ltr"><span><span>Khi đã hoàn thiện được quy trình tuyển dụng cho từng vị trí cần thiết trong công ty thì bạn có thể tiến hành việc thực hiện tuyển dụng. Tuy nhiên, trước đó, việc đầu tiên mà bạn cần làm chính là “Thêm tin tuyển dụng mới”.</span></span></p>
                            <p dir="ltr"><span><span>Khi lựa chọn mục “Thêm tin tuyển dụng mới”, hệ thống sẽ hiển thị ra biểu mẫu tạo tin tuyển dụng cho bạn. Việc của bạn là điền đầy đủ thông tin vào các trường thông tin tương ứng để hoàn chỉnh về tin tuyển dụng của mình. (Ví dụ ảnh mô tả bên dưới).</span></span></p>
                            <div style={{ textAlign: "center" }}>
                                <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                    <img alt="" height="812" src="/thuc_hien_tuyen_dung_1.png" width="960" />
                                    <figcaption>Thêm tin tuyển dụng (ảnh 1)</figcaption>
                                </figure>
                            </div>
                            <div>
                                <div style={{ textAlign: "center" }}>
                                    <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                        <img alt="" height="812" src="/thuc_hien_tuyen_dung_2.png" width="960" />
                                        <figcaption>Thêm tin tuyển dụng (ảnh 2)</figcaption>
                                    </figure>
                                </div>
                                <p dir="ltr"><span><span>Mã quy trình tuyển dụng áp dụng là mục lựa chọn. Đây chính là những quy trình tuyển dụng với các giai đoạn mà bạn đã xây dựng ở phần đầu tiên trong quản lý tuyển dụng. Tuỳ thuộc vào vị trí tuyển dụng mà bạn sẽ lựa chọn quy trình tương ứng trong trường hợp bạn có nhiều quy trình khác nhau.</span></span></p>
                                <p dir="ltr"><span><span>Khi đã hoàn thiện được các thông tin cơ bản thì bạn sẽ tiến hành cung cấp thông tin của người chịu trách nhiệm tuyển dụng. Các thông tin bao gồm: Tên người liên hệ, Địa chỉ liên hệ, Số điện thoại và Email liên hệ.&nbsp;</span></span></p>
                                <p dir="ltr"><span><span>Tiếp đến, bạn sẽ cần lựa chọn lĩnh vực hoạt động của công ty dựa trên những danh mục mà hệ thống cung cấp. Viết mô tả giới thiệu về công ty mình để ứng viên có thể nắm bắt khi đọc tin tuyển dụng của công ty. Một vài lưu ý khi viết giới thiệu công ty như sau:</span></span></p>
                                <p dir="ltr"><span><span>- Số từ: &gt;100 từ</span></span></p>
                                <p dir="ltr"><span><span>- Nội dung cần hướng tới:</span></span></p>
                                <p dir="ltr" style={{ textAlign: "justify", marginLeft: 40 }}><span><span>+ Giới thiệu chung về công ty.</span></span></p>
                                <p dir="ltr" style={{ textAlign: "justify", marginLeft: 40 }}><span><span>+ Đặc điểm nhân lực.</span></span></p>
                                <p dir="ltr" style={{ textAlign: "justify", marginLeft: 40 }}><span><span>+ Nhu cầu tuyển dụng nhân sự.</span></span></p>
                                <p dir="ltr" style={{ textAlign: "justify", marginLeft: 40 }}><span><span>+ Các vị trí thường xuyên tuyển dụng.</span></span></p>
                                <p dir="ltr" style={{ textAlign: "justify", marginLeft: 40 }}><span><span>+ Quy trình tuyển dụng.</span></span></p>
                                <p dir="ltr" style={{ textAlign: "justify", marginLeft: 40 }}><span><span>+ Quyền lợi làm việc của người lao động tại công ty.</span></span></p>
                                <p dir="ltr"><span><span>- Cần viết tối ưu nội dung và không sửa trong phần tên công ty.</span></span></p>
                                <p dir="ltr"><span><span>Cuối cùng, bạn sẽ lựa chọn mục hiển thị tin tuyển dụng của mình trên nền tảng mong muốn. Với việc tạo tin tuyển dụng trên phần mềm Quản trị nhân sự 365 thì tin tuyển dụng sẽ có thể được đăng tải trên website của timviec365.vn, website timviec365.com và Fanpage của timviec365. Bạn có thể lựa chọn hiển thị tin ở 1 trong 3 nền tảng này hoặc có thể lựa chọn cả 3. Tùy theo nhu cầu, sự định hướng trong quá trình tuyển dụng mà bạn đưa ra lựa chọn nền tảng tiếp cận ứng viên phù hợp với công ty mình.&nbsp;</span></span></p>
                                <p dir="ltr"><span><span>Đối với các thông tin được gắn dấu * thì bạn sẽ bắt buộc phải hoàn thiện và cung cấp thông tin. Nếu không, việc tạo tin tuyển dụng sẽ không được tiến hành. Sau khi đã hoàn chỉnh biểu mẫu trên thì bạn chọn “Thêm” để tạo tin tuyển dụng.&nbsp;</span></span></p>
                                <p dir="ltr">
                                    <span>
                                        <span>
                                            Tin tuyển dụng của bạn sau khi được tạo sẽ hiển thị ở chế độ mở và bạn có thể theo dõi dữ liệu ứng viên thông qua phần Tổng quan. Mỗi một tin tuyển dụng thì sẽ có số liệu thống kê chi tiết ở bên dưới, bao gồm: Ứng viên nộp hồ sơ, ứng viên phỏng vấn, ứng viên bị loại và ứng viên thử việc.
                                            <br></br>
                                            Với phần thông tin bên phía tay phải màn hình chính là thông tin chung về Tổng số ứng viên. Đó là số ứng viên được cập nhật theo các mốc thời gian là trong ngày, trong tuần và trong tháng. Điều này giúp bạn có thể nắm bắt chính xác hơn về tổng số ứng viên quan tâm tới tin tuyển dụng của bạn.
                                            <br />
                                            Nếu bạn muốn thêm tin tuyển dụng mới thì bạn chỉ cần nhấp chuột, chọn Tin tuyển dụng , sau đó chọn Thêm tin tuyển dụng và thực hiện lại các bước như trên là hoàn thành.
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 3 ? "block" : "none" }} >
                            <p dir="ltr">&nbsp;</p>
                            <p dir="ltr"><span><span>Đây sẽ là phần giúp bạn có thể thống kê lại toàn bộ ứng viên đã nộp hồ sơ cũng như ứng tuyển vào công ty thông qua tin tuyển dụng mà bạn đã tạo và đăng tải trước đó.&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>Những ứng viên nhận việc, Trượt (trượt vòng loại hồ sơ, trượt phỏng vấn, trượt học việc), Huỷ (Huỷ phỏng vấn, huỷ nhận việc, huỷ học việc), ứng viên Ký hợp đồng,... đều sẽ được liệt kê chi tiết và rõ ràng.</span></span></p>
                            <div style={{ textAlign: "center" }}>
                                <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                    <img alt="" height="812" src="/danh_sach_ung_vien_1.png" width="960" />
                                    <figcaption>Danh sách ứng viên</figcaption>
                                </figure>
                            </div>
                            <div>
                                <p dir="ltr"><span><span>Tuy nhiên, trước đó, bạn sẽ cần bổ sung dữ liệu ứng viên vào trong hệ thống phần mềm Quản lý tuyển dụng của mình. Dữ liệu ứng viên của bạn sẽ có thông qua 2 nguồn. Nguồn thứ nhất chính là nhập thông tin các ứng viên bạn có được thông qua các kênh tuyển dụng khác, nguồn thứ 2 chính là những ứng viên đã ứng tuyển thông qua tin tuyển dụng được thực hiện ở phần “Thực hiện tuyển dụng” bên trên của bạn. Với nguồn thông tin ứng viên thứ 2 này thì bạn sẽ không cần phải nhập thông tin ứng viên nữa, bởi đã có sẵn trong hệ thống khi ứng viên nộp hồ sơ qua tin tuyển dụng bạn đăng tải thông qua phần mềm Quản trị nhân sự 365.</span></span></p>
                                <p dir="ltr"><span><span>Với việc bổ sung dữ liệu ứng viên thông qua cách nhập thông tin ứng viên thì bạn sẽ tiến hành như sau:</span></span></p>
                                <p dir="ltr"><span><span>- Chọn “Thêm ứng viên” và hệ thống sẽ hiển thị ra các trường thông tin mà bạn cần nhập để tạo dữ liệu ứng viên trên phần mềm.&nbsp;</span></span></p>
                                <p dir="ltr"><span><span>- Tiến hành điền thông tin theo biểu mẫu hệ thống cung cấp. Thông tin gắn dấu * sẽ là thông tin bắt buộc phải hoàn thiện và không được bỏ trống. (Ví dụ như hình ảnh minh họa dưới đây).</span></span></p>
                                <div style={{ textAlign: "center" }}>
                                    <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                        <img alt="" height="812" src="/them_ung_vien.png" width="960" />
                                        <figcaption>Thêm ứng viên (ảnh 1)</figcaption>
                                    </figure>
                                </div>
                                <div>
                                    <div style={{ textAlign: "center" }}>
                                        <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                            <img alt="" height="812" src="/them_ung_vien_2.png" width="960" />
                                            <figcaption>Thêm ứng viên (ảnh 2)</figcaption>
                                        </figure>
                                    </div>
                                    <p dir="ltr"><span><span>Đối với việc đánh giá hồ sơ ứng viên thì số sao sẽ là trung bình cộng của các kỹ năng, dựa trên đánh giá về kỹ năng thì bạn sẽ đưa ra sự đánh giá về hồ sơ ứng viên một cách kỹ lưỡng nhất.&nbsp;</span></span></p>
                                    <p dir="ltr"><span><span>Về phần kỹ năng, bạn có thể tiến hành thêm bằng cách chọn “Thêm kỹ năng” ở dưới hoặc có thể xóa kỹ năng với việc nhấp chuột vào icon hình tròn có chữ X ở giữa. Việc điều chỉnh dễ dàng này sẽ giúp bạn có thể thuận tiện trong việc thêm, bớt kỹ năng sao cho phù hợp với ứng viên.</span></span></p>
                                    <p dir="ltr"><span><span>Ở phần cuối phía bên trái của biểu mẫu thì bạn sẽ có mục “Tải lên tệp CV”. Việc tải CV của ứng viên lên sẽ giúp bạn có thể thuận tiện hơn khi xem xét hồ sơ ứng viên. bao gồm thông tin cá nhân và thông tin về năng lực, kinh nghiệm làm việc.</span></span></p>
                                    <p dir="ltr"><span><span>Sau khi đã điền đủ các thông tin theo yêu cầu thì bạn cần chọn “Thêm” để tải dữ liệu ứng viên lên hệ thống.</span></span></p>
                                    <p dir="ltr"><span><span>Thực hiện tương tự với các ứng viên khác mà bạn cần nhập thông tin như trên. Những ứng viên đã có thông tin đầy đủ sẽ hiển thị tại bảng “Nhận hồ sơ ứng viên bên dưới”.</span></span></p>
                                    <p dir="ltr"><span><span>Phần mềm Quản trị nhân sự 365 sẽ giúp bạn dễ dàng hơn trong việc sàng lọc ứng viên khi cung cấp công cụ tìm kiếm và phân loại ứng viên tương ứng. Bạn chỉ cần nhập tên ứng viên tương ứng cho vị trí tuyển dụng mình đang xét, lựa chọn người chịu trách nhiệm tuyển dụng, giới tính của ứng viên và trạng thái, các thông tin sau đó sẽ được hiển thị vào bảng được cung cấp bên dưới.</span></span></p>
                                    <p dir="ltr"><span><span>Bạn có thể tiến hành việc thêm giai đoạn dựa trên mục đích cũng như quy trình tuyển dụng mà công ty đã xây dựng. Chọn “Thêm giai đoạn” và điền tên của Giai đoạn cần thêm và tên Giai đoạn trước đó rồi ấn “Thêm”. Lúc này, trong bảng bên dưới sẽ hiển thị thêm giai đoạn mới tương ứng với giai đoạn mà bạn đã thêm vừa rồi.</span></span></p>
                                    <p dir="ltr"><span><span>Ngoài ra, bạn có thể thực hiện việc kéo thả ứng viên vào từng cột giai đoạn tương ứng. Trong trường hợp ứng viên ít thì bạn sẽ dễ dàng điều chỉnh ứng viên một cách nhanh chóng hơn. Khi thực hiện việc chuyển trạng thái ứng viên thì bạn sẽ phải điền thông tin vào biểu mẫu “Chuyển trạng thái” để ứng viên được cập nhật đúng trạng thái hồ sơ của mình. (Như hình ảnh minh họa bên dưới).</span></span></p>
                                    <div style={{ textAlign: "center" }}>
                                        <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                            <img alt="" height="812" src="/chuyen_trang_thai.png" width="960" />
                                            <figcaption>Chuyển trạng thái (ảnh 1)</figcaption>
                                        </figure>
                                    </div>
                                    <div>
                                        <div style={{ textAlign: "center" }}>
                                            <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                                <img alt="" height="812" src="/chuyen_trang_thai_2.png" width="960" />
                                                <figcaption>Chuyển trạng thái (ảnh 2)</figcaption>
                                            </figure>
                                        </div>
                                        <p dir="ltr"><span><span>Lưu ý cho bạn đó là cần hoàn thiện các thông tin đầy đủ, đặc biệt là trường thông tin được gắn dấu *. Điều này sẽ ảnh hưởng tới việc hệ thống có chạy và lưu trữ thông tin ứng viên mà bạn đã chuyển hay không.&nbsp;</span></span></p>
                                        <p dir="ltr"><span><span>Khi bạn chuyển trạng thái ứng viên thành công và muốn xem chi tiết về hồ sơ ứng viên thì chỉ cần click chuột vào biểu tượng dấu “...” được hiển thị bên cạnh tên ứng viên đó, lựa chọn “Xem chi tiết”. Lúc này, hệ thống sẽ hiển thị thông tin một cách cực kỳ chi tiết về ứng viên, bao gồm thông tin ứng viên, thông tin tuyển dụng, quá trình tuyển dụng và giai đoạn chuyển. Ở phía bên phải màn hình chính là CV của ứng viên. Tất cả đều được cập nhật vô cùng chi tiết và rõ ràng.&nbsp;</span></span></p>
                                        <p dir="ltr"><span><span>Còn trong trường hợp bạn muốn xóa hồ sơ của ứng viên ở giai đoạn nào đó thì thao tác cũng sẽ tương tự như việc xem chi tiết hồ sơ. Click vào biểu tượng “...”, lựa chọn “Xóa hồ sơ” popup sẽ hiển thị việc bạn có chắc chắn muốn xóa hồ sơ ứng viên này hay không. Nếu xóa thì sẽ chọn “Xóa”, còn không sẽ lựa chọn “Hủy”.&nbsp;</span></span></p>
                                        <p dir="ltr"><span><span>Ngoài ra, nếu như bạn muốn có file excel thì có thể chọn mục “Xuất file Excel” để nhận được file phân loại ứng viên của mình. Các file Excel sẽ được xuất ra theo từng giai đoạn mà bạn lựa chọn. Từ Nhận hồ sơ, Phỏng vấn, trượt, Hủy, Nhận việc, Ký hợp đồng,... Lựa chọn giai đoạn tương ứng và chọn “Xuất file Excel” là bạn đã có được danh sách ứng viên file Excel chỉ trong tích tắc.</span></span></p>
                                        <p dir="ltr"><span><span>Trong trường hợp bạn muốn xuất file excel danh sách ứng viên theo thời gian và giai đoạn được tìm kiếm qua thanh search thì chỉ cần lựa chọn khoảng thời gian cần có danh sách (ví dụ 1/09/2021 - 10/09/2021), lựa chọn giai đoạn (ví dụ nhận hồ sơ) rồi ấn tìm kiếm. Hệ thống sẽ trả bạn kết quả tương ứng với danh sách những ứng viên nằm trong giai đoạn nhận hồ sơ và trong khoảng thời gian được thiết lập. Bạn chọn tiếp “Xuất file Excel” để lấy danh sách cho mình.</span></span></p>
                                        <p dir="ltr"><span><span>Bên cạnh danh sách ứng viên thì mục Kho ứng viên sẽ là nơi lưu trữ tất cả thông tin ứng viên của bạn. Những ứng viên đã nộp hồ sơ ứng tuyển hay được bạn nhập thông tin đều sẽ được lưu trữ dữ liệu tại đây. Bạn có thể tìm kiếm nhanh ứng viên mình muốn thông qua thanh công cụ search bên trên. Còn bảng bên dưới chính là bảng hiển thị toàn bộ ứng viên mà công ty bạn có được thông qua các đợt tuyển dụng.&nbsp;</span></span></p>
                                        <p dir="ltr"><span><span>Khi thực hiện tìm kiếm ứng viên thông qua thanh search thì bạn có thể tìm kiếm theo thời gian (lựa chọn 2 mốc thời gian giống nhau), theo khoảng thời gian (lựa chọn 2 mốc thời gian khác nhau), tìm kiếm theo giới tính (lựa chọn giới tính nam/ nữ/ giới tính khác), tìm theo vị trí tuyển dụng (vị trí ứng tuyển) hoặc tìm theo tên. Các trường thông tin trong thanh search là không bắt buộc, vì thế không nhất thiết phải điền tất cả thông tin trong thanh search đó. Dựa trên nhu cầu tìm ứng viên ở đối tượng nào thì việc điền thông tin tra cứu sẽ có sự tương ứng trên công cụ tìm kiếm. Sau đó nhấp chuột vào biểu tượng tìm kiếm, hệ thống sẽ trả lại kết quả danh sách ứng viên tương ứng theo thông tin tìm kiếm.</span></span></p>
                                        <div style={{ textAlign: "center" }}>
                                            <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                                <img alt="" height="812" src="/kho_ung_vien.png" width="960" />
                                                <figcaption>Kho ứng viên</figcaption>
                                            </figure>
                                        </div>
                                        <div>
                                            <p dir="ltr"><span><span>Với phần mềm Quản trị nhân sự 365, việc tuyển dụng đã trở nên đơn giản và dễ dàng hơn cho các công ty cũng như các nhà tuyển dụng. Từ khâu lên quy trình, thực hiện tuyển dụng cho tới việc sàng lọc và nắm bắt danh sách ứng viên. Tất cả đều được tiến hành với các thao tác vô cùng đơn giản, dễ thực hiện và đạt được độ chính xác cần có.</span></span></p>
                                            <div>&nbsp;</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 4 ? "block" : "none" }}>
                            <p dir="ltr">Khen thưởng sẽ là mục thống kê lại những giải thưởng dành cho cá nhân, tập thể có hoạt động tốt mà công ty, doanh nghiệp đã công nhận. Khi click vào Khen thưởng của mục Lương thưởng và phúc lợi, giao diện sẽ hiển thị 3 danh mục chính bạn cần quan tâm là Cá nhân, Tập thể và Danh sách thành tích.</p>
                            <h2><span><span>1.1. Cá nhân</span></span></h2>
                            <p dir="ltr">Ở danh mục cá nhân, đây sẽ là phần thống kê lại toàn bộ các cá nhân được công ty khen thưởng. Để tiến hành cập nhật dữ liệu mới về cá nhân được khen thưởng thì bạn sẽ tiến hành như sau:</p>
                            <p dir="ltr">- Lựa chọn “Thêm mới” nằm ngay dưới mục Cá nhân. Hệ thống sẽ hiển thị giao diện biểu mẫu thêm thành tích để điền thông tin của cá nhân được khen thưởng.</p>
                            <div>
                                "&nbsp;"
                                <div style={{ textAlign: "center" }}>
                                    <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                        <img alt="" height="812" src="/khen_thuong_1.png" width="960" />
                                        <figcaption>Thêm thành tích cá nhân</figcaption>
                                    </figure>
                                </div>
                            </div>
                            <div>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Điền đầy đủ các thông tin được gắn dấu * trong biểu mẫu. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>+ Số quyết định: Đây sẽ là số quyết định dựa trên phần mềm Văn thư 365. Nếu các quyết định chung trên văn thư là số 6 thì số quyết định khen thưởng này sẽ là số 7. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>+ Nội dung khen thưởng: Ghi rõ nội dung khen thưởng của cá nhân đó, khen thưởng về vấn đề gì,... </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>+ Người ký quyết định: Chọn tên người có quyền ký quyết định khen thưởng cho cá nhân này. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>+ Thời điểm: Lựa chọn thời gian khen thưởng cho cá nhân. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>+ Hình thức khen thưởng: Lựa chọn hình thức khen thưởng được hệ thống cập nhật. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>+ Danh hiệu: Ghi rõ danh hiệu cá nhân được khen thưởng. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>+ Cấp khen: Cấp độ khen thưởng nhân viên nhận được (cấp công ty, cấp phòng ban,...). </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Sau khi hoàn tất, lựa chọn “Thêm” để hệ thống cập nhật dữ liệu cá nhân được khen thưởng. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Tương tự các thao tác trên bạn sẽ tiến hành nhập thông tin những cá nhân được khen thưởng trong công ty vào hệ thống dữ liệu phần mềm. Các cá nhân được khen thưởng sẽ được hiển thị danh sách ở bảng bên dưới với các trường thông tin như: Số thứ tự, Số quyết định, Nội dung khen thưởng, Tên đối tượng nhận thưởng, Thời điểm, Hình thức khen thưởng, Danh hiệu và cấp khen.</span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Để thực hiện chỉnh sửa nội dung khen thưởng của cá nhân thì bạn sẽ chọn vào biểu tượng dấu ba chấm nằm ở cột cuối cùng của cá nhân đó, click vào chỉnh sửa và tiến hành chỉnh sửa nội dung mong muốn trên biểu mẫu được hiển thị. Khi chỉnh sửa xong bạn sẽ chọn “Cập nhật” để lưu thông tin mới. Còn nếu muốn xóa thì bạn chỉ cần chọn dấu ba chấm, chọn “Xóa” để tiến hành xóa dữ liệu về nhân viên khen thưởng trong danh sách. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Thanh tìm kiếm sẽ giúp bạn dễ dàng hơn trong việc tra cứu khen thưởng của nhân viên nào đó trong công ty. Chỉ cần nhập nội dung khen thưởng vào mục tìm kiếm và click vào biểu tượng chiếc kính. Hệ thống sẽ trả lại kết quả tương ứng cho bạn trong danh sách phía dưới. </span></span></span></span></p>
                                <div>
                                    <h2 dir="ltr"><span><span>1.2. Tập thể</span></span></h2>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Khi cập nhật dữ liệu khen thưởng dành cho tập thể thì bạn sẽ chọn “Thêm mới”. Hệ thống sẽ hiển thị pop-up là biểu mẫu thông tin cần điền.</span></span></span></span></p>
                                    <div style={{ textAlign: "center" }}>
                                        <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                            <img alt="" height="812" src="/khen_thuong_2.png" width="960" />
                                            <figcaption>Thêm thành tích tập thể</figcaption>
                                        </figure>
                                    </div>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Số quyết định: Theo số quyết định dựa trên văn thư. Đây sẽ là số tiếp theo của quyết định gần nhất được ban hành.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Nội dung khen thưởng: Ghi rõ ràng về nội dung khen thưởng dành cho tập thể.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Tên phòng ban: Lựa chọn phòng ban trong công ty được khen thưởng.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Người ký quyết định: Lựa chọn người có quyền ký quyết định khen thưởng đối với tập thể trong công ty. Hệ thống sẽ cho phép bạn lựa chọn thành viên trong ban lãnh đạo dựa trên dữ liệu nhân viên được cung cấp.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Thời điểm: Lựa chọn thời gian khen thưởng.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Hình thức khen thưởng:</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Danh hiệu: Ghi rõ danh hiệu khen thưởng mà tập thể nhận được.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Cấp khen: Cấp độ tập thể nhận được khen thưởng.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Khi đã hoàn thiện hết các thông tin thì bạn sẽ chọn “Thêm” để lưu trữ dữ liệu. Thông tin khen thưởng của tập thể sẽ được cập nhật và hiển thị ở danh sách phía bên dưới với dạng bảng. Các trường thông tin trong bảng sẽ bao gồm: Số thứ tự, Số quyết định, Nội dung khen thưởng, Tên đối tượng nhận thưởng, Thời điểm, Hình thức khen thưởng, Danh hiệu và Cấp khen. Phần cuối cùng của bảng sẽ có biểu tượng dấu ba chấm xuất hiện tại mỗi thông tin khen thưởng khác nhau. Đây là phần bạn có thể thực hiện việc chỉnh sửa hay xóa thông tin khen thưởng cho tập thể trong công ty.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Cũng giống với khen thưởng cá nhân, với khen thưởng tập thể, bạn có thể thực hiện việc tra cứu nhanh với thanh công cụ tìm kiếm. Nhập nội dung khen thưởng và ấn tìm kiếm, kết quả sẽ được hệ thống trả lại ngay sau đó.</span></span></span></span></p>
                                    <h2 dir="ltr"><span><span>1.3. Danh sách thành tích</span></span></h2>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Danh sách thành tích chính là mục tổng hợp lại các thành tích trong công ty, doanh nghiệp. Bao gồm thành tích của các cá nhân và thành tích  của tập thể. Tất cả sẽ được hiển thị trong bảng danh sách bên dưới.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Bảng thành tích sẽ gồm những cột thông tin như sau: Số thứ tự, Số quyết định, Nội dung khen thưởng, Tên đối tượng nhận thưởng, Thời điểm, Hình thức khen thưởng, Danh hiệu, Cấp khen. Việc xây dựng bảng thành tích như vậy sẽ giúp công ty có thể dễ dàng nắm bắt cũng như tra cứu thông tin một cách dễ dàng và đầy đủ hơn.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Để tìm kiếm nhanh trong Danh sách khen thưởng thì bạn chỉ cần nhập nội dung khen thưởng vào ô tìm kiếm, chọn tìm kiếm và hệ thống sẽ trả kết quả tương ứng bên dưới.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Chỉ với các thao tác đơn giản, việc bổ sung thông tin khen thưởng trong công ty đã được thực hiện một cách nhanh chóng. Đây chính là ưu điểm mà phần mềm Quản trị nhân sự 365 muốn các công ty, doanh nghiệp hiểu rõ cũng như mang lại trải nghiệm tốt hơn trong vấn đề nội bộ của công ty, doanh nghiệp mình.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Để hiểu rõ ràng và chi tiết hơn về phần mềm cũng như tính năng khen thưởng, bạn có thể sử dụng tài khoản nhân viên được cung cấp dưới đây để tự mình khảo nghiệm.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>User: hunghatv365@gmail.com</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Mk: timviec365</span></span></span></span></p>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 5 ? "block" : "none" }}>
                            <p dir="ltr">Mỗi công ty, doanh nghiệp đều sẽ có nội quy riêng để đảm bảo sự ổn định cho môi trường làm việc cũng như văn hóa làm việc trong công ty. Vì thế mà việc một số cá nhân hay tập thể vi phạm kỷ luật cũng có thể xảy ra. Việc cập nhật và lưu trữ dữ liệu này sẽ giúp công ty có thể kiểm soát và quản lý tốt hơn.</p>
                            <h2><span><span>1.1. Cá nhân</span></span></h2>
                            <p dir="ltr">Đối với kỷ luật cá nhân thì để cập nhật dữ liệu bạn sẽ chọn “Thêm mới” và hoàn thiện biểu mẫu điền thông tin được hiển thị ngay sau đó.</p>

                            <div>
                                "&nbsp;"
                                <div style={{ textAlign: "center" }}>
                                    <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                        <img alt="" height="812" src="/vi_pham_1.png" width="960" />
                                        <figcaption>Thêm mới vi phạm cá nhân</figcaption>
                                    </figure>
                                </div>
                            </div>
                            <div>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Tên lỗi vi phạm: Ghi rõ tên lỗi mà cá nhân đã vi phạm. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Căn cứ quy định: Điền rõ nhóm quyết định tương ứng với tên lỗi vi phạm mà cá nhân mắc phải. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Số quy định xử lý vi phạm: Ghi rõ số của quyết định trên. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Thời gian vi phạm: Chọn thời gian cá nhân đã vi phạm và bị kỷ luật. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Hình thức xử lý sai phạm: Điền rõ hình thức xử lý đối với sai phạm của cá nhân đó. Tùy từng công ty, doanh nghiệp sẽ có hình thức xử lý khác nhau với mỗi vi phạm khác nhau của cá nhân. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Cá nhân vi phạm: Lựa chọn tên cá nhân đã có hành vi vi phạm. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Người ký quyết định: Lựa chọn người có quyền ký quyết định xử lý vi phạm với cá nhân đó. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Lưu ý, những thông tin trên đều gắn dấu * và là thông tin bắt buộc. Do vậy bạn cần điền đầy đủ sau đó chọn “Thêm” để hệ thống cập nhật và lưu trữ dữ liệu về vi phạm của cá nhân. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Với thao tác tương tự, bạn sẽ cập nhật dữ liệu vi phạm của cá nhân trong công ty. Dữ liệu sau khi được cập nhật sẽ hiển thị danh sách trong bảng bên dưới. Các thông tin của bảng bao gồm: STT, Lỗi vi phạm, Căn cứ quy định, Số QĐ xử lý, Thời gian vi phạm, Người ký quyết định, Hình thức xử lý sai phạm, Cá nhân vi phạm, cuối cùng là biểu tượng dấu ba chấm ở mỗi dòng thông tin của cá nhân vi phạm. </span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Biểu tượng ba chấm cho phép bạn thực hiện việc chỉnh sửa hoặc xóa thông tin vi phạm của cá nhân nào đó. Vì thế, chỉ cần di chuyển tới biểu tượng ba chấm, chọn “Chỉnh sửa” để điều chỉnh thông tin hoặc chọn “Xóa” để xóa thông tin vi phạm của cá nhân.</span></span></span></span></p>
                                <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Ngoài ra, thanh công cụ tìm kiếm sẽ giúp bạn tra cứu nhanh hơn về thông tin cá nhân bị kỷ luật hay có vi phạm. Nhập tên lỗi vi phạm, ấn tìm kiếm, bạn sẽ nhận được luôn kết quả tương ứng. </span></span></span></span></p>
                                <div>
                                    <h2 dir="ltr"><span><span>1.2. Tập thể</span></span></h2>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Tương tự như cá nhân, để thêm dữ liệu về những vi phạm của tập thể trong công ty thì bạn cần tiến hành chọn “Thêm mới” và hệ thống sẽ hiển thị biểu mẫu điền thông tin trên màn hình.</span></span></span></span></p>
                                    <div style={{ textAlign: "center" }}>
                                        <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                            <img alt="" height="812" src="/vi_pham_2.png" width="960" />
                                            <figcaption>Thêm mới vi phạm tập thể</figcaption>
                                        </figure>
                                    </div>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Nhập tên lỗi vi phạm mà tập thể mắc phải.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Căn cứ quy định: Nhập quy định tương ứng với lỗi vi phạm mà tập thể đã mắc.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Số quy định xử lý vi phạm: Ghi rõ số của quy định được áp dụng bên trên,</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Thời gian vi phạm: Chọn thời gian tập thể mắc sai phạm.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Hình thức xử lý sai phạm: Ghi rõ hình thức xử lý với tập thể vi phạm dựa trên quy định của từng công ty, doanh nghiệp.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Tập thể vi phạm: Lựa chọn phòng ban (tập thể) mắc sai phạm.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>- Người ký quyết định: Lựa chọn người có thẩm quyền ký quyết định xử lý vi phạm của tập thể.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Sau khi đã điền đầy đủ các thông tin trên thì bạn sẽ chọn “Thêm” và hệ thống sẽ lưu trữ dữ liệu bạn vừa nhập vào bảng bên dưới. Việc thêm dữ liệu vi phạm của các tập thể khác sẽ được thực hiện tương tự các thao tác trên.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Danh sách các tập thể mắc vi phạm sẽ được cập nhật vào bảng bên dưới với các cột thông tin là Số thứ tự, Lỗi vi phạm, Căn cứ quy định, Số QĐ xử lý, Thời gian vi phạm, Người ký quyết định, Hình thức xử lý sai phạm, Phòng ban vi phạm.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Để thực hiện việc chỉnh sửa thông tin hay xóa thông tin của tập thể vi phạm trong danh sách thì bạn chỉ cần di chuột tới dấu ba chấm nằm ở cuối hàng của tập thể tương ứng.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Lựa chọn “Chỉnh sửa” để sửa lại thông tin vi phạm hoặc “Xóa” để xóa dữ liệu vi phạm của tập thể đó.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Tìm kiếm nhanh lỗi vi phạm của tập thể trong dữ liệu vi phạm tập thể trên hệ thống thì bạn sẽ nhập “Tên lỗi vi phạm” chọn biểu tượng chiếc kính. Hệ thống sẽ hiển thị kết quả ở phía bảng bên dưới dựa trên thông tin tìm kiếm được nhập.</span></span></span></span></p>
                                    <h2 dir="ltr"><span><span>1.3. Danh sách vi phạm</span></span></h2>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Là mục tổng hợp và thống kê lại toàn bộ lỗi vi phạm của cá nhân và tập thể trong công ty đã mắc phải. Danh sách này cũng sẽ được hiển thị trong bảng danh sách vi phạm tương ứng với các trường thông tin: Số thứ tự, Lỗi vi phạm, Căn cứ quy định, Số QĐ xử lý, Thời gian vi phạm, Người ký quyết định, Hình thức xử lý sai phạm, Cá nhân/phòng ban vi phạm.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Để thực hiện chỉnh sửa hay xóa thông tin vi phạm của cá nhân/tập thể thì bạn cũng sẽ di chuột tới biểu tượng dấu ba chấm nằm ở cuối thông tin của mỗi vi phạm. Lựa chọn “Chỉnh sửa” hoặc “Xóa” để tiến hành thao tác mong muốn.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Cùng với đó, chỉ cần nhập “tên lỗi vi phạm”, chọn “tìm kiếm” bạn sẽ có thể biết được ngay thông tin về cá nhân/tập thể đã mắc sai phạm với lỗi tương ứng. Đây chính là tiện ích lớn từ thanh công cụ tìm kiếm được cung cấp bên trên danh sách.</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Với việc sử dụng phần mềm Quản trị nhân sự 365, việc cập nhật thông tin kỷ luật trong công ty, doanh nghiệp sẽ trở nên đơn giản và dễ dàng hơn rất nhiều. Các bạn có thể khám phá kỹ hơn về tính năng này với tài khoản nhân viên được cung cấp dưới đây:</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>User: hunghatv365@gmail.com</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Mk: timviec365</span></span></span></span></p>
                                    <p dir="ltr" style={{ lineHeight: 1.38, textAlign: 'justify' }}><span><span><span><span>Hy vọng bạn sẽ có trải nghiệm tuyệt vời với phần mềm Quản trị nhân sự 365.</span></span></span></span></p>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 6 ? "block" : "none" }}>
                            <p>
                                <span>
                                    <span>
                                        Quản lý nhân viên sẽ là tính năng đầu tiên trong mục Quản lý hành chính. Khi bạn nhấp chuột vào chức năng này trong danh mục lựa chọn thì Quản lý nhân viên sẽ ở vị trí đầu tiên. Đây là mục thống kê lại danh sách toàn bộ nhân viên trong công ty bạn.&nbsp;
                                        <br></br>
                                        Các nhân viên sẽ được hiển thị trong bảng với các trường thông tin được cung cấp như: ID nhân viên, Họ và tên, Phòng ban, Giới tính, Trạng thái, Vị trí, Bộ phận, Chi nhánh, Thông tin liên hệ, Ngày vào công ty, Tùy chỉnh (với chức năng xem chi tiết, chỉnh sửa thông tin nhân viên hay xóa nhân viên).
                                        <br></br>
                                        Với việc cung cấp danh sách nhân viên được hiển thị thông tin rõ ràng như vậy sẽ giúp công ty có thể nắm bắt nhanh chóng về sơ bộ của mỗi thành viên trong công ty ở từng phòng ban khác nhau. Đặc biệt, việc xem chi tiết thông tin của từng nhân viên cũng vô cùng đơn giản khi chỉ cần click chuột vào icon răng cưa của cột tùy chỉnh, lựa chọn “Chi tiết”. Lúc này, toàn bộ thông tin của nhân viên sẽ được hiển thị một cách đầy đủ trên màn hình. Để chỉnh sửa thông tin của nhân viên hay thực hiện xóa nhân viên khỏi danh sách thì bạn cũng sẽ thao tác tương tự như với việc xem chi tiết.
                                        <br></br>
                                        Khi lựa chọn “Chỉnh sửa”, hệ thống sẽ hiển thị giao diện biểu mẫu thông tin về nhân viên. Bạn tiến hành chỉnh sửa thông tin mình mong muốn về nhân viên đó, sau đó ấn “Cập nhật” để lưu thông tin của nhân viên sau khi đã chỉnh sửa. Còn nếu như bạn lựa chọn “Xóa” thì hệ thống sẽ hiển thị popup câu hỏi liệu bạn có chắc chắn muốn xóa tài khoản nhân viên này hay không và đưa ra hai lựa chọn “Thoát” - “Xác nhận”. Nếu bạn muốn tiếp tục xóa thì sẽ nhấp chuột chọn “Xác nhận” còn nếu không sẽ chọn “Thoát” để giao diện về ban đầu.
                                        <br></br>
                                        Thêm vào đó, khi bạn muốn tra cứu thông tin của một nhân viên bất kỳ thì ngoài việc tìm ở bộ phận, phòng ban thì bạn có thể tìm ở mục “Tìm kiếm” với icon chiếc kính bằng cách nhập tên nhân viên đó hay bộ phận, phòng ban nhân viên đó làm việc. Hệ thống sẽ trả lại kết quả tương ứng với thông tin mà bạn nhập tìm kiếm một cách cực kỳ nhanh chóng và tiện lợi.
                                        <br></br>
                                        Trong trường hợp bạn muốn thêm mới nhân viên khi công ty có nhân viên mới thì bạn có thể nhấp chuột, chọn mục “Thêm mới nhân viên” nằm ngay phía dưới mục “Danh sách nhân viên”. Lúc này, hệ thống sẽ chuyển tới giao diện Quản lý nhân viên của phần mềm Chấm công 365. Bạn lựa chọn “Thêm nhân viên” nằm ở phía bên tay phải màn hình và tiến hành thao tác nhập thông tin vào trong biểu mẫu được cung cấp. Ở phần này đã có bài hướng dẫn chi tiết, bạn có thể xem bài hướng dẫn để thực hiện việc thêm thông tin của nhân viên mới thành công.
                                        <br></br>
                                        Ngoài ra, các bạn có thể sử dụng tài khoản nhân viên sau đây để có được sự trải nghiệm cũng như hiểu rõ hơn về tính năng Quản lý nhân viên của phần mềm Quản trị nhân sự 365:
                                        <br></br>
                                        User: hunghatv365@gmail.com
                                        <br></br>
                                        Mk: timviec365
                                    </span>
                                </span>
                            </p>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 7 ? "block" : "none" }} >
                            <p dir="ltr"><span><span>Quy định - chính sách sẽ là phần tổng hợp lại những quy định làm việc tại công ty và cách chính sách dành cho nhân viên khi làm việc tại công ty. Khi nhấp chuột vào mục Quy định - chính sách, hệ thống sẽ hiển thị giao diện với 2 đề mục chính là Quy định làm việc và Chính sách nhân viên.</span></span></p>
                            <h2 dir="ltr"><span><span>1.1. Quy định làm việc</span></span></h2>
                            <p dir="ltr"><span><span>Với Quy định làm việc, bạn sẽ tiến hành thêm mới quy định để tạo dữ liệu về quy định làm việc trong công ty. Nhấp vào mục “Thêm mới” sẽ có 2 mục nhỏ đó là “Thêm nhóm quy định” và “Thêm quy định”.&nbsp;</span></span></p>
                            <h3 dir="ltr"><span><span>1.1.1. Thêm nhóm quy định</span></span></h3>
                            <p dir="ltr"><span><span>Lựa chọn Thêm nhóm quy định, hệ thống sẽ hiển thị popup biểu mẫu để bạn thêm thông tin về nhóm quy định làm việc tại công ty. Các thông tin cần có để xây dựng nhóm quy định bao gồm:</span></span></p>
                            <p dir="ltr"><span><span>- Tên nhóm: Ghi rõ tên nhóm quy định cần tạo.</span></span></p>
                            <p dir="ltr"><span><span>- Thời gian bắt đầu hiệu lực: Lựa chọn thời gian nhóm quy định bắt đầu có hiệu lực. Thời gian sẽ được định dạng theo cấu trúc mm/dd/yyyy (tức là tháng/ ngày/ năm).</span></span></p>
                            <p dir="ltr"><span><span>- Người giám sát: Điền tên người chịu trách nhiệm sát về việc tuân thủ nhóm quy định làm việc này. Thường sẽ là nhân viên trong phòng Nhân sự sẽ chịu trách nhiệm này.</span></span></p>
                            <p dir="ltr"><span><span>- Mô tả ngắn: Viết giới thiệu ngắn gọn về nhóm quy định đó, nội dung của nhóm quy định, đối tượng chịu trách nhiệm tuân thủ. nghĩa vụ và trách nhiệm của người giám sát,....</span></span></p>
                            <p dir="ltr"><span><span>Các thông tin này đều được gắn dấu *, vì thế mà để có thể thêm nhóm quy định thành công thì bạn cần hoàn thiện đầy đủ các nội dung của những thông tin trên. Sau khi hoàn thiện biểu mẫu trên thì sẽ chọn “Thêm” để tiến hành thêm nhóm quy định mới thành công.</span></span></p>
                            <p dir="ltr"><span><span>Để thêm nhóm quy định mới thì bạn thực hiện tương tự các bước như trên. Nhóm quy định sau khi được hoàn thiện sẽ được hiển thị ngay bên dưới với mã quy định và tên quy định nằm ở phía bên trái bảng hiển thị. Trong trường hợp bạn muốn xóa nhóm quy định thì chỉ cần nhấp vào biểu tượng thùng rác ở phía bên phải và popup sẽ hiển thị về việc bạn có thực sự muốn xóa hay không. Nếu tiếp tục muốn xóa thì bạn lựa chọn “Xóa”, còn nếu không thì bạn sẽ chọn “Hủy” và hệ thống vẫn sẽ lưu trữ nhóm quy định đó.&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>Chỉ với vài thao tác đơn giản là bạn đã có thể xây dựng được các nhóm quy định làm việc tại công ty trong hệ thống phần mềm Quản trị nhân sự 365.</span></span></p>
                            <h3 dir="ltr"><span><span>1.1.2. Thêm quy định</span></span></h3>
                            <p dir="ltr"><span><span>Tương tự như việc thêm nhóm quy định, khi bạn lựa chọn “Thêm quy định” thì hệ thống cũng sẽ nhảy ra một popup với biểu mẫu thêm thông tin cho quy định cần thêm mới.</span></span></p>
                            <p dir="ltr"><span><span>Những thông tin cần hoàn thiện trong mẫu thêm quy định bao gồm:</span></span></p>
                            <p dir="ltr"><span><span>- Tên quy định: Ghi rõ tên quy định cần thêm là gì.</span></span></p>
                            <p dir="ltr"><span><span>- Chọn nhóm quy định: Lựa chọn nhóm quy định tương ứng với quy định cần thêm. Nhóm quy định được chọn chính là các nhóm quy định mà bạn đã tạo ở bước trên.</span></span></p>
                            <p dir="ltr"><span><span>- Thời gian bắt đầu hiệu lực: Lựa chọn mốc thời gian để quy định bắt đầu có hiệu lực áp dụng trong công ty. Thời gian sẽ có định dạng là mm/dd/yyyy, tức là tháng/ngày/năm theo chuẩn quốc tế. Vì thế mà bạn cần chọn mốc thời gian sao cho chính xác để không bị nhầm lẫn hay sai lệch về việc thi hành quy định làm việc trong công ty.</span></span></p>
                            <p dir="ltr"><span><span>- Người giám sát: Điền tên người chịu trách nhiệm giám sát việc tuân thủ quy định làm việc này trong công ty.</span></span></p>
                            <p dir="ltr"><span><span>- Đối tượng thi hành: Ghi rõ đối tượng có trách nhiệm thi hành quy định này. Ví dụ như toàn thể nhân viên trong công ty hoặc bộ phận kỹ thuật hay bộ phận kinh doanh,...</span></span></p>
                            <p dir="ltr"><span><span>- Nội dung quy định: Ghi rõ và chính xác về nội dung của quy định được thêm. Điều này nhằm đảm bảo nhân viên có thể hiểu đúng và chính xác về quy định để đảm bảo tuân thủ đúng theo quy định được đề ra.</span></span></p>
                            <p dir="ltr"><span><span>Sau khi hoàn thiện các thông tin trên thì bạn sẽ nhấp chuột chọn “Thêm” và tiến hành “Thêm quy định” thành công. Lưu ý là những trường thông tin trên là thông tin bắt buộc (được gắn dấu *), vì thế mà nếu không điền đầy đủ thì bạn sẽ không thể hoàn thiện thao tác Thêm quy định cho công ty.</span></span></p>
                            <p dir="ltr"><span><span>Quy định sau khi được thêm sẽ xuất hiện trong nhóm quy định mà bạn đã thêm tương ứng. Chỉ cần nhấp vào biểu tượng tam giác nằm bên cạnh tên nhóm quy định thì bạn sẽ thấy được các quy định cụ thể trong nhóm đó.&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>Những thông tin được thể hiện gồm: Mã quy định, Tên quy định, Ngày ban hành, Người tạo, Đối tượng áp dụng và phần cuối cùng với biểu tượng thùng rác chính là mục xóa quy định trong trường hợp công ty có sự thay đổi. Để xem chi tiết những quy định được tạo trong nhóm quy định thì bạn chỉ cần nhấp chuột vào mã quy định. Lúc này, nội dung chi tiết của quy định sẽ được hiển thị thông qua popup. Trong trường hợp bạn muốn sửa thì chọn “Sửa” để tiến hành chỉnh sửa nội dung quy định. Còn nếu không thì chọn “Hủy” để kết thúc việc hiển thị chi tiết quy định bên trong.</span></span></p>
                            <p dir="ltr"><span><span>Tương tự như vậy bạn sẽ thêm các nhóm quy định và quy định tương ứng dựa trên định hướng của công ty. Khi bạn đã xây dựng được hoàn thiện về dữ liệu các quy định làm việc trong công ty và muốn tìm kiếm bất kỳ nhóm quy định nào đó thì có thể thực hiện thao tác tìm kiếm nhanh thông qua thanh “Tìm kiếm” với biểu tượng chiếc kính.</span></span></p>
                            <h2 dir="ltr"><span><span>1.2. Chính sách nhân viên</span></span></h2>
                            <p dir="ltr"><span><span>Đối với chính sách nhân viên thì bạn cũng sẽ thao tác tương tự như với Quy định làm việc. Đầu tiên chính là chọn “Thêm mới” để tiến hành nhập dữ liệu chính sách nhân viên trong công ty. Phần thêm mới cũng sẽ được chia thành 2 nội dung chính là: Thêm nhóm chính sách và Thêm chính sách.</span></span></p>
                            <p dir="ltr"><span><span>Về cơ bản thì các thao tác và popup hiển thị của Chính sách nhân viên cũng sẽ giống như với Quy định làm việc. Vì thế mà bạn sẽ rất dễ dàng để thực hiện cũng như thêm mới nội dung cho mục chính sách.</span></span></p>
                            <h3 dir="ltr"><span><span>1.2.1. Thêm nhóm chính sách</span></span></h3>
                            <p dir="ltr"><span><span>Nhấp chuột vào mục “Thêm mới”, chọn “Thêm nhóm chính sách”, popup biểu mẫu điền thông tin nhóm chính sách được thêm mới sẽ nhảy ra. Các nội dung thông tin cần được hoàn thiện bao gồm:&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>- Tên nhóm chính sách</span></span></p>
                            <p dir="ltr"><span><span>- Thời gian bắt đầu hiệu lực</span></span></p>
                            <p dir="ltr"><span><span>- Người giám sát</span></span></p>
                            <p dir="ltr"><span><span>- Mô tả ngắn</span></span></p>
                            <p dir="ltr"><span><span>Các thông tin này đều phải được hoàn thiện và không được bỏ trống. Như vậy bạn mới thêm mới được nhóm chính sách thành công. Nhóm chính sách sau khi hoàn thành sẽ hiển thị bên dưới với mã chính sách và tên chính sách bên trái. Để xóa nhóm chính sách thì bạn sẽ chọn biểu tượng thùng rác nằm ở phía bên phải màn hình với nhóm chính sách tương ứng cần xóa.</span></span></p>
                            <h3 dir="ltr"><span><span>1.2.2. Thêm chính sách</span></span></h3>
                            <p dir="ltr"><span><span>Để thêm chính sách thì bạn sẽ chọn “Thêm mới”, chọn tiếp “Thêm chính sách” nằm ở dưới mục “Thêm nhóm chính sách”. Hệ thống sẽ hiển thị biểu mẫu điền thông tin về chính sách được thêm.</span></span></p>
                            <p dir="ltr"><span><span>- Tên chính sách</span></span></p>
                            <p dir="ltr"><span><span>- Nhóm chính sách</span></span></p>
                            <p dir="ltr"><span><span>- Thời gian bắt đầu hiệu lực</span></span></p>
                            <p dir="ltr"><span><span>- Người giám sát</span></span></p>
                            <p dir="ltr"><span><span>- Đối tượng thi hành</span></span></p>
                            <p dir="ltr"><span><span>- Nội dung chính sách</span></span></p>
                            <p dir="ltr"><span><span>Khi đã điền đầy đủ các thông tin trên thì bạn sẽ chọn “Thêm” để thực hiện việc thêm mới chính sách thành công. Lúc này, chính sách sẽ hiển thị trong nhóm chính sách tương ứng. Bạn chỉ cần nhấp chuột vào biểu tượng tam giác bên cạnh tên nhóm chính sách là có thể thấy được những chính sách mình đã tạo và bổ sung vào nhóm chính sách tương ứng.&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>Những nội dung thể hiện bao gồm Mã chính sách, Tên chính sách, Ngày ban hành, Người tạo, Đối tượng áp dụng và cuối cùng chính là biểu tượng thùng rác có chức năng xóa chính sách khi có sự thay đổi trong chính sách công ty. Để xem chi tiết nội dung chính sách thì bạn nhấp chuột vào “Mã chính sách (xem chi tiết)”, hệ thống sẽ hiển thị nội dung chi tiết của chính sách ngay sau đó. Lựa chọn “Sửa” để tiến hành việc chỉnh sửa nội dung chính sách hoặc chọn “Hủy” để thoát chế độ xem chi tiết chính sách.</span></span></p>
                            <p dir="ltr"><span><span>Tương tự các thao tác trên bạn sẽ tiến hành xây dựng dữ liệu nội dung chính sách cho mình. Khi đã hoàn thiện và muốn thực hiện tra cứu nhanh thì bạn có thể sử dụng thanh công cụ “Tìm kiếm” nằm phía bên phải màn hình với biểu tượng kính lúp. Nhập tên nhóm chính sách tương ứng hệ thống sẽ trả lại kết quả ngay sau đó.</span></span></p>
                            <p dir="ltr"><span><span>Quy định làm việc và chính sách dành cho nhân viên là những điều rất thiết yếu để đảm bảo sự hoạt động ổn định và phát triển của toàn công ty, doanh nghiệp. Vì thế mà việc tạo và lưu trữ dữ liệu này có vai trò quan trọng trong việc điều hành, quản lý của công ty, doanh nghiệp. Bạn có thể nghiên cứu và hiểu rõ hơn về phần mềm Quản trị nhân sự và tính năng quy định - chính sách với tài khoản nhân viên dưới đây:&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>User: hunghatv365@gmail.com</span></span></p>
                            <p dir="ltr"><span><span>Mk: timviec365</span></span></p>
                            <div>&nbsp;</div>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 8 ? "block" : "none" }}>
                            <p dir="ltr"><span><span>Biến động nhân sự sẽ là mục giúp bạn thực hiện các điều chỉnh nội bộ trong công ty như luân chuyển công tác, bổ nhiệm, quy hoạch hay giảm biên chế, nghỉ việc, tăng/ giảm lương và đặc biệt chính là biểu đồ thống kê số lượng nhân viên trong từng mục.</span></span></p>
                            <h2 dir="ltr"><span><span>1.1. Tăng/ giảm lương</span></span></h2>
                            <p dir="ltr"><span><span>Việc tăng giảm lương sẽ được điều chỉnh thông qua page Lương của timviec365.vn. Để xem chi tiết về sự thay đổi mức lương của nhân viên tăng/ giảm trong từng mốc thời gian nhất định thì bạn có thể tiến hành thông qua bộ lọc được cung cấp.</span></span></p>
                            <p dir="ltr"><span><span>Đầu tiên, bạn cần lựa chọn nhân viên mình muốn biết, chọn khoảng thời gian thực hiện việc tăng/ giảm lương với 2 mốc thời gian tiến hành việc tăng/ giảm lương. Sau đó click vào ô “Tìm kiếm” với biểu tượng mũi tên. Lúc này, thông tin chi tiết của nhân viên đó sẽ được hiển thị ở bên dưới. Các trường thông tin được thể hiện bao gồm: ID nhân viên, Họ tên, Chức vụ, Phòng ban, Mức lương ban đầu, Mức lương tăng, Mức lương giảm, Thời gian thay đổi, Quyết định.&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>Thông qua các trường thông tin hiển thị, công ty có thể dễ dàng nắm bắt và quản lý được sự thay đổi về mức lương một cách rõ ràng trong từng thời điểm cụ thể. Điều này giúp việc kiểm soát và đưa ra các sự điều chỉnh sau này được thuận lợi và phù hợp hơn cho từng đối tượng nhân viên trong công ty.</span></span></p>
                            <h2 dir="ltr"><span><span>1.2. Bổ nhiệm, quy hoạch</span></span></h2>
                            <p dir="ltr"><span><span>Bổ nhiệm tức là việc giao cho một người giữ chức vụ nào đó trong bộ máy quản lý. Quy hoạch ở đây chính là hoạch định nhân sự, dựa trên tình hình, chiến lược phát triển của công ty để bồi dưỡng, giao cho cá nhân nào đó giữ một chức vụ cụ thể trong bộ máy quản lý của công ty. Việc thực hiện bổ nhiệm, quy hoạch chức vụ trong công ty, doanh nghiệp hiện nay là rất phổ biến để đảm bảo cho sự ổn định và phát triển hoạt động chung.</span></span></p>
                            <p dir="ltr"><span><span>Để thực hiện việc bổ nhiệm, quy hoạch nhân sự trong công ty bạn chỉ cần nhấp chuột vào mục “Bổ nhiệm, quy hoạch” ở bên cạnh “Tăng/ giảm lương”, sau đó chọn “Thêm mới bổ nhiệm, quy hoạch”. Lúc này, hệ thống sẽ nhảy ra biểu mẫu điền thông tin để công ty tiến hành việc bổ nhiệm, quy hoạch cho nhân viên được lựa chọn.</span></span></p>
                            <p dir="ltr"><span><span>Các bước thực hiện điền biểu mẫu cho việc thêm mới bổ nhiệm, quy hoạch như sau:</span></span></p>
                            <p dir="ltr"><span><span>- Chọn tên nhân viên: Lựa chọn tên nhân viên được lựa chọn bổ nhiệm, quy hoạch. Lúc này, các thông tin về Chức vụ hiện tại, Phòng ban của nhân viên đó sẽ được tự động điền với việc tích hợp dữ liệu có sẵn trong hệ thống.</span></span></p>
                            <p dir="ltr"><span><span>- Quy hoạch bổ nhiệm: Lựa chọn chức vụ bổ nhiệm cho nhân viên được lựa chọn. Các chức vụ đã được cài đặt sẵn trong hệ thống với các vị trí đa dạng, phù hợp với nhu cầu của nhiều công ty, doanh nghiệp hiện nay.</span></span></p>
                            <p dir="ltr"><span><span>- Phòng ban mới: Lựa chọn phòng ban mới mà nhân viên được bổ nhiệm sẽ làm việc.</span></span></p>
                            <p dir="ltr"><span><span>- Thời gian quy hoạch, bổ nhiệm: Chọn thời gian tiến hành việc quy hoạch, bổ nhiệm vị trí cho nhân viên được lựa chọn. Định dạng thời gian sẽ là mm/dd/yyyy (tháng/ngày/năm), do vậy mà bạn cần chú ý trong việc lựa chọn thời gian sao cho chính xác nhất.</span></span></p>
                            <p dir="ltr"><span><span>- Chọn quy định: Tiến hành lựa chọn quy định tương ứng của công ty cho việc quy hoạch, bổ nhiệm vị trí nhân viên. Các quy định này sẽ được lấy từ bên văn thư thông qua việc tích hợp API. Do vậy mà công ty có thể dễ dàng trong việc sử dụng các quy định, quyết định được cập nhật trên phần mềm vanthu.timviec365.vn.</span></span></p>
                            <p dir="ltr"><span><span>- Lý do: Đưa ra lý do cho việc bổ nhiệm, quy hoạch vị trí mới đối với nhân viên được lựa chọn.</span></span></p>
                            <p dir="ltr"><span><span>Lưu ý cho bạn trong quá trình điền biểu mẫu bổ nhiệm, quy hoạch đó là phải hoàn thiện tất cả các thông tin được gắn dấu *, bởi đây là thông tin mang tính bắt buộc. Trong trường hợp bỏ trống thì hệ thống sẽ không chạy và việc bổ nhiệm, quy hoạch sẽ không được thay đổi và lưu trữ. Khi đã hoàn thành việc điền biểu mẫu thông tin bổ nhiệm, quy hoạch thì chọn “Đồng ý”, hệ thống lúc này sẽ ghi nhận lại dữ liệu thông tin mới về nhân viên được bổ nhiệm, quy hoạch và hiển thị ở bảng bên dưới.</span></span></p>
                            <p dir="ltr"><span><span>Bảng thống kê sẽ được xây dựng với các trường thông tin sau: ID nhân viên, Họ và tên, Phòng ban cũ, Chức vụ cũ, Chức vụ quy hoạch, bổ nhiệm, Phòng ban mới, Thời gian quy hoạch, bổ nhiệm và cuối cùng là Tùy chỉnh. Dựa trên bảng thống kê này, công ty có thể nắm bắt được sự thay đổi trong việc quy hoạch, bổ nhiệm nhân viên trong từng vị trí, phòng ban. Trong trường hợp muốn thay đổi hay xóa về vấn đề quy hoạch, bổ nhiệm của nhân viên nào đó thì mục Tùy chỉnh ở phía cuối sẽ cho phép công ty thực hiện thao tác này. Lựa chọn icon chiếc bút cho việc chỉnh sửa và icon thùng rác cho việc xóa bản ghi về bổ nhiệm, quy hoạch đã lập.</span></span></p>
                            <p dir="ltr"><span><span>Bên cạnh đó, để thuận tiện cho việc tra cứu thông tin của những nhân viên được bổ nhiệm, quy hoạch thì bạn có thể thực hiện qua thanh công cụ “Tìm kiếm” với biểu tượng kính lúp. Nhập tên hoặc ID của nhân viên cần tra cứu, Chọn phòng ban, Chọn khoảng thời gian tiến hành bổ nhiệm, quy hoạch và ấn vào biểu tượng tìm kiếm. Hệ thống sẽ trả lại kết quả tương ứng với thông tin bạn tra cứu chỉ trong vòng một nốt nhạc.&nbsp;</span></span></p>
                            <h2 dir="ltr"><span><span>1.3. Luân chuyển công tác&nbsp;</span></span></h2>
                            <p dir="ltr"><span><span>Với việc có sự thay đổi và luân chuyển công tác trong công ty thì bạn cần cập nhật dữ liệu vào hệ thống phần mềm để việc quản lý được sát sao và chính xác hơn. Thao tác thực hiện việc luân chuyển công tác như sau:</span></span></p>
                            <p dir="ltr"><span><span>- Chọn mục “Luân chuyển công tác”, chọn tiếp “Thêm mới luân chuyển công tác”. Popup điền thông tin cho việc thay đổi công tác của nhân viên sẽ được hiển thị ngay sau đó.</span></span></p>
                            <p dir="ltr"><span><span>- Chọn đơn vị công tác hiện tại: Chọn công ty mà nhân viên được luân chuyển hiện tại đang làm việc.&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>- Chọn phòng ban hiện tại: Chọn phòng ban nhân viên luân chuyển công tác hiện đang làm việc.</span></span></p>
                            <p dir="ltr"><span><span>- Chọn tên nhân viên: Lựa chọn tên nhân viên được luân chuyển công tác.</span></span></p>
                            <p dir="ltr"><span><span>- Chức vụ hiện tại: Với phần thông tin này thì hệ thống sẽ tự hiển thị khi bạn thực hiện thao tác chọn tên nhân viên.</span></span></p>
                            <p dir="ltr"><span><span>- Đơn vị công tác mới: Lựa chọn chi nhánh, địa điểm mà nhân viên sẽ làm việc khi luân chuyển tới vị trí mới.</span></span></p>
                            <p dir="ltr"><span><span>- Đơn vị công tác mới: Lựa chọn chi nhánh, địa điểm mà nhân viên sẽ làm việc khi luân chuyển tới vị trí mới.</span></span></p>
                            <p dir="ltr"><span><span>- Phòng ban mới, chức vụ mới: Chọn phòng ban và chức vụ mới mà nhân viên sẽ đảm nhận khi luân chuyển công tác.</span></span></p>
                            <p dir="ltr"><span><span>- Thời gian luân chuyển công tác: Chọn mốc thời gian cụ thể cho việc tiến hành luân chuyển công tác. Chú ý định dạng thời gian ở trình duyệt của bạn để điền sao cho đúng nhất.</span></span></p>
                            <p dir="ltr"><span><span>- Nhiệm vụ công việc mới: Điền chi tiết và rõ ràng về những công việc, nhiệm vụ mới cần thực hiện sau khi luân chuyển công tác.</span></span></p>
                            <p dir="ltr"><span><span>- Ghi chú (nếu có): Ghi rõ ghi chú cần được quan tâm cho việc luân chuyển công tác nếu có.</span></span></p>
                            <p dir="ltr"><span><span>Khi đã hoàn thiện được những nội dung trên thì nhấn chọn “Đồng ý” để tiến hành xác nhận và lưu trữ thông tin luân chuyển công tác của nhân viên tương ứng.&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>Thông tin nhân viên luân chuyển công tác sau khi được cập nhật sẽ được hiển thị ở bảng thống kê bên dưới. Các trường thông tin trong bảng bao gồm: ID nhân viên, họ tên, đơn vị công tác hiện tại, phòng ban, chức vụ hiện tại, đơn vị công tác mới, phòng ban mới, chức vụ mới, thời gian chuyển công tác và tùy chỉnh.</span></span></p>
                            <p dir="ltr"><span><span>Để thực hiện việc chỉnh sửa hay xóa dữ liệu luân chuyển công tác của nhân viên bất kỳ thì bạn chỉ cần chuyển tới cột tùy chỉnh. Lựa chọn biểu tượng chiếc bút để chỉnh sửa và biểu tượng thùng rác để xóa.</span></span></p>
                            <p dir="ltr"><span><span>Ngoài ra, bạn có thể tìm kiếm hay lọc danh sách nhân viên luân chuyển công tác thông qua thanh search được hiển thị phía bên trên bảng thống kê. Những trường thông tin bạn cần nhập để thực hiện việc lọc thông tin bao gồm: Tên nhân viên, ID nhân viên, Phòng ban mới, Thời gian (có thể lựa chọn theo mốc hoặc khoảng thời gian với 2 ô thời gian tương ứng). Chỉ cần nhập một ô thông tin thì hệ thống cũng sẽ tiến hành việc tìm kiếm theo ý muốn của bạn và trả kết quả bên dưới.</span></span></p>
                            <h2 dir="ltr"><span><span>1.4. Giảm biên chế, nghỉ việc</span></span></h2>
                            <p dir="ltr"><span><span>Để tiến hành cập nhật thông tin về nhân viên giảm biên chế, nghỉ việc thì bạn sẽ thực hiện như sau:</span></span></p>
                            <p dir="ltr"><span><span>- Chọn “Thêm mới giảm biên chế nghỉ việc”</span></span></p>
                            <div style={{ textAlign: "center" }}>
                                <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                    <img alt="" height="812" src="/bien_dong_1.png" width="960" />
                                    <figcaption>Biến động nhân sự</figcaption>
                                </figure>
                            </div>
                            <div>
                                <p dir="ltr"><span><span>- Hệ thống sẽ hiển thị biểu mẫu điền thông tin về việc giảm biên chế, nghỉ việc tương ứng. Bạn cần hoàn thiện thông tin để tạo dữ liệu cho công ty về việc giảm biên chế, nghỉ việc của nhân viên trong công ty.</span></span></p>
                                <div style={{ textAlign: "center" }}>
                                    <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                        <img alt="" height="812" src="/bien_dong_2.png" width="960" />
                                        <figcaption>Thêm mới giảm biên chế, nghỉ việc</figcaption>
                                    </figure>
                                </div>
                                <div>
                                    <p dir="ltr"><span><span>- Các thông tin được gắn dấu * là thông tin bắt buộc hoàn thiện, vì thế bạn cần chú ý khi điền biểu mẫu trên.</span></span></p>
                                    <p dir="ltr"><span><span>- Hình thức chính là mục lựa chọn, bạn cần chọn nhân viên đó ở hình thức nghỉ việc hay giảm biên chế và ghi lý do ở mục bên dưới (có thể bỏ trống phần này vì không bắt buộc).</span></span></p>
                                    <p dir="ltr"><span><span>- Sau khi biểu mẫu được hoàn chỉnh với những thông tin cần thiết thì bạn click chuột chọn “Đồng ý”. Dữ liệu nhân viên giảm biên chế hay nghỉ việc sẽ được hiển thị bảng bên dưới.</span></span></p>
                                    <p dir="ltr"><span><span>Nội dung thông tin của bảng bao gồm: ID nhân viên, Họ tên, Phòng ban, Chức vụ, Hình thức (giảm biên chế hoặc nghỉ việc), Ngày bắt đầu nghỉ, Tùy chỉnh. Tùy chỉnh sẽ là mục bạn thực hiện việc chỉnh sửa (biểu tượng cái bút) hoặc xóa (biểu tượng thùng rác) thông tin biểu mẫu của nhân viên giảm biên chế/ nghỉ việc tương ứng.</span></span></p>
                                    <p dir="ltr"><span><span>Tương tự như Luân chuyển công tác, bạn cũng có thể tìm kiếm nhanh thông tin về nhân viên giảm biên chế/nghỉ việc thông qua thanh search. Chỉ cần nhập 1 trong các ô thông tin như Tên, ID nhân viên, Phòng ban, Thời gian (mốc thời gian hoặc khoảng thời gian với 2 ô thời gian được hiển thị) lựa chọn “Tìm kiếm”, hệ thống sẽ trả lại kết quả ngay bên dưới.</span></span></p>
                                    <h2 dir="ltr"><span><span>1.5. Biểu đồ</span></span></h2>
                                    <p dir="ltr"><span><span>Đây là biểu đồ so sánh biến động nhân sự trong 2 mốc thời gian/ giai đoạn thời gian</span></span></p>
                                    <div style={{ textAlign: "center" }}>
                                        <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                            <img alt="" height="812" src="/bien_dong_3.png" width="960" />
                                            <figcaption>Biểu đồ biến động nhân sự</figcaption>
                                        </figure>
                                    </div>
                                    <div><p dir="ltr"><span><span>Lựa chọn giai đoạn thời gian ở những mốc thời gian tương ứng, hệ thống sẽ hiển thị biểu đồ nhân sự trong các diện tương ứng để cho bạn thấy rõ hơn về sự chênh lệch, thay đổi như thế nào.</span></span></p><p dir="ltr"><span><span>Biến động nhân sự trong công ty có sức ảnh hưởng khá nhiều tới tình hình hoạt động chung. Do đó, việc cập nhật và lưu giữ liệu trong hệ thống sẽ giúp công ty, doanh nghiệp nắm rõ và kiểm soát tốt hơn về tình hình nhân sự của công ty, doanh nghiệp mình.</span></span></p><p dir="ltr"><span><span>Bạn có thể tự trải nghiệm, khám phá phần mềm Quản trị nhân sự và tính năng biến động nhân sự với tài khoản nhân viên sau:</span></span></p><p dir="ltr"><span><span>User: hunghatv365@gmail.com</span></span></p><p dir="ltr"><span><span>Mk: timviec365</span></span></p><div>&nbsp;</div></div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 9 ? "block" : "none" }} >
                            <p dir="ltr"><span><span>Vị trí công việc sẽ là mục thể hiện những vị trí trọng yếu trong công ty ở từng phòng ban khác nhau. Đây sẽ là nội dung thăng tiến cho từng vị trí với việc nêu rõ về mô tả công việc, yêu cầu công việc và lộ trình thăng tiến ra sao.</span></span></p>
                            <p dir="ltr"><span><span>Để thêm được nội dung của từng vị trí công việc thì bạn sẽ thực hiện theo hướng dẫn sau:</span></span></p>
                            <p dir="ltr"><span><span>- Chọn mục “Đào tạo phát triển”, click vào “Vị trí công việc” được hiển thị ngay đầu tiên.</span></span></p>
                            <p dir="ltr"><span><span>- Hệ thống sẽ hiển thị giao diện của Vị trí công việc, lựa chọn “Thêm mới” để tiến hành thêm dữ liệu cho vị trí công việc được cập nhật.</span></span></p>
                            <p dir="ltr"><span><span>- Biểu mẫu điền thông tin sẽ được hiển thị ngay trên màn hình. Bạn cần tiến hành điền đầy đủ nội dung thông tin trong biểu mẫu để việc thêm mới vị trí công việc thành công.</span></span></p>
                            <div style={{ textAlign: "center" }}>
                                <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                    <img alt="" height="812" src="/vi_tri_cong_viec.png" width="960" />
                                    <figcaption>Thêm vị trí công việc</figcaption>
                                </figure>
                            </div>
                            <p dir="ltr">&nbsp;</p>
                            <p dir="ltr"><span><span>Đối với phần mô tả ngắn thì bạn cần nêu ngắn gọn về vị trí công việc đó. Ví dụ với vị trí Trưởng phòng Kỹ thuật có thể viết mô tả như sau: “Quản lý, điều hành và chịu trách nhiệm tất cả các công việc liên quan tới kỹ thuật trong công ty”.</span></span></p>
                            <p dir="ltr"><span><span>Phần yêu cầu công việc cần ghi rõ vị trí công việc này phải làm gì, mức độ hoàn thành công việc ra sao. Ví dụ:&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>+ Hỗ trợ các thành viên trong phòng, hoàn thành tốt các công việc được giao.</span></span></p>
                            <p dir="ltr"><span><span>+ Rèn luyện tư duy quản lý, lãnh đạo.</span></span></p>
                            <p dir="ltr"><span><span>+ Luôn có trách nhiệm trong công việc.</span></span></p>
                            <p dir="ltr"><span><span>File lộ trình thăng tiến sẽ là nội dung do công ty xây dựng để nhân viên nắm bắt được mình cần phát triển bản thân như thế nào để đạt được vị trí công việc mong muốn. Đây là phần không bắt buộc, trong trường hợp công ty chưa xây dựng nội dung này thì có thể bỏ qua.</span></span></p>
                            <p dir="ltr"><span><span>- Cuối cùng, lựa chọn “Thêm” để tiến hành việc thêm vị trí công việc thành công.&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>Để thực hiện việc thêm các vị trí khác thì bạn chỉ cần thực hiện lại các thao tác bên trên là hoàn thiện dữ liệu về vị trí công việc trong công ty mình.</span></span></p>
                            <p dir="ltr"><span><span>Sử dụng tài khoản sau đây sẽ giúp bạn có thể có được những sự khảo nghiệm thực tế nhất với phần mềm Quản trị nhân sự 365 và tính năng Vị trí công việc trong công ty, doanh nghiệp hiện nay.</span></span></p>
                            <p dir="ltr"><span><span>User: hhp365@gmail.com</span></span></p>
                            <p dir="ltr"><span><span>Mk: timviec365</span></span></p>
                            <div>&nbsp;</div>
                            <p>&nbsp;</p>
                            <div>&nbsp;</div>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 10 ? "block" : "none" }}>
                            <p dir="ltr"><span><span>Đây sẽ là phần cập nhật dữ liệu về các quy trình đào tạo nhân viên mà công ty xây dựng. Có thể là quy trình đào tạo chung cho nhân viên mới hay đào tạo nhân viên cho từng vị trí, công việc khác nhau. Điều này tùy thuộc vào sự định hướng của từng doanh nghiệp trong công ty.</span></span></p>
                            <div style={{ textAlign: "center" }}>
                                <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                    <img alt="" height="812" src="/quy_trinh_dao_tao_1.png" width="960" />
                                    <figcaption>Quy trình đào tạo</figcaption>
                                </figure>
                            </div>
                            <p dir="ltr"><span><span>Để thêm quy trình đào tạo, bạn lựa chọn “Thêm mới”. Lúc này, hệ thống sẽ hiển thị biểu mẫu điền thông tin.&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>- Nhập tên quy trình: tên quy trình đào tạo bạn dự định xây dựng. Ví dụ: Quy trình đào tạo nhân viên mới, Quy trình đào tạo nhân viên kinh doanh.</span></span></p>
                            <p dir="ltr"><span><span>- Mô tả ngắn: Mô tả ngắn gọn về quy trình đó là gì, áp dụng với đối tượng ra sao,....</span></span></p>
                            <p dir="ltr"><span><span>Sau đó chọn “Thêm” để xác lập quy trình đào tạo đó. Lúc này, quy trình được tạo sẽ hiển thị danh sách bên dưới với tên quy trình nằm bên trái và mục “Xoá” quy trình nằm bên phải và ở cuối của quy trình.</span></span></p>
                            <p dir="ltr"><span><span>Trong trường hợp bạn xây dựng quy trình đào tạo với nhiều giai đoạn khác nhau thì có thể tiến hành việc thêm giai đoạn như sau:</span></span></p>
                            <p dir="ltr"><span><span>- Nhấp chuột vào tên quy trình cần thêm giai đoạn tương ứng. Lựa chọn “Thêm giai đoạn đào tạo”.&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>- Điền thông tin vào popup thêm giai đoạn: Tên giai đoạn, Đối tượng đào tạo và Nội dung giai đoạn.</span></span></p>
                            <p dir="ltr"><span><span>- Chọn “Thêm” để thêm giai đoạn cho quy trình đào tạo thành công.</span></span></p>
                            <p dir="ltr"><span><span>Tương tự như vậy, bạn có thể tiến hành việc thêm các giai đoạn khác cho quy trình đào tạo tương ứng. Các giai đoạn được tạo sẽ được hiển thị ngay trong quy trình đó với số thứ tự từ 1.&nbsp;</span></span></p>
                            <div style={{ textAlign: "center" }}>
                                <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                    <img alt="" height="812" src="/quy_trinh_dao_tao_2.png" width="960" />
                                    <figcaption>Giai đoạn đào tạo</figcaption>
                                </figure>
                            </div>
                            <p dir="ltr">&nbsp;</p>
                            <p dir="ltr"><span><span>Để chỉnh sửa hay xóa giai đoạn thì bạn chỉ cần di chuột đến dấu ba chấm ở phía cuối giai đoạn, lựa chọn Chỉnh sửa hoặc Xoá để thực hiện thao tác của mình. Còn nếu muốn quay lại danh sách quy trình thì click chuột vào “Danh sách quy trình đào tạo” với mũi tên trở về được hiển thị phía trên phần thêm giai đoạn.</span></span></p>
                            <p dir="ltr"><span><span>Khi đã tiến hành tạo dữ liệu thành công với các quy trình đào tạo cho công ty, bạn có thể tìm kiếm quy trình tương ứng một cách dễ dàng với công cụ search. Nhập tên quy trình đào tạo cần tìm, sau đó click vào biểu tượng chiếc kính. Hệ thống sẽ trả lại kết quả sau đó.</span></span></p>
                            <p dir="ltr"><span><span>Nếu bạn muốn hiểu và tự mình trải nghiệm phần mềm Quản trị nhân sự 365 và tính năng xây dựng quy trình đào tạo thì có thể đăng nhập tài khoản nhân viên được cung cấp như sau:</span></span></p>
                            <p dir="ltr"><span><span>User: hunghatv365@gmail.com</span></span></p>
                            <p dir="ltr"><span><span>Mk: timviec365</span></span></p>
                            <p dir="ltr"><span><span>Mong bạn sẽ có cho mình trải nghiệm tuyệt vời nhất.</span></span></p>
                            <div>&nbsp;</div>
                            <div>&nbsp;</div>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 11 ? "block" : "none" }}>
                            <p dir="ltr"><span><span>Sơ đồ tổ chức sẽ là mục tái hiện lại về cơ cấu tổ chức phòng ban, vị trí trong công ty. Cùng với đó chính là hiển thị danh sách chi tiết các vị trí lãnh đạo trong công ty có quyền sử dụng con dấu và mẫu chữ ký.&nbsp;</span></span></p>
                            <h2 dir="ltr"><span><span>1. Sơ đồ cơ cấu tổ chức</span></span></h2>
                            <p dir="ltr"><span><span>Sơ đồ cơ cấu tổ chức sẽ biểu thị sơ đồ phòng ban và mô hình hoạt động của công ty. Dựa trên việc cập nhật phòng ban và dữ liệu nhân viên thì hệ thống sẽ hiển thị mô hình tương ứng với mô hình hoạt động mà công ty bạn đang xây dựng.</span></span></p>
                            <p dir="ltr"><span><span>Để tiến hành thêm mới phòng ban hay công ty con thì bạn chỉ cần click chuột, chọn “Thêm mới”. Lúc này hệ thống sẽ chuyển tới giao diện Quản lý công ty của phần mềm Chấm công 365. Đây sẽ là giao diện để bạn thực hiện thao tác thêm mới, chỉnh sửa về công ty con hay phòng ban trong công ty.</span></span></p>
                            <p dir="ltr"><span><span>Khi đã cập nhật thành công bên Chấm công 365 thì hệ thống phần mềm Quản trị nhân sự 365 cũng sẽ tích hợp thông tin để biểu thị sơ đồ cơ cấu tổ chức sao cho chính xác nhất với mô hình hoạt động của công ty, doanh nghiệp.</span></span></p>
                            <p dir="ltr"><span><span>Nếu như trong trường hợp hệ thống chỉ hiển thị công ty mẹ thì bạn chỉ cần click chuột vào ô thông tin đó thì sơ đồ phòng ban và công ty con sẽ hiện ra. Mỗi một phòng ban, công ty con sẽ được hiển thị bằng một ô thông tin với việc cung cấp thông tin như: tên phòng ban/ tên công ty con, mô tả, trưởng phòng, phó phòng và số lượng nhân viên. Để thực hiện việc chỉnh sửa mô tả thì bạn chọn biểu tượng chiếc bút bên cạnh tên phòng ban, việc xem chi tiết mô tả về phòng ban đó sẽ chọn “Xem chi tiết” ở phần mô tả.</span></span></p>
                            <p dir="ltr"><span><span>Trong trường hợp bạn muốn chỉnh sửa thông tin về trưởng phòng, phó phòng của phòng ban thì có thể chỉnh sửa thông tin nhân viên bằng cách chọn Quản lý hành chính &gt;&gt; Quản lý nhân viên &gt;&gt; Chỉnh sửa ở ô nhân viên tương ứng. Hoặc thực hiện việc bổ nhiệm, quy hoạch nhân viên cho vị trí đó.</span></span></p>
                            <h2 dir="ltr"><span><span>2. Sơ đồ chức vụ</span></span></h2>
                            <p dir="ltr"><span><span>Sơ đồ chức vụ sẽ thể hiện mô hình chức vụ của công ty, doanh nghiệp. Từ cấp cao nhất xuống cấp thấp nhất trong công ty. Các chức vụ bằng nhau sẽ được thể hiện ngang hàng và chức vụ thấp hơn sẽ được biểu thị bên dưới.</span></span></p>
                            <p dir="ltr"><span><span>Mỗi một vị trí sẽ tương ứng với một ô thông tin thể hiện các nội dung như Tên chức vụ, họ tên người đảm nhận và nhiệm vụ của chức vụ đó. Để cập nhật nhiệm vụ bạn sẽ click chuột, chọn biểu tượng chiếc bút bên cạnh tên chức vụ. Hệ thống sẽ nhảy ra popup biểu mẫu nhập nội dung nhiệm vụ. Tiến hành hoàn thiện nội dung và ấn “Cập nhật” để lưu trữ nhiệm vụ của chức vụ đó.</span></span></p>
                            <p dir="ltr"><span><span>Nếu bạn muốn xem chi tiết về nhiệm vụ của chức vụ nào đó thì chỉ cần nhấp chuột vào “Xem thêm” ở thông tin nhiệm vụ. Popup về nội dung của nhiệm vụ sẽ được hiển thị chi tiết trên màn hình.</span></span></p>
                            <div>
                                <h2 dir="ltr"><span><span>3. Quyền sử dụng con dấu và mẫu chữ ký</span></span></h2>
                                <p dir="ltr"><span><span>Đây sẽ là phần thông tin hiển thị về thành viên có quyền sử dụng con dấu trong công ty cũng như mẫu chữ ký của các lãnh đạo trong công ty, doanh nghiệp.</span></span></p>
                                <p dir="ltr"><span><span>Đối với phần danh sách thành viên được sử dụng con dấu công ty thì cần tiến hành thêm mới để cập nhật dữ liệu. Chọn “Thêm mới” nằm phía bên phải màn hình, hệ thống sẽ hiển thị biểu mẫu thêm mới nhân viên được phép sử dụng con dấu công ty.</span></span></p>
                                <div>
                                    &nbsp;
                                    <div style={{ textAlign: "center" }}>
                                        <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                            <img alt="" height="812" src="/so_do_to_chuc_1.png" width="960" />
                                            <figcaption>Quyền sử dụng con dấu và mẫu chữ ký</figcaption>
                                        </figure>
                                    </div>
                                    <p>&nbsp;</p>
                                    <div>
                                        <p dir="ltr"><span><span>- Lựa chọn phòng ban</span></span></p>
                                        <p dir="ltr"><span><span>- Lựa chọn chức vụ</span></span></p>
                                        <p dir="ltr"><span><span>- Chọn tên nhân viên</span></span></p>
                                        <p dir="ltr"><span><span>Cuối cùng, ấn “Đồng ý”. Lúc này, nhân viên có quyền được sử dụng con dấu của công ty sẽ được hiển thị ở danh sách bên dưới. Thực hiện thao tác tương tự với việc cập nhật danh sách nhân viên có quyền sử dụng con dấu. Nếu như muốn xóa nhân viên nào đó trong danh sách này thì bạn sẽ nhấp chuột vào biểu tượng thùng rác nằm ở cuối hàng tên nhân viên đó, lựa chọn “Xóa”.</span></span></p>
                                        <p dir="ltr"><span><span>Ngay bên dưới danh sách nhân viên sẽ là danh sách mẫu chữ ký. Lúc này, hệ thống sẽ hiển thị danh sách các thành viên là ban lãnh đạo trong công ty từ cấp phó nhóm trở lên và có chữ ký.</span></span></p>
                                        <div style={{ textAlign: "center" }}>
                                            <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                                <img alt="" height="812" src="/so_do_to_chuc_2.png" width="960" />
                                                <figcaption>Danh sách mẫu chữ ký</figcaption>
                                            </figure>
                                        </div>
                                        <div>
                                            <p dir="ltr"><span><span>Để thực hiện việc tải mẫu chữ ký của từng thành viên trong ban lãnh đạo thì bạn sẽ nhấp chuột vào “Tải lên chữ ký” nằm ở cột Mẫu chữ ký và tải lên ảnh chữ ký của thành viên tương ứng trong bảng. Mẫu chữ ký sau khi được tải lên sẽ ở dạng hình ảnh. Click vào hình ảnh bạn sẽ xem được mẫu chữ ký của thành viên ban lãnh đạo đó. Trong trường hợp muốn thay đổi hình ảnh mẫu chữ ký khác thì chỉ cần click vào biểu tượng chiếc bút và lựa chọn ảnh mới thay thế. Còn muốn xóa ảnh mẫu chữ ký thì sẽ chọn biểu tượng thùng rác để thực hiện thao tác này.</span></span></p>
                                            <p dir="ltr"><span><span>Nếu như bạn muốn tìm và xem nhanh mẫu chữ ký của thành viên bất kỳ trong ban lãnh đạo công ty thì có thể thực hiện việc tìm kiếm trên thanh search. Nhập tên hoặc ID của nhân viên đó, lựa chọn phòng ban và click vào biểu tượng chiếc kính. Hệ thống sẽ trả lại kết quả tìm kiếm tương ứng với việc hiển thị ở danh sách bên dưới.</span></span></p>
                                            <h2 dir="ltr"><span><span>4. Tiểu sử lãnh đạo</span></span></h2>
                                            <p dir="ltr"><span><span>Tiểu sử lãnh đạo là phần thông tin chi tiết về các thành viên trong ban lãnh đạo của công ty. Dựa vào đây, nhân viên trong công ty có thể xem và nắm bắt thông tin chính xác hơn về lãnh đạo, cấp trên của mình.&nbsp;</span></span></p>
                                            <p dir="ltr"><span><span>Khi click vào mục Tiểu sử lãnh đạo, hệ thống sẽ hiển thị ra giao diện là bảng danh sách ban lãnh đạo trong công ty. Các trường thông tin thể hiện bao gồm: Ảnh, họ tên, chức vụ, phòng ban, tổ và nhóm. Để tìm kiếm nhanh về thông tin lãnh đạo muốn xem, bạn có thể sử dụng thanh search được cập nhật ở trên bảng danh sách. Nhập họ tên lãnh đạo &gt;&gt; click tìm kiếm &gt;&gt; kết quả sẽ được trả lại tương ứng trong bảng dưới.</span></span></p>
                                            <div style={{ textAlign: "center" }}>
                                                <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                                    <img alt="" height="812" src="/tieu_su_ld_1.png" width="960" />
                                                    <figcaption>Tiểu sử lãnh đạo</figcaption>
                                                </figure>
                                            </div>
                                            <p dir="ltr"><span><span>Nếu như bạn muốn xem chi tiết tiểu sử của lãnh đạo thì chỉ cần nhấp chuột vào “Xem chi tiết” hiển thị bên cạnh họ tên lãnh đạo &gt;&gt; giao diện sẽ hiển thị thông tin chi tiết của vị lãnh đạo đó.</span></span></p>
                                            <p dir="ltr"><span><span>Thông tin được cung cấp sẽ bao gồm ảnh chân dung, thông tin cá nhân và trình độ đào tạo cũng như chuyên môn, nghiệp vụ. Trong trường hợp muốn cập nhật hay thay ảnh đại diện của lãnh đạo thì bạn sẽ click vào biểu tượng máy ảnh nằm ở góc dưới bên phải của ô hiển thị ảnh &gt;&gt; lựa chọn ảnh từ thiết bị &gt;&gt; tải ảnh lên. Lúc này, hệ thống sẽ cập nhật ảnh đại diện mới cho lãnh đạo đó.</span></span></p>
                                            <p dir="ltr"><span><span>Ngay bên dưới ảnh sẽ là thông tin cơ bản về lãnh đạo, để tiến hành chỉnh sửa nội dung thông tin thì thao tác thực hiện như sau:</span></span></p>
                                            <div><span><span>- Chọn “Chỉnh sửa” ở góc trên bên phải của ô thông tin về lãnh đạo &gt;&gt; mục thông tin sẽ hiển thị ở giao diện nhập thông tin &gt;&gt; tiến hành chỉnh sửa nội dung cần thiết &gt;&gt; click “Lưu” để hệ thống cập nhật thông tin mới. </span></span></div>
                                            <div>
                                                <div style={{ textAlign: "center" }}>
                                                    <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                                        <img alt="" height="812" src="/tieu_su_ld_2.png" width="960" />
                                                        <figcaption>Thông tin tiểu sử lãnh đạo</figcaption>
                                                    </figure>
                                                </div>
                                            </div>
                                            <p dir="ltr"><span><span>Bên cạnh các trường thông tin được cung cấp sẵn thì bạn có thể thêm trường thông tin mới để thông tin về lãnh đạo được chi tiết hơn. Thao tác thêm trường thông tin sẽ được thực hiện tại giao diện xem thông tin chi tiết về lãnh đạo.</span></span></p>
                                            <p dir="ltr"><span><span>- Click “Thêm trường” ở góc trên bên phải màn hình.</span></span></p>
                                            <p dir="ltr"><span><span>- Điền thông tin vào biểu mẫu hệ thống cung cấp. Lưu ý, bạn cần điền “tên trường” và nội dung của trường thông tin cần cập nhật. Thiếu một trong hai thì hệ thống sẽ báo lỗi và việc cập nhật không được tiến hành thành công.</span></span></p>
                                            <p dir="ltr"><span><span>- Chọn “Lưu” để cập nhật thông tin và trường thông tin mới.</span></span></p>
                                            <div>
                                                <div style={{ textAlign: "center" }}>
                                                    <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                                        <img alt="" height="812" src="/tieu_su_ld_3.png" width="960" />
                                                        <figcaption>Biểu mẫu thêm trường thông tin</figcaption>
                                                    </figure>
                                                </div>
                                            </div>
                                            <p dir="ltr"><span><span>Khi đã thêm trường thông tin thành công, nội dung sẽ được thể hiện ở ô thông tin bên cạnh. Việc chỉnh sửa và xóa trường thông tin cũng như thông tin tượng ứng là vô cùng dễ dàng.&nbsp;</span></span></p>
                                            <p dir="ltr"><span><span>Lựa chọn “Chỉnh sửa” ở góc trên bên phải trường thông tin vừa được tạo &gt;&gt; hệ thống sẽ hiển thị giao diện nhập nội dung &gt;&gt; chỉnh sửa thông tin &gt;&gt; chọn “Lưu” để cập nhật thông tin mới nhất.</span></span></p>
                                            <p dir="ltr"><span><span>Với trường hợp muốn xóa trường thông tin đã tạo thì bạn sẽ chọn “Xóa” ở bên cạnh mục chỉnh sửa &gt;&gt; popup xác nhận việc xóa trường thông tin sẽ được hiển thị &gt;&gt; click “Hủy” để bỏ thao tác hoặc nhấp chọn “Đồng ý” để tiếp tục việc xóa trường thông tin đó.&nbsp;</span></span></p>
                                            <p dir="ltr"><span><span>Tương tự như vậy bạn có thể thực hiện thao tác cập nhật thông tin, chỉnh sửa hay xóa thông tin trong mục tiểu sử lãnh đạo. Để quay trở về danh sách ban lãnh đạo ban đầu, bạn chỉ cần click vào mũi tên trở về trước “Tiểu sử lãnh đạo”. Lúc này, hệ thống sẽ hiển thị danh sách ban lãnh đạo trong công ty.</span></span></p>
                                            <div>&nbsp;</div>
                                            <p dir="ltr"><span><span>Sơ đồ tổ chức sẽ phản ánh một cách rõ ràng về mô hình hoạt động của công ty, doanh nghiệp hiện nay. Điều này sẽ giúp công ty, doanh nghiệp có thể nắm bắt một cách nhanh chóng về mô hình và xu hướng hoạt động, phát triển của công ty trong tương lai với những phòng ban và chức vụ tương ứng.</span></span></p>
                                            <p dir="ltr"><span><span>Để hiểu rõ hơn, bạn có thể đăng nhập tài khoản nhân viên sau đây và khám phá nhiều hơn về phần mềm Quản trị nhân sự 365 cũng như tính năng Sơ đồ tổ chức bên trong.</span></span></p>
                                            <p dir="ltr"><span><span>User: hunghatv365@gmail.com</span></span></p>
                                            <p dir="ltr"><span><span>Mk: timviec365</span></span></p>
                                            <div>&nbsp;</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 12 ? "block" : "none" }}>
                            <h2 dir="ltr"><span><span>1.Báo cáo nhân sự</span></span></h2>
                            <p dir="ltr"><span><span>Báo cáo nhân sự sẽ là nơi thể hiện rõ nhất về vấn đề con người trong các công ty, doanh nghiệp hiện nay. </span></span></p>
                            <div style={{ textAlign: "center" }}>
                                <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                    <img alt="" height="812" src="/bao_cao_nhan_su_1.png" width="960" />
                                    <figcaption>Thống kê báo cáo nhân sự</figcaption>
                                </figure>
                            </div>
                            <div>
                                <p dir="ltr"><span><span>Với tính năng này, công ty, doanh nghiệp sẽ hiểu rõ hơn về tình hình nhân sự trong công ty, doanh nghiệp mình ở nhiều khía cạnh, trạng thái khác nhau. Không chỉ đơn giản là tổng số nhân viên hay cụ thể về nhân viên nam, nhân viên nữ, báo cáo nhân sự thống kê thông tin nhân sự trên các phương diện khác nhau. Cụ thể thì những bảng thống kê nhân sự trên phần mềm Quản trị nhân sự 365 được thể hiện ở những nội dung sau:</span></span></p>
                                <p dir="ltr"><span><span>- Tổng số nhân viên (nhân viên nam - nhân viên nữ)</span></span></p>
                                <p dir="ltr"><span><span>- Giảm biên chế, nghỉ việc</span></span></p>
                                <p dir="ltr"><span><span>- Bổ nhiệm, quy hoạch</span></span></p>
                                <p dir="ltr"><span><span>- Tăng/ giảm lương</span></span></p>
                                <p dir="ltr"><span><span>- Luân chuyển công tác</span></span></p>
                                <p dir="ltr"><span><span>- Tình trạng hôn nhân</span></span></p>
                                <p dir="ltr"><span><span>- Thâm niên công tác</span></span></p>
                                <p dir="ltr"><span><span>- Độ tuổi nhân viên</span></span></p>
                                <p dir="ltr"><span><span>- Chức vụ nhân viên</span></span></p>
                                <p dir="ltr"><span><span>Mỗi một bảng thống kê sẽ ghi rõ số lượng nhân viên với từng trạng thái tương ứng. Việc cung cấp một cách vừa chi tiết và vừa bao quát như vậy sẽ giúp công ty, doanh nghiệp dễ dàng nắm bắt được tình hình nhân sự trong từng phương diện. Cùng với đó, khi thực hiện việc bấm vào một số ở một mục nhất định trong bảng thống kê thì danh sách nhân viên ở đối tượng đó sẽ được hiển thị trên màn hình.</span></span></p>
                                <p dir="ltr"><span><span>Bên cạnh bảng thống kê thì các biểu đồ cho thể hiện sự biến động của nhân sự ở từng khía cạnh khác nhau cũng được cung cấp trong phần báo cáo nhân sự này. Mỗi một biểu đồ chính là sự phản ánh của các bảng thống kê được xây dựng phía trên. Điều này sẽ giúp doanh nghiệp, công ty nắm bắt nhanh chóng hơn về sự dịch chuyển, thay đổi của nhân sự trong các trạng thái, phương diện khác. Thông qua số liệu được cung cấp ở phần thống kê, biểu đồ sẽ hiển thị chính xác về số lượng nhân sự, cùng với đó là sự thay đổi như thế nào qua thời gian cụ thể.</span></span></p>
                                <p dir="ltr"><span><span>Điểm đặc biệt trên báo cáo nhân sự của phần mềm Quản trị nhân sự 365 chính là bạn có thể nắm rõ được vấn đề về nhân sự ở từng phòng ban với các mốc thời gian cụ thể (theo ngày, theo tháng, theo năm) thông qua bộ lọc được cung cấp.</span></span></p>
                                <div style={{ textAlign: "center" }}>
                                    <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                        <img alt="" height="812" src="/bao_cao_nhan_su_2.png" width="960" />
                                        <figcaption>Bộ lọc báo cáo nhân sự</figcaption>
                                    </figure>
                                </div>
                                <div>
                                    <p dir="ltr"><span><span>- Chọn phòng ban trong công ty, doanh nghiệp có nhu cầu nắm bắt và tìm hiểu tình hình nhân sự.</span></span></p>
                                    <p dir="ltr"><span><span>- Lựa chọn thời gian muốn xem chi tiết. Các lựa chọn gồm: các ngày trong năm, các tháng trong năm, các năm.</span></span></p>
                                    <p dir="ltr"><span><span>- Chọn mốc thời gian tương ứng với sự lựa chọn về thời gian tìm hiểu ở bước trên.&nbsp;</span></span></p>
                                    <p dir="ltr"><span><span>+ Nếu chọn “Các ngày trong năm” thì sẽ chọn 2 mốc thời gian với định dạng đầy đủ về tháng/ ngày/ năm.</span></span></p>
                                    <p dir="ltr"><span><span>+ Nếu chọn “Các tháng trong năm” thì 2 mốc thời gian sẽ cần chọn theo định dạng năm/tháng.</span></span></p>
                                    <p dir="ltr"><span><span>+ Chọn “Các năm” thì 2 mốc thời gian sẽ cần chọn là khoảng năm tương ứng.</span></span></p>
                                    <p dir="ltr"><span><span>- Nhấp chuột vào biểu tượng chiếc kính, hệ thống sẽ hiển thị chi tiết tình hình nhân sự của phòng ban đó trong thời gian đó ở từng bảng thống kê và biểu đồ các phương diện khác nhau.&nbsp;</span></span></p>
                                    <div>
                                        <h2 dir="ltr"><span><span>2. Báo cáo tin tuyển dụng</span></span></h2>
                                        <p dir="ltr"><span><span>Bên cạnh báo cáo nhân sự trong công ty thì báo cáo tin tuyển dụng cũng là tính năng mà phần mềm Quản trị nhân sự 365 xây dựng và cung cấp cho công ty, doanh nghiệp.</span></span></p>
                                        <div style={{ textAlign: "center" }}>
                                            <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                                <img alt="" height="812" src="/bao_cao_nhan_su_3.png" width="960" />
                                                <figcaption>Báo cáo tin tuyển dụng</figcaption>
                                            </figure>
                                        </div>
                                        <div>
                                            <p dir="ltr"><span><span>Tại đây sẽ thống kê toàn bộ thông tin về số lượng cụ thể ở các phương diện khác nhau trong vấn đề tuyển dụng. Bao gồm: Tổng số tin tuyển dụng được thực hiện, Tổng số hồ sơ đã nhận được, Tống số ứng viên cần tuyển, Số ứng viên đến phỏng vấn, Số ứng viên qua phỏng vấn, Số ứng viên nhận/ thử việc.</span></span></p>
                                            <p dir="ltr"><span><span>Việc thống kê như vậy sẽ giúp công ty, doanh nghiệp dễ dàng nắm bắt một cách chính xác hơn về tình hình tuyển dụng ứng viên của công ty. Bên cạnh con số thống kế tổng quát thì báo cáo tuyển dụng còn có các bảng thống kê chi tiết như:&nbsp;</span></span></p>
                                            <p dir="ltr"><span><span>- Báo cáo chi tiết theo tin tuyển dụng</span></span></p>
                                            <p dir="ltr"><span><span>Bảng báo cáo chi tiết về tin tuyển dụng sẽ hiển thị rõ từng tin tuyển dụng được công ty thực hiện, tổng số ứng viên của từng tin đó, tổng số hồ sơ, số hồ sơ đạt yêu cầu và số ứng viên đến phỏng vấn.&nbsp;</span></span></p>
                                            <p dir="ltr"><span><span>Các thông tin này sẽ được hiển thị theo dạng bảng để số liệu được thể hiện rõ ràng và chi tiết hơn.</span></span></p>
                                            <p dir="ltr"><span><span>- Báo cáo chi tiết nhân viên thực hiện tuyển dụng</span></span></p>
                                            <p dir="ltr"><span><span>Đây sẽ là bảng báo cáo về nhân viên thực hiện tuyển dụng dựa trên số tin tuyển dụng đang theo dõi và số hồ sơ nhận được.</span></span></p>
                                            <p dir="ltr"><span><span>- Báo cáo chi tiết theo nhân viên giới thiệu ứng viên và tiền thưởng trực tiếp</span></span></p>
                                            <p dir="ltr"><span><span>Là bảng thống kê lại những nhân viên đã giới thiệu ứng viên và số lượng ứng viên giới thiệu là bao nhiêu. Điều này sẽ phản ánh được khả năng tìm kiếm ứng viên, gợi ý ứng viên và số hoa hồng mà nhân viên đó đạt được.</span></span></p>
                                            <p dir="ltr"><span><span>Tổng quát thì chức năng báo cáo nhân sự của phần mềm Quản trị nhân sự 365 sẽ là công cụ giúp công ty, doanh nghiệp có thể nắm bắt chính xác và rõ ràng hơn về tình hình nhân sự và tình hình tuyển dụng.&nbsp;</span></span></p>
                                            <p dir="ltr"><span><span>Các bạn có thể đăng nhập tài khoản nhân viên để hiểu rõ hơn về phần mềm này với tài khoản được cung cấp sau đây:</span></span></p>
                                            <p dir="ltr"><span><span>User: hunghatv365@gmail.com</span></span></p>
                                            <p dir="ltr"><span><span>Mk: timviec365</span></span></p>
                                            <div>&nbsp;</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 13 ? "block" : "none" }}>
                            <h2 dir="ltr"><span><span>1. Cài đặt chung</span></span></h2>
                            <p dir="ltr"><span><span>Ở phần cài đặt chung, bạn có thể thấy được các nội dung bên trong gồm: Phân quyền người dùng, Thông báo, Nhắc nhở, ngôn ngữ và Giao diện.</span></span></p>
                            <p dir="ltr"><span><span>- Phân quyền người dùng</span></span></p>
                            <p dir="ltr"><span><span>Với tính năng này, bạn có thể thực hiện việc phân quyền cho một nhân viên hay một phòng ban hoặc tất cả thành viên trong công ty có thể thực hiện thao tác bất kỳ nào đó trên phần mềm Quản trị nhân lực 365 sau khi đăng nhập bằng tài khoản của nhân viên.</span></span></p>
                            <div style={{ textAlign: "center" }}>
                                <figure className={`${styles.image}`} style={{ display: "inline-block" }}>
                                    <img alt="" height="812" src="/cai_dat_phan_quyen.png" width="960" />
                                    <figcaption>Quản lý quyền người dùng</figcaption>
                                </figure>
                            </div>
                            <div>
                                <p dir="ltr"><span><span>Nhấp chuột vào phân quyền người dùng, hệ thống sẽ hiển thị bảng Quản lý phân quyền chung cho người dùng. Thao tác thực hiện việc phân quyền như sau:</span></span></p>
                                <p dir="ltr"><span><span>+ Chọn nhân viên được phân quyền trên thanh chọn ở đầu bảng. Bạn có thể chọn cá nhân, chọn phòng ban hoặc chọn tất cả tùy theo nhu cầu, mục đích của công ty. Khi lựa chọn phân quyền theo phòng ban thì những nhân viên thuộc phòng ban đó sẽ có quyền tương tự.</span></span></p>
                                <p dir="ltr"><span><span>+ Chọn quyền tương ứng với danh mục nhất định trong phần mềm Quản trị nhân sự 365. Các quyền được cung cấp gồm Xem, Chỉnh sửa, Tạo mới và Xoá. Click chuột vào ô vuông tương ứng với danh mục được phân quyền và quyền được thao tác.</span></span></p>
                                <p dir="ltr"><span><span>+ Sau khi thực hiện việc xét quyền thì bạn sẽ chọn “Cập nhật” để lưu trữ việc phân quyền thành công và đảm bảo người được phân quyền có thể thực hiện được đúng quyền của tài khoản trên phần mềm.</span></span></p>
                                <p dir="ltr"><span><span>Khi bạn đã phân quyền thành công thì sau khi chọn tên nhân viên, phòng ban đó trên thanh chọn thì hệ thống sẽ hiển thị quyền gần nhất mà nhân viên, phòng ban được cấp.&nbsp;</span></span></p>
                                <p dir="ltr"><span><span>- Thông báo</span></span></p>
                                <p dir="ltr"><span><span>Đây là mục để bạn có thể cài đặt thông báo cho tài khoản công ty mình trên phần mềm Quản trị nhân sự 365. Bạn có thể cài đặt thông báo với 2 nội dung là:</span></span></p>
                                <p dir="ltr"><span><span>+ Nhận thông báo với những nội dung tôi theo dõi</span></span></p>
                                <p dir="ltr"><span><span>+ Nhận thông báo với những nội dung tôi theo dõi</span></span></p>
                                <p dir="ltr"><span><span>Để cài đặt thông báo với nội dung mong muốn thì bạn chỉ cần nhấp vào hình tròn ở thanh trượt để đồng ý và từ chối nhận thông báo. Nếu thanh trượt chuyển sang màu xanh là đồng ý, còn hiển thị màu xám là từ chối.</span></span></p>
                                <p dir="ltr"><span><span>- Nhắc nhở</span></span></p>
                                <p dir="ltr"><span><span>Nhắc nhở là tính năng phần mềm Quản trị nhân sự 365 cung cấp giúp cho tài khoản công ty nhận được nhắc nhở với những nội dung đến hạn hay quá hạn.</span></span></p>
                                <p dir="ltr"><span><span>+ Nhắc nhở khi các nội dung tôi theo dõi đến hạn/quá hạn</span></span></p>
                                <p dir="ltr"><span><span>+ Nhắc nhở khi các nội dung tôi tạo ra đến hạn/quá hạn.</span></span></p>
                                <p dir="ltr"><span><span>Để thực hiện cài đặt nhắc nhở này bạn cũng sẽ thao tác tương tự như thông báo. Trượt thanh ngang để tiến hành cài đặt hoặc không.</span></span></p>
                                <p dir="ltr"><span><span>- Ngôn ngữ</span></span></p>
                                <p dir="ltr"><span><span>Phần mềm Quản trị nhân sự 365 được xây dựng với 2 ngôn ngữ là tiếng Anh và tiếng Việt. Bạn chỉ cần lựa chọn ngôn ngữ mình mong muốn và click vào ngôn ngữ đó là hệ thống sẽ thay đổi theo cài đặt được xác nhận.</span></span></p>
                                <p dir="ltr"><span><span>- Giao diện</span></span></p>
                                <p dir="ltr"><span><span>Hiện tại, giao diện của phần mềm Quản trị nhân sự 365 có&nbsp; 2 giao diện cơ bản là phông trắng và danh mục xanh hoặc ngược lại, phông xanh và danh mục trắng. Bạn có thể thực hiện việc thay đổi giao diện bằng cách click vào giao diện đó, hệ thống sẽ đổi sau khi lựa chọn của bạn được xác nhận.</span></span></p>
                                <div><h2 dir="ltr"><span><span>2. Thông tin bảo mật</span></span></h2>
                                    <p dir="ltr"><span><span>Khi chọn phần thông tin bảo mật, nội dung đầu tiên bạn sẽ thấy chính là thông tin bảo mật với việc hiển thị các trình duyệt mà tài khoản công ty, doanh nghiệp của bạn đã được đăng nhập và truy cập.&nbsp;</span></span></p>
                                    <p dir="ltr"><span><span>Trong trường hợp không phải bạn đăng nhập ở trình duyệt nào đó thì chỉ cần chạm vào biểu tượng ba chấm ở cuối thông tin trình duyệt đó, lựa chọn “Không phải bạn?” hoặc “Đăng xuất”. Nếu chọn “Không phải bạn” thì hệ thống sẽ tiến hành việc báo cáo trình duyệt này cũng như cách thức xử lý nếu đó không phải là lần thực hiện đăng nhập của bạn. Còn lựa chọn “Đăng xuất” thì hệ thống sẽ đăng xuất tài khoản của bạn tại trình duyệt đó.</span></span></p>
                                    <p dir="ltr"><span><span>Bên cạnh đó, bạn có thể thực hiện việc đăng xuất tài khoản khỏi tất cả các trình duyệt đã đăng nhập tài khoản trên phần mềm Quản trị nhân sự 365 chỉ bằng một thao tác đó là click vào “Đăng xuất khỏi tất cả” nằm ở bên tay phải màn hình và ở cuối của danh sách trình duyệt đăng nhập. Trong trường hợp danh sách đó dài thì bạn cần chọn “Xem thêm” &gt;&gt; chọn “Đăng xuất khỏi tất cả”.</span></span></p>
                                    <p dir="ltr"><span><span>Để thực hiện việc đổi mật khẩu của tài khoản đăng nhập công ty trên phần mềm thì bạn sẽ chuyển xuống mục đổi mật khẩu phía bên dưới thông tin đăng nhập. Click chuột vào biểu tượng tam giác hướng xuống, hệ thống sẽ hiển thị biểu mẫu đổi mật khẩu để bạn thực hiện thao tác.</span></span></p>
                                    <p dir="ltr"><span><span>+ Nhập mật khẩu hiện tại</span></span></p>
                                    <p dir="ltr"><span><span>+ Nhập mật khẩu mới</span></span></p>
                                    <p dir="ltr"><span><span>+ Nhập lại mật khẩu mới</span></span></p>
                                    <p dir="ltr"><span><span>Nếu bạn nhập được hết thông tin trên thì chọn “Lưu thay đổi” để hoàn thiện việc đổi mật khẩu cho tài khoản. Trong trường hợp bạn quên mật khẩu cũ thì sẽ chọn “Quên mật khẩu”. Hệ thống sẽ đưa bạn tới giao diện xác minh thông tin tài khoản và tiến hành đổi mật khẩu mới.</span></span></p>
                                    <p dir="ltr"><span><span>Hai tính năng còn lại của thông tin bảo mật chính là “Lưu thông tin đăng nhập của bạn” và “Nhận cảnh báo về những lần đăng nhập lạ”. Để cài đặt 2 tính năng này thì bạn chỉ cần di chuyển và thay đổi thanh trượt bên cạnh mỗi mục. Thanh trượt màu xanh sẽ là đồng ý, còn màu xám là từ chối thiết lập cài đặt nội dung này.</span></span></p><h2 dir="ltr"><span><span>3. Nhật ký hoạt động</span></span></h2>
                                    <p dir="ltr"><span><span>Nhật ký hoạt động là mục lưu trữ lại những nội dung công việc bạn thực hiện trên tài khoản của phần mềm Quản trị nhân sự 365. Phần nhật ký sẽ được xây dựng theo dạng bảng với các cột thông tin như:</span></span></p><p dir="ltr"><span><span>- Ngày/ tháng/ năm</span></span></p>
                                    <p dir="ltr"><span><span>- Công việc</span></span></p><p dir="ltr"><span><span>- Thời gian</span></span></p><p dir="ltr"><span><span>- Chức năng</span></span></p><p dir="ltr"><span><span>Khi truy cập vào nhật ký hoạt động, bạn sẽ biết được mình đã làm gì và thao tác gì trên tài khoản, cùng với đó là những hoạt động khác được thực hiện trên phần mềm Quản trị nhân sự với tài khoản thuộc công ty ở thời gian cụ thể. Nếu bạn muốn xóa nhật ký hoạt động thì chỉ cần nhấp chuột vào biểu tượng thùng rác của nhật ký tương ứng nằm ở cột chức năng và chọn “Xóa” để thao tác.</span></span></p>
                                    <p dir="ltr"><span><span>Để tìm kiếm công việc đã làm trong nhật ký hoạt động thì bạn chỉ cần nhập tên công việc vào ô tìm kiếm. Chọn biểu tượng chiếc kính, hệ thống sẽ gửi lại kết quả cho bạn ngay sau đó.</span></span></p><p dir="ltr"><span><span>Bạn có thể hiểu rõ hơn về những nội dung trên thông qua việc trải nghiệm phần mềm bằng tài khoản nhân viên được cung cấp dưới đây:</span></span></p><p dir="ltr"><span><span>User: hunghatv365@gmail.com</span></span></p>
                                    <p dir="ltr"><span><span>Mk: timviec365</span></span></p><div>&nbsp;</div></div>
                            </div>
                        </div>
                        <div className={`${styles.content}`} style={{ marginTop: 60, display: isDiv === 14 ? "block" : "none" }}>
                            <p dir="ltr"><span><span>Dữ liệu đã xóa gần đây sẽ là phần lưu trữ lại một số nội dung đã xóa trong tài khoản công ty của bạn. Những nội dung đó sẽ được lưu tại mục này trong vòng 5 ngày tình từ thời điểm xóa sau đó sẽ bị xóa vĩnh viễn. Vì thế, bạn có thể tiến hành khôi phục lại những dữ liệu đã xóa này nếu vẫn còn hạn 5 ngày đó.</span></span></p>
                            <p dir="ltr"><span><span>những nội dung sau khi xóa sẽ được lưu tại Dữ liệu đã xóa gần đây bao gồm:</span></span></p>
                            <p dir="ltr"><span><span>- Quy trình tuyển dụng</span></span></p>
                            <p dir="ltr"><span><span>- Tin tuyển dụng</span></span></p>
                            <p dir="ltr"><span><span>- Vị trí công việc</span></span></p>
                            <p dir="ltr"><span><span>- Quy trình đào tạo</span></span></p>
                            <p dir="ltr"><span><span>- Quy định làm việc</span></span></p>
                            <p dir="ltr"><span><span>- Chính sách nhân viên</span></span></p>
                            <p dir="ltr"><span><span>Để thực hiện việc khôi phục dữ liệu đã xóa thì bạn sẽ thực hiện như sau:</span></span></p>
                            <p dir="ltr"><span><span>- Chọn nội dung, dữ liệu sẽ khôi phục, click vào ô của dữ liệu tương ứng. Nếu bạn muốn khôi phục tất cả nội dung nằm trong những mục trên thì có thể lựa chọn ô “Tất cả” của danh mục đó.</span></span></p>
                            <p dir="ltr"><span><span>- Sau khi đã chọn xong thì bạn click chuột vào biểu tượng đồng hồ quay ngược nằm ở phía trên bảng lưu trữ nội dung, dữ liệu xóa gần đây. Lúc này, hệ thống sẽ khôi phục lại dữ liệu đã chọn vào đúng danh mục ban đầu và biến mất khỏi Dữ liệu đã xóa gần đây.</span></span></p>
                            <p dir="ltr"><span><span>Còn trong trường hợp bạn muốn xóa hoàn toàn dữ liệu đó khi không muốn đợi qua 5 ngày thì chỉ cần click vào biểu tượng thùng rác ngay bên cạnh biểu tượng khôi phục. Khi đó, dữ liệu đã xóa sẽ bị xóa hoàn toàn khỏi hệ thống. Lưu ý là thao tác này được thực hiện khi bạn đã chọn nội dung cần xóa hoàn toàn.</span></span></p>
                            <p dir="ltr"><span><span>Trong trường hợp dữ liệu xóa gần đây của bạn khá nhiều thì bạn có thể thực hiện việc tìm kiếm để lựa chọn đơn giản hơn. Nhập “Tên nội dung” sau đó click biểu tượng tìm kiếm, bạn sẽ nhận được kết quả trong vòng một nốt nhạc.&nbsp;</span></span></p>
                            <p dir="ltr"><span><span>Sử dụng tài khoản nhân viên sau đây để có những quan sát thực tế cho mình trên phần mềm Quản trị nhân sự 365 nhé.</span></span></p>
                            <p dir="ltr"><span><span>User: hunghatv365@gmail.com</span></span></p>
                            <p dir="ltr"><span><span>Mk: timviec365</span></span></p>
                            <div>&nbsp;</div>
                            <p>&nbsp;</p>
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
