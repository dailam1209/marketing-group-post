import { React, useState, useEffect } from "react";
import CallApi from '../api/call_api';
import ReactPaginate from 'react-paginate';

export default function AdminFeedback() {
        // xử lý phân trang và gọi api
    const [listFeedback, getListFeedback] = useState({})
    const [totalPages, getTotalPage] = useState()
    const [isLoad, getIsLoad] = useState(false)
    const handlePageChange = async (selected) => {
        try {
            let response = await CallApi.listFeedback(selected.selected + 1)
            getListFeedback(response.data.data.items)
            const totalItems = response.data.data.count;
            const itemsPerPage = 20
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            getTotalPage(totalPages);
        } catch (error) {
            alert(error)
        }
        console.log('test2')
    };
    useEffect(() => {
        const getData = async () => {
            try {
                let response = await CallApi.listFeedback('')
                getListFeedback(response.data.data.items)
                const totalItems = response.data.data.count;
                const itemsPerPage = 20; //
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                getTotalPage(totalPages);
            } catch (error) {
                alert(error)
            }
            getIsLoad(true)
        }
        console.log('test')
        getData()
    }, [])
    if (!isLoad) {
        return
    } else {
        return (
            <>
                <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
                <title>Administrator</title>
                {/* <base href="https://vieclamtaihanoi.com.vn/" /> */}
                {/* <link href="#" rel="shortcut icon" /> */}
                <link rel="stylesheet" href="../css/admin.css" type="text/css" />

                <div id="header">
                    <div className="logo">
                        <a href="https://vieclamtaihanoi.com.vn/admin">
                            <img src="../img/admin-logo.png" />
                        </a>
                    </div>
                    <div className="header-right">
                        Chào{" "}
                        <a
                            href="https://vieclamtaihanoi.com.vn/admin/edit_thanhvien/2"
                            className="name-admin"
                        >
                            Administrator
                        </a>
                        <a className="exit" href="https://vieclamtaihanoi.com.vn/admin/thoat">
                            Thoát
                        </a>
                    </div>
                </div>

                <div className="content-inner">
                    <br />
                    <p style={{ display: 'block', float: 'left', width: '100%', marginbottom: '15px', fontsize: '14px' }}>205 kết quả</p>
                    <br />
                    <table style={{ display: 'block', width: '100%' }}>
                        <thead>
                            <tr className="title">
                                {/* <td width="5%" align="center">STT</td> */}
                                <td style={{ width: '3%' }} align="center">ID</td>
                                <td style={{ width: '10%' }} align="center">Tên</td>
                                <td style={{ width: '6%' }} >Email</td>
                                <td style={{ width: '5%' }} >Số điện thoại</td>
                                <td style={{ width: '8%' }} >Nội dung đánh giá</td>
                                <td style={{ width: '5%' }} >Số sao</td>
                                <td style={{ width: '8%' }} >Ngày tạo</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listFeedback?.map(item => (
                                    <tr>
                                        <td align="center">{item?._id}</td>
                                        <td align="center">Ngô Xuân Thưởng</td>
                                        <td align="center">ngoxuanthuong11101970@gmail.com</td>
                                        <td align="center">0912412325</td>
                                        <td align="center">kém lắm hay bị lỗi</td>
                                        <td align="center">3</td>
                                        <td align="center">2023-05-08 10:36:25</td>
                                    </tr>
                                ))}
                            <tr>
                                <td align="center">185</td>
                                <td align="center">kim Hằng</td>
                                <td align="center"></td>
                                <td align="center">0948068788</td>
                                <td align="center">OK</td>
                                <td align="center">5</td>
                                <td align="center">2023-04-25 19:22:29</td>
                            </tr>
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={totalPages} // Tổng số trang
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </>
        )
    }
}