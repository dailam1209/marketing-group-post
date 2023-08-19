import Input_calender from "@/components/van-thu-luu-tru/components/Input/Input_calender/Input_calender";
import Input_select from "@/components/van-thu-luu-tru/components/Input/Input_select/Input_select";
import Section from "@/components/van-thu-luu-tru/components/Input/Section/Section";
import Table_header from "@/components/van-thu-luu-tru/components/tableheader/Table_header";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Accepted_status,
  Force_to_work_status,
  formatDate_ymd_to_dmy,
  NotAccepted_status,
  Received_status,
  Sended_status,
  Wait_com_accept,
  Wait_other_accept,
} from "../danh-sach-de-xuat";
import styles from "./absent_propose_list.module.css";
import Pagination from "@/components/van-thu-luu-tru/pagination/Pagination";
import {
  fetch_department,
  fetch_dxtype,
  fetch_employee,
} from "@/utils/api/dexuat/api_fetch";
import { fetch_absentAccount_list } from "@/utils/api/dexuat/api_fecth_cty";
import { formatDate_number_raw } from "../[id]";

const select_style = {
  control: (provided: any) => ({
    ...provided,
    height: "40px",
    borderRadius: "10px",
  }),
};
const propose_status_options = [
  { type: "active", value: "0", label: "Chờ xử lý" },
  { type: "active", value: "7", label: "Đã tiếp nhận" },
  { type: "active", value: "5", label: "Chấp thuận" },
  { type: "active", value: "3", label: "Từ chối" },
  { type: "active", value: "6", label: "Bắt buộc phải đi làm" },
];
const titles = [
  { label: "STT" },
  { label: "Tài khoản" },
  { label: "Thời gian tạo" },
  { label: "Trạng thái" },
];
export const Table_record = ({
  href,
  index,
  name,
  department,
  date,
  status,
  propose,
}: any) => {
  return (
    <a href={"/van-thu-luu-tru/trang-quan-ly-de-xuat/" + href} className={styles.link_record}>
      <div className={styles.tab_infor}>
        <p>{index}</p>
        <p className={styles.infor_name}>
          {name}&nbsp;
          <span>
            ({department ? department : "Chưa cập nhật"}){propose}
          </span>
        </p>
        <div className={styles.infor_date}>
          <span>{formatDate_number_raw(date)}</span>
        </div>
        <div className={styles.infor_btn}>
          {status === "0" && <Sended_status />}
          {status === "7" && <Received_status />}
          {status === "5" && <Accepted_status />}
          {status === "3" && <NotAccepted_status />}
          {status === "6" && <Force_to_work_status />}
          {status === "10" && <Wait_other_accept />}
          {status === "11" && <Wait_com_accept />}
        </div>
      </div>
    </a>
  );
};
const Index = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;
  const [filter_data, setFilter_data] = useState<any>({
    time_send_form: currentDate,
    time_send_to: currentDate,
  });
  const [department, setDepartment] = useState<any[]>();
  const [employee, setEmployee] = useState<any[]>();
  const [table_records, setTableRecords] = useState<any>();
  const [dxtype, setDxtype] = useState<any[]>();
  const [totalpage, setTotalpage] = useState();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchdata = async () => {
      const res_absentAccount_list = await fetch_absentAccount_list();
      const res_department = await fetch_department(token);
      const res_employee = await fetch_employee(token);
      const res_dxtype = await fetch_dxtype();
      setDepartment(res_department?.data.data);
      setEmployee(res_employee?.data.data);
      setDxtype(res_dxtype?.data.showcatedx);
      setTableRecords(res_absentAccount_list?.data.shownghi);
      setTotalpage(res_absentAccount_list?.data.totalPages);
    };
    fetchdata();
  }, []);
  const departmnet_options = department?.map((opts: any) => {
    return { value: opts.dep_id, label: opts.dep_name, name: "id_phong_ban" };
  });
  departmnet_options?.unshift({
    value: "",
    label: "Phòng ban (Tất cả)",
    name: "id_phong_ban",
  });
  const employee_options = employee
    ?.filter((emp) =>
      filter_data.id_phong_ban
        ? emp.dep_id[0] === filter_data.id_phong_ban
        : emp
    )
    .map((opts: any) => {
      return {
        value: opts.idQLC,
        label: `(${opts.idQLC}) ${opts.userName}`,
        name: "id_user",
      };
    });

  employee_options?.unshift({value: '', label: 'Chọn người nhận đề xuất (Tất cả)', name:'id_user'})
  const propose_types_options = dxtype?.map((type: any) => {
    return { name: "loai_de_xuat", value: type._id, label: type.name_cate_dx };
  });
  propose_types_options?.unshift({
    value: "",
    label: "Chọn loaị đề xuất",
    name: "loai_de_xuat",
  });
  const handlePageChange = async (e: any) => {
    const response = await fetch_absentAccount_list({ page: e.selected + 1 });
    setTableRecords(response?.data.data);
  };
  const handleSubmitFilter = async (e: any) => {
    e.preventDefault();
    const form_data = new FormData();
    for (var key in filter_data) {
      form_data.append(key, filter_data[key]);
    }
    const response = await fetch_absentAccount_list(form_data);
    setTableRecords(response?.data.data);
  };
  const handleSelectChange = (e: any) => {
    const { type, value } = e;
    setFilter_data((prevFormData: any) => ({
      ...prevFormData,
      [type]: value,
    }));
  };
  const handleCalenderChagne = (e: any) => {
    const { name, value } = e.target;
    setFilter_data((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.filter_area_box}>
          <form>
            <div className={styles.filter_area_list}>
              <Section
                style="filter_area_36_2"
                input={
                  <Input_select
                    options={departmnet_options}
                    defautlValue={
                      departmnet_options
                        ? departmnet_options[0]
                        : "Chọn phòng ban"
                    }
                    className="filter_area"
                    style={select_style}
                    onChange={handleSelectChange}
                  />
                }
              />
              <Section
                style="filter_area_36_2"
                input={
                  <Input_select
                    options={employee_options}
                    placeholder="Chọn ID, tên nhân viên"
                    className="filter_area"
                    style={select_style}
                    onChange={handleSelectChange}
                  />
                }
              />
              <Section
                style="filter_area_23_5"
                input={
                  <Input_select
                    options={propose_types_options}
                    placeholder="Chọn loại đề xuất"
                    className="filter_area"
                    style={select_style}
                    onChange={handleSelectChange}
                  />
                }
              />
            </div>
            <div className={styles.filter_area_list}>
              <Section
                style="filter_area_24"
                input={
                  <Input_select
                    options={propose_status_options}
                    placeholder="Trạng thái đề xuất"
                    className="filter_area"
                    style={select_style}
                    onChange={handleSelectChange}
                  />
                }
              />
              <Section
                style="filter_area_24"
                input={
                  <Input_calender
                    placeholder={currentDate}
                    datetype="date"
                    calender_class="filter_area"
                    calender_label_class="filter_area_label"
                    handle_input={handleCalenderChagne}
                    input_name="time_send_form"
                  />
                }
              />
              <Section
                style="filter_area_24"
                input={
                  <Input_calender
                    placeholder={currentDate}
                    datetype="date"
                    calender_class="filter_area"
                    calender_label_class="filter_area_label"
                    handle_input={handleCalenderChagne}
                    input_name="time_send_to"
                  />
                }
              />
              <div className={styles.filter_area_24}>
                <button onClick={handleSubmitFilter} className={styles.top_btn}>
                  <Image
                    className={styles.search_icon}
                    alt=""
                    src="/icon/icon_search_white.png"
                    width={17}
                    height={17}
                  />
                  <span>Tìm kiếm</span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.box_list}>
          <div className={styles.list_tab}>
            <Table_header
              containerClassName="propose_list_header_container"
              titles={titles}
              className="propose_list"
            />
            <div className={styles.tab_content}>
              <div className={styles.tab_items}>
                {table_records?.map((record: any, index: any) => {
                  return (
                    <Table_record
                      key={index}
                      index={index + 1}
                      name={record.name_user}
                      propose={record.name_dx}
                      department={record.department}
                      date={record.time_create}
                      status={record.type_duyet}
                      href={record._id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination totalPages={totalpage} handlePageChange={handlePageChange} />
    </div>
  );
};

export default Index;
