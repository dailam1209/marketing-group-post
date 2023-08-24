import styles from "./SecondPage.module.css";
import { Table, Modal, Checkbox } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import checkCookie from "../../../../function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

export default function SecondPage({ handleSelected }) {
  const arrayTest = [
    { key: "1", time: "2021-09-27T00:00:00.000Z" },
    { key: "2", time: "2021-09-28T00:00:00.000Z" },
    { key: "3", time: "2021-09-29T00:00:00.000Z" },
    { key: "4", time: "2021-09-30T00:00:00.000Z" },
    { key: "5", time: "2021-09-01T00:00:00.000Z" },
    { key: "6", time: "2021-09-02T00:00:00.000Z" },
  ];
  checkCookie();
  const domain = process.env.NEXT_PUBLIC_BASE_URL_TL;
  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  const arrayConnect = [{ key: "1", value: "one" }];

  //*function phụ :
  function findIndexById(array, id) {
    //* hoạt động ok
    for (let i = 0; i < array.length; i++) {
      if (array[i].shift_id == id) {
        return i; // Return the index if found
      }
    }
    return -1; // Return -1 if not found
  }
  function convertUtcToVietnamDate(utcDateString) {
    const utcDate = new Date(utcDateString);

    // Convert to Vietnam time (UTC+7)
    const vietnamTime = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

    // Format as "DD-MM-YYYY"
    const day = vietnamTime.getUTCDate();
    const month = vietnamTime.getUTCMonth() + 1;
    const year = vietnamTime.getUTCFullYear();

    const formattedDate = `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
    return formattedDate;
  }

  const handleCheckboxChange = (checkedValue) => {
    if (checkedValues.includes(checkedValue)) {
      setCheckedValues(checkedValues.filter((value) => value !== checkedValue));
    } else {
      setCheckedValues([...checkedValues, checkedValue]);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //* Hoạt động Ok
  function findIndexesMatchingObject(arr, obj) {
    const matchingIndexes = arr
      .map((item, index) =>
        item?.pc_shift == obj.key && item?.pc_time == obj.value ? index : -1
      )
      .filter((index) => index !== -1);
    return matchingIndexes;
  }

  //* Đã hoạt động Ok
  function containsObject(obj) {
    return nghiSaiQuyDinh.some(
      (item) => item.pc_shift == obj.key && item.pc_time == obj.value
    );
  }
  //* hoạt động Ok
  function convertToISO(inputDate) {
    const isoDate = new Date(inputDate).toISOString();
    return isoDate;
  }

  function getObjectsBeforeDay(array, givenDay) {
    const filteredObjects = array.filter(
      (item) => new Date(item?.pc_time) < new Date(givenDay)
    );
    return filteredObjects;
  }

  function formatDateToYYYYMMDD(dateString) {
    const originalDate = new Date(dateString);
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  const [CaiDatMucPhat, setIsCaiDatMucPhat] = useState(false);
  const [isModalOpenXemMucPhat, setIsModalOpenXemMucPhat] = useState(false);
  const [nghiSaiQuyDinh, setNghiSaiQuyDinh] = useState([]);
  const [allShift, setAllShift] = useState([]);
  const [selectedPhatCa, setSelectedPhatCa] = useState(0);
  const [checkedValues, setCheckedValues] = useState([]);
  const [formData, setFormData] = useState([]);
  const [isInsert, setIsInsert] = useState(false);
  const [selectedDay, setSelectedDay] = useState(
    formatDateToYYYYMMDD(new Date())
  );
  useEffect(() => {
    setSelectedDay(formatDateToYYYYMMDD(new Date()));
  }, []);
  console.log("formData:", formData);
  console.log("SelectedDay: ", selectedDay);

  // console.log("findIndexesByValue: ",findIndexesByValue(nghiSaiQuyDinh,))
  const showModalXemMucPhat = (id) => {
    // Đã nhận được id
    setSelectedPhatCa(id);
    setIsModalOpenXemMucPhat(true);
  };
  const handleCancelXemMucPhat = () => {
    setIsModalOpenXemMucPhat(false);
  };
  const handleOkXemMucPhat = () => {
    setIsModalOpenXemMucPhat(false);
  };

  const handleClick = (c) => {
    handleSelected(c);
  };

  const handleOkCaiDat = () => {
    checkedValues.map((item, index) => {
      if (
        containsObject({ key: item, value: convertToISO(formData?.pc_time) })
      ) {
        // console.log(
        //   `Hành động update ở cài đặt tại item ${item}`,
        //   findIndexesMatchingObject(nghiSaiQuyDinh, {
        //     key: item,
        //     value: convertToISO(formData?.pc_time),
        //   })
        // );
        findIndexesMatchingObject(nghiSaiQuyDinh, {
          key: item,
          value: convertToISO(formData?.pc_time),
        }).map((item1, index1) => {
          console.log("Các index cần phải update: ", item1);
          axios
            .post(
              "http://210.245.108.202:3009/api/tinhluong/congty/update_phat_ca",
              {
                //item 1 là list ra các index của các ca trong nghỉ sai quy định phải phi vào update
                pc_money: formData?.pc_money,
                pc_shift: item,
                pc_time: nghiSaiQuyDinh[item1].pc_time,
                pc_type: 1,
                pc_id: nghiSaiQuyDinh[item1].pc_id,
                token: token,
              }
            )
            .then((res) => {
              console.log(
                `Response sau khi update item ${item} ở index số ${item1} và tại pc_id ${nghiSaiQuyDinh[item1].pc_id}:`,
                res
              );
            })
            .catch((err) => {
              console.log(
                "Error ở API : http://210.245.108.202:3009/api/tinhluong/congty/update_phat_ca ",
                err
              );
            });
        });
      } else {
        axios
          .post(
            "http://210.245.108.202:3009/api/tinhluong/congty/insert_phat_ca",
            {
              pc_com: cp,
              pc_shift: item,
              pc_money: formData?.pc_money,
              pc_time: formData?.pc_time,
              pc_type: 2,
              token: token,
            }
          )
          .then((res) => {
            console.log(`response sau khi thêm mới cài đặt ở : ${item}`, res);
          })
          .catch((err) => {
            console.log(
              "Error ở API http://210.245.108.202:3009/api/tinhluong/congty/insert_phat_ca ",
              err
            );
          });
        console.log(`Hành động đang làm ở cài đặt tại item ${item}: insert`);
      }
    });
    setIsInsert(!isInsert);
  };

  const columns = [
    {
      title: "Ca làm việc",

      key: "name",
      width: "31,64%",
      render: (record) => (
        <div className={styles.takeleave_fn}>
          <h4>
            {allShift[findIndexById(allShift, record?.pc_shift)]?.shift_name}
          </h4>
          <p>
            Từ {allShift[findIndexById(allShift, record?.pc_shift)]?.start_time}
            -{allShift[findIndexById(allShift, record?.pc_shift)]?.end_time}
          </p>
        </div>
      ),
    },
    {
      title: "Mức phạt đang áp dụng	",

      key: "age",
      width: "22.78%",
      render: (record) => (
        <div className={styles.mucphatdangapdung}>
          {record?.pc_money} VNĐ/Ca
        </div>
      ),
    },
    {
      title: "Ngày bắt đầu áp dụng	",

      key: "address",
      width: "22.78%",
      render: (record) => (
        <div className={styles.ngaybatdauapdung}>
          {convertUtcToVietnamDate(record?.pc_time)}
        </div>
      ),
    },
    {
      title: "",

      key: "address",
      width: "22.78%",
      render: (record) => (
        <div
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "15px",
            lineHeight: "16px",
            color: "#68798b",
          }}
          onClick={() => showModalXemMucPhat(record?.pc_id)}
        >
          Xem mức phạt
        </div>
      ),
    },
  ];

  const columnsXemMucPhat = [
    {
      title: "Mức phạt",

      key: "name",
      width: "20%",
      render: (record) => <p className={styles.edit_mphat}> 50000 VNĐ</p>,
    },
    {
      title: "Thời điểm áp dụng",

      key: "age",
      width: "20%",
      render: () => <div className={styles.edit_mphat}>30-6-2023</div>,
    },

    {
      title: "",
      key: "age",
      width: "20%",
      render: () => (
        <div className={styles.edit_mphat}>
          <img src="/edit4.png" alt="" />
          <img src="/remo.png" alt="" />
        </div>
      ),
    },
  ];

  const listDataCaiDatMucPhat = [
    {
      Ca: "Ca sáng",
      ThoiGian: "Từ 08:00:00 - đến 11:30:00",
    },
    {
      Ca: "Ca chiều",
      ThoiGian: "Từ 09:00:00 - đến 11:30:00",
    },
    {
      Ca: "Ca tối",
      ThoiGian: "Từ 10:00:00 - đến 11:30:00",
    },
    {
      Ca: "Ca đêm",
      ThoiGian: "Từ 11:00:00 - đến 11:30:00",
    },
    {
      Ca: "Ca ngày",
      ThoiGian: "Từ 12:00:00 - đến 11:30:00",
    },
    {
      Ca: "Ca ngày",
      ThoiGian: "Từ 12:00:00 - đến 11:30:00",
    },
    {
      Ca: "Ca ngày",
      ThoiGian: "Từ 12:00:00 - đến 11:30:00",
    },
    {
      Ca: "Ca ngày",
      ThoiGian: "Từ 12:00:00 - đến 11:30:00",
    },
  ];
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Ensure month and day are always two digits (e.g., "03" instead of "3")
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    axios
      .post(
        "http://210.245.108.202:3009/api/tinhluong/congty/show_staff_late",
        {
          start_date: "2023-08-01T00:00:00.000+00:00",
          end_date: "2023-09-01T00:00:00.000+00:00",
          com_id: cp,
          token: token,
        }
      )
      .then((res) => {
        console.log("allShift: ", res.data.data.listShiftDetail);
        setAllShift(res.data.data.listShiftDetail);
      })
      .catch((err) => {
        console.log(
          "Lỗi ở API: http://210.245.108.202:3009/api/tinhluong/congty/show_staff_late  ",
          err
        );
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        "http://210.245.108.202:3009/api/tinhluong/congty/takeinfo_phat_ca_com",
        {
          pc_com: cp,
          token: token,
        }
      )
      .then((res) => {
        console.log("Các loại phạt nghỉ sai quy định:", res.data.listPhatCa);

        console.log("getObjectsBeforeDay: ");
        setNghiSaiQuyDinh(
          getObjectsBeforeDay(res.data.listPhatCa, convertToISO(selectedDay))
        );
      })
      .catch((err) => {
        console.log(
          "Error ở API: http://210.245.108.202:3009/api/tinhluong/congty/takeinfo_phat_ca_com",
          err
        );
      });
  }, [isInsert, selectedDay]);

  return (
    <div>
      <div className={styles.tax_one}>
        <p className={styles.btn_new}>Tạo mới</p>
      </div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)}>Chính sách nghỉ phép</p>
          <p onClick={() => handleClick(2)} className={styles.active}>
            Nghỉ sai quy định
          </p>
          <p onClick={() => handleClick(3)}>
            Nghỉ vào ngày không được phép nghỉ
          </p>
          <p onClick={() => handleClick(4)}>Theo dõi nghỉ phép</p>
          <p onClick={() => handleClick(5)}>Hướng dẫn</p>
        </div>
      </div>
      <div className={styles.tax_three}>
        <div className={styles.tax_three_ct_one}>
          <div className={styles.late_or_soon}>
            <div className={styles.cate_staff_one}>
              <div className={styles.cate_ct_one}>
                <h3>Nghỉ sai quy định</h3>
                <i>
                  Nghỉ không có đơn xin phép hoặc có đơn xin phép nhưng bị sếp
                  “hủy đơn”
                </i>
              </div>
              <div className={styles.cate_ct_tow}>
                <input
                  type="date"
                  className={styles.sl_date}
                  defaultValue={getCurrentDate()}
                  onChange={(e) => setSelectedDay(e.target.value)}
                />
              </div>
            </div>
            <p
              className={styles.open_nghi_phep}
              onClick={() => setIsCaiDatMucPhat(!CaiDatMucPhat)}
            >
              Cài đặt mức phạt
            </p>
            <div
              style={{ display: CaiDatMucPhat ? "block" : "none" }}
              className={styles.box_set_phat}
            >
              <div className={styles.box_pn}>
                <form>
                  <div className={styles.d_flex}>
                    <label htmlFor="">
                      {/* <input type="checkbox" />
                      <span className={styles.checkpay}>
                        <p></p>
                      </span>
                      <div className={styles.item_user}>
                        <div className={styles.takeleave_fn_1}>
                          <h4>Ca sáng</h4>
                          <p>Từ 08:00:00 - đến 11:30:00</p>
                        </div>
                      </div> */}

                      {allShift.map((item, index) => (
                        <div
                          className={styles.checkboxCaidatNghiPhep}
                          key={index}
                        >
                          <div
                            className={styles.checkboxCaidatNghiPhep_padding}
                          >
                            <Checkbox
                              className="nghi_phep_cai_dat_muc_phat"
                              value={item?.shift_id}
                              onChange={() =>
                                handleCheckboxChange(item?.shift_id)
                              }
                            >
                              <div className={styles.item_user}>
                                <div className={styles.takeleave_fn_1}>
                                  <h4>{item?.shift_name}</h4>
                                  <p>
                                    Từ {item?.start_time}-{item?.end_time}
                                  </p>
                                </div>
                              </div>
                            </Checkbox>
                          </div>
                        </div>
                      ))}
                    </label>
                  </div>
                </form>
              </div>
              <div className={styles.box_set_pn}>
                <div className={styles.form_group}>
                  <label htmlFor="">Nhập mức tiền phạt(VND)</label>
                  <input
                    type="number"
                    placeholder="Nhập số tiền phạt"
                    name="pc_money"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="">Chọn ngày bắt đầu áp dụng mức phạt</label>
                  <input
                    type="date"
                    defaultValue="2023-07-29"
                    name="pc_time"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <button type="button" name="add_pn" onClick={handleOkCaiDat}>
                  Áp dụng
                </button>
                <p>
                  Lưu ý: Mức phạt sẽ được áp dụng từ ngày được chọn, điều này có
                  thể ảnh hưởng đến kết quả tính lương của các tháng trước. Vui
                  lòng chắc chắn về mốc thời gian áp dụng mức phạt.
                </p>
              </div>
            </div>
            <div className={styles.take_leave_tb}>
              {/* Them table vao day nha */}
              <Table
                className="NghiPhep_2nd"
                dataSource={nghiSaiQuyDinh}
                columns={columns}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="Tien_Modal_NhomLamViec"
        style={{ display: "flex", flexDirection: "column" }}
        title="                "
        open={isModalOpenXemMucPhat}
        footer={null}
        onCancel={handleCancelXemMucPhat}
      >
        <div className={styles.modal_hd_tax_xemmucphat}>
          <div className={styles.modal_body_xemmucphat}>
            <div className={styles.cr_popup_tax_xemmucphat}>
              <div className={styles.describe_xemmucphat}>
                <p>Danh sách mức phạt qua từng thời điểm</p>
              </div>
              <table>
                <Table
                  className="Table_Modal_NghiPhep_XemMucPhat"
                  dataSource={nghiSaiQuyDinh}
                  columns={columnsXemMucPhat}
                />
              </table>
              <div className={styles.luu_y_modal_xemmucphat}>
                Lưu ý: Mức phạt sẽ áp dụng theo ngày được chọn, việc xóa mức
                phạt có thể ảnh hưởng đến kết quả tính lương của các tháng
                trước. Hãy chắc chắn về mốc phạt được áp dụng sau khi xóa.
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
