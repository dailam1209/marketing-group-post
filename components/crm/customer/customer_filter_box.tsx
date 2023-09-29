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
  setIsApDung?: any;
  setIsOpenFilterBox?: any;
  isOpenFilterBox?: any;
  keyword;
  status;
  resoure;
  user_create_id;
  emp_id;
  group_id;
  time_s;
  time_e;
  page;
  idNhom;
  nameFill;
  name;
  
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
  setIsApDung,
  setTime_s,
  setIsOpenFilterBox,
  isOpenFilterBox,
  page,
  keyword,
  status,
  resoure,
  user_create_id,
  emp_id,
  group_id,
  time_s,
  time_e,
  idNhom,
  nameFill,
  name,
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

  useEffect(() => {
    if (isOpenFilterBox) {
      setTimeStart("00:00:00");
      setTime_s("00:00:00 " + pastTime.format("YYYY-MM-DD"));
      setdateS(pastTime.format("YYYY-MM-DD"));
      setTimeEnd("00:00:00");
    }
  }, []);

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
    role == "2" && [20, 4, 12, 13, 10, 11, 5, 6].includes(posId)
      ? [
          { value: null, label: "Tất cả" },
          ...nv?.map((userName, index) => {
            return {
              value: userName?.ep_id,
              label: `(${userName.ep_id}) ${userName?.ep_name} - ${userName.dep_name}`,
            };
          }),
        ]
      : role == "1" ||
        (role == "2" && [7, 8, 14, 16, 22, 21, 18, 19, 17].includes(posId)) // Nếu là công ty hoặc tài khoản nhân viên cấp giám đốc (7, 8, 14, 16, 22,21 ,18,19,17)
      ? [
          { value: null, label: "Tất cả" },
          ...listNV?.map((userName, index) => {
            return {
              value: userName?.ep_id,
              label: `(${userName.ep_id}) ${userName?.ep_name} - ${userName.dep_name}`,
            };
          }),
        ]
      : [
          [nameNvNomor]?.map((userName, index) => {
            return {
              value: userName?.ep_id,
              label:
                `(${userName?._id})` +
                " " +
                userName?.userName +
                " " +
                userName?.nameDeparment,
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
  const idnhomcha = listGr_Child?.filter(
    (item) => item?.gr_id === Number(idNhom)
  )[0]?.group_parent;

  let optionCon2;
  if (valueChaOld) {
    optionCon2 = [
      { value: " ", label: "Tất cả" },
      listGr_Child?.map((item: any, index) => {
        if (
          item.group_parent ===
          (checkCha ? valueChaOld : idnhomcha || Number(idNhom) || nhomCha)
        ) {
          return {
            value: item?.gr_id,
            label: item?.gr_name,
          };
        }
      }),
    ];
  }

  let optionCon: any = [];
  const getOptionC = () => {
    let defaultArr = [{ value: "", label: "Tất cả" }];
    const newArr = listGr_Child
      ?.filter((item: any, index) => {
        return (
          item.group_parent ===
          (checkCha ? valueChaOld : idnhomcha || Number(idNhom) || nhomCha)
        );
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

  const starttime = router.query.start?.toString();

  const parsedValue = dayjs(starttime);
  const timeValuestart = parsedValue.format("HH:mm");

  const endtime = router.query.end?.toString();
  const parsedValueend = dayjs(endtime);
  const timeValueEnd = parsedValueend.format("HH:mm");


  const dateEndUrl = dayjs(endtime).format("YYYY-MM-DD");
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
                defaultValue={
                  router.query.end
                    ? dayjs(timeValuestart, format)
                    : dayjs("00:00", format)
                }
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
                defaultValue={
                  router.query.end
                    ? dayjs(timeValueEnd, format)
                    : dayjs("00:00", format)
                }
                format={format}
              />
            </div>
            <div className={`${styles["col-lg-6"]}`}>
              <div
                className={styles.box_input}
                style={{ width: "100%", marginBottom: "5px", paddingLeft: 10 }}
              >
                <Input
                  defaultValue={dateEndUrl}
                  onChange={handleDateChangeEnd}
                  type="date"
                />
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
            defaultValue={Number(status) ? Number(status) : ""}
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
            defaultValue={Number(resoure) ? Number(resoure) : ""}
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
            defaultValue={idnhomcha ? idnhomcha : Number(idNhom) || -1}
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
          ></Select>
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
              defaultValue={idnhomcha ? Number(idNhom) : "" || ""}
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
            setOpen(false), router.push("/customer/list");
            setIsOpenFilterBox(false);
            setIsApDung(false);
          }}
        >
          Hủy lọc
        </button>
        <button
          onClick={async () => {
            handlefilter();
            setIsApDung(true);

            router.push(
              `/customer/list?${time_s ? `&start=${time_s}` : ""}${
                time_e ? `&end=${time_e}` : ""
              }${status ? `&status=${status}` : ""}${
                resoure ? `&source=${resoure}` : ""
              }${idNhom ? `&group=${idNhom}` : ""}${
                emp_id ? `&emp_id=${emp_id}` : ""
              }${user_create_id ? `&creater=${user_create_id}` : ""}${
                name ? `&keyword=${name}` : ""
              }  
`
            );
          }}
          type="button"
          className={styles.btn_apply}
        >
          Áp dụng
        </button>
      </div>
    </>
  );
};

export default CustomerListFilterBox;
