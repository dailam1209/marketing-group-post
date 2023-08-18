
import React, { useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import styles from "./tongdai.module.css";
import { NodeIndexOutlined } from "@ant-design/icons";
import Image from "next/image";

interface MyComponentProps {
    datatable: any;
    isModalOpen: any,
    setIsModalOpen: any,
    fillStart: any,
    setFillStart: any,
    fillEnd: any,
    setFillEnd: any,
    handleGet: any,
    soNghe:any,
    setSoNghe:any,
    nv:any,
    setnv:any
    
}
const FilterGhiAm: React.FC<MyComponentProps> = ({
    datatable,
    isModalOpen,
    setIsModalOpen,
    fillStart,
    setFillStart,
    fillEnd,
    setFillEnd,
    handleGet,
    soNghe,
    setSoNghe,
    nv,
    setnv
}) => {
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
        handleGet()
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    const handleDateChange = (e:any)=>{
      setFillStart(`${e.target.value} 00:00:00`)
    }
    const handleDateChange2 = (e:any)=>{
      setFillEnd(`${e.target.value} 23:59:59`)
    }
    // const uniqueCounts = Array.from(new Set(datatable?.map(item => item.caller))); // Lọc giá trị duy nhất
    const uniqueCounts = [101,102,103,104,105,106,107,108,109,110,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220]
      return (
        <>
          <button className={styles.filter} onClick={showModal}>
            {/* <NodeIndexOutlined /> */}
            <Image
            width={23}
            height={23}
            src={"/crm/filter_alt.svg"}
            alt=""
            />
            <p>Bộ lọc</p>
          </button>
          <Modal
            title={
                <div
                  style={{
                    background: "#4C5BD4",
                    width: "111%",
                    margin: "-20px -25px",
                  }}
                >
                  <div
                    style={{
                      color: "white",
                      fontSize: 18,
                      textAlign: "center",
                      paddingTop: 5,
                    }}
                  >
                   Bộ lọc
                  </div>
                </div>
              }
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            className={styles.main_filter2}
          >
            <div className={styles.containerfillter}>
              <div className={styles.item1}>
                <div style={{width:120}}>Thời gian</div>
                <div style={{ display: "flex", alignItems: "center",paddingRight:10, gap: 10 }}>
                  <div>Từ</div>
                  <div>
                    <Input onChange={handleDateChange}  type="date"></Input>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div>Đến</div>
                  <div>
                    <Input onChange={handleDateChange2} type="date"></Input>
                  </div>
                </div>
              </div>
              <div className={styles.item1}>
                <div style={{width:100}}>Nhân viên</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  
                  <div style={{width:"100%"}}>
                    
                    <Select style={{width:145}} placeholder="Chọn nhân viên" value={nv} onChange={(value) => setnv(value)}>
                    {uniqueCounts.map((count:any,index:number) => {
                      return (
                        <option key={index} value={count}>{count}</option>
                      )
                    })}
                    </Select>
                  </div>
                </div>
    
              </div>
              <div className={styles.item1}>
                <div style={{width:100}}>Số người nghe</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  
                <div style={{width:145}}>
                    <Input type="text" value={soNghe} onChange={(event)=>setSoNghe(event.target.value)}></Input>
                  </div>
                </div>
    
              </div>
              <div className={styles.footerBTN}>
                <div style={{color:"#4c5bd4"}}>
          <Button onClick={handleCancel} style={{color:"#4c5bd4",border:"1px solid #4c5bd4"}}> Hủy</Button>
                </div>
            
                <Button style={{color:"#fff",background:"#4c5bd4"}} onClick={handleGet}>
                  Tìm kiếm
                </Button>
    
             
              </div>
            </div>
          </Modal>
        </>
      );
    };


export default FilterGhiAm;