import Pagination from "@/components/van-thu-luu-tru/pagination/Pagination";
import Table_header from "@/components/van-thu-luu-tru/components/tableheader/Table_header";
import { fetch_propose_list, fetch_propose_member_list } from "@/utils/api/dexuat/api_fecth_cty";
import { fetch_department, fetch_employee, fetch_position } from "@/utils/api/dexuat/api_fetch";
import React, { useEffect, useState } from "react";
import styles from './propose_member.module.css'

const titles = [
  { label: "Id" },
  { label: "Họ và tên" },
  { label: "Email" },
  { label: "Vị trí" },
  { label: "Bộ phận - Phòng ban"}
];

const Index = () => {
  const [table_records,setTableRecords] = useState<any>();
  const [dep,setDep] = useState<any>();
  const [pos,setPos] = useState<any>();
  const [totalpage, setTotalpage] = useState();
  useEffect(()=>{
      const fetchdata = async () => {
          const token = sessionStorage.getItem("token");
          const res_propose_list = await fetch_propose_member_list()
          const res_department = await fetch_department(token);
          const res_pos = await fetch_position()
          setTableRecords(res_propose_list?.data.data)
          setDep(res_department?.data.items)
          setPos(res_pos);
          setTotalpage(res_propose_list?.data.totalPages)
      }
    fetchdata();
  },[])
  const Table_record = ({id,name,email,position,department}:any) => {
    const depData = dep?.find((dep:any)=>dep?.dep_id === department)?.dep_name;
    const posData = pos?.find((pos:any)=>pos?.value === position.toString())?.label;
    return (
      <div className={styles.tab_group}>
        <div className={styles.tab_group1}>
          <div className={styles.form}>
            <div className={styles.form_id}>
              <p>{id}</p>
            </div>
            <div className={styles.form_name}>
              <p>{name}</p>
            </div>
            <div className={styles.form_email}>
              <p>{email}</p>
            </div>
            <div className={styles.form_position}>
              <p>{depData}</p>
            </div>
            <div className={styles.form_department}>
              <p>{posData}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const handlePageChange = async (e:any) => {
    const response = await fetch_propose_member_list({page : e.selected + 1})
    setTableRecords(response?.data.data)
  }
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.box_list}>
          <div className={styles.list_tab}>
            <Table_header containerClassName='propose_member_header_container' titles={titles} className='propose_member'/>
            <div className={styles.tab_content}>
              <div className={styles.tab_items}>
                {table_records?.map((rec:any,index:any)=>{
                  return (
                    <Table_record 
                      key={index} 
                      id={rec.idQLC} 
                      name={rec.userName} 
                      email={rec.email} 
                      position={rec.pos_id} 
                      department={rec.dep_id} />
                    )
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
  )
}
export default Index;

