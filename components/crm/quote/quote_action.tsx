import styles from "@/components/crm/quote/quote.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { dataActionQuote } from "../ultis/consntant";
import { useState } from "react";
import OrderBrowsingModal from "./quote_action_modal/quote_browsing_action_mdal";
import DenyActionModal from "./quote_action_modal/deny_action_mdal";
import DelActionModal from "./quote_action_modal/delete_action_mdal";
import CancelActionModal from "./quote_action_modal/cancel_action_mdal";
import ShareActionModal from "./quote_action_modal/share_action_mdal";
import HandOverActionModal from "./quote_action_modal/handover_action_mdal";
import StatusModal from "./quote_action_modal/status-mdal";
import { useRouter } from "next/router";

export default function QuoteAction({ isSelectedRow, record, allkey }: any) {
  console.log('check',record)
  const [isOpenOrderBrowsing, setIsOpenOrderBrowsing] = useState(false);
  const [isOpenDeny, setIsOpenDeny] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenHandOver, setIsOpenHandOver] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenSend, setIsOpenSend] = useState(false);
  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "order_browsing") {
      setIsOpenOrderBrowsing(true);
    }
    if (type === "deny") {
      setIsOpenDeny(true);
    }
    if (type === "delete") {
      setIsDelOpen(true);
    }
    if (type === "cancel") {
      setIsOpenCancel(true);
    }
    if (type === "share") {
      setIsOpenShare(true);
    }
    if (type === "hand_over") {
      setIsOpenHandOver(true);
    }
    if (type === "update-status") {
      setIsOpenUpdate(true);
    }
    if (type === "send") {
      setIsOpenSend(true);
    }
  };
  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionQuote.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataActionQuote[i].link !== "#" ? (
            <Link href={`${dataActionQuote[i].link}/${record}` } className="flex-start-btn">
              <i className={dataActionQuote[i].img}></i>
              {dataActionQuote[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) => handleClickAction(e, dataActionQuote[i].type)}
            >
              <i className={dataActionQuote[i].img}></i>
              {dataActionQuote[i].name}
            </button>
          )}
        </>
      ),
    });
  }
  return (
    <div className={styles.div__thaotac} style={{marginBottom:-20}}>
      <div>
        <label>Đã chọn:</label>
        <b className={styles.checked_count}>0</b>
      </div>
      
      <Dropdown
        trigger={"click" as any}
        menu={{ items }}
        placement="bottomLeft"
      >
        <button className={styles.button_thaotac}>
          <img src="/crm/3_cham.png" />
          Thao tác
        </button>
      </Dropdown>
      {/* <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        disabled={false}
        className={!isSelectedRow ? "opacity" : ""}
        trigger={[isSelectedRow ? "hover" : "contextMenu"]}
      >
        <button className={styles.button_thaotac}>
          <img src="/crm/3_cham.png" />
          Thao tác
        </button>
      </Dropdown> */}

      <OrderBrowsingModal
        isModalCancel={isOpenOrderBrowsing}
        setIsModalCancel={setIsOpenOrderBrowsing}
      />

      <DenyActionModal
        isModalCancel={isOpenDeny}
        setIsModalCancel={setIsOpenDeny}
      />

      <DelActionModal
        record={record}
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />

      <CancelActionModal
        isModalCancel={isOpenCancel}
        setIsModalCancel={setIsOpenCancel}
      />

      <ShareActionModal
        record={record}
        isModalCancel={isOpenShare}
        setIsModalCancel={setIsOpenShare}
      />

      <HandOverActionModal
        record={record}
        isModalCancel={isOpenHandOver}
        setIsModalCancel={setIsOpenHandOver}
      />
      <StatusModal
        record={record}
        allkey={allkey}
        isModalCancel={isOpenUpdate}
        setIsModalCancel={setIsOpenUpdate}
      />
    </div>
  );
}
