import Comp_detail from "@/components/van-thu-luu-tru/comp_detail/Comp_detail";
import { fetchData } from "@/utils/BaseApi";
import { parse } from "cookie";
import { useRouter } from "next/router";
import React from "react";

const Index = ({ data }: any) => {
  const router = useRouter();
  const { id } = router.query;
  const Itemtext = data?.find((item: any) => {
    return item?._id == id;
  });
  return (
    <Comp_detail
      Itemtext={Itemtext}
      href="/van-thu-luu-tru/van-ban-den/van-ban-cap-nhat"
      api="api/vanthu/guiNhanCongVan/vanBanDi/deleteVanBan"
    ></Comp_detail>
  );
};
export default Index;

export async function getServerSideProps(context: {
  req: { headers: { cookie: any } };
}) {
  try {
    const cookies = parse(context.req.headers.cookie || "");
    const token = `${cookies.token_first}${cookies.token_hafl}`;
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
      "api/vanthu/guiNhanCongVan/vanBanDen/getListVanBanCapNhat",
      { type_thu_hoi: 1 }
    );
    return {
      props: {
        data: data?.data?.listVanBanCapNhat
          ? data?.data?.listVanBanCapNhat
          : null,
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