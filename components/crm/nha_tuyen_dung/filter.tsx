import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Select } from "antd";
import styles from "../cskh/tongdai/tongdai.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

interface MyComponentProps {
    isModalOpen: any;
    setIsModalOpen: any;
    fillStart: any;
    setFillStart: any;
    fillEnd: any;
    setFillEnd: any;
    handleFilter: any;
    nv: any;
    setnv: any;
    cusFrom: any;
    setCusFrom: any
}
const FilterNTD: React.FC<MyComponentProps> = ({
    isModalOpen,
    setIsModalOpen,
    fillStart,
    setFillStart,
    fillEnd,
    setFillEnd,
    handleFilter,
    nv,
    setnv,
    cusFrom,
    setCusFrom
}) => {
    const router = useRouter();
    const [listNv, setListNv] = useState([])
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        handleFilter();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleDateChange = (e: any) => {
        setFillStart(e.target.value);
        // setFillStart(`${e.target.value} 00:00:00`);
    };
    const handleDateChange2 = (e: any) => {
        setFillEnd(e.target.value);
        // setFillEnd(`${e.target.value} 23:59:59`);
    };

    const handleGetListNv = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/scheduleAutoCall/getListAdminUsers`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("token_base365")}`,
                    },
                }
            );
            const data = await res.json()
            setListNv(data?.data?.admin);
        } catch (error) { }
    };
    useEffect(() => {
        handleGetListNv();
    }, []);

    return (
        <>
            <button className={styles.filter} onClick={showModal}>
                <Image width={23} height={23} src={"/crm/filter_alt.svg"} alt="" />
                <p>Bộ lọc</p>
            </button>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
                className={styles.main_filter2}
            >
                <div className={styles.custom_filter}>Bộ lọc</div>
                <div className={styles.containerfillter}>
                    <div className={styles.item1}>
                        <div className={styles.item_time}>Thời gian</div>
                        <div className={styles.filter_time}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingRight: 10,
                                    gap: 10,
                                }}
                            >
                                <div>Từ</div>
                                <div>
                                    <Input onChange={handleDateChange} type="datetime-local" defaultValue={fillStart}></Input>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                }}
                            >
                                <div>Đến</div>
                                <div>
                                    <Input onChange={handleDateChange2} type="datetime-local" defaultValue={fillEnd}></Input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item1}>
                        <div style={{ width: 130 }}>Chuyên viên</div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                width: "100%",
                            }}
                        >
                            <div style={{ width: "100%" }}>
                                <Select
                                    placeholder="Chuyên viên phụ trách"
                                    value={nv}
                                    onChange={(value) => setnv(value)}
                                >
                                    <option>Chuyên viên phụ trách</option>
                                    {listNv &&
                                        listNv.length > 0 &&
                                        listNv?.map((item: any, index: number) => {
                                            return (
                                                <option key={index} value={`${item.emp_id} - ${item.emp_name}`}>
                                                    {item.emp_id} - {item.emp_name}
                                                </option>
                                            );
                                        })}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item1}>
                        <div style={{ width: 130 }}>Nguồn khách hàng</div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                width: "100%",
                            }}
                        >
                            <div style={{ width: "100%" }}>
                                <Select
                                    placeholder="Nguồn khách hàng"
                                    value={cusFrom}
                                    onChange={(value) => setCusFrom(value)}
                                >
                                    <option>Nguồn khách hàng</option>
                                    <option value={'facebook'}>Facebook</option>
                                    <option value={'chợ tốt'}>Chợ tốt</option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className={styles.footerBTN}>
                        <div style={{ color: "#4c5bd4" }}>
                            <Button
                                onClick={handleCancel}
                                style={{
                                    color: "#4c5bd4",
                                    border: "1px solid #4c5bd4",
                                    width: 100,
                                }}
                            >
                                Hủy
                            </Button>
                        </div>

                        <Button
                            style={{ color: "#fff", background: "#4c5bd4", width: 100 }}
                            onClick={handleFilter}
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default FilterNTD;
