import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential2.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import Image from "next/image";
import stylesDetail from "@/components/crm/customer/contact/detail_information/styles_diary.module.css";
import Link from "next/link";
import styleChance from "./detail_chance.module.css";
import TextInfoChance from "./text_info_chance";
import StepSelection from "./step_select";
import { Switch } from "antd";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
import { useRouter } from "next/router";

interface PropsDetail {}

const DetailInformationChance: React.FC<PropsDetail> = () => {
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const id = router.query;
  const [valueProcess, setValueProccess] = useState("");
  const [percentSuccess, setPerCentSuccess] = useState(0);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);

  const switchHandle = (checked: boolean) => {};

  return (
    <>
      <CancelModal
        isModalCancel={isOpenModalCancel}
        setIsModalCancel={setIsOpenModalCancel}
        content={"Bạn có chắc chắn muốn xoá cơ hội này không?"}
        title={"Xác nhận xoá cơ hội"}
        link={`/chance/list`}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "0 0 20px 0",
        }}
      >
        <div>
          <Switch onChange={switchHandle} />
          <span style={{ marginLeft: "10px" }}>Ẩn dữ liệu trống</span>
        </div>
        <div className={stylesDetail["main__control-btn"]}>
          <Link
            href={`/chance/edit/${id}`}
            className={stylesDetail["btn_edit"]}
          >
            <Image alt="image" width={16} height={16} src="/crm/edit_kh.svg" />
            Chỉnh sửa
          </Link>
          <button
            className={`${stylesDetail["btn"]} ${stylesDetail["btn_delete"]} ${stylesDetail["h_delete_cus"]}`}
            onClick={() => setIsOpenModalCancel(true)}
          >
            <Image
              alt="image"
              width={16}
              height={16}
              src="/crm/delete_kh.svg"
            />
            Xóa
          </button>
        </div>
      </div>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Chi tiết cơ hội</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <div className={styles["main__body_item"]}>
                  <div className={styleChance.row}>
                    <TextInfoChance label="Liên hệ" value="Nguyễn Văn Nam" />
                    <TextInfoChance label="Số tiền" value="100000 VND" />
                    <TextInfoChance label="Giai đoạn" value="Mở đầu" />
                    <TextInfoChance label="Tỷ lệ thành công" value="30%" />
                    <TextInfoChance label="Doanh số kỳ vọng" value="100" />
                    <TextInfoChance
                      label="Ngày kỳ vọng/kết thúc"
                      value="10/02/2024"
                    />
                  </div>
                  <div className={styleChance.step_select}>
                    <StepSelection setValueProccess={setValueProccess} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailInformationChance;
