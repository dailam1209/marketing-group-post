import React, { useEffect, useState } from "react";
import styles from "./ListRecruitmentStage.module.css";
import EditRecruitmentStage from "../editRecruitmentStage/editRecruitmentStage";
import DeleteRecruitmentStage from "../deleteRecruitmentStage/deleteRecruitmentStage";

export interface ListRecruitmentStage { }

export default function ListRecruitmentStage({
  item,
  recruitment,
  index,
  onDelete,
  onEdit,
  iconEdit,
  iconDelete,
}) {
  const [animateModal, setAnimateModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const getFirstSentence = (description) => {
    if (!description || typeof description !== "string") {
      return "";
    }
    const sentences = description.split(".");
    if (sentences.length > 0) {
      return sentences[0] + ".";
    }
    return description;
  };

  const descriptionToShow = isExpanded
    ? item?.description
    : getFirstSentence(item?.description);

  const handleCloseModal = () => {
    setAnimateModal(false);
    onDelete()
    onEdit()
    setTimeout(() => {
      setOpenModalEdit(false);
      setOpenModalDelete(false);
      setVisible(false);
      setHidden(false);
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
    <div key={item?.id}>
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
                    <img src={`${"/3cham.png"}`} alt="setting"></img>
                  </picture>
                  {visible && (
                    <>
                      {!hidden && (
                        <div className={`${styles.settings_hover}`}>
                          {iconEdit && (
                            <li onClick={() => handleItemClickEdit(item)}>
                              Chỉnh sửa
                            </li>
                          )}
                          <hr
                            style={{ marginTop: "0", marginBottom: "0" }}
                          ></hr>
                          {iconDelete && (
                            <li onClick={() => handleItemClickDelete(item)}>
                              Xóa
                            </li>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
                {openModalEdit && (
                  <>
                    <EditRecruitmentStage
                      data={item}
                      animation={animateModal}
                      onCloseModal={handleCloseModal}
                      newDataEdit={onEdit}
                    />
                  </>
                )}
                {openModalDelete && (
                  <>
                    <DeleteRecruitmentStage
                      data={item}
                      recruitment={recruitment}
                      animation={animateModal}
                      onCloseModal={handleCloseModal}
                      newDataDelete={onDelete}
                    />
                  </>
                )}
              </div>
              <ul>
                <li>
                  <picture>
                    <img src={`${"/right_blue.png"}`} alt=""></img>
                  </picture>
                  Thành viên thực hiện:
                  <span> {item.positionAssumed} </span>
                </li>

                <li>
                  <picture>
                    <img src={`${"/right_blue.png"}`} alt=""></img>
                  </picture>
                  Mục tiêu:
                  <span>{item.target} </span>
                </li>

                <li>
                  <picture>
                    <img src={`${"/right_blue.png"}`} alt=""></img>
                  </picture>
                  Thời gian định lượng:
                  <span> {item?.completeTime} </span>
                </li>

                <li>
                  <picture>
                    <img src={`${"/right_blue.png"}`} alt=""></img>
                  </picture>
                  Mô tả công việc:
                  <span
                    className={`${styles.view_detail_desc}`}
                    onClick={toggleExpansion}
                  >
                    (Xem chi tiết)
                  </span>
                  <div className={`${styles.motacv}`}>
                    <p>{descriptionToShow}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
}
