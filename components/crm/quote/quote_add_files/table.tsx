import { useState } from "react";
import TableDataOrderAddFiles from "@/components/crm/table/table-order-add-files";
import OrderSelectBoxStep from "../quote_steps/select_box_step";
import styles from "./add_file_order.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from "antd";
import OrderListModal from "../add_quote_action_modal/quote_list";
import TableDataQuoteAddFiles from "@/components/crm/table/table-quote-add-files";
import TextArea from "antd/es/input/TextArea";

export default function AddTable() {
  const [isModalCancel, setIsModalCancel] = useState(false);
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin hàng hóa</p>
      <TableDataQuoteAddFiles
        setSelected={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />

      <div className={styles.row_input}></div>
      <div
        className={styles.row_input}
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div>
          <label className={`${styles["form-label"]}`}>Tổng thành tiền</label>
          <Input placeholder="0" suffix="VNĐ" />
        </div>
        <div>
          <label className={`${styles["form-label"]} `}>
            Chiết khấu đơn hàng
          </label>
          <Input placeholder="0" suffix="%" />
        </div>

        <div>
          <label className={`${styles["form-label"]}`}>
            Tổng tiền thanh toán
          </label>
          <Input
            style={{ background: "#e9ecef", color: "black" }}
            placeholder="0"
            suffix="VNĐ"
            disabled
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div style={{ width: "100%" }}>
          <label className={`${styles["form-label"]}`}>
            Điều khoản & quy định
          </label>
          <div style={{ width: "100%" }}>
            <textarea
              style={{ width: "100%", height: 60, padding: 10, fontSize: 18 }}
              placeholder="Nhập điều khoản & quy định"
            />
          </div>
          <label className={`${styles["form-label"]}`}>Ghi chú</label>
          <div style={{ width: "100%" }}>
            <textarea
              style={{ width: "100%", height: 60, padding: 10, fontSize: 18 }}
              placeholder="Nhập ghi chú"
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <div style={{ textAlign: "center" }}>Người lập</div>
          <div style={{ textAlign: "center" }}>(Ký, họ tên)</div>
          <div style={{ paddingTop: 10 }}>
            <Input placeholder="Nhập"></Input>
          </div>
        </div>
        <div>
          <div style={{ textAlign: "center" }}>Người lập</div>
          <div style={{ textAlign: "center" }}>(Ký, họ tên)</div>
          <div style={{ paddingTop: 10 }}>
            <Input placeholder="Nhập"></Input>
          </div>
        </div>
      </div>
    </div>
  );
}
