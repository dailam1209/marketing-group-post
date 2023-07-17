import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export const getEducation = [
    'Chưa cập nhật',
    'Trên Đại học',
    'Đại học',
    'Cao đẳng',
    'Trung cấp',
    'Đào tạo nghề',
    'Trung học phổ thông',
    'Trung học cơ sở',
    'Tiểu học',
]

export const getExperience = [
    'Chưa cập nhật',
    'Chưa có kinh nghiệm',
    'Dưới 1 năm kinh nghiệm',
    '1 năm',
    '2 năm',
    '3 năm',
    '4 năm',
    '5 năm',
    'Trên 5 năm',
]

export const getPosition = [
    'Chưa cập nhật',
    'SINH VIÊN THỰC TẬP',
    'NHÂN VIÊN THỬ VIỆC',
    'NHÂN VIÊN PART TIME',
    'NHÂN VIÊN CHÍNH THỨC',
    'NHÓM PHÓ',
    'TRƯỞNG NHÓM',
    'PHÓ TỔ TRƯỞNG',
    'TỔ TRƯỞNG',
    'PHÓ BAN DỰ ÁN',
    'TRƯỞNG BAN DỰ ÁN',
    'PHÓ TRƯỞNG PHÒNG',
    'TRƯỞNG PHÒNG',
    'PHÓ GIÁM ĐỐC',
    'GIÁM ĐỐC',
    'PHÓ TỔNG GIÁM ĐỐC',
    'TỔNG GIÁM ĐỐC',
    'PHÓ TỔNG GIÁM ĐỐC TẬP ĐOÀN',
    'TỔNG GIÁM ĐỐC TẬP ĐOÀN',
    'PHÓ CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ',
    'CHỦ TỊCH HỘI ĐỒNG QUẢN TRỊ',
    'THÀNH VIÊN HỘI ĐỒNG QUẢN TRỊ',
]


export const getGender = [
    'Chưa cập nhật',
    "Nam",
    "Nữ",
    "Khác",
]

export const getMarried = [
    'Chưa cập nhật',
    'Độc thân',
    'Đã kết hôn'
]

export const getSoftware = [
    { id: 'cc365', value: 'Chấm công 365' },
    { id: 'tl365', value: 'Tính lương 365' },
    { id: 'hr365', value: 'Quản trị nhân sự' },
    { id: 'vt365', value: 'Văn thư lưu trữ' },
    { id: 'ttnb365', value: 'Truyền thông văn hóa' },
    { id: 'tts365', value: 'Chuyển đổi văn bản thành giọng nói' },
    { id: 'lb365', value: 'Quản lý lịch biểu' },
    { id: 'crs365', value: 'CRM' },
    { id: 'bp365', value: 'Biên phiên dịch' },
    { id: 'dg365', value: 'Đánh giá năng lực nhân viên' },
    { id: 'kpi365', value: 'Quản lý KPI' },
    { id: 'dms365', value: 'DMS' },
    { id: 'cu365', value: 'Quản lý cung ứng' },
    { id: 'kvt365', value: 'Quản lý kho vật tư xây dụng' },
    { id: 'qlts365', value: 'Quản lý tài sản' },
];

export function renderNamePM(value) {
    let name = 'Chưa xác định';
    getSoftware.find((item) => {
        if (item.id === value) {
            name = item.value;
        }
    })
    return name;
}

export function formatDate(dateString) {
    const parts = dateString.split('/');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
}

export function validatePhone(value) {
    if (value) {
        return /^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/i.test(value);
    }
    return true;
}

export function validateMail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
        return true;
    }

    return false;
}

export function validateIP(value) {
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    console.log(ipRegex.test(value))
    if (ipRegex.test(value)) {
        return true;
    }

    return false;
}

export function ConvertIntToDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Tháng được đếm từ 0, nên cần cộng 1 và định dạng kích thước 2 chữ số
    let day = ("0" + date.getDate()).slice(-2); // Định dạng ngày kích thước 2 chữ số
    // let hours = ("0" + date.getHours()).slice(-2);
    // let minutes = ("0" + date.getMinutes()).slice(-2);
    // let seconds = ("0" + date.getSeconds()).slice(-2);
    let formattedDate = [
        day + "-" + month + "-" + year,
        year + "-" + month + "-" + day
    ]
    return formattedDate;
}

export function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

// function call api
export const functionAPI = async (url, data = null) => {
    let configHeader = {
        headers: {}
    };

    if (Cookies.get('token_base365')) {
        configHeader.headers['Authorization'] = `Bearer ${Cookies.get('token_base365')}`;
    }

    let configData = {}
    if (data) {
        configData = data;
    }

    let response = '';

    try {
        const call = await axios.post(url, configData, configHeader);
        response = call.data.data;
    } catch (error) {
        response = error.response;
    }

    return response;
};

// check login
export function CheckLogin() {
    const acc_token = Cookies.get('token_base365');
    const rf_token = Cookies.get('rf_token');
    const role = Cookies.get('role');
    const router = useRouter();
    if (role && acc_token && rf_token) {
        let redirectUrl = "";
        if (role === '1') {
            redirectUrl = "/quan-ly-ung-dung-cong-ty.html";
        } else if (role === '2') {
            redirectUrl = "/quan-ly-ung-dung-nhan-vien.html";
        } else {
            redirectUrl = "/quan-ly-ung-dung-ca-nhan.html";
        }
        if (redirectUrl != window.location.pathname) {
            router.push(redirectUrl);
        }
    }
}

export function CheckLogin2() {
    const router = useRouter();

    useEffect(() => {
        const acc_token = () => {
            return Cookies.get('token_base365');
        };
        const rf_token = () => {
            return Cookies.get('rf_token');
        };
        const role = () => {
            return Cookies.get('role');
        };

        if (!role() && !acc_token() && !rf_token()) {
            router.push('/');
        }
    }, []);
}