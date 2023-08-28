// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./campaign_detail.module.css";
// import InputText from "./input_text";
import { Input, Tooltip } from 'antd';

export default function AddOrderDetailInfo() {
    return (
        <div>
            <div className={styles.main__campaign__body}>
            <p className={styles.main__body__type}>Thông tin chung</p>
            <div className={styles.main__content__body}>
                <div className={styles.row}>
                <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}>

                            <div className={`${styles.main__body__item__title}`}><b>Tên chiến dịch:</b></div>
                            <div className={`${styles.main__body__item__value}`}>a</div>
                        </div>
                    </div>
                     
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Loại:</b></div>
                            <div className={`${styles.main__body__item__value}`}>Gửi mail</div>
                        </div>
                    </div>
                    
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Tình trạng:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.stt_yellow}`}>Chưa diễn ra</div>
                        </div>
                    </div>
                     
                    <div className={`${styles["col-lg-3"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Ngày bắt đầu:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>
                     
                    <div className={`${styles["col-lg-3"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}>

                        <div className={`${styles.main__body__item__title}`}><b>Ngày kết thúc:</b></div>
                        <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>
                     
                    <div className={`${styles["col-lg-3"]} `}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Ngân sách:</b></div>
                            <div className={`${styles.main__body__item__value} `}>12.000 VNĐ</div>
                        </div>
                    </div>
                    <div className={`${styles["col-lg-3"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}>

                        <div className={`${styles.main__body__item__title}`}><b>Doanh số:</b></div>
                        <div className={`${styles.main__body__item__value}`}>12.200 VNĐ</div>
                        </div>
                    </div>


                     
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Kênh truyền thống:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Số đã chi:</b></div>
                            <div className={`${styles.main__body__item__value} `}>121.212.000 VNĐ</div>
                        </div>
                    </div>

                     
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Nhân viên phụ trách:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>
                    

                </div>
            </div>

            <p className={styles.main__body__type}>Thông tin mô tả</p>
            <div className={styles.main__content__body}>
                <div className={styles.row}>
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item_des} ${styles.d_flex} `}>

                            <div className={`${styles.main__body__item__title}`}><b>Mô tả:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>
                </div>
            </div>

            <p className={styles.main__body__type}>Thông tin hệ thống</p>
            <div className={styles.main__content__body}>
                <div className={styles.row}>
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}>

                            <div className={`${styles.main__body__item__title}`}><b>Người tạo:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật
                                {/* <div style={{ display: "flex", justifyContent: 'center' }}> <div><img src="/crm/user_kh.png" alt="" /></div>&nbsp;Nguyễn Văn Nam</div> */}
                            </div>
                        </div>
                    </div>

                     

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Ngày tạo:</b></div>
                            <div className={`${styles.main__body__item__value}`}>14:46 - 08/08/2023</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Người sửa:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật
                                {/* <div style={{ display: "flex", justifyContent: 'center' }}> <div><img src="/crm/user_kh.png" alt="" /></div>&nbsp;Nguyễn Văn Nam</div> */}
                            </div>
                        </div>
                    </div>

                     

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Ngày sửa:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Dùng chung:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}><i className="bi bi-check2-circle"></i></div>
                        </div>
                    </div>

                     

                    

                </div>
            </div>

            </div>
            
        </div>
    );
}
