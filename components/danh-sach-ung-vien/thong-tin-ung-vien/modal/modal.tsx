import { ModalWrapper } from "@/components/modal/ModalWrapper"
import {
  MyInput,
  MyRating,
  MySelect,
  MyTextArea
} from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal"
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Rate,
  Select,
  Space
} from "antd"
import dayjs from "dayjs"
import Image from "next/image"
import styles from "./modal.module.css"
import { useEffect } from 'react'

export function UpdateAttendantInfoModal({
  open,
  setOpen,
  data,
  setData
}: {
  open: boolean
  setOpen: any
  data: any
  setData: any
}) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({...data, timeSendCv: dayjs(data?.timeSendCv)})
  }, [form, data])

  const onFinish = () => {
    form.validateFields().then((value: any) => {
      console.log(value)
    })
  }

  const Skills = ({
    name,
    title,
    required
  }: {
    name: string
    title: string
    required: boolean
  }) => {
    return (
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restFields }) => (
              <Space
                key={key}
                direction="horizontal"
                align="center"
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Form.Item
                  name={[name, "name"]}
                  required={true}
                  className={styles.input}
                >
                  <Input placeholder="Tên kỹ năng" size="large" />
                </Form.Item>

                <Form.Item name={[name, "rating"]} required={true}>
                  <Rate style={{ display: "flex", alignItems: "center" }} />
                </Form.Item>
                <Image
                  alt="/"
                  src={"/remove-icon.png"}
                  width={24}
                  height={24}
                  onClick={() => remove(name)}
                  style={{ marginLeft: "10px", marginBottom: "5px" }}
                />
              </Space>
            ))}
            <Form.Item>
              <Button onClick={() => add()} className={styles.btn}>
                <p style={{ color: "#4C5BD4", marginRight: "10px" }}>+</p>
                <p style={{ color: "#4C5BD4" }}>Thêm kỹ năng</p>
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    )
  }
  const children = (
    <Form form={form} initialValues={{...data, timeSendCv: dayjs(data?.timeSendCv)}}>
      {MyInput("Tên ứng viên", "Nhập tên ứng viên", true, true, "name")}
      {MyInput("Email", "Nhập Email", true, true, "email")}
      {MyInput("Số điện thoại", "Nhập Số điện thoại", true, true, "phone")}
      {MySelect("Giới tính", "Nhập Giới tính", true, true, "gender")}
      {MyInput("Ngày sinh", "Nhập Ngày sinh", true, true, "birthday")}
      {MyInput("Quê quán", "Nhập Quê quán", true, true, "hometown")}
      {MySelect(
        "Trình độ học vấn",
        "Nhập Trình độ học vấn",
        true,
        true,
        "education"
      )}
      {MyInput("Trường học", "Nhập Trường học", true, true, "school")}
      {MySelect(
        "Kinh nghiệm làm việc",
        "Nhập tên nhân viên tuyển dụng",
        true,
        true,
        "exp"
      )}
      {MySelect(
        "Tình trạng hôn nhân",
        "Nhập tên nhân viên tuyển dụng",
        true,
        true,
        "isMarried"
      )}
      {MyInput("Địa chỉ", "Nhập Địa chỉ", true, true, "address")}
      {MyInput("Nguồn ứng viên", "Nhập nguồn ứng viên", true, true, "cvFrom")}
      {MySelect(
        "Tên nhân viên tuyển dụng",
        "Nhập tên nhân viên tuyển dụng",
        true,
        true,
        "userHiring"
      )}
      {MySelect(
        "Tên nhân viên giới thiệu",
        "Nhập tên nhân viên giới thiệu",
        true,
        true,
        "userRecommend"
      )}
      {MySelect(
        "Vị trí tuyển dụng",
        "Nhập vị trí tuyển dụng",
        true,
        true,
        "Recruitment"
      )}
      <Form.Item
        name={"timeSendCv"}
        label={<p>Thời gian gửi hồ sơ</p>}
        rules={[
          {
            required: true,
            message: "Trường này là bắt buộc"
          }
        ]}
      >
        <DatePicker className={styles.datePicker} size="large" />
      </Form.Item>
      <MyRating
        hasLabel={true}
        name="starVote"
        required={true}
        title="Đánh giá hồ sơ"
      />
      <Skills name="listSkill" title="" required={true} />
      <Form.Item
        name={"cv"}
        label={<p>Tải lên tệp CV</p>}
        labelCol={{ span: 24 }}
        required
      >
        <Select
          mode="tags"
          suffixIcon={<Image alt="/" src={"/pon.png"} width={15} height={15} />}
        />
      </Form.Item>
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    "Chỉnh sửa hồ sơ ứng viên",
    "Cập nhật",
    () => onFinish()
  )
}
