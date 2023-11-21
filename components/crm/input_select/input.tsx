import styles from "./potential2.module.css";
import stylesAdd from "./add_file_commodity.module.css";
import { useContext } from "react";
import { useFormData } from "../context/formDataContext";
export const InputSearchV2 = ({
  onSubmit = false,
  placeholder,
  name,
  defaultValue = "",
}) => {
  const { formData, handleChangeData, handleRecall } = useContext(useFormData);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && handleRecall();
  };
  return (
    <div className={styles.main__control_search}>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChangeData}
          value={formData[name] && formData[name]}
          type="text"
          className={styles.input__search}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
        <button onClick={handleSubmit} className={styles.kinh_lup}>
          <img
            className={styles.img__search}
            src="/crm/search.svg"
            alt="hungha365.com"
          />
        </button>
      </form>
    </div>
  );
};
export function MInputTextV2({
  label = "",
  defaultValue = null,
  placeholder,
  require = false,
  disable = false,
  type = "text",
  name = "",
  id = "",
}: any) {
  const { handleChangeData, formData } = useContext(useFormData);

  return (
    <div className={`${stylesAdd.mb_3} ${stylesAdd["col-lg-6"]}`}>
      <label
        className={`${stylesAdd["form-label"]} ${require ? "required" : ""}`}
      >
        {label}
      </label>
      <input
        style={{
          marginLeft: "10px",
          height: "px",
          backgroundColor: disable ? "#e9ecef" : "white",
        }}
        type={type}
        disabled={disable}
        className={`${stylesAdd["form-control"]}`}
        name={name}
        id={id}
        defaultValue={defaultValue && defaultValue}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChangeData}
      />
    </div>
  );
}
export function MTextAreaV2({
  label = null,
  placeholder = "Nhập mô tả",
  require = false,
  disable = false,
  name = "description",
  nameChecked = "",
  labelChecked = "",
  rows = 4,
}: any) {
  const { setFormData, formData, handleChangeData } = useContext(useFormData);
  return (
    <div className={`${stylesAdd.mb_3} ${stylesAdd["col-lg-6"]}`}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <label
          className={`${stylesAdd["form-label"]} ${require ? "required" : ""}`}
        >
          {label}
        </label>
        {nameChecked && (
          <div>
            <input
              style={{ marginRight: "5px" }}
              type="checkbox"
              onChange={(e) =>
                setFormData((preData: any) => {
                  return {
                    ...preData,
                    [nameChecked]: e.target.checked,
                  };
                })
              }
            />
            <label> {labelChecked}</label>
          </div>
        )}
      </div>

      <textarea
        style={{
          marginLeft: "10px",
          height: "px",
          backgroundColor: disable ? "#e9ecef" : "white",
        }}
        rows={rows}
        disabled={disable}
        className={`${stylesAdd["form-control"]}`}
        name={name}
        value={formData[name] && formData[name]}
        placeholder={placeholder}
        onChange={handleChangeData}
      />
    </div>
  );
}
export function MInputTextAndOption({
  label,
  placeholder,
  require = false,
  disable = false,
  type = "text",
  name = "",
  labelAdd = "",
  handleAdd = null,
  nameChecked = "",
  labelChecked = "",
}: any) {
  const { handleChangeData, setFormData, formData } = useContext(useFormData);

  return (
    <div className={`${stylesAdd.mb_3} ${stylesAdd["col-lg-6"]}`}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <label
          className={`${stylesAdd["form-label"]} ${require ? "required" : ""}`}
        >
          {label}
        </label>
        {labelAdd && (
          <button
            style={{ color: "blue", fontSize: "15px", paddingRight: "10px" }}
            onClick={handleAdd}
          >
            + {labelAdd}
          </button>
        )}
        {nameChecked && (
          <div>
            <input
              style={{ marginRight: "5px" }}
              type="checkbox"
              value={formData[nameChecked] && formData[nameChecked]}
              onChange={(e) =>
                setFormData((preData: any) => {
                  return {
                    ...preData,
                    [nameChecked]: e.target.checked,
                  };
                })
              }
            />
            <label> {labelChecked}</label>
          </div>
        )}
      </div>

      <input
        style={{
          marginLeft: "10px",
          height: "px",
          backgroundColor: disable ? "#e9ecef" : "white",
        }}
        type={type}
        disabled={disable}
        className={`${stylesAdd["form-control"]}`}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChangeData}
      />
    </div>
  );
}

export function MInputTextAndArr({
  label,
  placeholder,
  require = false,
  disable = false,
  type = "text",
  value,
  index,
  arr,
  setArr,
  labelAction,
  name = "",
  setFormData = null,
  bonus = 0,
}: any) {
  const handleChangeInput = (e: any) => {
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    } else {
      arr[index] = e.target.value;
      setArr([...arr]);
    }
  };
  const handleDelete = () => {
    name &&
      setFormData((prevData) => {
        delete prevData[name];
        return { ...prevData };
      });
    arr.splice(index - bonus, 1);
    setArr([...arr]);
  };
  const handlePush = () => {
    setArr([...arr, ""]);
  };
  return (
    <div className={`${stylesAdd.mb_3} ${stylesAdd["col-lg-6"]}`}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <label
          className={`${stylesAdd["form-label"]} ${require ? "required" : ""}`}
        >
          {label}
        </label>
        <button
          style={{
            color: Number(index + bonus) > 0 ? "red" : "blue",
            fontSize: "15px",
            paddingRight: "10px",
          }}
          onClick={Number(index + bonus) > 0 ? handleDelete : handlePush}
        >
          {Number(index + bonus) > 0
            ? `- Xóa ${labelAction} `
            : `+ Thêm ${labelAction}`}
        </button>
      </div>

      <input
        style={{
          marginLeft: "10px",
          height: "px",
          backgroundColor: disable ? "#e9ecef" : "white",
        }}
        type={type}
        disabled={disable}
        className={`${stylesAdd["form-control"]}`}
        placeholder={placeholder}
        value={value && value}
        onChange={handleChangeInput}
      />
    </div>
  );
}
