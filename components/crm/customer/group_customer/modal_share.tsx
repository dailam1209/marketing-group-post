import { Modal, Table } from "antd";
import { useRouter } from "next/router";
import style from "@/components/crm/customer/group_customer/modal_share.module.css";
import type { ColumnsType } from "antd/es/table";
interface TypeShareProps {
  isOpenModalShare: boolean;
  setIsOpenModalShare: (value: boolean) => void;
  title?: string;
  link?: string;
  id?: any;
  name?: string;
  description?: string;
  updateData?: any;
}
interface TableType {
  key: React.Key;
  name: string;
  office: string;
  pos_id: number;
  address: string;
  ID: string[];
}

export const ModalGroupCustomerShare: React.FC<TypeShareProps> = ({
  isOpenModalShare,
  setIsOpenModalShare,
}) => {
  const columns: ColumnsType<TableType> = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 250,
    },
    {
      title: "Tổ chức",
      dataIndex: "office",
      key: "office",
      width: 250,
    },
    {
      title: "Vị trí",
      dataIndex: "pos_id",
      width: 200,
      key: "pos_id",
    },
    {
      title: "ID",
      dataIndex: "ID",
      width: 150,
      key: "ID",
    },
  ];
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      name: `Trần Văn Tèo ${i}`,
      office: `Trần Văn Tí ${i}`,
      pos_id: `Vị trí ${i}`,
      ID: i,
    });
  }
  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <div className={style.modal_share}>
        {" "}
        <Modal
          // title={"Đối tượng được chia sẻ"}
          centered
          footer={null}
          open={isOpenModalShare}
          onCancel={() => setIsOpenModalShare(false)}
          className={"mdal_share_group_customer"}
          width={1000}
        >
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ y: 400 }}
            // footer={}
            pagination={{
              pageSize: 20,
              total: 200,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />
        </Modal>
      </div>
    </>
  );
};
