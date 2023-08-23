import Image from 'next/image'
import styles from './index.module.css'
import { Button, Modal, Spin } from 'antd'
import Webcam from 'react-webcam'
import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import jwtDecode from 'jwt-decode'
import Head from 'next/head'
import { POST, getCompIdCS } from '@/pages/api/BaseApi'
import _ from 'lodash'
import { COOKIE_KEY } from '../..'
import { useRouter } from 'next/router'

export default function ChamCongCongTy() {
  const router = useRouter()
  const [openCam, setOpenCam] = useState(false)
  const [undetectedModal, setUndetectedModal] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [userData, setUserData] = useState<any>()
  const [modalDetail, setModalDetail] = useState(false)
  const [modalDetailCC, setModalDetailCC] = useState(false)
  const [reload, setReload] = useState(false)
  const [listCa, list_ca] = useState()
  const [id, setId] = useState()
  const [lat, setLat] = useState<Number>()
  const [long, setLong] = useState<Number>()
  const [ip, setIp] = useState()
  const [selectedCa, setSelectedCa] = useState()
  const videoConstraints = {
    width: 971,
    height: 971,
    facingMode: 'user',
  }

  useEffect(() => {
    fetch('https://geolocation-db.com/json/')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        setIp(data.IPv4)
        setLong(data.longitude)
        setLat(data.latitude)
      })
      .catch((error) => console.log(error))
  }, [])

  const [listDevices, setListDevices] = useState<any[]>()

  const webcamRef = useRef<Webcam>(null)
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot({
      height: 300,
      width: 300,
    })

    let comId = ''
    const acc_token = getCookie(COOKIE_KEY)

    if (acc_token) {
      const decoded: any = jwtDecode(acc_token?.toString())

      comId = decoded?.data?.com_id
    }
    // console.log(comId)
    if (comId && imageSrc) {
      try {
        const res: any = await axios.post(
          // 'http://43.239.223.154:8081/',
          `${process.env.NEXT_PUBLIC_API}/api/qlc/ai/detectFace`,
          {
            company_id: comId,
            image: imageSrc,
            // image: imageSrc,
          },
          {
            headers: {
              // 'Content-type': 'application/x-www-form-urlencoded',
              'Content-Type': 'application/json',
            },
          }
        )
        const resp = res?.data?.data

        if (
          !resp?.user_id ||
          resp?.user_id === 'Unknown' ||
          resp?.user_id === 'Undetected'
        ) {
          setUndetectedModal(true)
        } else {
          setId(resp?.user_id)
          const token = getCookie(COOKIE_KEY)
          let compId: any = ''
          if (token) {
            console.log(jwtDecode(token?.toString()))
            compId = jwtDecode(token?.toString())?.['data']?.['com_id']
          }

          const resdata = await POST('api/qlc/shift/list_shift_user', {
            u_id: parseInt(resp?.user_id),
            c_id: comId,
          })

          // const respDetail = resdata?.data
          console.log(resdata)

          if (resdata?.result) {
            setUserData({
              ep_name: resdata?.ep_name,
              shift: resdata?.shift,
            })
            setModalDetail(true)
          } else {
            setModalDetail(false)
            setUndetectedModal(true)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }, [webcamRef])
  console.log(id)

  useEffect(() => {
    if (openCam) {
      const interval = setInterval(() => {
        if (countdown === 0) {
          try {
            capture()
          } catch (error) {}

          clearInterval(interval)
        } else {
          setCountdown(countdown - 1)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
    // }
  }, [countdown, openCam, reload])
  console.log(userData)

  const diemdanh = async () => {
    const res = await POST('api/qlc/timekeeping/create/webComp', {
      wifi_ip: ip,
      shift_id: selectedCa,
      type: 2,
      idQLC: id,
    })

    if (res?.result) {
      alert('Điểm danh thành công')
      setSelectedCa(undefined)
      setReload(!reload)
      setModalDetailCC(false)
    }
  }

  return (
    <>
      <div className={styles.main}>
        {!openCam ? (
          <div className={styles.divWrapper}>
            <Image
              src={'/scan-face.png'}
              width={300}
              height={287}
              alt='/'
              style={{ marginTop: '50px' }}
            />
            <p style={{ color: '#fff', margin: '20px 0px' }}>
              Vui lòng hướng khuôn mặt theo khung trên màn hình, nhìn thẳng và
              xoay nhẹ sang 2 bên để nhận được kết quả tốt nhất
            </p>
            <Button
              size='large'
              className={styles.startBtn}
              onClick={() => setOpenCam(true)}>
              <p style={{ color: '#fff', padding: '0px 20px' }}> Bắt đầu</p>
            </Button>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <Webcam
                audio={false}
                // height={971}
                className={styles.webcamCapture}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                // width={971}
                videoConstraints={{}}
              />
            </div>
            <div
              className={styles.recognizeTxt}
              style={{ display: countdown === 0 ? 'none' : 'flex' }}>
              <p className={styles.txt}>Nhận diện trong {countdown}</p>
            </div>
          </>
        )}
      </div>
      <Modal
        centered
        width={700}
        closable={false}
        open={undetectedModal}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}>
        <div
          style={{
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Image alt='/' src={'/err-x.png'} width={120} height={120} />
          <p
            style={{
              fontSize: '22px',
              marginTop: '20px',
              color: 'red',
              textAlign: 'center',
            }}>
            Dữ liệu khuôn mặt không hợp lệ! Vui lòng chấm công lại hoặc liên hệ
            với kỹ thuật để biết thêm !
          </p>
          <div style={{ marginTop: '20px' }}>
            <Button
              className={styles.btnOk}
              size='large'
              onClick={() => router.push('/')}>
              <p style={{ color: '#fff' }}>Trang chủ</p>
            </Button>
            <Button
              size='large'
              className={styles.btnCancel}
              onClick={() => {
                setUndetectedModal(false)
                setReload(!reload)
              }}>
              <p style={{ color: '#fff' }}>Tiếp tục chấm công</p>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        width={700}
        closable={false}
        open={modalDetail}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}>
        <div
          style={{
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Image alt='/' src={'/check-tc.png'} width={120} height={120} />
          <p style={{ fontSize: '22px', marginTop: '20px' }}>
            Xin chào bạn có phải là
          </p>
          <p style={{ fontSize: '25px', color: '#4C5BD4' }}>
            {userData && userData?.ep_name}
          </p>
          <div style={{ marginTop: '20px' }}>
            <Button
              className={styles.btnOk}
              size='large'
              onClick={() => {
                setModalDetail(false)
                setModalDetailCC(true)
              }}>
              <p style={{ color: '#fff' }}>Là tôi, tiếp tục chấm công</p>
            </Button>
            <Button
              size='large'
              className={styles.btnCancel}
              onClick={() => {
                setModalDetail(false)
                setReload(!reload)
              }}>
              <p style={{ color: '#fff' }}>Không phải là tôi</p>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        centered
        width={700}
        closable={false}
        open={modalDetailCC}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}>
        <div
          style={{
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <div>
            <div>
              <div className={styles.wrapper2}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    alt='/'
                    src={'/tdo.png'}
                    width={24}
                    height={21}
                    style={{ marginRight: '10px' }}
                  />
                  <p className={styles.txt}>Địa chỉ IP: {ip}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    alt='/'
                    src={'/ip.png'}
                    width={24}
                    height={21}
                    style={{ marginRight: '10px' }}
                  />
                  <p className={styles.txt}>{` Tọa độ: ${long}, ${lat}`}</p>
                </div>
              </div>
            </div>
            {userData &&
              userData?.shift?.map((item) => (
                <div
                  className={styles.wrapper}
<<<<<<< HEAD
                  onClick={() =>
                    setSelectedCa(!selectedCa ? item?.shift_id : '')
                  }>
                  <p
                    className={styles.txt}
                    style={{
                      color: selectedCa === item?.shift_id ? 'blue' : '#000',
                      fontWeight:
                        selectedCa === item?.shift_id ? 'bold' : '500',
                    }}>
                    {item?.shift_name}
                  </p>
                  <p
                    className={styles.txt}
                    style={{
                      color: selectedCa === item?.shift_id ? 'blue' : '#000',
                      fontWeight:
                        selectedCa === item?.shift_id ? 'bold' : '500',
                    }}>
=======
                  onClick={() => setSelectedCa(item?.shift_id)}>
                  <p className={styles.txt}>{item?.shift_name}</p>
                  <p className={styles.txt}>
>>>>>>> 4e8e783 (fix bugs)
                    {item?.start_time} đến {item?.end_time}
                  </p>
                </div>
              ))}
          </div>
          <div style={{ marginTop: '20px' }}>
            <Button className={styles.btnClear} size='large'>
              <p style={{ color: '#4c5bd4' }}>Trang chủ</p>
            </Button>
            <Button size='large' className={styles.btnOk1} onClick={diemdanh}>
              <p style={{ color: '#fff' }}>Điểm danh</p>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
