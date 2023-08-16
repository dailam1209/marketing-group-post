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

const ImportFiles: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [checkValueCheckBox3, setCheckValueCheckBox3] = useState("Từ danh sách người dùng");
  const [checkValueCheckBox2, setCheckValueCheckBox2] = useState("Thêm mới");
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Tiềm Năng/ Nhập từ file");
    setShowBackButton(true);
    setCurrentPath("/crm/potential/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
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
          {currentStep === 0 && <PotentialStep1 setCheckFile={setCheckFile} />}
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
  );
};

export default ImportFiles;
