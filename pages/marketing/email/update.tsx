import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import style from "@/components/crm/marketing/marketing.module.css";
import styles from "@/components/crm/potential/potential_add_files/add_file_potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import FooterAddEmailForm from "@/components/crm/marketing/email/footer_add_email_form";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TextEditor from "@/components/crm/text-editor/text_editor";
import Head from "next/head";

const UpdateEmailFormList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Mẫu email / Chỉnh sửa");
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
        <title>Chỉnh sửa mẫu email</title>
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
              <label className={`${styles["form-label"]}`}>
                Nội dung email
              </label>
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
    </>
  );
};

export default UpdateEmailFormList;
