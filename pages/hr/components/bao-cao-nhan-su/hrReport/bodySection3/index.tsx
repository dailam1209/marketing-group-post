import React from "react";
import styles from "./bodySection3.module.css";
import LineChart from "./charts";

export default function InfomationSection3({
    dateInRange,
    hrReportList
}: any) {
    const categorie = dateInRange;

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.t_chart_bot}`} style={{ marginBottom: 40 }}>
                <p className={`${styles.chart_title}`}>
                    Biểu đồ thống kê số nhân viên mới
                </p>
                <LineChart
                    categories={categorie}
                    data_line1={hrReportList?.data?.chartEmployee}
                    line_name1="Nhân viên mới"
                    line_name2=""
                    des="Biểu đồ nhân viên mới"
                />
            </div>
            <div className={`${styles.t_chart_bot}`} style={{ marginBottom: 40 }}>
                <p className={`${styles.chart_title}`}>
                    Biểu đồ thống kê nhân viên nghỉ việc / giảm biên chế
                </p>
                <LineChart
                    categories={categorie}
                    data_line1={hrReportList?.data?.chartNghiViec}
                    data_line2={hrReportList?.data?.chartGiamBienChe}
                    line_name1="Nghỉ việc"
                    line_name2="Giảm biên chế"
                    des="Biểu đồ giảm biên chế nghỉ việc"
                />
            </div>
            <div className={`${styles.t_chart_bot}`} style={{ marginBottom: 40 }}>
                <p className={`${styles.chart_title}`}>
                    Biểu đồ thống kê bổ nhiệm, quy hoạch
                </p>
                <LineChart
                    categories={categorie}
                    data_line1={hrReportList?.data?.chartBoNhiem}
                    line_name1="Bổ nhiệm quy hoạch"
                    des="Biểu đồ bổ nhiệm quy hoạch"
                />
            </div>
            <div className={`${styles.t_chart_bot}`} style={{ marginBottom: 40 }}>
                <p className={`${styles.chart_title}`}>
                    Biểu đồ thống kê tăng, giảm lương
                </p>
                <LineChart
                    categories={categorie}
                    data_line1={hrReportList?.data?.chartTangGiamLuong}
                    line_name1="Tăng, giảm lương"
                    des="Biểu đồ thông kê tăng giảm lương"
                />
            </div>
            <div className={`${styles.t_chart_bot}`} style={{ marginBottom: 40 }}>
                <p className={`${styles.chart_title}`}>
                    Biểu đồ thống kê luân chuyển công tác
                </p>
                <LineChart
                    categories={categorie}
                    data_line1={hrReportList?.data?.chartLuanChuyen}
                    line_name1="Nghỉ việc"
                    des="Biểu đồ thống kê luân chuyển công tác"
                />
            </div>
            <div className={`${styles.t_chart_bot}`} style={{ marginBottom: 40 }}>
                <p className={`${styles.chart_title}`}>
                    Biểu đồ thống kê tình trạng hôn nhân
                </p>
                <LineChart
                    categories={categorie}
                    data_line1={hrReportList?.data?.chartDaketHon}
                    data_line2={hrReportList?.data?.chartDocThan}
                    line_name1="Đã kết hôn"
                    line_name2="Độc thân"
                    des="Biểu đồ thống  kê tình trạng hôn nhân"
                />
            </div>
            <div className={`${styles.t_chart_bot}`} style={{ marginBottom: 40 }}>
                <p className={`${styles.chart_title}`}>
                    Biểu đồ thống kê trình độ học vấn
                </p>
                <LineChart
                    categories={categorie}
                    data_line1={hrReportList?.data?.chartHocVanTrenDH}
                    data_line2={hrReportList?.data?.chartHocVanDH}
                    data_line3={hrReportList?.data?.chartHocVanCD}
                    data_line4={hrReportList?.data?.chartHocVanTC}
                    data_line5={hrReportList?.data?.chartHocVanNghe}
                    data_line6={hrReportList?.data?.chartHocVanDuoiTHPT}
                    line_name1="Trên đại học"
                    line_name2="Đại học"
                    line_name3="Cao đẳng"
                    line_name4="Trung cấp "
                    line_name5="Đào tạo nghề"
                    line_name6="Dưới THPT"
                    des="Biểu đồ giảm biên chế nghỉ việc"
                />
            </div>
            <div className={`${styles.t_chart_bot}`} style={{ marginBottom: 40 }}>
                <p className={`${styles.chart_title}`}>Biểu đồ thống kê độ tuổi</p>
                <LineChart
                    categories={categorie}
                    data_line1={hrReportList?.data?.chartDuoi30tuoi}
                    data_line2={hrReportList?.data?.chart30den44tuoi}
                    data_line3={hrReportList?.data?.chart45den59tuoi}
                    data_line4={hrReportList?.data?.chartTren60tuoi}
                    line_name1="Dưới 30 tuổi"
                    line_name2="30 - 44 tuổi"
                    line_name3="45 - 59 tuổi"
                    line_name4="Trên 60 tuổi "
                    des="Biểu đồ thống kê độ tuổi"
                />
            </div>
        </div>
    );
}
