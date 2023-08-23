import styless from './modal_sass.module.scss'
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Menu,
  MenuProps,
  Modal,
  Rate,
  Row,
  Select,
  TimePicker,
} from 'antd'
import styles from './modal.module.css'
import Image from 'next/image'
import { TYPE_ADD, TYPE_UPDATE } from '../quan-ly-ca/modal'
import { NamePath } from 'antd/es/form/interface'
import { useEffect } from 'react'
import { POST } from '@/pages/api/BaseApi'
import { SearchOutlined } from '@ant-design/icons'
const { TextArea } = Input

export const MyInput = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string,
  type?: 'number' | '',
  disabled: boolean = false,
  bgColor: string = '#fff'
) => (
  <Form.Item
    name={name}
    rules={[
      {
        required: required,
        message: `Vui lòng nhập ${title} của bạn!`,
      },
    ]}
    label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
    labelCol={{ span: 24 }}>
    {type && type === 'number' ? (
      <InputNumber
        placeholder={placeholder}
        style={{ width: '100%', border: '1px solid #9F9F9F' }}
        size='large'
        disabled={disabled}
      />
    ) : (
      <Input
        placeholder={placeholder}
        style={{
          width: '100%',
          border: '1px solid #9F9F9F',
          backgroundColor: `${bgColor}`,
        }}
        size='large'
        disabled={disabled}
      />
    )}
  </Form.Item>
)

export const MyInputPwd = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string
) => (
  <Form.Item
    name={name}
    rules={[
      {
        required: required,
        message: `Vui lòng nhập ${title} của bạn!`,
      },
    ]}
    label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
    labelCol={{ span: 24 }}>
    <Input.Password
      placeholder={placeholder}
      style={{ width: '100%', border: '1px solid #9F9F9F' }}
      size='large'
    />
  </Form.Item>
)

export const MyDatePicker = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string,
  type?: any | '',
  bgColor?: string | '',
  disabled: boolean = false,
  handleChange?: Function
) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required,
          message: `Vui lòng nhập ${title} của bạn!`,
        },
      ]}
      label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
      labelCol={{ span: 24 }}>
      <DatePicker
        size='large'
        picker={type}
        placeholder={placeholder}
        style={{
          border: '1px solid #9F9F9F',
          width: '100%',
          backgroundColor: `${bgColor}`,
        }}
        disabled={disabled}
        onChange={(time, timeStr) =>
          handleChange && handleChange(time, timeStr)
        }
      />
    </Form.Item>
  )
}

export const MySelect = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string = '',
  options: Array<any> = [],
  defaultValue?: any,
  handleChange: Function = () => null,
  hanldeChangeOption: Function = () => null
) => (
  <Form.Item
    name={name}
    rules={[
      {
        required: required,
        message: `Vui lòng nhập ${title} của bạn!`,
      },
    ]}
    label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
    labelCol={{ span: 24 }}>
    <Select
      placeholder={placeholder}
      style={{
        width: '100%',
        border: '1px solid #9F9F9F',
        borderRadius: '10px',
      }}
      optionFilterProp='label'
      filterOption={(input, option) => {
        return (
          // option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
          option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        )
      }}
      showSearch={true}
      defaultValue={defaultValue ?? null}
      options={options}
      allowClear={true}
      onChange={(value: any, option: any) => {
        hanldeChangeOption(value, option)
        handleChange(value)
      }}
      suffixIcon={
        <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
      }
      size='large'
    />
  </Form.Item>
)

export const MySelectMulti = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string = '',
  options: Array<any> = [],
  defaultValue?: any
) => (
  <Form.Item
    name={name}
    rules={[
      {
        required: required,
        message: `Vui lòng nhập ${title} của bạn!`,
      },
    ]}
    label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
    labelCol={{ span: 24 }}>
    <Select
      mode='multiple'
      allowClear
      placeholder={placeholder}
      style={{
        width: '100%',
      }}
      defaultValue={defaultValue ?? null}
      options={options}
      suffixIcon={
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='8'
          height='6'
          viewBox='0 0 8 6'
          fill='none'>
          <path
            d='M0.875 1.5L4 4.5L7.125 1.5'
            stroke='#666666'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      }
      size='large'
    />
  </Form.Item>
)

export const MySelectTags = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string = '',
  options: Array<any> = [],
  defaultValue?: any
) => (
  <Form.Item
    name={name}
    rules={[
      {
        required: required,
        message: `Vui lòng nhập ${title} của bạn!`,
      },
    ]}
    label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
    labelCol={{ span: 24 }}>
    <Select
      mode='multiple'
      allowClear
      placeholder={placeholder}
      searchValue=''
      style={{
        width: '100%',
      }}
      defaultValue={defaultValue ?? null}
      options={options}
      suffixIcon={
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='8'
          height='6'
          viewBox='0 0 8 6'
          fill='none'>
          <path
            d='M0.875 1.5L4 4.5L7.125 1.5'
            stroke='#666666'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      }
      size='large'
    />
  </Form.Item>
)

export const MySelectThemeColor = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string = '',
  options: Array<any> = [],
  defaultValue?: any
) => (
  <Form.Item
    name={name}
    rules={[
      {
        required: required,
        message: `Vui lòng nhập ${title} của bạn!`,
      },
    ]}
    label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
    labelCol={{ span: 24 }}>
    <Select
      placeholder={placeholder}
      style={{
        width: '100%',
      }}
      defaultValue={defaultValue ?? null}
      options={options}
      suffixIcon={
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='8'
          height='6'
          viewBox='0 0 8 6'
          fill='none'>
          <path
            d='M0.875 1.5L4 4.5L7.125 1.5'
            stroke='#4C5BD4'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      }
      size='large'
    />
  </Form.Item>
)

export const MyRating = ({
  name,
  required,
  hasLabel,
  title,
}: {
  name: NamePath
  required: boolean
  hasLabel: boolean
  title: string
}) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required,
          message: `Vui lòng nhập ${title} của bạn!`,
        },
      ]}
      label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}>
      <Rate
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
        // disabled
      />
    </Form.Item>
  )
}

export const MyTextArea = ({
  name,
  required,
  title,
  hasLabel,
  placeholder,
}: {
  name: string
  required: boolean
  title: string
  hasLabel: boolean
  placeholder: string
}) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: required,
          message: `Vui lòng nhập ${title} của bạn!`,
        },
      ]}
      label={hasLabel && <p style={{ fontWeight: '500' }}>{title}</p>}
      labelCol={{ span: 24 }}>
      <TextArea rows={5} style={{ width: '100%' }} placeholder={placeholder} />
    </Form.Item>
  )
}

export const MySeachBar = ({
  placeholder,
  name,
  hasPrefix,
  value,
  setValue,
}: {
  placeholder: string
  name: string
  hasPrefix: boolean
  value?: string
  setValue?: Function
}) => (
  <Form.Item name={name}>
    <Input
      value={value && value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      suffix={
        !hasPrefix && (
          <Image alt='/' src={'/search-black.png'} width={24} height={24} />
        )
      }
      prefix={
        hasPrefix && (
          <Image
            style={{ marginRight: '10px' }}
            alt='/'
            src={'/search-black.png'}
            width={24}
            height={24}
          />
        )
      }
      style={{ width: '100%' }}
      size='large'
    />
  </Form.Item>
)

export function ModalQuanLyCongTyCon(
  open: boolean,
  setOpen: Function,
  type: string,
  data?: any,
  setData?: Function,
  companySelected?: any,
  setCloseModal?: Function
) {
  const router = useRouter()
  const [compData, setCompData] = useState<any>()
  const [form] = Form.useForm()
  console.log(companySelected)

  useEffect(() => {
    const token = Cookies.get(COOKIE_KEY)

    if (token) {
      const decoded = jwtDecode(token)
      console.log(decoded)
      setCompData(decoded?.['data'])
    }
  }, [])

  useEffect(() => {
    form.setFieldsValue(companySelected)
  }, [form, companySelected])

  const handleSubmit = () => {
    // console.log(form.getFieldsValue());
    if (type === TYPE_ADD) {
      console.log('create a child company!')
      POST('api/qlc/company/child/create', form.getFieldsValue())
        .then((response) => console.log(response?.message))
        .catch((error) => console.error(error))
      setCloseModal && setCloseModal(false)
      POST('api/qlc/company/child/list', {})
        .then((res) => {
          setData && setData(res?.data)
        })
        .catch((error) => console.error(error))
    }
    if (type === TYPE_UPDATE && companySelected) {
      console.log('update a child company!')
      POST('api/qlc/company/child/edit', {
        ...form.getFieldsValue(),
        com_id: companySelected?.com_id,
      })
        .then((response) => {
          if (response?.result === true) {
            router.reload()
            setData &&
              setData(
                data.map((item) => {
                  if (item === companySelected) {
                    return {
                      ...companySelected,
                      ...form.getFieldsValue(),
                    }
                  }
                  return item
                })
              )
          }
        })
        .catch((error) => console.error(error))
      setCloseModal && setCloseModal(false)
    }
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={800}
      closable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}>
      <div className={styles.header}>
        <div></div>
        <p className={styles.headerText}>
          {type === TYPE_ADD ? 'Thêm công ty con' : 'Chỉnh sửa công ty con'}
        </p>
        <Image
          alt='/'
          src={'/cross.png'}
          width={14}
          height={14}
          style={{ marginRight: '20px' }}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={`them_cong_ty_con_body ${styless.body} ${styles.body}`}>
        <Form
          form={form}
          className='abc'
          initialValues={
            type === TYPE_ADD
              ? {}
              : {
                  userName: companySelected?.com_name,
                  address: companySelected?.com_address,
                  phone: companySelected?.com_phone,
                  emailContact: companySelected?.com_email,
                }
          }
          onFinish={handleSubmit}>
          <div className={styles.logoSection}>
            <p>
              {type === TYPE_ADD
                ? 'Logo công ty (nếu có)'
                : 'Cập nhật logo công ty'}
            </p>
            <Image
              alt='/'
              src={companySelected?.avatarUser || '/logo_demo.png'}
              width={147}
              height={80}
            />
          </div>

          {/* body */}
          <Row gutter={30}>
            <Col sm={12} xs={24}>
              {MyInput(
                'Tên công ty',
                'Nhập tên công ty',
                true,
                true,
                type === TYPE_ADD ? 'com_name' : 'userName'
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyInput(
                'Số điện thoại',
                'Nhập số điện thoại',
                true,
                true,
                type === TYPE_ADD ? 'com_phone' : 'phone'
              )}
            </Col>

            <Col sm={12} xs={24}>
              {MyInput(
                'Email công ty',
                'Nhập email công ty',
                true,
                true,
                type === TYPE_ADD ? 'com_email' : 'emailContact'
              )}
            </Col>

            <Col sm={12} xs={24}>
              {MyInput(
                'Địa chỉ',
                'Nhập địa chỉ',
                true,
                true,
                type === TYPE_ADD ? 'com_address' : 'address'
              )}
            </Col>

            {type === TYPE_ADD && (
              <Col sm={12} xs={24}>
                {MySelect(
                  'Chọn công ty mẹ',
                  'Chọn công ty mẹ',
                  true,
                  true,
                  'com_parent_id',
                  [{ value: compData?.com_id, label: compData?.userName }]
                )}
              </Col>
            )}
          </Row>

          {/* note */}
          {type === TYPE_ADD ? (
            <div className={styles.noteWrapper}>
              <Image alt='/' src={'/alert.png'} width={24} height={24} />
              <p className={styles.note}>
                Ghi chú: Mật khẩu đăng nhập vào tài khoản công ty con sẽ được
                gửi về email đăng ký sau khi hoàn tác. Vui lòng kiểm tra email !
              </p>
            </div>
          ) : null}

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button size='large' htmlType='submit' className={styles.addNewBtn}>
              <p className={styles.btnText}>
                {type === TYPE_ADD ? 'Thêm công ty ' : 'Cập nhật'}
              </p>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}
