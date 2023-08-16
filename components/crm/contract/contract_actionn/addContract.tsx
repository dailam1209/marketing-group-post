import { useRef, useState } from "react";
import styles from "../contract_action.module.css";
import Image from "next/image";

export default function AddContract({ setCheckFile }: any) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileUpload, setFileUpload] = useState<any[]>([]);

  const handleClickSelectFileUpdload = () => {
    inputFileRef.current?.click();
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
                    <img src="/taihopdong.svg" alt="upload" />
                    <input
                      type="file"
                      className={styles.upload}
                      name="file"
                      multiple
                      // ref={inputFileRef}
                      onChange={handleFileChange}
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
            <div>
              <label className={styles.label_thietlap}>
                Thiết lập thông tin cần thay đổi trong hợp đồng
              </label>
              <div className={styles.param}></div>
            </div>
            <div className={styles.info_contract}>
              <div className={styles.title_contract}>
                <label className={styles.label_contract}>Thông tin hợp đồng</label>
              </div>
              <div className={styles.content_contract}>
                <div className={styles.loading}>
                  <img src="/load_data.gif" alt="loading" />
                </div>
              </div>
            </div>
            <div className={styles.btn_submit}>
              <button className={styles.sub1}>Hủy</button>
              <button className={styles.sub2}>Lưu</button>
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
                    <img src="/taihopdong.svg" alt="upload" />
                    <input
                      type="file"
                      className={styles.upload}
                      name="file"
                      multiple
                      // ref={inputFileRef}
                      onChange={handleFileChange}
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
}
