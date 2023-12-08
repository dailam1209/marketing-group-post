import { useHeader } from "@/components/crm/hooks/useHeader";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "@/components/commodity/potential.module.css";
import styleHome from "@/components/crm/home/home.module.css";
import DetailHeader from "@/components/crm/nha_tuyen_dung/DetailHeader";
import { useDataContainer } from "@/components/crm/context/dataContainer";
import DetailBody from "@/components/crm/nha_tuyen_dung/DetailBody";
import { Pagination } from "antd";

export default function ChiTietNTD() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  const { setDataContainer } = useContext(useDataContainer);
  const { id } = router.query;
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  useEffect(() => {
    setHeaderTitle(`Chi tiết nhà tuyển dụng`);
    setShowBackButton(false);
    //true là có điều hướng
    setCurrentPath("/commodity/list");
    //url điều hướng
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  useEffect(() => {
    //Lấy data ra rồi nhét nó vào thằng setDataContainer
  }, []);
  return (
    <div ref={mainRef} className={styleHome.main}>
      <DetailHeader />
      <DetailBody />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          total={1000}
          pageSize={20}
          onChange={(page)=>setPage(page)}
       
        />
      </div>
    </div>
  );
}
