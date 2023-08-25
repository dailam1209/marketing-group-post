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
  console.log(data)

  const [modalChinhSua, setModalChinhSua] = useState(false)
  const [modalKey, setModalKey] = useState('')
  const [date, setDate] = useState<String>()
  const router = useRouter()
  const [listData, setListData] = useState(data)
  const [nhapluongcoban, setModalnhapluongcoban] = useState(false)

  const positionLabel = getPosition?.map((p) => ({
    label: p?.value,
    value: p?.id,
  }))

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
          {record?.luong_co_ban
            ? new Intl.NumberFormat('ja-JP').format(record?.luong_co_ban)
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
          {record?.phan_tram_hop_dong || 0} % Lương cơ bản{' '}
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
          {positionLabel?.find(
            (p) => p?.value === record?.inForPerson?.employee?.position_id
          )?.label || 'Chưa cập nhật'}
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
                    data?.filter(
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
              optionFilterProp='label'
              onChange={(value) => {
                console.log(value)

                // setListData(data)
                if (value === 'all') {
                  setListData(data)
                } else {
                  setListData(data?.filter((item) => item?.idQLC === value))
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
            data={[
              [
                // 'Id',
                'Tên',
                'Email',
                'Số điện thoại',
                'Địa chỉ',
                'Phòng ban',
                'Chức vụ',
                'Lương cơ bản',
                'Phần trăm hợp đồng',
                'Công chuẩn',
                'Công thực',
                'Công sau phạt',
                'Công theo tiền',
                'Công ghi nhận',
                'Công nghỉ phép',
                'Tổng công nhận',
                'Lương thực',
                'Lương sau phạt',
                'Lương bảo hiểm',
                'Tiền phạt muộn',
                'Công phạt đi muộn về sớm',
                'Tổng hoa hồng',
                'Tiền tạm ứng',
                'Thưởng',
                'Lương nghỉ lễ',
                'Phạt',
                'Tiền phạt nghỉ không phép',
                'Phạt nghỉ sai quy định',
                'Tiền phúc lợi',
                'Tiền phụ cấp',
                'Tiền phụ cấp theo ca',
                'Tổng bảo hiểm',
                'Tiền khác',
                'Tổng lương',
                'Thuế',
                'Tiền thực nhận',
                'Lương đã trả',
              ],
              ...(data
                ? data?.map((item) => [
                    item?.userName,
                    item?.email,
                    item?.phone || item?.phoneTK,
                    item?.address,
                    item?.department?.[0]?.dep_name || 'Chưa cập nhật',
                    positionLabel?.[item?.inForPerson?.employee?.position_id]
                      ?.label,
                    item?.luong_co_ban,
                    item?.phan_tram_hop_dong,
                    item?.cong_chuan,
                    item?.cong_thuc,
                    item?.cong_sau_phat,
                    item?.cong_theo_tien,
                    item?.cong_ghi_nhan,
                    item?.cong_nghi_phep,
                    item?.tong_cong_nhan,
                    item?.luong_thuc,
                    item?.luong_sau_phat,
                    item?.luong_bao_hiem,
                    item?.tien_phat_muon,
                    item?.cong_phat_di_muon_ve_som,
                    item?.tong_hoa_hong,
                    item?.tien_tam_ung,
                    item?.thuong,
                    item?.luong_nghi_le,
                    item?.phat,
                    item?.tien_phat_nghi_khong_phep,
                    item?.phat_nghi_sai_quy_dinh,
                    item?.tien_phuc_loi,
                    item?.tien_phu_cap,
                    item?.phu_cap_theo_ca,
                    item?.tong_bao_hiem,
                    item?.tien_khac,
                    item?.tong_luong,
                    item?.thue,
                    item?.tien_thuc_nhan,
                    item?.luong_da_tra,
                  ])
                : []),
            ]}>
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
