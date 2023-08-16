import React, { useState } from "react";
import { Select, TimePicker } from "antd";
import dayjs from "dayjs";
import styles from "./customer.module.css";
import stylePotentialSlect from "@/components/crm/potential/potential.module.css";
import PotentialSelectBoxStep from "../potential/potential_steps/select_box_step";

const format = "HH:mm";

interface PropsComponent {
  setOpen: any;
}

const CustomerListFilterBox: React.FC<PropsComponent> = ({ setOpen }) => {
  const [valueSelectStatus, setValueSelectStatus] = useState("");

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setValueSelectStatus(value);
  };

  const options = [
    { value: "test1", label: "test1" },
    { value: "test2", label: "test2" },
    { value: "test3", label: "test3" },
  ];

  return (
    <>
      <div className={styles.mdal_body}>
        <div className={styles.form_group}>
          <div className={styles.label}>Thời gian tạo khách hàng</div>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <TimePicker
                style={{ width: "100%", height: "37px" }}
                defaultValue={dayjs("12:08", format)}
                format={format}
              />
              </div>
              <div className={`${styles["col-lg-6"]}`}>
                <div className={styles.box_input} style={{ width: "100%",marginBottom: "5px" }}>
                  <input type="date" value={"2023-07-03"} />
                </div>
              </div>
            
          </div>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <TimePicker
                  style={{ width: "100%", height: "37px" }}
                  defaultValue={dayjs("00:00", format)}
                  format={format}
                />
            </div>
            <div className={`${styles["col-lg-6"]}`}>
              <div className={styles.box_input} style={{ width: "100%",marginBottom: "5px" }}>
                <input type="date" />
              </div>
            </div>
            
            
          </div>
          
          
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Tình trạng khách hàng</div>
          <Select
            style={{ width: "100%" }}
            onChange={handleChange}
            options={options}
            value={valueSelectStatus}
          />
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nguồn khách hàng</div>
          <div className={stylePotentialSlect.customer_list}>
            <PotentialSelectBoxStep value="Tất cả" placeholder="Tất cả" />
          </div>
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
                data-status={0}
                style={{ marginRight: 5 }}
                defaultValue={420}
              />{" "}
              Ghim nhóm
            </div>
          </div>
          <div className={stylePotentialSlect.customer_list}>
            <PotentialSelectBoxStep value="Tất cả" placeholder="Tất cả" />
          </div>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhóm khách hàng con</div>
          <div className={stylePotentialSlect.customer_list}>
            <PotentialSelectBoxStep value="Tất cả" placeholder="Tất cả" />
          </div>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhân viên phụ trách</div>
          <div className={stylePotentialSlect.customer_list}>
            <PotentialSelectBoxStep value="Tất cả" placeholder="Tất cả" />
          </div>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhân viên bàn giao</div>
          <div className={stylePotentialSlect.customer_list}>
            <PotentialSelectBoxStep value="Tất cả" placeholder="Tất cả" />
          </div>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhân viên tạo khách hàng</div>
          <div className={stylePotentialSlect.customer_list}>
            <PotentialSelectBoxStep value="Tất cả" placeholder="Tất cả" />
          </div>
        </div>
      </div>
      <div className={styles.mdal_footer}>
        <button
          type="button"
          className={styles.btn_cancel}
          data-dismiss="modal"
          onClick={() => setOpen(false)}
        >
          Hủy lọc
        </button>
        <button
          onClick={() => setOpen(false)}
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
