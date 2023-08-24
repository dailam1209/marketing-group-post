import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import React, {useEffect} from "react";
import styles from "./index.module.css"
import HeaderTittle from "./headerTittle";
import Body from "./body";


const TrangChu = () => {

    return (<div>
        <Header/>
        <div className={styles.blog_hot}>
           <HeaderTittle/>
            <h1>
                Quản lý chung - các phần mềm quản lý hiệu quả, vượt trội
            </h1>
            <div className={styles.hot_new}>
                    <span>
                        <h2>
                        HOT NEW
                    </h2>
                    </span>
                <a>Tìm hiểu về phần mềm chấm công</a>
            </div>
            <Body/>

        </div>
        <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2"/>
        <Footer/>
    </div>)
}

export default TrangChu;