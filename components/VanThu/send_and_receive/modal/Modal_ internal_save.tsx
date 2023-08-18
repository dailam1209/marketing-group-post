import React, { useState, useEffect } from "react";
import styles from "./Modal_internal.module.css";
import Image from "next/image";
import Input_select from "@/components/VanThu/components/Input/Input_select/Input_select";
import { fetchData, handleCreate } from "@/utils/BaseApi";
import { fetchDataSoVB } from "@/utils/ShareApi";
import { getCookie } from "cookies-next";
import Select from "react-select";

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  so_vb?: any;
  _id?: any;
};
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;

const Modal_internal_save: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  so_vb,
  _id,
}) => {
  const [id, setid] = useState(_id);
  interface Data {
    message: any;
    result: any;
  }
  const [dataSovb, setdataSovb] = useState<Data | null>(null);
  const [ItemDetail, setItemDetail] = useState<any | null>(null);
  const [Num_vb, setNum_vb] = useState(so_vb);
  const [valueSo_vb, setValueSo_vb] = useState("");

  useEffect(() => {
    const fetchGetData = async () => {
      if (token) {
        try {
          const response = await fetchDataSoVB();
          setdataSovb(response?.data);
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      }
    };
    fetchGetData();
  }, []);

  useEffect(() => {
    const fetchGetData = async () => {
      if (token) {
        try {
          const response = await fetchData(
            token,
            "/api/vanthu/guiNhanCongVan/vanBanDi/getDetailVanBan",
            { id_vb: id }
          );
          setItemDetail(response?.data);
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      }
    };
    fetchGetData();
  }, [id]);

  const so_vb_options = dataSovb?.message?.listSoVanBan?.map((opt: any) => {
    return { value: opt._id, label: opt?.name_book };
  });
  const handleMultiSelectChange = (selectedOptions: any) => {
    setSelectedOption(selectedOptions);
  };
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const handleSaveItem = async () => {
    if (selectedOption?.label === "" || Num_vb === "") {
      alert("vui lòng nhập đầy đủ thông tin!");
    } else {
      onClose();
      try {
        if (ItemDetail?.vanBan?.check_qlcv) {
          alert("Văn bản đã được lưu trước đó");
        } else {
          const api = "/api/vanthu/guiNhanCongVan/vanBanDi/luuVBCTY";
          await handleCreate(api, {
            id_vb: id,
            book_vb: selectedOption?.value,
            so_vb: Num_vb,
          });
        }
        setSelectedOption(null);
      } catch (error) {
        alert("Đã xảy ra lỗi khi lưu sổ văn bản:");
      }
    }
  };

  if (isOpen === false) return <></>;
  return (
    <div className={styles.wrapper_modal}>
      <div className={styles.modal}>
        <div className={styles.modal_title}>
          <p className={styles.title}>Lưu nội bộ công ty</p>
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
            <label className={styles.label_name}>
              Sổ văn bản
              <span style={{ color: "red" }}> *</span>
            </label>
            {/* <Input_select
              options={so_vb_options}
              value={valueSo_vb}
              placeholder={"Chọn sổ văn bản"}
              className="form_input_select_modal2"
              onChange={(e: any) => {
                setValueSo_vb(e.value);
              }}
            /> */}
            <Select
              value={selectedOption}
              onChange={handleMultiSelectChange}
              options={so_vb_options}
              placeholder=" Nhập sổ văn bản"
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.label_name}>
              Số văn bản
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className={styles.input_form}
              value={Num_vb}
              onChange={(e: any) => {
                setNum_vb(e.target.value);
              }}
            />
          </div>
          <div className={styles.btn_process}>
            <p className={styles.btn_close} onClick={onClose}>
              Đóng
            </p>
            <p className={styles.btn_save} onClick={handleSaveItem}>
              Lưu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal_internal_save;
