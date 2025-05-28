import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getData } from '../APIConfig/ConfigAPI';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import html2canvas from 'html2canvas'; // Make sure this is installed for PDF generation

const ReportCustomerInstalman = () => {
  const [customerReport, setCustomerReport] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [formDate, setFormDate] = useState(null); // Initialize as null
  const [lastDate, setLastDate] = useState(null); // Initialize as null

  const receiptRef = useRef(null); // Reference for capturing content for PDF

  // Fetch data
  const SearchReport = async () => {
    if (!formDate || !lastDate) {
      alert("Both From date and To date are required.");
      return;
    }

    try {
      const response = await getData(
        `InvoicePayment/InvoicePaymentReport/${format(formDate, 'yyyy-MM-dd')}/${format(lastDate, 'yyyy-MM-dd')}`
      );
      if (response.status.toUpperCase() === "OK") {
        setCustomerReport(response.result);
        console.log("Data", response.result);
      } else {
        alert("No results found for the given dates.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again later.");
    }
  };

  // Export logic for Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(customerReport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invoice Report");
    XLSX.writeFile(wb, "InvoiceReport.xlsx");
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
                  <h2 className="page-title-text">Customer Instalment Report</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/BusinessDashboard">Home</Link>
                      </li>
                      <li>Customer Instalment</li>
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
          
          {/* Wrapping DataTable in a ref */}
          <div ref={receiptRef}>
          <div className="col-md-12 text-center">
            <h1>{localStorage.getItem("ShopName")}</h1>
            </div>
            <div className="col-md-12">
            <b>Customer Instalment Report</b>
            </div>
            <DataTable
              value={customerReport}
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
                      Refno: <b>{rowData.refno}</b>
                    </span>
                    <br />
                  </div>
                )}
              />
              <Column
                header="Payment Date"
                body={(rowData) => {
                  const formatDate = rowData.paymentdate
                    ? new Date(rowData.paymentdate).toLocaleDateString("en-GB")
                    : "N/A";
                  return <small>{formatDate}</small>;
                }}
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
                field="amount"
                header="Total(₹)"
                body={(rowData) => {
                  const value = rowData.amount;
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

export default ReportCustomerInstalman;
