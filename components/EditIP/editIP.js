import { useForm } from "react-hook-form";
import { renderNamePM, validateIP } from "../../utils/function";
import FormData from "form-data";
import { editIP } from "../../utils/handleApi";
import { useRouter } from "next/router";
export default function EditIP(props) {
    // validate and submit
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = new useRouter();
    const onSubmit1 = async data => {
        const edit = async () => {
            const form = new FormData();
            form.append('_id', data.id)
            form.append('fromSite', data.formSite)
            form.append('accessIP', data.accessIP1)
            await editIP(form);
        }
        edit();
        // router.reload();
    }
    return (
        <>
            {/* chinh sua */}
            <div className="modal_share modal_share_tow edit_ip_pm" style={{ display: props.showEdit ? 'block' : 'none' }}>
                <div className="modal-content">
                    <div className="info_modal">
                        <div className="modal-header">
                            <div className="header_ctn_share">
                                <h4 className="ctn_share_h share_clr_tow tex_center cr_weight_bold">
                                    Chỉnh sửa dải IP cho phần mềm
                                </h4>
                                <span className="close_detl close_dectl" onClick={props.closePopEdit}>×</span>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="ctn_body_modal">
                                <div className="madal_form">
                                    <form onSubmit={handleSubmit(onSubmit1)} className="edit_share_form share_distance edit_ip_pm_form">
                                        {
                                            props.getEditID.map((item) => {
                                                return (
                                                    <>
                                                        <div className="form-group share_select2">
                                                            <label className="form_label share_fsize_three">
                                                                Phần mềm thiết lập dải IP*{" "}
                                                                <span className="cr_red cr_weight">*</span>
                                                            </label>
                                                            <input className="hidden" {...register('id')} value={item._id} />
                                                            <input
                                                                {...register('formSite')}
                                                                type="text"
                                                                className="form-control"
                                                                name=""
                                                                defaultValue={renderNamePM(item.fromSite)}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="form_label share_fsize_three">
                                                                Địa chỉ IP <span className="cr_red cr_weight">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="diachi_ip"
                                                                id="addr_ip"
                                                                className="form-control"
                                                                defaultValue={item.accessIP}
                                                                {...register("accessIP1", {
                                                                    required: 'Chưa điền địa chỉ IP',
                                                                    validate: {
                                                                        validateIP: (value) => validateIP(value) || 'Hãy nhập đúng định dạng IP'
                                                                    }
                                                                })}
                                                            />
                                                            {errors.accessIP1 && <label className="error">{errors.accessIP1.message}</label>}
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                        <div className="form_butt_ht">
                                            <div className="tow_butt_flex">
                                                <button
                                                    onClick={props.closePopEdit}
                                                    type="button"
                                                    className="share_fsize_three cr_weight share_cursor share_clr_four share_bgr_tow huy_button"
                                                >
                                                    Hủy
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="share_clr_tow cr_weight share_cursor share_fsize_three share_bgr_one hoan-thanh luu_save_ip_pm"
                                                >
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