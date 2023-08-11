import { Table, Form, Button, Select, Row, Col } from 'antd'
import styles from './danh-sach-nghi-sai-quy-dinh.module.css'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import moment from 'moment'
import { filterUnique } from '../../nhap-luong-co-ban/nhap-luong-co-ban'
import _, { filter } from 'lodash'
import { POST_TL } from '@/pages/api/BaseApi'

const TableDanhSachNghiSaiQD = ({ data }: { data: any }) => {
  const columns: any = [
    {
      title: 'Họ và Tên (ID)',
      align: 'center',
      render: (record: any) => (
        <div className={styles.name}>
          <Image
            src={`/${record?.detail?.avatarUser}`}
            alt=''
            width={46}
            height={46}
          />
          <div className={styles.nameRight}>
            <p style={{ color: '#4c5bd4' }}>{record?.detail?.userName}</p>
            <p>{record?.detail?.idQLC}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Phòng ban',
      align: 'center',
      render: (record: any) => (
        <div>{record?.detail?.inForPerson?.employee?.dep_id}</div>
      ),
    },
    {
      title: 'Thời gian áp dụng',
      align: 'center',
      render: (record: any) => (
        <div>{record?.time && moment(record?.time)?.format('DD-MM-YYYY')}</div>
      ),
    },
    {
      title: 'Ca',
      align: 'center',
      render: (record: any) => <div>{record?.shift_id}</div>,
    },
    {
      title: 'Phạt',
      align: 'center',
      render: (record: any) => (
        <div style={{ color: '#FF5B4D' }}>
          {record?.money?.pc_money || 0} VNĐ
        </div>
      ),
    },
  ]
  return (
    <Table
      className={`green-table-bodyBorder ${styles.table}`}
      dataSource={data}
      columns={columns}
      pagination={{ position: ['bottomCenter'] }}
      scroll={{ x: 'max-content' }}></Table>
  )
}

export function CpmDanhSachNghiSaiQuyDinh({
  listEmpAbsent,
}: {
  listEmpAbsent: any[]
}) {
  const formattedData: any[] = []
  listEmpAbsent &&
    listEmpAbsent.forEach((item) => {
      item?.data_ko_cc_final &&
        item?.data_ko_cc_final?.forEach((d) => {
          formattedData.push(d)
        })
    })

  const [listData, setListData] = useState(formattedData)
  const [filterParam, setFilterParam] = useState<any>({})

  useEffect(() => {
    const getData = async () => {
      const thisMonthDays = moment(
        `${filterParam?.year}/${filterParam?.month}`,
        'YYYY/MM'
      )?.daysInMonth()

      const res = await POST_TL(
        'api/tinhluong/congty/take_listuser_nghi_khong_phep',
        {
          start_date: `${filterParam?.year || moment().year()}-${
            filterParam?.month || moment().month()
          }-01`,
          end_date: `${filterParam?.year || moment().year()}-${
            filterParam?.month || moment().month()
          }-${thisMonthDays}`,
          com_id: 3312,
          skip: 0,
          ...filterParam,
        }
      )

      if (res) {
        const temp: any[] = []

        res?.['data'] &&
          res?.['data']?.forEach((item) => {
            item?.data_ko_cc_final &&
              item?.data_ko_cc_final?.forEach((d) => {
                temp.push(d)
              })
          })
        setListData(temp)
      }
    }

    if (!_.isEmpty(filterParam)) {
      getData()
    }
  }, [filterParam])

  const [form] = Form.useForm()

  const onFinish = (value) => {
    if (value) {
      setFilterParam({
        month: value?.month,
        year: value?.year,
      })
    }
  }

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={20} className={styles.rowFirst}>
          <Col lg={21} md={21} sm={24} xs={24}>
            <Row gutter={[20, { sm: 10, xs: 10 }]}>
              <Col lg={6} md={7} sm={12} xs={24} className={styles.selects}>
                <Form.Item name={'room'}>
                  <Select
                    size='large'
                    placeholder='Chọn phòng ban'
                    suffixIcon={<img src='/search-black.png'></img>}
                    options={filterUnique(
                      listData &&
                        listData?.map((item) => ({
                          value: item?.detail?.inForPerson?.employee?.dep_id,
                          label: item?.detail?.inForPerson?.employee?.dep_id,
                        })),
                      'value'
                    )}></Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={7} sm={12} xs={24} className={styles.selects}>
                <Form.Item name={'employee'}>
                  <Select
                    size='large'
                    placeholder='Chọn nhân viên'
                    suffixIcon={<img src='/search-black.png'></img>}
                    options={filterUnique(
                      listData &&
                        listData?.map((item) => ({
                          value: item?.detail?.idQLC,
                          label: item?.detail?.userName,
                        })),
                      'value'
                    )}></Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={5} sm={10} xs={24} className={styles.selects}>
                <Form.Item name={'year'}>
                  <Select
                    size='large'
                    placeholder='Chọn năm'
                    suffixIcon={<img src='/search-black.png'></img>}
                    options={_.range(2022, moment().year() + 1).map((y) => ({
                      value: y,
                      label: `Năm ${y}`,
                    }))}></Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={5} sm={10} xs={24} className={styles.selects}>
                <Form.Item name={'month'}>
                  <Select
                    size='large'
                    placeholder='Chọn tháng'
                    suffixIcon={<img src='/search-black.png'></img>}
                    options={_.range(12).map((i) => ({
                      value: i + 1,
                      label: `Tháng ${i + 1}`,
                    }))}></Select>
                </Form.Item>
              </Col>
              <Col
                lg={3}
                md={3}
                sm={4}
                xs={9}
                className={`${styles.selects} ${styles.thongKe1}`}>
                <Form.Item>
                  <Button htmlType='submit' size='large'>
                    Thống kê
                  </Button>
                </Form.Item>
              </Col>
              <Col
                lg={19}
                md={18}
                sm={15}
                xs={15}
                className={`${styles.button} ${styles.button1}`}>
                <Button size='large'>
                  <Image
                    src='/excel-icon-white.png'
                    width={24}
                    height={24}
                    alt=''
                    style={{ marginRight: '10px' }}></Image>
                  Xuất file thống kê
                </Button>
              </Col>
            </Row>
          </Col>
          <Col
            lg={3}
            md={3}
            sm={4}
            xs={10}
            className={`${styles.selects} ${styles.thongKe2}`}>
            <Form.Item>
              <Button htmlType='submit' size='large'>
                Thống kê
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.rowSecond}>
          <Col lg={7} md={9} sm={11} className={styles.text}>
            <div className={styles.textTop}>
              Danh sách nhân viên nghỉ sai quy định
            </div>
            <div className={styles.textBottom}>
              Quản lý nhân viên nghỉ sai quy định
            </div>
          </Col>
          <Col
            lg={17}
            md={15}
            sm={13}
            className={`${styles.button} ${styles.button2}`}>
            <Button size='large'>
              <Image
                src='/excel-icon-white.png'
                width={24}
                height={24}
                alt=''
                style={{ marginRight: '10px' }}></Image>
              Xuất file thống kê
            </Button>
          </Col>
        </Row>
      </Form>
      <div>
        <TableDanhSachNghiSaiQD data={listData} />
      </div>
    </div>
  )
}
