import styles from "./department.module.css";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { fetch_list_department } from "@/utils/ShareApi";

const Index = () => {
  const [department, setDepartment] = useState([]);
  useEffect(() => {
    const fetchGetData = async () => {
      const response = await fetch_list_department();
      setDepartment(response?.data?.data);
    };
    fetchGetData();
  }, []);
  const ds_dep_options = department?.map((opt: any) => {
    return { value: opt.dep_id, label: opt?.dep_name };
  });

  return (
    <div className={styles.app}>
      <div className={styles.scrollMobile}>
        <div className={styles.header}>
          <Link href="/VanThu/quanly-cong-van/tuy-chinh" style={{ color: "black" }}>
            Sổ văn bản
          </Link>
          <Link
            href="/VanThu/quanly-cong-van/tuy-chinh/bo-phan-phong-ban"
            style={{ color: "#4c5bd4" }}
          >
            Bộ phận phòng ban
          </Link>
          <Link
            href="/VanThu/quanly-cong-van/tuy-chinh/cai-dat-chung"
            style={{ color: "black" }}
          >
            Cài đặt chung
          </Link>
        </div>
      </div>
      <div className={styles.sub_header}>
        <p>Danh sách bộ phận phòng ban</p>
      </div>
      <div className={styles.scrollMobile}>
        <div className={styles.div_table}>
          <table>
            <thead className={styles.headerrr}>
              <tr>
                <th>STT</th>
                <th>Tên phòng ban</th>
              </tr>
            </thead>
            <tbody>
              {ds_dep_options.map((item: any, index) => (
                <tr key={index} className={styles.content}>
                  <td>{index}</td>
                  <td>{item.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className={styles.paginate}>
            <li>
              <Link href="">1</Link>
            </li>
            <li>
              <Link href="">2</Link>
            </li>
            <li>
              <Link style={{ fontSize: "20px" }} href="">
                <BiSkipNext />
              </Link>
            </li>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
