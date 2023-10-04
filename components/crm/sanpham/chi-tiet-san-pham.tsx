import styles from "@/components/crm/potential/potential_add_files/add_file_potential.module.css";
import styless from "@/components/crm/potential/potential.module.css";
import exportToExcel from "../ultis/export_xlxs";
import styleindex from "./index2.module.css";
// "../../potential/potential_add_files/add_file_potential.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { CheckCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import ModalUpdateThanhToan from "../theo-doi-thu-chi/modal/ModalUpdateThanhToan";
export default function ChiTietSanPham() {
  const router = useRouter();
  const path = router.query;
  const handleDelete = (e: any) => {
    var result = window.confirm("Bạn có chắc muốn xóa không?");
    if (result) {
      router.push(`/san-pham`);
    } else {
    }
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 30, paddingBottom: 30 }}>
        <button
          onClick={() => router.push(`/chinh-sua-san-pham/${path.id}`)}
          style={{ background: "blue  " }}
          type="button"
          className={`${styless.dropbtn_add} flex_align_center ${styless.btn_excel}`}
        >
          <CheckCircleOutlined />
          <p style={{ color: "#ffffff" }}>Chỉnh sửa</p>
        </button>
        <button
          style={{ background: "red" }}
          type="button"
          onClick={(e) => {
            handleDelete(e);
          }}
          className={`${styless.dropbtn_add} flex_align_center ${styless.btn_excel}`}
        >
          <p style={{ color: "#ffffff" }}>Xóa phiếu</p>
        </button>
      </div>
      <div className={styleindex.title}>Chi tiết sản phẩm</div>
      <div className={styleindex.containerinfo}>
        <div className={styleindex.fieldsetneleft}>
          <p className={styles.main__body__type}>Thông tin sản phẩm</p>
          <fieldset className={styleindex.fieldsetneleft}>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Tên sản phẩm: </div>
              <div>137</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Mã sản phẩm : </div>
              <div>đuawadawda</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Nhóm sản phẩm: </div>
              <div>Test Anh</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Đơn vị tính: </div>
              <div>04/08/2023</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Kích thước: </div>
              <div>22 VNĐ</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>
                Định mức tồn tối thiểu:{" "}
              </div>
              <div>
                <button className={styleindex.btntt}>
                  <p style={{ color: "#ffffff" }}>Giá nhập: </p>
                </button>
              </div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Giá bán lẻ: </div>
              <div>312,312 VND</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Giá bán buôn: </div>
              <div>312,312 VND</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Bảo hành: </div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Hạn sử dụng: </div>
              <div>09-09-2023</div>
            </div>
            <div className={styleindex.full_width_div}>
              <span></span>
            </div>
            <div className={styleindex.info}>
              <div className={styleindex.infoleft}>Xuất xứ: </div>
              <div>312312</div>
            </div>
          </fieldset>
        </div>
        <div className={styleindex.fieldsetneright}>
          <img
            width={"100%"}
            src={"/crm/img_file.svg"}
            alt="hungha365.com"
            id="img2"
          />
        </div>
      </div>
    </div>
  );
}
