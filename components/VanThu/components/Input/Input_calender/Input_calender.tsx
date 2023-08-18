import React, { useEffect } from "react";
import styles from "./Input_calender.module.css";

interface adsentInfor {
  shift: string;
  start_date: string;
  end_date: string;
}
export default function Input_calender({
  placeholder,
  datetype,
  calender_class,
  calender_label_class,
  handle_input,
  input_name,
  absentInfor,
}: {
  placeholder?: string;
  datetype: string;
  calender_class?: string;
  calender_label_class?: string;
  handle_input?: any;
  input_name?: string;
  absentInfor?: adsentInfor;
}) {
  const [input, setInput] = React.useState<any>(`${placeholder}`);
  useEffect(()=>{
    setInput(placeholder)
  }, [placeholder])
  const handle_date_input = (event: any) => {
    dateHandle(event);
    if (handle_input) {
      handle_input(event);
    }
  };
  const dateHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const clearInput = () => {
    setInput("");
  };
  useEffect(() => {
    if (
      absentInfor &&
      absentInfor.shift &&
      absentInfor.start_date &&
      absentInfor.end_date
    ) {
      clearInput();
    }
  }, [absentInfor]);

  return (
    <div className={styles.calender}>
      <input
          value={input}
          name={input_name}
          onChange={handle_date_input}
          type={datetype}
          className={calender_class ? styles[calender_class] : styles.calender_input}
        />
      <label className={calender_label_class ? styles[calender_label_class]: styles.calender_label}>{input}</label>
    </div>
  );
}
