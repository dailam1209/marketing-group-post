// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./campaign_detail.module.css";
import { useState } from "react";
import { Switch } from "antd";
import Link from "next/link";

// import InputText from "./input_text";
import { Input, Tooltip } from "antd";
import { useRouter } from "next/router";
import DelActionModal from "../campaign_delete_action_mdal";
import { fetchApi } from "../../ultis/api";
import Cookies from "js-cookie";
import PauseActionModal from "./campaign_pause_action_modal";

export default function DetailCampaignButtonControl({
  isHideEmptyData,
  setIsHideEmptyData,
  formFields,
}) {
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOpenPause, setIsOpenPause] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const url = "https://api.timviec365.vn/api/crm/campaign/delete-campaign";
  const token = Cookies.get("token_base365");
  const onChange = (checked: boolean) => {
    setIsHideEmptyData(!isHideEmptyData);
  };

  const handleDelete = async (id: number) => {
    const bodyAPI = {
      cam_id: id,
    };
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    router.push("/campaign/list");
  };

  const handlePause = async (id: number) => {
    const bodyAPI = {
      cam_id: id,
      status: 4,
      nameCampaign: formFields?.nameCampaign,
    };
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/campaign/edit-campaign",
      token,
      bodyAPI,
      "POST"
    );
    router.push("/campaign/list");
  };

  return (
    <div>
      <div className={`${styles.main}`}>
        <div className={styles.row_input}>
          <div
            className={`${styles.main__control_btn} ${styles.flex_end} `}
            style={{ flexWrap: "wrap", gap: "10px" }}
          >
            <div className={`${styles.flex_1}`} style={{ minWidth: "150px" }}>
              <Switch checked={isHideEmptyData} onChange={onChange} />
              Ẩn dữ liệu trống
            </div>
            <div className={styles.group_button}>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenPause(true);
                  }}
                  className={`${styles.btn_pause} flex_align_center`}
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.0984 5.90015L5.89844 10.1001"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.89844 5.90015L10.0984 10.1001"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Tạm dừng
                </button>
              </div>
              <Link href={`/campaign/edit/${id}`}>
                <button
                  type="button"
                  className={`${styles.btn_edit} flex_align_center`}
                >
                  <i className="bi bi-pencil-square"></i>
                  Chỉnh sửa
                </button>
              </Link>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsDelOpen(true);
                  }}
                  className={`${styles.btn_delete} flex_align_center`}
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <i className="bi bi-trash3"></i>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
        handleDelete={handleDelete}
        id={Number(id)}
      />

      <PauseActionModal
        isModalCancel={isOpenPause}
        setIsModalCancel={setIsOpenPause}
        handlePause={handlePause}
        id={Number(id)}
      />
    </div>
  );
}
