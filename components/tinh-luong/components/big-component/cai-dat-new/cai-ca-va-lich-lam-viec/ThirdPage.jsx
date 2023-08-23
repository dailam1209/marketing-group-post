import styles from "./ThirdPage.module.css";
import { Dropdown, Select, Modal, Card } from "antd";
export default function ThirdPage({ handleSelected }) {
  const handleClick = (c) => {
    handleSelected(c);
  };
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const YearData = [
    {
      value: 2022,
      label: "2022",
    },
    {
      value: 2023,
      label: "2023",
    },
    {
      value: 2024,
      label: "2024",
    },
  ];

  const MonthData = [
    {
      value: 1,
      label: "Tháng 1",
    },
    {
      value: 2,
      label: "Tháng 2",
    },
    {
      value: 3,
      label: "Tháng 3",
    },
    {
      value: 4,
      label: "Tháng 4",
    },
    {
      value: 5,
      label: "Tháng 5",
    },
    {
      value: 6,
      label: "Tháng 6",
    },
    {
      value: 7,
      label: "Tháng 7",
    },
    {
      value: 8,
      label: "Tháng 8",
    },
    {
      value: 9,
      label: "Tháng 9",
    },
    {
      value: 10,
      label: "Tháng 10",
    },
    {
      value: 11,
      label: "Tháng 11",
    },
    {
      value: 12,
      label: "Tháng 12",
    },
  ];
  return (
    <div>
      <div className={styles.tax_one}>
        <Select
          className={styles.selection}
          showSearch
          defaultValue={`${year}`}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          options={YearData}
        />
        <Select
          className={styles.selection}
          showSearch
          defaultValue={`Tháng ${month}`}
          optionFilterProp="children"
          options={MonthData}
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
        />
      </div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)}>Ca làm việc</p>
          <p onClick={() => handleClick(2)}>Lịch Làm Việc</p>
          <p onClick={() => handleClick(3)} className={styles.active}>
            Cài đặt Công Chuẩn
          </p>
          <p onClick={() => handleClick(4)}>Hướng dẫn</p>
        </div>
      </div>
      <div className={styles.tax_three}>
        <div className={styles.tax_three_ct_one}>
          <Card
            title={
              <div className={styles.tax_ct_tx}>
                <div className={styles.tax_ct_tx_h3}>Hello world</div>
              </div>
            }
          >
            <div className={styles.tax_ct_tow}>
              <div className={styles.tax_describe}>
                <span>
                  <h4>Mô Tả</h4>
                </span>
                <p>
                  Cài đặt số ngày công tiêu chuẩn để tính lương cho toàn bộ nhân
                  viên của công ty trong tháng đó.
                </p>
                <p>Định dạng nhập là số nguyên dương hoặc số thập phân.</p>
                <div className={styles.et_isrc_mn}>
                  <input
                    type="number"
                    id="cong_chuan"
                    placeholder="Nhập công chuẩn tháng 01/2023"
                    min="0"
                    step="0.1"
                    defaultValue=""
                  />
                  <button className={styles.rose_btn_one}>
                    Lưu công chuẩn
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
