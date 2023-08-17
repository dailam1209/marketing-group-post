import styles from "./information.module.css";
import InforText from "./text_info";
import { UserOutlined, CheckCircleOutlined } from "@ant-design/icons";

const diaryEntries = [
  {
    time: "10:10 - 10/10/2020",
    content: "Nhóm khách hàng được cập nhật bởi",
    author: "Nguyễn Văn Nam",
  },
];

export default function GeneralRowInforText() {
  const emptyEntries = new Array(10).fill(null);

  return (
    <main>
      <div className={styles.table}>
        <div className={styles.table_title}>
          <h4>Thông tin chi tiết</h4>
        </div>
        <h2 className={styles.table_description}>Thông tin chung</h2>
        <div className={styles.row_input_text}>
          <InforText field="Mã tiềm năng:" value="123456" />
          <InforText field="Xưng hô:" value="" />
          <InforText field="Họ và đệm:" value="Nguyễn Thị" />
          <InforText field="Tên:" value="Hòa" />
          <InforText field="Họ và tên:" value="Nguyễn Thị Hòa" />
          <InforText field="Chức danh:" value="" />
          <InforText field="Phòng ban:" value="" />
          <InforText field="Điện thoại cơ quan:" value="" />
          <InforText field="Email cơ quan:" value="" />
          <InforText field="Điện thoại cá nhân:" value="" />
          <InforText field="Email cá nhân:" value="" />
          <InforText field="Mã số thuế:" value="" />
          <InforText field="Nguồn gốc:" value="" />
          <InforText field="Loại tiềm năng:" value="" />
          <InforText field="Mạng xã hội:" value="Zalo, Facebook" />
          <InforText field="Facebook:" link="12345.site.facebook.com" />
          <InforText field="Zalo:" value="0987654321" />
          <InforText
            field="Nhân viên phụ trách:"
            value="Nguyễn Văn Nam"
            icon={<UserOutlined />}
          />
        </div>

        <h2 className={styles.table_description}>Thông tin cá nhân</h2>
        <div className={styles.row_input_text}>
          <InforText field="Giới tính:" value="" />
          <InforText field="Ngày sinh:" value="" />
        </div>
        <h2 className={styles.table_description}>Thông tin tổ chức</h2>
        <div className={styles.row_input_text}>
          <InforText field="Tổ chức:" value="" />
          <InforText field="Tài khoản ngân hàng:" value="" />
          <InforText field="Mở tại ngân hàng:" value="" />
          <InforText field="Ngày thành lập:" value="" />
          <InforText field="Loại hình:" value="" />
          <InforText field="Lĩnh vực:" value="" />
          <InforText field="Ngành nghề:" value="" />
          <InforText field="Doanh thu:" value="" />
        </div>

        <h2 className={styles.table_description}>Thông tin địa chỉ</h2>
        <div className={styles.row_input_text}>
          <InforText field="Quốc gia:" value="Việt Nam" />
          <InforText field="Tỉnh/Thành phố:" value="Hà Nội" />
          <InforText field="Quận/Huyện:" value="Hoàng mai" />
          <InforText field="Phường/Xã:" value="Định công" />
          <InforText field="Số nhà, đường phố:" value="1 Trần Nguyên Đán" />
          <InforText field="Mã vùng:" value="" />
          <InforText
            field="Địa chỉ đơn hàng:"
            value="1 Trần Nguyên Đán, Định Công,Hoàng Mai, Hà Nội.1 Trần Nguyên Đán, Định Công,Hoàng Mai, Hà Nội"
          />
        </div>
        <div>
          <h2 className={styles.table_description}>Thông tin địa chỉ</h2>
          <div className={styles.custom_potential_input_text}>
            <InforText field="Mô tả:" value="" />
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.table_title}>
          <h4>Thông tin hệ thống</h4>
        </div>
        <div className={styles.row_input_text}>
          <InforText
            field="Người tạo:"
            value="Nguyễn Văn Nam"
            icon={<UserOutlined />}
          />
          <InforText field="Ngày tạo:" value="10:10 - 10/10/2022" />
          <InforText
            field="Người sửa:"
            value="Nguyễn Văn Nam"
            icon={<UserOutlined />}
          />
          <InforText field="Ngày sửa:" value="10:10 - 10/10/2022" />
          <div className={styles.custom_icon}>
            <InforText field="Dùng chung:" value={<CheckCircleOutlined />} />
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.table_title}>
          <h4>Nhật ký</h4>
        </div>
        <div className={styles.table_overflow}>
          {emptyEntries.map((_, index) => (
            <div className={styles.table_diary} key={index}>
              <h3>10:10 - 10/10/2020</h3>
              <p>
                Nhóm khách hàng được cập nhật bởi <span>Nguyễn Văn Nam</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
