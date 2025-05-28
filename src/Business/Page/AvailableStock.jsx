import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../APIConfig/ConfigAPI";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const AvailableStock = () => {
  const [stockDisplay, setStockDisplay] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(""); // Added state for selected brand

  const getStockDetails = async () => {
    try {
      const response = await getData(
        "Garment/AvailableStock/" + localStorage.getItem("businessId")
      );
      const updatedStock = response.result.map((item) => {
        // Calculate Remen as totalInward - totalSale
        item.Remem = (item.totalInward - item.totalSale) + item.returnItems;
        return item;
      });
      setStockDisplay(updatedStock);
      console.log(updatedStock);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStockDetails();
  }, []);

  // Handler to update the filter value
  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  // Handler to update selected brand value
  const onBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  // Apply global filter and selected brand filter to the stockDisplay data
  const filteredStock = stockDisplay.filter((item) => {
    const search = globalFilter.toLowerCase();
    const matchesBrand = selectedBrand ? item.brand === selectedBrand : true; // Check if brand matches or no brand selected
    return (
      matchesBrand &&
      item.nameModal.toLowerCase().includes(search) // Only search in 'nameModal'
    );
  });

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredStock); // Convert the filtered data to a worksheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "AvailableStock"); // Append the sheet to the workbook
    XLSX.writeFile(wb, "available_stock.xlsx"); // Trigger the download of the Excel file
  };

  return (
    <div className="page-wrapper">
      <div className="col-12">
        <div className="portlet">
          <div className="portlet-head mb-4">
            <div className="portlet-title">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h2 className="page-title-text">Available Stock</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/BusinessDashboard">Home</Link>
                      </li>
                      <li>Stock</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="row">
              <div className="col-sm-6 mb-4">
                <input
                  type="text"
                  value={globalFilter}
                  onChange={onGlobalFilterChange}
                  className="form-control"
                  placeholder="Search by Modal"
                />
              </div>
              <div className="col-md-4">
                <select
                  name="Brand"
                  value={selectedBrand}
                  onChange={onBrandChange} // Handle brand selection change
                  className="form-control"
                >
                  <option value="">All Brands</option>
                  {Array.from(new Set(stockDisplay.map((item) => item.brand))).map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <DataTable
            value={filteredStock}
            removableSort
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            footer={
              <div className="text-right">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={exportToExcel}
                >
                  <FontAwesomeIcon icon={faFileExcel} style={{ fontSize: "20px" }} />&nbsp;Download Excel
                </button>
              </div>
            }
          >
            <Column field="nameModal" header="Modal" sortable />
            <Column field="brand" header="Brand" sortable />
            <Column field="garmentName" header="Garment" sortable />
            <Column field="name" header="Category" sortable />
            <Column field="size" header="Size" sortable />
            <Column field="color" header="Color" sortable />
            <Column field="totalInward" header="Inward" sortable />
            <Column field="totalSale" header="Sale" sortable />
            <Column field="Remem" header="Remain" sortable />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default AvailableStock;
