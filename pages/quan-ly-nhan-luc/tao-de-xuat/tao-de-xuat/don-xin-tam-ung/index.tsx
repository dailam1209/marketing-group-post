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
import { useState } from "react";

export default function DonXinTamUng() {
  const [form] = Form.useForm();
  const [fileData, setFileData] = useState<Blob>();
  const router = useRouter()
  form.setFieldValue("type_dx", "Đơn xin tạm ứng");

  const userLabel = [
    { label: "Nguyễn Thu Trang", value: "1" },
    { label: "Lại Thị Trang", value: "2" },
    { label: "Phạm Xuân Nguyên Khôi", value: "3" },
  ];

  const onFinish = async () => {
    form.validateFields().then((value) => {
      const body = {
        ...value,
        id_user_duyet: value['id_user_duyet']?.join(","),
        id_user_theo_doi: value['id_user_theo_doi']?.join(","),
        ngay_tam_ung: dayjs(value['ngay_tam_ung']).unix()
      };
      // console.log(body);
      const fd = new FormData();

      Object.keys(body)?.forEach((k) => {
        fd.append(k, body[k]);
      });

      if (fileData) {
        fd.append("fileKem", fileData);
      }
      POST_VT("api/vanthu/DeXuat/De_Xuat_Xin_Tam_Ung", fd)
        .then(res => {
          if (res?.result === true) {
            alert("Tạo đề xuất thêm tạm ứng thành công!")
            router.replace(router.asPath)
          }
        })

      // console.log(res);
    });
  };

  const MyForm = () => {
    return (
      <Form form={form} onFinish={onFinish} initialValues={{ name: "khas" }}>
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
              name="ngay_tam_ung"
              placeholder="Chọn ngày"
              required
              title="Ngày tạm ứng"
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <DXInputMoney
              placeholder="Nhập số tiền"
              required
              title="Số tiền tạm ứng"
              name="tien_tam_ung"
            />
          </Col>

          <Col md={24} sm={24} xs={24}>
            <DXTextArea
              name="ly_do"
              placeholder="Nhập lý do xin tạm ứng"
              required
              title="Lý do xin tạm ứng"
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
          <Col md={12} sm={12} xs={24}>
            <DXFileInput setFileData={setFileData} />
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <TaoDeXuatWrapper header="Đơn tạm ứng" onCreateClicked={onFinish}>
      <MyForm />
    </TaoDeXuatWrapper>
  );
}
