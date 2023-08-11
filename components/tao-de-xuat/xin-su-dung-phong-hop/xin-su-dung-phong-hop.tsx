import { Button, Col, Form, Input, Row, Select } from "antd";
import styles from "./xin-su-dung-phong-hop.module.css";
import {
  IconSelect,
  Tep,
} from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import { useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { POST_VT } from "@/pages/api/BaseApi";
const chonchucvu = [
  {
    value: 1,
    label: "Chọn Chức vụ",
  },
  {
    value: 2,
    label: "Sinh Viên Thực Tập",
  },
  {
    value: 3,
    label: "Nhân Viên Past Time",
  },
  {
    value: 4,
    label: "Nhân viên chính thức",
  },
  {
    value: 5,
    label: "Chọn Chức vụ",
  },
];
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
const options2 = ["Apples", "Nails", "Bananas", "Helicopters"];
const chonphongban = [
  {
    value: 1,
    label: "Chọn phòng ban",
  },
  {
    value: 2,
    label: "Kỹ Thuật",
  },
  {
    value: 3,
    label: "Biên Tập",
  },
];
export const XinSuDungPhongHop: React.FC = () => {
  const [form] = Form.useForm();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const { TextArea } = Input;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredChonChucVu = OPTIONS.filter((x) => !selectedItems.includes(x));
  const [selectTheoDoi, setSelectTheoDoi] = useState<string[]>([]);
  const theodoi = options2.filter((x) => !selectTheoDoi.includes(x));
  const router = useRouter();

  const userLabel = [
    { label: "Nguyễn Thu Trang", value: "1" },
    { label: "Lại Thị Trang", value: "2" },
    { label: "Phạm Xuân Nguyên Khôi", value: "3" },
  ];

  const handleSubmit = () => {
    form.validateFields().then((value) => {
    //   console.log({
    //     ...value,
    //     id_user_duyet: value["id_user_duyet"]?.join(","),
    //     id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
    //     bd_hop: dayjs(value["bd_hop_date"] + " " + value["bd_hop_time"]).unix(),
    //     end_hop: dayjs(
    //       value["end_hop_date"] + " " + value["end_hop_time"]
    //     ).unix(),
    //   });

      POST_VT("api/vanthu/dexuat/addDxPh", {
        ...value,
        id_user_duyet: value["id_user_duyet"]?.join(","),
        id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
        bd_hop: dayjs(value["bd_hop_date"] + " " + value["bd_hop_time"]).unix(),
        end_hop: dayjs(
          value["end_hop_date"] + " " + value["end_hop_time"]
        ).unix(),
      }).then((res) => {
        if (res?.result === true) {
          alert("Tạo đề xuất xin sử dụng phòng họp thành công!");
          router.replace(router.asPath);
        }
      });
    });
  };

  return (
    <div className={styles.khung}>
      <div className={styles.header}>
        <div className={styles.iconheader}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="22"
            viewBox="0 0 12 22"
            fill="none"
          >
            <path
              d="M10.5996 1.66189L1.12587 11.1356L10.5996 20.6094"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <p className={styles.textheader}>Đề xuất xin sử dụng phòng họp</p>
      </div>
      <div className={styles.body}>
        <Form
          form={form}
          className={`${styles.bodyform} mc`}
          initialValues={{ name: "khas" }}
        >
          <Row gutter={24} className={styles.body1}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={"name_dx"}
                className={styles.bodyk1}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Tên đề xuất</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <Input
                  className={styles.input}
                  placeholder="Nhập tên đề xuất"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xl={6} xs={24} sm={12}>
              <Form.Item
                name={"name"}
                className={styles.bodyk2}
                label={
                  <div>
                    <p className={styles.text}>Họ và tên</p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <Input
                  style={{ backgroundColor: "#EDF3FF" }}
                  className={styles.input}
                  defaultValue="Vu Van Kha"
                  disabled
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xl={6} xs={24} sm={12}>
              <Form.Item
                name={"type_dx"}
                className={styles.bodyk2}
                label={
                  <div>
                    <p className={styles.text}>Loại đề xuất</p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <Input
                  style={{ backgroundColor: "#EDF3FF" }}
                  className={styles.input}
                  defaultValue="Đề xuất xin sử dụng phòng họp"
                  disabled
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body2}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={"bd_hop_time"}
                className={styles.bodya}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Thời gian sử dụng từ</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <Input size="large" className={styles.input} type="time" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name={"bd_hop_date"}
                className={styles.bodya}
                label={
                  <div className={styles.label}>
                    <p className={styles.text} style={{ color: "white" }}>
                      .
                    </p>
                    <p className={styles.dau} style={{ color: "white" }}>
                      .
                    </p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <Input size="large" className={styles.input} type="date" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body3}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={"end_hop_time"}
                className={styles.bodyc}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Đến ngày</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <Input className={styles.input} type="time" size="large" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name={"end_hop_date"}
                className={styles.bodyc}
                label={
                  <div className={styles.label}>
                    <p className={styles.text} style={{ color: "white" }}>
                      .
                    </p>
                    <p className={styles.dau} style={{ color: "white" }}>
                      .
                    </p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <Input className={styles.input} type="date" size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row className={styles.body4}>
            <Col sm={24} xs={24}>
              <Form.Item
                name={"ly_do"}
                className={styles.bodyd}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>
                      Lý do đề xuất xin sử dụng phòng họp
                    </p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <TextArea
                  style={{ resize: "none" }}
                  className={styles.input}
                  rows={5}
                  placeholder="Nhập lý do đề xuất xin sử dụng phòng họp"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body5}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={"id_user_duyet"}
                className={styles.bodye}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Người xét duyệt</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <Select
                  className={styles.input}
                  placeholder="Chọn người xét duyệt"
                  options={userLabel}
                  onChange={setSelectedItems}
                  size="large"
                  value={selectedItems}
                  mode="multiple"
                  suffixIcon={<IconSelect />}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name={"id_user_theo_doi"}
                className={styles.bodye}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Người theo dõi</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <Select
                  className={`select_taodexuat ${styles.input}`}
                  placeholder="Chọn người theo dõi"
                  options={userLabel}
                  onChange={setSelectTheoDoi}
                  size="large"
                  value={selectTheoDoi}
                  mode="multiple"
                  suffixIcon={<IconSelect />}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body6}>
            <Col sm={12} xs={24}>
              <Form.Item
                name={"file_kem"}
                className={styles.bodyf}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Tài liệu đính kèm</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <Input
                  className={styles.input}
                  placeholder="Tài liệu đính kèm"
                  size="large"
                  suffix={<Tep />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles.footer}>
        <Button className={styles.huy}>
          <p className={styles.texthuy}>Hủy</p>
        </Button>
        <Button className={styles.tao} onClick={handleSubmit}>
          <p className={styles.texttao}>Tạo đề xuất</p>
        </Button>
      </div>
    </div>
  );
};
