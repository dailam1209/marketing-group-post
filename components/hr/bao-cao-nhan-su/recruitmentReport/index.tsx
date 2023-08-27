/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import styles from './RecruitmentReport.module.css'
import FirstBlock from '../component/firstBlock/FirstBlock'
import SecondBlock from '../component/secondBlock/SecondBlock'
import MyPagination from '@/components/hr/pagination/Pagination'
import ThirdBlock from '../component/thirdBlock/ThirdBlock'
import FourthBlock from '../component/fourthBlock/FourthBlock'
import BodyFrameFooter from '@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer'
import {
  DetailHRAndAchievements,
  DetailRecruitment,
  GetDataHrReport,
  reportHr,
} from '@/pages/api/api-hr/bao-cao-nhan-su/HrReportService'

export default function RecruitmentReport() {
  const [currentPageBox2, setCurrentPageBox2] = useState(1)
  const [currentPageBox3, setCurrentPageBox3] = useState(1)
  const [currentPageBox4, setCurrentPageBox4] = useState(1)
  const [dataResponse, setDataResponse] = useState<any>()
  const [dataCardSecond, setDataCardSecond] = useState<any>()
  const [dataThird, setDataThird] = useState<any>()
  const [dataFourth, setDataFourth] = useState<any>()

  const handlePageChangeBox2 = (page: any) => {
    setCurrentPageBox2(page)
  }
  const handlePageChangeBox3 = (page: any) => {
    setCurrentPageBox3(page)
  }
  const handlePageChangeBox4 = (page: any) => {
    setCurrentPageBox4(page)
  }



  useEffect(() => {
    try {
      const GetDataRecruitment = async () => {
        const response = await GetDataHrReport()
        setDataResponse(response?.success?.data)
      }
      GetDataRecruitment()
    } catch (error) { }
  }, [])

  const data = [
    {
      id: 1,
      title: 'Tổng số tin tuyển dụng',
      num: dataResponse?.total_new,
      color: '#4C5BD4',
    },
    {
      id: 2,
      title: 'Tổng số hồ sơ nhận được',
      num: dataResponse?.total_candidate_number,
      color: '#4CD4B4',
    },
    {
      id: 3,
      title: 'Tổng số ứng viên cần tuyển',
      num: dataResponse?.total_candidate,
      color: '#D44C4C',
    },
    {
      id: 4,
      title: 'Số ứng viên đến phỏng vấn',
      num: dataResponse?.total_interview,
      color: '#4C5BD4',
    },
    {
      id: 5,
      title: 'Số ứng viên qua phỏng vấn',
      num: dataResponse?.total_interview_pass,
      color: '#4CD4B4',
    },
    {
      id: 6,
      title: 'Số ứng viên hủy',
      num: dataResponse?.total_cancel,
      color: '#D44C4C',
    },
  ]

  useEffect(() => {
    try {
      const GetDataRecruitment = async () => {
        const response = await DetailRecruitment(currentPageBox2, 10)
        setDataCardSecond(response?.success?.data)
      }
      GetDataRecruitment()
    } catch (error) { }
  }, [currentPageBox2])

  useEffect(() => {
    try {
      const GetDataRecruitment = async () => {
        const response = await reportHr(currentPageBox2, 10)
        setDataThird(response?.success?.data)
      }
      GetDataRecruitment()
    } catch (error) { }
  }, [currentPageBox3])

  useEffect(() => {
    try {
      const GetDataRecruitment = async () => {
        const response = await DetailHRAndAchievements(currentPageBox4, 10)
        setDataFourth(response?.success?.data)
      }
      GetDataRecruitment()
    } catch (error) { }
  }, [currentPageBox4])

  return (
    <>
      <div className={`${styles.row}`} style={{ marginTop: '45px' }}>
        <FirstBlock listcard={data}></FirstBlock>
      </div>

      <div className={`${styles.div_bc}`} style={{ margin: '0' }}>
        <div className={`${styles.div_bc_header}`}>
          <p>Báo cáo chi tiết theo tin tuyển dụng</p>
        </div>

        <div className={`${styles.div_bc_body}`}>
          <table className={`${styles.table}`} style={{ width: '100%' }}>
            <thead>
              <tr style={{ color: '#4C5BD4' }}>
                <th>Mã tin tuyển dụng</th>
                <th>Tổng số ứng viên</th>
                <th>Số ứng viên đến phỏng vấn</th>
                <th>Số ứng viên nhận việc</th>
                <th>Số ứng viên hủy</th>
              </tr>
            </thead>
            <tbody className={`${styles.t_body_dom}`}>
              <SecondBlock listCardSecond={dataCardSecond}></SecondBlock>
            </tbody>
          </table>
          <div className={`${styles.pagination}`}>
            <MyPagination
              current={currentPageBox2}
              total={dataCardSecond?.total}
              pageSize={10}
              onChange={handlePageChangeBox2}
            />
          </div>
        </div>
      </div>

      <div className={`${styles.div_bc}`} style={{ marginTop: '84px' }}>
        <div className={`${styles.div_bc_header}`}>
          <p>Báo cáo thống kê theo nhân viên tuyển dụng</p>
        </div>

        <div className={`${styles.div_bc_body}`}>
          <table className={`${styles.table}`} style={{ width: '100%' }}>
            <thead>
              <tr style={{ color: '#4C5BD4' }}>
                <th>STT</th>
                <th>Tên nhân viên</th>
                <th>Số tin tuyển dụng đang theo dõi</th>
                <th>Số hồ sơ nhận được</th>
              </tr>
            </thead>
            <tbody className={`${styles.t_body_dom}`}>
              <ThirdBlock listCardThird={dataThird} total={currentPageBox3}></ThirdBlock>
            </tbody>
          </table>
          <div className={`${styles.pagination}`}>
            <MyPagination
              current={currentPageBox3}
              total={dataThird?.total}
              pageSize={10}
              onChange={handlePageChangeBox3}
            />
          </div>
        </div>
      </div>

      <div className={`${styles.div_bc}`} style={{ marginTop: '84px' }}>
        <div className={`${styles.div_bc_header}`}>
          <p>
            Báo cáo chi tiết theo nhân viên giới thiệu ứng viên và tiền thưởng
            trực tiếp
          </p>
        </div>

        <div className={`${styles.div_bc_body}`}>
          <table className={`${styles.table}`} style={{ width: '100%' }}>
            <thead>
              <tr style={{ color: '#4C5BD4' }}>
                <th>STT</th>
                <th>Tên nhân viên giới thiệu</th>
                <th>Số ứng viên giới thiệu</th>
              </tr>
            </thead>
            <tbody className={`${styles.t_body_dom}`}>
              <FourthBlock listCardFourth={dataFourth}></FourthBlock>
            </tbody>
          </table>
          <div className={`${styles.pagination}`}>
            <MyPagination
              current={currentPageBox4}
              total={dataFourth?.total}
              pageSize={10}
              onChange={handlePageChangeBox4}
            />
          </div>
        </div>
      </div>
      <BodyFrameFooter src='https://www.youtube.com/embed/ByFmUJ-4prs'></BodyFrameFooter>
    </>
  )
}
