import React, { useState, useEffect } from "react";
import { fetchNoiGui, fetch_list_employs } from "@/utils/ShareApi";
import { fetchData, fetchListSoVB } from "@/utils/BaseApi";
import { parse } from "cookie";

import Text_come from "@/components/VanThu/management_dispatch/text_come/Text_come";
const Index = ({ data }: any) => {
  const [listItemsNew, setListItemNews] = useState<any>([]);
  useEffect(() => {
    const fetchListItems = async () => {
      const list_emps = await fetch_list_employs();
      if (data) {
        const updatedList = await Promise.all(
          data?.data?.db_qr.map(async (user: any) => {
            const name_book = await fetchListSoVB(user?.cv_id_book);
            const location = await fetchNoiGui(user?.cv_phong_soan);
            const name_user_save = list_emps?.find(
              (item: any) => item._id === user?.cv_user_save
            )?.userName;
            return { ...user, name_book, location, name_user_save };
          })
        );
        setListItemNews(updatedList);
      }
    };
    fetchListItems();
  }, [data]);

  return <Text_come data={listItemsNew} total_vb={data?.data?.count} />;
};

export default Index;

export async function getServerSideProps(context: {
  req: { headers: { cookie: any } };
}) {
  try {
    const cookies = parse(context.req.headers.cookie || "");
    const token = `${cookies.token_first}${cookies.token_hafl}`;
    const currentPage = `${cookies.pageVBden}`;
    const ItemsPerPage = `${cookies.pageSizeVBden}`;
    if (!token) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }

    const data = await fetchData(
      token,
      "/api/vanthu/listVanBan/getListVanBan",
      { type: 1, page: currentPage, pageSize: ItemsPerPage }
    );
    return {
      props: {
        data: data?.data ? data?.data : null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: null,
      },
    };
  }
}
