/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from 'react';
import styles from './bodyFrame_header.module.css'
import DropDownMenu from './drop_down_menu/dropDownMenu';
import Notify from './notify/notify';
import Remind from './remind';
import Sidebar from '../../sidebar/Sidebar';
import ImageWithFallback from './drop_down_menu/imgFallBack';

export interface BodyFrameHeader { }

export default function BodyFrameHeader({ dataHeader, tokenType }: any) {

    const [menuClick, setMenuClick] = useState(false)
    const [noti, setNoti] = useState(false)
    const [remind, setRemind] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
    const dropDownMenuRef = useRef(null);

    const handleOutsideClick = (event: any) => {
        if (dropDownMenuRef.current && !dropDownMenuRef.current.contains(event.target)) {
            setMenuClick(false);
            setNoti(false);
            setRemind(false);
            setOpenSidebar(false)
        }
    };

    useEffect(() => {
        if (menuClick || noti || remind || openSidebar) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [menuClick, noti, remind, openSidebar]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 1024) {
                setOpenSidebar(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Xóa bỏ sự kiện lắng nghe khi component bị hủy
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const toggleMenu = () => {
        setMenuClick(!menuClick);
        setNoti(false)
        setRemind(false)
    };
    const handleNotify = () => {
        setMenuClick(false)
        setNoti(!noti)
        setRemind(false)
    }
    const handleRemind = () => {
        setMenuClick(false)
        setRemind(!remind)
        setNoti(false)
    }
    const handleOpenSidebar = () => {
        setOpenSidebar(!openSidebar)
    }

    return (
        <>
            <div className={`${styles.wrapper}`}
            >
                <div className={`${styles.header}`} >
                    <div className={`${styles.header_left}`} >
                        <div className={`${styles.sidebar_renative}`}>
                            <div>
                                <div className={`${styles.icon_sidebar_all}`} onClick={handleOpenSidebar}>
                                    <img src={`/icon_sidebar_all.svg`} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.header_left_item1}`}>ID-{tokenType == 1 ? dataHeader?.data.com_id : dataHeader?.data.idQLC}</div>
                        <div className={`${styles.header_left_item2}`}>{dataHeader?.data?.com_name || dataHeader?.data?.userName}</div>
                    </div>
                    <div className={`${styles.header_right}`} >
                        <div className={`${styles.header_right_item1}`} >
                            <div className={`${styles.menu_top_icon}`}>
                                <img className={`${styles.drop_down}`} src={`/chat.svg`} alt="icon" />
                            </div>
                            <div className={`${styles.menu_top_icon}`} onClick={handleNotify}>
                                <img className={`${styles.drop_down}`} src={`/nhacnho.svg`} alt="icon" />
                            </div>
                            <div className={`${styles.menu_top_icon}`} onClick={handleRemind}>
                                <img className={`${styles.drop_down}`} src={`/thongbao.svg`} alt="icon" />
                            </div>
                        </div>
                        <div className={`${styles.header_right_item2}`} onClick={toggleMenu}>
                            <div className={`${styles.header_avatar}`}>
                                <ImageWithFallback
                                    src={dataHeader?.data?.com_logo || dataHeader?.data?.avatarUser}
                                    fallbackSrc="/logo_com (2).png"
                                />
                            </div>
                            <div className={`${styles.name}`}>{dataHeader?.data?.com_name || dataHeader?.data?.userName}</div>
                            <div className={`${styles.drop_down}`}>
                                <img src={`/menu.svg`} alt="icon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={dropDownMenuRef}>
                    {menuClick && <DropDownMenu dataHeader={dataHeader} tokenType={tokenType}></DropDownMenu>}
                    {openSidebar && <Sidebar></Sidebar>}
                    {noti && <Notify></Notify>}
                    {remind && <Remind></Remind>}
                </div>
            </div>
        </>
    )
}


