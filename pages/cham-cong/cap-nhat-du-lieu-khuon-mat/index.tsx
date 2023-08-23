import styles from './index.module.css'
import { Button, Col, Row } from 'antd'
import Webcam from 'react-webcam'
import { useCallback, useEffect, useRef, useState } from 'react'
// import Image as IMG from 'next/image'
import axios from 'axios'
import { POST, getCurrentToken } from '@/pages/api/BaseApi'
import jwtDecode from 'jwt-decode'
import _ from 'lodash'
import Image from 'next/image'

export default function UpdateFace() {
  const [listImgs, setListImgs] = useState<any[]>([])

  console.log(listImgs)

  const sendRecog = async () => {
    try {
      const image = []

      listImgs &&
        listImgs?.forEach((item) => {
          image.push(item?.split(',')?.[1])
        })

      const currToken = getCurrentToken()

      if (currToken) {
        const decoded = jwtDecode(currToken)

        const comp_id = decoded?.['data']?.com_id
        const user_id = decoded?.['data']?.idQLC

        if (comp_id && user_id && image) {
          const imgData = `[${image?.toString()}]`
          const fd = new FormData()
          fd.append('company_id', comp_id)
          fd.append('user_id', user_id)
          fd.append('image', imgData)
          fd.append('isAndroid', 'false')
          const res = await axios.post(
            'http://43.239.223.154:8081/updateFace',
            fd,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          )

          if (res?.data?.data) {
            window.alert(res?.data?.message)
          }

          //send req to base new
          const resp = await POST('api/qlc/face/request', {})
        }
      }
    } catch (error) {}
  }

  return (
    <Row>
      <Col lg={12} sm={24} xs={24}>
        <div className={styles.main}>
          <MyWebcam list={listImgs} setList={setListImgs} />
        </div>
      </Col>
      <Col lg={12} sm={24} xs={24}>
        <div
          style={{
            marginLeft: 'auto',
          }}>
          {!_.isEmpty(listImgs) && (
            <>
              {listImgs?.map((item, indx) => (
                <Image
                  key={indx}
                  alt='/'
                  src={item}
                  width={120}
                  height={100}
                  style={{ marginRight: '10px' }}
                />
              ))}
            </>
          )}
          {listImgs?.length === 5 && (
            <Button
              style={{
                marginTop: 'auto',
              }}
              onClick={sendRecog}>
              Cập nhật khuôn mặt
            </Button>
          )}
        </div>
      </Col>
      <Col span={24}></Col>
    </Row>
  )
}

const MyWebcam = ({ list, setList }: { list: any[]; setList: any }) => {
  const webcamRef = useRef<Webcam>(null)

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    console.log(imageSrc)

    if (list?.length === 5) {
      console.log(list)

      setList([...list?.slice(0, -1), imageSrc])
    } else {
      setList([...list, imageSrc])
    }
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <Webcam
          className={styles.webcamCapture}
          audio={false}
          // height={971}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          // width={971}
          videoConstraints={
            {
              // aspectRatio: 1,
              // height: 500,
            }
          }
        />
      </div>
      <div>
        <Button
          size='large'
          style={{ marginBottom: '50px' }}
          onClick={(e) => {
            e.preventDefault()
            capture()
          }}>
          Chụp ảnh
        </Button>
      </div>
    </>
  )
}
