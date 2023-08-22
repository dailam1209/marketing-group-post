import { Card, Input, Row, Col, Button, Form, Select } from "antd";
import { mySelect } from "@/components/cham-cong/duyet-thiet-bi/duyet-thiet-bi";
import "./xuat-cong.module.css";
import { xuatCong } from "@/components/cham-cong/xuat-cong/xuat-cong-cpn";
import styles from "./xuat-cong.module.css";
import { POST, POST_SS, getCompIdCS, getCompIdSS } from "@/pages/api/BaseApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
export interface DataType {
  key: React.Key;
  url: React.ReactNode;
  name: string;
  date: string;
  time: string;
}
const nhanVien = [
  {
    label: "Nhân viên có chấm công",
    value: 1,
  },
  {
    label: "Toàn bộ nhân viên",
    value: 0,
  },
];
export default function XuatCong({
  comData,
  listDepartments,
  listEmp,
  listEmpTimekeeping,
}) {
  const [comLabel, setComLabel] = useState({
    label: comData?.data?.com_name,
    value: comData?.data?.com_id,
  });
  const [listDepLabel, setListDepLabel] = useState(
    listDepartments?.items?.map((dep) => ({
      label: dep?.dep_name,
      value: dep?.dep_id,
    }))
  );
  const [listEmpLabel, setListEmpLabel] = useState(
    listEmp?.items?.map((emp) => ({
      label: emp?.userName,
      value: emp?.idQLC,
      avatarUser: emp?.avatarUser,
    }))
  );
  const [data, setData] = useState(
    listEmpTimekeeping?.listUser?.map((user) => {
      const timeSucceed = listEmpTimekeeping?.dataTimeSheet?.find(
        (timeSheet) => timeSheet?.ep_id === user?.idQLC
      );

      const dataUser = {
        key: user?.idQLC,
        url: (user?.avatarUser && `/${user?.avatarUser}`) || "/anhnhanvien.png",
        name: user?.userName,
      };

      if (timeSucceed) {
        return {
          ...dataUser,
          date: timeSucceed?.time?.substring(0, 10),
          time: timeSucceed?.time?.substring(11, 16),
        };
      } else {
        return dataUser;
      }
    })
  );
  const [form] = Form.useForm();

  const handleSubmit = () => {
    let com_id = null;
    com_id = getCompIdCS();
    form.getFieldValue("from") !== undefined &&
      form.getFieldValue("to") !== undefined &&
      POST("api/qlc/timekeeping/com/success", {
        com_id: com_id,
        inputOld: dayjs(form.getFieldValue("from")).format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
        inputNew: dayjs(form.getFieldValue("to")).format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
      }).then((res) => {
        if (res?.result === true) {
          setData(
            res?.listUser
              ?.map((user) => {
                const timeSucceed = res?.dataTimeSheet?.find(
                  (timeSheet) => timeSheet?.ep_id === user?.idQLC
                );

                const dataUser = {
                  key: user?.idQLC,
                  url:
                    (user?.avatarUser && `/${user?.avatarUser}`) ||
                    "/anhnhanvien.png",
                  name: user?.userName,
                };

                if (timeSucceed) {
                  return {
                    ...dataUser,
                    date: timeSucceed?.time?.substring(0, 10),
                    time: timeSucceed?.time?.substring(11, 16),
                  };
                } else {
                  return dataUser;
                }
              })
              ?.filter((user) => user !== undefined)
          );
        }
      });
  };

  // console.log(data);
  const [listDataFiltered, setListDataFiltered] = useState([]);
  const [epIdFilter, setEpIdFilter]: any = useState<any>();
  const [depFilter, setDepFilter]: any = useState<any>();
  useEffect(() => {
    setListDataFiltered(data);
  }, [data]);

  useEffect(() => {
    handleFilter()
    if (!depFilter) {
      setListDataFiltered(data);
    }
  }, [depFilter]);

  const handleFilter = () => {
    if (depFilter) {
      setListDataFiltered(
        data?.filter((data: any) => data?.dep_name === depFilter?.label)
      );
    }
    if (epIdFilter) {
      setListDataFiltered(
        data?.filter((data: any) => data?.idQLC === epIdFilter)
      );
    }
  };

  const handleChangeEp = (value: any, option: any) => {
    setEpIdFilter(value)
  }

  const handleChangeDep = (value: any, option: any) => {
    setDepFilter(option)
  }
  return (
    <Card>
      <div className={styles.main}>
        <div className={styles.headText} style={{ color: "#474747" }}>
          Bảng công nhân viên
        </div>
        <Form form={form}>
          <div style={{ margin: "20px 0px 20px 0px" }}>
            <Row gutter={[20, 10]}>
              <Col xl={15} sm={24} xs={24}>
                <Row gutter={[20, 10]}>
                  <Col xl={12} sm={12} xs={24}>
                    {mySelect(
                      false,
                      "",
                      "Chọn công ty",
                      false,
                      false,
                      "com_id",
                      [comLabel]
                    )}
                  </Col>
                  <Col xl={12} sm={12} xs={24}>
                    {mySelect(
                      false,
                      "",
                      "Phòng ban (tất cả)",
                      false,
                      false,
                      "dep_id",
                      listDepLabel,
                      handleChangeDep
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xl={9} sm={24} xs={24}>
                <Row gutter={20}>
                  <Col xl={12} lg={12} className={styles.Pre}>
                    <Row gutter={20}>
                      <Col
                        span={5}
                        className={styles.text}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p> Từ</p>
                      </Col>
                      <Col span={19}>
                        <Form.Item name="from" className={styles.input}>
                          <Input type="date" size="large"></Input>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={12} lg={12} className={styles.Pre}>
                    <Row gutter={20}>
                      <Col
                        span={5}
                        className={styles.text}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p>Đến</p>
                      </Col>
                      <Col span={19}>
                        <Form.Item name="to" className={styles.input}>
                          <Input type="date" size="large"></Input>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row
              gutter={[20, 10]}
              justify={{ ["sm"]: "end" }}
              className={styles.row2}
            >
              <Col xl={8} sm={12} xs={24}>
                {mySelect(
                  false,
                  "",
                  "Nhập tên cần tìm",
                  false,
                  false,
                  "ep_id",
                  listEmpLabel,
                  handleChangeEp
                )}
              </Col>
              <Col xl={8} sm={12} xs={24}>
                {/* {mySelect(
                  false,
                  "",
                  "Nhân viên có chấm công",
                  true,
                  false,
                  "nhanvien",
                  nhanVien
                )} */}
                <Form.Item
                  name={"type_timekeeping"}
                  // rules={[
                  //   { required: true, message: "Vui lòng điền đủ thông tin" },
                  // ]}
                >
                  <Select
                    size="large"
                    defaultValue={0}
                    suffixIcon={<img src="/down-icon.png"></img>}
                    options={nhanVien}
                    showSearch={false}
                    listHeight={200}
                  />
                </Form.Item>
              </Col>
              <Col xl={12} sm={12} md={12} xs={24} className={styles.After}>
                <Row gutter={20}>
                  <Col
                    span={2}
                    className={styles.text}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Từ
                  </Col>
                  <Col span={22}>
                    <Form.Item name="from" className={styles.input}>
                      <Input type="date" size="large"></Input>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xl={12} sm={12} md={12} xs={24} className={styles.After}>
                <Row gutter={20}>
                  <Col
                    span={2}
                    className={styles.text}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    Đến
                  </Col>
                  <Col span={22}>
                    <Form.Item name="to" className={styles.input}>
                      <Input type="date" size="large"></Input>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xl={4} lg={4} md={5} sm={7} xs={12}>
                <Button
                  className={styles.button}
                  htmlType="submit"
                  size="large"
                  onClick={handleSubmit}
                >
                  <p className={styles.txt}>Lọc</p>
                </Button>
              </Col>
              <Col xl={4} lg={4} md={5} sm={7} xs={12}>
                <Button className={styles.button_excel} size="large">
                  <p className={styles.excel}>Xuất excel</p>
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
        <div>{xuatCong(listDataFiltered)}</div>
      </div>
    </Card>
  );
}

export const getServerSideProps = async (context) => {
  const comData = await POST_SS("api/qlc/company/info", {}, context);

  // Get current day to get start and end of this current day to call api timekeeping
  const current = dayjs();
  let startDay = current.set("hour", 0);
  let endDay = current.set("hour", 23);
  // console.log(dayjs(startDay).format('YYYY-MM-DDTHH:00:00.000Z'))
  // console.log(dayjs(endDay).format('YYYY-MM-DDTHH:59:59.000Z'))
  let com_id = null;
  com_id = getCompIdSS(context);
  

  const listDepartments = await POST_SS(
    "api/qlc/department/list",
    { com_id: com_id },
    context
  );

  const listEmp = await POST_SS(
    "api/qlc/managerUser/list",
    { com_id: com_id },
    context
  );

  const listEmpTimekeeping = await POST_SS(
    "api/qlc/timekeeping/com/success",
    {
      com_id: com_id,
      inputOld: dayjs(startDay).format("YYYY-MM-DDTHH:00:00.000Z"),
      // inputOld: "2023-01-01T00:00:00.000+07:00",
      inputNew: dayjs(endDay).format("YYYY-MM-DDTHH:59:59.000Z"),
    },
    context
  );

  return {
    props: {
      comData,
      listDepartments,
      listEmp,
      listEmpTimekeeping,
    },
  };
};
