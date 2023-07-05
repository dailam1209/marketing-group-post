import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

export function getEducation(id) {
    const arr = [];
    arr[0] = 'Chưa cập nhật';
    arr[1] = 'Trên Đại học';
    arr[2] = 'Đại học';
    arr[3] = 'Cao đẳng';
    arr[4] = 'Trung cấp';
    arr[5] = 'Đào tạo nghề';
    arr[6] = 'Trung học phổ thông';
    arr[7] = 'Trung học cơ sở';
    arr[8] = 'Tiểu học';
    return arr[id] || 'Chưa cập nhật'
}

export function getExperience(id) {
    const arr = [];
    arr[0] = 'Chưa cập nhật';
    arr[1] = 'Chưa có kinh nghiệm';
    arr[2] = 'Dưới 1 năm kinh nghiệm';
    arr[3] = '1 năm';
    arr[4] = '2 năm';
    arr[5] = '3 năm';
    arr[6] = '4 năm';
    arr[7] = '5 năm';
    arr[8] = 'Trên 5 năm';
    return arr[id] || 'Chưa cập nhật'
}

export function getGender(id) {
    switch (id) {
        case 1:
            return "Nam";
        case 2:
            return "Nữ";
        case 3:
            return "Khác";
        default:
            return "Chưa cập nhật";
    }
}

export function getMarried(id) {
    switch (id) {
        case 1:
            return "Nam";
        case 2:
            return "Nữ";
        case 3:
            return "Khác";
        default:
            return "Chưa cập nhật";
    }
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

export function ConvertIntToDate(timestamp) {
    let date = new Date(timestamp);

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

// function call api
export const functionAPI = async (url, data = null) => {
    let configHeader = {
        headers: {}
    };

    if (Cookies.get('acc_token')) {
        configHeader.headers['Authorization'] = `Bearer ${Cookies.get('acc_token')}`;
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
}

// check login
export function CheckLogin() {
    const token = Cookies.get('acc_token');
    const role = Cookies.get('role');
    const router = useRouter();
    if (role && token) {
        let redirectUrl = "";
        if (role === '1') {
            redirectUrl = "/quan-ly-ung-dung-cong-ty.html";
        } else if (role === '2') {
            redirectUrl = "/quan-ly-ung-dung-nhan-vien.html";
        } else {
            redirectUrl = "/quan-ly-ung-dung-ca-nhan.html";
        }
        if (redirectUrl != `/${window.location.href.split('/')[3]}`) {
            router.push(redirectUrl);
        }
    }
}

// export function CheckLogin2() {
//     const token = Cookies.get('acc_token');
//     const role = Cookies.get('role');
//     const router = useRouter();
//     if (!role && !token) {
//         router.push('/');
//     }
// }