import { React } from "react"
import Cookies from "js-cookie"

export default function checkTypeLogin(props) {
    let name = ''
    if (props.typeLoginComponent == 1) {
        name = 'Công ty'
    } else if (props.typeLoginComponent == 2) {
        name = 'Nhân viên'
    } else {
        name = 'Cá nhân'
    }

    const yes = () => {
        let acc_token = props.result.data.access_token,
            refresh_token = props.result.data.refresh_token,
            role = props.result.data.type,
            type = props.result.data.type,
            UID = result.data.com_info.com_id;
        Cookies.set('rf_token', refresh_token);
        Cookies.set('token_base365', acc_token);
        Cookies.set('role', role);
        Cookies.set('UID', UID);
        if (type == 1) {
            window.location.href = '/quan-ly-ung-dung-cong-ty.html';
        } else if (type == 2) {
            window.location.href = '/quan-ly-ung-dung-nhan-vien.html';
        } else {
            window.location.href = '/quan-ly-ung-dung-ca-nhan.html';
        }
    }

    const no = () => {
        props.setShowPopup(false)
        props.setNotiError(true)
    }

    return (
        <>
            <div className="check_login popup">
                <div className="box_change position_r back_w d_flex flex_column align_c">
                    <p className="leave_content f_normal font_s17 line_h25 color_grey">Tài khoản bạn đăng nhập được xác minh là tài khoản sử dụng cho <u className="color_blue text_name"></u>{name}<br />Bạn có muốn tiếp tục đăng nhập?
                    </p>
                    <div className="btn_leave_the_chat d_flex space_a">
                        <div className="block_btn-l">
                            <button className="btn_cancel btn_blue_c d_flex flex_center align_c cursor_p" onClick={yes}>
                                <p className="font_s16 f_normal line_h19 font_wB">Tiếp tục</p>
                            </button>
                        </div>
                        <div className="">
                            <button className="btn_confirm btn_login d_flex flex_center align_c cursor_p" onClick={no}>
                                <p className="font_s16 f_normal line_h19 font_wB">Không</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}