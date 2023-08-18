import MyEditor from "@/pages/VanThu/van-ban-di/components/Editor";
import { useEffect, useState } from "react";
import styles from "./Input_text.module.css";

export default function Input_text({
  placeholder,
  value,
  isDisabled,
}: {
  placeholder?: string;
  value?: string;
  isDisabled?: boolean;
}) {
  return (
    <input
      disabled={isDisabled}
      className={styles.input_text}
      type="number"
      placeholder={placeholder}
      value={value}
    />
  );
}
export function Custom_input_textarea({
  placeholder,
  inputclass,
  value,
}: {
  placeholder: string;
  inputclass: string;
  value?: string;
}) {
  return (
    <textarea
      className={styles[inputclass]}
      placeholder={placeholder}
      value={value}
    />
  );
}
export function Custom_input_number({
  placeholder,
  inputclass,
  value,
  isDisabled,
  money,
}: {
  placeholder?: string;
  inputclass: string;
  value?: string;
  isDisabled?: boolean;
  money?: boolean;
}) {
  return (
    <>
      <input
        disabled={isDisabled}
        type="number"
        className={styles[inputclass]}
        placeholder={placeholder}
        value={value}
      />
      {money && <span className={styles.money}>VND</span>}
    </>
  );
}
export function Input_ckeditor() {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  return (
    <div className={styles.ckeditor}>
      <MyEditor
        name="Editor"
        onChange={(data: React.SetStateAction<string>) => {
          setData(data);
        }}
        editorLoaded={editorLoaded}
        value={undefined}
      />

      {/* {JSON.stringify(data)} */}
    </div>
  );
}
