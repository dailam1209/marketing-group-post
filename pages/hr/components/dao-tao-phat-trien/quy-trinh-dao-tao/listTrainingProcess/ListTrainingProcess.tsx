/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import styles from "./ListTrainingProcess.module.css";
import { useRouter } from "next/router";
import AddTrainingProcess from "../addTrainingProcess/AddTrainingProcess";
import DeleteTrainingProcess from "../deleteTrainingProcess/DeleteTrainingProcess";
import BodyFrameFooter from "@/components/bodyFrame/bodyFrame_footer/bodyFrame_footer";
import MyPagination from "@/components/pagination/Pagination";
import { getDataListProcessTrain } from "@/pages/api/dao-tao-phat-trien/TrainingProcess";
import Link from "next/link";

export default function ListTrainingProcess({ iconAdd,iconEdit, iconDelete }: any) {
  const [openModal, setOpenModal] = useState(0);
  const [animateModal, setAnimateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState<any>()
  const [data, setData] = useState<any>();
  const [newData, setNewData] = useState<any>()
  const [id, setId] = useState<any>();

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };  
  const handleOpenModalAdd = (type: any) => {
    setOpenModal(type);
    setAnimateModal(true);
  };
  const handleOpenModalDelete = (id: any) => {
    setOpenModal(2);
    setAnimateModal(true);
    setId(id);
  };

  const handleCloseModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setOpenModal(0);
    }, 300);
  };
  
  const handleSearch = (name) => {
    setName(name)
  }
  const handleNewData = (newData) => {
    setNewData(newData)
  }

  useEffect(() => {
    const getListProcessTrain = async () => {
      const response = await getDataListProcessTrain(currentPage, 5 ,name)
      setData(response?.data.data);
    }
    getListProcessTrain()
  },[newData, currentPage, name])

  return (
    <>
      <div className={`${styles.tab_content}`}>
        <div
          className={`${styles.margintop5} ${styles.tab_pane} ${styles.fade} ${styles.in}  ${styles.active}`}
        >
          <div className={`${styles.list_quytrinh}`}>
            <div className={`${styles.add_quytrinh}`}>
              <div className={`${styles.add_quytrinh1}`}>
                {iconAdd && (
                  <button
                  className={`${styles.adds}`}
                  onClick={() => handleOpenModalAdd(1)}
                >
                  <picture>
                    <img src={`/add.png`} alt="+" />
                  </picture>
                  <p>Thêm mới</p>
                </button>
                )}
              </div>
              {openModal === 1 && (
                <AddTrainingProcess
                  animation={animateModal}
                  closeModal={handleCloseModal}
                  handleNewData = {handleNewData}
                ></AddTrainingProcess>
              )}
              {openModal === 2 && (
                <DeleteTrainingProcess
                  animation={animateModal}
                  closeModal={handleCloseModal}
                  id={id}
                  handleNewData = {handleNewData}
                ></DeleteTrainingProcess>
              )}
              <div className={`${styles.search_quytrinh}`}>
                <form className={`${styles.t_form_search}`} method="POST">
                  <div className={`${styles.t_div_search}`}>
                    <input
                      type="search"
                      placeholder="Tìm kiếm"
                      spellCheck={false}
                      name="search"
                      onChange={(e) => handleSearch(e.target.value)}
                    ></input>
                    <button className={`${styles.button_search}`}>
                      <picture>
                        <img
                          src={`/icon-search.png`}
                          alt="search"
                        ></img>
                      </picture>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className={`${styles.all_quytrinh}`}>
              {data?.data.map((item) => (
               <div key={item.id}>
                  <div className={`${styles.quytrinh_item}`}>
                    <div className={`${styles.quytrinh_item1}`}>
                    <Link
                      passHref
                      href={{
                        pathname:
                          `/dao-tao-phat-trien/quy-trinh-dao-tao/${item.id}`,
                          query: {iconAdd: iconAdd?.toString(),iconEdit: iconEdit?.toString(), iconDelete: iconDelete?.toString() }
                      }}
                      as = {`/dao-tao-phat-trien/quy-trinh-dao-tao/${item.id}`}
                    >
                      <div className={`${styles.quytrinh_item11_link}`}>
                      (QTĐT{item.id}) {item.name}
                      </div>
                    </Link>

                      <div className={`${styles.quytrinh_item12}`}>
                        <li>{item.description}</li>
                      </div>
                    </div>

                    {iconDelete && (
                      <div className={`${styles.quytrinh_item2}`}>
                      <button onClick={() => handleOpenModalDelete(item.id)}>
                        <picture>
                          <img src={`/trash.png`} alt="Xóa"></img>
                        </picture>
                      </button>
                    </div>
                    )}
                  </div>
                  <hr className={`${styles.shr}`}></hr>
                </div>
              ))}
            </div>
          </div>
        </div>
        {data?.totalCount > 5 && (
           <div className={`${styles.pagination}`}>
          <MyPagination
            current={currentPage}
            total={data?.totalCount}
            pageSize={5}
            onChange={handlePageChange}
          />
        </div>
        )}
       
        <BodyFrameFooter src="https://www.youtube.com/embed/U0c_dQb-6z0"></BodyFrameFooter>
      </div>
    </>
  );
}
