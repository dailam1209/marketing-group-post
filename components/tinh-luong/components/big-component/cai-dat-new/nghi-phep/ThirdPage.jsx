import styles from "./ThirdPage.module.css";
import { Table, Modal, Checkbox } from "antd";
import { useState } from "react";
export default function ThirdPage({ handleSelected }) {
  const [CaiDatMucPhat, setIsCaiDatMucPhat] = useState(false);
  const [isModalOpenXemMucPhat, setIsModalOpenXemMucPhat] = useState(false);
  const showModalXemMucPhat = () => {
    // console.log("id của các loại nghỉ sai quy định : ", id);
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
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];
  const dataSourceXemMucPhat = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Ca làm việc",

      key: "name",
      width: "31,64%",
      render: () => (
        <div className={styles.takeleave_fn}>
          <h4>Ca sáng</h4>
          <p>Từ 08:00:00 - 11:30:00</p>
        </div>
      ),
    },
    {
      title: "Mức phạt đang áp dụng	",

      key: "age",
      width: "22.78%",
      render: () => (
        <div style={{ fontSize: "15px", lineHeight: "16px", color: "#68798b" }}>
          0VND/Ca
        </div>
      ),
    },
    {
      title: "Ngày bắt đầu áp dụng	",

      key: "address",
      width: "22.78%",
      render: () => <div className={styles.ngaybatdauapdung}>30-06-2023</div>,
    },
    {
      title: "",

      key: "address",
      width: "22.78%",
      render: () => (
        <div onClick={showModalXemMucPhat} className={styles.btn_modal_pn}>
          Xem Mức Phạt
        </div>
      ),
    },
  ];
  const columnsXemMucPhat = [
    {
      title: "Mức phạt",

      key: "name",
      width: "20%",
      render: () => <p className={styles.edit_mphat}> 50000 VNĐ</p>,
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
  return (
    <div>
      <div className={styles.tax_one}>
        <p className={styles.btn_new}>Tạo mới</p>
      </div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)}>Chính sách nghỉ phép</p>
          <p onClick={() => handleClick(2)}>Nghỉ sai quy định</p>
          <p onClick={() => handleClick(3)} className={styles.active}>
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
                <h3>Nghỉ vào ngày không được phép nghỉ</h3>
                <i>
                  Là trường hợp nhân viên có đơn xin nghỉ phép nhưng sếp không
                  duyệt và lệnh nhân viên không được nghỉ những ngày đó bắt buộc
                  phải đi làm vì các ngày đó công ty có việc trọng đại như ngày
                  hoàn thành dự án, ngày đối ngoại của công ty… Trường hợp này
                  nhân viên bắt buộc phải đi làm nếu cố ý nghỉ sẽ ảnh hưởng
                  nghiêm trọng đến hoạt động của công ty.
                </i>
              </div>
              <div className={styles.cate_ct_tow}>
                <input
                  type="date"
                  className={styles.sl_date}
                  defaultValue={getCurrentDate()}
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

                      {listDataCaiDatMucPhat.map((item, index) => (
                        <div
                          className={styles.checkboxCaidatNghiPhep}
                          key={index}
                        >
                          <div
                            className={styles.checkboxCaidatNghiPhep_padding}
                          >
                            <Checkbox className="nghi_phep_cai_dat_muc_phat">
                              <div className={styles.item_user}>
                                <div className={styles.takeleave_fn_1}>
                                  <h4>{item.Ca}</h4>
                                  <p>{item.ThoiGian}</p>
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
                  <input type="number" placeholder="Nhập số tiền phạt" />
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="">Chọn ngày bắt đầu áp dụng mức phạt</label>
                  <input type="date" defaultValue="2023-07-29" />
                </div>
                <button type="button" name="add_pn">
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
                dataSource={dataSource}
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
                  dataSource={dataSourceXemMucPhat}
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
