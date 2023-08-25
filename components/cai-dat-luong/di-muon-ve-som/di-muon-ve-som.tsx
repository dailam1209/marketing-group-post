import { Row, Col, Select, Button, Table, Form } from 'antd'
import Image from 'next/image'
import styles from './di-muon-ve-som-cpn.module.css'
import moment from 'moment'
import { filterUnique } from '../nhap-luong-co-ban/nhap-luong-co-ban'
import _, { filter } from 'lodash'
import { useState, useEffect, useRef } from 'react'
import { GET, POST, POST_TL, getCompIdCS } from '@/pages/api/BaseApi'
import { CSVLink } from 'react-csv'

function secondsToMinutes(time) {
  return `${Math.floor(time / 60)} phút ${Math.floor(time % 60)} giây`
}

export function CpmDiMuonVeSom({ listEmpLateEarly, listPb }) {
  const [data, setData] = useState(listEmpLateEarly)
  const [filterParam, setFilterParam] = useState<any>()
  const [listCa, setListCa] = useState([])
  const [form] = Form.useForm()
  form.setFieldsValue(filterParam)

  useEffect(() => {
    const getCa = async () => {
      const res = await GET('api/qlc/shift/list')

      if (res?.result) {
        setListCa(res?.items)
      }
    }

    getCa()
  }, [])
  console.log(listCa)

  const TableDiMuonVeSom = ({ data }: { data: any }) => {
    return (
      <Table
        className={`green-table-bodyBorder`}
        columns={columns}
        dataSource={data}
        pagination={{ position: ['bottomCenter'] }}
        scroll={{ x: 'max-content' }}></Table>
    )
  }

  const columns: any[] = [
    {
      title: 'Ảnh',
      align: 'center',
      render: (record: any) => (
        <Image
          // src={`/${record?.info?.avatarUser}`}
          src={'/'}
          width={46}
          height={46}
          alt=''></Image>
      ),
    },
    {
      title: 'Họ và tên',
      align: 'center',
      render: (record: any) => (
        <div style={{ textAlign: 'left' }}>
          <p style={{ color: '#4C5BD4' }}>{record?.info?.userName}</p>
          <p>{record?.key}</p>
        </div>
      ),
    },
    {
      title: 'Phòng ban',
      render: (record: any) => (
        <div>
          {record?.info?.inForPerson?.employee?.dep_id
            ? listPb?.find(
                (item) =>
                  item?.dep_id === record?.info?.inForPerson?.employee?.dep_id
              )?.dep_name
            : 'Chưa cập nhật'}
        </div>
      ),
      align: 'center',
    },
    {
      title: 'Thời gian',
      align: 'center',
      render: (record: any) => (
        <div>
          {record?.lateData?.ts_date &&
            moment(record?.lateData?.ts_date)?.format('YYYY-MM-DD')}
        </div>
      ),
    },
    {
      title: 'Ca',
      align: 'center',
      render: (record: any) => (
        <div>
          {listCa &&
            listCa?.filter(
              (item) => item?.shift_id === record?.lateData?.shift_id
            )?.[0]?.shift_name}
        </div>
      ),
    },
    {
      title: 'Muộn/sớm',
      align: 'center',
      render: (record: any) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          {record?.lateData?.early_second > 0 && (
            <p>Đi sớm {secondsToMinutes(record?.lateData?.early_second)}</p>
          )}
          {record?.lateData?.late_second > 0 && (
            <p>Đi muộn {secondsToMinutes(record?.lateData?.late_second)}</p>
          )}
        </div>
      ),
    },
    {
      title: 'Phạt',
      align: 'center',
      render: (record: any) => (
        <p style={{ color: '#FF5B4D' }}>
          {record?.moneyData?.cong
            ? new Intl.NumberFormat('ja-JP').format(record?.moneyData?.cong)
            : 0}{' '}
          VND
        </p>
      ),
    },
  ]

  useEffect(() => {
    const getData = async () => {
      const daysInMonth = moment(
        `${filterParam?.year}-${filterParam?.month}`,
        'YYYY-MM'
      )?.daysInMonth()
      let com_id = null
      com_id = getCompIdCS()

      const res = await POST_TL('api/tinhluong/congty/show_staff_late', {
        start_date: `${filterParam?.year}-${
          filterParam?.month >= 10
            ? filterParam?.month
            : `0${filterParam?.month}`
        }-01`,
        end_date: `${filterParam?.year}-${
          filterParam?.month >= 10
            ? filterParam?.month
            : `0${filterParam?.month}`
        }-${daysInMonth}`,
        com_id: com_id,
        ...filterParam,
      })

      const listStaffLate: any[] = []
      const resInfo = res?.['data']?.['listUserDetail']
      const resDataLate = res?.['data']?.['list_data_late_early']
      const resMoney = res?.['data']?.['tien_phat_muon']

      resDataLate &&
        resDataLate?.forEach((item) => {
          const sheetData = resMoney?.find(
            (m) => m?.sheet_id === item?.sheet_id
          )

          const info = resInfo?.find((inf) => inf?.idQLC === item?.ep_id)

          listStaffLate.push({
            info: info || {},
            moneyData: sheetData || {},
            lateData: item || {},
          })
        })

      setData(listStaffLate)
    }

    if (!_.isEmpty(filterParam)) {
      getData()
    }
  }, [filterParam])

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
      <Form form={form} className={styles.rowFirst} onFinish={onFinish}>
        <Row gutter={20}>
          <Col lg={21} md={21} sm={24} xs={24}>
            <Row gutter={[20, { sm: 10, xs: 10 }]}>
              <Col lg={6} md={7} sm={12} xs={24} className={styles.selects}>
                <Form.Item name={'room'}>
                  <Select
                    size='large'
                    placeholder='Chọn phòng ban'
                    onChange={(value) =>
                      setData(
                        value === 'all'
                          ? listEmpLateEarly
                          : listEmpLateEarly?.filter(
                              (item) =>
                                item?.info?.inForPerson?.employee?.dep_id ===
                                value
                            )
                      )
                    }
                    options={[
                      { value: 'all', label: 'Tất cả phòng ban' },
                      ...(listPb &&
                        listPb?.map((item) => ({
                          value: item?.dep_id,
                          label: item?.dep_name,
                        }))),
                    ]}
                    suffixIcon={<img src='/search-black.png'></img>}></Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={7} sm={12} xs={24} className={styles.selects}>
                <Form.Item name={'employee'}>
                  <Select
                    size='large'
                    placeholder='Chọn nhân viên'
                    suffixIcon={<img src='/search-black.png'></img>}
                    options={[
                      { label: 'Tất cả nhân viên', value: 'all' },
                      ...filterUnique(
                        listEmpLateEarly &&
                          listEmpLateEarly?.map((item) => ({
                            label: item?.info?.userName,
                            value: item?.info?.idQLC,
                          })),
                        'value'
                      ),
                    ]}></Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={5} sm={10} xs={24} className={styles.selects}>
                <Form.Item
                  name={'year'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này là bắt buộc',
                    },
                  ]}>
                  <Select
                    size='large'
                    placeholder='Chọn năm'
                    suffixIcon={<img src='/search-black.png'></img>}
                    options={_.range(2021, moment().year() + 1, 1).map(
                      (item) => ({
                        value: item,
                        label: `Năm ${item}`,
                      })
                    )}></Select>
                </Form.Item>
              </Col>
              <Col lg={6} md={5} sm={10} xs={24} className={styles.selects}>
                <Form.Item
                  name={'month'}
                  rules={[
                    {
                      required: true,
                      message: 'Trường này là bắt buộc',
                    },
                  ]}>
                  <Select
                    size='large'
                    placeholder='Chọn tháng'
                    suffixIcon={<img src='/search-black.png'></img>}
                    options={_.range(11).map((item) => ({
                      value: item + 1,
                      label: `Tháng ${item + 1}`,
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
                  <Button size='large' htmlType='submit'>
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
                <CSVLink data={data && data?.map((item) => [])}>
                  <Button size='large'>
                    <Image
                      src='/excel-icon-white.png'
                      width={24}
                      height={24}
                      alt=''
                      style={{ marginRight: '10px' }}></Image>
                    Xuất file thống kê
                  </Button>
                </CSVLink>
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
              <Button size='large' htmlType='submit'>
                Thống kê
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.rowSecond}>
          <Col lg={5} md={6} sm={9} className={styles.text}>
            <div className={styles.textTop}>Theo dõi đi muộn về sớm</div>
            <div className={styles.textBottom}>Quản lý nhân viên ra về</div>
          </Col>
          <Col
            lg={19}
            md={18}
            sm={15}
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
      <div className={styles.table}>
        <TableDiMuonVeSom data={data} />
      </div>
    </div>
  )
}
