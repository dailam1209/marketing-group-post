"use client";
import { useRouter } from "next/router";
import styles from "../../potential/potential.module.css";
import { useState } from "react";
import CancelModalContract from "./cancel_modal_contract";

export default function ContractBtsGroupFooter({ id, FormData }: any) {
  const router = useRouter();
  const [liveiew, setLiveiew] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);

  const imageData = FormData?.result?.img_org_base64;
  const handleClickComplete = () => {
    setIsModalSuccess(true);
    setTimeout(() => {
      router.push(`/crm/customer/contract/list/${id}`);
    }, 2000);
  };

  return (
    <>
      <div className={styles.main__footer}>
        <button type="button" onClick={() => setIsModalCancel(true)}>
          Hủy
        </button>

        <button
          onClick={() => setLiveiew(true)}
          className={`${styles.save} ${styles.submit_step2}`}
          type="button"
        >
          Xem trước
        </button>

        <button
          className={`${styles.save} ${styles.submit_step2}`}
          type="button"
          onClick={handleClickComplete}
        >
          Lưu
        </button>

        {isModalCancel ? (
          <CancelModalContract
            isModalCancel={isModalCancel}
            setIsModalCancel={setIsModalCancel}
            content={
              "Bạn có đồng ý hủy? \n  Mọi dữ liệu bạn vừa nhập sẽ bị xóa?"
            }
            title={"Xác nhận hủy thêm hợp đồng"}
            link={`/crm/customer/contract/list/${id}`}
          />
        ) : null}
      </div>
      {liveiew && imageData && imageData?.length > 0 && (
        <div>
          <div className={styles.frm_2}>
            {imageData?.map((url, index: number) => (
              <img alt="hd" src={`${url}`} key={index} />
            ))}
          </div>
        </div>
      // ) : (
      //   <div>
      //     <div>
      //       <div className={styles.head_contract}>
      //         <h4>Thông tin hợp đồng</h4>
      //       </div>
      //     </div>
      //     <div className={styles["frm_2"]}>
      //       <img
      //         style={{ objectFit: "contain" }}
      //         alt="hd"
      //         src="/crm/loading_file.gif"
      //       />
      //     </div>
      //   </div>
      )}
    </>
  );
}
