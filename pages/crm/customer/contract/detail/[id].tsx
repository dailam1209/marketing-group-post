import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "@/components/crm/potential/potential.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import Link from "next/link";
const Cookies = require("js-cookie");
import { base_url } from "@/components/crm/service/function";

export default function ContractDetailsList() {
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen } = useContext<any>(SidebarContext);
  const { id } = router.query;
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [name, setname] = useState<any>();

  const getNameDetail = async () => {
    const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ cus_id: id }),
    });
    const data = await res.json();
    setname(data?.data?.name);
  };

  useEffect(() => {
    getNameDetail();
    setHeaderTitle(`${name} / Hợp đồng bán / Chi tiết hợp đồng bán`);
    setShowBackButton(true);
    setCurrentPath(`/crm/customer/detail/${id}`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id, name]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <>
      <div ref={mainRef} className={styleHome.main}>
        <div className={styles.detail_button}>
          <Link href={`/crm/customer/contract/send/${id}`} target="blank">
            <button className={styles.send_button_detail}>Gửi hợp đồng</button>
          </Link>
          <button className={styles.delete_button}>Xoá hợp đồng</button>
          <button className={styles.export_button}>Xuất file</button>
        </div>

        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Thông tin hợp đồng</div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div style={{ marginTop: "30px", border: "1px solid #fff" }}>
                    <div style={{ textAlign: "center" }}>
                      <img
                        alt="loading"
                        src="	https://crm.timviec365.vn/assets/img/load_data.gif"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
