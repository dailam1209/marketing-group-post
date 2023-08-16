import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/supplier/supplier.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import SupplierFooterAddFiles from "@/components/crm/supplier/supplier_add_files/supplier_footer_add_files";
import AddGeneralInfo from "@/components/crm/supplier/supplier_add_files/general_infor";
import { useHeader } from "@/components/crm/hooks/useHeader";

const AddFilesSupplier: React.FC = () => {
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
    setHeaderTitle("Thêm nhóm nhà cung cấp");
    setShowBackButton(true);
    setCurrentPath("/crm/supplier/group");
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
            <div className={styles.form_add_supplier}>
              <div className={styles.main__body}>
                <AddGeneralInfo />
              </div>
              <SupplierFooterAddFiles title="Thêm mới nhà cung cấp thành công!" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFilesSupplier;
