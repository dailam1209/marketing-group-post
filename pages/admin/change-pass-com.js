import { React, useState, useEffect } from "react"
import CallApi from '../api/call_api';
import { useRouter } from 'next/router';
import { ConvertIntToDate } from '../../utils/function'
import { useForm } from 'react-hook-form'
import HeaderAdmin from "../../components/headerAdmin";

export default function UpdateVip() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        data.com_id = id
        let result = await CallApi.updatePwAdmin(data)
        if (result.data && result.data.data.result == true) {
            alert('Cập nhật thành công')
            window.location.reload()
        } else {
            alert(result)
        }
    };

    useEffect(() => {
        getIsLoad(true)
    }, [])

    const router = useRouter()
    const { id } = router.query
    const [isLoad, getIsLoad] = useState(false)

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
                <h3 className="header">Thay đổi mật khẩu công ty - ID: {id}</h3>
                <div className="content-inner">
                    <form onSubmit={handleSubmit(onSubmit)} name="frmChangePass">
                        <input type="hidden" name="id" value="118128" />
                        <div className="gray">
                            <table className="tab1">
                                <tbody>
                                    <tr className="second">
                                        <td width="200"><strong>Mật khẩu mới: </strong></td>
                                        <td>
                                            <input type="password" name="password" id="password" placeholder="Vui lòng nhập mật khẩu mới" defaultValue=""
                                                {...register('password', {
                                                    required: 'Vui lòng nhập mật khẩu',
                                                    pattern: {
                                                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                                        message:
                                                            'Mật khẩu phải gồm 6 ký tự trở lên, bao gồm ít nhất một chữ cái và ít nhất một chữ số, không chứa khoảng trắng.',
                                                    },
                                                })}
                                            />
                                            {errors && errors.password && <label className="error">{errors.password.message}</label>}
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