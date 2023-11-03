import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "@/components/crm/campaign/campaign.module.css";
import { useRouter } from "next/router";
import OrderSelectBox from "@/components/crm/order/order_selectt";
// import TabOrderList from './tab_order_list';
import TableDataCampaignCustomerSelect from "@/components/crm/table/table-campaign-customer-select";
const Cookies = require("js-cookie");

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  // content: string;
  title: string;
}

const CancelModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  // content = "Bạn có chắc chắn muốn hủy thêm mới đơn hàng thông tin bạn nhập sẽ không được lưu lại?",
  title = "Chọn liên hệ",
}) => {
  const router = useRouter();
  const [isSelectedRow, setIsSelectedRow] = useState(false);
  const [isNumberSelected, setNumberSelected] = useState(0);
  const [arrCustomerId, setArrCustomerId] = useState([]);
  const [errorSelectedValue, setErrorSelectedValue] = useState(false);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);

  // const handleOK = () => {
  //   setIsModalCancel(false);
  //   router.push("/order/list");
  // };
  const handleOK = async () => {
    const isValidSharing = validate();
    if (isValidSharing) {
      console.log(arrCustomerId)
      try {
        await fetch(`http://localhost:3007/api/crm/customerdetails/add-campaign-customer`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            arr_campaign_id: [router.query.id],
            arr_cus_id: arrCustomerId,
          }),
        });
      } catch (error) {}
      setIsModalCancel(false);
      setIsOpenMdalSuccess(true);
      setTimeout(() => {
        setIsOpenMdalSuccess(false);
      }, 2000);
      // await fetchData();
    }
  };
  const validate = () => {
    if (arrCustomerId.length<0) {
      setErrorSelectedValue(true);
      return false;
    } else {
      setErrorSelectedValue(false);
      return true;
    }
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={title}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel campign_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        {/* <TabOrderList /> */}
        <div
          style={{ marginTop: "0px" }}
          className={`${styles.main__control_btn} flex_between`}
        >
          <div className={styles.main__control_search_campaign}>
            <form onSubmit={() => false}>
              <input
                type="text"
                className={styles.input__search}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo tên khách hàng"
              />
              <button className={styles.kinh_lup}>
                <img
                  className={styles.img__search}
                  src="/crm/search.svg"
                  alt="hungha365.com"
                />
              </button>
            </form>
          </div>
          <div className={`${styles.main__control_add} flex_end`}>
            {/* <Link href="/potential/add_file"> */}
            <button
              type="button"
              // onClick={() => setIsOpenAddNewOpen(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" alt="hungha365" />
              Thêm mới
            </button>
            {/* </Link> */}
          </div>
        </div>
        {
          <TableDataCampaignCustomerSelect
            setSelected={setIsSelectedRow}
            setNumberSelected={setNumberSelected}
            setArrCustomerId={setArrCustomerId}
          />
        }
      </Modal>
    </>
  );
};

export default CancelModal;
