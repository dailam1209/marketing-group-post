import { useState } from "react";
import styles from "./input.module.css";

export const InputSearch = () => {
  return (
    <div className={styles.form_tt}>
      <input
        type="text"
        name="search_text"
        value=""
        placeholder="Nhập tên, số văn bản"
      />
    </div>
  );
};

export const InputSelect = () => {
  const [click, setClick] = useState(false);
  return (
    <div
      className={styles.form_tt}
      style={{ position: "relative" }}
      onClick={() => {
        setClick(!click);
      }}
    >
      <div className={styles.option_output}>
        <p className={styles.p_output} style={{ width: "95%" }}>
          Sổ văn bản
        </p>
        <span className={styles.span_show}></span>
      </div>
      <div
        className={styles.list_input_select}
        style={{
          maxHeight: "290px",
          overflowY: "auto",
          display: `${click ? "block" : "none"}`,
        }}
      >
        <label className={styles.label_list}>
          <input type="radio" value="286" />
          <p className={styles.p_item_list}>Văn bản đi - 2023</p>
        </label>
        <label className={styles.label_list}>
          <input type="radio" value="286" />
          <p className={styles.p_item_list}>Văn bản đi - 2023</p>
        </label>
        <label className={styles.label_list}>
          <input type="radio" value="286" />
          <p className={styles.p_item_list}>Văn bản đi - 2023</p>
        </label>
        <label className={styles.label_list}>
          <input type="radio" value="286" />
          <p className={styles.p_item_list}>Văn bản đi - 2023</p>
        </label>
        <label className={styles.label_list}>
          <input type="radio" value="286" />
          <p className={styles.p_item_list}>Văn bản đi - 2023</p>
        </label>
        <label className={styles.label_list}>
          <input type="radio" value="286" />
          <p className={styles.p_item_list}>Văn bản đi - 2023</p>
        </label>
        <label className={styles.label_list}>
          <input type="radio" value="286" />
          <p className={styles.p_item_list}>Văn bản đi - 2023</p>
        </label>
        <label className={styles.label_list}>
          <input type="radio" value="286" />
          <p className={styles.p_item_list}>Văn bản đi - 2023</p>
        </label>
      </div>
    </div>
  );
};

export function InputDate({ date }: any) {
  const [choosedate, setChooseDate] = useState(false);
  return (
    <div className={styles.form_tt}>
      <div
        style={{ position: "relative" }}
        onClick={() => {
          setChooseDate(true);
        }}
      >
        <input
          type="date"
          className={styles.date}
          required
          // onChange={(e) => {
          //   if (e.target.value) {
          //     setChooseDate(true);
          //   }
          // }}
        />
        <label
          className={styles.label_input}
          style={{ display: `${choosedate ? "none" : ""}` }}
        >
          <span>{date}</span>
        </label>
      </div>
    </div>
  );
}
export const InputMoney = ({ placeholder }: any) => {
  return (
    <>
      <div className={styles.form_tt}>
        <input type="number" placeholder={placeholder} />
      </div>
    </>
  );
};
