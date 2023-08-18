import { Modal, Input, Select, Button, Form, List, Checkbox, Tabs } from "antd"
import styles from "./modal-them-nhan-vien.module.css"
import Image from "next/image"
import React, {useState} from "react";
import { Search } from "../../../danh-sach-nhan-su-chua-thiet-lap/anh";
import { DanhSachNhanVien } from "./tab-nhan-vien/tab-nhan-vien";
import { ThemNhanVien } from "@/components/cham-cong/cai-dat-lich-lam-viec/modal/modal-item/modal-them-nhan-vien/modal-them-nhan-vien";
import { DanhSachNhom } from "./tab-nhom/tab-nhom";
const {TextArea} = Input;
export function ModalThemNhanVien(
    open: boolean,
    setOpen: Function,
    listEmp:any,
    taxSelected:any
  ) {
    
    const onClick = () => {
      setOpen(false)
    }
    const[ND, setND] = useState('')
    const handleInputChange = (event:any) =>{
      setND(event.target.value)
    }
    const handelSubmit = (event:any) =>{
      event.preventDefaut();
    }
    const tabList = [
        {
            key: '1',
            label:'Nhân viên',
            children:<DanhSachNhanVien listEmp ={listEmp} taxSelected={taxSelected}/>
        },
        // {
        //     key:'2',
        //     label:'Nhóm',
        //     children:<DanhSachNhom/>
        // }
    ]
    const [checkButton, setCheckButton] = useState('1')
    return (
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width={710}
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className={styles.header}>
          <div></div>
          <div className={styles.textHead}>Thêm nhân viên</div>
          <Image
            alt="/"
            src={"/cross.png"}
            width={14}
            height={14}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className={styles.body}>
            <Input className={styles.nameCT} placeholder="nhập từ cần tìm" type="text" prefix={<Search/>}/>
            <Tabs className={`tab_themNhanVienPhucLoi ${styles.tab}`} items = {tabList} onChange={(activekey) => setCheckButton(activekey)}/>
            
        </div>
      </Modal>
    )
  }
  