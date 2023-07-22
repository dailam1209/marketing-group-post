import { React, useState, useEffect } from "react"
import ReactPaginate from 'react-paginate';
import CallApi from '../api/call_api';
import HeaderAdmin from "../../components/headerAdmin";
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form'
import { format } from 'date-fns';

export default function Admin() {
    if (!Cookies.get('admin')) {
        // window.location.href = "/admin"
    }

    const [currentPage, setCurrentPage] = useState()
    const [valueSend, setValueSend] = useState([])

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        setValueSend(data)
        console.log(data)
        let response = await CallApi.dsDangKyLoi(data);
        console.log(response)
        getlistCom(response.data.data.data)
        const totalItems = response.data.data.count;
        const itemsPerPage = 20
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        getTotalPage(totalPages)
        setCount(totalItems)
    };

    // pagination and get list company
    const [listCom, getlistCom] = useState({})
    const [totalPages, getTotalPage] = useState()
    const [isLoad, getIsLoad] = useState(false)
    const [count, setCount] = useState()
    const handlePageChange = async (selected) => {
        valueSend.pageNumber = selected.selected + 1
        try {
            let response = await CallApi.dsDangKyLoi()
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
                let response = await CallApi.dsDangKyLoi();
                getlistCom(response.data.data.data)
                const totalItems = response.data.data.count;
                const itemsPerPage = 25; //
                const totalPages = Math.ceil(totalItems / itemsPerPage);
                getTotalPage(totalPages)
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
    }
    else {
        return (
            <>
                <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
                <title>Administrator</title>
                {/* <base href="https://vieclamtaihanoi.com.vn/" /> */}
                {/* <link href="#" rel="shortcut icon" /> */}
                <link rel="stylesheet" href="../css/admin.css" type="text/css" />

                <HeaderAdmin />

                <div className="content-inner">
                    <div className="form-search" style={{ position: 'unset' }}>
                        <form onSubmit={handleSubmit(onSubmit)} name="frmsearch" style={{ margin: '15px 0' }} >
                            <input defaultValue='' style={{ float: 'left' }} className="text-search" name="find" id="findkey" type="text" placeholder="Từ khóa tìm kiếm"
                                {...register("find", {
                                })} />
                            <div style={{ float: 'left', marginright: '10px' }}>
                                <span>Từ Ngày : </span>
                                <input type="date" id="startdate" name="inputOld" className="startdate" defaultValue="" {...register("inputOld", {
                                })} />
                                <br />
                            </div>
                            <div style={{ float: 'left' }}>
                                <span>Đến Ngày : </span>
                                <input type="date" id="enddate" name="inputNew" className="enddate" defaultValue="" {...register("inputNew", {
                                })} />
                                <br />
                            </div>
                            <input className="button_w" type="submit" name="submit" defaultValue="Tìm kiếm" />
                        </form>
                    </div >
                    {/* <form method="post"><button type="submit" name="export_excel" id="export_excel">Xuất Excel</button></form> */}
                    <p style={{ marginbottom: '10px', float: 'left', width: '100%', fontsize: '14px' }}>Tổng {count} kết quả</p>
                    <table style={{ display: 'block', width: "100%" }}>
                        <thead>
                            <tr className="title">
                                <td align="center" style={{ width: "5%" }}>ID Công ty</td>
                                <td align="center" style={{ width: "12%" }}>Tên công ty</td>
                                <td>Email(DN)</td>
                                <td>Số điện thoại</td>
                                <td style={{ width: "8%" }}>Địa chỉ</td>
                                <td>Ngày tạo</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listCom?.map(item => (
                                <tr>
                                    {/* <td align="center">{(currentPage * 25) + 1}</td> */}
                                    <td align="center">{item.id}</td>
                                    <td align="center">{item.com_name}</td>
                                    <td align="center">{item.com_mail}</td>
                                    <td align="center">{item.com_phone}</td>
                                    <td align="center">{item.com_address}</td>
                                    <td align="center">{item.com_time_err ? format(item.com_time_err * 1000, 'dd-MM-yyyy') : ''}</td>
                                </tr>
                            ))}
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
}