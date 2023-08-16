"use client";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef } from "react";
import styles from "@/components/crm/potential/potential.module.css";
import ScheduleDetailInputGroup from "@/components/crm/customer/schedule/schedule_input_group";
import CustomerHeaderTab from "@/components/crm/customer/header_customer_info_btn";
import TableProductListBuy from "@/components/crm/table/table-product-list_buy";
import InputText from "@/components/crm/potential/potential_add_files/input_text";

export default function SheduleDetailCustomerList() {
  const router = useRouter();
  const { id } = router.query;
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  useEffect(() => {
    setHeaderTitle(`${id} / Hàng hóa đã mua `);
    setShowBackButton(true);
    setCurrentPath(`/crm/customer/detail/${id}`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <>
      <CustomerHeaderTab activeName={"Hàng hóa đã mua"} />
      <div ref={mainRef} className={styleHome.main}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              style={{ height: "46px" }}
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên sản phẩm"
            />
            <button className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="https://crm.timviec365.vn/assets/icons/search.svg"
                alt=""
              />
            </button>
          </form>
        </div>{" "}
        <TableProductListBuy />
      </div>
    </>
  );
}
