import { Button, Col, Popover, Row, Table } from 'antd'
import { MyTable } from '../../quan-ly-phong-ban/table/Table'
import { MySeachBar, MySelect } from '../../quan-ly-cong-ty-con/modal'
import styles from './NhanVienChoDuyet.module.css'
import Image from 'next/image'
import { SearchButton } from '@/components/commons/Buttons'
import { useState } from 'react'
import { ConfirmDuyetModal } from './modal/modal'
import { POST } from '@/pages/api/BaseApi'

const mockdata = [
  {
    id: '147310',
    img: '/avatar.png',
    name: 'Phạm Nguyễn Xuân Khôi',
    phone: '01231231231',
    email: 'phamxuannguyenkhoi@gmail.com',
    apartment: 'Biên tập',
    job: 'Nhân viên chính thức',
  },
  {
    id: '147312',
    img: '/avatar.png',
    name: 'Phạm Nguyễn Xuân Khôi',
    phone: '01231231231',
    email: 'phamxuannguyenkhoi@gmail.com',
    apartment: 'Biên tập',
    job: 'Nhân viên chính thức',
  },
  {
    id: '147313',
    img: '/avatar.png',
    name: 'Phạm Nguyễn Xuân Khôi',
    phone: '01231231231',
    email: 'phamxuannguyenkhoi@gmail.com',
    apartment: 'Biên tập',
    job: 'Nhân viên chính thức',
  },
  {
    id: '147314',
    img: '/avatar.png',
    name: 'Phạm Nguyễn Xuân Khôi',
    phone: '01231231231',
    email: 'phamxuannguyenkhoi@gmail.com',
    apartment: 'Biên tập',
    job: 'Nhân viên chính thức',
  },
  {
    id: '147315',
    img: '/avatar.png',
    name: 'Phạm Nguyễn Xuân Khôi',
    phone: '01231231231',
    email: 'phamxuannguyenkhoi@gmail.com',
    apartment: 'Biên tập',
    job: 'Nhân viên chính thức',
  },
  {
    id: '147316',
    img: '/avatar.png',
    name: 'Phạm Nguyễn Xuân Khôi',
    phone: '01231231231',
    email: 'phamxuannguyenkhoi@gmail.com',
    apartment: 'Biên tập',
    job: 'Nhân viên chính thức',
  },
]

export function NhanVienChoDuyet({ listStaffs, comLabel }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>()
  const [openDuyetModal, setOpenDuyetModal] = useState(false)

  const columns = [
    {
      title: <p className='tableHeader'>Ảnh</p>,
      render: (record: any) => (
        <Image
          alt='/'
          src={record?.img || '/avatar.png'}
          width={46}
          height={46}
        />
      ),
      align: 'center',
    },
    {
      title: <p className='tableHeader'>Họ và tên (ID)</p>,
      render: (record: any) => (
        <div>
          <p>{record?.userName}</p>
          <p style={{ textAlign: 'center' }}>({record?.idQLC})</p>
        </div>
      ),
      align: 'center',
    },
    {
      title: <p className='tableHeader'>Phòng ban</p>,
      render: (record: any) => <p>{record?.dep_id}</p>,
      align: 'center',
    },
    {
      title: <p className='tableHeader'>Chức vụ</p>,
      render: (record: any) => <p>{record?.position_id}</p>,
      align: 'center',
    },
    {
      title: <p className='tableHeader'>Email</p>,
      render: (record: any) => <p>{record?.emailContact}</p>,
      align: 'center',
    },
    {
      title: <p className='tableHeader'>SĐT</p>,
      render: (record: any) => <p>{record?.phoneTK}</p>,
      align: 'center',
    },
    Table.SELECTION_COLUMN,
  ]
  const duyet = async () => {
    if (selectedRowKeys?.length > 0) {
      const res = await POST('api/qlc/managerUser/verifyListUsers', {
        listUsers: selectedRowKeys,
      })
      console.log(res)
      setOpenDuyetModal(true)
    }
  }
  return (
    <div>
      <div>
        <Row gutter={[20, 0]}>
          <Col lg={7} sm={12} xs={24}>
            {MySelect(
              '',
              'Công ty cổ phần thanh toán Hưng Hà 2',
              false,
              false,
              'com_id',
              [comLabel]
            )}
          </Col>
          <Col lg={7} sm={12} xs={24}>
            <MySeachBar
              placeholder='Nhập tên phòng ban'
              hasPrefix={false}
              name=''
            />
          </Col>
          <Col lg={7} sm={12} xs={24} className={styles.inputName}>
            <MySeachBar
              placeholder='Nhập tên cần tìm'
              hasPrefix={false}
              name='12'
            />
          </Col>
          <Col lg={3} sm={12} xs={24} className={styles.searchBtn}>
            {SearchButton('Tìm kiếm', () => null, false)}
          </Col>
        </Row>
      </div>
      <div>
        <MyTable
          colunms={columns}
          data={listStaffs}
          onRowClick={() => null}
          hasRowSelect={true}
          onSelectChange={(newSelectedRowKeys) =>
            setSelectedRowKeys(newSelectedRowKeys)
          }
          selectedRowKeys={selectedRowKeys}
          rowKey='idQLC'
          Footer={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button style={{ backgroundColor: '#4C5BD4' }} size='large'>
                <p
                  style={{ color: '#fff', padding: '0px 20px' }}
                  onClick={duyet}>
                  Duyệt
                </p>
              </Button>
            </div>
          }
        />
      </div>
      <ConfirmDuyetModal
        open={openDuyetModal}
        setOpen={setOpenDuyetModal}
        data={selectedRowKeys}
      />
    </div>
  )
}
