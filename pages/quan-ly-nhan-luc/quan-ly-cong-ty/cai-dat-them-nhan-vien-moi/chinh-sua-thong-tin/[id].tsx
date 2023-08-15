import styles from "./index.module.css"
import { Button, Card, Col, Row } from "antd"
import {
  MyDatePicker,
  MyInput,
  MySelect
} from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal"

export default function ChinhSuaChiTiet() {
  return (
    <div style={{ marginBottom: "60px" }}>
      <Card>
        <Row gutter={[20, 0]}>
          <Col md={12} sm={24} xs={24}>
            {MyInput("ID", "ID", true, true, "", "", true)}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MySelect("Công ty", "", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MyInput("Họ và tên", "abc", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MyInput("Email", "", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MyInput("Số điện thoại", "", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MyInput("Địa chỉ", "", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MySelect("Giới tính", "", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MyDatePicker("Ngày sinh", "", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MySelect("Trình độ học vấn", "", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MySelect("Tình trạng hôn nhân", "", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MySelect("Kinh nghiệm làm việc", "", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MyDatePicker("Ngày bắt đầu làm việc", "", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MySelect("Phòng ban", "", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MySelect("Chức vụ", "", true, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MySelect("Tổ", "", false, true, "")}
          </Col>
          <Col md={12} sm={24} xs={24}>
            {MySelect("Nhóm", "", false, true, "")}
          </Col>

          <Col
            md={24}
            sm={24}
            xs={24}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button
              className={styles.btn}
              style={{
                marginRight: " 20px",
                border: "1px solid #4C5BD4",
                marginTop: " 20px"
              }}
              size="large"
            >
              <p style={{ color: "#4C5BD4" }}>Hủy</p>
            </Button>
            <Button
              className={styles.btn}
              style={{
                marginLeft: " 20px",
                backgroundColor: "#4C5BD4",
                marginTop: " 20px"
              }}
              size="large"
            >
              <p style={{ color: "#fff" }}>Cập nhật</p>
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
