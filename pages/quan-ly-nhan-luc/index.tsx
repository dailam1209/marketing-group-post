import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { Row, Col, Card, ConfigProvider } from 'antd'
import Image from 'next/image'
import { useContext, useState, useEffect, createContext } from 'react'
import { THEME_COLOR } from '../../constants/style-constants'
import { LIST_ACTIONS, LIST_ACTIONS_EMP } from '@/constants/home-constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ModalWrapper } from '@/components/modal/ModalWrapper'
import { getCookie } from 'cookies-next'
import { POST_VT } from '../api/BaseApi'

const ConfirmModal = ({
  open,
  setOpen,
  router,
  url,
}: {
  open: boolean
  setOpen: any
  router: any
  url: string
}) => {
  const children = (
    <p style={{ textAlign: 'center' }}>Bạn có muốn tiến hành cài đặt không?</p>
  )

  const onConfirm = () => {
    router?.push(url)
  }

  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    '',
    'Cài đặt',
    onConfirm,
    false
  )
}
export const COOKIE_KEY = 'token_base365'
export default function HomeQLNS() {
  const router = useRouter()
  // const { setHasBanner } = useContext(HasBannerContext)
  const [selectedUrl, setSelectedUrl] = useState('')
  const [openConfirm, setOpenConfirm] = useState(false)
  // setHasBanner(true)
  const [selectedBtn, setSelectedBtn] = useState<any>()
  // set to localStorage
  // getCurrentToken()
  useEffect(() => {
    const value = localStorage.getItem('selectedBtnIndex') || '0'
    setSelectedBtn(value)
  }, [])

  const LIST_BUTTONS_COMP = [
    {
      color: '#97C25F',
      title: 'Chấm Công',
      icon: '/timer.png',
    },
    {
      color: '#FFA13B',
      title: 'Quản lý công ty',
      icon: '/globe.png',
    },
    {
      color: '#FF5B4D',
      title: 'Đề xuất',
      icon: '/checklist.png',
    },
    {
      color: '#8069FF',
      title: 'Cài đặt lương',
      icon: '/database.png',
    },
  ]

  const LIST_BUTTONS_EMP = [
    {
      color: '#97C25F',
      title: 'Chấm Công Bằng QR',
      icon: '/qr-icon.png',
    },
    {
      color: '#FFA13B',
      title: 'Chấm công bằng nhận diện khuôn mặt',
      icon: '/face-icon.png',
    },
    {
      color: '#FF5B4D',
      title: 'Chấm công bằng tài khoản công ty',
      icon: '/desktop-icon.png',
    },
    {
      color: '#8069FF',
      title: 'Tạo đề xuất',
      icon: '/penpaer-icon.png',
    },
    {
      color: '#40B9CC',
      title: 'Lịch sử',
      icon: '/history-icon.png',
    },
  ]

  const utilButton = (
    icon: string,
    index: number,
    title: string,
    color: string
  ) => (
    <Row
      key={index}
      className={styles.singleBtn}
      style={{ borderRight: `8px solid ${color}` }}
      onClick={() => {
        localStorage.setItem('selectedBtnIndex', `${index - 1}`)
        setSelectedBtn(`${index - 1}`)
      }}>
      <Col span={5}>
        <div
          className={styles.indexWithBorder}
          style={{ border: `5px solid ${color}` }}>
          <span className={styles.index}> {index}</span>
        </div>
      </Col>
      <Col
        span={13}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <p
          className={styles.title}
          style={{
            color: `${index - 1}` === selectedBtn ? THEME_COLOR : '#474747',
            // marginLeft: currentRole === ADMIN_ROLE ? '10px' : '0px',
          }}>
          {title}
        </p>
      </Col>
      <Col span={6} className={styles.rightDiv}>
        <div className={styles.verticalDivider}></div>
        <Image alt='' src={icon} width={30} height={30} />
      </Col>
    </Row>
  )

  const step = (
    index: number,
    title: string,
    hasExplain: boolean,
    url: string,
    isButton: boolean = false,
    btnIcon: string = ''
  ) =>
    !isButton ? (
      <div className={styles.singleStep} key={index}>
        <div className={styles.roundIndex}>
          <span className={styles.index}>{index}</span>
        </div>
        <span
          className={styles.title}
          onClick={(e) => {
            if (hasExplain) {
              setSelectedUrl(url)
              setOpenConfirm(true)
            } else {
              router.push(url)
            }
          }}>
          {title}
        </span>
        {hasExplain && (
          <Image
            alt='/'
            src={'/question.png'}
            width={44}
            height={44}
            style={{ marginLeft: '10px' }}
          />
        )}
      </div>
    ) : (
      <div
        className={styles.btnEmp}
        onClick={(e) => {
          if (hasExplain) {
            setSelectedUrl(url)
            setOpenConfirm(true)
          } else {
            router.push(url)
          }
        }}>
        <Image alt='/' src={btnIcon} width={40} height={40} />
        <p className={styles.btnTitle}>{title}</p>
      </div>
    )

  const renderSelection = (type) => {
    const ADMIN = (
      <div>
        <h2 className={styles.headerText}>
          {parseInt(LIST_ACTIONS[selectedBtn]?.key) + 1}.{' '}
          {LIST_ACTIONS[selectedBtn]?.title}
        </h2>
        {LIST_ACTIONS[selectedBtn]?.steps.map((stepData, index1) =>
          step(
            index1 + 1,
            stepData.title,
            stepData?.required,
            `quan-ly-nhan-luc/${stepData.url}`
          )
        )}
      </div>
    )

    const EMP = (
      <div>
        <h2 className={styles.headerText}>
          {parseInt(LIST_ACTIONS_EMP[selectedBtn]?.key) + 1}.{' '}
          {LIST_ACTIONS_EMP[selectedBtn]?.title}
        </h2>
        {LIST_ACTIONS_EMP[selectedBtn]?.steps.map((stepData, index1) =>
          step(
            index1 + 1,
            stepData.title,
            false,
            `quan-ly-nhan-luc/${stepData.url}`,
            parseInt(LIST_ACTIONS_EMP[selectedBtn]?.key) < 2,
            stepData.icon
          )
        )}
      </div>
    )

    return type === '1' ? ADMIN : EMP
  }

  const RenderedBody = () => {
    const type = getCookie('role')
    return (
      <div className={styles.section1}>
        <Row gutter={{ lg: 150, md: 100, sm: 30, xs: 10 }}>
          <Col lg={type === '1' ? 10 : 11} sm={11} xs={24}>
            {(type === '1' ? LIST_BUTTONS_COMP : LIST_BUTTONS_EMP)?.map(
              (item, index) =>
                utilButton(item.icon, index + 1, item.title, item.color)
            )}
          </Col>
          <Col lg={type === '1' ? 14 : 13} sm={13} xs={24}>
            {renderSelection(type)}
          </Col>
        </Row>
        <ConfirmModal
          open={openConfirm}
          setOpen={setOpenConfirm}
          router={router}
          url={selectedUrl}
        />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title> Page Chấm Công </title>
        <meta name='keywords' content='coders' />
      </Head>
      <main>
        <RenderedBody />
      </main>
    </>
  )
}

// export const getServerSideProps = (context) => {
//   const { role } = context?.req?.cookies

//   if (!role) {
//     return {
//       redirect: {
//         destination: '/lua-chon-dang-nhap.html',
//       },
//     }
//   } else {
//     return {
//       props: {},
//     }
//   }
// }
