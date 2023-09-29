import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import CheckMergeBody from "@/components/crm/potential/check_merge/check_merge_body";
import CheckMergeInputGroup from "@/components/crm/potential/check_merge/check_merge_input_group";
import CheckMergeInputTaxCode from "@/components/crm/potential/check_merge/check_merge_input_tax_code";
import Head from "next/head";
import { base_url } from "@/components/crm/service/function";
import TableDataCustomerCheckMerge from "@/components/crm/table/table-customer-check-merge";
import CheckMergeContent from "@/components/crm/potential/check_merge/check_merge_content";
import CustomerFooterCheckMerge from "@/components/crm/potential/check_merge/check_merge_customer_footer";
import ModalErrorCheckMerge from "@/components/crm/customer/customer_modal/error_mdal_check_merge";

const Cookies = require("js-cookie");

const CheckMergeCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [type, setType] = useState<any>({ name: "hoặc", value: 2 });
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [newData, setNewData] = useState<any>([]);
  const [checkDocument, setCheckDocument] = useState(false);
  const [numberSelected, setNumberSelected] = useState(0);
  const [isRowDataSelected, setRowDataSelected] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [isOpenModalError, setIsOpenModalError] = useState(false);
  const [selectOption1, setselectOption1] = useState({
    name: "Chọn điều kiện",
    key: "",
  });
  const [selectOption2, setselectOption2] = useState({
    name: "Chọn điều kiện",
    key: "",
  });
  const [selectOption3, setselectOption3] = useState({
    name: "Chọn điều kiện",
    key: "",
  });
  const [selectOption4, setselectOption4] = useState({
    name: "Chọn điều kiện",
    key: "",
  });
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");
  const [hasData, setHasData] = useState({});

  useEffect(() => {
    setHeaderTitle("Danh sách khách hàng / Kiểm tra trùng");
    setShowBackButton(true);
    setCurrentPath("/customer/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const storedData = sessionStorage.getItem("DataSelectedCustomer");
  const parsedData = JSON.parse(storedData)?.data;

  const getCustomerDetail = async () => {
    try {
      const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ cus_id: parsedData }),
      });

      const customerDetails = await res.json();
      setNewData([customerDetails]);
    } catch (error) {

    }

  };

  const com_id = newData?.map((item) => item?.data?.company_id);
  const emp_id = newData?.map((item) => item?.data?.emp_id?.detail?._id);
  const nameDefault = newData[0]?.data?.name;
  const phoneDefault = newData[0]?.data?.phone_number.info;
  const taxDefault = newData[0]?.data?.tax_code || "";
  const websiteDefault = newData[0]?.data?.website || "";

  const handleSearchCustomer = async () => {
    try {
      const formData = new FormData();
      formData.append("choose", type.value);
      formData.append("stt_name_customer", selectOption1.key);
      formData.append("stt_phone_customer", selectOption2.key);
      formData.append("stt_tax_code_customer", selectOption3.key);
      formData.append("stt_website_customer", selectOption4.key);
      formData.append("name_customer", inputValue1 || nameDefault);
      formData.append("phone_customer", inputValue2 || phoneDefault);
      formData.append("tax_code_customer", inputValue3 || taxDefault);
      formData.append("website_customer", inputValue4 || websiteDefault);
      formData.append("com_id", com_id);
      formData.append("emp_id", emp_id);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/customerdetails/search-customer-same`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: formData,
        }
      );
      const data = await res.json()
      setHasData(data.data)

    } catch (error) { }

  };

  const handleSearch = async () => {
    setShowTable(true);
    await handleSearchCustomer();
  };

  useEffect(() => {
    getCustomerDetail();
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>
          Danh sách khách hàng
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
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Thiết lập điều kiện</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main_body_merge}>
                  <CheckMergeBody type={type} setType={setType} />
                  <CheckMergeInputGroup
                    type={type}
                    label="Tên khách hàng"
                    name="name"
                    value={
                      newData?.map((item) => item?.data?.name) ||
                      "Chưa cập nhật"
                    }
                    placeholder="Nhập tên khách hàng"
                    setOptionSelect={setselectOption1}
                    setValue={setInputValue1}
                  />
                  <CheckMergeInputGroup
                    type={type}
                    label="Điện thoại"
                    name="phone_number"
                    value={
                      newData?.map((item) => item?.data?.phone_number.detail) ||
                      "Chưa cập nhật"
                    }
                    placeholder="Nhập số điện thoại"
                    setOptionSelect={setselectOption2}
                    setValue={setInputValue2}
                  />
                  <CheckMergeInputTaxCode
                    type={type}
                    label="Mã số thuế"
                    name="tax_code"
                    value={newData?.map((item) => item?.data?.tax_code)}
                    placeholder="Nhập mã số thuế"
                    setOptionSelect={setselectOption3}
                    setValue={setInputValue3}
                  />
                  <CheckMergeInputGroup
                    type={type}
                    label="Website"
                    name="website"
                    value={newData?.map((item) => item?.data?.website)}
                    placeholder="Nhập website"
                    setOptionSelect={setselectOption4}
                    setValue={setInputValue4}
                  />
                  <div>
                    <button
                      className={styles.btn_serach}
                      onClick={() => handleSearch()}
                    >
                      Tìm kiếm
                    </button>
                  </div>
                </div>
                {showTable && (
                  <>
                    <CheckMergeContent numberSelected={numberSelected} />
                    <TableDataCustomerCheckMerge
                      data={hasData}
                      setSelected={setCheckDocument}
                      setNumberSelected={setNumberSelected}
                      setRowDataSelected={setRowDataSelected}
                    />
                    <CustomerFooterCheckMerge />
                  </>
                )}
                <ModalErrorCheckMerge
                  modal1Open={isOpenModalError}
                  setModal1Open={setIsOpenModalError}
                  title={"Bạn chưa nhập điều kiện"}
                  link={"/customer/check-merge"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckMergeCustomerList;
