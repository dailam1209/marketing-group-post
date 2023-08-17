import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TextEditor from "@/components/crm/text-editor/text_editor";
import SMSDetailInputGroup from "@/components/crm/marketing/sms/sms_form_detail_input_group";

const AddFilesCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Mẫu sms / Chi tiết");
    setShowBackButton(true);
    setCurrentPath("/crm/marketing/sms");
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
      <SMSDetailInputGroup />
      <div className={styles.formInfoStep}>
        <div className={styles.main__title}>Thông tin mẫu sms</div>
        <div className={styles.form_add_potential}>
          <div className={styles.main__body}>
            <div className={styles.main__content}>
              <div className={styles.main__body__item}>
                <div className={styles.main__body__type}>Nội dung sms</div>
                <div className={styles.row}>
                  <div className={styles.col_lg_12}>
                    <div className={styles.d_flex}>
                      <div className={styles.main__body__item__title}>Tên mẫu:</div>
                      <div className={styles.main__body__item__value}>Mẫu SMS chăm sóc khách hàng Vip</div>
                    </div>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.col_lg_12}>
                    <div className={styles.d_flex}>
                      <div className={styles.main__body__item__title}>Nội dung mẫu sms:</div>
                      <div className={styles.main__body__item__value}>Wikipedia là một bách khoa toàn thư mở trực tuyến đa ngôn ngữ được sáng lập và duy trì bởi một cộng đồng biên tập viên tình nguyện và chạy trên nền tảng wiki.</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.main__body__item}>
                <br/>
                <div className={styles.main__body__type}>
                  Thông tin hệ thống
                </div>
                <div className={styles.row_system}>
                  <div className={styles.col_lg_6}>
                    <div className={styles.d_flex}>
                      <div className={styles.main__body__item__title}>
                        Người tạo:
                      </div>
                      <div className="main__body__item__value info_system_img">
                        <img style={{margin: "-8px 8px"}} src="https://crm.timviec365.vn/assets/img/user_kh.png" />
                        Công ty Cổ phần Thanh toán Hưng Hà
                      </div>
                    </div>
                  </div>
                  <div className={styles.col_lg_6}>
                    <div className={styles.d_flex}>
                      <div className={styles.main__body__item__title}>
                        Ngày tạo:{" "}
                      </div>
                      <div className={styles.main__body__item__value}>
                        09:09 - 08/08/2023
                      </div>
                    </div>
                  </div>
                  <div className={styles.col_lg_6}>
                    <div className={styles.d_flex}>
                      <div className={styles.main__body__item__title}>
                        Người sửa:
                      </div>
                      <div className="main__body__item__value info_system_img ">
                        <img
                          style={{margin: "-8px 8px"}}
                          width="26"
                          height="26"
                          src="https://crm.timviec365.vn/assets/img/user_kh.png"
                        />
                        Công ty Cổ phần Thanh toán Hưng Hà
                      </div>
                    </div>
                  </div>
                  <div className={styles.col_lg_6}>
                    <div className={styles.d_flex}>
                      <div className={styles.main__body__item__title}>
                        Ngày sửa:
                      </div>
                      <div className={styles.main__body__item__value}>
                        16:25 - 08/08/2023{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFilesCustomerList;
