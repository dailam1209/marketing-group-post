import React, { useEffect, useState } from "react";
import DeletedDataComPonent from "@/components/hr/du-lieu-da-xoa";
import Head from "next/head";
import { getDataAuthentication } from "../api/Home/HomeService";
import PageAuthenticator from "@/components/hr/quyen-truy-cap";
import LoadingSpinner from "@/components/hr/loading";

export default function DeletedData() {
  const [displayIcon, setDisplayIcon] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getDataAuthentication();
        setDisplayIcon(response?.data?.data?.infoRoleDXGD);
        setIsDataLoaded(true); // Move this line here
        setIsLoading(false); // Move this line here
      };
      fetchData();
    } catch (error) { }

  }, []);

  const perIdArray = displayIcon?.map((item) => item.perId);
  const authen = perIdArray?.includes(1);
  const iconAdd = perIdArray?.includes(2);
  const iconEdit = perIdArray?.includes(3);
  const iconDelete = perIdArray?.includes(4);
  return (
    <>
      <Head><title>HR - Quản lý nhân sự - Timviec365.vn</title></Head>
      {!isDataLoaded ? (
        <LoadingSpinner />
      ) : authen ? (
        <DeletedDataComPonent iconEdit={iconEdit} iconDelete={iconDelete}></DeletedDataComPonent>
      ) : (
        <PageAuthenticator />
      )}
    </>
  )
}