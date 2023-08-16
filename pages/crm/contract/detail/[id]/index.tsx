import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/contract/contract_action.module.css";
import EditContract from "@/components/crm/contract/contract_actionn/editContract";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import DetailContract from "@/components/crm/contract/contract_actionn/detailContract";

const EditContractCoponent: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const {
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Danh sách hợp đồng / Chi tiết hợp đồng");
    setShowBackButton(true);
    setCurrentPath("/crm/contract/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <div ref={mainRef} className={styleHome.main}>
      <div className={styles.main_addContract}>
        <div className={styles.formAddContract}>
          <DetailContract setCheckFile={setCheckFile} />
        </div>
      </div>
    </div>
  );
};

export default EditContractCoponent;
