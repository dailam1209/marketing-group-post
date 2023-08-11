import { Col, Input, Row, Select, Table } from "antd"
import styles from "./DanhSachNhom.module.css"
import { AddButton, SearchButton } from "@/components/commons/Buttons"
import Image from "next/image"
import { AlignType } from "rc-table/lib/interface"
import { useState } from "react"
import { AddNewModal, ConfirmDeleteModal, UpdateNhomModal } from "./modal/modal"
import { MyTable } from "../table/Table"
import { useRouter } from "next/router"
import { MySelect } from "../../quan-ly-cong-ty-con/modal"

export function DanhSachNhom({ listGroups, infoCom, listDepartments, listTeams }: { listGroups: any, infoCom: any, listDepartments: any, listTeams: any}) {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState(false)
  const [openConfirmDel, setOpenConfirmDel] = useState(false)
  const [selectedRow, setSelectedRow] = useState()
  const [openAddNew, setOpenAddNew] = useState(false)
  const [data, setData] = useState(listGroups?.data)
  const [company, setCompany]: any = useState(infoCom?.data)
  const [listDepLabel, setListDepLabel]: any = useState(listDepartments?.data?.map(dep => ({ label: dep?.dep_name, value: dep?.dep_id })))
  const [listTeamLabel, setListTeamLabel]: any = useState(listTeams?.data?.map(team => ({ label: team?.team_name, value: team?.team_id })))

  const columns = [
    {
      title: <p className={styles.headerTxt}>STT</p>,
      render: (_: any, record: any, index: number) => <p>{index + 1}</p>
    },
    {
      title: <p className={styles.headerTxt}>Tên nhóm</p>,
      render: (record: any, index: any) => (
        <p style={{ color: "#4c5bd4" }}>{record?.gr_name}</p>
      )
    },
    {
      title: <p className={styles.headerTxt}>Nhóm trưởng</p>,
      render: (record: any, index: any) => (
        <p>{record?.leader || "Đang cập nhật"}</p>
      )
    },
    {
      title: <p className={styles.headerTxt}>Nhóm phó</p>,
      render: (record: any, index: any) => (
        <p>{record?.subLeader || "Đang cập nhật"}</p>
      )
    },
    {
      title: <p className={styles.headerTxt}>Tổ</p>,
      render: (record: any, index: any) => (
        <p>{record?.team_id || "Đang cập nhật"}</p>
      )
    },
    {
      title: <p className={styles.headerTxt}>Phòng ban</p>,
      render: (record: any, index: any) => (
        <p>{record?.dep_id || "Đang cập nhật"}</p>
      )
    },

    {
      title: <p className={styles.headerTxt}>Số lượng</p>,
      render: (record: any, index: any) => <p>{record?.total || 0}</p>
    },
    {
      title: <p className={styles.headerTxt}>Chức năng</p>,
      render: (record: any, index: any) => (
        <div className={styles.actionGroup}>
          <Image
            alt="/"
            src={"/edit.png"}
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedRow(record)
              setOpenEdit(true)
            }}
          />
          <div className={styles.divider}></div>
          <Image
            alt="/"
            src={"/delete-icon.png"}
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedRow(record)
              setOpenConfirmDel(true)
            }}
          />
        </div>
      )
    }
  ]

  const onRowClicked = (id: string, name: string) => {
    router.push({
      pathname: `${router.pathname}/chi-tiet-nhom/${id}`,
      query: {
        name: name
      }
    })
  }

  return (
    <div>
      <Row gutter={[20, 10]} justify={"end"}>
        <Col lg={10} md={10} sm={12} xs={24}>
          {MySelect("", "Chọn công ty", false, false, "com_id", [{ label: company?.userName, value: company?.idQLC }])}
          {MySelect("", "Chọn tổ", false, false, "team_id", listTeamLabel)}
        </Col>
        <Col lg={11} md={10} sm={12} xs={24}>
          {MySelect("", "Chọn phòng ban", false, false, "dep_id", listDepLabel)}
          {MySelect("", "Chọn tổ", false, false, "group_id", data?.map(gr => ({ label: gr?.gr_name, value: gr?.gr_id })))}
        </Col>
        <Col lg={3} md={4} sm={12} className={styles.groupButton}>
          <div>{SearchButton("Tìm kiếm", () => null, false)}</div>
          <div className={styles.secondButton}>
            {AddButton("Thêm mới", () => setOpenAddNew(true))}
          </div>
        </Col>
      </Row>

      {/* table */}
      <MyTable
        colunms={columns}
        data={data}
        onRowClick={(record, index) =>
          onRowClicked(record?.team_id, record?.gr_name)
        }
        hasRowSelect={false}
        onSelectChange={() => null}
        selectedRowKeys={[]}
        rowKey="name"
        Footer={null}
      />
      {UpdateNhomModal(openEdit, setOpenEdit, data, setData, selectedRow)}
      {ConfirmDeleteModal(
        openConfirmDel,
        setOpenConfirmDel,
        selectedRow ? selectedRow["name"] : "",
        data,
        setData,
        selectedRow
      )}
      {AddNewModal(openAddNew, setOpenAddNew, data, setData)}
    </div>
  )
}
