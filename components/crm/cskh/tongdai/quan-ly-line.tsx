import { Input, Modal, Select, Table, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./tongdai.module.css";
import Link from "next/link";
import ModalConnect from "../modal/modal-connect";
import PaginationCSKH from "./pagination";
import { CallContext } from "@/components/crm/context/tongdaiContext";
import Filter from "./filter";
import { useSelector } from "react-redux";
const Cookies = require("js-cookie");
type Props = {};

const Recording = (props: Props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const { isConnected } = useContext<any>(CallContext);
  const [listLine, setlistLine] = useState([]);
  const [listNV, setListNV] = useState([]);
  const [id, setId] = useState();
  const [name, setname] = useState();
  const [option, setOption] = useState();
  const [showKetNoi, setShowKetNoi] = useState(false);

  let arr = [];
  for (var key of Object.keys(listLine)) {
    var value = listLine[key];
    arr.push(value);
  }

  const show = useSelector((state: any) => state?.auth?.account);

  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };

  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  arr.pop();
  arr.pop();
  const handleChange = (value, name) => {
    setIsShowModalEdit(true);
    setname(name);
    setId(value);
  };
  const data = arr?.map((item, index) => {
    return {
      key: index + 1,
      extension_number: item?.extension_number,
      userName: item?.userName,
      status: item?.status,
    };
  });

  const Colums = [
    {
      width: "10%",
      title: "STT",
      dataIndex: "key",
    },
    {
      width: "10%",
      title: "Line",
      dataIndex: "extension_number",
    },
    {
      width: "10%",
      title: "Người phụ trách",
      dataIndex: "userName",
    },
    {
      width: "12%",
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      width: "12%",
      title: "Chức năng",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <button
          onClick={() => handleChange(record.extension_number, record.userName)}
        >
          Sửa
        </button>
      ),
    },
  ];
  const handleGetLine = async () => {
    const res = await fetch(
      "http://210.245.108.202:3007/api/crm/cutomerCare/listLine",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
      }
    );
    const data = await res.json();
    console.log("check data",data)
    setlistLine(data?.data);
  };

  
  const handleGetNhanVienPhuTrach = async () => {
    const res = await fetch(
      "http://210.245.108.202:3000/api/qlc/managerUser/list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ com_id: `${Cookies.get("com_id")}`  }),
      }
    );
    const data = await res.json();
    setListNV(data?.data?.data);
  };
  useEffect(() => {
    if (show) {
      setShowKetNoi(true);
    }
    handleGetLine();
    handleGetNhanVienPhuTrach();
  }, [isShowModalEdit]);
  const handleChangeOption = (value: any) => {
    setOption(value);
  };
  const handleOK = async () => {
    setIsShowModalEdit(false);
   const res = await fetch("http://210.245.108.202:3007/api/crm/cutomerCare/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ ext_number: id, emp_id: option }),
    });
    const data = await res.json()
    if(data && data.error){
      notification.error({message:data?.error?.message})
    }
  };

  return (
    <div>
      {showKetNoi && (
        <div style={{ paddingTop: 20 }}>
          <Table
            columns={Colums as any}
            dataSource={data}
            bordered
            scroll={{ x: 1000 }}
            pagination={{style:{display:"flex",float:"left"},
              pageSize: 8,
            }}
          />
          <ModalConnect
            isShowModalAdd={isShowModalAdd}
            onClose={onClose}
            handleAddDB={handleAddDB}
          />
          <Modal
            onCancel={() => setIsShowModalEdit(false)}
            onOk={() => handleOK()}
            title={
              <div
                style={{
                  background: "#4C5BD4",
                  width: "114%",
                  margin: "-20px -25px",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: 16,
                    textAlign: "center",
                    paddingTop: 10,
                  }}
                >
                  Thiết lập
                </div>
              </div>
            }
            open={isShowModalEdit}
          >
            <div style={{ paddingTop: 20 }}>
              <div>Số điện thoại</div>
              <div>
                <Input
                  type="text"
                  disabled
                  value={id}
                  style={{ color: "black" }}
                />
              </div>
              <div>Nhân viên phụ trách</div>
              <div>
                <Select
                  style={{ width: "100%" }}
                  defaultValue={` ${name}`}
                  onChange={handleChangeOption}
                >
                  {listNV &&
                    listNV?.map((item: any, index) => {
                      return (
                        <option
                          key={index}
                          value={item.idQLC}
                        >{`(${item.idQLC}) ${item.userName}`}</option>
                      );
                    })}
                </Select>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};
export default Recording;
