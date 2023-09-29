import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import PotentialFooterCheckMerge from "@/components/crm/potential/check_merge/check_merge_footer";
import TableDataPotential from "@/components/crm/table/table-potential";
import CheckMergeBody from "@/components/crm/potential/check_merge/check_merge_body";
import CheckMergeInputGroup from "@/components/crm/potential/check_merge/check_merge_input_group";
import CheckMergeContent from "@/components/crm/potential/check_merge/check_merge_content";
import Head from "next/head";
import { base_url } from "@/components/crm/service/function";
const Cookies = require("js-cookie");

const CheckMergePotential: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkDocument, setCheckDocument] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const [numberSelected, setNumberSelected] = useState(0);
  const [isRowDataSelected, setRowDataSelected] = useState("");
  const [type, setType] = useState<any>({ name: "hoặc", value: 2 });
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
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
  const [selectOption5, setselectOption5] = useState({
    name: "Chọn điều kiện",
    key: "",
  });
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");
  const [inputValue5, setInputValue5] = useState("");
  const [newData, setNewData] = useState<any>([]);

  useEffect(() => {
    setHeaderTitle("Tiềm Năng/ Kiểm tra trùng");
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



  const storedData = sessionStorage.getItem("DataSelectedCustomer");
  const parsedData = JSON.parse(storedData)?.data;

  const getCustomerDetail = async () => {
    const cus_id = "2033501"
    try {
      const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({
          // cus_id: parsedData 
          cus_id: cus_id
        }),
      });

      const customerDetails = await res.json();
      setNewData([customerDetails]);
    } catch (error) {

    }

  };
  useEffect(() => {
    getCustomerDetail();
  }, []);


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Kiểm tra trùng</title>
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
                    label="Họ và tên"
                    type={type}
                    name="name"
                    value={
                      newData?.map((item) => item?.name) ||
                      "Chưa cập nhật"
                    }
                    placeholder="Nhập tên khách hàng"
                    setOptionSelect={setselectOption1}
                    setValue={setInputValue1}

                  />
                  <CheckMergeInputGroup
                    type={type}
                    label="Điện thoại cá nhân"
                    name="phone_number"
                    value={
                      newData?.map((item) => item?.data?.phone_number) ||
                      "Chưa cập nhật"
                    }
                    placeholder="Nhập số điện thoại cá nhân"
                    setOptionSelect={setselectOption2}
                    setValue={setInputValue2}
                  />
                  <CheckMergeInputGroup
                    type={type}
                    label="Điện thoại cơ quan"
                    name="phone_number"
                    value={
                      newData?.map((item) => item?.data?.phone_number) ||
                      "Chưa cập nhật"
                    }
                    placeholder="Nhập số điện thoại cơ quan"
                    setOptionSelect={setselectOption3}
                    setValue={setInputValue3}
                  />
                  <CheckMergeInputGroup type={type} label="Email cá nhân"
                    name="email"
                    value={
                      newData?.map((item) => item?.data?.email) ||
                      "Chưa cập nhật"
                    }
                    placeholder="Nhập email cá nhân"
                    setOptionSelect={setselectOption4}
                    setValue={setInputValue4} />
                  <CheckMergeInputGroup type={type}
                    label="Email cơ quan"
                    name="email"
                    value={
                      newData?.map((item) => item?.data?.email) ||
                      "Chưa cập nhật"
                    }
                    placeholder="Nhập email cơ quan"
                    setOptionSelect={setselectOption5}
                    setValue={setInputValue5} />
                  <div>
                    <button className={styles.btn_serach}>Tìm kiếm</button>
                  </div>
                </div>
              </div>
              <CheckMergeContent numberSelected={numberSelected} />
              <TableDataPotential
                setSelected={setCheckDocument}
                setNumberSelected={setNumberSelected}
                setRowDataSelected={setRowDataSelected}
              />
              <PotentialFooterCheckMerge />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckMergePotential;
