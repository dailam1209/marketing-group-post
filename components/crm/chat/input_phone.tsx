import io from "socket.io-client";
import { useState } from "react";
import { useRouter } from 'next/router';
import styles from "./chat.module.css";
import Image from "next/image";
import { notification, Modal } from "antd";
import { base_url } from "../service/function";
import jwt_decode from "jwt-decode";
const Cookies = require("js-cookie");


export default function InputPhone({ infoCus, refPhone, setPhone }: any) {
  const currentCookie = Cookies.get("token_base365");
  const decodedToken: any = jwt_decode(currentCookie);

  const router = useRouter();
  const [numberValue, setNumberValue] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listPhone, setListPhone] = useState([]);

  const handleCallBtn = async () => {
    const arr_phone = infoCus?.phone_number?.info.split(',')
    if (arr_phone.length === 1) {
      const phone_number = infoCus?.phone_number?.info
      const id_chat = decodedToken?.data?._id
      //Gọi socket, link, bắn thông báo thành công
      router.push(`chat365:/${btoa(phone_number)}/${btoa(String(id_chat))}`);
      try {
        await fetch(`https://voip.timviec365.vn/api/CallSocket`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: id_chat,
            phone_number: phone_number
          })
        });
      } catch (error) { }
    }
    else {
      setListPhone(arr_phone)
      setIsModalOpen(true)
    }
  };
  const handleCalling = async (phone: string) => {
    const id_chat = decodedToken?.data?._id
    //Gọi socket, link, bắn thông báo thành công
    router.push(`chat365:/${btoa(phone)}/${btoa(String(id_chat))}`);
    try {
      await fetch(`https://voip.timviec365.vn/api/CallSocket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: id_chat,
          phone_number: phone
        })
      });
    } catch (error) { }
    setIsModalOpen(false)
  }
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_item_phone}`}
    >
      <div
        className={`${styles.business_assistant_item_gray} ${styles.box_phone}`}
      >
        <label className={styles.lbl_title}>Số điện thoại</label>
        <form action="" onSubmit={() => false} style={{ width: "100%" }}>
          <input
            type="string"
            ref={refPhone}
            disabled
            defaultValue={infoCus?.phone_number?.info}
            className={styles.input_phone}
          />
        </form>
      </div>

      {false ? (
        <button
          type="button"
          className={styles.phone_btn_icon}
        >
          <svg
            width={36}
            height={36}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36Z"
              fill="url(#paint0_linear_1051_739)"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.0111 16.5447C13.0884 16.1982 13.3344 15.9136 13.6659 15.7868C14.3723 15.5844 15.8023 15.3572 18.101 15.3572C20.3996 15.3572 21.9385 15.5863 22.641 15.781C22.9726 15.9079 23.2185 16.1925 23.2959 16.539L23.7923 18.3565C23.966 19.0037 24.1722 19.3168 24.829 19.4581L29.1246 20.3593C30.3713 20.6399 30.5833 20.3593 30.8085 19.7521C31.9884 16.602 31.4405 14.3625 23.5174 12.5831C21.381 12.1039 16.0811 11.8672 12.5204 12.6251C4.89322 14.246 4.27464 16.6707 5.4717 19.6739C5.70463 20.2886 5.86691 20.6189 7.06969 20.3669L11.3673 19.4104C12.0221 19.2672 12.2837 19.1393 12.4574 18.4883L13.0111 16.5447Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1051_739"
                x1="18"
                y1="0"
                x2="18"
                y2="36"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FF4646" />
                <stop offset="1" stop-color="#FF3333" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      ) : (
        <button
          type="button"
          className={styles.phone_btn_icon}
          onClick={handleCallBtn}
        >
          <Image
            width={36}
            height={36}
            src="/crm/phone.svg"
            alt="hungha365.com"
          />
        </button>
      )}
      <Modal
        title="Danh sách số điện thoại"
        open={isModalOpen}
        width={300}
        maskClosable={true}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {listPhone.map((phone, index) => (
          <div key={index} className={styles.phone_item} onClick={() => handleCalling(phone)}>{phone}</div>
        ))}
      </Modal>
    </div>
  );
}
