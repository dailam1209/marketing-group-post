import { Modal, Pagination, Table } from "antd";
import style from "@/components/crm/customer/group_customer/modal_share.module.css";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import { axiosCRM } from "@/utils/api/api_crm";

interface TypeShareProps {
  isOpenModalShare: boolean;
  setIsOpenModalShare: (value: boolean) => void;
  IdGroup?: number;
}
interface TableType {
  key: React.Key;
  userName: string;
  organization: string;
  position: number;
  address: string;
  idQLC: string[];
}

export const ModalGroupCustomerShare: React.FC<TypeShareProps> = ({
  isOpenModalShare,
  setIsOpenModalShare,
  IdGroup,
}) => {
  const [listEmpTable, setListEmpTable] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  useEffect(() => {
    const currentCookie = getToken("token_base365");
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setCompanyId(decodedToken?.data?.com_id);
    }
  }, []);
  const columns: ColumnsType<TableType> = [
    {
      title: "Tên",
      dataIndex: "userName",
      key: "userName",
      width: 250,
    },
    {
      title: "Tổ chức",
      dataIndex: "organization",
      key: "organization",
      width: 250,
    },
    {
      title: "Vị trí",
      dataIndex: "position",
      width: 200,
      key: "position",
    },
    {
      title: "ID",
      dataIndex: "idQLC",
      width: 150,
      key: "idQLC",
    },
    {
      title: "",
      dataIndex: "idQLC",
      width: 150,
      key: "idQLC",
      render: (data, record) => (
        // <Tooltip title={data}>
        <div
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => HandleDeleteUserFromFroup(Number(record.idQLC))}
        >
          Xóa
        </div>
        // </Tooltip>
      ),
    },
  ];
  useEffect(() => {
    if (IdGroup && companyId) {
      axiosCRM
        .post("/account/TakeListUserFromGroup", { IdGroup, companyId })
        .then((res) => setListEmpTable(res.data.data.listUser))
        .catch((err) => console.log("ModalGroupCustomerShare", err));
    }
  }, [IdGroup]);

  const HandleDeleteUserFromFroup = async (idQLC: any) => {
    try {
      axiosCRM
        .post("/account/DeleteUserFromCart", {
          IdCart: IdGroup,
          IdCrm: idQLC,
        })
        .then((res) => {
          axiosCRM
            .post("/account/TakeListUserFromGroup", { IdGroup, companyId })
            .then((res) => setListEmpTable(res.data.data.listUser))
            .catch((err) => console.log("ModalGroupCustomerShare", err));
        })
        .catch((err) => console.log("ModalGroupCustomerShare", err));
    } catch (e) {
      console.log("err HandleDeleteUserFromFroup", e);
      return false;
    }
  };
  return (
    <>
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
            dataSource={listEmpTable}
            scroll={{ y: 400 }}
            bordered
            pagination={{
              pageSize: 100,
            }}
          />
        </Modal>
      </div>
    </>
  );
};
