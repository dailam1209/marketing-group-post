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
import styles from './modal-thoi-gian-ap-dung.module.css'
import Image from 'next/image'
import React, { useState } from 'react'
import { Lenxuong } from '@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'

import { ThemNhanVien } from '@/components/cham-cong/cai-dat-lich-lam-viec/modal/modal-item/modal-them-nhan-vien/modal-them-nhan-vien'
import { POST, POST_TL } from '@/pages/api/BaseApi'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
const { TextArea } = Input
export function ModalApDung(
  open: boolean,
  setOpen: Function,
  key: any,
  info: any,
  taxSelected: any,
  idNV: any
) {
  // console.log(idNV)
  const onClick = () => {
    setOpen(false)
  }
  const [ND, setND] = useState('')
  const handleInputChange = (event: any) => {
    setND(event.target.value)
  }
  const router = useRouter()
  const [form] = Form.useForm()
  const handelSubmit = async () => {
    // console.log(form.getFieldsValue())
    form.validateFields().then((value) => {
      // console.log(value)
      // console.log(dayjs(value['cls_day']).format('YYYY-MM-[01T00:00:00.000]Z'))
      idNV.map(async (id) => {
        // console.log({
        //   ...value,
        //   cls_id_cl: taxSelected?.cl_id,
        //   cls_id_com: taxSelected?.cl_com,
        //   cls_id_user: id,
        //   cls_day: dayjs(value['cls_day']).format('YYYY-MM-[01T00:00:00.000]Z'),
        //   cls_day_end: dayjs(value['cls_day_end']).format(
        //     'YYYY-MM-[01T00:00:00.000]Z'
        //   ),
        // })
        await POST_TL('api/tinhluong/congty/them_nv_nhom_other_money', {
          ...value,
          cls_id_cl: taxSelected?.cl_id,
          cls_id_com: taxSelected?.cl_com,
          cls_id_user: id,
          cls_day: dayjs(value['cls_day']).format('YYYY-MM-[01T00:00:00.000]Z'),
          cls_day_end: dayjs(value['cls_day_end']).format(
            'YYYY-MM-[01T00:00:00.000]Z'
          ),
        }).then((res) => {
          // console.log(res)
        })
      })
    })
    setOpen(false)
    router.replace(router.asPath)
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
        <div className={styles.textHead}>Thời gian áp dụng</div>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.khungnhanvien}>
          {key.map((k: any, index: number) => {
            return (
              <div className={styles.nhanvien} key={index}>
                <Avatar
                  src={info[k - 1]?.url}
                  style={{ width: '24px', height: '24px', margin: 'auto' }}
                />
                <p className={styles.name}>{info[k - 1]?.name}</p>
              </div>
            )
          })}
        </div>
        <Form form={form} className='mc'>
          <Form.Item
            className={styles.apdung}
            name='cls_day'
            rules={[
              {
                required: true,
                message: 'Vui lòng điền thông tin',
              },
            ]}
            label={
              <div className={styles.text}>
                <p className={styles.title}>Áp dụng từ tháng</p>
              </div>
            }
            labelCol={{ span: 24 }}>
            <Input className={styles.inputap} type='month' />
          </Form.Item>
          <Form.Item
            className={styles.apdung}
            name='cls_day_end'
            label={
              <div className={styles.text}>
                <p className={styles.title}>Đến tháng (Không bắt buộc)</p>
              </div>
            }
            labelCol={{ span: 24 }}>
            <Input className={styles.inputap} type='month' />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Vui lòng điền thông tin',
              },
            ]}
            name='x'
            className={styles.apdung}
            label={
              <div className={styles.text}>
                <p className={styles.title}>Nhập tiền thuế</p>
              </div>
            }
            labelCol={{ span: 24 }}>
            <Input
              className={styles.inputap}
              placeholder='Nhập số tiền (VNĐ)'
              suffix={<Lenxuong />}
            />
          </Form.Item>
        </Form>
        <div className={styles.khungbutton}>
          <Button className={styles.button} onClick={handelSubmit}>
            <p className={styles.textbutton}>Lưu</p>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
