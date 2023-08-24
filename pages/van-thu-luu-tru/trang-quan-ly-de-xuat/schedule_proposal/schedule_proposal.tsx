import { Button, Col, Form, MenuProps, Row } from "antd";
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import {
  MyDatePicker,
  MyInput,
  MySelect,
  MySelectMulti,
  MySelectTags,
  MyTextArea,
} from "@/components/van-thu-luu-tru/tao-de-xuat/qlc/modal";

import Image from "next/image";
import {
  ModalAlertChooseShift,
  ModalAlertChooseTimeApply,
  ModalOkConfirm,
  MyMenuThemeColorMultiCheckbox,
  MyTimePicker,
  TableLich,
} from "@/components/van-thu-luu-tru/tao-de-xuat/de-xuat-lich-lam-viec/modal";
import dayjs, { Dayjs } from "dayjs";
import {
  fetch_shift,
  fetch_supervisor_approver,
} from "@/utils/api/dexuat/api_fetch";
import { getCookie } from "cookies-next";

export default function Page() {
  const [current, setCurrent]: any = useState(new Date());
  const [listCheck, setListCheck]: any = useState([]);
  const [openCheck, setOpenCheck] = useState(false);
  const [allCheck, setAllCheck]: any = useState({});
  const [listShift, setListShift]: any = useState([]);
  const [data, setData]: any = useState({ apply_month: "2023-08-01" });
  const [listShiftSelected, setListShiftSelected]: any[] = useState([]);
  const [isMenuSelectShiftOpen, setIsMenuSelectShiftOpen]: any = useState([]);
  const [modalAlertChooseShift, setModalAlertChooseShift]: any =
    useState(false);
  const [modalAlertChooseTimeApply, setModalAlertChooseTimeApply]: any =
    useState(false);
  const [modalOkConfirm, setModalOkConfirm]: any = useState(false);
  const [isBlur, setIsBlur]: any = useState(true);
  const [weekType, setWeekType]: any = useState(2);
  const [shiftType, setShiftType]: any = useState(1);
  const [listHours, setListHours]: any[] = useState([]);
  const [timeEndShift, setTimeEndShift] = useState<Dayjs | null>(null);
  const [timeStartShift, setTimeStartShift] = useState<Dayjs | null>(null);
  const [isAddHour, setIsAddHour] = useState<boolean>(false);
  const [form] = Form.useForm();

  const [shiftData, setShiftData] = useState<any>();
  const [supervior, setSuperVisor] = useState<any>();
  const [approver, setApprover] = useState<any>();
  useEffect(() => {
    const fetchdata = async () => {
      const token = sessionStorage.getItem("token");
      const response = await fetch_supervisor_approver(token);
      const response2 = await fetch_shift(token);
      setSuperVisor(response?.data.listUsersTheoDoi);
      setApprover(response?.data.listUsersDuyet);
      setShiftData(response2?.data.items);
    };
    fetchdata();
  }, []);
  const values = Form.useWatch(
    ["thang_ap_dung", "time-start-shift", "time-end-shift"],
    form
  );

  const id_user_duyet_options = approver?.map((opts: any) => {
    return { value: opts.idQLC, label: opts.userName, name: "id_user_duyet" };
  });
  const id_user_theo_doi_options = supervior?.map((opts: any) => {
    return {
      value: opts.idQLC,
      label: opts.userName,
      name: "id_user_theo_doi",
    };
  });

  const shiftLabel = shiftData?.map((shift: any) => ({
    value: shift.shift_id.toString(),
    label: shift.shift_name,
  }));

  useEffect(() => {
    const today = new Date();
    const dd = String(current.getDate()).padStart(2, "0");
    const mm = String(current.getMonth() + 1).padStart(2, "0");
    const yyyy = current.getFullYear();
    const timeFormat = yyyy + "-" + mm + "-" + dd;
    setData({ apply_month: timeFormat });
  }, []);

  useEffect(() => {
    if (data?.apply_month) {
      isBlur
        ? setCurrent(
            new Date(
              Number(data?.apply_month?.substring(0, 4)),
              Number(data?.apply_month?.substring(5, 7)) - 1
            ),
            Number(data?.apply_month?.substring(8))
          )
        : setCurrent(new Date("2000-01-01"));
    }
  }, [data]);

  useEffect(() => {
    setAllCheck({ ...allCheck, [formatDate(current)]: listCheck });
  }, [listCheck]);

  useEffect(() => {
    setAllCheck({ ...allCheck, [formatDate(current)]: listHours });
  }, [listHours]);

  useEffect(() => {
    shiftType === 1
      ? setListCheck(
          !(formatDate(current) in allCheck)
            ? []
            : allCheck[formatDate(current)]
        )
      : setListHours(
          !(formatDate(current) in allCheck)
            ? []
            : allCheck[formatDate(current)]
        );
  }, [current]);

  useEffect(() => {
    if (form.getFieldValue("thang_ap_dung") !== undefined) {
      openCheck
        ? listShiftSelected?.length > 0
          ? (getDaysInMonth(data?.apply_month, listShiftSelected, weekType),
            setListCheck(listShiftSelected))
          : setAllCheck({})
        : null;
    } else {
    }
  }, [listShiftSelected]);

  useEffect(() => {
    isBlur
      ? null
      : shiftType === 1
      ? getDaysInMonth(data?.apply_month, listShiftSelected, weekType)
      : getDaysInMonth(data?.apply_month, listHours, weekType);
  }, [weekType]);

  useEffect(() => {
    setAllCheck({});
  }, [shiftType]);

  useEffect(() => {
    shiftType === 1
      ? form.validateFields(["thang_ap_dung", "ca_lam_viec"]).then(() => {
          setOpenCheck(true);
          handleRemoveBlur();
          setData({
            apply_month: dayjs(form.getFieldValue("ngay_bat_dau")).format(
              "YYYY-MM-DD"
            ),
            cy_detail: getDaysInMonth(
              dayjs(form.getFieldValue("ngay_bat_dau")).format("YYYY-MM-DD"),
              listShiftSelected,
              weekType
            ),
          });
        })
      : form
          .validateFields([
            "thang_ap_dung",
            "time-start-shift",
            "time-end-shift",
          ])
          .then(() => {
            setOpenCheck(true);
            handleRemoveBlur();
            setData({
              apply_month: dayjs(form.getFieldValue("ngay_bat_dau")).format(
                "YYYY-MM-DD"
              ),
              cy_detail: getDaysInMonth(
                dayjs(form.getFieldValue("ngay_bat_dau")).format("YYYY-MM-DD"),
                [{ time: `${timeStartShift} - ${timeEndShift}` }],
                weekType,
                "hour"
              ),
            });
            setListHours([{ time: `${timeStartShift} - ${timeEndShift}` }]);
          });
  }, [timeEndShift, shiftType]);

  const getDaysInMonth = (
    thang_ap_dung: any,
    listShiftSelected: any,
    weekType: any,
    type: "shift" | "hour" = "shift"
  ) => {
    var date: Date = new Date(
      Number(thang_ap_dung?.substring(0, 4)),
      Number(thang_ap_dung?.substring(5, 7)) - 1,
      1
    );
    var days = {};
    var current: Date = new Date(new Date(thang_ap_dung).setHours(0));
    while (date.getMonth() === Number(thang_ap_dung?.substring(5, 7)) - 1) {
      if (date >= current) {
        switch (weekType) {
          case 2:
            if (date.getDay() !== 0) {
              days = { ...days, [formatDate(date)]: listShiftSelected };
            }
            break;
          case 1:
            if (date.getDay() === 0 || date.getDay() === 6) {
            } else {
              days = { ...days, [formatDate(date)]: listShiftSelected };
            }
            break;
          case 3:
            days = { ...days, [formatDate(date)]: listShiftSelected };
            break;
          default:
            break;
        }
      }
      date.setDate(date.getDate() + 1);
    }
    setAllCheck(days);
    return days;
  };

  const formatDate = (date = new Date()) => {
    const year = date?.toLocaleString("default", { year: "numeric" });
    const month = date?.toLocaleString("default", { month: "2-digit" });
    const day = date?.toLocaleString("default", { day: "2-digit" });

    return [year, month, day].join("-");
  };

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys?.find(
      (key) => isMenuSelectShiftOpen?.indexOf(key) === -1
    );
    if (["1"].indexOf(latestOpenKey!) === -1) {
      setIsMenuSelectShiftOpen(keys);
    } else {
      setIsMenuSelectShiftOpen(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleRemoveBlur = () => {
    const table = document.querySelector(".ant-col.blur");
    table?.classList?.contains("blur")
      ? table?.classList?.remove("blur")
      : null;
    setIsBlur(false);
    table?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChangeMonth = (value: any, timeStr: any) => {
    timeStr === ""
      ? form.setFieldValue("ngay_bat_dau", "")
      : form.setFieldValue("ngay_bat_dau", dayjs(timeStr + "-01"));

    shiftType === 1 &&
      form
        .validateFields([
          "de-xuat-name",
          "userConfirm",
          "userFollow",
          "reason",
          "thang_ap_dung",
        ])
        .then(() => {
          setOpenCheck(true);
          handleRemoveBlur();
          setData({
            apply_month: dayjs(form.getFieldValue("ngay_bat_dau")).format(
              "YYYY-MM-DD"
            ),
            cy_detail: getDaysInMonth(
              dayjs(form.getFieldValue("ngay_bat_dau")).format("YYYY-MM-DD"),
              listShiftSelected,
              weekType
            ),
          });
        });
  };

  const handleChangeDate = (value: any, timeStr: any) => {
    timeStr === ""
      ? setData({ apply_month: formatDate(new Date()), cy_detail: [] })
      : !isBlur && shiftType === 1
      ? setData({
          apply_month: dayjs(form.getFieldValue("ngay_bat_dau")).format(
            "YYYY-MM-DD"
          ),
          cy_detail: getDaysInMonth(
            dayjs(form.getFieldValue("ngay_bat_dau")).format("YYYY-MM-DD"),
            listShiftSelected,
            weekType
          ),
        })
      : !isBlur &&
        shiftType === 2 &&
        setData({
          apply_month: dayjs(form.getFieldValue("ngay_bat_dau")).format(
            "YYYY-MM-DD"
          ),
          cy_detail: getDaysInMonth(
            dayjs(form.getFieldValue("ngay_bat_dau")).format("YYYY-MM-DD"),
            listHours,
            weekType,
            "hour"
          ),
        });
  };

  const handleChangeTimeStart = (value: any, timeStr: any) => {
    setTimeStartShift(timeStr);
  };

  const handleChangeTimeEnd = (value: any, timeStr: any) => {
    setTimeEndShift(timeStr);
  };

  const handlePreviewCheck = () => {
    if (form?.getFieldValue("ngay_bat_dau") === undefined) {
      setModalAlertChooseTimeApply(true);
    } else {
      if (listShiftSelected?.length > 0) {
        setOpenCheck(true);
        // console.log(dayjs(form.getFieldValue("ngay_bat_dau")).format("YYYY-MM-DD"))
        setData({
          apply_month: dayjs(form.getFieldValue("ngay_bat_dau")).format(
            "YYYY-MM-DD"
          ),
          cy_detail: getDaysInMonth(
            dayjs(form.getFieldValue("ngay_bat_dau")).format("YYYY-MM-DD"),
            listShiftSelected,
            weekType
          ),
        });
        handleRemoveBlur();
      } else {
        setModalAlertChooseShift(true);
      }
    }
  };

  return (
    <div className={styles.main}>
      <Form
        form={form}
        initialValues={{
          name: getCookie("userName")?.toString(),
          type_shift: 1,
          deXuatType: "Đề xuất lịch làm việc",
          lich_lam_viec: 2,
          ca_lam_viec: ["Ca sáng"],
        }}
      >
        <Row gutter={[20, 10]} style={{ rowGap: "20px", margin: "0" }}>
          <Col
            xl={12}
            className={styles.column}
            style={{ paddingLeft: "30px" }}
          >
            <div className={`${styles.colContent} contentFormItemLLV`}>
              <div className={styles.header}>
                <p className={styles.headerText}>Tạo Đề xuất lịch làm việc</p>
              </div>
              <Col xl={24} className={styles.colItem}>
                {MyInput(
                  "Tên đề xuất",
                  "Nhập tên đề xuất",
                  true,
                  true,
                  "name_dx",
                  "",
                  false
                )}
              </Col>
              {/* <Col xl={24} className={styles.colItem}>
                {MySelect(
                  "Loại lịch làm việc",
                  "Làm việc theo ca",
                  true,
                  true,
                  "type_shift",
                  [
                    { label: "Làm việc theo ca", value: 1 },
                    { label: "Làm việc theo giờ", value: 2 },
                  ],
                  shiftType,
                  setShiftType
                )}
              </Col> */}
              <Col xl={24} className={styles.colItem}>
                {MyInput(
                  "Họ và tên",
                  "Vũ Văn Khá",
                  true,
                  true,
                  "name",
                  "",
                  true,
                  "#EDF3FF"
                )}
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MyInput(
                  "Loại đề xuất",
                  "Đề xuất lịch làm việc",
                  true,
                  true,
                  "deXuatType",
                  "",
                  true,
                  "#EDF3FF"
                )}
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MySelectTags(
                  "Người xét duyệt",
                  "Nhập người xét duyệt",
                  true,
                  true,
                  "id_user_duyet",
                  id_user_duyet_options,
                  []
                )}
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MySelectTags(
                  "Người theo dõi",
                  "Nhập người theo dõi",
                  true,
                  true,
                  "id_user_theo_doi",
                  id_user_theo_doi_options,
                  []
                )}
              </Col>

              <Col xl={24} className={styles.colItem}>
                <MyTextArea
                  name="ly_do"
                  required={true}
                  title="Lý do"
                  hasLabel={true}
                  placeholder="Nhập lý do"
                />
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MySelect(
                  "Chọn lịch làm việc",
                  "Chọn lịch làm việc",
                  true,
                  true,
                  "lich_lam_viec",
                  [
                    { label: "Thứ 2 - Thứ 7", value: 2 },
                    { label: "Thứ 2 - Thứ 6", value: 1 },
                    { label: "Thứ 2 - CN", value: 3 },
                  ],
                  weekType,
                  setWeekType
                )}
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MyDatePicker(
                  "Tháng áp dụng",
                  "---------- ----",
                  true,
                  true,
                  "thang_ap_dung",
                  "month",
                  "",
                  false,
                  handleChangeMonth
                )}
              </Col>
              <Col xl={24} className={styles.colItem}>
                {MyDatePicker(
                  "Ngày bắt đầu làm việc",
                  "yyyy-mm-dd",
                  true,
                  true,
                  "ngay_bat_dau",
                  "",
                  "",
                  false,
                  handleChangeDate
                )}
              </Col>

              {shiftType === 1 ? (
                <>
                  <Col xl={24} className={`${styles.colItem} themeColor`}>
                    {MyMenuThemeColorMultiCheckbox(
                      "Ca làm việc",
                      "Chọn ca làm việc",
                      true,
                      true,
                      "ca_lam_viec",
                      shiftLabel,
                      listShiftSelected,
                      setListShiftSelected,
                      isMenuSelectShiftOpen,
                      onOpenChange
                    )}
                  </Col>

                  {!isBlur ? (
                    <></>
                  ) : (
                    <Col xl={24} className={`${styles.colItem} themeColor`}>
                      <Button type="primary" block onClick={handlePreviewCheck}>
                        <div className={styles.btnContent}>
                          <span>Xem lịch làm việc</span>
                          <i style={{ marginRight: "10px" }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="6"
                              height="8"
                              viewBox="0 0 6 8"
                              fill="none"
                            >
                              <path
                                d="M1.5 7.125L4.5 4L1.5 0.875"
                                stroke="#4C5BD4"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </i>
                        </div>
                      </Button>
                    </Col>
                  )}
                </>
              ) : (
                <>
                  <Col xl={24} className={`${styles.colItem}`}>
                    {MyTimePicker(
                      "Thời gian bắt đầu",
                      "",
                      true,
                      true,
                      "time-start-shift",
                      "",
                      undefined,
                      false,
                      handleChangeTimeStart
                    )}
                  </Col>
                  <Col xl={24} className={`${styles.colItem}`}>
                    {MyTimePicker(
                      "Thời gian kết thúc",
                      "",
                      true,
                      true,
                      "time-end-shift",
                      "",
                      undefined,
                      false,
                      handleChangeTimeEnd
                    )}
                  </Col>
                </>
              )}
            </div>
          </Col>
          <Col
            xl={12}
            className={`${styles.column} blur`}
            style={{ paddingRight: "20px" }}
          >
            {TableLich({
              current,
              setCurrent,
              listCheck,
              setListCheck,
              openCheck,
              setOpenCheck,
              allCheck,
              setAllCheck,
              shiftLabel,
              data,
              form,
              isBlur,
              weekType,
              shiftType,
              listShiftSelected,
              listHours,
              setListHours,
              isAddHour,
              setIsAddHour,
              modalOkConfirm,
              setModalOkConfirm,
            })}
          </Col>
        </Row>
      </Form>
      {ModalAlertChooseShift({
        open: modalAlertChooseShift,
        setOpen: setModalAlertChooseShift,
      })}
      {ModalAlertChooseTimeApply({
        open: modalAlertChooseTimeApply,
        setOpen: setModalAlertChooseTimeApply,
      })}
      {ModalOkConfirm({
        open: modalOkConfirm,
        setOpen: setModalOkConfirm,
      })}
    </div>
  );
}
