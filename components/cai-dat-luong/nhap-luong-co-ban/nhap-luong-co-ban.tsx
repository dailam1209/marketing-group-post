import {
  Card,
  Table,
  Input,
  Select,
  Button,
  Avatar,
  Row,
  Col,
  Modal,
} from 'antd'
import styles from './nhap-luong-co-ban.module.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Logo } from '../cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import { IconDown } from '../cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import { IconEX } from '../cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import { ColumnsType } from 'antd/es/table'
import { POST_TL } from '@/pages/api/BaseApi'
import _ from 'lodash'
import { ModalNhapLuongCoBan } from './modal/nhap-luong-co-ban'
import { CSVDownload, CSVLink } from 'react-csv'
import moment from 'moment'
import { getPosition } from '@/utils/function'

export const filterUnique = (input: any[], name: string) => {
  const uniqueIds: any[] = []

  return input?.filter((element) => {
    const isDuplicate = uniqueIds?.includes(element?.[name])

    if (!isDuplicate) {
      uniqueIds?.push(element?.[name])

      return true
    }

    return false
  })
}

export const NhapLuongCoBan = ({
  data,
  listPb,
  listIds,
}: {
  data: any[]
  listPb: any[]
  listIds: any[]
}) => {

  const [modalChinhSua, setModalChinhSua] = useState(false)
  const [modalKey, setModalKey] = useState('')
  const [date, setDate] = useState<String>()
  const router = useRouter()
  const [listData, setListData] = useState(data)
  const [nhapluongcoban, setModalnhapluongcoban] = useState(false)

  const positionLabel = getPosition?.map((p) => ({
    label: p?.value,
    value: p?.id,
  }));

  useEffect(() => {
    const getData = async () => {
      const finalData: any[] = []

      const listIds = data?.map((item) => {
        return item?.idQLC
      })

      if (!_.isEmpty(listIds)) {
        const resSal = await POST_TL(
          'api/tinhluong/congty/take_salary_contract',
          { time: date, array: `[${listIds?.toString()}]` }
        )

        if (resSal?.data) {
          data?.forEach((user: any, index: number) => {
            const salData = resSal?.data?.find(
              (item) => item?.userId === user?.idQLC
            )

            finalData.push({ ...user, ...salData })
          })
          setListData(finalData)
        }
      }
    }

    if (date) {
      getData()
    }
  }, [date])

  const chitiet = (id: String) => {
    router.push(`${router.pathname}/chi-tiet-nhan-vien/${id}`)
  }

  const columns: any = [
    {
      title: 'Ảnh',
      dataIndex: '',
      key: '',
      render: (record: any) => (
        <Avatar
          src={record?.avatarUser}
          style={{ width: '46px', height: '46px' }}
        />
      ),
    },
    {
      title: 'Họ và Tên (ID)',
      dataIndex: '',
      render: (record: any) => (
        <div  
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            width: '260px',
          }}>
          <div>
            <p className={styles.textname}>{record?.userName}</p>
            <p className={styles.text}>ID: {record?.idQLC}</p>
          </div>
          <div
            className={`chinhsua ${styles.editInfo}`}
            onClick={(e) => chitiet(record?.idQLC)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='24'
              viewBox='0 0 25 24'
              fill='none'>
              <path
                d='M12.75 3.99985H7.9375C6.17709 3.99985 4.75 5.42694 4.75 7.18735V16.8123C4.75 18.5728 6.17709 19.9998 7.9375 19.9998H17.5625C19.3229 19.9998 20.75 18.5728 20.75 16.8123V11.9998M19.1642 8.41405L20.25 7.32829C21.031 6.54724 21.031 5.28092 20.25 4.49988C19.4689 3.71883 18.2026 3.71883 17.4215 4.49989L16.3358 5.58563M19.1642 8.41405L13.1279 14.4504C12.8487 14.7296 12.4931 14.9199 12.106 14.9974L9.16422 15.5857L9.75257 12.644C9.83001 12.2568 10.0203 11.9012 10.2995 11.622L16.3358 5.58563M19.1642 8.41405L16.3358 5.58563'
                stroke='#4C5BD4'
                stroke-width='1.2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </div>
        </div>
      ),
      align: 'center',
    },
    {
      title: 'Lương cơ bản',
      key: 'luongCB',
      render: (record) => (
        <p style={{ color: '#FF5B4D' }} className={styles.text}>
          {record?.sb_salary_basic
            ? new Intl.NumberFormat('ja-JP').format(record?.sb_salary_basic)
            : 0}{' '}
          VND
        </p>
      ),
    },
    {
      title: 'Hợp đồng áp dụng',
      key: 'HDApDung',
      render: (record) => (
        <p className={styles.text}>
          {record?.con_salary_persent || 0} % Lương cơ bản{' '}
        </p>
      ),
    },
    {
      title: 'Phòng ban',
      render: (record) => (
        <p className={styles.text}>
          {record?.department?.[0]?.dep_name || 'Chưa cập nhật'}{' '}
        </p>
      ),
    },
    {
      title: 'Chức vụ',
      key: 'chucVu',
      render: (record) => (
        <p className={styles.text}>
         {positionLabel?.find(p => p?.value === record?.inForPerson?.employee?.position_id)?.label || "Chưa cập nhật"}
        </p>
      ),
    },
    {
      title: 'Liên hệ',
      dataIndex: '',
      key: '',
      render: (record: any) => (
        <div>
          <p>{record.phoneTK || record?.phone}</p>
          <p>{record.email || record?.emailContact}</p>
          <p>{record.address}</p>
        </div>
      ),
    },
  ]

  return (
    <Card style={{ padding: '-10px -10px' }}>
      <div>
        <div style={{ marginBottom: '20px' }}>
          <p className={styles.title}>Danh sách nhân viên</p>
        </div>
        <Row gutter={24} className={styles.form}>
          <Col xl={7} md={8} xs={24} className={styles.col1}>
            <Input
              type='date'
              className={styles.time}
              onChange={(e) => setDate(e.target.value)}
            />
          </Col>
          <Col xl={7} md={8} xs={24} sm={12} className={styles.col}>
            <Select
              className={styles.phongBan}
              placeholder='Tìm kiếm theo phòng ban'
              suffixIcon={<Logo />}
              options={
                listPb && [
                  { label: 'Tất cả', value: 'all' },
                  ...listPb?.map((item) => ({
                    label: item?.dep_name,
                    value: item?.dep_id,
                  })),
                ]
              }
              onChange={(value) => {
                if (value === 'all') {
                  setListData(data)
                } else {
                  setListData(
                    listData?.filter(
                      (item) => item?.inForPerson?.employee?.dep_id === value
                    )
                  )
                }
              }}
            />
          </Col>
          <Col xl={7} md={8} xs={24} sm={12} className={styles.col}>
            <Select
              className={styles.phongBan}
              defaultValue='Tất cả nhân viên'
              placeholder='Tìm kiếm theo tên nhân viên'
              suffixIcon={<Logo />}
              showSearch
              onChange={(value) => {
                // setListData(data)
                if (value === 'all') {
                  setListData(data)
                } else {
                  setListData(
                    listData?.filter((item) => item?.userName === value)
                  )
                }
              }}
              options={
                data && [
                  { value: 'all', label: 'Tất cả nhân viên' },
                  ...data?.map((item: any) => ({
                    value: item?.idQLC,
                    label: item?.userName,
                  })),
                ]
              }
            />
          </Col>
        </Row>
      </div>
      <Row gutter={24} className={styles.button}>
        <Col xl={5} sm={8} md={12} xs={24} className={styles.time2}>
          <Input type='date' />
        </Col>
        <Col xl={5} sm={8} md={6} xs={13} className={styles.colbutton}>
          <Button
            className={styles.button1}
            icon={<IconDown />}
            onClick={() => setModalnhapluongcoban(true)}>
            <p className={styles.textB}>Nhập lương cơ bản</p>
          </Button>
        </Col>
        <Col xl={5} sm={8} md={6} xs={13} className={styles.colbutton}>
          <CSVLink
            filename={`Xuất bảng lương ngày ${moment()?.format('DD-MM-YYYY')}`}
            data={
              data &&
              data?.map((item) => [
                item?.idQLC,
                item?.userName,
                item?.sb_salary_basic,
                item?.con_salary_persent,
                item?.department?.[0]?.dep_name || 'Chưa cập nhật',
                item?.inForPerson?.employee?.position_id,
                item?.email,
                item?.phoneTK,
                item?.address,
              ])
            }>
            <Button className={styles.button2} icon={<IconEX />}>
              <p className={styles.textB}>Xuất lương cơ bản</p>
            </Button>
          </CSVLink>
        </Col>
      </Row>

      <div>
        <Table
          className={`table_danhsachnhanvienthue ${styles.table}`}
          columns={columns}
          dataSource={listData}
          pagination={{
            position: ['bottomCenter'],
          }}
          scroll={{ x: 'max-content' }}
        />
      </div>
      {ModalNhapLuongCoBan(nhapluongcoban, setModalnhapluongcoban)}
    </Card>
  )
}
