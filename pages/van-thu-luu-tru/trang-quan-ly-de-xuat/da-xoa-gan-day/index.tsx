import Pagination from "@/components/van-thu-luu-tru/pagination/Pagination";
import Input_calender from "@/components/van-thu-luu-tru/components/Input/Input_calender/Input_calender";
import Input_select from "@/components/van-thu-luu-tru/components/Input/Input_select/Input_select";
import Section from "@/components/van-thu-luu-tru/components/Input/Section/Section";
import { select_style } from "@/pages/van-thu-luu-tru/trang-chu-quan-ly-cong-van/cai-dat-quan-ly-cong-van";
import { fetch_propose_list } from "@/utils/api/dexuat/api_fecth_cty";
import { fetch_deleted_propose, fetch_department, fetch_dxtype } from "@/utils/api/dexuat/api_fetch";
import { post_deletedx } from "@/utils/api/dexuat/api_post";
import { fetch_employee } from "@/utils/ShareApi";
import Image from "next/image";
import { userAgent } from "next/server";
import React, { ChangeEvent, createRef, useEffect, useState } from "react";
import { Accepted_status, Force_to_work_status, NotAccepted_status, Received_status, Sended_status, Wait_com_accept, Wait_other_accept } from "../danh-sach-de-xuat";
import { formatDate_number_raw } from "../[id]";
import styles from './recent_delete.module.css';

const propose_status_options = [
  { name: "active", value: "0", label: "Chờ xử lý" },
  { name: "active", value: "7", label: "Đã tiếp nhận" },
  { name: "active", value: "5", label: "Chấp thuận" },
  { name: "active", value: "3", label: "Từ chối" },
  { name: "active", value: "6", label: "Bắt buộc phải đi làm" },
];
const Table = ({idList,addId,handleCheckAll,handleDelete,table_records}:any) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = (e: any) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      handleCheckAll(
        table_records?.map((rec: any) => rec._id.toString())
      );
    } else {
      handleCheckAll([]);
    }
  };
  return (
    <div className={styles.box_list}>
      <div className={styles.list_tab}>
        <ul className={styles.tab}>
          <div className={styles.hd_dx_del}>
            <p className={styles.txt_hd_del1}>
              Danh sách đề xuất đã xóa gần đây
            </p>
            <div className={styles.btn_group}>
              {idList?.length > 0 && <>
                <p onClick={()=>handleDelete(2)} className={styles.txt_hd_del4}>Khôi phục</p>
                <p onClick={()=>handleDelete(1)} className={styles.txt_hd_del3}>Xóa vĩnh viễn</p>
              </>}
              <label htmlFor='all' className={styles.txt_hd_del2}>
                  <input
                    id='all'
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                    style={{display: 'none'}}
                  />
                Chọn tất cả
              </label>
            </div>
          </div>
          <div className={styles.hd_dx_del2}>
            <li className={styles.list_item}>Đề xuất</li>
            <li className={styles.list_item}>Thời gian tạo</li>
            <li className={styles.list_item}>Trạng thái</li>
          </div>
        </ul>
        <div className={styles.tab_content}>
          <div className={styles.tab_item}>
          {table_records?.map((record:any, index:any) => {
            return(
              <a key={index} href={"/van-thu-luu-tru/trang-quan-ly-de-xuat/" + record._id} className={styles.link_record}>
                <div className={styles.tab_infor}>
                  <p className={styles.infor_name}>
                    {record.name_user}&nbsp;
                    <span>
                      ({record.department ? record.department : 'Chưa cập nhật'}){record.name_dx}
                    </span>
                  </p>
                  <div className={styles.infor_date}>
                    <span>{formatDate_number_raw(record._id)}</span>
                  </div>
                  <div className={styles.infor_btn}>
                    {record.type_duyet.toString() === "0" && <Sended_status />}
                    {record.type_duyet.toString() === "7" && <Received_status />}
                    {record.type_duyet.toString() === "5" && <Accepted_status />}
                    {record.type_duyet.toString() === "3" && <NotAccepted_status />}
                    {record.type_duyet.toString() === "6" && <Force_to_work_status />}
                    {record.type_duyet.toString() === "10" && <Wait_other_accept />}
                    {record.type_duyet.toString() === "10" && <Wait_com_accept />}
                  </div>
                  <div>
                    <input value={record._id}
                        type="checkbox"
                        onChange={addId}
                        disabled={selectAll}
                        className={styles.delete_dx}/>
                  </div>
                </div>
              </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
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
      const res_propose_list = await fetch_deleted_propose({pageSize: 10});
      const res_department = await fetch_department(token);
      const res_employee = await fetch_employee(token);
      const res_dxtype = await fetch_dxtype();
      setDepartment(res_department?.data.items);
      setEmployee(res_employee?.data.data);
      setTableRecords(res_propose_list?.data.listDeXuatCom);
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
  const employee_options = employee?.filter((emp) => filter_data.id_phong_ban? emp.dep_id[0] === filter_data.id_phong_ban: emp).map((opts: any) => {
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
    const response = await fetch_deleted_propose({ page: e.selected + 1 });
    setTableRecords(response?.data.listDeXuatCom);
  };
  const handleSubmitFilter = async (e: any) => {
    e.preventDefault();
    const form_data = new FormData();
    for (var key in filter_data) {
      form_data.append(key, filter_data[key]);
    }
    const response = await fetch_deleted_propose(form_data);
    setTableRecords(response?.data.listDeXuatCom);
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
  const [idList, setIdList] = useState<any>([]);
  const addId = (e: any) => {
    const { value, checked } = e.target;
    const isChecked = checked;
    const newValue = value;
    setIdList((prev: any) => {
      if (isChecked) {
        return [...prev, newValue];
      } else {
        return prev.filter((p: any) => p !== newValue);
      }
    });
  };
  const handleCheckAll = (e: any) => {
    setIdList(e);
  };
  const handleDelete = async (type:any) => {
    const ids = idList.map(Number)
    const formdata = new FormData();
    formdata.append('type', type)
    for(var i = 0; i < ids.length; i++) {
      formdata.append(`id[${i}]`,ids[i]);
    }
    try{
      const res = await post_deletedx(formdata)
      alert(res?.data.message)
      const res_propose_list = await fetch_deleted_propose({pageSize: 10})
      setTableRecords(res_propose_list?.data.listDeXuatCom);
    }catch(err){
      console.error(err);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.filter_area_box}>
          <form>
            <div className={styles.filter_area_list}>
                <Section 
                    style='filter_area_33'
                    input={<Input_select 
                        options={departmnet_options}
                        className='filter_area'
                        style={select_style}
                        placeholder='Chọn phòng ban'
                        onChange={handleSelectChange}
                    />} 
                />
                <Section 
                    style='filter_area_33'
                    input={<Input_select 
                        options={employee_options}
                        placeholder='Chọn ID, tên nhân viên'
                        className='filter_area'
                        style={select_style}
                        onChange={handleSelectChange}
                    />} 
                />
                <Section 
                    style='filter_area_33'
                    input={<Input_select 
                        options={propose_types_options}
                        placeholder='Chọn loại đề xuất'
                        className='filter_area'
                        style={select_style}
                        onChange={handleSelectChange}
                    />} 
                />
            </div>
            <div className={styles.filter_area_list}>
                <Section 
                    style='filter_area_24'
                    input={<Input_select 
                        options={propose_status_options}
                        placeholder='Trạng thái đề xuất'
                        className='filter_area'
                        style={select_style}
                        onChange={handleSelectChange}
                    />} 
                />
                <Section 
                  style="filter_area_24" 
                  input={<Input_calender 
                    placeholder="Từ ngày"
                    input_name="time_start"
                    datetype="date"
                    calender_class="filter_area"
                    calender_label_class="filter_area_label"
                    handle_input={handleCalenderChagne}
                  />} 
                />
                <Section 
                  style="filter_area_24" 
                  input={<Input_calender 
                    placeholder="Đến ngày"
                    input_name="time_end"
                    datetype="date"
                    calender_class="filter_area"
                    calender_label_class="filter_area_label"
                    handle_input={handleCalenderChagne}
                  />} 
                />
                <div className={styles.filter_area_24}>
                    <button onClick={handleSubmitFilter} className={styles.top_btn}>
                        <Image className={styles.search_icon} alt='' src='/icon/icon_search_white.png' width={17} height={17} />
                        <span>
                            Tìm kiếm
                        </span>
                    </button>
                </div>
            </div>
          </form>
        </div>
        <Table 
          table_records={table_records}
          idList={idList}
          addId={addId}
          handleCheckAll={handleCheckAll}
          handleDelete={handleDelete}
          />
      </div>
      <Pagination
          totalPages={totalpage}
          handlePageChange={handlePageChange}
        />
    </div>
  );
};

export default Index;
