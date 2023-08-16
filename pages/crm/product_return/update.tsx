import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import PotentialFooterAddFiles from "@/components/crm/potential/potential_add_files/potential_footer_add_files";
import { useHeader } from "@/components/crm/hooks/useHeader";
import UpdateProductReturnForm from "@/components/crm/product_return/product_return_update/product_return_form";
import TableDataProductInforUpdate from "@/components/crm/table/table-info-stock";
import ProductReturnInfoTableData from "@/components/crm/product_return/product_return_update/product_info_product";
import ProductReturnDescription from "@/components/crm/product_return/product_return_update/product_return_description";
import AddAddressInfo from "@/components/crm/potential/potential_add_files/address_info";

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
    setHeaderTitle("Trả lại hàng bán / Chỉnh sửa");
    setShowBackButton(true);
    setCurrentPath("/crm/product_return/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

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
            <div className={styles.main__title}>
              Chỉnh sửa trả lại hàng bán
            </div>
            <div className={styles.form_add_potential}>
              <div className={styles.main__body}>
                <UpdateProductReturnForm />
                <TableDataProductInforUpdate />
                <ProductReturnInfoTableData />
                <AddAddressInfo />
                <ProductReturnDescription />
              </div>
              <PotentialFooterAddFiles
                link="/product_return/list"
                title="Cập nhật đề nghị trả hàng Tên đề nghị thành công!"
                contentCancel={
                  "Bạn có chắc chắn muốn hủy cập nhật đề nghị trả hàng này không, mọi thông tin bạn thay đổi sẽ không được lưu lại?"
                }
                titleCancel={"Xác nhận hủy cập nhật đề nghị trả hàng"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFilesPotential;
