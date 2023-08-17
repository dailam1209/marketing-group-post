import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/price_policy/price_policy.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import AddTable from "@/components/crm/price_policy/price_policy_add_files/table";
import AddGeneralInfo from "@/components/crm/price_policy/price_policy_add_files/general_infor";
import AddDesriptionAndSystemInfo from "@/components/crm/price_policy/price_policy_add_files/description_system_add_files";
import { useHeader } from "@/components/crm/hooks/useHeader";
import PricePolicyFooterAddFiles from "@/components/crm/price_policy/price_policy_add_files/price_policy_footer_add_files";

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
    setHeaderTitle("Chính sách giá/ Thêm mới");
    setShowBackButton(true);
    setCurrentPath("/crm/price_policy/list");
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
            <div className={styles.main__title}>Thêm mới Chính sách giá</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <AddGeneralInfo />
                <AddTable />
                <AddDesriptionAndSystemInfo />

              </div>
              <PricePolicyFooterAddFiles />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFilesPotential;
