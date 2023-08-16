import React, { useState } from 'react'
import styles from "@/components/crm/quote/quote.module.css";

type Props = {}
import ModalThemMoiLichhen from "@/components/crm/cskh/modal/modalthemmoilichhen";
import TableDataLichhen from "@/components/crm/table/table-lich-hen-quote";
import OrderDetailSelectBox from '@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_select';
const Lich_hen_potential = (props: Props) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalAdd, setIsShowModalAdd] = useState(false);
    const [activeTab, setActiveTab] = useState("tab1");
    const [isShowModalAddTL, setIsShowModalAddTL] = useState(false);
    const [isShowModalShareCS, setIsShowModalShareCS] = useState(false);
    const handleTabChange = (key: any) => {
        setActiveTab(key);
      };
      const onClose = () => {
        setIsShowModalAdd(false);
        setIsShowModal(false);
        setIsShowModalAddTL(false)
        setIsShowModalShareCS(false)
      };
      const handleAddDB = () => {
        setIsShowModalAdd(false);
      };
  return (
    <div className={styles.main_importfile}>
    <div className={styles.formInfoStep}>
      <div className={styles.info_step}>
        <div className={styles.form_add_potential}>
          <div className={`${styles.main__control_btn} `}>
            <div
              style={{ display: "flex", paddingBottom: 20 }}
              className={`${styles.main__control_btn}`}
            >
              <div
                style={{ paddingBottom: 10, width: 100 }}
                className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
              >
                <label htmlFor="" className="">
                  Thời gian thực hiện:{" "}
                </label>
                <div
                  className={`${styles.input_item_time} flex_between`}
                >
                  <input type="date" name="" id="start_time" />-
                  <input type="date" name="" id="start_time" />
                </div>
              </div>
              <OrderDetailSelectBox
                title="Nhân viên thực hiện:"
                value="Tất cả"
              />

          
            </div>
          </div>
          <div style={{paddingBottom:20}}>
          <OrderDetailSelectBox
                title="Trạng thái:"
                value="Tất cả"
              />
          </div>
    
          <div className={`${styles.main__control_btn} flex_between`}>
            <div className={styles.main__control_search}>
              <form onSubmit={() => false}>
                <input
                  type="text"
                  className={styles.input__search}
                  name="search"
                  defaultValue=""
                  placeholder="Tìm kiếm theo tên lịch hẹn"
                />
                <button className={styles.kinh_lup}>
                  <img
                    className={styles.img__search}
                    src="https://crm.timviec365.vn/assets/icons/search.svg"
                    alt=""
                  />
                </button>
              </form>
            </div>
            <div className={`${styles.main__control_add} flex_end`}>
              <button
                onClick={() => setIsShowModalAdd(true)}
                type="button"
                className={`${styles.dropbtn_add} flex_align_center`}
              >
                <img src="/crm/add.svg" />
                Thêm mới
              </button>
            </div>
          </div>
          <TableDataLichhen />
          <ModalThemMoiLichhen
            isShowModalAdd={isShowModalAdd}
            onClose={onClose}
            handleAddDB={handleAddDB}
          />
        </div>
      </div>
    </div>
  </div>  )
}
export default Lich_hen_potential;