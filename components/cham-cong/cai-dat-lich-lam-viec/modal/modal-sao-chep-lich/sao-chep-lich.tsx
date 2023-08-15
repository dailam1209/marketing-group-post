import { POST } from "@/pages/api/BaseApi";
import styles from "./sao-chep-lich.module.css";
import { Modal, Input, Checkbox, Button } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// const data = [
//   {
//     key: "1",
//     title: "Lịch làm việc tháng 6"
//   },
//   {
//     key: "2",
//     title: "Lịch làm việc test"
//   },
//   {
//     key: "3",
//     title: "Lịch làm việc test 2"
//   },
//   {
//     key: "4",
//     title: "Lịch làm việc test 3"
//   },
//   {
//     key: "5",
//     title: "Lịch làm việc test 4"
//   }
// ]

export function SaoChepLich(open: boolean, setOpen: Function, data: any[], dateFilter: any) {
  const [listKeyCheck, setListKeyCheck]: any = useState([]);
  const [listCyInMonth, setListCyInMonth]: any = useState(
    data?.map((cy) => ({ key: cy?.cy_id, title: cy?.cy_name }))
  );
  const [applyMonth, setApplyMonth]: any = useState("");
  const router = useRouter();

  useEffect(() => {
    if (data?.length > 0) {
      setListCyInMonth(
        data.map((cy) => ({ key: cy?.cy_id, title: cy?.cy_name }))
      );
    } else {
      setListCyInMonth([]);
    }
  }, [data]);

  const handleSubmit = async () => {
    if (listKeyCheck.length > 0) {
      if (applyMonth !== "") {
        data.map((cy) => {
          if (listKeyCheck.indexOf(cy?.cy_id) !== -1) {
            // console.log(listKeyCheck)
            POST("api/qlc/cycle/create", {
              cy_name: `Bản sao của ${cy?.cy_name}`,
              apply_month: `${applyMonth}-01`,
              cy_detail: JSON.stringify(cy?.cy_detail),
            }).then((res) => {
              if (res?.result === true) {
              }
            });
          }
        });
        await Promise.all;
        await setOpen(false);
        await router.replace(router.asPath);
      }
    }
  };

  const onChange = (key: any) => {
    listKeyCheck.includes(key) === true
      ? setListKeyCheck(listKeyCheck.filter((data: any) => data !== key))
      : setListKeyCheck([...listKeyCheck, key]);
  };
  const onChangeAll = () => {
    listKeyCheck.length === listCyInMonth.length
      ? setListKeyCheck([])
      : setListKeyCheck(listCyInMonth.map((cy) => cy.key));
  };
  const checked = (key: any): boolean =>
    listKeyCheck?.includes(key) === true ? true : false;
  const checkedAll = (): boolean =>
    listKeyCheck?.length === listCyInMonth?.length ? true : false;

  const List: any = (data: any) => (
    <>
      {data?.map((dt: any, index: number) => {
        return (
          <div key={index} className={styles.checkItem}>
            {dt.title}
            <Checkbox
              key={dt.key}
              checked={checked(dt.key)}
              onChange={() => onChange(dt.key)}
            ></Checkbox>
          </div>
        );
      })}
    </>
  );

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      width={600}
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <div className={styles.header}>
        <div></div>
        <div className={styles.textHead}>Sao chép lịch làm việc</div>
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
          Chọn tháng áp dụng lịch làm việc
          <span style={{ color: "red" }}>*</span>
          <Input
            onChange={(e) => setApplyMonth(e.target.value)}
            type="month"
            style={{ width: "100%" }}
            placeholder="Chọn tháng"
          ></Input>
        </div>
        <div className={`${styles.bodyItem} ${styles.scrollbar}`}>
          <div className={styles.sticky}>
            <div>Lịch làm việc tháng {dateFilter?.substring(5)}/{dateFilter?.substring(0,4)}</div>
            <div style={{ marginRight: "10px" }}>
              Chọn tất cả
              <Checkbox
                key={"All"}
                checked={checkedAll()}
                onChange={onChangeAll}
                style={{ marginLeft: "10px" }}
              ></Checkbox>
            </div>
          </div>
          <div className={styles.checkbox_list}>{List(listCyInMonth)}</div>
        </div>
        <div className={styles.bodyItem}>
          <Button className={styles.button} onClick={handleSubmit}>
            <p className={styles.txt}>Lưu lại</p>
          </Button>
        </div>
        <div className={styles.Luuy}>
          Lưu ý: Những nhân viên đã được xét lịch làm việc trong tháng áp dụng
          sẽ không được cài đặt trong lịch làm việc sao chép này.
        </div>
      </div>
    </Modal>
  );
}
