import { ModalWrapper } from "@/components/modal/ModalWrapper"
import {
  MyInput,
  MySelect
} from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal"
import { DELETE, POST } from "@/pages/api/BaseApi"
import { Form } from "antd"
import Image from "next/image"
import { useEffect } from "react"
import styles from "./Modals.module.scss"

export function EditToModal(
  open: boolean,
  setOpen: Function,
  data?: any,
  setData?: Function,
  selectedRow?: any
) {
  const [form] = Form.useForm()

  useEffect(() => {
    // change selectedRow to change form
    form.setFieldsValue({ ...selectedRow, teamLeader: "", teamSubLeader: "" })
  }, [form, selectedRow])

  const handleSubmit = () => {
    console.log({ ...form.getFieldsValue(), _id: selectedRow._id })
    // popup "Confirm"
    // code for popup confim

    //close modal
    setOpen(false)

    // update edit data
    POST(`api/qlc/team/edit`, {
      team_id: selectedRow?.team_id,
      ...form.getFieldsValue()
    })
      .then((response) => {
        if (response?.result === true) {
          console.log(response?.message)
          // update data after edition
          setData &&
            setData(
              data.map((team) => {
                if (team === selectedRow) {
                  return { selectedRow, ...form.getFieldsValue() }
                }
                return team
              })
            )
        }
      })
      .catch((error) => console.error(error))
  }

  // console.log(selectedRow);

  const children = (
    <Form form={form} initialValues={selectedRow}>
      {MySelect("Công ty", "Chọn công ty", true, true, "com_id", [
        { label: "Công ty thanh toán Hưng Hà 2", value: 3312 }
      ])}
      {/* {MyInput("Tổ trưởng", "Bùi Văn Huy", false, false, "teamLeader")} */}
      {/* {MyInput(
        "Phó tổ trưởng",
        "Nguyễn Khánh Đức",
        false,
        true,
        "teamSubLeader"
      )} */}
      {MySelect("Phòng ban", "Chọn phòng ban", true, true, "dep_id", [
        { label: "Phòng kỹ thuật", value: 1 }
      ])}
      {MyInput("Tên tổ", "Nhập tên tổ", true, true, "teamName")}
      {/* total_emp can not update */}
      {/* {MyInput(
        "Số lượng nhân viên",
        "Nhập số lượng nhân viên",
        false,
        true,
        "total_emp",
        "number"
      )} */}
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    "Chỉnh sửa tổ",
    "Cập nhật",
    // () => null
    handleSubmit
  )
}

export function ConfirmDeleteModal(
  open: boolean,
  setOpen: Function,
  name: string,
  data?: any,
  setData?: Function,
  selectedRow?: any
) {
  const children = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Image alt="/" src={"/big-x.png"} width={50} height={50} />
      <p style={{ marginTop: "20px" }}>Bạn có chắc chắn muốn xóa {name} ?</p>
    </div>
  )

  const onConfirm = () => {
    // a row has selected
    if (selectedRow) {
      // console.log(selectedRow)

      //close modal
      setOpen(false)

      // delete seletedRow
      DELETE("api/qlc/team/del", { team_id: selectedRow.team_id })
        .then((res) => {
          // update data after deletion
          setData && setData(data?.filter((item: any) => item !== selectedRow))
        })
        .catch((err) => console.error(err))

      // alert OK
      // code show alert
    }
  }

  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    "Xóa tổ",
    "Đồng ý",
    onConfirm
  )
}

export function AddNewToModal(
  open: boolean,
  setOpen: Function,
  data?: any,
  setData?: Function
) {
  const [form] = Form.useForm()

  const handleSubmit = () => {
    console.log(form.getFieldsValue())
    // model "Confirm" popup
    // code for popup confirm


    //close modal
    setOpen(false)

    // add data
    POST(`api/qlc/team/create`, form.getFieldsValue())
      .then((res) => {
        console.log(res?.message)

        // update data after creation
        setData && setData([...data, res?.team])
      })
      .catch((err) => console.log(err))
  }

  const children = (
    <Form
      form={form}
      initialValues={{ com_id: 3312, teamName: "", dep_id: 1, total_emp: 0 }}
    >
      {MySelect("Công ty", "Chọn công ty", true, true, "com_id", [
        { label: "Công ty thanh toán Hưng Hà 2", value: 3312 },
      ])}
      {/* {MyInput("Tổ trưởng", "Bùi Văn Huy", false, false, "teamLeader")} */}
      {/* {MyInput(
        "Phó tổ trưởng",
        "Nguyễn Khánh Đức",
        false,
        true,
        "teamSubLeader"
      )} */}
      {MySelect("Phòng ban", "Kỹ thuật", true, true, "dep_id", [
        { label: "Phòng kỹ thuật", value: 1 }
      ])}
      {MyInput("Tên tổ", "Nhập tên tổ", true, true, "teamName")}
      {/* undefined properties total_emp */}
      {/* {MyInput(
        "Số lượng nhân viên",
        "Nhập số lượng nhân viên",
        false,
        true,
        "total_emp",
        "number"
      )} */}
    </Form>
  )

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    "Thêm mới tổ",
    "Thêm mới",
    handleSubmit
  )
}
