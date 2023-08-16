import ModalAddTL from '@/components/crm/quote/quote_action_modal/m-dal-themmoi-tailieudinhkem'
import TableAddTLDK from '@/components/crm/table/table-tailieudinhkem'
import React, { useState } from 'react'
import styles from "@/components/crm/quote/quote.module.css";
import ModalThemMoiLichhen from "@/components/crm/cskh/modal/modalthemmoilichhen";
import TableDataLichhen from "@/components/crm/table/table-lich-hen-quote";
import OrderDetailSelectBox from '@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_select';

type Props = {}

const Tai_lieu_dinh_kem_potetial = (props: Props) => {
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
          <div className={`${styles.main__control_btn} `}></div>
          <div className={`${styles.main__control_btn} flex_between`}>
            <div className={styles.main__control_search}>
              <form onSubmit={() => false}>
                <input
                  type="text"
                  className={styles.input__search}
                  name="search"
                  defaultValue=""
                  placeholder="Tìm kiếm theo tên tài liệu đính kèm"
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
                onClick={() => setIsShowModalAddTL(true)}
                type="button"
                className={`${styles.dropbtn_add} flex_align_center`}
              >
                <img src="/crm/add.svg" />
                Thêm mới
              </button>
            </div>
          </div>
          <TableAddTLDK />
          <ModalAddTL
            isShowModalAddTL={isShowModalAddTL}
            onClose={onClose}
            handleAddDB={handleAddDB}
          />
        </div>
      </div>
    </div>
  </div>
  )
}
export default Tai_lieu_dinh_kem_potetial;