import {React, useState, useEffect} from "react"
import ReactPaginate from 'react-paginate';
import CallApi from '../api/call_api';

export default function Admin() {
    // pagination and get list company
    const [listCom, getlistCom] = useState({})
    const [totalPages, getTotalPage] = useState()
    const [isLoad, getIsLoad] = useState(false)
    const handlePageChange = async (selected) => {
        try {
            let response = await CallApi.listCom(selected.selected + 1)
            getlistCom(response.data.data.items)
            const totalItems = response.data.data.count;
            const itemsPerPage = 20
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            getTotalPage(totalPages);
        } catch (error) {
            alert(error)
        }
    };
    useEffect(() => {
        const getData = async () => {
            try {
                let response = await CallApi.listCom('')
                getlistCom(response.data.data.items)
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
                    <div className="form-search" style={{ position: 'unset' }}>
                        <form name="frmsearch" method="post" style={{ margin: '15px 0' }} action="https://vieclamtaihanoi.com.vn/admin/danhsachcongty">
                            <input defaultValue='' style={{ float: 'left' }} className="text-search" name="findkey" id="findkey" type="text" value="" placeholder="Từ khóa tìm kiếm" />
                            <div style={{ float: 'left', marginright: '10px' }}>
                                <span>Từ Ngày : </span>
                                <input type="date" id="startdate" name="startdate" className="startdate" defaultValue="" />
                                <br />
                            </div>
                            <div style={{ float: 'left' }}>
                                <span>Đến Ngày : </span>
                                <input type="date" id="enddate" name="enddate" className="enddate" defaultValue="" />
                                <br />
                            </div>
                            <div style={{ float: 'left', marginleft: '10px' }}>
                                <span>Nguồn : </span>
                                <select defaultValue={'0'} name="nguon">
                                    <option value="0">Tất cả</option>
                                    <option value="1">Chấm công 365</option>
                                    <option value="2">PC 365</option>
                                </select>
                                <br />
                            </div>
                            <input className="button_w" type="submit" name="submit" defaultValue="Tìm kiếm" />
                        </form>
                    </div >
                    <form method="post"><button type="submit" name="export_excel" id="export_excel">Xuất Excel</button></form>
                    <p style={{ marginbottom: '10px', float: 'left', width: '100%', fontsize: '14px' }}>Tổng 183 kết quả</p>
                    <table style={{ display: 'block', width: "100%" }}>
                        <thead>
                            <tr className="title">
                                <td align="center" style={{ width: "5%" }} >STT</td>
                                <td align="center" style={{ width: "5%" }}>ID Công ty</td>
                                <td align="center" style={{ width: "12%" }}>Tên công ty</td>
                                <td>Email</td>
                                <td>Số điện thoại</td>
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
                                <td align="center">1</td>
                                <td align="center">{item._id}</td>
                                <td align="center">công ty may lgg</td>
                                <td align="center">lethip421@gmail.com</td>
                                <td align="center">0966181051</td>
                                <td align="center">đoi giang an Hà lạng Giang Bắc Giang </td>
                                <td align="center">2023-07-02 20:10:36</td>
                                <td align="center">
                                    <a className="status" onClick={() => activeUser(item._id)}><img src="../img/publish_x.png" /></a>
                                </td>
                                <td align="center">
                                    <a className="status" onClick={() => activeVip(item._id)}><img src="../img/publish_x.png" /></a>
                                </td>
                                <td align="center">
                                    <a>0 nhân viên</a>
                                </td>
                                {/* <td style={{align:"center"}} id='com_117930'> <span style={{display: block;cursor: pointer;}} onClick="change_nv(117930,5)"> 5</span></td> */}
                                <td align="center" id='com_117930'> <span style={{ display: 'block', cursor: 'pointer' }}> 5</span></td>
                                <td align="center"></td>
                                <td align="center"><a target="_blank" href="/admin/changePassCom/117930">Sửa</a></td>
                                <td align="center"><a target="_blank" href="/admin/thdoi_sluong_thhan/117930">Sửa</a></td>
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