/** @format */
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportToExcel = (data, filename, sheetName, columnHeaders) => {
  const modifiedData = data.map((obj) => {
    const newObj = {};
    columnHeaders.forEach((header, index) => {
      const key = Object.keys(obj)[index];
      newObj[header] = obj[key];
    });
    return newObj;
  });
  const worksheet = XLSX.utils.json_to_sheet(modifiedData, {
    header: columnHeaders,
  });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const excelData = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  saveAs(excelData, filename);
};
export default ExportToExcel;
