import React, { useEffect, useRef, useState } from "react";
import styles from "../contract_action.module.css";
import Image from "next/image";
import { useApi } from "@/components/crm/hooks/useApi";
import AddContractrModal from "../modal_add_contract";
import CancelModal from "../../price_policy/price_policy_steps/cancel_modal";
import ModalCompleteStep from "../../price_policy/price_policy_steps/complete_modal";
import axios from "axios";
import { json } from "d3";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  fetchData: any;
}
interface TableAddContractProps {}

const TableAddContract: React.FC<TableAddContractProps> = ({}: any) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [fileUpload, setFileUpload] = useState<any[]>([]);
  const [file, setfile] = useState<any>("");
  const [path_dowload, setpath_dowload] = useState<any>("");
  const [text_change, settext_change] = useState<any>("");
  const [ismodal1Open, setIsmodal1Open] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [imageData, setImageData] = useState<any>();
  const axios = require("axios");
  // const fs = require("fs");
  const FormData = require("form-data");
  const handleClickSelectFileUpdload = () => {
    inputFileRef.current?.click();
  };

  const Cookies = require("js-cookie");

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]; // Lấy tệp tin từ sự kiện
    let data = new FormData();
    data.append("file", file);
    const response = await axios.post(
      "https://work247.vn/api_crm/read_file.php",
      data
    );
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://work247.vn/api_crm/read_file.php",
      headers: {
        "Access-Control-Allow-Origin": '*',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
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

  // const handleFind = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const text_change = event.target.text_change;

  //   if (text_change) {
  //     const formData = new FormData();
  //     formData.append("text_change", text_change);

  //     try {
  //       const res = await fetch("http://43.239.223.117:4000/search", {
  //         method: "POST",
  //         body: formData,
  //         mode: "no-cors",
  //       });

  //       alert("me")
  //         const data = await res.json();
  //         console.log("checkresfile", data);
  //         alert("you")
  //     } catch (error) {
  //       alert("toi")
  //       console.error("Error:", error.message);
  //     }
  //   }
  // };

  const ImageComponent = () => {
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      fetch("https://crm.timviec365.vn/Handles/Contracts/read_contract")
        .then((response) => response.json())
        .then((data) => {
          if (data.lists_image && Array.isArray(data.lists_image)) {
            setImageData(data.lists_image);
          }
        })
        .catch((error) => console.log(error));
    };
  };

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
                      //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyIsImFsaWFzIjoiY29uZy10eS10ZXN0LTEiLCJwaG9uZSI6IjA5NjUyMzQ2NjUiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOm51bGwsInR5cGUiOjEsInBhc3N3b3JkIjoiMDk4NTI1MWYzZDEzMDc2YmVlYzY5YWNhNzc4ZWEzMWYiLCJjaXR5IjoyLCJkaXN0cmljdCI6MjgyLCJhZGRyZXNzIjoia20gMTAgLSBUcuG6p24gUGjDuiAtIEjDoCDEkMO0bmcsIEhOIiwib3RwIjoiODA1MjM5IiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjoxLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInVwZGF0ZWRBdCI6MSwibGFzdEFjdGl2ZWRBdCI6bnVsbCwidGltZV9sb2dpbiI6MTY5MTQ2NDAxOSwicm9sZSI6MCwibGF0aXR1ZGUiOiIyMC45ODkwMzEzIiwibG9uZ3RpdHVkZSI6IjEwNS44MzEyNTg4IiwiaWRRTEMiOjE3NjMsImlkVGltVmllYzM2NSI6MjAyNTg1LCJpZFJhb05oYW5oMzY1IjowLCJjaGF0MzY1X3NlY3JldCI6IjJaMW5zNmtjVDUiLCJjaGF0MzY1X2lkIjowLCJzY2FuX2Jhc2UzNjUiOjAsImNoZWNrX2NoYXQiOjAsInNoYXJlUGVybWlzc2lvbklkIjpbXSwiaW5Gb3JQZXJzb24iOm51bGwsImluRm9yQ29tcGFueSI6eyJzY2FuIjowLCJ1c2Nfa2QiOjQxLCJ1c2Nfa2RfZmlyc3QiOjAsImRlc2NyaXB0aW9uIjoiZOG7i2NoIHbhu6UiLCJjb21fc2l6ZSI6MiwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik5ndXllbiBWYW4gQ3VvbmciLCJ1c2NfbmFtZV9hZGQiOiIxIFRy4bqnbiBOZ3V5w6puIMSQw6FuLCBLaHUgxJHDtCB0aOG7iyDEkOG7i25oIEPDtG5nLCBIb8OgbmcgTWFpLCBIw6AgTuG7mWkiLCJ1c2NfbmFtZV9waG9uZSI6IjA5NjUzMjQ2NzQiLCJ1c2NfbmFtZV9lbWFpbCI6InRoaWVucXVhbkBnbWFpbC5jb20iLCJ1c2NfdXBkYXRlX25ldyI6MTY5MDg4MTg4MCwidXNjX2Nhbm9uaWNhbCI6IiIsInVzY19tZDUiOiIiLCJ1c2NfcmVkaXJlY3QiOiIiLCJ1c2NfdHlwZSI6MCwidXNjX3NpemUiOjIsInVzY193ZWJzaXRlIjoidGltdmllYzM2NS52biIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjEsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4yMzEiLCJ1c2NfbG9jIjoxLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6InZpZGVvX2Nwbjg0NDE4NjE2NzM0MzMyNTkubXA0LHZpZGVvX2Nwbjg0NDE4NjE2NzM1Mjc0MDMubXA0LHZpZGVvX2Nwbl8wXzE2OTAzNjQyNDgubXA0IiwidXNjX3ZpZGVvX3R5cGUiOjIsInVzY192aWRlb19hY3RpdmUiOjAsInVzY19ibG9ja19hY2NvdW50IjowLCJ1c2Nfc3RvcF9ub3RpIjowLCJvdHBfdGltZV9leGlzdCI6MTY5MDk2NzMzMywidXNlX3Rlc3QiOjAsInVzY19iYWRnZSI6MSwidXNjX3N0YXIiOjEsInVzY192aXAiOjMsInVzY19tYW5hZ2VyIjoiIiwidXNjX2xpY2Vuc2UiOiIiLCJ1c2NfYWN0aXZlX2xpY2Vuc2UiOjAsInVzY19tYXAiOiI8aWZyYW1lIHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9lbWJlZD9wYj0hMW0xOCExbTEyITFtMyExZDU5NTg3Ljk0NTgzMTExOTgxITJkMTA1LjgwMTk0Mzk1NjIxMzgyITNkMjEuMDIyODE2MTM1NzMzMTM3ITJtMyExZjAhMmYwITNmMCEzbTIhMWkxMDI0ITJpNzY4ITRmMTMuMSEzbTMhMW0yITFzMHgzMTM1YWI5YmQ5ODYxY2ExJTNBMHhlNzg4N2Y3YjcyY2ExN2E5ITJ6U01PZ0lFN2h1NWxwTENCSWI4T2diaUJMYWVHNnYyMHNJRWpEb0NCTzRidVphU3dnVm1uaHU0ZDBJRTVoYlEhNWUwITNtMiExc3ZpITJzITR2MTYwMTM0NTI1NDk1MyE1bTIhMXN2aSEyc1wiIHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiMzAwXCIgZnJhbWVib3JkZXI9XCIwXCIgc3R5bGU9XCJib3JkZXI6MDtcIiBhbGxvd2Z1bGxzY3JlZW49XCJcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgdGFiaW5kZXg9XCIwXCI-PC9pZnJhbWU-IiwidXNjX2RnYyI6IlszLDAsMSwxLFwibGlrdWp5dHJcIl0iLCJ1c2NfZGd0diI6Ils1LDEsXCJ0ZXN0XCIsXCJ0ZXN0XCJdIiwidXNjX2RnX3RpbWUiOjE2OTA1MTQzNjMsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJk4buLY2ggduG7pSIsInVzY196YWxvIjpudWxsLCJ1c2NfY2MzNjUiOjAsInVzY19jcm0iOjAsInVzY19pbWFnZXMiOm51bGwsInVzY19hY3RpdmVfaW1nIjowLCJ1c2NfZm91bmRlZF90aW1lIjowLCJ1c2NfYnJhbmNoZXMiOltdfSwiY2RzIjp7ImNvbV9yb2xlX2lkIjowLCJjb21fcGFyZW50X2lkIjpudWxsLCJ0eXBlX3RpbWVrZWVwaW5nIjoiMSwyLDMsNCw1LDgsOSIsImlkX3dheV90aW1la2VlcGluZyI6IjEiLCJjb21fcXJfbG9nbyI6bnVsbCwiZW5hYmxlX3NjYW5fcXIiOjAsImNvbV92aXAiOjAsImNvbV9lcF92aXAiOjUsImNvbV92aXBfdGltZSI6MCwiZXBfY3JtIjowLCJlcF9zdHQiOjF9LCJfaWQiOiI2NGQxYjY1M2NlZDljMjdmNWI5NWI2YzQifSwiaW5mb3JSTjM2NSI6bnVsbCwiY29uZmlnQ2hhdCI6eyJub3RpZmljYXRpb25BY2NlcHRPZmZlciI6MSwibm90aWZpY2F0aW9uQWxsb2NhdGlvblJlY2FsbCI6MSwibm90aWZpY2F0aW9uQ2hhbmdlU2FsYXJ5IjoxLCJub3RpZmljYXRpb25Db21tZW50RnJvbVJhb05oYW5oIjoxLCJub3RpZmljYXRpb25Db21tZW50RnJvbVRpbVZpZWMiOjEsIm5vdGlmaWNhdGlvbkRlY2lsaW5lT2ZmZXIiOjEsIm5vdGlmaWNhdGlvbk1pc3NNZXNzYWdlIjoxLCJub3RpZmljYXRpb25OVERFeHBpcmVkUGluIjoxLCJub3RpZmljYXRpb25OVERFeHBpcmVkUmVjcnVpdCI6MSwibm90aWZpY2F0aW9uTlREUG9pbnQiOjEsIm5vdGlmaWNhdGlvblNlbmRDYW5kaWRhdGUiOjEsIm5vdGlmaWNhdGlvblRhZyI6MSwicmVtb3ZlU3VnZ2VzIjpbXSwidXNlck5hbWVOb1ZuIjoiIiwiZG91YmxlVmVyaWZ5IjowLCJhY3RpdmUiOjAsInN0YXR1cyI6IiIsImFjY2VwdE1lc3NTdHJhbmdlciI6MCwiSGlzdG9yeUFjY2VzcyI6W119LCJzY2FuIjowfSwiaWF0IjoxNjkyMjM5MzgyLCJleHAiOjE2OTIzMjU3ODJ9.jVyBEHo81tIVE0DBC70tMuyH35ijQKjH_JbZD8pq0aM",
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
              <div className={styles.col_md_6}>
                <div className={styles.title}>
                  Tìm kiếm thông tin cần thay đổi trong hợp đồng
                </div>
                <div className={styles.divSearch}>
                  <input
                    className={`${styles.form_control} ${styles.upload_contract} ${styles.upload_text}`}
                    // onChange={(event) => handleFind(event)}
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
                </div>
              </div>
            </div>
            <div>
              <label className={styles.label_thietlap}>
                Thiết lập thông tin cần thay đổi trong hợp đồng
              </label>
              <div className={styles.param}></div>
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
                onClick={() => setIsmodal1Open(true)}
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
                      //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MzgwOTg5LCJlbWFpbCI6ImR1b25naGllcGl0MUBnbWFpbC5jb20iLCJwaG9uZVRLIjoiIiwidXNlck5hbWUiOiJDw7RuZyBUeSBUTkhIIEggTSBMIFBwbyIsImFsaWFzIjoiY29uZy10eS10ZXN0LTEiLCJwaG9uZSI6IjA5NjUyMzQ2NjUiLCJlbWFpbENvbnRhY3QiOm51bGwsImF2YXRhclVzZXIiOm51bGwsInR5cGUiOjEsInBhc3N3b3JkIjoiMDk4NTI1MWYzZDEzMDc2YmVlYzY5YWNhNzc4ZWEzMWYiLCJjaXR5IjoyLCJkaXN0cmljdCI6MjgyLCJhZGRyZXNzIjoia20gMTAgLSBUcuG6p24gUGjDuiAtIEjDoCDEkMO0bmcsIEhOIiwib3RwIjoiODA1MjM5IiwiYXV0aGVudGljIjoxLCJpc09ubGluZSI6MCwiZnJvbVdlYiI6InRpbXZpZWMzNjUiLCJmcm9tRGV2aWNlIjoxLCJjcmVhdGVkQXQiOjE2MDA2NTg0NzgsInVwZGF0ZWRBdCI6MSwibGFzdEFjdGl2ZWRBdCI6bnVsbCwidGltZV9sb2dpbiI6MTY5MTQ2NDAxOSwicm9sZSI6MCwibGF0aXR1ZGUiOiIyMC45ODkwMzEzIiwibG9uZ3RpdHVkZSI6IjEwNS44MzEyNTg4IiwiaWRRTEMiOjE3NjMsImlkVGltVmllYzM2NSI6MjAyNTg1LCJpZFJhb05oYW5oMzY1IjowLCJjaGF0MzY1X3NlY3JldCI6IjJaMW5zNmtjVDUiLCJjaGF0MzY1X2lkIjowLCJzY2FuX2Jhc2UzNjUiOjAsImNoZWNrX2NoYXQiOjAsInNoYXJlUGVybWlzc2lvbklkIjpbXSwiaW5Gb3JQZXJzb24iOm51bGwsImluRm9yQ29tcGFueSI6eyJzY2FuIjowLCJ1c2Nfa2QiOjQxLCJ1c2Nfa2RfZmlyc3QiOjAsImRlc2NyaXB0aW9uIjoiZOG7i2NoIHbhu6UiLCJjb21fc2l6ZSI6MiwidGltdmllYzM2NSI6eyJ1c2NfbmFtZSI6Ik5ndXllbiBWYW4gQ3VvbmciLCJ1c2NfbmFtZV9hZGQiOiIxIFRy4bqnbiBOZ3V5w6puIMSQw6FuLCBLaHUgxJHDtCB0aOG7iyDEkOG7i25oIEPDtG5nLCBIb8OgbmcgTWFpLCBIw6AgTuG7mWkiLCJ1c2NfbmFtZV9waG9uZSI6IjA5NjUzMjQ2NzQiLCJ1c2NfbmFtZV9lbWFpbCI6InRoaWVucXVhbkBnbWFpbC5jb20iLCJ1c2NfdXBkYXRlX25ldyI6MTY5MDg4MTg4MCwidXNjX2Nhbm9uaWNhbCI6IiIsInVzY19tZDUiOiIiLCJ1c2NfcmVkaXJlY3QiOiIiLCJ1c2NfdHlwZSI6MCwidXNjX3NpemUiOjIsInVzY193ZWJzaXRlIjoidGltdmllYzM2NS52biIsInVzY192aWV3X2NvdW50IjowLCJ1c2NfYWN0aXZlIjowLCJ1c2Nfc2hvdyI6MSwidXNjX21haWwiOjAsInVzY19zdG9wX21haWwiOjEsInVzY191dGwiOjAsInVzY19zc2wiOjAsInVzY19tc3QiOiIwIiwidXNjX3NlY3VyaXR5IjoiIiwidXNjX2lwIjoiMTE4LjcwLjEyNi4yMzEiLCJ1c2NfbG9jIjoxLCJ1c2NfbWFpbF9hcHAiOjAsInVzY192aWRlbyI6InZpZGVvX2Nwbjg0NDE4NjE2NzM0MzMyNTkubXA0LHZpZGVvX2Nwbjg0NDE4NjE2NzM1Mjc0MDMubXA0LHZpZGVvX2Nwbl8wXzE2OTAzNjQyNDgubXA0IiwidXNjX3ZpZGVvX3R5cGUiOjIsInVzY192aWRlb19hY3RpdmUiOjAsInVzY19ibG9ja19hY2NvdW50IjowLCJ1c2Nfc3RvcF9ub3RpIjowLCJvdHBfdGltZV9leGlzdCI6MTY5MDk2NzMzMywidXNlX3Rlc3QiOjAsInVzY19iYWRnZSI6MSwidXNjX3N0YXIiOjEsInVzY192aXAiOjMsInVzY19tYW5hZ2VyIjoiIiwidXNjX2xpY2Vuc2UiOiIiLCJ1c2NfYWN0aXZlX2xpY2Vuc2UiOjAsInVzY19tYXAiOiI8aWZyYW1lIHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9lbWJlZD9wYj0hMW0xOCExbTEyITFtMyExZDU5NTg3Ljk0NTgzMTExOTgxITJkMTA1LjgwMTk0Mzk1NjIxMzgyITNkMjEuMDIyODE2MTM1NzMzMTM3ITJtMyExZjAhMmYwITNmMCEzbTIhMWkxMDI0ITJpNzY4ITRmMTMuMSEzbTMhMW0yITFzMHgzMTM1YWI5YmQ5ODYxY2ExJTNBMHhlNzg4N2Y3YjcyY2ExN2E5ITJ6U01PZ0lFN2h1NWxwTENCSWI4T2diaUJMYWVHNnYyMHNJRWpEb0NCTzRidVphU3dnVm1uaHU0ZDBJRTVoYlEhNWUwITNtMiExc3ZpITJzITR2MTYwMTM0NTI1NDk1MyE1bTIhMXN2aSEyc1wiIHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiMzAwXCIgZnJhbWVib3JkZXI9XCIwXCIgc3R5bGU9XCJib3JkZXI6MDtcIiBhbGxvd2Z1bGxzY3JlZW49XCJcIiBhcmlhLWhpZGRlbj1cImZhbHNlXCIgdGFiaW5kZXg9XCIwXCI-PC9pZnJhbWU-IiwidXNjX2RnYyI6IlszLDAsMSwxLFwibGlrdWp5dHJcIl0iLCJ1c2NfZGd0diI6Ils1LDEsXCJ0ZXN0XCIsXCJ0ZXN0XCJdIiwidXNjX2RnX3RpbWUiOjE2OTA1MTQzNjMsInVzY19za3lwZSI6IiIsInVzY192aWRlb19jb20iOiIiLCJ1c2NfbHYiOiJk4buLY2ggduG7pSIsInVzY196YWxvIjpudWxsLCJ1c2NfY2MzNjUiOjAsInVzY19jcm0iOjAsInVzY19pbWFnZXMiOm51bGwsInVzY19hY3RpdmVfaW1nIjowLCJ1c2NfZm91bmRlZF90aW1lIjowLCJ1c2NfYnJhbmNoZXMiOltdfSwiY2RzIjp7ImNvbV9yb2xlX2lkIjowLCJjb21fcGFyZW50X2lkIjpudWxsLCJ0eXBlX3RpbWVrZWVwaW5nIjoiMSwyLDMsNCw1LDgsOSIsImlkX3dheV90aW1la2VlcGluZyI6IjEiLCJjb21fcXJfbG9nbyI6bnVsbCwiZW5hYmxlX3NjYW5fcXIiOjAsImNvbV92aXAiOjAsImNvbV9lcF92aXAiOjUsImNvbV92aXBfdGltZSI6MCwiZXBfY3JtIjowLCJlcF9zdHQiOjF9LCJfaWQiOiI2NGQxYjY1M2NlZDljMjdmNWI5NWI2YzQifSwiaW5mb3JSTjM2NSI6bnVsbCwiY29uZmlnQ2hhdCI6eyJub3RpZmljYXRpb25BY2NlcHRPZmZlciI6MSwibm90aWZpY2F0aW9uQWxsb2NhdGlvblJlY2FsbCI6MSwibm90aWZpY2F0aW9uQ2hhbmdlU2FsYXJ5IjoxLCJub3RpZmljYXRpb25Db21tZW50RnJvbVJhb05oYW5oIjoxLCJub3RpZmljYXRpb25Db21tZW50RnJvbVRpbVZpZWMiOjEsIm5vdGlmaWNhdGlvbkRlY2lsaW5lT2ZmZXIiOjEsIm5vdGlmaWNhdGlvbk1pc3NNZXNzYWdlIjoxLCJub3RpZmljYXRpb25OVERFeHBpcmVkUGluIjoxLCJub3RpZmljYXRpb25OVERFeHBpcmVkUmVjcnVpdCI6MSwibm90aWZpY2F0aW9uTlREUG9pbnQiOjEsIm5vdGlmaWNhdGlvblNlbmRDYW5kaWRhdGUiOjEsIm5vdGlmaWNhdGlvblRhZyI6MSwicmVtb3ZlU3VnZ2VzIjpbXSwidXNlck5hbWVOb1ZuIjoiIiwiZG91YmxlVmVyaWZ5IjowLCJhY3RpdmUiOjAsInN0YXR1cyI6IiIsImFjY2VwdE1lc3NTdHJhbmdlciI6MCwiSGlzdG9yeUFjY2VzcyI6W119LCJzY2FuIjowfSwiaWF0IjoxNjkyMjM5MzgyLCJleHAiOjE2OTIzMjU3ODJ9.jVyBEHo81tIVE0DBC70tMuyH35ijQKjH_JbZD8pq0aM",
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TableAddContract;
