import { useEffect } from "react";
import styles from "./FirstPage.module.css";
import { Dropdown, Space } from "antd";
import axios from "axios";
import { domain } from "../../../api/BaseApi";
export default function FirstPage({ handleSelected }) {
  const handleClick = (c) => {
    handleSelected(c);
  };
  const items = [
    {
      key: "1",
      label: (
        <div className={styles.Dropdownlistitems}>
          <img src="/add_member.png" alt="" />
          <p>Thêm Nhân viên</p>
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div className={styles.Dropdownlistitems}>
          <img src="/list_cycle.png" alt="" />
          <p>Danh sách nhân viên</p>
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div className={styles.Dropdownlistitems}>
          <img src="/edit_cycle.png" alt="" />
          <p>Chỉnh sửa</p>
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div className={styles.Dropdownlistitems}>
          <img src="/copy_cycle.png" alt="" />
          <p>Sao chép lịch làm việc</p>
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div className={styles.Dropdownlistitems1}>
          <img src="/delete_cycle.png" alt="" />
          <p>Xóa lich làm việc</p>
        </div>
      ),
    },
  ];
  const apiUrltest = `${domain}/api/qlc/cycle/list`;
  useEffect(() => {
    axios
      .post(
        apiUrltest,
        {},
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6MTM3NzQ0OSwiaWRUaW1WaWVjMzY1IjoyMzI0MTYsImlkUUxDIjoxNjY0LCJpZFJhb05oYW5oMzY1IjowLCJlbWFpbCI6InRyYW5nY2h1b2k0QGdtYWlsLmNvbSIsInBob25lVEsiOiIiLCJjcmVhdGVkQXQiOjE2NjM4MzY0MDUsInR5cGUiOjEsImNvbV9pZCI6MTY2NCwidXNlck5hbWUiOiJNdG4gQ29tcGFueSJ9LCJpYXQiOjE2OTE1NTYyMTksImV4cCI6MTY5MTY0MjYxOX0.7xkYXkR7SAfN3tLNXjtUUasXplW5Fbx8mCoZQ8YDjH0",
          },
        }
      )
      .then((response) => {
        console.log(response?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className={styles.tax_one}>
        <p className={styles.btn_new}>Tạo mới</p>
      </div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)} className={styles.active}>
            Ca làm việc
          </p>
          <p onClick={() => handleClick(2)}>Lịch Làm Việc</p>
          <p onClick={() => handleClick(3)}>Cài đặt Công Chuẩn</p>
          <p onClick={() => handleClick(4)}>Hướng dẫn</p>
        </div>
      </div>
      <div className={styles.tax_three}>
        <div className={styles.tax_three_ct_one}>
          <div className={styles.tax_calendarwork}>
            <p>Lịch làm việc chung</p>
            <div className={styles.tax_items}>
              <div className={styles.tax_bg1}>
                <div className={styles.tax_top}>
                  <div className={styles.tax_setting}>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      placement="bottomLeft"
                      trigger={["click"]}
                    >
                      <p>
                        <img src="/Group7508.png" alt="" />
                      </p>
                    </Dropdown>
                  </div>
                  <div className={styles.tax_title}>test</div>
                </div>
              </div>
              <div className={styles.tax_bottom}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
