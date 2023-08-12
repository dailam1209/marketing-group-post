import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const getLineChartOptions = ({ categories, des, line_name1, line_name2, line_name3, line_name4, line_name5, line_name6, data_line1, data_line2, data_line3, data_line4, data_line5, data_line6 }: any) => {

    const series = [{
        name: line_name1,
        data: data_line1,

    }];

    if (line_name2 && data_line2 && line_name2 !== "" && data_line2.length > 0) {
        series.push({
            name: line_name2,
            data: data_line2,
        });
    }
    if (line_name3 && data_line3 && line_name3 !== "" && data_line3.length > 0) {
        series.push({
            name: line_name3,
            data: data_line3,
        });
    }
    if (line_name4 && data_line4 && line_name4 !== "" && data_line4.length > 0) {
        series.push({
            name: line_name4,
            data: data_line4,
        });
    }
    if (line_name5 && data_line5 && line_name5 !== "" && data_line5.length > 0) {
        series.push({
            name: line_name5,
            data: data_line5,
        });
    }
    if (line_name6 && data_line6 && line_name6 !== "" && data_line6.length > 0) {
        series.push({
            name: line_name6,
            data: data_line6,
        });
    }

    return {
        chart: {
            type: 'line'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: categories,
            labels: {
                style: {
                    color: '#333',
                    fontSize: '8'
                }
            }
        },
        yAxis: {
            title: {
                text: '<span style="font-size: 8px">' + des + '</span>',
            },
            labels: {
                style: {
                    fontSize: '8' // Đặt kích thước font mong muốn
                }
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: series,
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: [
                        'viewFullscreen', // Thêm mục xem toàn màn hình vào menu
                        'printChart',
                        'separator',
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadSVG'
                    ]
                }
            }
        }
    };
};

const LineChart = ({ categories, des, line_name1, line_name2, line_name3, line_name4,
    line_name5, line_name6, data_line1, data_line2, data_line3, data_line4, data_line5, data_line6 }: any) => {
    const options = getLineChartOptions({
        categories, des, line_name1, line_name2, line_name3, line_name4,
        line_name5, line_name6, data_line1, data_line2, data_line3, data_line4, data_line5, data_line6
    });
    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;