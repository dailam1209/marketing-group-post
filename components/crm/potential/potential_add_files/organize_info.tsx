import { MInputTextAndOption } from "@/components/commodity/input";
import styles from "./add_file_potential.module.css";

import {
  SelectMultiple,
  SelectSingleAndOption,
} from "@/components/commodity/select";
import {
  LIST_BANK,
  LIST_ORGANIZATIONAL,
  LIST_PROFESSION,
  LIST_REVENUE,
  LIST_SECTOR,
} from "@/utils/listOption";
import { useEffect } from "react";
export default function AddOrganizeInfo({ formData, setFormData }: any) {
  useEffect(() => {
    setFormData({ ...formData, classify: [] });
  }, [formData.sector]);
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin tổ chức</p>

      <div className={styles.add_organize}>
        <MInputTextAndOption
          label="Tổ chức"
          placeholder="Nhập tổ chức"
          value={formData?.business_type}
          setFormData={setFormData}
          name="business_type"
        />
        <MInputTextAndOption
          value={formData?.bank_account}
          setFormData={setFormData}
          label="Tài khoản ngân hàng"
          placeholder="Nhập số tài khoản"
          name="bank_account"
        />

        <SelectSingleAndOption
          title="Mở tại ngân hàng"
          data={LIST_BANK}
          formData={formData}
          setFormData={setFormData}
          name="bank_id"
          value={formData.bank_id}
          placeholder="Chọn ngân hàng"
        />
        <MInputTextAndOption
          label="Ngày thành lập"
          placeholder="Nhập ngày thành lập"
          type="date"
          name="founding_date"
          value={formData.founding_date}
          setFormData={setFormData}
        />
        <SelectSingleAndOption
          title="Loại hình"
          data={LIST_ORGANIZATIONAL}
          formData={formData}
          setFormData={setFormData}
          name="organization"
          value={formData.organization}
          placeholder="Chọn loại hình"
        />
        <SelectMultiple
          data={LIST_SECTOR}
          name="sector"
          setFormData={setFormData}
          value={formData.sector}
          label="Lĩnh vực"
          placeholder="Chọn lĩnh vực"
        />
        <SelectMultiple
          label="Ngành nghề"
          name="classify"
          setFormData={setFormData}
          value={formData.classify}
          placeholder="Chọn ngành nghề"
          data={[
            ...[].concat(
              ...formData.sector.map((st) =>
                LIST_PROFESSION.filter((pf) => pf.valueSector == st)
              )
            ),
          ]}
        />
        <SelectSingleAndOption
          title="Doanh thu"
          placeholder="Chọn doanh thu"
          data={LIST_REVENUE}
          setFormData={setFormData}
          name="revenue"
          value={formData.revenue}
          formData={formData}
        />
      </div>
    </div>
  );
}
