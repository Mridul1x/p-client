import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportToExcel = ({ data, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = () => {
    const ws = XLSX.utils.book_new();
    const headerStyle = {
      fill: { patternType: "solid", fgColor: { rgb: "D3D3D3" } },
      font: { bold: true, color: { rgb: "000000" }, sz: 14 },
    };

    // Add header row
    const header = [
      [
        "Name",
        "Email",
        "Mobile",
        "Address",
        "Order ID",
        "Products",
        "Total Amount",
        "Shipping Amount",
        "Date",
        "Status",
      ],
    ];
    XLSX.utils.sheet_add_aoa(ws, header, { origin: "A1" });

    // Apply styling to header row
    const headerRange = XLSX.utils.decode_range(ws["!ref"]);
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: col });
      ws[cell].s = headerStyle;
    }

    // Set column widths
    ws["!cols"] = header[0].map(() => ({ wch: 20 }));

    // Flatten the products array and add data rows
    const dataWithFlattenedProducts = data.map((item) => ({
      ...item,
      products: item.products.join(", "),
    }));
    XLSX.utils.sheet_add_json(ws, dataWithFlattenedProducts, {
      origin: "A2",
      skipHeader: true,
    });

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelData = new Blob([excelBuffer], { type: fileType });
    saveAs(excelData, fileName + fileExtension);
  };

  return (
    <button
      onClick={exportToExcel}
      className="bg-blue-500 hover:bg-blue-700 text-white mt-2 font-bold py-2 px-4 rounded"
    >
      Export to Excel
    </button>
  );
};

export default ExportToExcel;
