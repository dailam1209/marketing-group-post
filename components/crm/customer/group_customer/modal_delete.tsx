import { Modal } from "antd";
import stylesBtn from "./customer_group.module.css";
import { useEffect, useState } from "react";
import { notifyError, notifySuccess, notifyWarning } from "@/utils/function";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";

import { SelectSingleAndOption } from "@/components/commodity/select";

import { ToastContainer } from "react-toastify";
import { axiosCRM } from "@/utils/api/api_crm";
import { axiosQLC } from "@/utils/api/api_qlc";

interface TypeDeleteProps {
  isOpenModalDelete: boolean;
  setIsOpenModalDelete: (value: boolean) => void;
}
export const ModalGroupCustomerDelete: React.FC<TypeDeleteProps> = ({
  isOpenModalDelete,
  setIsOpenModalDelete,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [listEmp, setListEmp] = useState([]);
  const [company_id, setCompanyId] = useState(null);

  useEffect(() => {
    const currentCookie = getToken("token_base365");
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setCompanyId(decodedToken?.data?.com_id);
    }
  }, []);

  const fetchListEmp = () => {
    axiosQLC
      .post("/managerUser/listUser", {
        pageSize: 10000,
        authentic: 1,
      })
      .then((res) =>
        setListEmp(
          res.data.data.data?.map((emp) => ({
            value: emp.ep_id,
            label: emp.userName,
          }))
        )
      )
      .catch((err) => console.log("err", err));
  };
  useEffect(() => {
    if (company_id) {
      fetchListEmp();
    }
  }, [company_id]);

  const handleDeleteCart = () => {
    if (!formData.idCRM) {
      notifyWarning("Vui lòng chọn giỏ!");
      return;
    }
    axiosCRM
      .post("/account/deleteCart", formData)
      .then((res) => {
        notifySuccess("Xoá thành công!");
      })
      .catch((err) => notifyError());
  };
  return (
    <>
      <Modal
        title={"Xóa giỏ"}
        centered
        footer={null}
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        className={"mdal_cancel"}
      >
        <div>
          {" "}
          <SelectSingleAndOption
            title="Chọn giỏ"
            data={listEmp}
            formData={formData}
            setFormData={setFormData}
            name={"idCRM"}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              onClick={handleDeleteCart}
              className={stylesBtn.delete_button}
            >
              Xóa
            </button>
          </div>
        </div>
        <ToastContainer autoClose={2200} />
      </Modal>
    </>
  );
};
