import { Button, Table, Modal } from "antd";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'
import Cookies from "js-cookie";
import FilterNTD from "./filter";
import styles from "../cskh/tongdai/tongdai.module.css";
import * as XLSX from 'xlsx';
import exportToExcel from "../ultis/export_xlxs";
import jwt_decode from "jwt-decode";
type Props = {};

const NTDRegister = (props: Props) => {
    const router = useRouter();
    const { nhanvien, nguon, timeStart, timeEnd } = router.query as { nhanvien: string, nguon: string, timeStart: string, timeEnd: string };
    const [user, setUser] = useState(() => {
        const decodedToken = jwt_decode(Cookies.get("token_base365"))
        if (decodedToken && decodedToken['data']) {
            return decodedToken['data']
        }
        return undefined
    })
    const [listData, setListData] = useState([]);
    const [textRecord, setTextRecord] = useState('');
    const [current, setcurrent] = useState(1);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalFilter, setIsModalFilter] = useState(false);
    const [fillStart, setFillStart] = useState<any>(() => {
        if (!timeStart) return undefined
        return timeStart.split(' ')[0]
    });
    const [fillEnd, setFillEnd] = useState<any>(() => {
        if (!timeEnd) return undefined
        return timeEnd.split(' ')[0]
    });
    const [nv, setNv] = useState(() => {
        if (user?.type === 1) {
            return nhanvien
        }
        else {
            return `${user.idQLC} - ${user.userName}`
        }
    })
    const [cusFrom, setCusFrom] = useState(nguon)
    const [condition, setCondition] = useState(() => {
        const query = {}
        if (user?.type === 1) {
            if (nhanvien) query['emp_id'] = Number(nhanvien.split(' ')[0])
        }
        else {
            query['emp_id'] = user.idQLC
        }
        if (nguon) query['cus_from'] = nguon
        if (timeStart) {
            const time = Math.floor((new Date(timeStart)).getTime() / 1000)
            query['timeStart'] = time
        }
        if (timeEnd) {
            const time = Math.floor((new Date(timeEnd)).getTime() / 1000)
            query['timeEnd'] = time
        }
        return JSON.stringify(query)
    })

    const handleShowModal = (record: any) => {
        setTextRecord(record.text)
        setIsModalOpen(true)
    }

    const handleFilter = () => {
        let param = ''
        if (nv) {
            param += `nhanvien=${nv}&`
        }
        if (cusFrom) {
            param += `nguon=${cusFrom}&`
        }
        if (fillStart) {
            param += `timeStart=${fillStart}&`
        }
        if (fillEnd) {
            param += `timeEnd=${fillEnd}&`
        }
        param !== '' ? router.push(`?${param}`) : router.push('')
    }

    const handleExportPhone = () => {
        const arr_list_phone = []  // mảng lưu sdt
        listData.map(item => {
            if (item.phone_number) {
                const arr = item.phone_number.split(',')
                arr.map((phone: any) => {
                    if (!isNaN(phone) && !arr_list_phone.includes(phone)) {
                        arr_list_phone.push(phone)
                    }
                })
            }
        })
        const exportToExcel = () => {
            const data = arr_list_phone.map(phoneNumber => [phoneNumber]);
            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Danh sách điện thoại');
            XLSX.writeFile(wb, 'danh_sach_dien_thoai.xlsx');
        };
        exportToExcel()
    }

    const handleExportEmail = () => {
        const arr_list_email = []
        listData.map(item => {
            if (item.email) {
                const arr = item.email.split(',')
                arr.map((e: any) => {
                    if (!arr_list_email.includes(e)) {
                        arr_list_email.push(e)
                    }
                })
            }
        })
        const exportToExcel = () => {
            const data = arr_list_email.map(email => [email]);
            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Danh sách email');
            XLSX.writeFile(wb, 'danh_sach_email.xlsx');
        };
        exportToExcel()
    }


    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://api.timviec365.vn/api/crm/customer/StatisticalRegisterSocial`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                },
                body: condition,
            });
            const data = await response.json();
            setLoading(false)
            if (data && data.data && data.data.list_cus) {
                setListData(data.data.list_cus);
            }
        };
        getData();
    }, []);

    const Colums = [
        {
            width: "5%",
            title: "STT",
            render: (text: any, record: any, index: any) => index + 1 + (current - 1) * 15,
        },
        {
            width: "5%",
            title: "Mã khách hàng",
            dataIndex: "cus_id",
            render: (text: any, record: any, index: any) => (
                <Link
                    href={`/nha-tuyen-dung/detail/${record.cus_id}`}
                    target="_blank"
                >
                    {record.cus_id}
                </Link>
            )
        },
        {
            width: "10%",
            title: "Tên khách hàng",
            dataIndex: "name",
        },
        {
            width: "15%",
            title: "Chuyên viên phụ trách",
            dataIndex: "emp_id",
            render: (text: any, record: any, index: any) => (
                <div>{record.emp_id} - {record.emp_name}</div>
            )
        },
        {
            width: "10%",
            title: "Số điện thoại",
            dataIndex: "phone_number",
        },
        {
            width: "10%",
            title: "Email",
            dataIndex: "email",
        },
        {
            width: "10%",
            title: "Nguồn khách hàng",
            dataIndex: "cus_from",
        },
        {
            width: "10%",
            title: "Thời gian",
            dataIndex: "created_at",
        },
    ];
    return (
        <>
            <div className={styles.group_button}>
                <FilterNTD
                    isModalOpen={isModalFilter}
                    setIsModalOpen={setIsModalFilter}
                    fillStart={fillStart}
                    setFillStart={setFillStart}
                    fillEnd={fillEnd}
                    setFillEnd={setFillEnd}
                    handleFilter={handleFilter}
                    nv={nv}
                    setnv={setNv}
                    cusFrom={cusFrom}
                    setCusFrom={setCusFrom}
                    user={user}
                />
                <div className={styles.group_button_right}>
                    <div >
                        <button type="button" onClick={handleExportPhone}>Xuất số điện thoại</button>
                    </div>
                    <div >
                        <button type="button" onClick={handleExportEmail}>Xuất email</button>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: 20 }}>
                <div style={{ margin: '8px' }}>Tổng số NTD: {listData.length}</div>
                <Table
                    loading={loading}
                    columns={Colums as any}
                    dataSource={listData}
                    bordered
                    scroll={{ x: '1600px' }}
                    pagination={{
                        style: { paddingBottom: 30, float: "left" },
                        current: current,
                        pageSize: 15,
                        onChange(page, pageSize) {
                            if (page != current) {
                                setcurrent(page);
                            }
                        },
                    }}
                />
                <Modal
                    title="Chi tiết"
                    open={isModalOpen}
                    width={600}
                    bodyStyle={{ maxHeight: '40vh', overflowY: 'auto' }}
                    footer={[
                        <Button key="submit" type="primary" onClick={() => setIsModalOpen(false)}>
                            OK
                        </Button>,
                    ]}
                >
                    <p>{textRecord}</p>
                </Modal>
            </div>
        </>
    );
};
export default NTDRegister;
