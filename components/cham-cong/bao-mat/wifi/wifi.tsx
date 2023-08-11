import Image from "next/image"
import styles from "./wifi.module.css"
import React, { useState } from "react"
import {
  AddNewWifiModal,
  ConfirmModal,
  TYPE_ADD,
  TYPE_UPDATE
} from "./modals/modals"
import moment from "moment"
import { AddButton } from "@/components/commons/Buttons"

export function Wifi({
  listWifi,
  setListWifi
}: {
  listWifi: any[]
  setListWifi: any
}) {
  const [openAddNew, setOpenAddNew] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [list, setList] = useState(listWifi)
  const [selectedRow, setSelectedRow] = useState()
  const singleWifiIitem = (item: any, index: number) => (
    <div key={index} className={styles.wifiItem}>
      <div className={styles.topWarpper}>
        <div className={styles.infoSection}>
          <Image
            alt="/"
            src={"/wifi-icon.png"}
            width={42}
            height={42}
            style={{ marginRight: "10px" }}
          />
          <div>
            <p style={{ marginBottom: "5px", color: "#4C5BD4" }}>
              Tên Wifi: {item?.name_wifi}
            </p>
            <p>Địa chỉ Mac của Wifi: {item?.ip_address}</p>
          </div>
        </div>
        <div className={styles.btnGroup}>
          <Image
            alt="/"
            src={"/add-icon.png"}
            width={24}
            height={24}
            onClick={() => {
              setSelectedRow(item)
              setOpenUpdate(true)
            }}
          />
          <div className={styles.divider}></div>
          <Image
            alt="/"
            src={"/delete-icon.png"}
            width={24}
            height={24}
            onClick={() => {
              setSelectedRow(item)
              setOpenConfirm(true)
            }}
          />
        </div>
      </div>
      <div>
        <p className={styles.txtUpdate}>
          Cập nhật:{" "}
          {`${moment(item?.create_time)?.format("DD-MM-YYYY HH:mm:ss")}`}
        </p>
      </div>
    </div>
  )

  return (
    <div>
      <div className={styles.header}>
        <p style={{ fontSize: "18px", fontWeight: "600" }}>Danh sách Wifi</p>
        {AddButton("Thêm mới wifi", () => setOpenAddNew(true))}
      </div>
      <div>
        {list && list?.map((item, index) => singleWifiIitem(item, index))}
      </div>
      {AddNewWifiModal(
        openAddNew,
        setOpenAddNew,
        TYPE_ADD,
        null,
        list,
        setList
      )}
      {AddNewWifiModal(
        openUpdate,
        setOpenUpdate,
        TYPE_UPDATE,
        selectedRow,
        list,
        setList
      )}
      {ConfirmModal(openConfirm, setOpenConfirm, selectedRow, list, setList)}
    </div>
  )
}
