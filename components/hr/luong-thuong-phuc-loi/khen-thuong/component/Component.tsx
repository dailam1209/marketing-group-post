/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "./Component.module.css";
import { format } from "date-fns";
import ModalAddReward from "../personalReward/modalAddPersonalCompliments/ModalAddReward";
import ModalEditPersonalCompliments from "../personalReward/modalEditPersonalCompliments/ModalEditPersonalCompliments";
import ModalEditCommendationTeam from "../commendationTeam/modalEditCommendationTeam/ModalEditCommendationTeam";
import ModalEditAchievementList from "../achievementList/modalEditAchievementList/ModalEditAchievementList";
import ModalAddTeamCompliments from "../commendationTeam/modalAddTeamCompliments/modalAddTeamCompliments";

function RewardTable({
  display,
  data,
  model,
  keyWords,
  updateData,
  iconAdd,
  iconEdit,
}: any) {
  const [visible, setVisible] = useState(true);
  const [typeModal, setTypeModal] = useState(model);
  const [open, setOpen] = useState(false);
  const [modalEditType, setModalEditType] = useState("");
  const [animateModal, setAnimateModal] = useState(false);
  const [dataEdit, setDataEdit] = useState<any>();

  const handleCloseModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setOpen(false);
      setTypeModal(model);
      setModalEditType("");
    }, 300);
  };

  const handleEdit = (dataEdit) => {
    setTypeModal("chitiet");
    setDataEdit(dataEdit);
  };

  useEffect(() => {
    const modalEditTypes = () => {
      if (typeModal === "canhan") {
        setModalEditType("canhan");
        setAnimateModal(true);
      }
      if (typeModal === "tapthe") {
        setAnimateModal(true);
        setModalEditType("tapthe");
      }
      if (typeModal === "list") {
        setAnimateModal(true);
        setModalEditType("list");
      }
    };
    modalEditTypes();
  }, [modalEditType]);

  const hinhthuckhenthuong = {
    1: "Huân Chương",
    2: "Huy Chương",
    3: "Giấy khen",
    4: "Thăng chức",
    5: "Kỉ niệm chương",
    6: "Tiền mặt",
  };

  return (
    <>
      <div className={`${styles.tuyendung2}`} style={{ display: "block" }}>
        <div className={`${styles.tuyendung2_3}`}>
          {iconAdd && (
            <button
              onClick={() => setOpen(true)}
              className={`${styles.adds}`}
              style={{ display: display }}
            >
              <picture>
                <img src={`/add.png`} alt="+"></img>
              </picture>
              Thêm mới
            </button>
          )}
        </div>
        {typeModal === "canhan" && open && (
          <ModalAddReward
            animation={animateModal}
            onClose={handleCloseModal}
            updateData={updateData}
          ></ModalAddReward>
        )}
        {typeModal === "tapthe" && open && (
          <ModalAddTeamCompliments
            animation={animateModal}
            onClose={handleCloseModal}
            updateData={updateData}
          ></ModalAddTeamCompliments>
        )}
        {typeModal === "chitiet" && modalEditType === "canhan" && (
          <ModalEditPersonalCompliments
            animation={animateModal}
            onClose={handleCloseModal}
            dataOld={dataEdit}
            updateData={updateData}
          ></ModalEditPersonalCompliments>
        )}
        {typeModal === "chitiet" && modalEditType === "tapthe" && (
          <ModalEditCommendationTeam
            animation={animateModal}
            onClose={handleCloseModal}
            dataOld={dataEdit}
            updateData={updateData}
          ></ModalEditCommendationTeam>
        )}
        {typeModal === "chitiet" && modalEditType === "list" && (
          <ModalEditAchievementList
            animation={animateModal}
            onClose={handleCloseModal}
            dataOld={dataEdit}
            updateData={updateData}
          ></ModalEditAchievementList>
        )}

        <div className={`${styles.tuyendung2_2}`}>
          <form className={`${styles.t_form_search}`}>
            <div className={`${styles.t_div_search}`}>
              <input
                type="search"
                placeholder="Tìm kiếm"
                name="search"
                spellCheck="false"
                autoComplete="off"
                className={`${styles.search_text}`}
                onChange={(e) => keyWords(e.target.value)}
              ></input>

              <picture className={`${styles.search_button}`}>
                <img src={`/icon-search.png`} alt="search"></img>
              </picture>
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
                <th>Số quyết định</th>
                <th>Nội dung khen thưởng</th>
                <th>Tên đối tượng nhận thưởng</th>
                <th>Thời điểm</th>
                <th>Hình thức khen thưởng</th>
                <th>Danh hiệu</th>
                <th>Cấp khen</th>
                {iconEdit && <th className={`${styles.lastth}`}></th>}
              </tr>
            </thead>
            <tbody className={`${styles.filter}`}>
              {data?.data.length === 0 ? (
                <p>Không có dư liệu</p>
              ) : (
                data?.data?.map((item: any) => {
                  let formattedDate: any = null;
                  {
                    item.created_at
                      ? (formattedDate = format(
                          new Date(item?.created_at || ""),
                          "dd-MM-yyyy"
                        ))
                      : "null";
                  }
                  const achievementType =
                    hinhthuckhenthuong[Number(item?.achievement_type)];
                  return (
                    <tr key={item.id} style={{ height: "37px" }}>
                      <td>{item.id}</td>
                      <td>{item.achievement_id}</td>
                      <td>{item.content}</td>
                      <td style={{ padding: " 0 20px", maxWidth: "2500px" }}>
                        {item?.dep_id == 0 ? (
                          <span>{item.list_user_name}</span>
                        ) : (
                          <span>{item.dep_name}</span>
                        )}
                      </td>
                      <td>{formattedDate}</td>
                      <td>{achievementType}</td>
                      <td>{item.appellation}</td>
                      <td>{item.achievement_level}</td>
                      {iconEdit && (
                        <td
                          className={`${styles.r_t_top_right}`}
                          style={{
                            position: "relative",
                            width: "110px",
                            opacity: "1",
                          }}
                          onMouseEnter={() => setVisible(true)}
                          onMouseLeave={() => setVisible(false)}
                        >
                          <img
                            src={`/3cham.png`}
                            alt="Tùy chỉnh"
                            style={{ paddingTop: "6px" }}
                          />

                          {visible && (
                            <div
                              className={styles.settings}
                              onClick={() => handleEdit(item)}
                            >
                              <li>Chỉnh sửa</li>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default RewardTable;
