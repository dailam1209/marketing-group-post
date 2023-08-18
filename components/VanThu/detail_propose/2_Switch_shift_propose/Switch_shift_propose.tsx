import Input_calender from "@/components/VanThu/components/Input/Input_calender/Input_calender";
import { Input_file_3 } from "@/components/VanThu/components/Input/Input_file/Input_file";
import Input_select from "@/components/VanThu/components/Input/Input_select/Input_select";
import {
  Custom_input_text,
  Custom_input_textarea,
} from "@/components/VanThu/components/Input/Input_text/Input_text";
import Label, { Custom_label } from "@/components/VanThu/components/Input/Label/Label";
import Section from "@/components/VanThu/components/Input/Section/Section";
import {
  fetch_shift,
  fetch_supervisor_approver,
} from "@/utils/api/dexuat/api_fetch";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { select_style } from "../1_Absent_propose/Absent_propose";
import styles from "./propose.module.css";
import * as Yup from "yup";
import { post_switch_shift_propose } from "@/utils/api/dexuat/api_post";
import router from "next/router";

export const confirm_type_options = [
  {name:'kieu_duyet', value: "0", label: "Kiểm duyệt đồng thời" },
  {name:'kieu_duyet', value: "", label: "Kiểm duyệt lần lượt" },
];
const Switch_shift_propose = ({ inuse }: { inuse?: boolean }) => {
  const validationSchema = Yup.object().shape({
    name_dx: Yup.string().required("Vui lòng nhập tên đề xuất."),
    ly_do: Yup.string().required("Vui lòng nhập lý do."),
    id_user_duyet: Yup.string().required("Vui lòng chọn người duyệt."),
    id_user_theo_doi: Yup.string().required("Vui lòng chọn người theo dõi."),
    ngay_can_doi: Yup.string().required("Vui lòng nhập ngày cần đổi."),
    ngay_muon_doi: Yup.string().required("Vui lòng nhập ngày muốn đổi."),
    ca_can_doi: Yup.string().required("Vui lòng nhập ca cần đổi."),
    ca_muon_doi: Yup.string().required("Vui lòng nhập ca muốn đổi."),
  });
  const [shiftData, setShiftData] = useState<any>();
  const [supervior, setSuperVisor] = useState<any>();
  const [approver, setApprover] = useState<any>();
  useEffect(() => {
    const fetchdata = async () => {
      if (inuse) {
        const token = sessionStorage.getItem("token");
        const response = await fetch_supervisor_approver(token);
        const response2 = await fetch_shift(token);
        setSuperVisor(response?.data.listUsersTheoDoi);
        setApprover(response?.data.listUsersDuyet);
        setShiftData(response2?.data.list);
      }
    };
    fetchdata();
  }, [inuse]);
  const id_user_duyet_options = approver?.map((opts: any) => {
    return {
      value: opts.idQLC,
      label: opts.userName,
      image: opts.avatarUser,
      name: "id_user_duyet",
    };
  });
  const id_user_theo_doi_options = supervior?.map((opts: any) => {
    return {
      value: opts.idQLC,
      label: opts.userName,
      image: opts.avatarUser,
      name: "id_user_theo_doi",
    };
  });
  const ca_can_doi_options = shiftData?.map((opt: any) => {
    return { value: opt.shift_id, label: opt.shift_name, name: "ca_can_doi" };
  });
  const ca_muon_doi_options = shiftData?.map((opt: any) => {
    return { value: opt.shift_id, label: opt.shift_name, name: "ca_muon_doi" };
  });
  const [formData, setFormData] = useState<any>({
    name_user: getCookie("userName")?.toString(),
  });
  const handleInputChange = (e: any) => {
    const { name, type, value } = e.target;
    if (type === "checkbox") {
      if (name === "time_ndx") {
        setFormData((prev: any) => ({
          ...prev,
          type_time: "0",
        }));
      } else if (name === "time_nkh") {
        setFormData((prev: any) => ({
          ...prev,
          type_time: "1",
        }));
      }
    } else if (
      type === "date" ||
      type === "datetime" ||
      type === "datetime-local" ||
      type === "month"
    ) {
      const date = new Date(value);
      const numberDate = date.getTime();
      setFormData((prev: any) => ({
        ...prev,
        [name]: numberDate / 1000,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const handleSelectChange = (e: any) => {
    const { name, value } = e;
    if (name) {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        id_user_duyet: [...e.map((rec: any) => rec.value)].join(","),
      }));
    }
  };
  const handleFileChange = useCallback((e: any) => {
    const { name, value } = e;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }, []);
  const [errors, setErrors] = useState<any>({});
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      var form_data = new FormData();
      for (var key in formData) {
        form_data.append(key, formData[key]);
      }
      if (formData.fileKem) {
        if (formData.fileKem.length > 0) {
          for (var i = 0; i < formData.fileKem.length; i++) {
            form_data.append(`fileKem[${i}]`, formData.fileKem[i]);
          }
        }
      }
      const res = await post_switch_shift_propose(form_data);
      alert("Tạo đề xuất thành công");
      router.push("/trang-quan-ly-de-xuat/de-xuat");
    } catch (error: any) {
      const newErrors: any = {};
      if (error?.inner) {
        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message;
        });
      }
      setErrors(newErrors);
    }
  };
  return (
    <form className={styles.form_propose}>
      <div className={styles.wrapper_form}>
        <div className={styles.row}>
          <Section
            style="col_2"
            label={
              <Custom_label
                isRequired={true}
                title="Tên đề xuất"
                label_class="font_500"
              />
            }
            input={
              <Custom_input_text
                inputclass="input_text_shedule"
                placeholder="Nhập tên đề xuất"
                input_name="name_dx"
                handleChange={handleInputChange}
              />
            }
            validation={
              errors.name_dx && (
                <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                  {errors.name_dx}
                </p>
              )
            }
          />
          <div className={styles.col_2_d_flex}>
            <Section
              style="w_50_g20"
              label={
                <Custom_label
                  isRequired={false}
                  label_class="font_500"
                  title="Họ và tên"
                />
              }
              input={
                <Custom_input_text
                  inputclass="input_text_shedule"
                  placeholder="Họ và tên"
                  value={getCookie("userName")?.toString()}
                  isDisabled={true}
                />
              }
            />
            <Section
              style="w_50_g20"
              label={
                <Custom_label
                  isRequired={false}
                  label_class="font_500"
                  title="Loại đề xuất"
                />
              }
              input={
                <Custom_input_text
                  isDisabled={true}
                  inputclass="input_text_shedule"
                  placeholder="Loại đề xuất"
                  value="Đơn xin đổi ca"
                />
              }
            />
          </div>
          <Section
            style="col_2"
            label={
              <Custom_label
                isRequired={false}
                title="Kiểm duyệt"
                label_class="font_500"
              />
            }
            input={
              <Input_select
                style={select_style}
                options={confirm_type_options}
                defautlValue={confirm_type_options[0]}
              />
            }
          />
        </div>
        <div className={styles.w_100}>
          <Custom_label
            isRequired={true}
            title="Ca đổi"
            label_class="font_500"
          />
          <div className={styles.row}>
            <Section
              style="col_2"
              input={
                <Input_calender
                  placeholder="Chọn ngày"
                  datetype="date"
                  calender_class="calender_class_schedule"
                  calender_label_class="calender_label_class_schedule"
                  input_name="ngay_can_doi"
                  handle_input={handleInputChange}
                />
              }
              validation={
                errors.ngay_can_doi && (
                  <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                    {errors.ngay_can_doi}
                  </p>
                )
              }
            />
            <Section
              style="col_2"
              input={
                <Input_select
                  style={select_style}
                  placeholder="Chọn ca"
                  onChange={handleSelectChange}
                  options={ca_can_doi_options}
                />
              }
              validation={
                errors.ca_can_doi && (
                  <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                    {errors.ca_can_doi}
                  </p>
                )
              }
            />
            <div className={styles.col_2}></div>
          </div>
        </div>
        <div className={styles.w_100}>
          <Custom_label
            isRequired={true}
            title="Ca cần đổi"
            label_class="font_500"
          />
          <div className={styles.row}>
            <Section
              style="col_2"
              input={
                <Input_calender
                  placeholder="Chọn ngày"
                  datetype="date"
                  calender_class="calender_class_schedule"
                  calender_label_class="calender_label_class_schedule"
                  input_name="ngay_muon_doi"
                  handle_input={handleInputChange}
                />
              }
              validation={
                errors.ngay_muon_doi && (
                  <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                    {errors.ngay_muon_doi}
                  </p>
                )
              }
            />
            <Section
              style="col_2"
              input={
                <Input_select
                  style={select_style}
                  placeholder="Chọn ca"
                  onChange={handleSelectChange}
                  options={ca_muon_doi_options}
                />
              }
              validation={
                errors.ca_muon_doi && (
                  <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                    {errors.ca_muon_doi}
                  </p>
                )
              }
            />
            <div className={styles.col_2}></div>
          </div>
        </div>
        <div className={`${styles.mt_15} ${styles.w_100}`}>
          <Custom_label
            isRequired={true}
            label_class="font_500"
            title="Lý do xin đổi ca"
          />
          <div className={styles.textarea}>
            <Custom_input_textarea
              placeholder="Nhập lý do xin đổi ca"
              inputclass="custom_input_textarea_adsent"
              input_name="ly_do"
              handleChange={handleInputChange}
            />
          </div>
          {errors.ly_do && (
            <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
              {errors.ly_do}
            </p>
          )}
        </div>
        <div className={`${styles.mt_15} ${styles.row}`}>
          <Section
            style="col_2"
            label={
              <Custom_label
                isRequired={true}
                label_class="font_500"
                title="Người xét duyệt"
              />
            }
            input={
              <Input_select
                style={select_style}
                options={id_user_duyet_options}
                onChange={handleSelectChange}
                placeholder="Chọn người xét duyệt"
                isMulti={true}
              />
            }
            validation={
              errors.id_user_duyet && (
                <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                  {errors.id_user_duyet}
                </p>
              )
            }
          />
          <Section
            style="col_2"
            label={
              <Custom_label
                isRequired={true}
                label_class="font_500"
                title="Người theo dõi"
              />
            }
            input={
              <Input_select
                style={select_style}
                options={id_user_theo_doi_options}
                onChange={handleSelectChange}
                placeholder="Chọn người theo dõi"
              />
            }
            validation={
              errors.id_user_theo_doi && (
                <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                  {errors.id_user_theo_doi}
                </p>
              )
            }
          />
          <Section
            style="col_2"
            label={
              <Custom_label
                isRequired={true}
                label_class="font_500"
                title="Tài liệu đính kèm"
              />
            }
            input={
              <Input_file_3
                placeholder="Thêm tài liệu đính kèm"
                name="fileKem"
                handleChange={handleFileChange}
              />
            }
          />
        </div>
      </div>
      <div className={styles.confirm}>
        <button className={styles.cancel}>Hủy</button>
        <button
          onClick={handleSubmit}
          type="submit"
          className={styles.create_propose}
        >
          Tạo đề xuất
        </button>
      </div>
    </form>
  );
};
export default Switch_shift_propose;
