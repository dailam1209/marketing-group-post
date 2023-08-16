import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import style from "@/components/crm/marketing/marketing.module.css";
import styles from "@/components/crm/potential/potential_add_files/add_file_potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import FooterAddSMSForm from "@/components/crm/marketing/sms/footer_add_sms_form";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TextEditor from "@/components/crm/text-editor/text_editor";

const UpdateEmailFormList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Mẫu sms / Chỉnh sửa");
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
      <div className={style.main__title}>Chỉnh sửa mẫu sms</div>
      <div className={style.main__body}>
        <div className={styles.row_input}>
          <div className={styles.mb_3}>
            <label className={`${styles["form-label"]}`}>Tên mẫu sms</label>
            <textarea
              name="email_title"
              id="email_title"
              className={styles["form-control"]}
              placeholder="Nhập tiêu đề email"
            />
          </div>
        </div>
        <div className={styles.row_input}>
          <div className={styles.mb_3}>
            <label className={`${styles["form-label"]}`}>Nội dung sms</label>
            <textarea
              name="email_title"
              id="email_title"
              className={styles["form-control"]}
              placeholder="Nhập tiêu đề email"
            />
          </div>
        </div>
      </div>
      <FooterAddSMSForm
        link="/marketing/sms"
        titleCancel="Hủy cập nhật mẫu sms"
        title="Cập nhật mẫu sms thành công!"
        contentCancel="Bạn có chắc chắn muốn hủy cập nhật mẫu sms này không, mọi thông tin bạn thay đổi sẽ không được lưu lại?"
      />
    </div>
  );
};

export default UpdateEmailFormList;
