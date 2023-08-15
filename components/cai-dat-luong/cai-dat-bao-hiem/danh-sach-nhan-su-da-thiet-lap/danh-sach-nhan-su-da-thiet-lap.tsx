import { Button, Checkbox, Switch, Table, Select, Row, Col } from "antd";
import type { SelectProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./danh-sach-nhan-su-da-thiet-lap.module.css";
import Image from "next/image";
import { ModalThietLapBaoHiemNhanVien } from "./modal-thiet-lap/modal-thiet-lap";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import { POST_TL } from "@/pages/api/BaseApi";
import dayjs from "dayjs";

const ConfirmModal = ({
  openFilterClick,
  setOpenFilterClick,
  key,
}: {
  openFilterClick: boolean;
  setOpenFilterClick: any;
  key: string;
}) => {
  const children = (
    <div style={{ padding: "20px 20px 0px 20px" }}>
      <Image
        style={{ display: "block", margin: "0 auto 20px auto" }}
        src="/big-x.png"
        alt=""
        height={50}
        width={50}
      />
      <p style={{ textAlign: "center" }}>
        Bạn có muốn xóa bảo hiểm của nhân sự này?
      </p>
    </div>
  );

  const onConfirm = () => {
    // console.log(key);
  };

  return ModalWrapper(
    openFilterClick,
    setOpenFilterClick,
    children,
    500,
    "",
    "Đồng ý",
    onConfirm,
    false,
    false
  );
};

export const DanhSachNhanSuDaThietLap = ({
  listUserInsrc,
  listDepLabel,
  listEmpLabel,
}: {
  listUserInsrc: any;
  listDepLabel: any;
  listEmpLabel: any;
}) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [staff, setStaff] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>();
  const [openFilterClick, setOpenFilterClick] = useState(false);
  const [openModalThietLap, setOpenModalThietLap] = useState(false);
  const [key, setKey] = useState<any>({});
  const [data, setData]: any[] = useState(
    listUserInsrc?.list_us?.map((user, index) => {
      const depLabel = listDepLabel?.find((dep) => {
        dep?.value === user?.Detail[0]?.inForPerson?.employee?.dep_id;
      });
      const fromDate = new Date(user?.cls_day);
      const toDate = new Date(user?.cls_day_end);

      const month1 = fromDate?.getMonth() + 1;
      const year1 = fromDate?.getFullYear();

      const month2 = toDate?.getMonth() + 1;
      const year2 = toDate?.getFullYear();

      const userId = user.cls_id_user ? user.cls_id_user : "";
      const luong_co_ban = POST_TL(
        "api/tinhluong/congty/take_salary_contract",
        {
          time: "2023-04-01T00:00:00.000+00:00",
          array: `[${userId}]`,
        }
      ).then((res) => {
        if (res?.message == "success") {
          return res?.data[0]?.sb_salary_basic;
        } else return 0;
      });

      const insuranceMoney = user?.TinhluongFormSalary[0]?.fs_repica.includes(
        "Lương cơ bản"
      )
        ? luong_co_ban
        : "Chưa xác định";
      return {
        key: index,
        url: user?.avatarUser ? `/${user?.avatarUser}` : "/anhnhanvien.png",
        // url: "/anhnhanvien.png",
        name: user?.Detail[0]?.userName,
        room: depLabel?.["label"] || "Chưa cập nhật",
        position: user?.Detail[0]?.inForPerson?.employee?.position_id,
        email: user?.Detail[0]?.email || "Chưa cập nhật",
        ID: user?.Detail[0]?.idQLC,
        policy: user?.TinhluongListClass[0].cl_name,
        fromDate: dayjs(user?.cls_day).format("YYYY-MM-DD"),
        toDate: dayjs(user?.cls_day_end).format("YYYY-MM-DD"),
        insuranceMoney: insuranceMoney,
      };
    })
  );

  const columns: ColumnsType<any> = [
    {
      title: (
        <span style={{ fontSize: "16px", color: "#fff" }}>
          Họ và tên (ID, Phòng ban)
        </span>
      ),
      dataIndex: "url",
      align: "center",
      render: (url, record) => (
        <div>
          <Row>
            <Col>
              <Image
                src={url}
                alt=""
                height={46}
                width={46}
                style={{ margin: "20px 10px 10px 10px" }}
              />
            </Col>
            <Col
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  color: "#4C5BD4",
                  fontSize: "16px",
                  maxWidth: "175px",
                  wordWrap: "break-word",
                  textAlign: "left",
                }}
              >
                {record.name}
              </div>
              <div style={{ fontSize: "16px" }}>ID: {record.ID} </div>
              <div style={{ fontSize: "16px" }}>{record.room}</div>
            </Col>
          </Row>
        </div>
      ),
      width: 300,
    },
    {
      title: (
        <span style={{ fontSize: "16px", color: "#fff" }}>
          Chính sách bảo hiểm
        </span>
      ),
      dataIndex: "policy",
      render: (text, record) => (
        <div style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "16px" }}>{text}</div>
        </div>
      ),
      align: "center",
      width: 266,
    },
    {
      title: (
        <span style={{ fontSize: "16px", color: "#fff" }}>Áp dụng từ ngày</span>
      ),
      dataIndex: "fromDate",
      render: (text, record) => (
        <div style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "16px" }}>{text}</div>
        </div>
      ),
      align: "center",
      width: 163,
    },
    {
      title: <span style={{ fontSize: "16px", color: "#fff" }}>Đến ngày</span>,
      dataIndex: "toDate",
      render: (text, record) => (
        <div style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "16px" }}>{text}</div>
        </div>
      ),
      align: "center",
      width: 163,
    },
    {
      title: (
        <span style={{ fontSize: "16px", color: "#fff" }}>Tiền bảo hiểm</span>
      ),
      dataIndex: "insuranceMoney",
      render: (text, record) => (
        <div style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "16px" }}>{text}</div>
        </div>
      ),
      align: "center",
      width: 163,
    },
    {
      title: <span style={{ fontSize: "16px", color: "#fff" }}>Chức năng</span>,
      dataIndex: "key",
      render: (key, record) => (
        <div>
          <Image
            src={"/edit-blue-2.svg"}
            alt=""
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setKey(record);
              setOpenModalThietLap(true);
            }}
          ></Image>
          <Image
            src={"/vector-255.svg"}
            alt=""
            width={1}
            height={24}
            style={{
              strokeWidth: "1px",
              stroke: "#D9D9D9",
              margin: "0px 10px 0px 10px",
            }}
          ></Image>
          <Image
            src={"/trash-2.svg"}
            alt=""
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setKey(key);
              setOpenFilterClick(true);
            }}
          ></Image>
        </div>
      ),
      align: "center",
      width: 119,
    },
  ];

  // interface DataType {
  //   key: React.Key;
  //   url: React.ReactNode;
  //   name: string;
  //   room: string;
  //   position: string;
  //   email: string;
  //   ID: string;
  //   policy: string;
  //   fromDate: string;
  //   toDate: string;
  //   insuranceMoney: string;
  // }

  const selectMonth: SelectProps["options"] = [
    { value: "Tháng 1", label: "Tháng 1" },
    { value: "Tháng 2", label: "Tháng 2" },
    { value: "Tháng 3", label: "Tháng 3" },
    { value: "Tháng 4", label: "Tháng 4" },
    { value: "Tháng 5", label: "Tháng 5" },
    { value: "Tháng 6", label: "Tháng 6" },
    { value: "Tháng 7", label: "Tháng 7" },
    { value: "Tháng 8", label: "Tháng 8" },
    { value: "Tháng 9", label: "Tháng 9" },
    { value: "Tháng 10", label: "Tháng 10" },
    { value: "Tháng 11", label: "Tháng 11" },
    { value: "Tháng 12", label: "Tháng 12" },
  ];

  const selectYeah: SelectProps["options"] = [
    { value: "Năm 2022", label: "Năm 2022" },
    { value: "Năm 2023", label: "Năm 2023" },
    { value: "Năm 2024", label: "Năm 2024" },
  ];

  const selectDepartment: SelectProps["options"] = [
    { value: "Phòng ban (tất cả)", label: "Phòng ban (tất cả)" },
    { value: "Kỹ thuật", label: "Kỹ thuật" },
    { value: "Biên tập", label: "Biên tập" },
    { value: "Kinh Doanh", label: "Kinh Doanh" },
    { value: "Đề án", label: "Đề án" },
    { value: "Phòng Seo", label: "Phòng Seo" },
    { value: "Phòng Đào Tạo", label: "Phòng Đào Tạo" },
    { value: "Phòng Sáng Tạo", label: "Phòng Sáng Tạo" },
  ];

  const selectStaff: SelectProps["options"] = [
    { value: "Tất cả nhân viên", label: "Tất cả nhân viên" },
    {
      value: "(147310) Phạm Xuân Nguyên Khôi",
      label: "(147310) Phạm Xuân Nguyên Khôi",
    },
    { value: "(131845) Phùng Ngọc Anh 1", label: "(131845) Phùng Ngọc Anh" },
    { value: "(131845) Phùng Ngọc Anh 2", label: "(131845) Phùng Ngọc Anh" },
    { value: "(131845) Phùng Ngọc Anh 3", label: "(131845) Phùng Ngọc Anh" },
    { value: "(131845) Phùng Ngọc Anh 4", label: "(131845) Phùng Ngọc Anh" },
    { value: "(131845) Phùng Ngọc Anh 5", label: "(131845) Phùng Ngọc Anh" },
  ];

  const handleClickSetting = (key: string) => {
    setKey(key);
    setOpenModalThietLap(true);
  };
  return (
    <>
      <div className={styles.title}>
        <div className={styles.content}>
          Danh sách nhân sự đã thiết lập bảo hiểm
        </div>
      </div>
      <div className={styles.navbar}>
        <div className={styles.divMonth}>
          <Select
            suffixIcon={<SearchOutlined rev={undefined} />}
            style={{
              width: "100%",
              pointerEvents: "visibleFill",
              fontSize: "16px",
            }}
            placeholder="Chọn tháng"
            onChange={() => {}}
            options={selectMonth}
            className={styles.selectMonth}
          />
        </div>
        <div className={styles.divYeah}>
          <Select
            suffixIcon={<SearchOutlined rev={undefined} />}
            style={{
              width: "100%",
              pointerEvents: "visibleFill",
              fontSize: "16px",
            }}
            placeholder="Chọn năm"
            onChange={() => {}}
            options={selectYeah}
            className={styles.selectYeah}
          />
        </div>
        <div className={styles.divDepartment}>
          <Select
            suffixIcon={<SearchOutlined rev={undefined} />}
            style={{
              width: "100%",
              pointerEvents: "visibleFill",
              fontSize: "16px",
            }}
            placeholder="Chọn phòng ban"
            onChange={() => {}}
            options={selectDepartment}
            className={styles.selectDepartment}
          />
        </div>
        <div className={styles.divStaff}>
          <Select
            suffixIcon={<SearchOutlined rev={undefined} />}
            style={{ pointerEvents: "visibleFill", fontSize: "16px" }}
            placeholder="Chọn nhân viên"
            onChange={() => {}}
            options={selectStaff}
            className={styles.selectStaff}
          />
        </div>
        <div className={styles.divRevenue}>
          <Button className={`${styles.buttonRevenue}`}>
            <div style={{ fontSize: "16px" }}>Thống kê</div>
          </Button>
        </div>
      </div>

      <div className={styles.body}>
        <Table
          className={`table_phucloi table_dsBaoHiemDaThietLap`}
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          dataSource={data}
          scroll={{ x: "1160px" }}
        />
      </div>
      {ModalThietLapBaoHiemNhanVien(
        openModalThietLap,
        setOpenModalThietLap,
        key
      )}
      {ConfirmModal({ openFilterClick, setOpenFilterClick, key })}
    </>
  );
};
