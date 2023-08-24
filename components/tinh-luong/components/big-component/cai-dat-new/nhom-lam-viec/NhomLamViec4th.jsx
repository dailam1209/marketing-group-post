import { useState } from "react";
import { Card, Button, Modal, Dropdown, Menu, Space } from "antd";
import styles from "./NhomLamViec4th.module.css";
export default function NhomLamViec4th({ selected1, handleSelected }) {
  const handleClick = (c) => {
    handleSelected(c);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className={styles.tax_one}>
        <p className={styles.btn_new} onClick={showModal}>
          Tạo mới
        </p>
      </div>
      <div className={styles.tax_tow}>
        <div className={styles.groupw_tow}>
          <p onClick={() => handleClick(1)}>Nhóm làm việc</p>
          <p onClick={() => handleClick(2)}>D/s nhân viên chưa nhóm</p>
          <p onClick={() => handleClick(3)}>D/s nhân viên các nhóm</p>
          <p onClick={() => handleClick(4)} className={styles.active}>
            Hướng dẫn
          </p>
        </div>
      </div>
      <div className={styles.tax_three}>
        <p>
          Để theo dõi các nhóm làm việc trong công ty một cách sát sao nhất thì
          bạn có thể lựa chọn chức năng “Nhóm làm việc” trong menu lựa chọn ở
          phần Cài đặt. Đây sẽ là công cụ giúp bạn cập nhật dữ liệu và thống kê
          chính xác về các nhóm làm việc cũng như số thành viên của mỗi nhóm ra
          sao.
        </p>
        <p style={{ fontWeight: "bold", width: "100%" }}>1. Nhóm làm việc</p>
        <p>
          Với việc tạo dữ liệu nhóm làm việc trong công ty, bạn sẽ tiến hành
          thao tác như sau:
        </p>
        <p>
          - Chọn “Tạo mới” nằm ở góc trên bên phải màn hình {">>"} popup điền
          thông tin sẽ hiển thị sau đó.
        </p>
        <p>
          - Điền thông tin theo biểu mẫu và chọn “Tạo nhóm” để cập nhật nhóm.
        </p>
        <div style={{ textAlign: "center" }}>
          <img src="/giao-dien-nhom-lam-viec.png" style={{}} />
          <p style={{ fontFamily: "Roboto" }}>Danh sách nhân viên chưa nhóm</p>
        </div>
        <p>
          Sau khi tạo nhóm thành công thì tên nhóm sẽ được hiển thị theo từng ô
          thông tin bên dưới. Lúc này, bạn sẽ cần tiến hành việc thêm thành viên
          cho nhóm làm việc. Để thêm thành viên, bạn sẽ có thể thao tác theo 2
          cách:
        </p>
        <p>- Cách 1:</p>
        <p>
          + Click “Thêm nhân viên” nằm ở cuối của nhóm làm việc với biểu tượng
          hình người. Hệ thống sẽ hiển thị popup chọn thành viên.
        </p>
        <p>
          + Bạn có thể tìm kiếm nhanh nhân viên muốn đưa vào nhóm bằng cách nhập
          tên vào thanh công cụ tìm kiếm được cài đặt bên trên danh sách nhân
          viên lựa chọn {">>"} click vào ô vuông trước tên nhân viên đó để biểu
          thị nhân viên này được lựa chọn {">>"} click “Chọn”. Các nhân viên
          được lựa chọn sẽ được thêm vào nhóm làm việc tương ứng thành công.
        </p>
        <p>- Cách 2:</p>
        <p>
          + Nhấp chuột vào biểu tượng dấu ba chấm nằm ở góc bên phải của ô thông
          tin nhóm làm việc {">>"} lựa chọn “Thêm thành viên” được hiển thị đầu
          tiên
          {">>"} popup lựa chọn thành viên cũng sẽ hiển thị như cách 1. Thao tác
          tương tự bạn như trên là bạn có thể thêm thành viên cho nhóm thành
          công.
        </p>
        <p>
          Mỗi một nhân viên sẽ không bị giới hạn trong việc tham gia vào nhiều
          nhóm làm việc khác nhau. Vì thế, khi thêm thành viên cho các nhóm làm
          việc đã tạo thì bạn có thể chọn trùng nhân viên.
        </p>
        <p>
          Nhóm làm việc sau khi được thêm thành viên thành công sẽ hiển thị
          thông tin tổng quát trong từng ô thông tin. Bao gồm tên nhóm, số thành
          viên bên dưới và mô tả về nhóm làm việc đó (có chức năng, ý nghĩa hay
          nhiệm vụ chính gì,....). Để xem chi tiết thành viên của một nhóm làm
          việc bất kỳ thì bạn chỉ cần nhấp chuột vào tên nhóm {">>"} các thành
          viên trong nhóm sẽ được hiển thị.
        </p>
        <p>
          Trong trường hợp bạn muốn sửa hay xóa nhóm thì sẽ thao tác như sau:
        </p>
        <p>
          - Chọn biểu tượng ba chấm ở góc bên phải ô thông tin của nhóm làm việc
          tương ứng.
        </p>
        <p>
          - Chọn “Chỉnh sửa” để thực hiện sửa thông tin nhóm (tên nhóm, mô tả)
          hoặc chọn “Xóa” để xóa nhóm làm việc đã thiết lập.
        </p>
        <p style={{ fontWeight: "bold", width: "100%" }}>
          2. Danh sách nhân viên chưa nhóm
        </p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <Modal
        className="Tien_Modal_NhomLamViec"
        style={{ display: "flex", flexDirection: "column" }}
        title="Thêm mới nhóm làm việc"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <div className={styles.modal_body}>
          <label className={styles.description}>Tên Nhóm</label>
          <input
            type="text"
            id="policy-name"
            placeholder="Nhập tên nhóm"
            className={styles.input}
          />

          <label className={styles.description}>Mô tả</label>
          <textarea
            id="policy-description"
            rows="5"
            placeholder="Nhập mô tả"
            className={styles.input}
          />

          <div>
            <Button className={styles.myBtn} type="primary" onClick={handleOk}>
              Tạo nhóm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
