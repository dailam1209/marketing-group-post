import React, { useEffect, useState } from "react";
import { Input, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import styles from "./customer.module.css";
import stylePotentialSlect from "@/components/crm/potential/potential.module.css";
import PotentialSelectBoxStep from "../potential/potential_steps/select_box_step";
import moment from "moment";
import { CaretDownOutlined, DownCircleTwoTone } from "@ant-design/icons";
import { Router, useRouter } from "next/router";
import { base_url } from "../service/function";
import Cookies from "js-cookie";
import { tr } from "date-fns/locale";
import { useSelector } from "react-redux";
import { doGhimCha, doSaveCha } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const format = "HH:mm";

interface PropsComponent {
  setOpen: any;
  dataStatusCustomer: any;
  setStatus: any;
  fetchData: any;
  setResoure: any;
  datatable: any;
  nvPhuTrach: any;
  setnvPhuTrach: any;
  userNameCreate: any;
  setuserNameCreate: any;
  nhomCha: any;
  setnhomCha: any;
  nhomCon: any;
  setnhomCon: any;
  setDatatable: any;
  setloading: any;
  setgroup_id: any;
  setTimeEnd: any;
  setTimeStart: any;
  setdateS: any;
  setdateE: any;
  setTime_s: any;
  setTime_e: any;
  setemp_id: any;
  setIdNhom: any;
  nv: any;
  role: any;
  posId: any;
  listNV: any;
  nameNvNomor: any;
  listGr: any;
  listGr_Child?: any;
}

const CustomerListFilterBox: React.FC<PropsComponent> = ({
  setOpen,
  dataStatusCustomer,
  setStatus,
  fetchData,
  setResoure,
  datatable,
  nvPhuTrach,
  setnvPhuTrach,
  setuserNameCreate,
  userNameCreate,
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
  setemp_id,
  setIdNhom,
  nv,
  role,
  posId,
  listNV,
  nameNvNomor,
  listGr,
  listGr_Child,
}) => {
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
  
  const [idChaSaved, setidChaSaved] = useState<any>(-1);
  const checkCha = useSelector((state: any) => state?.auth?.ghimCha);
  const valueChaOld = useSelector((state: any) => state?.auth?.valueCha);

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
    if (value > 0) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const handleTimeEndChange = (time, timeString) => {
    if (timeString) {
      setTimeEnd(timeString + ":00");
    }
  };
  const handleTimeStartChange = (time, timeString) => {
    if (timeString) {
      setTimeStart(timeString + ":00");
    }
  };
  const handleDateChangeStart = (e) => {
    setdateS(e.target.value);
  };
  const handleDateChangeEnd = (e) => {
    setdateE(e.target.value);
  };

 
  const optionTest =
    role == "2" && posId !== 2
      ? [
          { value: null, label: "Tất cả" },
          ...nv?.map((userName, index) => {
            return {
              value: userName?.ep_id,
              label:
                `(${userName.ep_id})` +
                " " +
                userName?.ep_name +
                " " +
                userName.dep_name,
            };
          }),
        ]
      : role == "1"
      ? [
          { value: null, label: "Tất cả" },
          ...listNV?.map((userName, index) => {
            return {
              value: userName?.ep_id,
              label:
                `(${userName.ep_id})` +
                " " +
                userName?.ep_name +
                " " +
                userName.dep_name,
            };
          }),
        ]
      : [
          [nameNvNomor]?.map((userName, index) => {
            return {
              value: userName?.ep_id,
              label:
                `(${userName._id})` +
                " " +
                userName?.userName +
                " " +
                userName.nameDeparment,
            };
          }),
        ];
  
  {
    role == "2" &&
      posId == 2 &&
      [nameNvNomor]?.map((userName, index) => (
        <option
          style={{ width: "100%" }}
          key={index}
          value={userName?._id as any}
        >
          <div style={{ display: "block" }}>
            ( {`${userName._id}`}) {`${userName?.userName}`} <br /> -
            {`${userName.nameDeparment}`}
          </div>
        </option>
      ));
  }
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
  let optionCon:any = []
  const getOptionC = () => {
    let defaultArr = [{ value: "", label: "Tất cả" }];
    const newArr = listGr_Child
      ?.filter((item: any, index) => {
        return item.group_parent === (checkCha ? valueChaOld : nhomCha);
      })
      ?.map((item) => {
        return {
          value: item?.gr_id,
          label: item?.gr_name,
        };
      });

    if (newArr !== undefined && newArr && newArr?.length > 0) {
      return [...defaultArr, ...newArr];
    }
    optionCon = defaultArr;
  };
  return (
    <>
      <div
        className={styles.mdal_body}
        style={{ padding: 0, maxHeight: "100%" }}
      >
        <div className={styles.form_group}>
          <div className={styles.label}>Thời gian tạo khách hàng</div>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <TimePicker
                onChange={handleTimeStartChange}
                style={{ width: "100%", height: "37px" }}
                defaultValue={dayjs("12:00", format)}
                format={format}
              />
            </div>
            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={styles.box_input}
                style={{ width: "100%", marginBottom: "5px", paddingLeft: 10 }}
              >
                <Input
                  onChange={handleDateChangeStart}
                  type="date"
                  defaultValue={pastTime.format("YYYY-MM-DD")}
                />
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <TimePicker
                onChange={handleTimeEndChange}
                style={{ width: "100%", height: "37px" }}
                defaultValue={dayjs("00:00", format)}
                format={format}
              />
            </div>
            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={styles.box_input}
                style={{ width: "100%", marginBottom: "5px", paddingLeft: 10 }}
              >
                <Input onChange={handleDateChangeEnd} type="date" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Tình trạng khách hàng</div>
          <Select
            suffixIcon={
              <i
                style={{ color: "black" }}
                className="bi bi-caret-down-fill"
              ></i>
            }
            style={{
              width: "100%",
              border: "1px solid black",
              borderRadius: 7,
            }}
            onChange={handleChangeStt}
            defaultValue={""}
            value={valueSelectStatus}
          >
            <option value={""}>Tất cả</option>
            {dataStatusCustomer &&
              dataStatusCustomer.map((item, index) => {
                return (
                  <option key={index} value={item?.stt_id}>
                    {item?.stt_name}
                  </option>
                );
              })}
          </Select>
        </div>
        <div className={styles.form_group}>
          <div className={styles.label}>Nguồn khách hàng</div>
          <Select
            defaultValue={""}
            suffixIcon={
              <i
                style={{ color: "black" }}
                className="bi bi-caret-down-fill"
              ></i>
            }
            style={{
              width: "100%",
              border: "1px solid black",
              borderRadius: 7,
            }}
            value={valueResoure}
            onChange={handleChangeResource}
          >
            <option value={""}>Tất cả</option>
            <option value={1}>{" Facebook"}</option>
            <option value={2}>{" Zalo"}</option>
            <option value={3}>{" Website"}</option>
            <option value={4}>{" Dữ liệu bên thứ 3"}</option>
            <option value={5}>{" Khách hàng giới thiệu"}</option>
            <option value={6}>{" Giới thiệu"}</option>
            <option value={7}>{" Chăm sóc khách hàng"}</option>
            <option value={8}>{" Email"}</option>
          </Select>
        </div>

        <div className={styles.form_group}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={styles.label}>Nhóm khách hàng cha</div>
            <div
              className={styles.label}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="checkbox"
                id="group_pins"
                style={{ marginRight: 5 }}
                // defaultValue={420}
                checked={checkCha}
                onChange={(e: any) => handleGhimNhom(e)}
              />{" "}
              Ghim nhóm
            </div>
          </div>
          <Select
            value={checkCha ? +valueChaOld : nhomCha}
            onChange={(value) => handleSelectNhomCha(value)}
            defaultValue={-1}
            suffixIcon={
              <i
                style={{ color: "black" }}
                className="bi bi-caret-down-fill"
              ></i>
            }
            style={{
              width: "100%",
              border: "1px solid black",
              borderRadius: 7,
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
                    // <option key={index} value={item?.gr_id}>
                    //   {item.gr_name}
                    // </option>
                    value: item?.gr_id,
                    label: item?.gr_name,
                  };
                }
              }),
            ]}
          >
          
          </Select>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhóm khách hàng con</div>
          <div className={stylePotentialSlect.customer_list}>
            <Select
              showSearch
              filterOption={(input, option: any) =>
                option?.label.toLowerCase().includes(input.toLocaleLowerCase())
              }
              value={nhomCon}
              onChange={(value) => {
                setnhomCon(value), setIdNhom(value);
              }}
              defaultValue={""}
              suffixIcon={
                <i
                  style={{ color: "black" }}
                  className="bi bi-caret-down-fill"
                ></i>
              }
              style={{
                width: "100%",
                border: "1px solid black",
                borderRadius: 7,
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

        <div className={styles.form_group}>
          <div className={styles.label}>Nhân viên phụ trách</div>
          <div className={stylePotentialSlect.customer_list}>
            <Select
              showSearch
              options={optionTest}
              filterOption={(input, option: any) =>
                option?.label.toLowerCase().includes(input.toLocaleLowerCase())
              }
              defaultValue={"Tất cả"}
              suffixIcon={
                <i
                  style={{ color: "black" }}
                  className="bi bi-caret-down-fill"
                ></i>
              }
              style={{
                width: "100%",
                border: "1px solid black",
                borderRadius: 7,
              }}
              value={nvPhuTrach}
              onChange={handleChangeNVPT}
            ></Select>
          </div>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhân viên tạo khách hàng</div>
          <div className={stylePotentialSlect.customer_list}>
            <Select
              defaultValue={"Tất cả"}
              suffixIcon={
                <i
                  style={{ color: "black" }}
                  className="bi bi-caret-down-fill"
                ></i>
              }
              style={{
                width: "100%",
                border: "1px solid black",
                borderRadius: 7,
              }}
              value={userNameCreate}
              onChange={handleChangeNameCreate}
            >
              {datatable?.map((item, index) => {
                if (item?.userNameCreate) {
                  return (
                    <option key={index} value={item?.userNameCreate}>
                      {item?.userNameCreate}
                    </option>
                  );
                }
              })}
            </Select>
          </div>
        </div>
      </div>
      <div className={styles.mdal_footer}>
        <button
          type="button"
          className={styles.btn_cancel}
          data-dismiss="modal"
          onClick={() => {
            setOpen(false), router.push("/crm/customer/list");
          }}
        >
          Hủy lọc
        </button>
        <button
          onClick={async () => {
            handlefilter();
          }}
          type="submit"
          className={styles.btn_apply}
        >
          Áp dụng
        </button>
      </div>
    </>
  );
};

export default CustomerListFilterBox;
