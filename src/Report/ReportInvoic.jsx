import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFileExcel,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { getData } from "../APIConfig/ConfigAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // for date formatting
import html2canvas from "html2canvas"; // Ensure html2canvas is imported

const ReportInvoic = () => {
  const [invoiceReport, setinvoiceReport] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [formDate, setFormDate] = useState(null); // store form date as Date object
  const [lastDate, setLastDate] = useState(null); // store last date as Date object
  const receiptRef = useRef(null); // Reference for the content to be converted into PDF

  // Fetch data
  const SearchReport = async () => {
    if (!formDate || !lastDate) {
      alert("Both Form date and Bill Date are required.");
      return;
    }

    try {
      const response = await getData(
        `InvoiceMaster/InvoiceReport/${format(formDate, "yyyy-MM-dd")}/${format(lastDate, "yyyy-MM-dd")}`
      );
      if (response.status.toUpperCase() === "OK") {
        setinvoiceReport(response.result);
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
    const ws = XLSX.utils.json_to_sheet(invoiceReport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invoice Report");
    XLSX.writeFile(wb, "InvoiceReport.xlsx");
  };

  // Export logic for PDF using html2canvas and jsPDF
  const downloadPDF = () => {
    if (!receiptRef.current) return;

    html2canvas(receiptRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // A4 size
      const imgWidth = 190; // A4 width in mm (adjustable)
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`InvoiceReport_${new Date().toLocaleDateString()}.pdf`);
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
                  <h2 className="page-title-text">Invoice Report</h2>
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
          <div className="col-md-12 mt-3">
            <div className="row">
              <div className="col-md-4">
                <DatePicker
                  selected={formDate}
                  onChange={setFormDate}
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  placeholderText="dd-MM-yyyy"
                />
              </div>
              <div className="col-md-4">
                <DatePicker
                  selected={lastDate}
                  onChange={setLastDate}
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  placeholderText="dd-MM-yyyy"
                />
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={SearchReport}
                >
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
          <div ref={receiptRef}>
          <div className="col-md-12 text-center">
            <h1>{localStorage.getItem("ShopName")}</h1>
            </div>
            <div className="col-md-12">
            <b>Invoice Report</b>
            </div>
            <DataTable
              value={invoiceReport}
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
                      Brand Name: <b>{rowData.customername}</b>
                    </span>
                    <br />
                    <span>
                      Contact No: <b>{rowData.contactNo}</b>
                    </span>
                    <br />
                    <span>
                      Email: <b>{rowData.email}</b>
                    </span>
                    <br />
                  </div>
                )}
              />
              <Column
                header="Bank"
                body={(rowData) => (
                  <div>
                    <span>
                      Payment Mode: <b>{rowData.paymentmode}</b>
                    </span>
                    <br />
                    <span>
                      refno : <b>{rowData.refno}</b>
                    </span>
                    <br />
                  </div>
                )}
              />
              <Column
                header="Notice Period"
                body={(rowData) => {
                  const formatDate = rowData.noticePeriod
                    ? new Date(rowData.noticePeriod).toLocaleDateString("en-GB")
                    : "N/A";
                  return <small>{formatDate}</small>;
                }}
              />
              <Column
                field="rate"
                header="Rate(₹)"
                body={(rowData) => {
                  const value = rowData.rate;
                  return value === null || value === undefined
                    ? "₹ 0.00"
                    : `₹ ${value.toLocaleString("en-IN")}`;
                }}
              />
              <Column
                field="gst"
                header="GST(₹)"
                body={(rowData) => {
                  const value = rowData.gst;
                  return value === null || value === undefined
                    ? "₹ 0.00"
                    : `₹ ${value.toLocaleString("en-IN")}`;
                }}
              />
              <Column
                field="total"
                header="Total(₹)"
                body={(rowData) => {
                  const value = rowData.total;
                  return value === null || value === undefined
                    ? "₹ 0.00"
                    : `₹ ${value.toLocaleString("en-IN")}`;
                }}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportInvoic;
