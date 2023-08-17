import React, { useEffect, useState } from "react";
import styles from "./ListDetailTrainingProcess.module.css";

import EditDetailTrainingProcess from "../editDetailTrainingProcess/EditDetailTrainingProcess";
import DeleteDetailTrainingProcess from "../deleteDetailTrainingProcess/DeleteDetailTrainingProcess";
export interface ListDetailTrainingProcess { }

export default function ListDetailTrainingProcess({ item, index , setData, iconEdit, iconDelete}: any) {
  
  const [animateModal, setAnimateModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [visible, setVisible] = useState(false);
  
  const handleCloseModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setOpenModalEdit(false);
      setOpenModalDelete(false);
      setVisible(false);
    }, 300);
  };
  const handleItemClickEdit = (item: any) => {
    setOpenModalEdit(true);
    setAnimateModal(true);
  };
  const handleItemClickDelete = (item: any) => {
    setOpenModalDelete(true);
    setAnimateModal(true);
  };


  return (
    <div className={`${styles.all_giaidoans}`}>
      <div className={`${styles.giaidoans_item}`}>
        <div className={`${styles.giaidoans_item_1}`}>
          <div className={`${styles.circle_blue}`}>{index + 1}</div>
          <div className={`${styles.giaidoans_item_2}`}>
            <div className={`${styles.row} ${styles.r_t_top}`}>
              <div className={`${styles.row_top_right}`}>
                <p>{item.name}</p>
              </div>

              
                <div
                className={`${styles.setting}`}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
              >
                <picture>
                  <img src={`/3cham.png`} alt="setting"></img>
                </picture>
                {visible && (
                  <>
                      <div className={`${styles.settings_hover}`}>
                        {iconEdit && <li onClick={() => handleItemClickEdit(item)}>
                          Chỉnh sửa
                        </li>}
                        <hr style={{ marginTop: "0", marginBottom: "0" }}></hr>
                       {iconDelete &&  <li onClick={() => handleItemClickDelete(item)}>Xóa</li>}
                      </div>
                  </>
                )}
              </div>
            
              {openModalEdit && (
                  <EditDetailTrainingProcess
                    data={item}
                    animation={animateModal}
                    onCloseModal={handleCloseModal}
                    newData={setData}
                  />
                )}

                {openModalDelete && (
                  <DeleteDetailTrainingProcess
                    data={item}
                    animation={animateModal}
                    onCloseModal={handleCloseModal}
                    newData={setData}
                  />
                )}
            </div>
            <ul>
              <li style={{ marginBottom: "4px" }}>
                <picture>
                  <img src={`${"/right_blue.png"}`} alt=""></img>
                </picture>
                Đối tượng đào tạo:
                <span>  {item?.objectTraining}</span>
              </li>

              <li>
                <picture>
                  <img src={`${"/right_blue.png"}`} alt=""></img>
                </picture>
                Nội dung giai đoạn:{" "}
                <p className={`${styles.noidung}`}>{item?.content}</p>
                <span> </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
