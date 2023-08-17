import React, { useEffect, useState } from 'react'
import RewardTable from '../component/Component'
import styles from '../component/Component.module.css'
import MyPagination from '@/components/hr/pagination/Pagination'
import BodyFrameFooter from '@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer'
import ModalAddTeamCompliments from './modalAddTeamCompliments/modalAddTeamCompliments'
import { GetDataAchievement } from '@/pages/api/api-hr/luong-thuong-phuc-loi/reward'

export interface CommendationTeam {}
export default function CommendationTeam({ iconAdd, iconEdit }: any) {
  const [data, setData] = useState<any>()
  const [currentPage, setCurrentPage] = useState<any>(1)
  const [keyWords, setKeyWords] = useState<any>('')
  const newData = data?.data.slice(0, -1)
  const myPagination = data?.data[data.data.length - 1]

  const handlePageChange = (page: any) => {
    setCurrentPage(page)
  }

  const handleSearch = (key) => {
    setKeyWords(key)
  }
  useEffect(() => {
    const GetDataPersonalReward = async () => {
      const response = await GetDataAchievement(currentPage, 10, 2, keyWords)
      setData(response?.data.data)
    }
    GetDataPersonalReward()
  }, [currentPage, keyWords])

  return (
    <>
      <RewardTable
        model='tapthe'
        display='block'
        data={newData}
        modal={<ModalAddTeamCompliments></ModalAddTeamCompliments>}
        keyWords={handleSearch}
        iconAdd={iconAdd}
        iconEdit={iconEdit}></RewardTable>
      <div className={`${styles.pagination}`}>
        <MyPagination
          current={currentPage}
          total={myPagination?.tongSoBanGhi}
          pageSize={10}
          onChange={handlePageChange}
        />
      </div>
      <BodyFrameFooter src='https://www.youtube.com/embed/qICTgD7Dt9w'></BodyFrameFooter>
    </>
  )
}
