import React, { useEffect, useState } from "react";
import { getData } from "../../APIConfig/ConfigAPI";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faReceipt, faTractor } from "@fortawesome/free-solid-svg-icons";

const DisplayInvoice = () => {
  const [InvoiceDetals, setInvoiceDetals] = useState([]); // State to store invoice details
  const [globalFilter, setGlobalFilter] = useState(""); // State for global filter input

  // Function to fetch the invoice data from the API
  const getDisplay = async () => {
    try {
      const response = await getData("InvoiceMaster/Display");
      setInvoiceDetals(response.result); // Set the fetched data to the state
      console.log(response.result);
    } catch (error) {
      console.log(error);
      // Optionally, handle error by showing a message to the user
    }
  };

  // Use effect to fetch data on component mount
  useEffect(() => {
    getDisplay();
  }, []);

  // Function to handle global filter input changes
  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value); // Update the global filter state when input changes
  };

  const iconPrint = (data) => {
    return (
      <button onClick={() =>window.open(`/PrintReceipt/${data.invoiceId}`, "_blank")} className="btn  btn-circle btn-shadow btn-primary text-center btn-lg m-1">
        <FontAwesomeIcon
          icon={faReceipt}
          style={{ cursor: "pointer" }}
        />
      </button>
    );
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="col-12">
          <div className="portlet">
            <div className="portlet-head">
              <div className="portlet-title">
                <div className="col-12">
                  <div className="row align-items-center">
                    <div className="col-sm-6">
                      <h2 className="page-title-text">Invoice Detals</h2>
                    </div>
                    <div className="col-sm-6 text-right">
                      <div className="breadcrumbs">
                        <ul>
                          <li>
                            <Link to="/BuesinessDashbord">Home</Link>
                          </li>
                          <li>Invoice</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-4">
              <div className="row">
                <div className="col-sm-6 mb-4">
                  <input
                    type="text"
                    value={globalFilter}
                    onChange={onGlobalFilterChange}
                    className="form-control"
                    placeholder="Keyword Search"
                  />
                </div>
              </div>
            </div>
            <DataTable
              value={InvoiceDetals}
              removableSort
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              globalFilter={globalFilter} // Apply the global filter to the table
            >
              <Column field="invoiceNo" sortable header="No" />
              <Column
                field="biildate"
                header="Date"
                sortable
                body={(rowData) => {
                  const date = new Date(rowData.biildate);
                  const day = String(date.getDate()).padStart(2, "0"); // Ensures 2 digits for day
                  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensures 2 digits for month
                  const year = date.getFullYear();

                  return `${day}-${month}-${year}`;
                }}
              />
              <Column
                field="customerInfo"
                header="Customer Info"
                body={(rowData) => (
                  <div>
                    <b>{rowData.customername}</b>
                    <br />
                    <b>{rowData.contactNo}</b>
                    <br />
                    <b>{rowData.email}</b>
                  </div>
                )}
              />
              <Column
                field="grossAmount"
                header="Gross(₹)"
                body={(rowData) => {
                  const value = rowData.grossAmount; // get the grossAmount value
                  if (value === null || value === undefined) {
                    return "₹ 0.00";
                  }
                  return `₹ ${value.toLocaleString("en-IN")}`;
                }}
              />
              <Column
                field="gst"
                header="GST(₹)"
                body={(rowData) => {
                  const value = rowData.gst;
                  if (value === null || value === undefined) {
                    return "₹ 0.00";
                  }
                  return `₹ ${value.toLocaleString("en-IN")}`;
                }}
              />
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
              <Column
                style={{
                  textAlign: "center",
                  color: "blue",
                  fontSize: "25px",
                  width: "50px",
                }}
                body={iconPrint}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayInvoice;
