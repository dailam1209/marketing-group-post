import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import styles from "./setting.module.css";
import ModalCompleteStep from "./complete_modal";
import Cookies from "js-cookie";
import { base_url } from "../service/function";
import { Select } from "antd";

interface MyComponentProps {
  isModalCancel?: boolean;
  setIsModalCancel?: (value: boolean) => void;
  fetchData?: any;
}

const ShareActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  fetchData,
}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [label, setLabel] = useState("");
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [dep_id, setDep_id] = useState<any>();
  const [selectedItems1, setselectedItems1] = useState<string | undefined>(
    undefined
  );
  const [selectedItems2, setselectedItems2] = useState<string | undefined>(
    undefined
  );

  console.log(typeof selectedItems1, typeof selectedItems2);

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [optionSend, setOptionSend] = useState<
    { value: string; label: string }[]
  >([]);
  const [listNV, setListNV] = useState<any>();

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
    if (selectedItems1 === selectedItems2) {
      alert("Nhân viên bàn giao không có khách hàng nào.");
      return;
    }

    const dataToSend = {
      emp_id: selectedItems1.toString(),
      user_handing_over_work: selectedItems2.toString(),
    };

    try {
      const apiResponse = await sendAPIRequest(dataToSend);
      setIsModalCancel(false);
      setIsOpenMdalSuccess(true);

      setTimeout(() => {
        setIsOpenMdalSuccess(false);
      }, 2000);
      fetchData();
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const handleCancel = () => {
    setselectedItems1("");
    setselectedItems2("");
    setIsModalCancel(false);
  };

  const handleAddElement = (condition: string) => {
    const newElement = <div className={styles.content_obj} key={label}></div>;
    if (label === condition) {
      setElements((prevElements) => [...prevElements, newElement]);
    } else {
      setElements([newElement]);
    }
  };

  const handleGetInfoCus = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/listAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );
      const data = await res.json();
      if (data && data?.data) setListNV(data?.data?.items);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetInfoCus();
  }, [dep_id]);

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

  useEffect(() => {
    if (Array.isArray(listNV)) {
      const updatedOptions = [
        { value: "", label: "Chọn người nhận công việc" },
        ...listNV.map((item) => {
          const name = item?.ep_name || "";
          const id = item?.ep_id?.toString() || "";

          return { value: id, label: `(${id}) ${name}` };
        }),
      ];

      setOptionSend(updatedOptions);
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
        className={"mdal_cancel email_add_mdal bangiao"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Chọn người bàn giao"}
            </label>

            <Select
              showSearch
              placeholder="Chọn người bàn giao"
              value={selectedItems1}
              onChange={(value) => setselectedItems1(value)}
              style={{ width: "100%" }}
              options={options}
              filterOption={(input, option) =>
                option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
            <span className={styles.error}>Bạn chưa chọn người bàn giao</span>
          </div>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Chọn người nhận công việc"}
            </label>

            <Select
              showSearch
              placeholder="Chọn người nhận công việc"
              value={selectedItems2}
              onChange={(value) => setselectedItems2(value)}
              style={{ width: "100%" }}
              options={optionSend}
              filterOption={(input, option) =>
                option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
            <span className={`${styles.error}`}>
              Bạn chưa chọn người nhận công việc
            </span>
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
        title={"Bàn giao công việc thành công!"}
        link={"/setting/main"}
      />
    </>
  );
};

export default ShareActionModal;
