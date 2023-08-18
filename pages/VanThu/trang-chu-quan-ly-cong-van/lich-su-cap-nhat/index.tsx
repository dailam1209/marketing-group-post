import React, { useState, useEffect } from "react";
import styles from "./history_update.module.css";
import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/utils/BaseApi";
interface ItemBox {
  id: number;
  image: React.ReactNode;
  color: string;
  num: number;
  title: string;
}

const Index = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const fetchGetData = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await fetchData(
            token,
            "/api/vanthu/history/getDataHistory"
          );
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      }
    };
    fetchGetData();
  }, []);

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

  return (
    <div className={styles.container}>
      <div className={styles.home_main}>
        <div className={styles.box_data}>
          <div className={styles.list_box_data_top}>
            <div className={styles.title_top}>Lịch sử cập nhật</div>
            <div className={styles.list_box}>
              <div className={styles.item2}>
                <div className={styles.container_item}>
                  <div className={styles.item_img}>
                    <Image
                      src={"/icon/img_ll3.png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </div>
                  <div className={styles.item_info}>
                    <p className={styles.num} style={{ color: "#76B51B" }}>
                      {data?.countTextUpdate}
                    </p>
                    <p className={styles.name}>Văn bản đã chỉnh sửa</p>
                  </div>
                </div>
                <Link
                  href={`/VanThu/trang-chu-quan-ly-cong-van/lich-su-cap-nhat/1/1-2`}
                  className={styles.link_ct}
                >
                  Xem chi tiết
                </Link>
              </div>
              <div className={styles.item2}>
                <div className={styles.container_item}>
                  <div className={styles.item_img}>
                    <Image
                      src={"/icon/img_ll4.png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </div>
                  <div className={styles.item_info}>
                    <p className={styles.num} style={{ color: "#76B51B" }}>
                      {data?.countTextRecover}
                    </p>
                    <p className={styles.name}>Văn bản đã khôi phục</p>
                  </div>
                </div>
                <Link
                  href={`/VanThu/trang-chu-quan-ly-cong-van/lich-su-cap-nhat/2/1-2`}
                  className={styles.link_ct}
                >
                  Xem chi tiết
                </Link>
              </div>
              <div className={styles.item2}>
                <div className={styles.container_item}>
                  <div className={styles.item_img}>
                    <Image
                      src={"/icon/img_ll3.png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </div>
                  <div className={styles.item_info}>
                    <p className={styles.num} style={{ color: "#76B51B" }}>
                      {data?.countContractUpdate}
                    </p>
                    <p className={styles.name}>Hợp đồng đã chỉnh sửa</p>
                  </div>
                </div>
                <Link
                  href={`/VanThu/trang-chu-quan-ly-cong-van/lich-su-cap-nhat/1/3-4`}
                  className={styles.link_ct}
                >
                  Xem chi tiết
                </Link>
              </div>
              <div className={styles.item2}>
                <div className={styles.container_item}>
                  <div className={styles.item_img}>
                    <Image
                      src={"/icon/img_ll4.png"}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </div>
                  <div className={styles.item_info}>
                    <p className={styles.num} style={{ color: "#76B51B" }}>
                      {data?.countContractRecover}
                    </p>
                    <p className={styles.name}>Hợp đồng đã khôi phục</p>
                  </div>
                </div>
                <Link
                  href={`/VanThu/trang-chu-quan-ly-cong-van/lich-su-cap-nhat/2/3-4`}
                  className={styles.link_ct}
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
            <div className={styles.title_bottom}>
              <p className={styles.p_bottom}>Lịch sử cập nhật gần đây</p>
              <div className={styles.list_box_file}>
                {data?.list?.map((item: any, index: number) => {
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
                        <p>Số văn bản: {item?.cv_so}</p>
                        <p className={styles.time}>
                          {convertUnixTimestamp(
                            item?.cv_time_edit,
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
      </div>
    </div>
  );
};

export default Index;
