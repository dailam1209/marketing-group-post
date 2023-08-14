import { MyTable } from "@/components/quan-ly-cong-ty/quan-ly-phong-ban/table/Table"
import { Card, Col, Input, Row } from "antd"
import Image from "next/image"
import { useRouter } from "next/router"
import styles from "./[id].module.css"
import { AddButton } from "@/components/commons/Buttons"
import { useContext, useState } from "react"
import {
  AddEmpGroupModal,
  DeleteEmpFromGroup
} from "@/components/quan-ly-cong-ty/danh-sach-nhom/modal"

const mockData = [
  {
    id: "147310",
    avatar: "/avatar.png",
    name: "Phạm Xuân Nguyên Khôi",
    job: "Nhân Viên Chính Thức",
    groupName: "Nhóm 1",
    date: "16-02-2023"
  },
  {
    id: "147311",
    avatar: "/avatar.png",
    name: "Phạm Xuân Nguyên Khôi",
    job: "Nhân Viên Chính Thức",
    groupName: "Nhóm 1",
    date: "16-02-2023"
  },
  {
    id: "147312",
    avatar: "/avatar.png",
    name: "Phạm Xuân Nguyên Khôi",
    job: "Nhân Viên Chính Thức",
    groupName: "Nhóm 1",
    date: "16-02-2023"
  },
  {
    id: "147313",
    avatar: "/avatar.png",
    name: "Phạm Xuân Nguyên Khôi",
    job: "Nhân Viên Chính Thức",
    groupName: "Nhóm 1",
    date: "16-02-2023"
  },
  {
    id: "147314",
    avatar: "/avatar.png",
    name: "Phạm Xuân Nguyên Khôi",
    job: "Nhân Viên Chính Thức",
    groupName: "Nhóm 1",
    date: "16-02-2023"
  },
  {
    id: "147315",
    avatar: "/avatar.png",
    name: "Phạm Xuân Nguyên Khôi",
    job: "Nhân Viên Chính Thức",
    groupName: "Nhóm 1",
    date: "16-02-2023"
  }
]

export default function ChiTietNhom() {
  const router = useRouter()
  const [openAddState, setOpenAddState] = useState(false)
  const [openDel, setOpenDel] = useState(false)
  const [selectedRow, setSelectedRow] = useState()

  const columns = [
    {
      title: <p className={styles.headertxt}>Ảnh</p>,
      render: (record: any) => (
        <Image alt="/" src={record?.avatar} width={30} height={30} />
      ),
      align: "center"
    },
    {
      title: <p className={styles.headertxt}>ID</p>,
      render: (record: any) => <p>{record?.id}</p>,
      align: "center"
    },
    {
      title: <p className={styles.headertxt}>Họ và tên</p>,
      render: (record: any) => <p>{record?.name}</p>,
      align: "center"
    },
    {
      title: <p className={styles.headertxt}>Chức vụ</p>,
      render: (record: any) => <p>{record?.job}</p>,
      align: "center"
    },
    // {
    //   title: <p className={styles.headertxt}>Nhóm</p>,
    //   render: (record: any) => <p>{record?.groupName}</p>,
    //   align: "center"
    // },
    {
      title: <p className={styles.headertxt}>Ngày bắt đầu</p>,
      render: (record: any) => <p>{record?.date}</p>,
      align: "center"
    },
    {
      title: <p className={styles.headertxt}>Chức năng</p>,
      render: (record: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
          onClick={() => {
            setSelectedRow(record)
            setOpenDel(true)
          }}
        >
          <Image alt="/" src={"/delete-icon.png"} width={25} height={25} />
        </div>
      ),
      align: "center"
    }
  ]

  return (
    <div>
      <Card>
        <Row className={styles.header}>
          <Col md={10} xs={24}>
            <p className={styles.title}>Chi tiết {router.query?.id}</p>
          </Col>
          <Col md={14} xs={24} className={styles.actionGroup}>
            <Input
              className={styles.searchBar}
              size="large"
              placeholder={"Tìm kiếm nhân viên"}
              suffix={
                <Image
                  alt="/"
                  src={"/search-black.png"}
                  width={24}
                  height={24}
                />
              }
            />
            <div className={styles.btn}>
              {AddButton("Thêm mới nhân viên", () => setOpenAddState(true))}
            </div>
          </Col>
        </Row>
        <MyTable
          colunms={columns}
          data={mockData}
          onRowClick={() => null}
          hasRowSelect={false}
          onSelectChange={() => null}
          selectedRowKeys={[]}
          rowKey="id"
          Footer={null}
        />
      </Card>
      <AddEmpGroupModal open={openAddState} setOpen={setOpenAddState} />
      <DeleteEmpFromGroup
        open={openDel}
        setOpen={setOpenDel}
        onConfirm={() => null}
        type="Nhóm"
        groupName={router.query?.name || ""}
        empData={selectedRow}
      />
    </div>
  )
}
