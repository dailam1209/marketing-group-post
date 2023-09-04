import React, { useEffect, useState } from "react";
import styles from "../potential/merge/merge.module.css";
import RowRadioInput from "../potential/merge/row_input_radio";

interface PotentialProps {
  data: any;
  length: number;
}

const TableDataPotential: React.FC<PotentialProps> = ({ data, length }) => {
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelectAll2, setIsSelectAll2] = useState(false);
  const [defaultCheckBox, setDefaultCheckBox] = useState(false);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [isOpenSuccessMdal, setISOpenSuccessMdal] = useState(false);
  const [isOpenModalError, setIsOpenModalError] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const newData = data.data;

  const handleImageChange = (selectedValue: string) => {
    setSelectedId(selectedValue);
  };

  const handleClickOpenModal = () => {
    setISOpenSuccessMdal(true);
    // setIsOpenModalError(true);
  };

  useEffect(() => {
    if (isSelectAll) {
      setSelectedId("1");
    } else if (isSelectAll2) {
      setSelectedId("2");
    } else {
      setSelectedId("0");
    }
  }, [isSelectAll, isSelectAll2]);
  //
  return (
    <div className={styles.main_potential}>
      <div className={styles.content_table}>
        <div className={styles.main_title}>Gộp trùng tiềm năng</div>
        <div className={styles.main_table}>
          <div className={styles.scroll_table_left}>
            <table className={styles.table_info}>
              <thead>
                <tr>
                  <th colSpan={2}>Bản ghi chính</th>
                  <th>
                    Bản ghi 1
                    <button
                      onClick={() => {
                        setIsSelectAll(true);
                        setIsSelectAll2(false);
                        setDefaultCheckBox(true);
                      }}
                    >
                      Chọn tất cả
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p className={styles.main_body_type}>Ảnh</p>
                  </td>
                  <td>
                    <img
                      style={{ transform: "translate(15%, 15%)" }}
                      src="/crm/user_kh.png"
                      className={styles.img_person}
                    />
                  </td>
                  <td>
                    <input
                      onChange={() => handleImageChange("1")}
                      checked={selectedId === "1"}
                      name="rdo_logo_image"
                      type="radio"
                      className={styles.radio}
                      value={"/crm/user_kh.png"}
                    />
                    <img
                      style={{ transform: "translate(15%, 15%)" }}
                      src="/crm/user_kh.png"
                      className={styles.img_person}
                    />
                  </td>
                  <td>
                    <input
                      onChange={() => handleImageChange("2")}
                      checked={selectedId === "2"}
                      name="rdo_logo_image"
                      type="radio"
                      className={styles.radio}
                      value={"/crm/user_kh.png"}
                    />
                    <img
                      style={{ transform: "translate(15%, 15%)" }}
                      src="/crm/user_kh.png"
                      className={styles.img_person}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className={styles.main_body_type}>Thông tin chung</p>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_vocative"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Xưng hô:"
                  value={newData?.map((item) => item?.salutation)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_middle_name"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Họ và đệm:"
                  value={newData?.map((item) => item?.operation)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_name"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Tên:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_fullname"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Họ và tên:"
                  value={newData?.map((item) => item?.operation)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_titles"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Chức danh:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_department"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Phòng ban:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_office_phone"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Điện thoại cơ quan:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_personal_phone"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Điện thoại cá nhân:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_office_email"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Email cơ quan:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_personal_email"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Email cá nhân:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_source"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Nguồn gốc:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_tax_code"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Mã số thuế:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_type"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Loại tiềm năng:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_social"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Mạng xã hội:"
                  value={newData?.map((item) => item?.name)}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_emp"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Nhân viên phụ trách:"
                  value={newData?.map((item) => item?.name)}
                />

                <tr>
                  <td>
                    <p className={styles.main_body_type}>Thông tin cá nhân</p>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_gender"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Giới tính:"
                  value={["Chưa cập nhật ", "Chưa cập nhật"]}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_birth"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Ngày sinh:"
                  value={["Chưa cập nhật ", "Chưa cập nhật"]}
                />

                <tr>
                  <td>
                    <p className={styles.main_body_type}>Thông tin tổ chức</p>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_tochuc"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Tổ chức:"
                  value={["Chưa cập nhật ", "Chưa cập nhật"]}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_bank_num"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Tài khoản ngân hàng:"
                  value={["Chưa cập nhật ", "Chưa cập nhật"]}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_bank_account"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Mở tại ngân hàng:"
                  value={["Chưa cập nhật ", "Chưa cập nhật"]}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_tl"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Ngày thành lập:"
                  value={["Chưa cập nhật ", "Chưa cập nhật"]}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_business_type"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Loại hình: "
                  value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                />

                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_business_areas"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Lĩnh vực:"
                  value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_cate"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Ngành nghề:"
                  value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_revenue"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Doanh thu:"
                  value={["Chưa cập nhật ", "Chưa cập nhật"]}
                />
                <tr>
                  <td>
                    <p className={styles.main_body_type}>Thông tin địa chỉ</p>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_qg"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Quốc gia:"
                  value={["Chưa cập nhật.", "Chưa cập nhật"]}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_tt"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Tỉnh/thành phố:"
                  value={["Chưa cập nhật ", "Chưa cập nhật"]}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_qh"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Quận/huyện:"
                  value={["Chưa cập nhật ", "Chưa cập nhật"]}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_px"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Phường/xã:"
                  value={["Chưa cập nhật ", "Chưa cập nhật"]}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_street"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Số nhà, đường phố:"
                  value={["Chưa cập nhật.", "Chưa cập nhật"]}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_area_code"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Mã vùng:"
                  value={["Chưa cập nhật ", "Chưa cập nhật"]}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_address"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Địa chỉ:"
                  value={["Chưa cập nhật ", "Chưa cập nhật"]}
                />
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_des"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Thông tin mô tả"
                  value={[
                    "Chưa cập nhật ",
                    "Khách hàng khá khó tính không ...",
                  ]}
                />
                <tr>
                  <td>
                    <p className={styles.main_body_type}>Thông tin hệ thống</p>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <RowRadioInput
                  defaultCheckBox={defaultCheckBox}
                  setDefaultCheckBox={setDefaultCheckBox}
                  name="rdo_system"
                  isSelectAll={isSelectAll}
                  isSelectAll2={isSelectAll2}
                  title="Dùng chung:"
                  value={["Không chọn", "Chọn"]}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.main_footer_button}>
        <button type="button" className={styles.btn_cancle}>
          Hủy
        </button>
        <button type="button" className={styles.btn_save}>
          Lưu
        </button>
      </div>
    </div>
  );
};

export default TableDataPotential;
