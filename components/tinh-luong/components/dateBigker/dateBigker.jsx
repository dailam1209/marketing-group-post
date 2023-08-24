import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/vi";

dayjs.extend(customParseFormat);
dayjs.locale("vi");
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";

export default function DateBigker() {
   const [selectedFromDate, setSelectedFromDate] = useState(dayjs());

   const handleFromDateChange = (dateString) => {
      setSelectedFromDate(dayjs(dateString, dateFormat));
   };
   return (
      <div>
         <DatePicker
            defaultValue={selectedFromDate}
            format={dateFormat}
            onChange={handleFromDateChange}
            locale={{
               lang: {
                  locale: "vi",
               },
            }}
         />
      </div>
   );
}
