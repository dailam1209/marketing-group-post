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

export default function DeXuatXinDiMuonVeSom() {
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
        time_batdau: dayjs(
          `${dayjs(value["time_batdau"]).format("YYYY-MM-DD")} ${
            value["time_batdau_time"]
          }`
        ).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        time_ketthuc: dayjs(
          `${dayjs(value["time_batdau"]).format("YYYY-MM-DD")} ${
            value["time_ketthuc_time"]
          }`
        ).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
        // time_batdau_tomorrow: dayjs().diff(value["time_batdau"])?.[0] === "-" ? false : true,
        time_batdau_tomorrow:
          dayjs().diff(value["time_batdau"], "day") <= 0 ? true : false,
        time_ketthuc_tomorrow:
          dayjs().diff(value["time_batdau"], "day") <= 0 ? true : false,
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

      POST_VT("api/vanthu/dexuat/addDXDMVS", fd).then((res) => {

          alert("Tạo đề xuất xin đi muộn về sớm thành công!");
          router.replace(router.asPath);
      });
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <Image src={"/back-w.png"} alt="" width={24} height={24}></Image>
        <p className={styles.headerText}>Đề xuất xin đi muộn về sớm</p>
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
                "Đề xuất xin đi muộn về sớm",
                false,
                true,
                "type_dx",
                "",
                true,
                "#EDF3FF"
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MySelect(
                "Loại đề xuất",
                "Chọn loại công công",
                true,
                true,
                "type_duyet",
                typeOffLabel
              )}
            </Col>
            <Col sm={12} xs={24}>
              {MyDatePicker("Ngày", "Chọn ngày", true, true, "time_batdau")}
            </Col>
            <Col sm={12} xs={24}>
              {MySelect(
                "Ca làm việc",
                "Chọn ca làm việc",
                true,
                true,
                "ca_lam_viec",
                shiftLabel
              )}
            </Col>
            <Col sm={6} xs={24}>
              {MyTime("Thời gian bắt đầu", true, true, "time_batdau_time")}
            </Col>
            <Col sm={6} xs={24}>
              {MyTime("Thời gian kết thúc", true, true, "time_ketthuc_time")}
            </Col>
            <Col sm={24} xs={24}>
              <MyTextArea
                name="ly_do"
                required={true}
                title="Lý do xin đi muộn về sớm"
                hasLabel={true}
                placeholder="Nhập lý do xin đi muộn về sớm"
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
