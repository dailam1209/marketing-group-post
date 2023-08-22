import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import PotentialFooterAddFiles from "@/components/crm/customer/input_data/footer_input_data";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TextEditor from "@/components/crm/text-editor/text_editor";
import Info_cus from "@/components/crm/customer/input_data/info_cus";
import Bot_textEditor from "@/components/crm/customer/input_data/bot_textEditor";
import Cookies from "js-cookie";
import { useApi } from "@/components/crm/hooks/useApi";
import TextEditorNhapLieu from "@/components/crm/text-editor/text_editor_nhaplieu";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";
const AddFilesCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [dataAdd, setDataAdd] = useState({
    name: "",
    phone_number: null,
    email: "",
    resoure: null,
    description: "",
    parent_group:null,
    user_create_id: null,
    // child_group:null
  });
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Thêm mới khách hàng");
    setShowBackButton(true);
    setCurrentPath("/crm/customer/list");
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
      {!checkAndRedirectToHomeIfNotLoggedIn() ? null : (
        <div className={styleHome.main} ref={mainRef}>
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.main__title}>Thêm mới khách hàng</div>
                <div className={styles.form_add_potential}>
                  <div className={styles.main__body}>
                    <div className={styles["main__body_item"]}>
                      {/* Type Customer */}
                      {/* Image */}
                      <Info_cus dataAdd={dataAdd} setDataAdd={setDataAdd} />
                    </div>

                    {/* Text Editor */}
                    <div
                      style={{ marginBottom: -10 }}
                      className={styles["main__body__type"]}
                    >
                      Mô tả khách hàng{" "}
                    </div>
                    <TextEditorNhapLieu
                      dataAdd={dataAdd}
                      setDataAdd={setDataAdd}
                    />
                    <Bot_textEditor dataAdd={dataAdd} setDataAdd={setDataAdd} />
                  </div>
                  <PotentialFooterAddFiles
                    link="/crm/customer/list"
                    titleCancel="Xác nhận hủy thêm mới khách hàng"
                    title="Thêm mới khách hàng thành công!"
                    contentCancel="Bạn có chắc chắn muốn hủy thêm mới khách hàng không ?"
                    dataAdd={dataAdd}
                    setDataAdd={setDataAdd}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFilesCustomerList;
