import styles from "./information.module.css";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import { dataActionPotential } from "../../ultis/consntant";
import { useState } from "react";
import EmailModal from "../potential_action_modal/potential_mdal_email";
import DelActionModal from "../potential_action_modal/deltete_action_mdal";
import ConvertModal from "../potential_action_modal/convert_modal";
import ShareActionModal from "../potential_action_modal/potential_share_action_mdal";
import HandeOverModal from "../potential_action_modal/hand_over_mdal";
import { MoreOutlined } from "@ant-design/icons";
import ShowCampaignPOMD from "../mdal_action/mdal_show_campaignPO";
import { useRouter } from "next/router";
import { axiosCRM } from "@/utils/api/api_crm";
import { notifyError } from "@/utils/function";

export default function PotentialActionDetail({ isSelectedRow }: any) {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenCampaign, setIsOpenCampaign] = useState(false);
  const [isOpenEmail, setIsOpenIsEmail] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOpenCovert, setIsOpenConvert] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isHandOverOpen, setIsHandOverOpen] = useState(false);

  const fetchApiDelPotential = async () => {
    axiosCRM
      .post("/potential/delete-potential", {
        cus_id: Number(id),
      })
      .then((res) => setIsDelOpen(true))
      .catch((error) => {
        console.log("checkerrrr", error);
        notifyError("Vui lòng thử lại sau");
      });
  };

  const handleClickAction = (e: any, type: string | undefined) => {
    console.log("type", type)
    if (type === "campaign") {
      setIsOpenCampaign(true);
    }
    if (type === "email") {
      setIsOpenIsEmail(true);
    }
    if (type === "delete") {
      setIsDelOpen(true);
    }
    if (type === "convert") {
      setIsOpenConvert(true);
    }
    if (type === "share") {
      setIsOpenShare(true);
    }
    if (type === "hand_over") {
      setIsHandOverOpen(true);
    }
  };
  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionPotential?.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataActionPotential[i].link !== "#" &&
          dataActionPotential[i].link !== "/potential/edit" ? (
            <Link href={dataActionPotential[i].link} className="flex-start-btn">
              <i className={dataActionPotential[i].img}></i>
              {dataActionPotential[i].name}
            </Link>
          ) : dataActionPotential[i].link === "/potential/edit" ? (
            <Link
              href={`${dataActionPotential[i].link}/${id}`}
              className="flex-start-btn"
            >
              <i className={dataActionPotential[i].img}></i>
              {dataActionPotential[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) => handleClickAction(e, dataActionPotential[i].type)}
            >
              <i className={dataActionPotential[i].img}></i>
              {dataActionPotential[i].name}
            </button>
          )}
        </>
      ),
    });
  }
  return (
    <div className={styles.div__thaotac}>
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        disabled={false}
        className={!isSelectedRow ? "opacity" : ""}
        trigger={[isSelectedRow ? "hover" : "contextMenu"]}
      >
        <button className={styles.action}>
          <MoreOutlined rev={null} />
          Thao tác
        </button>
      </Dropdown>

      <ShowCampaignPOMD
        isModalCancelPO={isOpenCampaign}
        onClose={setIsOpenCampaign}
      />
      <EmailModal
        isModalCancel={isOpenEmail}
        setIsModalCancel={setIsOpenIsEmail}
      />

      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
        fetchApiDel={fetchApiDelPotential}
      />

      <ConvertModal
        isModalCancel={isOpenCovert}
        setIsModalCancel={setIsOpenConvert}
      />

      <ShareActionModal
        isModalCancel={isOpenShare}
        setIsModalCancel={setIsOpenShare}
        listNV={undefined}
      />

      <HandeOverModal
        isModalCancel={isHandOverOpen}
        setIsModalCancel={setIsHandOverOpen}
      />
    </div>
  );
}
