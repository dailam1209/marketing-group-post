import styles from './nghi-sai-quy-dinh.module.css'
import {
  Row,
  Col,
  Select,
  Button,
  Table,
  Form,
  Checkbox,
  Input,
  Modal,
} from 'antd'
import Image from 'next/image'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { XoaNghiSaiQuyDinh, XoaThanhCongNghiSaiQuyDinh } from './modal/xoa/xoa'
import { ChinhSuaThanhCongNghiSaiQuyDinh } from './modal/chinh-sua/chinhsua'
import moment from 'moment'
import { POST_TL } from '@/pages/api/BaseApi'
import { useRouter } from 'next/router'

const ca = [
  {
    key: '1',
    name: 'Ca sáng',
    time: 'Từ 08:00:00 - đến 11:30:00',
  },
  {
    key: '2',
    name: 'Ca trưa kinh doanh',
    time: 'Từ 11:30:00 - đến 14:00:00',
  },
  {
    key: '3',
    name: 'Ca hành chính',
    time: 'Từ 08:00:00 - đến 17:30:00',
  },
  {
    key: '4',
    name: 'Past time buổi sáng',
    time: 'Từ 08:00:00 - đến 11:30:00',
  },
  {
    key: '5',
    name: 'Ca chiều',
    time: 'Từ 14:00:00 - đến 18:00:00',
  },
  {
    key: '6',
    name: 'Ca gãy trưa',
    time: 'Từ 09:00:00 - đến 15:00:00',
  },
  {
    key: '7',
    name: 'Ca 1',
    time: 'Từ 08:00:00 - đến 18:00:00',
  },
]
const CaiDatMucPhat = (listCaPhat) => {
  return (
    <div className={styles.middle}>
      <div className={styles.containerCheckbox}>
        {ca.map((data: any, index: number) => (
          <div key={index} className={styles.checkbox}>
            <Checkbox className={styles.iconCheckbox} />
            <div className={styles.textCheckbox}>
              <div style={{ color: '#4C5BD4' }}>{data.name}</div>
              <div>{data.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.containerInput}>
        <Form.Item
          name={'money'}
          label='Nhập mức tiền phạt'
          rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
          labelCol={{ span: 24 }}>
          <Input
            size='large'
            type='number'
            placeholder='Nhập số tiền phạt'
            suffix={<div>VNĐ</div>}></Input>
        </Form.Item>
        <Form.Item
          name={'date'}
          label='Chọn ngày bắt đầu áp dụng mức phạt'
          rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
          labelCol={{ span: 24 }}>
          <Input
            size='large'
            type='date'
            placeholder='Nhập số tiền phạt'></Input>
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button className={styles.button} htmlType='submit'>
            Áp dụng
          </Button>
        </Form.Item>
        <div className={styles.textInput}>
          <Image src={'/alert.png'} alt='' width={24} height={24} />
          <p className={styles.Luuy}>
            Lưu ý: Mức phạt sẽ được áp dụng từ ngày được chọn, điều này có thể
            ảnh hưởng đến kết quả tính lương của các tháng trước. Vui lòng chắc
            chắn về mốc thời gian áp dụng mức phạt.
          </p>
        </div>
      </div>
    </div>
  )
}

const TableNghiSaiQuyDinh = (
  setChiTiet: any,
  listPhat: any,
  setCurrentRow: (record: any) => void
) => {
  const columns: any = [
    {
      key: '1',
      title: 'Ca làm việc',
      align: 'center',
      render: (record: any) => (
        <div className={styles.textInTable}>
          <div style={{ color: '#4C5BD4' }}>{record?.shift_name}</div>
          <div>{`Từ: ${record?.start_time} - Đến: ${record?.end_time}`}</div>
        </div>
      ),
    },
    {
      key: '2',
      title: 'Mức phạt đang áp dụng',
      align: 'center',
      render: (record: any) => (
        <div>
          {record?.pc_money
            ? new Intl.NumberFormat('ja-JP')?.format(record?.pc_money)
            : 0}{' '}
          VND
        </div>
      ),
    },
    {
      key: '3',
      title: 'Ngày bắt đầu áp dụng',
      align: 'center',
      render: (record: any) => (
        <div>
          {record?.pc_time && moment(record?.pc_time)?.format('DD-MM-YYYY')}
        </div>
      ),
    },
    {
      key: '4',
      title: 'Xem chi tiết',
      render: (record: any) => (
        <div
          style={{ color: '#4C5BD4', cursor: 'pointer' }}
          onClick={() => {
            setCurrentRow(record)
            setChiTiet(true)
          }}>
          Xem mức phạt
        </div>
      ),
      align: 'center',
    },
  ]
  return (
    <Table
      className={`green-table-bodyBorder`}
      dataSource={listPhat}
      columns={columns}
      pagination={{ position: ['bottomCenter'] }}
      scroll={{ x: 'max-content' }}></Table>
  )
}
const ModalChiTiet = (open: any, setOpen: any, data: any) => {
  const [xoa, setXoa] = useState(false)
  const router = useRouter()
  const [xoaThanhCong, setXoaThanhCong] = useState(false)
  const [chinhSua, setChinhSua] = useState(true)
  const [chinhSuaThanhCong, setChinhSuaThanhCong] = useState(false)
  const [inputMoney, setInputMoney] = useState(data?.pc_money)

  const onUpdate = async () => {
    const res = await POST_TL('api/tinhluong/congty/update_phat_ca', {
      pc_money: inputMoney,
      pc_shift: data?.pc_shift,
      pc_time: data?.pc_time,
      pc_type: data?.pc_type,
      pc_id: data?.pc_id,
    })

    if (res?.message === 'success') {
      // router.replace(router.)
      setChinhSua(true)
      setChinhSuaThanhCong(true)
    }
  }

  return (
    <Modal
      className={styles.modal}
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
          className={styles.crossImage}
        />
      </div>
      <div className={styles.modalBody}>
        <p className={styles.textModal}>
          Danh sách mức phạt qua từng thời điểm
        </p>
        <Table
          className={`green-table-bodyBorder ${styles.table_chitiet}`}
          pagination={false}
          dataSource={[data]}
          columns={[
            {
              title: 'Mức phạt',
              align: 'center',
              render: (record: any) => (
                <div className={styles.money}>
                  {chinhSua ? (
                    <p className={styles.input}>
                      {record?.pc_money
                        ? new Intl.NumberFormat('ja-JP').format(
                            record?.pc_money
                          )
                        : 0}{' '}
                      VNĐ
                    </p>
                  ) : (
                    <Input
                      size='large'
                      type='number'
                      className={styles.input}
                      value={inputMoney}
                      onChange={(e) => setInputMoney(e.target.value)}
                      style={{
                        padding: '2px 5px 0 5px',
                        color: '#474747',
                        fontFamily: '"Roboto", sans-serif',
                      }}
                      defaultValue={record?.pc_money}
                    />
                  )}
                </div>
              ),
            },
            {
              title: 'Thời điểm phạt',
              align: 'center',
              render: (record: any) => (
                <p>
                  {record?.pc_time &&
                    moment(record?.pc_time)?.format('DD-MM-YYYY')}
                </p>
              ),
            },
            {
              title: 'Chức năng',
              align: 'center',
              render: (record: any) => (
                <div className={styles.actionGroup}>
                  {chinhSua ? (
                    <Image
                      alt='/'
                      src={'/edit-square.png'}
                      width={24}
                      height={24}
                      onClick={() => setChinhSua(false)}
                    />
                  ) : (
                    <Image
                      alt='/'
                      src={'/save.png'}
                      width={24}
                      height={24}
                      onClick={onUpdate}
                    />
                  )}
                  <div className={styles.divider}></div>
                  <Image
                    alt='/'
                    src={'/delete-icon.png'}
                    width={24}
                    height={24}
                    onClick={() => setXoa(true)}
                  />
                </div>
              ),
            },
          ]}></Table>
        <div className={styles.textInput}>
          <Image src={'/alert.png'} alt='' width={24} height={24} />
          <p className={styles.Luuy}>
            Lưu ý: Mức phạt sẽ áp dụng theo ngày được chọn, việc xóa mức phạt có
            thể ảnh hưởng đến kết quả tính lương của các tháng trước. Hãy chắc
            chắn về mốc phạt được áp dụng sau khi xóa.
          </p>
        </div>
      </div>
      {XoaNghiSaiQuyDinh(
        xoa,
        setXoa,
        setXoaThanhCong,
        'Bạn có muốn xóa mức phạt này ?',
        data
      )}
      {XoaThanhCongNghiSaiQuyDinh(
        xoaThanhCong,
        setXoaThanhCong,
        'Xóa mức phạt thành công'
      )}
      {ChinhSuaThanhCongNghiSaiQuyDinh(
        chinhSuaThanhCong,
        setChinhSuaThanhCong,
        'Chỉnh sửa mức phạt thành công'
      )}
    </Modal>
  )
}
const onClick = (caiDatMucPhat: boolean, setCaiDatMucPhat: Function) => {
  setCaiDatMucPhat(!caiDatMucPhat)
}
export function CpmNghiSaiQuyDinh({ listCaPhat }: { listCaPhat: any }) {
  const [form] = Form.useForm()
  const [caiDatMucPhat, setCaiDatMucPhat] = useState(false)
  const [chiTiet, setChiTiet] = useState(false)

  const [currentRow, setCurrentRow] = useState()

  return (
    <div>
      <Row align={'bottom'} gutter={[0, { sm: 20 }]}>
        <Col lg={12} md={15} sm={24} xs={24} className={styles.text}>
          <div className={styles.textTop}>Nghỉ sai quy định</div>
          <div className={styles.textBottom}>
            Nghỉ không có đơn xin phép hoặc có đơn xin phép nhưng bị sếp “hủy
            đơn”
          </div>
        </Col>
        <Col lg={12} md={9} sm={24} xs={24}>
          <Row
            gutter={20}
            justify={'end'}
            align={'bottom'}
            className={styles.rightHeader}>
            <Col lg={10} md={12} sm={8} xs={13}>
              <Form.Item>
                <Select
                  size='large'
                  placeholder='Chọn năm'
                  suffixIcon={<img src='/search-black.png'></img>}></Select>
              </Form.Item>
            </Col>
            <Col lg={7} md={12} sm={6} xs={11}>
              <Form.Item>
                <Button
                  size='large'
                  className={styles.installButton}
                  onClick={() => onClick(caiDatMucPhat, setCaiDatMucPhat)}>
                  Cài đặt mức phạt
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <div>{caiDatMucPhat && CaiDatMucPhat(listCaPhat)}</div>
      <div className={styles.table}>
        {TableNghiSaiQuyDinh(setChiTiet, listCaPhat, setCurrentRow)}
      </div>
      {ModalChiTiet(chiTiet, setChiTiet, currentRow)}
    </div>
  )
}
