import React, { useState } from "react";
import styles from "./contract_go.module.css";
import { Btn_Add, Btn_Bot } from "../button/Button";
import Filter_area from "@/components/van-thu-luu-tru/fillter_area_contract/filter_area";
import Table_contract from "../table/table_contract";
import Modal_contract_go from "../modal_contract/Modal_contract_go";
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
const Contract_go: React.FC<ComponentProps> = ({ data, total_vb }) => {
  // Phân trang
  const ItemsPerPage = 8;
  const [totalItems, setTotalItems] = useState<number>(total_vb);
  const totalPages = Math.ceil(totalItems / ItemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCookie("pageHDdi", pageNumber);
  };
  setCookie("pageSizeHDdi", ItemsPerPage);
  // create
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
            <Btn_Add title={"Thêm mới hợp đồng đi"} />
          </div>
          <Modal_contract_go
            href="/van-thu-luu-tru/ds-hop-dong/hop-dong-di"
            isOpen={modalOpen}
            onClose={handleCloseModal}
            title="Thêm mới hợp đồng đi"
            feature="Thêm mới"
          ></Modal_contract_go>
          <div>
            <Filter_area
              type={2}
              api="api/vanthucontract/getListContract"
              onDataArrayChange={handleDataArrayChange}
              onResetArray={resetArray}
            />
          </div>
          <Table_contract
            listContracts={isSearch ? dataArray : data}
            href="/van-thu-luu-tru/ds-hop-dong/hop-dong-di/"
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
                      href="/van-thu-luu-tru/ds-hop-dong/hop-dong-di/"
                      onClick={() => handlePageChange(pageNumber)}
                      style={{
                        backgroundColor:
                          getCookie("pageHDdi") == pageNumber ? "#ccc" : "",
                        cursor:
                          getCookie("pageHDdi") == pageNumber
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
              name_list="danh_sach_hop_dong_di"
              data={isSearch ? dataArray : data}
              title={"Xuất Excel"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contract_go;
