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
      href="/van-thu-luu-tru/van-ban-den/van-ban-da-xu-ly/"
      api="api/vanthuguiNhanCongVan/vanBanDi/deleteVanBan"
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
      "api/vanthuguiNhanCongVan/vanBanDen/getListVanBanDaXuLy"
    );
    return {
      props: {
        data: data?.data?.listVanBanDaXuLy
          ? data?.data?.listVanBanDaXuLy
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
