import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { getData } from "../APIConfig/ConfigAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // We'll use this for formatting dates
import html2canvas from "html2canvas";

const ReportStockSeal = () => {
  const [garmentsealReport, setgarmentsealReport] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [formDate, setFormDate] = useState(null); // Set the initial state to null
  const [lastDate, setLastDate] = useState(null); // Set the initial state to null
  const receiptRef = useRef(null); // Reference to the DataTable for PDF export

  // Fetch data
  const SearchReport = async () => {
    if (!formDate || !lastDate) {
      alert("Both Form date and Bill Date are required.");
      return;
    }

    try {
      const response = await getData(
        `Garment/ProductSeleReport/${format(formDate, "yyyy-MM-dd")}/${format(lastDate, "yyyy-MM-dd")}`
      );
      console.log(response);
      if (response.status.toUpperCase() === "OK") {
        setgarmentsealReport(response.result);
        console.log("Data", response.result);
      } else {
        alert("No results found for the given Bill Date and Bill No.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again later.");
    }
  };

  // Export logic for Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(garmentsealReport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stock Seal Report");
    XLSX.writeFile(wb, "StockSealReport.xlsx");
  };

  // Export logic for PDF
  const downloadPDF = () => {
    if (!receiptRef.current) return;

    html2canvas(receiptRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // A4 size
      const imgWidth = 190; // A4 width in mm (adjustable)
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      // Save the PDF with the current date
      pdf.save(`StockSealReport_${new Date().toLocaleDateString()}.pdf`);
    });
  };

  return (
    <div className="page-wrapper">
      <div className="col-12">
        <div className="portlet">
          <div className="portlet-head mb-4">
            <div className="portlet-title">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h2 className="page-title-text">Stock Seal Report</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/BusinessDashboard">Home</Link>
                      </li>
                      <li>Stock Seal Report</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="row">
              <div className="col-md-4">
                <DatePicker
                  selected={formDate}
                  onChange={(date) => setFormDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  placeholderText="dd-MM-yyyy"
                />
              </div>
              <div className="col-md-4">
                <DatePicker
                  selected={lastDate}
                  onChange={(date) => setLastDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  placeholderText="dd-MM-yyyy"
                />
              </div>
              <div className="col-md-4">
                <button type="button" className="btn btn-info" onClick={SearchReport}>
                  <FontAwesomeIcon icon={faSearch} />
                  &nbsp;Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3 mb-3">
            <div className="row">
              <div className="col-md-12 text-right">
                <button className="btn btn-success" onClick={exportToExcel}>
                  <FontAwesomeIcon icon={faFileExcel} />
                  &nbsp;Export to Excel
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-danger" onClick={downloadPDF}>
                  <FontAwesomeIcon icon={faFilePdf} />
                  &nbsp;Export to PDF
                </button>
              </div>
            </div>
          </div>
          {/* Add ref to the container holding the DataTable */}
          <div ref={receiptRef}>
          <div className="col-md-12 text-center">
            <h1>{localStorage.getItem("ShopName")}</h1>
            </div>
            <div className="col-md-12">
            <b>Stock Seal Report</b>
            </div>
            <DataTable
              value={garmentsealReport}
              removableSort
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              globalFilter={globalFilter}
              onGlobalFilterChange={(e) => setGlobalFilter(e.target.value)}
            >
              <Column field="invoiceNo" header="Invoice No" sortable></Column>
              <Column
                header="Bill Date"
                body={(rowData) => {
                  const formatDate = rowData.biildate
                    ? new Date(rowData.biildate).toLocaleDateString("en-GB")
                    : "N/A";
                  return <small>{formatDate}</small>;
                }}
              />
              <Column
                header="Customer"
                body={(rowData) => (
                  <div>
                    <span>
                      Brand Name: <b>{rowData.brand}</b>
                    </span>
                    <br />
                    <span>
                      Garment Name: <b>{rowData.garmentName}</b>
                    </span>
                    <br />
                    <span>
                      Color: <b>{rowData.color}</b>
                    </span>
                    <br />
                    <span>
                      Size: <b>{rowData.size}</b>
                    </span>
                    <br />
                    <span>
                      Category: <b>{rowData.name}</b>
                    </span>
                    <br />
                  </div>
                )}
              />
              <Column field="qty" header="Qty"></Column>
              <Column
                field="rate"
                header="Rate(₹)"
                body={(rowData) => {
                  const value = rowData.rate;
                  if (value === null || value === undefined) {
                    return "₹ 0.00";
                  }
                  return `₹ ${value.toLocaleString("en-IN")}`;
                }}
              />
              <Column field="gst" header="GST(%)"></Column>
              <Column
                field="total"
                header="Total(₹)"
                body={(rowData) => {
                  const value = rowData.total;
                  if (value === null || value === undefined) {
                    return "₹ 0.00";
                  }
                  return `₹ ${value.toLocaleString("en-IN")}`;
                }}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportStockSeal;
