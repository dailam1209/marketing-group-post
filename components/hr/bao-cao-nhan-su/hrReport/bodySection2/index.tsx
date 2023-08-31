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


const calculateWorkDurationGroup = (employees) => {
    const currentTime = Math.floor(Date.now() / 1000);

    // Định nghĩa các khoảng thời gian làm việc
    const workDurationIntervals = [
        { label: 'Dưới 3 tháng', minDuration: 0, maxDuration: 90 * 24 * 60 * 60 },
        { label: '3 tháng - 1 năm', minDuration: 90 * 24 * 60 * 60, maxDuration: 365 * 24 * 60 * 60 },
        { label: '1 năm - 3 năm', minDuration: 365 * 24 * 60 * 60, maxDuration: 3 * 365 * 24 * 60 * 60 },
        { label: 'Từ 3 năm - 5 năm', minDuration: 3 * 365 * 24 * 60 * 60, maxDuration: 5 * 365 * 24 * 60 * 60 },
        { label: 'Trên 5 năm', minDuration: 5 * 365 * 24 * 60 * 60, maxDuration: Infinity },
    ];

    // Tạo một mảng để lưu trữ số lượng nhân viên trong từng khoảng thời gian làm việc
    const workDurationCounts = Array(workDurationIntervals.length).fill(0);

    // Tính số lượng nhân viên trong từng khoảng thời gian làm việc
    employees?.forEach((employee: any) => {
        if (employee.start_working_time !== null) {
            const startWorkingTime = employee.start_working_time;
            const durationInSeconds = currentTime - startWorkingTime;

            // Xác định khoảng thời gian làm việc của nhân viên và tăng đếm
            workDurationIntervals.forEach((interval, index) => {
                if (durationInSeconds >= interval.minDuration && durationInSeconds <= interval.maxDuration) {
                    workDurationCounts[index]++;
                }
            });
        }
    });

    return workDurationCounts;
};


const calculateAgeGroup = (employees) => {
    const currentTime = Math.floor(Date.now() / 1000);

    // Định nghĩa các khoảng tuổi
    const ageIntervals = [
        { label: 'Dưới 30 tuổi', minAge: 0, maxAge: 29 },
        { label: '30 tuổi - 44 tuổi', minAge: 30, maxAge: 44 },
        { label: '45 tuổi - 59 tuổi', minAge: 45, maxAge: 59 },
        { label: 'Trên 60 tuổi', minAge: 60, maxAge: Infinity },
    ];

    // Tạo một mảng để lưu trữ số lượng nhân viên trong từng khoảng tuổi
    const ageCounts = Array(ageIntervals.length).fill(0);

    // Tính số lượng nhân viên trong từng khoảng tuổi
    employees?.forEach((employee: any) => {
        if (employee.birthday !== null) {
            const birthTime = employee.birthday;
            const ageInSeconds = currentTime - birthTime;
            const ageInYears = ageInSeconds / (365 * 24 * 60 * 60);

            // Xác định khoảng tuổi của nhân viên và tăng đếm
            ageIntervals.forEach((interval, index) => {
                if (ageInYears >= interval.minAge && ageInYears <= interval.maxAge) {
                    ageCounts[index]++;
                }
            });
        }
    });

    return ageCounts;
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

    const workDurationCounts = calculateWorkDurationGroup(employees?.countEmployee);
    const YearOlwCounts = calculateAgeGroup(employees?.countEmployee);

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
                `/phan-mem-nhan-su/${link_slice}`
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