import React, { useEffect, useState } from "react";
import styles from "../potential/merge/merge.module.css";
import RowRadioInput from "../potential/merge/row_input_radio";
import CancelModalCustomApi from "../customer/customer_modal/customer_mdal_cancel";
import ModalError from "../customer/customer_modal/error_mdal";
import { base_url } from "../service/function";
import RowRadioInputDate from "../potential/merge/row_input_radio_date";
import RowRadioInputDes from "../potential/merge/row_input_description";
const Cookies = require("js-cookie");

interface CustomerProps {}

const TableDataCustomerMerge: React.FC<CustomerProps> = ({}) => {
  const [defaultCheckBox, setDefaultCheckBox] = useState(false);
  const [selectedImage, setSelectedImage] = useState("/crm/user_kh.png");
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [isOpenSuccessMdal, setISOpenSuccessMdal] = useState(false);
  const [isOpenModalError, setIsOpenModalError] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedData, setSelectedData] = useState<any>({});
  const [defaultState, setDefaultState] = useState({});
  const [newData, setNewData] = useState<any>([]);
  const storedData = sessionStorage.getItem("DataSelectedCustomer");
  const parsedData = JSON.parse(storedData)?.data;
  const [targetId, setTargetId] = useState("");

  function generateDateCowStringFromTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Chuyển đổi Unix timestamp thành đối tượng Date
    const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và định dạng thành 2 chữ số
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và định dạng thành 2 chữ số
    const year = date.getFullYear();
    const result = `${day}/${month}/${year}`;
    return result;
  }

  const getCustomerDetail = async () => {
    const promises =
      parsedData &&
      parsedData
        ?.split(",")
        .map(Number)
        .map(async (cusId) => {
          const res = await fetch(
            `${base_url}/api/crm/customerdetails/detail`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token_base365")}`,
              },
              body: JSON.stringify({ cus_id: cusId }),
            }
          );
          return await res.json();
        });

    const customerDetails = await Promise.all(promises);
    const newArr = customerDetails?.map((items) => {
      return {
        data: {
          ...items.data,
          ngay_sua: generateDateCowStringFromTimestamp(items?.data?.ngay_sua),
          ngay_tao: generateDateCowStringFromTimestamp(items?.data?.ngay_tao),
          la_khach_hang_tu: generateDateCowStringFromTimestamp(
            items?.data?.la_khach_hang_tu
          ),
          created_at: generateDateCowStringFromTimestamp(
            items?.data?.created_at
          ),
        },
      };
    });
    setNewData(customerDetails);
  };

  const handleImageChange = (selectedValue: string) => {
    setSelectedId(selectedValue);
  };

  const checkAndReturnData = (val) => {
    if (selectedData?.[val]?.filter((item) => item.status)?.length > 0) {
      return (
        selectedData?.[val]?.filter((item) => item.status)[0].info ||
        selectedData?.[val]?.filter((item) => item.status)[0].val
      );
    } else {
      // alert("Vui long chon day du thuoc tinh");
      setIsOpenModalError(true);
    }
  };

  const handleClickOpenModal = () => {
    // setISOpenSuccessMdal(true);
    const dataPost = {
      arrCus: parsedData,
      name: checkAndReturnData("name"),
      stand_name: checkAndReturnData("stand_name"),
      logo: checkAndReturnData("logo"),
      // birthday: checkAndReturnData("birthday"),
      tax_code: checkAndReturnData("tax_code"),
      cit_id: checkAndReturnData("bill_city"),
      address: checkAndReturnData("address"),
      ship_invoice_address: checkAndReturnData("ship_invoice_address"),
      gender: checkAndReturnData("gender"),
      cmnd_ccnd_number: checkAndReturnData("cmnd_ccnd_number"),
      cmnd_ccnd_address: checkAndReturnData("cmnd_ccnd_address"),
      cmnd_ccnd_time: checkAndReturnData("cmnd_ccnd_time"),
      description: checkAndReturnData("description"),
      introducer: checkAndReturnData("introducer"),
      contact_phone: checkAndReturnData("phone_number"),
      emp_id: checkAndReturnData("emp_id"),
      group_id: checkAndReturnData("group_id"),
      status: checkAndReturnData("status"),
      business_type: checkAndReturnData("sector"),
      classify: checkAndReturnData("loai_hinh_khach_hang"),
      bill_city: checkAndReturnData("bill_city"),
      bil_district: checkAndReturnData("bill_district"),
      bill_ward: checkAndReturnData("bill_ward"),
      bill_address: checkAndReturnData("bill_address"),
      bill_invoice_address: checkAndReturnData("bill_invoice_address"),
      bill_invoice_address_email: checkAndReturnData(
        "bill_invoice_address_email"
      ),
      ship_city: checkAndReturnData("ship_city"),
      bank_id: checkAndReturnData("bank_id"),
      bank_account: checkAndReturnData("bank_account"),
      revenue: checkAndReturnData("revenue"),
      size: checkAndReturnData("size"),
      rank: checkAndReturnData("rank"),
      website: checkAndReturnData("website"),
      number_of_day_owed: checkAndReturnData("number_of_day_owed"),
      share_all: checkAndReturnData("share_all"),
      type: checkAndReturnData("type"),
      target_id: targetId,
      cus_from: checkAndReturnData("resoure"),
      deb_limit: checkAndReturnData("han_muc_no"),
      email: checkAndReturnData("email"),
    };

    if (targetId && !isOpenModalError) {
      setISOpenSuccessMdal(true);
    } else {
      setIsOpenModalError(true);
    }
  };

  const handleSelectAll = (index: number) => {
    setSelectedData(defaultState);
    const targetArr = parsedData?.split(",");
    setTargetId(targetArr[index]);
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
        val:
          typeof param === "string"
            ? el?.data?.[param]
            : param?.length === 2
            ? el?.data?.[param?.[0]]?.[param?.[1]]
            : el?.data?.[param?.[0]]?.[param?.[1]]?.[param?.[2]],
        info: typeof param === "string" ? null : el?.data?.[param?.[0]]?.info,
      };
    });
  };

  useEffect(() => {
    if (newData) {
      const data = {
        type: setDefaultArr("type", newData),
        name: setDefaultArr("name", newData),
        stand_name: setDefaultArr(["stand_name", "detail"], newData),
        phone_number: setDefaultArr(["phone_number", "detail"], newData),
        classify: setDefaultArr(["classify", "detail"], newData),
        introducer: setDefaultArr(["introducer", "detail"], newData),
        loai_hinh_khach_hang: setDefaultArr("loai_hinh_khach_hang", newData),
        group_id: setDefaultArr(["group_id", "detail", "gr_name"], newData),
        status: setDefaultArr(["status", "detail", "stt_name"], newData),
        emp_id: setDefaultArr(["emp_id", "detail", "userName"], newData),
        country: setDefaultArr("country", newData),
        bill_city: setDefaultArr(["bill_city", "detail"], newData),
        bill_district: setDefaultArr(["bill_district", "detail"], newData),
        bill_ward: setDefaultArr(["bill_ward", "detail"], newData),
        bill_invoice_address: setDefaultArr(
          ["bill_invoice_address", "detail"],
          newData
        ),
        bill_area_code: setDefaultArr(["bill_area_code", "detail"], newData),
        bill_address: setDefaultArr(["bill_address", "detail"], newData),
        bill_invoice_address_email: setDefaultArr(
          ["bill_invoice_address_email", "detail"],
          newData
        ),
        tax_code: setDefaultArr("tax_code", newData),
        countryship: setDefaultArr("country", newData),
        ship_city: setDefaultArr("ship_city", newData),
        giao_hang_huyen: setDefaultArr("giao_hang_huyen", newData),
        giao_hang_xa: setDefaultArr("giao_hang_xa", newData),
        address: setDefaultArr(["address", "detail"], newData),
        ship_area: setDefaultArr(["ship_area", "detail"], newData),
        ship_invoice_address: setDefaultArr(
          ["ship_invoice_address", "detail"],
          newData
        ),
        sector: setDefaultArr(["business_type", "detail"], newData),
        bank_id: setDefaultArr(["bank_id", "detail"], newData),
        bank_account: setDefaultArr(["bank_account", "detail"], newData),
        created_at: setDefaultArr("created_at", newData),
        la_khach_hang_tu: setDefaultArr("la_khach_hang_tu", newData),
        revenue: setDefaultArr(["revenue", "detail"], newData),
        resoure: setDefaultArr(["resoure", "detail"], newData),
        size: setDefaultArr(["size", "detail"], newData),
        website: setDefaultArr("website", newData),
        rank: setDefaultArr(["rank", "detail"], newData),
        han_muc_no: setDefaultArr("han_muc_no", newData),
        number_of_day_owed: setDefaultArr("number_of_day_owed", newData),
        email: setDefaultArr(["email", "detail"], newData),
        nguongoc: setDefaultArr("resorce", newData),
        masothue: setDefaultArr("tax_code", newData),
        gender: setDefaultArr("gender", newData),
        cmnd_ccnd_number: setDefaultArr("cmnd_ccnd_number", newData),
        cmnd_ccnd_address: setDefaultArr("cmnd_ccnd_address", newData),
        cmnd_ccnd_time: setDefaultArr("cmnd_ccnd_time", newData),
        description: setDefaultArr(["description", "detail"], newData),
        share_all: setDefaultArr("share_all", newData),
        logo: setDefaultArr("logo", newData),
      };

      setSelectedData(data);
      setDefaultState(data);
    }
  }, [newData]);

  useEffect(() => {
    getCustomerDetail();
  }, []);

  return (
    <>
      <div className={styles.main_potential}>
        <div className={styles.content_table}>
          <div className={styles.main_title}>Gộp trùng khách hàng</div>
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
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="type"
                    title="Loại hình:"
                    setTargetId={setTargetId}
                    targetId={parsedData}
                    value={
                      newData?.map((item) => item?.data?.type) ||
                      "Chưa cập nhật"
                    }
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
                          checked={selectedData?.logo?.[index]?.status}
                          name="logo"
                          type="radio"
                          className={styles.radio}
                          value={
                            newData?.map((item) => item?.data?.logo) ||
                            "/crm/user_kh.png"
                          }
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
                    name="name"
                    title="Tên khách hàng:"
                    value={
                      newData?.map((item) => item?.data?.name) ||
                      "Chưa cập nhật"
                    }
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="stand_name"
                    title="Tên viết tắt:"
                    value={newData?.map(
                      (item) => item?.data?.stand_name.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="tax_code"
                    title="Mã số thuế"
                    value={newData?.map(
                      (item) => item?.data?.tax_code || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="phone_number"
                    title="Điện thoại:"
                    value={newData?.map(
                      (item) =>
                        item?.data?.phone_number.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="email"
                    title="Email:"
                    value={newData?.map(
                      (item) => item?.data?.email.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="resoure"
                    title="Nguồn khách hàng:"
                    value={newData?.map(
                      (item) => item?.data?.resoure.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="classify"
                    title="Phân loại khách hàng"
                    value={newData?.map(
                      (item) => item?.data?.classify.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="introducer"
                    title="Lĩnh vực"
                    value={newData?.map(
                      (item) =>
                        item?.data?.introducer?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="loai_hinh_khach_hang"
                    title="Loại hình"
                    value={newData?.map(
                      (item) =>
                        item?.data?.loai_hinh_khach_hang || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="sector"
                    title="Ngành nghề"
                    value={newData?.map(
                      (item) => item?.business_areas?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="group_id"
                    title="Nhóm khách hàng"
                    value={newData?.map(
                      (item) =>
                        item?.data?.group_id?.detail?.gr_name || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="status"
                    title="Tình trạng khách hàng"
                    value={newData?.map(
                      (item) =>
                        item?.data?.status?.detail?.stt_name || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="emp_id"
                    title="Nhân viên phụ trách"
                    value={newData?.map(
                      (item) =>
                        item?.data?.emp_id?.detail?.userName || "Chưa cập nhật"
                    )}
                  />

                  {/* Bill Infor */}

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
                    name="country"
                    title="Quốc gia:"
                    value={newData?.map((item) => item?.country || "Việt Nam")}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="bill_city"
                    title="Tỉnh/Thành phố"
                    value={newData?.map(
                      (item) => item?.data?.bill_city?.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="bill_district"
                    title="Quận/Huyện"
                    value={newData?.map(
                      (item) =>
                        item?.data?.bill_district.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="bill_ward"
                    title="Phường/Xã"
                    value={newData?.map(
                      (item) => item?.data?.bill_ward.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="bill_invoice_address"
                    title="Số nhà "
                    value={newData?.map(
                      (item) =>
                        item?.data?.bill_invoice_address.detail ||
                        "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="bill_area_code"
                    title="Mã vùng"
                    value={newData?.map(
                      (item) =>
                        item?.data?.bill_area_code.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="bill_address"
                    title="Địa chỉ hóa đơn"
                    value={newData?.map(
                      (item) =>
                        item?.data?.bill_address.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="bill_invoice_address_email"
                    title="Địa chỉ email nhận hóa đơn (email)"
                    value={newData?.map(
                      (item) =>
                        item?.data?.bill_invoice_address_email?.detail ||
                        "Chưa cập nhật"
                    )}
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
                    name="countryship"
                    title="Quốc gia"
                    value={newData?.map((item) => item?.country || "Việt Nam")}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="ship_city"
                    title="Tỉnh/Thành phố"
                    value={newData?.map(
                      (item) => item?.data?.ship_city || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="giao_hang_huyen"
                    title="Quận/Huyện"
                    value={newData?.map(
                      (item) => item?.data?.giao_hang_huyen || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="giao_hang_xa"
                    title="Phường/Xã"
                    value={newData?.map(
                      (item) => item?.data?.giao_hang_xa || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="address"
                    title="Số nhà "
                    value={newData?.map(
                      (item) => item?.data?.address.detail || "Chưa cập nhật"
                    )}
                  />

                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="ship_area"
                    title="Mã vùng"
                    value={newData?.map(
                      (item) => item?.data?.ship_area.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="ship_invoice_address"
                    title="Địa chỉ hóa đơn"
                    value={newData?.map(
                      (item) =>
                        item?.data?.ship_invoice_address.detail ||
                        "Chưa cập nhật"
                    )}
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
                    name="bank_id"
                    title="Tài khoản ngân hàng"
                    value={newData?.map(
                      (item) => item?.data?.bank_id?.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="bank_account"
                    title="Mở tại ngân hàng"
                    value={newData?.map(
                      (item) =>
                        item?.data?.bank_account?.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInputDate
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="created_at"
                    title="Ngày thành lập/Ngày sinh"
                    value={newData?.map(
                      (item) => item?.data?.created_at || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInputDate
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="la_khach_hang_tu"
                    title="Là khách hàng từ"
                    value={newData?.map(
                      (item) => item?.data?.la_khach_hang_tu || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="revenue"
                    title="Doanh thu"
                    value={newData?.map(
                      (item) => item?.data?.revenue.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="size"
                    title="Quy mô nhân sự"
                    value={newData?.map(
                      (item) => item?.data?.size.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="webiste"
                    title="Website"
                    value={newData?.map(
                      (item) => item?.data?.webiste || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="rank"
                    title="Xếp hạng khách hàng"
                    value={newData?.map(
                      (item) => item?.data?.rank.detail || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="han_muc_no"
                    title="Hạn mức nợ"
                    value={newData?.map(
                      (item) => item?.data?.han_muc_no || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="number_of_day_owed"
                    title="Số ngày được nợ"
                    value={newData?.map(
                      (item) =>
                        item?.data?.number_of_day_owed || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="gender"
                    title="Giới tính"
                    value={newData?.map(
                      (item) => item?.data?.gender || "Chưa cập nhật"
                    )}
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
                    name="cmnd_ccnd_number"
                    title="Số CMND/CCCD"
                    value={newData?.map(
                      (item) => item?.data?.cmnd_ccnd_number || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInput
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="cmnd_ccnd_address"
                    title="Nơi cấp"
                    value={newData?.map(
                      (item) => item?.data?.cmnd_ccnd_address || "Chưa cập nhật"
                    )}
                  />
                  <RowRadioInputDate
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="cmnd_ccnd_time"
                    title="Ngày cấp"
                    value={newData?.map((item) => item?.data?.cmnd_ccnd_time)}
                  />

                  {/*  Description Infor */}
                  <RowRadioInputDes
                    defaultCheckBox={defaultCheckBox}
                    setDefaultCheckBox={setDefaultCheckBox}
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}
                    name="description"
                    title="Thông tin mô tả"
                    value={newData?.map(
                      (item) =>
                        item?.data?.description?.detail || "Chưa cập nhật"
                    )}
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
                    name="share_all"
                    title="Dùng chung:"
                    value={newData?.map(
                      (item) => item?.data?.share_all || "Chưa cập nhật"
                    )}
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
        link={"/customer/list"}
      />

      <CancelModalCustomApi
        isModalCancel={isOpenSuccessMdal}
        setIsModalCancel={setISOpenSuccessMdal}
        title={"Xác nhận gộp trùng khách hàng"}
        link={"/customer/list"}
        content={
          "Tất cả trường thông tin đã chọn sẽ được gộp vào bản ghi chính. Các thông tin liên quan (Tệp đính kèm, Ghi chú, Hoạt động và Hàng hóa) sẽ được gắn với bản ghi chính. Bạn có muốn tiếp tục gộp trùng?"
        }
        handleCloseMdal={() => setISOpenSuccessMdal(false)}
      />

      <ModalError
        modal1Open={isOpenModalError}
        setModal1Open={setIsOpenModalError}
        title={"Cần chọn đầy đủ các thuộc tính khách hàng"}
        link={"/customer/same_filter"}
      />
    </>
  );
};

export default TableDataCustomerMerge;
