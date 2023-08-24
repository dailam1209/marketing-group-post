import React, { useEffect, useState } from "react";
import styles from "./set_permissions.module.css";
import { fetch_list_employee } from "@/utils/ShareApi";
import Select from "react-select";
import { fetchData, handleCreate } from "@/utils/BaseApi";
import { useRouter } from "next/router";
import { parse } from "cookie";
const Index = ({ data }: any) => {
  const router = useRouter();
  // Lấy danh sách nhân viên
  const [employee, setemployee] = useState([]);
  useEffect(() => {
    const fetchGetData = async () => {
      const response = await fetch_list_employee();
      setemployee(response?.data?.data);
    };
    fetchGetData();
  }, []);
  const ds_empla_options = employee?.map((opt: any) => {
    return { value: opt?._id, label: opt?.userName };
  });

  // Lấy ra danh sách nhân viên có quyền
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [selectedOption1, setSelectedOption1] = useState<any>(null);
  const valueArray = data?.listQuyen?.type_cong_ty.split(", ").map(Number);
  const valueArray1 = data?.listQuyen?.type_ngoai.split(", ").map(Number);
  useEffect(() => {
    const defaultSelectedOptions = ds_empla_options?.filter((option) =>
      valueArray?.includes(option.value)
    );
    setSelectedOption(defaultSelectedOptions);
    const defaultSelectedOptions1 = ds_empla_options?.filter((option) =>
      valueArray1?.includes(option.value)
    );
    setSelectedOption1(defaultSelectedOptions1);
  }, [
    JSON.stringify(ds_empla_options),
    JSON.stringify(valueArray),
    JSON.stringify(valueArray1),
  ]);

  // thiết lập quyền
  const handleMultiSelectChange = (selectedOptions: any) => {
    setSelectedOption(selectedOptions);
    console.log(selectedOptions);
  };
  const handleMultiSelectChange1 = (selectedOptions: any) => {
    setSelectedOption1(selectedOptions);
  };
  const handleSave = async () => {
    const selectedValues =
      selectedOption?.map((option: any) => option.value) || [];
    const selectedValues1 =
      selectedOption1?.map((option: any) => option.value) || [];
    try {
      const api = "api/vanthu/guiNhanCongVan/setting/thietLapQuyen";
      await handleCreate(api, {
        type_cong_ty: selectedValues,
        type_ngoai: selectedValues1,
      });
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi ý kiến:", error);
    }
    router.push("/van-thu-luu-tru/quanly-cong-van/thiet-lap-quyen");
  };

  return (
    <div className={styles.content}>
      <div className={styles.body_content}>
        <div className={styles.header_content}>Thiết lập quyền</div>
        <div className={styles.main_content}>
          <div className={styles.div_select_permision}>
            <p>Người có quyền tạo văn bản ban hành cho toàn công ty</p>
            <Select
              value={selectedOption}
              onChange={handleMultiSelectChange}
              options={ds_empla_options}
              isMulti
            />{" "}
          </div>
          <div className={styles.div_select_permision}>
            <p>Người có quyền tạo văn bản ban hành bên ngoài</p>
            <Select
              value={selectedOption1}
              onChange={handleMultiSelectChange1}
              options={ds_empla_options}
              isMulti
            />{" "}
          </div>
          <p className={styles.footer}>
            Quyền duyệt văn bản:{" "}
            <span style={{ color: "red" }}>
              Tất cả lãnh đạo có chức vụ từ TỔ PHÓ trở lên có quyền duyệt văn
              bản!
            </span>
          </p>
          <div className={styles.btn_ft} onClick={handleSave}>
            Hoàn thành
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
export async function getServerSideProps(context: {
  req: { headers: { cookie: any } };
}) {
  try {
    const cookies = parse(context.req.headers.cookie || "");
    const token = `${cookies.token_first}${cookies.token_hafl}`;
    if (!token) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    const data = await fetchData(
      token,
      "api/vanthu/guiNhanCongVan/setting/getListQuyen"
    );
    return {
      props: {
        data: data?.data ? data?.data : null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
      },
    };
  }
}
