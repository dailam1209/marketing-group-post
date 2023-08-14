import React, { useEffect, useState } from "react";
import PunishmentTable from "../component/Component";
import MyPagination from "@/pages/hr/components/pagination/Pagination";
import BodyFrameFooter from "@/pages/hr/components/bodyFrame/bodyFrame_footer/bodyFrame_footer";
import styles from "../component/Component.module.css";
import { GetDataInfringes } from "@/pages/hr/api/luong-thuong-phuc-loi/discipline";

export interface CollectiveDiscipline { }
export default function CollectiveDiscipline({ iconAdd, iconEdit }: any) {
  const [data, setData] = useState<any>();
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [keyWords, setKeyWords] = useState<any>("");
  const [updateData, setUpdateData] = useState<any>()
  const newData = data?.data.slice(0, -1);
  const myPagination = data?.data[data.data.length - 1];

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const handleSearch = (key) => {
    setKeyWords(key);
  };
  const handleUpDateData = (newData) => {
    setUpdateData(newData)
  }

  useEffect(() => {
    const GetDataInfringesReward = async () => {
      const response = await GetDataInfringes(currentPage, 10, 2, keyWords);
      setData(response?.data.data);
    };
    GetDataInfringesReward();
  }, [currentPage, keyWords, updateData]);
  return (
    <>
      <PunishmentTable
        model="tapthe"
        display="block"
        data={newData}
        violators="Tập thể vi phạm"
        keyWords={handleSearch}
        updateData={handleUpDateData}
        iconAdd={iconAdd}
        iconEdit={iconEdit}
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
