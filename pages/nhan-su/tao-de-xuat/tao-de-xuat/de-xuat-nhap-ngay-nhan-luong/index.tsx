import {
  MyDatePicker,
  MyInput,
  MySelect,
  MyTextArea,
} from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal";
import styles from "./index.module.css";
import Image from "next/image";
import {
  DeXuatCongCongFooter,
  MyInputFile,
  MySelectAcp,
  MyTime,
} from "@/components/tao-de-xuat/loai-de-xuat/tao-de-xuat/component/ChiTiet";
import { Col, Form, Row } from "antd";
import { POST_VT } from "@/pages/api/BaseApi";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";

export default function DeXuatNhapNgayNhanLuong() {
  const [fileData, setFileData] = useState<any>();

  const router = useRouter();
  const [form] = Form.useForm();

  const shiftLabel = [
    { label: "Ca sáng Lương <= 5TR", value: "1" },
    { label: "Ca chiều Lương <= 5TR", value: "2" },
    {
      label: "Ca sáng 7TR < Lương <= 10TR",
      value: "3",
    },
    {
      label: "Ca chiều 7TR < Lương <= 10TR",
      value: "4",
    },
  ];

  const depLabel = [
    { label: "Phòng 1", value: "1" },
    { label: "Phòng 2", value: "2" },
    { label: "Phòng 3", value: "3" },
  ];

  const userLabel = [
    { label: "Nguyễn Thu Trang", value: "5" },
    { label: "Lại Thị Trang", value: "2" },
    { label: "Phạm Xuân Nguyên Khôi", value: "995619" },
  ];

  const typeOffLabel = [
    { label: "Nghỉ giữa ca", value: 1 },
    { label: "Nghỉ hết ca", value: 2 },
  ];

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      const body = {
        ...value,
        id_user_duyet: value["id_user_duyet"]?.join(","),
        id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
        kieu_duyet: 0,
      };

      // console.log(body);
      const fd = new FormData();

      Object.keys(body)?.forEach((k) => {
        fd.append(k, body[k]);
      });

      if (fileData) {
        fd.append("file_kem", fileData);
      }

      POST_VT("api/vanthu/dexuat/addDXNNNL", fd).then((res) => {
          alert("Tạo đề xuất nhập ngày nhận lương thành công!");
          router.replace(router.asPath);
      });
    });
  };
  return (
    <div>
      <div className={styles.header}>
        <Image src={"/back-w.png"} alt="" width={24} height={24}></Image>
        <p className={styles.headerText}>Đề xuất nhập ngày nhận lương</p>
      </div>
      <Form form={form} initialValues={{ name: "Khas" }}>
        <div className={styles.body}>
          <Row gutter={[20, 10]}>
            <Col sm={12} xs={24}>
              {MyInput(
                "Tên đề xuất",
                "Nhập tên đề xuất",
                true,
                true,
                "name_dx",
                "",
                false
              )}
            </Col>
            <Col lg={6} sm={12} xs={24}>
              {MyInput(
                "Họ và tên",
                "Vũ Văn Khá",
                false,
                true,
                "name",
                "",
                true,
                "#EDF3FF"
              )}
            </Col>
            <Col lg={6} sm={12} xs={24}>
              {MyInput(
                "Loại đề xuất",
                "Đề xuất nhập này nhận lương",
                false,
                true,
                "type_dx",
                "",
                true,
                "#EDF3FF"
              )}
            </Col>
            <Col sm={12} xs={24} className={styles.addElement}></Col>
            <Col sm={12} xs={24}>
              {MySelect(
                "Phòng ban",
                "Chọn phòng ban",
                true,
                true,
                "phong_ban",
                depLabel
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyDatePicker(
                "Ngày nhận lương",
                "Chọn ngày nhận lương",
                true,
                true,
                "ngay_nhan_luong"
              )}
            </Col>
            <Col sm={24} xs={24}>
              <MyTextArea
                name="ly_do"
                required={true}
                title="Lý do đề xuất nhận lương"
                hasLabel={true}
                placeholder="Nhập lý do đề xuất nhận lương"
              />
            </Col>
            <Col sm={12} xs={24}>
              {MySelectAcp(
                "Người xét duyệt",
                "Chọn người xét duyệt",
                true,
                true,
                "id_user_duyet",
                userLabel
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MySelectAcp(
                "Người theo dõi",
                "Chọn người theo dõi",
                true,
                true,
                "id_user_theo_doi",
                userLabel
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyInputFile(
                "Tài liệu dính kèm",
                "Thêm tài liệu đính kèm",
                true,
                true,
                "file_kem"
              )}
            </Col>
          </Row>
        </div>
        {DeXuatCongCongFooter(handleSubmit, () => null)}
      </Form>
    </div>
  );
}
