import {
  DXFileInput,
  DXInputMoney,
  DXTextArea,
  DxDatePicker,
  DxInputTxt,
  DxSelect,
  TaoDeXuatWrapper,
} from "@/components/tao-de-xuat-2/components/TaoDeXuatComps";
import { POST_VT, getInfoUser } from "@/pages/api/BaseApi";
import { Col, Form, Row } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DonXinCapPhatTs() {
  const [fileData, setFileData] = useState<Blob>();

  const [form] = Form.useForm();
  const router = useRouter();

  form.setFieldValue("type_dx", "Đơn xin cấp phát tài sản");


  const handleSubmit = () => {
    form.validateFields().then((value) => {
      // console.log({
      //   ...value,
      //   id_user_duyet: value["id_user_duyet"]?.join(","),
      //   id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
      // });

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

      POST_VT("api/vanthu/DeXuat/De_Xuat_Cap_Phat_Tai_San", fd).then((res) => {
        if (res?.result === true) {
          alert("Tạo đề xuất xin cấp phát tài sản thành công!");
          router.replace(router.asPath);
        }
      });
    });
  };

  const [infoUser, setInfoUser] = useState<any>();
  const [listDuyet, setListDuyet] = useState<any>({});

  useEffect(() => {
    const getListDuyet = async () => {
      const res = await POST_VT('api/vanthu/dexuat/showadd', {});

      if (res?.result) {
        setListDuyet({
          listDuyet: res?.listUsersDuyet?.map((user) => ({
            label: user?.userName,
            value: user?.idQLC,
          })),
          listTheoDoi: res?.listUsersTheoDoi?.map((user) => ({
            label: user?.userName,
            value: user?.idQLC,
          })),
        });
      }
    };

    getListDuyet();
    
    
    setInfoUser(getInfoUser());
  }, []);

  useEffect(() => {
    if (infoUser?.idQLC) {
      form.setFieldValue('name', infoUser?.userName);
    }
  }, [infoUser]);

  const MyForm = () => {
    return (
      <Form form={form} initialValues={{ name: "Vũ Văn Khá" }}>
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

          <Col md={24} sm={24} xs={24}>
            <p style={{ color: "#4C5BD4", fontSize: "18px" }}>
              Danh sách tài sản đề xuất
            </p>
          </Col>

          <Col md={12} sm={12} xs={24}>
            <DxInputTxt
              disabled={false}
              name="danh_sach_tai_san"
              placeholder="Nhập tên tài sản"
              required
              title="Tài sản đề xuất"
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <DxInputTxt
              disabled={false}
              name="so_luong_tai_san"
              placeholder="Nhập số lượng"
              required
              title="Số lượng"
              type="number"
            />
          </Col>

          <Col md={24} sm={24} xs={24}>
            <DXTextArea
              name="ly_do"
              placeholder="Nhập lý do xin cấp phát tài sản"
              required
              title="Lý do xin cấp phát tài sản"
            />
          </Col>

          <Col md={12} sm={12} xs={24}>
            <DxSelect
              isMulti
              name="id_user_duyet"
              options={listDuyet?.listDuyet}
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
              options={listDuyet?.listTheoDoi}
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
      header="Đơn xin cấp phát tài sản"
      onCreateClicked={handleSubmit}
    >
      <MyForm />
    </TaoDeXuatWrapper>
  );
}
