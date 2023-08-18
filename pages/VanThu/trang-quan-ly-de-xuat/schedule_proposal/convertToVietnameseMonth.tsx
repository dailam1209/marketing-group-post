import React from "react";

const convertToVietnameseMonth = (dateStr: any) => {
  const [year, month] = dateStr?.date_month.split("-");

  const vietnameseMonths = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const vietnameseMonth = vietnameseMonths[parseInt(month, 10) - 1];

  return `${vietnameseMonth}/${year}`;
};

const ConvertMonth = (date_month: any) => {
  const convertedDateStr = convertToVietnameseMonth(date_month);

  return <div>{convertedDateStr}</div>;
};

export default ConvertMonth;
