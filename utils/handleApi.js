import { React, useState, useEffect } from "react"
import Cookies from "js-cookie";
import { functionAPI } from "./function";

export const checkVip = async (idcom) => {
    const data = {
        com_id: idcom
    }
    let checkVip = await functionAPI('http://210.245.108.202:3000/api/checkVip/before', data, '')
    if (checkVip == 0) {
        Cookies.set('idCom', idcom);
        window.location.href = '/thong-tin-dang-ky-nhan-vien.html'
    } else {
        window.location.href = '/thong-bao-tai-khoan-vip.html'
    }
}

// register
export const registerCom = async (data) => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/Company/register', data)
    if (result.result == true) {
        Cookies.set('acc_token', result.data.access_token);
        Cookies.set('rf_token', result.data.refresh_token);
        Cookies.set('role', 1);
        Cookies.set('phone', data.phoneTK);
        window.location.href = '/xac-thuc-ma-otp-cong-ty.html';
    } else {
        alert('Tài khoản đã tồn tại')
    }
}

export const registerEp = async (data) => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/employee/register', data)
    if (result.result == true) {
        Cookies.set('acc_token', result.data.access_token);
        Cookies.set('rf_token', result.data.refresh_token);
        Cookies.set('role', 2);
        Cookies.set('phone', data.phoneTK);

        window.location.href = '/xac-thuc-ma-otp-nhan-vien.html';
    } else {
        alert('Tài khoản đã tồn tại')
    }
}

export const registerPersonal = async (data) => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/individual/register', data)
    if (result.result == true) {
        Cookies.set('acc_token', result.data.access_token);
        Cookies.set('rf_token', result.data.refresh_token);
        Cookies.set('role', 3);
        Cookies.set('phone', data.phoneTK);
        window.location.href = '/xac-thuc-ma-otp-ca-nhan.html';
    } else {
        alert('Tài khoản đã tồn tại')
    }
}

// get list dep, group, team
export const listDep = async (data) => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/individual/register', data)
    return result
}

// Login
export const loginPersonal = async (data) => {
    const err = 'err';
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/individual/login', data)
    if (result.result == true) {
        Cookies.set('acc_token', result.data.access_token);
        Cookies.set('rf_token', result.data.refresh_token);
        Cookies.set('role', 3);
        window.location.href = '/quan-ly-ung-dung-ca-nhan.html';
    } else {
        return err
    }
}

export const loginEp = async (data) => {
    const err = 'err';
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/employee/login', data)
    if (result.result == true) {
        Cookies.set('acc_token', result.data.access_token);
        Cookies.set('rf_token', result.data.refresh_token);
        Cookies.set('role', 2);
        window.location.href = '/quan-ly-ung-dung-nhan-vien.html';
    } else {
        return err
    }
}

export const loginCom = async (data) => {
    const err = 'err';
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/Company/login', data)
    if (result.result == true) {
        Cookies.set('acc_token', result.data.access_token);
        Cookies.set('rf_token', result.data.refresh_token);
        Cookies.set('role', 1);
        window.location.href = '/quan-ly-ung-dung-cong-ty.html';
    } else {
        return err
    }
}

// get information
export const infoEp = async () => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/employee/info')
    return result
}

export const infoCom = async () => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/Company/info')
    return result
}

export const infoPersonal = async () => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/individual/info')
    return result
}

// update information
export const updateCom = async (data) => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/Company/updateInfoCompany', data)
    return result
}

export const updateEp = async (data) => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/employee/updateInfoEmployee', data)
    return result
}

export const updatePersonal = async (data) => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/individual/updateInfoindividual', data)
    return result
}

// change password
export const changePassCom = async (data) => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/Company/updateNewPassword', data)
    return result
}

export const changePassEp = async (data) => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/employee/updatePassword', data)
    return result
}

export const changePassPersonal = async (data) => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/individual/updatePassword', data)
    return result
}



