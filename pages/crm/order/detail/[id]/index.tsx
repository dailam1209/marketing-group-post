import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/order/order.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import AddOrderInfo from "@/components/crm/order/order_detail/order_info";
import AddButtonControl from "@/components/crm/order/order_detail/order_button_control";
import TabOrderList from "@/components/crm/order/order_detail/tab_order_detail";
import { useHeader } from "@/components/crm/hooks/useHeader";

const AddFilesPotential: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const [checkFile, setCheckFile] = useState(false);
    const { isOpen } = useContext<any>(SidebarContext);
    const imgRef = useRef<HTMLInputElement>(null);
    const {
        headerTitle,
        setHeaderTitle,
        setShowBackButton,
        setCurrentPath,
    }: any = useHeader();

    useEffect(() => {
        setHeaderTitle("Quản lý đơn hàng/ Chi tiết");
        setShowBackButton(true);
        setCurrentPath("/crm/order/list");
    }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

    const handleClickImg = () => {
        imgRef?.current?.click();
    };

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

                        <div className={styles.main__title}>Thông tin đơn hàng</div>
                        <div className={styles.form_add_potential}>
                            <div className={styles.main__body}>
                                <AddOrderInfo />
                            </div>
                        </div>
                    </div>
                </div>
                <TabOrderList />
            </div>
        </div>
    );
};

export default AddFilesPotential;
