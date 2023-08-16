import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import FooterAddSMS from "@/components/crm/marketing/sms/footer_add_sms";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TextEditor from "@/components/crm/text-editor/text_editor";
import SMSInputGroup from "@/components/crm/marketing/sms/sms_input_group";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import AddSMSInfor from "@/components/crm/marketing/sms/add_sms_infor"


const AddFilesCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("SMS / Chỉnh sửa sms");
    setShowBackButton(true);
    setCurrentPath("/crm/marketing/sms");
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
      <SMSInputGroup />
      <div className={styles.formInfoStep}>
        <div className={styles.main__title}>Chỉnh sửa sms</div>
        <div className={styles.form_add_potential}>
          <div className={styles.main__body}>
            
          <AddSMSInfor />
            <p className={styles.main__body__type}>Nội dung sms</p>
            <label className={`${styles["form-label"]}`}>Nội dung sms</label>
            <TextEditor />
            <div className={styles.main__body__type}>Thông tin hệ thống</div>
            <div className={styles.row_input}>
              <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
                <p style={{ display: "flex" }}>
                  <input
                    type="radio"
                    value="0"
                    style={{ marginRight: "8px" }}
                    name="info_system"
                    checked
                  />
                  Gửi ngay
                </p>
                <p style={{ display: "flex" }}>
                  <input
                    type="radio"
                    value="1"
                    style={{ marginRight: "8px" }}
                    name="info_system"
                  />
                  Gửi vào lúc
                </p>
              </div>
            </div>
          </div>
          <FooterAddSMS
            link="/marketing/sms"
            titleCancel="Xác nhận hủy cập nhật sms"
            title="Cập nhật sms thành công!"
            contentCancel="Bạn có chắc chắn muốn hủy cập nhật sms này không, mọi thông tin bạn thay đổi sẽ không được lưu lại?"
          />
        </div>
      </div>
    </div>
  );
};

export default AddFilesCustomerList;
