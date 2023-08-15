import styles from "./lich-lam-viec.module.css";
import { Card, Col, Row, Dropdown, Popover, Button } from "antd";
import React, { useEffect } from "react";
// import { TypeOfData } from "@/pages/cham-cong/cai-dat-lich-lam-viec"
import { ThemNhanVien } from "./modal/modal-item/modal-them-nhan-vien/modal-them-nhan-vien";
import { useState } from "react";
import { UpLoadNV } from "./modal/modal-item/modal-upload/modal-upload";
import { DanhSach } from "./modal/modal-item/modal-danh-sach/modal-danh-sach";
import { SaoChep } from "./modal/modal-item/modal-sao-chep/modal-sao-chep";
import { XoaLich } from "./modal/modal-item/modal-xoa/modal-xoa";
import { ModalChinhSua } from "@/components/cham-cong/cai-dat-lich-lam-viec/modal/modal-item/modal-chinh-sua/modal-chinh-sua";
import { Icon1 } from "@/constants/svgs";
import { POST, getCompIdCS } from "@/pages/api/BaseApi";
import dayjs from "dayjs";

const ItemDropdown = (
  title: string,
  url: string,
  key: string,
  onClick: (key: any) => void
) => {
  const [color, setColor] = useState("#474747");

  return (
    <a
      onClick={onClick}
      onMouseOver={() => setColor(key === "5" ? "#FF5B4D" : "#4C5BD4")}
      onMouseOut={() => setColor("#474747")}
    >
      <div
        key={key}
        style={{
          display: "flex",
          alignItems: "top",
          margin: "5px 0 5px 0",
          color: color,
        }}
      >
        <div style={{ marginRight: "10px" }}>{Icon1(color, key)}</div>
        <div style={{ fontWeight: "500" }}>{title}</div>
      </div>
    </a>
  );
};
const items = [
  {
    key: "1",
    label: "Thêm nhân viên",
    url: "/addPeople.png",
  },
  {
    key: "2",
    label: "Danh sách nhân viên",
    url: "/list.png",
  },
  {
    key: "3",
    label: "Chỉnh sửa",
    url: "/edit-blue.png",
  },
  {
    key: "4",
    label: "Sao chép lịch làm việc",
    url: "/copy_light.png",
  },
  {
    key: "5",
    label: "Xóa lịch làm việc",
    url: "/del-blue.png",
  },
];

const titleModal = (
  key: string,
  title: string,
  content: React.ReactNode,
  openTabBar: string,
  setOpenTabBar: Function
): React.ReactNode => (
  <div className={styles.header}>
    {title}
    <div
      className={styles.bodyCell}
      style={{ position: "absolute", right: "calc(100%/75)", top: "50%" }}
    >
      <Popover
        key={key}
        content={content}
        open={key === openTabBar}
        onOpenChange={(newopen: boolean) =>
          newopen === true ? setOpenTabBar(key) : setOpenTabBar("noopen")
        }
      >
        <img src="/3cham.png" alt="/" />
      </Popover>
    </div>
  </div>
);
const ModalLichLamViec = (
  title: string,
  time: string,
  soLuong: number,
  key: string,
  content: React.ReactNode,
  openTabBar: string,
  setOpenTabBar: Function
) => {
  return (
    <Col sm={12} xs={24}>
      <Card
        title={titleModal(key, title, content, openTabBar, setOpenTabBar)}
        bordered={false}
        headStyle={{
          backgroundImage: "url(/licklamviec.png)",
          backgroundSize: "cover",
        }}
        key={key}
      >
        <div className={styles.body}>
          <div className={`${styles.bodyCell}`} style={{ marginBottom: "5px" }}>
            <img src="/clock.png" alt="/" className={styles.imagin} />
            Áp dụng: {dayjs(time).format("YYYY-MM-DD")}
          </div>
          <div className={styles.bodyCell}>
            <img src="/groupPeople.png" alt="/" className={styles.imagin} />
            {soLuong}
          </div>
        </div>
      </Card>
    </Col>
  );
};
export default function CaiDatLichLamViec(data: any, listCalendar: any) {
  const [modalThemNV, setModalThemNV] = useState(false);
  const [modalUpload, setModalUpload] = useState(false);
  const [modalDanhSach, setModalDanhSach] = useState(false);
  const [modalSaoChep, setModalSaoChep] = useState(false);
  const [modalXoaLich, setModalXoaLich] = useState(false);
  const [modelChinhSua, setModalChinhSua] = useState(false);
  const [openTabBar, setOpenTabBar] = useState("");
  const [cySelected, setCySelected]: any = useState({});
  const [listEmp, setListEmp]: any = useState([]);
  const [listEmpInCy, setListEmpInCy]: any = useState([]);

  useEffect(() => {
    let com_id = null;
    com_id = getCompIdCS();
    com_id !== null &&
      POST("api/qlc/managerUser/list", {
        com_id: com_id,
      }).then((res) => {
        if (res?.result === true) {
          setListEmp(res?.data);
        }
      });
  }, []);

  useEffect(() => {
    if (cySelected?.cy_id) {
      POST("api/qlc/cycle/list_employee", {
        cy_id: cySelected?.cy_id,
      }).then((res) => {
        if (res?.result === true) {
          setListEmpInCy([
            ...res?.list.map((emp) => ({
              key: emp?.ep_id,
              name: emp?.ep_name,
              url: emp?.avatarUser || "/anhnhanvien.png",
              room: emp?.dep_name || "Chưa cập nhật",
              phone: emp?.phone || emp?.phoneTK || "Chưa cập nhật",
              email: emp?.email || emp?.emailContact || "Chưa cập nhật",
              ep_id: emp?.ep_id,
            })),
          ]);
        }
      });
    }
  }, [cySelected]);

  const onClick = (key: any, value?: any) => {
    key === "1"
      ? (setModalThemNV(true), setOpenTabBar("noopen"), setCySelected(value))
      : key === "2"
      ? (setModalDanhSach(true), setOpenTabBar("noopen"), setCySelected(value))
      : key === "3"
      ? (setModalChinhSua(true), setOpenTabBar("noopen"), setCySelected(value))
      : key === "4"
      ? (setModalSaoChep(true), setOpenTabBar("noopen"), setCySelected(value))
      : (setModalXoaLich(true), setOpenTabBar("noopen"), setCySelected(value));
  };
  const Content = ({ value }: { value: any }) => {
    return (
      <div style={{ padding: "5px" }}>
        {items.map((data) => {
          if (data.key === "4") {
            return (
              <>
                {ItemDropdown(data.label, data.url, data.key, () =>
                  onClick(data.key, value)
                )}
                <div style={{ borderBottom: "1px solid #C4C4C4" }}></div>
              </>
            );
          }
          return ItemDropdown(data.label, data.url, data.key, () =>
            onClick(data.key, value)
          );
        })}
      </div>
    );
  };

  return (
    <Row gutter={[29, 20]} className={styles.bodyCell}>
      {data &&
        data?.map((cy) =>
          ModalLichLamViec(
            cy.cy_name,
            cy.apply_month,
            cy.ep_count,
            cy.cy_id,
            <Content value={cy} />,
            openTabBar,
            setOpenTabBar
          )
        )}
      {ThemNhanVien(
        modalThemNV,
        setModalThemNV,
        setModalUpload,
        cySelected,
        listEmp,
        listEmpInCy
      )}
      {UpLoadNV(modalUpload, setModalUpload, setModalThemNV)}
      {DanhSach(modalDanhSach, setModalDanhSach, cySelected, listEmpInCy)}
      {SaoChep(modalSaoChep, setModalSaoChep, data, cySelected)}
      {XoaLich(
        modalXoaLich,
        setModalXoaLich,
        "Bạn chắc chắn muốn xóa lịch làm việc này?",
        cySelected
      )}
      {ModalChinhSua(
        modelChinhSua,
        setModalChinhSua,
        cySelected,
        setCySelected
      )}
    </Row>
  );
}
