import { React } from "react"
import Seo from '../components/head'
import { useForm } from 'react-hook-form';
import { changePwCom, changePwEp, changePwPersonal } from "../utils/handleApi";
import { useRouter } from 'next/router';
import { CheckLogin } from "../utils/function"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { getServerSideProps } from '../utils/function'

export { getServerSideProps }
export default function ChangePw() {
    CheckLogin()

    const router = useRouter();
    const type = router.query.type
    const account = router.query.account

    // xử lý validate
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async data => {
        data.phoneTK = account
        if (type == 1) {
            changePwCom(data)
        } else if (type == 2) {
            changePwEp(data)
        } else {
            changePwPersonal(data)
        }
    };

    return (
        <>
            <Seo
                seo=''
                title='Trang quên mật khẩu'
            />
            <Header />
            <div className="register_ctnv" id="register_cty">
                <div className="content_ql ctn_bgr_body">
                    <div className="content_nv">
                        <div className="container">
                            <div className="ctn_qmk">
                                <form onSubmit={handleSubmit(onSubmit)} className="qmk_form">
                                    <div className="three_page_qmk tow_reg_ql share_reg_log share_brd_radius share_bgr_tow">
                                        <div className="header_qmk">
                                            <h3 className="share_clr_four cr_weight_bold tex_center">Khôi phục mật khẩu</h3>
                                            <div className="qmk_avt_ic tex_center">
                                                <img src="../img/three_page_qmk.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="ctn_form share_distance">
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Nhập mật khẩu mới <span className="cr_red">*</span></label>
                                                <input type="password" name="password" className="form-control" id="password-field-one" placeholder="Nhập mật khẩu mới"
                                                    {...register('password', {
                                                        required: 'Vui lòng nhập mật khẩu',
                                                        pattern: {
                                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                                            message:
                                                                'Mật khẩu phải gồm 6 ký tự trở lên, bao gồm ít nhất một chữ cái và ít nhất một chữ số, không chứa khoảng trắng.',
                                                        }
                                                    })}
                                                />
                                                {errors && errors.password && <label className="error">{errors.password.message}</label>}

                                                <span className="loi_error share_dnone">Vui lòng nhập mật khẩu có độ dài từ 6 ký tự và không chứa dấu cách</span>
                                            </div>
                                            <div className="form-group">
                                                <label className="form_label share_fsize_three share_clr_one cr_weight">
                                                    Nhập lại mật khẩu <span className="cr_red">*</span></label>
                                                <input type="password" name="re_password" className="form-control" id="password-field-tow" placeholder="Nhập lại mật khẩu"
                                                    {...register('re_password', {
                                                        required: 'Vui lòng nhập mật khẩu xác nhận',
                                                        validate: (value) => {
                                                            const password = watch('password');
                                                            return value === password || 'Mật khẩu không khớp';
                                                        },
                                                    })} />
                                                {errors && errors.re_password && <label className="error">{errors.re_password.message}</label>}
                                            </div>
                                        </div>
                                        <div className="form-butt-one">
                                            <input type="submit" className="share_bgr_one cr_weight share_clr_tow share_fsize_tow share_cursor tiep_tuc_one" value="Hoàn thành" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <link rel="stylesheet" href="https://timviec365.vn/css/footer_new.css?v=2" />
            <Footer />
        </>
    )
}