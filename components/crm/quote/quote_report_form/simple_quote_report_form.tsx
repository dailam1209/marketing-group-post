import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { Col, Descriptions, DescriptionsProps, Grid, Image, Typography, Table } from 'antd'
import type { ColumnsType } from "antd/es/table";
import { QuoteContext } from "../quoteContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import dayjs from "dayjs";
const { Title } = Typography

type QuoteDetailData = {}

interface QuoteDataType {
    key: React.Key;
    idproduct: string;
    nameproduct: string;
    soluong: number;
    dongia: number;
    chietkhau: number;
    thue: number;
    total: number;
}

const sectionCss: CSSProperties = {
    width: 'calc(100% - 40px)',
    display: 'flex',
    marginBottom: '20px'
}

const descriptLabel: CSSProperties = {
    color: '#474747',
    fontWeight: 600,
    fontSize: '15px',
}

const descriptContent: CSSProperties = {
    color: '#474747',
    fontWeight: 400,
    fontSize: '13px'
}

const simpleLabel: CSSProperties = {
    color: '#474747',
    fontWeight: 600,
    fontSize: '15px',
    marginBottom: '10px'
}

const simpleContent: CSSProperties = {
    color: '#474747',
    fontWeight: 400,
    fontSize: '13px',
    // wordWrap: "break-word"
}

const sampleData: QuoteDataType[] = []
for (let i = 0; i < 4; i++) {
    sampleData.push({
        key: i + 1,
        idproduct: 'VT-0000',
        nameproduct: 'Nước lọc Safari',
        soluong: 10,
        dongia: 100000000,
        chietkhau: 2.1,
        thue: 2.1,
        total: 100000000,
    })
}

const simple_quote_report: React.FC = ({ id = 0 }: any) => {
    const { getPropOrDefault, recordId, shouldFetchDetailData } = useContext(QuoteContext)
    const [quoteData, setQuoteData] = useState<any>({})
    const [companyData, setCompanyData] = useState<any>({})
    const [customerData, setCustomerData] = useState<any>({})
    const [productData, setProductData] = useState<any>([])
    const [productTableData, setProductTableData] = useState<QuoteDataType[]>([])
    const [totalMoneyBeforeDiscount, setTotalMoneyBeforeDiscount] = useState(0)

    const getQuoteData = () => {
        axiosCRMCall
            .post('/quote/getDetail', { id: Number(recordId) || id || 0 })
            .then((res) => {
                if (res?.data?.data?.data) {
                    setQuoteData(res?.data?.data?.data)
                    setProductData(res?.data?.data?.data.product_list)
                } else {
                    setQuoteData({})
                    setProductData([])
                }
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        let tempData = []
        let tempTotal = 0
        for (let i = 0; i < productData.length; i++) {
            tempData.push({
                key: i + 1,
                idproduct: getPropOrDefault(productData[i], 'product_id._id', 'Chưa cập nhật'),
                nameproduct: getPropOrDefault(productData[i], 'product_id.prod_name', 'Chưa cập nhật'),
                soluong: getPropOrDefault(productData[i], 'amount', '0'),
                dongia: getPropOrDefault(productData[i], 'product_price', '0'),
                chietkhau: getPropOrDefault(productData[i], 'product_discount_rate', '0'),
                thue: getPropOrDefault(productData[i], 'tax_rate', '0'),
                total: getPropOrDefault(productData[i], 'product_total_money', '0'),
            })
            tempTotal += Number(getPropOrDefault(productData[i], 'product_total_money', '0')) || 0
        }
        setProductTableData(tempData)
        setTotalMoneyBeforeDiscount(tempTotal)
    }, [productData])

    useEffect(() => {
        getQuoteData();
    }, [])

    useEffect(() => {
        getQuoteData();
    }, [shouldFetchDetailData])

    const basicQuoteInfo: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Số báo giá',
            children: getPropOrDefault(quoteData, 'quote_code_str', 'Chưa cập nhật')
        },
        {
            key: '2',
            label: 'Ngày báo giá',
            children: getPropOrDefault(quoteData, 'date_quote', '') ? dayjs(getPropOrDefault(quoteData, 'date_quote', '')).format('DD/MM/YYYY') : 'Chưa cập nhật'
        },
        {
            key: '3',
            label: 'Hiệu lực báo giá',
            children: getPropOrDefault(quoteData, 'date_quote_end', '') ? dayjs(getPropOrDefault(quoteData, 'date_quote_end', '')).format('DD/MM/YYYY') : 'Chưa cập nhật'
        }
    ]

    const companyInfo: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Công ty CPTT Hưng Hà',
            children: ''
        },
        {
            key: '2',
            label: 'Số 1, Trần Nguyên Đán, Định Công, Hoàng Mai, HN',
            children: ''
        },
        {
            key: '3',
            label: '0982.079.209',
            children: ''
        },
        {
            key: '4',
            label: '+84 (8) 24567889',
            children: ''
        },
        {
            key: '5',
            label: (<a><p style={{ color: 'blue !important' }}>timviec365.vn</p></a>),
            children: ''
        }
    ]

    const customerInfo: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Khách hàng',
            children: 'Công ty TNHH Meta'
        },
        {
            key: '2',
            label: 'Địa chỉ',
            children: 'Artemis tower, Lê Trọng Tấn, Khương Mai, Thanh Xuân, HN'
        },
        {
            key: '3',
            label: 'Số điện thoại',
            children: '023446778'
        },
        {
            key: '4',
            label: 'Mã số thuế',
            children: 'TX873'
        },
    ]

    const totalPriceInfo: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Tổng thành tiền',
            children: `${totalMoneyBeforeDiscount.toLocaleString('vi-VN')} VNĐ`
        },
        {
            key: '2',
            label: 'Chiết khấu đơn hàng',
            children: `${Number(getPropOrDefault(quoteData, 'discount_rate', '0')).toLocaleString('vi-VN')} %`
        },
        {
            key: '3',
            label: 'Tổng tiền thanh toán',
            children: `${Number(getPropOrDefault(quoteData, 'total_money', '0')).toLocaleString('vi-VN')} VNĐ`
        },
    ]

    const columns: ColumnsType<QuoteDataType> = [
        {
            title: "STT",
            width: 30,
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Mã hàng hóa",
            width: 80,
            dataIndex: "idproduct",
            key: "0",
        },
        {
            title: "Hàng hóa",
            dataIndex: "nameproduct",
            key: "1",
            width: 100,
        },
        {
            title: "SL",
            dataIndex: "soluong",
            key: "3",
            width: 30,
            render: (text) => (
                Number(text).toLocaleString('vi-VN')
            )
        },
        {
            title: "Đơn giá (VNĐ)",
            dataIndex: "dongia",
            key: "4",
            width: 100,
            render: (text) => (
                Number(text).toLocaleString('vi-VN')
            )
        },
        {
            title: "Chiết khấu (%)",
            dataIndex: "chietkhau",
            key: "5",
            width: 60,
            render: (text) => (
                Number(text).toLocaleString('vi-VN')
            )
        },
        {
            title: "VAT (%)",
            dataIndex: "thue",
            key: "6",
            width: 60,
            render: (text) => (
                Number(text).toLocaleString('vi-VN')
            )
        },
        {
            title: "Thành tiền (VNĐ)",
            dataIndex: "total",
            key: "7",
            width: 100,
            render: (text) => (
                Number(text).toLocaleString('vi-VN')
            )
        },
    ]

    return (
        <>
            <div style={{ width: '100%', margin: '20px', pointerEvents: "none" }}>
                {/* Logo + thông tin báo giá cơ bản */}
                <div style={sectionCss}>
                    {/* <Col span={24}> */}
                    <Col span={8}>
                        <Image
                            width={'100%'}
                            src="/crm/img/TimViec365_logo.svg"
                            alt="Logo TimViec365"
                        />
                    </Col>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Descriptions
                            items={basicQuoteInfo}
                            column={1}
                            labelStyle={descriptLabel}
                            contentStyle={descriptContent}
                            size="small"
                        />
                    </Col>
                    {/* </Col> */}
                </div>

                {/* Tiêu đề */}
                <div style={{ textAlign: 'center', width: 'calc(100% - 40px)', marginBottom: '50px' }}>
                    <Title>BẢNG BÁO GIÁ</Title>
                </div>

                {/* Thông tin cty và thông tin khách hàng */}
                <div style={sectionCss}>
                    <Col span={11}>
                        <Descriptions
                            items={companyInfo}
                            column={1}
                            labelStyle={descriptLabel}
                            contentStyle={descriptContent}
                            colon={false}
                            size="small"
                        />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <Descriptions
                            items={customerInfo}
                            column={1}
                            labelStyle={descriptLabel}
                            contentStyle={descriptContent}
                            size="small"
                        />
                    </Col>
                </div>

                {/* Lời giới thiệu */}
                <div style={{ width: 'calc(100% - 40px)', marginBottom: '20px' }}>
                    <p style={simpleLabel}>Lời giới thiệu</p>
                    <p style={simpleContent}>{getPropOrDefault(quoteData, 'introducer', 'Chưa cập nhật')}</p>
                </div>

                {/* Bảng báo giá */}
                <div style={{ width: 'calc(100% - 40px)', marginBottom: '20px' }}>
                    <Table
                        columns={columns}
                        dataSource={productTableData}
                        bordered
                        pagination={{
                            position: [],
                        }}
                    />
                </div>

                {/* Tổng hợp */}
                <div style={sectionCss}>
                    <Col span={12}></Col>
                    <Col span={12}>
                        <Descriptions
                            items={totalPriceInfo}
                            column={1}
                            labelStyle={descriptLabel}
                            contentStyle={descriptContent}
                            size="small"
                        />
                    </Col>
                </div>

                {/* Tiền bằng chữ */}
                <div style={sectionCss}>
                    <p><span style={simpleLabel}>Số tiền viết bằng chữ:</span><span style={simpleContent}>{` Một triệu đồng`}</span></p>
                </div>

                {/* Điều khoản và quy định + ghi chú */}
                <div style={{ width: 'calc(100% - 40px)', marginBottom: '20px' }}>
                    <p style={simpleLabel}>Điều khoản &  Quy định </p>
                    <p style={simpleContent}>Quy định của Công ty CPTT Hưng Hà ...........................................................................................................................................................................
                        .........................................................................................................................................................................................................................................</p>
                </div>
                <div style={{ width: 'calc(100% - 40px)', marginBottom: '40px' }}>
                    <p style={simpleLabel}>Ghi chú:</p>
                    <p style={simpleContent}>Báo giá chưa bao gồm thuế VAT</p>
                </div>

                {/* Chỗ ký tên */}
                <div style={sectionCss}>
                    <Col span={12}>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: 700
                            }}>
                                Người lập
                            </p>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: 400,
                                marginBottom: '30px'
                            }}>
                                (Ký, họ tên)
                            </p>
                            <p style={{
                                fontSize: '20px',
                                fontWeight: 600
                            }}>
                                Phạm Thanh Mai
                            </p>
                        </div>
                    </Col>
                    {/* <Col span={6}></Col> */}
                    <Col span={12}>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: 700
                            }}>
                                Giám đốc
                            </p>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: 400,
                                marginBottom: '30px'
                            }}>
                                (Ký, họ tên, đóng dấu)
                            </p>
                            <p style={{
                                fontSize: '20px',
                                fontWeight: 600
                            }}>
                                Trương Văn Trắc
                            </p>
                        </div>
                    </Col>
                </div>
            </div>
        </>
    )
}

export default simple_quote_report