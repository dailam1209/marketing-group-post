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
export default function ChatBusinessBody({
  cusId,
  setContent,
  setDate,
  setCusId,
  setOpen,
  dataStatusCustomer,
  setStatus,
  fetchData,
  setResoure,
  datatable,
  nvPhuTrach,
  setnvPhuTrach,
  userNameCreate,
  setuserNameCreate,
  nhomCha,
  setnhomCha,
  nhomCon,
  setnhomCon,
  setDatatable,
  setloading,
  setgroup_id,
  setTimeEnd,
  setTimeStart,
  setdateS,
  setdateE,
  setTime_s,
  setTime_e,
  setemp_id,
  setIdNhom,
  nv,
  role,
  posId,
  listNV,
  nameNvNomor,
  listGr,
  listGr_Child,
  group_idFix,
  action,
}: any) {
  const [infoCus, setInfoCus] = useState<any>();

  let test1 = listGr.filter((item) => item.gr_id === group_idFix);
  let tes2 = listGr_Child.filter((item) => item.gr_id === group_idFix);
  useEffect(() => {
    if (test1 && test1[0]?.lists_child) {
      setnhomCha(group_idFix);
      setnhomCon(0);
    }
    if (tes2[0]?.group_parent) {
      setnhomCon(group_idFix);
      setnhomCha(tes2[0]?.group_parent);
    }
  }, []);
  const handleGetInfoCus = async () => {
    try {
      const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ cus_id: cusId }),
      });
      const data = await res.json();
      if (data && data?.data) setInfoCus(data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    handleGetInfoCus();
  }, [cusId]);
  // const [listGr, setListGr] = useState([]);
  const [list_gr_child, setlistGr_Child] = useState([]);

  useEffect(() => {}, []);
  const [idChaSaved, setidChaSaved] = useState<any>(-1);
  const checkCha = useSelector((state: any) => state?.auth?.ghimCha);
  const valueChaOld = useSelector((state: any) => state?.auth?.valueCha);
  const [valueSelectStatus, setValueSelectStatus] = useState<any>();
  const [valueResoure, sevalueResoure] = useState<any>();
  const [check, setCheck] = useState(false);

  const handlefilter = async () => {
    setDatatable([]);
    setloading(true);
    setOpen(false), await fetchData();
  };
  const handleChangeStt = (value: any) => {
    setValueSelectStatus(value);
    setStatus(value);
  };
  const handleChangeResource = (value: any) => {
    sevalueResoure(value);
    setResoure(value);
  };
  const handleChangeNVPT = (value: any) => {
    setemp_id(value);
  };
  const handleChangeNameCreate = (value: any) => {
    setuserNameCreate(value);
  };
  const router = useRouter();
  const currentTime = moment(); // Thời điểm hiện tại
  const pastTime = currentTime.subtract(2, "days");
  const dispatch = useDispatch();
  const handleGhimNhom = (e) => {
    dispatch(doGhimCha(e.target.checked));
  };
  useEffect(() => {
    if (checkCha) {
    }
  }, [idChaSaved]);

  const handleSelectNhomCha = (value) => {
    setnhomCha(value);
    dispatch(doSaveCha({ id: value }));
    setIdNhom(value);
    setnhomCon("Tất cả");
    setnhonkhachhang(value);
    if (value > 0) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const handleDateChangeEnd = (e) => {};

  let optionCon2;
  if (valueChaOld) {
    optionCon2 = [
      { value: " ", label: "Tất cả" },
      listGr_Child?.map((item: any, index) => {
        if (item.group_parent === (checkCha ? valueChaOld : nhomCha)) {
          return {
            value: item?.gr_id,
            label: item?.gr_name,
          };
        }
      }),
    ];
  }

  const getOptionC = () => {
    let defaultArr = [{ value: 0, label: "Tất cả" }];

    const newArrdefault = listGr_Child?.map((item) => {
      return {
        value: +item?.gr_id,
        label: item?.gr_name,
      };
    });
    const newArr = listGr_Child
      ?.filter((item: any, index) => {
        return item.group_parent === (checkCha ? valueChaOld : nhomCha);
      })
      ?.map((item) => {
        return {
          value: +item?.gr_id,
          label: item?.gr_name,
        };
      });

    if (nhomCha) {
      return [...defaultArr, ...newArr];
    } else {
      return newArrdefault;
    }
  };
  const [nhonkhachhang, setnhonkhachhang] = useState<any>();
  const [tinhtrang, settinhtrang] = useState<any>();
  const [nguon, setnguon] = useState<any>();
  const [name, setName] = useState<any>();
  const refName = useRef<any>();
  const refMail = useRef<any>();
  const refPhone = useRef<any>();
  const [refDes, setrefDes] = useState<any>();
  const [refCall, setrefCall] = useState<any>();

  const handleChangeInforCus = async () => {
    const handleClcikOptions = async () => {
      // update nhóm kh
      const url = `${base_url}/api/crm/customerdetails/editCustomer`;
      const formData = new FormData();
      formData.append("group_id", nhonkhachhang);
      formData.append("type", infoCus?.type);
      formData.append("cus_id", group_idFix);

      const headers = {
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      };

      const config = {
        method: "POST",
        headers: headers,
        body: formData,
      };
      try {
        const response = await fetch(url, config);
        const data = await response.json();
        if (data?.error) {
        }
      } catch (error) {
        console.error(error);
      }
    };

    // update tinh trang
    const updateTinhTrang = async () => {
      // update nhóm kh
      const url = `${base_url}/api/crm/customerdetails/editCustomer`;
      const formData = new FormData();
      formData.append("status", tinhtrang);
      formData.append("type", infoCus?.type);
      formData.append("cus_id", group_idFix);

      const headers = {
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      };

      const config = {
        method: "POST",
        headers: headers,
        body: formData,
      };
      try {
        const response = await fetch(url, config);
        const data = await response.json();
        if (data?.error) {
        }
      } catch (error) {
        console.error(error);
      }
    };

    // update tinh trang
    const updateNguon = async () => {
      // update nhóm kh
      const url = `${base_url}/api/crm/customerdetails/editCustomer`;
      const formData = new FormData();
      formData.append("resoure", nguon);
      formData.append("type", infoCus?.type);
      formData.append("cus_id", cusId);

      const headers = {
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      };

      const config = {
        method: "POST",
        headers: headers,
        body: formData,
      };
      try {
        const response = await fetch(url, config);
        const data = await response.json();
        if (data?.error) {
        }
      } catch (error) {
        console.error(error);
      }
    };

    // update tinh trang
    const updateName = async () => {
      // update nhóm kh
      const url = `${base_url}/api/crm/customerdetails/editCustomer`;
      const formData = new FormData();
      formData.append("name", refName?.current?.value);
      formData.append("type", infoCus?.type);
      formData.append("cus_id", cusId);

      const headers = {
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      };

      const config = {
        method: "POST",
        headers: headers,
        body: formData,
      };
      try {
        const response = await fetch(url, config);
        const data = await response.json();
        if (data?.error) {
        }
      } catch (error) {
        console.error(error);
      }
    };

    const updateMail = async () => {
      // update nhóm kh
      const url = `${base_url}/api/crm/customerdetails/editCustomer`;
      const formData = new FormData();
      formData.append("email", refMail?.current?.value);
      formData.append("type", infoCus?.type);
      formData.append("cus_id", cusId);

      const headers = {
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      };

      const config = {
        method: "POST",
        headers: headers,
        body: formData,
      };
      try {
        const response = await fetch(url, config);
        const data = await response.json();
        if (data?.error) {
        }
      } catch (error) {
        console.error(error);
      }
    };

    const updatePhone = async () => {
      // update nhóm kh
      const url = `${base_url}/api/crm/customerdetails/editCustomer`;
      const formData = new FormData();
      formData.append("phone_number", refPhone?.current?.value);
      formData.append("type", infoCus?.type);
      formData.append("cus_id", cusId);

      const headers = {
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      };

      const config = {
        method: "POST",
        headers: headers,
        body: formData,
      };
      try {
        const response = await fetch(url, config);
        const data = await response.json();
        if (data?.error) {
        }
      } catch (error) {
        console.error(error);
      }
    };

    const updateDes = async () => {
      // update nhóm kh
      const url = `${base_url}/api/crm/customerdetails/editCustomer`;
      const formData = new FormData();
      formData.append("description", refDes);
      formData.append("type", infoCus?.type);
      formData.append("cus_id", cusId);

      const headers = {
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      };

      const config = {
        method: "POST",
        headers: headers,
        body: formData,
      };
      try {
        const response = await fetch(url, config);
        const data = await response.json();
        if (data?.error) {
        }
      } catch (error) {
        console.error(error);
      }
    };

    const updatevalueHis = async () => {
      // update nhóm kh
      const url = `${base_url}/api/crm/customerdetails/editCustomer`;
      const formData = new FormData();
      formData.append("content_call", refCall);
      formData.append("type", infoCus?.type);
      formData.append("cus_id", cusId);

      const headers = {
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      };

      const config = {
        method: "POST",
        headers: headers,
        body: formData,
      };
      try {
        const response = await fetch(url, config);
        const data = await response.json();
        if (data?.error) {
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (refCall) {
      updatevalueHis();
    }
    if (nhonkhachhang) {
      handleClcikOptions();
    }
    if (tinhtrang) {
      updateTinhTrang();
    }
    if (nguon) {
      updateNguon();
    }
    if (refName?.current?.value) {
      updateName();
    }
    if (refMail?.current?.value) {
      updateMail();
    }
    if (refPhone?.current?.value) {
      updatePhone();
    }
    if (refDes) {
      updateDes();
    }
  };
  useEffect(() => {
    handleChangeInforCus();
  }, [action]);

  return (
    <div className={styles.business_assistant_body}>
      <div className={styles.form_business_assistant}>
        <InputPhone infoCus={infoCus} refPhone={refPhone} />
        <InputNameCustomer refName={refName} infoCus={infoCus} />
        <InputEmailCustomer infoCus={infoCus} refMail={refMail} />
        <TextEditor
          infoCus={infoCus}
          title={"Mô tả khách hàng" as any}
          className={"1"}
          refDes={refDes}
          setrefDes={setrefDes}
        />
        <TextEditorND
          infoCus={infoCus}
          title={"Nội dung cuộc gọi" as any}
          className={"2"}
          setContent={setContent}
          setDate={setDate}
          setrefCall={setrefCall}
        />

        <div className={styles.form_group}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{ padding: "5px 5px", color: "#474747" }}
              className={styles.label}
            >
              {" "}
              Nhóm khách hàng cha
            </div>
          </div>
          <Select
            value={nhomCha}
            onChange={(value) => handleSelectNhomCha(value)}
            // defaultValue={group_idFix}
            suffixIcon={
              <i
                style={{ color: "black" }}
                className="bi bi-caret-down-fill"
              ></i>
            }
            style={{
              width: "98%",
              marginLeft: 5,
              border: "1px solid black",
              height: 39,
            }}
            showSearch
            filterOption={(input, option: any) =>
              option?.label.toLowerCase().includes(input.toLocaleLowerCase())
            }
            options={[
              { value: -1, label: "Tất cả" },
              { value: -2, label: "Chưa cập nhật" },
              ...listGr?.map((item: any, index) => {
                if (item?.group_parent == 0) {
                  return {
                    value: +item?.gr_id,
                    label: item?.gr_name,
                  };
                }
              }),
            ]}
          ></Select>
        </div>

        <div className={styles.form_group}>
          <div style={{ padding: "13px 5px" }} className={styles.label}>
            Nhóm khách hàng con
          </div>
          <div className={stylePotentialSlect.customer_list}>
            <Select
              showSearch
              filterOption={(input, option: any) =>
                option?.label.toLowerCase().includes(input.toLocaleLowerCase())
              }
              value={nhomCon}
              onChange={(value) => {
                setnhomCon(value), setIdNhom(value);
                setnhonkhachhang(value);
              }}
              suffixIcon={
                <i
                  style={{ color: "black" }}
                  className="bi bi-caret-down-fill"
                ></i>
              }
              style={{
                width: "98%",
                marginLeft: 5,
                border: "1px solid black",
                height: 38.5,
                // borderRadius: 7,
              }}
              options={getOptionC()}
            >
              {/* <option value={""}>Tất cả</option>
              {listGr_Child?.map((item: any, index) => {
                if (item.group_parent === (checkCha ? valueChaOld : nhomCha)) {
                  return (
                    <option key={index} value={item?.gr_id}>
                      {item.gr_name}
                    </option>
                  );
                }
              })} */}
            </Select>
          </div>
        </div>
        <SelectBoxInput
          infoCus={infoCus}
          dataOption={dataOptions[0]}
          title="Tình trạng khách hàng"
          placeholder="Chọn tình trạng khách hàng"
          settinhtrang={settinhtrang}
        />
        <SelectBoxInputNguon
          setnguon={setnguon}
          infoCus={infoCus}
          dataOption={dataOptions[1]}
          title="Nguồn khách hàng"
          placeholder="Chọn nguồn khách hàng"
        />
      </div>

      <CalenderInput />

      {/* <SaveBtnChat 
      
      /> */}
    </div>
  );
}
