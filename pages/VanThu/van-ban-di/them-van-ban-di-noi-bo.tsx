import React, { useEffect, useState, ChangeEvent, useCallback } from "react";
import Head from "next/head";
import styles from "./vanbandi.module.css";
import Link from "next/link";
import Image from "next/image";
import {
  fetch_department,
  fetch_employee,
  fetch_position,
} from "@/utils/api/dexuat/api_fetch";
import { post_vanbandi_in } from "@/utils/api/dexuat/api_post";
import * as Yup from "yup";
import Input_calender from "@/components/VanThu/components/Input/Input_calender/Input_calender";
import Input_file, { Input_file_2 } from "@/components/VanThu/components/Input/Input_file/Input_file";
import Input_select, { Old_input_select } from "@/components/VanThu/components/Input/Input_select/Input_select";
import SwitchInput from "@/components/VanThu/components/Input/Input_switch/Input_switch";
import Input_text, { Input_ckeditor, Custom_input_textarea } from "@/components/VanThu/components/Input/Input_text/Input_text";
import Label, { Required_label, Required_sign } from "@/components/VanThu/components/Input/Label/Label";
import Section from "@/components/VanThu/components/Input/Section/Section";

function Destination({ des }: { des: string }) {
  return (
    <Link
      href="/VanThu/van-ban-di/them-van-ban-di-noi-bo"
      className={`${styles.destination_target}`}
    >
      {des}
    </Link>
  );
}
function Destination2({ des }: { des: string }) {
  return (
    <Link
      href="/VanThu/van-ban-di/them-van-ban-di-ra-ngoai"
      className={`${styles.destination_target_2}`}
    >
      {des}
    </Link>
  );
}
const Index = () => {
  const validationSchema = Yup.object().shape({
    ten_vanban: Yup.string().required("Vui lòng nhập tên văn bản"),
    trich_yeu: Yup.string().required(
      "Vui lòng nhập trích yếu nội dung văn bản"
    ),
    so_vanban: Yup.string().required("Vui lòng nhập số văn bản"),
    nam_vb: Yup.string().required("Vui lòng chọn năm"),
    thoi_gian_ban_hanh: Yup.string().required(
      "Vui lòng nhập thời gian ban hành"
    ),
    nhom_van_ban: Yup.string().required("Vui lòng chọn nhóm văn bản"),
    type_vb: Yup.string().required("Vui lòng chọn loại văn bản"),
    loai_xet_duyet: Yup.string().required("Vui lòng loại xét duyệt"),
    thoi_gian_duyet: Yup.string().required("Vui lòng nhập thời gian xét duyệt"),
    data_nguoi_duyet: Yup.mixed().required("Vui lòng chọn người duyệt"),
    nguoi_theo_doi: Yup.string().required("Vui lòng chọn người theo dõi"),
    ngki_form: Yup.string().required("Vui lòng chọn người ký"),
    ngki_form_array: Yup.string().required("Vui lòng chọn người ký"),
    pos: Yup.string().required("Vui lòng chọn chức vụ người ký"),
    xet_duyet_van_ban: Yup.string().required("Vui lòng chọn kiểu xét duyệt"),
    ten_so_vanban: Yup.string().required("Vui lòng chọn loại sổ văn bản"),
    ngnhan_form: Yup.string().required("Vui lòng chọn người nhận "),
    noidung_vanban: Yup.string().required("Vui lòng nhập nội dung văn bản"),
    vb_th: Yup.string().required(),
  });
  const optionalSchema = Yup.object().shape({
    so_vb_tt: Yup.string().required("Vui lòng nhập số văn bản thay thế"),
    ten_vb_tt: Yup.string().required("Vui lòng nhập tên văn bản thay thế"),
    trich_yeu_tt: Yup.string().required(
      "Vui lòng nhập trích yếu văn bản thay thế"
    ),
  });
  const [department, setDepartment] = useState<any>();
  const [employee, setEmployee] = useState<any>();
  const [position_nhan, setPosition_nhan] = useState<any>();
  const [position_ky, setPosition_ky] = useState<any>();
  const [formData, setFormData] = useState<any>({
    nam_vb: "2023",
    xet_duyet_van_ban: "2",
    loai_xet_duyet: "1",
    nhom_van_ban: "1",
    type_nhieu_nguoi_ky: "off",
    vb_th: "12003",
  });
  const [errors, setErrors] = useState<any>({});
  const [employee_nhan_options, setENO] = useState<any>();
  const [employee_ky_options, setEKO] = useState<any>();
  const [pb_nhan, setpb_nhan] = useState<any>();
  const [pb_ky, setpb_ky] = useState<any>();
  const [cv_nhan, setcv_nhan] = useState<any>();
  const [cv_ky, setcv_ky] = useState<any>();
  const [posNgki, setposNgki] = useState<any>();
  const [posNgki_array, setposNgki_array] = useState<any>([]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchdata = async () => {
      const res_department = await fetch_department(token);
      const res_employee = await fetch_employee(token);
      const res_position_nhan = await fetch_position("cv_nguoinhan_vanban");
      const res_position_ky = await fetch_position("cv_nguoiky_vanban");
      setDepartment(res_department?.data.data);
      setEmployee(res_employee?.data.data);
      setPosition_nhan(res_position_nhan);
      setPosition_ky(res_position_ky);
    };
    fetchdata();
  }, []);

  const departmnet_nhan_options = department?.map((opts: any) => {
    return {
      value: opts.dep_id,
      label: opts.dep_name,
      name: "cv_phongban_nhan",
    };
  });
  departmnet_nhan_options?.unshift({
    value: "",
    label: "Phòng ban (Tất cả)",
    name: "cv_phongban_nhan",
  });

  const departmnet_ky_options = department?.map((opts: any) => {
    return { value: opts.dep_id, label: opts.dep_name, name: "cv_phongban" };
  });
  departmnet_ky_options?.unshift({
    value: "",
    label: "Phòng ban (Tất cả)",
    name: "cv_phongban",
  });

  const emp_duyet_options = employee?.map((opts: any) => {
    return {
      value: opts.idQLC,
      label: opts.userName,
      name: "data_nguoi_duyet",
      role: opts.position_id,
    };
  });
  const emp_theodoi_options = employee?.map((opts: any) => {
    return {
      value: opts.idQLC,
      label: opts.userName,
      name: "nguoi_theo_doi",
      role: opts.position_id,
    };
  });
  const handeInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "thoi_gian_ban_hanh") {
      const date = new Date(value);
      const numberDate = date.getTime();
      setFormData((prev: any) => ({
        ...prev,
        [name]: numberDate,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handeCKEChange = (e: any) => {
    const { name, value } = e;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
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
        data_nguoi_duyet: [...e.map((rec: any) => rec.value)],
      }));
    }
  };
  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: files,
    }));
  };
  const handleFileChange2 = useCallback((e: any) => {
    const { name, files } = e;
    setFormData((prev: any) => ({
      ...prev,
      [name]: files,
    }));
  }, []);
  const handleSwitchChange = (e: any) => {
    const { name, value } = e;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      if (formData.type_thay_the === "1") {
        await optionalSchema.validate(formData, { abortEarly: false });
      }
      var form_data = new FormData();
      for (var key in formData) {
        if (
          key !== "data_nguoi_duyet" &&
          key !== "phieu_trinh" &&
          key !== "file_vb"
        ) {
          form_data.append(key, formData[key]);
        }
      }
      if (formData.phieu_trinh && formData.phieu_trinh.length > 0) {
        form_data.append(`phieu_trinh`, formData.phieu_trinh[0]);
      }
      if (formData.file_vb && formData.file_vb.length > 0) {
        for (var i = 0; i < formData.file_vb.length; i++) {
          form_data.append(`file_vb[${i}]`, formData.file_vb[i]);
        }
      }
      if (formData.type_nhieu_nguoi_ky === "on") {
        if (ngki_array) {
          for (var i = 0; i < ngki_array.length; i++) {
            form_data.append(`nguoi_ky[${i}]`, ngki_array[i].toString());
          }
        }
        if (posNgki_array) {
          form_data.append("chuc_vu_nguoi_ky", posNgki_array.join(","));
        }
      } else {
        if (ngki) {
          form_data.append("nguoi_ky[]", ngki.toString());
        }
        if (posNgki) {
          form_data.append("chuc_vu_nguoi_ky", posNgki);
        }
      }
      if (ngNhan_array) {
        for (var i = 0; i < ngNhan_array.length; i++) {
          form_data.append(`id_uv_nhan[${i}]`, ngNhan_array[i].toString());
        }
      }
      if (formData.data_nguoi_duyet) {
        for (var i = 0; i < formData.data_nguoi_duyet.length; i++) {
          form_data.append(
            `data_nguoi_duyet[${i}]`,
            formData.data_nguoi_duyet[i].toString()
          );
        }
      }
      const res = await post_vanbandi_in(form_data);
      console.log(res);
      alert("Tạo văn bản đi thành công");
    } catch (error: any) {
      const newErrors: any = {};
      if (error?.inner) {
        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message;
        });
      }
      setErrors(newErrors);
      console.log(error);
    }
  };
  const options_cfarea = [
    { name: "loai_xet_duyet", value: "1", label: "Duyệt lần lượt" },
    { name: "loai_xet_duyet", value: "2", label: "Duyệt đồng thời" },
  ];
  const options_date = [
    { name: "nam_vb", value: "2018", label: "2018" },
    { name: "nam_vb", value: "2019", label: "2019" },
    { name: "nam_vb", value: "2020", label: "2020" },
    { name: "nam_vb", value: "2021", label: "2021" },
    { name: "nam_vb", value: "2022", label: "2022" },
    { name: "nam_vb", value: "2023", label: "2023" },
    { name: "nam_vb", value: "2024", label: "2024" },
    { name: "nam_vb", value: "2025", label: "2025" },
    { name: "nam_vb", value: "2026", label: "2026" },
  ];
  const options_so_vanban = [
    { name: "ten_so_vanban", value: "0", label: "Văn bản đi" },
    { name: "ten_so_vanban", value: "285", label: "Lưu trữ" },
    { name: "ten_so_vanban", value: "284", label: "sổ văn bản theo số" },
    { name: "ten_so_vanban", value: "283", label: "Ytetre" },
    { name: "ten_so_vanban", value: "225", label: "Ytetre" },
    { name: "ten_so_vanban", value: "216", label: "Văn bản đi" },
    { name: "ten_so_vanban", value: "215", label: "Lưu trữ" },
    { name: "ten_so_vanban", value: "214", label: "sổ văn bản theo số" },
    { name: "ten_so_vanban", value: "31", label: "sổ văn bản theo số" },
    { name: "ten_so_vanban", value: "30", label: "Lưu trữ" },
  ];
  const options_loai_van_ban = [
    { name: "type_vb", value: "1", label: "Nghị quyết" },
    { name: "type_vb", value: "2", label: "Quyết định" },
    { name: "type_vb", value: "3", label: "Chỉ thị" },
    { name: "type_vb", value: "4", label: "Quy chế" },
    { name: "type_vb", value: "5", label: "Quy định" },
    { name: "type_vb", value: "6", label: "Thông cáo" },
    { name: "type_vb", value: "7", label: "Thông báo" },
    { name: "type_vb", value: "8", label: "Hướng dẫn" },
    { name: "type_vb", value: "9", label: "Chương trình" },
    { name: "type_vb", value: "10", label: "Kế hoạch" },
    { name: "type_vb", value: "11", label: "Phương án" },
    { name: "type_vb", value: "12", label: "Đề án" },
    { name: "type_vb", value: "13", label: "Dự án" },
    { name: "type_vb", value: "14", label: "Báo cáo" },
    { name: "type_vb", value: "15", label: "Biên bản" },
    { name: "type_vb", value: "16", label: "Tờ trình" },
    { name: "type_vb", value: "17", label: "Hợp đồng" },
    { name: "type_vb", value: "18", label: "Công văn" },
    { name: "type_vb", value: "19", label: "Công điện" },
    { name: "type_vb", value: "20", label: "Bản ghi nhớ" },
    { name: "type_vb", value: "21", label: "Bản thỏa thuận" },
    { name: "type_vb", value: "22", label: "Giấy ủy quyền" },
    { name: "type_vb", value: "23", label: "Giấy mời" },
    { name: "type_vb", value: "24", label: "Giấy giới thiệu" },
    { name: "type_vb", value: "25", label: "Giấy nghỉ phép" },
    { name: "type_vb", value: "26", label: "Phiếu gửi" },
    { name: "type_vb", value: "27", label: "Phiếu chuyển" },
    { name: "type_vb", value: "28", label: "Phiếu báo" },
    { name: "type_vb", value: "29", label: "Thư công" },
  ];
  const [showTab_nhieungki, SetShowTab_nhieungki] = useState(false);
  const checkHandle = () => {
    SetShowTab_nhieungki(!showTab_nhieungki);
    if (!showTab_nhieungki) {
      handleSwitchChange({ name: "type_nhieu_nguoi_ky", value: "on" });
    } else {
      handleSwitchChange({ name: "type_nhieu_nguoi_ky", value: "off" });
    }
  };
  const [ngNhan_array, setNgNhan_array] = useState<number[]>([]);
  const [ngki_array, setNgKi_array] = useState<number[]>([]);
  const [ngki, setNgKi] = useState<number>();

  const handleNgNhan_pb_change = (e: any) => {
    if (e.value && cv_nhan) {
      setENO(
        employee
          ?.filter(
            (emp: any) =>
              emp.dep_id[0] === e.value &&
              emp.position_id.toString() === cv_nhan
          )
          .map((opts: any) => {
            return {
              value: opts.idQLC,
              label: `(${opts.idQLC}) ${opts.userName}`,
            };
          })
      );
      setpb_nhan(e.value);
    } else if (e.value) {
      setENO(
        employee
          ?.filter((emp: any) => emp.dep_id[0] === e.value)
          .map((opts: any) => {
            return {
              value: opts.idQLC,
              label: `(${opts.idQLC}) ${opts.userName}`,
            };
          })
      );
      setpb_nhan(e.value);
    } else if (cv_nhan) {
      setENO(
        employee
          ?.filter((emp: any) => emp.position_id.toString() === cv_nhan)
          .map((opts: any) => {
            return {
              value: opts.idQLC,
              label: `(${opts.idQLC}) ${opts.userName}`,
            };
          })
      );
      setpb_nhan(null);
    } else {
      setENO(
        employee?.map((opts: any) => {
          return {
            value: opts.idQLC,
            label: `(${opts.idQLC}) ${opts.userName}`,
          };
        })
      );
      setpb_nhan(null);
    }
  };
  const handleNgNhan_cv_change = (e: any) => {
    if (e.value && pb_nhan) {
      setENO(
        employee
          ?.filter(
            (emp: any) =>
              emp.position_id.toString() === e.value &&
              emp.dep_id[0] === pb_nhan
          )
          .map((opts: any) => {
            return {
              value: opts.idQLC,
              label: `(${opts.idQLC}) ${opts.userName}`,
            };
          })
      );
      setcv_nhan(e.value);
    } else if (e.value) {
      setENO(
        employee
          ?.filter((emp: any) => emp.position_id.toString() === e.value)
          .map((opts: any) => {
            return {
              value: opts.idQLC,
              label: `(${opts.idQLC}) ${opts.userName}`,
            };
          })
      );
      setcv_nhan(e.value);
    } else if (pb_nhan) {
      setENO(
        employee
          ?.filter((emp: any) => emp.dep_id[0] === pb_nhan)
          .map((opts: any) => {
            return {
              value: opts.idQLC,
              label: `(${opts.idQLC}) ${opts.userName}`,
            };
          })
      );
      setcv_nhan(null);
    } else {
      setENO(
        employee?.map((opts: any) => {
          return {
            value: opts.idQLC,
            label: `(${opts.idQLC}) ${opts.userName}`,
          };
        })
      );
      setcv_nhan(null);
    }
  };
  const handleNgNhanChange = (e: any) => {
    if (!ngNhan_array.includes(e.value)) {
      setNgNhan_array((prev) => [...prev, e.value]);
      setpb_nhan(null);
      setcv_nhan(null);
    }
  };
  const handleNgki_pb_Change = (e: any) => {
    if (e.value && cv_ky) {
      setEKO(
        employee
          ?.filter(
            (emp: any) =>
              emp.dep_id[0] === e.value && emp.position_id.toString() === cv_ky
          )
          .map((opts: any) => {
            return {
              value: opts.idQLC,
              label: `(${opts.idQLC}) ${opts.userName}`,
              pos: opts.position_id,
            };
          })
      );
      setpb_ky(e.value);
    } else if (e.value) {
      setEKO(
        employee
          ?.filter((emp: any) => emp.dep_id[0] === e.value)
          .map((opts: any) => {
            return {
              value: opts.idQLC,
              label: `(${opts.idQLC}) ${opts.userName}`,
              pos: opts.position_id,
            };
          })
      );
      setpb_ky(e.value);
    } else if (cv_ky) {
      setEKO(
        employee
          ?.filter((emp: any) => emp.position_id.toString() === cv_ky)
          .map((opts: any) => {
            return {
              value: opts.idQLC,
              label: `(${opts.idQLC}) ${opts.userName}`,
              pos: opts.position_id,
            };
          })
      );
      setpb_ky(null);
    } else {
      setEKO(
        employee?.map((opts: any) => {
          return {
            value: opts.idQLC,
            label: `(${opts.idQLC}) ${opts.userName}`,
            pos: opts.position_id,
          };
        })
      );
      setpb_ky(null);
    }
  };
  const handleNgki_cv_Change = (e: any) => {
    if (e.value && pb_ky) {
      setEKO(
        employee
          ?.filter(
            (emp: any) =>
              emp.position_id.toString() === e.value && emp.dep_id[0] === pb_ky
          )
          .map((opts: any) => {
            return {
              value: opts.idQLC,
              label: `(${opts.idQLC}) ${opts.userName}`,
            };
          })
      );
      setcv_ky(e.value);
    } else if (e.value) {
      setEKO(
        employee
          ?.filter((emp: any) => emp.position_id.toString() === e.value)
          .map((opts: any) => {
            return {
              value: opts.idQLC,
              label: `(${opts.idQLC}) ${opts.userName}`,
            };
          })
      );
      setcv_ky(e.value);
    } else if (pb_ky) {
      setEKO(
        employee
          ?.filter((emp: any) => emp.dep_id[0] === pb_ky)
          .map((opts: any) => {
            return {
              value: opts.idQLC,
              label: `(${opts.idQLC}) ${opts.userName}`,
            };
          })
      );
      setcv_ky(null);
    } else {
      setEKO(
        employee?.map((opts: any) => {
          return {
            value: opts.idQLC,
            label: `(${opts.idQLC}) ${opts.userName}`,
          };
        })
      );
      setcv_ky(null);
    }
  };
  const handleNgkiChange = (e: any) => {
    console.log(e);
    if (!ngki_array.includes(e.value)) {
      setNgKi_array((prev) => [...prev, e.value]);
      setposNgki_array((prev: any) => [...prev, e.pos]);
      setNgKi(e.value);
      setposNgki(e.pos);
      setpb_ky(null);
      setcv_ky(null);
    }
  };
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      ngki_form: ngki?.toString(),
      ngki_form_array: ngki_array?.toString(),
      ngnhan_form: ngNhan_array?.toString(),
      pos: posNgki?.toString(),
    }));
  }, [ngki, ngki_array, ngNhan_array, posNgki]);
  const Tab_ngki_records = ({ stt, id }: any) => {
    const handleDelete = (id: number) => {
      setNgKi_array((prev) => {
        return prev.filter((rec) => rec !== id);
      });
    };
    const data = employee?.find((e: any) => e.idQLC === id);
    return (
      <div className={styles.main_box_user}>
        <p className={styles.box_p1}>{stt}</p>
        <p className={styles.box_p2}>{id}</p>
        <p className={styles.box_p3}>{data?.userName}</p>
        <p className={styles.box_p4}>
          {data.position_id &&
            position_ky?.find(
              (pos: any) => pos.value === data.position_id.toString()
            ).label}
        </p>
        <p className={styles.box_p5}>{data?.nameDeparment}</p>
        <div className={styles.box_p6}>
          <div onClick={() => handleDelete(id)} className={styles.func}>
            <Image alt="" src="/icon/icon_loai_bo.png" width={20} height={20} />
          </div>
        </div>
      </div>
    );
  };
  const Tab_ngnhan_records = ({ stt, id }: any) => {
    const handleDelete = (id: number) => {
      setNgNhan_array((prev) => {
        return prev.filter((rec) => rec !== id);
      });
    };
    const data = employee?.find((e: any) => e.idQLC === id);
    return (
      <div className={styles.main_box_user}>
        <p className={styles.box_p1}>{stt}</p>
        <p className={styles.box_p2}>{id}</p>
        <p className={styles.box_p3}>{data.userName}</p>
        <p className={styles.box_p4}>
          {data.position_id &&
            position_ky?.find(
              (pos: any) => pos.value === data.position_id.toString()
            ).label}
        </p>
        <p className={styles.box_p5}>{data?.nameDeparment}</p>
        <div className={styles.box_p6}>
          <div onClick={() => handleDelete(id)} className={styles.func}>
            <Image alt="" src="/icon/icon_loai_bo.png" width={20} height={20} />
          </div>
        </div>
      </div>
    );
  };
  const [isShow, setShow] = React.useState(false);
  const checkHandle_fr = () => {
    setShow(!isShow);
    if (!isShow) {
      handleSwitchChange({ name: "type_thay_the", value: "1" });
    } else {
      handleSwitchChange({ name: "type_thay_the", value: "" });
    }
  };
  return (
    <div>
      <Head>
        <title> Thêm văn bản đi </title>
        <meta name="keywords" content="Home" />
        <link rel="shortcut icon" href="https://timviec365.vn/favicon.ico" />
      </Head>
      <div className={styles.body}>
        <div className={styles.destination}>
          <Destination des="Gửi trong công ty"></Destination>
          <Destination2 des="Gửi ngoài công ty"></Destination2>
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <div className={styles.form_container}>
            {/* form bên trái */}
            <div className={`${styles.form_left}`}>
              <h3 className={`${styles.header}`}>Tạo mới văn bản</h3>
              <Section
                style="section"
                label={<Required_label title="Tên văn bản" />}
                input={
                  <Input_text
                    placeholder="Nhập tên văn bản"
                    handleChange={handeInputChange}
                    input_name="ten_vanban"
                  />
                }
                validation={
                  errors.ten_vanban && (
                    <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                      {errors.ten_vanban}
                    </p>
                  )
                }
              />
              <Section
                style="section"
                label={<Required_label title="Số văn bản" />}
                input={
                  <Input_text
                    placeholder="Số /...................-..................."
                    handleChange={handeInputChange}
                    input_name="so_vanban"
                  />
                }
                validation={
                  errors.so_vanban && (
                    <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                      {errors.so_vanban}
                    </p>
                  )
                }
              />
              <Section
                style="section"
                label={<Required_label title="Trích yếu nội dung văn bản" />}
                input={
                  <Input_ckeditor
                    handleChange={handeCKEChange}
                    input_name="trich_yeu"
                  />
                }
                validation={
                  errors.trich_yeu && (
                    <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                      {errors.trich_yeu}
                    </p>
                  )
                }
              />
              <div className={`${styles.section}`}>
                <h3 className={`${styles.small_header_text}`}>
                  Nơi nhận văn bản
                </h3>
              </div>
              <div className={styles.flexarea}>
                <Section
                  style="small_section"
                  label={<Required_label title="Phòng ban" />}
                  input={
                    <Input_select
                      options={departmnet_nhan_options}
                      placeholder="Nhập phòng ban người nhận văn bản"
                      onChange={handleNgNhan_pb_change}
                    />
                  }
                />
                <Section
                  style="small_section"
                  label={<Required_label title="Chức vụ" />}
                  input={
                    <Input_select
                      options={position_nhan}
                      placeholder="Nhập chức vụ người nhận văn bản"
                      onChange={handleNgNhan_cv_change}
                    />
                  }
                />
                <Section
                  style="small_section"
                  label={<Required_label title="Người nhận" />}
                  input={
                    <Input_select
                      options={employee_nhan_options}
                      placeholder="Nhập người nhận"
                      onChange={handleNgNhanChange}
                    />
                  }
                />
              </div>
              {errors.ngnhan_form && (
                <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                  {errors.ngnhan_form}
                </p>
              )}
              {ngNhan_array.length > 0 && (
                <div className={styles.box_user_nhan_ky}>
                  <div className={styles.header_box_user}>
                    <p className={styles.box_p1}>Stt</p>
                    <p className={styles.box_p2}>ID</p>
                    <p className={styles.box_p3}>Họ và tên</p>
                    <p className={styles.box_p4}>Chức vụ</p>
                    <p className={styles.box_p5}>Phòng ban</p>
                    <p className={styles.box_p6}></p>
                  </div>
                  {ngNhan_array.map((rec, index) => (
                    <Tab_ngnhan_records key={index} stt={index + 1} id={rec} />
                  ))}
                </div>
              )}
              <Section
                style="section"
                label={<Label title="Người theo dõi" />}
                input={
                  <Input_select
                    options={emp_theodoi_options}
                    placeholder="Chọn người theo dõi"
                    onChange={handleSelectChange}
                  />
                }
                validation={
                  errors.nguoi_theo_doi && (
                    <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                      {errors.nguoi_theo_doi}
                    </p>
                  )
                }
              />
              <div className={`${styles.section}`}>
                <h3 className={`${styles.small_header_text}`}>
                  Người kí duyệt
                  <Required_sign />
                </h3>
              </div>
              <Section
                style="small_section"
                label={<Required_label title="Phòng ban" />}
                input={
                  <Input_select
                    options={departmnet_ky_options}
                    placeholder="Nhập phòng ban người ký"
                    onChange={handleNgki_pb_Change}
                  />
                }
              />
              <Section
                style="small_section"
                label={<Required_label title="Chức vụ" />}
                input={
                  <Input_select
                    options={position_ky}
                    placeholder="Nhập chức vụ người ký văn bản"
                    onChange={handleNgki_cv_Change}
                  />
                }
              />
              <Section
                style="small_section"
                label={<Required_label title="Người ký" />}
                input={
                  <Input_select
                    options={employee_ky_options}
                    placeholder="Nhập người ký văn bản"
                    onChange={handleNgkiChange}
                  />
                }
              />
              {errors.ngki_form && (
                <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                  {errors.ngki_form}
                </p>
              )}
              <div className={styles.checkbox}>
                <label className={styles.checkbox_label}>
                  Văn bản gồm nhiều người kí:
                </label>
                <input type="checkbox" onChange={checkHandle} />
              </div>
              {showTab_nhieungki && (
                <div className={styles.box_user_nhan_ky}>
                  <div className={styles.header_box_user}>
                    <p className={styles.box_p1}>Stt</p>
                    <p className={styles.box_p2}>ID</p>
                    <p className={styles.box_p3}>Họ và tên</p>
                    <p className={styles.box_p4}>Chức vụ</p>
                    <p className={styles.box_p5}>Phòng ban</p>
                    <p className={styles.box_p6}></p>
                  </div>
                  {ngki_array.map((rec, index) => (
                    <Tab_ngki_records key={index} stt={index + 1} id={rec} />
                  ))}
                </div>
              )}
              <Section
                style="custom_section"
                label={<Label title="Bút phê lãnh đạo" />}
                input={
                  <Input_ckeditor
                    input_name="noidung_vanban"
                    handleChange={handeCKEChange}
                  />
                }
                validation={
                  errors.noidung_vanban && (
                    <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                      {errors.noidung_vanban}
                    </p>
                  )
                }
              />
              <Section
                style="section"
                label={<Label title="Phiếu trình văn bản" />}
                input={
                  <Input_file
                    input_name="phieu_trinh"
                    handleInputChange={handleFileChange}
                  />
                }
              />
              <Section
                style="section"
                label={<Required_label title="Tệp đính kèm" />}
                input={
                  <Input_file_2
                    input_name="file_vb"
                    handleInputChange={handleFileChange2}
                  />
                }
              />
              <Section
                style="section"
                label={<Label title="Ghi chú" />}
                input={
                  <Input_ckeditor
                    input_name="ghi_chu"
                    handleChange={handeCKEChange}
                  />
                }
              />
              <Old_input_select
                input_name="xet_duyet_van_ban"
                handeInputChange={handeInputChange}
              />
              <div>
                <div className={styles.confirm_area_top}>
                  <Section
                    style="medium_section"
                    label={<Required_label title="Kiểu xét duyệt văn bản" />}
                    input={
                      <Input_select
                        options={options_cfarea}
                        placeholder=""
                        defautlValue={options_cfarea[0]}
                        onChange={handleSelectChange}
                      />
                    }
                    validation={
                      errors.loai_xet_duyet && (
                        <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                          {errors.loai_xet_duyet}
                        </p>
                      )
                    }
                  />
                  <Section
                    style="medium_section"
                    label={<Required_label title="Thời gian phê duyệt" />}
                    input={
                      <Input_calender
                        datetype="datetime-local"
                        placeholder="Nhập thời gain / Giờ"
                        input_name="thoi_gian_duyet"
                        handle_input={handeInputChange}
                      />
                    }
                    validation={
                      errors.thoi_gian_duyet && (
                        <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                          {errors.thoi_gian_duyet}
                        </p>
                      )
                    }
                  />
                </div>
                <div className={styles.confirm_area_bot}>
                  <Section
                    style="section"
                    label={<Required_label title="Người xét duyệt" />}
                    input={
                      <Input_select
                        options={emp_duyet_options}
                        placeholder=""
                        onChange={handleSelectChange}
                        isMulti
                      />
                    }
                    validation={
                      errors.data_nguoi_duyet && (
                        <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                          {errors.data_nguoi_duyet}
                        </p>
                      )
                    }
                  />
                </div>
              </div>
              <div className={styles.submit_section_1}>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className={styles.submit_button}
                >
                  Hoàn thành
                </button>
              </div>
            </div>
            {/* form bên phải */}
            <div className={`${styles.form_right}`}>
              <div className={styles.form_right_top}>
                <Section
                  style="section"
                  label={<Required_label title="Năm" />}
                  input={
                    <Input_select
                      options={options_date}
                      placeholder={undefined}
                      defautlValue={options_date[5]}
                      onChange={handleSelectChange}
                    />
                  }
                  validation={
                    errors.nam_vb && (
                      <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                        {errors.nam_vb}
                      </p>
                    )
                  }
                />
                <Section
                  style="section"
                  label={<Required_label title="Sổ văn bản" />}
                  input={
                    <Input_select
                      options={options_so_vanban}
                      placeholder="Chọn sổ văn bản"
                      onChange={handleSelectChange}
                    />
                  }
                  validation={
                    errors.ten_so_vanban && (
                      <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                        {errors.ten_so_vanban}
                      </p>
                    )
                  }
                />
                <Section
                  style="section"
                  label={<Required_label title="Loại văn bản" />}
                  input={
                    <Input_select
                      options={options_loai_van_ban}
                      placeholder="Chọn loại văn bản"
                      onChange={handleSelectChange}
                    />
                  }
                  validation={
                    errors.type_vb && (
                      <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                        {errors.type_vb}
                      </p>
                    )
                  }
                />
                <Section
                  style="section"
                  label={<Label title="Ngày ban hành" />}
                  input={
                    <Input_calender
                      datetype="date"
                      placeholder="Chọn thời gian có hiệu lực"
                      input_name="thoi_gian_ban_hanh"
                      handle_input={handeInputChange}
                    />
                  }
                  validation={
                    errors.thoi_gian_ban_hanh && (
                      <p style={{ color: "red", margin: "10px 10px 10px 0" }}>
                        {errors.thoi_gian_ban_hanh}
                      </p>
                    )
                  }
                />
              </div>
              <div className={styles.form_right_top2}>
                <p className={styles.right_checkbox_section}>
                  <input
                    onChange={checkHandle_fr}
                    type="checkbox"
                    className={styles.check_add_mail}
                  ></input>
                  <label className={styles.checkbox_label_2}>
                    Là văn bản thay thế
                  </label>
                </p>
                {isShow && (
                  <>
                    <Section
                      style="section"
                      label={<Required_label title="Số văn bản" />}
                      input={
                        <Input_text
                          placeholder="Số /...................-..................."
                          input_name="so_vb_tt"
                          handleChange={handeInputChange}
                        />
                      }
                      validation={
                        errors.so_vb_tt && (
                          <p
                            style={{ color: "red", margin: "10px 10px 10px 0" }}
                          >
                            {errors.so_vb_tt}
                          </p>
                        )
                      }
                    />
                    <Section
                      style="section"
                      label={<Required_label title="Tên văn bản" />}
                      input={
                        <Input_text
                          placeholder="Nhập tên văn bản"
                          input_name="ten_vb_tt"
                          handleChange={handeInputChange}
                        />
                      }
                      validation={
                        errors.ten_vb_tt && (
                          <p
                            style={{ color: "red", margin: "10px 10px 10px 0" }}
                          >
                            {errors.ten_vb_tt}
                          </p>
                        )
                      }
                    />
                    <Section
                      style="section"
                      label={
                        <Required_label title="Trích yếu văn bản bị thay thế" />
                      }
                      input={
                        <Custom_input_textarea
                          inputclass="custom_input_textarea"
                          placeholder="Nhập trích yếu nội dung văn bản"
                          input_name="trich_yeu_tt"
                          handleChange={handeInputChange}
                        />
                      }
                      validation={
                        errors.trich_yeu_tt && (
                          <p
                            style={{ color: "red", margin: "10px 10px 10px 0" }}
                          >
                            {errors.trich_yeu_tt}
                          </p>
                        )
                      }
                    />
                  </>
                )}
              </div>
              <div className={styles.form_right_bot}>
                <SwitchInput
                  label="Văn bản khẩn cấp"
                  id="switch1"
                  input_name="type_khan_cap"
                  input_value="1"
                  handleChange={handleSwitchChange}
                />
                <SwitchInput
                  label="Văn bản bảo mật"
                  id="switch2"
                  input_name="type_bao_mat"
                  input_value="1"
                  handleChange={handleSwitchChange}
                />
                <SwitchInput
                  label="Cho phép tải xuống"
                  id="switch3"
                  input_name="type_tai"
                  input_value="1"
                  handleChange={handleSwitchChange}
                />
                <SwitchInput
                  label="Cho phép người duyệt chuyển tiếp"
                  id="switch4"
                  input_name="type_duyet_chuyen_tiep"
                  input_value="1"
                  handleChange={handleSwitchChange}
                />
                <SwitchInput
                  label="Cho phép người nhận chuyển tiếp"
                  id="switch5"
                  input_name="type_nhan_chuyen_tiep"
                  input_value="1"
                  handleChange={handleSwitchChange}
                />
                <div className={styles.submit_section_2}>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className={styles.submit_button}
                  >
                    Hoàn thành
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
