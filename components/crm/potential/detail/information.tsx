import style from "./information.module.css";
import { Dropdown, MenuProps, Switch } from "antd";
import {
  RetweetOutlined,
  FormOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import PotentialRowInforText from "./potential_row_info";
import Tab from "./tab";
import { useRouter } from "next/router";
import ConvertModal from "../potential_action_modal/convert_modal";
import { useState } from "react";
import DelActionModal from "../potential_action_modal/deltete_action_mdal";
import PotentialActionDetail from "./potential_action";

export default function InformationTextPotentialDetails({ key }: any) {
  const onChange = (checked: boolean) => {};
  const items: MenuProps["items"] = [];
  const [isOpenCovert, setIsOpenConvert] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={style.main}>
      <div className={style.main_button}>
        <div className={style.switch}>
          <Switch onChange={onChange} /> <p>Ẩn dữ liệu trống</p>
        </div>
        <div className={style.group_button}>
          <button
            className={style.change}
            onClick={() => setIsOpenConvert(true)}
          >
            <RetweetOutlined /> Chuyển đổi
          </button>
          <button
            className={style.fix}
            onClick={() => router.push(`/potential/update/${id}`)}
          >
            <FormOutlined /> Chỉnh sửa
          </button>
          <button className={style.delete} onClick={() => setIsDelOpen(true)}>
            <DeleteOutlined /> Xoá
          </button>
          <Dropdown menu={{ items }} placement="bottomLeft">
            <PotentialActionDetail isSelectedRow={true} />
          </Dropdown>
        </div>
      </div>
      <div className={style["potential_info-table"]}>
        <div className={style.table_title}>
          <h4>Chi tiết tiềm năng</h4>
        </div>
        <div className={style.body_table}>
          <div className={style.img_user}>
            <UserOutlined />
          </div>
          <div className={style.potential_table}>
            <PotentialRowInforText />
          </div>
        </div>
      </div>
      <div className={style.tab}>
        <Tab />
      </div>
      <ConvertModal
        isModalCancel={isOpenCovert}
        setIsModalCancel={setIsOpenConvert}
      />
      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
    </div>
  );
}
