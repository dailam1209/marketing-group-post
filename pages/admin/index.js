import React from "react"
// import Header from "../components/header/Header"
// import Footer from "../components/footer/Footer"

import router from "../utils/router"
import Head from "next/document"

//const inter = Inter({ subsets: [latin] })
export default function admin() {
    return (
        <>

            <Head>
                <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
                <title>Administrator</title>
                <base href="https://vieclamtaihanoi.com.vn/" />
                <link href="#" rel="shortcut icon" />
                <link rel="stylesheet" href="css/admin.css" type="text/css" />
                <link href="css/ui-lightness/jquery-ui-1.10.4.custom.css" rel="stylesheet" />
            </Head>
            <>
                <div id="header">
                    <div className="logo">
                        <a href="https://vieclamtaihanoi.com.vn/admin">
                            <img src="images/admin-logo.png" />
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
                        <a className="exit" href="https://vieclamtaihanoi.com.vn/admin/thoat">
                            Thoát
                        </a>
                    </div>
                </div></>







        </>
    )
}