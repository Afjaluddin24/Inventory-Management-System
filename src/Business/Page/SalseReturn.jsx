import React, { useState, useEffect } from "react";
import { getData, postData } from "../../APIConfig/ConfigAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { successAlert } from "../../Message/SweetAlert";

export default function SalesReturn() {
  const [invoiceData, setInvoiceData] = useState(null);
  const [returnQuantities, setReturnQuantities] = useState({}); // Store return quantities for each row
  const [error, setError] = useState(""); // Error message for validation
  const [newBillAmount, setNewBillAmount] = useState(0);
  const [totalPaid, settotalPaid] = useState(0);
  const [totalBillAmount, settotalBillAmount] = useState(0);
  const [returnAmount, setreturnAmount] = useState(0);

  // Function to fetch invoice details
  const invoiceDetails = async () => {
    const billNo = document.getElementById("txtBillNo").value;
    const billDate = document.getElementById("txtBillDate").value;

    if (!billNo || !billDate) {
      alert("Both Bill Number and Bill Date are required.");
      return;
    } else {
      const response = await getData(
        `SalseReturn/SalesReturn/${billDate}/${billNo}`
      );
      console.log(response);
      if (response.status.toUpperCase() === "OK") {
        setInvoiceData(response.result);
        console.log("Data", response.result);
      } else {
        alert("No results found for the given Bill Date and Bill No.");
      }
    }
  };

  // Function to format currency
  const formatCurrency = (value) => {
    return value === null || value === undefined || value === 0
      ? "₹ 0.00"
      : `₹ ${value.toLocaleString("en-IN")}`;
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Calculate total amount for the invoice (amount column for each item)
  const calculateTotalAmount = () => {
    return (
      invoiceData?.details?.reduce((total, item) => total + item.total, 0) || 0
    );
  };

  // Calculate total return amount (returnQty * rate for each row)
  const calculateTotalReturn = () => {
    return (
      invoiceData?.details?.reduce((total, item, index) => {
        const returnQty = returnQuantities[index] || 0; // Default to 0 if empty
        return total + (returnQty * item.amount); // Amount returned = returnQty * rate
      }, 0) || 0
    );
  };

  // Handle input for return quantity and validate it
  const handleReturnQtyChange = (index, event) => {
    const value = parseInt(event.target.value, 10);
    const qty = invoiceData.details[index].qty;

    // If the entered return quantity is greater than available quantity, set it to the available quantity
    if (value > qty) {
      setReturnQuantities((prevQuantities) => ({
        ...prevQuantities,
        [index]: qty, // Set return qty to the available qty
      }));
      setError(
        `Return quantity cannot be more than available quantity (${qty}). Returning the maximum available quantity.`
      );
    } else {
      setReturnQuantities((prevQuantities) => ({
        ...prevQuantities,
        [index]: value || 0, // Default to 0 if input is empty
      }));
      setError(""); // Clear error if valid quantity
    }
  };

  // Calculate Payment Total (sum of all payments)
  const calculatePaymentTotal = () => {
    return (
      invoiceData?.payments?.reduce(
        (total, payment) => total + payment.amount,
        0
      ) || 0
    );
  };

  // Calculate the total return amount based on payment made by the customer
  useEffect(() => {
    if (!invoiceData) return;

    const totalPaid = calculatePaymentTotal();
    const totalBillAmount = calculateTotalAmount();
    const returnAmount = calculateTotalReturn();
    const newBill = totalBillAmount - returnAmount;

    console.log("returnAmount ", returnAmount);
    console.log("totalPaid ", totalPaid);
    console.log("totalBillAmount ", totalBillAmount);
    console.log("New Bill ", newBill);

    setNewBillAmount(newBill);

    if (newBill - totalPaid < 0) {
      setreturnAmount(Math.abs(newBill - totalPaid));
    } else {
      setreturnAmount(0);
    }
    settotalPaid(totalPaid);
    settotalBillAmount(totalBillAmount);
  }, [invoiceData, returnQuantities]); // Recalculate when invoiceData or returnQuantities change


  const salseRetandetals = async () => {
    let returnItems = []; 
  
    invoiceData.details.forEach((item, index) => {
      const returnQty = returnQuantities[index] || 0;
  
      if (returnQty > 0) {
        returnItems.push({
          InvoiceDetailId: item.invoiceDetailId,
          GarmentsId: item.garmentsId,
          Qty: returnQty,
        });
      }
    });
  
    console.log(returnItems);
  
    if (returnItems.length > 0) {
      const  resJson = {
        InvoiceId: invoiceData.invoiceId, // Corrected this line
        PaymentMode: document.getElementById("paymentMode").value,
        References: document.getElementById("Refno").value,
        ReturnAmount:returnAmount, // Make sure this function is defined
        ReturnBillAmount: calculateTotalReturn(), // Make sure this function is defined
        SalesReturnItems: returnItems,
      };
      console.log(resJson);
      try {
        const response = await postData("SalseReturn/Insert",resJson);
        if(response.status.toUpperCase() === "OK")
        {
           console.log(response.result);
           successAlert("Success",response.result);
        }
        else{
          console.log(response.result);
        }
      } catch (error) {
        console.log(error);
      }
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
                  <h2 className="page-title-text">Sales Return</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>Sales Return</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="txtBillNo"
                  placeholder="Bill No"
                />
              </div>
              <div className="col-md-3">
                <input type="date" className="form-control" id="txtBillDate" />
              </div>
              <div className="col-md-3">
                <button
                  type="button"
                  onClick={invoiceDetails}
                  className="btn btn-primary"
                >
                  <FontAwesomeIcon icon={faSearch} style={{ fontSize: "20px" }} />
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Invoice Details Display */}
          {invoiceData && (
            <div className="col-md-12 mb-2 mt-4">
              <div className="row">
                <div className="col-md-4">
                  <span className="form-control">
                    <b>Invoice No:</b> {invoiceData.invoiceNo}
                  </span>
                </div>
                <div className="col-md-4">
                  <span className="form-control">
                    <b>Bill Date:</b> {formatDate(invoiceData.biildate)}
                  </span>
                </div>
                <div className="col-md-4">
                  <span className="form-control">
                    <b>Name:</b> {invoiceData.customername}
                  </span>
                </div>
                <div className="col-md-4">
                  <span className="form-control">
                    <b>Email:</b> {invoiceData.email}
                  </span>
                </div>
                <div className="col-md-4">
                  <span className="form-control">
                    <b>Contact No:</b> {invoiceData.contactNo}
                  </span>
                </div>
                <div className="col-md-4">
                  <span className="form-control">
                    <b>GST Id:</b> {invoiceData.gstno}
                  </span>
                </div>
                <div className="col-md-12">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Garment Name</th>
                        <th>Brand</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Rate(₹)</th>
                        <th>GST(%)</th>
                        <th>GST(₹)</th>
                        <th>Amount(₹)</th>
                        <th>Quantity</th>
                        <th>Return Qty</th>
                        <th>Total(₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.details.map((rowData, index) => (
                        <tr key={index}>
                          <td>{rowData.garmentName}</td>
                          <td>{rowData.brand}</td>
                          <td>{rowData.color}</td>
                          <td>{rowData.size}</td>
                          <td>{formatCurrency(rowData.rate)}</td>
                          <td>{rowData.gstValue}</td>
                          <td>{formatCurrency(rowData.gstValue)}</td>
                          <td>{formatCurrency(rowData.amount)}</td>
                          <td>{rowData.qty}</td>
                          <td>
                            <input
                              type="number"
                              min={1}
                              max={rowData.qty || ""}
                              value={returnQuantities[index] || ""}
                              onChange={(e) => handleReturnQtyChange(index, e)}
                              className="form-control"
                            />
                          </td>
                          <td>{formatCurrency(rowData.total)}</td>
                        </tr>
                      ))}
                      {error && (
                        <tr>
                          <td
                            colSpan="11"
                            style={{ color: "red", textAlign: "center" }}
                          >
                            <b>{error}</b>
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td colSpan={9} style={{ textAlign: "right" }}>
                          <b>Total Amount:</b>
                        </td>
                        <td>
                          <b>{formatCurrency(calculateTotalAmount())}</b>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} style={{ textAlign: "right" }}>
                          <b>Total Return:</b>
                        </td>
                        <td>
                          <b>{formatCurrency(calculateTotalReturn())}</b>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} style={{ textAlign: "right" }}>
                          <b>New Bill:</b>
                        </td>
                        <td>
                          <b>{formatCurrency(newBillAmount)}</b>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} style={{ textAlign: "right" }}>
                          <b>Payment Total:</b>
                        </td>
                        <td>
                          <b>{formatCurrency(calculatePaymentTotal())}</b>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={9} style={{ textAlign: "right" }}>
                          <b>Amount to be Returned:</b>
                        </td>
                        <td>
                          <b>{formatCurrency(returnAmount)}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-3">
                    <div className="row">
                      <div className="col-md-4">
                        <select
                          name="paymentMode"
                          id="paymentMode"
                          className="form-control"
                        >
                          <option value="">Select Payment Mode</option>
                          <option value="Credit">Credit</option>
                          <option value="UPI">UPI</option>
                          <option value="bank_transfer">Cash</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="Refno"
                          id="Refno"
                          className="form-control"
                          placeholder="Refno"
                        />
                      </div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={salseRetandetals}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
