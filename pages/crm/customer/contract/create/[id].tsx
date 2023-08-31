import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styles from "@/components/crm/potential/potential.module.css";
import { Select } from "antd";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import ContractBtsGroupFooter from "@/components/crm/customer/contract/contract_footer_btns_group";
const Cookies = require("js-cookie");
import { base_url } from "@/components/crm/service/function";
import Head from "next/head";

export default function ContractDetailsCreate() {
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen } = useContext<any>(SidebarContext);
  const { id } = router.query;
  const [valueContract, setValueContract] = useState("");
  const [FormData, setFormData] = useState<any>();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [name, setname] = useState<any>();
  const [nameContract, setnameContract] = useState<any>();

  const getNameDetail = async () => {
    const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ cus_id: id }),
    });
    const data = await res.json();
    setname(data?.data?.name);
  };

  const getContract = async () => {
    const res = await fetch(`${base_url}/api/crm/contract/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
    });
    const data = await res.json();
    const nameContract = data?.data?.list;
    console.log(nameContract);
    setnameContract(nameContract);
  };

  useEffect(() => {
    getContract();
    getNameDetail();
    setHeaderTitle(`${name} / Hợp đồng bán / Thêm hợp đồng bán`);
    setShowBackButton(true);
    setCurrentPath(`/crm/customer/contract/list/${id}`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id, name]);

  const options = nameContract?.map((item) => {
    return {
      label: item?.name,
      value: item?.id,
    };
  });

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const onChangeSelect = async (value: string) => {
    setValueContract(value);
    console.log(value);
    
    try {
      const res = await fetch(`${base_url}/api/crm/contractAI/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ contract_id: value }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setFormData(data?.data);
      } else {
        console.error("Error fetching data:", res.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Thêm hợp đồng bán</title>
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
      <div ref={mainRef} className={styleHome.main}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Thông tin hợp đồng</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "15px",
                      flexWrap: "wrap",
                    }}
                    className={styles["main__body_item"]}
                  >
                    <div style={{ flex: "1" }}>
                      <label className={`${styles["form-label"]} required`}>
                        Loại hợp đồng
                      </label>
                      <div>
                        <Select
                          style={{
                            maxWidth: "519px",
                            width: "100%",
                          }}
                          defaultValue="Chọn loại hợp đồng"
                          options={options}
                          placeholder="Chọn loại hợp đồng"
                          onChange={onChangeSelect}
                        />
                      </div>
                    </div>
                    <div style={{ flex: "1" }}>
                      <InputText bonus="disabled" label="Người tạo" require />
                    </div>
                  </div>

                  {valueContract !== "" &&
                    valueContract !== "0" &&
                    FormData?.get_detail_form_contract && (
                      <div>
                        <div className={styles["input-group"]}>
                          {FormData?.get_detail_form_contract &&
                            FormData?.get_detail_form_contract?.map(
                              (item: any, index: number) => (
                                <div className={styles["form-group"]}>
                                  <label className={styles.required}>
                                    @{item?.new_field}
                                    <span className={styles.dot}>*</span>
                                  </label>
                                  <p className={styles.old_field}>
                                    (Thay thế cho từ: {item?.old_field})
                                  </p>
                                  <input
                                    type="text"
                                    defaultValue=""
                                    className={styles["form-control"]}
                                    data-old-field={item?.old_field}
                                    data-index={index}
                                  />
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    )}
                </div>
                {valueContract !== "" && valueContract !== "0" && (
                  <ContractBtsGroupFooter
                    id={valueContract ? valueContract : "default"}
                    FormData={FormData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
