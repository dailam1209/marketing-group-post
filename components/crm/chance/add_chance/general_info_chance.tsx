import styles from "../../potential/potential_add_files/add_file_potential.module.css";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import { MInputTextV2 } from "../../input_select/input";
import { SelectSingleV2 } from "../../input_select/select";
import { LIST_CITY } from "@/constants/address-constant";
import { getPotentialResource } from "@/utils/listOption";
import { useState } from "react";
export default function AddGeneralInfoChance() {
  const [listCustomer, setListCustomer] = useState<any>([]);
  const [listContact, setListContact] = useState<any>([]);
  const [listCommodities, setListCommodities] = useState<any>([]);
  const [listReason, setListReason] = useState<any>([]);
  const [listCampaign, setListCampaign] = useState<any>([]);
  const [listEmp, setListEmp] = useState<any>([]);

  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_input}>
        <SelectSingleV2
          label={"Khách hàng"}
          name="id_customer"
          data={LIST_CITY}
          placeholder="Chọn"
        />
        <SelectSingleV2
          label="Liên hệ"
          name="contact_id"
          data={LIST_CITY}
          placeholder="Chọn"
        />
      </div>

      <div className={styles.row_input}>
        <MInputTextV2
          label="Tên cơ hội"
          require
          placeholder="Nhập tên cơ hội"
          name="chance_name"
        />
        <SelectSingleV2
          label="Loại cơ hội"
          name="chance_type"
          data={LIST_CITY}
          placeholder="Chọn"
        />
      </div>

      <div className={styles.row_input}>
        <SelectSingleV2
          label="Nhóm hàng hóa"
          name="group_commodities"
          data={LIST_CITY}
          placeholder="Chọn"
        />
        <MInputTextV2
          label="Số tiền"
          placeholder="Nhập số tiền"
          name="total_money"
        />
      </div>

      <div className={styles.row_input}>
        <SelectSingleV2
          label="Giai đoạn"
          name="reason"
          data={LIST_CITY}
          placeholder="Chọn"
        />
        <MInputTextV2
          label="Tỷ lệ thành công"
          placeholder="Nhập tỉ lệ thành công"
          name="success_rate"
        />
      </div>

      <div className={styles.row_input}>
        <MInputTextV2
          label="Doanh số kỳ vọng"
          placeholder="Nhập doanh số kỳ vọng"
          name="expected_sales"
        />
        <MInputTextV2
          type="date"
          require={true}
          label="Ngày kỳ vọng/kết thúc"
          placeholder="Ngày kỳ vọng/kết thúc"
          name="expected_end_date"
        />
      </div>

      <div className={styles.row_input}>
        <SelectSingleV2
          label="Chiến dịch"
          name="campaign_id"
          data={LIST_CITY}
          placeholder="Chọn"
        />
        <SelectSingleV2
          label="Nguồn gốc"
          name="soure"
          data={getPotentialResource}
          placeholder="Chọn"
        />
      </div>

      <div className={styles.row_input}>
        <SelectSingleV2
          label="Nhân viên phụ trách"
          name="emp_id"
          data={getPotentialResource}
          placeholder="Chọn"
        />
      </div>
    </div>
  );
}
