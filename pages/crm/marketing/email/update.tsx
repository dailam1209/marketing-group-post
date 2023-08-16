import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import style from "@/components/crm/marketing/marketing.module.css";
import styles from "@/components/crm/potential/potential_add_files/add_file_potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import FooterAddEmailForm from "@/components/crm/marketing/email/footer_add_email_form";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TextEditor from "@/components/crm/text-editor/text_editor";

const UpdateEmailFormList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Mẫu email / Chỉnh sửa");
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
      <div className={style.main__title}>Thêm mới mẫu email</div>
      <div className={style.main__body}>
        <p className={style.main__body__type}>Thông tin chung</p>
        <div className={styles.row_input}>
          <div className={styles.mb_3}>
            <label className={`${styles["form-label"]}`}>Tên mẫu email</label>
            <textarea
              name="email_title"
              id="email_title"
              className={styles["form-control"]}
              placeholder="Nhập tiêu đề email"
            />
          </div>
        </div>

        <p className={styles.main__body__type}>Nội dung email</p>
        <div className={styles.row_input}>
          <div className={styles.mb_3}>
            <label className={`${styles["form-label"]}`}>Tiêu đề email</label>
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
            <label className={`${styles["form-label"]}`}>Nội dung email</label>
            <TextEditor />      
          </div>
        </div>

      </div>
      <FooterAddEmailForm
        link="/marketing/email"
        titleCancel="Hủy cập nhật mẫu email"
        title="Cập nhật mẫu email thành công!"
        contentCancel="Bạn có chắc chắn muốn hủy cập nhật mẫu email này không, mọi thông tin bạn thay đổi sẽ không được lưu lại?"
      />
    </div>
  );
};

export default UpdateEmailFormList;
