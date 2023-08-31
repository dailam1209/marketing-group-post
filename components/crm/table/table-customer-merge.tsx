import React, { useEffect, useState } from "react";
import styles from "../potential/merge/merge.module.css";
import RowRadioInput from "../potential/merge/row_input_radio";
import RowRadioInputRow from "../customer/merege/radio_btn_input_row";
import CancelModalCustomApi from "../customer/customer_modal/customer_mdal_cancel";
import ModalError from "../customer/customer_modal/error_mdal";

const TableDataCustomerMerge: React.FC = () => {
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelectAll2, setIsSelectAll2] = useState(false);
  const [defaultCheckBox, setDefaultCheckBox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    "/crm/user_kh.png"
  );
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [isOpenSuccessMdal, setISOpenSuccessMdal] = useState(false);
  const [isOpenModalError, setIsOpenModalError] = useState(false);

  const handleImageChange = (selectedValue: string) => {
    setSelectedImage(selectedValue);
  };

  const handleClickOpenModal = () => {
    setISOpenSuccessMdal(true);
    // setIsOpenModalError(true);
  };

  useEffect(() => {
    if (isSelectAll) {
      setSelectedImage("/crm/user_kh.png");
    } else {
      setSelectedImage("http://crm.timviec365.vn/assets/img/user_kh.png");
    }
  }, [isSelectAll, isSelectAll2]);

  return (
    <>
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
                      Bản ghi 1{" "}
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
                    <th>
                      Bản ghi 2{" "}
                      <button
                        onClick={() => {
                          setIsSelectAll(false);
                          setDefaultCheckBox(true);
                          setIsSelectAll2(true);
                        }}
                      >
                        Chọn tất cả
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Type */}
                  <RowRadioInputRow
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="type_customer"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Loại hình:"
                    value={["Khách hàng cá nhân ", "Khách hàng cá nhân"]}
                  />

                  {/* Imgae */}
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
                        onChange={() =>
                          handleImageChange(
                            "/crm/user_kh.png"
                          )
                        }
                        checked={
                          selectedImage ===
                          "/crm/user_kh.png"
                        }
                        name="rdo_logo_image"
                        type="radio"
                        className={styles.radio}
                        value={
                          "/crm/user_kh.png"
                        }
                      />{" "}
                      <img
                        style={{ transform: "translate(15%, 15%)" }}
                        src="/crm/user_kh.png"
                        className={styles.img_person}
                      />
                    </td>
                    <td>
                      <input
                        onChange={() =>
                          handleImageChange(
                            "http://crm.timviec365.vn/assets/img/user_kh.png "
                          )
                        }
                        checked={
                          selectedImage ===
                          "http://crm.timviec365.vn/assets/img/user_kh.png"
                        }
                        name="rdo_logo_image"
                        type="radio"
                        value={
                          "http://crm.timviec365.vn/assets/img/user_kh.png "
                        }
                        className={styles.radio}
                      />{" "}
                      <img
                        style={{ transform: "translate(15%, 15%)" }}
                        src="http://crm.timviec365.vn/assets/img/user_kh.png"
                        className={styles.img_person}
                      />
                    </td>
                  </tr>

                  {/* General Info */}
                  <tr>
                    <td colSpan={4}>
                      <div
                        style={{ marginBottom: "0" }}
                        className={styles.main_body_type}
                      >
                        Thông tin chung
                      </div>
                    </td>
                  </tr>
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_vocative"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Tên khách hàng"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_middle_name"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Tên viết tắt"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_name"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Mã số thuế"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_fullname"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Điện thoại:"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_titles"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Email"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_department"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Nguồn khách hàng"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_office_phone"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Phân loại khách hàng"
                    value={["Khách hàng bán lẻ ", "Khách hàng bán lẻ"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_personal_phone"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Lĩnh vực"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_office_email"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Loại hình"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_personal_email"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Ngành nghề"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_source"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Nhóm khách hàng"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_tax_code"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Tình trạng khách hàng"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_type"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Nhân viên phụ trách"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  {/* Bill Infor */}
                  <tr>
                    <td>
                      <p className={styles.main_body_type}>
                        Thông tin viết hóa đơn
                      </p>
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
                    <td colSpan={4}>
                      <div
                        style={{ marginBottom: "0" }}
                        className={styles.main_body_type}
                      >
                        Thông tin viết hóa đơn
                      </div>
                    </td>
                  </tr>
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_tochuc"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Quốc gia"
                    value={["Việt Nam ", "Việt Nam"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_bank_num"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Tỉnh/Thành phố"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_bank_account"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Quận/Huyện"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_tl"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Phường/Xã"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_business_type"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Số nhà "
                    value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_business_areas"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Mã vùng"
                    value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_cate"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Địa chỉ hóa đơn"
                    value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_revenue"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Địa chỉ email nhận hóa đơn (email)"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  {/* Giao hang Infor */}
                  <tr>
                    <td colSpan={4}>
                      <div
                        style={{ marginBottom: "0" }}
                        className={styles.main_body_type}
                      >
                        Thông tin giao hàng
                      </div>
                    </td>
                  </tr>
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_tochuc1"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Quốc gia"
                    value={["Việt Nam ", "Việt Nam"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_bank_num1"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Tỉnh/Thành phố"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_bank_account1"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Quận/Huyện"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_tl1"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Phường/Xã"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_business_type1"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Số nhà "
                    value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_business_areas1"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Mã vùng"
                    value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_cate1"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Địa chỉ hóa đơn"
                    value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                  />

                  {/* Bonus infor */}
                  <tr>
                    <td colSpan={4}>
                      <div
                        style={{ marginBottom: "0" }}
                        className={styles.main_body_type}
                      >
                        Thông tin bổ sung
                      </div>
                    </td>
                  </tr>
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_qg"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Tài khoản ngân hàng"
                    value={["Chưa cập nhật.", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_tt"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Mở tại ngân hàng"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_qh"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Ngày thành lập/Ngày sinh"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_px"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Là khách hàng từ"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_street"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Doanh thu"
                    value={["Chưa cập nhật.", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_area_code"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Quy mô nhân sự"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_address"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Website"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_des"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Xếp hạng khách hàng"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_des1"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Hạn mức nợ"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_des2"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Số ngày được nợ"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_des2"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Giới tính"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  {/* CCCD */}
                  <tr>
                    <td colSpan={4}>
                      <div
                        style={{ marginBottom: "0" }}
                        className={styles.main_body_type}
                      >
                        Thông tin CMND/CCCD
                      </div>
                    </td>
                  </tr>
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_cccd"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Số CMND/CCCD"
                    value={["Chưa cập nhật.", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_rdo_area"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Nơi cấp"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_date_provide"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Ngày cấp"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  {/*  Description Infor */}
                  <RowRadioInputRow
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    name="rdo_description"
                    isSelectAll={isSelectAll}
                    isSelectAll2={isSelectAll2}
                    title="Thông tin mô tả"
                    value={["Không chọn", "Chọn"]}
                  />

                  {/* System Infor */}
                  <tr>
                    <td colSpan={4}>
                      <div
                        style={{ marginBottom: "0" }}
                        className={styles.main_body_type}
                      >
                        Thông tin hệ thống
                      </div>
                    </td>
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
          <button
            onClick={() => setIsOpenCancelModal(true)}
            type="button"
            className={styles.btn_cancle}
          >
            Hủy
          </button>
          <button
            onClick={handleClickOpenModal}
            type="button"
            className={styles.btn_save}
          >
            Lưu
          </button>
        </div>
      </div>

      <CancelModalCustomApi
        isModalCancel={isOpenCancelModal}
        setIsModalCancel={setIsOpenCancelModal}
        content={
          "Bạn có chắc chắn muốn hủy lưu thông tin gộp khách hàng mọi thông tin bạn nhập sẽ không được lưu lại?"
        }
        title={"Xác nhận hủy lưu gộp khách hàng"}
        handleCloseMdal={() => setIsOpenCancelModal(false)}
        link={"/crm/customer/list"}
      />

      <CancelModalCustomApi
        isModalCancel={isOpenSuccessMdal}
        setIsModalCancel={setISOpenSuccessMdal}
        title={"Xác nhận gộp trùng khách hàng"}
        link={"/crm/customer/list"}
        content={
          "Tất cả trường thông tin đã chọn sẽ được gộp vào bản ghi chính. Các thông tin liên quan (Tệp đính kèm, Ghi chú, Hoạt động và Hàng hóa) sẽ được gắn với bản ghi chính. Bạn có muốn tiếp tục gộp trùng?"
        }
        handleCloseMdal={() => setISOpenSuccessMdal(false)}
      />

      <ModalError
        modal1Open={isOpenModalError}
        setModal1Open={setIsOpenModalError}
        title={"Cần chọn đầy đủ các thuộc tính khách hàng"}
        link={"/crm/customer/same_filter"}
      />
    </>
  );
};

export default TableDataCustomerMerge;
