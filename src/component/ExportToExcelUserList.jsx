import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportToExcelUserList = ({ data, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcelUserList = () => {
    // Create a new workbook and a new worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ["Name", "Email", "Role", "Created At"],
    ]);

    // Add data rows
    data.forEach((item, index) => {
      XLSX.utils.sheet_add_aoa(
        ws,
        [[item.name, item.email, item.role, item.createdAt]],
        { origin: -1 }
      );
    });

    // Apply styling to header row
    const headerStyle = {
      fill: { patternType: "solid", fgColor: { rgb: "D3D3D3" } },
      font: { bold: true, color: { rgb: "000000" }, sz: 14 },
    };
    const headerRange = XLSX.utils.decode_range(ws["!ref"]);
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: col });
      ws[cell].s = headerStyle;
    }

    // Set column widths
    ws["!cols"] = [{ wch: 20 }, { wch: 30 }, { wch: 15 }, { wch: 20 }];

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "data");

    // Generate buffer and save as Excel file
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelData = new Blob([excelBuffer], { type: fileType });
    saveAs(excelData, fileName + fileExtension);
  };

  return (
    <button
      onClick={exportToExcelUserList}
      className="bg-blue-500 hover:bg-blue-700 text-white mt-2 font-bold py-2 px-4 rounded"
    >
      Export to Excel
    </button>
  );
};

export default ExportToExcelUserList;
