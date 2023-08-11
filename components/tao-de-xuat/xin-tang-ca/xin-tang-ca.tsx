import { Button, Col, Form, Input, Row, Select } from "antd";
import styles from "./xin-tang-ca.module.css";
import {
  IconSelect,
  Tep,
} from "@/components/cai-dat-luong/cai-dat-thue/danh-sach-nhan-su-chua-thiet-lap/anh";
import { useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { POST_VT } from "@/pages/api/BaseApi";
const tangca = [
  {
    value: 1,
    label: "Chọn ca tăng",
  },
  {
    value: 2,
    label: "Ca sáng LƯƠNG <= 5TR",
  },
  {
    value: 2,
    label: "Ca chiều LƯƠNG <= 5TR",
  },
  {
    value: 3,
    label: "Ca sáng 5TR < LƯƠNG <= 7TR",
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
export const XinTangCa: React.FC = () => {
  const [form] = Form.useForm();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const router = useRouter();
  const { TextArea } = Input;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredChonChucVu = OPTIONS.filter((x) => !selectedItems.includes(x));
  const [selectTheoDoi, setSelectTheoDoi] = useState<string[]>([]);
  const theodoi = options2.filter((x) => !selectTheoDoi.includes(x));

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
    //     time_tc: dayjs(value["time_tc"]).unix(),
    //   });

      POST_VT("api/vanthu/dexuat/De_Xuat_Xin_Bo_Nhiem", {
        ...value,
        id_user_duyet: value["id_user_duyet"]?.join(","),
        id_user_theo_doi: value["id_user_theo_doi"]?.join(","),
        time_tc: dayjs(value["time_tc"]).unix(),
      }).then((res) => {
        if (res?.result === true) {
          alert("Tạo đề xuất xin tăng ca thành công!");
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
        <p className={styles.textheader}>Đề xuất xin tăng ca</p>
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
            <Col md={6} xs={24} sm={12}>
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
            <Col md={6} xs={24} sm={12}>
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
                  defaultValue="Đề xuất xin tăng ca"
                  disabled
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24} className={styles.body2}>
            <Col sm={12} xs={24} className={styles.bodya1}>
              <Form.Item
                name={"time_tc"}
                className={styles.bodya}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Thời gian tăng ca</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <Input
                  className={styles.input}
                  placeholder="Thời gian tăng ca *"
                  size="large"
                  type="date"
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                name={"shift_id"}
                className={styles.bodya}
                label={
                  <div className={styles.label}>
                    <p className={styles.text}>Ca tăng</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <Select
                  className={`select_taodexuat ${styles.input}`}
                  placeholder="Chọn ca tăng"
                  options={tangca}
                  size="large"
                  suffixIcon={<IconSelect />}
                />
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
                    <p className={styles.text}>Lý do đề xuất tăng ca</p>
                    <p className={styles.dau}>*</p>
                  </div>
                }
                labelCol={{ span: 24 }}
              >
                <TextArea
                  style={{ resize: "none" }}
                  className={styles.input}
                  rows={5}
                  placeholder="Nhập lý do đề xuất tăng ca"
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
                  placeholder="Thêm tài liệu đính kèm"
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
