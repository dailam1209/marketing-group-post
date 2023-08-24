import MyEditor from "@/pages/van-thu-luu-tru/van-ban-di/components/Editor";
import { useEffect, useState } from "react";
import styles from "./Input_text.module.css";

export default function Input_text({
  placeholder,
  value,
  isDisabled,
  handleChange,
  input_name,
  handleBlur,
}: {
  placeholder?: string;
  value?: string;
  isDisabled?: boolean;
  handleChange?: any;
  input_name?: string;
  handleBlur?: any;
}) {
  return (
    <input
      disabled={isDisabled}
      className={styles.input_text}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      name={input_name}
      onBlur={handleBlur}
    />
  );
}
export function Custom_input_textarea({
  placeholder,
  inputclass,
  value,
  handleChange,
  input_name,
}: {
  placeholder: string;
  inputclass: string;
  value?: string;
  handleChange?: any;
  input_name?: string;
}) {
  return (
    <textarea
      className={styles[inputclass]}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      name={input_name}
    />
  );
}
export function Custom_input_text({
  placeholder,
  inputclass,
  value,
  isDisabled,
  money,
  handleChange,
  input_name,
  type,
  ref,
  id,
}: {
  placeholder?: string;
  inputclass: string;
  value?: string;
  isDisabled?: boolean;
  money?: boolean;
  handleChange?: any;
  input_name?: string;
  type?: string;
  ref?: any;
  id?: any;
}) {
  return (
    <>
      <input
        disabled={isDisabled}
        type={type ? type : "text"}
        className={styles[inputclass]}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={input_name}
        ref={ref}
        id={id}
      />
      {money && <span className={styles.money}>VND</span>}
    </>
  );
}
export function Custom_input_num({
  placeholder,
  inputclass,
  value,
  isDisabled,
  money,
  handleChange,
  input_name,
}: {
  placeholder?: string;
  inputclass: string;
  value?: string;
  isDisabled?: boolean;
  money?: boolean;
  handleChange?: any;
  input_name?: string;
}) {
  return (
    <>
      <input
        disabled={isDisabled}
        type="number"
        className={styles[inputclass]}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={input_name}
      />
      {money && <span className={styles.money}>VND</span>}
    </>
  );
}
export function Input_ckeditor({ value, handleChange, input_name }: any) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  return (
    <div className={styles.ckeditor}>
      <MyEditor
        name={input_name}
        onChange={(data: any) => {
          setData(data);
          handleChange(data);
        }}
        editorLoaded={editorLoaded}
        value={value}
      />
    </div>
  );
}
