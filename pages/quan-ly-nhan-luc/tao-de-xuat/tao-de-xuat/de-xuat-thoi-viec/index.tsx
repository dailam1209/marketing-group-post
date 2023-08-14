import {
  DXFileInput,
  DXInputMoney,
  DXTextArea,
  DxDatePicker,
  DxInputTxt,
  DxSelect,
  TaoDeXuatWrapper,
} from "@/components/tao-de-xuat-2/components/TaoDeXuatComps";
import { POST_VT } from "@/pages/api/BaseApi";
import { Col, Form, Row } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function DeXuatThoiViec() {
  const [form] = Form.useForm();
  const router = useRouter();

  form.setFieldValue("type_dx", "Đơn xin thôi việc");

  const shiftLabel = [
    { label: "Ca sáng 5tr <= 7TR", value: 1 },
    { label: "Ca chiều 5tr <= 7TR", value: 2 },
    { label: "Ca sáng 7tr < 10TR", value: 3 },
    { label: "Ca chiều 7tr < 10TR", value: 4 },
  ];

  const userLabel = [
    { label: "Nguyễn Thu Trang", value: "5" },
    { label: "Lại Thị Trang", value: "2" },
    { label: "Phạm Xuân Nguyên Khôi", value: "3" },
  ];

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      // console.log({
      //   ...value,
      //   id_user_duyet: value["id_user_duyet"]?.join(","),
      //   id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
      //   ngaybatdau_tv: dayjs(value["ngaybatdau_tv"]).unix()
      // });

      POST_VT("api/vanthu/DeXuat/De_Xuat_Xin_thoi_Viec", {
        ...value,
        id_user_duyet: value["id_user_duyet"]?.join(","),
        id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
        ngaybatdau_tv: dayjs(value["ngaybatdau_tv"]).unix(),
      }).then((res) => {
        if (res?.result === true) {
          alert("Tạo đề xuất thôi việc thành công!")
          router.replace(router.asPath);
        }
      });
    });
  };

  const MyForm = () => {
    return (
      <Form form={form} initialValues={{ name: "khas" }}>
        <Row gutter={[20, 10]}>
          <Col md={12} sm={12} xs={24}>
            <DxInputTxt
              name="name_dx"
              placeholder="Nhập tên đề xuất"
              required
              title="Tên đề xuất"
              disabled={false}
            />
          </Col>
          <Col md={6} sm={12} xs={24}>
            <DxInputTxt
              name="name"
              placeholder="Họ và tên"
              required
              title="Họ và tên"
              disabled
            />
          </Col>
          <Col md={6} sm={12} xs={24}>
            <DxInputTxt
              name="type_dx"
              placeholder="Loại đề xuất"
              required
              title="Loại đề xuất"
              disabled
            />
          </Col>

          <Col md={12} sm={12} xs={24}>
            <DxDatePicker
              name="ngaybatdau_tv"
              placeholder="Chọn ngày"
              required
              title="Ngày bắt đầu nghỉ"
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <DxSelect
              isMulti={false}
              name="ca_bdnghi"
              options={shiftLabel}
              placeholder="Chọn ca nghỉ"
              required
              showSearch
              title="Ca bắt đầu nghỉ"
            />
          </Col>

          <Col md={24} sm={24} xs={24}>
            <DXTextArea
              name="ly_do"
              placeholder="Nhập lý do xin nghỉ"
              required
              title="Lý do xin thôi việc"
            />
          </Col>

          <Col md={12} sm={12} xs={24}>
            <DxSelect
              isMulti
              name="id_user_duyet"
              options={userLabel}
              placeholder="Người xét duyệt"
              required
              showSearch
              title="Người xét duyệt"
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <DxSelect
              isMulti
              name="id_user_theo_doi"
              options={userLabel}
              placeholder="Người theo dõi"
              required
              showSearch
              title="Người theo dõi"
            />
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <TaoDeXuatWrapper header="Đơn xin thôi việc" onCreateClicked={handleSubmit}>
      <MyForm />
    </TaoDeXuatWrapper>
  );
}
