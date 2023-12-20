import { Modal } from "antd";
import Table from "rc-table";
import React, { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { MInputTextAndOption } from "../../input_select/input";

export default function ModalDataCustomerKD({
  isOpenModalDataCustomerKD,
  setIsOpenModalDataCustomerKD,
}) {
  const [formData, setFormData] = useState<any>({});
  const [columns, setColums] = useState([
    {
      title: "Tên nhân viên",
      dataIndex: "userName",
      key: "userName",
      width: 350,
    },
    {
      title: "FACEBOOK",
      dataIndex: "facebook",
      key: "facebook",
      width: 200,
    },
    {
      title: "TV365",
      dataIndex: "tv365",
      key: "tv365",
      width: 200,
    },
  ]);
  return (
    <div>
      <Modal
        open={isOpenModalDataCustomerKD}
        className={"mdal_default email_add_mdal shared_factor"}
        title="Dữ liệu chia khách hàng"
        onCancel={() => setIsOpenModalDataCustomerKD(false)}
        footer={null}
        width={1100}
      >
        <MInputTextAndOption
          label="Thời gian bắt đầu"
          type="datetime-local"
          name="start"
          
        />
        <MInputTextAndOption label={"Thời gian kết thúc"} />
        <Table
          columns={columns}
          // dataSource={empList}
          scroll={{ y: 500, x: 1000 }}
        />
      </Modal>
    </div>
  );
}
