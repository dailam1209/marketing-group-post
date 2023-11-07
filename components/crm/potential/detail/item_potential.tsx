import style from "./information.module.css";
import PotentialSelectBox from "../potential_selectt";
import TablePotentialItem from "../../table/table-potential-item";
import { CheckSquareOutlined } from "@ant-design/icons";
import ShowProductPO from "../mdal_action/mdal_show_product";
import { useEffect, useMemo, useState } from "react";
import { axiosCRM } from "@/utils/api/api_crm";
import SelectSingle from "@/components/commodity/select";
export default function ItemPotential() {
  const [isModalCancelPO, setIsShowMdalCanCel] = useState(false);
  const onClose = () => {
    setIsShowMdalCanCel(false);
  };
  const [formSearch, setFormSearch] = useState<any>({ recall: true });
  const [listGroupProduct, setListGroupProduct] = useState([]);
  useEffect(() => {
    axiosCRM
      .post("/product/show-product-group")
      .then(
        (res) =>
          res.data.data.data.length > 0 && handleGroup(res.data.data.data)
      )
      .catch((error) => console.log("reCallGroup", error));
  }, []);
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
  return (
    <div>
      <div style={{ width: "30%" }} className={style.selectbox}>
        <SelectSingle
          title="Nhóm hàng hóa"
          setFormData={setFormSearch}
          onChange={() =>
            setFormSearch({ ...setFormSearch, recall: !formSearch.recall })
          }
          data={listGroupProduct}
        />
        {/* <PotentialSelectBox title="Nhóm hàng hoá:" value="Tất cả" /> */}
      </div>
      <div className={style.input_search}>
        <div className={style.main__control_search}>
          <form onSubmit={handleSubmitSearch}>
            <input
              type="text"
              className={style.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên hàng hoá"
            />
            <button className={style.kinh_lup}>
              <img
                className={style.img__search}
                src="/crm/search.svg"
                alt="hungha365.com"
              />
            </button>
          </form>
        </div>
        <button
          onClick={() => setIsShowMdalCanCel(true)}
          className={style.choose_button}
        >
          <CheckSquareOutlined rev={null} /> Chọn vào
        </button>
      </div>
      <div>
        <TablePotentialItem />
      </div>
      <ShowProductPO isModalCancelPO={isModalCancelPO} onClose={onClose} />
    </div>
  );
}
