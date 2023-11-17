import { SelectSingleAndOption } from "@/components/commodity/select";
import PotentialSelectBoxStep from "../potential_steps/select_box_step";
import styles from "./add_file_potential.module.css";
import InputText from "./input_text";
import { useEffect, useState } from "react";
import {
  LIST_CITY,
  LIST_DISTRICT,
  renderCity,
  renderDistrict,
} from "@/constants/address-constant";
import axios from "axios";
import { notifyError } from "@/utils/function";
import { MInputTextAndOption, MTextArea } from "@/components/commodity/input";
export default function AddAddressInfo({
  title = "Thông tin địa chỉ",
  formData,
  setFormData,
}: any) {
  const [listWard, setListWard] = useState([]);
  const [listDistrict, setListDistrict] = useState<any>();
  const [address, setAddress] = useState<string>("");

  //lấy quận huyện khi chọn tỉnh thành
  useEffect(() => {
    delete formData?.district_id;
    delete formData?.ward;
    setFormData(formData);
    setListDistrict(
      LIST_DISTRICT.filter((district) => district.parent == formData?.city_id)
    );
  }, [formData?.city_id]);

  // xóa xã phường khi chọn lại quận huyện
  useEffect(() => {
    delete formData?.ward;
    setFormData(formData);
  }, [formData?.district_id]);

  // lay phuong xa
  useEffect(() => {
    if (formData?.district_id) {
      axios
        .post("http://210.245.108.202:3004/api/raonhanh/topCache/ward", {
          id: formData?.district_id,
        })
        .then((res) => convertWard(res.data.data.data))
        .catch((err) => notifyError("Vui lòng thử lại"));
    }
  }, [formData?.district_id]);
  const convertWard = (datas) => {
    const convert = datas?.map((data) => ({
      value: data.name,
      label: `${data.prefix} ${data.name}`,
    }));
    setListWard(convert);
  };
  //Hiển thị địa chỉ
  useEffect(() => {
    setAddress(
      `${formData?.address ? `${formData?.address}, ` : ""}${
        formData?.ward
          ? `${listWard.find((ward) => ward.value == formData?.ward)?.label}, `
          : ""
      }${
        formData?.district_id ? `${renderDistrict(formData?.district_id)}, ` : ""
      }${formData?.city_id ? `${renderCity(formData?.city_id)}, ` : ""}${
        formData?.country ? formData?.country : ""
      }`
    );
  }, [
    formData?.address,
    formData?.ward,
    formData?.district_id,
    formData?.city_id,
    formData?.country,
  ]);
  return (
    <div>
      <p className={styles.main__body__type}>{title}</p>
      <div className={styles.add_organize}>
        <SelectSingleAndOption
          title="Quốc gia"
          placeholder="Chọn quốc gia"
          data={[{ value: "Việt Nam", label: "Việt Nam" }]}
          setFormData={setFormData}
          formData={formData}
          value={formData?.country}
          name="country"
        />
        <SelectSingleAndOption
          title="Tỉnh thành"
          data={/* formData?.country && */ LIST_CITY}
          placeholder="Chọn tỉnh thành"
          setFormData={setFormData}
          formData={formData}
          name="cit_id"
          value={formData?.cit_id}
        />
        <SelectSingleAndOption
          title="Quận huyện"
          data={listDistrict}
          setFormData={setFormData}
          formData={formData}
          name="district_id"
          placeholder="Chọn quận huyện"
          value={formData?.district_id}
        />
        <SelectSingleAndOption
          title="Phường xã"
          data={listWard}
          setFormData={setFormData}
          formData={formData}
          name="ward"
          placeholder="Chọn xã phường"
          value={formData?.ward}
        />
        <MInputTextAndOption
          label="Số nhà, đường phố"
          placeholder="Nhập số nhà, đường phố"
          name="address"
          value={formData?.address}
          setFormData={setFormData}
        />
        <MInputTextAndOption
          label="Mã vùng"
          placeholder="Nhập mã vùng"
          name="arera_code"
          value={formData?.arera_code}
          setFormData={setFormData}
        />
        <MTextArea
          disable
          rows={2}
          label="Địa chỉ"
          placeholder="Chọn địa chỉ"
          value={address}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
