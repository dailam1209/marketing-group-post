import { React, useState, useEffect } from "react"
import ReactPaginate from 'react-paginate';
import CallApi from '../api/call_api';
import HeaderAdmin from "../../components/headerAdmin";
import Cookies from "js-cookie";
import { format } from 'date-fns';

export default function Admin() {
    if (!Cookies.get('admin')) {
        // window.location.href = "/admin"
    }
    // pagination and get list company
    const [listCom, getlistCom] = useState([])
    const [totalPages, getTotalPage] = useState()
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState()
    const handlePageChange = async (selected) => {
        valueSend.pageNumber = selected.selected + 1
        try {
            let response = await CallApi.listCom(valueSend)
            getlistCom(response.data.data.data)
            const totalItems = response.data.data.count;
            const itemsPerPage = 25
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            getTotalPage(totalPages)
            setCurrentPage(selected.selected)
        } catch (error) {
            alert(error)
        }
    };
    useEffect(() => {
        const getData = async () => {
            try {
                let response = await CallApi.dsBaoLoi()
                getlistCom(response.data.data.data)
                const totalItems = response.data.data.count;
                const itemsPerPage = 25; //
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                getTotalPage(totalPages)
                setCount(totalItems)
            } catch (error) {
                alert(error)
            }
        }
        getData()
    }, [])
    console.log(listCom.length)
    return (
        <>
            <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
            <title>Administrator</title>
            {/* <base href="https://vieclamtaihanoi.com.vn/" /> */}
            {/* <link href="#" rel="shortcut icon" /> */}
            <link rel="stylesheet" href="../css/admin.css" type="text/css" />

            <HeaderAdmin />

            <div className="content-inner">
                {/* <form method="post"><button type="submit" name="export_excel" id="export_excel">Xuất Excel</button></form> */}
                <p style={{ marginbottom: '10px', float: 'left', width: '100%', fontsize: '14px' }}>Tổng {count} kết quả</p>
                <table style={{ display: 'block', width: "100%" }}>
                    <thead>
                        <tr className="title">
                            <td align="center" style={{ width: "5%" }}>STT</td>
                            <td align="center" style={{ width: "15%" }}>Tên</td>
                            <td style={{ width: "15%" }}>Email</td>
                            <td style={{ width: "10%" }}>Số điện thoại</td>
                            <td style={{ width: "32%" }}>Nội dung báo lỗi</td>
                            <td style={{ width: "15%" }}>Ảnh lỗi</td>
                            <td style={{ width: "20%" }}>Ngày tạo</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listCom?.map((item, index) => {

                                return (
                                    <>
                                        <tr>
                                            <td align="center">{count - currentPage * 25 - index}</td>
                                            <td align="center">{item.userName}</td>
                                            <td align="center">{item.email ? item.email : item.emailContact}</td>
                                            <td align="center">{item.phoneTK}</td>
                                            <td align="center">{item.detail_error}</td>
                                            <td align="center">{item.gallery_image_error ? (<img width={'100px'} height={'100px'} src={item.gallery_image_error} />) : ''} </td>
                                            <td align="center">{format(parseInt(item.time_create), 'dd-MM-yyyy')}</td>
                                        </tr>

                                    </>
                                )
                            })}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div >
        </>
    )
}
