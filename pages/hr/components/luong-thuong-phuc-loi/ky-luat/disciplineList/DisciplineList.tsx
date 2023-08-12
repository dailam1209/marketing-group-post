import React, { useEffect, useState } from "react";
import PunishmentTable from "../component/Component";
import { GetDataInfringes } from "@/pages/api/luong-thuong-phuc-loi/discipline";
import MyPagination from "@/components/pagination/Pagination";
import BodyFrameFooter from "@/components/bodyFrame/bodyFrame_footer/bodyFrame_footer";
import styles from "../component/Component.module.css";

export interface DisciplineList {}
export default function DisciplineList({iconEdit }: any) {
  const [data, setData] = useState<any>();
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [keyWords, setKeyWords] = useState<any>("");
  const newData = data?.data.slice(0, -1);
  const myPagination = data?.data[data.data.length - 1];

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const handleSearch = (key) => {
    setKeyWords(key);
  };

  useEffect(() => {
    const GetDataInfringesReward = async () => {
      const response = await GetDataInfringes(currentPage, 10, 3, keyWords);
      setData(response?.data.data);
    };
    GetDataInfringesReward();
  }, [currentPage, keyWords]);

  return (
    <>
      <PunishmentTable
        model="list"
        display="none"
        data={newData}
        violators="Cá nhân / phòng ban vi phạm"
        keyWords={handleSearch}
        iconEdit = {iconEdit}
      ></PunishmentTable>
      <div className={`${styles.pagination}`}>
        <MyPagination
          current={currentPage}
          total={myPagination?.tongSoBanGhi}
          pageSize={10}
          onChange={handlePageChange}
        />
      </div>
      <BodyFrameFooter src="https://www.youtube.com/embed/kjiQgo3VtLo"></BodyFrameFooter>
    </>
  );
}
