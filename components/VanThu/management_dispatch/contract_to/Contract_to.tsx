import React, { useState } from "react";
import styles from "./contract_to.module.css";
import { Btn_Add, Btn_Bot } from "../button/Button";
import Filter_area from "@/components/VanThu/fillter_area_contract/filter_area";
import Modal_contract from "../modal_contract/Model_contract_come";
import Table_contract from "../table/table_contract";
import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";
export const select_style = {
  control: (provided: any) => ({
    ...provided,
    height: "30px",
  }),
};
interface ComponentProps {
  total_vb: any;
  data?: any[];
}
const Contract_to: React.FC<ComponentProps> = ({ data, total_vb }) => {
  // Phân trang
  const ItemsPerPage = 8;
  const [totalItems, setTotalItems] = useState<number>(total_vb);
  const totalPages = Math.ceil(totalItems / ItemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCookie("pageHD", pageNumber);
  };
  setCookie("pageSizeHD", ItemsPerPage);
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
            <Btn_Add title={"Thêm mới hợp đồng đến"} />
          </div>
          <Modal_contract
            href="/ds-hop-dong/hop-dong-den/"
            isOpen={modalOpen}
            onClose={handleCloseModal}
            title="Thêm mới hợp đồng đến"
            feature="Thêm mới"
          ></Modal_contract>
          <div>
            <Filter_area
              type={1}
              api="/api/vanthu/contract/getListContract"
              onDataArrayChange={handleDataArrayChange}
              onResetArray={resetArray}
            />
          </div>
          <Table_contract
            href="/ds-hop-dong/hop-dong-den/"
            listContracts={isSearch ? dataArray : data}
          />
          <div style={{ marginTop: "15px" }}>
            {!isSearch && data && (
              <div className={styles.paginate}>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber: any) => (
                  <li key={pageNumber} className={styles.li_navi}>
                    <Link
                      href="/ds-hop-dong/hop-dong-den/"
                      onClick={() => handlePageChange(pageNumber)}
                      style={{
                        backgroundColor:
                          getCookie("pageHD") == pageNumber ? "#ccc" : "",
                        cursor:
                          getCookie("pageHD") == pageNumber
                            ? "not-allowed"
                            : "",
                      }}
                      className={styles.btn_navigation}
                    >
                      {pageNumber}
                    </Link>
                  </li>
                ))}
              </div>
            )}
            <Btn_Bot
              data={isSearch ? dataArray : data}
              name_list="danh_sach_hop_dong_den"
              title={"Xuất Excel"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contract_to;
