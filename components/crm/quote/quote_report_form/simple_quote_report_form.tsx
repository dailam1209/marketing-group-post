import React, { CSSProperties } from "react";
import { Col, Descriptions, DescriptionsProps, Grid, Image, Typography } from 'antd'
import Table, { ColumnType, ColumnsType } from "antd/es/table";
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
    color: 'black',
    fontWeight: 600,
}

const descriptChild: CSSProperties = {

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

const simple_quote_report = () => {
    const basicQuoteInfo: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Số báo giá',
            children: '965848'
        },
        {
            key: '2',
            label: 'Ngày báo giá',
            children: '09/07/2022'
        },
        {
            key: '3',
            label: 'Hiệu lực báo giá',
            children: '08/10/2023'
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
            children: '1.000.000 VNĐ'
        },
        {
            key: '2',
            label: 'Chiết khấu đơn hàng',
            children: '2,1 %'
        },
        {
            key: '3',
            label: 'Tổng tiền thanh toán',
            children: '1.000.000 VNĐ'
        },
    ]

    const introInfo: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Lời giới thiệu',
            children: 'Công ty  Cổ phần Thanh toán Hưng Hà xin trân trọng gửi tới quý khách hàng bảng báo giá chi tiết về sản phầm hàng hoá trong quý 3 năm 2022 như sau:'
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
        },
        {
            title: "Đơn giá (VNĐ)",
            dataIndex: "dongia",
            key: "4",
            width: 100,
        },
        {
            title: "CK (%)",
            dataIndex: "chietkhau",
            key: "5",
            width: 60,
        },
        {
            title: "VAT (%)",
            dataIndex: "thue",
            key: "6",
            width: 60,
        },
        {
            title: "Thành tiền (VNĐ)",
            dataIndex: "total",
            key: "7",
            width: 100,
        },
    ]

    return (
        <>
            <div style={{ width: '100%', margin: '20px' }}>
                {/* Logo + thông tin báo giá cơ bản */}
                <div style={sectionCss}>
                    {/* <Col span={24}> */}
                    <Col span={8}>
                        <Image
                            width={'100%'}
                            src="/img/TimViec365_logo.svg"
                            alt="Logo TimViec365"
                        />
                    </Col>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Descriptions
                            items={basicQuoteInfo}
                            column={1}
                            labelStyle={descriptLabel}
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
                            colon={false}
                        />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <Descriptions
                            items={customerInfo}
                            column={1}
                            labelStyle={descriptLabel}
                        />
                    </Col>
                </div>

                {/* Lời giới thiệu */}
                <div style={sectionCss}>
                    <Col span={24}>
                        <Descriptions
                            items={introInfo}
                            column={1}
                            labelStyle={descriptLabel}
                        />
                    </Col>
                </div>

                {/* Bảng báo giá */}
                <div style={{ width: 'calc(100% - 20px)', marginBottom: '20px' }}>
                    <Table
                        columns={columns}
                        dataSource={sampleData}
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
                        />
                    </Col>
                </div>

                {/* Tiền bằng chữ */}
                <div>
                    <p>Số tiền viết bằng chữ: {`Một triệu đồng`}</p>
                </div>

                {/* Điều khoản và quy định + ghi chú */}
                <div>
                    <p>Điều khoản &  Quy định </p>
                    <p>Quy định của Công ty CPTT Hưng Hà...........................................................................................................................................................................
                        .........................................................................................................................................................................................................................................</p>
                    <p>Ghi chú:</p>
                    <p>Báo giá chưa bao gồm thuế VAT</p>
                </div>

                {/* Chỗ ký tên */}
                <div>
                    <Col span={8}>
                        <div>
                            <p>Người lập</p>
                            <p>(Ký, họ tên)</p>
                            <p>Phạm Thanh Mai</p>
                        </div>
                    </Col>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <div>
                            <p> Giám đốc</p>
                            <p>(Ký, họ tên,đóng dấu)</p>
                            <p>Trương Văn Trắc</p>
                        </div>
                    </Col>
                </div>
            </div>
        </>
    )
}

export default simple_quote_report