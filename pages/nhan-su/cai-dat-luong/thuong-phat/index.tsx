import { Card, Row, Col, Form, Select, Button } from 'antd'
import styles from './index.module.css'
import { TableThuongPhat } from '@/components/cai-dat-luong/thuong-phat/table-thuong-phat/table-thuong-phat'
import Image from 'next/image'
import { POST, POST_SS_TL, POST_TL } from '@/pages/api/BaseApi'
import moment from 'moment'
import _ from 'lodash'
import { useEffect, useState } from 'react'

export default function ThuongPhat({ tpList, listPb }) {
  const [filterParam, setFilterParam] = useState<any>({
    year: moment().year(),
    month: moment().month(),
    userName: 'all',
  })

  const [listData, setListData] = useState(tpList)

  const [form] = Form.useForm()

  useEffect(() => {
    const getData = async () => {
      const res = await POST_TL('api/tinhluong/congty/take_thuong_phat', {
        month: filterParam?.month,
        year: filterParam?.year,
        id_com: 3312,
      })

      let finalData = []
      finalData = res?.data?.data_final

      //phong ban filter
      if (filterParam?.dep_id && filterParam?.dep_id !== 'all') {
        finalData = finalData?.filter(
          (item: any) =>
            item?.inforUser?.inForPerson?.employee?.dep_id ===
            filterParam?.dep_id
        )
      }

      // name filter
      if (filterParam?.userName && filterParam?.userName !== 'all') {
        finalData = finalData?.filter(
          (item: any) =>
            item?.inforUser?.userName?.toLowerCase() ===
            filterParam?.userName?.toLowerCase()
        )
      }

      setListData(finalData)
    }

    getData()
  }, [filterParam])

  const onFinish = (value) => {
    setFilterParam(value)
  }

  return (
    <Card>
      <div className={styles.textHeader}>
        <p className={styles.textHeaderTop}>
          {`Danh sách thưởng phạt nhân viên tháng ${filterParam?.month}/
          ${filterParam?.year}`}
        </p>
        <p style={{ color: '#666' }}>Quản lý theo dõi thưởng, phạt nhân viên</p>
      </div>
      <Form form={form} onFinish={onFinish} initialValues={filterParam}>
        <Row gutter={[20, 10]} justify={'end'}>
          <Col lg={14} md={12} sm={24} xs={24}>
            <Row gutter={[20, 10]}>
              <Col sm={12} xs={24}>
                <Form.Item name={'dep_id'} style={{ width: '100%' }}>
                  <Select
                    className={styles.select}
                    size='large'
                    placeholder='Chọn phòng ban'
                    options={
                      listPb && [
                        { label: 'Tất cả', value: 'all' },
                        ...listPb?.map((item) => ({
                          label: item?.dep_name,
                          value: item?.dep_id,
                        })),
                      ]
                    }
                    suffixIcon={
                      <Image
                        src={'/search-black.png'}
                        alt={''}
                        width={24}
                        height={24}
                      />
                    }></Select>
                </Form.Item>
              </Col>
              <Col sm={12} xs={24}>
                <Form.Item name={'userName'}>
                  <Select
                    className={styles.select}
                    size='large'
                    showSearch
                    placeholder='Nhập tên tìm kiếm'
                    options={
                      tpList && [
                        { label: 'Tất cả', value: 'all' },
                        ...tpList?.map((item) => ({
                          label: item?.inforUser?.userName,
                          value: item?.inforUser?.userName,
                        })),
                      ]
                    }
                    suffixIcon={
                      <Image
                        className={styles.selectDrop}
                        src={'/down-arrow.png'}
                        alt={''}
                        width={9}
                        height={6}
                      />
                    }></Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col lg={10} md={12} sm={24} xs={24}>
            <Row gutter={[20, 10]} justify={'end'}>
              <Col sm={9} xs={24}>
                <Form.Item name={'year'}>
                  <Select
                    className={styles.select}
                    size='large'
                    showSearch
                    placeholder='Chọn năm'
                    options={_.range(2018, moment().year() + 1)?.map(
                      (item) => ({
                        label: `Năm ${item}`,
                        value: item,
                      })
                    )}
                    suffixIcon={
                      <Image
                        src={'/search-black.png'}
                        alt={''}
                        width={24}
                        height={24}
                      />
                    }></Select>
                </Form.Item>
              </Col>
              <Col sm={9} xs={24}>
                <Form.Item name={'month'}>
                  <Select
                    className={styles.select}
                    size='large'
                    showSearch
                    placeholder='Chọn tháng'
                    options={_.range(1, 13)?.map((item) => ({
                      label: `Tháng ${item}`,
                      value: item,
                    }))}
                    suffixIcon={
                      <Image
                        src={'/search-black.png'}
                        alt={''}
                        width={24}
                        height={24}
                      />
                    }></Select>
                </Form.Item>
              </Col>
              <Col sm={6} xs={8}>
                <Form.Item>
                  <Button
                    className={styles.buttonTop}
                    size='large'
                    htmlType='submit'>
                    Thống kê
                  </Button>
                </Form.Item>
              </Col>
              <Col md={11} sm={7}>
                <Form.Item>
                  <Button
                    htmlType='submit'
                    size='large'
                    className={styles.buttonBottom}>
                    <Image
                      src={'/layers_light.png'}
                      alt={''}
                      width={24}
                      height={24}></Image>
                    <p style={{ marginLeft: '10px' }}>Xuất file thống kê</p>
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <div className={styles.table}>
        <TableThuongPhat tpList={listData} />
      </div>
    </Card>
  )
}

export const getServerSideProps = async (context) => {
  const tpList: any[] = []

  const currentMonth = moment().month() + 1
  const currentYear = moment().year()

  const res = await POST_SS_TL(
    'api/tinhluong/congty/take_thuong_phat',
    {
      month: currentMonth,
      year: currentYear,
      id_com: 3312,
    },
    context
  )

  const listPbRes = await POST('api/qlc/department/list', {
    com_id: 3312,
  })

  return {
    props: {
      tpList: res?.data?.data_final || [],
      listPb: listPbRes?.data || [],
    },
  }
}
