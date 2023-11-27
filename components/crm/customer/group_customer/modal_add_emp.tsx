import { SelectSingleAndOption } from "@/components/commodity/select";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import stylesBtn from "@/styles//crm/button.module.css";
import styles from "./customer_group.module.css";
import { axiosQLCSite } from "@/utils/api/api_qlc_site";
import jwt_decode from "jwt-decode";
import { getToken } from "@/pages/api/api-hr/token";
import { axiosCRMSite } from "@/utils/api/api_crm_site";
import { notifyError, notifySuccess, notifyWarning } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { axiosCRM } from "@/utils/api/api_crm";
import { axiosQLC } from "@/utils/api/api_qlc";
function ModalGroupCustomerAddEmp({ isOpenModalAddEmp, setIsOpenModalAddEmp }) {
  const [formData, setFormData] = useState<any>({});
  const [listEmp, setListEmp] = useState([]);
  const [listGroup, setListGroup] = useState([]);
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
  const fetchListGroup = () => {
    axiosCRM
      .post("/account/TakeListGroup", {
        company_id,
      })
      .then((res) =>
        setListGroup(
          res.data.data.Group?.map((group) => ({
            value: group.gr_id,
            label: group.gr_name,
          }))
        )
      )
      .catch((err) => console.log("err", err));
  };
  useEffect(() => {
    if (company_id) {
      fetchListEmp();
      fetchListGroup();
    }
  }, [company_id]);
  const handleAddUserToCart = () => {
    if(!formData.IdCrm||!formData.IdCart){
        notifyWarning("Chọn đầy đủ thông tin!")
        return
    }
    axiosCRM
      .post("/account/AddUserToCart", formData)
      .then((res) => {
        notifySuccess("Thêm thành công");
      })
      .catch((err) => notifyError("Thêm thất bại"));
  };
  return (
    <Modal
      title={"Thêm cán bộ vào nhóm"}
      centered
      footer={null}
      open={isOpenModalAddEmp}
      onCancel={() => setIsOpenModalAddEmp(false)}
      className={"mdal_cancel"}
    >
      <div className={styles.modal_move_item}>
        <SelectSingleAndOption
          title="Chọn nhân viên"
          data={listEmp}
          formData={formData}
          setFormData={setFormData}
          name={"IdCrm"}
        />
      </div>
      <div className={styles.modal_move_item}>
        <SelectSingleAndOption
          title="Chọn nhóm"
          data={listGroup}
          formData={formData}
          setFormData={setFormData}
          name={"IdCart"}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button onClick={handleAddUserToCart} className={stylesBtn.back_button}>
          Thêm
        </button>
      </div>
      <ToastContainer autoClose={1000} />
    </Modal>
  );
}

export default ModalGroupCustomerAddEmp;
