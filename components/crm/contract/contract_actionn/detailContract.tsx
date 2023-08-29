import { useEffect, useRef, useState } from "react";
import styles from "../contract_action.module.css";
import Image from "next/image";
import { setInterval } from "timers/promises";
import { Alert, Button } from "antd";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import htmlToImage from "html-to-image";
import { useApi } from "@/components/crm/hooks/useApi";
import { base_url } from "../../service/function";
import Cookies from "js-cookie";

export default function AddContract({ setCheckFile }: any, { FormData }: any) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileUpload, setFileUpload] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  var imageData = FormData?.result?.input_file;
  const handleClickSelectFileUpdload = () => {
    inputFileRef.current?.click();
  };

  // const handleFileChange = (event: any) => {
  //   const file = event.target.files[0];
  //   if (file && file.size <= 20 * 1024 * 1024) {
  //     //   const files = event.target.files;
  //     setCheckFile(true);
  //     setFileUpload((prevFiles: any) => [...prevFiles, file.name]);
  //   } else {
  //     alert("Error !");
  //   }
  // };
  const handleshow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setTimeout(() => {
      // console.log("first")
      setShow(false);
    }, 1500);
  };

  // const DocxToImage = () => {
  //   const containerRef = useRef(null);

  //   // const convertToImage = () => {
  //   //   const container = containerRef.current;

  //   //   // Chuyển đổi nội dung HTML thành hình ảnh
  //   //   htmlToImage.toPng(container)
  //   //     .then(function (dataUrl) {
  //   //       // Tạo Blob từ dữ liệu hình ảnh
  //   //       const blob = dataURLtoBlob(dataUrl);

  //   //     })
  //   //     .catch(function (error) {
  //   //       console.error('Error converting to image:', error);
  //   //     });
  //   // };

  //   const dataURLtoBlob = (dataURL) => {
  //     const arr = dataURL.split(',');
  //     const mime = arr[0].match(/:(.*?);/)[1];
  //     const bstr = atob(arr[1]);
  //     let n = bstr.length;
  //     const u8arr = new Uint8Array(n);

  //     while (n--) {
  //       u8arr[n] = bstr.charCodeAt(n);
  //     }

  //     return new Blob([u8arr], { type: mime });
  //   };
  // };

  useEffect(() => {
    if (showAlert) {
      const confirm = window.confirm(
        "Bạn có chắc chắn muốn xóa hợp đồng này ???"
      );
      if (confirm) {
        setShowAlert(false);
      }
    }
  }, [showAlert]);
  useEffect(() => {
    handleshow();
    handleClose();
  }, []);
  const router = useRouter();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end", gap: 30 }}>
        <div>
          <Button
            onClick={() => router.push("/crm/contract/edit_contract")}
            style={{
              width: 150,
              borderRadius: 10,
              background: "#4C5BD4",
              color: "#fff",
              fontSize: 18,
              height: 40,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <div>
                <img src="/crm/icon-pen.svg" alt="" />
              </div>
              <div>Chỉnh sửa</div>
            </div>
          </Button>
        </div>
        <div onClick={() => setShowAlert(true)}>
          <Button
            style={{
              borderRadius: 10,
              color: "#4C5BD4",
              fontSize: 15,
              fontWeight: 800,
              height: 40,
            }}
          >
            {" "}
            Xóa Hợp đồng
          </Button>
        </div>
      </div>
      <div className={styles.main__body}>
        <>
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
          <div className={styles.main__body}>
            <>
              <div className={styles.info_contract}>
                <div className={styles.title_contract}>
                  <label className={styles.label_contract}>
                    Các trường đã thiết lập
                  </label>
                </div>
                <div className={styles.content_contract}>
                  {FormData?.get_detail_form_contract}
                </div>
              </div>
            </>
          </div>
        </>
      </div>
    </>
  );
}
