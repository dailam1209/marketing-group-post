import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./detail_text_go.module.css";
import Comp_sidebar_detail from "@/components/VanThu/comp_sidebar_detail/Comp_sidebar_detail";
import Image from "next/image";
import Item_detail_person from "@/components/VanThu/comp_sidebar_detail/Item_detail_person";
import Modal_del from "@/components/VanThu/management_dispatch/model-dispatch/Model_del";
import Modal_dis_update_go from "@/components/VanThu/management_dispatch/model-dispatch/Model_Update_dispatch_go";
import { fetchData, fetchListSoVB } from "@/utils/BaseApi";
import { fetchNoiGui, fetch_list_employs } from "@/utils/ShareApi";

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [dataDetail, setdataDetail] = useState<any>(null);
  //  Lấy ra văn bản chi tiết theo id
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const fetchGetDataDetail = async () => {
        try {
          const response = await fetchData(
            token,
            "/api/vanthu/listVanBan/getDetail",
            { id: id }
          );
          if (response) {
            const name_book = await fetchListSoVB(
              response?.data?.data?.cv_id_book
            );
            const location = await fetchNoiGui(
              response?.data?.data?.cv_phong_soan
            );
            const noi_nhan = await fetchNoiGui(
              response?.data?.data?.cv_nhan_noibo
            );
            const list_emps = await fetch_list_employs();
            const name_user_soan = list_emps.find(
              (item: any) => item._id === response?.data?.data?.cv_user_soan
            )?.userName;
            const name_user_save = list_emps.find(
              (item: any) => item._id === response?.data?.data?.cv_user_save
            )?.userName;
            const name_user_ky = list_emps.find(
              (item: any) => item._id === response?.data?.data?.cv_user_ky
            )?.userName;
            const newDataDetail = {
              ...response?.data?.data, // Giữ lại các trường trước đó
              name_book, // Thêm trường mới
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
  }, [id]);

  // Modal update
  const [openModelUpdate, setOpenModalUpdate] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const handleUpdate = (item: any) => {
    setSelectedItem(item);
    setOpenModalUpdate(true);
  };
  const closeModalUpdate = () => {
    setOpenModalUpdate(false);
  };
  // Modal delete
  const [showModalDel, setShowModalDel] = useState(false);
  const closeModal = () => {
    setShowModalDel(false);
  };
  const handleClickDel = (item: any) => {
    setSelectedItem(item);
    setShowModalDel(true);
  };
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

  return (
    <div className={styles.container}>
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
                      router.push("/VanThu/ds-van-ban/vb-den");
                    }}
                  />
                  <p className={styles.title_list}>
                    Trở lại danh sách văn bản đến
                  </p>
                  <Image
                    src={"/icon/management_dispatch/sua.png"}
                    width={24}
                    height={24}
                    alt=""
                    className={styles.img_edit}
                    onClick={() => {
                      handleUpdate(dataDetail);
                    }}
                  />
                  <Image
                    src={"/icon/management_dispatch/xoa.png"}
                    width={24}
                    height={24}
                    alt=""
                    className={styles.img_del}
                    onClick={() => handleClickDel(dataDetail)}
                  />
                </div>
              </div>
              <div className={styles.title_detail}>
                <h2
                  style={{
                    color: "#4C5BD4",
                    margin: "20px 40px",
                    fontSize: "20px",
                  }}
                >
                  {dataDetail?.cv_name}
                </h2>
                <div className={styles.content}>
                  <h3 style={{ marginLeft: "40px" }}>Thông tin chung</h3>
                  <ul style={{ marginLeft: "20px" }} className={styles.list_li}>
                    <li>Số văn bản: {dataDetail?.cv_so} </li>
                    <li>Sổ văn bản:{dataDetail?.name_book} </li>
                    <li>Nơi gửi: {dataDetail?.location} </li>
                    <li>Ngày nhận: {formatDate(dataDetail?.cv_date)} </li>
                    <li>Trích yếu văn bản: {lowercaseText} </li>
                    <li>Ghi chú:{dataDetail?.cv_ghi_chu} </li>

                    {dataDetail?.cv_file ? (
                      <li>Tệp đính kèm:{dataDetail?.cv_file}</li>
                    ) : (
                      <li>Không có tệp đính kèm</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <Comp_sidebar_detail>
              <div className={styles.main_right}>
                {dataDetail?.name_user_soan && (
                  <Item_detail_person
                    detail="Người gửi"
                    username={dataDetail?.name_user_soan}
                    id={dataDetail?.cv_user_soan}
                  />
                )}
                {dataDetail?.noi_nhan && (
                  <div className={styles.recipients}>
                    <p>Nơi nhận</p>
                    <div>
                      <p style={{ color: "#4C5BD4" }}>
                        {dataDetail?.noi_nhan}{" "}
                      </p>
                    </div>
                  </div>
                )}

                {dataDetail?.name_user_ky && (
                  <Item_detail_person
                    detail="Người ký"
                    username={dataDetail?.name_user_ky}
                    id={dataDetail?.cv_user_ky}
                  />
                )}
                {dataDetail?.name_user_save && (
                  <Item_detail_person
                    detail="Người lưu trữ"
                    username={dataDetail?.name_user_save}
                    id={dataDetail?.cv_user_save}
                  />
                )}
              </div>
            </Comp_sidebar_detail>
          </div>
        </div>
      </div>
      <Modal_dis_update_go
        href={`/VanThu/ds-van-ban/vb-di/${dataDetail?._id}`}
        title="Chỉnh sửa hợp đồng đến"
        onClose={closeModalUpdate}
        item={selectedItem}
        isOpen={openModelUpdate}
        feature="Cập nhật"
      />
      {showModalDel && selectedItem && (
        <Modal_del
          item={selectedItem}
          closeModal={closeModal}
          href={"/VanThu/ds-van-ban/vb-di"}
        />
      )}
    </div>
  );
};

export default Index;
