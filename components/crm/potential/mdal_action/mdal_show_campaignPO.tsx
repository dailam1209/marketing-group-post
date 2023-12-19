import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import ModalCompleteStep from "@/components/crm/quote/quote_steps/complete_modal";
import CampaignInputGroupsModal from "../detail/campaign_input_modal";
import TableDataCampaignModal from "@/components/crm/table/table_data_campain_modal";
import Cookies from "js-cookie";
import useLoading from "../../hooks/useLoading";
import { fetchApi } from "../../ultis/api";
import { axiosQLC } from "@/utils/api/api_qlc";
import { notifyError } from "@/utils/function";
import { useTrigger } from "../../context/triggerContext";

const ShowCampaignPOMD = (props: any) => {
  const { isModalCancelPO, onClose } = props;
  const [showMdalAdd, setIsShowMdalADd] = useState(false);
  const router = useRouter();
  const { trigger, setTrigger } = useTrigger();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const token = Cookies.get("token_base365");
  const [data, setData] = useState([]);
  const [listEmp, setListEmp] = useState();
  const [formData, setFormData] = useState({ nameCampaign: "" });
  const [arrCampaign, setArrCampaign] = useState([]);
  const url = "https://api.timviec365.vn/api/crm/campaign/listCampaign";
  // const url = "http://localhost:3007/api/crm/campaign/listCampaign";

  const fetchAPICampaign = async () => {
    const bodyAPI = {
      ...formData,
      nameCampaign: formData?.nameCampaign ? formData?.nameCampaign : "",
    };
    startLoading();
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    setData(dataApi?.data);
    stopLoading();
  };

  const convertDataEmp = (datas) => {
    setListEmp(
      datas.map((item: any) => ({
        ...item,
        value: item.ep_id,
        label: item.userName,
      }))
    );
  };

  useEffect(() => {
    if (isModalCancelPO) {
      axiosQLC
        .post("/managerUser/listUser", { ep_status: "Active" })
        .then((res) => convertDataEmp(res.data.data.data))
        .catch((err) => notifyError("Vui lòng thử lại sau!"));
    }
  }, [isModalCancelPO]);

  useEffect(() => {
    if (isModalCancelPO) {
      fetchAPICampaign();
    }
  }, [formData, isModalCancelPO]);

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        width={750}
        title={
          <div
            style={{
              background: "#4C5BD4",
              width: "107%",
              margin: "-20px -30px",
            }}
          >
            <div style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Chọn chiến dịch
            </div>
          </div>
        }
        centered
        open={isModalCancelPO}
        onOk={() => onClose()}
        onCancel={() => onClose()}
        okText="Đồng ý"
        cancelText="Huỷ"
        footer={
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ width: "100px" }} onClick={() => onClose()}>
              <Button style={{ width: 150 }}>Hủy</Button>
            </div>
            <div
              style={{ width: "100px" }}
              onClick={async () => {
                await fetchApi(
                  "https://api.timviec365.vn/api/crm/customerdetails/add-campaign-customer",
                  token,
                  {
                    arr_cus_id: [Number(router.query.id)],
                    arr_campaign_id: arrCampaign,
                  },
                  "POST"
                );
                // router.reload();
                setTrigger(true);
                onClose();
              }}
            >
              <Button
                style={{ width: 150, color: "#fff", background: "#4C5BD4" }}
              >
                Đồng ý
              </Button>
            </div>
          </div>
        }
      >
        {/* <ModalCompleteStep
          modal1Open={trigger}
          setModal1Open={setIsShowMdalADd}
          title={`Thêm khách hàng vào chiến dịch thành công`}
          link={"#"}
        /> */}

        <div style={{ paddingTop: 30 }}>
          <CampaignInputGroupsModal setFormData={setFormData} />
        </div>
        <TableDataCampaignModal
          empList={listEmp}
          dataAPI={data}
          setArrCampaign={setArrCampaign}
        />
      </Modal>
    </>
  );
};

export default ShowCampaignPOMD;
