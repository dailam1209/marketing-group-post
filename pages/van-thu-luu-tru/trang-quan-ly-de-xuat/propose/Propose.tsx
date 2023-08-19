import React, { useEffect, useState } from "react";
import styles from "./Propose.module.css";
import Box_top_propose from "./box_top/Box_top";
import Box_bottom_propose from "./box_bottom/Box_bottom";
import { fetchData } from "@/utils/BaseApi";
interface Data {
  totaldx: any;
  dxChoDuyet: any;
  dxCanduyet: any;
  dxduyet: any;
  data: any;
}
interface ItemBoxTop {
  id: number;
  title: any;
  num: any;
  href: any;
  color?: any;
  progress?: any;
}

export const List_boxs_company: ItemBoxTop[] = [
  {
    id: 1,
    title: "Tổng số đề xuất",
    num: 0,
    href: "/van-thu-luu-tru/trang-quan-ly-de-xuat/de-xuat",
    progress: 0,
  },
  {
    id: 2,
    title: "Đề xuất đang chờ duyệt",
    num: 0,
    href: "/van-thu-luu-tru/trang-quan-ly-de-xuat/toi-gui-di",
    color: "#FDD020",
  },
  {
    id: 3,
    title: "Đề xuất cần duyệt",
    num: 0,
    href: "/van-thu-luu-tru/trang-quan-ly-de-xuat/gui-den-toi",
    color: "#31C4ED",
  },
  {
    id: 4,
    title: "Đề xuất gửi đi",
    num: 0,
    href: "/van-thu-luu-tru/trang-quan-ly-de-xuat/toi-gui-di",
    color: "#76B51B",
  },
];
interface ItemBox {
  id: number;
  title: string;
  desc: string;
  image: string;
  time: string;
  day: string;
  acceptance: boolean;
}

const List_boxs_bottom_Company: ItemBox[] = [];
const Propose = () => {
  const [dataHome, setDataHome] = useState<Data | null>(null);
  useEffect(() => {
    const fetchGetData = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await fetchData(
            token,
            "/api/vanthu/catedx/showHome"
          );
          setDataHome(response?.data);
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      }
    };
    fetchGetData();
  }, []);
  const List_boxs_staff: ItemBoxTop[] = [
    {
      id: 1,
      title: "Tổng số đề xuất",
      num: dataHome?.totaldx,
      href: "/van-thu-luu-tru/trang-quan-ly-de-xuat/de-xuat",
      progress: dataHome?.totaldx,
    },
    {
      id: 2,
      title: "Đề xuất đang chờ duyệt",
      num: dataHome?.dxChoDuyet,
      href: "/van-thu-luu-tru/trang-quan-ly-de-xuat/toi-gui-di",
      color: "#FDD020",
    },
    {
      id: 3,
      title: "Đề xuất cần duyệt",
      num: dataHome?.dxCanduyet,
      href: "/van-thu-luu-tru/trang-quan-ly-de-xuat/gui-den-toi",
      color: "#31C4ED",
    },
    {
      id: 4,
      title: "Đề xuất gửi đi",
      num: dataHome?.dxduyet,
      href: "/van-thu-luu-tru/trang-quan-ly-de-xuat/toi-gui-di",
      color: "#76B51B",
    },
  ];
  const List_boxs_bottom_staff: ItemBox[] = dataHome?.data;
  let storedData;
  if (typeof window !== "undefined") {
    storedData = sessionStorage.getItem("layout");
  }
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
  return (
    <div className={styles.body_propose}>
      <div className={styles.body_propose_row}>
        <h3 className={styles.title}> Hôm nay, ngày {formattedDate}</h3>
        <div className={styles.box1}>
          <div className={styles.list_box1}>
            <Box_top_propose
              listboxs={
                storedData === "user" ? List_boxs_staff : List_boxs_company
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.body_propose_row}>
        <h3 className={styles.title}>Đề xuất gần đây</h3>
        <div className={styles.box2}>
          <div className={styles.list_box2}>
            <Box_bottom_propose
              listboxs={
                storedData === "user"
                  ? List_boxs_bottom_staff
                  : List_boxs_bottom_Company
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Propose;
