import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import CheckMergeBody from "@/components/crm/potential/check_merge/check_merge_body";
import CheckMergeInputGroup from "@/components/crm/potential/check_merge/check_merge_input_group";

const CheckMergeCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkDocument, setCheckDocument] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const [numberSelected, setNumberSelected] = useState(0);
  const [type, setType] = useState("hoặc");
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Danh sách khách hàng / Kiểm tra trùng");
    setShowBackButton(true);
    setCurrentPath("/crm/customer/list");
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
            <div className={styles.main__title}>Thiết lập điều kiện</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main_body_merge}>
                <CheckMergeBody type={type} setType={setType} />
                <CheckMergeInputGroup
                  label="Tên khách hàng"
                  defaultValue="q1"
                />
                <CheckMergeInputGroup type={type} label="Điện thoại" placeholder="Nhập số điện thoại"/>
                <CheckMergeInputGroup type={type} label="Mã số thuế" placeholder="Nhập mã số thuế"/>
                <CheckMergeInputGroup type={type} label="Website" placeholder="Nhập website"/>
                <div>
                  <button className={styles.btn_serach}>Tìm kiếm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckMergeCustomerList;
