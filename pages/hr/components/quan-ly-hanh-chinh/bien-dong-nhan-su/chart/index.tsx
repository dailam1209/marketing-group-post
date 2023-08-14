import React, { useState, useEffect } from "react";
import styles from './chart.module.css'
import Chart from "./hightchart";
import BodyFrameFooter from "@/pages/hr/components/bodyFrame/bodyFrame_footer/bodyFrame_footer";
import { format, addYears } from 'date-fns'

export default function TabChart() {

    const today = new Date();

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);



    const init_from_date1 = format(addYears(threeMonthsAgo, -1), 'yyyy-MM-dd');
    const init_to_date1 = format(addYears(today, -1), 'yyyy-MM-dd');
    const init_from_date2 = format(threeMonthsAgo, 'yyyy-MM-dd');
    const init_to_date2 = format(today, 'yyyy-MM-dd');


    const [from_date1, setFromDate1] = useState<any>(init_from_date1);
    const [to_date1, setToDate1] = useState<any>(init_to_date1);
    const [from_date2, setFromDate2] = useState<any>(init_from_date2);
    const [to_date2, setToDate2] = useState<any>(init_to_date2);


    const handleFromDate1Change = (event) => {
        const newDate = new Date(event.target.value);
        setFromDate1(format(newDate, 'yyyy-MM-dd'));
    };

    const handleToDate1Change = (event) => {
        const newDate = new Date(event.target.value);
        setToDate1(format(newDate, 'yyyy-MM-dd'));
    };

    const handleFromDate2Change = (event) => {
        const newDate = new Date(event.target.value);
        setFromDate2(format(newDate, 'yyyy-MM-dd'));
    };

    const handleToDate2Change = (event) => {
        const newDate = new Date(event.target.value);
        setToDate2(format(newDate, 'yyyy-MM-dd'));
    };

    return (
        <>
            <div className={`${styles.wrapper}`}>
                <div className={`${styles.search_person_change2}`}>
                    <div className={`${styles.time1}`}>
                        <p style={{ color: '#4C5BD4', fontSize: 14, fontWeight: 600 }}>Mốc thời gian 1</p>
                    </div>
                    <div className={`${styles.time1}`}>
                        <input type="date" id="from_date1" className={` ${styles.form_control}`} placeholder="dd/mm/yyyy" onChange={handleFromDate1Change} />
                    </div>
                    <div className={`${styles.time1}`}>
                        <input type="date" id="to_date1" className={` ${styles.form_control}`} placeholder="dd/mm/yyyy" onChange={handleToDate1Change} />
                    </div>
                </div>
                <div className={`${styles.search_person_change2}`}>
                    <div className={`${styles.time2}`}>
                        <p style={{ color: '#4C5BD4', fontSize: 14, fontWeight: 600 }}>Mốc thời gian 2</p>
                    </div>
                    <div className={`${styles.time2}`}>
                        <input type="date" id="from_date2" className={`${styles.form_control}`} placeholder="dd/mm/yyyy" onChange={handleFromDate2Change} />
                    </div>
                    <div className={`${styles.time2}`}>
                        <input type="date" id="to_date2" className={` ${styles.form_control}`} placeholder="dd/mm/yyyy" onChange={handleToDate2Change} />
                    </div>
                </div>
                <div className={`${styles.chart_background}`}>
                    <Chart data={{ from_date1, to_date1, from_date2, to_date2 }} />
                    <BodyFrameFooter src="https://www.youtube.com/embed/Xp_AOH7bEic"></BodyFrameFooter>
                </div>
            </div>
        </>
    )
}
