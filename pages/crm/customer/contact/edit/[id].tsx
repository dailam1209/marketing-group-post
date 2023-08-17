import styles from "@/components/crm/potential/potential.module.css";
import TableChanceProduct from "@/components/crm/table/table-chance-product";
import AddAddressInfo from "@/components/crm/potential/potential_add_files/address_info";
import TextEditor from "@/components/crm/text-editor/text_editor";
import PotentialFooterAddFiles from "@/components/crm/potential/potential_add_files/potential_footer_add_files";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import AddGeneralInfoChance from "@/components/crm/customer/chance/general_info_chance";
import GeneralCustomerInfor from "@/components/crm/customer/add_edit/general_customer_info";
import AddGeneralInfoContact from "@/components/crm/customer/contact/general_info_add";
import { useContext, useEffect, useRef } from "react";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
export default function EditContactData() {
  const router = useRouter();
  const { id } = router.query;
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<any>();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`${id} / Liên hệ / Chỉnh sửa`);
    setShowBackButton(true);
    setCurrentPath(`/crm/customer/contact/list/${id}`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <>
      <div ref={mainRef} className={styleHome.main}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Chỉnh sửa liên lạc</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexWrap: "wrap",
                      gap: "30px",
                    }}
                  >
                    <div style={{ maxWidth: "50%", flex: "0 0 50% " }}>
                      <p className={styles["main__body__type"]}>Ảnh</p>
                      <div id="upload">
                        <img
                          src="/assets/img/crm/customer/upload_logo.png"
                          alt=""
                          className={styles["show_avatar"]}
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

                    <div
                      style={{
                        maxWidth: "50%",
                        flex: "0 0 40% ",
                        marginRight: "30px",
                      }}
                    >
                      <p className={styles["main__body__type"]}>Loại liên hệ</p>
                      <div className={styles.chekbox_contact}>
                        <p
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "1rem",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{ marginRight: "5px" }}
                          />
                          Liên hệ đại diện
                        </p>
                        <p
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "1rem",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{ marginRight: "5px" }}
                          />
                          Liên hệ nhận hóa đơn
                        </p>
                        <p
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "1rem",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{ marginRight: "5px" }}
                          />
                          Liên hệ giao hàng
                        </p>
                        <p
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "1rem",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{ marginRight: "5px" }}
                          />
                          Liên hệ thủ trưởng đơn vị
                        </p>
                      </div>
                    </div>
                  </div>

                  <AddGeneralInfoContact />
                  <AddAddressInfo />
                  <AddAddressInfo title="Thông tin giao hàng" />

                  <div
                    style={{ marginBottom: -10 }}
                    className={styles["main__body__type"]}
                  >
                    Thông tin mô tả
                  </div>
                  <label>Mô tả</label>

                  <TextEditor />
                  <GeneralCustomerInfor />
                </div>
                <PotentialFooterAddFiles
                  link={`/crm/customer/contact/list/${id}`}
                  titleCancel="Xác nhận hủy cập nhật liên hệ"
                  title="Cập nhật liên hệ thành công!"
                  contentCancel="Bạn có chắc chắn muốn hủy cập nhật liên hệ Tran Quang Duc Dung?"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
