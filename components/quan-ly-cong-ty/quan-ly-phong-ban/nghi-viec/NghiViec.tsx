import { Col, Row, Select, Input } from "antd"
import styles from "./NghiViec.module.css"
import {
  AddButton,
  ExportExcelButton,
  SearchButton
} from "@/components/commons/Buttons"
import Image from "next/image"
import { useEffect, useState } from "react"
import {
  AddNewModal,
  ConfirmDeleteModal,
  UpdatePhongBanModal
} from "./modal/modal"
import { MyTable } from "../table/Table"
import { MyInput, MySelect } from "../../quan-ly-cong-ty-con/modal"
import { POST } from "@/pages/api/BaseApi"

// const mockdata = [
//   {
//     id: "12345",
//     name: "Uy Phùng Hiếu",
//     apartment: "Kỹ thuật",
//     job: "Nhân Viên chính thức",
//     date: "22-05-2023"
//   },
//   {
//     id: "12345",
//     name: "Uy Phùng Hiếu",
//     apartment: "Kỹ thuật",
//     job: "Nhân Viên chính thức",
//     date: "22-05-2023"
//   },
//   {
//     id: "12345",
//     name: "Uy Phùng Hiếu",
//     apartment: "Kỹ thuật",
//     job: "Nhân Viên chính thức",
//     date: "22-05-2023"
//   },
//   {
//     id: "12345",
//     name: "Uy Phùng Hiếu",
//     apartment: "Kỹ thuật",
//     job: "Nhân Viên chính thức",
//     date: "22-05-2023"
//   },
//   {
//     id: "12345",
//     name: "Uy Phùng Hiếu",
//     apartment: "Kỹ thuật",
//     job: "Nhân Viên chính thức",
//     date: "22-05-2023"
//   }
// ]

export function NghiViec({ listQuitJobNew, listDepartments }) {
  const [openEdit, setOpenEdit] = useState(false)
  const [openConfirmDel, setOpenConfirmDel] = useState(false)
  const [selectedRow, setSelectedRow] = useState()
  const [openAddNew, setOpenAddNew] = useState(false)
  const [data, setData] = useState(listQuitJobNew?.data)
  const [listEmp, setListEmp] = useState([])
  const [listDepLabel, setListDepLabel]: any = useState(listDepartments?.data?.map(dep => ({ label: dep?.dep_name, value: dep?.dep_id })))

  useEffect(() => {
    POST('api/qlc/managerUser/list', {
      com_id: 1763
    })
      .then(res => {
        if (res?.result === true) {
          setListEmp(res?.data)
        }
      })
  }, [])

  const columns = [
    {
      title: <p className={styles.headerTxt}>ID Nhân viên</p>,
      render: (_: any, record: any, index: number) => <p>{record?.ep_id}</p>
    },
    {
      title: <p className={styles.headerTxt}>Họ và tên</p>,
      render: (record: any, index: any) => <p>{record?.ep_name}</p>
    },
    {
      title: <p className={styles.headerTxt}>Phòng ban</p>,
      render: (record: any, index: any) => <p>{record?.dep_name}</p>
    },
    {
      title: <p className={styles.headerTxt}>Chức vụ</p>,
      render: (record: any, index: any) => <p>{record?.position_name}</p>
    },
    {
      title: <p className={styles.headerTxt}>Ngày bắt đầu nghỉ</p>,
      render: (record: any, index: any) => <p>{record?.time?.substring(0,10)}</p>
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

  return (
    <div>
      {/* <Row gutter={20}>
        <Col span={10}>{MySelect("", "Chọn phòng ban", false, false)}</Col>
        <Col span={10}>{MyInput("", "Chọn phòng ban", false, false, "")}</Col>
        <Col span={4} style={{ display: "flex", justifyContent: "flex-end" }}>
          {" "}
          {SearchButton("Tìm kiếm", () => null, false)}
        </Col>
        <Col span={10}>{MySelect("", "Chọn ngày", false, false)}</Col>
        <Col span={8}></Col>
        <Col span={6} style={{ display: "flex", justifyContent: "flex-end" }}>
          {AddButton("Thêm mới nghỉ việc", () => setOpenAddNew(true))}
        </Col>
      </Row> */}
      <Row gutter={{lg:20,md:25,sm:20,xs:20}}>
        <Col lg={{span:10,order:1}} md={{span:10,order:1}} sm={12} xs={24}>
          <div>{MySelect("", "Chọn phòng ban", false, false, "dep_id", listDepLabel)}</div>
        </Col>
        <Col lg={{span:11,order:1}} md={{span:10,order:2}} sm={12} xs={24}>
          <div>{MySelect("tenNV", "Nhập tên nhân viên", false, false, "ep_id",data?.map(emp => ({ label: emp?.ep_name , value: emp?.ep_id })))}</div>
        </Col>
        <Col lg={{span:3,order:1}} md={{span:4,order:3}} sm={{span:6,order:2}} xs={{span:11,order:1}} className={`${styles.button} ${styles.buttonLeft}`}>
          <div>{SearchButton("Tìm kiếm", () => null, false)}</div>
        </Col>
        <Col lg={{span:10,order:1}} md={{span:10,order:4}} sm={{span:10,order:1}} xs={24} >
          <Input className={styles.input} type="date" placeholder="Chọn ngày" size="large"></Input>
        </Col>
        <Col lg={{span:14,order:1}} md={{span:14,order:5}} sm={{span:7,order:3}} xs={{span:13,order:2}} className={`${styles.button} ${styles.buttonRight}`}>
          <div>{AddButton("Thêm mới nghỉ việc", () => setOpenAddNew(true))}</div>
        </Col>
      </Row>
      {/* table */}
      <MyTable
        colunms={columns}
        data={data}
        onRowClick={() => null}
        Footer={null}
        hasRowSelect={false}
        onSelectChange={() => null}
        rowKey="name"
        selectedRowKeys={null}
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
      {AddNewModal(openAddNew, setOpenAddNew, setData, listEmp, setListEmp)}
    </div>
  )
}
