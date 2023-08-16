import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import styles from "./index.module.css";
import styless from "../../potential/potential.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { CheckCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import { Checkbox, Input } from "antd";
export default function ChiTietKhaoSat() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalReturn, setIsShowModalReturn] = useState(false);
  const onClose = () => {
    setIsShowModal(false);
    setIsShowModalReturn(false);
  };
  const router = useRouter();
  const path = router.query;
  const handleSave = () => {
    setIsShowModal(true);
  };
  const handleDelete = (e: any) => {
    var result = window.confirm("Bạn có chắc muốn xóa không?");
    if (result) {
      console.log(result);
      router.push("/phieu-thu");
    } else {
      console.log("first");
    }
  };
  return (
    <div>
      <div style={{ paddingBottom: 17 }}>
        <button
          onClick={() => router.push(`/du-lieu-khao-sat/${path.id}`)}
          style={{ background: "#4C5BD4" }}
          type="button"
          className={`${styless.dropbtn_add} flex_align_center ${styless.btn_excel}`}
        >
          <p style={{ color: "#fff" }}>Dữ liệu thu về</p>
        </button>
      </div>
      <div style={{ display: "flex", gap: 30, paddingBottom: 30 }}>
        <button
          onClick={() => router.push(`/chinh-sua-khao-sat/${path.id}`)}
          style={{ background: "#4C5BD4  " }}
          type="button"
          className={`${styless.dropbtn_add} flex_align_center ${styless.btn_excel}`}
        >
          <img src="	https://crm.timviec365.vn/assets/icons/edit.svg" alt="" />
          <p style={{ color: "#ffffff" }}>Chỉnh sửa</p>
        </button>
        <button
          style={{ background: "#FF3333",width:100,textAlign:"center",justifyContent:"center",display:"flex" }}
          type="button"
          onClick={(e) => {
            handleDelete(e);
          }}
          className={`${styless.dropbtn_add} flex_align_center ${styless.btn_excel}`}
        >
          <p style={{ color: "#ffffff" }}>Xóa</p>
        </button>
      </div>
      <div className={styles.headercontent}>Mẫu khảo sát</div>
      <div className={styles.contentheader}>
        <div className={styles.title}>Khảo sát chất lượng dịch vụ</div>
        <div>Cảm giác của bạn là tài sản của chúng tôi</div>
        <div style={{ color: "red", paddingTop: 20 }}>*Bắt buộc</div>
      </div>
      <div>&nbsp;</div>
      <div className={styles.infocustomer}>
        <div>Thông tin khách hàng</div>
        <div style={{ color: "red", paddingTop: 20 }}>*Bắt buộc</div>
        <div>&nbsp;</div>
        <div>Tên khách hàng</div>
        {/* <div>&nbsp;</div> */}
        <div>
          <Input
            type="text"
            defaultValue={"Nhập họ tên"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Số điện thoại</div>
        {/* <div>&nbsp;</div> */}
        <div>
          <Input
            type="text"
            defaultValue={"Nhập số điện thoại"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Email</div>
        {/* <div>&nbsp;</div> */}
        <div>
          <Input
            type="text"
            defaultValue={"Nhập email"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Địa chỉ</div>
        {/* <div>&nbsp;</div> */}
        <div>
          <Input
            type="text"
            defaultValue={"Nhập địa chỉ"}
            className={styles.inputtitle2_option}
          />
        </div>
      </div>
      <div>&nbsp;</div>
      <div className={styles.infocustomer}>
        <div>Anh(chị) có hài lòng về sản phẩm của công ty</div>
        <div>
          <Checkbox>Hài lòng</Checkbox>
        </div>
        <div>
          <Checkbox>Kém chất lượng</Checkbox>
        </div>
      </div>
      <div className={styles.infocustomer}>
        <div>Thông tin khách hàng</div>
        <div style={{ color: "red", paddingTop: 20 }}>*Bắt buộc</div>
        <div>&nbsp;</div>
        <div>Tên khách hàng</div>
        {/* <div>&nbsp;</div> */}
        <div>
          <Input
            type="text"
            defaultValue={"Nhập họ tên"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Số điện thoại</div>
        {/* <div>&nbsp;</div> */}
        <div>
          <Input
            type="text"
            defaultValue={"Nhập số điện thoại"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Email</div>
        {/* <div>&nbsp;</div> */}
        <div>
          <Input
            type="text"
            defaultValue={"Nhập email"}
            className={styles.inputtitle2_option}
          />
        </div>
        <div>Địa chỉ</div>
        {/* <div>&nbsp;</div> */}
        <div>
          <Input
            type="text"
            defaultValue={"Nhập địa chỉ"}
            className={styles.inputtitle2_option}
          />
        </div>
      </div>
      <div className={styles.infocustomer}>
        <div>
          ANH(CHỊ) HÃY ĐƯA RA Ý KIẾN CỦA MÌNH VỀ SẢN PHẨM VÌ SAO CHƯA LÀM HÀI
          LÒNG
        </div>
        <div>
          <Input type="text" className={styles.inputtitle2_option} />
        </div>
      </div>
      <div>&nbsp;</div>
      <div className={styles.headercontent}>Mẫu khảo sát</div>
      <div className={styles.contentheader}>
        <div style={{ color: "red", paddingTop: 20 }}>*Bắt buộc</div>
      </div>
      <div>&nbsp;</div>
      <div className={styles.headercontent}>Mẫu khảo sát</div>
      <div className={styles.contentheader}>
        <div style={{ color: "red", paddingTop: 20 }}>*Bắt buộc</div>
      </div>
    </div>
  );
}
