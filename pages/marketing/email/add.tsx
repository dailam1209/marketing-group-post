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
          content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
        />
        <meta name="Keywords" content="Phần mềm CRM, phần mềm crm miễn phí" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận"
        />
        <meta
          property="og:description"
          content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
        />
        <meta
          property="og:image"
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
        />
        <meta
          name="twitter:title"
          content="CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận"
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
