import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportToExcel = (data, fileName) => {
  // Create a worksheet from the data
  const ws = XLSX.utils.json_to_sheet(data);

  // Create a workbook and add the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Convert the workbook to binary data
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Save the file using file-saver
  saveAs(
    new Blob([wbout], { type: "application/octet-stream" }),
    `${fileName}.xlsx`
  );
};

export default exportToExcel;
