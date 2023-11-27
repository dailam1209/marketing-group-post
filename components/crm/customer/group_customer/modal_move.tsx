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

function ModalGroupCustomerMove({ isOpenModalMove, setIsOpenModalMove }) {
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
            label:`${emp.ep_id}. ${emp.userName}` ,
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
  const handleTranformCart = () => {
    if (!formData.IdCrmFrom || !formData.IdCrmTo) {
      notifyWarning("Chọn đầy đủ thông tin");
      return;
    }
    axiosCRM
      .post("/account/tranformCart", formData)
      .then((res) => {
        notifySuccess("Chuyển giỏ hàng thành công");
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
      className={"mdal_cancel"}
    >
      <div className={styles.modal_move_item}>
        <SelectSingleAndOption
          title="Từ nhân viên"
          data={listEmp}
          formData={formData}
          setFormData={setFormData}
          name={"IdCrmFrom"}
        />
      </div>
      <div className={styles.modal_move_item}>
        <SelectSingleAndOption
          title="Đến nhân viên"
          data={listEmp}
          formData={formData}
          setFormData={setFormData}
          name={"IdCrmTo"}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button onClick={handleTranformCart} className={stylesBtn.back_button}>
          Chuyển giỏ
        </button>
      </div>{" "}
      <ToastContainer autoClose={1000} />
    </Modal>
  );
}

export default ModalGroupCustomerMove;
