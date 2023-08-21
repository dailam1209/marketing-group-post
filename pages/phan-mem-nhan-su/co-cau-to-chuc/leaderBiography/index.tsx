/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import styles from './leaderBiography.module.css'
import BodyFrameFooter from '@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer'
import { LeaderBiographyList } from '@/pages/api/api-hr/co_cau_to_chuc'
import MyPagination from '@/components/hr/pagination/Pagination'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function LeaderBiography({ iconAdd, iconEdit }) {
  const [currentPageSignature, setCurrentPageSignature] = useState<any>(1)
  const [signaturelList, setSignatureList] = useState<any>(null)
  const [isKeywords, setIsKeywords] = useState<any>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pagesize: any = 5
        const formData = new FormData()
        formData.append('keyword', isKeywords)
        formData.append('page', currentPageSignature)
        formData.append('pageSize', pagesize)
        const response = await LeaderBiographyList(formData)
        setSignatureList(response?.data)
      } catch (error) { }
    }
    fetchData()
  }, [currentPageSignature, isKeywords])

  const handlePageChange = (page: number) => {
    setCurrentPageSignature(page)
  }

  return (
    <>
      <Head>
        <title>Danh sách lãnh đạo - Quản lý nhân sự - Timviec365.vn</title>
      </Head>
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.content}`}>
          <div className={`${styles.content_header}`}>
            <div className={`${styles.header_search}`}>
              <div className={`${styles.row_search_1}`}>
                <div className={`${styles.row_search_2}`}>
                  <input
                    type='text'
                    onChange={(event) => setIsKeywords(event.target.value)}
                    id='search_list'
                    className={`${styles.ui_autocomplete_input}`}
                    placeholder='Tìm kiếm theo họ tên lãnh đạo'
                  />
                  <a href='' className={`${styles.search_3}`}>
                    <img
                      style={{ verticalAlign: 'middle' }}
                      src={`/search-gray.svg`}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.content_body}`}>
            <div
              className={`${styles.member_list} ${styles.member_list_salary}`}>
              <div className={`${styles.table_content}`}>
                <table className={`${styles.table} ${styles.table_list}`}>
                  <thead>
                    <tr>
                      <th>Ảnh</th>
                      <th>Họ và tên</th>
                      <th>Chức vụ</th>
                      <th>Phòng ban</th>
                      <th>Tổ</th>
                      <th>Nhóm</th>
                    </tr>
                  </thead>
                  <tbody className={`${styles.filter_body}`}>
                    {signaturelList?.infoLeaderAfter?.length ? (
                      signaturelList?.infoLeaderAfter?.map(
                        (item: any, index: any) => (
                          <tr key={index}>
                            <td>
                              <img
                                className={`${styles.img_table}`}
                                src={item?.avatarUser}
                                alt=''
                              />
                            </td>
                            <td style={{ color: '#4C5BD4', cursor: 'pointer' }}>
                              {/* <a target='blank ' href={`/co-cau-to-chuc/leaderBiography/chi-tiet-lanh-dao/${item._id}`} rel="noreferrer" iconEdit = {iconEdit} iconAdd = {iconAdd}>{item?.userName} ( Xem chi tiết)</a> */}
                              <Link
                                legacyBehavior
                                href={{
                                  pathname: `/phan-mem-nhan-su/co-cau-to-chuc/leaderBiography/chi-tiet-lanh-dao/${item._id}`,
                                }}
                                as={`/phan-mem-nhan-su/co-cau-to-chuc/leaderBiography/chi-tiet-lanh-dao/${item._id}`}
                                passHref>
                                <a target='blank' style={{ color: '#4C5BD4' }}>
                                  {item?.userName} (Xem chi tiết)
                                </a>
                              </Link>
                            </td>
                            <td>{item?.namePosition}</td>
                            <td>{item?.dep_name}</td>
                            <td>{item?.team_name}</td>
                            <td>{item?.group_name}</td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan={6}>Danh sách trống</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.paginations}`} style={{ display: 'block' }}>
          <MyPagination
            current={currentPageSignature}
            total={signaturelList?.total}
            pageSize={5}
            onChange={handlePageChange}
          />
        </div>
        <div className={`${styles.content_footer}`}>
          <BodyFrameFooter src='https://www.youtube.com/embed/fp99RxHd_zM' />
        </div>
      </div>
    </>
  )
}
