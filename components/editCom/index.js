import { React, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Link from 'next/link'
import { validatePhone } from '../../utils/function';
import { updateCom } from "../../utils/handleApi";


export default function EditCom({closePopupUpdate, data, setUpdateStatus}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        let result = await updateCom(data)
        setUpdateStatus(true)
    };  

    return (
        <>
            <div className="modal_share modal_share_tow edit_tt_taikhoan" style={{ display: 'block'}}>
                <div className="modal-content">
                    <div className="info_modal">
                        <div className="modal-header">
                            <div className="header_ctn_share">
                                <h4 className="ctn_share_h share_clr_tow tex_center cr_weight_bold">Chỉnh sửa thông tin</h4>
                                <span className="close_detl close_dectl" onClick={closePopupUpdate}>&times;</span>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="ctn_body_modal">
                                <div className="madal_form">
                                    <form onSubmit={handleSubmit(onSubmit)}
                                        className="edit_share_form share_distance edit_tt_taikhoan_form">
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                Tên công ty <span className="cr_red">*</span></label>
                                            <input type="text" name="userName" className="form-control share_fsize_one share_clr_one"
                                                placeholder="Nhập tên công ty"
                                                defaultValue={data.userName}
                                                {...register('userName', {
                                                    required: 'Không được để trống',
                                                })}
                                            />
                                            {errors.userName && <label className="error">{errors.userName.message}</label>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                Số điện thoại liên hệ <span className="cr_red">*</span></label>
                                            <input type="text" name="phone" className="form-control share_fsize_one share_clr_one"
                                                placeholder="Nhập số điện thoại"
                                                {...register("phone", {
                                                    validate: {
                                                        validatePhone: (value) => validatePhone(value) || "Hãy nhập đúng định dạng số điện thoại"
                                                    }
                                                })}
                                                defaultValue={data.phone || data.phoneTK || ''}
                                            />
                                            {errors.phone && <label className="error">{errors.phone.message}</label>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                Email <span className="cr_red">*</span></label>
                                            <input type="text" name="email" className="form-control share_fsize_one share_clr_one"
                                                placeholder=""
                                                value={data.email || ''} readOnly/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form_label share_fsize_three tex_left cr_weight share_clr_one">
                                                Địa chỉ <span className="cr_red">*</span></label>
                                            <input type="text" name="address" className="form-control share_fsize_one share_clr_one"
                                                placeholder="Nhập địa chỉ công ty"
                                                defaultValue={data.address}
                                                {...register("address", {
                                                    required: 'Không được để trống',
                                                })}
                                            />
                                            {errors.address && <label className="error">{errors.address.message}</label>}
                                        </div>
                                        <div className="form_butt_ht">
                                            <div className="tow_butt_flex">
                                                <button type="button" className="js_btn_huy btn_d btn_trang btn_140" onClick={closePopupUpdate}>
                                                    Hủy
                                                </button>
                                                <button type="submit" className="btn_d btn_xanh btn_140 com_save">
                                                    Hoàn thành
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}