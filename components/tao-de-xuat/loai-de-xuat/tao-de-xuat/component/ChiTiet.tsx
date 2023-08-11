import Image from 'next/image'

import styles from './ChiTiet.module.css'
import { Button, Form, Input, Select, Upload } from 'antd'

export const GroupButton = (
  admin: boolean,
  active: boolean,
  companyAcp: boolean,
  id1?: boolean,
  id2?: boolean,
  overtime?: boolean,
  typeRef?: any,
  dimensions?: any,
  className?: any,
  deny?: boolean
) => {
  return (
    <>
      {!admin && active && (
        <div className={styles[`${className}`]}>
          <div className={styles.acceptText}>
            <Image
              src={'/approveNew.png'}
              alt=''
              width={20}
              height={20}></Image>
            <p>Đã chấp thuận</p>
          </div>
          {!companyAcp && (
            <div className={styles.companyAcceptText}>
              <Image
                src={'/abortNew.png'}
                alt=''
                width={20}
                height={20}></Image>
              <p>Đang chờ công ty duyệt !</p>
            </div>
          )}
        </div>
      )}
      {admin && (
        <div className={styles[`${className}`]}>
          {overtime || deny ? (
            deny ? (
              <div className={styles.overTimeText} style={{ width: '100%' }}>
                <Image
                  src={'/clearCircle-red.png'}
                  alt=''
                  width={20}
                  height={20}></Image>
                <p>Đã từ chối</p>
              </div>
            ) : (
              <div className={styles.overTimeText}>
                <Image
                  src={'/clearCircle-red.png'}
                  alt=''
                  width={20}
                  height={20}></Image>
                <p>Đề xuất quá hạn duyệt</p>
              </div>
            )
          ) : (
            <>
              {id1 && id2 ? (
                <>
                  <div className={styles.acceptText} ref={typeRef}>
                    <Image
                      src={'/approveNew.png'}
                      alt=''
                      width={20}
                      height={20}></Image>
                    <p>Đã chấp thuận</p>
                  </div>
                  {!companyAcp && (
                    <div className={styles.companyAcceptText}>
                      <Image
                        src={'/abortNew.png'}
                        alt=''
                        width={20}
                        height={20}></Image>
                      <p>Đang chờ công ty duyệt !</p>
                    </div>
                  )}
                  <Button
                    className={styles.clearButton}
                    style={{
                      width: !companyAcp ? `${dimensions.width}px` : '100%',
                    }}>
                    <Image
                      src={'/clearCircle.png'}
                      alt=''
                      width={20}
                      height={20}></Image>
                    <p>Hủy duyệt</p>
                  </Button>
                </>
              ) : (
                <>
                  <Button className={styles.acceptButton}>
                    <Image
                      src={'/checkCircle.png'}
                      alt=''
                      width={20}
                      height={20}></Image>
                    <p>Chấp thuận</p>
                  </Button>
                  <Button className={styles.clearButton}>
                    <Image
                      src={'/clearCircle.png'}
                      alt=''
                      width={20}
                      height={20}></Image>
                    <p>Từ chối</p>
                  </Button>
                </>
              )}
            </>
          )}
          <Button
            className={styles.clearButton}
            style={{
              width:
                overtime || companyAcp
                  ? !overtime
                    ? '100%'
                    : 'fit-content'
                  : dimensions.width == 0
                  ? '100%'
                  : `${dimensions.width}px`,
            }}>
            <Image
              src={'/clearCircle.png'}
              alt=''
              width={20}
              height={20}></Image>
            <p>Xóa đề xuất</p>
          </Button>
        </div>
      )}
    </>
  )
}

export const MyInputMoney = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string
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
      <Input
        placeholder={placeholder}
        size='large'
        type='number'
        suffix={<p>VNĐ</p>}></Input>
    </Form.Item>
  )
}

export const MyInputFile = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string
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
      <Upload
        className={styles.containerUpload}
        style={{ width: '100%' }}
        showUploadList>
        <div className={styles.upload}>
          <p>{placeholder}</p>
          <Image alt='/' src={'/pon.png'} width={15} height={15} />
        </div>
      </Upload>
    </Form.Item>
  )
}
export const MyTime = (
  title: string,
  required: boolean,
  hasLabel: boolean,
  name: string
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
      <Input
        size='large'
        type='time'
        style={{ border: '1px solid #9F9F9F', width: '100%' }}
      />
    </Form.Item>
  )
}
export const MyDate = (
  title: string,
  required: boolean,
  hasLabel: boolean,
  name: string
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
      <Input
        size='large'
        type='date'
        style={{ border: '1px solid #9F9F9F', width: '100%' }}
      />
    </Form.Item>
  )
}

export const MySelectAcp = (
  title: string,
  placeholder: string,
  required: boolean,
  hasLabel: boolean,
  name: string = '',
  options: Array<any> = [],
  defaultValue?: any
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
      <Select
        size='large'
        placeholder={placeholder}
        defaultValue={defaultValue}
        options={options}
        suffixIcon={
          <Image alt='/' src={'/down-icon.png'} width={14} height={14} />
        }
        mode='multiple'
        style={{
          width: '100%',
          border: '1px solid #9F9F9F',
          borderRadius: '10px',
        }}
      />
    </Form.Item>
  )
}
export function DeXuatCongCongFooter(creat: Function, cancel: Function) {
  return (
    <div className={styles.footer}>
      <Form.Item>
        <Button className={styles.buttonLeft} onClick={() => cancel()}>
          <p>Hủy</p>
        </Button>
      </Form.Item>
      <Form.Item>
        <Button className={styles.buttonRight} onClick={() => creat()}>
          <p>Tạo đề xuất</p>
        </Button>
      </Form.Item>
    </div>
  )
}
