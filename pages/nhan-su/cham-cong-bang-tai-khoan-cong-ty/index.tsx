import Image from 'next/image'
import styles from './index.module.css'
import { Button } from 'antd'
import Webcam from 'react-webcam'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function ChamCongCongTy() {
  const [openCam, setOpenCam] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const videoConstraints = {
    width: 971,
    height: 971,
    facingMode: 'user',
  }

  const webcamRef = useRef<Webcam>(null)
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
  }, [webcamRef])

  useEffect(() => {
    if (openCam) {
      const interval = setInterval(() => {
        if (countdown === 0) {
          console.log('done')
          clearInterval(interval)
        } else {
          setCountdown(countdown - 1)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [countdown, openCam])

  return (
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
          <Webcam
            audio={false}
            height={971}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            width={971}
            videoConstraints={videoConstraints}
          />
          <div
            className={styles.recognizeTxt}
            style={{ display: countdown === 0 ? 'none' : 'flex' }}>
            <p className={styles.txt}>Nhận diện trong {countdown}</p>
          </div>
        </>
      )}
    </div>
  )
}
