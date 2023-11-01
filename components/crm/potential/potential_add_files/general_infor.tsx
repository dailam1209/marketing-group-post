import { useEffect, useState } from "react";
import PotentialSelectBoxStep from "../potential_steps/select_box_step";
import styles from "./add_file_potential.module.css";
import InputText from "./input_text";
import {
  getPotentialDepartment,
  getPotentialPosition,
  getPotentialResource,
  getPotentialType,
  getVocative,
} from "@/utils/listOption";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
export default function AddGeneralInfo({ formData, setFormData, refs }: any) {
  // const fullname = `${formData.tendem} ${formData.ten}`;
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    $(".js-example-basic-single").select2();

    setFullname(
      `${formData?.firstName ? formData?.firstName : ""} ${
        formData?.lastName ? formData?.lastName : ""
      }`
    );
  }, [formData]);

  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Xưng hô</label>
          <PotentialSelectBoxStep
            placeholder="Chọn"
            // multiple={true}
            refKey={refs.vocativeRef}
            value={formData?.vocative}
            data={getVocative}
          />
        </div>

        <InputText
          value={formData?.firstName}
          setFormData={setFormData}
          keyValue="firstName"
          label="Họ và đệm"
          placeholder="Nhập tên đệm"
        />
      </div>
      <div className={styles.row_input}>
        <InputText
          value={formData?.lastName}
          setFormData={setFormData}
          keyValue="lastName"
          label="Tên"
          placeholder="Nhập tên khách hàng"
        />
        <span className={styles.red_dot}>*</span>
        <InputText
          value={fullname === " " ? "Họ và tên" : fullname}
          setFormData={setFormData}
          keyValue="hovaten"
          label="Họ và tên"
          placeholder={"Họ và tên"}
          bonus="disabled"
        />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Chức danh</label>
          <PotentialSelectBoxStep
            placeholder="Chọn"
            refKey={refs.posIdRef}
            value={formData?.pos_id}
            data={getPotentialPosition}
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Phòng ban</label>
          <PotentialSelectBoxStep
            placeholder="Chọn"
            value={formData?.department}
            selectData={(value) => {
              setFormData((prev) => {
                return { ...prev, department: value };
              });
            }}
            data={getPotentialDepartment}
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText
          value={formData?.office_phone}
          setFormData={setFormData}
          keyValue="office_phone"
          label="Điện thoại cơ quan"
          placeholder="Nhập diện thoại cơ quan"
        />
        <div style={{ width: "100%", position: "relative", flex: 1 }}>
          <InputText
            value={formData?.private_phone}
            setFormData={setFormData}
            keyValue="private_phone"
            label="Điện thoại cá nhân"
            placeholder="Nhập điện thoại cá nhân"
          />
          <button className={styles.span_custom}>
            + Thêm số điện thoại khác
          </button>
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText
          value={formData?.office_email}
          setFormData={setFormData}
          keyValue="office_email"
          label="Email cơ quan"
          placeholder="Email cơ quan"
        />
        <InputText
          value={formData?.private_email}
          setFormData={setFormData}
          keyValue="private_email"
          label="Email cá nhân"
          placeholder="Email cá nhân"
        />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Nguồn gốc</label>
          <PotentialSelectBoxStep
            placeholder="Chọn"
            value={formData?.resoure}
            ref={refs.resourceRef}
            data={getPotentialResource}
          />
        </div>
        <InputText
          value={formData?.tax_code}
          setFormData={setFormData}
          keyValue="tax_code"
          label="Mã số thuế"
          placeholder="Nhập mã số thuế"
        />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Loại tiềm năng</label>
          <PotentialSelectBoxStep
            refKey={refs.typeRef}
            value={formData?.tyep}
            placeholder="Chọn"
            data={getPotentialType}
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Mạng xã hôi</label>
          <PotentialSelectBoxStep
            placeholder="Chọn"
            value={formData?.cus_from}
            selectData={(value) => {
              setFormData((prev) => {
                return { ...prev, cus_from: value };
              });
            }}
            data={[
              "Facebook",
              "Zalo",
              "Website",
              "Dữ liệu bên thứ 3",
              "Khách hàng giới thiệu",
              "Giới thiệu",
              "Chăm sóc khách hàng",
              "Email",
            ]}
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>
            Nhân viên phụ trách
          </label>
          <PotentialSelectBoxStep
            value="Chọn nhân viên phụ trách"
            placeholder="Chọn nhân viên phụ trách"
          />
        </div>
      </div>
      <link href="path/to/select2.min.css" rel="stylesheet" />
      <script src="path/to/select2.min.js"></script>
    </div>
  );
}

export const MInputAndAdd = ({
  title = "",
  label,
  placeholder,
  require = false,
  disable = false,
  type = "text",
  value = "",
  setFormData,
  name = "",
  id = "",
}) => {
  return (
    <div style={{ width: "100%", position: "relative", flex: 1 }}>
      <InputText
        require={require}
        disable={disable}
        type={type}
        id={id}
        value={value}
        setFormData={setFormData}
        name={name}
        label={label}
        placeholder={placeholder}
      />
      {title ?? <button className={styles.span_custom}>+ {title}</button>}
    </div>
  );
};
