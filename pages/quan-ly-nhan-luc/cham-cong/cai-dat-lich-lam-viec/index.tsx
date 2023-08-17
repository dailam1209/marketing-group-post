import styles from "./cai-dat-lich-lam-viec.module.css";
import { Card, Row, Col, Button, Form, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import caiDatLichLamViec from "@/components/cham-cong/cai-dat-lich-lam-viec/lich-lam-viec";
import { useEffect, useState } from "react";
import {
  ModalThemLichLamViec,
  ModalTiepTuc,
} from "@/components/cham-cong/cai-dat-lich-lam-viec/modal/modal-them-lich/moda-them-lich-lam-viec";
import { ModalThemCa } from "@/components/cham-cong/cai-dat-lich-lam-viec/modal/modal-them-ca/modal-them-ca";
import { SaoChepLich } from "@/components/cham-cong/cai-dat-lich-lam-viec/modal/modal-sao-chep-lich/sao-chep-lich";
import { GET, POST, POST_SS } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";
import dayjs from "dayjs";

const years = [
  {
    value: "2023",
    label: "Năm 2023",
  },
  {
    value: "2024",
    label: "Năm 2024",
  },
  {
    value: "2025",
    label: "Năm 2025",
  },
  {
    value: "2026",
    label: "Năm 2026",
  },
];
const months = [
  {
    value: "01",
    label: "Tháng 01",
  },
  {
    value: "02",
    label: "Tháng 02",
  },
  {
    value: "03",
    label: "Tháng 03",
  },
  {
    value: "04",
    label: "Tháng 04",
  },
  {
    value: "05",
    label: "Tháng 05",
  },
  {
    value: "06",
    label: "Tháng 06",
  },
  {
    value: "07",
    label: "Tháng 07",
  },
  {
    value: "08",
    label: "Tháng 08",
  },
  {
    value: "09",
    label: "Tháng 09",
  },
  {
    value: "10",
    label: "Tháng 10",
  },
  {
    value: "11",
    label: "Tháng 11",
  },
  {
    value: "12",
    label: "Tháng 12",
  },
];

export default function LichLamViec({ listCalendar }) {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalNext, setModalNext] = useState(false);
  const [modalCa, setModalCa] = useState(false);
  const [modelSaoChep, setModalSaoChep] = useState(false);
  const [totalData, setTotalData] = useState(listCalendar?.data);
  const [data, setData] = useState(
    listCalendar?.data.filter(
      (item) => item.apply_month.substring(0, 7) === dayjs().format("YYYY-MM")
    )
  );
  const [cySelected, setCySelected] = useState(Object());
  const [dateFilter, setDateFilter] = useState(dayjs().format("YYYY-MM"));
  const router = useRouter()
  console.log(listCalendar)

  const [form] = Form.useForm();

  const handleSubmitAddCy = () => {
    form.validateFields().then((value) => {
      
      POST("api/qlc/cycle/create", {
        cy_name: form.getFieldValue("cy_name"),
        apply_month: form.getFieldValue("apply_month"),
      cy_detail: JSON.stringify(form.getFieldValue("cy_detail")),
      }).then((res) => {
        if (res?.result === true) {
          router.replace(router.asPath)
        }
      });
    });
  };

  useEffect(() => {
    if (totalData) {
      const dateForSearch =
        form.getFieldValue("year") + "-" + form.getFieldValue("month");
      setData(
        totalData?.filter(
          (item) => item.apply_month.substring(0, 7) === dateForSearch
        )
      );
    }
  }, [totalData]);

  const handleChange = () => {
    const dateForSearch =
      form.getFieldValue("year") + "-" + form.getFieldValue("month");
    setData(
      totalData.filter(
        (item) => item?.apply_month.substring(0, 7) === dateForSearch
      )
    );
    setDateFilter(dateForSearch);
  };

  return (
    <Card>
      <div>
        <Form form={form} initialValues={{ year: dayjs().format("YYYY"), month: dayjs().format("MM") }}>
          <div style={{ borderBottom: "1px #B6B6B6 solid" }}>
            <div className={styles.nav}>Lịch làm việc chung</div>
          </div>
          <div>
            <Row style={{ marginTop: "20px" }}>
              <Col lg={6} md={5} sm={0} xs={0}></Col>
              <Col lg={18} md={19} sm={24} xs={24}>
                <Row gutter={10} justify="end">
                  <Col lg={7} md={6} sm={7} xs={12}>
                    <Form.Item name="year">
                      <Select
                        suffixIcon={<SearchOutlined rev={""} />}
                        showSearch
                        options={years}
                        onChange={handleChange}
                        defaultValue={dayjs().format("YYYY")}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={7} md={6} sm={7} xs={12}>
                    <Form.Item name="month">
                      <Select
                        suffixIcon={<SearchOutlined rev={""} />}
                        showSearch
                        options={months}
                        onChange={handleChange}
                        defaultValue={dayjs().format("MM")}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={3} md={4} sm={4} xs={7}>
                    <Button
                      className={`${styles.button} ${styles.buttonPlus}`}
                      onClick={() => setModalAdd(true)}
                    >
                      <div className={styles.plus}>+</div>
                      <div>Thêm lịch</div>
                    </Button>
                  </Col>
                  <Col
                    lg={4}
                    md={5}
                    sm={5}
                    xs={9}
                    style={{ justifyContent: "center" }}
                  >
                    <Button
                      className={`${styles.button} ${styles.buttonCopy}`}
                      onClick={() => setModalSaoChep(true)}
                    >
                      <img
                        src="/copy.png"
                        style={{
                          height: "22px",
                          width: "22px",
                          marginRight: "6px",
                          marginLeft: "6px",
                        }}
                      ></img>
                      <div>Sao chép lịch</div>
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div style={{ marginTop: "10px" }}>
            {caiDatLichLamViec(data, listCalendar)}
          </div>
          {ModalThemLichLamViec(
            modalAdd,
            setModalAdd,
            setModalNext,
            totalData,
            setTotalData,
            setCySelected,
            form
          )}
          {ModalTiepTuc(modalNext, setModalNext, setModalAdd, setModalCa, form)}
          {ModalThemCa(
            modalCa,
            setModalCa,
            setModalNext,
            form,
            handleSubmitAddCy,
            "T2T7"
          )}
          {SaoChepLich(modelSaoChep, setModalSaoChep, data, dateFilter)}
        </Form>
      </div>
    </Card>
  );
}

export const getServerSideProps = async (context) => {
  const listCalendar = await POST_SS("api/qlc/cycle/list", {}, context);

  return {
    props: {
      listCalendar,
    },
  };
};
