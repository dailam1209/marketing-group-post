import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Table,
  Typography,
} from "antd";
import HeadNav from "../../../../components/tinh-luong/components/big-component/header-nav";
import HeadNavRes from "../../../../components/tinh-luong/components/big-component/head-nav-res";
import styles from "./Homepage.module.css";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import checkCookie from "../../../../components/tinh-luong/function/checkCookie";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { domain } from "../../../../components/tinh-luong/components/api/BaseApi";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const App = () => {
  checkCookie();

  const router = useRouter();
  const user_info = cookieCutter.get("userName");
  const token = cookieCutter.get("token_base365");
  const cp = cookieCutter.get("com_id");
  const ep_id = cookieCutter.get("userID");
  const role = cookieCutter.get("role");

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const cancel = () => {
    setEditingKey("");
  };

  const [apiData, setApiData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  useEffect(() => {
    fetchApiData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const fetchApiData = () => {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const start_date = startOfMonth.toISOString();
    const end_date = lastDayOfMonth.toISOString();

    axios
      .post(`${domain}/api/tinhluong/congty/list_em_no_job`, {
        token: token,
        id_com: cp,
        start_date: start_date,
        end_date: end_date,
      })
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  };

  // console.log(apiData?.data?.list_em_no_job)

  const countUserNoJob = apiData?.data?.list_em_no_job?.length;
  const getVietnameseMonthAndYear = (date) => {
    const monthsInVietnamese = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    const yearInVietnamese = "/";

    const month = monthsInVietnamese[date.getMonth()];
    const year = date.getFullYear();

    return `${month}${yearInVietnamese}${year} `;
  };
  const currentDate = new Date();
  const vietnameseMonthAndYear = getVietnameseMonthAndYear(currentDate);
  const prependImagePath = (path) => {
    return `/${path}`;
  };
  const columns = [
    {
      title: "Họ và tên",
      width: "30%",
      editable: true,
      render: (_, record) => (
        <div className={styles.render}>
          <div>
            <Image
              alt=""
              src={`/tinhluong${prependImagePath(record.avatarUser)}`}
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
              preview={true}
            />
          </div>
          <div>
            <p className={styles.p_style}>{record?.userName}</p>
            <p className={styles.text1}>ID : {record?._id}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      width: "23%",
      editable: true,
      render: (record) => (
        <>
          {record?.map((item) => {
            return <p className={styles.text1}> {item?.dep_name}</p>;
          })}
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: "10%",
      editable: true,
      render: (record) => <p className={styles.text1}>{record}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "10%",
      editable: true,
      render: (record) => <p className={styles.text1}>{record}</p>,
    },
  ];
  return (
    <div
      style={{
        width: "100%",
        flex: "1",
        background: " #F7F8FC",
        paddingBottom: "70px",
        minHeight: "100vh",
      }}
    >
      <HeadNav title="Trang chủ" />
      <div className={styles.customPagebig}>
        {/*p1*/}
        <div className={styles.Divbig}>
          <h3 className={styles.customH3big}>Tổng quan hệ thống</h3>
          <div className={styles.customDiv}>
            <Card style={{ width: 300, height: 130 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h4 className={`h4-page`}>{countUserNoJob} </h4>
                <p>
                  <span className={`span-1`}> Tài Khoản </span>
                  <span className={`span-2`}>{vietnameseMonthAndYear}</span>
                </p>
              </div>
            </Card>

            <div
              className={styles.customCard}
              style={{
                width: 300,
                height: 130,
                backgroundImage: `url('/tinhluong/anh1.png')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <a className={`a-page`}>
                <div>
                  <img
                    style={{
                      width: "81px",
                      height: "81px",
                      borderRadius: "15px",
                      objectFit: "cover",
                    }}
                    src="https://chamcong.24hpay.vn/upload/company/logo/2023/07/11/app1689059409_1.jpg"
                    alt={"anh cua anh"}
                  />
                </div>
                <div className={styles.text}>
                  <h4 className={`h4-1`}>Công ty cổ phần thanh toán hưng hà</h4>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/*p2*/}
        <div className={styles.Divbig}>
          <h3 className={styles.customH3big}>Hệ thống đề xuất</h3>
          <div className={styles.CustomDivBig} style={{ display: "flex" }}>
            <div className={styles.customDivHeader}>
              <div className={styles.customDiv1}>
                <h3 className={styles.customH3}>
                  <a
                    className={styles.customA}
                    href={"http://43.239.223.249:8021/cong-ty/phan-quyen"}
                  >
                    Phân quyền
                  </a>
                  <span>
                    <img
                      style={{ objectFit: "cover" }}
                      src="https://tinhluong.timviec365.vn/img/left_right.png"
                      alt={"anh o"}
                    />
                  </span>
                </h3>
                <div>
                  <p className={styles.customP}>
                    Phân quyền truy cập tài khoản công ty
                  </p>
                  <p className={styles.customP1}>Phân quyền theo cá nhân</p>
                </div>
              </div>
              <div className={styles.customDiv2}>
                <h3 className={styles.customH3}>
                  <a className={styles.customA}>Biểu mẫu đề xuất</a>
                  <span>
                    <img
                      style={{ objectFit: "cover" }}
                      src="https://tinhluong.timviec365.vn/img/left_right.png"
                      alt={"anh o"}
                    />
                  </span>
                </h3>
                <div>
                  <p className={styles.customP}>Quản lí mẫu đề xuất</p>
                  <p className={styles.customP1}>Thiết lập mẫu biểu xuất mới</p>
                </div>
              </div>
              <div className={styles.customDiv1}>
                <h3 className={styles.customH3}>
                  <a className={styles.customA}>Bảng lương</a>
                  <span>
                    <img
                      style={{ objectFit: "cover" }}
                      src="https://tinhluong.timviec365.vn/img/left_right.png"
                      alt={"anh o"}
                    />
                  </span>
                </h3>
                <div>
                  <p className={styles.customP}>Bảng lương nhân viên</p>
                  <p className={styles.customP1}>
                    Quản lý chung mức phạt, thưởng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*p3*/}
        <div className={styles.Divbig}>
          <h3 className={styles.customH3big}>
            Danh sách nhân viên chưa thiết lập lịch làm việc
          </h3>
          <Form form={form} component={false}>
            <Table
              className={`tablePage`}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={apiData?.data?.list_em_no_job}
              columns={columns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </div>
        {/*p4*/}
        <div className={styles.ov_offer_ct} style={{ padding: "20px" }}>
          <div className={styles.ov_offer_one_ct11}>
            <p>
              <span>
                <span>
                  Nếu doanh nghiệp bạn đang gặp nhiều bất cập trong quá trình
                  tính lương cho nhân viên tại sao không lựa chọn giải pháp Tính
                  lương tự động theo cơ chế chuyển đổi số?
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Những mong muốn làm sao để tính lương dễ hơn, nhanh hơn và để
                  đỡ vất vả, tránh sai sót sẽ được tinhluong.timviec365.vn hỗ
                  trợ giúp bạn tối ưu hóa quá trình tính lương thủ công. Làm
                  theo các bước đơn giản dưới đây để nhanh chóng nhận được sự hỗ
                  trợ tốt nhất cho khâu tính lương hàng tháng đỡ cực nhọc nhé.
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>
                  Bước 1: Cài đặt cấu hình chấm công, cài đặt danh sách nhân
                  viên công ty
                </span>
              </span>
            </h2>
            <span className={styles.ov_offer_one_ct11_span}>
              Ở bước này, người thiết lập có 2 nhiệm vụ chính phải thực hiện:
            </span>
            <h3 className={styles.ov_offer_one_ct11_h3}>
              <span className={styles.ov_offer_one_ct11_span1}>
                <span className={styles.ov_offer_one_ct11_span_span}>
                  1. Cài đặt tài khoản công ty:
                </span>
              </span>
            </h3>
            <p>
              <span>
                <span>
                  - Đầu tiên bạn truy cập vào đường link chính của phần mềm:
                  <a
                    href="https://tinhluong.timviec365.vn/ "
                    style={{ color: "-webkit-link", alignItems: "12px" }}
                  >
                    https://tinhluong.timviec365.vn/
                  </a>
                </span>
              </span>
            </p>
            <p className={styles.ov_offer_one_ct11_p}>
              <span>
                <span>
                  - Click{" "}
                  <span style={{ fontStyle: "italic", whiteSpace: "pre-wrap" }}>
                    {" "}
                    Đăng ký{" "}
                  </span>{" "}
                  chọn{" "}
                  <span style={{ fontWeight: 700, whiteSpace: "pre-wrap" }}>
                    {" "}
                    Công ty
                  </span>{" "}
                  để đáp ứng đúng mục đích đăng ký tài khoản tính lương cho công
                  ty bạn.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Tiếp theo, tiến hành các bước đăng ký tài khoản công ty.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Bước 1: Điền đầy đủ thông tin trong bảng đăng ký bao gồm:
                  Tên công ty, Số điện thoại, Email, mật khẩu, địa chỉ công ty.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Bước 2: Nhận mã OTP được gửi về địa chỉ email đăng ký tài
                  khoản ở bước 1. Điền đúng mã vào phần xác thực mã OTP.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Bước 3: Cài đặt danh sách nhân viên công ty.</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Tại giao diện{" "}
                  <span className={styles.spanBig}>
                    Thêm nhân viên đầu tiên
                  </span>
                  , cho phép đăng ký tài khoản nhân viên đầu tiên được phần
                  quyền quản trị.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Lưu ý: phần này không bắt buộc nên có thể nhấn vào lệnh{" "}
                  <span className={styles.spanBig}>Bỏ qua</span> nếu không có
                  nhu cầu phân quyền cho bất kỳ nhân viên nào, còn nếu phân
                  quyền admin cho ai đó, bạn cũng sẽ điền thông tin để đăng ký
                  tài khoản cho nhân viên được phân quyền gồm Họ và tên, số điện
                  thoại, email, địa chỉ nơi ở, mật khẩu.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Như vậy, qua 3 bước trên, bạn đã hoàn thành thiết lập tài
                  khoản công ty, có thể sử dụng để hỗ trợ bạn thực hiện mọi thao
                  tác chuyển đổi số, trong đó có mục đích tính lương của bạn.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Để tính lương, bạn chú ý đọc kỹ những hướng dẫn tiếp theo.
                  Điều kiện tiên quyết để tính được lương bằng phần mềm này đó
                  chính là có tài khoản chấm công của nhân viên công ty. Những
                  hướng dẫn bên dưới sẽ giúp bạn nhanh chóng giải quyết vấn đề
                  này.
                </span>
              </span>
            </p>
            <h3 className={styles.ov_offer_one_ct11_h3}>
              <span className={styles.ov_offer_one_ct11_span1}>
                <span className={styles.ov_offer_one_ct11_span_span}>
                  2. Cài đặt cấu hình chấm công
                </span>
              </span>
            </h3>
            <p>
              <span>
                <span>
                  Chấm công là cơ sở đầu vào để hệ thống có thể lấy dữ liệu phục
                  vụ việc tính lương. Do đó, trước tiên công ty bạn cần thực
                  hiện một vài thao tác cài đặt tại page chấm công trước khi
                  tiến hành thiết lập các vấn đề về tính lương.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  Hướng dẫn thực hiện chi tiết:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Truy cập page chấm công tại đường dẫn:</span>
              </span>
            </p>
            <p>
              <span>
                <span>https://chamcong.timviec365.vn/quan-ly-cong-ty.html</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn
                  <span className={styles.spanBigN}>
                    {" "}
                    Cấu hình chấm công
                  </span>{" "}
                  để chọn hình thức chấm công cho công ty bạn.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  {" "}
                  Có 3 sự lựa chọn về hình thức áp dụng chấm công, bạn có thể
                  chọn một trong ba hoặc đồng thời áp dụng tất cả.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  src="https://timviec365.vn/pictures/images_01_2022/cau-hinh-cham-cong.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Cấu hình chấm công
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  + Chấm công trên app: bạn có thể tải app của
                  chamcong.timviec365.vn hoặc app PC365 tại cửa hàng ứng dụng
                  trên điện thoại về máy. App sử dụng được cho cả hệ điều hành
                  Android và iOS.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chấm công trên website: có thể cài chế độ chấm công bằng tài
                  khoản nhân viên hoặc chấm công bằng tài khoản công ty. Có thể
                  mở IP hoặc giới hạn IP, chỉ cho phép nhân viên được chấm công
                  bằng địa chỉ IP nhất định để dễ kiểm soát.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chấm công bằng mã QR: Để thiết lập mã QR, bạn sẽ phải thiết
                  lập cài đặt để áp dụng. Các thiết lập này bao gồm: thêm vị
                  trí, giới hạn bán kính chấm công. Sau khi ghim cài đặt này,
                  tọa độ chấm công và mã QR được xác định. Bạn hướng dẫn nhân
                  viên quét mã QRCode để được chấm công.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Đến đây, cấu hình chấm công đã được thiết lập để đưa vào sử
                  dụng chấm công trong thực tế. Nhiệm vụ tiếp theo cần làm là
                  cài đặt tài khoản chấm công cho nhân viên{" "}
                </span>
              </span>
            </p>
            <h3 className={styles.ov_offer_one_ct11_h3}>
              <span className={styles.ov_offer_one_ct11_span1}>
                <span className={styles.ov_offer_one_ct11_span_span}>
                  3. Cài đặt tài khoản chấm công và danh sách nhân viên công ty
                </span>
              </span>
            </h3>
            <p>
              <span>
                <span>
                  {" "}
                  <span className={styles.spanBig}>* Cách 1</span>: Nhân viên tự
                  đăng ký tài khoản chấm công cho mình
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Bạn cần gửi ID công ty cho nhân viên.</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Hướng dẫn nhân viên truy cập page:
                  https://chamcong.timviec365.vn/, thực hiện đăng ký tài khoản
                  nhân viên theo hướng dẫn của hệ thống.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Mỗi một tài khoản được đăng ký thành công sẽ tự động xuất hiện
                  trong danh sách
                  <span className={styles.spanBigN}>
                    {" "}
                    Quản lý nhân viên
                  </span>{" "}
                  thuộc tài khoản công ty. Người quản trị sẽ duyệt các tài khoản
                  này để tiếp nhận tài khoản được chấm công và tính lương.{" "}
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "392px", aspectRatio: "auto 800/392" }}
                  src="https://timviec365.vn/pictures/images_01_2022/cai-dat-danh-sach-nhan-vien-2.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  ID công ty nằm ở ngay bên dưới tên công ty
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  {" "}
                  <span className={styles.spanBig}>* Cách 2</span>: Tạo tài
                  khoản cho nhân viên
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Bạn/Người quản trị sẽ tạo tài khoản cho từng nhân viên bằng
                  tài khoản công ty (cách này thường được áp dụng với công ty ít
                  nhân sự).{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Truy cập đường dẫn{" "}
                  <a
                    href="https://chamcong.timviec365.vn/quan-ly-cong-ty.html"
                    className={styles.customa}
                  >
                    https://chamcong.timviec365.vn/quan-ly-cong-ty.html
                  </a>{" "}
                  , đăng nhập tài khoản công ty vừa tạo được.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn mục{" "}
                  <span className={styles.spanBig}>Quản lý nhân viên</span> đến{" "}
                  <span className={styles.spanBig}>Thêm nhân viên</span>{" "}
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "392px", aspectRatio: "auto 800/392" }}
                  src="https://timviec365.vn/pictures/images_01_2022/them-nhan-vien-3.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Tạo tài khoản cho nhân viên
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>- Điền thông tin theo yêu cầu ở bảng đăng ký.</span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "597px", aspectRatio: "auto 882 / 597" }}
                  src="https://timviec365.vn/pictures/images_01_2022/dang-ky-nhan-vien-4.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Điền thông tin theo yêu cầu ở bảng đăng ký
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  Hoàn tất thiết lập tài khoản chấm công nhân viên và danh sách
                  nhân viên. Các tài khoản nhân viên được lập từ tài khoản công
                  ty thì không cần duyệt. Bạn có thể chuyển sang cài đặt tính
                  lương cho nhân viên.
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 2: Nhập lương cơ bản và chế độ</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  <span className={styles.spanBig}>2 cách thực hiện:</span>
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  <span className={styles.spanBigN}>
                    Cách 1: Nhập trực tiếp
                  </span>
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  <span className={styles.spanBigN}>
                    Cách 2: xuất file mẫu và add file
                  </span>
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Để sử dụng phần mềm tính lương từ page Chấm công bạn đang thao
                  tác, tại thanh Menu phía bên trái màn hình, bạn chọn vào danh
                  mục Chuyển đổi số, chọn{" "}
                  <span className={styles.spanBig}>Tính lương</span>.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBig}>Hoặc:</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Truy cập theo đường dẫn:{" "}
                  <a
                    href="https://tinhluong.timviec365.vn/quan-ly-nhan-su.html"
                    className={styles.customa}
                  >
                    {" "}
                    https://tinhluong.timviec365.vn/quan-ly-nhan-su.html
                  </a>{" "}
                </span>
              </span>
            </p>
            <h3 className={styles.ov_offer_one_ct11_h3}>
              <span>
                <span style={{ fontWeight: "700px", whiteSpace: "pre-wrap" }}>
                  1. Cách 1: Nhập trực tiếp lương cơ bản{" "}
                </span>
              </span>
            </h3>
            <p>
              <span>
                <span>
                  - Chọn mục{" "}
                  <span className={styles.spanBigN}>
                    Nhập lương cơ bản & Chế độ
                  </span>
                  , giao diện dẫn bạn sang Danh sách nhân viên.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Nhấp chuột vào tên nhân viên để chuyển tới phần thiết lập
                  chi tiết.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Hoàn thiện thiết lập cho 2 phần:{" "}
                  <span className={styles.spanBig}>
                    Lương cơ bản, Hợp đồng làm việc
                  </span>{" "}
                  . Trong đó:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  (*) Thiết lập Lương cơ bản:{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn <span className={styles.spanBigN}>Thêm lương</span> để
                  hiển thị bảng nội dung nhập lương
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Điền 2 nội dung bắt buộc:{" "}
                  <span className={styles.spanBigN}>Lương cơ bản</span> cần nhập
                  số lương trả cho nhân viên,{" "}
                  <span className={styles.spanBigN}>Thời gian áp dụng</span> cần
                  ghi đúng thời gian số tiền lương này bắt được được trả.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Ngoài ra có thể điền vào các mục: Lương đóng bảo hiểm, Phụ
                  cấp đóng bảo hiểm, Lý do về mức lương được trả, Căn cứ quyết
                  định.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "541px", aspectRatio: "auto 800 / 541" }}
                  src="https://timviec365.vn/pictures/images_01_2022/dang-ky-nhan-vien-4(1).png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Hai nội dung bắt buộc khi thêm lương
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  (*) Thiết lập Hợp đồng làm việc
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn <span className={styles.spanBigN}>Thêm</span> hợp đồng
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Điền đầy đủ thông tin của loại hợp đồng cần áp dụng: Tên hợp
                  đồng, ngày ký chính xác, % lương.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Hệ thống tính lương ghi nhận thông tin đã được cài đặt ở 2 mục
                  này để tính lương đúng theo phần trăm áp dụng của Hợp đồng.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  Ví dụ bạn cần thiết lập hợp đồng thử việc cho nhân viên với
                  mức lương được hưởng theo hợp đồng là 85%, ký kết bắt đầu từ
                  ngày 01/01/2022, khi đó hệ thống tính lương sẽ căn cứ vào mức
                  lương cơ bản đã được nhập ở bước Thêm lương cơ bản để tính ra
                  85% số tiền lương nhân viên này được nhận và trả vào cuối thời
                  trong thời gian ký hợp đồng thử việc.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  Thông tin cần nhập như sau:
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "445px", aspectRatio: "auto 1065 / 445" }}
                  src="https://timviec365.vn/pictures/images_01_2022/them-hop-dong-6.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Cần thiết để Thêm hợp đồng giúp việc tính lương chính xác
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  {" "}
                  <span className={styles.spanBigN}>Lưu ý</span> : Nếu không
                  thiết lập hợp đồng thì mặc định nhân viên sẽ ở trạng thái
                  hưởng 100% lương cơ bản.{" "}
                </span>
              </span>
            </p>
            <h3 className={styles.ov_offer_one_ct11_h3}>
              <span>
                <span style={{ fontWeight: "700px", whiteSpace: "pre-wrap" }}>
                  2. Cách 2: Xuất file lương mẫu và add file
                </span>
              </span>
            </h3>
            <p>
              <span>
                <span>
                  Nhập lương thủ công sẽ khiến bạn mất nhiều thời gian cho các
                  thao tác, nhất là khi công ty có nhiều nhân sự. Vậy nên, có
                  thể chọn cách thứ hai để nhập một lần áp dụng cho tất cả danh
                  sách nhân viên trên hệ thống.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Tại mục{" "}
                  <span className={styles.spanBigN}>
                    Nhập lương cơ bản & Chế độ
                  </span>{" "}
                  , bạn chọn vào lệnh{" "}
                  <span className={styles.spanBig}>Nhập lương cơ bản</span>.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Tải file lương cơ bản theo mẫu có sẵn</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Nhập lương cơ bản của các nhân viên vào file theo mẫu{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Add lương cơ bản theo mẫu đã được nhập đầy đủ dữ liệu lên
                  phần mềm, hệ thống sẽ tự động ghi nhận toàn bộ thông tin lương
                  cơ bản của từng nhân viên đã được nhập trong file mẫu excel
                  vào hệ thống quản lý lương tại phần mềm.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Nhấn <span className={styles.spanBigN}>Tải lên</span> để kết
                  thúc.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "454px", aspectRatio: " auto 800 / 454" }}
                  src="https://timviec365.vn/pictures/images_01_2022/xuat-file-luong-7.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Xuất file lương mẫu và add file
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  - Sau đó, với mỗi nhân viên đang làm việc theo các chế độ hợp
                  đồng riêng, không trong diện hưởng hợp đồng 100% lương cơ bản
                  thì bạn chọn vào nhân viên đó để điều chỉnh thông tin hợp đồng
                  áp dụng theo hướng dẫn thêm hợp đồng ở phía trên.
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 3: Cài đặt lịch làm việc, ca làm việc</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  Setup lịch và ca làm việc tức là đặt lịch làm việc cho các
                  ngày công ty bạn phải đi làm. Đây cũng là điều kiện bắt buộc
                  để lập số ngày tính lương theo tháng trên hệ thống Tính lương.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Từ page Tính lương, bạn chọn danh mục Cài ca & lịch làm việc
                  trong phần Cài đặt tại thanh menu bên trái màn hình. Các bước
                  tiến hành sau sẽ là quy trình thiết lập ca và lịch làm việc
                  cho công ty bạn.
                </span>
              </span>
            </p>
            <h3 className={styles.ov_offer_one_ct11_h3}>
              <span>
                <span style={{ fontWeight: "700px", whiteSpace: "pre-wrap" }}>
                  1. Cài đặt Ca làm việc
                </span>
              </span>
            </h3>
            <p>
              <span>
                <span>
                  - Chọn <span className={styles.spanBig}>Ca làm việc</span> đến{" "}
                  <span className={styles.spanBig}>Thêm ca</span>{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Tạo ra các ca làm việc theo hình thức áp dụng của công ty
                  bạn. Ví dụ: ca sáng, ca chiều, ca tối. Theo đó, bạn lần lượt
                  tạo thiết lập cho từng ca với thời gian vào ca và thời gian
                  kết thúc.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Điền thông tin vào bảng thiết lập ca: </span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Nhập tên ca làm việc</span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Nhập giời vào ca và kết thúc ca</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Cài đặt giới hạn thời gian (không bắt buộc). Phần này ghi
                  nhận check in (sớm nhất) - check out (muộn nhất) có nghĩa là
                  thời gian công ty cho phép việc chấm công vào và ra ca của
                  nhân viên được ghi nhận. Ngoài thời gian cài đặt này thì việc
                  chấm công không được ghi nhận.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  {" "}
                  <span className={styles.spanBig}> Ví dụ</span>:{" "}
                  <span className={styles.spanBigN}>
                    Cài đặt giới hạn thời gian cho ca sáng, nếu thời gian check
                    in sớm nhất là 7h sáng mà nhân viên chấm trước 7h sáng thì
                    sẽ không được ghi nhận công; nếu thời gian check out muộn
                    nhất của ca sáng là 12h30p mà nhân viên chấm sau 12h30p thì
                    hệ thống chấm công và tính lương cũng sẽ không ghi nhận
                  </span>
                  .
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn một loại hình tính công mà công ty đang áp dụng: Tính
                  công theo giờ, Tính công theo ca, Tính công theo tiền.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn <span className={styles.spanBigN}>Thêm ca</span> để kết
                  thúc cài đặt cho một ca{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Các ca làm việc khác của công ty cũng thiết lập tương tự quy
                  trình trên.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "675px", aspectRatio: " auto 800 / 675" }}
                  src="https://timviec365.vn/pictures/images_01_2022/them-ca-lam-viec-8.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Thêm ca làm việc rất đơn giản
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  Sau khi đã thiết lập đủ tất cả các ca làm việc đang được công
                  ty áp dụng, bạn cần tiếp tục thiết lập lịch làm việc.{" "}
                </span>
              </span>
            </p>
            <h3 className={styles.ov_offer_one_ct11_h3}>
              <span>
                <span
                  style={{
                    fontWeight: "700px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  2. Cài đặt lịch làm việc
                </span>
              </span>
            </h3>
            <h4 className={styles.ov_offer_one_ct11_h4}>
              <span>
                <span
                  style={{
                    fontWeight: "700px",
                    fontStyle: "italic",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  2.1. Setup lịch như thế nào?
                </span>
              </span>
            </h4>
            <p>
              <span>
                <span>
                  - Chọn danh mục{" "}
                  <span className={styles.spanBigN}>Lịch làm việc</span>
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Cách 1: Bạn đang ở giao diện thiết lập Ca làm việc tại Page
                  Chấm công, từ thanh menu bên trái màn hình, chọn danh mục{" "}
                  <span className={styles.spanBigN}>Lịch làm việc</span> để hệ
                  thống dẫn bạn đến mục{" "}
                  <span className={styles.spanBigN}>Lịch làm việc</span> trong
                  phần{" "}
                  <span className={styles.spanBigN}>
                    Cài đặt ca và Lịch làm việc
                  </span>
                  .
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Cách 2: Tại danh mục{" "}
                  <span className={styles.spanBigN}>
                    Cài đặt ca & Lịch làm việc
                  </span>{" "}
                  ban đầu, chọn mục{" "}
                  <span className={styles.spanBig}>Lịch làm việc</span>.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn <span className={styles.spanBig}>Thêm lịch</span> ở góc
                  phải màn hình.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "376px", aspectRatio: " auto 800 / 376" }}
                  src="https://timviec365.vn/pictures/images_01_2022/them-lich-lam-viec-8.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Chọn mục Thêm lịch làm việc
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  - Bảng popup hiển thị cho phép bạn cài đặt các dữ liệu như
                  sau:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span style={{ marginTop: "10px" }}>
                  + Viết tên lịch làm việc. Ví dụ:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Lịch làm việc theo ca hành chính</span>
              </span>
            </p>
            <p>
              <span>
                <span>- Lịch làm việc part time</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn lịch làm việc: Công ty bạn áp dụng lịch làm việc với
                  thời gian thế nào thì nhấn chọn vào một trong ba đề xuất: Thứ
                  2 - Thứ 6, Thứ 2 - Thứ 7, Thứ 2 - Chủ nhật.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Chọn tháng áp dụng cho lịch làm việc</span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Chọn ngày bắt đầu áp dụng lịch này.</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Nhấn lệnh{" "}
                  <span className={styles.spanBigN}>
                    Tiếp tục để Chọn ca làm việc: Lịch setup này bạn cần áp dụng
                    cho ca nào thì tích chọn vào ca đó.{" "}
                  </span>
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn <span className={styles.spanBigN}>Tiếp tục</span> để
                  kết thúc. Đồng nghĩa lịch làm việc tính theo 1 tháng đã được
                  thiết lập.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Sau bước này, bạn cần tạo chu kỳ áp dụng cho lịch vừa thiết
                  lập.{" "}
                </span>
              </span>
            </p>
            <h4 className={styles.ov_offer_one_ct11_h4}>
              <span>
                <span
                  style={{
                    fontWeight: "700px",
                    fontStyle: "italic",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  2.2. Tạo chu kỳ cho lịch làm việc
                </span>
              </span>
            </h4>
            <p>
              <span>
                <span>
                  Ở giao diện của mục Lịch làm việc, các lịch đã được thiết lập,
                  bạn cần tạo chu kỳ cho từng lịch này bằng các bước sau:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Bước 1: Chọn lịch cần tạo, nhấn vào dấu 3 chấm ở góc phải
                  của ô thông tin lịch làm việc
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Bước 2: Chọn Chỉnh sửa đến xuất hiện bảng Chu kỳ lịch làm
                  việc.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Các thiết lập có sẵn gồm lịch làm việc cho một tháng và toàn
                  bộ các ca làm việc được thiết lập. Nhiệm vụ của bạn là thiết
                  lập các ca làm việc cho từng ngày trong lịch làm việc.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Bước 3: Tích chọn vào ngày sau đó tích chọn vào ca để thiết
                  lập ca làm việc tương ứng cho mỗi ngày. Setup chu kỳ tương tự
                  cho từng ngày trong tháng.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Bước 4: Nhấn lệnh{" "}
                  <span className={styles.spanBigN}>Lưu lại</span>
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Ví dụ chọn vào ngày mùng 3, chọn 2 ca làm việc cho ngày mùng 3
                  là ca sáng và ca chiều.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "617px", aspectRatio: " auto 592  / 617" }}
                  src="https://timviec365.vn/pictures/images_01_2022/chon-lich-10.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Tạo chu kỳ cho lịch làm việc
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  Như vậy, lịch làm việc theo tháng đã được hiển thị với các ca
                  được thiết lập mặc định. Tuy nhiên có một số trường hợp đặc
                  biệt vì có lịch làm việc riêng bạn cũng cần lưu ý trong khi
                  tạo chu kỳ.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span
                  className={styles.spanBig}
                  style={{
                    fontWeight: "700px",
                    fontStyle: "italic",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  * Lưu ý về thiết lập lịch làm việc cho một số trường hợp đặc
                  biệt:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>(+) Trường hợp 1: </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Nếu bạn cần thiết lập ca làm việc cho nhân viên kinh doanh,
                  thông thường phải làm cả ca tối thì sẽ chọn vào ngày cần sắp
                  lịch ca tối cho nhân viên sau đó tích chọn vào mục{" "}
                  <span className={styles.spanBigN}>Ca làm việc tối</span> và
                  nhấn <span className={styles.spanBigN}>Tạo chu kỳ</span> để áp
                  dụng.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "606px", aspectRatio: " auto 771 / 606" }}
                  src="https://timviec365.vn/pictures/images_01_2022/chon-ca-11.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Trường hợp 1
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>(+) Trường hợp 2:</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Khi công ty bạn làm việc từ thứ hai đến sáng thứ 7, hệ thống
                  vốn dĩ mặc định ca làm việc của bạn đã được thiết lập từ thứ 2
                  đến thứ 7 theo chế độ 2 ca. Để tránh việc chiều thứ 7 được
                  nghỉ nhưng vẫn bị setup ca thì bạn thực hiện tạo chu kỳ cho
                  mọi thứ 7 trong tháng đó như sau:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn các ngày thứ 7 trong tháng để cài đặt ca làm việc sáng
                  trong bảng lịch tháng đã setup. Sau đó tích chọn vào{" "}
                  <span className={styles.spanBigN}>Ca làm việc sáng</span> ở
                  phần chọn ca phía dưới và chỉ chọn vào ca này, không chọn bất
                  kỳ ca nào khác thì bảng setup lịch làm việc tháng cho nhân
                  viên sẽ được ghi nhận là làm từ thứ 2 đến hết sáng thứ 7.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Nhấn <span className={styles.spanBigN}>Tạo chu kỳ</span> đề
                  lưu lại cài đặt.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Nhìn chung, mặc dù gọi là trường hợp đặc biệt thế nhưng cách
                  thiết lập cũng rất đơn giản.
                </span>
              </span>
            </p>
            <h4 className={styles.ov_offer_one_ct11_h4}>
              <span>
                <span
                  style={{
                    fontWeight: "700px",
                    fontStyle: "italic",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  2.3. Thêm danh sách nhân viên vào lịch làm việc
                </span>
              </span>
            </h4>
            <p>
              <span>
                <span>
                  - Chọn lịch cần thêm danh sách nhân viên đến nhấn vào dấu ba
                  chấm ở góc phải của lịch
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn <span className={styles.spanBigN}>Thêm nhân viên</span>{" "}
                  : có thể tích chọn từng nhân viên hoặc add file nhân viên có
                  chung lịch theo file mẫu.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "342px", aspectRatio: " auto 800 / 342" }}
                  src="https://timviec365.vn/pictures/images_01_2022/them-nhan-vien-12.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Nhấn Thêm nhân viên để setup nhân viên vào lịch làm việc
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>Lưu ý:</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Với các nhân viên được thêm vào lịch làm việc cố định thì sẽ
                  không thể tạo thêm bất cứ lịch nào khác cho từng cá nhân, có
                  nghĩa là 1 nhân viên chỉ có thể ở trong 1 lịch làm việc.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Đồng thời, nếu nhân viên không được add vào lịch nào thì có
                  nghĩa là nhân viên đó sẽ được hệ thống ghi nhận là không có
                  lịch làm việc nên việc chấm công, tính lương không được ghi
                  nhận. Vậy nên việc đưa tất cả nhân viên vào đúng các lịch làm
                  việc theo sự sắp xếp của công ty rất quan trọng.{" "}
                </span>
              </span>
            </p>
            <h4 className={styles.ov_offer_one_ct11_h4}>
              <span>
                <span
                  style={{
                    fontWeight: "700px",
                    fontStyle: "italic",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  2.4. Cách nhân lịch làm việc cho các tháng
                </span>
              </span>
            </h4>
            <p>
              <span>
                <span>
                  - Nhân lịch làm việc là nhân lịch làm việc đã setup của một
                  tháng cho nhiều tháng. Nếu lịch một tháng đó là lịch được thực
                  hiện cố định trong mọi tháng thì bạn nên nhân lịch làm việc để
                  giảm thao tác phải thiết lập lịch và ca làm việc cho từng
                  tháng.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Để nhân lịch, ở giao diện{" "}
                  <span className={styles.spanBigN}>Lịch làm việc</span> , chọn{" "}
                  <span className={styles.spanBigN}>Sao chép lịch</span> ở góc
                  phải màn hình để bảng cài đặt xuất hiện.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Tiếp tục chọn tháng cần áp dụng lịch làm việc.</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Tích chọn vào lịch làm việc đã có để áp dụng cho tháng cần
                  sao chép.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Nhấn lệnh{" "}
                  <span className={styles.spanBigN}>Sao chép lịch </span> và hệ
                  thống sẽ sao chép lại toàn bộ dữ liệu cho tháng áp dụng.{" "}
                </span>
              </span>
            </p>
            <h3 className={styles.ov_offer_one_ct11_h3}>
              <span>
                <span style={{ fontWeight: "700px", whiteSpace: "pre-wrap" }}>
                  3. Cài đặt công chuẩn
                </span>
              </span>
            </h3>
            <p>
              <span>
                <span>
                  Là cài đặt số ngày công tiêu chuẩn để tính lương cho toàn bộ
                  nhân viên công ty trong một tháng.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Mỗi tháng có số công chuẩn không giống nhau hoàn toàn. Do đó
                  bạn cần xem lịch trước khi nhập để nắm rõ có bao nhiêu ngày
                  công đi làm tại tháng cần nhập. Sau đó, thực hiện cài đặt công
                  chuẩn như sau:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Nhấn vào phần{" "}
                  <span className={styles.spanBig}>Cài đặt công chuẩn</span> ở
                  danh mục{" "}
                  <span className={styles.spanBigN}>
                    Cài ca & Lịch làm việc
                  </span>{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Tại thanh công cụ tìm kiếm, bạn chọn tháng và năm cần cài
                  đặt. Hệ thống sẽ hiển thị bảng dữ liệu cài đặt Công chuẩn
                  tháng (...) ở màn hình chính.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "271px", aspectRatio: " auto 800 / 271" }}
                  src="https://timviec365.vn/pictures/images_01_2022/cai-ca-lam-viec-13.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Cài đặt công chuẩn
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  - Nhập số công chuẩn của tháng đó vào ô bên dưới mô tả. Lưu ý
                  định dạng nhập sẽ là số nguyên dương hoặc số thập phân.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  {" "}
                  <span className={styles.spanBig}>Ví dụ</span>: Bạn cần nhập
                  công chuẩn cho tháng 1/2022, số công chuẩn đi làm từ thứ 2 đến
                  thứ 7 từ ngày 01/01/2022 đến hết ngày 31/01/2022 là 26 công.
                  Vậy bạn nhập vào con số 26 và hệ thống tính lương sẽ mặc định
                  số lương cơ bản được chia cho 26 công.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Lặp lại các thao tác đơn giản này cho từng tháng để hệ thống
                  có thể tính được lương cho nhân viên theo các dữ liệu đã được
                  thiết lập chính xác trong danh mục Ca và lịch làm việc.
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 4: Cài đặt đề xuất</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  Liên quan đến hệ thống tính lương, phần này người quản trị sẽ
                  cài đặt đề xuất về thời gian nộp đơn xin nghỉ phép có kế hoạch
                  và xin nghỉ phép đột xuất để quy định về việc cần thiết tạo đề
                  xuất xin nghỉ. Nó có ảnh hưởng mật thiết đến hệ thống tính
                  lương:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Có đề xuất xin nghỉ được ghi nhận, phần mềm tự động trừ tiền
                  lương cơ bản của nhân viên vào ngày nghỉ và không phạt tiền
                  lương vì nghỉ sai quy định.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span
                  className={styles.spanBig}
                  style={{
                    fontWeight: "700px",
                    fontStyle: "italic",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  * Cách thực hiện như sau:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Tại giao diện tính lương, lựa chọn danh mục{" "}
                  <span
                    className={styles.spanBig}
                    style={{
                      fontWeight: "700px",
                      fontStyle: "italic",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Chuyển đổi số
                  </span>{" "}
                  đến{" "}
                  <span
                    className={styles.spanBig}
                    style={{
                      fontWeight: "700px",
                      fontStyle: "italic",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    Văn thư lưu trữ
                  </span>
                  .
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "392px", aspectRatio: " auto 800 / 392 " }}
                  src="https://timviec365.vn/pictures/images_01_2022/quan-ly-de-xuat-13.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Cài đặt đề xuất
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  - Hệ thống chuyển thao tác của bạn sang page Văn thư lưu trữ,
                  tại đây, chọn vào phần{" "}
                  <span className={styles.spanBigN}>Đề xuất</span> đến{" "}
                  <span className={styles.spanBigN}>Cài đặt</span>.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- 3 mục cần thiết lập gồm:</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  (1) Thông báo: chọn chế độ nhận thông báo (nút hiển thị ở chế
                  độ màu xanh){" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>(2) Ngôn ngữ: tích chọn chế độ Tiếng Việt</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  (3) Cài đặt đề xuất: Đây là phần quan trọng, cần lưu ý để
                  thiết lập thời gian phù hợp với quy định của công ty.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>Cụ thể:</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Cài đặt{" "}
                  <span className={styles.spanBig}> Đề xuất có kế hoạch</span>:
                  Là đề xuất nghỉ có kế hoạch chủ động, có đơn gửi lãnh đạo ký
                  duyệt. Ví dụ: Nghỉ cưới, nghỉ đi học, nghỉ đi du lịch,...
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Tích xanh vào đề xuất này đề áp dụng đề xuất có kế hoạch
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Thiết lập thời gian tối đa theo giờ mà lãnh đạo cần duyệt
                  phép tính từ sau khi nhân viên tạo đề xuất.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Nếu quá thời gian được cài đặt mà lãnh đạo chưa duyệt phép thì
                  hệ thống tính lương sẽ xét nhân viên đó vào diện nghỉ không
                  phép. Tức là nhân viên vẫn phải đi làm hoặc nếu nghỉ thì sẽ
                  nằm trong diện nghỉ không phép và bị áp dụng các hình thức
                  phạt nghỉ không phép được cài đặt trong hệ thống tính lương.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Lưu ý: nếu để trống không ghi thời gian tối đa cần duyệt phép
                  thì tức là bạn không cài đặt thời gian. Vậy lãnh đạo có thể
                  duyệt phép bất cứ lúc nào.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Cài đặt{" "}
                  <span className={styles.spanBig}>Đề xuất Đột xuất</span> : Là
                  quy định về mốc thời gian lãnh đạo cần duyệt phép cho nhân
                  viên nghỉ đột xuất trước khoảng thời gian đó. Nếu lãnh đạo
                  không duyệt thì phần mềm tính lương sẽ ghi nhận rằng nhân viên
                  đó nghỉ không phép.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Phần này sẽ thiết lập theo ca làm việc mà bạn đã setup. Bạn
                  cần cài đặt thời gian lãnh đạo phải duyệt phép trước khi vào
                  mỗi ca.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Ví dụ: cài đặt đối với ca sáng là trước 8h sáng thì người lãnh
                  đạo cần duyệt phép nghỉ đột xuất cho nhân viên trước 8h sáng.
                  Nếu như duyệt sau thời gian 8h sáng này thì lệnh duyệt không
                  được phần mềm tính lương công nhận và coi như nhân viên đó
                  nghỉ không phép.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Lưu ý định dạng thông tin cần nhập khi cài đặt thời gian cho
                  các ca được quy ước như sau: Giờ - phút - SA/CH (sáng/chiều).
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 5: Thiết lập Nhóm làm việc</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  Nhờ vào việc Thiết lập nhóm làm việc dựa trên đặc trưng công
                  việc hay theo dự án sẽ đem đến cho nhà quản trị sự dễ dàng khi
                  quản lý tiến độ, hiệu quả mà mỗi nhóm tạo ra. Việc chia nhóm
                  không bắt buộc ở các công ty nhưng nếu chia nhóm là cách thức
                  làm việc chủ yếu của đơn vị bạn thì phần danh mục Nhóm làm
                  việc tại tinhluong.timviec365.vn chính là một công cụ tuyệt
                  vời hỗ trợ cho bạn nhanh chóng sắp xếp thành viên các nhóm và
                  quản lý chặt chữ số lượng thành viên trong từng nhóm một cách
                  chính xác nhất.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  <span className={styles.spanBig}>
                    * Tổng quan danh mục{" "}
                    <span className={styles.spanBigN}>Nhóm làm việc</span>{" "}
                  </span>
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>Trong danh mục này gồm 3 tính năng chính:</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Mục <span className={styles.spanBig}>Nhóm làm việc</span>{" "}
                  cho phép bạn thực hiện thao tác chia nhóm dựa vào danh sách
                  nhân viên đã được thiết lập trên hệ thống tính lương.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Mục D/s nhân viên chưa nhóm: hiển thị những nhân viên chưa
                  được sắp xếp vào nhóm nào.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Mục D/s nhân viên các nhóm: hiển thị các nhóm và chi tiết
                  nhân viên trong từng nhóm.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBig}>
                  * Hướng dẫn thiết lập các nhóm làm việc
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  {" "}
                  Thực hiện từng thao tác sau để nhanh chóng chia các nhóm làm
                  việc theo nhu cầu tổ chức của công ty:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Click vào Nhóm làm việc đến Chọn{" "}
                  <span className={styles.spanBig}>Tạo mới</span> ở góc trái màn
                  hình
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Bảng tin hiển thị, bạn điền tên nhóm và mô tả nhóm:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Nhấn tạo nhóm để nhóm được hình thành</span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "361px", aspectRatio: " auto 800 / 361" }}
                  src="https://timviec365.vn/pictures/images_01_2022/thiet-lap-nhom-14.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Tạo nhóm dự kiến
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  Bằng các thao tác trên, bạn có thể tạo ra các nhóm dự kiến.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "321px", aspectRatio: " auto 608  / 321" }}
                  src="https://timviec365.vn/pictures/images_01_2022/nhom-du-kien-16.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Thêm nhóm dự kiến
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  Hình ảnh trên biểu thị cho ô thông tin của một nhóm đã được
                  tạo lập. Trong ô thông tin này hiển thị đầy đủ các dữ liệu:
                  tên nhóm, số thành viên, miêu tả về nhóm.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  - Thêm thành viên vào nhóm
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Nhấn vào lệnh{" "}
                  <span className={styles.spanBig}>Thêm nhân viên</span> ở tại
                  mỗi nhóm đó và tìm chọn nhân viên cần đưa vào.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>Hoặc:</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn vào biểu tượng dấu ba chấm ở góc phải của ô thông tin
                  nhóm, chọn mục đầu tiên Thêm nhân viên và chọn nhân viên cần
                  thêm.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "222px", aspectRatio: " auto 421   / 222" }}
                  src="https://timviec365.vn/pictures/images_01_2022/them-nhan-vien-nhom-15(1).png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Thêm nhân viên nhóm
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  - Điều chỉnh thông tin hoặc xóa nhóm và các thành viên trong
                  nhóm
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Tại dấu ba chấm ở góc phải thuộc ô thông tin nhóm, bạn chọn
                  vào mục <span className={styles.spanBigN}>Chỉnh sửa</span> nếu
                  cần điều chỉnh thêm bớt thành viên, mô tả lại đặc điểm, hoạt
                  động của nhóm hoặc chọn mục{" "}
                  <span className={styles.spanBigN}>Xóa</span> để xóa bỏ nhóm ra
                  khỏi hệ thống.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBig}>
                  * Danh sách nhân viên chưa nhóm
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Để tránh tình trạng bỏ sót nhân viên tiềm năng và tạo thuận
                  lợi trong việc bổ sung thêm người vào các nhóm trong những
                  hoàn cảnh cần thiết, bạn hã quan sát và sử dụng mục Danh sách
                  nhân viên chưa nhóm.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Khi cần bổ sung thêm nhân viên nào vào nhóm, bạn chọn lệnh{" "}
                  <span className={styles.spanBigN}>Thiết lập</span> tại dòng
                  chứa tên của nhân viên đó và chọn nhóm đã được thiết lập ở
                  bước trên. Nhấn{" "}
                  <span className={styles.spanBigN}>Lưu lại</span> đồng nghĩa
                  với việc tên nhân viên đó đã xuất hiện trong nhóm được chọn và
                  đồng thời được loại ra khỏi phần Danh sách nhân viên chưa
                  nhóm.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBig}>
                  * Danh sách nhân viên các nhóm
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Kiểm tra lại nhân viên ở nhóm nào một cách tổng quan tại danh
                  mục này. Khi đó bạn có thể quan sát một nhân viên có ở trong
                  một nhóm hay nhiều nhóm, là những nhóm nào từ đó có sự điều
                  chỉnh lại cho hợp lý, tránh trường hợp chọn nhầm một tên nhân
                  viên đưa vào 2 nhóm không theo mục đích ban đầu.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Tính năng Thiết lập ở phần này chỉ cho phép bạn xóa nhân viên
                  ra khỏi nhóm.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "375px", aspectRatio: " auto 1066/ 375" }}
                  src="https://timviec365.vn/pictures/images_01_2022/xoa-nhan-vien-nhom-17.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Xóa nhân viên khỏi nhóm
                </figcaption>
              </figure>
            </div>
            <h2>
              <span>
                <span>Bước 6: Cài đặt hoa hồng và tạm ứng</span>
              </span>
            </h2>
            <h3 className={styles.ov_offer_one_ct11_h3}>
              <span>
                <span style={{ fontWeight: "700px", whiteSpace: "pre-wrap" }}>
                  1. Cài đặt hoa hồng
                </span>
              </span>
            </h3>
            <p>
              <span>
                <span>
                  Hệ thống phân chia đầy đủ các loại hoa hồng bao gồm:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Hoa hồng tiền</span>
              </span>
            </p>
            <p>
              <span>
                <span>- Hoa hồng doanh thu</span>
              </span>
            </p>
            <p>
              <span>
                <span>- Hoa hồng lợi nhuận</span>
              </span>
            </p>
            <p>
              <span>
                <span>- Hoa hồng lệ phí vị trí</span>
              </span>
            </p>
            <p>
              <span>
                <span>- Hoa hồng Kế hoạch</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Trong từng loại đều có mô tả chi tiết về cách áp dụng. Doanh
                  nghiệp bạn đang áp dụng các loại hoa hồng nào thì tiến hành
                  cài đặt cho mục đó. Cơ chế cài đặt của từng loại về cơ bản sẽ
                  giống nhau, chỉ có riêng phần Hoa hồng tiền, ngoài thiết lập
                  bằng tay bạn còn có thể add file mẫu thay thế việc nhập tay.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>Cách thực hiện:</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn danh mục{" "}
                  <span className={styles.spanBigN}>
                    Cài đặt hoa hồng & Tạm ứng
                  </span>{" "}
                  ở danh sách mục lục bên trái giao diện tính lương.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Vào mục{" "}
                  <span className={styles.spanBigN}>Cài đặt hoa hồng</span>
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Chọn các loại hoa hồng cần thiết lập.</span>
              </span>
            </p>
            <p>
              <span>
                <span>* Thiết lập Hoa hồng tiền: </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Cách 1: Tải file excel mẫu từ hệ thống về máy tại mục, nhập
                  nội dung thông tin theo mẫu sau đó add file mẫu lên.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Cách 2: Nhập thông tin bằng tay</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  {" "}
                  - Chọn <span className={styles.spanBigN}>
                    Thêm hoa hồng
                  </span>{" "}
                  đến <span className={styles.spanBigN}>Thêm mới</span> đến chọn
                  chế độ thiết lập cho cá nhân hoặc nhóm.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Thiết lập từng nhân viên: Chọn tab Nhân viên đến chọn tên
                  nhân viên đến Thời gian áp dụng đến Nhập số tiền hoa hồng được
                  hưởng đến Ghi chú (nếu có) đến nhấn Thêm hoa hồng.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Thiết lập nhóm nhân viên: chọn tab Nhóm đến Tích chọn nhóm
                  áp dụng loại hoa hồng tiền. Phần này bạn cần tạo nhóm các nhân
                  viên có cùng đặc điểm hưởng chế độ hoa hồng tiền ở danh mục
                  Nhóm làm việc để chọn.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>* Thiết lập các khoản hoa hồng khác</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn loại hoa hồng cần cài đặt dữ liệu: Hoa hồng doanh thu,
                  lợi nhuận, lệ phí vị trí, kế hoạch.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Nhấn biểu tượng cài đặt hình răng cưa bên dưới mô tả để cài
                  đặt loại hoa hồng đó.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Nhấn vào lệnh Nhập để thêm nhân viên và nhập dữ liệu chi
                  tiết áp dụng.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>* Ví dụ: áp dụng đối với cài đặt Hoa hồng doanh thu</span>
              </span>
            </p>
            <p>
              <span>
                <span>+Bước 1: Cài đặt hoa hồng doanh thu</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Nhấp vào biểu tượng cài đặt hình răng cưa bên dưới mô tả của
                  loại hoa hồng đó.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn lệnh Thêm ở góc phải bảng cài đặt: điền tên doanh thu,
                  nhập tiền doanh thu nhỏ nhất và tiền doanh thu lớn nhất theo
                  định mức của công ty, nhập hoa hồng tính theo phần trăm.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Lưu doanh thu và lưu cài đặt</span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "628px", aspectRatio: " auto 800 / 628" }}
                  src="https://timviec365.vn/pictures/images_01_2022/cai-dat-hoa-hong-18.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Cài đặt hoa hồng
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  Chế độ hoa hồng đã được cài đặt, bạn cần áp dụng chế độ này
                  cho nhân viên cụ thể.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Bước 2: Nhập nhân viên được áp dụng hoa hồng doanh thu
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Nhấn lệnh <span className={styles.spanBigN}>Nhập</span> tại
                  mục thiết lập hoa hồng vừa xong
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Giao diện cho phép thêm nhân viên hoặc Nhóm nhân viên được
                  hưởng hoa hồng. Cần add cá nhân hay nhóm thì bạn chọn vào mục
                  tương ứng là Hoa hồng cá nhân/Hoa hồng nhóm
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Chọn Thêm mới đến xuất hiện bảng cài đặt</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Điền thông tin trong bảng: Chọn nhân viên/Nhóm nhân viên áp
                  dụng đến Chọn chu kỳ đến Nhập số doanh thu theo thời điểm
                  (từng ngày) đến Nhấn mục{" "}
                  <span className={styles.spanBig}> Thêm doanh thu</span> để
                  nhập tiếp doanh thu cho các ngày cụ thể. Nếu doanh thu không
                  đạt được số tiền doanh thu nhỏ nhất và lớn nhất theo cài đặt
                  thì sẽ được hệ thống báo Mức doanh thu không phù hợp.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Ô Tổng doanh thu hiển thị con số doanh thu được cộng lại sau
                  khi nhập doanh thu từng thời điểm.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Ô Mức doanh thu để bạn chọn loại doanh thu đã được thiết
                  lập.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>Chọn Thêm hoa hồng để lưu lại dữ liệu đã nhập.</span>
              </span>
            </p>

            <p>
              <span>
                <span>
                  * Mục Hoa hồng được nhận cho phép bạn thống kê danh sách nhân
                  viên và các mức hoa hồng của họ theo thời gian. Phần này cho
                  phép bạn thống kê tình hình doanh thu của nhân viên theo thời
                  gian chi tiết từng tháng, năm và từng tên nhân viên. Có thể
                  xuất file thống kê bằng cách nhấn vào lệnh Xuất file thống kê
                  (file xuất dạng excel), sau khi file thống kê được tải về máy,
                  bạn mở file sẽ nhận được một thông báo, cần chọn vào lệnh Yes
                  để mở được file.
                </span>
              </span>
            </p>
            <h3 className={styles.ov_offer_one_ct11_h3}>
              <span>
                <span
                  style={{
                    fontWeight: "700px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  2. Cài đặt Tạm ứng lương
                </span>
              </span>
            </h3>
            <p>
              <span>
                <span>
                  Khi nhân viên có nhu cầu được tạm ứng lương thì bạn cần hướng
                  dẫn cho người đó tạo đơn xin tạm ứng ở trong page Văn thư lưu
                  trữ. Đề xuất tạm ứng được tạo và gửi đến tài khoản của người
                  lãnh đạo/người có thẩm quyền duyệt đơn, nếu đơn đủ điều kiện
                  theo quy định tạm ứng của công ty sẽ được duyệt và hiển thị
                  thông tin trong Phần Tạm ứng.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Việc duyệt đơn sẽ được hệ thống lương ghi nhận và tự động trừ
                  số tiền tạm ứng đó trong tổng lương của nhân viên. Phía kế
                  toán cũng sẽ xuất số tiền đúng bằng số tiền tạm ứng để gửi cho
                  nhân viên.
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 7: Cài đặt nghỉ không phép</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  Từ giao diện của page tính lương, bạn chọn mục Nghỉ phép để
                  được chuyển đến phần cài đặt nghỉ không phép. Trong đó:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Mục Chính sách nghỉ phép: cung cấp thông tin quy định về
                  nghỉ phép không lương và nghỉ phép có lương. Bạn cập nhật các
                  chính sách nghỉ phép để phục vụ cài đặt nghỉ không phép cho
                  phù hợp.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Các quy định nghỉ không phép được hệ thống thiết lập ở hai
                  chế độ{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Nghỉ không đúng quy định</span>
              </span>
            </p>
            <p>
              <span>
                <span>Bạn cần thiết lập cài đặt cho hai mục này.</span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBig}>
                  * Cài đặt chế độ phạt khi nghỉ không đúng quy định
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn mục{" "}
                  <span className={styles.spanBigN}>Nghỉ sai quy định</span> ,
                  phần này áp dụng đối với các trường hợp nghỉ không có đơn xin
                  phép hoặc có đơn xin phép nhưng bị sếp “hủy đơn”.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn lệnh{" "}
                  <span className={styles.spanBigN}>Cài đặt mức phạt</span> ở
                  góc phải.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Cài đặt: Bạn có thể cài đặt mức phạt cho các ca làm việc cụ
                  thể. Ở giao diện phía tay trái thực hiện tích chọn ca cần áp
                  dụng, ở giao diện bên phải sẽ cài đặt chế độ phạt với mức phạt
                  tiền cụ thể và ngày bắt đầu áp dụng.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBig}>
                  * Cài đặt chế độ phạt Nghỉ vào ngày không được phép nghỉ
                </span>
              </span>
            </p>

            <p>
              <span>
                <span>
                  - Chọn mục{" "}
                  <span className={styles.spanBigN}>
                    Nghỉ vào ngày không được phép nghỉ
                  </span>
                  .
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Áp dụng cho các trường hợp nhân viên có đơn xin nghỉ phép
                  nhưng sếp không duyệt và bắt buộc nhân viên phải đi làm (có
                  thể lý do những ngày này công ty có việc quan trọng như ngày
                  dự án phải hoàn thành, ngày đối ngoại, có cuộc họp quan
                  trọng,...) vì nếu không đi làm sẽ gây ảnh hưởng nghiêm trọng
                  tới hoạt động của công ty.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Việc cài đặt mức phạt cho vấn đề nghỉ sai quy định do nghỉ vào
                  ngày không được phép nghỉ không phức tạp. Bạn chỉ cần thực
                  hiện theo các bước sau đây:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Nhấn vào lệnh Cài đặt mức phạt </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn ca cần cài đặt ở khung hình bên tay trái. Bạn chỉ việc
                  tích vào ô vuông tại ca cần cài đặt.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Ở khung hình phía tay phải, nhập 2 loại dữ liệu: nhập số
                  tiền phạt và nhập ngày bắt đầu áp dụng.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Phần này liên quan đến việc nhân viên tạo đề xuất xin nghỉ ở
                  page văn thư lưu trữ, sau đó không được sếp duyệt hoặc đề xuất
                  được sếp đưa vào diện Không được phép nghỉ. Nếu nhân viên vẫn
                  cố ý nghỉ thì hệ thống sẽ ghi nhận vào diện Nghỉ vào ngày
                  không được phép nghỉ và tự động phạt theo cài đặt trên.
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 8: Cài đặt đi muộn về sớm</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  Đây là tiện ích giúp nhà quản lý theo dõi được tình hình thực
                  tế về việc đi muộn về sớm của nhân viên với cơ chế cài đặt chế
                  độ phạt. Đồng thời thông qua đó, dữ liệu được hệ thống ghi
                  nhận phục vụ cho cài đặt các mức bị phạt trừ vào lương cơ bản.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  {" "}
                  Như thế, tiện ích này cho phép bạn cài đặt các mức phạt theo
                  quy chế của công ty để áp dụng cho tính lương hàng tháng. Tiến
                  hành cài đặt dễ dàng với các bước đơn giản theo hướng dẫn dưới
                  đây sẽ giúp các nhà quản lý không phải mất thời gian nhiều cho
                  quá trình này:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn danh mục Đi muộn về sớm trong list các danh mục nằm bên
                  tay trái của màn hình tại page lương.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn mục{" "}
                  <span className={styles.spanBig}>Cài đặt đi muộn về sớm</span>{" "}
                  đến chọn <span className={styles.spanBig}>Thêm mới</span>,
                  bảng tin xuất hiện cho phép bạn cài đặt các dữ liệu:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Điền rõ lý do cần phạt là gì? Hệ thống đã tạo sẵn 2 mục cho
                  bạn lựa chọn Đi muộn - Về sớm cho nên bạn chỉ cần chọn đúng
                  nội dung cho mỗi phần cài đặt.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Tương ứng với mỗi chế độ đi muộn và về sớm đó là các mức áp
                  dụng cụ thể về thời gian quy định xử lý phạt và số tiền phạt.
                  Bạn điền tiếp vào các phần nội dung bao gồm:{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  • Chọn ca áp dụng: phần này tùy cơ chế áp dụng của doanh
                  nghiệp, có thể áp dụng một mức phạt cho tất cả các cả thì sẽ
                  chọn tất cả các ca, hoặc chỉ áp dụng cho những ca riêng thì áp
                  dụng cho ca nào sẽ chọn ca đó.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  • Số phút áp dụng mức phạt: bạn ghi đúng số phút theo quy chế
                  phạt của công ty đã được quy định.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  • Loại phạt: tức bạn chọn phương thức phạt là gì - Phạt tiền
                  hay phạt công?
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  • Chọn thời gian áp dụng: bắt buộc chọn thời gian bắt đầu áp
                  dụng nhưng có thể chọn hoặc không chọn thời gian kết thúc. Nếu
                  không cài đặt thời gian kết thúc thì mặc định hình thức phạt
                  đi muộn về sớm sẽ áp dụng kể từ khi bắt đầu cho đến vô thời
                  hạn. Chỉ khi có sự cài đặt lại thời gian kết thúc thì mới được
                  giới hạn.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  • Số phút áp dụng mức phạt: bạn ghi đúng số phút theo quy chế
                  phạt của công ty đã được quy định.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  • Loại phạt: tức bạn chọn phương thức phạt là gì - Phạt tiền
                  hay phạt công?
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  • Chọn thời gian áp dụng: bắt buộc chọn thời gian bắt đầu áp
                  dụng nhưng có thể chọn hoặc không chọn thời gian kết thúc. Nếu
                  không cài đặt thời gian kết thúc thì mặc định hình thức phạt
                  đi muộn về sớm sẽ áp dụng kể từ khi bắt đầu cho đến vô thời
                  hạn. Chỉ khi có sự cài đặt lại thời gian kết thúc thì mới được
                  giới hạn.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  {" "}
                  <span className={styles.spanBig}>Ví dụ</span>:{" "}
                  <span className={styles.spanBigN}>
                    Bạn cài đặt chế độ phạt Về sớm cho Ca tối, số phút áp dụng
                    phạt là 5 phút, thời gian bắt đầu áp dụng từ tháng 1/2022
                    với hình thức phạt tiền.
                  </span>{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  Nếu một nhân viên kinh doanh đi trực ca tối, ca làm việc được
                  cài đặt đến 10h mới được chấm công thì nhân viên này chấm vào
                  thời điểm 9h55 sẽ bị hệ thống tính vi phạm quy chế về sớm và
                  bị phạt 50.000 đồng, hệ thống tự đồng trừ vào lương cơ bản.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "375px", aspectRatio: " auto 800 / 375" }}
                  src="https://timviec365.vn/pictures/images_01_2022/di-muon-ve-som-19.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Đi muộn về sớm
                </figcaption>
              </figure>
            </div>
            <h2>
              <span>
                <span>Bước 9: Cài đặt Phúc lợi</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  Tại danh mục <span className={styles.spanBig}>Phúc lợi</span>,
                  bạn được quyền tạo mới cho một số chính sách bao gồm:{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBig}>* Danh sách Phúc lợi: </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Chính sách về Phúc lợi được thiết lập theo tháng. Bạn nhấn vào{" "}
                  <span className={styles.spanBig}>Thêm mới</span> để bắt đầu
                  cài đặt.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Cần nhập tên phúc lợi, Tiền phúc lợi áp dụng, thời gian áp
                  dụng.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Sau đó chọn loại thu nhập là loại chịu thuế hay không chịu
                  thuế để hệ thống tự động tính thuế cho khoản phúc lợi này.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Sau cùng chọn <span className={styles.spanBigN}>Thêm</span>{" "}
                  để áp dụng mức tính phúc lợi cho nhân viên.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Với mỗi khoản phúc lợi được setup thì cần add nhân viên được
                  hưởng phúc lợi này. Nhấn vào dấu ba chấm ở vị trí cuối cùng
                  tại hàng phúc lợi cần thiết lập danh sách, chọn{" "}
                  <span className={styles.spanBigN}>Thêm nhân viên</span> để add
                  các nhân viên được hưởng. Khi đó, khoản tiền phúc lợi sẽ được
                  tự động cộng vào tổng lương của nhân viên được add.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "328px", aspectRatio: " auto 1057  / 328" }}
                  src="https://timviec365.vn/pictures/images_01_2022/them-nhan-vien-phuc-loi-20.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Thêm nhân viên chính sách phúc lợi
                </figcaption>
              </figure>
            </div>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "615px", aspectRatio: " auto 943/ 615" }}
                  src="https://timviec365.vn/pictures/images_01_2022/thu-nhap-21.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Thu nhập
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  <span className={styles.spanBig}>* Danh sách phụ cấp</span>:
                  Theo luật Lao động và chính sách của công ty để xây dựng các
                  khoản phụ cấp cho nhân viên tại từng vị trí, từng điều kiện
                  khác nhau. Bạn sẽ cài đặt mức áp dụng phụ cấp theo cách sau:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn <span className={styles.spanBig}>Thêm mới</span> tại
                  phần Danh sách phụ cấp
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Điền thông tin vào bảng dữ liệu được hiển thị gồm: Tên phụ
                  cấp (ví dụ ăn ở, ăn trưa, xăng xe, đi lại), Số tiền phụ cấp,
                  thời gian áp dụng.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Lưu ý: Mức phụ cấp điền vào tính tương ứng với 1 ngày công.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Add nhân viên được hưởng tại dấu ba chấm cuối hàng của khoản
                  phụ cấp, tìm tên và tích vào ô vuông tại tên đó để được ghi
                  nhận và tính phụ cấp vào tổng lương.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  <span className={styles.spanBig}>* Phụ cấp theo ca</span>: đây
                  là loại phụ cấp được miễn thuế và được tính tại thời điểm áp
                  dụng tương ứng. Bạn có thao tác thực hiện tương tự như các mục
                  vừa nêu trên:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + <span className={styles.spanBig}>Chọn Thêm</span> mới tại
                  phần Phụ cấp theo ca
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Hệ thống với các ca làm việc đã được cài đặt sẵn sẽ cho phép
                  bạn chọn ca áp dụng phụ cấp. Ví dụ bạn chọn áp dụng cho ca làm
                  việc tối.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Chọn thời gian áp dụng</span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Viết số tiền phụ cấp áp dụng</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Nhấn lưu và sẽ được hệ thống thông báo đã thêm phụ cấp theo
                  ca thành công.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Thực hiện add các nhân viên hưởng phụ cấp theo ca.
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 10: Thưởng, phạt trong Tính lương</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  Phần này nằm trong mục Quản lý chung tại giao diện Tính lương
                  trên hệ thống tinhluong.timviec365.vn
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Khi chọn danh mục này, danh sách toàn bộ nhân viên sẽ được
                  hiển thị cho phép bạn nhập các lần thường - phạt của từng nhân
                  viên theo tháng. Có hai loại nội dung cần nhập là Tiền thưởng
                  và Tiền phạt.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Để nhập nội dung tương ứng với từng người, bạn tiến hành:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn nhân viên cần nhập tại thanh công cụ tìm kiếm Nhập tên
                  cần tìm, có thể nhập tên hoặc ID để cho kết quả.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Click vào lệnh{" "}
                  <span className={styles.spanBig}>Thưởng phạt</span> (có biểu
                  tượng dấu +) ở cuối dòng chứa tên nhân viên.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Điền nội dung cho bảng tin hiển thị cần nhập:</span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Điền số tiền</span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Tích chọn loại áp dụng: tiền thưởng hay tiền phạt</span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Chọn tháng và năm áp dụng</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Nhập lý do: thưởng/phạt vì lý do gì thì bạn nhập rõ ràng vào
                  ô này để nhân viên có thể theo dõi.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Phần thưởng - phạt cần phải nhập tay từng nội dung do mỗi công
                  ty có một cơ chế áp dụng thưởng phạt riêng. Khi nhân viên được
                  thưởng - phạt theo quy định bằng văn bản của công ty thì bạn
                  phụ trách chỉ việc nhập đúng vào bảng tin này để hệ thống ghi
                  nhận sau đó tự động cộng vào tổng lương ở thời điểm hoàn thành
                  nhập số liệu.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "390px", aspectRatio: " auto 800 / 390" }}
                  src="https://timviec365.vn/pictures/images_01_2022/thuong-phat-22.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Thiết lập thưởng phạt
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  {" "}
                  - Trong trường hợp bạn cần sửa lại các thông tin đã nhập như
                  nhập sai số tiền, tích chọn sai loại thưởng,... thì hãy nhấp
                  vào phần thông tin đã được ghi nhận tại cột Tiền thưởng hoặc
                  Tiền phạt, có biểu tượng hình mắt xem, bảng thông tin vắn tắt
                  sẽ được hiển thị kèm theo tính năng Sửa hoặc Xóa.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "213px", aspectRatio: " auto 800 / 213" }}
                  src="https://timviec365.vn/pictures/images_01_2022/sua-xoa-thuong-phat-23.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Sửa xóa thưởng phạt
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  Bạn chọn biểu tượng hình chiếc bút để sửa lại dữ liệu hoặc
                  nhấn chọn biểu tượng thùng rác để xóa.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Kiểm tra lại: bạn có thể kiểm tra lại các dữ liệu được nhập
                  bằng cách chọn trên thanh công cụ tìm kiếm: tìm theo tháng và
                  tìm theo tên.{" "}
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 11: Cài đặt Thuế</span>
              </span>
            </h2>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  * Lợi ích khi doanh nghiệp thiết lập cài đặt thuế tại
                  tinhluong.timviec365.vn là gì?
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Hệ thống Tính lương cung cấp cho doanh nghiệp Thông tin về
                  Chính sách thuế với hai loại bắt buộc áp dụng, gồm Thuế tính
                  theo hệ số cố định và Thuế theo lũy tiến. Với mỗi loại thuế
                  này đều có thông tin miêu tả chi tiết và hướng dẫn cách tính
                  rõ tính, đồng nghĩa với đó hệ thống cũng đã cập nhật công thức
                  tính thay cho bạn, giúp việc tính toán được nhanh chóng, dễ
                  dàng và không có sai số.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Nhiệm vụ của bạn là chỉ cần thiết lập danh sách nhân viên vào
                  từng chính sách này thì tự động số tiền thuế nhân viên cần
                  đóng sẽ được tính toán và hiển thị đầy đủ trong hệ thống tính
                  lương hàng tháng.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  * Cách thực hiện đơn giản
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Bạn nhập tên nhân viên vào từng loại thuế cần áp dụng:{" "}
                  <span className={styles.spanBigN}>
                    thuế theo hệ số cố định
                  </span>{" "}
                  hay{" "}
                  <span className={styles.spanBigN}>thuế theo lũy tiến</span> .
                  Lưu ý: một nhân viên chỉ chịu một mức thuế trong hai loại thuế
                  này.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Click vào dấu ba chấm ở góc bảng tin thể hiện nội dung của
                  loại thuế. Có hai tùy chọn được hiển thị: Thêm nhân viên và
                  Danh sách nhân viên.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn <span className={styles.spanBig}>Thêm nhân viên</span>{" "}
                  để thêm nhân viên vào nhóm chịu loại thuế đó
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Tìm tên nhân viên tại thanh tìm kiếm </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Tích ô vuông tại tên nhân viên để chọn người đó vào danh
                  sách thuế áp dụng
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn thời gian bắt đầu áp dụng (bắt buộc) và thời gian kết
                  thúc chịu thuế (không bắt buộc){" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Nhấn Lưu lại để kết thúc.</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn{" "}
                  <span className={styles.spanBig}>Danh sách nhân viên</span> để
                  xem lại danh sách những nhân viên đang chịu đóng loại thuế
                  này.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  * Thêm loại thuế áp dụng khác của công ty
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Nếu công ty bạn có áp dụng bất kỳ loại thuế nào khác thì tại
                  giao diện của danh mục Thuế, bạn nhấn vào{" "}
                  <span className={styles.spanBig}>Tạo mới</span> - nút lệnh này
                  nằm ở góc phải màn hình để thiết lập thêm loại thuế mới cần áp
                  dụng.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Sau đó nhập tên chính sách thuế và nhập miêu tả chi tiết
                  chính sách này.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  * Thêm loại thuế áp dụng khác của công ty
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Nếu công ty bạn có áp dụng bất kỳ loại thuế nào khác thì tại
                  giao diện của danh mục Thuế, bạn nhấn vào{" "}
                  <span className={styles.spanBig}>Tạo mới</span> - nút lệnh này
                  nằm ở góc phải màn hình để thiết lập thêm loại thuế mới cần áp
                  dụng.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Sau đó nhập tên chính sách thuế và nhập miêu tả chi tiết
                  chính sách này.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn{" "}
                  <span className={styles.spanBigN}>Thiết lập công thức</span> ,
                  hệ thống cho phép bạn áp dụng tính thuế theo công thức hay
                  hằng số. Đồng thời cũng đã có sẵn các công thức tính toán của
                  một số loại thuế cơ bản để bạn lựa chọn. Bạn sẽ hoàn thành
                  thiết lập chính sách thuế mới bằng việc:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Nhập tên công thức tính thuế</span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Chọn cách tính thuế: công thức/hằng số</span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Lựa chọn công thức theo gợi ý (nếu cần thiết)</span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Thêm công thức</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Với chính sách thuế mới thêm, chúng ta thiết lập danh sách
                  nhân viên tương tự theo cách thực hiện nêu ở trên.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  * Kiểm tra danh sách nhân viên trong thiết lập thuế
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Sau khi đã thiết lập nhân sự đóng thuế tại mục{" "}
                  <span className={styles.spanBig}>Chính sách thuế</span> , hệ
                  thống sẽ phân tách danh sách những người đã được thiết lập và
                  chưa được thiết lập. Đây là sự phân loại giúp nhà quản trị dễ
                  kiểm soát thực trạng đóng thuế của từng người. Để kiểm tra
                  danh sách từng loại, bạn cũng chỉ cần thực hiện những bước cực
                  kỳ đơn giản như sau:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Kiểm tra danh sách nhân sự chưa được thiết lập:</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Nhấn vào mục{" "}
                  <span className={styles.spanBigN}>
                    D/s nhân sự chưa thiết lập
                  </span>{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Cần thiết lập ai đưa vào danh sách chịu thuế, bạn chọn vào
                  lệnh Thiết lập tại tên của người đó
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Điền thông tin cần áp dụng ở bảng hiển thị gồm thời gian bắt
                  đầu áp dụng và thời gian kết thúc áp dụng, loại thuế áp dụng
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn Lưu lại và hệ thống sẽ chuyển tên người này vào danh
                  sách của loại thuế có ở trong mục Chính sách thuế
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Kiểm tra danh sách nhân sự đã thiết lập:</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn mục{" "}
                  <span className={styles.spanBigN}>
                    D/s nhân sự đã thiết lập
                  </span>{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Cần thiết lập ai đưa vào danh sách chịu thuế, bạn chọn vào
                  lệnh Thiết lập tại tên của người đó
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Điền thông tin cần áp dụng ở bảng hiển thị gồm thời gian bắt
                  đầu áp dụng và thời gian kết thúc áp dụng, loại thuế áp dụng
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn Lưu lại và hệ thống sẽ chuyển tên người này vào danh
                  sách của loại thuế có ở trong mục Chính sách thuế
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Kiểm tra danh sách nhân sự đã thiết lập:</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn mục{" "}
                  <span className={styles.spanBigN}>
                    D/s nhân sự đã thiết lập
                  </span>{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Những thông tin bạn kiểm tra được gồm danh sách tất cả các
                  nhân viên đã được thiết lập vào chính sách thuế, loại chính
                  sách thuế áp dụng cho từng người và thời gian áp dụng bắt đầu
                  - kết thúc cụ thể khi nào.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Khi cần tra cứu trong danh sách này, bạn sử dụng thanh công cụ
                  tìm kiếm ở phía trên danh sách. Có thể tra cứu theo thời gian
                  gồm tháng và năm hoặc tra cứu theo tên nhân sự.
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 12: Thiết lập Bảo hiểm</span>
              </span>
            </h2>
            <h4 className={styles.ov_offer_one_ct11_h4}>
              <span>
                <span
                  style={{
                    fontWeight: "700px",
                    fontStyle: "italic",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  1. Chính sách bảo hiểm
                </span>
              </span>
            </h4>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  * <span className={styles.spanBig}>Mô tả</span>: Trong chính
                  sách bảo hiểm có 3 mục được thiết lập gồm: Nhập tiền bảo hiểm,
                  BHXH tính theo lương cơ bản, BHXH theo mức lương nhập vào. Cả
                  3 chính sách này đều đã được thiết lập sẵn công thức để hệ
                  thống tự động tính toán. Công ty bạn đang áp dụng tính bảo
                  hiểm theo chính sách nào thì chọn và thêm nhân viên vào chính
                  sách đó.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  Có thể thực hiện thiết lập cho từng nhân viên hoặc thiết lập
                  cho các nhóm nhân viên nếu những thành viên trong nhóm cùng
                  được áp dụng chung một chính sách. Các nhóm này đã có sẵn khi
                  bạn thiết lập Nhóm làm việc.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  *{" "}
                  <span className={`${styles.spanBig} ${styles.spanBigN}`}>
                    Phần Nhập tiền bảo hiểm
                  </span>{" "}
                  : Nhập trực tiếp số tiền nhân viên cần đóng bảo hiểm{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  - Chọn lệnh Nhập tiền bảo hiểm hoặc chọn dấu ba chấm ở góc
                  phải tại phần này để chọn nhân viên hoặc nhóm nhân viên và
                  thực hiện thao tác nhập tiền bảo hiểm cụ thể.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>
                  - Sau khi chọn được nhân viên hoặc nhóm, hệ thống tiếp tục yêu
                  cầu bạn nhập số tiền bảo hiểm nhân viên/ nhóm đó cần đóng,
                  chọn đúng thời gian áp dụng.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span className={styles.spanBigN}>- Lưu lại</span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "607px", aspectRatio: " auto 800 / 607" }}
                  src="https://timviec365.vn/pictures/images_01_2022/cai-dat-bao-hiem-24.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Chính sách bảo hiểm
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span>
                  *{" "}
                  <span className={`${styles.spanBig} ${styles.spanBigN}`}>
                    Hai lựa chọn còn lại
                  </span>{" "}
                  : BHXH tính theo lương cơ bản và BHXH tính theo lương nhập vào
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Phần này chỉ cần thêm nhân viên (hoặc nhóm nhân viên) cần áp
                  dụng do liên quan đến lương cơ bản, lương nhập vào đã được bạn
                  nhập cho nhân viên ngay khi thiết lập lương cơ bản.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Tại dấu ba chấm phía góc phải ô nội dung từng mục, chọn{" "}
                  <span className={styles.spanBigN}>Thêm nhân viên</span>{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Chọn thời gian bắt đầu áp dụng</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Nhấn <span className={styles.spanBigN}>Lưu lại</span> để
                  hoàn tất
                </span>
              </span>
            </p>
            <h4 className={styles.ov_offer_one_ct11_h4}>
              <span>
                <span
                  style={{
                    fontWeight: "700px",
                    fontStyle: "italic",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  2. Kiểm tra việc thiết lập bảo hiểm
                </span>
              </span>
            </h4>
            <p>
              <span>
                <span>
                  Bạn có thể nắm bắt danh sách nhân viên đã được thiết lập và
                  chưa được thiết lập tại các danh mục tương ứng. Bạn có thể xóa
                  nhân sự đã được thiết lập bảo hiểm hoặc thiết lập thêm nhân sự
                  cần áp dụng chính sách bảo hiểm thông qua những lệnh tương
                  ứng.
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 13: Chế độ Ngày nghỉ lễ</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  Một số ngày nghỉ lễ trong năm sẽ có thưởng nghỉ lễ. Bạn cần
                  thiết lập chế độ cho những ngày nghỉ lễ này trên hệ thống tính
                  lương để số tiền thưởng nghỉ lễ vẫn được hệ thống ghi nhận và
                  cộng vào tổng lương tháng được nhận.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span> Vậy việc cài đặt tiến hành như thế nào?</span>
              </span>
            </p>
            <p>
              <span>
                <span className={`${styles.spanBig} ${styles.spanBigN}`}>
                  * Tạo chế độ Ngày nghỉ lễ
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn danh mục Ngày nghỉ lễ ở danh mục phía bên trái của màn
                  hình{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Nhấn lệnh Tạo mới nằm ở góc phải </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Xuất hiện bảng dữ liệu cho bạn nhập các nội dung cần thiết
                  lập:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Nhập tên kỳ nghỉ lễ. Ví dụ: Nghỉ Quốc Khánh 2/9, Nghỉ Tết
                  Dương lịch
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Nhập thời gian nghỉ: nhập rõ ngày bắt đầu kỳ nghỉ và ngày
                  kết thúc kỳ nghỉ
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn loại tiền thưởng: thưởng theo tiền lương hoặc thưởng
                  theo số công tùy cách áp dụng của doanh nghiệp bạn.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn loại thưởng nào sẽ tương ứng nhập vào số tiền thưởng
                  theo lương hoặc số công.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn lệnh Tạo kỳ nghỉ lễ để kết thúc thiết lập cho các ngày
                  nghỉ lễ
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Có bao nhiêu ngày nghỉ lễ sẽ được áp dụng thưởng thì bạn tạo
                  bấy nhiêu thiết lập tương tự theo các thao tác trên.
                </span>
              </span>
            </p>
            <div style={{ textAlign: "center" }}>
              <figure
                className={styles.customFigure}
                style={{ display: "inline-block" }}
              >
                <img
                  className={styles.ov_offer_one_ct11_img}
                  style={{ height: "314px", aspectRatio: " auto 800 / 314" }}
                  src="https://timviec365.vn/pictures/images_01_2022/cai-dat-ngay-nghi-le-25.png"
                  alt="ID công ty nằm ở ngay bên dưới tên công ty"
                />
                <figcaption className={styles.customFigcaption}>
                  Cài đặt ngày nghỉ lễ
                </figcaption>
              </figure>
            </div>
            <p>
              <span>
                <span className={`${styles.spanBig} ${styles.spanBigN}`}>
                  * Chọn Nhân viên áp dụng
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Tại ngày nghỉ lễ đã được thiết lập, bạn nhấn vào dấu ba chấm,
                  có thể thực hiện các thao tác Chỉnh sửa kỳ nghỉ lễ, thêm nhân
                  viên áp dụng hoặc Xóa. Mục đích khi cần thêm nhân viên thì
                  nhấn chọn Nhân viên áp dụng để thêm các nhân viên vào danh
                  sách được hưởng chế độ.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Tích chọn mục Tất cả nhân viên thì toàn bộ nhân viên trong
                  danh sách nhân viên công ty đều được hưởng chế độ thưởng này,
                  còn nếu chọn lọc nhân viên được hưởng theo từng loại chính
                  sách nghỉ lễ riêng thì tìm kiếm đúng tên nhân viên đó và tích
                  chọn họ. Hệ thống sẽ tự động cộng tiền hoặc ngày công vào
                  lương của nhân viên được áp dụng.{" "}
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 14: Các khoản tiền khác</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  Hệ thống tính lương dù có được xây dựng khá bài bản, chi tiết
                  và đầy đủ các tính năng song cũng không thể đáp ứng hoàn toàn
                  100% các nhu cầu của từng doanh nghiệp trong việc tổng hợp các
                  khoản cần tính lương. Đó là lý do phần Các khoản tiền khác
                  được tạo ra để cho doanh nghiệp bạn căn cứ vào các chính sách
                  riêng mà chúng tôi không bao quát được vẫn có thể được thiết
                  lập vào hệ thống và được tinhluong.timviec365.vn ghi nhận,
                  phục vụ cho việc tính lương nhân viên.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Cách sử dụng phần này không hề phức tạp, bạn chỉ việc nhấn vào
                  nút lệnh Tạo khoản tiền mới ở góc phải màn hình để nhập tên
                  loại tiền cần áp dụng kèm theo mô tả chi tiết về chính sách áp
                  dụng. Sau đó thiết lập công ty thức toán cho những khoản tiền
                  này để hệ thống ghi nhận và tính toán cho bạn.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Từng mục khoản tiền cụ thể cần áp dụng sau khi được thiết lập,
                  cần thêm nhân viên được nhận. Bạn chọn vào dấu ba chấm tại ô
                  thông tin và chọn Thêm nhân viên, khi cần chỉnh sửa thì chọn
                  Chỉnh sửa hoặc Xóa để hủy bỏ khoản tiền áp dụng này.
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 15: Biểu mẫu đề xuất</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  Một số biểu mẫu có liên quan mật thiết và ảnh hưởng trực tiếp
                  đến việc hệ thống tính lương cho bạn, cơ bản nhất sẽ có biểu
                  mẫu về xin nghỉ phép đột xuất, xin nghỉ phép có kế hoạch, mẫu
                  đơn xin tạm ứng, đề xuất tăng ca, tăng lương, bổ nhiệm, thôi
                  việc,xin nghỉ chế độ thai sản,... Vì ở thời điểm đề xuất được
                  tạo ra, việc có được duyệt hay không và thực tế nhân viên của
                  công ty tuân thủ đề xuất đó như thế nào sẽ có ảnh hưởng đến
                  việc tính lương.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Ví dụ: nếu nhân viên tạo đề xuất xin nghỉ phép, trong trường
                  hợp không được duyệt và vẫn cố tình nghỉ hoặc nghỉ theo đúng
                  đề xuất đã tạo mà không để ý rằng đề xuất đó đã bị hủy thì hệ
                  thống sẽ ghi nhận nhân viên đó nghỉ không đúng quy định và áp
                  dụng hình thức phạt đã được thiết lập ở mục{" "}
                  <span className={styles.spanBigN}>Nghỉ phép</span> để trừ vào
                  lương.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Hệ thống đã cung cấp rất nhiều các mẫu đơn đề xuất, bạn có thể
                  chọn trạng thái sử dụng cho mẫu đơn phù hợp là ON để nhân viên
                  có thể sử dụng và thiết lập thời gian hiệu lực cho mẫu đơn.
                  Cách thực hiện như sau:{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Chọn danh mục{" "}
                  <span className={styles.spanBig}>Biểu mẫu đề xuất</span> , hệ
                  thống chuyển bạn sang page Văn thư lưu trữ và gợi ý sẵn các
                  biểu mẫu đề xuất có thể áp dụng cho doanh nghiệp.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>- Cài đặt cho các mẫu đề xuất có sẵn:</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Tại mẫu đơn cần sử dụng, bạn nhấn vào dấu ba chấm ở cuối
                  cùng để chọn Chỉnh sửa.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn kiểu duyệt cho đề xuất: kiểm duyệt hoặc duyệt đồng thời
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Cài đặt thời gian hiệu lực của đề xuất, tức thời gian đề
                  xuất cần được duyệt, tính theo ngày. Nếu đã cài đặt thì cần
                  duyệt đề xuất cho nhân viên trong khoảng thời gian đó, quá
                  thời gian duyệt, đề xuất của nhân viên coi như không được tính
                  và buộc nhân viên phải đi làm, không được phép nghỉ để tránh
                  bị phạt nghỉ sai quy định.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  - Thiết lập mới đề xuất theo nhu cầu sử dụng thực tế của doanh
                  nghiệp:
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn <span className={styles.spanBigN}>Thêm mẫu đơn</span> ở
                  góc phải màn hình để tiến hành tạo mẫu đơn tùy chỉnh
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Nhập tên mẫu đơn</span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Miêu tả mẫu đơn: chính sách áp dụng của công ty</span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Chọn chế độ ngày tạo mẫu đơn hoặc số tiền yêu cầu</span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Nhập thời gian hiệu lực, tính theo ngày</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Chọn người kiểm duyệt mẫu đơn: nhập tên người được duyệt
                  trong thành tìm kiếm và nhấn chọn người đó.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>+ Viết ghi chú cho mẫu đơn</span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Lựa chọn kiểu kiểm duyệt: có hai lựa chọn là lãnh đạo duyệt
                  trực tiếp hoặc duyệt qua nhiều lãnh đạo. Tùy vào cài đặt này
                  như thế nào mà phía nhân viên tạo đề xuất được gửi đi sẽ được
                  gửi thẳng đến lãnh đạo phụ trách trực tiếp hoặc gửi qua nhiều
                  lãnh đạo.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  + Nhấn vào{" "}
                  <span className={styles.spanBigN}>Lưu và tạo mẫu đơn</span>
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Khi các đề xuất đã được lựa chọn, được tạo thêm để áp dụng vào
                  quy định của doanh nghiệp thì bắt buộc nhân viên cần phải tạo
                  các đề xuất online trên page Văn thư lưu trữ vì hệ thống tính
                  lương cũng dựa vào đề xuất này làm căn cứ tính lương theo các
                  cài đặt được áp dụng như cài đặt nghỉ phép cần tạo đơn và được
                  duyệt; cài đặt hoa hồng, tạm ứng cần có mẫu đơn đề xuất để hệ
                  thống trích xuất tính tiền.
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 16: Bảng lương</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  <span className={`${styles.spanBig} ${styles.spanBigN}`}>
                    Bảng lương
                  </span>{" "}
                  thể hiện tính chu kỳ, là một bảng dữ liệu tổng hợp lại toàn bộ
                  các số liệu liên quan đến việc tính lương cho từng nhân viên
                  theo tháng, bao gồm: thông tin lương cơ bản, thông tin về số
                  công, các khoản lương, dữ liệu về thưởng - phạt, phúc lợi, phụ
                  cấp, bảo hiểm,... toàn bộ các khoản mục đã được cài đặt trong
                  hệ thống tính lương. Đồng thời, hệ thống dựa trên những ghi
                  nhận chi tiết cho từng mục đó để tính tổng lương thực nhận cho
                  mỗi nhân viên.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Không chỉ thể hiện thông tin chi tiết bảng lương tổng, khi sử
                  dụng bảng lương này, người quản trị còn có thể tra cứu thông
                  tin của bảng lương theo các danh mục khác nhau: tra cứu theo
                  thời gian chi tiết từ ngày/tháng/năm, tra cứu theo từng phòng
                  ban hoặc nhân viên.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Tùy theo mục đích sử dụng bảng lương này, công ty có thể xuất
                  ra file excel tại lệnh{" "}
                  <span className={styles.spanBigN}>Xuất tổng lương</span> ở
                  cuối bảng.
                </span>
              </span>
            </p>
            <h2>
              <span>
                <span>Bước 17: Báo cáo Công - lương</span>
              </span>
            </h2>
            <p>
              <span>
                <span>
                  Bạn không cần cài đặt bất kỳ nội dung nào cho mục này, mục này
                  sẽ lấy toàn bộ dữ liệu tính lương cho nhân viên để hiển thị
                  các con số thống kê về việc chi trả lương của công ty.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Các số liệu hiển thị gồm có Tổng lương thanh toán, Tổng tiền
                  bảo hiểm, Tổng thuế, Lương trung bình trả cho từng nhân viên.
                  Đây là một phép tính tổng tuyệt vời nhất, đem lại lợi ích về
                  tính toán rất lớn cho công ty vì không phải nhập tay hay cộng
                  tất cả hàng chục, hàng trăm, thậm chí là hàng nghìn các số
                  liệu vào để ra kết quả, hệ thống tính lương sẽ thay bạn làm
                  điều đó một cách tự động và chính xác nhất và hiển thị đầy đủ
                  các thông tin tổng quan trên đầy đủ ở mục này.
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Qua dữ liệu này, nó cũng sẽ giúp cho nhà quản trị nhận diện
                  được thực trạng đúng của các khoản cần chi ra và đem đối chiếu
                  với nguồn thu vào để đánh giá, nhận định tình hình phát triển
                  của công ty ở từng thời điểm.{" "}
                </span>
              </span>
            </p>
            <p>
              <span>
                <span>
                  Trên đây là những hướng dẫn cơ bản và dễ hiểu, dễ áp dụng dành
                  cho các công ty sử dụng hệ thống tính lương tại
                  tinhluong.timviec365.vn. Sự nhanh chóng, chính xác tuyệt đối,
                  dễ dùng chính là những giá trị tuyệt vời mà ứng dụng đem đến
                  cho quý công ty. Hy vọng sẽ trở thành người bạn đối tác tin
                  cậy, uy tín của các công ty trên hành trình phát triển.
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
