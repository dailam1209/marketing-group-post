import {
  Modal,
  Input,
  Select,
  Button,
  Form,
  List,
  Checkbox,
  Tabs,
  Avatar,
} from 'antd'
import styles from './chinh-sua.module.css'
import Image from 'next/image'
import React, { useState } from 'react'
import { ThemNhanVien } from '@/components/cham-cong/cai-dat-lich-lam-viec/modal/modal-item/modal-them-nhan-vien/modal-them-nhan-vien'
import { Search } from '@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import moment from 'moment'
import { POST_TL } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'
const { TextArea } = Input

const infoNV = [
  {
    key: '1',
    name: 'Nguyen Van A',
    id: '12345',
    url: '/Ellipse1125.png',
  },
  {
    key: '2',
    name: 'Nguyen Van A',
    id: '12345',
    url: '/Ellipse1125.png',
  },
  {
    key: '3',
    name: 'Nguyen Van A',
    id: '12345',
    url: '/Ellipse1125.png',
  },
  {
    key: '4',
    name: 'Nguyen Van A',
    id: '12345',
    url: '/Ellipse1125.png',
  },
]
export function ModalChinhSua(open: boolean, setOpen: Function, data: any) {
  const [fromDate, setFromDate] = useState(data?.cl_day)
  const [toDate, setToDate] = useState(data?.cl_day_end)
  const router = useRouter()

  const handleSubmit = () => {
    // console.log(data)
    data?.cl_id &&
      POST_TL('api/tinhluong/congty/edit_phuc_loi', {
        cls_day: fromDate,
        cls_day_end: toDate,
        cls_id: data?.cl_id,
      }).then((res) => {
        if (res?.message === 'success') {
          alert('Cập nhật thông tin phụ cấp thành công!')
          router.reload()
        }
      })
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={710}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>
          Chỉnh sửa nhân viên {data?.userName}
        </div>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.info}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              src={
                data?.avatarUser ? `/${data?.avatarUser}` : '/anhnhanvien.png'
              }
              style={{ width: '46px', height: '46px' }}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <p className={styles.textname}>{data?.userName}</p>
            <p className={styles.text}>{data?.idQLC}</p>
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', marginBottom: '5px', gap: '5px' }}>
            <p className={styles.text}>Thời điểm áp dụng</p>
            <p className={styles.dau}>*</p>
          </div>
          <Input
            style={{ border: '1px solid #9F9F9F', borderRadius: '5px' }}
            size='large'
            type='month'
            value={moment(fromDate).format('YYYY-MM')}
            onChange={(e) =>
              setFromDate(`${e.target.value}-01T00:00:00.000+00:00`)
            }
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', marginBottom: '5px', gap: '5px' }}>
            <p className={styles.text}>Đến ngày (Không bắt buộc)</p>
          </div>
          <Input
            style={{ border: '1px solid #9F9F9F', borderRadius: '5px' }}
            size='large'
            type='month'
            value={moment(toDate).format('YYYY-MM')}
            onChange={(e) =>
              setToDate(`${e.target.value}-01T00:00:00.000+00:00`)
            }
          />
        </div>
        <div className={styles.khungbutton}>
          <button className={styles.button1} onClick={() => setOpen(false)}>
            <p className={styles.textbutton1}>Huỷ</p>
          </button>
          <button className={styles.button2} onClick={handleSubmit}>
            <p className={styles.textbutton2}>Cập nhật</p>
          </button>
        </div>
      </div>
    </Modal>
  )
}
