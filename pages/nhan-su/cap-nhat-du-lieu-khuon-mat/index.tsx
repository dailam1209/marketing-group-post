import styles from './index.module.css'
import { Button } from 'antd'
import Webcam from 'react-webcam'
import { useCallback, useEffect, useRef, useState } from 'react'
import { POST, getCurrentToken } from '../api/BaseApi'
// import Image as IMG from 'next/image'
import axios from 'axios'

export default function UpdateFace() {
  const [openCam, setOpenCam] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const videoConstraints = {
    width: 971,
    height: 971,
    facingMode: 'user',
  }

  const webcamRef = useRef<Webcam>(null)

  const imgSrcToFile = async (dataUrl) => {
    const res: Response = await fetch(dataUrl)
    const blob: Blob = await res.blob()
    return new File([blob], 'update_face', { type: 'image/png' })
  }

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    const currToken = getCurrentToken()

    if (currToken) {
      try {
        // const res = await axios.post(
        //   'http://43.239.223.147:5001/verify_web_company',
        //   {
        //     company_id: 3312,
        //     image: imageSrc,
        //   }
        // )

        // console.log(res)
        const fd = new FormData()
        if (imageSrc) {
          const file = await imgSrcToFile(imageSrc)
          fd.append('id_ep', '998776')
          fd.append('arr_featured', '1')
          fd.append('logo', file)

          const res = await axios.post(
            'https://chamcong.24hpay.vn/service/update_featured_recognition.php',
            fd,
            {
              headers: {
                Authorization: `Bearer ${currToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          )

          console.log(res)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }, [webcamRef])

  useEffect(() => {
    if (openCam) {
      const interval = setInterval(() => {
        if (countdown === 0) {
          capture()
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
          <img
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
            }}>
            <Webcam
              audio={false}
              height={971}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              width={971}
              videoConstraints={videoConstraints}
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
  )
}
