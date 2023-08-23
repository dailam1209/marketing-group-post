import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./Create_propose.module.css";
import Image from "next/image";
import Box_app from "./box_app/Box_app";
// import { List_items_propose } from "./Array_list_propose";
import Detail_propose from "./detail_propose/Detail_propose";
import { useSelector } from "react-redux";
import { RootState } from "@/reducers";
import { fetch_supervisor_approver } from "@/utils/api/dexuat/api_fetch";
import { fetch_propose_type } from "@/utils/api/dexuat/api_fecth_cty";

interface ItemPropose {
  id: number;
  title?: string;
  desc?: string;
}
export let List_items_propose: ItemPropose[] = [
  {
    id: 1,
    title: "Đơn xin nghỉ phép",
    desc: "Mẫu đề xuất xin nghỉ phép",
  },
  {
    id: 2,
    title: "Đơn xin đổi ca",
    desc: "Mẫu đề xuất xin đổi ca",
  },
  {
    id: 3,
    title: "Đơn xin tạm ứng",
    desc: "Mẫu đề xuất xin tạm ứng",
  },
  {
    id: 4,
    title: "Đơn xin cấp phát tài sản",
    desc: "Mẫu đề xuất xin cấp phép tài sản",
  },
  {
    id: 5,
    title: "Đơn xin thôi việc",
    desc: "Đơn xin thôi việc",
  },
  {
    id: 6,
    title: "Đề xuất tăng lương",
    desc: "Đề xuất tương lương",
  },
  {
    id: 7,
    title: "Đề xuất bổ nhiệm",
    desc: "Đề xuất bổ nhiệm",
  },
  {
    id: 8,
    title: "Đề xuất luân chuyển công tác",
    desc: "Đề xuất luân chuyển công tác",
  },
  {
    id: 9,
    title: "Đề xuất tham gia dự án",
    desc: "Đề xuất tham gia dự án",
  },
  {
    id: 10,
    title: "Đề xuất xin tăng ca",
    desc: "Đề xuất xin tăng ca",
  },
  {
    id: 11,
    title: "Đề xuất xin nghỉ chế độ thai sản",
    desc: "Đề xuất xin nghỉ chế độ thai sản",
  },
  {
    id: 12,
    title: "Đề xuất đăng kí sử dụng phòng họp",
    desc: "Đề xuất đăng kí sử dụng phòng họp",
  },
  {
    id: 13,
    title: "Đề xuất đăng kí sử dụng xe công",
    desc: "Đề xuất đăng kí sử dụng xe công",
  },
  {
    id: 14,
    title: "Đề xuất sửa chữa cơ sở vật chất",
    desc: "Đề xuất sửa chữa cơ sở vật chất",
  },
  {
    id: 15,
    title: "Đề xuất thanh toán",
    desc: "Đề xuất thanh toán",
  },
  {
    id: 16,
    title: "Đề xuất khiếu nại",
    desc: "Đề xuất khiếu nại",
  },
  {
    id: 17,
    title: "Đề xuất cộng công",
    desc: "Đề xuất cộng công",
  },
  {
    id: 18,
    title: "Đề xuất thưởng phạt",
    desc: "Đề xuất thưởng phạt",
  },
  {
    id: 19,
    title: "Đề xuất hoa hồng doanh thu",
    desc: "Đề xuất hoa hồng doanh thu",
  },
];
const Index = () => {
  const [hidedPropose,setHidedPropose] = useState<any>()
  useEffect(()=>{
    const fetch = async () =>{
      const res_propose_type = await fetch_propose_type()
      setHidedPropose(res_propose_type?.data.idHideCateDX)
    }
    fetch();
  },[]);
  const [filtered_list_propose,setFiltered_list_propose] = useState<ItemPropose[]>([])
  useEffect(()=>{
    if(hidedPropose && hidedPropose.length > 0){
      for(var i = 0; i<hidedPropose.length; i++){
        List_items_propose = List_items_propose.filter(item => item.id !== hidedPropose[i])
      }
      setFiltered_list_propose(List_items_propose)
    }
  }, [hidedPropose])
  const idItem = useSelector(
    (state: RootState) => state.propose?.selectedElementId
  );
  const [filter,setFilter] = useState()
  const handleFilterChange = (e:any) =>{
    setFilter(e.target.value)
  }
  const handleFilterBtn = ()=>{
    setFiltered_list_propose((prev:ItemPropose[])=>{
      return filter ? prev.filter((propose:ItemPropose)=>propose.title?.includes(filter)) : List_items_propose
    })
  }
  useEffect(()=>{
    if(!filter){
      setFiltered_list_propose(List_items_propose)
    }
  }, [filter])
  return (
    <div className={styles.main_create}>
      <div className={styles.container}>
        <div>
          <div className={styles.title_main}>
            <p className={styles.active_title}>
              Danh sách đề xuất (<span>19</span>)
            </p>
            <span className={styles.animation} style={{ left: "52px" }}></span>
          </div>
          <div className={styles.search}>
            <div className={styles.form_search}>
              <div className={styles.div_box_search}>
                <input
                  type="text"
                  placeholder="Tìm kiếm tên đề xuất"
                  name="tim_kiem_ten_de_xuat"
                  onChange={handleFilterChange}
                />
                <button onClick={handleFilterBtn} className={styles.btn_search}>
                  <Image
                    src={"/icon/search.png"}
                    width={50}
                    height={50}
                    alt="Search"
                  />
                </button>
              </div>

              <div className={styles.box_right}>
                <div className={styles.box_img}>
                  <Image
                    src={"/icon/ask.png"}
                    width={50}
                    height={50}
                    alt="Search"
                  />
                </div>
                <span className={styles.guide}>Hướng dẫn</span>
              </div>
            </div>
          </div>
        </div>
        {idItem !== 0 ? (
          <Detail_propose List_items_propose={List_items_propose} />
        ) : (
          <div className={styles.application}>
            <div className={styles.container_list}>
              <div className={styles.list}>
                <Box_app listboxs={filtered_list_propose} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
