import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../APIConfig/ConfigAPI";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import CustomerDuesPopup from "../Popup/CustomerDuesPopup";
import { warningAlert } from "../../Message/SweetAlert";

const CustomerDues = () => {
  const [show, setShow] = useState(false);
  const [customerDues, setCustomerDues] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState(0); // State for the remaining amount
  const [invoiceId, setInvoiceId] = useState(null); // State for the invoiceId

  const [initialValues, setInitialValues] = useState({
    Amount: "",
    Paymentmode: "",
    Refno: "",
    Paymentdate: ""
  });

  // Use useEffect to fetch customer dues on component mount
  useEffect(() => {
    const GetcustomerDues = async () => {
      try {
        const response = await getData("InvoicePayment/CustomerDues");
        if (response.status === "Ok") {
          setCustomerDues(response.result);
          console.log(response.result);
        } else {
          console.log(response.result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Calling GetcustomerDues once when component mounts
    GetcustomerDues();
  }, []); // Empty dependency array means this runs once when the component mounts

  const iconRupee = (rowData) => {
    const remaining = rowData.total - rowData.paid; // Calculate the remaining amount
    const invoiceId = rowData.invoiceId; // Get the invoice ID

    return (
      <button
        onClick={() => {
          if (remaining > 0) {
            setRemainingAmount(remaining); // Set the remaining amount to the state
            setInvoiceId(invoiceId); // Set the invoice ID to the state
            setShow(true); // Open the popup
          } else {
            console.log("No remaining amount to display");
          }
        }}
        className="btn btn-circle btn-shadow btn-primary btn-lg m-1"
      >
        <FontAwesomeIcon icon={faIndianRupeeSign} />
      </button>
    );
  };

  const sendWhatsAppMessage = (rowData) => {
    const phoneNumber = rowData.contactNo; // Get the customer's phone number from rowData
    const remaining = Math.max(0, rowData.total - rowData.paid); // Ensure the remaining amount is not negative
    
    // Check if remaining amount is 0
    if (remaining === 0) {
      warningAlert("Warnin","The remaining amount is already paid.");
      return; // Exit the function if no payment is due
    }
  
    const message = `Hello, the remaining amount for your invoice is ₹${remaining}. Please make the payment at your earliest convenience.`;
    
    // If phoneNumber is valid, create the WhatsApp URL and open it
    if (phoneNumber) {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    } else {
      console.log("No phone number available for this customer.");
    }
  };
  
  

  return (
    <div className="page-wrapper">
      <div className="col-12">
        <div className="portlet">
          <div className="portlet-head mb-4">
            <div className="portlet-title">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h2 className="page-title-text">Customer Dues</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/BuesinessDashbord">Home</Link>
                      </li>
                      <li>Customer Dues</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DataTable
            value={customerDues}
            removableSort
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column field="invoiceNo" header="Bill No" sortable />
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
              field="paid"
              header="Paid(₹)"
              body={(rowData) => {
                const value = rowData.paid;
                if (value === null || value === undefined) {
                  return "₹ 0.00";
                }
                return `₹ ${value.toLocaleString("en-IN")}`;
              }}
            />
            <Column
              field="remaining"
              header="Remaining(₹)"
              body={(rowData) => {
                const remaining = rowData.total - rowData.paid;
                if (remaining === null || remaining === undefined || remaining < 0) {
                  return "₹ 0.00";
                }
                return `₹ ${remaining.toLocaleString("en-IN")}`;
              }}
            />
            <Column body={iconRupee}></Column> {/* Add the icon column */}
            <Column
              header="Send WhatsApp"
              body={(rowData) => {
                const remaining = rowData.total - rowData.paid;
                return (
                  <button
                    onClick={() => sendWhatsAppMessage(rowData)}
                    className="btn btn-circle btn-shadow btn-info btn-lg m-1"
                  >
                    <FontAwesomeIcon icon={faIndianRupeeSign} /> Send WhatsApp
                  </button>
                );
              }}
            />
          </DataTable>
          <CustomerDuesPopup
            initialValues={initialValues}
            setInitialValues={setInitialValues}
            show={show}
            setShow={setShow}
            invoiceId={invoiceId} // Passing invoiceId only once
            remainingAmount={remainingAmount}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDues;
