import { SearchOutlined } from "@ant-design/icons";
import styles from "./modal-them-nhan-vien.module.css";
import { Modal, Input, Button, Checkbox, Row, Col } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ModalXacNhan } from "@/components/cham-cong/cong-chuan/modal-xac-nhan-cong-chuan";
import { POST } from "@/pages/api/BaseApi";
import { useRouter } from "next/router";

// const data = [
//   {
//     key: "504000",
//     name: "Hồ Mạnh Hùng",
//     url: "/anhnhanvien.png"
//   },
//   {
//     key: "504001",
//     name: "Hồ Mạnh Hùng",
//     url: "/anhnhanvien.png"
//   },
//   {
//     key: "504002",
//     name: "Hồ Mạnh Hùng",
//     url: "/anhnhanvien.png"
//   }
// ]
const ModalList = (
  name: string,
  url: string,
  key: string,
  onChange: Function,
  checked: Function
) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      borderBottom: "1px dotted #9F9F9F",
      paddingBottom: "10px",
      paddingTop: "10px",
    }}
  >
    <Checkbox
      key={key}
      checked={checked(key)}
      onChange={() => onChange(key)}
    ></Checkbox>
    <img src={url} alt="" style={{ marginLeft: "10px" }} />
    <div style={{ marginLeft: "10px" }}>
      <p style={{ fontSize: "18px" }}>{name}</p>
      <p style={{ fontSize: "16px" }}>{key}</p>
    </div>
  </div>
);

// const data = [
//   {
//     key: "504000",
//     name: "Hồ Mạnh Hùng",
//     url: "/anhnhanvien.png"
//   },
//   {
//     key: "504001",
//     name: "Hồ Mạnh Hùng",
//     url: "/anhnhanvien.png"
//   },
//   {
//     key: "504002",
//     name: "Hồ Mạnh Hùng",
//     url: "/anhnhanvien.png"
//   }
// ]
export function ThemNhanVien(
  open: boolean,
  setOpen: Function,
  setNext: Function,
  cySelected: any,
  listEmp: any,
  listEmpInCy: any
) {
  const [listKeyBefore, setListKeyBefore]: any = useState([]);
  const [listKeyAfter, setListKeyAfter]: any = useState([]);
  const [modalXacNhan, setModalXacNhan] = useState(false);
  const [data, setData]: any = useState(
    listEmp?.map((emp) => {
      return {
        key: `${emp?.idQLC}`,
        name: emp?.userName,
        url: "/anhnhanvien.png",
      };
    })
  );

  const router = useRouter()

  useEffect(() => {
    if (listEmp.length > 0) {
      setData(
        listEmp?.map((emp) => {
          return {
            key: `${emp?.idQLC}`,
            name: emp?.userName,
            url: "/anhnhanvien.png",
          };
        })
      );
    }
  }, [listEmp]);

  useEffect(() => {
      // console.log(listEmpInCy);
      setListKeyBefore(listEmpInCy?.map((emp) => `${emp?.ep_id}`) || []);
      setListKeyAfter(listEmpInCy?.map((emp) => `${emp?.ep_id}`) || []);
  }, [listEmpInCy]);

  const onChange = (key: any) => {
    listKeyAfter.includes(key) === true
      ? setListKeyAfter(listKeyAfter.filter((data: any) => data !== key))
      : setListKeyAfter([...listKeyAfter, key]);
  };
  const checked = (key: any) =>
    listKeyAfter.includes(key) === true ? true : false;
  const onClick = async () => {
    const sameValues: any = listKeyBefore.filter(
      (key) => listKeyAfter.indexOf(key) !== -1
    );
    const otherValuesBefore: any = listKeyBefore.filter(
      (key) => listKeyAfter.indexOf(key) === -1
    );
    const otherValuesAfter: any = listKeyAfter.filter(
      (key) => listKeyBefore.indexOf(key) === -1
    );
    if (sameValues.length === listKeyBefore) {
    } else {
      // Add employees to cycle when checked
      if (otherValuesAfter.length > 0) {
        // console.log(otherValuesAfter.join(","));

        POST("api/qlc/cycle/add_employee", {
          cy_id: cySelected?.cy_id,
          list_id: otherValuesAfter.join(","),
        }).then((res) => {
          if (res?.result === true) {
            setModalXacNhan(true);
            setOpen(false);
          }
        });
      }

      // Delete employee from cycle when unchecked
      if (otherValuesBefore.length > 0) {
        // console.log(otherValuesBefore);

        otherValuesBefore.map((key) => {
          POST("api/qlc/cycle/delete_employee", {
            cy_id: cySelected?.cy_id,
            ep_id: key,
          }).then((res) => {
            if (res?.result === true) {
            }
          });
        });
      }
      router.replace(router.asPath)
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width={800}
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className={styles.header}>
          <div></div>
          <div className={styles.textHead}>Thêm nhân viên mới</div>
          <Image
            alt="/"
            src={"/cross.png"}
            width={14}
            height={14}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className={styles.body}>
          <div className={styles.bodyItem}>
            <Input
              style={{ fontSize: "16px" }}
              prefix={
                <SearchOutlined rev={""} style={{ marginRight: "10px" }} />
              }
              placeholder="Nhập từ cần tìm"
            ></Input>
          </div>
          <div className={styles.bodyItem}>
            <Row gutter={[40, 20]} style={{ alignItems: "end" }}>
              <Col sm={16} xs={12}>
                <Row style={{ borderBottom: "1px #9F9F9F solid" }}>
                  <Col sm={6}>
                    <div
                      style={{
                        fontSize: "18px",
                        borderBottom: "2px blue solid",
                        color: "#4C5BD4",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Nhân viên
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col sm={8} xs={12}>
                <Button
                  style={{
                    backgroundColor: "#4C5BD4",
                    padding: "5px 15px",
                    height: "auto",
                  }}
                  onClick={() => {
                    setNext(true);
                    setOpen(false);
                  }}
                >
                  <p style={{ color: "white" }}>Add file nhân viên</p>
                </Button>
              </Col>
            </Row>
          </div>
          <div className={`${styles.bodyItem} ${styles.scrollbar}`}>
            {data.map((emp) =>
              ModalList(emp.name, emp.url, emp.key, onChange, checked)
            )}
          </div>
          <div className={styles.hasButton}>
            <Button className={styles.button} onClick={onClick}>
              <p className={styles.txt}>Chọn</p>
            </Button>
          </div>
        </div>
      </Modal>
      {ModalXacNhan(
        modalXacNhan,
        setModalXacNhan,
        "Bạn đã thêm nhân viên thành công"
      )}
    </div>
  );
}
