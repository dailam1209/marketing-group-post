import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import FooterAddSMS from "@/components/crm/marketing/sms/footer_add_sms";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TextEditor from "@/components/crm/text-editor/text_editor";
import SMSInputGroup from "@/components/crm/marketing/sms/sms_input_group";
import AddSMSInfor from "@/components/crm/marketing/sms/add_sms_infor";
import Head from "next/head";

const AddFilesCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("SMS / Thêm mới sms");
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
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>
          CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận
        </title>
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
        <SMSInputGroup />
        <div className={styles.formInfoStep}>
          <div className={styles.main__title}>Thêm mới sms</div>
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
              link="/crm/marketing/sms"
              titleCancel="Xác nhận hủy thêm mới sms"
              title="Gửi sms thành công!"
              contentCancel="Bạn có chắc chắn muốn hủy thêm mới sms thông tin bạn nhập sẽ không được lưu lại?"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFilesCustomerList;
