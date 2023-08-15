import { MyTable } from "@/components/quan-ly-cong-ty/quan-ly-phong-ban/table/Table"
import { Card, Col, Input, Row } from "antd"
import Image from "next/image"
import { useRouter } from "next/router"
import styles from "./[id].module.css"
import { useContext, useState } from "react"
import { DeleteEmpFromGroup } from "@/components/quan-ly-cong-ty/danh-sach-nhom/modal"

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
    id: "147310",
    avatar: "/avatar.png",
    name: "Phạm Xuân Nguyên Khôi",
    job: "Nhân Viên Chính Thức",
    groupName: "Nhóm 1",
    date: "16-02-2023"
  },
  {
    id: "147310",
    avatar: "/avatar.png",
    name: "Phạm Xuân Nguyên Khôi",
    job: "Nhân Viên Chính Thức",
    groupName: "Nhóm 1",
    date: "16-02-2023"
  },
  {
    id: "147310",
    avatar: "/avatar.png",
    name: "Phạm Xuân Nguyên Khôi",
    job: "Nhân Viên Chính Thức",
    groupName: "Nhóm 1",
    date: "16-02-2023"
  },
  {
    id: "147310",
    avatar: "/avatar.png",
    name: "Phạm Xuân Nguyên Khôi",
    job: "Nhân Viên Chính Thức",
    groupName: "Nhóm 1",
    date: "16-02-2023"
  },
  {
    id: "147310",
    avatar: "/avatar.png",
    name: "Phạm Xuân Nguyên Khôi",
    job: "Nhân Viên Chính Thức",
    groupName: "Nhóm 1",
    date: "16-02-2023"
  }
]

export default function ChiTietTo() {
  const router = useRouter()
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
    {
      title: <p className={styles.headertxt}>Nhóm</p>,
      render: (record: any) => <p>{record?.groupName}</p>,
      align: "center"
    },
    {
      title: <p className={styles.headertxt}>Ngày bắt đầu</p>,
      render: (record: any) => <p>{record?.date}</p>,
      align: "center"
    },
    {
      title: <p className={styles.headertxt}>Chức năng</p>,
      render: (record: any) => (
        <div
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
        <Row>
          <Col sm={12} xs={24}>
            <p className={styles.title}>Chi tiết tổ {router.query?.name}</p>
          </Col>

          <Col sm={12} xs={24}>
            <Input
              placeholder={"Tìm kiếm nhân viên"}
              size="large"
              suffix={
                <Image
                  alt="/"
                  src={"/search-black.png"}
                  width={24}
                  height={24}
                />
              }
            />
          </Col>
        </Row>

        <MyTable
          colunms={columns}
          data={mockData}
          onRowClick={() => null}
          Footer={null}
          hasRowSelect={false}
          onSelectChange={() => null}
          rowKey="name"
          selectedRowKeys={null}
        />
      </Card>
      <DeleteEmpFromGroup
        open={openDel}
        setOpen={setOpenDel}
        empData={selectedRow}
        groupName={router?.query?.name}
        onConfirm={() => null}
        type="Tổ"
      />
    </div>
  )
}
