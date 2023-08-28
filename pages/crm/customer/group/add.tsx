import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import { Checkbox, Select, notification } from "antd";
import TableStaffCustomerGroupAdd from "@/components/crm/table/table-staff-group-add-customer";
import Head from "next/head";
import { useApi } from "@/components/crm/hooks/useApi";
import ModalDelEmpGroup from "@/components/crm/modals/modal_del_group";
import Image from "next/image";
import TextEditorGr from "@/components/crm/text-editor/text_editor_gr";
import { base_url } from "@/components/crm/service/function";
import Cookies from "js-cookie";
import GrFooterAddFiles from "@/components/crm/potential/potential_add_files/gr_customer_footer";
import CustomerGroupSelectCpmponent from "@/components/crm/select/group_components_select";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";

const GroupCustomerAdd: React.FC = () => {
  const [valAllDepartment, setValAllDepartment] = useState(false);
  const [valAllEmp, setValAllEmp] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const valueOptionRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [erroeMdal, setErrModal] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [selectedValueDepartments, setSelectedValueDepartments] = useState<any>(
    []
  );
  const [dataRowSelect, setDataRowSelect] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState(0);
  const [valEmp, setValEmp] = useState<any>([]);
  const [dataTableEmp, setDataTableEmp] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [valueGroupCustomer, setValueGroupCustomer] = useState({
    groupName: "",
    groupDescription: "",
    groupParents: "",
    dep_id: null,
    emp_id: null,
  });
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);

  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  const accessToken = Cookies.get("token_base365");
  const com_id = Cookies.get("com_id");

  const urlCreate = `${base_url}/api/crm/group/create_GroupKH`;
  const {
    data: dataAddGroup,
    fetchData: fetchDataAddGroup,
    updateData: updateDataAddGroup,
  } = useApi(urlCreate, `${Cookies.get("token_base365")}`, "POST");

  const {
    data: dataDepartment,
    fetchData: fetchDataDepartment,
    updateData: updateDataDepartment,
  } = useApi(
    `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/department/list`,
    `${Cookies.get("token_base365")}`,
    "POST",
    { com_id: com_id }
  );

  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    `${base_url}/api/crm/group/list_group_khach_hang`,
    `${Cookies.get("token_base365")}`,
    "POST"
  );

  const {
    data: dataEmp,
    fetchData: fetchDataEmp,
    updateData: updateDataEmp,
  } = useApi(
    `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/list`,
    `${Cookies.get("token_base365")}`,
    "POST",
    { dep_id: selectedValueDepartments?.join(",") || "", com_id: com_id }
  );

  useEffect(() => {
    fetchData();
    fetchDataDepartment();
  }, []);

  useEffect(() => {
    setHeaderTitle("Nhóm khách hàng / Thêm mới");
    setShowBackButton(true);
    setCurrentPath("/crm/customer/group/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  function handleChange(val: any): void {
    setSelectedValueDepartments(val);
  }

  function handleChangeEmps(val: any): void {
    const valueExists = dataTableEmp?.some((item) => item === val);

    if (!valueExists) {
      setDataTableEmp((prevData) => [...prevData, val]);
    } else {
      setErrModal(true);
    }

    setValEmp(val);
  }

  const dataSelectGroupParent = data?.data;

  useEffect(() => {
    if (selectedValueDepartments?.length > 0) {
      // selectedValueDepartments?.forEach((depId: any) => {
      fetchDataEmp(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/list`,
        `${Cookies.get("token_base365")}`,
        "POST",
        { com_id: com_id }
      );
      setValueGroupCustomer((prev) => {
        return {
          ...prev,
          dep_id: selectedValueDepartments.join(","),
        };
      });
      // });
    }
    // ?.filter((emp) => selectedValueDepartments?.includes(emp.dep_id))
    const employeeOption = dataEmp?.data?.data
      ?.filter((emp) => selectedValueDepartments?.includes(emp.dep_id))
      ?.map((employee) => {
        return {
          label: employee.userName,
          value: employee._id,
        };
      });
    setEmployeeOptions(employeeOption);
  }, [selectedValueDepartments]);

  const dataDepartments = dataDepartment?.data?.items;
  const options = dataDepartments?.map((item) => {
    return {
      label: item?.dep_name,
      value: item?.dep_id,
    };
  });

  useEffect(() => {
    setValueGroupCustomer((prev) => {
      return {
        ...prev,
        emp_id: selectedValueDepartments.join(","),
      };
    });
  }, [dataTableEmp]);

  const handleDelMultiRow = () => {
    const newData = dataTableEmp?.filter((el) => !dataRowSelect.includes(el));
    setDataTableEmp(newData);
  };

  const openNotificationWithIcon = (error: any) => {
    api[error]({
      message: "Notification Title",
      description: "Bạn chưa nhập tên nhóm khách hàng",
    });
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>
          CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận
        </title>
        <meta
          name="description"
          content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
        />
        <meta name="Keywords" content="Phần mềm CRM, phần mềm crm miễn phí" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận"
        />
        <meta
          property="og:description"
          content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
        />
        <meta
          property="og:image"
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
        />
        <meta
          name="twitter:title"
          content="CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận"
        />
        <link rel="canonical" href="https://hungha365.com/crm" />

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
      </Head>
      {!checkAndRedirectToHomeIfNotLoggedIn() ? null : (
        <div className={styleHome.main} ref={mainRef}>
          {contextHolder}
          <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
              <div className={styles.info_step}>
                <div className={styles.main__title}>
                  Thêm mới nhóm khách hàng
                </div>
                <div className={styles.form_add_potential}>
                  <div className={styles.main__body}>
                    <div className={styles["main__body_item"]}></div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <InputText
                        required
                        value={valueGroupCustomer.groupName}
                        setFormData={setValueGroupCustomer}
                        label={"Tên nhóm khách hàng"}
                        placeholder=" Nhập tên nhóm khách hàng"
                        keyValue="groupName"
                      />
                      <div style={{ width: "50%" }}>
                        <label>Nhóm khách hàng cha </label>
                        <div ref={valueOptionRef}>
                          <CustomerGroupSelectCpmponent
                            value="Chọn nhóm khách hàng cha"
                            placeholder=""
                            data={dataSelectGroupParent}
                            setValueGroupCustomer={setValueGroupCustomer}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Text Editor */}
                    <div className={styles.form_label}>Mô tả</div>
                    <TextEditorGr
                      editorContent={valueGroupCustomer.groupDescription}
                      setEditorValue={(val: any) => {
                        setValueGroupCustomer((pre: any) => {
                          return {
                            ...pre,
                            groupDescription: val,
                          };
                        });
                      }}
                    />
                    <div className={styles.form_label}>Danh sách chia sẻ</div>
                    <div
                      className="flex_between"
                      style={{
                        gap: "30px",
                        flexWrap: "wrap",
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                      }}
                    >
                      <div style={{ width: "47%" }}>
                        <div
                          className="flex_between"
                          // style={{ marginBottom: "3.5px" }}
                        >
                          <label>Phòng ban</label>
                          <Checkbox
                            checked={valAllDepartment}
                            onChange={() => {
                              setValAllDepartment(!valAllDepartment);
                              setValueGroupCustomer((prev) => {
                                return {
                                  ...prev,
                                  dep_id: null,
                                };
                              });
                            }}
                          >
                            Tất cả
                          </Checkbox>
                        </div>
                        {!valAllDepartment && (
                          <Select
                            mode="multiple"
                            allowClear
                            style={{
                              width: "100%",
                              height: "40px !important",
                            }}
                            placeholder="Chọn phòng ban"
                            defaultValue={dataDepartments?.dep_id}
                            value={selectedValueDepartments}
                            onChange={handleChange}
                            options={options}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          width: "30%",
                          overflowX: "hidden",
                          overflowY: "visible",
                        }}
                      >
                        <div
                          style={{ height: "27px" }}
                          className="flex_between"
                        >
                          <label>Nhân viên</label>
                          <Checkbox onChange={() => {}}>Tất cả</Checkbox>
                        </div>
                        {!valAllDepartment && (
                          <Select
                            // mode="multiple"
                            // allowClear
                            style={{
                              width: "100%",
                              height: "40px !important",
                            }}
                            // disabled={selectedValueDepartments?.length === 0}
                            placeholder="Chọn nhân viên"
                            // defaultValue={dataDepartments?.dep_id}
                            value={valEmp}
                            onChange={handleChangeEmps}
                            options={
                              selectedValueDepartments?.length === 0
                                ? []
                                : employeeOptions
                            }
                          />
                        )}
                      </div>

                      {selectedRow >= 2 && (
                        <div>
                          <button
                            style={{
                              color: "#FF3333",
                              display: "flex",
                              alignItems: "center",
                              margin: "auto",
                              width: "138px",
                              background: "#FFFF",
                              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                              borderRadius: "3px",
                              height: "32px",
                              justifyContent: "center",
                              gap: "3px",
                            }}
                            onClick={() => {
                              setIsOpenModalDel(true);
                              // handleDelRow(item);
                            }}
                          >
                            <Image
                              alt="img"
                              width={26}
                              height={26}
                              src={
                                "https://crm.timviec365.vn/assets/img/customer/del_red.svg"
                              }
                            />
                            Gỡ bỏ
                          </button>
                        </div>
                      )}
                    </div>

                    {!valAllDepartment && !valAllEmp && (
                      <TableStaffCustomerGroupAdd
                        dataEmp={dataEmp?.data?.data}
                        valueSelected={dataTableEmp}
                        setData={setDataTableEmp}
                        setSelectedRow={setSelectedRow}
                        setDataRowSelect={setDataRowSelect}
                      />
                    )}
                  </div>
                  <GrFooterAddFiles
                    link="/crm/customer/group/list"
                    titleCancel="Xác nhận hủy thêm mới nhóm khách hàng "
                    title="Thêm nhóm khách hàng thành công!"
                    contentCancel={
                      "Bạn có đồng ý hủy? \n Mọi dữ liệu bạn vừa nhập sẽ bị xóa?"
                    }
                    setModal1Open={setModal1Open}
                    modal1Open={modal1Open}
                    handleSave={async () => {
                      if (valueGroupCustomer?.groupName !== "") {
                        await updateDataAddGroup(
                          urlCreate,
                          `${Cookies.get("token_base365")}`,
                          "POST",
                          {
                            groupName: valueGroupCustomer?.groupName,
                            emp_id:
                              dataTableEmp?.length > 0
                                ? dataTableEmp?.join(",")
                                : "all",
                            dep_id:
                              selectedValueDepartments?.length > 0
                                ? selectedValueDepartments?.join(",")
                                : "all",
                            groupParents: valueGroupCustomer?.groupParents
                              ? valueGroupCustomer?.groupParents
                              : 0,
                            groupDescription:
                              valueGroupCustomer?.groupDescription,
                          }
                        );

                        setModal1Open(true);
                      } else {
                        openNotificationWithIcon("error");
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <ModalDelEmpGroup
            isModalCancel={isOpenModalDel}
            setIsModalCancel={setIsOpenModalDel}
            content={"Bạn có chắc chắn muốn gỡ bỏ chia sẻ này không?"}
            title={"Xác nhận gỡ bỏ chia sẻ"}
            link={"#"}
            handleOk={() => {
              handleDelMultiRow();
            }}
          />
        </div>
      )}
    </>
  );
};

export default GroupCustomerAdd;
