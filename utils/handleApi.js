import { React, useState, useEffect } from "react"
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import { functionAPI } from "./function";

export const checkVip = async (idcom) => {
    const data = {
        com_id: idcom
    }
    let checkVip = await functionAPI('http://210.245.108.202:3000/api/checkVip/before', data, '')
    if (checkVip == 0) {
        Cookies.set('idCom', idcom);
        router.push('/thong-tin-dang-ky-nhan-vien.html')
    } else {
        router.push('/thong-bao-tai-khoan-vip.html')
    }
}

export const loginPersonal = async (data) => {
    let result = await functionAPI('http://210.245.108.202:3000/api/qlc/individual/login', data)
    if (result.result == true) {
        Cookies.set('acc_token', result.data.access_token);
        Cookies.set('rf_token', result.data.refresh_token);
        Cookies.set('role', 3);
        window.location.href = '/quan-ly-ung-dung-ca-nhan.html';
    } else {
        alert(result.data.error.message)
    }
}