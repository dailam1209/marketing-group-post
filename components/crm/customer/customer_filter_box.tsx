import React, { useState } from "react";
import { Input, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import styles from "./customer.module.css";
import stylePotentialSlect from "@/components/crm/potential/potential.module.css";
import PotentialSelectBoxStep from "../potential/potential_steps/select_box_step";
import moment from "moment";

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

  const currentTime = moment(); // Thời điểm hiện tại
  const pastTime = currentTime.subtract(2, "days");

  return (
    <>
      <div className={styles.mdal_body}>
        <div className={styles.form_group}>
          <div className={styles.label}>Thời gian tạo khách hàng</div>
          <div className={styles.row}>
            <div className={`${styles["col-lg-6"]}`}>
              <TimePicker
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
                  type="date"
                  defaultValue={pastTime.format("YYYY-MM-DD")}
                />
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
              <div
                className={styles.box_input}
                style={{ width: "100%", marginBottom: "5px" }}
              >
                <input type="date" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Tình trạng khách hàng</div>
          <Select
            style={{
              width: "100%",
              border: "1px solid black",
              borderRadius: 5,
            }}
            onChange={handleChange}
            value={valueSelectStatus}
          >
            <option value="Chưa tư vấn">Chưa tư vấn</option>
            <option value="Đã tư vấn xong">Đã tư vấn xong</option>
          </Select>
        </div>
        <div className={styles.form_group}>
          <div className={styles.label}>Nguồn khách hàng</div>
          <Select
            style={{ width: "100%", border: "1px solid black" }}
            onChange={handleChange}
            value={valueSelectStatus}
          >
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
                data-status={0}
                style={{ marginRight: 5 }}
                defaultValue={420}
              />{" "}
              Ghim nhóm
            </div>
          </div>
          <Select
            style={{
              width: "100%",
              border: "1px solid black",
              borderRadius: 5,
            }}
            onChange={handleChange}
            value={valueSelectStatus}
          >
            <option value="Chưa tư vấn">Chưa tư vấn</option>
            <option value="Đã tư vấn xong">Đã tư vấn xong</option>
          </Select>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhóm khách hàng con</div>
          <div className={stylePotentialSlect.customer_list}>
            <Select
              style={{
                width: "100%",
                border: "1px solid black",
                borderRadius: 5,
              }}
              onChange={handleChange}
              value={valueSelectStatus}
            >
              <option value="Chưa tư vấn">Chưa tư vấn</option>
              <option value="Đã tư vấn xong">Đã tư vấn xong</option>
            </Select>
          </div>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhân viên phụ trách</div>
          <div className={stylePotentialSlect.customer_list}>
            <Select
              style={{
                width: "100%",
                border: "1px solid black",
                borderRadius: 5,
              }}
              onChange={handleChange}
              value={valueSelectStatus}
            >
              <option value="Chưa tư vấn">Chưa tư vấn</option>
              <option value="Đã tư vấn xong">Đã tư vấn xong</option>
            </Select>
          </div>
        </div>

        <div className={styles.form_group}>
          <div className={styles.label}>Nhân viên tạo khách hàng</div>
          <div className={stylePotentialSlect.customer_list}>
            <Select
              style={{ width: "100%", border: "1px solid black" }}
              onChange={handleChange}
              value={valueSelectStatus}
            >
              <option value="Chưa tư vấn">Chưa tư vấn</option>
              <option value="Đã tư vấn xong">Đã tư vấn xong</option>
            </Select>
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
