import {
  MyDatePicker,
  MyInput,
  MySelect,
  MyTextArea,
} from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal";
import styles from "./index.module.css";
import Image from "next/image";

import { Col, Form, Row } from "antd";
import {
  DeXuatCongCongFooter,
  MyInputFile,
  MySelectAcp,
  MyTime,
} from "@/components/tao-de-xuat/loai-de-xuat/tao-de-xuat/component/ChiTiet";

import { useRouter } from "next/router";
import { useState } from "react";
import dayjs from "dayjs";
import { POST_VT } from "@/pages/api/BaseApi";

export default function DeXuatCongCong() {
  const [form] = Form.useForm();
  const [fileData, setFileData] = useState<Blob>();

  const router = useRouter();

  const userLabel = [
    { label: "Nguyễn Thu Trang", value: "5" },
    { label: "Lại Thị Trang", value: "2" },
    { label: "Phạm Xuân Nguyên Khôi", value: "3" },
  ];

  const typeCcLabel = [
    { label: "Cộng công theo ca", value: 1 },
    { label: "Cộng công theo giờ", value: 2 },
  ];

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

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      const body = {
        ...value,
        id_user_duyet: value["id_user_duyet"]?.join(","),
        id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
        time_xnc: dayjs(value["time_xnc"]).unix(),
        time_vao_ca: dayjs(
          dayjs(value["time_xnc"]).format("YYYY-MM-DD") +
            " " +
            value["time_vao_ca"]
        ).unix(),
        time_het_ca: dayjs(
          dayjs(value["time_xnc"]).format("YYYY-MM-DD") +
            " " +
            value["time_het_ca"]
        ).unix(),
        ca_xnc: shiftLabel?.find((shift) => shift?.value === value["id_ca_xnc"])
          ?.label,
        file_kem: value["file_kem"]?.fileList[0]?.originFileObj,
      };
      //   console.log(body);
      const fd = new FormData();

      Object.keys(body)?.forEach((k) => {
        fd.append(k, body[k]);
      });
      POST_VT("api/vanthu/dexuat/addDXC", fd).then((res) => {
        if (res?.result === true) {
          alert("Tạo đề xuất cộng công thành công!");
          router.replace(router.asPath);
        }
      });
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <Image src={"/back-w.png"} alt="" width={24} height={24}></Image>
        <p className={styles.headerText}>Đề xuất cộng công</p>
      </div>
      <Form form={form} initialValues={{ name: "khas" }}>
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
            <Col sm={12} xs={24}>
              {MyInput(
                "Thành viên đề xuất",
                "Vũ Văn Khá",
                false,
                true,
                "name",
                "",
                true,
                "#EDF3FF"
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MySelect(
                "Loại công cộng",
                "Chọn loại công công",
                true,
                true,
                "type_dx",
                typeCcLabel
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyInput(
                "Loại đề xuất",
                "Đề xuất cộng công",
                false,
                true,
                "type_cc",
                "",
                true,
                "#EDF3FF"
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyDatePicker(
                "Ngày xác nhận",
                "Chọn ngày",
                true,
                true,
                "time_xnc"
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MySelect(
                "Ca làm việc",
                "Chọn ca xác nhận công",
                true,
                true,
                "id_ca_xnc",
                shiftLabel
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyTime("Thời gian bắt đầu", true, true, "time_vao_ca")}
            </Col>
            <Col sm={12} xs={24}>
              {MyTime("Thời gian kết thúc", true, true, "time_het_ca")}
            </Col>
            <Col sm={24} xs={24}>
              <MyTextArea
                name="ly_do"
                required={true}
                title="Lý do đề xuất xác nhận công"
                hasLabel={true}
                placeholder="Nhập lý do đề xuất xác nhận công"
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
