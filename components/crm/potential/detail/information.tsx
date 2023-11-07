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
import { useEffect, useState } from "react";
import DelActionModal from "../potential_action_modal/deltete_action_mdal";
import PotentialActionDetail from "./potential_action";
import { axiosCRM } from "@/utils/api/api_crm";
import { notifyError } from "@/utils/function";
import { ToastContainer } from "react-toastify";

export default function InformationTextPotentialDetails({ key }: any) {
  const onChange = (checked: boolean) => {};
  const items: MenuProps["items"] = [];
  const [isOpenCovert, setIsOpenConvert] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    axiosCRM
      .post("/potential/detail-potential", { cus_id: id })
      .then((res) => setDataDetail(res.data.data.data))
      .catch((err) => notifyError("Vui lòng thử lại sau"));
  }, []);
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
            <RetweetOutlined rev={null} /> Chuyển đổi
          </button>
          <button
            className={style.fix}
            onClick={() => router.push(`/potential/update/${id}`)}
          >
            <FormOutlined rev={null} /> Chỉnh sửa
          </button>
          <button className={style.delete} onClick={() => setIsDelOpen(true)}>
            <DeleteOutlined rev={null} /> Xoá
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
            <UserOutlined rev={null} />
          </div>
          <div className={style.potential_table}>
            <PotentialRowInforText formData={dataDetail}/>
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
      <ToastContainer autoClose={2000} />
    </div>
  );
}
