import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import HeadNav from "../../../../components/tinh-luong/components/big-component/header-nav";
import styles from "./index.module.css";
import { EllipsisOutlined } from "@ant-design/icons";

const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Phanquyen = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    // Xử lý logic khi người dùng ấn nút "OK" trong modal
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Xử lý logic khi người dùng ấn nút "Hủy" trong modal
    setModalVisible(false);
  };
  const isEditing = (record) => record.key === editingKey;
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Mã nhân viên",
      dataIndex: "age",
      width: "15%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
      editable: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "address",
      width: "15%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => (
        <>
          <Tooltip title="Phân quyền tài khoản" color={"white"}>
            <EllipsisOutlined
              onClick={(event) => showModal(event, record)}
              className="icon-button"
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div
      style={{
        width: "100%",
        flex: "1",
        background: " #F7F8FC",
        paddingBottom: "70px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <HeadNav />
      <div className={styles.div_page}>
        <div className={styles.ds_pay_ct_div}>
          <div className={styles.cate_ct_one}>
            <h3>Phân quyền</h3>
            <p>Quản lý quyền nhân viên</p>
          </div>
          <div>
            <Select
              showSearch
              placeholder="Nhập tên cần tìm"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />
          </div>
        </div>
        <div className={styles.form}>
          <Form form={form} component={false}>
            <Table
              className={"tablePage"}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </div>
      </div>
      <Modal
        title=""
        open={modalVisible}
        footer={<Button onClick={handleCancel}>Đóng</Button>}
        onCancel={handleCancel}
      >
        <div className={styles.taModal}>
          <div>
            <div className={styles.modal_header}></div>
            <div className={styles.modal_hd_tax}>
              <div className={styles.modal_body}>
                <div className={styles.cr_popup_tax}>
                  <div className={styles.cr_popup_tax_avt}>
                    <div className={styles.cr_avt_one}>
                      <img
                        src="https://tinhluong.timviec365.vn/img/add.png"
                        alt="anh dai dien"
                      />
                      <span>
                        <h4>Nguyễn Thế Anh</h4>
                        <p>696969</p>
                      </span>
                    </div>
                  </div>
                  <form action method={"post"}>
                    <div className={styles.form_group}>
                      <label className={styles.label}>
                        Quyền áp dụng
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select className={styles.ro_id}>
                        <option>Owner</option>
                        <option>Nhân viên</option>
                      </select>
                      <input
                        type={"hidden"}
                        className={styles.ep_id}
                        value={"147314"}
                      />
                    </div>
                    <button type={"submit"} className={styles.btn_sv}>
                      Lưu Lại
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className={styles.video}>
        <iframe
          className="video_hd"
          style={{ borderRadius: 15 }}
          width={680}
          height={430}
          src="https://www.youtube.com/embed/yfjExMI_wjo"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen=""
        />
      </div>
    </div>
  );
};
export default Phanquyen;
