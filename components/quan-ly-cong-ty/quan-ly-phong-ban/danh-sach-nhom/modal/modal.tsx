import { ModalWrapper } from "@/components/modal/ModalWrapper";
import {
  MyInput,
  MySelect,
} from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal";
import { DELETE, POST } from "@/pages/api/BaseApi";
import { Form } from "antd";
import { error } from "console";
import Image from "next/image";
import { useEffect } from "react";

export function UpdateNhomModal(
  open: boolean,
  setOpen: Function,
  data?: any,
  setData?: Function,
  selectedRow?: any
) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(selectedRow);
  }, [form, selectedRow]);

  const handleSubmit = () => {
    // console.log("update a group!");
    // console.log({
    //   ...form.getFieldsValue(),
    //   gr_id: selectedRow?.gr_id,
    //   dep_id: selectedRow?.dep_id,
    //   team_id: selectedRow?.team_id,
    // });

    //close modal
    setOpen(false)

    POST("api/qlc/group/edit", {
      ...form.getFieldsValue(),
      gr_id: selectedRow?.gr_id,
      dep_id: selectedRow?.dep_id,
      team_id: selectedRow?.team_id,
    }).then((res) => {
      console.log(res?.message);
      setData &&
        setData(
          data.map((gr) => {
            if (gr === selectedRow) {
              return {
                ...form.getFieldsValue(),
                gr_id: selectedRow?.gr_id,
                dep_id: selectedRow?.dep_id,
                team_id: selectedRow?.team_id,
              };
            }
            return gr;
          })
        );
    });
  };

  const children = (
    <div>
      <Form form={form} initialValues={selectedRow}>
        {MySelect("Công ty", "Chọn công ty", true, true, "com_id", [{ label: "Công ty thanh toán Hưng Hà 2", value: 3312}])}
        {MySelect("Phòng ban", "Chọn phòng ban", true, true, "dep_id", [
          { label: "Phòng kỹ thuật", value: 1 },
          { label: "Phòng kinh doanh", value: 2 },
        ])}
        {MySelect("Tổ", "Chọn tổ", true, true, "team_id", [
          { label: "Tổ NodeJs", value: 1 },
          { label: "Tổ tester", value: 2 },
        ])}
        {MyInput("Tên nhóm", "Nhập tên nhóm", true, true, "gr_name")}
      </Form>
    </div>
  );

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    "Chỉnh sửa nhóm",
    "Cập nhật",
    handleSubmit
  );
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
        justifyContent: "center",
      }}
    >
      <Image alt="/" src={"/big-x.png"} width={50} height={50} />
      <p style={{ marginTop: "20px" }}>Bạn có chắc chắn muốn xóa {name} ?</p>
    </div>
  );

  const onConfirm = () => {
    // console.log(selectedRow)
    // console.log({ gr_id: selectedRow?.gr_id })

    //close modal
    setOpen(false)

    if (selectedRow) {
      if (selectedRow.gr_id) {
        DELETE('api/qlc/group/del', { gr_id: selectedRow.gr_id })
          .then(res => {
            // console.log(res)
            setData && setData(data?.filter((item: any) => item !== selectedRow));
          })
          .catch(error => console.log(error))
      }

    }
  };

  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    "Xóa nhóm",
    "Đồng ý",
    onConfirm
  );
}

export function AddNewModal(
  open: boolean,
  setOpen: Function,
  data?: any,
  setData?: Function
) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    // console.log("create a new group!");
    // console.log(form.getFieldsValue());
    
    //close modal
    setOpen(false)

    POST('api/qlc/group/create', form.getFieldsValue())
      .then(res => {
        console.log(res?.message)
        setData && setData([...data, res?.data])
      })
  };

  const children = (
    <Form form={form} initialValues={{ gr_name: '', dep_id: 1, team_id: 1}}>
      {MySelect("Công ty", "Chọn công ty", true, true, "com_id", [{ label: "Công ty thanh toán Hưng Hà 2", value: 3312}])}
      {MySelect("Phòng ban", "Chọn phòng ban", true, true, "dep_id", [
        { label: "Phòng kỹ thuật", value: 1 },
        { label: "Phòng kinh doanh", value: 2 },
      ])}
      {MySelect("Tổ", "Chọn tổ", true, true, "team_id", [
        { label: "Tổ NodeJs", value: 1 },
        { label: "Tổ tester", value: 2 },
      ])}
      {MyInput("Tên nhóm", "Nhập tên nhóm", true, true, "gr_name")}
    </Form>
  );

  return ModalWrapper(
    open,
    setOpen,
    children,
    600,
    "Thêm mới nhóm",
    "Thêm mới",
    handleSubmit
  );
}
