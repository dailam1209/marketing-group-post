import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import styles from "../../potential/potential.module.css";
import styleCustomer from "../customer.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";

import Cookies from "js-cookie";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  listNV: any
}

const SharingCustomerModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  listNV,
}) => {
  const [valueSharing, setValueSharing] = useState("");
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [optionsDep, setOptionsDep] = useState<{ value: string; label: string }[]>(
    []
  );

  const [selectedItems, setSelectedItems] = useState<any>(undefined);
  const [selectedItemsPB, setSelectedItemsPB] = useState<any>(undefined);
  const [listPB, setlistPB] = useState<any>();;


  useEffect(() => {
    if (Array.isArray(listNV)) {
      const updatedOptions = [
        { value: "", label: "Chọn nhân viên bàn giao" },
        ...listNV.map((item) => {
          const name = item?.ep_name || "";
          const id = item?.ep_id?.toString() || "";

          return { value: id, label: `(${id}) ${name}` };
        }),
      ];

      setOptions(updatedOptions);
    }
  }, [listNV]);

  useEffect(() => {
    if (Array.isArray(listPB)) {
      const updatedOptionsDep = [
        { value: "", label: "Chọn phòng ban bàn giao" },
        ...listPB?.map((item) => {
          const name = item?.dep_name || "";
          const id = item?.dep_id?.toString() || "";

          return { value: id, label: `(${id}) ${name}` };
        }),
      ];

      setOptionsDep(updatedOptionsDep);
    }
  }, [listPB]);

  const handleGetPhongBan = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/department/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      const data = await res.json();
      setlistPB(data?.data?.items);
    } catch (error) { }
  };

  useEffect(() => {
    handleGetPhongBan();
  }, []);

  const handleOK = () => {
    setSelectedItems(undefined);
    setSelectedItemsPB(undefined);
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
      resetSharingOption()
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalCancel(false);
    setSelectedItems(undefined);
    setSelectedItemsPB(undefined);
    resetSharingOption()
  }
  const resetSharingOption = () => {
    setValueSharing("");
  };
  return (
    <>
      <Modal
        title={"Chia sẻ khách hàng"}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => handleCancel()}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Chia sẻ với"}
            </label>
            <select
              onChange={(e) => {
                setValueSharing(e.target.value),
                  setSelectedItems(undefined),
                  setSelectedItemsPB(undefined)
              }}
              className={styleCustomer.input_control}
            >
              <option value="" >Chọn đối tượng chia sẻ</option>
              <option value={"staff"}>Nhân viên</option>
              <option value="department">Phòng ban</option>
              <option value="all">Phòng ban & Nhân viên</option>
            </select>
          </div>

          {valueSharing === "department" ? (
            <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
              <label className={`${styles.form_label} required`}>
                {"Phòng ban được chia sẻ"}
              </label>
              <Select
                mode="multiple"
                allowClear
                showSearch
                placeholder="Phòng ban được chia sẻ"
                value={selectedItemsPB}
                onChange={(value) => {
                  if (value) {
                    setSelectedItemsPB(value);
                  } else {
                    setSelectedItemsPB(undefined);
                  }
                }}
                style={{ width: "100%" }}
                options={optionsDep}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
            </div>
          ) : valueSharing === "staff" ? (
            <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
              <label className={`${styles.form_label} required`}>
                {"Nhân viên được chia sẻ"}
              </label>
              <Select
                mode="multiple"
                allowClear
                showSearch
                placeholder="Nhân viên được chia sẻ"
                value={selectedItems}
                onChange={(value) => {
                  if (value) {
                    setSelectedItems(value);
                  } else {
                    setSelectedItems(undefined);
                  }
                }}
                style={{ width: "100%" }}
                options={options}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
            </div>
          ) : valueSharing === "all" ? (
            <>
              <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
                <label className={`${styles.form_label} required`}>
                  {"Phòng ban được chia sẻ"}
                </label>
                <Select
                  mode="multiple"
                  allowClear
                  showSearch
                  placeholder="Phòng ban được chia sẻ"
                  value={selectedItemsPB}
                  onChange={(value) => {
                    if (value) {
                      setSelectedItemsPB(value);
                    } else {
                      setSelectedItemsPB(undefined);
                    }
                  }}
                  style={{ width: "100%" }}
                  options={optionsDep}
                  filterOption={(input, option) =>
                    option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                />
              </div>
              <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
                <label className={`${styles.form_label} required`}>
                  {"Nhân viên được chia sẻ"}
                </label>
                <Select
                  mode="multiple"
                  allowClear
                  showSearch
                  placeholder="Nhân viên được chia sẻ"
                  value={selectedItems}
                  onChange={(value) => {
                    if (value) {
                      setSelectedItems(value);
                    } else {
                      setSelectedItems(undefined);
                    }
                  }}
                  style={{ width: "100%" }}
                  options={options}
                  filterOption={(input, option) =>
                    option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                />
              </div>
            </>
          ) : null}

          <div style={{ marginTop: "10px" }} className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Quyền sử dụng"}
            </label>
            <select className={styleCustomer.input_control}>
              <option>Toàn quyền</option>
              <option>Sửa</option>
              <option value="2">Xem</option>
            </select>
          </div>

          <div
            style={{ marginTop: "10px" }}
            className={`${styles.mb_3} ${styles["col-lg-12"]}`}
          >
            <input type="checkbox" id="" name="share_all" defaultValue={1} />
            <div>
              Với danh sách liên quan (đơn hàng, báo giá, lịch hẹn, ...).
            </div>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Bàn giao công việc cho Nguyễn Văn Nam thành công!"}
        link={"/customer/list"}
      />
    </>
  );
};

export default SharingCustomerModal;
