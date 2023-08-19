import React, { useState, useEffect } from "react";
import styles from "./incoming_text.module.css";
import { Btn_Add, Btn_Bot } from "../button/Button";
import Modal from "../model-dispatch/Model_dispatch";
import Filter_area from "@/components/van-thu-luu-tru/document_go/filter_area";
import Table_text from "../table/table_text";
import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";

interface ComponentProps {
  total_vb: any;
  data?: any[];
}
const Text_come: React.FC<ComponentProps> = ({ data, total_vb }) => {
  // Phân trang
  const ItemsPerPage = 8;
  const [totalItems, setTotalItems] = useState<number>(total_vb);
  const totalPages = Math.ceil(totalItems / ItemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCookie("pageVBden", pageNumber);
  };
  setCookie("pageSizeVBden", ItemsPerPage);
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
            <Btn_Add title={"Thêm mới văn bản đến"} />
          </div>
          <Modal
            href="/van-thu-luu-tru/ds-van-ban/vb-den"
            isOpen={modalOpen}
            onClose={handleCloseModal}
            title="Thêm mới văn bản đến"
            feature="Thêm mới"
          ></Modal>
          <div className={styles.control}>
            <Filter_area
              type={1}
              api="/api/vanthu/listVanBan/getListVanBan"
              onDataArrayChange={handleDataArrayChange}
              onResetArray={resetArray}
            />
          </div>
          <div className={styles.box_list}>
            <div className={styles.frame_table}>
              <div className={styles.frame_scroll}>
                <Table_text
                  href="/van-thu-luu-tru/ds-van-ban/vb-den/"
                  listTexts={isSearch ? dataArray : data}
                  onOpen={handleOpenModal}
                  isOpen={modalOpen}
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
                      href="/van-thu-luu-tru/ds-van-ban/vb-den"
                      onClick={() => handlePageChange(pageNumber)}
                      style={{
                        backgroundColor:
                          getCookie("pageVBden") == pageNumber ? "#ccc" : "",
                        cursor:
                          getCookie("pageVBden") == pageNumber
                            ? "not-allowed"
                            : "",
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
            name_list="danh_sach_vb_den"
            title={"Xuất Excel"}
          />
        </div>
      </div>
    </div>
  );
};

export default Text_come;
