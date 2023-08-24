import style from "./information.module.css";
import PotentialSelectBox from "../potential_selectt";
import TablePotentialItem from "../../table/table-potential-item";
import { CheckSquareOutlined } from "@ant-design/icons";
import ShowProductPO from "../mdal_action/mdal_show_product";
import { useState } from "react";
export default function ItemPotential() {
  const [isModalCancelPO,setIsShowMdalCanCel]=useState(false)
  const onClose = () =>{
    setIsShowMdalCanCel(false)
  }
  return (
    <div>
      <div className={style.selectbox}>
        <PotentialSelectBox title="Nhóm hàng hoá:" value="Tất cả" />
      </div>
      <div className={style.input_search}>
        <div className={style.main__control_search}>
          <form onSubmit={() => false}>
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
                alt=""
              />
            </button>
          </form>
        </div>
        <button onClick={()=>setIsShowMdalCanCel(true)} className={style.choose_button}>
          <CheckSquareOutlined /> Chọn vào
        </button>
      </div>
      <div>
        <TablePotentialItem />
      </div>
      <ShowProductPO
      isModalCancelPO={isModalCancelPO}
      onClose={onClose}
      />
    </div>
  );
}
