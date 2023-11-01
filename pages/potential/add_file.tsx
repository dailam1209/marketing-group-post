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
import { useForm } from "@/components/crm/hooks/useForm";
const AddFilesPotential: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const refs = {
    vocativeRef: useRef(null), //xưng hô
    posIdRef: useRef(null), //chức danh
    departmentRef: useRef(null), // Phòng ban
    resourceRef: useRef(null), //nguồn gốc
    typeRef: useRef(null), //Phân loại tiềm năng
    socialRef: useRef(null), //Mạng xã hôi
    empIdRef: useRef(null), //nhân viên phụ trách
    genderRef: useRef(null),
    bankIdRef: useRef(null),
    categoryRef: useRef(null), // loại hình
    sectorRef: useRef(null), //lĩnh vực
    classifyRef: useRef(null), // ngành nghề
    shareAllRef: useRef(null), //doanh thu
    cityIdRef: useRef(null),
    wardRef: useRef(null),
  };
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [formData, setFormData] = useState<any>({
    /* name: "",
    email: "",
    cus_id: "",
    stand_name: "",
    logo: "",
    birthday: "",
    tax_code: "",
    cit_id: "",
    district_id: "",
    ward: "",
    address: "",
    ship_invoice_address: "",
    gender: "",
    cmnd_ccnd_number: "",
    cmnd_ccnd_address: "",
    cmnd_ccnd_time: "",
    description: "",
    introducer: "",
    contact_name: "",
    phone_number: "",
    contact_email: "",
    contact_phone: "",
    contact_gender: "",
    company_id: "",
    emp_id: "",
    user_create_id: "",
    user_create_type: "",
    user_edit_id: "",
    user_edit_type: "",
    group_id: "",
    status: "",
    business_areas: "",
    category: "",
    business_type: "",
    classify: "",
    bill_city: "",
    bil_district: "",
    bill_ward: "",
    bill_address: "",
    bill_area_code: "",
    bill_invoice_address: "",
    bill_invoice_address_email: "",
    ship_city: "",
    ship_area: "",
    bank_id: "",
    bank_account: "",
    revenue: "",
    size: "",
    rank: "",
    website: "",
    number_of_day_owed: "",
    deb_limit: "",
    share_all: "",
    type: 1,
    is_input: "",
    is_delete: "",
    created_at: "",
    updated_at: "",
    id_cus_from: "",
    cus_from: "",
    link: "", */
  });
  useEffect(() => {
    setHeaderTitle("Tiềm Năng/ Thêm mới");
    setShowBackButton(true);
    setCurrentPath("/potential/list");
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

  const handleTEST = () => {
    console.log("test", refs.vocativeRef.current.value);
  };

  console.log("AddPotential", formData);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Thêm mới tiềm năng</title>
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
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Thêm mới tiềm năng</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}>
                    <p className={styles["main__body__type"]}>Ảnh</p>
                    <div id="upload">
                      <img
                        src="/crm/upload_logo.png"
                        alt="hungha365.com"
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
                  <button onClick={handleTEST}>TEST</button>
                  <AddGeneralInfo
                    refs={refs}
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <AddPersonalInfo
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <AddOrganizeInfo />
                  <AddAddressInfo />
                  <AddDesriptionAndSystemInfo />
                </div>
                <PotentialFooterAddFiles title="Thêm mới tiềm năng tên Tiềm năng thành công" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFilesPotential;
