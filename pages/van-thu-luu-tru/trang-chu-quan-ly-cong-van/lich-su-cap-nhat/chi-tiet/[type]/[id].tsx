import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./edit_document.module.css";
import Comp_sidebar_detail from "@/components/van-thu-luu-tru/comp_sidebar_detail/Comp_sidebar_detail";
import { fetchData, fetchListSoVB } from "@/utils/BaseApi";
import { fetchNoiGui, fetch_list_employs } from "@/utils/ShareApi";

const Index = () => {
  const router = useRouter();
  const { type, id } = router.query;
  const [dataDetail, setdataDetail] = useState<any>(null);
  //  Lấy ra văn bản chi tiết theo id
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const fetchGetDataDetail = async () => {
        try {
          const response = await fetchData(
            token,
            "api/vanthu/history/getDetailHistoryUpdate",
            { type: type }
          );
          const selectedItem = response?.data?.data.find(
            (item: any) => item._id == id
          );
          if (selectedItem) {
            const name_book = await fetchListSoVB(selectedItem.cv_id_book);
            const location = await fetchNoiGui(selectedItem.cv_phong_soan);
            const noi_nhan = await fetchNoiGui(selectedItem.cv_nhan_noibo);
            const list_emps = await fetch_list_employs();
            const name_user_soan = list_emps.find(
              (item: any) => item._id === selectedItem.cv_user_soan
            )?.ep_name;
            const name_user_save = list_emps.find(
              (item: any) => item._id === selectedItem.cv_user_save
            )?.ep_name;
            const name_user_ky = list_emps.find(
              (item: any) => item._id === selectedItem.cv_user_ky
            )?.ep_name;
            const newDataDetail = {
              ...selectedItem,
              name_book,
              location,
              noi_nhan,
              name_user_soan,
              name_user_save,
              name_user_ky,
            };
            setdataDetail(newDataDetail);
          }
        } catch (error) {
          console.log("Error fetching home data:", error);
        }
      };
      fetchGetDataDetail();
    }
  }, [id, type]);

  const textContent: any = new DOMParser().parseFromString(
    dataDetail?.cv_trich_yeu,
    "text/html"
  ).documentElement.textContent;
  const lowercaseText = textContent.toLowerCase();
  function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so we add 1
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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
      {dataDetail && (
        <div className={styles.home_main}>
          <div className={styles.box_detail}>
            <div className={styles.box_detail_content}>
              <div className={styles.col_detail_vb_left}>
                <div className={styles.list_header}>
                  <div className={styles.title_header}>
                    <Image
                      src={"/icon/management_dispatch/img555.png"}
                      width={10}
                      height={18}
                      alt=""
                      onClick={() => {
                        router.push(
                          "/van-thu-luu-tru/trang-chu-quan-ly-cong-van/lich-su-cap-nhat"
                        );
                      }}
                    />
                    <p className={styles.title_list}>
                      Lịch sử cập nhật {dataDetail?.title}
                    </p>
                    <Image
                      src={"/icon/management_dispatch/xoa.png"}
                      width={24}
                      height={24}
                      alt=""
                      className={styles.img_del}
                    />
                  </div>
                </div>
                <div className={styles.title_detail}>
                  <table className={styles.tb}>
                    <thead>
                      <tr>
                        <th>Thời gian chỉnh sửa</th>
                        <th>Người chỉnh sửa</th>
                        <th>Nội dung chỉnh sửa</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {" "}
                          {dataDetail?.cv_time_edit
                            ? convertUnixTimestamp(
                                dataDetail?.cv_time_edit,
                                timeFormat,
                                dateFormat
                              )
                            : convertUnixTimestamp(
                                dataDetail?.cv_time_kp,
                                timeFormat,
                                dateFormat
                              )}
                        </td>
                        <td>Công ty Cổ phần Thanh toán Hưng Hà 2</td>
                        <td>{dataDetail?.lichsucapnhat}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <Comp_sidebar_detail>
                <div className={styles.main_right}>
                  <p>{dataDetail?.title}</p>
                  <ol>
                    <li>Số văn bản: {dataDetail?.cv_so} </li>
                    <li>Sổ văn bản:{dataDetail?.name_book} </li>
                    <li>Nơi gửi: {dataDetail?.location} </li>
                    <li>Ngày nhận: {formatDate(dataDetail?.cv_date)} </li>
                    <li>Trích yếu văn bản: {lowercaseText} </li>
                    <li>Ghi chú:{dataDetail?.cv_ghi_chu} </li>

                    {/* {dataDetail?.cv_file ? (
                      <li>Tệp đính kèm:{dataDetail?.cv_file}</li>
                    ) : (
                      <li>Không có tệp đính kèm</li>
                    )} */}
                    <li>
                      {" "}
                      File đính kèm
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <Image
                            src={"/icon/img_word.png"}
                            width={24}
                            height={24}
                            alt=""
                            className={""}
                          />
                          <p>bytes 1:26 pm - 2023-07-04</p>
                        </div>
                        <Image
                          src={"/icon/img_open.png"}
                          width={24}
                          height={24}
                          alt=""
                          className={""}
                        />
                      </div>
                    </li>
                    {dataDetail?.name_user_soan && (
                      <li>
                        Người gửi
                        <div className={styles.users}>
                          <Image
                            src={"/icon/create_propose/trang.jpg"}
                            width={50}
                            height={50}
                            alt=""
                            className={""}
                          />
                          <div style={{ marginLeft: "12px" }}>
                            <p style={{ color: "#4C5BD4", lineHeight: "19px" }}>
                              {dataDetail?.name_user_soan}
                            </p>
                            <span>ID: {dataDetail?.cv_user_soan}</span>
                          </div>
                        </div>
                      </li>
                    )}
                    {dataDetail?.noi_nhan && (
                      <li>
                        Nơi nhận
                        <p> {dataDetail?.noi_nhan}</p>
                      </li>
                    )}
                    {dataDetail?.name_user_ky && (
                      <li>
                        Người gửi
                        <div className={styles.users}>
                          <Image
                            src={"/icon/create_propose/trang.jpg"}
                            width={50}
                            height={50}
                            alt=""
                            className={""}
                          />
                          <div style={{ marginLeft: "12px" }}>
                            <p style={{ color: "#4C5BD4", lineHeight: "19px" }}>
                              {dataDetail?.name_user_ky}
                            </p>
                            <span>ID: {dataDetail?.cv_user_ky}</span>
                          </div>
                        </div>
                      </li>
                    )}
                    {dataDetail?.name_user_save && (
                      <li>
                        Người gửi
                        <div className={styles.users}>
                          <Image
                            src={"/icon/create_propose/trang.jpg"}
                            width={50}
                            height={50}
                            alt=""
                            className={""}
                          />
                          <div style={{ marginLeft: "12px" }}>
                            <p style={{ color: "#4C5BD4", lineHeight: "19px" }}>
                              {dataDetail?.name_user_save}
                            </p>
                            <span>ID: {dataDetail?.cv_user_save}</span>
                          </div>
                        </div>
                      </li>
                    )}
                  </ol>
                </div>
              </Comp_sidebar_detail>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
