import { Button, Checkbox, Switch, Table, Select } from "antd";
import type { SelectProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./danh-sach-nhan-su-chua-thiet-lap.module.css";
import Image from "next/image";
import { ModalThietLapBaoHiemNhanVien } from "./modal-thiet-lap/modal-thiet-lap";
import { ModalWrapper } from "@/components/modal/ModalWrapper";

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
        Bạn có chắc chắn muốn xóa cài đặt này?
      </p>
      <p style={{ textAlign: "center" }}>
        Điều này có thể ảnh hưởng đến lương nhân viên đã cài đặt trước đó
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

export const DanhSachNhanSuChuaThietLap = ({
  onChangeKey,
  listUserNoInsrc,
  listDepLabel,
  listEmpLabel
}: {
  onChangeKey: (key: string) => void;
  listUserNoInsrc: any;
  listDepLabel: any;
  listEmpLabel: any
}) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [staff, setStaff] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>();
  const [openModalThietLap, setOpenModalThietLap] = useState(false);
  const [key, setKey] = useState<any>({});
  const [data, setData]: any[] = useState(
    listUserNoInsrc?.listUserFinal?.map((user, index) => {
      const depLabel = listDepLabel?.find(dep => dep?.value === user?.inForPerson?.employee?.dep_id);
      return {
        key: index,
        url: user?.avatarUser ? `/${user?.avatarUser}` : "/anhnhanvien.png",
        // url: "/anhnhanvien.png",
        name: user?.userName,
        room: depLabel?.['label'] || "Chưa cập nhật",
        position: user?.inForPerson?.employee?.position_id,
        email: user?.email || "Chưa cập nhật",
        ID: user?.idQLC
      };
    })
  );
    // console.log(listUserNoInsrc)

  const columns: ColumnsType<any> = [
    {
      title: " ",
      dataIndex: "url",
      align: "center",
      render: (record) => <Image src={record} alt="" height={46} width={46} />,
      width: 66,
    },
    {
      title: " ",
      dataIndex: "info",
      render: (text, record) => (
        <div className={styles.td_danh_sach_nhan_su_chua_thiet_lap}>
          <div style={{ fontSize: "16px", color: "#4C5BD4" }}>
            {record.name}
          </div>
          <div style={{ fontSize: "16px" }}>ID: {record.ID} </div>
          <div style={{ fontSize: "16px" }}>{record.room}</div>
        </div>
      ),
      align: "left",
    },
    {
      title: " ",
      dataIndex: "key",
      render: (key, record) => (
        <Button
          className={styles.btnThietLap}
          onClick={() => handleClickSetting(record)}
        >
          <Image src="/settings-01.svg" alt="" width={24} height={24}></Image>
          <div className={styles.btnThietLapText} style={{ fontSize: "16px" }}>
            Thiết lập
          </div>
        </Button>
      ),
      align: "center",
      width: 170,
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
  // }
  //   {
  //     key: "1",
  //     url: "/anhnhanvien.png",
  //     name: "Nguyễn Tiến Long",
  //     room: "Biên tập",
  //     position: "Nhân Viên Chính Thức",
  //     email: "abc@gmail.com",
  //     ID: "131942",
  //   },
  //   {
  //     key: "2",
  //     url: "/anhnhanvien.png",
  //     name: "Nguyễn Tiến Long",
  //     room: "Biên tập",
  //     position: "Nhân Viên Chính Thức",
  //     email: "abc@gmail.com",
  //     ID: "131942",
  //   },
  //   {
  //     key: "3",
  //     url: "/anhnhanvien.png",
  //     name: "Nguyễn Tiến Long",
  //     room: "Biên tập",
  //     position: "Nhân Viên Chính Thức",
  //     email: "abc@gmail.com",
  //     ID: "131942",
  //   },
  //   {
  //     key: "4",
  //     url: "/anhnhanvien.png",
  //     name: "Nguyễn Tiến Long",
  //     room: "Biên tập",
  //     position: "Nhân Viên Chính Thức",
  //     email: "abc@gmail.com",
  //     ID: "131942",
  //   },
  //   {
  //     key: "5",
  //     url: "/anhnhanvien.png",
  //     name: "Nguyễn Tiến Long",
  //     room: "Biên tập",
  //     position: "Nhân Viên Chính Thức",
  //     email: "abc@gmail.com",
  //     ID: "131942",
  //   },
  //   {
  //     key: "6",
  //     url: "/anhnhanvien.png",
  //     name: "Nguyễn Tiến Long",
  //     room: "Biên tập",
  //     position: "Nhân Viên Chính Thức",
  //     email: "abc@gmail.com",
  //     ID: "131942",
  //   },
  //   {
  //     key: "7",
  //     url: "/anhnhanvien.png",
  //     name: "Nguyễn Tiến Long",
  //     room: "Biên tập",
  //     position: "Nhân Viên Chính Thức",
  //     email: "abc@gmail.com",
  //     ID: "131942",
  //   },
  //   {
  //     key: "8",
  //     url: "/anhnhanvien.png",
  //     name: "Nguyễn Tiến Long",
  //     room: "Biên tập",
  //     position: "Nhân Viên Chính Thức",
  //     email: "abc@gmail.com",
  //     ID: "131942",
  //   },
  //   {
  //     key: "9",
  //     url: "/anhnhanvien.png",
  //     name: "Nguyễn Tiến Long",
  //     room: "Biên tập",
  //     position: "Nhân Viên Chính Thức",
  //     email: "abc@gmail.com",
  //     ID: "131942",
  //   },
  //   {
  //     key: "10",
  //     url: "/anhnhanvien.png",
  //     name: "Nguyễn Tiến Long",
  //     room: "Biên tập",
  //     position: "Nhân Viên Chính Thức",
  //     email: "abc@gmail.com",
  //     ID: "131942",
  //   },
  //   {
  //     key: "11",
  //     url: "/anhnhanvien.png",
  //     name: "Nguyễn Tiến Long",
  //     room: "Biên tập",
  //     position: "Nhân Viên Chính Thức",
  //     email: "abc@gmail.com",
  //     ID: "131942",
  //   },
  // ];

  const selectMonth: SelectProps["options"] = [
    { value: 1, label: "Tháng 1" },
    { value: 2, label: "Tháng 2" },
    { value: 3, label: "Tháng 3" },
    { value: 4, label: "Tháng 4" },
    { value: 5, label: "Tháng 5" },
    { value: 6, label: "Tháng 6" },
    { value: 7, label: "Tháng 7" },
    { value: 8, label: "Tháng 8" },
    { value: 9, label: "Tháng 9" },
    { value: 10, label: "Tháng 10" },
    { value: 11, label: "Tháng 11" },
    { value: 12, label: "Tháng 12" },
  ];

  const selectYeah: SelectProps["options"] = [
    { value: 2022, label: "Năm 2022" },
    { value: 2023, label: "Năm 2023" },
    { value: 2024, label: "Năm 2024" },
  ];

  const handleClickSetting = (key: any) => {
    setKey(key);
    // console.log(key)
    setOpenModalThietLap(true);
  };
  return (
    <>
      <div className={styles.title}>
        <div className={styles.content}>
          Danh sách nhân sự chưa thiết lập bảo hiểm
        </div>
      </div>
      <div className={styles.navbar}>
        <div className={styles.divMonth}>
          <Select
            suffixIcon={<SearchOutlined rev={undefined} />}
            style={{ width: "100%", pointerEvents: "visibleFill" }}
            placeholder="Chọn tháng"
            onChange={() => {}}
            options={selectMonth}
            className={styles.selectMonth}
          />
        </div>
        <div className={styles.divYeah}>
          <Select
            suffixIcon={<SearchOutlined rev={undefined} />}
            style={{ width: "100%", pointerEvents: "visibleFill" }}
            placeholder="Chọn năm"
            onChange={() => {}}
            options={selectYeah}
            className={styles.selectYeah}
          />
        </div>
        <div className={styles.divDepartment}>
          <Select
            suffixIcon={<SearchOutlined rev={undefined} />}
            style={{ width: "100%", pointerEvents: "visibleFill" }}
            placeholder="Chọn phòng ban"
            onChange={() => {}}
            options={listDepLabel}
            className={styles.selectDepartment}
          />
        </div>
        <div className={styles.divStaff}>
          <Select
            suffixIcon={<SearchOutlined rev={undefined} />}
            style={{ pointerEvents: "visibleFill" }}
            placeholder="Chọn nhân viên"
            onChange={() => {}}
            options={listEmpLabel}
            className={styles.selectStaff}
          />
        </div>
        <div className={styles.divRevenue}>
          <Button className={`${styles.buttonRevenue}`}>
            <div style={{ fontSize: "16px" }}>Thống kê</div>
          </Button>
        </div>
      </div>

      <div className={styles.bodyTable}>
        <Table
          className={`table_nhap_lai_khuon_mat table_nhan_su_chua_thiet_lap`}
          columns={columns}
          sticky={true}
          pagination={{ position: ["bottomCenter"] }}
          dataSource={data}
        />
      </div>
      {ModalThietLapBaoHiemNhanVien(
        openModalThietLap,
        setOpenModalThietLap,
        key,
        onChangeKey
      )}
    </>
  );
};
