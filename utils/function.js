import axios from 'axios';

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

// function call api
export const functionAPI = async (url, data, token) => {
    let configHeader = {
        headers: {}
    };
    if (token) {
        configHeader.headers['Authorization'] = `Bearer ${token}`;
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