import React, { useEffect, useRef, useState } from "react";
import styles from "../detail/customer_detail.module.css";
import UploadDocumentModal from "./document_upload_modal";
export default function HeaderBtnsDocumentEngine({ id, body, setBody }: any) {
  const [isOpenMdal, setIsOpenMdal] = useState(false);
  const inputRef = useRef(null);

  return (
    <>
      <div className={styles.main__control}>
        <div className={`${styles.main__control_btn} flex_between`}>
          <div className={styles.main__control_search}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBody((prev) => {
                  return {
                    ...prev,
                    file_name: inputRef?.current?.value,
                  };
                });
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className={styles.input__search}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo tài liệu đính kèm"
              />
              <button className={styles.kinh_lup}>
                <img
                  className={styles.img__search}
                  src="/crm/search.svg"
                  alt=""
                />
              </button>
            </form>
          </div>
          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              onClick={() => setIsOpenMdal(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </div>
        </div>
      </div>
      <UploadDocumentModal
        isModalCancel={isOpenMdal}
        setIsModalCancel={setIsOpenMdal}
      />
    </>
  );
}
