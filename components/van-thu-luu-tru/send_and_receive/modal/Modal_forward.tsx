import React, { useState, useEffect } from "react";
import styles from "./Modal_forward.module.css";
import Image from "next/image";
import Input_select from "@/components/van-thu-luu-tru/components/Input/Input_select/Input_select";
import {
  fetch_ds_position,
  fetch_emp_by_id,
  fetch_list_department,
  fetch_position,
} from "@/utils/ShareApi";
import Select from "react-select";
import { handleCreate } from "@/utils/BaseApi";

export const FormModalGroupSelectRequier = ({
  nameInput,
  placeholder,
  value,
  ds_phongban,
}: any) => {
  return (
    <div className={styles.form_group} style={{ marginTop: "20px" }}>
      <label className={styles.label_name}>
        {nameInput}
        <span style={{ color: "red" }}> *</span>
      </label>
      <Input_select
        options={ds_phongban}
        value={value}
        placeholder={placeholder}
        className="form_input_select_modal2"
      />
    </div>
  );
};
type ModalProps = {
  isOpen?: boolean;
  ds_phongban?: any;
  _id: any;
  onClose: () => void;
};
const Modal_forward: React.FC<ModalProps> = ({ isOpen, onClose, _id }) => {
  //  Danh sách phòng ban
  const [department, setDepartment] = useState([]);
  useEffect(() => {
    const fetchGetData = async () => {
      const response = await fetch_list_department();
      setDepartment(response?.data?.items);
    };
    fetchGetData();
  }, []);

  const ds_dep_options = department?.map((opt: any) => {
    return { value: opt?.dep_id, label: opt?.dep_name, com_id: opt?.com_id };
  });
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };
  // Danh sách chức vụ
  // const [PositionEmp, setPositionEmp] = useState();
  // useEffect(() => {
  //   const fetchGetData = async () => {
  //     const response = await fetch_ds_position();
  //     setPositionEmp(response?.data);
  //   };
  //   fetchGetData();
  // }, []);
  const [selectPosition, setselectPosition] = useState<any>(null);
  const handleSelectPosition = (selectedOption: any) => {
    setselectPosition(selectedOption);
  };
  // Danh sách nhân viên có trong phòng ban
  const [listEmp, setlistEmp] = useState([]);
  useEffect(() => {
    if (selectedOption) {
      const dep_id = selectedOption.value;
      const com_id = selectedOption.com_id;
      const fetchGetData = async () => {
        const response = await fetch_emp_by_id(com_id, dep_id);
        setlistEmp(response?.data?.items);
        console.log(response)
      };
      fetchGetData();
    }
  }, [selectedOption]);

  const ds_employs = listEmp?.map((opt: any) => {
    return { value: opt?._id, label: opt?.ep_name, com_id: opt?.com_id };
  });
  const [selectEmp, setselectEmp] = useState<any>(null);
  const handleSelectEmp = (selectedOption: any) => {
    setselectEmp(selectedOption);
  };
  const [errorMessage, setErrorMessage] = useState("");

  const handleForward = async () => {
    if (!selectEmp || !selectedOption || !selectPosition) {
      setErrorMessage("Please fill in all fields.");
      return;
    } else {
      setErrorMessage("");
    }
    try {
      const api = "api/vanthu/guiNhanCongVan/vanBanDi/createChuyenTiep";
      await handleCreate(api, { id_vb: 3131, ten_nguoi_nhan: selectEmp.value });
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi ý kiến:", error);
    }
    onClose();
  };
  if (isOpen === false) return <></>;
  return (
    <div className={styles.wrapper_modal}>
      <div className={styles.modal}>
        <div className={styles.modal_title}>
          <p className={styles.title}>Chuyển tiếp</p>
          <div className={styles.close_modal}>
            <Image
              src={"/icon/X-trang.png"}
              width={38}
              height={38}
              alt=""
              onClick={onClose}
            />
          </div>
        </div>
        <div className={styles.modal_body}>
          <div className={styles.form_group} style={{ marginTop: "20px" }}>
            <div style={{ margin: "10px 0" }}>
              Chọn phòng ban
              <span style={{ color: "red" }}> *</span>
            </div>
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              options={ds_dep_options}
              placeholder="Chọn phòng ban"
              styles={{
                control: (provided: any) => ({
                  ...provided,
                  height: "20px",
                  borderRadius: "5px",
                }),
              }}
            />
          </div>
          <div className={styles.form_group} style={{ marginTop: "20px" }}>
            <div style={{ margin: "10px 0" }}>
              Chức vụ
              <span style={{ color: "red" }}> *</span>
            </div>
            <Select
              value={selectPosition}
              onChange={handleSelectPosition}
              options={fetch_position("")}
              placeholder="Chọn chức vụ người ký văn bản"
              styles={{
                control: (provided: any) => ({
                  ...provided,
                  height: "20px",
                  borderRadius: "5px",
                }),
              }}
            />
          </div>
          <div className={styles.form_group} style={{ marginTop: "20px" }}>
            <div style={{ margin: "10px 0" }}>Người nhận</div>
            <Select
              value={selectEmp}
              onChange={handleSelectEmp}
              options={ds_employs}
              placeholder="Chọn người nhận"
              styles={{
                control: (provided: any) => ({
                  ...provided,
                  height: "20px",
                  borderRadius: "5px",
                }),
              }}
            />
          </div>
          {errorMessage && (
            <p
              style={{
                color: "red",
                margin: "10px",
                fontSize: "14px",
              }}
            >
              {errorMessage}
            </p>
          )}
          <div className={styles.btn_process} onClick={handleForward}>
            <p className={styles.btn_name}>Gửi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal_forward;
