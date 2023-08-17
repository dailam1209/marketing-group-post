import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/price_policy/price_policy.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import AddTable from "@/components/crm/price_policy/update/table";
import AddGeneralInfo from "@/components/crm/price_policy/update/general_infor";
import AddDesriptionAndSystemInfo from "@/components/crm/price_policy/update/description_system_update_files";
import { useHeader } from "@/components/crm/hooks/useHeader";
import PricePolicyFooterUpdateFiles from "@/components/crm/price_policy/update/price_policy_footer_update_files";

const UpdateFilesPotential: React.FC = () => {
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
    setHeaderTitle("Chính sách giá/ Chỉnh sửa");
    setShowBackButton(true);
    setCurrentPath("/crm/price_policy/list");
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
            <div className={styles.main__title}>Chỉnh sửa Chính sách giá</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <AddGeneralInfo />
                <AddTable />
                <AddDesriptionAndSystemInfo />

              </div>
              <PricePolicyFooterUpdateFiles />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFilesPotential;
