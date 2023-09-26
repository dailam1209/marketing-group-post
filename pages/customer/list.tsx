import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TableListCustomer from "@/components/crm/table/table-list-customer";
import CustomerListInputGroup from "@/components/crm/customer/customer_input_group";
import { TableRowSelection } from "antd/es/table/interface";
import Head from "next/head";
import { base_url } from "@/components/crm/service/function";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";
import moment from "moment";
import { UpdateTLKD } from "@/components/crm/context/updateTlkd";
const Cookies = require("js-cookie");
export interface DataType {
  key: React.Key;
  cus_id: number;
  emp_id: number;
  email: string;
  name: string;
  phone_number: number;
  resoure: number;
  description: string;
  group_id: number;
  status: number;
  updated_at: string;
  emp_name: string;
  user_handing_over_work: string;
  userName: string;
  userNameCreate: string;
  NameHandingOverWork: string;
  type: any;
  keyword: any;
}
export default function CustomerList() {
  const { updateTLKD } = useContext<any>(UpdateTLKD);
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const [selected, setSelected] = useState(false);
  const [numberSelected, setNumberSelected] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [name, setName] = useState();
  const [selectedCus, setSelectedCus] = useState<any>();
  const [des, setDes] = useState();
  const [isOpenFilterBox, setIsOpenFilterBox] = useState(false);
  const [lisCus, setListCus] = useState([]);
  const [status, setStatus] = useState();
  const [resoure, setResoure] = useState();
  const [nvPhuTrach, setnvPhuTrach] = useState();
  const [nhomCha, setnhomCha] = useState();
  const [nhomCon, setnhomCon] = useState();
  const [loading, setloading] = useState(true);
  const currentTime = moment();
  const pastTime = currentTime.subtract(2, "days");
  const [userNameCreate, setuserNameCreate] = useState();
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState();
  const [dataStatus, setdataStatus] = useState<any>();
  const [group_id, setgroup_id] = useState<any>();
  const [timeStart, setTimeStart] = useState<any>();
  const [timeEnd, setTimeEnd] = useState();
  const [dateS, setdateS] = useState();
  const [dateE, setdateE] = useState(null);
  const [time_s, setTime_s] = useState<any>(null);
  const [time_e, setTime_e] = useState<any>(null);
  const [emp_id, setemp_id] = useState<any>();
  const [idNhom, setIdNhom] = useState<any>();
  const [isAPDung, setIsApDung] = useState(false);
  const [selectedCusIds, setSelectedCusIds] = useState<string>("");
  const [isRowDataSelected, setRowDataSelected] = useState([]);
  const role = Cookies.get("role");
  const [listNV, setListNv] = useState<any>();
  const [dep_id, setDep_id] = useState<any>();
  const [posId, setposId] = useState<any>();
  const [nameNvNomor, setnameNvNomor] = useState<any>();

  useEffect(() => {
    if (!isAPDung && !isOpenFilterBox) {
      setTime_s(null);
      setTime_e(null);
    } else {
      if (dateE) {
        setTime_e(dateE + " " + timeEnd);
      }

      setTime_s(dateS + " " + timeStart);
    }
  }, [isAPDung, isOpenFilterBox, timeStart, dateS, timeEnd, dateE, time_s, time_e]);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  const fetchData = async () => {
    try {
      const res = await fetch(`${base_url}/api/crm/customer/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({
          perPage: pageSize,
          page: page,
          keyword: name === null ? null : name,
          status: status,
          resoure: resoure,
          user_create_id: nvPhuTrach,
          emp_id: emp_id,
          group_id: idNhom,
          // group_pins_id: nhomCon,
          time_s: time_s,
          time_e: time_e,
        }),
      });
      const data = await res.json();
      setData(data);
      if (data?.data?.length <= 0) {
        setloading(false);
      }
      setTotalRecords(data?.total);
    } catch (error) { }
  };

  const fetchDataDefault = async () => {
    try {
      const res = await fetch(`${base_url}/api/crm/customer/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({
          perPage: pageSize,
          page: page,
        }),
      });
      const data = await res.json();
      setData(data);
      if (data?.data?.length <= 0) {
        setloading(false);
      }
      setTotalRecords(data?.total);
    } catch (error) { }
  };
  const handleGetInfoSTT = async () => {
    try {
      const res = await fetch(`${base_url}/api/crm/customerStatus/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ pageSize: 100 }),
      });
      const data = await res.json();
      if (data && data?.data) setdataStatus(data?.data);
    } catch (error) { }
  };

  const onSelectChange = (selectedRowKeys: any, selectedRows: DataType[]) => {
    setSelectedRowKeys(selectedRowKeys);
    setNumberSelected(selectedRows?.length);

    const selectedIds = selectedRows.map((row) => row.cus_id);
    setSelectedCusIds(selectedIds.join(","));
    setSelected(selectedIds.length > 0);

    if (selectedRows?.length > 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  const ArrNguonKK: any = [
    { name: "Chưa cập nhật", id: 0 },
    { name: "Facebook", id: 1 },
    { name: "Website", id: 3 },
    { name: "Zalo", id: 2 },
    { name: "Dữ liệu bên thứ 3", id: 4 },
    { name: "Khách hàng giới thiệu", id: 5 },
    { name: "Giới thiệu", id: 6 },
    { name: "Chăm sóc khach hàng", id: 7 },
    { name: "Email", id: 8 },
  ];
  const datatable = data?.data?.map((item, index: number) => {
    let nguonKH = "";

    for (let key of ArrNguonKK) {
      if (key.id == item.resoure) {
        nguonKH = key.name;
      }
    }
    let des = item?.description
      ?.replace(/<p>/g, "")
      .replace(/<\/p>/g, "")
      .replace("&nbsp;", "");
    return {
      key: index + 1,
      cus_id: item.cus_id,
      email: item.email,
      name: item.name,
      phone_number: item.phone_number,
      resoure: nguonKH,
      description: des,
      group_id: item.group_id,
      status: item.status,
      updated_at: item?.updated_at,
      emp_name: item.emp_name,
      userNameCreate: item.userNameCreate,
      user_handing_over_work: item.user_handing_over_work,
      NameHandingOverWork: item.NameHandingOverWork,
      userName: item.userName,
      type: item.type,
      cus_from: item?.cus_from,
      link: item?.link,
      value: item?.resoure,
      count_content_call: item?.count_content_call,
    };
  });

  const dataStatusCustomer = dataStatus;
  const [listGr, setListGr] = useState([]);
  const [listGr_Child, setlistGr_Child] = useState([]);

  const handleGetGr = async () => {
    try {
      const res = await fetch(
        `${base_url}/api/crm/group/list_group_khach_hang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      let arr = [];
      const data = await res.json();
      setListGr(data?.data);
      data?.data?.map((item) => {
        item?.lists_child.map((item) => {
          arr.push(item);
        });
        setlistGr_Child(arr);
      });
    } catch (error) { }
  };

  const handleGetInfoCusNV = async () => {
    try {
      if (role == "2") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/employee/info`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token_base365")}`,
            },
            // body: JSON.stringify({ com_id: `${Cookies.get("com_id")}` }),
          }
        );

        const data = await res.json();
        if (data && data?.data) {
          setDep_id(data?.data?.data?.dep_id);
          setposId(data?.data?.data?.position_id);
          setnameNvNomor(data?.data?.data);
        }
      }
    } catch (error) { }
  };

  const handleGetInfoCus = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/listAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );
      const data = await res.json();
      if (data && data?.data) setListNv(data?.data?.items);
    } catch (error) { }
  };

  let nv = listNV?.filter((item) => item.dep_id === dep_id);
  useEffect(() => {
    handleGetInfoCusNV();
    handleGetInfoCus();
  }, [dep_id]);

  useEffect(() => {
    if (isAPDung) {
      if (dateE) {
        setTime_e(dateE + " " + timeEnd);
      }
    } else if (!isAPDung && !isOpenFilterBox) {
      setTime_s(null);
      setTime_e(null);
    }
  }, [isAPDung, isOpenFilterBox]);

  useEffect(() => {
    handleGetInfoSTT();
  }, []);

  function sendingData() {
    const requestData = {
      keyword: name === null ? null : name,
      status: status,
      resoure: resoure,
      user_create_id: nvPhuTrach,
      ep_id: emp_id,
      group_id: idNhom,
      time_s: time_s,
      time_e: time_e,
    };
    return requestData;
  }

  const formData = new FormData();
  const formDataRequest = sendingData();
  formDataRequest.keyword &&
    formData.append("keyword", formDataRequest.keyword);
  formDataRequest.status && formData.append("status", formDataRequest.status);
  formDataRequest.resoure &&
    formData.append("resoure", formDataRequest.resoure);
  formDataRequest.user_create_id &&
    formData.append("user_create_id", formDataRequest.user_create_id);
  formDataRequest.ep_id && formData.append("ep_id", formDataRequest.ep_id);
  formDataRequest.group_id &&
    formData.append("group_id", formDataRequest.group_id);
  formDataRequest.time_s && formData.append("time_s", formDataRequest.time_s);
  formDataRequest.time_e && formData.append("time_e", formDataRequest.time_e);

  const handleSelectAll = () => {
    const allRowKeys = datatable?.map((item: { key: any }) => item.key);
    setSelectedRowKeys(allRowKeys);
    setNumberSelected(datatable?.length);
    setRowDataSelected(datatable)

    if (selectedRowKeys.length > 0) {
      sendingData();
    }
  };

  const handleDeselectAll = () => {
    setSelectedRowKeys([]);
    setNumberSelected(0);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    onSelect: (record, selected, selectedRows) => {
      setNumberSelected(selectedRows?.length);
      setRowDataSelected(selectedRows)

    },
    onSelectAll: handleSelectAll,
  };


  useEffect(() => {
    handleGetGr();
    fetchData();
  }, [name, selectedRowKeys, des, selectedCus, page, pageSize, updateTLKD]);

  useEffect(() => {
    setHeaderTitle("Danh sách khách hàng");
    setShowBackButton(false);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" initial-scale="1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Danh sách khách hàng</title>
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
        <div ref={mainRef} className={styleHome.main}>
          <CustomerListInputGroup
            setIdNhom={setIdNhom}
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            setdateS={setdateS}
            setdateE={setdateE}
            name={name}
            setName={setName}
            fetchData={fetchData}
            isSelectedRow={selected}
            numberSelected={numberSelected}
            clearOption={handleDeselectAll}
            chooseAllOption={handleSelectAll}
            selectedCus={selectedCus}
            dataStatusCustomer={dataStatusCustomer}
            setStatus={setStatus}
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
            setloading={setloading}
            setDatatable={setData}
            setgroup_id={setgroup_id}
            setTime_s={setTime_s}
            setTime_e={setTime_e}
            setemp_id={setemp_id}
            listGr={listGr}
            listGr_Child={listGr_Child}
            nameNvNomor={nameNvNomor}
            nv={nv}
            role={role}
            posId={posId}
            listNV={listNV}
            handover={selectedCusIds}
            setIsOpenFilterBox={setIsOpenFilterBox}
            setIsApDung={setIsApDung}
            isOpenFilterBox={isOpenFilterBox}
            dataLength={data?.data?.length}
            isRowDataSelected={isRowDataSelected}
            selectedCusIds={selectedCusIds}
          />
          <TableListCustomer
            handleGetInfoSTT={handleGetInfoSTT}
            fetchData={fetchData}
            rowSelection={rowSelection}
            datatable={datatable}
            dataStatusCustomer={dataStatusCustomer}
            dataGroup={listGr}
            des={des}
            setDes={setDes}
            setPage={setPage}
            page={page}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalRecords={totalRecords}
            loading={loading}
            setDatatable={setData}
            ArrNguonKK={ArrNguonKK}
            setStatus={setStatus}
            setResoure={setResoure}
            nvPhuTrach={nvPhuTrach}
            setnvPhuTrach={setnvPhuTrach}
            userNameCreate={userNameCreate}
            setuserNameCreate={setuserNameCreate}
            nhomCha={nhomCha}
            setnhomCha={setnhomCha}
            nhomCon={nhomCon}
            setnhomCon={setnhomCon}
            setloading={setloading}
            setgroup_id={setgroup_id}
            setTime_s={setTime_s}
            setTime_e={setTime_e}
            setemp_id={setemp_id}
            listGr={listGr}
            listGr_Child={listGr_Child}
            nameNvNomor={nameNvNomor}
            nv={nv}
            role={role}
            posId={posId}
            listNV={listNV}
            setIdNhom={setIdNhom}
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            setdateS={setdateS}
            setdateE={setdateE}
            name={name}
            setName={setName}
            isSelectedRow={selected}
            numberSelected={numberSelected}
            chooseAllOption={handleSelectAll}
            selectedCus={selectedCus}
            fetchDataDefault={fetchDataDefault}
          />
        </div>
      )}
    </>
  );
}
