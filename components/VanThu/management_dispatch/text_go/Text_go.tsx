import React, { useState } from "react";
import styles from "./go_text.module.css";
import { Btn_Add, Btn_Bot } from "../button/Button";
import Filter_area from "@/components/VanThu/document_go/filter_area";
import Modal from "../model-dispatch/Model_dispatch";
import Table_text from "../table/table_text";
import Link from "next/link";
import { getCookie, setCookie } from "cookies-next";
import Modal_dis_go from "../model-dispatch/Model_dispatch_go";
interface ComponentProps {
  total_vb: any;
  data?: any[];
}
const Text_go: React.FC<ComponentProps> = ({ data, total_vb }) => {
  // Phân trang
  const ItemsPerPage = 8;
  const [totalItems, setTotalItems] = useState<number>(total_vb);
  const totalPages = Math.ceil(totalItems / ItemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCookie("page", pageNumber);
  };
  setCookie("pageSize", ItemsPerPage);
  const [modalOpen, setModalOpen] = useState(false);
  const [dataArray, setDataArray] = useState<string[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleDataArrayChange = (newDataArray: string[]) => {
    setDataArray(newDataArray);
  };

  const resetArray = () => {
    setIsSearch(true);
    setDataArray([]);
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.home_main}>
          <div className={styles.control_add} onClick={handleOpenModal}>
            <Btn_Add title={"Thêm mới văn bản đi"} />
          </div>
          <Modal_dis_go
            href="/VanThu/ds-van-ban/vb-di"
            isOpen={modalOpen}
            onClose={handleCloseModal}
            title="Thêm mới văn bản đi"
            feature="Thêm mới"
          ></Modal_dis_go>
          <div className={styles.control}>
            <Filter_area
              type={2}
              api="/api/vanthu/listVanBan/getListVanBan"
              onDataArrayChange={handleDataArrayChange}
              onResetArray={resetArray}
            />
          </div>
          <div className={styles.box_list}>
            <div className={styles.frame_table}>
              <div className={styles.frame_scroll}>
                <Table_text
                  href="/VanThu/ds-van-ban/vb-di/"
                  listTexts={isSearch ? dataArray : data}
                />
              </div>
            </div>
          </div>
          {!isSearch && data && (
            <div className={styles.paginate}>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber: any) => (
                  <li key={pageNumber} className={styles.li_navi}>
                    <Link
                      href="/VanThu/ds-van-ban/vb-di"
                      onClick={() => handlePageChange(pageNumber)}
                      style={{
                        backgroundColor:
                          getCookie("page") == pageNumber ? "#ccc" : "",
                        cursor:
                          getCookie("page") == pageNumber ? "not-allowed" : "",
                      }}
                      className={styles.btn_navigation}
                    >
                      {pageNumber}
                    </Link>
                  </li>
                )
              )}
            </div>
          )}
          <Btn_Bot
            data={isSearch ? dataArray : data}
            name_list="danh_sach_vb_di"
            title={"Xuất Excel"}
          />
        </div>
      </div>
    </div>
  );
};

export default Text_go;
