import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import PotentialFooterAddFiles from "@/components/crm/potential/potential_add_files/potential_footer_add_files";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TextEditor from "@/components/crm/text-editor/text_editor";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import { Checkbox, Select } from "antd";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import TableStaffCustomerGroupAdd from "@/components/crm/table/table-staff-group-add-customer";
import CustomerGroupSelect from "@/components/crm/select/select_data_group_customer";
import { useApi } from "@/components/crm/hooks/useApi";
import ModalDelEmpGroup from "@/components/crm/modals/modal_del_group";
import Image from "next/image";
import TextEditorGr from "@/components/crm/text-editor/text_editor_gr";
import { base_url } from "@/components/crm/service/function";
import Cookies from "js-cookie";
import GrFooterAddFiles from "@/components/crm/potential/potential_add_files/gr_customer_footer";
import CustomerGroupSelectCpmponent from "@/components/crm/select/group_components_select";

const GroupCustomerAdd: React.FC = () => {
  const [valAllDepartment, setValAllDepartment] = useState(false);
  const [valAllEmp, setValAllEmp] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const valueOptionRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [erroeMdal, setErrModal] = useState(false);
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

  console.log(valueGroupCustomer);
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
    setShowBackButton(false);
    setCurrentPath("/customer/list");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  function handleChange(val: any): void {
    console.log(val);
    setSelectedValueDepartments(val);
  }

  function handleChangeEmps(val: any): void {
    const valueExists = dataTableEmp?.some((item) => item === val);

    if (!valueExists) {
      setDataTableEmp((prevData) => [...prevData, val]);
    } else {
      console.log("Giá trị đã tồn tại trong mảng dataTableEmp");
      setErrModal(true);
    }

    setValEmp(val);
  }

  const dataSelectGroupParent = data?.data?.showGr;
  console.log(valueGroupCustomer);

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

  const dataDepartments = dataDepartment?.data?.data;
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

  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Thêm mới nhóm khách hàng</div>
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
                <div style={{ marginBottom: -20 }}>Mô tả</div>
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
                <div>Danh sách chia sẻ</div>
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
                    <div style={{ height: "27px" }} className="flex_between">
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
                handleSave={async () => {
                  if (valueGroupCustomer.groupName !== "") {
                    await updateDataAddGroup(
                      urlCreate,
                      `${Cookies.get("token_base365")}`,
                      "POST",
                      {
                        ...valueGroupCustomer,
                        emp_id: dataTableEmp?.join(","),
                        dep_id: selectedValueDepartments?.join(","),
                      }
                    );
                    return true;
                  }
                  return false;
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
