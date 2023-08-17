import React, { useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import styles from "./tongdai.module.css";
import { NodeIndexOutlined } from "@ant-design/icons";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={styles.filter} onClick={showModal}>
        <NodeIndexOutlined />
        <p>Bộ lọc</p>
      </button>
      <Modal
        title="Bộ lọc"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        className={styles.main_filter}
      >
        <div className={styles.containerfillter}>
          <div className={styles.item1}>
            <div style={{width:120}}>Thời gian</div>
            <div style={{ display: "flex", alignItems: "center",paddingRight:10, gap: 10 }}>
              <div>Từ</div>
              <div>
                <Input type="date"></Input>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div>Đến</div>
              <div>
                <Input type="date"></Input>
              </div>
            </div>
          </div>
          <div className={styles.item1}>
            <div style={{width:128}}>Nhân viên</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              
              <div style={{width:"100%"}}>
                <Select style={{width:145}} placeholder="Chọn nhân viên">
                  <option value="">Chọn nhân viên</option>
                </Select>
              </div>
            </div>

          </div>
          <div className={styles.item1}>
            <div style={{width:128}}>Số người nghe</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              
            <div style={{width:145}}>
                <Input type="text"></Input>
              </div>
            </div>

          </div>
          <div className={styles.footerBTN}>
            <div style={{color:"#4c5bd4"}}>
      <Button onClick={handleCancel} style={{color:"#4c5bd4",border:"1px solid #4c5bd4"}}> Hủy</Button>
            </div>
            <div>
            <Button style={{color:"#fff",background:"#4c5bd4"}}>
              Tìm kiếm
            </Button>

            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default App;
