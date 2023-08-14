import Image from 'next/image'
import styles from './index.module.css'
import { Button } from 'antd'
import Webcam from 'react-webcam'
import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { COOKIE_KEY } from '..'
import jwtDecode from 'jwt-decode'
import Head from 'next/head'

export default function ChamCongCongTy() {
  const [openCam, setOpenCam] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const videoConstraints = {
    width: 971,
    height: 971,
    facingMode: 'user',
  }

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
        const res = await axios.post(
          'http://43.239.223.154:8081/',
          {
            company_id: 3312,
            image: imageSrc?.split(',')?.[1],
            // image: imageSrc,
          },
          {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
          }
        )
      } catch (err) {
        console.log(err)
      }
    }
  }, [webcamRef])

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
  }, [countdown, openCam])

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
    </>
  )
}
