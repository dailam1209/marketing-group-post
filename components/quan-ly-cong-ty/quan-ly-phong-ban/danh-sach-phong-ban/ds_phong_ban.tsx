import { Col, ConfigProvider, Row, Select, Table } from "antd"
import styles from "./ds_phong_ban.module.css"
import { AddButton, SearchButton } from "@/components/commons/Buttons"
import Image from "next/image"
import { AlignType } from "rc-table/lib/interface"
import { useState } from "react"
import {
  AddNewModal,
  ConfirmDeleteModal,
  UpdatePhongBanModal
} from "./modal/modal"
import { MyTable } from "../table/Table"
import { useRouter } from "next/router"

export function DanhSachPhongBan({
  listDepartments,
  infoCom
}: {
  listDepartments: any,
  infoCom: any
}) {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState(false)
  const [openConfirmDel, setOpenConfirmDel] = useState(false)
  const [selectedRow, setSelectedRow] = useState({})
  const [openAddNew, setOpenAddNew] = useState(false)
  const [data, setData] = useState(listDepartments?.data)
  const [company, setCompany] = useState(infoCom?.data)
  const [listDepLabel, setListDepLabel]: any[] = useState(listDepartments?.data?.map(dep => ({ label: dep?.dep_name, value: dep?.dep_id })))
  // console.log(company)
  const columns = [
    {
      title: <p className={styles.headerTxt}>STT</p>,
      render: (_: any, record: any, index: number) => <p>{index + 1}</p>
    },
    {
      title: <p className={styles.headerTxt}>Tên phòng ban</p>,
      render: (record: any) => (
        <p style={{ color: "#4c5bd4" }}>{record?.dep_name}</p>
      )
    },
    {
      title: <p className={styles.headerTxt}>Trưởng phòng</p>,
      render: (record: any) => <p>{record?.manager || "Đang cập nhật"}</p>
    },
    {
      title: <p className={styles.headerTxt}>Phó phòng</p>,
      render: (record: any) => <p>{record?.deputy || "Đang cập nhật"}</p>
    },
    // can not access undefined properties
    // {
    //   title: <p className={styles.headerTxt}>Phó phòng</p>,
    //   render: (record: any) => <p>{record?.subLeader || "Đang cập nhật"}</p>
    // },
    {
      title: <p className={styles.headerTxt}>Số lượng nhân viên</p>,
      render: (record: any) => <p>{record?.total_emp || 0}</p>
    },
    {
      title: <p className={styles.headerTxt}>Chức năng</p>,
      render: (record: any) => (
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
      pathname: `${router.pathname}/chi-tiet-phong-ban/${id}`,
      query: {
        name: name
      }
    })
  }

  return (
    <div>
      <Row gutter={[15, 0]}>
        <Col lg={9} md={10} sm={12} xs={24}>
          <Select
            size="large"
            suffixIcon={<img src="/down-icon.png"></img>}
            style={{ width: "100%" }}
            placeholder="Chọn công ty"
            options={[
              {
                label: company?.userName,
                value: company?.idQLC
              }
            ]}
          />
        </Col>
        <Col lg={9} md={10} sm={12} xs={24} className={styles.selectPb}>
          <Select
            size="large"
            suffixIcon={<img src="/down-icon.png"></img>}
            style={{ width: "100%" }}
            placeholder="Chọn phòng ban"
            options={listDepLabel}
          />
        </Col>
        <Col lg={6} md={4} sm={0} className={styles.btnGroup}>
          <div className={styles.searchBtn}>
            {SearchButton("Tìm kiếm", () => null, false)}
          </div>
          <div className={styles.addBtn}>
            {AddButton("Thêm mới", () => setOpenAddNew(true))}
          </div>
        </Col>
      </Row>
      {/* table */}
      <MyTable
        colunms={columns}
        data={data}
        onRowClick={(record, index) =>
          onRowClicked(record?.dep_id, record?.dep_name)
        }
        hasRowSelect={false}
        Footer={null}
        onSelectChange={() => null}
        selectedRowKeys={null}
        rowKey={"name"}
      />
      {UpdatePhongBanModal(openEdit, setOpenEdit, data, setData, selectedRow)}
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
