import {
  Row,
  Col,
  Modal,
  Input,
  Checkbox,
  Button,
  List,
  Divider,
  Skeleton,
  Tabs,
  Table,
  Popover,
} from "antd";
import styles from "./modal-danh-sach-nhan-su.module.css";
import Image from "next/image";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { spawn } from "child_process";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import { ModalThietLapBaoHiemNhanVien } from "../modal-thiet-lap/modal-thiet-lap";
import { ModalThemMoiNhomBaoHiem } from "../modal-them-moi-nhom-bao-hiem/modal-them-moi-nhom-bao-hiem";
import { ModalChinhSua } from "../modal-chinh-sua/modal-chinh-sua";
import { ModalThemNhanVien2 } from "../modal-them-nhan-vien-2/modal-them-nhan-vien-2";
import {
  ModalThemNhanVien,
  ModalThoiGianApDung,
} from "@/components/cai-dat-luong/cai-dat-bao-hiem/chinh-sach-bao-hiem/modal-them-nhan-vien/modal-them-nhan-vien";
import { POST_TL } from "@/pages/api/BaseApi";
import dayjs from "dayjs";

interface Staff {
  key: React.Key;
  url: React.ReactNode;
  name: string;
  room: string;
  position: string;
  email: string;
  ID: string;
  policy: string;
  fromDate: string;
  toDate: string;
  insuranceMoney: string;
}

interface Group {
  name: string;
  quantity: string;
  fromDate: string;
  toDate: string;
  tax: string;
  id: string;
}

const ConfirmModal1 = ({
  openFilterStaffDeleteClick,
  setOpenFilterStaffDeleteClick,
}: {
  openFilterStaffDeleteClick: boolean;
  setOpenFilterStaffDeleteClick: any;
}) => {
  const onConfirm = () => {
    setOpenFilterStaffDeleteClick(false);
  };
  let children: React.ReactNode = <></>;
  children = (
    <div style={{ padding: "20px 20px 0px 20px" }}>
      <Image
        style={{ display: "block", margin: "0 auto 20px auto" }}
        src="/big-x.png"
        alt=""
        height={50}
        width={50}
      />
      <p style={{ textAlign: "center", fontSize: "16px" }}>
        Bạn có chắc chắn muốn xóa bảo hiểm của nhân viên này?
      </p>
    </div>
  );

  return ModalWrapper(
    openFilterStaffDeleteClick,
    setOpenFilterStaffDeleteClick,
    children,
    500,
    "",
    "Đồng ý",
    onConfirm,
    false,
    false
  );
};

const ConfirmModal2 = ({
  openFilterGroupDeleteClick,
  setOpenFilterGroupDeleteClick,
}: {
  openFilterGroupDeleteClick: boolean;
  setOpenFilterGroupDeleteClick: any;
}) => {
  const onConfirm = () => {
    setOpenFilterGroupDeleteClick(false);
  };
  let children: React.ReactNode = <></>;
  children = (
    <div style={{ padding: "20px 20px 0px 20px" }}>
      <Image
        style={{ display: "block", margin: "0 auto 20px auto" }}
        src="/big-x.png"
        alt=""
        height={50}
        width={50}
      />
      <p style={{ textAlign: "center", fontSize: "16px" }}>
        Bạn có chắn muốn xóa nhóm bảo hiểm này?
      </p>
    </div>
  );

  return ModalWrapper(
    openFilterGroupDeleteClick,
    setOpenFilterGroupDeleteClick,
    children,
    500,
    "",
    "Đồng ý",
    onConfirm,
    false,
    false
  );
};

const ItemDropdown = (
  title: string,
  key: string,
  onClick: (keySelect: string) => void
) => {
  return (
    <>
      <a className={styles.Dropdown} onClick={() => onClick(key)}>
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 0 5px 0",
            fontSize: "16px",
          }}
        >
          {title}
        </div>
      </a>
    </>
  );
};

const ItemDropdown2 = (
  title: string,
  key: string,
  onClick: (keySelect: string) => void
) => {
  return (
    <>
      <a className={styles.DropdownDel} onClick={() => onClick(key)}>
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 0 5px 0",
            fontSize: "16px",
          }}
        >
          {title}
        </div>
      </a>
    </>
  );
};

export function ModalDanhSachNhanSu({
  openFilterListClick,
  setOpenFilterListClick,
  listEmp,
  insureSelected,
  listEmpSelected,
  setListEmpSelected,
  setOpenFilterAddClick
}: {
  openFilterListClick: boolean;
  setOpenFilterListClick: any;
  listEmp: any;
  insureSelected: any;
  listEmpSelected: any
  setListEmpSelected: Function;
  setOpenFilterAddClick: Function
}) {
  const [key, setKey] = useState("");
  const [openFilterStaffDeleteClick, setOpenFilterStaffDeleteClick] =
    useState(false);
  const [openFilterNextClick, setOpenFilterNextClick] = useState(false);
  const [openFilterGroupDeleteClick, setOpenFilterGroupDeleteClick] =
    useState(false);
  const [openFilterStaffSettingClick, setOpenFilterStaffSettingClick] =
    useState(false);
  const [openAddGroupClick, setOpenAddGroupClick] = useState(false);
  const [openAddStaffGroupClick, setOpenAddStaffdGroupClick] = useState(false);
  const [openSettingStaffGroupClick, setOpenSettingStaffGroupClick] =
    useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [activeTabGroup, setActiveTabGroup] = useState(false);
  const [keyFilterGroup, setKeyFilterGroup] = useState("");
  const [listEmpInsrc, setListEmpInsrc]: any[] = useState([]);
  
  const ListStaff: Staff[] = [
    {
      key: "1",
      url: "/anhnhanvien.png",
      name: "Nguyễn Tiến Long",
      room: "Biên tập",
      position: "Nhân Viên Chính Thức",
      email: "abc@gmail.com",
      ID: "131942",
      policy: "BHXH tính theo lương nhập vào",
      fromDate: "Tháng 7/2023",
      toDate: "Chưa cập nhật",
      insuranceMoney: "500,000 VNĐ",
    },
  ];
  useEffect(() => {
    if (insureSelected?.cl_id) {
      POST_TL("api/tinhluong/congty/take_list_nv_insrc", {
        cls_id_cl: insureSelected?.cl_id,
      }).then((res) => {
        if (res?.message === "success") {
          setListEmpInsrc(
            res?.listUserFinal.map((e, index) => {
  
              return {
                key: index + 1,
                url: e?.avatarUser ? `/${e?.avatarUser}` : "/anhnhanvien.png",
                name: e?.userName,
                room: e?.inForPerson?.employee?.dep_id,
                position: e?.inForPerson?.employee?.position_id,
                email: e?.email || e?.emailContact,
                ID: e?.idQLC,
                policy: insureSelected?.TinhluongFormSalary?.[0]?.fs_name,
                fromDate: dayjs(insureSelected?.cl_day).format("YYYY-MM-DD"),
                toDate: dayjs(insureSelected?.cl_day_end).format("YYYY-MM-DD"),
                insuranceMoney: insureSelected?.cl_salary,
              };
            })
          );

        }
      });
    }
  });
  const columns: ColumnsType<Staff> = [
    {
      title: "Ảnh",
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
                style={{ display: "flex", alignItems: "center" }}
              />
            </Col>
          </Row>
        </div>
      ),
      width: 86,
    },
    {
      title: "Họ và tên (ID, Phòng ban)",
      dataIndex: "url",
      align: "center",
      render: (url, record) => (
        <div
          style={{
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "16px" }}>{record.name}</span>
          <span style={{ fontSize: "16px" }}>ID: {record.ID}</span>
        </div>
      ),
      width: 319,
    },
    {
      title: "Áp dụng từ ngày",
      dataIndex: "fromDate",
      render: (text, record) => (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          <div>{text}</div>
        </div>
      ),
      align: "center",
      width: 213,
    },
    {
      title: "Đến ngày",
      dataIndex: "toDate",
      render: (text, record) => (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          <div>{text}</div>
        </div>
      ),
      align: "center",
      width: 213,
    },
    {
      title: "Tiền bảo hiểm",
      dataIndex: "insuranceMoney",
      render: (text, record) => (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          <div>{record?.insuranceMoney}</div>
        </div>
      ),
      align: "center",
      width: 201,
    },
    {
      title: "Chức năng",
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
              setKey(key);
              setOpenFilterStaffSettingClick(true);
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
              setOpenFilterStaffDeleteClick(true);
            }}
          ></Image>
        </div>
      ),
      align: "center",
      width: 117,
    },
  ];

  const ListGroup: Group[] = [
    {
      name: "Nhóm Nhân Viên Full-Time",
      quantity: "80",
      fromDate: "Tháng Sáu 2023",
      toDate: "Chưa cập nhật",
      tax: "500000",
      id: "1",
    },
    {
      name: "Nhóm Nhân Viên Full-Time",
      quantity: "80",
      fromDate: "Tháng Sáu 2023",
      toDate: "Chưa cập nhật",
      tax: "500000",
      id: "2",
    },
    {
      name: "Nhóm Nhân Viên Full-Time",
      quantity: "80",
      fromDate: "Tháng Sáu 2023",
      toDate: "Chưa cập nhật",
      tax: "500000",
      id: "3",
    },
    {
      name: "Nhóm Nhân Viên Full-Time",
      quantity: "80",
      fromDate: "Tháng Sáu 2023",
      toDate: "Chưa cập nhật",
      tax: "500000",
      id: "4",
    },
    {
      name: "Nhóm Nhân Viên Full-Time",
      quantity: "80",
      fromDate: "Tháng Sáu 2023",
      toDate: "Chưa cập nhật",
      tax: "500000",
      id: "5",
    },
  ];

  const items1 = [
    {
      key: "1",
      label: "Thêm nhân viên",
    },
    {
      key: "2",
      label: "Chỉnh sửa",
    },
  ];

  const items2 = [
    {
      key: "3",
      label: "Xóa nhóm bảo hiểm",
    },
  ];

  const modalKey = [];

  const handleClickFilter = (keySelect: string) => {
    setKeyFilterGroup(keySelect);
    if (keySelect === "3") setOpenFilterGroupDeleteClick(true);
    else if (keySelect === "1") {
      setOpenAddStaffdGroupClick(true);
    } else if (keySelect === "2") {
      setOpenSettingStaffGroupClick(true);
    }
  };
  const content1 = (
    <div style={{ padding: "5px" }}>
      {items1.map((data) => {
        return ItemDropdown(data.label, data.key, handleClickFilter);
      })}
    </div>
  );

  const content2 = (
    <div style={{ padding: "5px" }}>
      {items2.map((data) => {
        return ItemDropdown2(data.label, data.key, handleClickFilter);
      })}
    </div>
  );

  const columns2: ColumnsType<Group> = [
    {
      title: "Nhóm nhân viên",
      dataIndex: "name",
      align: "center",
      render: (name, record) => (
        <div>
          <div
            style={{
              margin: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <span
              style={{ fontSize: "16px", color: "#4C5BD4", fontWeight: "500" }}
            >
              {name}
            </span>
            <span style={{ fontSize: "16px", color: "#68798B" }}>
              {"( " + record.quantity + " người )"}
            </span>
          </div>
        </div>
      ),
      width: 319,
    },
    {
      title: "Áp dụng từ tháng",
      dataIndex: "fromDate",
      align: "center",
      render: (fromDate, record) => (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          <div>{fromDate}</div>
        </div>
      ),
      width: 319,
    },
    {
      title: "Đến tháng",
      dataIndex: "toDate",
      render: (toDate, record) => (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          <div>{toDate}</div>
        </div>
      ),
      align: "center",
      width: 213,
    },
    {
      title: "Tiền thuế",
      dataIndex: "tax",
      render: (tax, record) => (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          <div>{tax} VNĐ</div>
        </div>
      ),
      align: "center",
      width: 213,
    },
    {
      title: "Chức năng",
      dataIndex: "key",
      render: (key, record) => (
        <div>
          <Popover content={content1}>
            {" "}
            <Image
              src={"/edit-blue-2.svg"}
              alt=""
              width={24}
              height={24}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setKey(key);
              }}
            ></Image>{" "}
          </Popover>
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
          <Popover content={content2}>
            {" "}
            <Image
              src={"/trash-2.svg"}
              alt=""
              width={24}
              height={24}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setKey(key);
              }}
            ></Image>{" "}
          </Popover>
        </div>
      ),
      align: "center",
      width: 117,
    },
  ];

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  const LIST_TABS = [
    {
      key: "1",
      label: "Nhân viên (" + listEmpInsrc?.length + ")",
      //children: <div style={{ marginBottom: "20px", height: "567px", overflowY:"scroll", overflowX:"scroll" }}>
      children: (
        <div style={{ marginBottom: "20px" }}>
          <Table
            className={`table_danhSachNhanVien`}
            columns={columns}
            pagination={false}
            dataSource={listEmpInsrc}
            scroll={{ x: "1160px", y: "567px" }}
            bordered
          />
        </div>
      ),
    },
    // {
    //   key: '2',
    //   label: 'Nhóm (' + '03' + ')',
    //   // children: <div style={{ marginBottom: "20px", height: "315px", overflowY:"scroll", overflowX:"scroll" }}>
    //   children: (
    //     <div style={{ marginBottom: '20px' }}>
    //       <Table
    //         className={`table_danhSachNhanVien table_maxheight`}
    //         columns={columns2}
    //         pagination={false}
    //         dataSource={ListGroup}
    //         scroll={{ x: '1160px', y: '567px' }}
    //         bordered
    //       />
    //     </div>
    //   ),
    // },
  ];

  return (
    <Modal
      open={openFilterListClick}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      className={`modal_danhSachNhanVien`}
    >
      <div className={styles.crossImage}>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpenFilterListClick(false)}
        />
      </div>
      <div className={styles.body}>
        <div className={`${styles.bodyItem} ${styles.titleContainer}`}>
          <div className={styles.titleItem}>
            <span
              style={{
                display: "block",
                color: "#474747",
                fontFamily: "Roboto",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "136%",
              }}
            >
              Nhập tiền bảo hiểm
            </span>

            {activeTab === "1" ? (
              <span
                style={{
                  display: "block",
                  color: "#B2B2B2",
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "136%",
                }}
              >
                Danh sách nhân viên bảo hiểm
              </span>
            ) : (
              <span
                style={{
                  display: "block",
                  color: "#B2B2B2",
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "136%",
                }}
              >
                Danh sách nhóm bảo hiểm
              </span>
            )}
          </div>

          <div className={styles.titleButon}>
            {activeTab === "1" ? (
              <Button
                className={styles.extraBTn}
                onClick={() => setOpenFilterAddClick(true)}
              >
                <span
                  style={{
                    color: "#FFF",
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "136%",
                  }}
                >
                  + Thêm nhân viên
                </span>
              </Button>
            ) : (
              <Button
                className={styles.extraBTn2}
                onClick={() => setOpenAddGroupClick(true)}
              >
                <span
                  style={{
                    color: "#FFF",
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "136%",
                  }}
                >
                  + Thêm nhóm bảo hiểm
                </span>
              </Button>
            )}
          </div>
        </div>

        <div>
          <Tabs
            defaultActiveKey="1"
            items={LIST_TABS}
            onChange={handleTabChange}
            className={`modal_tabdanhsachnhansu`}
          />
        </div>
      </div>
      {ConfirmModal1({
        openFilterStaffDeleteClick,
        setOpenFilterStaffDeleteClick,
      })}
      {ConfirmModal2({
        openFilterGroupDeleteClick,
        setOpenFilterGroupDeleteClick,
      })}
      {ModalThietLapBaoHiemNhanVien({
        openFilterStaffSettingClick,
        setOpenFilterStaffSettingClick,
        key,
      })}
      {ModalThemMoiNhomBaoHiem({ openAddGroupClick, setOpenAddGroupClick })}
      {ModalChinhSua({
        openSettingStaffGroupClick,
        setOpenSettingStaffGroupClick,
      })}
      {ModalThemNhanVien2({
        openAddStaffGroupClick,
        setOpenAddStaffdGroupClick,
      })}
      {/* {ModalThemNhanVien({
        openFilterAddClick,
        setOpenFilterAddClick,
        setOpenFilterNextClick,
        setActiveTabGroup,
        listEmp,
        insureSelected,
        listEmpSelected,
        setListEmpSelected
      })} */}
      {/* {ModalThoiGianApDung({
        open: openFilterNextClick,
        setOpen: setOpenFilterNextClick,
        activeTabGroup,
        modalKey,
        // listStaff,
        insureSelected,
        // idNV
      })} */}
    </Modal>
  );
}
