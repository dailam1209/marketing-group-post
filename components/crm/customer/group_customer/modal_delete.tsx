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
import useLoading from "../../hooks/useLoading";
import LoadingLayout from "@/constants/LoadingLayout";

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
  const { isLoading, handleLoading } = useLoading();

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
            label: `${emp.ep_id}. ${emp.userName}`,
          }))
        )
      )
      .catch((err) => console.log("err", err));
  };
  useEffect(() => {
    if (company_id) {
      handleLoading(fetchListEmp);
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
        setFormData({});
        setTimeout(() => {
          setIsOpenModalDelete(false);
        }, 1700);
      })
      .catch((err) => {
        notifyError();
      });
  };
  return (
    <>
      <Modal
        title={"Xóa giỏ"}
        centered
        footer={null}
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        className={"mdal_default"}
      >
        {isLoading ? (
          <LoadingLayout />
        ) : (
          <div>
            {" "}
            <SelectSingleAndOption
              title="Chọn nhân viên"
              data={listEmp}
              formData={formData}
              value={formData.idCRM}
              setFormData={setFormData}
              // placeholder="Chọn tất cả"
              name={"idCRM"}
              valueAll={listEmp?.map((emp) => emp.value).toString()}
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
        )}

        <ToastContainer autoClose={500} />
      </Modal>
    </>
  );
};
