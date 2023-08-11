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

export default function DeXuatThanhToan() {
  const [form] = Form.useForm();
  const [fileData, setFileData] = useState<any>();
  const router = useRouter();

  form.setFieldValue("type_dx", "Đề xuất thanh toán");

  const userLabel = [
    { label: "Nguyễn Thu Trang", value: "5" },
    { label: "Lại Thị Trang", value: "2" },
    { label: "Phạm Xuân Nguyên Khôi", value: "3" },
  ];

  const handleSubmit = () => {
    form.validateFields().then((value) => {

      const body = {
        ...value,
        id_user_duyet: value["id_user_duyet"]?.join(","),
        id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
      };
      // console.log(body);
      const fd = new FormData();

      Object.keys(body)?.forEach((k) => {
        fd.append(k, body[k]);
      });

      if (fileData) {
        fd.append("fileKem", fileData);
      }

      POST_VT("api/vanthu/dexuat/addDXTT", fd).then((res) => {
        if (res?.result === true) {
          alert("Tạo đề xuất thanh toán thành công!");
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
          <Col md={12} sm={12} xs={24}>
            <DxInputTxt
              name="name"
              placeholder="Họ và tên"
              required
              title="Họ và tên"
              disabled
            />
          </Col>

          <Col md={12} sm={12} xs={24}>
            <DXInputMoney
              name="so_tien_tt"
              placeholder="Nhập số tiền"
              required
              title="Số tiền thanh toán"
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <DxInputTxt
              name="type_dx"
              placeholder="Loại đề xuất"
              required
              title="Loại đề xuất"
              disabled
            />
          </Col>

          <Col md={24} sm={24} xs={24}>
            <DXTextArea
              name="ly_do"
              placeholder="Nhập lý do đề xuất thanh toán"
              required
              title="Lý do đề xuất thanh toán"
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
    <TaoDeXuatWrapper
      header="Đề xuất thanh toán"
      onCreateClicked={handleSubmit}
    >
      <MyForm />
    </TaoDeXuatWrapper>
  );
}
