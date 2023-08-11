import React from "react";
import styles from "./index.module.css";
import { NhapLuongCoBan } from "@/components/cai-dat-luong/nhap-luong-co-ban/nhap-luong-co-ban";
import { POST, POST_SS_TL, getCompIdSS } from "@/pages/api/BaseApi";
import { COOKIE_KEY } from "@/pages";
import _ from "lodash";
import moment from "moment";
export default function CaiDatNhapLuongCoBan({ data, listPb, listIds }) {
  return (
    <div>
      <NhapLuongCoBan data={data} listPb={listPb} listIds={listIds} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let com_id = null;
  com_id = getCompIdSS(context);
  const currentTime = moment().format("YYYY-MM-DD");

  const finalData: any[] = [];

  const listEmp = await POST_SS_TL(
    "api/tinhluong/congty/list_em",
    {
      // id_com: comp_id
      id_com: com_id,
    },
    context
  );

  const listIds = listEmp?.data?.["listUser"]?.map((item) => {
    return item?.idQLC;
  });

  if (!_.isEmpty(listIds)) {
    const resSal = await POST_SS_TL(
      "api/tinhluong/congty/take_salary_contract",
      { time: currentTime, array: `[${listIds?.toString()}]` },
      context
    );

    if (resSal?.data) {
      listEmp?.data?.["listUser"]?.forEach((user: any, index: number) => {
        const salData = resSal?.data?.find(
          (item) => item?.userId === user?.idQLC
        );

        finalData.push({ ...user, ...salData });
      });
    }
  }

  // get list phong ban
  const listPbRes = await POST("api/qlc/department/list", { com_id: com_id });
  return {
    props: {
      data: finalData,
      listPb: listPbRes?.data || [],
      listIds: listIds,
    },
  };
};
