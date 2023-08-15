import styles from './table-thuong-phat.module.css'
import { Table, Popover } from 'antd'
import Image from 'next/image'
import { divide } from 'lodash'
import React, { useState } from 'react'
import { ChiTietThuong } from './popover/chi-tiet-thuong/chi-tiet-thuong'
import { ChiTietPhat } from './popover/chi-tiet-phat/chi-tiet-phat'
import { ModalThemThuongPhat } from './modals/them-thuong-phat/them-thuong-phat'
import { ModalChinhSuaThuongPhat } from './modals/chinh-sua-thuong-phat/chinh-sua-thuong-phat'

const THUONG = 'thuong'
const PHAT = 'phat'

export const TableThuongPhat = ({ tpList }: { tpList: any }) => {
  // console.log(tpList)
  const [popoverKey, setPopoverKey] = useState('')
  const [popoverType, setPopoverType] = useState('')
  const [themThuongPhat, setThemThuongPhat] = useState(false)
  const [modalChinhSua, setModalChinhSua] = useState(false)
  const [rowSelectKey, setRowSelectKey] = useState({})
  const [selectedRow, setSelectedRow] = useState()

  const columns: any = [
    {
      title: <p style={{ color: '#fff' }}>Ảnh</p>,
      width: '100px',
      align: 'center',
      render: (record: any) => (
        <Image
          src={`/${record?.inforUser?.avatarUser}` || ''}
          alt=''
          width={46}
          height={46}></Image>
      ),
    },
    {
      title: <p style={{ color: '#fff' }}>Họ và tên (ID)</p>,
      width: '300px',
      align: 'center',
      render: (record: any) => (
        <div>
          <p>{record?.inforUser?.userName}</p>
          <p>ID: {record?.inforUser?.idQLC}</p>
        </div>
      ),
    },
    {
      title: <p style={{ color: '#fff' }}>Tiền thưởng</p>,
      align: 'center',
      render: (record: any) => (
        <Popover
          key={record?.inforUser?._id}
          zIndex={1}
          content={() =>
            ChiTietThuong(
              setPopoverKey,
              setModalChinhSua,
              rowSelectKey,
              setRowSelectKey,
              record
            )
          }
          title={false}
          trigger='click'
          open={popoverKey === record?.inforUser?._id && popoverType === THUONG}
          onOpenChange={(newOpen: boolean) => {
            setSelectedRow(record)
            setPopoverKey(record?.inforUser?._id)
            setPopoverType(THUONG)
          }}>
          <div className={styles.textCenter}>
            <div className={styles.textThuong}>
              <Image
                src={'/green_eye.png'}
                alt=''
                width={18}
                height={18}></Image>
              <p style={{ color: '#666', marginLeft: '10px' }}>
                {new Intl.NumberFormat('ja-JP').format(
                  record?.tt_thuong?.tong_thuong
                ) || 0}{' '}
                VNĐ
              </p>
            </div>
          </div>
        </Popover>
      ),
    },
    {
      title: <p style={{ color: '#fff' }}>Tiền phạt</p>,
      align: 'center',
      render: (record: any) => (
        <div className={styles.textCenter}>
          <Popover
            key={record?.inforUser?._id}
            zIndex={1}
            content={() =>
              ChiTietPhat(
                setPopoverKey,
                setModalChinhSua,
                rowSelectKey,
                setRowSelectKey,
                record
              )
            }
            title={false}
            trigger='click'
            open={popoverKey === record?.inforUser?._id && popoverType === PHAT}
            onOpenChange={(newOpen: boolean) => {
              setSelectedRow(record)
              setPopoverKey(record?.inforUser?._id)
              setPopoverType(PHAT)
            }}>
            <div className={styles.textPhat}>
              <Image
                src={'/red_eye.png'}
                alt='/'
                width={18}
                height={18}></Image>
              <p style={{ color: '#666', marginLeft: '10px' }}>
                {new Intl.NumberFormat('ja-JP').format(
                  record?.tt_phat?.tong_phat
                ) || 0}{' '}
                VNĐ
              </p>
            </div>
          </Popover>
        </div>
      ),
    },
    {
      title: <p style={{ color: '#fff' }}>Cài đặt</p>,
      align: 'center',
      render: (record: any) => (
        <div className={styles.textCenter}>
          <div
            className={styles.textCaiDat}
            onClick={() => {
              setSelectedRow(record)
              setThemThuongPhat(true)
            }}>
            <p style={{ fontSize: '20px', color: '#4c5bd4' }}>+</p>
            <p style={{ color: '#666', marginLeft: '10px' }}>Thưởng phạt</p>
          </div>
        </div>
      ),
    },
  ]
  return (
    <div>
      <Table
        className={`table_lich_lam_viec`}
        dataSource={tpList}
        columns={columns}
        pagination={{ position: ['bottomCenter'] }}
        scroll={{ x: 'max-content' }}
        rowKey={(record) => record?.infor}></Table>
      {ModalThemThuongPhat(
        themThuongPhat,
        setThemThuongPhat,
        setModalChinhSua,
        rowSelectKey,
        setRowSelectKey,
        selectedRow
      )}
      {ModalChinhSuaThuongPhat(
        modalChinhSua,
        setModalChinhSua,
        rowSelectKey,
        setRowSelectKey,
        selectedRow
      )}
    </div>
  )
}
