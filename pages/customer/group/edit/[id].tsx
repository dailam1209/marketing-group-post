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
import { useRouter } from "next/router";
import Image from "next/image";
import ModalDelEmpGroup from "@/components/crm/modals/modal_del_group";
import TextEditorGr from "@/components/crm/text-editor/text_editor_gr";
import { base_url } from "@/components/crm/service/function";
import Cookies from "js-cookie";
import CustomerGroupSelectCpmponent from "@/components/crm/select/group_components_select";
import GrFooterAddFiles from "@/components/crm/potential/potential_add_files/gr_customer_footer";
import Head from "next/head";
import axios from "axios";
import { getCookie } from "cookies-next";
import jwt_decode from "jwt-decode";
import { getToken } from "@/pages/api/api-hr/token";
import { axiosCRM } from "@/utils/api/api_crm";
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
  const [share_group_child, setshare_group_child] = useState<any>(0);
  const [dataDetails, setDataDetails] = useState<any>([]);
  const [dataSelectGroupParent, setData] = useState<any>([]);
  const [dataEmp, setDataEmp] = useState<any>([]);
  const [dataDepartment, setDataDepartment] = useState<any>([]);
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
  function getToken(token) {
    const isToken = Cookies.get(token);
    return isToken;
  }

  const accessToken = Cookies.get("token_base365");
  const GetComId = () => {
    const COOKIE_KEY = "token_base365";
    const currentCookie = getToken(COOKIE_KEY);
    if (currentCookie) {
      const decodedToken: any = jwt_decode(currentCookie);
      return decodedToken?.data?.com_id;
    }
  };
  //Lấy nhóm khách cha
  const fetchData = async (url: string, body) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Sử dụng Bearer token
          mode: "no-cors",
        },
        body: body, // Chỉ truyền body nếu là phương thức POST
      });

      const data = await res.json();
      setData(data?.data);

      return data;
    } catch (err) {
      // console.error(err);
      throw err;
    }
  };

  const updateDataEdit = async (url, body) => {
    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
      });

      const data = response.data;

      return data;
    } catch (err) {
      // console.error(err);
      throw err;
    }
  };
  //Lấy danh sách phòng ban
  const fetchDataDepartment = async (url: string, body) => {
    try {
      const response = await axios.post(
        url,
        { com_id: body.com_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );

      const data = await response.data;
      setDataDepartment(data?.data?.data);
    } catch (err) {
      // console.error(err);
      throw err;
    }
  };
  //Lấy toàn bộ danh sách nhân viên
  const fetchDataEmp = async (url, body) => {
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Sử dụng Bearer token
        },
      });

      const data = response.data;
      setDataEmp(data?.data?.data);

      if (response.status !== 200) {
        throw new Error(data.message || "Có lỗi xảy ra khi gọi API");
      }
    } catch (err) {
      // console.error(err);
      throw err;
    }
  };

  const fetchDataDetails = async (url, body) => {
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Sử dụng Bearer token
        },
      });

      const data = response.data;
      setDataDetails(data);
      const dataCheckEmp = data?.data?.emp_id;
      const dataCheckDep = data?.data?.dep_id;
      if (dataCheckDep === "all" || dataCheckDep === "") {
        setValAllDepartment(true);
      }
      if (dataCheckEmp === "all" || dataCheckEmp === "") {
        setValAllEmp(true);
      }

      if (response.status !== 200) {
        throw new Error(data.message || "Có lỗi xảy ra khi gọi API");
      }
    } catch (err) {
      // console.error(err);
      throw err;
    }
  };
  //Lấy danh sách nhân viên được chia sẻ
  const fetchListEmpShare = () => {
    axiosCRM
      .post("/account/TakeListUserFromGroup", {
        IdGroup: id,
        companyId: GetComId(),
      })
      .then((res) => {
        setDataTableEmp([...res.data.data.listUser?.map((item) => item.idQLC)]);
      })
      .catch((err) => console.log("fetchListEmpShare", err));
  };
  const dataPassFromId = dataSelectGroupParent?.data?.filter(
    (item: any) => item?.gr_id === Number(id)
  )?.[0];
  const [valueGroupCustomer, setValueGroupCustomer] = useState({
    gr_id: id,
    gr_name: "999",
    gr_description: "777",
    group_parent: "",
    dep_id: null,
    emp_id: null,
    group_cus_parent: null,
  });

  useEffect(() => {
    fetchDataDetails(`${base_url}/api/crm/group/details`, {
      gr_id: Number(id),
    });
    fetchData(`${base_url}/api/crm/group/list_group_khach_hang`, {});
    fetchDataDepartment(`${base_url}/api/qlc/organizeDetail/listAll`, {
      com_id: GetComId(),
    });
    fetchDataEmp(`${base_url}/api/qlc/managerUser/listUser`, {
      pageSize: 2000,
    });
  }, []);
  const [valueDefault, setvalueDefault] = useState<any>();
  const [change, setchange] = useState(false);
  useEffect(() => {
    delete dataDetails?.data?.company_id;
    setValueGroupCustomer(dataDetails?.data);
    setvalueDefault(dataDetails?.data);
    setTimeout(() => {
      setchange(true);
    }, 500);
  }, [valueDefault, change]);

  useEffect(() => {
    setHeaderTitle("Nhóm khách hàng / Chỉnh sửa");
    setShowBackButton(true);
    setCurrentPath("/customer/group/list");
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
          const newArr = arr;
          newArr?.push(val);
          return newArr;
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
      setValueGroupCustomer((prev) => {
        return {
          ...prev,
          dep_id: selectedValueDepartments?.join(","),
        };
      });
      // });
    }
    // ?.filter((emp) => selectedValueDepartments?.includes(emp.dep_id))
    const employeeOption = dataEmp
      ?.filter((emp) =>
        selectedValueDepartments?.includes(emp.organizeDetailId)
      )
      ?.map((employee) => {
        return {
          label: `${employee.ep_id}. ${employee.userName}`,
          value: employee.ep_id,
        };
      });
    setEmployeeOptions(employeeOption);
  }, [selectedValueDepartments]);
  // const dataSelectGroupParent = dataAll?.data;
  const dataDepartments = dataDepartment;
  let arr: any = [];
  dataDepartments?.map((item) => {
    arr.push(item?.id);
  });
  const options = dataDepartments?.map((item) => {
    return {
      label: item?.organizeDetailName,
      value: item?.id,
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
    setSelectedValueDepartments(arr);

    // setDataTableEmp(
    //   dataDetails?.data?.emp_id
    //     ?.split(",")
    //     .map((item) => parseInt(item.trim(), 10))
    // );
  }, [dataDepartments]);
  const com_ids = Cookies.get("com_id");
  const [arremid, setarremid] = useState<any>();
  useEffect(() => {
    setTimeout(() => {
      const employeeOption = dataEmp
        ?.filter((emp) => arr?.includes(emp?.organizeDetailId))
        ?.map((employee) => {
          return {
            label: `${employee.ep_id}. ${employee.userName}`,
            value: employee.ep_id,
          };
        });
      setEmployeeOptions(employeeOption);
      let arre: any = [];
      employeeOption.map((item) => {
        arre.push(item?.emp_id);
      });
      setarremid(arre);
    }, 0);
  }, [clickOptionEmp]);

  const openNotificationWithIcon = () => {
    api.error({
      message: "Notification Title",
      description: "Trường tên nhóm khách hàng đã tồn tại hoặc không được nhập",
    });
  };
  useEffect(() => {
    fetchListEmpShare();
  }, [id]);
  console.log("GroupCustomerAdd", dataEmp);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Chỉnh sửa nhóm khách hàng</title>
        <meta
          name="description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="Keywords"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <meta
          property="og:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          property="og:image"
          content="https://crm.timviec365.vn/assets/img/images-banners.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
        />
        <meta
          name="twitter:title"
          content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
        />
        <link rel="canonical" href="https://hungha365.com/crm" />

        {/* CSS */}
        <script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
        ></script>
      </Head>
      <div className={styleHome.main} ref={mainRef}>
        {contextHolder}
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>
                Chỉnh sửa nhóm khách hàng
              </div>
              <div className={styles.form_add_potential}>
                <div className={styles.main__body}>
                  <div className={styles["main__body_item"]}></div>
                  <div
                    style={{
                      gap: 30,
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <InputText
                        required
                        value={
                          valueGroupCustomer?.gr_name ||
                          dataDetails?.data?.gr_name
                        }
                        setFormData={setValueGroupCustomer}
                        label={"Tên nhóm khách hàng"}
                        placeholder=" Nhập tên nhóm khách hàng"
                        keyValue="gr_name"
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label>Nhóm khách hàng cha </label>
                      <div ref={valueOptionRef}>
                        <CustomerGroupSelectCpmponent
                          value="Chọn nhóm khách hàng cha"
                          placeholder={dataDetails?.data?.group_parent}
                          data={dataSelectGroupParent}
                          setValueGroupCustomer={setValueGroupCustomer}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Editor */}
                  <div className={styles.form_label}>Mô tả</div>
                  <TextEditorGr
                    editorContent={
                      valueGroupCustomer?.gr_description ||
                      dataDetails?.data?.gr_description
                    }
                    setEditorValue={(val: any) => {
                      setValueGroupCustomer((pre: any) => {
                        return {
                          ...pre,
                          gr_description: val,
                        };
                      });
                    }}
                  />
                  <div
                    style={{ marginBottom: "1rem", marginTop: "1rem" }}
                    className={styles.form_label}
                  >
                    Danh sách chia sẻ
                  </div>
                  {valueGroupCustomer?.group_cus_parent == null &&
                    valueOptionRef?.current?.querySelector(".value_options")
                      .innerHTML === "Chọn" && (
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          marginBottom: "1rem",
                        }}
                      >
                        <p
                          className="d-flex info_system"
                          style={{ fontSize: "14px" }}
                        >
                          <input
                            onChange={() => setshare_group_child(1)}
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
                      gap: 30,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div className="flex_between">
                        <label>Phòng ban</label>
                        <Checkbox
                          defaultChecked={
                            dataDetails?.data?.dep_id === null ||
                            dataDetails?.data?.dep_id === "all"
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
                          value={selectedValueDepartments || arr}
                          onChange={handleChange}
                          options={options}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        overflowX: "hidden",
                        overflowY: "visible",
                      }}
                    >
                      <div style={{ height: "27px" }} className="flex_between">
                        <label>Nhân viên</label>
                        <Checkbox
                          checked={valAllEmp}
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
                            src={"/crm/del_red.svg"}
                          />
                          Gỡ bỏ
                        </button>
                      </div>
                    )}
                  </div>

                  {!valAllDepartment && !valAllEmp ? (
                    //  &&
                    // dataDetails?.data?.dep_id !== null &&
                    // dataDetails?.data?.emp_id !== null &&
                    // dataDetails?.data?.dep_id !== "all" &&
                    // dataDetails?.data?.emp_id !== "all"
                    <TableStaffCustomerGroupAdd
                      dataEmp={dataEmp}
                      valueSelected={dataTableEmp || arr}
                      setData={setDataTableEmp}
                      setSelectedRow={setSelectedRow}
                      setDataRowSelect={setDataRowSelect}
                    />
                  ) : null}
                </div>
                <GrFooterAddFiles
                  link="/customer/group/list"
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
                      try {
                        await updateDataEdit(
                          `${base_url}/api/crm/group/update_GroupKH`,
                          {
                            ...valueDefault,
                            name: valueDefault.gr_name,
                            description: valueDefault?.gr_description,
                            group_cus_parent:
                              valueDefault.group_cus_parent !== undefined &&
                              valueDefault.group_cus_parent !== null
                                ? valueDefault.group_cus_parent
                                : valueDefault.group_cus_parent === 0
                                ? 0
                                : dataDetails?.data?.group_parent,
                            gr_id: id,
                            emp_id: valAllEmp ? "all" : dataTableEmp?.join(","),
                            dep_id: valAllDepartment
                              ? "all"
                              : selectedValueDepartments?.join(","),
                            share_group_child: share_group_child,
                          }
                        );
                        // setModal1Open(true);
                      } catch (error) {
                        // setModal1Open(true);
                      }
                    } else {
                      try {
                        await updateDataEdit(
                          `${base_url}/api/crm/group/update_GroupKH`,
                          {
                            ...valueGroupCustomer,
                            name: valueGroupCustomer.gr_name,
                            description: valueGroupCustomer?.gr_description,
                            group_cus_parent:
                              valueGroupCustomer.group_cus_parent !==
                                undefined &&
                              valueGroupCustomer.group_cus_parent !== null
                                ? valueGroupCustomer.group_cus_parent
                                : valueGroupCustomer.group_cus_parent === 0
                                ? 0
                                : dataDetails?.data?.group_parent,
                            gr_id: id,
                            emp_id: valAllEmp ? "all" : dataTableEmp?.join(","),
                            dep_id: valAllDepartment
                              ? "all"
                              : selectedValueDepartments?.join(","),
                            share_group_child: share_group_child,
                          }
                        );
                        setModal1Open(true);
                      } catch (error) {
                        setModal1Open(true);
                      }
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
    </>
  );
};

export default GroupCustomerAdd;
