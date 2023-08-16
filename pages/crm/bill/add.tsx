import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/campaign/campaign.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import BillFooterAddFiles from "@/components/crm/bill/bill_add_files/bill_footer_add_files";
import AddGeneralInfo from "@/components/crm/bill/bill_add_files/general_infor";
import AddBonusInfo from "@/components/crm/bill/bill_add_files/add_bonus_infor";
import AddTable from "@/components/crm/bill/bill_add_files/table";
import AddAddressInfo from "@/components/crm/bill/bill_add_files/address_infor";
import AddDescriptionInfo from "@/components/crm/bill/bill_add_files/description_infor";

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
    setHeaderTitle("Hóa đơn/ Thêm mới");
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
            <div className={styles.main__title}>Thêm mới đề nghị xuất hóa đơn</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>

                <AddGeneralInfo />
                <AddBonusInfo />
                <AddTable />
                <AddAddressInfo />
                <AddDescriptionInfo />
           
              </div>
              <BillFooterAddFiles title="Thêm mới Hóa đơn thành công" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFilesPotential;
