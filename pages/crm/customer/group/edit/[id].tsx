import React, { useContext, useEffect, useRef, useState } from "react";
import jwt from "jsonwebtoken";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import { Checkbox, Select, notification } from "antd";
import TableStaffCustomerGroupAdd from "@/components/crm/table/table-staff-group-add-customer";
import { useApi } from "@/components/crm/hooks/useApi";
import CustomerGroupSelect from "@/components/crm/select/select_data_group_customer";
import { useRouter } from "next/router";
import Image from "next/image";
import ModalDelEmpGroup from "@/components/crm/modals/modal_del_group";
import TextEditorGr from "@/components/crm/text-editor/text_editor_gr";
import { base_url } from "@/components/crm/service/function";
import Cookies from "js-cookie";
import CustomerGroupSelectCpmponent from "@/components/crm/select/group_components_select";
import GrFooterAddFiles from "@/components/crm/potential/potential_add_files/gr_customer_footer";

interface CustomJwtPayload extends jwt.JwtPayload {
  idQLC: string; // hoặc kiểu dữ liệu thích hợp
}

const GroupCustomerAdd: React.FC = () => {
  const [valAllDepartment, setValAllDepartment] = useState(false);
  const [valAllEmp, setValAllEmp] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const valueOptionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const { isOpen } = useContext<any>(SidebarContext);
  const [modal1Open, setModal1Open] = useState(false);
  const [erroeMdal, setErrModal] = useState(false);
  const [selectedValueDepartments, setSelectedValueDepartments] = useState<any>(
    []
  );
  const [dataRowSelect, setDataRowSelect] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState(0);
  const [valEmp, setValEmp] = useState<any>([]);
  const [dataTableEmp, setDataTableEmp] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [clickOptionEmp, setClickOptionEmp] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [valueGroupCustomer, setValueGroupCustomer] = useState({
    gr_id: id,
    gr_name: "999",
    gr_description: "777",
    group_parent: "",
    dep_id: null,
    emp_id: null,
    group_cus_parent: null,
  });

  const accessToken = Cookies.get("token_base365");
  const com_id = Cookies.get("com_id");

  const {
    data: dataAll,
    loading,
    error,
    fetchData,
    updateData,
    deleteData,
  } = useApi(
    `${base_url}/api/crm/group/list_group_khach_hang`,
    `${Cookies.get("token_base365")}`,
    "POST"
  );

  const {
    data: dataDepartment,
    fetchData: fetchDataDepartment,
    updateData: updateDataDepartment,
  } = useApi(
    `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/department/list`,
    `${Cookies.get("token_base365")}`,
    "POST",
    { com_id: `${Cookies.get("com_id")}` }
  );

  const {
    data: dataDetails,
    fetchData: fetchDataDetails,
    updateData: updateDataDetails,
  } = useApi(
    "http://210.245.108.202:3007/api/crm/group/details",
    accessToken,
    "POST",
    { gr_id: Number(id) }
  );

  const { updateData: updateDataEdit } = useApi(
    `${base_url}/api/crm/group/update_GroupKH`,
    `${Cookies.get("token_base365")}`,
    "POST",
    valueGroupCustomer
  );

  const {
    data: dataEmp,
    fetchData: fetchDataEmp,
    updateData: updateDataEmp,
  } = useApi(
    `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/list`,
    `${Cookies.get("token_base365")}`,
    "POST",
    {
      dep_id: selectedValueDepartments?.join(",") || "",
      com_id: Number(com_id),
    }
  );

  const dataPassFromId = dataAll?.data?.showGr?.filter(
    (item: any) => item?.gr_id === Number(id)
  )?.[0];

  useEffect(() => {
    fetchData();
    fetchDataDepartment();
    fetchDataDetails();
  }, []);

  useEffect(() => {
    setValueGroupCustomer(dataDetails?.data?.checkGroup);
  }, []);

  useEffect(() => {
    setHeaderTitle("Nhóm khách hàng / Chỉnh sửa");
    setShowBackButton(false);
    setCurrentPath("/crm/customer/list");
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
      // if (dataTableEmp) {
      //   setDataTableEmp((prevData) => [...prevData, val]);
      // } else {
      //   setDataTableEmp([val]);
      // }
      setDataTableEmp((prevData) => {
        if (prevData) {
          return [...prevData, val];
        } else {
          return [val];
        }
      });
    } else {
      setErrModal(true);
    }

    setValEmp(val);
  }
  //
  useEffect(() => {
    if (selectedValueDepartments?.length > 0) {
      // selectedValueDepartments?.forEach((depId: any) => {
      fetchDataEmp(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/list`,
        `${Cookies.get("token_base365")}`,
        "POST",
        { com_id: `${Cookies.get("com_id")}` }
      );
      setValueGroupCustomer((prev) => {
        return {
          ...prev,
          dep_id: selectedValueDepartments?.join(","),
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

  const dataSelectGroupParent = dataAll?.data?.showGr;
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
        emp_id: selectedValueDepartments?.join(","),
      };
    });
  }, [dataTableEmp]);

  const handleDelMultiRow = () => {
    const newData = dataTableEmp?.filter((el) => !dataRowSelect?.includes(el));
    setDataTableEmp(newData);
  };

  useEffect(() => {
    setSelectedValueDepartments(
      dataDetails?.data?.checkGroup?.dep_id
        ?.split(",")
        .map((item) => parseInt(item.trim(), 10))
    );

    setDataTableEmp(
      dataDetails?.data?.checkGroup?.emp_id
        ?.split(",")
        .map((item) => parseInt(item.trim(), 10))
    );

    // setValAllDepartment(dataDetails?.data?.checkGroup?.dep_id ? false: true)
    // setValAllEmp(dataDetails?.data?.checkGroup?.emp_id ? false :true)
  }, []);

  useEffect(() => {
    fetchDataEmp(
      `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/list`,
      `${Cookies.get("token_base365")}`,
      "POST",
      { com_id: `${Cookies.get("com_id")}` }
    );

    setTimeout(() => {
      const employeeOption = dataEmp?.data?.data
        ?.filter((emp) =>
          dataDetails?.data?.checkGroup?.dep_id
            ?.split(",")
            .map((item) => parseInt(item.trim(), 10))
            ?.includes(emp.dep_id)
        )
        ?.map((employee) => {
          return {
            label: employee.userName,
            value: employee._id,
          };
        });
      setEmployeeOptions(employeeOption);
    }, 0);
  }, [clickOptionEmp]);

  const openNotificationWithIcon = () => {
    api.error({
      message: "Notification Title",
      description: "Trường tên nhóm khách hàng đã tồn tại hoặc không được nhập",
    });
  };

  return (
    <div className={styleHome.main} ref={mainRef}>
      {contextHolder}
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Chỉnh sửa nhóm khách hàng</div>
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
                    value={
                      valueGroupCustomer?.gr_name ||
                      dataDetails?.data?.checkGroup?.gr_name
                    }
                    setFormData={setValueGroupCustomer}
                    label={"Tên nhóm khách hàng"}
                    placeholder=" Nhập tên nhóm khách hàng"
                    keyValue="gr_name"
                  />
                  <div style={{ width: "50%" }}>
                    <label>Nhóm khách hàng cha </label>
                    <div ref={valueOptionRef}>
                      <CustomerGroupSelectCpmponent
                        value="Chọn nhóm khách hàng cha"
                        placeholder={
                          dataDetails?.data?.checkGroup?.group_parent
                        }
                        data={dataSelectGroupParent}
                        setValueGroupCustomer={setValueGroupCustomer}
                      />
                    </div>
                  </div>
                </div>

                {/* Text Editor */}
                <div style={{ marginBottom: -20 }}>Mô tả</div>
                <TextEditorGr
                  editorContent={
                    valueGroupCustomer?.gr_description ||
                    dataDetails?.data?.checkGroup?.gr_description
                  }
                  setEditorValue={(val: any) => {
                    setValueGroupCustomer((pre: any) => {
                      return {
                        ...pre,
                        groupDescription: val,
                      };
                    });
                  }}
                />
                <div>Danh sách chia sẻ</div>
                {valueGroupCustomer?.group_cus_parent == null &&
                  valueOptionRef?.current?.querySelector(".value_options")
                    .innerHTML === "Chọn" && (
                    <div style={{ display: "flex", gap: "5px" }}>
                      <p
                        className="d-flex info_system"
                        style={{ fontSize: "14px" }}
                      >
                        <input
                          type="checkbox"
                          value="1"
                          name="share_group_child"
                          id="share_group_child"
                          className="input_choose"
                          style={{ marginRight: "10px" }}
                        />
                        Chia sẻ nhóm khách hàng con
                      </p>
                    </div>
                  )}
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
                        defaultChecked={
                          dataDetails?.data?.checkGroup?.dep_id === null ||
                          dataDetails?.data?.checkGroup?.dep_id === "all"
                        }
                        checked={valAllDepartment}
                        onChange={() => {
                          setValAllDepartment(!valAllDepartment);
                          if (valAllDepartment) {
                            setValueGroupCustomer((prev) => {
                              return {
                                ...prev,
                                dep_id: null,
                              };
                            });
                          }
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
                        defaultValue={
                          !dataDetails?.data?.checkGroup?.dep_id
                            ?.split(",")
                            .map((item) => parseInt(item.trim(), 10))
                            .includes(NaN)
                            ? dataDetails?.data?.checkGroup?.dep_id
                                ?.split(",")
                                .map((item) => parseInt(item.trim(), 10))
                            : null
                        }
                        value={
                          selectedValueDepartments ||
                          dataDetails?.data?.checkGroup?.dep_id
                            ?.split(",")
                            .map((item) => parseInt(item.trim(), 10))
                        }
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
                    <div style={{ height: "27px" }} className="flex_between">
                      <label>Nhân viên</label>
                      <Checkbox
                        defaultChecked={
                          dataDetails?.data?.checkGroup?.emp_id === null ||
                          dataDetails?.data?.checkGroup?.emp_id === "all"
                        }
                        onChange={() => {
                          setValAllEmp(!valAllEmp);
                        }}
                      >
                        Tất cả
                      </Checkbox>
                    </div>
                    {!valAllDepartment && (
                      <Select
                        style={{
                          width: "100%",
                          height: "40px !important",
                        }}
                        disabled={valAllEmp}
                        // disabled={selectedValueDepartments?.length === 0}
                        placeholder="Chọn nhân viên"
                        // defaultValue={dataDepartments?.dep_id}
                        value={valEmp}
                        onChange={handleChangeEmps}
                        options={employeeOptions}
                        onClick={() => setClickOptionEmp(true)}
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

                {!valAllDepartment && !valAllEmp ? (
                  //  &&
                  // dataDetails?.data?.checkGroup?.dep_id !== null &&
                  // dataDetails?.data?.checkGroup?.emp_id !== null &&
                  // dataDetails?.data?.checkGroup?.dep_id !== "all" &&
                  // dataDetails?.data?.checkGroup?.emp_id !== "all"
                  <TableStaffCustomerGroupAdd
                    dataEmp={dataEmp?.data?.data}
                    valueSelected={
                      dataTableEmp ||
                      dataDetails?.data?.checkGroup?.emp_id
                        ?.split(",")
                        .map((item) => parseInt(item.trim(), 10))
                    }
                    setData={setDataTableEmp}
                    setSelectedRow={setSelectedRow}
                    setDataRowSelect={setDataRowSelect}
                  />
                ) : null}
              </div>
              <GrFooterAddFiles
                link="/crm/customer/group/list"
                titleCancel="Xác nhận hủy cập nhật nhóm khách hàng "
                title="Cập nhật nhóm khách hàng thành công!"
                contentCancel={
                  "Bạn có đồng ý hủy? \n Mọi dữ liệu bạn vừa nhập sẽ bị xóa?"
                }
                modal1Open={modal1Open}
                setModal1Open={setModal1Open}
                handleSave={async () => {
                  if (
                    valueGroupCustomer.gr_name ===
                      dataDetails?.data?.data?.gr_name ||
                    valueGroupCustomer.gr_name === ""
                  ) {
                    openNotificationWithIcon();
                  } else {
                    await updateDataEdit(
                      `${base_url}/api/crm/group/update_GroupKH`,
                      `${Cookies.get("token_base365")}`,
                      "POST",
                      {
                        ...valueGroupCustomer,
                        name: valueGroupCustomer.gr_name,
                        description: valueGroupCustomer.gr_description,
                        group_cus_parent:
                          valueGroupCustomer.group_cus_parent !== undefined &&
                          valueGroupCustomer.group_cus_parent !== null
                            ? valueGroupCustomer.group_cus_parent
                            : valueGroupCustomer.group_cus_parent === 0
                            ? 0
                            : dataDetails?.data?.checkGroup?.group_parent,
                        gr_id: id,
                        emp_id: valAllEmp ? "all" : dataTableEmp?.join(","),
                        dep_id: valAllDepartment
                          ? "all"
                          : selectedValueDepartments?.join(","),
                      }
                    );
                    setModal1Open(true);
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
  );
};

export default GroupCustomerAdd;
