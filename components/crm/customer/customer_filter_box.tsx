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
import { cookies } from "next/headers";

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
  setTime_s:any;
  setTime_e:any;
  setemp_id:any
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
  setTime_s,
  setTime_e,
  setemp_id
}) => {
  const [valueSelectStatus, setValueSelectStatus] = useState<any>();
  const [valueResoure, sevalueResoure] = useState<any>();
  const [listGr_Child, setlistGr_Child] = useState([]);
  const [check, setCheck] = useState(false);
  const uniqueUserNames = Array.from(
    new Set(datatable?.map((item) => item.userName))
  );
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

  const [listGr, setListGr] = useState([]);
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
      data?.data?.map((item) => {
        item?.lists_child.map((item) => {
          arr.push(item);
        });
        setlistGr_Child(arr);
      });
    } catch (error) {
      console.log("error:", error);
    }
  };
  const [listNV, setLishNv] = useState<any>();
  const [dep_id, setDep_id] = useState();
  useEffect(() => {
    handleGetGr();
  }, []);
  const handleGetInfoCus = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDaGFtY29uZzM2NS1UaW12aWVjMzY1IiwiaWF0IjoxNjkzMjAwODYwLCJleHAiOjE2OTMyODcyNjAsImRhdGEiOnsiaWQiOiI1NjM1IiwibmFtZSI6Ik5ndXlcdTFlYzVuIFRoXHUxZWNiIFBoXHUwMWIwXHUwMWExbmcgVGhcdTFlYTNvICIsInR5cGUiOjEsImVtYWlsIjoiYmVleGw0MTVAZ21haWwuY29tIiwicGhvbmVfdGsiOm51bGwsInJvbGUiOiIzIiwib3MiOjIsImZyb20iOiJxbGMzNjUiLCJkZXZpY2VfaWQiOiIyNTAxMDA2NDY0NTM3MzYxMTYwMDA1MzczNjU4NjQxNTM2MjQiLCJjb21faWQiOiIzMzEyIiwiY29tX25hbWUiOiJDXHUwMGQ0TkcgVFkgQ1x1MWVkNCBQSFx1MWVhNk4gVEhBTkggVE9cdTAwYzFOIEhcdTAxYWZORyBIXHUwMGMwICJ9fQ.f6tvLnNB0cj9zQt_SMlOoFzYSyXFCf4fnJEO7ZPKlW0`,
          },
          body: JSON.stringify({ dep_id: dep_id }),
        }
      );
      const data = await res.json();
      if (data && data?.data) setLishNv(data?.data?.items);
    } catch (error) {}
  };
  const handleGetInfoCusNV = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/employee/info`,
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
      if (data && data?.data) setDep_id(data?.data?.data?.dep_id);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetInfoCus();
    handleGetInfoCusNV();
  }, []);
  const handleSelectNhomCha = (value) => {
    setnhomCha(value);
    if (value > 0) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };
  const handleTimeEndChange = (time, timeString) => {
    if(timeString){
      setTimeEnd(timeString + ":00");

    }
  };
  const handleTimeStartChange = (time, timeString) => {
    if(timeString ){
    setTimeStart(timeString + ":00")}
  };
  const handleDateChangeStart = (e) => {
 
      setdateS(e.target.value);
 
  };
  const handleDateChangeEnd = (e) => {
 
      setdateE(e.target.value);

   
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
                style={{ width: "100%", marginBottom: "5px" }}
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
                style={{ width: "100%", marginBottom: "5px" }}
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
                checked={check}
                id="group_pins"
                data-status={0}
                style={{ marginRight: 5 }}
                defaultValue={420}
              />{" "}
              Ghim nhóm
            </div>
          </div>
          <Select
            value={nhomCha}
            onChange={(value) => handleSelectNhomCha(value)}
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
          >
            {" "}
            <option value={""}>Tất cả</option>
            <option value={0}>Chưa cập nhật</option>
            {listGr?.map((item: any, index) => {
              if (item?.group_parent == 0) {
                return (
                  <option key={index} value={item?.gr_id}>
                    {item.gr_name}
                  </option>
                );
              }
            })}
          </Select>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhóm khách hàng con</div>
          <div className={stylePotentialSlect.customer_list}>
            <Select
              value={nhomCon}
              onChange={(value) => setnhomCon(value)}
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
            >
              <option value={""}>Tất cả</option>
              {check
                ? listGr_Child?.map((item: any, index) => {
                    if (item.group_parent === nhomCha) {
                      return (
                        <option key={index} value={item?.gr_id}>
                          {item.gr_name}
                        </option>
                      );
                    }
                  })
                : listGr?.map((item: any, index) => {
                    if (item?.group_parent == 0) {
                      return (
                        <option key={index} value={item?.gr_id}>
                          {item.gr_name}
                        </option>
                      );
                    }
                  })}
            </Select>
          </div>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhân viên phụ trách</div>
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
              value={nvPhuTrach}
              onChange={handleChangeNVPT}
            >
              {listNV?.map((userName, index) => (
                <option
                  style={{ width: "100%" }}
                  key={index}
                  value={userName.ep_id as any}
                >
                  <div style={{ display: "block" }}>
                    ( {`${userName.ep_id}`}) {`${userName?.ep_name}`} <br /> -
                    {`${userName.nameDeparment}`}
                  </div>
                </option>
              ))}
            </Select>
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
