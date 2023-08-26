import styles from './index.module.css'
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Select,
  SelectProps,
  Space,
} from 'antd'
import { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { Checkbox } from 'antd'

interface ItemProps {
  label: string
  value: string
}

const options: ItemProps[] = []

for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i
  options.push({
    label: `Ca : ${value}`,
    value,
  })
}
const CauHinhChamCong: React.FC = () => {
  const [value, setValue] = useState([])

  const selectProps: SelectProps = {
    mode: 'multiple',
    style: { width: '100%' },
    value,
    options,
    onChange: (newValue: string[]) => {
      setValue(newValue)
    },
    placeholder: 'Select Item...',
    maxTagCount: 'responsive',
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }
  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`)
  }
  // @ts-ignore
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Cấu hình chấm công</h2>
      <div className={styles.form_search}>
        <Form className={styles.form_search_item}>
          <Form.Item>
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item>
            <DatePicker onChange={onChange} picker='month' />
          </Form.Item>
          <Form.Item>
            <DatePicker onChange={onChange} picker='year' />
          </Form.Item>
          <Form.Item>
            <Space direction='vertical' style={{ width: '300px' }}>
              <Select {...selectProps} />
            </Space>
          </Form.Item>
          <Form.Item>
            <Button className={styles.button_search}>
              <SearchOutlined />
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.body}>
        <div className={styles.body1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar className={styles.calendar} />
          </LocalizationProvider>
        </div>
        <div className={styles.body2}>
          <div className={styles.header_shift}>
            <div className={styles.header_shift_st}>
              <h4>Ca làm việc</h4>
              <Checkbox onChange={onChangeCheckbox}>Chọn tất cả</Checkbox>
            </div>
            <div className={styles.header_shift_bd}>
              <p>Ca sáng</p>
              <p>Ca chiều</p>
              <p>Ca hành chính</p>
              <p>Ca tối</p>
              <p>Ca kinh doanh</p>

              <p>Ca trưa</p>
              <p>Ca hành chính</p>
              <p>Ca tối</p>
              <p>Ca kinh doanh</p>
            </div>
            <div className={styles.body_shift}>
              <Checkbox>Chọn tất cả</Checkbox>
              <div className={styles.body_shift_div}>
                <h4>Cài đặt chấm công trên app</h4>
                <div className={styles.body_shift_div_st}>
                  <Checkbox>Chấm công khuân mặt trên app chat365</Checkbox>
                  <Checkbox>Chấm công bằng QR trên app chat365</Checkbox>
                  <Checkbox>
                    Chấm công bằng QR trên app PC365 (nhân viên)
                  </Checkbox>
                  <Checkbox>
                    Chấm công bằng khuân mặt trên app PC365 (nhân viên)
                  </Checkbox>
                  <Checkbox style={{ marginLeft: '20px' }}>
                    Địa chỉ Mac của Wifi
                  </Checkbox>
                  <Checkbox style={{ marginLeft: '20px' }}>Vị trí</Checkbox>
                </div>
                <h4 className={styles.body_shift_div}>
                  Cài đặt chấm công trên app winform
                </h4>
                <div className={styles.body_shift_div_st}>
                  <Checkbox>Chấm công khuôn mặt trên app chat365</Checkbox>
                  <Checkbox>
                    Chấm công bằng khuôn mặt trên app PC365 (nhân viên)
                  </Checkbox>
                  <Checkbox style={{ marginLeft: '20px' }}>
                    Địa chỉ Mac của wifi
                  </Checkbox>
                  <Checkbox style={{ marginLeft: '20px' }}>Vị trí</Checkbox>
                </div>
                <h4>Cài đặt chấm công tài khoản công ty</h4>
                <div className={styles.body_shift_div_st}>
                  <Checkbox>Chấm công công ty</Checkbox>
                  <Checkbox style={{ marginLeft: '20px' }}>
                    Giới hạn IP chấm công
                  </Checkbox>
                  <Checkbox>Chấm công nhân viên</Checkbox>
                  <Checkbox style={{ marginLeft: '20px' }}>
                    Giới hạn IP chấm công
                  </Checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CauHinhChamCong
