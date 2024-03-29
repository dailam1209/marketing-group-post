import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import FooterAddEmail from "@/components/crm/marketing/email/footer_add_email";
import { useHeader } from "@/components/crm/hooks/useHeader";
import AddEmailInfor from "@/components/crm/marketing/email/add_email_infor";
import TextEditor from "@/components/crm/text-editor/text_editor";
import EmailInputGroup from "@/components/crm/marketing/email/email_input_group";
import Head from "next/head";

const AddFilesCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Email / Thêm mới email");
    setShowBackButton(true);
    setCurrentPath("/marketing/email");
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
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Thêm mới email</title>
        <meta
          name="description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="Keywords"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <meta
          property="og:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          property="og:image"
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="twitter:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <link rel="canonical" href="https://hungha365.com/crm" />

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
      </Head>
      <div className={styleHome.main} ref={mainRef}>
        <EmailInputGroup />
        <div className={styles.formInfoStep}>
          <div className={styles.main__title}>Thêm mới email</div>
          <div className={styles.form_add_potential}>
            <div className={styles.main__body}>
              <AddEmailInfor />
              <label className={`${styles["form-label"]}`}>
                Nội dung email
              </label>
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
            <FooterAddEmail
              link="/marketing/email"
              titleCancel="Xác nhận hủy thêm mới email"
              title="Gửi email thành công!"
              contentCancel="Bạn có chắc chắn muốn hủy thêm mới email mọi thông tin bạn nhập sẽ không được lưu lại?"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFilesCustomerList;
