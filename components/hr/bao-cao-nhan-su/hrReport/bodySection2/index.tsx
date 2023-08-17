import React from 'react';
import styles from './bodySection2.module.css'
import { useRouter } from "next/router";

const BodySection2 = ({ title, img1, img2, img3, img4, img5, img6, details_title1, details_title2, details_title3
    , details_title4, details_title5, details_title6, number1, number2, number3, number4, number5, number6, handleClickDetail,
    link_title1, link_title2, link_title3, link_title4, link_title5, link_title6
}: any) => (
    <div className={`${styles.t_rp}`}>
        <div className={`${styles.t_exp_header}`}>
            <p>{title}</p>
        </div>
        <div className={`${styles.t_exp_body}`}>
            <div className={`${styles.body_row}`}>
                <div className={styles.body_row_img}>
                    <img src={img1} />
                </div>
                <div className={styles.body_row_img}>
                    <img src={img2} />
                </div>
                <div className={styles.body_row_img}>
                    <img src={img3} />
                </div>
                <div className={styles.body_row_img}>
                    <img src={img4} />
                </div>
                <div className={styles.body_row_img}>
                    <img src={img5} />
                </div>
                <div className={styles.body_row_img}>
                    <img src={img6} />
                </div>
            </div>
            <div className={`${styles.body_row}`}>
                <div className={`${styles.body_row_title}`}>
                    <p>
                        <a href="" onClick={(event) => handleClickDetail(link_title1, event)}>{details_title1}</a>
                    </p>
                </div>
                <div className={`${styles.body_row_title}`}>
                    <p>
                        <a href="" onClick={(event) => handleClickDetail(link_title2, event)}>{details_title2}</a>
                    </p>
                </div>
                <div className={`${styles.body_row_title}`}>
                    <p>
                        <a href="" onClick={(event) => handleClickDetail(link_title3, event)}>{details_title3}</a>
                    </p>
                </div>
                <div className={`${styles.body_row_title}`}>
                    <p>
                        <a href="" onClick={(event) => handleClickDetail(link_title4, event)}>{details_title4}</a>
                    </p>
                </div>
                <div className={`${styles.body_row_title}`}>
                    <p>
                        <a href="" onClick={(event) => handleClickDetail(link_title5, event)}>{details_title5}</a>
                    </p>
                </div>
                <div className={`${styles.body_row_title}`}>
                    <p>
                        <a href="" onClick={(event) => handleClickDetail(link_title6, event)}>{details_title6}</a>
                    </p>
                </div>
            </div>
            <div className={`${styles.body_row}`}>
                <div className={`${styles.body_row_number}`}>
                    <p style={{ color: '#4C5BD4' }}>
                        <span className={`${styles.total_ep}`}>{number1}</span>
                    </p>
                </div>
                <div className={`${styles.body_row_number}`}>
                    <p style={{ color: '#4CD4B4' }}>
                        <span className={`${styles.total_ep}`}>{number2}</span>
                    </p>
                </div>
                <div className={`${styles.body_row_number}`}>
                    <p style={{ color: '#D44C4C' }}>
                        <span className={`${styles.total_ep}`}>{number3}</span>
                    </p>
                </div>
                <div className={`${styles.body_row_number}`}>
                    <p style={{ color: '#D44C4C' }}>
                        <span className={`${styles.total_ep}`}>{number4}</span>
                    </p>
                </div>
                <div className={`${styles.body_row_number}`}>
                    <p style={{ color: '#D44C4C' }}>
                        <span className={`${styles.total_ep}`}>{number5}</span>
                    </p>
                </div>
                <div className={`${styles.body_row_number}`}>
                    <p style={{ color: '#D44C4C' }}>
                        <span className={`${styles.total_ep}`}>{number6}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
)

export const countWorkingSeniorityStatus = (employees: any[]): { less3m: number; to3m_1y: number, to1y_3y: number; to3y_5y: number; to5y: number } => {
    let less3m = 0;
    let to3m_1y = 0;
    let to1y_3y = 0;
    let to3y_5y = 0;
    let to5y = 0;

    employees.forEach((employee) => {
        if (employee.start_working_time === 1) {
            less3m++;
        } else if (employee.married === 2) {
            to3m_1y++;
        }
    });

    return { less3m, to3m_1y, to1y_3y, to3y_5y, to5y };
};

const calculateWorkDuration = (employees: any[], referenceTime: number): number => {
    const currentTime = Math.floor(Date.now() / 1000);
    let count = 0;
    employees?.forEach((employee) => {
        if (employee.start_working_time !== null && employee.start_working_time <= referenceTime) {
            count++;
        }
    });
    return count;
};

const calculateYearOld = (employees: any[], referenceTime: number): number => {
    const currentTime = Math.floor(Date.now() / 1000);
    let count = 0;
    employees?.forEach((employee) => {
        if (employee.birthday !== null && employee.birthday <= referenceTime) {
            count++;
        }
    });
    return count;
};

const calculatePosition = (employees: any[], position_id: number): number => {
    let count = 0;
    employees?.forEach((employee) => {
        if (employee.chucvu !== null && employee.chucvu === position_id) {
            count++;
        }
    });
    return count;

};

const calculateWorkDurationByIntervals = (employees: any[]): number[] => {
    const currentTime = Math.floor(Date.now() / 1000);
    const intervals = [
        currentTime - 90 * 24 * 60 * 60,  // Bé hơn 3 tháng
        currentTime - 365 * 24 * 60 * 60, // Từ 3 tháng đến 1 năm
        currentTime - 3 * 365 * 24 * 60 * 60,  // Từ 1 năm đến 3 năm
        currentTime - 5 * 365 * 24 * 60 * 60,  // Từ 3 năm đến 5 năm
        currentTime - 5 * 365 * 24 * 60 * 60 - 1 // Trên 5 năm
    ];
    const counts = intervals?.map(interval => calculateWorkDuration(employees, interval));
    return counts;
};

const calculateYearOldByIntervals = (employees: any[]): number[] => {
    const currentTime = Math.floor(Date.now() / 1000);
    const intervals = [
        currentTime - 30 * 365 * 24 * 60 * 60,  // Dưới 30 tuổi
        currentTime - 44 * 365 * 24 * 60 * 60, // 30-44 tuổi
        currentTime - 59 * 365 * 24 * 60 * 60,  // 45-59 tuổi
        currentTime - 60 * 365 * 24 * 60 * 60 - 1,  // trên 60 tuổi

    ];

    const counts = intervals?.map(interval => calculateYearOld(employees, interval));
    return counts;
};

function countEmployeesByChucVu(countEmployee: any, chucvu: any) {
    let count = 0;
    countEmployee?.forEach((employee: any) => {
        if (employee.chucvu === chucvu) {
            count++;
        }
    });
    return count;
}

export default function InformationSection2({ hrReportList }: any) {

    const employees = hrReportList?.data || [];
    const workDurationCounts = calculateWorkDurationByIntervals(employees?.countEmployee);
    const YearOlwCounts = calculateYearOldByIntervals(employees?.countEmployee);

    let sum: number = 0;
    let sum1: number = 0;
    for (let i = 0; i < workDurationCounts.length; i++) {
        sum += workDurationCounts[i];
    }
    for (let i = 0; i < YearOlwCounts.length; i++) {
        sum1 += YearOlwCounts[i];
    }

    const thuctap = countEmployeesByChucVu(employees?.countEmployee, 1);
    const thuviec = countEmployeesByChucVu(employees?.countEmployee, 2);
    const chinhthuc = countEmployeesByChucVu(employees?.countEmployee, 3);
    const partime = countEmployeesByChucVu(employees?.countEmployee, 9);
    let sum2: number = thuctap + thuviec + partime + chinhthuc;

    const router = useRouter()
    const handleClickDetail = (link: any, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (typeof link === "string") {
            const link_slice: any = link.slice(0, -5)
            router.push(
                `/hr/${link_slice}`
            );
        }
    };

    return (
        <>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.body_content}`}>
                    <div className={`${styles.content_item}`}>
                        <BodySection2
                            title='Thâm niên công tác'
                            img1='/icon-users.svg'
                            img2='/duoi_3_thang.svg'
                            img3='/duoi_1_nam.svg'
                            img4='/duoi_10_nam.svg'
                            img5='/duoi_10_nam.svg'
                            img6='/duoi_10_nam.svg'
                            details_title1='Tổng số'
                            details_title2='Dưới 3 tháng'
                            details_title3='3 tháng - 1 năm'
                            details_title4='1 năm - 3 năm'
                            details_title5='3 năm - 5 năm'
                            details_title6='Trên 5 năm'
                            number1={sum}
                            number2={workDurationCounts[0]}
                            number3={workDurationCounts[1]}
                            number4={workDurationCounts[2]}
                            number5={workDurationCounts[3]}
                            number6={workDurationCounts[4]}
                            handleClickDetail={handleClickDetail}
                            link_title1="/bieu-do-danh-sach-nhan-vien-theo-tham-nien-cong-tac.html"
                            link_title2="/bieu-do-danh-sach-nhan-vien-theo-tham-nien-cong-tac?type=1.html"
                            link_title3="/bieu-do-danh-sach-nhan-vien-theo-tham-nien-cong-tac?type=2.html"
                            link_title4="/bieu-do-danh-sach-nhan-vien-theo-tham-nien-cong-tac?type=3.html"
                            link_title5="/bieu-do-danh-sach-nhan-vien-theo-tham-nien-cong-tac?type=4.html"
                            link_title6="/bieu-do-danh-sach-nhan-vien-theo-tham-nien-cong-tac?type=5.html"
                        />
                    </div>
                </div>
                <div className={`${styles.body_content}`}>
                    <div className={`${styles.content_item}`}>
                        <BodySection2
                            title='Độ tuổi nhân viên'
                            img1='/icon-users.svg'
                            img2='/duoi_30_tuoi.svg'
                            img3='/duoi_45_tuoi.svg'
                            img4='/duoi_60_tuoi.svg'
                            img5='/duoi_100_tuoi.svg'
                            details_title1='Tổng số'
                            details_title2='Dưới 30 tuổi'
                            details_title3='30 tuổi - 44 tuổi'
                            details_title4='45 tuổi - 59 tuổi'
                            details_title5='Trên 60 tuổi'
                            number1={sum1}
                            number2={YearOlwCounts[0]}
                            number3={YearOlwCounts[1]}
                            number4={YearOlwCounts[2]}
                            number5={YearOlwCounts[3]}
                            handleClickDetail={handleClickDetail}
                            link_title1="/bieu-do-danh-sach-nhan-vien-theo-do-tuoi.html"
                            link_title2="/bieu-do-danh-sach-nhan-vien-theo-do-tuoi?type=1.html"
                            link_title3="/bieu-do-danh-sach-nhan-vien-theo-do-tuoi?type=2.html"
                            link_title4="/bieu-do-danh-sach-nhan-vien-theo-do-tuoi?type=3.html"
                            link_title5="/bieu-do-danh-sach-nhan-vien-theo-do-tuoi?type=4.html"
                        />
                    </div>
                </div>
                <div className={`${styles.body_content}`}>
                    <div className={`${styles.content_item}`}>
                        <BodySection2
                            title='Chức vụ nhân viên'
                            img1='/icon-users.svg'
                            img2='/icon-male.svg'
                            img3='/icon-male.svg'
                            img4='/icon-male.svg'
                            img5='/icon-male.svg'
                            details_title1='Tổng số'
                            details_title2='Nhân viên thực tập'
                            details_title3='Nhân viên parttime'
                            details_title4='Nhân viên thử việc'
                            details_title5='Nhân viên chính thức'
                            number1={sum2}
                            number2={thuctap}
                            number3={partime}
                            number4={thuviec}
                            number5={chinhthuc}
                            handleClickDetail={handleClickDetail}
                            link_title1="/bieu-do-danh-sach-nhan-vien-theo-chuc-vu.html"
                            link_title2="/bieu-do-danh-sach-nhan-vien-theo-chuc-vu?type=1.html"
                            link_title3="/bieu-do-danh-sach-nhan-vien-theo-chuc-vu?type=2.html"
                            link_title4="/bieu-do-danh-sach-nhan-vien-theo-chuc-vu?type=3.html"
                            link_title5="/bieu-do-danh-sach-nhan-vien-theo-chuc-vu?type=4.html"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}