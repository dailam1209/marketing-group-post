import React, { useState } from "react"
import { Button, Card, Tabs } from "antd"
import styles from "./index.module.css"
import { DanhSachPhuCap } from "@/components/cai-dat-luong/cai-dat-phu-cap-khac/danh-sach-phu-cap/danh-sach-phu-cap"
import { PhuCapTheoCa } from "@/components/cai-dat-luong/cai-dat-phu-cap-khac/phu-cap-theo-ca/phu-cap-theo-ca"
import { GET_SS, POST_SS, POST_SS_TL, getCompIdSS } from "@/pages/api/BaseApi"

export default function CaiDatThue({
  listPhuCap,
  listPhuCapTheoCa,
  listPhongBan,
  listNhanVien,
  listEmpX,
  listShift
}) {
  console.log(listShift)
  return (
    <div>
      <DanhSachPhuCap
        listPhuCap={listPhuCap}
        listPhongBan={listPhongBan}
        listNhanVien={listNhanVien}
        listEmpX={listEmpX}
      />
      <PhuCapTheoCa listPhuCapTheoCa={listPhuCapTheoCa} listShift={listShift} />
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let companyId = getCompIdSS(context)
  const listPhucLoi = await POST_SS_TL(
    "api/tinhluong/congty/take_phuc_loi",
    { companyId: 3312 },
    context
  )
  const listPhongBan = await POST_SS(
    "api/qlc/department/list",
    { com_id: 3312 },
    context
  )
  const listNhanVien = await POST_SS_TL(
    "api/tinhluong/congty/list_em",
    { id_com: 3312 },
    context
  )
  const listEmpX = await POST_SS('api/qlc/managerUser/list', {
    com_id: 3312
  }, context)

  const listShift = await GET_SS('api/qlc/shift/list', context)
  return {
    props: {
      listEmpX,
      listPhuCap: listPhucLoi?.data?.list_welfa ?? [],
      listPhuCapTheoCa: listPhucLoi?.data?.wf_shift ?? [],
      listPhongBan: listPhongBan?.data ?? [],
      listNhanVien: listNhanVien?.data?.listUser ?? [],
      listShift: listShift?.list ?? []
    }
  }
}
