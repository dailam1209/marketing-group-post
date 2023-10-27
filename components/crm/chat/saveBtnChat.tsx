import axios from "axios";
import styles from "./chat.module.css";
import Cookies from "js-cookie";
import { useContext } from "react";
import { UpdateTLKD } from "../context/updateTlkd";

export default function SaveBtnChat({
  tinhtrang,
  phone,
  nguon,
  nhomcha,
  nhomCon,
  name,
  content_call,
  email,
  desCription,
  refName,
  handleOpenChatBody
}: any) {
  const { updateTLKD, setUpdateTLKD } = useContext<any>(UpdateTLKD);

  const postData = async (body) => {
    const token = Cookies.get("token_base365");
    const url = "http://210.245.108.202:3007/api/crm/customer/addCustomer/";
    const res = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;
  };

  const handleSave = async () => {
    if (!name) {
      refName?.current.focus();
    } else {
      const formData = new FormData();
      email && formData.append("email", email);
      formData.append("name", name);
      phone && formData.append("phone_number", phone);
      content_call && formData.append("content_call", content_call);
      nhomcha && formData.append("group_id", nhomCon || nhomcha);
      desCription && formData.append("description", desCription);
      nguon && formData.append("resoure", nguon);
      tinhtrang && formData.append("status", tinhtrang);
      
      await postData(formData);
      setUpdateTLKD(!updateTLKD);
      handleOpenChatBody()
    }
  };
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_save}`}
    >
      <button onClick={handleSave} id={`${styles.business_assistant_save}`}>
        Lưu
      </button>
    </div>
  );
}
