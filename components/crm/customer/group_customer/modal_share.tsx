import { Button, Input, Modal, Pagination, Table } from "antd";
import style from "@/components/crm/customer/group_customer/modal_share.module.css";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import { axiosCRM } from "@/utils/api/api_crm";
import { MInputText } from "@/components/commodity/input";
import { toLowerCaseNonAccentVietnamese } from "@/utils/function";
import useLoading from "../../hooks/useLoading";
import LoadingLayout from "@/constants/LoadingLayout";

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
  const [tableShow, setTableShow] = useState<any>([]);
  const { isLoading, handleLoading, startLoading } = useLoading();

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
      title: "idQLC",
      dataIndex: "idQLC",
      width: 150,
      key: "idQLC",
    },
    {
      title: "Thao tác",
      dataIndex: "idQLC",
      width: 100,
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
  const fetchTakeListUser = () => {
    axiosCRM
      .post("/account/TakeListUserFromGroup", { IdGroup, companyId })
      .then((res) => {
        setListEmpTable(res.data.data.listUser);
        setTableShow(res.data.data.listUser);
      })
      .catch((err) => console.log("ModalGroupCustomerShare", err));
  };
  useEffect(() => {
    if (IdGroup && companyId) {
      handleLoading(fetchTakeListUser);
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
          fetchTakeListUser();
        })
        .catch((err) => console.log("ModalGroupCustomerShare", err));
    } catch (e) {
      console.log("err HandleDeleteUserFromFroup", e);
      return false;
    }
  };
  const handleSearchEmp = (search) => {
    if (!search) {
      setTableShow(listEmpTable);
    } else {
      setTableShow(
        listEmpTable?.filter((emp) =>
          toLowerCaseNonAccentVietnamese(emp.userName)?.includes(
            toLowerCaseNonAccentVietnamese(search)
          )
        )
      );
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
          onCancel={() => {
            setIsOpenModalShare(false);
          }}
          className={"mdal_share_group_customer"}
          width={1000}
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "50px" }}
          >
            <label style={{ width: "200px", display: "block" }}>
              Tìm kiếm nhân viên
            </label>
            <Input onChange={(e) => handleSearchEmp(e.target.value)} />
          </div>
          {isLoading ? (
            <LoadingLayout />
          ) : (
            <Table
              columns={columns}
              dataSource={tableShow}
              scroll={{ y: 400 }}
              bordered
              pagination={{
                pageSize: 100,
              }}
            />
          )}
        </Modal>
      </div>
    </>
  );
};
