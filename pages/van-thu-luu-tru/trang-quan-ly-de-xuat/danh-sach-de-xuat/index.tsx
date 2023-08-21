import Input_calender from "@/components/van-thu-luu-tru/components/Input/Input_calender/Input_calender";
import Input_select from "@/components/van-thu-luu-tru/components/Input/Input_select/Input_select";
import Section from "@/components/van-thu-luu-tru/components/Input/Section/Section";
import Table_header from "@/components/van-thu-luu-tru/components/tableheader/Table_header";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./propose_list.module.css";
import Pagination from "@/components/van-thu-luu-tru/pagination/Pagination";
import {
  fetch_department,
  fetch_dxtype,
  fetch_employee,
} from "@/utils/api/dexuat/api_fetch";
import { fetch_propose_list } from "@/utils/api/dexuat/api_fecth_cty";
import { formatDate_number_raw } from "../[id]";

export function formatDate_ymd_to_dmy(inputDate: any) {
  const dateObj = new Date(inputDate);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedYear = `${year}`;
  const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`;
  return formattedDate;
}
const propose_status_options = [
  { name: "active", value: "0", label: "Chờ xử lý" },
  { name: "active", value: "7", label: "Đã tiếp nhận" },
  { name: "active", value: "5", label: "Chấp thuận" },
  { name: "active", value: "3", label: "Từ chối" },
  { name: "active", value: "6", label: "Bắt buộc phải đi làm" },
];
const titles = [
  { label: "STT" },
  { label: "Đề xuất" },
  { label: "Thời gian" },
  { label: "Trạng thái" },
];
export const Sended_status = () => {
  return (
    <>
      <div style={{ marginRight: "5px" }}>
        <Image src="/icon/dexuat_luunhap.png" alt="" width={10} height={10} />
      </div>
      <span>Đã gửi</span>
    </>
  );
};
export const Accepted_status = () => {
  return (
    <>
      <div style={{ marginRight: "5px" }}>
        <Image src="/icon/dexuat_hoatdong.png" alt="" width={10} height={10} />
      </div>
      <span>Chấp thuận</span>
    </>
  );
};
export const NotAccepted_status = () => {
  return (
    <>
      <div style={{ marginRight: "5px" }}>
        <Image
          src="/icon/dexuat_kohoatdong.png"
          alt=""
          width={10}
          height={10}
        />
      </div>
      <span>Đã từ chối</span>
    </>
  );
};
export const Received_status = () => {
  return (
    <>
      <div style={{ marginRight: "5px" }}>
        <Image src="/icon/dexuat_dangcho.png" alt="" width={10} height={10} />
      </div>
      <span>Đã tiếp nhận</span>
    </>
  );
};
export const Wait_other_accept = () => {
  return (
    <>
      <div style={{ marginRight: "5px" }}>
        <Image src="/icon/dexuat_dangcho.png" alt="" width={10} height={10} />
      </div>
      <span>Chờ lãnh đạo còn lại duyệt</span>
    </>
  );
};
export const Wait_com_accept = () => {
  return (
    <>
      <div style={{ marginRight: "5px" }}>
        <Image src="/icon/dexuat_dangcho.png" alt="" width={10} height={10} />
      </div>
      <span>Chờ công ty duyệt</span>
    </>
  );
};
export const Force_to_work_status = () => {
  return (
    <>
      <div style={{ marginRight: "5px" }}>
        <Image src="/icon/dexuat_dangcho.png" alt="" width={10} height={10} />
      </div>
      <span>Bắt buộc phải đi làm</span>
    </>
  );
};
export const Table_record = ({
  href,
  index,
  name,
  department,
  propose,
  date,
  status,
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
  const [filter_data, setFilter_data] = useState<any>({});
  const [department, setDepartment] = useState<any[]>();
  const [employee, setEmployee] = useState<any[]>();
  const [dxtype, setDxtype] = useState<any[]>();
  const [table_records, setTableRecords] = useState<any>();
  const [totalpage, setTotalpage] = useState();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchdata = async () => {
      const res_propose_list = await fetch_propose_list();
      const res_department = await fetch_department(token);
      const res_employee = await fetch_employee(token);
      const res_dxtype = await fetch_dxtype();
      setDepartment(res_department?.data.items);
      setEmployee(res_employee?.data.data);
      setTableRecords(res_propose_list?.data.data);
      setTotalpage(res_propose_list?.data.totalPages);
      setDxtype(res_dxtype?.data.showcatedx);
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
  const select_style = {
    control: (provided: any) => ({
      ...provided,
      height: "40px",
      borderRadius: "10px",
    }),
  };
  const propose_types_options = dxtype?.map((type: any) => {
    return { name: "loai_de_xuat", value: type._id, label: type.name_cate_dx };
  });
  propose_types_options?.unshift({
    value: "",
    label: "Chọn loaị đề xuất",
    name: "loai_de_xuat",
  });
  const handlePageChange = async (e: any) => {
    const response = await fetch_propose_list({ page: e.selected + 1 });
    setTableRecords(response?.data.data);
  };
  const handleSubmitFilter = async (e: any) => {
    e.preventDefault();
    const form_data = new FormData();
    for (var key in filter_data) {
      form_data.append(key, filter_data[key]);
    }
    const response = await fetch_propose_list(form_data);
    setTableRecords(response?.data.data);
  };
  const handleSelectChange = (e: any) => {
    const { type, name, value } = e;
    setFilter_data((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCalenderChagne = (e: any) => {
    const { name, value } = e.target;
    setFilter_data((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  // useEffect(() => {
  //   console.log(filter_data);
  // }, [filter_data]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.filter_area_box}>
            <form className={styles.form}>
              <div className={styles.filter_area_list}>
                <Section
                  style="filter_area_33"
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
                      placeholder="Chọn phòng ban"
                    />
                  }
                />
                <Section
                  style="filter_area_33"
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
                  style="filter_area_33"
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
                      placeholder="Từ ngày"
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
                      placeholder="Đến ngày"
                      datetype="date"
                      calender_class="filter_area"
                      calender_label_class="filter_area_label"
                      handle_input={handleCalenderChagne}
                      input_name="time_send_to"
                    />
                  }
                />
                <div className={styles.filter_area_24}>
                  <button
                    onClick={handleSubmitFilter}
                    className={styles.top_btn}
                  >
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
                        department={record.department}
                        propose={record.name_dx}
                        date={record.time_create}
                        status={record.type_duyet.toString()}
                        href={record._id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          totalPages={totalpage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Index;
