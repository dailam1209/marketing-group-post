import React, { useEffect, useState } from "react";
import styles from "./securityInfomation.module.css";
import BodyFrameFooter from "@/components/hr/bodyFrame/bodyFrame_footer/bodyFrame_footer";

export default function SecurityInfomation() {

    const [dropdownItem, setDropdownItem] = useState(-1)
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCheckedLogin, setIsCheckedLogin] = useState(false);
    const [isCheckedNoti, setIsCheckedNoti] = useState(false);
    const [dropDownPassword, setDropdownPassword] = useState(false);

    function handleCheckedLoginClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsCheckedLogin(!isCheckedLogin)
    }
    function handleCheckedNotiClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsCheckedNoti(!isCheckedNoti)
    }

    const handleOpenDropdown = (index: number) => {
        if (dropdownItem === index) {
            setDropdownItem(-1);
            // Close the dropdown by setting dropdownItem to null
        } else {
            setDropdownItem(index)
        }
    }
    const [dataSlice, setDataSlice] = useState<any>([])

    const handleSeeMore = () => {
        setDataSlice(data)
        setIsExpanded(true)
    }
    const handlePassWord = () => {
        setDropdownPassword(!dropDownPassword)
    }
    const handleCollapse = () => {
        setDataSlice(data.slice(0, 2));
        setIsExpanded(false)
    }

    useEffect(() => {
        setDataSlice(data.slice(0, 2));
    }, []);
    const data = [
        {
            img: '/icon_pc.svg',
            text: 'Google Chrome 95.0.4638.69 windows · Hanoi, Vietnam · 2021-11-17 16:59:27'

        },
        {
            img: '/icon_pc.svg',
            text: 'Google Chrome 95.0.4638.69 windows · Hanoi, Vietnam · 2021-11-17 16:59:27'

        },
        {
            img: '/icon_pc.svg',
            text: 'Google Chrome 95.0.4638.69 windows · Hanoi, Vietnam · 2021-11-17 16:59:27'

        },
        {
            img: '/icon_pc.svg',
            text: 'Google Chrome 95.0.4638.69 windows · Hanoi, Vietnam · 2021-11-17 16:59:27'

        },
        {
            img: '/icon_pc.svg',
            text: 'Google Chrome 95.0.4638.69 windows · Hanoi, Vietnam · 2021-11-17 16:59:27'

        },
        {
            img: '/icon_pc.svg',
            text: 'Google Chrome 95.0.4638.69 windows · Hanoi, Vietnam · 2021-11-17 16:59:27'

        },
    ]



    return (
        <>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.tab_content}`}>
                    <div className={`${styles.tab_pane}`}>
                        <div className={`${styles.title_menu2}`}>THÔNG TIN BẢO MẬT</div>
                        <div className={`${styles.menu2_content}`} >
                            {dataSlice.map((item: any, index: any) => (
                                <div key={index}>
                                    <div className={`${styles.menu2_padding}`}>
                                        <div className={`${styles.menu2_item1}`}>
                                            <img className={`${styles.l_img_pc}`} src={item.img} alt="icon" />
                                        </div>
                                        <div className={`${styles.menu2_item2}`}>{item.text}</div>
                                        <div className={`${styles.menu2_item3}`}>
                                            <div className={`${styles.btn_group}`}>
                                                <button type="button" className={`${styles.dropdown_toggle} ${styles.btn}`} onClick={() => handleOpenDropdown(index)}>
                                                    <img className={`${styles.l_img_pc}`} src={`/icon_luachon.svg`} alt="icon" />
                                                </button>
                                                {dropdownItem === index && (
                                                    <div className={`${styles.dropdown_menu}`}>
                                                        <button type="button" className={`${styles.dropdown_item}`}>Không phải bạn ?</button>
                                                        <div className={`${styles.l_hr}`}></div>
                                                        <button type="button" className={`${styles.dropdown_item}`}>Đăng xuất</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className={`${styles.background_menu2}`} style={{ display: isExpanded ? "none" : "block" }}>
                                <div className={`${styles.backgroud_menu2_item1}`}>
                                    <div className={`${styles.menu2_content_item}`} onClick={handleSeeMore}>
                                        <img className={`${styles.l_img_pc}`} src={`/icon_down.svg`} alt="" /> Xem thêm
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.thugon1}`} style={{ display: isExpanded ? "block" : "none" }} >
                                <div className={`${styles.thugon_item1}`} onClick={handleCollapse}>
                                    <img className={`${styles.l_img_pc}`} src={`/icon_top.svg`} alt="icon" />Ẩn bớt
                                </div>
                                <div className={` ${styles.menu2_custom_modal}`}>
                                    <button type="button" className={`${styles.menu2_custom_btn}`}>
                                        <div className={`${styles.menu2_logout}`}>
                                            <div className={`${styles.menu2_logout_text}`}>
                                                Đăng xuất khỏi tất cả
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.tab_pane}`}>
                        <div className={`${styles.title_menu2}`}>ĐĂNG NHẬP</div>
                        <div className={`${styles.menu2_content} ${styles.menu2_content_bottom}`} >
                            <div className={`${styles.menu2_padding}`}>
                                <div className={`${styles.menu2_item1}`}>
                                    <img className={`${styles.l_img_pc}`} src="/icon_doimatkhau.svg" alt="icon" />
                                </div>
                                <div className={`${styles.menu2_item2}`}>Đổi mật khẩu</div>
                                <div className={`${styles.menu2_item3}`}>
                                    <div className={`${styles.btn_group}`} onClick={handlePassWord}>
                                        <button type="button" className={`${styles.dropdown_toggle} ${styles.btn}`} >
                                            <img className={`${styles.l_img_pc}`} src={`/icon_down.svg`} alt="icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {dropDownPassword && (
                                <div className={`${styles.content_retyperPass}`}>
                                    <p className={`${styles.t_validation}`}></p>
                                    <form action="">
                                        <table className={`${styles.retyprPass_right}`}>
                                            <tbody>
                                                <tr className={`${styles.retyprPass_left}`}>
                                                    <td className={`${styles.retyprPass_text}`}>Mật khẩu hiện tại</td>
                                                    <td>
                                                        <input type="password" className={`${styles.l_retypePass_input} ${styles.t_current_pass}`} />
                                                    </td>
                                                </tr>
                                                <tr className={`${styles.retyprPass_left}`}>
                                                    <td className={`${styles.retyprPass_text}`}>Mật khẩu mới</td>
                                                    <td>
                                                        <input type="password" className={`${styles.l_retypePass_input} ${styles.t_current_pass}`} />
                                                    </td>
                                                </tr>
                                                <tr className={`${styles.retyprPass_left}`}>
                                                    <td className={`${styles.retyprPass_text}`}>Nhập lại mật khẩu mới</td>
                                                    <td>
                                                        <input type="password" className={`${styles.l_retypePass_input} ${styles.t_current_pass}`} />
                                                    </td>
                                                </tr>
                                                <tr className={`${styles.retyprPass_left}`}>
                                                    <td className={`${styles.retyprPass_text}`}>
                                                        <a href="" className={`${styles.menu2_custom_btn}`}>Quên mật khẩu ?</a>
                                                    </td>
                                                    <td className={`${styles.retyprPass_text} ${styles.text_left}`}>
                                                        <button className={`${styles.btn_retypePass}`}>Lưu thay đổi</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                            )}
                            <div className={`${styles.menu2_padding}`}>
                                <div className={`${styles.menu2_item1}`}>
                                    <img className={`${styles.l_img_pc}`} src="	/icon_luuthongtin.svg" alt="icon" />
                                </div>
                                <div className={`${styles.menu2_item2}`}>Lưu thông tin đăng nhập của bạn</div>
                                <div className={`${styles.menu2_item3}`}>
                                    <div className={`${styles.switch_login}`} onClick={handleCheckedLoginClick}>
                                        <label htmlFor="" className={`${styles.switch}`}>
                                            <input type="checkbox" id="checked" checked={isCheckedLogin} />
                                            <span className={`${styles.slider} ${styles.round}`} style={{ backgroundColor: isCheckedLogin ? '#2196F3' : '#ccc' }}>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.menu2_padding}`}>
                                <div className={`${styles.menu2_item1}`}>
                                    <img className={`${styles.l_img_pc}`} src="	/icon_thongbao.svg" alt="icon" />
                                </div>
                                <div className={`${styles.menu2_item2}`}>Nhận cảnh báo về những đăng nhập lạ</div>
                                <div className={`${styles.menu2_item3}`}>
                                    <div className={`${styles.switch_login}`} onClick={handleCheckedNotiClick}>
                                        <label htmlFor="" className={`${styles.switch}`}>
                                            <input type="checkbox" id="checked" checked={isCheckedNoti} />
                                            <span className={`${styles.slider} ${styles.round}`} style={{ backgroundColor: isCheckedNoti ? '#2196F3' : '#ccc' }}>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BodyFrameFooter src="https://www.youtube.com/embed/M_mzSRSprP0" />
            </div>
        </>
    );
}
