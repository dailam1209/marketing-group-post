import type { MenuProps } from "antd";
import { Dropdown, Image } from "antd";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { dataActionQuote } from "../ultis/consntant";
import { QuoteContext } from "./quoteContext";
import CancelActionModal from "./quote_action_modal/cancel_action_mdal";
import DelActionModal from "./quote_action_modal/delete_action_mdal";
import DenyActionModal from "./quote_action_modal/deny_action_mdal";
import HandOverActionModal from "./quote_action_modal/handover_action_mdal";
import QuoteBrowsingModal from "./quote_action_modal/quote_browsing_action_mdal";
import SendMailModal from "./quote_action_modal/send_mail_mdal";
import ShareActionModal from "./quote_action_modal/share_action_mdal";
import StatusModal from "./quote_action_modal/status-mdal";
import PdfGenerator2 from "./quote_report_form/pdfGenerator2";
import SimpleQuoteReport from "./quote_report_form/simple_quote_report_form";

export default function QuoteActionTable(props: any) {
  const { recordId, setRecordId, setShouldFetchDetailData } = useContext(QuoteContext)
  const { record, allkey } = props;
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOrderBrowsingOpen, setIsOrderBrowsingOpen] = useState(false);
  const [isDenyOpen, setIsDenyOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenHandOver, setIsOpenHandOver] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenSend, setIsOpenSend] = useState(false);
  const [isOpenPdf, setIsOpenPdf] = useState(false);
  const [isDownloadPdf, setIsDownloadPdf] = useState(false)

  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "delete") {
      setIsDelOpen(true);
    }
    if (type === "order_browsing") {
      setIsOrderBrowsingOpen(true);
    }
    if (type === "deny") {
      setIsDenyOpen(true);
    }
    if (type === "cancel") {
      setIsCancelOpen(true);
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
    if (type === "printer") {
      setShouldFetchDetailData(true)
      setIsDownloadPdf(false)
      setIsOpenPdf(true)
    }
    if (type === "download") {
      setShouldFetchDetailData(true)
      setIsDownloadPdf(true)
      setIsOpenPdf(true)
    }
  };
// TODO Check multiple time
  useEffect(() => {
    setShouldFetchDetailData(true)
  }, [])

  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionQuote.length; i++) {
    if (['download'].includes(dataActionQuote[i].type)) {
      continue;
    }
    items.push({
      key: i,
      label: (
        <>
          {dataActionQuote[i].link !== "#" ? (
            <Link
              href={`${dataActionQuote[i].link}/${record}`}
              className="flex-start-btn"
            >
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
    <>
      <div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button style={{ justifyContent: "center" }}>
            <Image src="/crm/3_cham.png" width={15} height={15} />
            Thao tác
          </button>
        </Dropdown>
      </div>
      <QuoteBrowsingModal
        isModalCancel={isOrderBrowsingOpen}
        setIsModalCancel={setIsOrderBrowsingOpen}
      />
      <DenyActionModal
        isModalCancel={isDenyOpen}
        setIsModalCancel={setIsDenyOpen}
      />
      <DelActionModal
        record={record}
        allkey={[]}
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
      <CancelActionModal
        isModalCancel={isCancelOpen}
        setIsModalCancel={setIsCancelOpen}
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
        allkey={[]}
        isModalCancel={isOpenUpdate}
        setIsModalCancel={setIsOpenUpdate}
      />
      <SendMailModal
        record={record}
        allkey={allkey}
        isModalCancel={isOpenSend}
        setIsModalCancel={setIsOpenSend}
      />

      <PdfGenerator2
        isVisible={isOpenPdf}
        closePdfModal={setIsOpenPdf}
        isDownload={isDownloadPdf}
      />
    </>
  );
}
