import { SelectSingleAndOption } from "@/components/commodity/select";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import stylesBtn from "@/styles//crm/button.module.css";
import styles from "./customer_group.module.css";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import { notifyError, notifySuccess, notifyWarning } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { axiosQLC } from "@/utils/api/api_qlc";
import { axiosCRM } from "@/utils/api/api_crm";
import useLoading from "../../hooks/useLoading";
import LoadingLayout from "@/constants/LoadingLayout";

function ModalGroupCustomerMove({ isOpenModalMove, setIsOpenModalMove }) {
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
    axiosCRM
      .post("/account/takeListNvienKinhDoanh", {
        com_id: company_id,
      })
      .then((res) =>
        setListEmp(
          res.data.data.listUser?.map((emp) => ({
            value: emp.idQLC,
            label: `${emp.idQLC}. ${emp.userName}`,
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
  const handleTranformCart = () => {
    if (!formData.IdCrmFrom || !formData.IdCrmTo) {
      notifyWarning("Chọn đầy đủ thông tin");
      return;
    }
    axiosCRM
      .post("/account/tranformCart", formData)
      .then((res) => {
        notifySuccess("Chuyển giỏ hàng thành công");
        setFormData({});
        setTimeout(() => {
          setIsOpenModalMove(false);
        }, 1700);
      })
      .catch((err) => notifyError("Chuyển thất bại"));
  };
  return (
    <Modal
      title={"Chuyển giỏ"}
      centered
      footer={null}
      open={isOpenModalMove}
      onCancel={() => setIsOpenModalMove(false)}
      className={"mdal_default"}
      width={500}
    >
      {isLoading ? (
        <LoadingLayout />
      ) : (
        <div>
          <div className={styles.modal_move_item}>
            <SelectSingleAndOption
              title="Từ nhân viên"
              data={listEmp}
              formData={formData}
              setFormData={setFormData}
              value={formData.IdCrmFrom}
              name={"IdCrmFrom"}
              placeholder="Chọn nhân viên"
            />
          </div>
          <div className={styles.modal_move_item}>
            <SelectSingleAndOption
              title="Đến nhân viên"
              data={listEmp}
              formData={formData}
              value={formData.IdCrmTo}
              setFormData={setFormData}
              name={"IdCrmTo"}
              placeholder="Chọn nhân viên"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleTranformCart}
              className={stylesBtn.button_primary}
            >
              Chuyển giỏ
            </button>
          </div>{" "}
        </div>
      )}

      <ToastContainer autoClose={500} />
    </Modal>
  );
}

export default ModalGroupCustomerMove;
