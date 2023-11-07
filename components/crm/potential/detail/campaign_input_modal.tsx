import React, { useEffect, useState } from "react";
import styles from "@/components/crm/campaign/campaign.module.css";
import CampaignAction from "@/components/crm/campaign/campaign_action";
import CampaignSelectBox from "@/components/crm/campaign/campaign_selectt";
import Link from "next/link";
import ShowCampaignPOMD from "../mdal_action/mdal_show_campaignPO";
import { useRouter } from "next/router";
import { axiosCRM } from "@/utils/api/api_crm";
import SelectSingle from "@/components/commodity/select";
export default function CampaignInputGroupsModal({ isSelectedRow }: any) {
  const router = useRouter();
  const handleClickSelectoption = () => {};
  const [isModalCancelPO, setIsModalCancelPO] = useState(false);
  const [listGroupProduct, setListGroupProduct] = useState([]);
  const [formSearch, setFormSearch] = useState<any>({
    recall: true,
    page: 1,
    page_size: 40,
  });
  //lay ra group
  useEffect(() => {
    axiosCRM
      .post("/product/show-product-group")
      .then(
        (res) =>
          res.data.data.data.length > 0 && handleGroup(res.data.data.data)
      )
      .catch((error) => console.log("reCallGroup", error));
  }, []);
  useEffect(() => {
    axiosCRM
      .post("/product/show-product", formSearch)
      .then((res) => console.log("checkkkkkkkkkk", res.data.data));
  }, [formSearch.recall]);
  const handleGroup = (datas) => {
    setListGroupProduct(
      datas.map((dt: any) => ({
        value: dt._id,
        label: dt.gr_name,
      }))
    );
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setFormSearch({ ...formSearch, recall: !formSearch.recall });
  };
  const onClose = () => {
    setIsModalCancelPO(false);
  };
  console.log("checkform", formSearch);

  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_btn} flex_between`}>
        <SelectSingle
          title="Nhóm hàng hóa"
          data={listGroupProduct}
          setFormData={setFormSearch}
          name="gr_id"
          onChange={(e) =>
            setFormSearch({ ...formSearch, recall: !formSearch.recall })
          }
        />
        <div className={styles.main__control_search}>
          <form onSubmit={handleSubmitSearch}>
            <input
              onChange={(e) =>
                setFormSearch({ ...formSearch, gr_name: e.target.value })
              }
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên hàng hóa"
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
          <Link
            href={
              router.pathname === "/potential/detail/[id]"
                ? "#"
                : "/crm/campaign/add"
            }
            className={`${styles.dropbtn_add} flex_align_center`}
          >
            <img src="/crm/add.svg" />
            Thêm mới
          </Link>
          <ShowCampaignPOMD
            isModalCancelPO={isModalCancelPO}
            onClose={onClose}
          />
        </div>
      </div>

      <CampaignAction />
    </div>
  );
}
