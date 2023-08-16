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

const ClonedFilesPotential: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

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
                      src="/assets/img/crm/customer/upload_logo.png"
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

                <AddGeneralInfo />
                <AddPersonalInfo />
                <AddOrganizeInfo />
                <AddAddressInfo />
                <AddDesriptionAndSystemInfo />
              </div>
              <PotentialFooterAddFiles
                title="Sao chép tiềm năng tên Tiềm năng thành công"
                contentCancel={
                  "Bạn có chắc chắn muốn hủy sao chép tiềm năng Tên tiềm năng mọi thông tin bạn nhập sẽ không được lưu lại?"
                }
                titleCancel={"Xác nhận hủy sao chép tiềm năng"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClonedFilesPotential;
