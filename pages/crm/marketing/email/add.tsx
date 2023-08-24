import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import FooterAddEmail from "@/components/crm/marketing/email/footer_add_email";
import { useHeader } from "@/components/crm/hooks/useHeader";
import AddEmailInfor from "@/components/crm/marketing/email/add_email_infor";
import TextEditor from "@/components/crm/text-editor/text_editor";
import EmailInputGroup from "@/components/crm/marketing/email/email_input_group";

const AddFilesCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Email / Thêm mới email");
    setShowBackButton(true);
    setCurrentPath("/crm/marketing/email");
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
      <EmailInputGroup />
      <div className={styles.formInfoStep}>
        <div className={styles.main__title}>Thêm mới email</div>
        <div className={styles.form_add_potential}>
          <div className={styles.main__body}>
            <AddEmailInfor />
            <label className={`${styles["form-label"]}`}>Nội dung email</label>
            <TextEditor />
            <div className={styles.main__body__type}>Thông tin hệ thống</div>
            <div className={styles.row_input}>
              <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
                <p style={{ display: "flex" }}>
                  <input type="radio"value="0"style={{ marginRight: "8px" }}name="info_system"checked/>
                  Gửi ngay
                </p>
                <p style={{ display: "flex" }}>
                  <input type="radio"value="1"style={{ marginRight: "8px" }}name="info_system"/>
                  Gửi vào lúc
                </p>
              </div>
            </div>
          </div>
          <FooterAddEmail
            link="/crm/marketing/email"
            titleCancel="Xác nhận hủy thêm mới email"
            title="Gửi email thành công!"
            contentCancel="Bạn có chắc chắn muốn hủy thêm mới email mọi thông tin bạn nhập sẽ không được lưu lại?"
          />
        </div>
      </div>
    </div>
  );
};

export default AddFilesCustomerList;
