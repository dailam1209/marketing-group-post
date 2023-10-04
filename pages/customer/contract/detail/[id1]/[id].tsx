import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "@/components/crm/potential/potential.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import Link from "next/link";
const Cookies = require("js-cookie");
import { base_url } from "@/components/crm/service/function";
import Head from "next/head";

export default function ContractDetailsList() {
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen } = useContext<any>(SidebarContext);
  const { id, id1 } = router.query;
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [name, setname] = useState<any>();
  const [detailContract, setDetailContract] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const getNameDetail = async () => {
    const res = await fetch(`${base_url}/api/crm/customerdetails/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ cus_id: id1 }),
    });
    const data = await res.json();
    setname(data?.data?.name);
  };

  const getDetailContract = async () => {
    const formData = new FormData();
    formData.append("contract_id", id.toString());
    formData.append("id_customer", id1.toString());
    setLoading(true);
    const res = await fetch(
      "http://210.245.108.202:3007/api/crm/contractforcus/detail",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: formData,
      }
    );
    const data = await res.json();
    setDetailContract(data?.data);
    if (
      data?.data?.result?.img_org_base64 &&
      data?.data?.result?.img_org_base64?.length > 0
    ) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNameDetail();
    setHeaderTitle(`${name} / Hợp đồng bán / Chi tiết hợp đồng bán`);
    setShowBackButton(true);
    setCurrentPath(`/customer/detail/${id}`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, id, name, id1]);

  useEffect(() => {
    getDetailContract();
  }, []);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Chi tiết hợp đồng bán</title>
        <meta
          name="description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="Keywords"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <meta
          property="og:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          property="og:image"
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="twitter:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <link rel="canonical" href="https://hungha365.com/crm" />

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
      </Head>
      <div ref={mainRef} className={styleHome.main}>
        <div className={styles.detail_button}>
          <Link href={`/customer/contract/send/${id1}/${id}`}>
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
                      {loading && (
                        <img alt="loading" src="/crm/loading_file.gif" />
                      )}
                      {!loading &&
                        detailContract?.result?.img_org_base64 &&
                        detailContract?.result?.img_org_base64?.length > 0 && (
                          <div>
                            {detailContract?.result?.img_org_base64?.map(
                              (url, index) => (
                                <img key={index} alt="loading" src={url} />
                              )
                            )}
                          </div>
                        )}
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
