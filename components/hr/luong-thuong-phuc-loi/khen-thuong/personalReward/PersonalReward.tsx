import React, { useEffect, useState } from "react";
import styles from "../component/Component.module.css";
import RewardTable from "../component/Component";
import ModalReward from "./modalAddPersonalCompliments/ModalAddReward";
import { GetDataAchievement } from "@/pages/hr/api/luong-thuong-phuc-loi/reward";
import MyPagination from "@/components/hr/pagination/Pagination";
import BodyFrameFooter from "@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer";

export interface PersonalReward { }
export default function PersonalReward({ iconAdd, iconEdit }: any) {
  const [data, setData] = useState<any>();
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [keyWords, setKeyWords] = useState<any>('')
  const [updateData, setUpdateData] = useState<any>()
  const newData = data?.data.slice(0, -1)
  const myPagination = data?.data[data.data.length - 1];

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const handleSearch = (key) => {
    setKeyWords(key)
  }
  const handleUpDateData = (newData) => {
    setUpdateData(newData)
  }

  useEffect(() => {
    const GetDataPersonalReward = async () => {
      const response = await GetDataAchievement(currentPage, 10, 1, keyWords);
      setData(response?.data.data);
    };
    GetDataPersonalReward();
  }, [currentPage, keyWords, updateData]);

  return (
    <>
      <RewardTable
        model="canhan"
        display="block"
        data={newData}
        modal={<ModalReward></ModalReward>}
        keyWords={handleSearch}
        updateData={handleUpDateData}
        iconAdd={iconAdd}
        iconEdit={iconEdit}
      ></RewardTable>

      <div className={`${styles.pagination}`}>
        <MyPagination
          current={currentPage}
          total={myPagination?.tongSoBanGhi}
          pageSize={10}
          onChange={handlePageChange}
        />
      </div>
      <BodyFrameFooter src="https://www.youtube.com/embed/qICTgD7Dt9w"></BodyFrameFooter>
    </>
  );
}
