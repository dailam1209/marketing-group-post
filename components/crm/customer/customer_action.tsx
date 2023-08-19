import styles from "../potential/potential.module.css";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import { dataCustomerListAction } from "../ultis/consntant";
import { useState } from "react";
import HandeOverModalCustomer from "./customer_modal/customer_handover_mdal";

export default function CustomerListAction({
  isSelectedRow,
  clearOption,
  chooseAllOption,
  numberSelected,
}: any) {
  const [isOpenCampaign, setIsOpenCampaign] = useState(false);
  const [isOpenEmail, setIsOpenIsEmail] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOpenCovert, setIsOpenConvert] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isHandOverOpen, setIsHandOverOpen] = useState(false);

  const handleClickAction = (e: any, type: string | undefined) => {
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
  for (let i = 0; i < dataCustomerListAction.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataCustomerListAction[i].link !== "#" ? (
            <Link
              href={dataCustomerListAction[i].link}
              className="flex-start-btn"
            >
              <i className={dataCustomerListAction[i].img}></i>
              {dataCustomerListAction[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) =>
                handleClickAction(e, dataCustomerListAction[i].type)
              }
            >
              <i className={dataCustomerListAction[i].img}></i>
              {dataCustomerListAction[i].name}
            </button>
          )}
        </>
      ),
    });
  }
  return (
    <>
      <div className={styles.div__thaotac}>
        <div>
          <label>Đã chọn: &nbsp;</label>
          <b className={styles.checked_count}>{numberSelected}</b>
        </div>
        <div className={styles.box_check_customer}>
          <button
            disabled={numberSelected < 1 ? true : false}
            type="button"
            className={styles.remove_all}
            onClick={clearOption}
            style={{
              color: numberSelected >= 1 ? "#FF3333" : "rgba(255, 51, 51, 0.5)",
            }}
          >
            Bỏ chọn
          </button>
          <button
            type="button"
            className={styles.choose_all}
            onClick={chooseAllOption}
          >
            Chọn tất cả trên danh sách
          </button>
        </div>
        
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          disabled={false}
          className={numberSelected < 1 ? "opacity" : ""}
          trigger={[numberSelected >= 1 ? "hover" : "contextMenu"]}
        >
          <button className={styles.button_thaotac}>
            <img src="/crm/3_cham.png" />
            Thao tác
          </button>
        </Dropdown>
        <HandeOverModalCustomer
        isModalCancel={isHandOverOpen}
        setIsModalCancel={setIsHandOverOpen}
      />
      </div>

      
    </>
  );
}
