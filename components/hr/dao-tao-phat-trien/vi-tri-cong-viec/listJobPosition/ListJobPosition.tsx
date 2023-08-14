/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./ListJobPosition.module.css";
import AddJobPosition from "../addJobPosition/AddJobPosition";
import DeleteJobPosition from "../deleteJobPosition/DeleteJobPosition";
import BodyFrameFooter from "@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer";
import MyPagination from "@/components/hr/pagination/Pagination";
import { getDataJobPosition } from "@/pages/hr/api/dao-tao-phat-trien/JobPosition";

export default function ListJobPosition({ iconAdd, iconDelete }: any) {
  const [openModal, setOpenModal] = useState(0);
  const [animateModal, setAnimateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any>();
  const [id, setId] = useState<any>();
  const [newData, setNewData] = useState<any>();

  const handleOpenModalDelete = (id: any) => {
    setOpenModal(2);
    setAnimateModal(true);
    setId(id);
  };
  const handleOpenModalAdd = () => {
    setOpenModal(1);
    setAnimateModal(true);
  };

  const handleCloseModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setOpenModal(0);
    }, 300);
  };
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleNewData = (newData) => {
    setNewData(newData);
  };
  useEffect(() => {
    const GetJobPosition = async () => {
      const response = await getDataJobPosition(currentPage, 10);
      setData(response?.data.data);
    };
    GetJobPosition();
  }, [currentPage, newData]);

  return (
    <>
      <div className={`${styles.tuyendung2}`} style={{ display: "block" }}>
        <div className={`${styles.tuyendung2_3}`}>
          {iconAdd && (
            <button
              onClick={() => handleOpenModalAdd()}
              className={`${styles.adds}`}
            >
              <picture>
                <img src={`/add.png`} alt="+"></img>
              </picture>
              Thêm mới
            </button>
          )}
        </div>

        {openModal === 1 && (
          <AddJobPosition
            animation={animateModal}
            closeModal={handleCloseModal}
            addData={handleNewData}
          ></AddJobPosition>
        )}
        {openModal === 2 && (
          <DeleteJobPosition
            animation={animateModal}
            closeModal={handleCloseModal}
            id={id}
            deleteData={handleNewData}
          ></DeleteJobPosition>
        )}
        <div className={`${styles.tuyendung2_2}`}>
          <form className={`${styles.t_form_search}`}>
            <div
              className={`${styles.t_div_search}`}
              style={{ display: "none" }}
            >
              <input
                type="search"
                placeholder="Tìm kiếm"
                name="search"
                spellCheck="false"
                autoComplete="off"
                className={`${styles.search_text}`}
              ></input>
              <button className={`${styles.search_button}`}>
                <picture>
                  <img src={`${"/icon-search.png"}`} alt="search"></img>
                </picture>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={`${styles.tab_content}`}>
        <div
          className={`${styles.member_list}`}
          style={{ overflowY: "scroll" }}
        >
          <table className={`${styles.table} ${styles.tablelist}`}>
            <thead>
              <tr>
                <th className={`${styles.firstth}`}>STT</th>
                <th>Vị trí</th>
                <th>Phòng ban</th>
                <th>Mô tả công việc</th>
                <th>Yêu cầu công việc</th>
                <th>Lộ trình thăng tiến</th>
                {iconDelete && <th className={`${styles.lastth}`}></th>}
              </tr>
            </thead>
            <tbody className={`${styles.filter}`}>
              {data?.data.map((item: any) => {
                if (item.isDelete !== 0) {
                  return;
                } else {
                  return (
                    <tr key={item.id} style={{ height: "37px" }}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.depName}</td>
                      <td>{item.des}</td>
                      <td>{item.jobRequire}</td>
                      <td>
                        {item.roadMap ? (
                          <a href={item.roadMap}>{item.roadMap}</a>
                        ) : (
                          <p>Chưa cập nhật</p>
                        )}
                      </td>

                      {iconDelete && (
                        <td
                          onClick={() => handleOpenModalDelete(item.id)}
                          className={`${styles.r_t_top_right}`}
                          style={{
                            position: "relative",
                            width: "110px",
                            opacity: "1",
                          }}
                        >
                          <img
                            src={`/trash.png`}
                            alt="Tùy chỉnh"
                            style={{ paddingTop: "6px" }}
                          />
                        </td>
                      )}
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
      {data?.totalCount > 10 && (
        <div className={`${styles.pagination}`}>
          <MyPagination
            current={currentPage}
            total={data?.totalCount}
            pageSize={10}
            onChange={handlePageChange}
          />
        </div>
      )}

      <BodyFrameFooter src="https://www.youtube.com/embed/6k7iZ3ZrW2s"></BodyFrameFooter>
    </>
  );
}
