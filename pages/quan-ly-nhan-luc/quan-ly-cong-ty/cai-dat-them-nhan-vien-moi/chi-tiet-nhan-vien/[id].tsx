import { useRouter } from 'next/router'
import styles from './index.module.css'
import { Button, Card, Col, Row, Upload } from 'antd'
import Image from 'next/image'
import { POST, POST_SS } from '@/pages/api/BaseApi'

export default function ChiTietNhanVien({ data }) {
  console.log(data)

  const router = useRouter()
  const param = router.query
  const SingleItem = ({ title, data }: { title: string; data: string }) => {
    return (
      <div className={styles.singleItem}>
        <p className={styles.itemTitle}>{title}:</p>
        <p>{data}</p>
      </div>
    )
  }

  const onEditClicked = () => {
    // const splitted = router.pathname?.split("/")?.slice(0, -1)

    // let pathname = ""
    // splitted?.forEach(
    //   (item, index) => (pathname += index !== item?.length ? `${item}/` : item)
    // )
    router.push(
      `/quan-ly-nhan-luc/quan-ly-cong-ty/cai-dat-them-nhan-vien-moi/chinh-sua-thong-tin/${param?.id}`
    )
  }
  return (
    <div className={styles.cardWrapper}>
      <Card className={styles.card}>
        <div className={styles.wrapper}>
          <div className={styles.leftSection}>
            <div className={styles.avatar}>
              <Image alt='/' src={'/ava-detail.png'} width={200} height={200} />
              <Upload
                maxCount={1}
                onChange={(data: any) => {
                  console.log(data)
                }}
                showUploadList={false}>
                <span className={styles.editAvatar}>
                  <Image
                    src={'/editAvatar.png'}
                    alt=''
                    width={20}
                    height={20}></Image>
                </span>
              </Upload>
            </div>
            <p className={styles.id}>ID - {param?.id}</p>
          </div>
          <div className={styles.rightSection}>
            <p className={styles.name}>{data?.userName || 'Chưa cập nhật'}</p>
            <p className={styles.companyName}>
              {data?.companyName?.userName || 'Chưa cập nhật'}
            </p>
            <SingleItem
              data={data?.nameDeparment || 'Chưa cập nhật'}
              title='Phòng ban'
            />
            <SingleItem
              data='Chưa có kinh nghiệm'
              title='Kinh nghiệm làm việc'
            />
            <SingleItem data='05-06-2023' title='Ngày bắt đầu làm việc' />
            <SingleItem data='abc@gmail.com' title='Địa chỉ email' />
            <SingleItem data='0183128312' title='Số điện thoại' />
            <SingleItem data='13-06-1997' title='Ngày sinh' />
            <SingleItem data='Nữ' title='Giới tính' />
            <SingleItem
              data='Số 3, Hoàng Quốc Việt, Cầu Giấy, Hà Nội'
              title='Địa chỉ'
            />
            <SingleItem data='Độc thân' title='Tình trạng hôn nhân' />
            <div className={styles.footer}>
              <Button className={styles.btn} size='large'>
                <p className={styles.text} onClick={onEditClicked}>
                  Chỉnh sửa thông tin
                </p>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  let data = {}
  const idQLC = context.query.id
  const res = await POST_SS(
    'api/qlc/employee/info',
    {
      idQLC: idQLC,
    },
    context
  )

  if (res?.result) {
    data = res?.data
  }

  return {
    props: {
      data: data,
    },
  }
}
