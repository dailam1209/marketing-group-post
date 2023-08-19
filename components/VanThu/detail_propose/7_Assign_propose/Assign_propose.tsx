import {
  fetch_department,
  fetch_employee,
  fetch_position,
  fetch_supervisor_approver,
} from "@/utils/api/dexuat/api_fetch";
import { getCookie } from "cookies-next";
import { useState, useEffect, useCallback } from "react";
import { select_style } from "../1_Absent_propose/Absent_propose";
import styles from "./propose.module.css";
import * as Yup from "yup";
import { post_assign_propose } from "@/utils/api/dexuat/api_post";
import router from "next/router";
import { Input_file_3 } from "@/components/VanThu/components/Input/Input_file/Input_file";
import Input_select from "@/components/VanThu/components/Input/Input_select/Input_select";
import { Custom_input_text, Custom_input_textarea } from "@/components/VanThu/components/Input/Input_text/Input_text";
import { Custom_label } from "@/components/VanThu/components/Input/Label/Label";
import Section from "@/components/VanThu/components/Input/Section/Section";

const Assign_propose = ({ inuse }: { inuse?: boolean }) => {
  const validationSchema = Yup.object().shape({
    name_dx: Yup.string().required("Vui lòng nhập tên đề xuất."),
    ly_do: Yup.string().required("Vui lòng nhập lý do."),
    id_user_duyet: Yup.string().required("Vui lòng chọn người duyệt."),
    id_user_theo_doi: Yup.string().required("Vui lòng chọn người theo dõi."),
    thanhviendc_bn: Yup.string().required(
      "Vui lòng chọn thành viên được bổ nhiệm."
    ),
    chucvu_dx_bn: Yup.string().required("Vui lòng chọn chức vụ đề xuất."),
    phong_ban_moi: Yup.string().required("Vui lòng chọn phòng ban mới."),
  });
  const [supervior, setSuperVisor] = useState<any>();
  const [approver, setApprover] = useState<any>();
  const [department, setDepartment] = useState<any>();
  const [employee, setEmployee] = useState<any>();
  const [position, setPosition] = useState<any>();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchdata = async () => {
      if (inuse) {
        const response = await fetch_supervisor_approver(token);
        const res_department = await fetch_department(token);
        const res_employee = await fetch_employee(token);
        const res_position = await fetch_position("chucvu_dx_bn");
        setSuperVisor(response?.data.listUsersTheoDoi);
        setApprover(response?.data.listUsersDuyet);
        setDepartment(res_department?.data.data);
        setEmployee(res_employee?.data.data);
        setPosition(res_position);
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
  const departmnet_options = department?.map((opts: any) => {
    return { value: opts.dep_id, label: opts.dep_name, name: "phong_ban_moi" };
  });
  const employee_options = employee?.map((opts: any) => {
    return {
      value: opts.idQLC,
      label: opts.userName,
      image: opts.avatarUser,
      department: opts.nameDeparment,
      department_id: opts.dep_id,
      name: "thanhviendc_bn",
      role: opts.position_id,
    };
  });
  const [formData, setFormData] = useState<any>({
    department: "",
    role: "",
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
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
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
      for(var key in formData) {
          form_data.append(key, formData[key]);
      }
      if(formData.fileKem){
        if(formData.fileKem.length > 0){
          for( var i  = 0 ; i < formData.fileKem.length ; i++){
            form_data.append(`fileKem[${i}]`, formData.fileKem[i]);
          }
        }
      }
      const res = await post_assign_propose(form_data)
      alert('Tạo đề xuất thành công')
      router.push('/VanThu/trang-quan-ly-de-xuat/de-xuat');

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
  const handleEmployeeSelect = (e: any) => {
    const { value, department, department_id, role } = e;
    const cv = position.filter((pos: any) => pos.value === role.toString());
    setFormData((prev: any) => ({
      ...prev,
      thanhviendc_bn: value,
      department: department,
      name_ph_bn: department_id[0],
      role: cv[0].label,
      chucvu_hientai: role,
    }));
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
                  title="Thành viên đề xuất"
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
                  placeholder=""
                  value="Đơn xin bổ nhiệm"
                />
              }
            />
          </div>
        </div>
        <div className={styles.row}>
          <Section
            style="col_2"
            label={
              <Custom_label
                isRequired={true}
                label_class="font_500"
                title="Thành viên được bổ nhiệm"
              />
            }
            input={
              <Input_select
                style={select_style}
                options={employee_options}
                placeholder={"Chọn người bổ nhiệm"}
                onChange={handleEmployeeSelect}
              />
            }
            validation={
              errors.thanhviendc_bn && (
                <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                  {errors.thanhviendc_bn}
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
                  title="Phòng ban"
                />
              }
              input={
                <Custom_input_text
                  inputclass="input_text_shedule"
                  placeholder="Tự động hiển thị theo người được tích bổ nhiệm"
                  value={
                    formData.department
                      ? formData.department
                      : "Thành viên chưa có phòng ban"
                  }
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
                  title="Chức vụ hiện tại"
                />
              }
              input={
                <Custom_input_text
                  isDisabled={true}
                  inputclass="input_text_shedule"
                  placeholder="Tự động hiển thị theo người được tích bổ nhiệm"
                  value={formData.role}
                />
              }
            />
          </div>
        </div>
        <div className={`${styles.row}`}>
          <Section
            style="col_2"
            label={
              <Custom_label
                isRequired={true}
                title="Chức vụ đề xuất bổ nhiệm"
                label_class="font_500"
              />
            }
            input={
              <Input_select
                style={select_style}
                options={position}
                placeholder={"Chọn chức vụ đề xuất bổ nhiệm"}
                onChange={handleSelectChange}
              />
            }
            validation={
              errors.chucvu_dx_bn && (
                <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                  {errors.chucvu_dx_bn}
                </p>
              )
            }
          />
          <Section
            style="col_2"
            label={
              <Custom_label
                isRequired={true}
                title="Phòng ban mới"
                label_class="font_500"
              />
            }
            input={
              <Input_select
                style={select_style}
                options={departmnet_options}
                placeholder={"Chọn phòng ban"}
                onChange={handleSelectChange}
              />
            }
            validation={
              errors.phong_ban_moi && (
                <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                  {errors.phong_ban_moi}
                </p>
              )
            }
          />
        </div>
        <div className={styles.w_100}>
          <Custom_label
            isRequired={true}
            label_class="font_500"
            title="Lý do xin đề cấp bổ nhiệm"
          />
          <div className={styles.textarea}>
            <Custom_input_textarea
              placeholder="Nhập do xin đề cấp bổ nhiệm"
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
export default Assign_propose;