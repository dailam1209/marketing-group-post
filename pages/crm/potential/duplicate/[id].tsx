import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import PotentialFooterAddFiles from "@/components/crm/potential/potential_add_files/potential_footer_add_files";
import AddGeneralInfo from "@/components/crm/potential/potential_add_files/general_infor";
import AddPersonalInfo from "@/components/crm/potential/potential_add_files/personal_info";
import AddOrganizeInfo from "@/components/crm/potential/potential_add_files/organize_info";
import AddDesriptionAndSystemInfo from "@/components/crm/potential/potential_add_files/description_system_add_files";
import AddAddressInfo from "@/components/crm/potential/potential_add_files/address_info";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Head from "next/head";

const AddFilesPotential: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  const [formData, setFormData] = useState<any>({
    xungho: "",
    tendem: "",
    ten: "",
    hovaten: "",
    chucdanh: "",
    phongban: "",
    dienthoaicoquan: "",
    dienthoaicanhan: "",
    emailcoquan: "",
    emailcanhan: "",
    nguongoc: "",
    masothue: "",
    loaitiemnang: "",
    mangxahoi: "",
    nhanvien: "",
    gioitinh: "",
    ngaysinh: "",
    tochuc: "",
    taikhoannh: "",
    motainh: "",
    ngaytl: "",
    loaihinh: "",
    linhvuc: "",
    nganhnghe: "",
    doanhthu: "",
    quocgia: "",
    city: "",
    district: "",
    ward: "",
    street: "",
    mavung: "",
    diachi: "",
    mota: "",
    dungchung: "",
    image: "",
  });

  useEffect(() => {
    setHeaderTitle("Tiềm Năng/ Nhân bản");
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
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Nhân bản tiềm năng</title>
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
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Nhân bản tiềm năng</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}>
                    <p className={styles["main__body__type"]}>Ảnh</p>
                    <div id="upload">
                      <img
                        src="/crm/customer/upload_logo.png"
                        alt=""
                        className={styles["show_avatar"]}
                        onClick={handleClickImg}
                      />
                      <input
                        ref={imgRef}
                        type="file"
                        name="logo"
                        className=""
                        id="logo"
                        hidden
                        accept="image/png,image/gif,image/jpeg"
                      />
                    </div>
                  </div>

                  <AddGeneralInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <AddPersonalInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <AddOrganizeInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <AddAddressInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <AddDesriptionAndSystemInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
                <PotentialFooterAddFiles
                  title="Nhân bản tiềm năng Tên tiềm năng thành công!
    "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFilesPotential;
