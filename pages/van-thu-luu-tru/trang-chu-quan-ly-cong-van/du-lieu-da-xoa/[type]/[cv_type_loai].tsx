import React, { useState, useEffect } from "react";
import styles from "./detail_del.module.css";
import Image from "next/image";
import { TfiMenuAlt } from "react-icons/tfi";
import { ImMenu2 } from "react-icons/im";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { fetchData, handleCreate } from "@/utils/BaseApi";
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;

const Index = () => {
  const router = useRouter();
  const { type, cv_type_loai } = router.query;
  const [dataToday, setDataToday] = useState<any>([]);
  const [dataPrevious, setdataPrevious] = useState<any>([]);
  const [searchKey, setsearchKey] = useState("");

  //  Lấy ra văn bản hôm nay
  useEffect(() => {
    const fetchGetDataDetail = async () => {
      try {
        const response = await fetchData(
          token,
          "/api/vanthu/dataDelete/getDetailDataDelete",
          {
            type,
            cv_type_loai,
            searchKey,
          }
        );
        setDataToday(
          response?.data?.data?.dataToday.map((item: any) => ({
            ...item,
            isChecked: false,
          }))
        );
      } catch (error) {
        console.log("Error fetching home data:", error);
      }
    };
    fetchGetDataDetail();
  }, [type, cv_type_loai, searchKey]);

  //  Lấy ra văn bản gần đây
  useEffect(() => {
    const fetchGetDataDetail = async () => {
      try {
        const response = await fetchData(
          token,
          "/api/vanthu/dataDelete/getDetailDataDelete",
          {
            type,
            cv_type_loai,
            searchKey,
          }
        );
        setdataPrevious(
          response?.data?.data?.dataPrevious.map((item: any) => ({
            ...item,
            isChecked: false,
          }))
        );
      } catch (error) {
        console.log("Error fetching home data:", error);
      }
    };
    fetchGetDataDetail();
  }, [type, cv_type_loai, searchKey]);
  //  Xử lý chọn giao diện hiện thị
  const [active, setActive] = useState(false);
  const handleActiveMenu1 = () => {
    setActive(false);
  };
  const handleActiveMenu2 = () => {
    setActive(true);
  };
  // Mảng lưu lại các phần tử được active
  const [listActive, setListActive] = useState<number[]>([]);
  // Kiểm tra đã lựa chọn tất cả hay bỏ tất cả chưa
  const [check, setcheck] = useState<boolean>(false);
  // Hàm xử lý thêm và xóa các phần tử khi được chọn click
  const handleActive = (id: number) => {
    const updatedListActive = listActive.includes(id)
      ? listActive.filter((item: number) => item !== id)
      : [...listActive, id];
    setListActive(updatedListActive);
    const updatedList = dataPrevious?.map((item: any) => ({
      ...item,
      isChecked: updatedListActive.includes(item?._id),
    }));
    const updateddataToday = dataToday?.map((item: any) => ({
      ...item,
      isChecked: updatedListActive.includes(item?._id),
    }));
    setdataPrevious(updatedList);
    setDataToday(updateddataToday);
  };

  //  Hàm chọn tất cả hoặc bỏ chọn tất ca
  const handleChooseAll = () => {
    setcheck(!check);
  };
  // Kiểm tra sự thay đổi trên giao diện và cập nhât
  useEffect(() => {
    if (check) {
      const allIds = dataPrevious?.map((item: any) => item?._id);
      setListActive(allIds);
      const updatedList = dataPrevious?.map((item: any) => ({
        ...item,
        isChecked: true,
      }));
      setdataPrevious(updatedList);
    } else {
      setListActive([]);
      const updatedList = dataPrevious?.map((item: any) => ({
        ...item,
        isChecked: false,
      }));
      setdataPrevious(updatedList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);
  // Kiểm tra đã đầy hay chưa có phần tử nào
  useEffect(() => {
    if (listActive?.length === dataPrevious?.length) {
      setcheck(true);
    } else if (listActive?.length === 0) {
      setcheck(false);
    }
  }, [dataPrevious?.length, listActive]);

  //  Xử lý api xóa - khôi phục
  const handleRestore = async () => {
    const formdata = new FormData();
    listActive.forEach((dep) => {
      formdata.append("listId[]", dep.toString());
    });
    formdata.append("action", "recovery");
    try {
      const apiURL = `/api/vanthu/listVanBan/synthesisFunction`;
      const response = await handleCreate(apiURL, formdata);
      // if (response== 200) {
      //   alert("Dữ liệu đã được cập nhật thành công!");
      // }
      router.push("/van-thu-luu-tru/trang-chu-quan-ly-cong-van/du-lieu-da-xoa");
    } catch (error) {
      alert("Vui lòng kiểm tra lại các trường!");
    }
  };
  const handleDelete = async () => {
    const stringRepresentation = listActive.join(", ");

    try {
      const apiURL = `/api/vanthu/dataDelete/deleteVV`;
      const response = await handleCreate(apiURL, { id: stringRepresentation });
      // if (response== 200) {
      //   alert("Dữ liệu đã được cập nhật thành công!");
      // }
      if (response) {
        router.push("/van-thu-luu-tru/trang-chu-quan-ly-cong-van/du-lieu-da-xoa");
      }
    } catch (error) {
      alert("Vui lòng kiểm tra lại các trường!");
    }
  };
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
    <div className={styles.container_detail}>
      <div className={styles.home_main}>
        <div className={styles.list_detail}>
          <div className={styles.header_detail}>
            <div className={styles.box_title_header}>
              <Image
                src={"/icon/management_dispatch/img5.png"}
                width={10}
                height={18}
                alt=""
                onClick={() => {
                  router.push("/van-thu-luu-tru/trang-chu-quan-ly-cong-van/du-lieu-da-xoa");
                }}
              />
              <p className={styles.title_header}>Văn bản đến</p>
            </div>
          </div>
          <div className={styles.body_detail}>
            <div className={styles.box_search}>
              <div className={styles.list_choose_search}>
                <div className={styles.list_left}>
                  <div className={styles.menu1} onClick={handleActiveMenu1}>
                    <ImMenu2
                      style={{
                        width: "36px",
                        height: "36px",
                        color: `${active ? "" : "#4C5BD4"}`,
                      }}
                    />
                  </div>
                  <div className={styles.menu2} onClick={handleActiveMenu2}>
                    <TfiMenuAlt
                      style={{
                        width: "28px",
                        height: "28px",
                        color: `${active ? "#4C5BD4" : ""}`,
                      }}
                    />
                  </div>
                  <div className={styles.checkAll} onClick={handleChooseAll}>
                    <div>
                      <p
                        className={`${styles.btn_del_check} ${styles.btn_huy}`}
                      >
                        {!check ? "Chọn tất cả" : "Bỏ chọn tất cả"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={
                      listActive?.length > 0 ? styles.d_block : styles.d_none
                    }
                    onClick={handleRestore}
                  >
                    <p className={`${styles.btn_del_kp} ${styles.btn_huy}`}>
                      Khôi phục
                    </p>
                  </div>
                  <div
                    onClick={handleDelete}
                    className={
                      listActive?.length > 0 ? styles.d_block : styles.d_none
                    }
                  >
                    <p className={styles.btn_del_xoa}>Xóa</p>
                  </div>
                </div>
                <div className={styles.list_right}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm nhanh"
                    value={searchKey}
                    onChange={(e: any) => {
                      setsearchKey(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            {active ? (
              <div className={styles.table_list_del}>
                <div className={styles.row_table_list}>
                  <div className={styles.thead_del_2}>
                    <div className={styles.div_info}>
                      <p style={{ width: "12%" }}></p>
                      <p style={{ width: "26%", paddingLeft: "10px" }}>
                        Tên văn bản
                      </p>
                      <p style={{ width: "26%", paddingLeft: "10px" }}>
                        Người xóa
                      </p>
                      <p style={{ width: "26%", paddingLeft: "10px" }}>
                        Thời gian
                      </p>
                      <div style={{ width: "10%" }}></div>
                    </div>
                  </div>
                  <div className={styles.row_table_list}>
                    <div
                      className={styles.thead_del}
                      style={{ background: "#fff" }}
                    >
                      <p className={styles.title_table}>Hôm nay</p>
                      <Image
                        src={"/icon/management_dispatch/img_l7.png"}
                        width={15}
                        height={8}
                        alt=""
                      />
                    </div>
                    <div className={styles.body_del2}>
                      {/* Danh sách hôm nay */}
                      {dataToday?.map((item: any, index: any) => {
                        return (
                          <div
                            className={styles.list_item}
                            key={index}
                            onClick={() => handleActive(item?._id)}
                          >
                            <div style={{ width: "12%" }}>
                              <Image
                                src={"/icon/management_dispatch/img_l3.png"}
                                width={50}
                                height={50}
                                alt=""
                              />
                            </div>
                            <div
                              style={{
                                width: "26%",
                                paddingLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <p className={styles.item_name}>
                                {item?.cv_name}
                              </p>
                              <p style={{ fontSize: "14px" }}>
                                So van ban: {item?.cv_so}
                              </p>
                            </div>
                            <div
                              style={{
                                width: "26%",
                                paddingLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <p className={styles.item_name_company}>
                                {item?.cv_user_xoa}
                              </p>
                            </div>
                            <div
                              style={{
                                width: "26%",
                                paddingLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <p className={styles.item_date}>
                                {convertUnixTimestamp(
                                  item?.cv_time_xoa,
                                  timeFormat,
                                  dateFormat
                                )}
                              </p>
                            </div>
                            <div style={{ width: "10%" }}>
                              {" "}
                              <input
                                type="checkbox"
                                checked={item?.isChecked}
                                onChange={() => handleActive(item?._id)}
                                style={{
                                  transform: "scale(1.5)",
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.row_table_list}>
                    <div
                      className={styles.thead_del}
                      style={{ background: "#fff" }}
                    >
                      <p className={styles.title_table}>Cũ hơn</p>
                      <Image
                        src={"/icon/management_dispatch/img_l7.png"}
                        width={15}
                        height={8}
                        alt=""
                      />
                    </div>
                    <div className={styles.body_del2}>
                      {dataPrevious?.map((item: any, index: any) => {
                        return (
                          <div
                            className={styles.list_item}
                            key={index}
                            onClick={() => handleActive(item?._id)}
                          >
                            <div style={{ width: "12%" }}>
                              <Image
                                src={"/icon/management_dispatch/img_l3.png"}
                                width={50}
                                height={50}
                                alt=""
                              />
                            </div>
                            <div
                              style={{
                                width: "26%",
                                paddingLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <p className={styles.item_name}>
                                {item?.cv_name}
                              </p>
                              <p style={{ fontSize: "14px" }}>
                                So van ban: {item?.cv_so}
                              </p>
                            </div>
                            <div
                              style={{
                                width: "26%",
                                paddingLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <p className={styles.item_name_company}>
                                {item?.cv_user_xoa}
                              </p>
                            </div>
                            <div
                              style={{
                                width: "26%",
                                paddingLeft: "10px",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <p className={styles.item_date}>
                                {convertUnixTimestamp(
                                  item?.cv_time_xoa,
                                  timeFormat,
                                  dateFormat
                                )}
                              </p>
                            </div>
                            <div style={{ width: "10%" }}>
                              {" "}
                              <input
                                type="checkbox"
                                checked={item?.isChecked}
                                onChange={() => handleActive(item?._id)}
                                style={{
                                  transform: "scale(1.5)",
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.table_list_del}>
                <div className={styles.row_table_list}>
                  <div className={styles.thead_del}>
                    <p className={styles.title_table}>Hôm nay</p>
                    <Image
                      src={"/icon/management_dispatch/img_l7.png"}
                      width={15}
                      height={8}
                      alt=""
                    />
                  </div>
                  <div className={styles.body_del}>
                    {/* Danh sách hôm nay */}
                    {dataToday?.map((item: any, index: any) => {
                      return (
                        <div
                          className={`${styles.item_bot} ${
                            listActive.includes(item?._id)
                              ? styles.addBackGroundXam
                              : ""
                          }`}
                          key={index}
                          onClick={() => handleActive(item?._id)}
                        >
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
                            <p className={styles.num_dispatch}>
                              Nguời xóa:&nbsp;
                              <span
                                className={styles.num}
                                style={{ color: "#FFA800" }}
                              >
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
                <div className={styles.row_table_list}>
                  <div className={styles.thead_del}>
                    <p className={styles.title_table}>Cũ hơn</p>
                    <Image
                      src={"/icon/management_dispatch/img_l7.png"}
                      width={15}
                      height={8}
                      alt=""
                    />
                  </div>
                  <div className={styles.body_del}>
                    {dataPrevious?.map((item: any, index: any) => {
                      return (
                        <div
                          className={`${styles.item_bot} ${
                            listActive.includes(item?._id)
                              ? styles.addBackGroundXam
                              : ""
                          }`}
                          key={index}
                          onClick={() => handleActive(item?._id)}
                        >
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
                            <p className={styles.num_dispatch}>
                              Nguời xóa:&nbsp;
                              <span
                                className={styles.num}
                                style={{ color: "#FFA800" }}
                              >
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
