import { useEffect, useState } from "react";
import PotentialSelectBoxStep from "../potential_steps/select_box_step";
import styles from "./add_file_potential.module.css";
import InputText from "./input_text";
import { getVocative } from "@/utils/function";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
export default function AddGeneralInfo({ formData, setFormData }: any) {
  // const fullname = `${formData.tendem} ${formData.ten}`;
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    $(".js-example-basic-single").select2();

    setFullname(
      `${formData?.tendem ? formData?.tendem : ""} ${
        formData?.ten ? formData?.ten : ""
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
            value={formData?.cus_from}
            selectData={(value) => {
              setFormData({ ...formData, cus_from: value });
            }}
            data={getVocative}
          />
        </div>

        <InputText
          value={formData?.tendem}
          setFormData={setFormData}
          keyValue="tendem"
          label="Họ và đệm"
          placeholder="Nhập tên đệm"
        />
      </div>
      <div className={styles.row_input}>
        <InputText
          value={formData?.ten}
          setFormData={setFormData}
          keyValue="ten"
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
            value={formData?.cus_from}
            selectData={(value) => {
              setFormData((prev) => {
                return { ...prev, cus_from: value };
              });
            }}
            data={[
              "Chủ tịch",
              "Phó chủ tịch",
              "Tổng giám đốc",
              "Phó tổng giám đốc",
              "Giám đốc",
              "Kế toán trưởng",
              "Trưởng phòng",
              "Trợ lý",
              "Nhân viên",
            ]}
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Phòng ban</label>
          <PotentialSelectBoxStep
            placeholder="Chọn"
            value={formData?.cus_from}
            selectData={(value) => {
              setFormData((prev) => {
                return { ...prev, cus_from: value };
              });
            }}
            data={[
              "Ban giám đốc",
              "Phòng tài chính",
              "Phòng nhân sự ",
              "Phòng marketing",
              "Phòng CSKH",
              "Phòng hành chính tổng hợp",
              "Phòng kỹ thuật",
              "Phòng kinh doanh",
            ]}
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText
          value={formData?.dienthoaicoquan}
          setFormData={setFormData}
          keyValue="dienthoaicoquan"
          label="Điện thoại cơ quan"
          placeholder="Nhập diện thoại cơ quan"
        />
        <div style={{ width: "100%", position: "relative", flex: 1 }}>
          <InputText
            value={formData?.dienthoaicanhan}
            setFormData={setFormData}
            keyValue="dienthoaicanhan"
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
          value={formData?.emailcoquan}
          setFormData={setFormData}
          keyValue="emailcoquan"
          label="Email cơ quan"
          placeholder="Email cơ quan"
        />
        <InputText
          value={formData?.emailcanhan}
          setFormData={setFormData}
          keyValue="emailcanhan"
          label="Email cá nhân"
          placeholder="Email cá nhân"
        />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Nguồn gốc</label>
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
        <InputText
          value={formData?.masothue}
          setFormData={setFormData}
          keyValue="masothue"
          label="Mã số thuế"
          placeholder="Nhập mã số thuế"
        />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Loại tiềm năng</label>
          <PotentialSelectBoxStep keyValue="" value="Chọn" placeholder="Chọn" />
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
