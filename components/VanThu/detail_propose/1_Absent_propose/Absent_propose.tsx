import Input_calender from "@/components/VanThu/components/Input/Input_calender/Input_calender";
import { Input_file_3 } from "@/components/VanThu/components/Input/Input_file/Input_file";
import Input_select from "@/components/VanThu/components/Input/Input_select/Input_select";
import {
  Custom_input_text,
  Custom_input_textarea,
} from "@/components/VanThu/components/Input/Input_text/Input_text";
import Label, {
  Custom_label,
  Required_label,
  Required_sign,
} from "@/components/VanThu/components/Input/Label/Label";
import Section from "@/components/VanThu/components/Input/Section/Section";
import {
  fetch_shift,
  fetch_supervisor_approver,
} from "@/utils/api/dexuat/api_fetch";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import Image from "next/image";
import { ChangeEvent, use, useCallback, useEffect, useState } from "react";
import styles from "./propose.module.css";
import * as Yup from "yup";
import { post_absent_propose } from "@/utils/api/dexuat/api_post";
import router from "next/router";

interface adsentInfor {
  shift: string;
  start_date: string;
  end_date: string;
}
export const select_style = {
  control: (provided: any) => ({
    ...provided,
    height: "45px",
  }),
};
const Absent_propose = ({ inuse }: { inuse?: boolean }) => {
  const validationSchema = Yup.object().shape({
    name_dx: Yup.string().required("Vui lòng nhập tên đề xuất."),
    ly_do: Yup.string().required("Vui lòng nhập lý do."),
    id_user_duyet: Yup.string().required("Vui lòng chọn người duyệt."),
    id_user_theo_doi: Yup.string().required("Vui lòng chọn người theo dõi."),
  });
  const [supervior, setSuperVisor] = useState<any>();
  const [approver, setApprover] = useState<any>();
  const [shiftData, setShiftData] = useState<any>();
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
  const ca_options = shiftData?.map((opts: any) => {
    return { value: opts.shift_id, label: opts.shift_name, name: "ca_nghi" };
  });
  ca_options?.unshift({
    value: "all",
    label: "Nghỉ cả ngày (tất cả các ca)",
    name: "ca_nghi",
  });
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const handleCheckbox1Change = (e: any) => {
    setCheckbox1(true);
    setCheckbox2(false);
    handleInputChange(e);
  };
  const handleCheckbox2Change = (e: any) => {
    setCheckbox1(false);
    setCheckbox2(true);
    handleInputChange(e);
  };
  const [AbsentInfor, SetAbsentInfor] = useState<adsentInfor>({
    shift: "",
    start_date: "",
    end_date: "",
  });
  const [AbsentInforList, SetAbsentInforList] = useState<adsentInfor[]>([]);
  useEffect(() => {
    const { shift, start_date, end_date } = AbsentInfor;

    if (shift && start_date && end_date) {
      const data = AbsentInfor;
      if (shift === "all") {
        data.shift = "";
      }
      const newAbsentInforList = [...AbsentInforList, data];
      SetAbsentInforList(newAbsentInforList);
      SetAbsentInfor({ shift: "", start_date: "", end_date: "" });
    }
  }, [AbsentInfor, AbsentInforList]);
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      noi_dung: JSON.stringify({
        nghi_phep: AbsentInforList.map((item) => [
          item.start_date,
          item.end_date,
          item.shift,
        ]),
      }),
    }));
  }, [AbsentInforList]);
  const handleAdsentInforInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    SetAbsentInfor((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSelectInput = (name: string, value: any) => {
    SetAbsentInfor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const removeAdsent = (index: number) => {
    SetAbsentInforList((prevList) => prevList.filter((_, i) => i !== index));
  };
  const [formData, setFormData] = useState<any>({});
  const handleInputChange = (e: any) => {
    const { name, type, value } = e.target;
    if (type === "checkbox") {
      if (name === "time_ndx") {
        setFormData((prev: any) => ({
          ...prev,
          loai_np: "1",
        }));
      } else if (name === "time_nkh") {
        setFormData((prev: any) => ({
          ...prev,
          loai_np: "2",
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
      console.log(formData);
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
      const res = await post_absent_propose(form_data);
      alert("Tạo đề xuất thành công");
      router.push("/VanThu/trang-quan-ly-de-xuat/de-xuat");
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
                  input_name="name"
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
                  value="Đơn xin nghỉ phép"
                  input_name="loai_dexuat"
                />
              }
            />
          </div>
          <div className={styles.double_checkbox}>
            <input
              checked={checkbox1}
              onClick={handleCheckbox1Change}
              name="time_ndx"
              className={styles.checkbox_input}
              type="checkbox"
            />
            <label className={styles.checkbox_label}>
              Đề xuất có kế hoạch
              <Required_sign />
            </label>
            <input
              checked={checkbox2}
              onClick={handleCheckbox2Change}
              name="time_nkh"
              className={styles.checkbox_input}
              type="checkbox"
            />
            <label className={styles.checkbox_label}>
              Đề xuất đột xuất
              <Required_sign />
            </label>
          </div>
          <div className={styles.col_2_d_flex}>
            <Section
              style="w_50_g20"
              label={
                <Custom_label
                  isRequired={true}
                  label_class="font_500"
                  title="Ngày bắt đầu nghỉ"
                />
              }
              input={
                <Input_calender
                  placeholder="Chọn ngày"
                  datetype="date"
                  calender_class="calender_class_schedule"
                  calender_label_class="calender_label_class_schedule"
                  handle_input={handleAdsentInforInput}
                  input_name="start_date"
                  absentInfor={AbsentInfor}
                />
              }
            />
            <Section
              style="w_50_g20"
              label={
                <Custom_label
                  isRequired={true}
                  label_class="font_500"
                  title="Ngày kết thúc nghỉ"
                />
              }
              input={
                <Input_calender
                  placeholder="Chọn ngày"
                  datetype="date"
                  calender_class="calender_class_schedule"
                  calender_label_class="calender_label_class_schedule"
                  handle_input={handleAdsentInforInput}
                  input_name="end_date"
                  absentInfor={AbsentInfor}
                />
              }
            />
          </div>
          <Section
            style="col_2"
            label={
              <Custom_label
                isRequired={true}
                label_class="font_500"
                title="Ca nghỉ"
              />
            }
            input={
              <Input_select
                style={select_style}
                options={ca_options}
                onChange={(selectedOption) =>
                  handleSelectInput("shift", selectedOption.value)
                }
                absentInfor={AbsentInfor}
                placeholder="Chọn ca làm việc"
              />
            }
          />
          {AbsentInforList.toString() && (
            <div className={styles.box_user_nhan}>
              <div className={styles.header_box_user}>
                <p className={styles.box_p_box_p1}>Stt</p>
                <p className={styles.box_p_box_p2}>Ca nghỉ</p>
                <p className={styles.box_p_box_p3}>Ngày bắt đầu nghỉ</p>
                <p className={styles.box_p_box_p4}>Ngày kết thúc nghỉ</p>
                <p className={styles.box_p_box_p5}></p>
              </div>
              {AbsentInforList.map((item, index) => {
                const shift_label = ca_options.filter(
                  (p: any) => p.value === item.shift
                );
                return (
                  <>
                    <div className={styles.main_box_user}>
                      <p className={styles.box_p_box_p1}>{index + 1}</p>
                      <p className={styles.box_p_box_p2}>
                        {shift_label[0]
                          ? shift_label[0]?.label
                          : "Nghỉ cả ngày (tất cả các ca)"}
                      </p>
                      <p className={styles.box_p_box_p3}>{item.start_date}</p>
                      <p className={styles.box_p_box_p4}>{item.end_date}</p>
                      <p
                        onClick={() => removeAdsent(index)}
                        className={styles.box_p_box_p5}
                      >
                        <Image
                          width={20}
                          height={20}
                          src="/icon/icon_loai_bo.png"
                          alt={""}
                        />
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
        <div className={`${styles.mt_15} ${styles.w_100}`}>
          <Custom_label
            isRequired={true}
            label_class="font_500"
            title="Lý do xin nghỉ"
          />
          <div className={styles.textarea}>
            <Custom_input_textarea
              placeholder="Nhập lý do xin nghỉ"
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
                isMulti
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
                handleChange={handleFileChange}
                name="fileKem"
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
export default Absent_propose;
