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