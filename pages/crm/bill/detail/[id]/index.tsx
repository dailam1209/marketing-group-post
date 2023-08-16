import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/order/order.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import AddBillInfo from "@/components/crm/bill/bill_detail/bill_info";
import AddButtonControl from "@/components/crm/bill/bill_detail/bill_button_control";
import TabBillList from "@/components/crm/bill/bill_detail/tab_bill_detail";
import { useHeader } from "@/components/crm/hooks/useHeader";

const AddFilesPotential: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useContext<any>(SidebarContext);
    const imgRef = useRef<HTMLInputElement>(null);
    const {
        setHeaderTitle,
        setShowBackButton,
        setCurrentPath,
    }: any = useHeader();

    useEffect(() => {
        setHeaderTitle("Hóa đơn/ Chi tiết");
        setShowBackButton(true);
        setCurrentPath("/crm/bill/list");
    }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

    useEffect(() => {
        if (isOpen) {
            mainRef.current?.classList.add("content_resize");
        } else {
            mainRef.current?.classList.remove("content_resize");
        }
    }, [isOpen]);

    return (
        <div className={styleHome.main} ref={mainRef}>
            <div className={styles.main_importfile}>
                <div className={styles.formInfoStep}>
                    <div className={styles.info_step}>
                        <div className={styles.form_add_potential}>
                            <AddButtonControl />
                        </div>

                        <div className={styles.main__title}>Thông tin đề nghị xuất hóa đơn</div>
                        <div className={styles.form_add_potential}>
                            <div className={styles.main__body}>
                                <AddBillInfo />
                            </div>
                        </div>
                    </div>
                </div>
                <TabBillList />
            </div>
        </div>
    );
};

export default AddFilesPotential;
