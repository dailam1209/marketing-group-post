import { useState } from "react";
import TableDataOrderAddFiles from "@/components/crm/table/table-order-add-files";
import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./add_file_order.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from 'antd';
import OrderListModal from "../add_order_action_modal/order_list";


export default function AddTable() {
  const [isModalCancel, setIsModalCancel] = useState(false);
  return (
    <div>
      
      <p className={styles.main__body__type}>Thông tin hàng hóa
      
        <button
              onClick={() => {
                setIsModalCancel(true);
              }}
              className={`${styles.pick_product} `}
            >
              <i className="bi bi-check2-square"></i>
              <b>Chọn hàng hóa</b>
        </button>
      </p>
        <TableDataOrderAddFiles setSelected={function (value: boolean): void {
        throw new Error("Function not implemented.");
      } } />

      <div className={styles.row_input}></div>
      <div className={styles.row_input}>
        <div className={`${styles.width2} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]} `}>Chiết khấu đơn hàng</label>
            <Input placeholder="0"  suffix="%" />
        </div>
        <div className={`${styles.width3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>&nbsp;</label>
            <Input placeholder="0"  suffix="VNĐ" />
        </div>
        
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>Giá trị đơn hàng</label>
            <Input style={{ background: "#e9ecef", color: "black" }}placeholder="0"  suffix="VNĐ" disabled/>
        </div>
      </div>
      {
        
        <OrderListModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          title="Danh sách hàng hóa"
          // content="Hello"
          
        />
      }
    </div>
  );
}
