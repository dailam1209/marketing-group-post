import Sidebar from "./sidebar/Sidebar";
import Bodyframe from "./bodyFrame/bodyFrame";
// import  from "@/pages/recruitmentProcess";
import styles from "./layout.module.css";

export default function Layout({ children }: any) {
    return (
        <div className={`${styles.wraper}`}>
            <div className={`${styles.sidebar_content}`}>
                <div className={`${styles.sidebar}`}>
                    <Sidebar />
                </div>
            </div>
            <div className={`${styles.bodyframe}`}>
                <Bodyframe>{children}</Bodyframe>
            </div>
        </div>
    );
}
