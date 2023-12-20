import React, { useState, useRef, useEffect } from "react";
import styles from "../customer/group_customer/customer_group.module.css";
import Link from "next/link";
import exportToExcel from "../ultis/export_xlxs";
import Image from "next/image";
import CustomerListAction from "./customer_action";
import { Drawer, Input } from "antd";
import CustomerListFilterBox from "./customer_filter_box";
import { DataType } from "@/pages/customer/list";
import { useRouter } from "next/router";
import { axiosCRMv2 } from "@/utils/api/api_crm";
import { decodeToken } from "@/utils/function";
import useLoading from "../hooks/useLoading";
import LoadingLayout from "@/constants/LoadingLayout";
import btnStyle from "@/styles/crm/button.module.css";
import ModalDataConvertCart from "./customer_modal/modal_data_convert_cart";
import ModalDataCustomerKD from "./customer_modal/modal_data_KD";

export default function CustomerListInputGroup({
  isSelectedRow,
  numberSelected,
  clearOption,
  chooseAllOption,
  setName,
  name,
  fetchData,
  selectedCus,
  dataStatusCustomer,
  setStatus,
  setResoure,
  datatable,
  nvPhuTrach,
  setnvPhuTrach,
  userNameCreate,
  setuserNameCreate,
  nhomCha,
  setnhomCha,
  nhomCon,
  setnhomCon,
  setloading,
  setDatatable,
  setgroup_id,
  setTimeStart,
  setTimeEnd,
  setdateE,
  setdateS,
  setTime_s,
  setTime_e,
  setemp_id,
  setIdNhom,
  listGr,
  listGr_Child,
  nameNvNomor,
  nv,
  role,
  posId,
  listNV,
  handover,
  setIsApDung,
  setIsOpenFilterBox,
  isOpenFilterBox,
  dataLength,
  isRowDataSelected,
  selectedCusIds,
  keyword,
  status,
  resoure,
  user_create_id,
  emp_id,
  group_id,
  time_s,
  time_e,
  date_at_e,
  time_at_e,
  date_at_s,
  time_at_s,
  create_at_e,
  create_at_s,
  setdate_at_e,
  settime_at_e,
  setdate_at_s,
  settime_at_s,
  setcreate_at_e,
  setcreate_at_s,
  page,
  idNhom,
  timeEnd,
  dateE,
  dateS,
  timeStart,
}: any) {
  const [open, setOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<any>();
  const [nameFill, setNameFill] = useState<any>();
  const cancelDownloadRef = useRef(false);
  const [isOpenModalConvertCart, setIsOpenModalConvertCart] = useState(false);
  const [isOpenModalDataCustomerKD, setIsOpenModalDataCustomerKD] =
    useState(true);
  const { isLoading, handleLoading } = useLoading();
  const showDrawer = () => {
    setIsOpenFilterBox(true);
    setOpen(true);
  };
  const { userType, idQLC } = decodeToken();
  const onClose = () => {
    setOpen(false);
    setIsOpenFilterBox(false);
  };
  const handleGetAllCustomer = async () => {
    const dataExport = [];
    let page = 1;

    try {
      while (!cancelDownloadRef.current) {
        const res = await axiosCRMv2("/customer/list", {
          page: page,
          perPage: 1000,
          ...(userType === 2 && { emp_id: idQLC }),
        });

        dataExport.push(...res);
        page++;
        if (cancelDownloadRef.current || res.length < 1000) {
          break;
        }
      }

      if (!cancelDownloadRef.current) {
        // Hoàn thành quá trình tải dữ liệu
        handleExportToExcel(dataExport);
      } else {
        cancelDownloadRef.current = false;
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error in handleGetAllCustomer:", error);
    }
  };

  const handleExportToExcel = (data) => {
    const dataExport = data?.map((item: DataType) => ({
      "Mã tiềm năng": item?.cus_id,
      "Xưng hô": "",
      "Họ tên": item?.name,
      "Chức danh": "",
      "Điện thoại cá nhân": item?.phone_number,
      "Email cá nhân": item?.email,
      "Điện thoại cơ quan": "",
      "Email cơ quan": "",
      "Địa chỉ": "",
      "Tỉnh/Thành phố": "",
      "Quận/Huyện": "",
      "Phường xã": "",
      "Nguồn gốc": "",
      "Loại hình": "",
      "Lĩnh vực": "",
      "Mô tả": item?.description,
      "Mô tả loại hình": "",
      "Người tạo": item?.userNameCreate,
    }));
    const filename = "Danh sách khách hàng.xlsx";
    const sheetName = "Danh sách khách hàng";
    const columnHeaders = [
      "Mã tiềm năng",
      "Xưng hô",
      "Họ tên",
      "Chức danh",
      "Điện thoại cá nhân",
      "Email cá nhân",
      "Điện thoại cơ quan",
      "Email cơ quan",
      "Địa chỉ",
      "Tỉnh/Thành phố",
      "Quận/Huyện",
      "Phường xã",
      "Nguồn gốc",
      "Loại hình",
      "Lĩnh vực",
      "Mô tả",
      "Mô tả loại hình",
      "Người tạo",
    ];
    exportToExcel(dataExport, filename, sheetName, columnHeaders);
  };

  const handleClickFile = () => {
    inputFileRef.current?.click();
  };
  const router = useRouter();
  const handleSearchKH = async () => {
    if (nameFill === name) {
      setName(nameFill);
      setloading(true);
      router.push(
        `/customer/list?${time_s ? `&start=${time_s}` : ""}${
          time_e ? `&end=${time_e}` : ""
        }${create_at_s ? `&create_at_s=${create_at_s}` : ""}${
          create_at_e ? `&create_at_e=${create_at_e}` : ""
        }${status ? `&status=${status}` : ""}${
          resoure ? `&source=${resoure}` : ""
        }${idNhom ? `&group=${idNhom}` : ""}${
          emp_id ? `&emp_id=${emp_id}` : ""
        }${user_create_id ? `&creater=${user_create_id}` : ""}${
          nameFill ? `&keyword=${nameFill}` : ""
        } 
  `
      );
    } else {
      setDatatable([]);
      setName(nameFill);
      setloading(true);
      router.push(
        `/customer/list?${time_s ? `&start=${time_s}` : ""}${
          time_e ? `&end=${time_e}` : ""
        }${create_at_s ? `&create_at_s=${create_at_s}` : ""}${
          create_at_e ? `&create_at_e=${create_at_e}` : ""
        }${status ? `&status=${status}` : ""}${
          resoure ? `&source=${resoure}` : ""
        }${idNhom ? `&group=${idNhom}` : ""}${
          emp_id ? `&emp_id=${emp_id}` : ""
        }${user_create_id ? `&creater=${user_create_id}` : ""}${
          nameFill ? `&keyword=${nameFill}` : ""
        } 
  `
      );
    }
  };
  return (
    <>
      <div className={`${styles.main__control} ${styles.customer_custom}`}>
        <div className={`${styles.main__control_btn} flex_between`}>
          <div
            className={`${styles.main__control_search} ${styles.f_search_customer}`}
          >
            <form
              onSubmit={(e) => (e.preventDefault(), handleSearchKH())}
              className={styles.form_search}
            >
              <Input
                type="text"
                value={data}
                onChange={(e) => (
                  setNameFill(e.target.value.trim()), setData(e.target.value)
                )}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo tên khách hàng, điện thoại, email"
              />
              <button
                onClick={() => handleSearchKH()}
                type="button"
                style={{ width: "115px" }}
              >
                <div>Tìm kiếm </div>
              </button>
            </form>
          </div>
          <div className={styles.main_control_new}>
            <div className={styles.dropdown_action_btn}>
              <button
                onClick={showDrawer}
                className={styles.btn_light_filter}
                style={{ color: "#4C5BD4", fontWeight: 600, fontSize: 15 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 4,
                  }}
                >
                  <div>
                    <Image
                      src="/crm/icon_search.svg"
                      alt="filter"
                      width={15}
                      height={15}
                    />
                  </div>
                  <div>Bộ lọc</div>
                </div>
              </button>
            </div>
            <div className={styles.dropdown_action_btn}>
              <Link className={styles.api_connect_btn} href={"/setting/api"}>
                <button
                  className={styles.btn_light_api}
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "'Roboto-Medium'",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontFamily: "Roboto-Medium",
                      paddingTop: 4,
                      fontWeight: 600,
                    }}
                  >
                    <div>
                      <Image
                        src="/crm/h_export_cus.svg"
                        alt="filter"
                        width={15}
                        height={15}
                      />
                    </div>
                    <div>Kết nối API</div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <CustomerListAction
          clearOption={clearOption}
          chooseAllOption={chooseAllOption}
          numberSelected={numberSelected}
          selectedCus={selectedCus}
          id={"123"}
          listNV={listNV}
          handover={handover}
          fetchData={fetchData}
          dataLength={dataLength}
          isRowDataSelected={isRowDataSelected}
          selectedCusIds={selectedCusIds}
        />

        <div className={`${styles.main__control_add}`}>
          <Link href="/customer/add">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpenModalConvertCart(true)}
            className={`${styles.dropbtn_add} flex_align_center ${btnStyle.btn_yellow}`}
          >
            Dữ liệu chia khách hàng
          </button>
          <button
            type="button"
            onClick={() => setIsOpenModalConvertCart(true)}
            className={`${styles.dropbtn_add} flex_align_center ${btnStyle.btn_yellow}`}
          >
            Dữ liệu kinh doanh
          </button>
          <button
            type="button"
            onClick={handleClickFile}
            className={`${styles.dropbtn_add} flex_align_center ${styles.btn_file}`}
          >
            <img src="/crm/h_import_cus.svg" />
            Nhập từ file
            <input type="file" hidden ref={inputFileRef} />
          </button>
          {isLoading ? (
            <button
              type="button"
              style={{ height: "39px" }}
              onClick={() => {
                cancelDownloadRef.current = true;
              }}
              className={`${styles.dropbtn_add} flex_align_center ${styles.btn_excel}`}
            >
              Hủy
              <LoadingLayout />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleLoading(handleGetAllCustomer)}
              className={`${styles.dropbtn_add} flex_align_center ${styles.btn_excel}`}
            >
              <img src="/crm/icon_excel.svg" />
              Xuất excel
            </button>
          )}
        </div>
      </div>

      <Drawer
        title={<div style={{ color: "#fff" }}>Bộ lọc</div>}
        placement="right"
        onClose={onClose}
        open={open}
        style={{ overflowY: "hidden" }}
        className="custom_drawer"
        footer
        closable
        headerStyle={{ textAlign: "center", background: "#4C5BD4" }}
      >
        <div>
          <CustomerListFilterBox
            keyword={name}
            status={status}
            resoure={resoure}
            user_create_id={nvPhuTrach}
            emp_id={emp_id}
            group_id={group_id}
            page={page}
            idNhom={idNhom}
            setIdNhom={setIdNhom}
            dataStatusCustomer={dataStatusCustomer}
            setOpen={setOpen}
            setStatus={setStatus}
            fetchData={fetchData}
            setResoure={setResoure}
            datatable={datatable}
            nvPhuTrach={nvPhuTrach}
            setnvPhuTrach={setnvPhuTrach}
            userNameCreate={userNameCreate}
            setuserNameCreate={setuserNameCreate}
            nhomCha={nhomCha}
            setnhomCha={setnhomCha}
            nhomCon={nhomCon}
            setnhomCon={setnhomCon}
            setDatatable={setDatatable}
            setloading={setloading}
            setgroup_id={setgroup_id}
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            setdateE={setdateE}
            setdateS={setdateS}
            setemp_id={setemp_id}
            nv={nv}
            role={role}
            posId={posId}
            listNV={listNV}
            nameNvNomor={nameNvNomor}
            listGr={listGr}
            listGr_Child={listGr_Child}
            setIsApDung={setIsApDung}
            setIsOpenFilterBox={setIsOpenFilterBox}
            isOpenFilterBox={isOpenFilterBox}
            nameFill={nameFill}
            name={name}
            timeStart={timeStart}
            timeEnd={timeEnd}
            dateE={dateE}
            dateS={dateS}
            time_at_e={time_at_e}
            time_at_s={time_at_s}
            date_at_s={date_at_s}
            date_at_e={date_at_e}
            settime_at_e={settime_at_e}
            settime_at_s={settime_at_s}
            setdate_at_s={setdate_at_s}
            setdate_at_e={setdate_at_e}
          />
        </div>
      </Drawer>
      <ModalDataConvertCart
        isOpenModalConvertCart={isOpenModalConvertCart}
        setIsOpenModalConvertCart={setIsOpenModalConvertCart}
      />
      <ModalDataCustomerKD
        isOpenModalDataCustomerKD={isOpenModalDataCustomerKD}
        setIsOpenModalDataCustomerKD={setIsOpenModalDataCustomerKD}
      />
    </>
  );
}
