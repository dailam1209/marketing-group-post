import React, { useState } from "react";
import { Button, Card, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ChinhSachThue } from "@/components/cai-dat-luong/cai-dat-thue/chinh-sach-thue/chinh-sach-thue";
import styles from "./index.module.css";
import { ChuaDuyet } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/danh-sach-nhan-su";
import { DaDuyet } from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-da-thiet-lap/danh-sach-nhan-su";
import { ModalThemThue } from "@/components/cai-dat-luong/cai-dat-thue/chinh-sach-thue/modal/model";
import { POST_SS, POST_SS_TL, POST_TL, getCompIdSS } from "@/pages/api/BaseApi";

export default function CaiDatThue({
  listTax,
  listEmpNoTax,
  listEmpHasTax,
  listDepartments,
  listEmp,
}) {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalNext, setModalNext] = useState(false);
  const [checkButton, setCheckButton] = useState("1");
  // const [comLabel, setComLabel]: any = useState({ label: infoCom?.data?.userName, value: infoCom?.data?.idQLC })
  const [listDepLabel, setListDepLabel]: any[] = useState(
    listDepartments?.items?.map((dep) => ({
      label: dep?.dep_name,
      value: dep?.dep_id,
    }))
  );
  const [listEmpLabel, setListEmpLabel]: any[] = useState(
    listEmp?.items?.map((emp) => ({ label: emp?.userName, value: emp?.idQLC }))
  );

  const tabList = [
    {
      key: "1",
      label: "Chính sách thuế",
      children: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <button className={styles.space1} onClick={() => setModalAdd(true)}>
              <div className={styles.chu1}>+</div>
              <div className={styles.chu2}>Thêm mới</div>
            </button>
          </div>
          <ChinhSachThue listTax={listTax} listEmp={listEmp} />
        </>
      ),
    },
    {
      key: "2",
      label: "Danh sách nhân sự chưa thiết lập",
      bt: "",
      children: (
        <ChuaDuyet listEmpNoTax={listEmpNoTax} listDepLabel={listDepLabel} />
      ),
    },
    {
      key: "3",
      label: "Danh sách nhân sự đã thiết lập",
      bt: "",
      children: (
        <DaDuyet
          listEmpHasTax={listEmpHasTax}
          listDepLabel={listDepLabel}
          listEmpLabel={listEmpLabel}
        />
      ),
    },
  ];
  return (
    <div>
      <Card>
        <Tabs
          items={tabList}
          onChange={(activekey) => setCheckButton(activekey)}
          className={`tab_caidatthue ${styles.tab}`}
          tabBarExtraContent={
            <button
              className={styles.space2}
              onClick={() => setModalAdd(true)}
              style={{ display: checkButton === "1" ? "flex" : "none" }}
            >
              <div className={styles.chu1}>+</div>
              <div className={styles.chu2}>Thêm mới</div>
            </button>
          }
        />

        {ModalThemThue(modalAdd, setModalAdd, setModalNext)}
      </Card>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let com_id = null;
  com_id = getCompIdSS(context);
  const listTax = await POST_SS_TL(
    "api/tinhluong/congty/takeinfo_tax_com",
    {
      com_id: com_id,
    },
    context
  );

  // const listEmpHasTax = await POST_SS_TL('api/tinhluong/congty/takeinfo_tax_com', {
  //   com_id: 1763
  // }, context)
  const listEmpHasTax = await POST_SS_TL(
    "api/tinhluong/congty/show_list_user_tax",
    {
      start_date: "2023-01-01T00:00:00.000+00:00",
      end_date: "2023-08-01T00:00:00.000+00:00",
      cls_id_com: com_id,
    },
    context
  );

  const listEmpNoTax = await POST_SS_TL(
    "api/tinhluong/congty/show_list_user_no_tax",
    {
      cls_id_com: com_id,
    },
    context
  );

  const listDepartments = await POST_SS(
    "api/qlc/department/list",
    {
      com_id: com_id,
    },
    context
  );

  const listEmp = await POST_SS(
    "api/qlc/managerUser/list",
    {
      com_id: com_id,
    },
    context
  );
  return {
    props: {
      listTax,
      listEmpNoTax,
      listEmpHasTax,
      listDepartments,
      listEmp,
    },
  };
};
