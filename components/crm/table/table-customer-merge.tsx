import React, { useEffect, useState } from "react";
import styles from "../potential/merge/merge.module.css";
import RowRadioInput from "../potential/merge/row_input_radio";
import RowRadioInputRow from "../customer/merege/radio_btn_input_row";
import CancelModalCustomApi from "../customer/customer_modal/customer_mdal_cancel";
import ModalError from "../customer/customer_modal/error_mdal";
interface CustomerProps {
  data: any;
}

const TableDataCustomerMerge: React.FC<CustomerProps> = ({ data }) => {
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isSelectAll2, setIsSelectAll2] = useState(false);
  const [defaultCheckBox, setDefaultCheckBox] = useState(false);
  const [selectedImage, setSelectedImage] = useState("/crm/user_kh.png");
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [isOpenSuccessMdal, setISOpenSuccessMdal] = useState(false);
  const [isOpenModalError, setIsOpenModalError] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const newData = data?.data;
  const [selectedData, setSelectedData] = useState<any>({});
  const [defaultState, setDefaultState] = useState({});

  const handleImageChange = (selectedValue: string) => {
    setSelectedId(selectedValue);
  };

  const handleClickOpenModal = () => {
    setISOpenSuccessMdal(true);
    // setIsOpenModalError(true);
  };

  const handleSelectAll = (index: number) => {
    setSelectedData(defaultState);
    setSelectedData((prevSelectedData) => {
      const updatedSelectedData = { ...prevSelectedData };
      for (const key in updatedSelectedData) {
        if (Array.isArray(updatedSelectedData[key])) {
          updatedSelectedData[key] = updatedSelectedData[key].map((item, i) =>
            i === index
              ? {
                  ...item,
                  status: true,
                }
              : {
                  ...item,
                  status: false,
                }
          );
        }
      }
      return updatedSelectedData;
    });
  };

  const setDefaultArr = (param: any, data) => {
    return data?.map((el) => {
      return {
        status: false,
        val: el?.[param],
      };
    });
  };

  useEffect(() => {
    if (newData) {
      const data = {
        xungho: setDefaultArr("salutation", newData),
        tendem: setDefaultArr("operation", newData),
        ten: setDefaultArr("name", newData),
        hovaten: setDefaultArr("operation", newData),
        chucdanh: setDefaultArr("name", newData),
        phongban: setDefaultArr("name", newData),
        dienthoaicoquan: setDefaultArr("name", newData),
        dienthoaicanhan: setDefaultArr("name", newData),
        emailcoquan: setDefaultArr("name", newData),
        emailcanhan: setDefaultArr("name", newData),
        nguongoc: setDefaultArr("name", newData),
        masothue: setDefaultArr("name", newData),
        loaitiemnang: setDefaultArr("name", newData),
        mangxahoi: setDefaultArr("name", newData),
        nhanvien: setDefaultArr("name", newData),
        gioitinh: setDefaultArr("name", newData),
        ngaysinh: setDefaultArr("name", newData),
        tochuc: setDefaultArr("name", newData),
        taikhoannh: setDefaultArr("name", newData),
        motainh: setDefaultArr("name", newData),
        ngaytl: setDefaultArr("name", newData),
        loaihinh: setDefaultArr("name", newData),
        linhvuc: setDefaultArr("name", newData),
        nganhnghe: setDefaultArr("name", newData),
        doanhthu: setDefaultArr("name", newData),
        quocgia: setDefaultArr("name", newData),
        city: setDefaultArr("name", newData),
        district: setDefaultArr("name", newData),
        ward: setDefaultArr("name", newData),
        street: setDefaultArr("name", newData),
        mavung: setDefaultArr("name", newData),
        diachi: setDefaultArr("name", newData),
        mota: setDefaultArr("name", newData),
        dungchung: setDefaultArr("name", newData),
        image: setDefaultArr("name", newData),
      };
      setSelectedData(data);
      setDefaultState(data);
    }
  }, [newData]);
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
                    {newData?.map((record, index) => (
                      <th key={index}>
                        Bản ghi {index + 1}
                        <button
                          onClick={() => {
                            handleSelectAll(index);
                          }}
                        >
                          {/* {selectAllData ? "Bỏ chọn" : "Chọn tất cả"} */}
                          Chọn tất cả
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Type */}
                  <RowRadioInputRow
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="type_customer"
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
                    {newData?.map((record, index) => (
                      <td key={index}>
                        <input
                          onChange={() => handleImageChange(index)}
                          checked={selectedData?.image?.[index]?.status}
                          name="image"
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
                    ))}
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
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_vocative"
                    title="Tên khách hàng"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_middle_name"
                    title="Tên viết tắt"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_name"
                    title="Mã số thuế"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_fullname"
                    title="Điện thoại:"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_titles"
                    title="Email"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_department"
                    title="Nguồn khách hàng"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_office_phone"
                    title="Phân loại khách hàng"
                    value={["Khách hàng bán lẻ ", "Khách hàng bán lẻ"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_personal_phone"
                    title="Lĩnh vực"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_office_email"
                    title="Loại hình"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_personal_email"
                    title="Ngành nghề"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_source"
                    title="Nhóm khách hàng"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_tax_code"
                    title="Tình trạng khách hàng"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_type"
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
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_gender"
                    title="Giới tính:"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_birth"
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
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_tochuc"
                    title="Quốc gia"
                    value={["Việt Nam ", "Việt Nam"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_bank_num"
                    title="Tỉnh/Thành phố"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_bank_account"
                    title="Quận/Huyện"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_tl"
                    title="Phường/Xã"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_business_type"
                    title="Số nhà "
                    value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_business_areas"
                    title="Mã vùng"
                    value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_cate"
                    title="Địa chỉ hóa đơn"
                    value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_revenue"
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
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_tochuc1"
                    title="Quốc gia"
                    value={["Việt Nam ", "Việt Nam"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_bank_num1"
                    title="Tỉnh/Thành phố"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_bank_account1"
                    title="Quận/Huyện"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_tl1"
                    title="Phường/Xã"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_business_type1"
                    title="Số nhà "
                    value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_business_areas1"
                    title="Mã vùng"
                    value={["Chưa cập nhật. ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_cate1"
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
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_qg"
                    title="Tài khoản ngân hàng"
                    value={["Chưa cập nhật.", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_tt"
                    title="Mở tại ngân hàng"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_qh"
                    title="Ngày thành lập/Ngày sinh"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_px"
                    title="Là khách hàng từ"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_street"
                    title="Doanh thu"
                    value={["Chưa cập nhật.", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_area_code"
                    title="Quy mô nhân sự"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_address"
                    title="Website"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_des"
                    title="Xếp hạng khách hàng"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_des1"
                    title="Hạn mức nợ"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_des2"
                    title="Số ngày được nợ"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_des2"
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
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_cccd"
                    title="Số CMND/CCCD"
                    value={["Chưa cập nhật.", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_rdo_area"
                    title="Nơi cấp"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_date_provide"
                    title="Ngày cấp"
                    value={["Chưa cập nhật ", "Chưa cập nhật"]}
                  />

                  {/*  Description Infor */}
                  <RowRadioInputRow
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_description"
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
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rdo_system"
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
