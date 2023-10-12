import styles from "./chat.module.css";
import InputPhone from "./input_phone";
import InputNameCustomer from "./input_name_customer";
import InputEmailCustomer from "./input_email_customer";
import SelectBoxInput from "./select_box_input";
import { dataOptions } from "../ultis/consntant";
import CalenderInput from "./calender_input";
import SaveBtnChat from "./saveBtnChat";
import TextEditor from "../text-editor/text_editor_phone";
import { useEffect, useRef, useState } from "react";
import TextEditorND from "../text-editor/text_editor_nd";
import { base_url } from "../service/function";
import SelectBoxInputNguon from "./nguonKH";
import SelectBoxInputNhomKh from "./nhomKh";
import SelectBoxInputNhomKhcon from "./khcon";
import { Select } from "antd";
import { useRouter } from "next/router";
import moment from "moment";
import React from "react";
import { Input, TimePicker } from "antd";
import dayjs from "dayjs";
import stylePotentialSlect from "@/components/crm/potential/potential.module.css";
import PotentialSelectBoxStep from "../potential/potential_steps/select_box_step";
import { CaretDownOutlined, DownCircleTwoTone } from "@ant-design/icons";
import { Router } from "next/router";
import Cookies from "js-cookie";
import { tr } from "date-fns/locale";
import { useSelector } from "react-redux";
import { doGhimCha, doSaveCha } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import TextEditorTLKDDes from "../text-editor/new_text_ditor_phonetlkd";
import NewCalenderInput from "./new_calendar_input";
export default function NewChatBusinessBody({ handleOpenChatBody }: any) {
  const [listGr, setListGr] = useState([]);
  const [list_gr_child, setlistGr_Child] = useState([]);

  useEffect(() => {}, []);
  const [idChaSaved, setidChaSaved] = useState<any>(-1);
  const checkCha = useSelector((state: any) => state?.auth?.ghimCha);
  const [mail, setMail] = useState("");
  const [check, setCheck] = useState(false);
  const [nhonkhachhang, setnhonkhachhang] = useState<any>();
  const [nhomCon, setNhomCon] = useState<any>();
  const [tinhtrang, settinhtrang] = useState<any>();
  const [nguon, setnguon] = useState<any>();
  const [name, setName] = useState<any>();
  const refName = useRef<any>();
  const refMail = useRef<any>();
  const refPhone = useRef<any>();
  const [refDes, setrefDes] = useState<any>();
  const [content_call, setContentCall] = useState("");
  const [phone, setPhone] = useState();

  const router = useRouter();
  const currentTime = moment(); // Thời điểm hiện tại
  const pastTime = currentTime.subtract(2, "days");
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkCha) {
    }
  }, [idChaSaved]);

  const handleSelectNhomCha = (value) => {
    // setnhomCha(value);
    // dispatch(doSaveCha({ id: value }));
    // setIdNhom(value);
    // setnhomCon("Tất cả");
    setnhonkhachhang(value);
    if (value > 0) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

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
      let arr = [];
      const data = await res.json();
      setListGr(data?.data);
      //   data?.data?.map((item) => {
      //     item?.lists_child.map((item) => {
      //       arr.push(item);
      //     });
      //     setlistGr_Child(arr);
      //   });
    } catch (error) {}
  };

  useEffect(() => {
    handleGetGr();
  }, []);

  useEffect(() => {
    if (nhonkhachhang && listGr) {
      const newArr = listGr?.filter(
        (item) => item?.gr_id === nhonkhachhang
      )?.[0]?.lists_child;
      setlistGr_Child(newArr);
      setNhomCon(newArr?.[0]?.gr_id || "");
    }
    if (nhonkhachhang === 0) {
      setlistGr_Child([]);
    }
  }, [nhonkhachhang]);

  return (
    <div className={styles.business_assistant_body}>
      <div className={styles.form_business_assistant}>
        <InputPhone refPhone={refPhone} setPhone={setPhone} />
        <InputNameCustomer refName={refName} setChange={setName} />
        <InputEmailCustomer refMail={refMail} setMail={setMail} />
        <TextEditorTLKDDes
          title={"Mô tả khách hàng" as any}
          className={"1"}
          refDes={refDes}
          setrefDes={setrefDes}
        />
        <TextEditorND
          title={"Nội dung cuộc gọi" as any}
          className={"2"}
          setrefCall={setContentCall}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className={styles.form_group}
            style={{ flex: 1, padding: "4.5px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{ padding: "5px 5px", color: "#474747" }}
                className={styles.label}
              >
                Nhóm khách hàng cha
              </div>
            </div>
            <Select
              value={nhonkhachhang || "Chọn nhóm khách hàng"}
              onChange={(value) => handleSelectNhomCha(value)}
              // defaultValue={group_idFix}
              suffixIcon={
                <i
                  style={{ color: "black" }}
                  className="bi bi-caret-down-fill"
                ></i>
              }
              style={{
                width: "100%",
                // marginLeft: 5,
                border: "1px solid black",
                // borderRadius: "5px",
              }}
              showSearch
              filterOption={(input, option: any) =>
                option?.label.toLowerCase().includes(input.toLocaleLowerCase())
              }
              options={
                listGr &&
                listGr?.length > 0 && [
                  { value: 0, label: "Chọn nhóm khách hàng" },
                  ...listGr.map((item) => {
                    return {
                      value: item?.gr_id,
                      label: item?.gr_name,
                    };
                  }),
                ]
              }
            />
          </div>

          <div
            className={styles.form_group}
            style={{ flex: 1, padding: "4.5px" }}
          >
            <div style={{ padding: "5px 5px" }} className={styles.label}>
              Nhóm khách hàng con
            </div>
            <div className={stylePotentialSlect.customer_list}>
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  option?.label
                    .toLowerCase()
                    .includes(input.toLocaleLowerCase())
                }
                value={nhomCon || list_gr_child?.[0]?.gr_id || ""}
                onChange={(value) => {
                  setNhomCon(value);
                }}
                suffixIcon={
                  <i
                    style={{ color: "black" }}
                    className="bi bi-caret-down-fill"
                  ></i>
                }
                style={{
                  width: "100%",
                  border: "1px solid black",
                  //   borderRadius: "5px",
                }}
                options={
                  list_gr_child &&
                  list_gr_child?.length > 0 && [
                    ...list_gr_child.map((item) => {
                      return {
                        value: item?.gr_id,
                        label: item?.gr_name,
                      };
                    }),
                  ]
                }
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            <SelectBoxInput
              infoCus={""}
              dataOption={dataOptions[0]}
              title="Tình trạng khách hàng"
              placeholder="Chọn tình trạng khách hàng"
              settinhtrang={settinhtrang}
            />
          </div>
          <div style={{ flex: 1 }}>
            <SelectBoxInputNguon
              setnguon={setnguon}
              infoCus={""}
              dataOption={dataOptions[1]}
              title="Nguồn khách hàng"
              placeholder="Chọn nguồn khách hàng"
            />
          </div>
        </div>
      </div>

      <NewCalenderInput />

      <SaveBtnChat
        tinhtrang={tinhtrang}
        nguon={nguon}
        nhomcha={nhonkhachhang}
        nhomCon={nhomCon}
        phone={refPhone?.current?.value}
        name={name}
        email={refMail?.current?.value}
        desCription={refDes}
        refName={refName}
        content_call={content_call}
        handleOpenChatBody={handleOpenChatBody}
      />
    </div>
  );
}
