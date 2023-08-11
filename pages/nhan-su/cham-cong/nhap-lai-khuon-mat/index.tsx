import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Select,
  Checkbox,
  Form,
  Modal,
  Avatar,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./nhap-lai-khuon-mat.module.css";
import { modalNhapLaiMat } from "@/components/cham-cong/nhap-lai-mat/modal";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import classNames from "classnames";
import { POST, POST_SS } from "@/pages/api/BaseApi";
import Image from "next/image";
interface DataType {
  key: React.Key;
  url: React.ReactNode;
  name: string;
  room: string;
  position: string;
  email: string;
  phoneNumber: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: " ",
    align: "center",
    render: (record: any) => (
      <Avatar
        alt="/"
        src={record?.avatarUser || "/avatar.png"}
        style={{ width: "46px", height: "46px" }}
      />
    ),
  },
  {
    title: <p style={{ color: "#fff" }}>Họ và tên</p>,
    render: (record: any) => (
      <a style={{ color: "black" }}>{record?.userName}</a>
    ),
    align: "center",
  },

  {
    title: <p style={{ color: "#fff" }}>Phòng ban</p>,
    render: (record: any) =>
        <p >{record?.dep_name || "Chưa cập nhật"}</p>
      ,
    align: "center"
  },

  {
    title: <p style={{ color: "#fff" }}>Chức vụ</p>,
    render: (record: any) => (
      <p style={{ width: "200px" }}>{record?.position_id}</p>
    ),
    align: "center",
  },
  {
    title: <p style={{ color: "#fff" }}>Email</p>,
    render: (record: any) => <p>{record?.email || "Chưa cập nhật"}</p>,
    align: "center",
  },
  {
    title: <p style={{ color: "#fff" }}>Số điện thoại</p>,
    render: (record: any) => <p>{record?.phoneTK || "Chưa cập nhật"}</p>,
    align: "center",
  },
  Table.SELECTION_COLUMN,
];

export default function UpdateFace({ infoCom, listDepartments }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[]);
  const [alertModal, setAlertModal] = useState(false);
  const [type, setType] = useState("");
  const [checkAll, setCheckAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const router = useRouter();
  const [listData, setListData] = useState([]);
  const [comLabel, setComLabel]: any = useState({})
  const [listDepLabel, setListDepLabel]: any = useState([])
  
  useEffect(() => {
    if (infoCom?.data && listDepartments?.data) {
      setComLabel({ label: infoCom?.data?.userName, value: infoCom?.data?.idQLC })
      setListDepLabel(listDepartments?.data?.map(dep => ({ label: dep?.dep_name, value: dep?.dep_id })))

    }
  }, [infoCom, listDepartments])

  useEffect(() => {
    const getList = async () => {
      const res = await POST("api/qlc/face/list", { com_id: 1763 });
      if (res?.result === true) {
        setListData(res?.data);
        setSelectedRowKeys(
          res?.data?.map((item: any) => {
            if (item?.allow_update_face === 1) {
              return item?._id;
            }
          })
        );
      }
    };

    getList();
  }, []);

  const handleUpdatePermissionForAUser = (permit, id) => {
    POST("api/qlc/face/add", {
      putAllowFace: permit ? 1 : 0,
      list_id: `${id}`,
    }).then((res) => {
      if (res?.result === true) {
        setAlertModal(true);
      }
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setIndeterminate(false);
      if (selectedRowKeys.length === listData?.length) {
        setCheckAll(true);
        setType("checkAll");
        setAlertModal(true);
      } else {
        setCheckAll(false);
        if (selectedRowKeys.length !== 0) {
          setIndeterminate(true);
        }
      }
      setSelectedRowKeys(selectedRowKeys);
    },
    onSelect: (
      record: any,
      selected: any,
      selectedRows: any,
      nativeEvent: any
    ) => {
      if (selected) {
        setType("checkOneTrue");
      } else {
        setType("checkOneFalse");
      }
      handleUpdatePermissionForAUser(selected, record?.idQLC);
    },
  };
  const onChangeAll = (e: CheckboxChangeEvent) => {
    setIndeterminate(false);
    if (e.target.checked === true) {
      setSelectedRowKeys(listData?.map((r) => r["_id"]));
      setType("checkAll");
      setCheckAll(e.target.checked);
    } else {
      setSelectedRowKeys([]);
      setType("noCheck");
      setCheckAll(e.target.checked);
    }
    setAlertModal(true);
  };
  const onFinish = (value: any) => {
    console.log(value);
  };

  return (
    <Card>
      <div className={styles.cardBody}>
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
          gutter={[0, 10]}
        >
          <Col xxl={9} xl={7} lg={10} md={24}>
            <p
              style={{ fontSize: "19px", fontWeight: "600" }}
              className={styles.changeSizeText}
            >
              Danh sách cập nhật khuôn mặt ({listData?.length || 0})
            </p>
          </Col>
          <Col xxl={15} xl={17} lg={14} md={24} sm={24} xs={24}>
            <Row
              gutter={{ sm: 30, xs: 20 }}
              justify={{ sm: "end", xs: "center" }}
            >
              <Col>
                <Button
                  className={styles.buttons}
                  onClick={() =>
                    router.push(
                      {
                        pathname: "/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi",
                        query: { key: "1" },
                      },
                      "/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi"
                    )
                  }
                >
                  <p className={styles.txt}>Toàn Bộ Nhân Viên</p>
                </Button>
              </Col>
              <Col>
                <Button
                  className={styles.buttons}
                  onClick={() =>
                    router.push(
                      {
                        pathname: "/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi",
                        query: { key: "2" },
                      },
                      "/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi"
                    )
                  }
                >
                  <p className={styles.txt}>Nhân viên chờ duyệt</p>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Form onFinish={onFinish}>
          <Row gutter={[20, 10]} style={{ marginBottom: "20px" }}>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="congTy"
                rules={[
                  { required: true, message: "Vui lòng điền đủ thông tin" },
                ]}
              >
                <Select
                  size="large"
                  style={{ width: "100%" }}
                  defaultValue="Chọn công ty"
                  options={[comLabel]}
                  suffixIcon={<img src="/down-icon.png"></img>}
                />
              </Form.Item>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="phongBan"
                rules={[
                  { required: true, message: "Vui lòng điền đủ thông tin" },
                ]}
              >
                <Select
                  size="large"
                  style={{ width: "100%" }}
                  defaultValue="Phòng ban(tất cả)"
                  options={listDepLabel}
                  suffixIcon={<img src="/down-icon.png"></img>}
                />
              </Form.Item>
            </Col>
            <Col xl={9} lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name="ten"
                rules={[
                  { required: true, message: "Vui lòng điền đủ thông tin" },
                ]}
              >
                <Select
                  showSearch
                  size="large"
                  style={{ width: "100%" }}
                  defaultValue="Nhập tên cần tìm"
                  options={listData?.map((item: any) => ({
                    label: item?.userName,
                    value: item?._id,
                  }))}
                  suffixIcon={<img src="/down-icon.png"></img>}
                  onChange={(value: string) => console.log(value)}
                  listHeight={180}
                />
              </Form.Item>
            </Col>
            <Col
              xl={3}
              lg={3}
              md={3}
              sm={{ span: 4, offset: 0 }}
              xs={{ span: 8, offset: 8 }}
            >
              <Form.Item>
                <Button
                  size="large"
                  style={{
                    width: "100%",
                    backgroundColor: "#4AA7FF",
                    border: "none",
                  }}
                  htmlType="submit"
                >
                  <p style={{ color: "var(--white-color)" }}>Lọc</p>
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Table
          className={`table_nhap_lai_khuon_mat`}
          columns={columns}
          sticky={true}
          pagination={{ position: ["bottomCenter"] }}
          rowSelection={{
            ...rowSelection,
            columnTitle: (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                Quyền
                <Checkbox
                  onChange={onChangeAll}
                  checked={checkAll}
                  indeterminate={indeterminate}
                />
              </div>
            ),
            columnWidth: "100px",
            selectedRowKeys: selectedRowKeys,
          }}
          dataSource={listData && listData}
          scroll={{ x: "max-content" }}
          rowKey={(record: any) => record?._id}
        />
      </div>
      {modalNhapLaiMat(
        alertModal,
        setAlertModal,
        type === "checkAll"
          ? "Các tài khoản đã được cấp quyền nhận diện khuôn mặt"
          : type === "checkOneTrue"
          ? "Tài khoản đã được cấp quyền nhận diện khuôn mặt"
          : type === "checkOneFalse"
          ? "Tài khoản đã bỏ quyền nhận diện khuôn mặt"
          : "Các tài khoản đã bỏ quyền nhận diện khuôn mặt",
          router
      )}
    </Card>
  );
}

export const getServerSideProps = async (context) => {
  const infoCom = await POST_SS("api/qlc/company/info", {}, context);

  const listDepartments = await POST_SS("api/qlc/department/list", {
    com_id: 1763
  }, context)

  return {
    props: {
      infoCom,
      listDepartments
    }
  }
}
