import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Table
} from "antd"
import Image from "next/image"
import { ReactNode, useEffect, useState } from "react"
import styles from "./cong-cong.module.css"
import { CheckboxChangeEvent } from "antd/es/checkbox"
import { ConfirmModalChecked, ConfirmModalDelete, OkModal } from "./modal/modal"
import { SearchOutlined } from "@ant-design/icons"
import moment from "moment"
import _ from "lodash"

function MyTable({
  columns,
  data,
  onRowClick,
  hasRowSelect,
  selectedRowKeys,
  setSelectedRowKeys,
  rowKey,
  Footer,
  onChangeAll,
  checkAll,
  setCheckAll,
  setSelectedRow,
  setIsOpenCheckedModal,
  setIsCheckedRow
}: {
  columns: any
  data: any
  onRowClick: (record: any, index: number | undefined) => void
  hasRowSelect: boolean
  selectedRowKeys: any
  setSelectedRowKeys: Function
  rowKey: string
  Footer: ReactNode
  onChangeAll?: any
  checkAll?: any
  setCheckAll: Function
  setSelectedRow: Function
  setIsOpenCheckedModal: Function
  setIsCheckedRow: Function
}) {
  return (
    <Table
      style={{ marginTop: "30px" }}
      columns={columns}
      dataSource={data}
      className={`green-table ${styles.table} cusScrollTable`}
      rowClassName={styles.row}
      rowKey={rowKey}
      pagination={{ position: ["bottomCenter"] }}
      scroll={{ x: "max-content" }}
      rowSelection={
        hasRowSelect
          ? {
              selectedRowKeys,
              onChange: (newRowKeys: any) => {
                setSelectedRowKeys(newRowKeys)
                if (selectedRowKeys?.length === data.length) {
                  setCheckAll(true)
                } else {
                  setCheckAll(false)
                }
              },
              columnWidth: "60px",
              columnTitle: (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <p style={{ color: "#fff", whiteSpace: "nowrap" }}>
                    Cộng công
                  </p>
                  <Checkbox
                    onChange={onChangeAll}
                    checked={checkAll}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
              ),
              onSelect: (record: any, selected: boolean) => {
                setSelectedRow(record)
                if (selected) {
                  setIsOpenCheckedModal(true)
                  setIsCheckedRow(true)
                } else {
                  setIsOpenCheckedModal(false)
                  setIsCheckedRow(false)
                }
              }
            }
          : undefined
      }
      onRow={(record, index) => {
        return {
          onClick: () => onRowClick(record, index)
        }
      }}
      footer={() => Footer}
    />
  )
}

export const MySearchBar = ({
  placeholder,
  name,
  hasPrefix,
  className
}: {
  placeholder: string
  name: string
  hasPrefix: boolean
  className?: string
}) => (
  <Form.Item className={className}>
    <Input
      placeholder={placeholder}
      suffix={
        !hasPrefix && (
          <Image alt="/" src={"/search-black.png"} width={24} height={24} />
        )
      }
      prefix={
        hasPrefix && (
          <Image
            style={{ marginRight: "10px" }}
            alt="/"
            src={"/search-black.png"}
            width={24}
            height={24}
          />
        )
      }
      style={{ width: "100%" }}
      size="large"
    />
  </Form.Item>
)

export const CongCong = ({ mockdata, listPb }) => {
  const [prevSelectedRowKeys, setPrevSelectedRowKeys] = useState<number[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
  const [checkAll, setCheckAll] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenCheckedModal, setIsOpenCheckedModal] = useState(false)
  const [isOpenOkModal, setIsOpenOkModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState({})
  const [isCheckedRow, setIsCheckedRow] = useState(false)
  const [checkedRow, setCheckedRow] = useState({})
  const [data, setData] = useState(mockdata)
  const [selectDataConfig, setSelectDataConfig] = useState(
    mockdata?.reduce((sum, emp) => {
      return [
        ...sum,
        {
          label: `(${emp?.user?._id}) ${emp?.user?.userName}`,
          value: emp?.user?._id
        }
      ]
    }, [])
  )
  const [form] = Form.useForm()

  useEffect(() => {
    const temp: any[] = []
    mockdata?.forEach((item: any) => {
      if (item?.infoDx?.active !== 0) {
        temp.push(item?._id)
      }
    })
    setSelectedRowKeys(temp)
  }, [])

  const columns = [
    {
      title: <p className={styles.tableHeaderTxt}>STT</p>,
      render: (_: any, record: any, index: number) => <p>{index + 1}</p>,
      key: "index"
    },
    {
      title: <p className={styles.tableHeaderTxt}>ID</p>,
      render: (record: any) => <p>{record?.user?._id}</p>,
      key: "_id"
    },
    {
      title: <p className={styles.tableHeaderTxt}>Họ và tên</p>,
      render: (record: any) => <p>{record?.user?.userName}</p>,
      key: "name"
    },
    {
      title: <p className={styles.tableHeaderTxt}>Phòng ban</p>,
      render: (record: any) => (
        <p>
          {(record?.user?.inForPerson?.employee?.dep_id &&
            !_.isEmpty(listPb) &&
            listPb?.find(
              (item) =>
                item?.dep_id === record?.user?.inForPerson?.employee?.dep_id
            )?.dep_name) ||
            "Chưa cập nhật"}
        </p>
      ),
      key: "dep_id"
    },
    {
      title: <p className={styles.tableHeaderTxt}>Chức vụ</p>,
      render: (record: any) => (
        <p>{record?.user?.inForPerson?.employee?.position_id}</p>
      ),
      key: "position_id"
    },
    {
      title: <p className={styles.tableHeaderTxt}>Ca ghi nhận công</p>,
      render: (record: any) => (
        <p>{record?.infoDx?.noi_dung?.xac_nhan_cong?.ca_xnc}</p>
      ),
      key: "shift_id"
    },
    {
      title: <p className={styles.tableHeaderTxt}>Thời gian ghi nhận công</p>,
      render: (record: any) => <p></p>,
      key: "accept_time"
    },
    {
      title: <p className={styles.tableHeaderTxt}>Ngày ghi nhận</p>,
      render: (record: any) => (
        <p>
          {record?.infoDx?.noi_dung?.xac_nhan_cong?.time_xnc &&
            moment(record?.infoDx?.noi_dung?.xac_nhan_cong?.time_xnc)?.format(
              "DD-MM-YYYY"
            )}
        </p>
      ),
      key: "accept_date"
    },
    {
      title: <p className={styles.tableHeaderTxt}>Người xét duyệt</p>,
      render: (record: any) => <p>{record?.infoDx?.id_user_duyet}</p>,
      key: "reviewer_id"
    },
    {
      title: <p className={styles.tableHeaderTxt}>Ghi chú</p>,
      render: (record: any) => (
        <p>{record?.infoDx?.noi_dung?.xac_nhan_cong?.ly_do}</p>
      ),
      key: "note"
    },
    Table.SELECTION_COLUMN,
    {
      title: <p className={styles.tableHeaderTxt}>Xóa</p>,
      render: (record: any) => {
        let api = "api/qlc/settingSalary/addWorkingDay/delete/"
        api += record?._id
        return (
          <Image
            src={"/trash-2.svg"}
            alt=""
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpenDeleteModal(true)}
          ></Image>
        )
      },
      key: "action"
    }
  ]

  const onChangeMonth = (value: string) => {}

  const onSearchMonth = (value: string) => {}

  const onChangeYear = (value: string) => {}

  const onSearchYear = (value: string) => {}

  const onChangeEmp = (value: string) => {}

  const onSearchEmp = (value: string) => {}

  useEffect(() => {
    setCheckAll(selectedRowKeys?.length === mockdata.length)
  }, [selectedRowKeys])

  const onChangeAll = (e: CheckboxChangeEvent) => {
    const allIds = mockdata.map((item) => item?._id)
    setPrevSelectedRowKeys(selectedRowKeys)
    if (selectedRowKeys?.length === mockdata.length) {
      setSelectedRowKeys([])
    } else {
      setSelectedRowKeys(allIds)
      setIsOpenCheckedModal(true)
    }
  }

  const hanldeSubmit = () => {
    // console.log("Thống Kê!!!")
  }

  return (
    <div>
      <Card className={`${styles.customCard} noPaddingTable`}>
        <div className={styles.topSection}>
          <p className={styles.headerText}>
            Danh sách nhân viên ghi nhận cộng công
          </p>
        </div>
        <Form form={form} onFinish={hanldeSubmit}>
          <Row gutter={[15, 0]} className={styles.searchNav}>
            <Col
              xxl={4}
              xl={6}
              lg={5}
              md={5}
              sm={4}
              xs={24}
              className={styles.cusSearch}
            >
              <Form.Item>
                <Select
                  showSearch
                  suffixIcon={<SearchOutlined rev={undefined} />}
                  placeholder="Nhập tháng"
                  optionFilterProp="month"
                  onChange={onChangeMonth}
                  onSearch={onSearchMonth}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: 1,
                      label: "Tháng 1"
                    },
                    {
                      value: 2,
                      label: "Tháng 2"
                    },
                    {
                      value: 3,
                      label: "Tháng 3"
                    },
                    {
                      value: 4,
                      label: "Tháng 4"
                    },
                    {
                      value: 5,
                      label: "Tháng 5"
                    },
                    {
                      value: 6,
                      label: "Tháng 6"
                    },
                    {
                      value: 7,
                      label: "Tháng 7"
                    },
                    {
                      value: 8,
                      label: "Tháng 8"
                    },
                    {
                      value: 9,
                      label: "Tháng 9"
                    },
                    {
                      value: 10,
                      label: "Tháng 10"
                    },
                    {
                      value: 11,
                      label: "Tháng 11"
                    },
                    {
                      value: 12,
                      label: "Tháng 12"
                    }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col
              xxl={4}
              xl={6}
              lg={5}
              md={5}
              sm={4}
              xs={24}
              className={styles.cusSearch}
            >
              <Form.Item>
                <Select
                  suffixIcon={<SearchOutlined rev={undefined} />}
                  showSearch
                  placeholder="Nhập năm"
                  optionFilterProp="year"
                  onChange={onChangeYear}
                  onSearch={onSearchYear}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: 2022,
                      label: "Năm 2022"
                    },
                    {
                      value: 2023,
                      label: "Năm 2023"
                    },
                    {
                      value: 2024,
                      label: "Năm 2024"
                    }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col
              xxl={6}
              xl={8}
              lg={10}
              md={10}
              sm={12}
              xs={24}
              className={styles.cusSearch}
            >
              <Form.Item>
                <Select
                  suffixIcon={<SearchOutlined rev={undefined} />}
                  showSearch
                  placeholder="Nhập tên tìm kiếm"
                  optionFilterProp="name"
                  onChange={onChangeEmp}
                  onSearch={onSearchEmp}
                  filterOption={(input, option) =>
                    (`${option?.label}` || "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={selectDataConfig}
                />
              </Form.Item>
            </Col>
            <Col
              xxl={3}
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={10}
              className={`${styles.btnCus}`}
            >
              <Form.Item>
                <Button className={styles.btn} htmlType="submit" id="submit">
                  <p className={styles.btnText}>Thống kê</p>
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* table */}
        <MyTable
          columns={columns}
          data={data}
          onRowClick={(record, index) => setSelectedRow(record)}
          hasRowSelect={true}
          Footer={null}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          rowKey={"_id"}
          onChangeAll={onChangeAll}
          checkAll={checkAll}
          setCheckAll={setCheckAll}
          setSelectedRow={setCheckedRow}
          setIsCheckedRow={setIsCheckedRow}
          setIsOpenCheckedModal={setIsOpenCheckedModal}
        />
      </Card>
      {ConfirmModalDelete({
        open: isOpenDeleteModal,
        setOpen: setIsOpenDeleteModal,
        selectedRow
      })}
      {ConfirmModalChecked({
        open: isOpenCheckedModal,
        setOpen: setIsOpenCheckedModal,
        checkedAll: checkAll,
        checkedRow,
        isCheckedRow,
        selectedKeys: selectedRowKeys,
        setSelectedKeys: setSelectedRowKeys,
        prevSelectedRowKeys,
        setIsOpenOkModal
      })}
      {OkModal({
        open: isOpenOkModal,
        setOpen: setIsOpenOkModal,
        checkedAll: checkAll,
        checkedRow,
        isCheckedRow
      })}
    </div>
  )
}
