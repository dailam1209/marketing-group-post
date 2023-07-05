import React from "react";
import Cookies from "js-cookie";

export default function HeaderAdmin() {
    const logout = () => {
        Cookies.remove('admin')
    }

    return (
        <>
            <div id="header">
                <div className="logo">
                    <a href="https://vieclamtaihanoi.com.vn/admin">
                        <img src="../img/admin-logo.png" />
                    </a>
                </div>
                <div className="header-right">
                    Chào{" "}
                    <a
                        href="https://vieclamtaihanoi.com.vn/admin/edit_thanhvien/2"
                        className="name-admin"
                    >
                        Administrator
                    </a>
                    <a className="exit" href="/admin"  onClick={logout}>
                        Thoát
                    </a>
                </div>
            </div>
        </>
    )
}