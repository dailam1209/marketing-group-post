import { React, useState, useEffect } from "react"
import CallApi from '../api/call_api';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form'
import HeaderAdmin from "../../components/headerAdmin";
import Cookies from "js-cookie";
import { format } from 'date-fns';
import { getServerSideProps } from '../../utils/function'

export { getServerSideProps }
export default function UpdateVip() {
    if (!Cookies.get('admin')) {
        // window.location.href = '/admin'
    }
    const router = useRouter()
    const { register, handleSubmit } = useForm();
    const onSubmit = async data => {
        data.com_id = id
        let result = await CallApi.updateVip(data)
        if (result.data && result.data.data.result == true) {
            alert('Cập nhật thành công')
            router.push('/admin/danh-sach-cong-ty')
        } else {
            alert(result)
        }
    };

    const { id, sl, date } = router.query;

    const [listCom, getlistCom] = useState({});
    const [isLoad, getIsLoad] = useState(false);
    const [getTime, setTime] = useState('');
    useEffect(() => {
        if (id) {
            const getData = async () => {
                let data = {
                    com_id: id
                }
                try {
                    let response = await CallApi.listCom(data);
                    getlistCom(response.data.data.data[0]);
                    setTime(format(response.data.data.data[0].createdAt, 'yyyy-MM-dd'));
                } catch (error) {
                    console.log(error)
                }
                getIsLoad(true)

            }
            getData()
        }
    }, [id, getTime])
    if (!isLoad) {
        return
    }

    return (
        <>
            <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
            <title>Administrator</title>
            {/* <base href="https://vieclamtaihanoi.com.vn/" /> */}
            {/* <link href="#" rel="shortcut icon" /> */}
            <link rel="stylesheet" href="../css/admin.css" type="text/css" />

            <HeaderAdmin />

            <div className="content-inner">
                <h3 className="header">Thay đổi số lượng tài khoản và thời hạn sử dụng vip công ty - ID: {id}</h3>
                <div className="content-inner">
                    <form onSubmit={handleSubmit(onSubmit)} name="frmChangeSl" method="post">
                        <input type="hidden" name="id" value="118277" />
                        <div className="gray">
                            <table className="tab1">
                                <tbody>
                                    <tr className="second">
                                        <td width="200"><strong>Số lượng tài khoản: </strong></td>
                                        <td>
                                            <input type="text" name="com_ep_vip" id="so_luong" placeholder="Vui lòng nhập số lượng" defaultValue={listCom.inForCompany && listCom.inForCompany.cds.com_ep_vip}
                                                {...register("com_ep_vip", {
                                                })}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="second">
                                        <td width="200"><strong>Thời hạn sử dụng: </strong></td>
                                        <td>
                                            <input
                                                type="date"
                                                name="com_vip_time"
                                                id="thoi_han"
                                                placeholder="Vui lòng nhập thời hạn"
                                                defaultValue={date != 0 ? format(parseInt(date) * 1000, 'yyyy-MM-dd') : getTime}
                                                {...register("com_vip_time")}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="gray">
                            <center>
                                <input className="button" type="submit" name="submit" value="Lưu thay đổi" />
                            </center>
                        </div>
                    </form>
                    <div className="clr"></div>
                </div>
            </div>
        </>
    )
}