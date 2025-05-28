import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { getData } from "../APIConfig/ConfigAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // for date formatting
import html2canvas from "html2canvas";

const ReportSuppler = () => {
  const [supplerReport, setSupplerReport] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [formDate, setFormDate] = useState(null);
  const [lastDate, setLastDate] = useState(null);

  // Create a reference to capture the section to be exported as PDF
  const receiptRef = useRef();

  // Fetch data
  const SearchReport = async () => {
    if (!formDate || !lastDate) {
      alert("Both Form date and Bill Date are required.");
      return;
    }

    const formattedFormDate = format(formDate, 'yyyy-MM-dd');
    const formattedLastDate = format(lastDate, 'yyyy-MM-dd');

    try {
      const response = await getData(
        `Supplier/SupplerReport/${formattedFormDate}/${formattedLastDate}`
      );
      if (response.status.toUpperCase() === "OK") {
        setSupplerReport(response.result);
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
    const ws = XLSX.utils.json_to_sheet(supplerReport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Supplier Report");
    XLSX.writeFile(wb, "SupplierReport.xlsx");
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
      pdf.save(`SupplierReport_${new Date().toLocaleDateString()}.pdf`);
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
                  <h2 className="page-title-text">Supplier Report</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/BusinessDashboard">Home</Link>
                      </li>
                      <li>Invoice Report</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Date Selection and Search */}
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

          {/* Export Buttons */}
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

          {/* Data Table */}
          <div ref={receiptRef}> {/* Ref section to be exported to PDF */}
          <div className="col-md-12 text-center">
            <h1>{localStorage.getItem("ShopName")}</h1>
            </div>
            <div className="col-md-12">
            <b>Supplier Report</b>
            </div>
            <DataTable
              value={supplerReport}
              removableSort
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              globalFilter={globalFilter}
              onGlobalFilterChange={(e) => setGlobalFilter(e.target.value)}
            >
              <Column field="billNo" header="Bill No" sortable></Column>
              <Column
                header="Bill Date"
                body={(rowData) => {
                  const formatDate = rowData.billDate
                    ? new Date(rowData.billDate).toLocaleDateString("en-GB")
                    : "N/A";
                  return <small>{formatDate}</small>;
                }}
              />
              <Column
                header="Supplier"
                body={(rowData) => (
                  <div>
                    <span>
                      Supplier Name: <b>{rowData.businessname}</b>
                    </span>
                    <br />
                    <span>
                      Contact No: <b>{rowData.contactno}</b>
                    </span>
                    <br />
                    <span>
                      Address: <b>{rowData.address}</b>
                    </span>
                    <br />
                    <span>
                      PAN No: <b>{rowData.pan}</b>
                    </span>
                  </div>
                )}
              />
              <Column
                header="Bank"
                body={(rowData) => (
                  <div>
                    <span>
                      Bank Name: <b>{rowData.bankname}</b>
                    </span>
                    <br />
                    <span>
                      Account Holder Name: <b>{rowData.accountholdername}</b>
                    </span>
                    <br />
                    <span>
                      Account No: <b>{rowData.accountno}</b>
                    </span>
                    <br />
                    <span>
                      IFSC: <b>{rowData.ifsc}</b>
                    </span>
                  </div>
                )}
              />
              <Column field="stock" header="Stock" sortable></Column>
              <Column
                field="grandAmount"
                header="Grand(₹)"
                body={(rowData) => {
                  const value = rowData.grandAmount;
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

export default ReportSuppler;
