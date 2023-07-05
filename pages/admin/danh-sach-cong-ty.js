import { React, useState, useEffect } from "react"
import ReactPaginate from 'react-paginate';
import CallApi from '../api/call_api';
import { ConvertIntToDate } from '../../utils/function'
import HeaderAdmin from "../../components/headerAdmin";
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form'

export default function Admin() {
    if (!Cookies.get('admin')) {
        // window.location.href = "/admin"
    }


    const [currentPage, setCurrentPage] = useState()
    const [valueSend, setValueSend] = useState({})

    const { register, handleSubmit } = useForm();
    const onSubmit = async data => {
        setValueSend(data)
        let response = await CallApi.listCom(data)
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
    console.log(valueSend)
    useEffect(() => {
        const getData = async () => {
            try {
                let response = await CallApi.listCom()
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
    console.log(listCom)

    // click for active user
    const activeUser = async (id) => {
        let active = await CallApi.listCom(id)
        console.log(active)
    }

    // click for active vip
    const activeVip = async (id) => {
        let active = await CallApi.listCom(id)
        console.log(active)
    }

    console.log(listCom)

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
                            <input defaultValue='' style={{ float: 'left' }} className="text-search" name="find" id="findkey" type="text"  placeholder="Từ khóa tìm kiếm"
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
                            {/* <div style={{ float: 'left', marginleft: '10px' }}>
                                <span>Nguồn : </span>
                                <select defaultValue={'0'} name="nguon">
                                    <option value="0">Tất cả</option>
                                    <option value="1">Chấm công 365</option>
                                    <option value="2">PC 365</option>
                                </select>
                                <br />
                            </div> */}
                            <div style={{ float: 'left', marginleft: '10px' }}>
                                <span>Loại công ty : </span>
                                <select {...register("findConditions", {
                                })} defaultValue={0}>
                                    <option value="0">Tất cả</option>
                                    <option value="1">Công ty đang vip</option>
                                    <option value="2">Công ty từng vip</option>
                                    <option value="3">Công ty chưa vip</option>
                                    <option value="4">Công ty đăng kí lỗi, chưa kích hoạt</option>
                                    <option value="5">Công ty đăng kí ltrong ngày</option>
                                    <option value="6">Công ty sử dụng chấm công trong ngày</option>
                                </select>
                                <br />
                            </div>
                            <input className="button_w" type="submit" name="submit" defaultValue="Tìm kiếm" />
                        <a className="link_feedback" href="/admin/danh-sach-tt-feedback">Lấy danh sách feedback</a>
                        </form>
                    </div >
                    {/* <form method="post"><button type="submit" name="export_excel" id="export_excel">Xuất Excel</button></form> */}
                    <p style={{ marginbottom: '10px', float: 'left', width: '100%', fontsize: '14px' }}>Tổng {count} kết quả</p>
                    <table style={{ display: 'block', width: "100%" }}>
                        <thead>
                            <tr className="title">
                                {/* <td align="center" style={{ width: "5%" }} >STT</td> */}
                                <td align="center" style={{ width: "5%" }}>ID Công ty</td>
                                <td align="center" style={{ width: "12%" }}>Tên công ty</td>
                                <td>Email(DN)</td>
                                <td>Số điện thoại(DN)</td>
                                <td>Số điện thoại(LH)</td>
                                <td>Email(LH)</td>
                                <td style={{ width: "8%" }}>Địa chỉ</td>
                                <td>Ngày tạo</td>
                                <td>Tình trạng</td>
                                <td>VIP</td>
                                <td>Số nhân viên</td>
                                <td>Nhân viên tối đa</td>
                                <td>Thời hạn sử dụng</td>
                                <td>Đổi mật khẩu</td>
                                <td>Chỉnh sửa</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listCom?.map(item => (
                                <tr>
                                    {/* <td align="center">{(currentPage * 25) + 1}</td> */}
                                    <td align="center">{item.idQLC}</td>
                                    <td align="center">{item.userName}</td>
                                    <td align="center">{item.email}</td>
                                    <td align="center">{item.phoneTK}</td>
                                    <td align="center">{item.phone}</td>
                                    <td align="center">{item.emailContact}</td>
                                    <td align="center">{item.address}</td>
                                    <td align="center">{ConvertIntToDate(item.createdAt)}</td>
                                    <td align="center">
                                        <a className="status" onClick={() => activeUser(item._id)}>
                                            {(item.authentic == 0) ? (<img src="../img/publish_x.png" />) : (<img src="../img/tick.png" />)}


                                        </a>
                                    </td>
                                    <td align="center">
                                        <a className="status" onClick={() => activeVip(item._id)}>
                                            {(item.inForCompany && item.inForCompany.cds.com_vip == 0) ? (<img src="../img/publish_x.png" />) : (<img src="../img/tick.png" />)}
                                        </a>
                                    </td>
                                    <td align="center">
                                        <a>{item.count_emp} nhân viên</a>
                                    </td>
                                    <td align="center" id='com_117930'> <span style={{ display: 'block', cursor: 'pointer' }}>{item.inForCompany && (item.inForCompany.cds.com_ep_vip)}</span></td>
                                    <td align="center">{item.inForCompany && item.inForCompany.cds.com_vip != 0 && (ConvertIntToDate(item.inForCompany.cds.com_vip_time))[0]}</td>
                                    <td align="center"><a target="_blank" href={'/admin/change-pass-com?id=' + item.idQLC}>Sửa</a></td>
                                    <td align="center"><a target="_blank" href={'/admin/update-vip?id=' + item.idQLC}>Sửa</a></td>
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