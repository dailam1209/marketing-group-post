import { Col, Popover, Row } from "antd"
import { MyTable } from "../../quan-ly-phong-ban/table/Table"
import { MySeachBar, MySelect } from "../../quan-ly-cong-ty-con/modal"
import styles from "./AllNhanVien.module.css"
import { useEffect, useState } from "react"
import Image from "next/image"
import { DeleteEmpModal, EditEmpModal, SetRoleModal } from "../modal/modal"
import { useRouter } from "next/router"
import { AddButton } from "@/components/commons/Buttons"
import { EDIT_ICON, KEY_ICON, TRASH_ICON } from "./icons"

export function AllNhanVien({
  listStaffs,
  openAddNew,
  setOpenAddNew,
  infoCom,
  listDepLabel,
  listTeamLabel,
  listGrLabel
}: {
  listStaffs: any
  openAddNew?: any
  setOpenAddNew?: Function,
  infoCom: any,
  listDepLabel: any,
  listTeamLabel: any,
  listGrLabel: any
}) {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState(false)
  const [openSetRole, setOpenSetRole] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [currentRow, setCurrentRow] = useState()
  const [data, setData] = useState(listStaffs)
  const [comLabel, setComLabel]: any = useState({ label: infoCom?.data?.userName, value: infoCom?.data?.idQLC })

  

  useEffect(() => {
    setData(listStaffs)
  }, [listStaffs])

  const CustomPopover = () => {
    const SingleItem = ({
      title,
      icon,
      onClick,
      isBlue
    }: {
      title: string
      icon: any
      onClick: (event: any) => void
      isBlue: boolean
    }) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          marginTop: "10px"
        }}
        onClick={(event) => onClick(event)}
      >
        {icon}
        <p
          style={{ marginLeft: "10px", color: isBlue ? "#4C5BD4" : "#FF5B4D" }}
        >
          {title}
        </p>
      </div>
    )

    return (
      <div style={{ padding: "5px 15px" }}>
        <SingleItem
          icon={<EDIT_ICON />}
          title="Chỉnh sửa thông tin tài khoản"
          onClick={(event) => {
            event.stopPropagation()

            setOpenEdit(true)
          }}
          isBlue={true}
        />
        <SingleItem
          icon={<KEY_ICON />}
          title="Phân quyền"
          onClick={(event) => {
            event.stopPropagation()
            setOpenSetRole(true)
          }}
          isBlue={true}
        />
        <SingleItem
          icon={<TRASH_ICON />}
          title="Xóa thành viên"
          onClick={(event) => {
            event.stopPropagation()
            setOpenDelete(true)
          }}
          isBlue={false}
        />
      </div>
    )
  }

  const columns = [
    {
      title: <p className="tableHeader">ID</p>,
      render: (record: any, index: number) => <p>{record?.idQLC}</p>
    },
    {
      title: <p className="tableHeader">Họ và tên</p>,
      render: (record: any) => (
        <p style={{ color: "#4C5BD4" }}>
          {record?.userName || "Chưa cập nhật"}
        </p>
      )
    },
    {
      title: <p className="tableHeader">SĐT</p>,
      render: (record: any) => <p>{record?.phoneTK || "Chưa cập nhật"}</p>
    },
    {
      title: <p className="tableHeader">Tài khoản đăng nhập</p>,
      render: (record: any) => <p>{record?.phoneTK}</p>
    },
    {
      title: <p className="tableHeader">Email</p>,
      render: (record: any) => <p>{record?.emailContact || record?.email}</p>
    },
    {
      title: <p className="tableHeader">Phòng ban</p>,
      render: (record: any) => <p>{record?.nameDeparment || "Chưa cập nhật"}</p>
    },
    {
      title: <p className="tableHeader">Chức vụ</p>,
      render: (record: any) => <p>{record?.position_id || "Chưa cập nhật"}</p>
    },
    {
      title: <p className="tableHeader">Tùy chỉnh</p>,
      render: (record: any) => (
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <Popover
            content={<CustomPopover />}
            onOpenChange={(e) => {
              setCurrentRow(record)
            }}
            trigger={["click", "hover"]}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image alt="/" src={"/3dots.png"} width={3} height={15} />
              <p style={{ marginLeft: "5px", color: "#4C5BD4" }}>Tùy chỉnh</p>
            </div>
          </Popover>
        </div>
      )
    }
  ]

  const onRowClicked = (id: any) => {
    router.push(`${router.pathname}/chi-tiet-nhan-vien/${id}`)
  }

  return (
    <div>
      <div>
        <Row gutter={{ xs: 20, sm: 20 }}>
          <Col md={8} sm={12} xs={24}>
            {MySelect("Công ty", "Chọn công ty", false, false, "com_id", [
              comLabel
            ])}
          </Col>
          <Col md={8} sm={12} xs={24}>
            <MySeachBar
              placeholder="Nhập tên phòng ban"
              hasPrefix={false}
              name="dep_name"
            />
          </Col>

          <Col md={8} sm={12} xs={24} className={styles.nameInput}>
            <MySeachBar
              placeholder="Nhập tên cần tìm"
              hasPrefix={false}
              name=""
            />
          </Col>
          <Col md={0} sm={12} xs={24} className={styles.btnAdd}>
            {AddButton(
              "Thêm mới nhân viên",
              () => setOpenAddNew && setOpenAddNew(!openAddNew)
            )}
          </Col>
        </Row>
      </div>
      <div>
        <MyTable
          colunms={columns}
          data={data}
          onRowClick={(record, index) => onRowClicked(record?._id)}
          hasRowSelect={false}
          onSelectChange={() => null}
          selectedRowKeys={[]}
          rowKey="id"
          Footer={null}
        />
      </div>
      {EditEmpModal(openEdit, setOpenEdit, { label: infoCom?.data?.userName, value: infoCom?.data?.idQLC } ,listDepLabel, listTeamLabel, listGrLabel, data, setData, currentRow, )}
      {SetRoleModal(openSetRole, setOpenSetRole)}
      {DeleteEmpModal(
        openDelete,
        setOpenDelete,
        currentRow ? currentRow["name"] : "",
        currentRow
      )}
    </div>
  )
}
