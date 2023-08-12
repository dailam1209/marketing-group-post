import React, { useEffect, useState } from "react";
import styles from "./activityLog.module.css";
import BodyFrameFooter from "@/components/bodyFrame/bodyFrame_footer/bodyFrame_footer";

export default function ActivityLog() {

    const [dropdownToday, setDropdownToday] = useState(false)
    const [dropdownSomeday, setDropdownSomeday] = useState(false)

    const handleDropdownToday = () => {
        setDropdownToday(!dropdownToday);
    }
    const handleDropdownSomeday = () => {
        setDropdownSomeday(!dropdownSomeday)
    }


    const data: any = [
        {
            congviec: 'Quản lý cuộc họp > Cuộc họp phòng Kinh Doanh',
            details: 'Phạm An đã tải lên biên bản họp',
            time: '15:00'
        },
        {
            congviec: 'Quản lý cuộc họp > Cuộc họp phòng Kinh Doanh',
            details: 'Phạm An đã tải lên biên bản họp',
            time: '15:00'
        },

    ]

    return <>
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.tab_content}`}>
                <div className={`${styles.tab_pane}`}>
                    <div className={`${styles.menu3_search}`}>
                        <div className={`${styles.form_search_r}`}>
                            <form action="" className={`${styles.form_search}`}>
                                <div className={`${styles.l_div_search}`}>
                                    <input type="search" placeholder="Tìm kiếm" name="search" />
                                    <a href="">
                                        <img style={{ verticalAlign: 'middle' }} src='/t-icon-search.png' alt="" />
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={`${styles.menu3_table}`}>
                        <table className={`${styles.menu3_table} ${styles.menu3_table_new}`}>
                            <thead className={`${styles.menu3_tr} ${styles.menu3_background1}`}>
                                <tr>
                                    <th className={`${styles.menu3_td} ${styles.menu3_tbl_padding} ${styles.l_size1}`}>Ngày/tháng/năm</th>
                                    <th className={`${styles.menu3_td} ${styles.menu3_tbl_padding} ${styles.l_size2}`}>Công việc</th>
                                    <th className={`${styles.menu3_td} ${styles.menu3_tbl_padding} ${styles.l_size1}`}>Thời gian</th>
                                    <th className={`${styles.menu3_td} ${styles.menu3_tbl_padding} ${styles.l_size1}`}>Chức năng</th>
                                </tr>
                            </thead>
                            <tfoot></tfoot>
                            <thead className={`${styles.menu3_thread}`}>
                                <tr>
                                    <td style={{ color: '#474747' }} className={`${styles.menu3_td} ${styles.menu3_tbl_padding}`}>
                                        Hôm nay
                                        <img style={{ cursor: 'pointer' }} className={`${styles.l_icon_down}`} src="/icon_down.svg" alt=" " onClick={handleDropdownToday} />
                                    </td>
                                </tr>
                            </thead>
                            {dropdownToday && (
                                <thead className={`${styles.menu3_tbody}`}>
                                    {data.map((item: any, index: any) => (
                                        <tr key={index} className={`${styles.menu3_border}`}>
                                            <td className={`${styles.menu3_td} ${styles.menu3_tbl_padding} ${styles.menu3_color}`}></td>
                                            <td className={`${styles.menu3_td} ${styles.menu3_tbl_padding} ${styles.menu3_color}`}>
                                                <p>{item.congviec}</p>
                                                <p>{item.details}</p>
                                            </td>
                                            <td className={`${styles.menu3_td} ${styles.menu3_tbl_padding} ${styles.menu3_color}`}>{item.time}</td>
                                            <td className={`${styles.menu3_td} ${styles.menu3_tbl_padding} ${styles.menu3_delete}`}>
                                                <img className={`${styles.l_icon_down}`} src="/icon_thungrac.svg" alt="" />
                                                <div className={`${styles.menu3_delete_text} ${styles.menu3_color}`}>Xóa</div>
                                            </td>
                                        </tr>
                                    ))}
                                </thead>
                            )}
                            <thead className={`${styles.menu3_thread}`}>
                                <tr>
                                    <td style={{ color: '#474747' }} className={`${styles.menu3_td} ${styles.menu3_tbl_padding}`}>
                                        11/06/2023
                                        <img style={{ cursor: 'pointer' }} className={`${styles.l_icon_down}`} src="/icon_down.svg" alt=" " onClick={handleDropdownSomeday} />
                                    </td>
                                </tr>
                            </thead>
                            {dropdownSomeday && (
                                <thead className={`${styles.menu3_tbody}`}>
                                    {data.map((item: any, index: any) => (
                                        <tr key={index} className={`${styles.menu3_border}`}>
                                            <td className={`${styles.menu3_td} ${styles.menu3_tbl_padding} ${styles.menu3_color}`}></td>
                                            <td className={`${styles.menu3_td} ${styles.menu3_tbl_padding} ${styles.menu3_color}`}>
                                                <p>{item.congviec}</p>
                                                <p>{item.details}</p>
                                            </td>
                                            <td className={`${styles.menu3_td} ${styles.menu3_tbl_padding} ${styles.menu3_color}`}>{item.time}</td>
                                            <td className={`${styles.menu3_td} ${styles.menu3_tbl_padding} ${styles.menu3_delete}`}>
                                                <img className={`${styles.l_icon_down}`} src="/icon_thungrac.svg" alt="" />
                                                <div className={`${styles.menu3_delete_text}`}>Xóa</div>
                                            </td>
                                        </tr>
                                    ))}
                                </thead>
                            )}
                        </table>
                    </div>
                </div>
                <BodyFrameFooter src="https://www.youtube.com/embed/LQeb7_tmWUs" />
            </div>
        </div>
    </>
}