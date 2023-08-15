import { Row, Col, Modal, Input, Checkbox, Button, Form, Select, Skeleton  } from "antd"
const { Option } = Select;
import styles from "./modal-chinh-sua-nhan-vien.module.css"
import Image from "next/image"
import type { SelectProps } from 'antd';
import { useState } from "react";
import moment from "moment";

export function ModalChinhSuaNhanVien(
{
    openFilterSettingClick,
    setOpenFilterSettingClick,
    key
}:{
    openFilterSettingClick: boolean
    setOpenFilterSettingClick: any
    key: any
}) {
    const [form] = Form.useForm();
    const Save = () => {
      setOpenFilterSettingClick(false)
    }

    const [ monthFrom, setMonthFrom ] = useState('')
    const [ monthTo, setMonthTo ] = useState('')
    const [ url, setUrl ] = useState('/anhnhanvien.png')
    const [ name, setName ] = useState('NGUYỄN TIẾN LONG')
    const [ ID, setId ] = useState('131942')

    const handleSubmit = () => {
      const isFieldsFilled1 = form.getFieldValue("monthFrom");
      const isFieldsFilled2 = form.getFieldValue("monthTo");
      const isFieldsFilled3 = form.getFieldValue("insurance");
      // console.log(isFieldsFilled1)
      // console.log(isFieldsFilled3)
      
    //   if( (isFieldsFilled1 !== undefined) && ( isFieldsFilled3 !== undefined ) )
    //   {
        setMonthFrom(isFieldsFilled1)
        setMonthTo(isFieldsFilled2)
        setOpenFilterSettingClick(false)
    //   }
    }

    const handleInputMonthFromChange = (event) => {
      const inputValue = event.target.value;
    }

    const handleInputMonthToChange = (event) => {
      const inputValue = event.target.value;
    }

    return (
      <Modal
        open={openFilterSettingClick}
        closable={false}
        width={700}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        className={`modal_chinh_sua_nhan_vien_phuc_loi`}
      >
        <div className={styles.header}>
            <div className={styles.textHead}>Chỉnh sửa nhân viên phúc lợi</div>
            <div className={styles.crossImage}>
                <Image
                    alt="/"
                    src={"/cross.png"}
                    width={14}
                    height={14}
                    onClick={() => setOpenFilterSettingClick(false)}
                />
            </div>  
        </div>

        <div className={styles.body}>
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <div className={styles.bodyItem} style={{ borderBottom:"1px dashed rgba(0, 0, 0, 0.3)" }}>
            <Row>
              <Col>
                <Image src={key?.avatarUser ? `/${key?.avatarUser}` : "/anhnhanvien.png"} alt="" height={50} width={50} style={{ margin: "10px 10px 10px 10px" }} />
              </Col>
              <Col style={{ margin: "10px", display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                <div style={{ color:"#4C5BD4", fontSize:"16px" }}>{key?.userName}</div>
                <div style={{ fontSize:"16px" }}>ID: {key?.idQLC} </div>
              </Col>
            </Row>
          </div>
          <Form.Item
            rules={[{ required: true, message: 'Bắt buộc điền ngày áp dụng!' }]}
            name="monthFrom"
          >
            <div className={styles.bodyItem}>
              <span style={{ fontSize:"16px" }}>Áp dụng từ ngày <span style={{ color: "red" }}>*</span></span>
              <Input
                  required
                  type="month"
                  style={{ width: "100%", fontSize:"16px" }}
                  placeholder="Chọn tháng"
                  onChange={handleInputMonthFromChange}
                  defaultValue={moment(key?.cl_day).format("YYYY-MM")}
              ></Input>
            </div>
          </Form.Item>

          <Form.Item name="monthTo">
            <div className={styles.bodyItem}>
              <span style={{ fontSize:"16px" }}>Đến ngày (Không bắt buộc)</span>
              <Input
                  type="month"
                  style={{ width: "100%", fontSize:"16px" }}
                  onChange={handleInputMonthToChange}
                  placeholder="Chọn tháng"
                  defaultValue={moment(key?.cl_day_end).format("YYYY-MM")}
              ></Input>
            </div>
          </Form.Item>

          <Form.Item>
          <div className={styles.hasButton}>
            <Button className={styles.ButtonWhite} onClick={Save}>
              <p style={{ color: '#4C5BD4', fontSize: '18px'}}>Hủy</p>
            </Button>
            <Button className={styles.Button} htmlType="submit" onClick={handleSubmit}>
              <p className={styles.txt}>Cập nhật</p>
            </Button>
          </div>
          </Form.Item>
        </Form>
        </div>
      </Modal>
    )
  }