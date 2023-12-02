import { ChangeEvent, useContext, useEffect, useState } from "react";
import TableDataOrderAddFiles from "@/components/crm/table/table-order-add-files";
import OrderSelectBoxStep from "../quote_steps/select_box_step";
import styles from "./add_file_order.module.css";
import InputText from "./input_text";
import { Input, InputNumber, Tooltip } from "antd";
import OrderListModal from "../add_quote_action_modal/quote_list";
import TableDataQuoteAddFiles from "@/components/crm/table/table-quote-add-files";
import TextArea from "antd/es/input/TextArea";
import { QuoteContext } from "../quoteContext";

export default function AddTable() {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const { newQuote, inputQuote, tempListProd } = useContext(QuoteContext)
  const [localTotal, setLocalTotal] = useState(0)
  const [localTotalWithDiscount, setLocalTotalWithDiscount] = useState(0)

  useEffect(() => {
    let total = 0
    if (tempListProd.length > 0) {
      tempListProd
        .filter((prod) => prod.product_id !== 'VT-0000')
        .map((prod) => {
          total += prod.total
        })
    }
    setLocalTotal(total)
    setLocalTotalWithDiscount(total * (1 - Number(newQuote.discount_rate) * 1.0 / 100))
  }, [tempListProd, inputQuote])

  const handleSimpleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    inputQuote(name, value);
  }

  const handlePercentInput = (e: ChangeEvent<HTMLInputElement>) => {
    const eleName = e.target.name;
    let value = e.target.value;

    // Remove spaces and non-numeric characters, except for the dot (.)
    value = value.replace(/[\s]|[^0-9.]/g, '');

    // Replace multiple commas or dots with a single dot
    // value = value.replace(/([,.])[,.]+/g, '$1');

    // Allow a single dot and remove subsequent dots
    value = value.replace(/\.(?=.*\.)/g, '');

    // Convert to a floating-point number
    const floatValue = value ? parseFloat(value) : 0;

    // Clamp the value within the range of 0 to 100
    const clampedValue = Math.min(100, Math.max(0, floatValue));

    inputQuote(eleName, floatValue < 0 || floatValue > 100 ? clampedValue + '' : value)
  }

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
          <Input
            style={{ background: "#e9ecef", color: "black !important" }}
            placeholder="0"
            suffix="VNĐ"
            disabled
            value={localTotal}
          />
        </div>
        <div>
          <label className={`${styles["form-label"]} `}>
            Chiết khấu đơn hàng
          </label>
          <Input
            placeholder="0"
            suffix="%"
            value={newQuote.discount_rate}
            onChange={handlePercentInput}
            name="discount_rate"
          />
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
            value={localTotalWithDiscount}
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
              value={newQuote.terms_and_conditions}
              onChange={handleSimpleInput}
              name="terms_and_conditions"
            />
          </div>
          <label className={`${styles["form-label"]}`}>Ghi chú</label>
          <div style={{ width: "100%" }}>
            <textarea
              style={{ width: "100%", height: 60, padding: 10, fontSize: 18 }}
              placeholder="Nhập ghi chú"
              value={newQuote.note}
              onChange={handleSimpleInput}
              name="note"
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <div style={{ textAlign: "center" }}>Người lập</div>
          <div style={{ textAlign: "center" }}>(Ký, họ tên)</div>
          <div style={{ paddingTop: 10 }}>
            <Input
              placeholder="Nhập"
              value={newQuote.creator_name}
              onChange={handleSimpleInput}
              name="creator_name"
            ></Input>
          </div>
        </div>
        <div>
          <div style={{ textAlign: "center" }}>Giám đốc</div>
          <div style={{ textAlign: "center" }}>(Ký, họ tên, đóng dấu)</div>
          <div style={{ paddingTop: 10 }}>
            <Input
              placeholder="Nhập"
              value={newQuote.ceo_name}
              onChange={handleSimpleInput}
              name="ceo_name"
            ></Input>
          </div>
        </div>
      </div>
    </div>
  );
}
