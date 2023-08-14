// import React, { useEffect } from "react";
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PlanningAppointmentList, WorkingRotaionList, PayrollDownList, OutJobList } from "@/pages/hr/api/bien_dong_nhan_su";

const Chart = (data: any) => {

    const [isPlanningAppointmentList1, setPlanningAppointmentList1] = useState<any>(null)
    const [isPlanningAppointmentList2, setPlanningAppointmentList2] = useState<any>(null)

    const [isWorkingRotaionList1, setWorkingRotaionList1] = useState<any>(null)
    const [isWorkingRotaionList2, setWorkingRotaionList2] = useState<any>(null)

    const [isPayrollDownList1, setPayrollDownList1] = useState<any>(null)
    const [isPayrollDownList2, setPayrollDownList2] = useState<any>(null)

    const [isOutJobList1, setOutJobList1] = useState<any>(null)
    const [isOutJobList2, setOutJobList2] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData1 = new FormData();
                formData1.append('fromDate', data?.data?.from_date1)
                formData1.append('toDate', data?.data?.to_date1)
                const response1 = await PlanningAppointmentList(formData1)
                setPlanningAppointmentList1(response1?.data)

                const formData2 = new FormData();
                formData2.append('fromDate', data?.data?.from_date2)
                formData2.append('toDate', data?.data?.to_date2)
                const response2 = await PlanningAppointmentList(formData2)
                setPlanningAppointmentList2(response2?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [data])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData1 = new FormData();
                formData1.append('fromDate', data?.data?.from_date1)
                formData1.append('toDate', data?.data?.to_date1)
                const response1 = await WorkingRotaionList(formData1)
                setWorkingRotaionList1(response1?.data)

                const formData2 = new FormData();
                formData2.append('fromDate', data?.data?.from_date2)
                formData2.append('toDate', data?.data?.to_date2)
                const response2 = await WorkingRotaionList(formData2)
                setWorkingRotaionList2(response2?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [data])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData1 = new FormData();
                formData1.append('fromDate', data?.data?.from_date1)
                formData1.append('toDate', data?.data?.to_date1)
                const response1 = await PayrollDownList(formData1)
                setPayrollDownList1(response1?.data)

                const formData2 = new FormData();
                formData2.append('fromDate', data?.data?.from_date2)
                formData2.append('toDate', data?.data?.to_date2)
                const response2 = await PayrollDownList(formData2)
                setPayrollDownList2(response2?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [data])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData1 = new FormData();
                formData1.append('fromDate', data?.data?.from_date1)
                formData1.append('toDate', data?.data?.to_date1)
                const response1 = await OutJobList(formData1)
                setOutJobList1(response1?.data)

                const formData2 = new FormData();
                formData2.append('fromDate', data?.data?.from_date2)
                formData2.append('toDate', data?.data?.to_date2)
                const response2 = await OutJobList(formData2)
                setOutJobList2(response2?.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [data])

    const [chartOptions, setChartOptions] = useState<any>({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Biểu đồ biến động nhân sự'
        },
        xAxis: {
            categories: ['Tăng/ giảm lương', 'Bổ nhiệm quy hoạch', 'Luân chuyển công tác', 'Giảm biên chế', 'Nghỉ việc']
        },
        yAxis: {
            title: {
                text: 'Biểu đồ thống kê số lượng nhân viên'
            }
        },
        series: [
            {
                name: `Mốc thời gian 1: (${data?.data?.from_date1} - ${data?.data?.to_date1} ) `,
                data: [0, 0, 0, 0, 0]
            },
            {
                name: `Mốc thời gian 2: (${data?.data?.from_date2} - ${data?.data?.to_date2} )  `,
                data: [0, 0, 0, 0, 0]
            },
        ]
    });

    useEffect(() => {
        if (isPlanningAppointmentList1) {
            setChartOptions((prevOptions: any) => ({
                ...prevOptions,
                series: [
                    {
                        ...prevOptions.series[0],
                        name: `Mốc thời gian 1: (${data?.data?.from_date1} - ${data?.data?.to_date1} ) `,
                        data: [5,
                            isPlanningAppointmentList1?.totalCount || 0,
                            isWorkingRotaionList1?.totalCount || 0,
                            isPayrollDownList1?.totalCount || 0,
                            isOutJobList1?.totalCount || 0,]
                    },
                    prevOptions.series[1] // Giữ nguyên dữ liệu của series 2
                ]
            }));
        }
    }, [isPlanningAppointmentList1]);

    useEffect(() => {
        if (isPlanningAppointmentList2) {
            setChartOptions((prevOptions: any) => ({
                ...prevOptions,
                series: [
                    prevOptions.series[0], // Giữ nguyên dữ liệu của series 1
                    {
                        ...prevOptions.series[1],
                        name: `Mốc thời gian 2: (${data?.data?.from_date2} - ${data?.data?.to_date2} )  `,
                        data: [7,
                            isPlanningAppointmentList2?.totalCount || 0,
                            isWorkingRotaionList2?.totalCount || 0,
                            isPayrollDownList2?.totalCount || 0,
                            isOutJobList2?.totalCount || 0,]
                    }
                ]
            }));
        }
    }, [isPlanningAppointmentList2]);

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

export default Chart;

