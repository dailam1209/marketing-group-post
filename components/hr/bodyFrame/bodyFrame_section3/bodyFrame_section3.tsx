import React from 'react';
import styles from './bodyFrame_section3.module.css'

export interface BodyFrameSection3 {

}

export default function BodyFrameSection3({ children }: any) {
    return (
        <>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.text}`}>Ưu điểm vượt trội của hệ sinh thái Chuyển đổi số 365</div>
                <div className={`${styles.item_list}`}>
                    <div className={`${styles.item}`}>
                        <div > <img className={`${styles.item_image}  ${styles.item_child}`} src={`/an_toan_bao_mat.svg`} alt="" /></div>
                        <div className={`${styles.item_title}  ${styles.item_child}`}>An toàn và bảo mật</div>
                        <div className={`${styles.item_text}  ${styles.item_child}`}>An toàn, bảo mật tuyệt đối, dữ liệu được lưu trữ theo mô hình điện toán đám mây.</div>
                        <a target='blank' href="https://chamcong.timviec365.vn/uu-diem-vuot-troi.html" className={`${styles.item_detail}  ${styles.item_child}`}>Xem chi tiết <img src="/arrow-right.png" alt="" /> </a>
                    </div>
                    <div className={`${styles.item}`}>
                        <div > <img className={`${styles.item_image} ${styles.item_child}`} src={`/mot_nen_tang_duy_nhat.svg`} alt="" /></div>
                        <div className={`${styles.item_title}  ${styles.item_child}`}>Một nền tảng duy nhất</div>
                        <div className={`${styles.item_text}  ${styles.item_child}`}>Tích hợp tất cả các ứng dụng doanh nghiệp của bạn đang cần trên cùng một nền tảng duy nhất..</div>
                        <a target='blank' href="https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#tichhop" className={`${styles.item_detail}  ${styles.item_child}`}>Xem chi tiết <img src={`/arrow-right.png`} alt="" /> </a>
                    </div>
                    <div className={`${styles.item}`}>
                        <div > <img className={`${styles.item_image}  ${styles.item_child}`} src={`/cong_nghe_ai.svg`} alt="" /></div>
                        <div className={`${styles.item_title}  ${styles.item_child}`}>Ứng dụng công nghệ AI</div>
                        <div className={`${styles.item_text} ${styles.item_child}`}>Ứng dụng Công nghệ AI tự nhận thức phân tích hành vi người dùng giải quyết toàn diện các bài đối với từng doanh nghiệp cụ thể.</div>
                        <a target='blank' href="https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#ungdung" className={`${styles.item_detail}  ${styles.item_child}`}>Xem chi tiết <img src={`/arrow-right.png`} alt="" /> </a>
                    </div>
                    <div className={`${styles.item}`}>
                        <div > <img className={`${styles.item_image}`} src={`/giai_phap_so_1.svg`} alt="" /></div>
                        <div className={`${styles.item_title}  ${styles.item_child}`}>Giải pháp số 1 Việt Nam</div>
                        <div className={`${styles.item_text}  ${styles.item_child}`}>Luôn đồng hành và hỗ trợ 24/7. Phù hợp với cả những tập đoàn xuyên quốc gia đến những công ty SME.</div>
                        <a target='blank' href="https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#donghanh" className={`${styles.item_detail}  ${styles.item_child}`}>Xem chi tiết <img src={`/arrow-right.png`} alt="" /> </a>
                    </div>
                    <div className={`${styles.item}`}>
                        <div > <img className={`${styles.item_image}`} src={`/mien_phi_tron_doi.svg`} alt="" /></div>
                        <div className={`${styles.item_title}  ${styles.item_child}`}>Sử dụng miễn phí trọn đời</div>
                        <div className={`${styles.item_text}  ${styles.item_child}`}>Miễn phí trọn đời đối với tất cả các doanh nghiệp đăng ký trong đại dịch Covid 19.</div>
                        <a target='blank' href="https://chamcong.timviec365.vn/uu-diem-vuot-troi.html#mienphi" className={`${styles.item_detail}  ${styles.item_child}`}>Xem chi tiết <img src={`/arrow-right.png`} alt="" /> </a>
                    </div>
                </div>

            </div>
        </>
    )
}