import { Button, Dropdown, Input, Menu, MenuProps, Pagination, Select, Table } from "antd";
import styles from "../delete_data/table.module.css"
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import ModalAddNhomSP from "./modal/ModalAddNhomSanPham";
import { useState } from "react";
const Table_Nhom_San_Pham = (props: any) => {
    const [isShowModal, setIsShowModal] = useState(false)
    const onClose = () => {
        setIsShowModal(false)
    }
    const data = [];
    for (let i = 1; i < 5; i++) {
        data.push({
            key: i,
            id: i,
            monneyin: 100000000000,
            monneyout: 2000000,
            name: `Trang${i}`,
            borrow: 200000,
        })
    }
    const handleSelect = (id: any) => {
        console.log(id)
    }
    const items: MenuProps['items'] = [
        {
            key: '3',
            label: (
                <div style={{ display: "flex", fontSize: 20 }} rel="noopener noreferrer"
                    onClick={() => { setIsShowModal(true) }}
                >

                    <img src="https://crm.timviec365.vn/assets/icons/icon-edit-black.svg" alt="" />
                    &nbsp;  &nbsp; <p >Chỉnh sửa</p>
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div style={{ display: "flex", fontSize: 20 }} rel="noopener noreferrer"
                // onClick={() => { setIsShowModal(true) }}
                >
                    <img src="https://crm.timviec365.vn/assets/icons/icon-delete-black.svg" alt="" />
                    &nbsp;  &nbsp; <p  >Xóa</p>
                </div>
            ),
        },
    ];
    const Colums = [{
        width: 316,
        title: 'Tên nhóm sản phẩm	',
        dataIndex: 'id',
        render: (text: any) => <div>{text}</div>
    },
    {
        width: 212,
        title: 'Số lượng			',
        dataIndex: 'name',
        render: (text: any, record: any) => <div>{text}</div>

    },
    {
        width: 661,
        title: 'Mô tả nhóm	',
        dataIndex: 'name',
        render: (text: any, record: any) => <div>{text.toLocaleString("vi") + " VNĐ"}</div>
    },
    {
        width: 293,
        title: 'Chức năng',
        dataIndex: 'func',
        render: (text: any, record: any) => <div>
            <Dropdown overlayStyle={{ margin: "-10px -10px" }}
                trigger={['click']} menu={{ items }} placement="bottomLeft"

            >
                <img
                    // onClick={() => { handleSelect(record.myPhone) }}
                    style={{ cursor: "pointer" }}
                    src="https://crm.timviec365.vn/assets/icons/icon_1.svg" />

            </Dropdown>
        </div>,

    }

    ]

    const suffix = (
        <SearchOutlined
            onClick={() => window.location.reload()}
            style={{
                fontSize: 20,
                color: 'black',
            }}
        />
    );
    return (
        <div className={`${styles.main__content} ${styles.flex_column}`}>
            <div className={styles.inputSP2}>
                <div>
                    <Button
                        style={{
                            height: 40,
                            width: "100%", color: "black",
                            background: "#ffffff", display: "flex", fontSize: 20, textAlign: "center", justifyContent: "center"
                        }}


                    >
                        <Link href="/san-pham"> Danh sách sản phẩm</Link>
                    </Button>
                </div>
                <div>
                    <Button

                        style={{ height: 40, width: "100%", color: "#fff", background: "#4C5BD4", display: "flex", fontSize: 20, justifyContent: "center" }}

                    >
                        <Link href="/nhom-san-pham" >Danh sách nhóm sản phẩm</Link>
                    </Button>
                </div>

            </div>
            <div >
                <Button
                    onClick={() => setIsShowModal(true)}
                    style={{
                        color: "#fff",
                        background: "#4C5BD4", borderRadius: 10, height: 40
                        , width: "150px", fontSize: 18
                    }}><PlusCircleFilled style={{ color: "#fff" }} ></PlusCircleFilled>Thêm mới</Button>
            </div>
            <div className={styles.ipSearch} >
                        <Input placeholder={`Tìm kiếm`}
                        className={styles.main__control_search}
                            suffix={suffix}
                            bordered={false}

                        />
                    </div>
            <div className={styles.table}>

                <div className={styles.scrollTable}>
                    <Table
                        // className={styles.table_antd}
                        columns={Colums as any} dataSource={data}
                        bordered
                        //     scroll={{ x: 1500, y: 300 }}
                        scroll={{ x: 1300 }}
                        pagination={false}
                    />
                </div>
                <br />
            </div>
            <ModalAddNhomSP
                isShowModal={isShowModal}
                onClose={onClose}
            />
        </div>
    )
}
export default Table_Nhom_San_Pham;