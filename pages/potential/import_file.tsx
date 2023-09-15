import React, { useContext, useEffect, useRef, useState } from "react";
import { Steps } from "antd";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import PotentialStep1 from "@/components/crm/potential/potential_steps/potential_step1";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import FooterStep from "@/components/crm/potential/potential_steps/potentail_footer";
import PotentialStep2 from "@/components/crm/potential/potential_steps/potential_step2";
import PotentialStep3 from "@/components/crm/potential/potential_steps/potential_step3";
import PotentialStep4 from "@/components/crm/potential/potential_steps/potential_step4";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Head from "next/head";

const ImportFiles: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [checkValueCheckBox3, setCheckValueCheckBox3] = useState(
    "Từ danh sách người dùng"
  );
  const [checkValueCheckBox2, setCheckValueCheckBox2] = useState("Thêm mới");
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Tiềm Năng/ Nhập từ file");
    setShowBackButton(true);
    setCurrentPath("/potential/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

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
        <div className={styles.main_importfile}>
          <div className="customStep flex-center">
            <Steps
              current={currentStep}
              labelPlacement="vertical"
              items={[
                {
                  title: "",
                  description: "Chọn tệp nguồn",
                },
                {
                  title: "",
                  description: "Ghép dữ liệu",
                },
                {
                  title: "",
                  description: "Cập nhật thông tin",
                },
                {
                  title: "",
                  description: "Xác thực",
                },
              ]}
            />
          </div>

          <div className={styles.formInfoStep}>
            {currentStep === 0 && (
              <PotentialStep1 setCheckFile={setCheckFile} />
            )}
            {currentStep === 1 && (
              <PotentialStep2
                checkValueCheckBox={checkValueCheckBox2}
                setCheckValueCheckBox={setCheckValueCheckBox2}
              />
            )}
            {currentStep === 2 && (
              <PotentialStep3
                checkValueCheckBox={checkValueCheckBox3}
                setCheckValueCheckBox={setCheckValueCheckBox3}
              />
            )}
            {currentStep === 3 && (
              <PotentialStep4
                typeDocument={checkValueCheckBox2}
                personalInCharge={checkValueCheckBox3}
              />
            )}
            <FooterStep
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              checkFile={checkFile}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportFiles;
