import styles from "./chat.module.css";
import InputPhone from "./input_phone";
import InputNameCustomer from "./input_name_customer";
import InputEmailCustomer from "./input_email_customer";
import SelectBoxInput from "./select_box_input";
import { dataOptions } from "../ultis/consntant";
import CalenderInput from "./calender_input";
import SaveBtnChat from "./saveBtnChat";
import TextEditor from "../text-editor/text_editor_phone";
import { useEffect, useState } from "react";
import TextEditorND from "../text-editor/text_editor_nd";
import { base_url } from "../service/function";
import SelectBoxInputNguon from "./nguonKH";
import SelectBoxInputNhomKh from "./nhomKh";
import SelectBoxInputNhomKhcon from "./khcon";
const Cookies = require("js-cookie"); 
export default function ChatBusinessBody({ cusId,setContent,setDate,setCusId }: any) {
  const [infoCus, setInfoCus] = useState({});
  const handleGetInfoCus = async () => {
    const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ cus_id: cusId}),
    });
    const data = await res.json();
    if (data && data?.data)
      setInfoCus(data?.data);
  };
  useEffect(() => {
    handleGetInfoCus();
  }, [cusId]);
  const [listGr,setListGr] = useState([])
  const [list_gr_child, setlistGr_Child] = useState([]);

  const handleGetGr = async () => {
    try {
      const res = await fetch(
        `${base_url}/api/crm/group/list_group_khach_hang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      const data = await res.json();
      setListGr(data?.data);
      let arr = [];
      data?.data?.map((item) => {
        item?.lists_child?.map((item) => {
          arr.push(item);
        });
        setlistGr_Child(arr);
      });
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(()=>{handleGetGr()},[])
  return (
    <div className={styles.business_assistant_body}>
      <div className={styles.form_business_assistant}>
        <InputPhone infoCus={infoCus} />
        <InputNameCustomer infoCus={infoCus} />
        <InputEmailCustomer infoCus={infoCus} />
        <TextEditor
          infoCus={infoCus}
          title={"Mô tả khách hàng" as any}
          className={"1"}
        />
        <TextEditorND
          infoCus={infoCus}
          title={"Nội dung cuộc gọi" as any}
          className={"2"}
          setContent={setContent}
          setDate={setDate}
        />
        <div className={styles.business_assistant_calendar_care}>
          <SelectBoxInputNhomKh
            infoCus={infoCus}
            dataOption={dataOptions[2]}
            title="Nhóm khách hàng cha"
            placeholder="Chọn nhóm khách hàng"
            listGr={listGr}
          />
          <SelectBoxInputNhomKhcon
           infoCus={infoCus}
            dataOption={dataOptions[3]}
            title="Nhóm khách hàng con"
            placeholder="Chọn nhóm khách hàng"
            list_gr_child={list_gr_child}
          />
        </div>
        <div className={styles.business_assistant_calendar_care}>
          <SelectBoxInput
           infoCus={infoCus}
            dataOption={dataOptions[0]}
            title="Tình trạng khách hàng"
            placeholder="Chọn tình trạng khách hàng"
          />
          <SelectBoxInputNguon
               infoCus={infoCus}
            dataOption={dataOptions[1]}
            title="Nguồn khách hàng"
            placeholder="Chọn nguồn khách hàng"
          />
        </div>
        <CalenderInput />
        <SaveBtnChat />
      </div>
    </div>
  );
}
