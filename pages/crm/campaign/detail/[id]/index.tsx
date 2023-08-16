import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/campaign/campaign.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import AddButtonControl from "@/components/crm/campaign/campaign_detail/campaign_button_control";
import AddDetailInfo from "@/components/crm/campaign/campaign_detail/campaign_detail_info";
import TabOrderList from '@/components/crm/campaign/campaign_detail/tab_campaign_detail';
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
    setHeaderTitle("Chiến dịch/ Chi tiết");
    setShowBackButton(true);
    setCurrentPath("/crm/campaign/list");
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
            <div className={styles.main__title}>Chi tiết chiến dịch</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>

                <AddDetailInfo />
                {/* <AddDescriptionInfo /> */}
           
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
