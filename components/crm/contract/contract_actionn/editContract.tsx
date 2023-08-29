import { useEffect, useRef, useState } from "react";
import styles from "../contract_action.module.css";
import Image from "next/image";
import { setInterval } from "timers/promises";
import { useRouter } from "next/router";
import ModalDelete from "@/components/crm/delete_data/modal/modal_delete";
import ModalCancel from "./mdal_cancel";
import { Button, Modal, Result } from "antd";
import CreatFieldModal from "./creat_field_mdal";
import CreatFieldDefaultModal from "./creat_field_default";
import Cookies from "js-cookie";

export default function AddContract({ setCheckFile }: any) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileUpload, setFileUpload] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [imageData, setImageData] = useState<any>();
  const [text_change, settext_change] = useState<any>("");
  const [imgUrls, setImgaUrls] = useState([]);
  const initialCheckStates = Array(5).fill(false);
  const [newValues, setNewValues] = useState<
    { index: number[]; originalValue: string; newValue: string }[]
  >([]);
  const [checkedStates, setCheckedStates] =
    useState<boolean[]>(initialCheckStates);
  const handleCheckboxChange = (index: number) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
  };
  const handleClickSelectFileUpdload = () => {
    inputFileRef.current?.click();
  };

  const handleDelEditField = () => {
    confirm("Bạn có chắc chắn muốn xóa trường này ???");
  };

  const handleEditField = () => {
    scrollToTarget();
  };

  const scrollToTarget = () => {
    const targetElement = document.getElementById("setting");

    console.log(targetElement);
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const onClose = () => {
    setIsShowModal(false);
  };
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.size <= 20 * 1024 * 1024) {
      //   const files = event.target.files;
      setCheckFile(true);
      setFileUpload((prevFiles: any) => [...prevFiles, file.name]);
    } else {
      alert("Error !");
    }
  };
  const handleshow = () => {
    setShow(false);
  };
  const handleClose = () => {
    setTimeout(() => {
      // console.log("first")
      setShow(false);
    }, 100);
  };
  useEffect(() => {
    handleshow();
    handleClose();
  }, [show]);
  const router = useRouter();

  const handleUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        // const token =
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJpZFRpbVZpZWMzNjUiOjIwMjU4NSwiaWRRTEMiOjE3NjMsImlkUmFvTmhhbmgzNjUiOjAsImVtYWlsIjoiZHVvbmdoaWVwaXQxQGdtYWlsLmNvbSIsInBob25lVEsiOiIiLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInR5cGUiOjEsImNvbV9pZCI6MTc2MywidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyJ9LCJpYXQiOjE2OTMyMDU5OTAsImV4cCI6MTY5MzI5MjM5MH0.l6s16l52GHaar18sLqQqLEh3_AMvst7NCWshUxJO0kQ"; 

        const res = await fetch(
          "https://api.timviec365.vn/api/crm/contractAI/read_file",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${Cookies.get("token_base365")}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          console.log("checkresfile", data);
          setImageData(data?.data?.result?.image);
        } else {
          throw new Error("Request failed with status: " + res.status);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  const targetScrollRef = useRef<HTMLDivElement>(null);
  const [isCreatField, setIsCreatField] = useState(false);
  const [isCreatFieldDefault, setIsCreatFieldDefault] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateFieldBtn = () => {
    handleShowModal();
  };

  const handleShowModal = () => {
    const selectedIndices = checkedStates.reduce(
      (indices, isChecked, index) =>
        isChecked ? [...indices, index] : indices,
      []
    );

    if (selectedIndices.length === 0) {
      alert("Vui lòng chọn ít nhất một checkbox.");
    } else {
      // Mở modal hiển thị vị trí các checkbox được chọn
      setModalVisible(true);
      setIsCreatField(true);
    }
  };

  function checkValuesExist(arrA, arrB) {
    for (const valueA of arrA) {
      for (const itemB of arrB) {
        if (itemB.index.includes(valueA)) {
          return true;
        }
      }
    }
    return false;
  }

  const checkWords = (arr, text) => {
    for (const valueA of arr) {
      if (valueA.originalValue === text) {
        return true;
      }
    }
    return false;
  };
  

  const handleReplaceValues = (newValue: string, pos: number) => {
    const indexSelect = checkedStates
      .map((value, index) => (value ? index : null))
      .filter((index) => index !== null);
    console.log(indexSelect, newValues);
    const editedItem = checkValuesExist(indexSelect, newValues);
    const checkWord = checkWords(newValues, text_change);
    console.log(checkWord, text_change);
    if (!editedItem || !checkWord) {
      const updatedValues = [
        ...newValues,
        { index: indexSelect, originalValue: text_change, newValue },
      ];
      setNewValues(updatedValues);
      console.log(newValues);
    } else {
      alert(`Từ khóa đã được thiết lập, vui lòng kiểm tra lại`);
    }

    setCheckedStates(Array(initialCheckStates.length).fill(false));
  };

  const displayIndex = (item: any) => {
    return `Từ tìm kiếm: ${
      item?.originalValue
    }, tại các vị trí: ${item.index?.join(", ")}`;
  };


  return (
    <>
      <div className={styles.main__body}>
        <div id="drop-zone" className={`${styles["drop-zone"]} ${styles.row}`}>
          <div className={styles.col_md_6}>
            <div className={styles.title}>
              Tải lên hợp đồng <span className={styles.color_sup}>*</span>
            </div>
            <div>
              <label
                className={`${styles.form_control} ${styles.upload_contract} ${styles.upload_text}`}
                onClick={handleClickSelectFileUpdload}
              >
                Chọn hợp đồng từ máy tính của bạn
                <img src="/crm/taihopdong.svg" alt="upload" />
                <input
                  type="file"
                  className={styles.upload}
                  name="file"
                  multiple
                  // ref={inputFileRef}
                  onChange={(event) => handleUpload(event)}
                />
              </label>
            </div>
          </div>
          <div className={styles.col_md_6}>
            <div className={styles.title}>
              Tìm kiếm thông tin cần thay đổi trong hợp đồng
            </div>
            <div className={styles.divSearch}>
              <input
                className={`${styles.form_control} ${styles.upload_contract} ${styles.upload_text}`}
                onClick={handleClickSelectFileUpdload}
                placeholder="Nhập nội dung cần thay đổi"
              />
              <button className={styles.search}>Tìm kiếm</button>
            </div>
          </div>
        </div>

        <div
          ref={targetScrollRef}
          id="setting"
          className={styles.col_md_6}
          style={{ width: "100%" }}
        >
          <div className={styles.fm_fd}>
            <label className={styles.label_thietlap}>
              Thiết lập thông tin cần thay đổi trong hợp đồng
            </label>

            <div className={styles.param}>
              {checkedStates.map((isChecked, index) => (
                <div key={index} style={{ marginRight: "5px" }}>
                  <label>
                    <input
                      style={{ marginLeft: "3px" }}
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    Chấm công {index + 1}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.btn_form_contract}>
            {/* <button type="button" className="xoatruong hidden">
                    <img src="/assets/img/xoatruong.svg" alt="button" /> Xóa
                    Trường
                  </button>
                  <button type="button" className="suatruong l-15 hidden">
                    <img src="/assets/img/suatruong.svg" alt="button" /> Sửa
                    trường
                  </button> */}
            <button
              type="button"
              onClick={() => handleCreateFieldBtn()}
              data-toggle="modal"
              data-target="#modalCreate"
              className={styles.taotruong}
            >
              <img src="/crm/plus_icon_field.svg" alt="button" /> Tạo trường
            </button>
            <button
              type="button"
              onClick={() => setIsCreatFieldDefault(true)}
              className={styles.tieptuc}
            >
              Chỉnh sửa bằng trường mặc định
            </button>
            {/* <button
                    type="button"
                    // onclick="prev()"
                    className="quaylai l-15 hidden"
                  >
                    <img src="/assets/img/quaylai.svg" alt="button" /> Quay lại
                  </button>
                  <button
                    type="button"
                    // onclick="next()"
                    className="tieptuc l-15 hidden"
                  >
                    Tiếp tục <img src="/assets/img/tieptuc.svg" alt="button" />
                  </button> */}
            <CreatFieldModal
              isModalCancel={isCreatField}
              setIsModalCancel={setIsCreatField}
              handleReplaceValues={handleReplaceValues}
            />
            <CreatFieldDefaultModal
              isModalCancel={isCreatFieldDefault}
              setIsModalCancel={setIsCreatFieldDefault}
              handleReplaceValues={handleReplaceValues}
            />
            <ModalCancel isShowModal={isShowModal} onClose={onClose} />
          </div>
        </div>
      </div>

      {imageData && imageData?.length > 0 && (
        <div>
          <div>
            <div className={styles.head_contract}>
              <h4>Thông tin hợp đồng</h4>
            </div>
          </div>
          <div className={styles["frm-2"]}>
            {imageData?.map((url, index: number) => (
              <img alt="hd" src={`${url}`} key={index} />
            ))}
          </div>
        </div>
      )}

      <Modal
        width={500}
        open={openSuccess}
        centered
        closable={true}
        footer={[
          <div
            key={"1"}
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              key={"2"}
              style={{
                width: "100%",
                height: 36,
                background: "#4C5BD4",
                fontSize: 16,
                fontWeight: 1000,
              }}
              type="primary"
              onClick={() => setOpenSuccess(false)}
            >
              Đóng
            </Button>
            ,
          </div>,
        ]}
      >
        <Result status="success" title={<div>Chỉnh sửa thành công</div>} />
      </Modal>
      <div className={styles.field_config}>
        <div className={styles.footer_contract}>
          <h4>Các trường đã thiết lập</h4>
        </div>
        <div
          className={`${styles["frm-3"]} ${styles["fm-bd"]} ${styles["fm_bt"]} ${styles["fm-fd"]} ${styles.opacity}`}
          id="field_config_1"
        >
          <div className={styles["error-name"]}>
            <label className={styles.field_new}>quyt</label>
            <div className={styles.function}>
              <button
                className={styles.h_edit_cus}
                onClick={handleEditField}
                disabled={scrolling}
              >
                <img src="/crm/blue_edit_cus.svg" alt="sửa" /> Sửa |
              </button>
              <button
                onClick={handleDelEditField}
                className={styles.h_delete_cus}
              >
                <img src="/crm/red_delete_cus.svg" alt="Xóa" /> Xóa
              </button>
            </div>
          </div>
          <input
            type="text"
            className={`${styles["form-control"]} ${styles.text}`}
            value="Từ tìm kiếm: cam, tại các vị trí: 1,6"
            readOnly
            placeholder="Nhập nội dung"
          />
        </div>
      </div>
      <div className={styles.btn_submit}>
        <button
          style={{ borderRadius: 10 }}
          onClick={() => setIsShowModal(true)}
          className={styles.sub1}
        >
          Hủy
        </button>
        <button
          style={{ borderRadius: 10 }}
          onClick={() => setOpenSuccess(true)}
          className={styles.sub2}
        >
          Lưu
        </button>
      </div>
    </>
  );
}
