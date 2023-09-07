/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "./Component.module.css";

import AddModalPersonalDiscipline from "../personalDiscipline/addModalPersonalDiscipline/AddModalPersonalDiscipline";
import AddModalCollectiveDiscipline from "../collectiveDiscipline/addModalCollectiveDiscipline/AddModalCollectiveDiscipline";
import EditModalPersonalDiscipline from "../personalDiscipline/editModalPersonalDiscipline/EditModalPersonalDiscipline";
import EditModalCollectiveDiscipline from "../collectiveDiscipline/editModalCollectiveDiscipline/EditModalCollectiveDiscipline";
import EditModalListDiscipline from "../disciplineList/editModalListDiscipline/EditModalListDiscipline";
import { format } from "date-fns";

function PunishmentTable({
  display,
  data,
  violators,
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
        setModalEditType("tapthe");
        setAnimateModal(true);
      }
      if (typeModal === "list") {
        setModalEditType("list");
        setAnimateModal(true);
      }
    };
    modalEditTypes();
  }, [modalEditType]);

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
          <AddModalPersonalDiscipline
            animation={animateModal}
            onClose={handleCloseModal}
            updateData={updateData}
          ></AddModalPersonalDiscipline>
        )}

        {typeModal === "tapthe" && open && (
          <AddModalCollectiveDiscipline
            animation={animateModal}
            onClose={handleCloseModal}
            updateData={updateData}
          ></AddModalCollectiveDiscipline>
        )}

        {typeModal === "chitiet" && modalEditType === "canhan" && (
          <EditModalPersonalDiscipline
            animation={animateModal}
            onClose={handleCloseModal}
            dataOld={dataEdit}
            updateData={updateData}
          ></EditModalPersonalDiscipline>
        )}

        {typeModal === "chitiet" && modalEditType === "tapthe" && (
          <EditModalCollectiveDiscipline
            animation={animateModal}
            onClose={handleCloseModal}
            dataOld={dataEdit}
            updateData={updateData}
          ></EditModalCollectiveDiscipline>
        )}

        {typeModal === "chitiet" && modalEditType === "list" && (
          <EditModalListDiscipline
            animation={animateModal}
            onClose={handleCloseModal}
            dataOld={dataEdit}
            updateData={updateData}
          ></EditModalListDiscipline>
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
                <th>Lỗi vi phạm</th>
                <th>Căn cứ quy định</th>
                <th>Số QĐ xử lý</th>
                <th>Thời gian vi phạm</th>
                <th>Người ký QĐ</th>
                <th>Hình thức xử lý sai phạm </th>
                <th>{violators}</th>
                {iconEdit && <th className={`${styles.lastth}`}></th>}
              </tr>
            </thead>
            <tbody className={`${styles.filter}`}>
              {data?.data?.length === 0 ? (
                <p>Không có dư liệu</p>
              ) : (
                data?.data?.map((item: any) => {
                  let formattedDate: any = null;
                  {
                    item.created_at
                      ? (formattedDate = format(
                          new Date(item?.infringe_at || ""),
                          "dd-MM-yyyy"
                        ))
                      : "null";
                  }
                  return (
                    <tr key={item.id} style={{ height: "37px" }}>
                      <td>{item.id}</td>
                      <td>{item.infringe_name}</td>
                      <td>{item.regulatory_basis}</td>
                      <td>{item.number_violation}</td>
                      <td>{formattedDate}</td>
                      <td>{item.created_by}</td>
                      <td>{item.infringe_type}</td>
                      <td style={{ padding: " 0 20px", maxWidth: "2500px" }}>
                        {!item?.dep_id ? (
                          <span>{item.list_user_name}</span>
                        ) : (
                          <span>{item.dep_name}</span>
                        )}
                      </td>
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

export default PunishmentTable;
