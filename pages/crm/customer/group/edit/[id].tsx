import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import PotentialFooterAddFiles from "@/components/crm/potential/potential_add_files/potential_footer_add_files";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TextEditor from "@/components/crm/text-editor/text_editor";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import { Checkbox, Select } from "antd";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import TableStaffCustomerGroupAdd from "@/components/crm/table/table-staff-group-add-customer";

const GroupCustomerAdd: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle("Nhóm khách hàng / Thêm mới");
    setShowBackButton(false);
    setCurrentPath("/crm/customer/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  function handleChange(): void {}

  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Chỉnh sửa nhóm khách hàng</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <div className={styles["main__body_item"]}></div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <InputText
                    required
                    label={"Tên nhóm khách hàng"}
                    placeholder=" Nhập tên nhóm khách hàng"
                  />
                  <div style={{ width: "50%" }}>
                    <label>Nhóm khách hàng cha </label>
                    <PotentialSelectBoxStep
                      value="Chọn nhóm khách hàng cha"
                      placeholder="Chọn"
                    />
                  </div>
                </div>

                {/* Text Editor */}
                <div style={{ marginBottom: -20 }}>Mô tả</div>
                <TextEditor />
                <div>Danh sách chia sẻ</div>
                <div
                  className="flex_between"
                  style={{ gap: "15px", flexWrap: "wrap" }}
                >
                  <div style={{ width: "45%" }}>
                    <div
                      className="flex_between"
                      style={{ marginBottom: "3.5px" }}
                    >
                      <label>Phòng ban</label>
                      <Checkbox onChange={() => {}}>Tất cả</Checkbox>
                    </div>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        width: "100%",
                        // maxWidth: "509px",
                        height: "40px !important",
                      }}
                      placeholder="Chọn phòng ban"
                      defaultValue={[]}
                      onChange={handleChange}
                      options={[
                        {
                          label: "Chọn phòng ban",
                          value: "Test",
                        },
                        {
                          label: "ABC",
                          value: "ABC",
                        },
                      ]}
                    />
                  </div>
                  <div
                    style={{
                      width: "50%",
                      overflowX: "hidden",
                      overflowY: "visible",
                    }}
                  >
                    <div className="flex_between">
                      <label>Nhân viên</label>
                      <Checkbox onChange={() => {}}>Tất cả</Checkbox>
                    </div>
                    <PotentialSelectBoxStep
                      value="Chọn nhân viên"
                      placeholder="Chọn nhân viên"
                    />
                  </div>
                </div>

                <TableStaffCustomerGroupAdd />
              </div>
              <PotentialFooterAddFiles
                link="/crm/customer/group/list"
                titleCancel="Xác nhận hủy chỉnh sửa nhóm khách hàng "
                title="Chỉnh sửa nhóm khách hàng thành công!"
                contentCancel={
                  "Bạn có đồng ý hủy? \n Mọi dữ liệu bạn vừa nhập sẽ bị xóa?"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCustomerAdd;
