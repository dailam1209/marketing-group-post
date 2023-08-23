import React, { useEffect, useState } from "react";
import styles from "./detailHistory.module.css";
import Section from "@/components/van-thu-luu-tru/components/Input/Section/Section";
import { Custom_label } from "@/components/van-thu-luu-tru/components/Input/Label/Label";
import { Custom_input_text } from "@/components/van-thu-luu-tru/components/Input/Input_text/Input_text";
import Input_select from "@/components/van-thu-luu-tru/components/Input/Input_select/Input_select";
import Input_calender from "@/components/van-thu-luu-tru/components/Input/Input_calender/Input_calender";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchData } from "@/utils/BaseApi";
import { getCookie } from "cookies-next";
import { fetchDataSoVB } from "@/utils/ShareApi";
const token = `${getCookie("token_first")}${getCookie("token_hafl")}`;

ReactModal.setAppElement("#__next");

const Index = (props: any) => {
  const router = useRouter();
  const { type, type_vb } = router.query;
  const [title, setTitle] = useState("");
  const [checkPage, setCheckPage] = useState<any>(); //Lưu định danh các page
  const [typePage, settypePage] = useState<any>(); //Lưu các loại page

  useEffect(() => {
    if (type == "1" && type_vb?.includes("1-2")) {
      setTitle("Văn bản đã chỉnh sửa");
      setCheckPage(true);
      settypePage(true);
    } else if (type == "1" && type_vb?.includes("3-4")) {
      setTitle("Hợp đồng đã chỉnh sửa ");
      settypePage(false);
      setCheckPage(true);
    } else if (type == "2" && type_vb?.includes("1-2")) {
      setTitle("Văn bản đã khôi phục ");
      settypePage(true);
      setCheckPage(false);
    } else if (type == "2" && type_vb?.includes("3-4")) {
      setTitle("Hợp đồng đã khôi phục ");
      settypePage(false);
      setCheckPage(false);
    }
  }, [type, type_vb]);

  const select_style = {
    control: (provided: any) => ({
      ...provided,
      height: "30px",
      borderRadius: "10px",
    }),
  };
  // Lấy ra sổ văn bản
  const [dataSovb, setdataSovb] = useState<any>(null);
  useEffect(() => {
    const fetchGetData = async () => {
      if (token) {
        try {
          const response = await fetchDataSoVB();
          setdataSovb(response?.data);
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      }
    };
    fetchGetData();
  }, []);
  const so_vb_options = dataSovb?.message?.listSoVanBan?.map((opt: any) => {
    return { value: opt._id, label: opt?.name_book };
  });
  const customStyles = {
    content: {
      top: "25%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      border: "none",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [trich_yeu_modal, set_trich_yeu_modal] = useState<any>();

  const openModal = (document: any) => {
    setSelectedDocument(document);
    setIsOpen(true);
    const textContent: any = new DOMParser().parseFromString(
      document?.cv_trich_yeu,
      "text/html"
    ).documentElement.textContent;
    const lowercaseText = textContent.toLowerCase();
    set_trich_yeu_modal(lowercaseText);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalDelete = (document: any) => {
    setSelectedDocument(document);
    setIsOpenDelete(true);
  };

  const closeModalDelete = () => {
    setIsOpenDelete(false);
  };

  const handleDelete = () => {
    // if (selectedDocument) {
    //   console.log('Đã xóa document:', selectedDocument);
    // }
    closeModalDelete();
  };
  //  Đổ data từ api
  function convertStringToArray(inputString: string): number[] {
    const parts = inputString.split("-");
    const result = parts.map((part) => parseInt(part));
    return result;
  }
  const result_type_vb = convertStringToArray(
    type_vb ? type_vb?.toString() : ""
  );
  //   Lấy ra danh sách của đến
  const [document1, setDocument1] = useState<any>([]);
  useEffect(() => {
    const fetchGetData = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await fetchData(
            token,
            "api/vanthu/history/getDetailHistoryUpdate",
            {
              type,
              type_vb: result_type_vb[0],
            }
          );
          setDocument1(
            response?.data?.data.map((item: any) => ({
              ...item,
              type: 1,
            }))
          );
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      }
    };
    fetchGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, result_type_vb[0]]);

  //   Danh sách đi
  const [document2, setDocument2] = useState<any>([]);
  useEffect(() => {
    const fetchGetData = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await fetchData(
            token,
            "api/vanthu/history/getDetailHistoryUpdate",
            {
              type,
              type_vb: result_type_vb[1],
            }
          );
          setDocument2(
            response?.data?.data.map((item: any) => ({
              ...item,
              type: 2,
            }))
          );
        } catch (error) {
          console.error("Error fetching home data:", error);
        }
      }
    };
    fetchGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, result_type_vb[1]]);

  const documentAll =
    document1 && document2 ? [...document1, ...document2] : [];
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
    <div className={styles.app}>
      <div className={styles.header}>
        <div className={styles.filter_area_box}>
          <form className={styles.form}>
            <div className={styles.filter_area_list}>
              {checkPage ? (
                <Section
                  style="filter_area_25"
                  input={
                    <Input_select
                      options={so_vb_options}
                      placeholder="Chọn sổ văn bản"
                      className="filter_area"
                      style={select_style}
                    />
                  }
                />
              ) : (
                <></>
              )}

              <Section
                style="filter_area_25"
                label={
                  <Custom_label
                    isRequired={false}
                    label_class="font_500"
                    title=""
                  />
                }
                input={
                  <Custom_input_text
                    isDisabled={false}
                    inputclass="input_text_shedule_2"
                    placeholder="Nhập từ khóa tên văn bản"
                  />
                }
              />
              <Section
                style="filter_area_25"
                input={
                  <Input_select
                    options={so_vb_options}
                    placeholder={`Tất cả ${typePage ? "văn bản" : "hợp đồng"}`}
                    className="filter_area"
                    style={select_style}
                  />
                }
              />
              <Section
                style="filter_area_25"
                input={
                  <Input_calender
                    placeholder="Từ ngày"
                    datetype="date"
                    calender_class="filter_area"
                    calender_label_class="filter_area_label"
                  />
                }
              />
              <Section
                style="filter_area_25"
                input={
                  <Input_calender
                    placeholder="Đến ngày"
                    datetype="date"
                    calender_class="filter_area"
                    calender_label_class="filter_area_label"
                  />
                }
              />
              <div className={styles.filter_area_25}>
                <button className={styles.top_btn}>
                  <div className={styles.flex}>
                    <Image
                      className={styles.search_icon}
                      alt=""
                      src="/icon/icon_search_white.png"
                      width={17}
                      height={17}
                    />
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.p_10}>
        <div className={styles.title}>
          <Link href={"/van-thu-luu-tru/trang-chu-quan-ly-cong-van/lich-su-cap-nhat"}>
            <Image
              src={"/icon/img5.png"}
              width={10}
              height={18}
              alt=""
              className={styles.close_detl}
            />
          </Link>
          <p>{title}</p>
        </div>
        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>{typePage ? "Số văn bản" : "Số hợp đồng"}</th>
                <th>{typePage ? "Tên văn bản" : "Tên hợp đồng"}</th>
                <th>{typePage ? "Sổ văn bản" : "Sổ hợp đồng"}</th>
                <th>{typePage ? "Loại văn bản " : "Loại hợp đồng"}</th>
                <th>Trích yếu </th>
                <th>Thời gian {checkPage ? "chỉnh sửa " : "khôi phục"}</th>
                <th>Lịch sử {checkPage ? "chỉnh sửa " : "khôi phục"}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {documentAll?.map((document: any, index) => {
                const textContent: any = new DOMParser().parseFromString(
                  document?.cv_trich_yeu,
                  "text/html"
                ).documentElement.textContent;
                const lowercaseText = textContent.toLowerCase();
                return (
                  <tr key={document._id}>
                    <td>{index + 1}</td>
                    <td>{document.cv_so}</td>
                    <td>{document.cv_name}</td>
                    <td>{document.cv_id_book}</td>
                    <td>
                      <div>
                        <p>
                          {" "}
                          {typePage ? "Văn bản " : "Hợp đồng "}{" "}
                          {document.type == 1 ? "đến" : ""}
                          {document.type == 2 ? "đi" : ""}
                        </p>
                      </div>
                    </td>
                    <td>
                      {lowercaseText}
                      <h5
                        onClick={() => openModal(document)}
                        style={{ cursor: "pointer" }}
                      >
                        (Xem Thêm)
                      </h5>
                      <ReactModal
                        isOpen={isOpen}
                        onRequestClose={closeModal}
                        contentLabel="Modal"
                        style={customStyles}
                        overlayClassName={styles.overlay}
                      >
                        <div className={styles.modal}>
                          <div className={styles.header_modal}>
                            <p>Trích yếu văn bản</p>
                            <button
                              onClick={closeModal}
                              style={{
                                background: "none",
                                border: "none",
                                fontSize: "16px",
                                color: "#fff",
                              }}
                            >
                              <AiOutlineClose />
                            </button>
                          </div>
                          <div
                            style={{ backgroundColor: "#fff" }}
                            className={styles.content_modal}
                          >
                            <p>{trich_yeu_modal}</p>
                            <button onClick={closeModal}>Đóng</button>
                          </div>
                        </div>
                      </ReactModal>
                    </td>
                    <td>
                      {checkPage
                        ? convertUnixTimestamp(
                            document?.cv_time_edit,
                            timeFormat,
                            dateFormat
                          )
                        : convertUnixTimestamp(
                            document?.cv_time_kp,
                            timeFormat,
                            dateFormat
                          )}
                    </td>
                    <td>
                      <Link
                        href={`/van-thu-luu-tru/trang-chu-quan-ly-cong-van/lich-su-cap-nhat/chi-tiet/${
                          checkPage ? 1 : 2
                        }/${document._id}`}
                        style={{ color: "#4C5BD4" }}
                      >
                        Xem chi tiết
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => openModalDelete(document)}>
                        <Image
                          alt=""
                          src="/icon/img_xoa.png"
                          width={25}
                          height={25}
                        />
                      </button>
                      <ReactModal
                        isOpen={isOpenDelete}
                        onRequestClose={closeModalDelete}
                        contentLabel="test"
                        style={customStyles}
                        overlayClassName={styles.overlay}
                      >
                        <div className={styles.modal}>
                          <div className={styles.header_modal}>
                            <p>Xóa văn bản</p>
                            <button
                              onClick={closeModal}
                              style={{
                                background: "none",
                                border: "none",
                                fontSize: "16px",
                                color: "#fff",
                              }}
                            >
                              <AiOutlineClose />
                            </button>
                          </div>
                          <div
                            style={{ backgroundColor: "#fff" }}
                            className={styles.content_modal}
                          >
                            <p>Bạn có chắc chắn xóa văn bản</p>
                            <p>{selectedDocument?.title}</p>
                            <div className={styles.flex}>
                              <button
                                style={{
                                  width: "100px",
                                  color: "#4C5BD4",
                                  background: "#ffffff",
                                  border: " 1px solid #4C5BD4",
                                }}
                                className={styles.btn_close}
                                onClick={closeModalDelete}
                              >
                                Đóng
                              </button>
                              <button
                                style={{ width: "100px" }}
                                className={styles.btn_delete}
                                onClick={handleDelete}
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </ReactModal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;
