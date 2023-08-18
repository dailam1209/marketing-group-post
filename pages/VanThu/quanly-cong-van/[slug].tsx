import { useRouter } from "next/router";
import { parse } from "cookie";
import { fetchData } from "@/utils/BaseApi";
import Comp_detail from "@/components/VanThu/comp_detail/Comp_detail";

export default function Page({ data }: any) {
  const router = useRouter();
  const { slug } = router.query;
  const Itemtext = data?.find((item: any) => {
    return item._id == slug;
  });

  return (
    <Comp_detail
      Itemtext={Itemtext}
      href="/VanThu/van-ban-den/van-ban-can-duyet"
      api="/api/vanthu/guiNhanCongVan/vanBanDi/deleteVanBan"
    ></Comp_detail>
  );
}

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
      "/api/vanthu/guiNhanCongVan/home/getTotalVanBan"
    );
    return {
      props: {
        data: data?.data?.cong_van_gan_day
          ? data?.data?.cong_van_gan_day
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
