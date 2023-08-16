import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/campaign/campaign.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import CampaignFooterEditFiles from "@/components/crm/campaign/campaign_edit_files/campaign_footer_edit_file";
import AddGeneralInfo from "@/components/crm/campaign/campaign_edit_files/general_info";
import AddDescriptionInfo from "@/components/crm/campaign/campaign_edit_files/description_info";

import { useHeader } from "@/components/crm/hooks/useHeader";

const CampageEditIndex: React.FC = () => {
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
        setHeaderTitle("Chiến dịch/ Chỉnh sửa");
        setShowBackButton(true);
        setCurrentPath("/crm/campaign/list");
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
                        <div className={styles.main__title}>Chi tiết chiến dịch</div>
                        <div className={styles.form_add_potential}>
                            <div className={styles.main__body}>

                                <AddGeneralInfo />
                                <AddDescriptionInfo />

                            </div>
                            <CampaignFooterEditFiles title="Cập nhật Chiến dịch thành công" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampageEditIndex;
