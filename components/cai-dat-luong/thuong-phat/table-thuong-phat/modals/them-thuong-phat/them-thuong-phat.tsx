import { Modal, Form, Input, Checkbox, Radio, Table, Button } from "antd"
import styles from "./them-thuong-phat.module.css"
import Image from "next/image"
import moment from "moment"
import _ from "lodash"
import { POST_TL } from "@/pages/api/BaseApi"
import { useRouter } from "next/router"

export function ModalThemThuongPhat(
  open: boolean,
  setOpen: Function,
  setNext: Function,
  rowSelectKey: any,
  setRowSelectKey: Function,
  selectedData: any,
) {
  const [form] = Form.useForm()
  const { TextArea } = Input
  const router = useRouter()

  const onFinish = async (value) => {
    // console.log(value)
    const body = {
      ...value,
      pay_price: value?.pay_price && parseInt(value?.pay_price),
      pay_id_user: selectedData?.inforUser?.idQLC,
      pay_id_com:  selectedData?.inforUser?.inForPerson?.employee?.com_id,
      pay_year: value?.pay_day && moment(value?.pay_day)?.year(),
      pay_month: value?.pay_day && moment(value?.pay_day)?.month() + 1
    }

    const res = await POST_TL('api/tinhluong/congty/insert_thuong_phat', body)

    if(res?.message === 'success'){
      router.replace(router.asPath)
    }
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={1200}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Thưởng phạt</div>
        <Image
          alt="/"
          src={"/cross.png"}
          width={14}
          height={14}
          onClick={() => setOpen(false)}
        />
      </div>
      <div className={styles.body}>
        <Form form={form} onFinish={onFinish}>
          <div className={styles.bodyLeft}>
            <Form.Item
              className={styles.formItem}
              name={"pay_price"}
              labelCol={{ span: 24 }}
              label={"Tiền thưởng phạt"}
              rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
            >
              <Input type="number" size="large" suffix={<div>VNĐ</div>}></Input>
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              name={"pay_status"}
              labelCol={{ span: 24 }}
              // initialValue={'1'}
            >
              <Radio.Group className={styles.radioGroup} 
              // defaultValue={"1"}
              >
                <Radio className={styles.radio} value={1}>
                  Tiền thưởng
                </Radio>
                <Radio className={styles.radio} value={2}>
                  Tiền phạt
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              name={"pay_day"}
              labelCol={{ span: 24 }}
              label={"Ngày áp dụng"}
              rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
            >
              <Input type="date" size="large"></Input>
            </Form.Item>
            <Form.Item
              className={styles.formItem}
              name={"pay_case"}
              labelCol={{ span: 24 }}
              label={"Lý do"}
              rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
            >
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item className={styles.formButton}>
              <Button size="large" htmlType="submit">
                Thêm thưởng phạt
              </Button>
            </Form.Item>
          </div>
        </Form>
        <div className={styles.bodyRight}>
          {!_.isEmpty(selectedData?.tt_thuong?.ds_thuong) && (
            <Table
              className={`green-table-bodyBorder`}
              pagination={false}
              scroll={{ x: "max-content" }}
              dataSource={selectedData?.tt_thuong?.ds_thuong}
              columns={[
                {
                  title: <p style={{ color: "#fff" }}>Tiền thưởng</p>,
                  align: "center",
                  render: (record) => (
                    <p style={{ color: "#34B171" }}>
                      {record?.pay_price || 0} VNĐ
                    </p>
                  )
                },
                {
                  title: <p style={{ color: "#fff" }}>Ngày áp dụng</p>,
                  align: "center",
                  render: (record) => (
                    <p>
                      {record?.pay_day &&
                        moment(record?.pay_day)?.format("DD-MM-YYYY")}
                    </p>
                  )
                },
                {
                  title: <p style={{ color: "#fff" }}>Lý do</p>,
                  align: "center",
                  render: (record) => <p>{record?.pay_case}</p>
                },
                {
                  title: <p style={{ color: "#fff" }}>Điều chỉnh</p>,
                  align: "center",
                  render: (record) => (
                    <div className={styles.actionGroup}>
                      <Image
                        alt="/"
                        src={"/edit.png"}
                        width={24}
                        height={24}
                        onClick={() => {
                          setNext(true)
                          setOpen(false)
                          setRowSelectKey(record
                          )
                        }}
                      />
                      <div className={styles.divider}></div>
                      <Image
                        alt="/"
                        src={"/delete-icon.png"}
                        width={24}
                        height={24}
                      />
                    </div>
                  )
                }
              ]}
              
            ></Table>
          )}
          {!_.isEmpty(selectedData?.tt_phat?.ds_phat) && (
            <Table
              className={`green-table-bodyBorder ${styles.tableBottom}`}
              pagination={false}
              scroll={{ x: "max-content" }}
              dataSource={selectedData?.tt_phat?.ds_phat}
              columns={[
                {
                  title: <p style={{ color: "#fff" }}>Tiền phạt</p>,
                  align: "center",
                  render: (record) => (
                    <p style={{ color: "#FF5B4D" }}>{record?.pay_price} VNĐ</p>
                  )
                },
                {
                  title: <p style={{ color: "#fff" }}>Ngày áp dụng</p>,
                  align: "center",
                  render: (record) => (
                    <p>
                      {" "}
                      {record?.pay_day &&
                        moment(record?.pay_day)?.format("DD-MM-YYYY")}
                    </p>
                  )
                },
                {
                  title: <p style={{ color: "#fff" }}>Lý do</p>,
                  align: "center",
                  render: (record) => <p>{record?.pay_case}</p>
                },
                {
                  title: <p style={{ color: "#fff" }}>Điều chỉnh</p>,
                  align: "center",
                  render: (record) => (
                    <div className={styles.actionGroup}>
                      <Image
                        alt="/"
                        src={"/edit.png"}
                        width={24}
                        height={24}
                        onClick={() => {
                          setNext(true)
                          setOpen(false)
                          setRowSelectKey(record)
                        }}
                      />
                      <div className={styles.divider}></div>
                      <Image
                        alt="/"
                        src={"/delete-icon.png"}
                        width={24}
                        height={24}
                      />
                    </div>
                  )
                }
              ]}
            ></Table>
          )}
        </div>
      </div>
    </Modal>
  )
}
