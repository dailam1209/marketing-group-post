import React, { useEffect, useState } from "react";
import RewardTable from "../component/Component";
import styles from "../component/Component.module.css";
import { SignIn } from "@/pages/api/Home/HomeService";
import { GetDataAchievement } from "@/pages/api/luong-thuong-phuc-loi/reward";
import MyPagination from "@/components/pagination/Pagination";
import BodyFrameFooter from "@/components/bodyFrame/bodyFrame_footer/bodyFrame_footer";

export interface AchievementList {}
export default function AchievementList({ iconEdit }: any) {
  const [data, setData] = useState<any>();
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [keyWords, setKeyWords] = useState<any>("");
  const newData = data?.data.slice(0, -1);
  const myPagination = data?.data[data.data.length - 1];
  useEffect(() => {
    SignIn();
  }, []);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleSearch = (key) => {
    setKeyWords(key);
  };
  useEffect(() => {
    const GetDataPersonalReward = async () => {
      const response = await GetDataAchievement(currentPage, 10, 3, keyWords);
      setData(response?.data.data);
    };
    GetDataPersonalReward();
  }, [currentPage, keyWords]);

  return (
    <>
      <RewardTable
        model="list"
        display="none"
        data={newData}
        modal={<></>}
        keyWords={handleSearch}
        iconEdit = {iconEdit}
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
