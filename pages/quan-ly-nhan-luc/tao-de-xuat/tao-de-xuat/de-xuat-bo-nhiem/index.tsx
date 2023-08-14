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
import { useRouter } from "next/router";

export default function DeXuatTangLuong() {
  const [form] = Form.useForm();
  const router = useRouter()

  const userLabel = [
    { label: "Nguyễn Thu Trang", value: "5" },
    { label: "Lại Thị Trang", value: "2" },
    { label: "Phạm Xuân Nguyên Khôi", value: "3" },
  ];

  const depLabel = [
    { label: "Phòng 1", value: "1" },
    { label: "Phòng 2", value: "2" },
    { label: "Phòng 3", value: "3" },
  ];

  const positionLabel = [
    { label: "Nhân viên thử việc", value: "1" },
    { label: "Nhân viên chính thức", value: "2" },
    { label: "Trưởng phòng", value: "3" },
  ];

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      // console.log({
      //   ...value,
      //   id_user_duyet: value["id_user_duyet"]?.join(","),
      //   id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
      // });
      POST_VT('api/vanthu/dexuat/De_Xuat_Xin_Bo_Nhiem', {
        ...value,
        id_user_duyet: value["id_user_duyet"]?.join(","),
        id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
      })
        .then(res => {
          if (res?.result === true) {
            alert("Tạo đề xuất xin bổ nhiệm thành công!")
            router.replace(router.asPath)
          }
        })
    });
  };

  const MyForm = () => {
    return (
      <Form
        form={form}
        initialValues={{
          name: "Khas",
          type_dx: "1",
          name_ph_bn: "1",
          chucvu_hientai: "1",
        }}
      >
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
            <DxSelect
              isMulti={false}
              name="thanhviendc_bn"
              options={userLabel}
              placeholder="Chọn thành viên"
              required
              showSearch
              title="Thành viên được bổ nhiệm"
            />
          </Col>
          <Col md={6} sm={12} xs={24}>
            <DxInputTxt
              name="name_ph_bn"
              placeholder="Phòng ban"
              required
              title="Phòng ban"
              disabled
            />
          </Col>
          <Col md={6} sm={12} xs={24}>
            <DxInputTxt
              name="chucvu_hientai"
              placeholder="Chức vụ hiện tại"
              required
              title="Nhân viên chính thức"
              disabled
            />
          </Col>

          <Col md={12} sm={12} xs={24}>
            <DxSelect
              isMulti={false}
              name="chucvu_dx_bn"
              options={positionLabel}
              placeholder="Chọn chức vụ bổ nhiệm"
              required
              showSearch
              title="Chức vụ đề xuất bổ nhiệm"
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <DxSelect
              isMulti={false}
              name="phong_ban_moi"
              options={depLabel}
              placeholder="Chọn phòng ban"
              required
              showSearch
              title="Phòng ban mới"
            />
          </Col>

          <Col md={24} sm={24} xs={24}>
            <DXTextArea
              name="ly_do"
              placeholder="Nhập lý do đề xuất bổ nhiệm"
              required
              title="Lý do đề xuất bổ nhiệm"
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
            <DXFileInput />
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <TaoDeXuatWrapper header="Đề xuất bổ nhiệm" onCreateClicked={handleSubmit}>
      <MyForm />
    </TaoDeXuatWrapper>
  );
}
