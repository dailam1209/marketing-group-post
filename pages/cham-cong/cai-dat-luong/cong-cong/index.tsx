import { CongCong } from "@/components/cai-dat-luong/cong-cong/cong-cong";
import styles from "./index.module.css";
import { POST_SS, POST_SS_TL, getCompIdSS } from "@/pages/api/BaseApi";

export default function Page({ listCC, listPb }) {
  return (
    <div>
      <CongCong mockdata={listCC} listPb={listPb} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let com_id = null;
  com_id = getCompIdSS(context);
  const listCC: any[] = [];

  const listPb: any[] = [];

  const res = await Promise.all([
    POST_SS_TL(
      "api/tinhluong/congty/list_user_cong_cong",
      {
        com_id: com_id,
        start_date: "2021-04-01",
        end_date: "2023-09-01",
      },
      context
    ),
    POST_SS("api/qlc/department/list", { com_id: com_id }, context, "qlc"),
  ]);

  if (res?.[0]) {
    res?.[0]?.data?.listUser?.forEach((item) => {
      const infoDx = res?.[0]?.data?.list_dexuat?.find(
        (dx) => dx?.id_user === item?.idQLC
      );

      listCC.push({ user: item, infoDx: infoDx ? infoDx : {} });
    });
  }
  if (res?.[1]?.items) {
    res?.[1]?.items.forEach((item) => {
      listPb.push({ dep_id: item?.dep_id, dep_name: item?.dep_name });
    });
  }

  return {
    props: {
      listCC: listCC,
      listPb: listPb,
    },
  };
};
