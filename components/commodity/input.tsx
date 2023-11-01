import styles from "./potential2.module.css";
import stylesAdd from "./add_file_commodity.module.css";

export const InputSearch = ({
  value,
  setFormData,
  onSubmit = null,
  placeholder,
  name,
}) => {
  const handleChangeInput = (e: any) => {
    if (name !== "") {
      setFormData((preData: any) => {
        return {
          ...preData,
          [name]: e.target.value,
        };
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <div className={styles.main__control_search}>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => handleChangeInput(e)}
          value={value && value}
          type="text"
          className={styles.input__search}
          name="search"
          defaultValue=""
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
export function MInputText({
  label,
  placeholder,
  require = false,
  disable = false,
  type = "text",
  value,
  setFormData,
  name = "",
  id = "",
  nameChecked = "",
  labelChecked = "",
}: any) {
  const handleChangeInput = (e: any) => {
    if (name !== "") {
      setFormData((preData: any) => {
        return {
          ...preData,
          [name]: e.target.value,
        };
      });
    }
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
        placeholder={placeholder}
        value={value && value}
        onChange={handleChangeInput}
      />
    </div>
  );
}
export function MTextArea({
  label = "Mô tả",
  placeholder = "Nhập mô tả",
  require = false,
  disable = false,
  value,
  setFormData,
  name = "description",
  id = "",
  nameChecked = "",
  labelChecked = "",
}: any) {
  const handleChangeInput = (e: any) => {
    if (name !== "") {
      setFormData((preData: any) => {
        return {
          ...preData,
          [name]: e.target.value,
        };
      });
    }
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
        rows={4}
        disabled={disable}
        className={`${stylesAdd["form-control"]}`}
        name={name}
        id={id}
        value={value && value}
        placeholder={placeholder}
        onChange={handleChangeInput}
      />
    </div>
  );
}
