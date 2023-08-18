import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import PotentialFooterAddFiles from "@/components/crm/potential/potential_add_files/potential_footer_add_files";
import AddAddressInfo from "@/components/crm/potential/potential_add_files/address_info";
import { useHeader } from "@/components/crm/hooks/useHeader";
import AddCustomerBankInfo from "@/components/crm/customer/add_edit/bank_infor";
import TextEditor from "@/components/crm/text-editor/text_editor";
import GeneralCustomerInfor from "@/components/crm/customer/add_edit/general_customer_info";
import { useApi } from "@/components/crm/hooks/useApi";
import { useRouter } from "next/router";
import EditPersonalCustomerInfor from "@/components/crm/customer/editData/personal_infor";

const EditFilesCustomerList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [edited, setEdited] = useState(false);

  const { data, loading, fetchData, updateData, deleteData } = useApi(
    "http://210.245.108.202:3007/api/crm/customerdetails/detail",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJpZFRpbVZpZWMzNjUiOjIwMjU4NSwiaWRRTEMiOjE3NjMsImlkUmFvTmhhbmgzNjUiOjAsImVtYWlsIjoiZHVvbmdoaWVwaXQxQGdtYWlsLmNvbSIsInBob25lVEsiOiIiLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInR5cGUiOjEsImNvbV9pZCI6MTc2MywidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyJ9LCJpYXQiOjE2OTIyOTc4NjMsImV4cCI6MTY5MjM4NDI2M30.XMyMzNsvPn1yInnlVLO-XTnm9mDLMDohaSxQSOvtczo",
    "POST",
    { cus_id: id, limit: 1000 }
  );

  useEffect(() => {
    fetchData();
    console.log(data);
    console.log(id);
  }, [id]);
  console.log(data);

  const dataEdit = data?.data?.data1 ? data?.data?.data1 : data?.data?.data2;
  console.log("value:  ", dataEdit);

  useEffect(() => {
    setHeaderTitle("Chỉnh sửa khách hàng");
    setShowBackButton(true);
    setCurrentPath("/crm/customer/list");
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
            <div className={styles.main__title}>Chỉnh sửa khách hàng</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <div className={styles["main__body_item"]}>
                  {/* Type Customer */}
                  <p className={styles["main__body__type"]}>Loại hình</p>
                  <div className="d_flex">
                    <label className="lbl_container">
                      <input
                        type="radio"
                        defaultChecked
                        className="get_data"
                        name="type"
                        onChange={(e) =>
                          setEdited({
                            ...data,
                            type: parseInt(e.target.value),
                          })
                        }
                        value={2}
                      />
                      Khách hàng doanh nghiệp
                      <span className="checkmark" />
                    </label>
                    <label className="lbl_container">
                      <input
                        type="radio"
                        className="get_data"
                        name="type"
                        onChange={(e) =>
                          setEdited({
                            ...data,
                            type: parseInt(e.target.value),
                          })
                        }
                        value={1}
                      />
                      Khách hàng cá nhân
                      <span className="checkmark" />
                    </label>
                  </div>

                  {/* Image */}
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

                <EditPersonalCustomerInfor editData={dataEdit} />
                <AddAddressInfo
                  editData={dataEdit}
                  title="Thông tin viết hóa đơn"
                />
                <AddAddressInfo
                  editData={dataEdit}
                  title="Thông tin giao hàng"
                />
                <AddCustomerBankInfo editData={dataEdit} />

                {/* Text Editor */}
                <div
                  style={{ marginBottom: -10 }}
                  className={styles["main__body__type"]}
                >
                  Thông tin mô tả
                </div>
                <TextEditor />
                <GeneralCustomerInfor />
              </div>
              <PotentialFooterAddFiles
                link="/crm/customer/list"
                titleCancel="Xác nhận hủy thêm mới khách hàng"
                title="Thêm mới khách hàng qwe thành công!"
                contentCancel="Bạn có chắc chắn muốn hủy thêm mới khách hàng Nguyễn Trần Kim Phượng không ?"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFilesCustomerList;
