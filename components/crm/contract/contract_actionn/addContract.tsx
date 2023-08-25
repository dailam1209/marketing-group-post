import React, { useEffect, useRef, useState } from "react";
import styles from "../contract_action.module.css";
import Image from "next/image";
import { useApi } from "@/components/crm/hooks/useApi";
import AddContractrModal from "../modal_add_contract";
import CancelModal from "../../price_policy/price_policy_steps/cancel_modal";
import ModalCompleteStep from "../../price_policy/price_policy_steps/complete_modal";
import axios from "axios";
import { index, json } from "d3";
import CreatFieldModal from "./creat_field_mdal";
import CreatFieldDefaultModal from "./creat_field_default";
import ContractValueInputSearch from "./contract_value_input_search";
import { imageBase64 } from "./imgBase64";
import { setTextRange } from "typescript";
import { base_url } from "../../service/function";
import { el } from "date-fns/locale";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  fetchData: any;
}
interface TableAddContractProps {
  setCheckFile;
}

const TableAddContract: React.FC<TableAddContractProps> = ({}: any) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [fileUpload, setFileUpload] = useState<any[]>([]);
  const [file, setfile] = useState<any>("");
  const [path_dowload, setpath_dowload] = useState<any>("");
  const [text_change, settext_change] = useState<any>("");
  const [imgUrls, setImgaUrls] = useState([]);
  const [ismodal1Open, setIsmodal1Open] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [imageData, setImageData] = useState<any>();
  const [inputSearch, setInputSearch] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const initialCheckStates = Array(5).fill(false); // Thay số 5 bằng số lượng checkbox tùy theo tình huống
  const [checkedStates, setCheckedStates] =
    useState<boolean[]>(initialCheckStates);
  const [modalVisible, setModalVisible] = useState(false);
  const [newValues, setNewValues] = useState<
    { index: number[]; originalValue: string; newValue: string }[]
  >([]); // Set value moi, value cu va index
  const targetScrollRef = useRef<HTMLDivElement>(null);

  const axios = require("axios");
  // const fs = require("fs");
  const FormData = require("form-data");
  const handleClickSelectFileUpdload = () => {
    inputFileRef.current?.click();
  };

  const Cookies = require("js-cookie");

  const [formData, setFormData] = useState<any>({
    _id: "",
    name: "",
    pathFile: "",
    com_id: "",
    ep_id: "",
    id_file: "",
    created_at: "",
    user_created: "",
    id_customer: "",
    update_at: "",
    status: "",
    is_delete: "",
    new_field: "",
    old_field: "",
    index_field: "",
    default_field: "",
    path_dowload: "",
    id_form_contract: "",
  });

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

  const handleEditField = () => {
    scrollToTarget();
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${base_url}/api/crm/contractforcus/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({
          _id: formData._id,
          name: formData.name,
          pathFile: formData.pathFile,
          com_id: formData.com_id,
          ep_id: formData.ep_id,
          id_file: formData.id_file,
          created_at: formData.created_at,
          user_created: formData.user_created,
          id_customer: formData.id_customer,
          update_at: formData.update_at,
          status: formData.status,
          is_delete: formData.is_delete,
          new_field: formData.new_field,
          old_field: formData.old_field,
          index_field: formData.index_field,
          default_field: formData.default_field,
          path_dowload: formData.path_download,
          id_form_contract: formData.id_form_contract,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log("Data successfully submitted!");
      } else {
        console.error("Error submitting data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const response = await axios.get(
      "https://work247.vn/api_crm/read_file.php"
    );
    let data = new FormData();
    data.append("file", file);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://work247.vn/api_crm/read_file.php",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response: { data: any }) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  //   var formdata = new FormData();
  //   var fileInput = document.getElementById("fileInput") as HTMLInputElement;

  //   if (fileInput.files && fileInput.files.length > 0) {
  //     formdata.append("file", fileInput.files[0], "[PROXY]");

  //     var requestOptions: RequestInit  = {
  //       method: "POST",
  //       body: formdata,
  //       mode: "no-cors",
  //       redirect: "follow", // Đảm bảo giá trị 'redirect' ở đây là 'follow' hoặc 'manual'
  //     };

  //     fetch("https://work247.vn/api_crm/read_file.php", requestOptions)
  //       .then((response) => response.text())
  //       .then((result) => console.log(result))
  //       .catch((error) => console.log("error", error));
  //   } else {
  //     console.log("No file selected.");
  //   }
  // };

  //  TÌM KIẾM

  const handleFind = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // const text_change = event.target.value;
    settext_change(inputSearch);
    event.preventDefault();

    if (inputSearch) {
      const formData = new FormData();
      formData.append("text_change", inputSearch);

      // try {
      //   const res = await fetch(
      //     `http://43.239.223.117:4000/search?sess_id=3312&input_file=${input_file}`,
      //     {
      //       method: "POST",
      //       body: formData,
      //       mode: "no-cors",
      //     }
      //   );

      //   const data = await res.json();
      //   console.log("checkresfile", data);
      // } catch (error) {
      //   console.error("Error:", error.message);
      // }

      // Mock Data:::
      const data = {
        data: {
          result: true,
          message: " \u1ea2nh tr\u1ea3 v\u1ec1 ",
          item: {
            sess_id: "1664_774985",
            number_text: 4,
            image: imageBase64,
          },
        },
        error: null,
      };
      setImgaUrls(data?.data?.item?.image);
    }
  };

  const handleShowModal = () => {
    const selectedIndices = checkedStates.reduce(
      (indices, isChecked, index) =>
        isChecked ? [...indices, index] : indices,
      []
    );

    if (selectedIndices.length === 0) {
      alert("Hãy chọn ít nhất 1 trường thông tin để thiết lập");
    } else {
      // Mở modal hiển thị vị trí các checkbox được chọn
      setModalVisible(true);
      setIsCreatField(true);
    }
  };

  const handleCreateFieldBtn = () => {
    handleShowModal();
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
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

  const handleDelEditField = () => {
    confirm("Bạn có chắc chắn muốn xóa trường này ???");
  };

  const ImageComponent = () => {
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      fetch("https://work247.vn/api_crm/read_file.php")
        .then((response) => response.json())
        .then((data) => {
          if (data.lists_image && Array.isArray(data.lists_image)) {
            setImageData(data.lists_image);
          }
        })
        .catch((error) => console.log(error));
    };
  };

  const displayIndex = (item: any) => {
    return `Từ tìm kiếm: ${
      item?.originalValue
    }, tại các vị trí: ${item.index?.join(", ")}`;
  };

  const [isCreatField, setIsCreatField] = useState(false);

  const [isCreatFieldDefault, setIsCreatFieldDefault] = useState(false);

  return (
    <>
      <div className={styles.main__body}>
        {fileUpload && fileUpload?.length > 0 ? (
          <>
            <div
              id="drop-zone"
              className={`${styles["drop-zone"]} ${styles.row}`}
            >
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
                    <img
                      src="/crm/taihopdong.svg"
                      alt="upload"
                      // onChange = {(event)=> handleUpload(event)}
                      // onChange={() =>
                      //   fetchData(
                      //     "http://43.239.223.117:4000/upload_file",
                      // acessToken
                      //     "POST",
                      //     { file: `${file}` }
                      //   )
                      // }
                    />
                    <input
                      type="file"
                      className={styles.upload}
                      name="file"
                      multiple
                      // ref={inputFileRef}
                      onChange={(event) => handleUpload(event)}
                      // value={path_dowload}
                      // onChange={(e: {
                      //   target: { value: React.SetStateAction<string> };
                      // }) => setpath_dowload(e.target.value)}
                    />
                  </label>
                </div>
                <div className={styles.loading}>
                  {imageData.map((image: string, index: React.Key) => (
                    <img
                      key={index}
                      src={image} // Assume each item in imageData is a URL to an image
                      alt={`Image ${index}`}
                      style={{ width: "200px", height: "auto", margin: "10px" }}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.col_md_6}>
                <div className={styles.title}>
                  Tìm kiếm thông tin cần thay đổi trong hợp đồng
                </div>
                <div className={styles.divSearch}>
                  <input
                    className={`${styles.form_control} ${styles.upload_contract} ${styles.upload_text}`}
                    // onChange={()=>{console.log("...")}}
                    // onSubmit={(e:any) => handleFind(e)}
                    placeholder="Nhập nội dung cần thay đổi"
                  />
                  {/* <button
                    className={styles.search}
                    onChange={() =>
                      fetchData(
                        "http://43.239.223.117:4000/search",
                        accessToken,
                        "POST",
                        { text_change: `${text_change}` }
                      )
                    }
                  >
                    Tìm kiếm
                  </button> */}
                </div>
              </div>
            </div>
            <div ref={targetScrollRef}>
              <label className={styles.label_thietlap} id="setting">
                Thiết lập thông tin cần thay đổi trong hợp đồng
              </label>

              <div className={styles.param}>
                <div className="height:fit-content">
                  <input
                    type="checkbox"
                    className="check_box"
                    id="check_box1"
                    value="1"
                  />
                  <label
                    htmlFor="check_box1"
                    className="text_change"
                    data-index="1"
                  >
                    chấm công (1)
                  </label>
                </div>
                <div className="height:fit-content">
                  <input
                    type="checkbox"
                    className="check_box"
                    id="check_box2"
                    value="2"
                  />
                  <label
                    htmlFor="check_box2"
                    className="text_change"
                    data-index="2"
                  >
                    chấm công (2)
                  </label>
                </div>
                <div className="height:fit-content">
                  <input
                    type="checkbox"
                    className="check_box"
                    id="check_box3"
                    value="3"
                  />
                  <label
                    htmlFor="check_box3"
                    className="text_change"
                    data-index="3"
                  >
                    chấm công (3)
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.info_contract}>
              <div className={styles.title_contract}>
                <label className={styles.label_contract}>
                  Thông tin hợp đồng
                </label>
              </div>
              <div className={styles.content_contract}>
                <div className={styles.loading}>
                  {imageData.map((imageSrc, index) => (
                    <img
                      key={index}
                      src={imageSrc}
                      alt={`Image ${index}`}
                      className="img_contract"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.btn_submit}>
              <button type="button" onClick={() => setIsModalCancel(true)}>
                Hủy
              </button>
              <button
                className={styles.save}
                type="submit"
                onClick={() => (handleSubmit(), setIsmodal1Open(true))}
              >
                Lưu
              </button>
              <ModalCompleteStep
                modal1Open={ismodal1Open}
                setModal1Open={setIsmodal1Open}
                title="Thêm mới Hợp đồng thành công!"
              />
              <CancelModal
                isModalCancel={isModalCancel}
                setIsModalCancel={setIsModalCancel}
                content={
                  "Bạn có chắc chắn muốn hủy thêm mới hợp đồng, mọi thông tin bạn nhập sẽ không được lưu lại?"
                }
                title={"Xác nhận hủy thêm mới hợp đồng"}
              />
            </div>
          </>
        ) : (
          <>
            <div
              id="drop-zone"
              className={`${styles["drop-zone"]} ${styles.row}`}
            >
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
                    <img
                      src="/crm/taihopdong.svg"
                      alt="upload"

                      // onChange={() =>
                      //   fetchData(
                      //     "http://43.239.223.117:4000/upload_file",
                      //,
                      //     "POST",
                      //     { file: `${file}` }
                      //   )
                      // }
                    />
                    <input
                      type="file"
                      id="fileInput"
                      className={styles.upload}
                      name="file"
                      multiple
                      // ref={inputFileRef}
                      onChange={(event) => handleUpload(event)}
                      // value={path_dowload}
                      // onChange={(e: {
                      //   target: { value: React.SetStateAction<string> };
                      // }) => setpath_dowload(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className={styles.col_md_6}>
                <div className={styles.title}>
                  Tìm kiếm thông tin cần thay đổi trong hợp đồng
                </div>
                <form
                  onSubmit={(e: any) => handleFind(e)}
                  className={styles.divSearch}
                >
                  <input
                    className={`${styles.form_control} ${styles.upload_contract} ${styles.upload_text}`}
                    onChange={(event) => setInputSearch(event.target.value)}
                    placeholder="Nhập nội dung cần thay đổi"
                  />
                  {/* <button
                    className={styles.search}
                    onChange={() =>
                      fetchData(
                        "http://43.239.223.117:4000/search",
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyIsImFsaWFzIjoiY29uZy10eS10ZXN0LTEiLCJwaG9uZSI6IjA5NjUyMzQ2NjUiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOm51bGwsInR5cGUiOjEsInBhc3N3b3JkIjoiMDk4NTI1MWYzZDEzMDc2YmVlYzY5YWNhNzc4ZWEzMWYiLCJjaXR5IjoyLCJkaXN0cmljdCI6MjgyLCJhZGRyZXNzIjoia20gMTAgLSBUcuG6p24gUGjDuiAtIEjDoCDEkMO0bmcsIEhOIiwib3RwIjoiODA1MjM5IiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjoxLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInVwZGF0ZWRBdCI6MSwibGFzdEFjdGl2ZWRBdCI6bnVsbCwidGltZV9sb2dpbiI6MTY5MTQ2NDAxOSwicm9sZSI6MCwibGF0aXR1ZGUiOiIyMC45ODkwMzEzIiwibG9uZ3RpdHVkZSI6IjEwNS44MzEyNTg4IiwiaWRRTEMiOjE3NjMsImlkVGltVmllYzM2NSI6MjAyNTg1LCJpZFJhb05oYW5oMzY1IjowLCJjaGF0MzY1X3NlY3JldCI6IjJaMW5zNmtjVDUiLCJjaGF0MzY1X2lkIjowLCJzY2FuX2Jhc2UzNjUiOjAsImNoZWNrX2NoYXQiOjAsInNoYXJlUGVybWlzc2lvbklkIjpbXSwiaW5Gb3JQZXJzb24iOm51bGwsImluRm9yQ29tcGFueSI6eyJzY2FuIjowLCJ1c2Nfa2QiOjQxLCJ1c2Nfa2RfZmlyc3QiOjAsImRlc2NyaXB0aW9uIjoiZOG7i2NoIHbhu6UiLCJjb21fc2l6ZSI6MiwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik5ndXllbiBWYW4gQ3VvbmciLCJ1c2NfbmFtZV9hZGQiOiIxIFRy4bqnbiBOZ3V5w6puIMSQw6FuLCBLaHUgxJHDtCB0aOG7iyDEkOG7i25oIEPDtG5nLCBIb8OgbmcgTWFpLCBIw6AgTuG7mWkiLCJ1c2NfbmFtZV9waG9uZSI6IjA5NjUzMjQ2NzQiLCJ1c2NfbmFtZV9lbWFpbCI6InRoaWVucXVhbkBnbWFpbC5jb20iLCJ1c2NfdXBkYXRlX25ldyI6MTY5MDg4MTg4MCwidXNjX2Nhbm9uaWNhbCI6IiIsInVzY19tZDUiOiIiLCJ1c2NfcmVkaXJlY3QiOiIiLCJ1c2NfdHlwZSI6MCwidXNjX3NpemUiOjIsInVzY193ZWJzaXRlIjoidGltdmllYzM2NS52biIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjEsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4yMzEiLCJ1c2NfbG9jIjoxLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6InZpZGVvX2Nwbjg0NDE4NjE2NzM0MzMyNTkubXA0LHZpZGVvX2Nwbjg0NDE4NjE2NzM1Mjc0MDMubXA0LHZpZGVvX2Nwbl8wXzE2OTAzNjQyNDgubXA0IiwidXNjX3ZpZGVvX3R5cGUiOjIsInVzY192aWRlb19hY3RpdmUiOjAsInVzY19ibG9ja19hY2NvdW50IjowLCJ1c2Nfc3RvcF9ub3RpIjowLCJvdHBfdGltZV9leGlzdCI6MTY5MDk2NzMzMywidXNlX3Rlc3QiOjAsInVzY19iYWRnZSI6MSwidXNjX3N0YXIiOjEsInVzY192aXAiOjMsInVzY19tYW5hZ2VyIjoiIiwidXNjX2xpY2Vuc2UiOiIiLCJ1c2NfYWN0aXZlX2xpY2Vuc2UiOjAsInVzY19tYXAiOiI8aWZyYW1lIHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9lbWJlZD9wYj0hMW0xOCExbTEyITFtMyExZDU5NTg3Ljk0NTgzMTExOTgxITJkMTA1LjgwMTk0Mzk1NjIxMzgyITNkMjEuMDIyODE2MTM1NzMzMTM3ITJtMyExZjAhMmYwITNmMCEzbTIhMWkxMDI0ITJpNzY4ITRmMTMuMSEzbTMhMW0yITFzMHgzMTM1YWI5YmQ5ODYxY2ExJTNBMHhlNzg4N2Y3YjcyY2ExN2E5ITJ6U01PZ0lFN2h1NWxwTENCSWI4T2diaUJMYWVHNnYyMHNJRWpEb0NCTzRidVphU3dnVm1uaHU0ZDBJRTVoYlEhNWUwITNtMiExc3ZpITJzITR2MTYwMTM0NTI1NDk1MyE1bTIhMXN2aSEyc1wiIHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiMzAwXCIgZnJhbWVib3JkZXI9XCIwXCIgc3R5bGU9XCJib3JkZXI6MDtcIiBhbGxvd2Z1bGxzY3JlZW49XCJcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgdGFiaW5kZXg9XCIwXCI-PC9pZnJhbWU-IiwidXNjX2RnYyI6IlszLDAsMSwxLFwibGlrdWp5dHJcIl0iLCJ1c2NfZGd0diI6Ils1LDEsXCJ0ZXN0XCIsXCJ0ZXN0XCJdIiwidXNjX2RnX3RpbWUiOjE2OTA1MTQzNjMsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJk4buLY2ggduG7pSIsInVzY196YWxvIjpudWxsLCJ1c2NfY2MzNjUiOjAsInVzY19jcm0iOjAsInVzY19pbWFnZXMiOm51bGwsInVzY19hY3RpdmVfaW1nIjowLCJ1c2NfZm91bmRlZF90aW1lIjowLCJ1c2NfYnJhbmNoZXMiOltdfSwiY2RzIjp7ImNvbV9yb2xlX2lkIjowLCJjb21fcGFyZW50X2lkIjpudWxsLCJ0eXBlX3RpbWVrZWVwaW5nIjoiMSwyLDMsNCw1LDgsOSIsImlkX3dheV90aW1la2VlcGluZyI6IjEiLCJjb21fcXJfbG9nbyI6bnVsbCwiZW5hYmxlX3NjYW5fcXIiOjAsImNvbV92aXAiOjAsImNvbV9lcF92aXAiOjUsImNvbV92aXBfdGltZSI6MCwiZXBfY3JtIjowLCJlcF9zdHQiOjF9LCJfaWQiOiI2NGQxYjY1M2NlZDljMjdmNWI5NWI2YzQifSwiaW5mb3JSTjM2NSI6bnVsbCwiY29uZmlnQ2hhdCI6eyJub3RpZmljYXRpb25BY2NlcHRPZmZlciI6MSwibm90aWZpY2F0aW9uQWxsb2NhdGlvblJlY2FsbCI6MSwibm90aWZpY2F0aW9uQ2hhbmdlU2FsYXJ5IjoxLCJub3RpZmljYXRpb25Db21tZW50RnJvbVJhb05oYW5oIjoxLCJub3RpZmljYXRpb25Db21tZW50RnJvbVRpbVZpZWMiOjEsIm5vdGlmaWNhdGlvbkRlY2lsaW5lT2ZmZXIiOjEsIm5vdGlmaWNhdGlvbk1pc3NNZXNzYWdlIjoxLCJub3RpZmljYXRpb25OVERFeHBpcmVkUGluIjoxLCJub3RpZmljYXRpb25OVERFeHBpcmVkUmVjcnVpdCI6MSwibm90aWZpY2F0aW9uTlREUG9pbnQiOjEsIm5vdGlmaWNhdGlvblNlbmRDYW5kaWRhdGUiOjEsIm5vdGlmaWNhdGlvblRhZyI6MSwicmVtb3ZlU3VnZ2VzIjpbXSwidXNlck5hbWVOb1ZuIjoiIiwiZG91YmxlVmVyaWZ5IjowLCJhY3RpdmUiOjAsInN0YXR1cyI6IiIsImFjY2VwdE1lc3NTdHJhbmdlciI6MCwiSGlzdG9yeUFjY2VzcyI6W119LCJzY2FuIjowfSwiaWF0IjoxNjkyMjM5MzgyLCJleHAiOjE2OTIzMjU3ODJ9.jVyBEHo81tIVE0DBC70tMuyH35ijQKjH_JbZD8pq0aM",
                        "POST",
                        { text_change: `${text_change}` }
                      )
                    }
                  >
                    Tìm kiếm
                  </button> */}
                </form>
              </div>

              {/* /////////////////////////////////////////////////////////////// */}

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
                    {text_change !== "" &&
                      checkedStates.map((isChecked, index) => (
                        <div key={index} style={{ marginRight: "5px" }}>
                          <label>
                            <input
                              style={{ marginLeft: "3px" }}
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleCheckboxChange(index)}
                            />
                            {text_change} {index + 1}
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
                    <img src="/crm/plus_icon_field.svg" alt="button" /> Tạo
                    trường
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
                    // index={checkedStates.findIndex((isChecked) => isChecked)}
                  />
                  <CreatFieldDefaultModal
                    isModalCancel={isCreatFieldDefault}
                    setIsModalCancel={setIsCreatFieldDefault}
                  />
                </div>
              </div>
              {/* ///////////////////////////////////////////////////////////// */}
            </div>

            {/* Thong tin hop dong */}
            {imgUrls && imgUrls?.length > 0 && (
              <div>
                <div>
                  <div className={styles.head_contract}>
                    <h4>Thông tin hợp đồng</h4>
                  </div>
                </div>
                <div className={styles["frm-2"]}>
                  {imgUrls?.map((url, index: number) => (
                    <img alt="hd" src={`${url}`} key={index} />
                  ))}
                </div>
              </div>
            )}

            {/* Edit field contract */}
            {newValues && (
              <div className={styles.field_config}>
                <div className={styles.footer_contract}>
                  <h4>Các trường đã thiết lập</h4>
                </div>
                {newValues?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`${styles["frm-3"]} ${styles["fm-bd"]} ${styles["fm_bt"]} ${styles["fm-fd"]} ${styles.opacity}`}
                    id="field_config_1"
                  >
                    <div className={styles["error-name"]}>
                      <label className={styles.field_new}>
                        {item?.newValue}
                      </label>
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
                      value={displayIndex(item)}
                      readOnly
                      placeholder="Nhập nội dung"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Footer Buttons */}
            <div className={styles.btn_submit}>
              <button type="button" onClick={() => setIsModalCancel(true)}>
                Hủy
              </button>
              <button
                className={styles.save}
                type="submit"
                onClick={() => (handleSubmit(), setIsmodal1Open(true))}
              >
                Lưu
              </button>
              <ModalCompleteStep
                modal1Open={ismodal1Open}
                setModal1Open={setIsmodal1Open}
                title="Thêm mới Hợp đồng thành công!"
              />
              <CancelModal
                isModalCancel={isModalCancel}
                setIsModalCancel={setIsModalCancel}
                content={
                  "Bạn có chắc chắn muốn hủy thêm mới hợp đồng, mọi thông tin bạn nhập sẽ không được lưu lại?"
                }
                title={"Xác nhận hủy thêm mới hợp đồng"}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TableAddContract;
