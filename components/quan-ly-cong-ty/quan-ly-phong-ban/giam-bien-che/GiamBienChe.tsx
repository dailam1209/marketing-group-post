import { Col, Row, Select, Input } from "antd";
import styles from "./GiamBienChe.module.css";
import {
  AddButton,
  ExportExcelButton,
  SearchButton,
} from "@/components/commons/Buttons";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AddNewModal,
  ConfirmDeleteModal,
  UpdatePhongBanModal,
} from "./modal/modal";
import { MyTable } from "../table/Table";
import { MyInput, MySelect } from "../../quan-ly-cong-ty-con/modal";
import { mySelect } from "@/components/cham-cong/duyet-thiet-bi/duyet-thiet-bi";
import { POST, getCompIdCS } from "@/pages/api/BaseApi";
import dayjs from "dayjs";

export function GiamBienChe({ listQuitJob, listDepartments, infoCom }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirmDel, setOpenConfirmDel] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [openAddNew, setOpenAddNew] = useState(false);
  const [data, setData] = useState(listQuitJob?.data);
  const [NV, setNV]: any = useState({});
  const [listNV, setListNV]: any = useState([]);
  const [listDepLabel, setListDepLabel]: any = useState(
    listDepartments?.items?.map((dep) => ({
      label: dep?.dep_name,
      value: dep?.dep_id,
    }))
  );
  const [companyLabel, setCompanyLabel]: any = useState({
    label: infoCom?.data?.com_name,
    value: infoCom?.data?.com_id,
  });

  useEffect(() => {
    let com_id = null;
    com_id = getCompIdCS();
    com_id !== null &&
      POST("api/qlc/managerUser/list", { com_id: com_id }).then((res) => {
        if (res?.result === true) {
          setListNV(res?.items);
        }
      });
  }, []);

  const columns = [
    {
      title: <p className={styles.headerTxt}>ID Nhân viên</p>,
      render: (_: any, record: any, index: number) => <p>{record?.ep_id}</p>,
    },
    {
      title: <p className={styles.headerTxt}>Họ và tên</p>,
      render: (record: any, index: any) => {
        const emp = listNV?.find(e => e?.ep_id == record.ep_id)
        return <p>{emp?.userName}</p>;
      },
    },
    {
      title: <p className={styles.headerTxt}>Ca nghỉ</p>,
      render: (record: any, index: any) => <p>{record?.shift_name}</p>,
    },
    {
      title: <p className={styles.headerTxt}>Phòng ban</p>,
      render: (record: any, index: any) => <p>{record?.shift_name}</p>,
    },
    {
      title: <p className={styles.headerTxt}>Chức vụ</p>,
      render: (record: any, index: any) => <p>{record?.position_name}</p>,
    },
    {
      title: <p className={styles.headerTxt}>Giảm biên chế/nghỉ việc</p>,
      render: (record: any, index: any) => <p>{record?.type}</p>,
    },
    {
      title: <p className={styles.headerTxt}>Ngày bắt đầu nghỉ</p>,
      render: (record: any, index: any) => (
        <p>{dayjs(record?.time).format("YYYY-MM-DD")}</p>
      ),
    },
    {
      title: <p className={styles.headerTxt}>Chức năng</p>,
      render: (record: any, index: any) => (
        <div className={styles.actionGroup}>
          <Image
            alt="/"
            src={"/edit.png"}
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRow(record);
              setOpenEdit(true);
            }}
          />
          <div className={styles.divider}></div>
          <Image
            alt="/"
            src={"/delete-icon.png"}
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRow(record);
              setOpenConfirmDel(true);
            }}
          />
        </div>
      ),
    },
  ];

  const [listDataFiltered, setListDataFiltered] = useState([]);
  const [depFilter, setDepFilter]: any = useState<any>();
  const [epIdFilter, setEpIdFilter]: any = useState<any>();
  const [dateFilter, setDateFilter]: any = useState<any>(
    dayjs().format("YYYY-MM")
  );
  useEffect(() => {
    setListDataFiltered(data);
  }, [data]);

  useEffect(() => {
    if (!depFilter) {
      setListDataFiltered(data);
    }
    if (!dateFilter) {
      setListDataFiltered(data);
    }
  }, [depFilter, dateFilter]);

  const handleFilter = () => {
    if (depFilter) {
      setListDataFiltered(
        data?.filter((data: any) => data?.dep_name === depFilter?.label)
      );
    }

    if (epIdFilter) {
      setListDataFiltered(
        data?.filter((data: any) => data?.ep_id === epIdFilter)
      );
    }

    if (dateFilter) {
      setListDataFiltered(
        data?.filter(
          (data: any) => dayjs(data?.time).format("YYYY-MM") === dateFilter
        )
      );
    }
  };

  const handleChangeDep = (value: any, option: any) => {
    setDepFilter(option);
  };

  const handleChangeEp = (value: any, option: any) => {
    setEpIdFilter(value);
  };

  return (
    <div>
      <Row gutter={{ lg: 20, md: 25, sm: 20, xs: 20 }}>
        <Col
          lg={{ span: 10, order: 1 }}
          md={{ span: 10, order: 1 }}
          sm={12}
          xs={24}
        >
          <div>
            {MySelect(
              "",
              "Chọn phòng ban",
              false,
              false,
              "dep_id",
              listDepLabel,
              null,
              () => null,
              handleChangeDep
            )}
          </div>
        </Col>
        <Col
          lg={{ span: 11, order: 1 }}
          md={{ span: 10, order: 2 }}
          sm={12}
          xs={24}
        >
          <div>
            {mySelect(
              true,
              "",
              "Nhập tên nhân viên",
              false,
              false,
              "ep_id",
              data?.map((emp) => ({ label: emp?.ep_name, value: emp?.ep_id })),
              handleChangeEp
            )}
          </div>
        </Col>
        <Col
          lg={{ span: 3, order: 1 }}
          md={{ span: 4, order: 3 }}
          sm={{ span: 14, order: 2 }}
          xs={{ span: 12, order: 1 }}
          className={styles.buttonLeft}
        >
          <Row gutter={20} justify={"end"}>
            <Col className={styles.button}>
              <div>{SearchButton("Tìm kiếm", handleFilter, false)}</div>
            </Col>
            <Col className={styles.buttonCenter1}>
              {ExportExcelButton(() => null)}
            </Col>
          </Row>
        </Col>
        <Col
          lg={{ span: 10, order: 1 }}
          md={{ span: 10, order: 4 }}
          sm={{ span: 10, order: 1 }}
          xs={24}
        >
          <Input
            className={styles.input}
            type="month"
            placeholder="Chọn tháng"
            size="large"
            value={dateFilter ? dayjs(dateFilter).format("YYYY-MM") : undefined}
            onChange={(e) => setDateFilter(e.target.value)}
            allowClear={dateFilter ? true : false}
          ></Input>
        </Col>
        <Col
          lg={{ span: 14, order: 1 }}
          md={{ span: 14, order: 5 }}
          sm={{ span: 24, order: 3 }}
          xs={{ span: 12, order: 2 }}
        >
          <Row gutter={20} justify={"end"}>
            <Col className={styles.buttonCenter2}>
              {ExportExcelButton(() => null)}
            </Col>
            <Col className={styles.buttonRight}>
              <div>
                {AddButton("Thêm mới giảm biên chế", () => setOpenAddNew(true))}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24} order={3} className={styles.buttonRight2}>
          <div>
            {AddButton("Thêm mới giảm biên chế", () => setOpenAddNew(true))}
          </div>
        </Col>
      </Row>
      {/* table */}
      <MyTable
        colunms={columns}
        data={listDataFiltered}
        onRowClick={() => null}
        Footer={null}
        hasRowSelect={false}
        onSelectChange={() => null}
        rowKey="name"
        selectedRowKeys={null}
      />
      {UpdatePhongBanModal(
        openEdit,
        setOpenEdit,
        data,
        setData,
        selectedRow,
        companyLabel,
        listDepLabel
      )}
      {ConfirmDeleteModal(
        openConfirmDel,
        setOpenConfirmDel,
        selectedRow ? selectedRow["name"] : "",
        data,
        setData,
        selectedRow
      )}
      {AddNewModal(
        openAddNew,
        setOpenAddNew,
        setData,
        listNV,
        setListNV,
        companyLabel,
        listDepLabel
      )}
    </div>
  );
}
