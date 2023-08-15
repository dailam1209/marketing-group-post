import { Row, Col, Modal, Input, Checkbox, Button, Form, Select, Skeleton  } from "antd"
import styles from "./modal-them-moi-phuc-loi.module.css"
import Image from "next/image"
import { useState } from "react";
import { POST_TL } from "@/pages/api/BaseApi";
import { toInteger } from "lodash";

export function ModalThemMoiPhucLoi(
    openFilterAddWelfareClick: boolean,
    setOpenFilterAddWelfareClick: Function,
    data:any,
    setData:Function
)  {

    const [form] = Form.useForm();
    const Save = () => {
        setOpenFilterAddWelfareClick(false)
    }
    const onFinish = async(value)=>{
        let finalValue = {
            ...value,
            cl_salary:parseInt(value?.cl_salary),
            cl_active:1,
            cl_type:3,
            cl_com:3312
        }
        setOpenFilterAddWelfareClick(false)
        const res = await POST_TL(
            'api/tinhluong/congty/insert_phuc_loi',
            finalValue
        )
        if(res){
            // console.log(123)
            setData([res?.newobj,...data])
        }
    }
    const typeOfWelfareOptions = [
        {value:0, label:"Thu nhập chịu thuế"},
        {value:1, label:"Thu nhập miễn thuế"},
      ];

    return (
      <Modal
        open={openFilterAddWelfareClick}
        closable={false}
        width={700}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        className={`modal_chinh_sua_nhan_vien_phuc_loi`}
      >
        <div className={styles.header}>
            <div className={styles.textHead}>Thêm mới phúc lợi</div>
            <div className={styles.crossImage}>
                <Image
                    alt="/"
                    src={"/cross.png"}
                    width={14}
                    height={14}
                    onClick={() => setOpenFilterAddWelfareClick(false)}
                />
            </div>  
        </div>

        <div className={styles.body}>
        <Form
        form={form}
        onFinish={onFinish}
        >
            <Form.Item
            rules={[{ required: true, message: 'Bắt buộc điền tên phúc lợi!' }]}
            name="cl_name"
            >
                <div className={styles.bodyItem}>
                    <span style={{ fontSize:"16px" }}>Tên phúc lợi<span style={{ color: "red" }}>*</span></span>
                    <Input
                        required
                        type="text"
                        style={{ width: "100%", fontSize:"16px" }}
                        placeholder="Nhập tên phúc lợi"
                    ></Input>
                </div>
            </Form.Item>

            <Form.Item
            rules={[{ required: true, message: 'Bắt buộc điền tiền phúc lợi!' }]}
            name="cl_salary"
            >
                <div className={styles.bodyItem}>
                <span style={{ fontSize:"16px" }}>Tiền phúc lợi <span style={{ color: "red" }}>*</span></span>
                    <Input
                        required
                        type="number"
                        style={{ width: "100%", fontSize:"16px" }}
                        placeholder="Nhập số tiền phúc lợi"
                        suffix={"VNĐ"}
                    ></Input>
                </div>
            </Form.Item>
            <div className={styles.bodyItem}>

            <div style={{ fontSize:"16px" }}>Chọn loại <span style={{ color: "red" }}>*</span></div>
                <Form.Item name="cl_type_tax" label="" rules={[{ required: true, message: 'Bắt buộc điền loại thuế!' }]}>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Chọn loại bảo hiểm"
                    className={styles.selectYeah}
                    options={typeOfWelfareOptions}
                />
                </Form.Item> 
            </div>
            <div className={styles.formContainer}>
                <div className={styles.bodyItem}>
                <span style={{ fontSize:"16px" }}>Áp dụng từ ngày <span style={{ color: "red" }}>*</span></span>
                    <Form.Item
                    rules={[{ required: true, message: 'Bắt buộc điền ngày áp dụng!' }]}
                    name="cl_day"
                    >
                    
                        <Input
                            required
                            type="month"
                            style={{ width: "100%", fontSize:"16px" }}
                            placeholder="Chọn tháng"
                        ></Input>
                    
                    </Form.Item>
                </div>
                <div className={styles.bodyItem}>
                <span style={{ fontSize:"16px" }}>Đến ngày (Không bắt buộc)</span>
                    <Form.Item name="cl_day_end">
                    
                        <Input
                            type="month"
                            style={{ width: "100%", fontSize:"16px" }}
                            placeholder="Chọn tháng"
                        ></Input>
                    
                    </Form.Item>
                </div>
            </div>

            <Form.Item name="cl_note">
            <div className={styles.bodyItem}>
                <span style={{ fontSize:"16px" }}>Ghi chú</span>
                <Input.TextArea
                    style={{ width: "100%", fontSize:"16px", minHeight:"104px" }}
                    placeholder="Nhập ghi chú nếu có"
                ></Input.TextArea>
            </div>
            </Form.Item>

            <Form.Item>
            <div className={styles.hasButton}>
            <Button className={styles.ButtonWhite} onClick={Save}>
                <p style={{ color: '#4C5BD4', fontSize: '18px'}}>Hủy bỏ</p>
            </Button>
            <Button className={styles.Button} htmlType="submit">
                <p className={styles.txt}>Thêm mới</p>
            </Button>
            </div>
            </Form.Item>
        </Form>
        </div>
      </Modal>
    )
}