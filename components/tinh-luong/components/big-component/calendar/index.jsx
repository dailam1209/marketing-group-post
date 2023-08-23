import React from 'react';
import {Badge, BadgeProps, Calendar} from 'antd';
import 'dayjs/locale/vi';
import styles from '../../../pages/quan-ly/cham-cong/App.module.css'
import {CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";

const getListData = (value) => {
    let listData;
    switch (value.date()) {
        case 5:
            listData = [
                {type: 'error', content: 'Chưa Hoàn Thành'},
                {type: 'error', content: 'Chưa Hoàn Thành'},
            ]
            break;
        case 8:
            listData = [
                {type: 'warning', content: 'Đang Làm'},
                {type: 'success', content: 'Hoàn Thành'},
            ];
            break;
        case 10:
            listData = [
                {type: 'warning', content: 'Đang Làm'},
                {type: 'success', content: 'Hoàn Thành'},
                {type: 'error', content: 'Chưa Hoàn Thành'},
            ];
            break;
        case 15:
            listData = [
                {type: 'warning', content: 'Đang Làm'},
                {type: 'success', content: 'Hoàn Thành'},
                {type: 'error', content: 'Chưa Hoàn Thành 1.'},
                {type: 'error', content: 'Chưa Hoàn Thành 2.'},
                {type: 'error', content: 'Chưa Hoàn Thành 3.'},
                {type: 'error', content: 'Chưa Hoàn Thành 4.'},
            ];
            break;
        default:
    }
    return listData || [];
};
export default function Calendar1() {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const headerRender = () => {
        return null; // Ẩn phần header chọn ngày
    }
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content} className={styles.border_list} style={{background:`${item.type ==="success"?"#D0EAE7" : item.type ==="error"? "#FEE5E5" : "#FFF3EB"}`}}>
                        {item.type === 'success' && <CheckCircleOutlined style={{color: "green"}}/>}
                        {item.type === 'error' && <CloseCircleOutlined style={{color: "red"}}/>}
                        {item.type === 'warning' && <ClockCircleOutlined style={{color: "orange"}}/>}
                        <span>{item.content}</span>
                    </li>
                ))}
            </ul>

        );
    };
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };
    return(
        <table className={`${styles.calendar}`}>
                <Calendar
                    headerRender={headerRender}
                    cellRender={cellRender}
                    onPanelChange={onPanelChange}
                    locale={{
                        lang: {
                            locale: 'vi',
                        },
                    }}
                    className={`${styles.centeredCalendar} centered-calendar`}
                />
            </table>
    )
}