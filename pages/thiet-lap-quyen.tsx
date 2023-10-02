import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import stylesContract from "@/components/crm/contract/contract_action.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import StaffData from "@/components/crm/setup_role/staff_data";
import OptionRole from "@/components/crm/setup_role/options_role";
import { useRouter } from "next/router";
import Head from "next/head";

const SetUpRole: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const router = useRouter();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [infoRole, setInfoRole] = useState({});
  console.log(infoRole[0]?.role, "info");

  const handleRole = (index, role) => {
    infoRole[index]?.role === 1 ? false : true;
  };

  const [checkboxState, setCheckboxState] = useState({
    selectAll: false,
    checkboxItems: {
      custom_1: handleRole(0, "add"),
      custom_2: handleRole(0, "edit"),
      custom_3: handleRole(0, "delete"),
      custom_4: handleRole(0, "seen"),
      provider_1: handleRole(1, "add"),
      provider_2: handleRole(1, "edit"),
      provider_3: handleRole(1, "delete"),
      provider_4: handleRole(1, "seen"),
      mkt_1: handleRole(2, "add"),
      mkt_2: handleRole(2, "edit"),
      mkt_3: handleRole(2, "delete"),
      mkt_4: handleRole(2, "seen"),
      mange_1: handleRole(3, "add"),
      mange_2: handleRole(3, "edit"),
      mange_3: handleRole(3, "delete"),
      mange_4: handleRole(3, "seen"),
      care_1: handleRole(4, "add"),
      care_2: handleRole(4, "edit"),
      care_3: handleRole(4, "delete"),
      care_4: handleRole(4, "seen"),
      cost_1: handleRole(5, "add"),
      cost_2: handleRole(5, "edit"),
      cost_3: handleRole(5, "delete"),
      cost_4: handleRole(5, "seen"),
      report_1: handleRole(6, "add"),
      report_2: handleRole(6, "edit"),
      report_3: handleRole(6, "delete"),
      report_4: handleRole(6, "seen"),
      general_1: handleRole(7, "add"),
      general_2: handleRole(7, "edit"),
      general_3: handleRole(7, "delete"),
      general_4: handleRole(7, "seen"),
    },
  });
  // console.log(checkboxState, "checkboxState");

  const handleSave = () => {
    alert("set quyền thành công");
    // router.push()
  };

  useEffect(() => {
    setHeaderTitle("Thiết lập quyền");
    setShowBackButton(false);
    setCurrentPath("/");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Thiết lập quyền</title>
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
              <div className={styles.main__title}>Thông tin quyền</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <StaffData setInfoRole={setInfoRole} />
                </div>
                <OptionRole
                  checkboxState={checkboxState}
                  setCheckboxState={setCheckboxState}
                />
                <div className={stylesContract.btn_submit}>
                  <button className={stylesContract.sub1}>Hủy</button>
                  <button className={stylesContract.sub2} onClick={handleSave}>
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetUpRole;
