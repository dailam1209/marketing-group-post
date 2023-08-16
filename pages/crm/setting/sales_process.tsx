import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/setting/setting.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import AddTable from "@/components/crm/setting/sales_process/sales_process_table";
// import AddGeneralInfo from "@/components/crm/price_policy/price_policy_add_files/general_infor";
// import AddDesriptionAndSystemInfo from "@/components/crm/price_policy/price_policy_add_files/description_system_add_files";
import { useHeader } from "@/components/crm/hooks/useHeader";
import SalesProcessFooter from "@/components/crm/setting/sales_process/sales_process_footer";

const SalesProcessTable: React.FC = () => {
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
    setHeaderTitle("Cài đặt/ Quy trình bán hàng");
    setShowBackButton(true);
    setCurrentPath("/crm/setting/main");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>        
                <AddTable />
              </div>
              <SalesProcessFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesProcessTable;