import { Button, Col, Form, Input, Row, Select } from 'antd'
import styles from './xin-su-dung-phong-hop.module.css'
import {
  IconSelect,
  Tep,
} from '@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { POST_VT, getInfoUser } from '@/pages/api/BaseApi'
import { DXFileInput } from '@/components/tao-de-xuat-2/components/TaoDeXuatComps'

export const XinSuDungPhongHop: React.FC = () => {
  const [form] = Form.useForm()
  const [fileData, setFileData] = useState<any>()
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }
  const { TextArea } = Input
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectTheoDoi, setSelectTheoDoi] = useState<string[]>([])
  const router = useRouter()

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      //   console.log({
      //     ...value,
      //     id_user_duyet: value["id_user_duyet"]?.join(","),
      //     id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
      //     bd_hop: dayjs(value["bd_hop_date"] + " " + value["bd_hop_time"]).unix(),
      //     end_hop: dayjs(
      //       value["end_hop_date"] + " " + value["end_hop_time"]
      //     ).unix(),
      //   });
      const body = {
        ...value,
        id_user_duyet: value['id_user_duyet']?.join(','),
        id_user_theo_doi: value['id_user_theo_doi']?.join(','),
        bd_hop: dayjs(value['bd_hop_date'] + ' ' + value['bd_hop_time']).unix(),
        end_hop: dayjs(
          value['end_hop_date'] + ' ' + value['end_hop_time']
        ).unix(),
      }
      const fd = new FormData()

      Object.keys(body).forEach((key) => {
        fd.append(key, body[key])
      })

      if (fileData) {
        fd.append('file_kem', fileData)
      }

      POST_VT('api/vanthu/dexuat/addDxPh', fd).then((res) => {
        if (res?.result === true) {
          alert('Tạo đề xuất xin sử dụng phòng họp thành công!')
          router.reload()
        }
      })
    })
  }

  const [infoUser, setInfoUser] = useState<any>()
  const [listDuyet, setListDuyet] = useState<any>({})

  useEffect(() => {
    const getListDuyet = async () => {
      const res = await POST_VT('api/vanthu/dexuat/showadd', {})

      if (res?.result) {
        setListDuyet({
          listDuyet: res?.listUsersDuyet?.map((user) => ({
            label: user?.userName,
            value: user?.idQLC ? `/${user?.idQLC}` : '/nhanvien.png',
            url: user?.avatarUser,
          })),
          listTheoDoi: res?.listUsersTheoDoi?.map((user) => ({
            label: user?.userName,
            value: user?.idQLC,
            url: user?.avatarUser,
          })),
        })
      }
    }

    getListDuyet()

    setInfoUser(getInfoUser())
  }, [])

  useEffect(() => {
    if (infoUser?.idQLC) {
      form.setFieldValue('name', infoUser?.userName)
    }
  }, [infoUser])

  return (
    <div className={styles.khung}>
      <div className={styles.header}>
        <div className={styles.iconheader} onClick={() => router.back()}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='12'
            height='22'
            viewBox='0 0 12 22'
            fill='none'>
            <path
              d='M10.5996 1.66189L1.12587 11.1356L10.5996 20.6094'
              stroke='white'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </div>
        <p className={styles.textheader}>Đề xuất xin sử dụng phòng họp</p>
      </div>
      <div className={`shadowForm  ${styles.body}`}>
        <Form
          form={form}
          className={`${styles.bodyform} mc taoDeXuatForm`}
          initialValues={{ name: "Vũ Văn Khá" }}
        >
          <Row gutter={24} className={styles.body1}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'name_dx'}
                className={styles.bodyk1}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Tên đề xuất</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input
                  className={styles.input}
                  placeholder='Nhập tên đề xuất'
                  size='large'
                />
              </Form.Item>
            </Col>
            <Col xl={6} xs={24} sm={12}>
              <Form.Item
                name={'name'}
                className={styles.bodyk2}
                label={
                  <div>
                    <p className={styles.text}>Họ và tên</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input
                  style={{ backgroundColor: '#EDF3FF' }}
                  className={styles.input}
                  defaultValue='Vu Van Kha'
                  disabled
                  size='large'
                />
              </Form.Item>
            </Col>
            <Col xl={6} xs={24} sm={12}>
              <Form.Item
                name={'type_dx'}
                className={styles.bodyk2}
                label={
                  <div>
                    <p className={styles.text}>Loại đề xuất</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input
                  style={{ backgroundColor: '#EDF3FF' }}
                  className={styles.input}
                  defaultValue='Đề xuất xin sử dụng phòng họp'
                  disabled
                  size='large'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body2}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'bd_hop_time'}
                className={styles.bodya}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Thời gian sử dụng từ</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input size='large' className={styles.input} type='time' />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'bd_hop_date'}
                className={styles.bodya}
                label={
                  <div className={styles.label}>
                    <p className={styles.text} style={{ color: 'white' }}>
                      .
                    </p>
                    <p className={styles.dau} style={{ color: 'white' }}>
                      .
                    </p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input size='large' className={styles.input} type='date' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body3}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'end_hop_time'}
                className={styles.bodyc}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Đến ngày</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input className={styles.input} type='time' size='large' />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'end_hop_date'}
                className={styles.bodyc}
                label={
                  <div className={styles.label}>
                    <p className={styles.text} style={{ color: 'white' }}>
                      .
                    </p>
                    <p className={styles.dau} style={{ color: 'white' }}>
                      .
                    </p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Input className={styles.input} type='date' size='large' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20} className={styles.body1}>
            <Col sm={24} xs={24}>
              <Form.Item
                name={'ly_do'}
                className={styles.bodyd}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>
                      Lý do đề xuất xin sử dụng phòng họp
                    </p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <TextArea
                  style={{ resize: 'none' }}
                  className={styles.input}
                  rows={5}
                  placeholder='Nhập lý do đề xuất xin sử dụng phòng họp'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body5}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'id_user_duyet'}
                className={styles.bodye}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Người xét duyệt</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Select
                  className={styles.input}
                  placeholder='Chọn người xét duyệt'
                  options={listDuyet?.listDuyet}
                  onChange={setSelectedItems}
                  size='large'
                  value={selectedItems}
                  mode='multiple'
                  suffixIcon={<IconSelect />}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name={'id_user_theo_doi'}
                className={styles.bodye}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Người theo dõi</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}>
                <Select
                  className={`select_taodexuat ${styles.input}`}
                  placeholder='Chọn người theo dõi'
                  options={listDuyet?.listTheoDoi}
                  onChange={setSelectTheoDoi}
                  size='large'
                  value={selectTheoDoi}
                  mode='multiple'
                  suffixIcon={<IconSelect />}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body6}>
            <Col sm={12} xs={24}>
              <DXFileInput setFileData={setFileData} />
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles.footer}>
        <Button className={styles.huy}>
          <p className={styles.texthuy}>Hủy</p>
        </Button>
        <Button className={styles.tao} onClick={handleSubmit}>
          <p className={styles.texttao}>Tạo đề xuất</p>
        </Button>
      </div>
    </div>
  )
}
