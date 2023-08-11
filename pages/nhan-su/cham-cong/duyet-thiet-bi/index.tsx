import { Card, Table, Button, Select, Row, Col, Form } from "antd";
import { useState, useEffect } from "react";
import {
  MyTable2,
  mySelect,
} from "@/components/cham-cong/duyet-thiet-bi/duyet-thiet-bi";
import styles from "./duyet-thiet-bi.module.css";
import { modalNhapLaiMat } from "@/components/cham-cong/nhap-lai-mat/modal";
import { POST, POST_SS } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";

export default function DuyetThietBi({
  infoCom,
  listDepartments,
  listEmps,
  listDevices,
}) {
  const router = useRouter();
  const [listAccept, setListAccept] = useState([]);
  const [comLabel, setComLabel]: any = useState({
    label: infoCom?.data?.userName,
    value: infoCom?.data?.idQLC,
  });
  const [listDepLabel, setListDepLabel]: any = useState(
    listDepartments?.data?.map((dep) => ({
      label: dep?.dep_name,
      value: dep?.dep_id,
    }))
  );
  const [listEmpLabel, setListEmpLabel] = useState(
    listDevices?.data?.map((emp) => ({
      label: emp?.userName,
      value: emp?.idQLC,
    }))
  );
  const [data, setData] = useState(
    listDevices?.data?.map((emp) => {
      const empData = listEmps?.data?.map((e) => e?.idQLC === emp?.idQLC);

      return {
        key: emp?.ed_id,
        url: empData?.avatarUser
          ? `/${empData?.avatarUser}`
          : "/anhnhanvien.png",
        name: emp?.userName,
        room: empData?.nameDeparment || "Chưa cập nhật",
        equipment: emp?.current_device_name || "Chưa cập nhật",
        newEquipment: emp?.new_device_name || "Chưa cập nhật",
        ep_id: emp?.idQLc,
        status: emp?.new_device ? 1 : 0,
      };
    })
  );

  const duyetThietBi = () => {
    console.log(listAccept?.join(","));
    POST("api/qlc/checkdevice/add", { ed_id: listAccept?.join(",") }).then(
      (res) => console.log(res)
    );

    setModalState(true);
  };
  const onFinish = (value: any) => {
    console.log(value);
  };
  const [modalState, setModalState] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  return (
    <Card>
      <div className={styles.body}>
        <div
          style={{
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#474747",
          }}
          className={styles.tieuDe}
        >
          Danh sách thiết bị
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Form onFinish={onFinish}>
            <Row
              gutter={[20, 5]}
              justify={{ xs: "center", sm: "start", md: "start" }}
            >
              <Col xl={7} md={12} sm={12} xs={24}>
                {mySelect(false, "", "Chọn công ty", true, false, "congTy", [
                  comLabel,
                ])}
              </Col>
              <Col xl={6} md={12} sm={12} xs={24}>
                {mySelect(
                  false,
                  "",
                  "Phòng ban(tất cả)",
                  true,
                  false,
                  "phongBan",
                  listDepLabel
                )}
              </Col>
              <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                {mySelect(
                  true,
                  "",
                  "Nhập tên cần tìm",
                  true,
                  false,
                  "ten",
                  listEmpLabel
                )}
              </Col>
              <Col lg={3} sm={4} xs={8}>
                <Form.Item>
                  <Button
                    className={styles.buttons}
                    htmlType="submit"
                    size="large"
                  >
                    <p className={styles.txt}>Lọc</p>
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div style={{ marginBottom: "20px" }}>
          {MyTable2(data, setListAccept, setModalState, setTypeModal)}
        </div>
        <Row justify="center">
          <Col lg={3} sm={4} xs={7}>
            <Button className={styles.buttons} size="large">
              <p className={styles.txt} onClick={duyetThietBi}>
                Duyệt
              </p>
            </Button>
          </Col>
        </Row>
      </div>
      {modalNhapLaiMat(
        modalState,
        setModalState,
        typeModal === "checkAll"
          ? "Tất cả nhân viên đã được duyệt thiết bị khi chấm công"
          : "Các nhân viên vừa chọn đã được duyệt thiết bị chấm công",
        router
      )}
    </Card>
  );
}

export const getServerSideProps = async (context) => {
  const infoCom = await POST_SS("api/qlc/company/info", {}, context);

  const listDepartments = await POST_SS(
    "api/qlc/department/list",
    {
      com_id: 1763,
    },
    context
  );

  const listEmps = await POST_SS(
    "api/qlc/managerUser/list",
    { com_id: 1763 },
    context
  );

  const listDevices = await POST_SS(
    "api/qlc/checkdevice/list",
    { com_id: 1763 },
    context
  );

  return {
    props: {
      infoCom,
      listDepartments,
      listEmps,
      listDevices,
    },
  };
};
