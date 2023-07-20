import { React, useState, useEffect } from "react";
import CallApi from '../api/call_api';
import ReactPaginate from 'react-paginate';
import HeaderAdmin from "../../components/headerAdmin";
import { format } from 'date-fns';
export default function AdminFeedback() {
    // xử lý phân trang và gọi api
    const [listFeedback, getListFeedback] = useState({})
    const [totalPages, getTotalPage] = useState()
    const [isLoad, getIsLoad] = useState(false)
    const [count, setCount] = useState()

    const handlePageChange = async (selected) => {
        try {
            let response = await CallApi.listFeedback(selected.selected + 1)
            getListFeedback(response.data.data.data)
            const totalItems = response.data.data.count;
            const itemsPerPage = 25
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            getTotalPage(totalPages);
        } catch (error) {
            alert(error)
        }
    };
    useEffect(() => {
        const getData = async () => {
            try {
                let response = await CallApi.listFeedback('')
                getListFeedback(response.data.data.data)

                const totalItems = response.data.data.count;
                const itemsPerPage = 25;
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                getTotalPage(totalPages);
                setCount(totalItems)
            } catch (error) {
                alert(error)
            }
            getIsLoad(true)
        }
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

                <HeaderAdmin />

                <div className="content-inner">
                    <p style={{ display: 'block', float: 'left', width: '100%', marginbottom: '15px', fontsize: '14px' }}>{count} kết quả</p>
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
                                    <td align="center">{item.userName}</td>
                                    <td align="center">{item.email ? item.email : item.emailContact}</td>
                                    <td align="center">{item.phone}</td>
                                    <td align="center">{item.feed_back}</td>
                                    <td align="center">{item.rating}</td>
                                    <td align="center">{(format(parseInt(item.createdAt) * 1000, 'dd-MM-yyyy'))}</td>
                                </tr>
                            ))}
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