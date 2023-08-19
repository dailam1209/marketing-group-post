import { Card, Tabs } from "antd"
import styles from "./index.module.css"
import { DanhSachPhongBan } from "@/components/quan-ly-cong-ty/quan-ly-phong-ban/danh-sach-phong-ban/ds_phong_ban"
import { DanhSachTo } from "@/components/quan-ly-cong-ty/quan-ly-phong-ban/danh-sach-to/DanhSachTo"
import { DanhSachNhom } from "@/components/quan-ly-cong-ty/quan-ly-phong-ban/danh-sach-nhom/DanhSachNhom"
import { LuanChuyen } from "@/components/quan-ly-cong-ty/quan-ly-phong-ban/luan-chuyen/LuanChuyen"
import { GiamBienChe } from "@/components/quan-ly-cong-ty/quan-ly-phong-ban/giam-bien-che/GiamBienChe"
import { NghiViec } from "@/components/quan-ly-cong-ty/quan-ly-phong-ban/nghi-viec/NghiViec"
import { POST, POST_SS, POST_SS_HR, getCompIdSS } from "@/pages/api/BaseApi"
import { createContext, useEffect, useState } from "react"

export const PHONGBAN_ACTIVE_KEY = "key_phongban"

export default function QuanLyPhongBanPage({
  listTeams,
  listDepartments,
  listGroups,
  listTranferJob,
  listQuitJob,
  listQuitJobNew,
  infoCom,
}) {
  const [currentKey, setCurrentKey] = useState(
    "1"
  )

  useEffect(() => {
    setCurrentKey(window?.localStorage?.getItem(PHONGBAN_ACTIVE_KEY))
  }, [])

  const LIST_TABS = [
    {
      key: "1",
      label: "Danh sách phòng ban",
      children: <DanhSachPhongBan listDepartments={listDepartments} infoCom={infoCom} />
    },
    {
      key: "2",
      label: "Danh sách tổ",
      children: <DanhSachTo listTeams={listTeams} infoCom={infoCom} listDepartments={listDepartments} />
    },
    {
      key: "3",
      label: "Danh sách nhóm",
      children: <DanhSachNhom listGroups={listGroups} infoCom={infoCom} listDepartments={listDepartments} listTeams={listTeams} />
    },
    {
      key: "4",
      label: "Luân chuyển",
      children: <LuanChuyen listTranferJob={listTranferJob} listDepartments={listDepartments} listTeams={listTeams} listGroups={listGroups} infoCom={infoCom} />
    },
    {
      key: "5",
      label: "Nghỉ việc",
      children: <NghiViec listQuitJobNew={listQuitJobNew} listDepartments={listDepartments} />
    },
    {
      key: "6",
      label: "Giảm biên chế",
      children: <GiamBienChe listQuitJob={listQuitJob} listDepartments={listDepartments} infoCom={infoCom} />
    }
  ]

  return (
    <div>
      <Card>
        {/* <div style={{ padding: "10px" }}> */}
        <Tabs
          items={LIST_TABS}
          onChange={(activeKey: string) => {
            window.localStorage.setItem(PHONGBAN_ACTIVE_KEY, activeKey)
          }}
          defaultActiveKey={currentKey}
        />
        {/* </div> */}
      </Card>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let com_id = null;
  com_id = getCompIdSS(context);

  const listTeams = await POST_SS("api/qlc/team/list", {
    com_id: com_id
  }, context)

  const listDepartments = await POST_SS("api/qlc/department/list", {
    com_id: com_id
  }, context)

  const listGroups = await POST_SS("api/qlc/group/search", {
    com_id: com_id,
  }, context)

  const listTranferJob = await POST_SS_HR("api/hr/personalChange/getListTranferJob", {
    page: 1,
    pageSize: 20,
  }, context)

  
  const listQuitJob = await POST_SS_HR("api/hr/personalChange/getListQuitJob", {
    page: 1,
    pageSize: 20,
  }, context)

  const listQuitJobNew = await POST_SS_HR("api/hr/personalChange/getListQuitJobNew", {
    page: 1,
    pageSize: 20,
  }, context)

  const infoCom = await POST_SS('api/qlc/company/info', {}, context)
      
  return {
    props: {
      listTeams,
      listDepartments,
      listGroups,
      listTranferJob,
      listQuitJob,
      listQuitJobNew,
      infoCom,
    }
  }
}
