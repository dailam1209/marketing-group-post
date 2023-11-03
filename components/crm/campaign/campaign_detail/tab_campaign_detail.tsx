import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../campaign.module.css";
import AddCampaignGeneralDetailInfo from "@/components/crm/campaign/campaign_detail/campaign_general_detail_info";
import Image from "next/image";
import TableDataCampaignCustomer from "@/components/crm/table/table-campaign-customer";
import TableDataCampaginChance from "@/components/crm/table/table-campaign-chance";
import TableDataCampaignOrder from "@/components/crm/table/table-campaign-order";
import TableDataCampaignBill from "@/components/crm/table/table-campaign-bill";
import TableDataCampaignAppointment from "@/components/crm/table/table-campaign-appointment";
import TableDataCampaignEmail from "@/components/crm/table/table-campaign-email";
import TableDataCampaignShareList from "@/components/crm/table/table-campaign-share-list";
import CampaignCustomerInputGroup from "@/components/crm/campaign/campaign_detail/campaign_customer_input_group";
import CampaignChanceInputGroup from "@/components/crm/campaign/campaign_detail/campaign_chance_input_group";
import CampaignOrderInputGroup from "@/components/crm/campaign/campaign_detail/campaign_order_input_group";
import CampaignBillInputGroup from "@/components/crm/campaign/campaign_detail/campaign_bill_input_group";
import CampaignAppointmentInputGroup from "@/components/crm/campaign/campaign_detail/campaign_appointment_input_group";
import CampaignEmailInputGroup from "@/components/crm/campaign/campaign_detail/campaign_email_input_group";
// import TableDataOrderQuote from "@/components/crm/table/table-order-quote";
import CustomerSelectModal from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal//customer_select_action_mdal";
import ShareActionModal from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/share_campaign_action_mdal";
import { Tabs } from "antd";
import { fetchApi } from "../../ultis/api";
import Cookies from "js-cookie";

const TabComponent = ({ formFields }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const [isNumberSelected, setNumberSelected] = useState(0);
  const token = Cookies.get("token_base365");
  const [emp, setEmp] = useState([]);
  const [body, setBody] = useState<any>({ page: 1, pageSize: 1 });

  const fetchAPIEmployee = async () => {
    const dataApi = await fetchApi(
      "http://210.245.108.202:3000/api/qlc/managerUser/listUser",
      token,
      { page: 1, pageSize: 10000 },
      "POST"
    );
    setEmp(dataApi?.data?.data);
  };

  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };

  useEffect(() => {
    fetchAPIEmployee();
  }, []);

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <Tabs.TabPane tab="Thông tin chi tiết" key="tab1">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.main__title}>Thông tin đơn hàng</div>
                <div className={styles.form_add_potential}>
                  <div className={styles.main__body}>
                    <AddCampaignGeneralDetailInfo formFields={formFields} />
                    {/* <AddOrderDetailTable /> */}
                    {/* <AddOrderDetailStatus /> */}
                  </div>
                </div>
                <div>&nbsp;</div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Khách hàng" key="tab2">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} `}>
                    <CampaignCustomerInputGroup isSelectedRow={isSelectedRow} />
                  </div>

                  <TableDataCampaignCustomer
                    setSelected={setIsSelectedRow}
                    setNumberSelected={setNumberSelected}
                  />
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Cơ hội" key="tab3">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn}`}>
                    <CampaignChanceInputGroup
                      emp={emp}
                      body={body}
                      setBody={setBody}
                    />
                  </div>

                  <TableDataCampaginChance
                    body={body}
                    setBody={setBody}
                    emp={emp}
                  />
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đơn hàng" key="tab4">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} `}>
                    <CampaignOrderInputGroup />
                  </div>

                  <TableDataCampaignOrder
                    setSelected={setIsSelectedRow}
                    setNumberSelected={setNumberSelected}
                  />
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Hóa đơn" key="tab5">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} `}>
                    <CampaignBillInputGroup />
                  </div>

                  <TableDataCampaignBill
                    setSelected={setIsSelectedRow}
                    setNumberSelected={setNumberSelected}
                  />
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Lịch hẹn" key="tab6">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} `}>
                    <CampaignAppointmentInputGroup />
                  </div>

                  <TableDataCampaignAppointment />
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Email" key="tab7">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} `}>
                    <CampaignEmailInputGroup />
                  </div>

                  <TableDataCampaignEmail />
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Danh sách chia sẻ" key="tab8">
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.form_add_potential}>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    {/* <OrderDetailAppointmentInputGroup /> */}
                  </div>
                  <div className={`${styles.main__control_btn} flex_between`}>
                    <div className={styles.main__control_search}>
                      <form onSubmit={() => false}>
                        <input
                          type="text"
                          className={styles.input__search}
                          name="search"
                          defaultValue=""
                          placeholder="Tìm kiếm theo tên đối tượng được chia sẻ"
                        />
                        <button className={styles.kinh_lup}>
                          <Image
                            className={styles.img__search}
                            src="/crm/search.svg"
                            alt="hungha365.com"
                            width={15}
                            height={15}
                          />
                        </button>
                      </form>
                    </div>
                    <div className={`${styles.main__control_add} flex_end`}>
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpenShare(true);
                          }}
                          className={`${styles.dropbtn_add} flex_align_center`}
                        >
                          <Image
                            src="/crm/share_white.svg"
                            alt="hungha365.com"
                            width={15}
                            height={15}
                          />
                          Chia sẻ
                        </button>
                      </div>
                    </div>
                  </div>
                  <TableDataCampaignShareList />
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>

      <CustomerSelectModal
        isModalCancel={isModalCancel}
        setIsModalCancel={setIsModalCancel}
        title="Chọn khách hàng"
        // content="Hello"
      />

      <ShareActionModal
        isModalCancel={isOpenShare}
        setIsModalCancel={setIsOpenShare}
      />
    </div>
  );
};

export default TabComponent;
