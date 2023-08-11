import { Button, Form, Input, Modal } from "antd"
import styles from "./modals.module.css"
import Image from "next/image"
import { DELETE, POST } from "@/pages/api/BaseApi"
import { useRouter } from "next/router"

export const TYPE_ADD = "add"
export const TYPE_UPDATE = "update"

export function AddNewWifiModal(
  open: boolean,
  setOpen: Function,
  type: string,
  selectedRow: any,
  list: any,
  setList: any
) {
  const [form] = Form.useForm()
  const router = useRouter()

  const onFinish = async (value: any) => {
    if (value) {
      if (type === TYPE_ADD) {
        const res = await POST("api/qlc/TrackingWifi/create", value)
        if (res?.result === true) {
          setList([res?.tracking, ...list])
          setOpen(false)
        }
      } else {
        const body = {
          ...selectedRow,
          ...value
        }

        const res = await POST("api/qlc/TrackingWifi/edit", body)

        if (res?.result === true) {
          const editItemIndex = list?.findIndex(
            (item: any) => item?.wifi_id === selectedRow?.wifi_id
          )

          const newArr = list
          newArr[editItemIndex] = body

          setList(newArr)
          setOpen(false)
        }
      }
    }
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      destroyOnClose={true}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <p className={styles.headerText}>
          {type === TYPE_ADD ? "Thêm mới wifi" : "Cập nhật thông tin wifi"}
        </p>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          style={{ marginRight: "20px" }}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={type === TYPE_UPDATE ? selectedRow : null}
        >
          <p className={styles.inputHeader}>
            Tên Wifi <span style={{ color: "red" }}>*</span>
          </p>
          <Form.Item
            name="name_wifi"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Input size="large" placeholder="Nhập tên  wifi"/>
          </Form.Item>
          <p className={styles.inputHeader}>
            Địa chỉ MAC <span style={{ color: "red" }}>*</span>
          </p>
          <Form.Item
            name="ip_address"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Input size="large" placeholder="Nhập địa chỉ mac"/>
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button size="large" htmlType="submit" className={styles.addNewBtn}>
              <p className={styles.btnText}>
                {type === TYPE_ADD ? "Thêm mới" : "Cập nhật"}
              </p>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

// pop up

export function ConfirmModal(
  open: boolean,
  setOpen: Function,
  selectedRow: any,
  list: any,
  setList: any
) {
  const onYes = async () => {
    const res = await POST("api/qlc/TrackingWifi/delete", {
      wifi_id: selectedRow?.wifi_id
    })

    if (res?.result === true) {
      setList(
        list?.filter((item: any) => item?.wifi_id !== selectedRow?.wifi_id)
      )
      setOpen(false)
    }
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={450}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.confirmBody}>
        <Image alt="/" src={"/big-x.png"} width={50} height={50} />
        <p className={styles.alertText}>Hành động xóa không thể phục hồi.</p>
        <p>Bạn có chắc chắn muốn xóa?</p>
        <div className={styles.btnGroup}>
          <Button
            className={styles.abortBtn}
            size="large"
            onClick={() => setOpen(false)}
          >
            Hủy
          </Button>
          <Button className={styles.confirmBtn} size="large" onClick={onYes}>
            <p className={styles.text}>Đồng ý</p>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
