import styles from "./index.module.css";
import { useState } from "react";
import { Card, Tabs, Button } from "antd";
import { ChinhSachBaoHiem } from "@/components/cai-dat-luong/cai-dat-bao-hiem/chinh-sach-bao-hiem/chinh-sach-bao-hiem";
import { DanhSachNhanSuChuaThietLap } from "@/components/cai-dat-luong/cai-dat-bao-hiem/danh-sach-nhan-su-chua-thiet-lap/danh-sach-nhan-su-chua-thiet-lap";
import { DanhSachNhanSuDaThietLap } from "@/components/cai-dat-luong/cai-dat-bao-hiem/danh-sach-nhan-su-da-thiet-lap/danh-sach-nhan-su-da-thiet-lap";
import {
  ModalCongThuc,
  ModalThemMoiChinhSachBaoHiem,
} from "@/components/cai-dat-luong/cai-dat-bao-hiem/chinh-sach-bao-hiem/modal-them-moi-bao-hiem/modal-them-moi-chinh-sach-bao-hiem";
import { POST, POST_SS, POST_SS_TL } from "@/pages/api/BaseApi";

export default function CaiDatBaoHiem({
  listInsurance,
  listEmp,
  listUserNoInsrc,
  listDepartments,
  listUserInsrc,
}) {
  const [selectedKey, setSelectedKey] = useState("1");
  const [modalAdd, setModalAdd] = useState(false);
  const [modalNext, setModalNext] = useState(false);
  const [listDepLabel, setListDepLabel]: any[] = useState(
    listDepartments?.data?.map((dep) => ({
      label: dep?.dep_name,
      value: dep?.dep_id,
    }))
  );
  const [listEmpLabel, setListEmpLabel]: any = useState(
    listEmp?.data?.map((e) => ({ label: e?.userName, value: e?.idQLC }))
  );

  const handleTabSelect = (key: string) => {
    setSelectedKey(key);
  };
  const LIST_TABS = [
    {
      key: "1",
      label: <div className={styles.labelTabs}>Chính sách bảo hiểm</div>,
      children: (
        <ChinhSachBaoHiem listInsurance={listInsurance} listEmp={listEmp} />
      ),
    },
    {
      key: "2",
      label: (
        <div className={styles.labelTabs}>Danh sách nhân sự chưa thiết lập</div>
      ),
      children: (
        <DanhSachNhanSuChuaThietLap
          onChangeKey={handleTabSelect}
          listUserNoInsrc={listUserNoInsrc}
          listDepLabel={listDepLabel}
          listEmpLabel={listEmpLabel}
        />
      ),
    },
    {
      key: "3",
      label: (
        <div className={styles.labelTabs}>Danh sách nhân sự đã thiết lập</div>
      ),
      children: (
        <DanhSachNhanSuDaThietLap
          listUserInsrc={listUserInsrc}
          listDepLabel={listDepLabel}
          listEmpLabel={listEmpLabel}
        />
      ),
    },
  ];

  const renderExtraButton = () => {
    if (selectedKey == "1") {
      return (
        <div className={styles.buttonPlus}>
          <Button
            className={`${styles.extraBTn}`}
            onClick={() => {
              setModalAdd(true);
            }}
          >
            <div className={styles.plus}>+</div>
            <div className={styles.buttonPlusText}>Thêm mới</div>
          </Button>
        </div>
      );
    }
    return null;
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Card className={styles.card}>
        <Tabs
          defaultActiveKey="1"
          items={LIST_TABS}
          onChange={(key) => handleTabSelect(key)}
          tabBarExtraContent={renderExtraButton()}
          className={"cai-dat-bao-hiem"}
        />
      </Card>
      {ModalThemMoiChinhSachBaoHiem(modalAdd, setModalAdd)}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const listInsurance = await POST_SS_TL(
    "api/tinhluong/congty/takeinfo_insrc",
    { cl_com: 3312 },
    context
  );

  const listEmp = await POST_SS(
    "api/qlc/managerUser/list",
    {
      com_id: 3312,
    },
    context
  );

  const listUserNoInsrc = await POST_SS_TL(
    "api/tinhluong/congty/show_list_user_noinsrc",
    {
      cls_id_com: 3312,
    },
    context
  );

  const listUserInsrc = await POST_SS_TL(
    "api/tinhluong/congty/show_list_user_insrc",
    {
      start_date: "2023-01-01T00:00:00.000+00:00",
      end_date: "2023-08-01T00:00:00.000+00:00",
      cls_id_com: 3312,
    },
    context
  );

  // const listUserInsrc = await POST_SS_TL('api/tinhluong/congty/show_list_user_no_tax', {
  //   cls_id_com: 1763
  // }, context)

  const listDepartments = await POST_SS(
    "api/qlc/department/list",
    {
      com_id: 3312,
    },
    context
  );

  // Promise.all([listInsurance, listUserNoInsrc, listEmp, listDepartments, listUserInsrc])

  return {
    props: {
      listInsurance,
      listEmp,
      listUserNoInsrc,
      listDepartments,
      listUserInsrc,
    },
  };
};
