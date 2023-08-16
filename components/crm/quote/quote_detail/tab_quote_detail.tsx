import React, { useState } from "react";
import { Button, Tabs } from "antd";
import Link from "next/link";
import styles from "../quote.module.css";
import AddQuoteDetailTable from "@/components/crm/quote/quote_detail/quote_detail_table";
const { TabPane } = Tabs;
import TableDataQuoteDetailBill from "@/components/crm/table/table-quote-detail-bill";
import QuoteDetailBillInputGroup from "@/components/crm/quote/quote_detail/quote_detail_bill_input_group";
import AddQuoteDetailInfo from "@/components/crm/quote/quote_detail/quote_detail_diary";
import AddQuoteDetailStatus from "./quote_detail_status";
import ModalThemMoiLichhen from "@/components/crm/cskh/modal/modalthemmoilichhen";
import TableDataLichhen from "@/components/crm/table/table-lich-hen-quote";
import OrderDetailSelectBox from "@/components/crm/order/order_detail/order_detail_action_modal/order_detail_select";
import ModalAddTL from "../quote_action_modal/m-dal-themmoi-tailieudinhkem";
import TableAddTLDK from "@/components/crm/table/table-tailieudinhkem";
import TableTLChiaSe from "@/components/crm/table/table-DSchia-se";
import ShareDSCSActionModal from "../quote_action_modal/share_dsChiaSe.mdal";
import Form_quote_detail from "../form_quote/form_quote-detail";
const TabComponent = () => {
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
    <div>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Thông tin chi tiết" key="tab1">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                <div style={{ display: "flex", justifyContent: "end",paddingBottom:20}}>
                      <Button>
                      <Link href={"/quote/form_quote/list_form_quote"} style={{ display: "flex" }} >
                        <div>
                          <img
                            src="https://crm.timviec365.vn/assets/icons/change_quote.svg"
                            alt=""
                          />
                        </div>
                        <div>Đổi mẫu</div>
                      </Link>
                      </Button>
                     
                    </div>
                  <div className={styles.main__body}>
                    {/* <AddQuoteDetailTable /> */}
                    <Form_quote_detail
                   
                    />
                 
                  </div>
                  <div className={styles.main__body}>
                    <AddQuoteDetailStatus />
                  </div>
                </div>
                <div>&nbsp;</div>
                <div className={styles.main__title}>Nhật ký</div>
                <div className={styles.form_add_potential}>
                  <div className={styles.main__body}>
                    <AddQuoteDetailInfo />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPane>

        <TabPane tab="Đơn hàng" key="tab3">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div
                    style={{ display: "flex", paddingBottom: 20 }}
                    className={`${styles.main__control_btn}`}
                  >
                    <div
                      style={{ paddingBottom: 10, width: 100 }}
                      className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
                    >
                      <label htmlFor="" className="">
                        Ngày hóa đơn:{" "}
                      </label>
                      <div className={`${styles.input_item_time} flex_between`}>
                        <input type="date" name="" id="start_time" />
                      </div>
                    </div>
                    <OrderDetailSelectBox title="Tình trạng:" value="Tất cả" />
                  </div>

                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={() => false}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="search"
                          defaultValue=""
                          placeholder="Tìm kiếm theo số đơn hàng, người thực hiện"
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
                      <Link href="/order/add">
                        <button
                          type="button"
                          className={`${styles.dropbtn_add} flex_align_center`}
                        >
                          <img src="/crm/add.svg" />
                          Thêm mới
                        </button>
                      </Link>
                    </div>
                  </div>
                  <TableDataQuoteDetailBill />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Lịch hẹn" key="tab4">
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

                      <OrderDetailSelectBox
                        title="Tình trạng:"
                        value="Tất cả"
                      />
                    </div>
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
          </div>
        </TabPane>
        <TabPane tab="Tài liệu đính kèm" key="tab6">
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
        </TabPane>
        <TabPane tab="Danh sách chia sẻ" key="tab7">
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
                          placeholder="Tìm kiếm theo đối tượng được chia sẻ"
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
                        onClick={() => setIsShowModalShareCS(true)}
                        type="button"
                        className={`${styles.dropbtn_add} flex_align_center`}
                      >
                        <img src="https://crm.timviec365.vn/assets/img/crm/customer/share_white.svg" />
                       Chia sẻ
                      </button>
                    </div>
                  </div>
                  <TableTLChiaSe />
                <ShareDSCSActionModal
                isShowModalShareCS={isShowModalShareCS}
                onClose={onClose}
                />
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabComponent;
