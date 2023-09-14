import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import styles from "../../potential/potential.module.css";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal_bangiao";
import { Select } from "antd";
import { base_url } from "@/components/crm/service/function";
const Cookies = require("js-cookie");

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  listNV: any;
  handover: any;
  fetchData: any;
}

const HandeOverModalCustomer: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  listNV,
  handover,
  fetchData,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);

  const sendAPIRequest = (dataToSend) => {
    const apiUrl = `${base_url}/api/crm/customerdetails/bangiao`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify(dataToSend),
    };

    return fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      });
  };

  const handleOK = async () => {
    if (!selectedItems) {
      return;
    }

    const cus_id = handover?.map((item) => item.cus_id) || [];
    cus_id.forEach((id) => {
      console.log(id);
    });

    const emp_id = handover?.map((item) => item.emp_id) || [];
    emp_id.forEach((id) => {
      console.log(id);
    });
    const dataToSend = {
      user_handing_over_work: selectedItems,
      cus_id: cus_id,
      emp_id: emp_id,
    };

    try {
      const apiResponse = await sendAPIRequest(dataToSend);
      console.log("API response:", apiResponse);
      setIsModalCancel(false);
      setIsOpenMdalSuccess(true);

      // setTimeout(() => {
      //   setIsOpenMdalSuccess(false);
      // }, 2000);
      fetchData();
    } catch (error) {
      console.error("API error:", error);
    }
  };
  const handleCancel = () => {
    setSelectedItems(undefined);
    setIsModalCancel(false);
  };

  const [selectedItems, setSelectedItems] = useState<
    { ep_id: string; ep_name: string } | undefined
  >(undefined);

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const name = selectedItems?.ep_name;
  useEffect(() => {
    if (Array.isArray(listNV)) {
      const updatedOptions = [
        { value: "", label: "Chọn người bàn giao" },
        ...listNV.map((item) => {
          const name = item?.ep_name || "";
          const id = item?.ep_id?.toString() || "";

          return { value: id, label: `(${id}) ${name}` };
        }),
      ];

      setOptions(updatedOptions);
    }
  }, [listNV]);

  return (
    <>
      <Modal
        title={"Bàn giao công việc"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => handleCancel()}
        className={"mdal_cancel email_add_mdal "}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Người nhận công việc"}
            </label>

            <Select
              showSearch
              placeholder="Chọn người nhận công việc"
              value={selectedItems?.ep_id}
              onChange={(value) => {
                const selectedOption = options.find(
                  (option) => option.value === value
                );
                if (selectedOption) {
                  setSelectedItems({
                    ep_id: selectedOption.value,
                    ep_name: selectedOption.label,
                  });
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
          <div
            style={{ marginTop: "10px" }}
            className={`${styles.mb_3} ${styles["col-lg-12"]}`}
          >
            <div>
              Chức năng này sẽ chuyển toàn bộ đối tượng (Tiềm năng, Khách hàng,
              Liên hệ) và toàn bộ công việc dở dang (Cơ hội, Báo giá, Đơn hàng,
              Hóa đơn, Trả lại hàng bán, Lịch hẹn, Lịch chăm sóc) của người bàn
              giao sang cho người được bàn giao.
            </div>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={name}
        link={"customer/list"}
      />
    </>
  );
};

export default HandeOverModalCustomer;
