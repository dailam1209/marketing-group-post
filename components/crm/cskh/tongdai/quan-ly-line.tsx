import { Input, Modal, Select, Table, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import styles from "./tongdai.module.css";
import Link from "next/link";
import ModalConnect from "../modal/modal-connect";
import PaginationCSKH from "./pagination";
import { CallContext } from "@/components/crm/context/tongdaiContext";
import Filter from "./filter";
import { useSelector } from "react-redux";
import { base_url } from "../../service/function";
import { dataSaveTD } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
const Cookies = require("js-cookie");
type Props = {};

const Recording = (props: Props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const { isConnected } = useContext<any>(CallContext);
  const [listLine, setlistLine] = useState([]);
  const [data, setData] = useState([]);
  const [listNV, setListNV] = useState([]);
  const [id, setId] = useState();
  const [name, setname] = useState();
  const [option, setOption] = useState();
  const [showKetNoi, setShowKetNoi] = useState(true);
  const dispatch = useDispatch();
  const [position_id, setPosition_id] = useState();


  const show = useSelector((state: any) => state?.auth?.account);

  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };

  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  const handleChange = (value, name) => {
    setIsShowModalEdit(true);
    setname(name);
    setId(value);
  };

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
    try {
      const res = await fetch(`${base_url}/api/crm/cutomerCare/listLine_v2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
      });
      const data = await res.json();
      console.log(data)
      setData(data?.data?.data);
    } catch (error) { }
  };

  const handleGetNhanVienPhuTrach = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/qlc/managerUser/listAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: `${Cookies.get("com_id")}` }),
        }
      );
      const data = await res.json();
      console.log(data)
      setListNV(data?.data?.items);
    } catch (error) { }
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
    try {
      const res = await fetch(`${base_url}/api/crm/cutomerCare/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ ext_number: id, emp_id: option }),
      });
      const data = await res.json();
      if (data && data.error) {
        notification.error({ message: data?.error?.message });
      }
    } catch (error) { }
  };
  return (
    <div>
      {showKetNoi && (
        <div style={{ paddingTop: 20 }}>
          <Table
            loading={data?.length > 0 ? false : true}
            columns={Colums as any}
            dataSource={data}
            bordered
            scroll={{ x: 1000 }}
            pagination={{
              style: { display: "flex", float: "left" },
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
                  <option>Nhân viên phụ trách</option>
                  {listNV &&
                    listNV?.map((item: any, index) => {
                      return (
                        <option key={index} value={item.ep_id}>
                          {`(${item.ep_id}) ${item.ep_name}`} -{" "}
                          {`${item.dep_name}`}
                        </option>
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
