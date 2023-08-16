import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/order/order.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import OrderFooterAddFiles from "@/components/crm/order/order_edit_files/order_footer_add_files";
import AddDetailInfo from "@/components/crm/order/order_edit_files/detail_info";
import AddTable from "@/components/crm/order/order_edit_files/table";
import AddStatusOrderInfo from "@/components/crm/order/order_edit_files/order_status";
import AddInvoiceInfo from "@/components/crm/order/order_edit_files/invoice_info";
import AddDeliveryInfo from "@/components/crm/order/order_edit_files/delivery_info";
import AddDescriptionInfo from "@/components/crm/order/order_edit_files/description_info";
import { useHeader } from "@/components/crm/hooks/useHeader";

const AddFilesPotential: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Quản lý đơn hàng/ Chỉnh sửa");
    setShowBackButton(true);
    setCurrentPath("/crm/order/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const handleClickImg = () => {
    imgRef?.current?.click();
  };

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Thêm mới đơn hàng</div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>

              <AddDetailInfo />
              <AddTable />
              <AddStatusOrderInfo/>
              <AddInvoiceInfo />
              <AddDeliveryInfo />
              <AddDescriptionInfo />
           
              </div>
              <OrderFooterAddFiles title="Chỉnh sửa đơn hàng thành công" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFilesPotential;
