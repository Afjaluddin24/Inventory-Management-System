import React, { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getData } from '../APIConfig/ConfigAPI';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'; 
import html2canvas from 'html2canvas';

const ReportStock = () => {
  const [stockrepot, SetStockrepot] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [formDate, setFormDate] = useState(null);  
  const [lastDate, setLastDate] = useState(null);  
  const receiptRef = useRef(null);

  // Fetch stock report data
  const SearchReport = async () => {
    if (!formDate || !lastDate) {
      alert('Both Form date and Last date are required.');
      return;
    }
    if (formDate > lastDate) {
      alert('Form date cannot be later than Last date.');
      return;
    }

    try {
      const response = await getData(`Garment/StockReport/${format(formDate, 'yyyy-MM-dd')}/${format(lastDate, 'yyyy-MM-dd')}`);
      if (response.status.toUpperCase() === 'OK') {
        SetStockrepot(response.result || []);
      } else {
        alert('No results found for the given Bill Date and Bill No.');
      }
    } catch (error) {
      alert('An error occurred while fetching data.');
      console.error(error);
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(stockrepot);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Stock Report');
    XLSX.writeFile(wb, 'stock_report.xlsx');
  };

  // Export to PDF using html2canvas and jsPDF
  const downloadPDF = () => {
    if (!receiptRef.current) return;

    html2canvas(receiptRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`InvoiceReport_${new Date().toLocaleDateString()}.pdf`);
    });
  };

  // Filtering function for stock data
  const filteredStockReport = useMemo(() => {
    return stockrepot.filter((row) => {
      const productMatch = row?.garmentName?.toLowerCase().includes(globalFilter.toLowerCase()) || 
                           row?.nameModal?.toLowerCase().includes(globalFilter.toLowerCase()); // Check both garmentName and nameModal
      const brandMatch = row?.brand?.toLowerCase().includes(brandFilter.toLowerCase()); // Check brand
      return productMatch && brandMatch;
    });
  }, [stockrepot, globalFilter, brandFilter]);

  return (
    <div className="page-wrapper">
      <div className="col-12">
        <div className="portlet">
          <div className="portlet-head mb-4">
            <div className="portlet-title">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h2 className="page-title-text">Stock Report</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/BuesinessDashbord">Home</Link>
                      </li>
                      <li>Stock Report</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Date Range Picker and Search Button */}
          <div className="col-md-12 mt-3">
            <div className="row">
              <div className="col-md-4">
                <DatePicker
                  selected={formDate}
                  onChange={date => setFormDate(date)}
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  placeholderText="dd-MM-yyyy"
                />
              </div>
              <div className="col-md-4">
                <DatePicker
                  selected={lastDate}
                  onChange={date => setLastDate(date)}
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
              <div className="col-md-4">
                <input
                  type="text"
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Product Name or Model"
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  placeholder="Brand Name"
                  className="form-control"
                />
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
          <div ref={receiptRef}>
          <div className="col-md-12 text-center">
            <h1>{localStorage.getItem("ShopName")}</h1>
            </div>
            <div className="col-md-12">
            <b>Stock Report</b>
            </div>
          <DataTable
              value={filteredStockReport}
              removableSort
              tableStyle={{ minWidth: '50rem' }}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              globalFilter={globalFilter}
              onGlobalFilterChange={(e) => setGlobalFilter(e.target.value)}
            >
              <Column field="billNo" header="billNo" />
              <Column field="garmentName" header="garmentName" />
              <Column field="nameModal" header="Model" sortable body={(rowData) => rowData?.nameModal || 'N/A'} />
            </DataTable>
          {/* DataTable displaying Stock Report */}
         
            <DataTable
              value={filteredStockReport}
              removableSort
              tableStyle={{ minWidth: '50rem' }}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              globalFilter={globalFilter}
              onGlobalFilterChange={(e) => setGlobalFilter(e.target.value)}
            >
              <Column field="billNo" header="Billno" sortable />
              <Column field="nameModal" header="Model" sortable body={(rowData) => rowData?.nameModal || 'N/A'} />
              <Column header="Update Date" body={(rowData) => rowData.dateAdded ? new Date(rowData.dateAdded).toLocaleDateString('en-GB') : 'N/A'} />
              <Column header="Garment" body={(rowData) => (
                <div>
                  <span>Brand: <b>{rowData.brand}</b></span><br />
                  <span>Name: <b>{rowData.garmentName}</b></span><br />
                  <span>Category: <b>{rowData.name}</b></span><br />
                  <span>Size: <b>{rowData.size}</b></span><br />
                  <span>Color: <b>{rowData.color}</b></span>
                </div>
              )} />
              <Column field="stock" header="Stock" />
              <Column field="costPrice" header="Cost(₹)" body={(rowData) => `₹ ${rowData.costPrice?.toLocaleString('en-IN') || '0.00'}`} />
              <Column field="price" header="Sale(₹)" body={(rowData) => `₹ ${rowData.price?.toLocaleString('en-IN') || '0.00'}`} />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportStock;
