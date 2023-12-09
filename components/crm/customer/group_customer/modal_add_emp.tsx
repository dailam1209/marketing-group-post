import { SelectSingleAndOption } from "@/components/commodity/select";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import stylesBtn from "@/styles/crm/button.module.css";
import styles from "./customer_group.module.css";
import { axiosQLCSite } from "@/utils/api/api_qlc_site";
import jwt_decode from "jwt-decode";
import { getToken } from "@/pages/api/api-hr/token";
import { axiosCRMSite } from "@/utils/api/api_crm_site";
import {
  decodeToken,
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { axiosCRM } from "@/utils/api/api_crm";
import { axiosQLC } from "@/utils/api/api_qlc";
import useLoading from "../../hooks/useLoading";
import LoadingLayout from "@/constants/LoadingLayout";
function ModalGroupCustomerAddEmp({ isOpenModalAddEmp, setIsOpenModalAddEmp }) {
  const [formData, setFormData] = useState<any>({
    recall: true,
    ep_status: "Active",
    pageNumber: 1,
    pageSize: 1000000,
  });
  const [listDepartment, setListDepartment] = useState([]);
  const [listEmp, setListEmp] = useState([]);
  const [listGroup, setListGroup] = useState([]);
  const [company_id, setCompanyId] = useState(null);
  const { isLoading, handleLoading } = useLoading();

  useEffect(() => {
    const currentCookie = getToken("token_base365");
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      setCompanyId(decodedToken?.data?.com_id);
    }
  }, []);
  //Get list department
  useEffect(() => {
    company_id &&
      axiosQLC
        .post("/organizeDetail/listAll", { com_id: company_id })
        .then((res) =>
          setListDepartment(
            res.data.data.data?.map((dp) => ({
              value: dp.listOrganizeDetailId,
              label: dp.organizeDetailName,
            }))
          )
        )
        .catch((err) => console.log("getListDepartment", err));
  }, [company_id]);
  const getListAllNvienKinhDoanh = () => {
    company_id &&
      axiosCRM
        .post("/account/takeListNvienKinhDoanh", { com_id: company_id })
        .then((res) => {
          setListEmp(
            res.data.data.listUser?.map((emp) => ({
              value: emp.ep_id,
              label: `${emp.ep_id}. ${emp.userName}`,
            }))
          );
        })
        .catch((err) => console.log("FilterCart", err));
  };
  // const fetchListEmp = () => {
  //   axiosQLC
  //     .post("/managerUser/listUser", {
  //       pageSize: 10000,
  //       authentic: 1,
  //     })
  //     .then((res) =>
  //       setListEmp(
  //         res.data.data.data?.map((emp) => ({
  //           value: emp.ep_id,
  //           label: `${emp.ep_id}. ${emp.userName}`,
  //         }))
  //       )
  //     )
  //     .catch((err) => console.log("err", err));
  // };
  const getListNVKDofDepartment = () => {
    axiosQLC
      .post("/managerUser/listUser", formData)
      .then((res) => {
     
        setListEmp(
          res.data.data.data?.map((emp) => ({
            value: emp.ep_id,
            label: `${emp.ep_id}. ${emp.userName}`,
          }))
        );
      })
      .catch((err) => console.log("errgetListNVKDofDepartment", err));
  };
  console.log("formData", formData);
  useEffect(() => {
    if (formData.listOrganizeDetailId) {
      getListNVKDofDepartment();
    } else {
      getListAllNvienKinhDoanh();
    }
  }, [formData.listOrganizeDetailId, company_id]);
  const fetchListGroup = () => {
    axiosCRM
      .post("/account/TakeListGroup", {
        company_id,
      })
      .then((res) =>
        setListGroup(
          res.data.data.Group?.map((group) => ({
            value: group.gr_id,
            label: `${group.gr_id}. ${group.gr_name}`,
          }))
        )
      )
      .catch((err) => console.log("err", err));
  };
  useEffect(() => {
    if (company_id) {
      // handleLoading(fetchListEmp);
      fetchListGroup();
    }
  }, [company_id]);
  const handleAddUserToCart = () => {
    if (!formData.IdCrm || !formData.IdCart) {
      notifyWarning("Chọn đầy đủ thông tin!");
      return;
    }
    axiosCRM
      .post("/account/AddUserToCart", formData)
      .then((res) => {
        notifySuccess("Thêm thành công");
        setFormData({});
        setTimeout(() => {
          setIsOpenModalAddEmp(false);
        }, 1700);
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
      className={"mdal_default"}
      width={700}
    >
      {isLoading ? (
        <LoadingLayout />
      ) : (
        <div>
          <div className={styles.modal_move_item}>
            <SelectSingleAndOption
              title="Chọn phòng ban"
              data={listDepartment}
              formData={formData}
              value={formData.IdDepartment}
              setFormData={setFormData}
              name={"listOrganizeDetailId"}
            />
          </div>
          <div className={styles.modal_move_item}>
            <SelectSingleAndOption
              title="Chọn nhân viên"
              data={listEmp}
              formData={formData}
              value={formData.IdCrm}
              setFormData={setFormData}
              name={"IdCrm"}
              valueAll={listEmp?.map((emp) => emp.value).toString()}
            />
          </div>
          <div className={styles.modal_move_item}>
            <SelectSingleAndOption
              title="Chọn nhóm"
              data={listGroup}
              formData={formData}
              value={formData.IdCart}
              setFormData={setFormData}
              name={"IdCart"}
              valueAll={listEmp?.map((emp) => emp.value).toString()}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleAddUserToCart}
              className={stylesBtn.button_primary}
            >
              Thêm
            </button>
          </div>
        </div>
      )}

      <ToastContainer autoClose={500} />
    </Modal>
  );
}

export default ModalGroupCustomerAddEmp;
