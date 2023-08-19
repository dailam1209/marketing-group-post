import React, { useState, useRef } from "react";
import styles from "../potential/potential.module.css";
import Link from "next/link";
import exportToExcel from "../ultis/export_xlxs";
import { data } from "../table/table-potential";
import Image from "next/image";
import CustomerListAction from "./customer_action";
import { Drawer, Input } from "antd";
import CustomerListFilterBox from "./customer_filter_box";
export default function CustomerListInputGroup({
  isSelectedRow,
  numberSelected,
  clearOption,
  chooseAllOption,
  setName,
  setPhone,
  fetchData,
}: any) {
  const [open, setOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<any>();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const datas = [
    {
      "Mã tiềm năng": "TN001",
      "Xưng hô": "Mr.",
      "Họ tên": "John Doe",
      "Chức danh": "Manager",
      "Điện thoại cá nhân": "123-456-7890",
      "Email cá nhân": "john.doe@example.com",
      "Điện thoại cơ quan": "098-765-4321",
      "Email cơ quan": "john.doe@company.com",
      "Địa chỉ": "123 Main St",
      "Tỉnh/Thành phố": "New York",
      "Quận/Huyện": "Manhattan",
      "Phường xã": "Central Park",
      "Nguồn gốc": "Website",
      "Loại hình": "B2B",
      "Lĩnh vực": "Technology",
      "Mô tả": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Mô tả loại hình": "Lorem ipsum dolor sit amet.",
      "Người tạo": "Admin",
    },
    // Add more sample data objects here if needed
  ];

  const handleExportToExcel = () => {
    const filename = "Danh sách tiềm năng.xlsx";
    const sheetName = "Danh sách tiềm năng";
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
    exportToExcel(datas, filename, sheetName, columnHeaders);
  };

  const handleClickFile = () => {
    inputFileRef.current?.click();
  };
  const handleSearchKH = async (e) => {
    setName(e.target.value), setData(e.target.value);
    await fetchData();
  };
  return (
    <>
      <div className={`${styles.main__control} ${styles.customer_custom}`}>
        <div className={`${styles.main__control_btn} flex_between`}>
          <div
            className={`${styles.main__control_search} ${styles.f_search_customer}`}
          >
            <form
              onSubmit={() => false}
              className={styles.form_search}
              style={{ width: "100%", padding: 1 }}
            >
              <div></div>
              <Input
                type="text"
                value={data}
                onChange={(e) => handleSearchKH(e)}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo Id, tên khách hàng, điện thoại, email"
                style={{ border: "none", width: "82%", fontSize: 15 }}
              />
              <button type="button" style={{ width: "18%" }}>
                Tìm kiếm
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
                <div style={{ display: "flex", justifyContent: "center",      paddingTop:4, }}>
                  <div>
                    <Image
                      src={"/crm/icon_search.svg"}
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
                    paddingTop:4,
                    fontWeight:600
                    }}
                  >
                    <div>
                      <Image
                        src={"/crm/h_export_cus.svg"}
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
          isSelectedRow={isSelectedRow}
          numberSelected={numberSelected}
        />

        <div className={`${styles.main__control_add}`}>
          <Link href="/crm/customer/add">
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
            onClick={handleClickFile}
            className={`${styles.dropbtn_add} flex_align_center ${styles.btn_file}`}
          >
            <img src="/crm/h_import_cus.svg" />
            Nhập từ file
            <input type="file" hidden ref={inputFileRef} />
          </button>
          <button
            type="button"
            onClick={handleExportToExcel}
            className={`${styles.dropbtn_add} flex_align_center ${styles.btn_excel}`}
          >
            <img src="/crm/icon_excel.svg" />
            Xuất excel
          </button>
        </div>
      </div>

      <Drawer
        title="Bộ lọc"
        placement="right"
        onClose={onClose}
        open={open}
        style={{ overflowY: "hidden" }}
        className="custom_drawer"
        footer
        headerStyle={{ textAlign: "center", background: "#4C5BD4" }}
      >
        <div>
          <CustomerListFilterBox
          
          setOpen={setOpen} />
        </div>
      </Drawer>
    </>
  );
}
