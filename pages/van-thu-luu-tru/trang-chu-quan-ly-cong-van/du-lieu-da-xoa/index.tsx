import React, { useState, useEffect } from "react";
import styles from "./data_deleted.module.css";
import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/utils/BaseApi";
import { fetch_list_employs } from "@/utils/ShareApi";

const Index = () => {
  const [data, setData] = useState<any>([]);
  const [dataDetail, setdataDetail] = useState<any>([]);
  useEffect(() => {
    const fetchGetData = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await fetchData(
            token,
            "/api/vanthu/dataDelete/getDataDidDelete"
          );
          setData(response?.data);
          setdataDetail(response?.data?.data?.list);
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      }
    };
    fetchGetData();
  }, []);
  const dataList = [
    {
      id: 1,
      type: 1,
      cv_type_loai: 1,
      title: "Văn bản đến",
      num: data?.data?.countTextReceve,
    },
    {
      id: 2,
      type: 1,
      cv_type_loai: 2,
      title: "Văn bản đi",
      num: data?.data?.countTextSend,
    },
    {
      id: 3,
      type: 2,
      cv_type_loai: 1,
      title: "Hợp đồng đến",
      num: data?.data?.countContractReceve,
    },
    {
      id: 4,
      type: 2,
      cv_type_loai: 2,
      title: "Hợp đồng đi",
      num: data?.data?.countContractSend,
    },
  ];
  const ListBoxsTop = dataList?.map((item, index) => {
    return (
      <div className={styles.item2} key={index}>
        <div className={styles.container_item}>
          <div className={styles.item_img}>
            <Image src={"/icon/img.png"} width={50} height={50} alt="" />
          </div>
          <div className={styles.item_info}>
            <p className={styles.num} style={{ color: "#76B51B" }}>
              {item?.num}
            </p>
            <p className={styles.name}>{item?.title} </p>
          </div>
        </div>
        <Link
          href={`/van-thu-luu-tru/trang-chu-quan-ly-cong-van/du-lieu-da-xoa/${item?.type}/${item?.cv_type_loai}`}
          className={styles.link_ct}
        >
          Xem chi tiết
        </Link>
      </div>
    );
  });
  //  Xử lý format ngày
  const timeFormat = "hh, Ngày dd/MM/yyyy";
  const dateFormat = "dd/MM/yyyy";
  function convertUnixTimestamp(
    timestamp: number,
    timeFormat: string,
    dateFormat: string
  ): string {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const result = timeFormat
      .replace("hh", formattedTime)
      .replace("dd/MM/yyyy", formattedDate);

    return result;
  }

  //  Lấy ra văn bản chi tiết theo id
  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (token) {
  //     const fetchGetDataDetail = async () => {
  //       try {
  //         const list_emps = await fetch_list_employs();
  //         const name_user_soan = list_emps.find(
  //           (item: any) => item.com_id === dataDetail?.cv_user_soan
  //         )?.userName;
  //         console.log(name_user_soan);

  //         const newDataDetail = {
  //           ...dataDetail, // Giữ lại các trường trước đó
  //           name_user_soan,
  //         };
  //         setdataDetail(newDataDetail);
  //       } catch (error) {
  //         console.log("Error fetching home data:", error);
  //       }
  //     };
  //     fetchGetDataDetail();
  //   }
  // }, []);

  // Bottom
  return (
    <div className={styles.container}>
      <div className={styles.home_main}>
        <div className={styles.box_data}>
          <div className={styles.list_box_data_top}>
            <div className={styles.title_top}> Văn bản đã xóa</div>
            <div className={styles.list_box}>{ListBoxsTop}</div>
          </div>
          <div className={styles.title_bottom}>
            <p className={styles.p_bottom}>Văn bản đã xóa gần đây</p>
          </div>
          <div className={styles.list_box_file}>
            {data?.data?.list?.map((item: any, index: number) => {
              return (
                <div className={`${styles.item_bot} `} key={index}>
                  <div
                    className={styles.item_img}
                    style={{ marginRight: "8px" }}
                  >
                    <Image
                      src={"/icon/img_l4.png"}
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  </div>
                  <div className={styles.text_file_del}>
                    <p className={styles.title_class} key={index}>
                      {item?.cv_name}
                    </p>
                    <p className={styles.num_dispatch}>
                      Nguời xóa:&nbsp;
                      <span className={styles.num} style={{ color: "#FFA800" }}>
                        {item?.cv_user_xoa}
                      </span>
                    </p>
                    <p className={styles.time}>
                      {convertUnixTimestamp(
                        item?.cv_time_xoa,
                        timeFormat,
                        dateFormat
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
