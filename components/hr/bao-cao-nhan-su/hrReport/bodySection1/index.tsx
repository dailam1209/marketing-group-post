import React, { useState, useEffect } from 'react'
import styles from './bodySection1.module.css'
import { useRouter } from "next/router";

const EmployeeForm = ({ title1, title2, img1, img2, img3, title_details1, title_details2, title_details3,
    number1, number2, number3, color_boder, background_color, link_title1, link_title2, link_title3, handleClickDetail }: any) => (
    <div className={`${styles.t_rp}`}>
        <div className={`${styles.t_exp_header}`} style={{ borderLeft: color_boder, background: background_color }}>
            <p>{title1}</p>
            <p>{title2}</p>
        </div>
        <div className={`${styles.t_exp_body}`}>
            <div className={`${styles.body_row}`}>
                <div className={`${img2 ? styles.body_row_img : styles.body_row_img2}`}>
                    <img src={img1} />
                </div>
                {img2 ? (<div className={`${img2 ? styles.body_row_img : styles.body_row_img2}`} >
                    <img src={img2} />
                </div>) : ''}
                <div className={`${img2 ? styles.body_row_img : styles.body_row_img2}`}>
                    <img src={img3} />
                </div>
            </div>
            <div className={`${styles.body_row}`}>
                <div className={`${title_details2 ? styles.body_row_title : styles.body_row_title2}`}>
                    <p>
                        <a href="" onClick={(event) => handleClickDetail(link_title1, event)}>{title_details1}</a>
                    </p>
                </div>
                {title_details2 ? (<div className={`${title_details2 ? styles.body_row_title : styles.body_row_title2}`}>
                    <p>
                        <a href="" onClick={(event) => handleClickDetail(link_title2, event)}>{title_details2}</a>
                    </p>
                </div>) : ''}
                <div className={`${title_details2 ? styles.body_row_title : styles.body_row_title2}`}>
                    <p>
                        <a href="" onClick={(event) => handleClickDetail(link_title3, event)}>{title_details3}</a>
                    </p>
                </div>
            </div>
            <div className={`${styles.body_row}`}>
                <div className={`${number2 ? styles.body_row_number : styles.body_row_number2}`}>
                    <p style={{ color: '#4C5BD4' }} className={`${styles.total_ep}`}>{number1}</p>
                </div>

                <div className={`${number2 ? styles.body_row_number : styles.body_row_number2}`}>
                    <p style={{ color: '#4CD4B4', }} className={`${styles.total_ep}`}>{number2}</p>
                </div>

                <div className={`${number2 ? styles.body_row_number : styles.body_row_number2}`}>
                    <p style={{ color: '#D44C4C' }} className={`${styles.total_ep}`}>{number3}</p>
                </div>
            </div>
        </div>
    </div>
)

export const countMaritalStatus = (employees: any[]): { married1: number; married2: number } => {
    let married1 = 0;
    let married2 = 0;

    employees?.forEach((employee) => {
        if (employee.married === 1) {
            married1++;
        } else if (employee.married === 2) {
            married2++;
        }
    });

    return { married1, married2 };
};

export default function EmployeeInformation({ hrReportList }: any) {

    const { married1, married2 } = countMaritalStatus(hrReportList?.data?.countEmployee);

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
                <div className={`${styles.row_top}`} style={{ marginTop: 40 }}>
                    <div className={`${styles.row_top_item}`}>
                        <EmployeeForm
                            title1='Tổng số nhân viên'
                            title2='Nam/Nữ'
                            img1='/icon-users.svg'
                            img2='/icon-male.svg'
                            img3='/icon-female.svg'
                            title_details1='Tổng số'
                            title_details2='Nam'
                            title_details3='Nữ'
                            number1={hrReportList?.data?.Employee}
                            number2={hrReportList?.data?.EmployeeNam}
                            number3={hrReportList?.data?.EmployeeNu}
                            color_boder='7px solid #4c5bd4'
                            background_color='#f1f9fc'
                            handleClickDetail={handleClickDetail}
                            link_title1="/bieu-do-danh-sach-nhan-vien.html"
                            link_title2="/bieu-do-danh-sach-nhan-vien?gender=1.html"
                            link_title3="/bieu-do-danh-sach-nhan-vien?gender=2.html"
                        />
                    </div>
                    <div className={`${styles.row_top_item}`}>
                        <EmployeeForm
                            title1='Tỷ lệ nhân viên'
                            title2='giảm biên chế/nghỉ việc'
                            img1='/icon-users.svg'
                            img2='/career_green.svg'
                            img3='/career_red.svg'
                            title_details1='Tổng số'
                            title_details2='Giảm biên chế'
                            title_details3='Nghỉ việc'
                            number1={hrReportList?.data?.tongNghiViec}
                            number2={hrReportList?.data?.giamBienChe}
                            number3={hrReportList?.data?.nghiViec}
                            color_boder='7px solid #4CD4B4'
                            background_color='#f1f9fc'
                            handleClickDetail={handleClickDetail}
                            link_title1="/bieu-do-danh-sach-nhan-vien-nghi-viec.html"
                            link_title2="/bieu-do-danh-sach-nhan-vien-nghi-viec?type=2.html"
                            link_title3="/bieu-do-danh-sach-nhan-vien-nghi-viec?type=1.html"
                        />
                    </div>
                    <div className={`${styles.row_top_item}`}>
                        <EmployeeForm
                            title1='Bổ nhiệm'
                            title2='Quy hoạch'
                            img1='/icon-bo-nghiem.svg'
                            img2='/icon-male.svg'
                            img3='/icon-female.svg'
                            title_details1='Tổng số'
                            title_details2='Nam'
                            title_details3='Nữ'
                            number1={hrReportList?.data?.boNhiem}
                            number2={hrReportList?.data?.boNhiemNam}
                            number3={hrReportList?.data?.boNhiemNu}
                            color_boder='7px solid #D44C4C'
                            background_color='#FFF4F4'
                            handleClickDetail={handleClickDetail}
                            link_title1="/bieu-do-danh-sach-nhan-vien-bo-nhiem.html"
                            link_title2="/bieu-do-danh-sach-nhan-vien-bo-nhiem?gender=1.html"
                            link_title3="/bieu-do-danh-sach-nhan-vien-bo-nhiem?gender=2.html"
                        />
                    </div>
                </div>
                <div className={`${styles.row_top}`} style={{ marginTop: 20 }}>
                    <div className={`${styles.row_top_item}`}>
                        <EmployeeForm
                            title1='Tăng lương/giảm lương'
                            img1='/icon-users.svg'
                            img2='/salary_up.svg'
                            img3='/salary_down.svg'
                            title_details1='Tổng số'
                            title_details2='Tăng lương'
                            title_details3='Giảm lương'
                            number1={hrReportList?.data?.tangGiamLuong}
                            number2={hrReportList?.data?.tangLuong}
                            number3={hrReportList?.data?.giamLuong}
                            color_boder='7px solid #4c5bd4'
                            background_color='#f1f9fc'
                            handleClickDetail={handleClickDetail}
                            link_title1="/bieu-do-danh-sach-nhan-vien-tang-giam-luong.html"
                            link_title2="/bieu-do-danh-sach-nhan-vien-tang-giam-luong?type=2.html"
                            link_title3="/bieu-do-danh-sach-nhan-vien-tang-giam-luong?type=1.html"
                        />
                    </div>
                    <div className={`${styles.row_top_item}`}>
                        <EmployeeForm
                            title1='Luân chuyển công tác'
                            img1='/icon-tranfer-job.svg'
                            img2='/icon-male.svg'
                            img3='/icon-female.svg'
                            title_details1='Tổng số'
                            title_details2='Nam'
                            title_details3='Nữ'
                            number1={hrReportList?.data?.luanChuyen}
                            number2={hrReportList?.data?.luanChuyenNam}
                            number3={hrReportList?.data?.luanChuyenNu}
                            color_boder='7px solid #4CD4B4'
                            background_color='#f1f9fc'
                            handleClickDetail={handleClickDetail}
                            link_title1="/bieu-do-danh-sach-nhan-vien-chuyen-cong-tac.html"
                            link_title2="/bieu-do-danh-sach-nhan-vien-chuyen-cong-tac?gender=1.html"
                            link_title3="/bieu-do-danh-sach-nhan-vien-chuyen-cong-tac?gender=2.html"
                        />
                    </div>
                    <div className={`${styles.row_top_item}`}>
                        <EmployeeForm
                            title1='Tình trạng hôn nhân'
                            img1='/icon-couple.svg'
                            img3='/icon-alone.svg	'
                            title_details1='Đã lập gia đình'
                            title_details3='Độc thân'
                            number1={married1}
                            number3={married2}
                            color_boder='7px solid #D44C4C'
                            background_color='#FFF4F4'
                            handleClickDetail={handleClickDetail}
                            link_title1="/bieu-do-danh-sach-nhan-vien-theo-trang-hon-nhan?type=1.html"
                            // link_title2="/bieu-do-danh-sach-nhan-vien-theo-trang-hon-nhan?type=1.html"
                            link_title3="/bieu-do-danh-sach-nhan-vien-theo-trang-hon-nhan?type=2.html"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}