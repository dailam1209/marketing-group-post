import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import PotentialFooterCheckMerge from "@/components/crm/potential/check_merge/check_merge_footer";
import TableDataPotential from "@/components/crm/table/table-potential";
import CheckMergeBody from "@/components/crm/potential/check_merge/check_merge_body";
import CheckMergeInputGroup from "@/components/crm/potential/check_merge/check_merge_input_group";
import CheckMergeContent from "@/components/crm/potential/check_merge/check_merge_content";

const CheckMergePotential: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkDocument, setCheckDocument] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const [numberSelected, setNumberSelected] = useState(0);
  const [type, setType] = useState("hoặc");
  const imgRef = useRef<HTMLInputElement>(null);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Tiềm Năng/ Kiểm tra trùng");
    setShowBackButton(true);
    setCurrentPath("/crm/potential/list");
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
            <div className={styles.main__title}>Thiết lập điều kiện</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main_body_merge}>
                <CheckMergeBody type={type} setType={setType} />
                <CheckMergeInputGroup
                  label="Họ và tên"
                  defaultValue="Nguyễn Trần Kim Phượng"
                />
                <CheckMergeInputGroup type={type} label="Điện thoại cá nhân" />
                <CheckMergeInputGroup type={type} label="Điện thoại cơ quan" />
                <CheckMergeInputGroup type={type} label="Email cá nhân" />
                <CheckMergeInputGroup type={type} label="Email cơ quan" />
                <div>
                  <button className={styles.btn_serach}>Tìm kiếm</button>
                </div>
              </div>
            </div>
            <CheckMergeContent numberSelected={numberSelected}/>
            <TableDataPotential
              setSelected={setCheckDocument}
              setNumberSelected={setNumberSelected}
            />
            <PotentialFooterCheckMerge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckMergePotential;
