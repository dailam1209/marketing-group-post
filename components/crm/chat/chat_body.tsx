import styles from "./chat.module.css";
import InputPhone from "./input_phone";
import InputNameCustomer from "./input_name_customer";
import InputEmailCustomer from "./input_email_customer";
import TextEditor from "../text-editor/text_editor";
import SelectBoxInput from "./select_box_input";
import { dataOptions } from "../ultis/consntant";
import CalenderInput from "./calender_input";
import SaveBtnChat from "./saveBtnChat";

export default function ChatBusinessBody() {
  return (
    <div className={styles.business_assistant_body}>
      <div className={styles.form_business_assistant}>
        <InputPhone />
        <InputNameCustomer />
        <InputEmailCustomer />
        <TextEditor title={"Mô tả khách hàng" as any} className={"1"} />
        <TextEditor title={"Nội dung cuộc gọi" as any} className={"2"} />
        <div className={styles.business_assistant_calendar_care}>
          <SelectBoxInput
            dataOption={dataOptions[2]}
            title="Nhóm khách hàng cha"
            placeholder="Chọn nhóm khách hàng"
          />
          <SelectBoxInput
            dataOption={dataOptions[3]}
            title="Nhóm khách hàng con"
            placeholder="Chọn nhóm khách hàng"
          />
        </div>
        <div className={styles.business_assistant_calendar_care}>
          <SelectBoxInput
            dataOption={dataOptions[0]}
            title="Tình trạng khách hàng"
            placeholder="Chọn tình trạng khách hàng"
          />
          <SelectBoxInput
            dataOption={dataOptions[1]}
            title="Nguồn khách hàng"
            placeholder="Chọn nguồn khách hàng"
          />
        </div>
        <CalenderInput/>
        <SaveBtnChat />
      </div>
    </div>
  );
}
