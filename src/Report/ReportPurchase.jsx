import { faSearch, faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getData } from "../APIConfig/ConfigAPI";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";  
import html2canvas from "html2canvas"; 

const ReportPurchase = () => {
  const [purchaserepot, Setpurchaserepot] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(""); // State for global filter (Supplier name)
  const [formDate, setFormDate] = useState(null);  
  const [lastDate, setLastDate] = useState(null);  
  const [searchPerformed, setSearchPerformed] = useState(false); // New state to track if search is performed
  const receiptRef = useRef();

  // Fetch data
  const SearchReport = async () => {
    if (!formDate || !lastDate) {
      alert("Both Form date and Bill Date are required.");
      return;
    } else {
      const formattedFormDate = formDate.toISOString().split("T")[0]; 
      const formattedLastDate = lastDate.toISOString().split("T")[0];

      const response = await getData(
        `Purchase/PurchaseReport/${formattedFormDate}/${formattedLastDate}`
      );
      if (response.status.toUpperCase() === "OK") {
        Setpurchaserepot(response.result);
        setSearchPerformed(true); // Mark search as performed
      } else {
        alert("No results found for the given Bill Date and Bill No.");
        Setpurchaserepot([]); // Clear previous results if no data found
        setSearchPerformed(false); // Reset search status
      }
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(purchaserepot);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Purchase Report");
    XLSX.writeFile(wb, "purchase_report.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Bill No", "Bill Date", "Supplier", "Bank Name", "Account Holder", "Account No", "IFSC", "Gross(₹)", "GST(%)", "GST(₹)"];
    const tableRows = [];

    purchaserepot.forEach(row => {
      const formattedDate = row.billDate ? new Date(row.billDate).toLocaleDateString("en-GB") : "N/A";
      tableRows.push([row.billNo, formattedDate, row.businessname, row.bankname, row.accountholdername, row.accountno, row.ifsc, row.grossAmount, row.gstValue, row.gstAmount]);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("purchase_report.pdf");
  };

  // Function to download PDF using html2canvas
  const downloadPDF = () => {
    if (!receiptRef.current) return;

    html2canvas(receiptRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); 
      const imgWidth = 190; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width; 

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`PurchaseReport_${new Date().toLocaleDateString()}.pdf`);
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
                  <h2 className="page-title-text">Purchase Report</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/BuesinessDashbord">Home</Link>
                      </li>
                      <li>Purchase Report</li>
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
              <div className="col-md-4">
                <input 
                  type="text" 
                  value={globalFilter} 
                  onChange={(e) => setGlobalFilter(e.target.value)} 
                  placeholder="Supplier Name" 
                  name="SupplierName" 
                  id="SupplierName" 
                  className="form-control" 
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3 mb-3">
            <div className="row">
              <div className="col-md-12 text-right">
                <button className="btn btn-success" onClick={exportToExcel}>
                  <FontAwesomeIcon icon={faFileExcel} style={{ fontSize: "20px" }} />
                  &nbsp;Export to Excel
                </button>&nbsp;&nbsp;
                <button className="btn btn-danger" onClick={downloadPDF}>
                  <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: "20px" }} />
                  &nbsp;Export to PDF
                </button>
              </div>
            </div>
          </div>
          <div ref={receiptRef} className="col-md-12">
          <div className="col-md-12 text-center">
            <h1>{localStorage.getItem("ShopName")}</h1>
            </div>
            <div className="col-md-12">
            <b>Purchase Report</b>
            </div>
            <DataTable
              value={purchaserepot}
              removableSort
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              globalFilter={globalFilter}
              onGlobalFilterChange={(e) => setGlobalFilter(e.target.value)}
            >
              <Column field="billNo" header="Bill No"></Column>
              <Column header="BillDate" body={(rowData) => {
                const formatDate = rowData.billDate ? new Date(rowData.billDate).toLocaleDateString("en-GB") : "N/A";
                return <small>{formatDate}</small>;
              }} />
              <Column field="businessname" header="Suppler"></Column>
          
            </DataTable>
            {/* Display DataTable with the filtered data */}
            <DataTable
              value={purchaserepot}
              removableSort
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              globalFilter={globalFilter}
              onGlobalFilterChange={(e) => setGlobalFilter(e.target.value)}
            >
              <Column field="billNo" header="Bill No" sortable></Column>
              <Column header="Bill Date" body={(rowData) => {
                const formatDate = rowData.billDate ? new Date(rowData.billDate).toLocaleDateString("en-GB") : "N/A";
                return <small>{formatDate}</small>;
              }} />
              <Column field="businessname" header="Supplier" sortable></Column>
              <Column field="" header="Bank Info" body={(rowData) => (
                <div>
                  <span>Bank Name: <b>{rowData.bankname}</b></span><br />
                  <span>Holder Name: <b>{rowData.accountholdername}</b></span><br />
                  <span>Account No: <b>{rowData.accountno}</b></span><br />
                  <span>IFSC: <b>{rowData.ifsc}</b></span>
                </div>
              )} />
              <Column field="gstValue" header="GST(%)"></Column>
              <Column field="gstAmount" header="GST(₹)" body={(rowData) => {
                const value = rowData.gstAmount;
                return value === null || value === undefined ? "₹ 0.00" : `₹ ${value.toLocaleString("en-IN")}`;
              }} />
              <Column field="grossAmount" header="Gross(₹)" body={(rowData) => {
                const value = rowData.grossAmount;
                return value === null || value === undefined ? "₹ 0.00" : `₹ ${value.toLocaleString("en-IN")}`;
              }} />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPurchase;
