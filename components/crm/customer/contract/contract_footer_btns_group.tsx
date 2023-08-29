"use client";
import { useRouter } from "next/router";
import styles from "../../potential/potential.module.css";
import { useState } from "react";
import CancelModalContract from "./cancel_modal_contract";

export default function ContractBtsGroupFooter({ id }: any) {
  const router = useRouter();
  const [liveiew, setLiveiew] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);

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
      {liveiew && (
        <div style={{ marginTop: "30px", border: "1px solid #fff" }}>
          <div style={{ textAlign: "center" }}>
            <img alt="loading" src="	/crm/load_data.gif" />
          </div>
        </div>
      )}
    </>
  );
}
