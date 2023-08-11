import { ModalWrapper } from "@/components/modal/ModalWrapper";
import {
  MyDatePicker,
  MyInput,
  MyInputPwd,
  MySelect,
} from "@/components/quan-ly-cong-ty/quan-ly-cong-ty-con/modal";
import { POST } from "@/pages/api/BaseApi";
import { Col, Form, Input, Row, Select } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function AddNewEmpModal(
  open: boolean,
  setOpen: Function,
  data?: any,
  setData?: Function,
) {
  const [listDepLabel, setListDepLabel]: any[] = useState([])
  const [listTeamLabel, setListTeamLabel]: any[] = useState([])
  const [listGrLabel, setListGrLabel]: any[] = useState([])
  const [comLabel, setComLabel]: any[] = useState({})


  const [form] = Form.useForm();
  const router = useRouter()

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      // if (
      //   form.getFieldValue("password") === form.getFieldValue("retypePassword")
      // ) {
      // } else {
      //   alert("Vui lòng nhập lại mật khẩu chính xác!");
      // }
      // console.log(value)
      POST("api/qlc/managerUser/create", value)
        .then((res) => {
          if (res?.result === true) {
            form.resetFields();
            setOpen(false);
            router.replace(router.asPath)
          }
        })
        .catch((err) => console.error(err));
    });
  };

  useEffect(() => {
    POST("api/qlc/team/list", {
      com_id: 1763}).then(res => {
        if (res?.result === true){
          setListTeamLabel(res?.data?.map(team => ({ label: team?.team_name, value: team?.team_id })))
        }
      })
  
    POST("api/qlc/department/list", {
      com_id: 1763
    })
      .then(res => {
        if (res?.result === true) {
          setListDepLabel(res?.data?.map(dep => ({ label: dep?.dep_name, value: dep?.dep_id })))
        }
      })
  
    POST("api/qlc/group/search", {
      com_id: 1763,
    })
      .then(res => {
        if (res?.result === true) {
          setListGrLabel(res?.data?.map(gr => ({ label: gr?.gr_name, value: gr?.gr_id })))
        }
      })

    POST("api/qlc/company/info", {})
      .then(res => {
        if (res?.result === true) {
          setComLabel({ label: res?.data?.userName, value: res?.data?.idQLC })
        }
      })
  }, [])

  const children = (
    <Form form={form}>
      <Row gutter={[20, 0]}>
        <Col md={12} sm={24} xs={24}>
          {MySelect("Công ty", "Chọn công ty", true, true, "com_id", [
            comLabel
          ])}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MyInput("Họ và tên", "Nhập họ và tên", true, true, "userName")}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MyInput(
            "Tài khoản đăng nhập",
            "Nhập số điện thoại",
            true,
            true,
            "phoneTK"
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MyInput(
            "Nhập số điện thoại",
            "Nhập số điện thoại",
            true,
            true,
            "phone"
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MyInput("Email", "Nhập email", true, true, "emailContact")}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MyInputPwd("Nhập mật khẩu", "Nhập mật khẩu", true, true, "password")}
        </Col>
        {/* <Col md={12} sm={24} xs={24}>
          {MyInputPwd(
            "Nhập lại mật khẩu",
            "Nhập lại mật khẩu",
            true,
            true,
            "retypePassword"
          )}
        </Col> */}
        <Col md={12} sm={24} xs={24}>
          {MyInput("Địa chỉ", "Nhập địa chỉ", true, true, "address")}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect(
            "Quyền truy cập",
            "Chọn quyền truy cập",
            true,
            true,
            "role",
            [
              { label: "Nhân viên", value: 1 },
              { label: "Tổ trưởng", value: 2 },
            ]
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect("Giới tính", "Chọn giới tính", true, true, "gender", [
            { label: "Nam", value: 1 },
            { label: "Nữ", value: 2 },
            { label: "Khác", value: 3 },
          ])}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {/* {MyInput("Ngày sinh", "dd/MM/YYYY", false, true, "birthday")} */}
          <Form.Item
            name={"birthday"}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ngày sinh của bạn!`,
              },
            ]}
            label={<p>Ngày sinh</p>}
            labelCol={{ span: 24 }}
          >
            <Input
              type="date"
              style={{ width: "100%", border: "1px solid #9F9F9F" }}
              size="large"
            />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect(
            "Trình độ học vấn",
            "Chọn trình độ học vấn",
            true,
            true,
            "education",
            [
              { label: "Chưa tốt nghiệp THPT", value: 1 },
              { label: "Tốt nghiệp THPT", value: 2 },
              { label: "Tốt nghiệp Đại học", value: 3 },
            ]
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect(
            "Tình trạng hôn nhân",
            "Chọn tình trạng hôn nhân",
            true,
            true,
            "isMarried",
            [
              { label: "Chưa kết hôn", value: 1 },
              { label: "Đã kết hôn", value: 2 },
              { label: "Chưa cưới", value: 3 },
            ]
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect(
            "Kinh nghiệm làm việc",
            "Chọn kinh nghiệm làm việc",
            true,
            true,
            "exp",
            [
              { label: "Chưa có kinh nghiệm", value: 1 },
              { label: "Kinh nghiệm dưới 1 năm", value: 2 },
              { label: "Kinh nghiệm trên 1 năm", value: 3 },
            ]
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {/* {MyInput("Ngày bắt đầu làm việc", "dd/MM/YYYY", false, true, "start_working_time")} */}
          <Form.Item
            name={"start_working_time"}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ngày bắt đầu làm việc của bạn!`,
              },
            ]}
            label={<p>Ngày bắt đầu làm việc</p>}
            labelCol={{ span: 24 }}
          >
            <Input
              type="date"
              style={{ width: "100%", border: "1px solid #9F9F9F" }}
              size="large"
            />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect("Phòng ban", "Chọn phòng ban", true, true, "dep_id", listDepLabel)}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect("Chức vụ", "Chọn chức vụ", true, true, "position_id", [
            { label: "Thành viên", value: 1 },
            { label: "Tổ trưởng", value: 2 },
          ])}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect("Tổ", "Chọn tổ", false, true, "team_id", listTeamLabel)}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect("Nhóm", "Chọn nhóm", false, true, "group_id", listGrLabel)}
        </Col>
      </Row>
    </Form>
  );

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    "Thêm mới nhân viên",
    "Thêm mới",
    () => handleSubmit()
  );
}

export function EditEmpModal(
  open: boolean,
  setOpen: Function,
  comLabel: any,
  listDepLabel: any,
  listTeamLabel: any,
  listGrLabel: any,
  data?: any,
  setData?: Function,
  currentRow?: any
) {
  const [detailEmp, setDetailEmp]: any = useState([]);
  const [form] = Form.useForm();
  const router = useRouter()

  useEffect(() => {
    if (currentRow) {
      POST("api/qlc/employee/info", {
        idQLC: currentRow?.idQLC,
      }).then((res) => {
        if (res?.result === true) {
          setDetailEmp(res?.data);
          form.setFieldsValue({
            ...res?.data,
            birthday: formatDate(new Date(res?.data?.birthday)),
            start_working_time: formatDate(
              new Date(res?.data?.start_working_time)
            ),
            team_id: res?.data?.inForPerson?.employee?.team_id,
            group_id: res?.data?.inForPerson?.employee?.group_id
          });
          console.log(res);
        }
      });
    }
  }, [currentRow]);

  const formatDate = (date = new Date()) => {
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });

    return [year, month, day].join("-");
  };

  const handleSubmit = () => {
    // date to timestamp
    // birthday: new Date(
    //   Number(form.getFieldValue("birthday").substring(0, 4)),
    //   Number(form.getFieldValue("birthday").substring(5, 7)) - 1,
    //   Number(form.getFieldValue("birthday").substring(8))
    // ).getTime(),
    // start_working_time: new Date(
    //   Number(form.getFieldValue("start_working_time").substring(0, 4)),
    //   Number(form.getFieldValue("start_working_time").substring(5, 7)) - 1,
    //   Number(form.getFieldValue("start_working_time").substring(8))
    // ).getTime(),
    // console.log({
    //   ...form.getFieldsValue(),
    //   _id: detailEmp?._id,
    //   role: "0",
    //   gender: `${form.getFieldValue('gender')}`,
    //   education: `${form.getFieldValue('education')}`,
    //   married: `${form.getFieldValue('married')}`,
    //   experience: `${form.getFieldValue('experience')}`,
    // });
    form.validateFields().then((value) => {
      POST("api/qlc/managerUser/edit", {
        ...form.getFieldsValue(),
        _id: detailEmp?._id,
        gender: `${form.getFieldValue("gender")}`,
        education: `${form.getFieldValue("education")}`,
        married: `${form.getFieldValue("married")}`,
        experience: `${form.getFieldValue("experience")}`,
        role: "0",
      })
        .then((res) => {
          if (res?.result === true) {
            setOpen(false);
            router.replace(router.asPath)
          }
        })
        .catch((err) => console.error(err));
    });
  };

  const children = (
    <Form
      form={form}
      initialValues={{
        ...detailEmp,
        birthday: formatDate(new Date(detailEmp?.birthday)),
        start_working_time: formatDate(new Date(detailEmp?.start_working_time)),
      }}
    >
      <Row gutter={[20, 0]}>
        <Col md={12} sm={24} xs={24}>
          <Form.Item name={"idQLC"} label={<p>ID</p>} labelCol={{ span: 24 }}>
            <Input
              style={{
                width: "100%",
                border: "1px solid #9F9F9F",
                color: "#474747",
              }}
              size="large"
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect("Công ty", "Chọn công ty", true, true, "com_id", [
            comLabel
          ])}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MyInput("Họ và tên", "Nhập họ và tên", true, true, "userName")}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MyInput(
            "Tài khoản đăng nhập",
            "Nhập số điện thoại",
            true,
            true,
            "phoneTK"
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {/* {MyInput("Số điện thoại", "Nhập số điện thoại", true, true, "phone")} */}
          {MyInput("Mật khẩu", "Nhập mật khẩu", true, true, "password")}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MyInput("Địa chỉ", "Nhập địa chỉ", true, true, "address")}
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            name={"birthday"}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ngày sinh của bạn!`,
              },
            ]}
            label={<p>Ngày sinh</p>}
            labelCol={{ span: 24 }}
          >
            <Input
              type="date"
              style={{ width: "100%", border: "1px solid #9F9F9F" }}
              size="large"
            />
          </Form.Item>
        </Col>

        <Col md={12} sm={24} xs={24}>
          {MySelect("Giới tính", "Chọn giới tính", true, true, "gender", [
            { label: "Nam", value: 0 },
            { label: "Nữ", value: 1 },
            { label: "Khác", value: 2 },
          ])}
        </Col>

        <Col md={12} sm={24} xs={24}>
          {MySelect(
            "Trình độ học vấn",
            "Chọn trình độ học vấn",
            true,
            true,
            "education",
            [
              { label: "Chưa tốt nghiệp THPT", value: 1 },
              { label: "Đã tốt nghiệp THPT", value: 2 },
              { label: "Đã tốt nghiệp Đại học", value: 3 },
            ]
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect("Tình trạng hôn nhân", "Độc thân", false, true, "married", [
            { label: "Chưa kết hôn", value: 1 },
            { label: "Đã kết hôn", value: 2 },
            { label: "Đã có con", value: 3},
          ])}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect(
            "Kinh nghiệm làm việc",
            "Chưa có kinh nghiệm",
            true,
            true,
            "experience",
            [
              { label: "Chưa có kinh nghiệm", value: 1 },
              { label: "Kinh nghiệm dưới 1 năm", value: 2 },
              { label: "Kinh nghiệm trên 1 năm", value: 3 },
            ]
          )}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {/* {MyInput("Ngày bắt đầu làm việc", "dd/MM/YYYY", true, true, "start_working_time")} */}
          <Form.Item
            name={"start_working_time"}
            rules={[
              {
                required: true,
                message: `Vui lòng nhập ngày bắt đầu làm việc của bạn!`,
              },
            ]}
            label={<p>Ngày bắt đầu làm việc</p>}
            labelCol={{ span: 24 }}
          >
            <Input
              type="date"
              style={{ width: "100%", border: "1px solid #9F9F9F" }}
              size="large"
            />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect("Phòng ban", "Chọn phòng ban", true, true, "dep_id", listDepLabel)}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect("Chức vụ", "Chọn chức vụ", true, true, "position_id", [
            { label: "Nhân viên", value: 1 },
            { label: "Trưởng phòng", value: 2 },
          ])}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect("Tổ", "Chọn tổ", false, true, "team_id", listTeamLabel)}
        </Col>
        <Col md={12} sm={24} xs={24}>
          {MySelect("Nhóm", "Chọn nhóm", false, true, "group_id", listGrLabel)}
        </Col>
      </Row>
    </Form>
  );

  return ModalWrapper(
    open,
    setOpen,
    children,
    800,
    "Chỉnh sửa thông tin",
    "Cập nhật",
    handleSubmit,
    true,
    true,
    false
  );
}

export function SetRoleModal(open: boolean, setOpen: Function) {
  const [form] = Form.useForm();
  const [openSuccess, setOpenSuccess] = useState(false);

  const children = (
    <Form form={form}>
      <Form.Item
        name={"role"}
        rules={[
          {
            required: true,
            message: `Vui lòng nhập phân quyền tài khoản của bạn!`,
          },
        ]}
        label={<p>Phân quyền tài khoản</p>}
        labelCol={{ span: 24 }}
      >
        <Select
          style={{
            width: "100%",
            border: "1px solid #9F9F9F",
            borderRadius: "10px",
          }}
          options={[
            { label: "Admin (Toàn quyền)", value: 1 },
            { label: "Thành viên", value: 2 },
          ]}
          defaultValue={1}
          suffixIcon={
            <Image alt="/" src={"/down-icon.png"} width={14} height={14} />
          }
          size="large"
        />
      </Form.Item>
    </Form>
  );

  return (
    <>
      {ModalWrapper(
        open,
        setOpen,
        children,
        600,
        "Phân quyền",
        "Cập nhật",
        () => {
          setOpen(false);
          setOpenSuccess(true);
        },
        true,
        true,
        false
      )}
      <AddRoleSuccessModal open={openSuccess} setOpen={setOpenSuccess} />
    </>
  );
}

export const AddRoleSuccessModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) => {
  return ModalWrapper(
    open,
    setOpen,
    <p style={{ textAlign: "center" }}>
      Tài khoản đã được phân quyền thành công
    </p>,
    450,
    "",
    "OK",
    () => setOpen(false),
    false,
    true,
    false,
    false,
    true
  );
};

export function DeleteEmpModal(open: boolean, setOpen: Function, name: string, currentRow: any) {
  const router = useRouter()

  const handleSubmit = () => {
    if (currentRow?.idQLC) {
      POST('api/qlc/managerUser/del', {
        idQLC: currentRow.idQLC,
      })
        .then(res => {
          console.log(res)
          if (res?.result === true) {
            setOpen(false)
            router.replace(router.asPath)
          }
        })
    }
  }

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
      <p style={{ marginTop: "20px" }}>Bạn có chắc chắn muốn xóa nhân viên ?</p>
      <p>{name}</p>
    </div>
  );


  return ModalWrapper(
    open,
    setOpen,
    children,
    450,
    "Xóa nhân viên",
    "Đồng ý",
    handleSubmit,
    true,
    true,
    false
  );
}
