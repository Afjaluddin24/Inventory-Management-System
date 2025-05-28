import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../APIConfig/ConfigAPI";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const CustomerPayment = () => {
  const [customerPayment, setCustomerPayment] = useState([]); // Initialize state as an array

  const PaymentDetails = async () => {
    try {
      const response = await getData("InvoicePayment/CustomerPayment");
      if (response.status === "Ok") {
        setCustomerPayment(response.result); // Assuming the response.result is an array of payments
        console.log(response.result);
      } else {
        console.log(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    PaymentDetails();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="col-12">
        <div className="portlet">
          <div className="portlet-head mb-4">
            <div className="portlet-title">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h2 className="page-title-text">Customer Payment</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/BuesinessDashbord">Home</Link>
                      </li>
                      <li>Customer Payment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DataTable
            value={customerPayment} // Binding to the array of customer payments
            removableSort
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            {/* Adjust the columns to match the actual fields of customer payment data */}
            <Column field="invoiceNo" header="Bill No" sortable />
            <Column
              field="biildate"
              header="Bill"
              sortable
              body={(rowData) => {
                const formattedDate = new Date(
                  rowData.biildate
                ).toLocaleDateString("en-GB"); // Formats to dd/mm/yyyy
                return formattedDate;
              }}
            />
            <Column
              field="customerInfo"
              header="Customer"
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
            <Column field="gstno" header="GSTNO" sortable />
            <Column field="paymentmode" header="paymentmode" sortable />
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
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default CustomerPayment;
