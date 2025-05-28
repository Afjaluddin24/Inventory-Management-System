import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InvoicePopup from "../Popup/InvoicePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faMinus,
  faPrint,
} from "@fortawesome/free-solid-svg-icons"; // Import plus and minus icons
import {
  errorAlert,
  successAlert,
  warningAlert,
} from "../../Message/SweetAlert";
import { useFormik } from "formik";
import { InvoiceSchema } from "../../schemas";
import { getData, postData } from "../../APIConfig/ConfigAPI";

function Invoice() {
  const [ButtonValues, setButtonValues] = useState("Save");
  const [show, setShow] = useState(false);
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const [invoicePayments, setInvoicePayments] = useState([]);
  const [InvoiseNo, setInvoiseNo] = useState(0);

  const invoicePaymentdetal = () => {
    const PaymentDetals = {
      Amount: document.getElementById("GrossAmount").value,
      Paymentmode: document.getElementById("Paymentmode").value,
      Refno: document.getElementById("Refno").value,
      Paymentdate: document.getElementById("Paymentdate").value,
    };
    console.log(PaymentDetals);
    setInvoicePayments([...invoicePayments, PaymentDetals]);
  };

  const [initialValues, setinitialValues] = useState({
    InvoiceNo: "",
    FinancialYearId: "",
    Customername: "",
    GSTNO: "",
    Email: "",
    ContactNo: "",
    Biildate: "",
    InvoiceMasterId: "",
    Amount: "",
    Paymentmode: "",
    Refno: "",
    Paymentdate: "",
  });

  const getInvoiceno = async () => {
    try {
      const response = await getData("InvoiceMaster/MaxId");
      if (response.status == "Ok") {
        setFieldValue("InvoiceNo", response.result);
        setInvoiseNo(response.result);
        console.log(response.result);
        console.log(InvoiseNo);
      } else {
        console.log(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: InvoiceSchema,
    onSubmit: async (values) => {
      var GrossAmt = 0;
      var GstAmt = 0;
      var AmountTotal = 0;
      invoiceDetail.forEach((item) => {
        GrossAmt += parseFloat(item.Rate);
        GstAmt += parseFloat(item.GSTValue);
        AmountTotal += parseFloat(item.Amount);
      });
      const Savedate = {
        InvoiceNo: InvoiseNo,
        FinancialYearId: localStorage.getItem("FinacialId"),
        Customername: values.Customername,
        ContactNo: values.ContactNo.toString(),
        Email: values.Email,
        GSTNO: values.GSTNO,
        Biildate: values.Biildate,
        NoticePeriod: values.Biildate,
        GrossAmount: GrossAmt.toFixed(2),
        GST: GstAmt.toFixed(2),
        Total: calculateTotalAmount(),
        InvoiceDetails: invoiceDetail,
        BusinessId: localStorage.getItem("businessId"),
        invoicePayments: invoicePayments,
        Address: "",
        Message: "",
      };
      console.log(Savedate);
      setButtonValues("Please Wait....");
      try {
        const response = await postData("InvoiceMaster/Insert", Savedate);
        if (response.status == "Ok") {
          console.log(response.result);
          successAlert("Success", "Save Successfully");
          window.open(`/PrintReceipt/${response.result}`, "_blank");
          setButtonValues("Save");
        } else {
          console.log(response.result);
          errorAlert("Error", "Try agen");
          setButtonValues("Save");
        }
      } catch (error) {
        console.log(error);
        setButtonValues("Save");
      }
    },
  });

  const handelCheng = (filedName, values) => {
    setFieldValue(filedName, values);
  };
  // Format currency (₹)
  const formatCurrency = (value) => {
    return value === null || value === undefined || value === 0
      ? "₹ 0.00"
      : `₹ ${value.toLocaleString("en-IN")}`;
  };

  // Handle Delete
  const handleDelete = async (index) => {
    const confirm = await warningAlert(
      "Warning",
      "Are you sure you want to delete this item?"
    );
    if (confirm) {
      setInvoiceDetail((prevDetail) =>
        prevDetail.filter((_, i) => i !== index)
      );
    }
  };

  // Handle Quantity Change and Calculate Total
  const handleQtyChange = (e, index) => {
    const qty = e.target.value;
    const stock = invoiceDetail[index].Stock; // Access stock value

    // Ensure the quantity is a valid positive number and within stock limit
    if (qty <= 0 || isNaN(qty)) {
      alert("Quantity must be greater than 0");
      return;
    }

    if (qty > stock) {
      alert(`Quantity cannot exceed stock of ${stock}`);
      return;
    }

    const updatedInvoiceDetail = [...invoiceDetail];
    const updatedItem = { ...updatedInvoiceDetail[index], Qty: qty };
    updatedItem.Total = qty * updatedItem.Amount; // Recalculate Total
    updatedInvoiceDetail[index] = updatedItem;
    setInvoiceDetail(updatedInvoiceDetail);
  };

  const handleQtyIncrease = (index) => {
    const updatedInvoiceDetail = [...invoiceDetail];
    const stock = updatedInvoiceDetail[index].Stock; // Access stock value
    const currentQty = updatedInvoiceDetail[index].Qty || 0;

    // Ensure the quantity does not exceed stock
    if (currentQty + 1 > stock) {
      alert(`Quantity cannot exceed stock of ${stock}`);
      return;
    }

    const updatedItem = {
      ...updatedInvoiceDetail[index],
      Qty: currentQty + 1,
    };
    updatedItem.Total = updatedItem.Qty * updatedItem.Amount; // Recalculate Total
    updatedInvoiceDetail[index] = updatedItem;
    setInvoiceDetail(updatedInvoiceDetail);
  };

  const handleQtyDecrease = (index) => {
    const updatedInvoiceDetail = [...invoiceDetail];
    const currentQty = updatedInvoiceDetail[index].Qty || 0;

    // Prevent going below 1
    if (currentQty <= 1) {
      alert("Quantity cannot be less than 1");
      return;
    }

    const updatedItem = {
      ...updatedInvoiceDetail[index],
      Qty: currentQty - 1,
    };
    updatedItem.Total = updatedItem.Qty * updatedItem.Amount; // Recalculate Total
    updatedInvoiceDetail[index] = updatedItem;
    setInvoiceDetail(updatedInvoiceDetail);
  };

  useEffect(() => {
    getInvoiceno();
  }, [values.InvoiceNo]);

  // Calculate the total amount for all rows
  const calculateTotalAmount = () => {
    return invoiceDetail.reduce((total, item) => total + (item.Total || 0), 0);
  };

  const invoisePrint = (data) => {
    return <FontAwesomeIcon icon={faPrint} style={{ cursor: "pointer" }} />;
  };

  return (
    <div className="page-wrapper">
      <div className="col-12">
        <div className="portlet">
          <div className="portlet-head">
            <div className="portlet-title">
              <div className="col-md-12">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <h2 className="page-title-text">Invoice</h2>
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
          <form onSubmit={handleSubmit} className="col-md-12 mt-4">
            <div className="row">
              <div className="col-md-4">
                <b>Invoice No</b>
                <input
                  type="text"
                  id="InvoiceNo"
                  name="InvoiceNo"
                  onBlur={handleBlur}
                  onChange={(e) => handelCheng("InvoiceNo", e.target.value)}
                  className="form-control"
                  readOnly
                  value={values.InvoiceNo}
                  placeholder="Invoice No"
                />
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <input
                  type="date"
                  id="Biildate"
                  name="Biildate"
                  value={values.Biildate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <b>Name</b>
                <span className="text-danger">
                  &nbsp;*
                  {errors.Customername && touched.Customername
                    ? errors.Customername
                    : null}
                </span>
                <input
                  type="text"
                  id=" Customername"
                  name="Customername"
                  placeholder="Customername"
                  className="form-control"
                  value={values.Customername}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-2">
                <b>Contact No</b>
                <span className="text-danger">
                  &nbsp;*
                  {errors.ContactNo && touched.ContactNo
                    ? errors.ContactNo
                    : null}
                </span>
                <input
                  type="number"
                  placeholder="Contact No"
                  className="form-control"
                  id="ContactNo"
                  name="ContactNo"
                  value={values.ContactNo}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2">
                <b>Email</b>
                <span className="text-danger">
                  &nbsp;*{errors.Email && touched.Email ? errors.Email : null}
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  id="Email"
                  name="Email"
                  value={values.Email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-2">
                <b>GSTID</b>
                <span className="text-danger">
                  &nbsp;*{errors.GSTNO && touched.GSTNO ? errors.GSTNO : null}
                </span>
                <input
                  type="text"
                  placeholder="GSTID"
                  className="form-control"
                  id="GSTNO"
                  name="GSTNO"
                  value={values.GSTNO}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-sm-12 mt-2 text-right">
              <button
                type="button"
                id="openPopup"
                className="btn btn-primary"
                onClick={() => setShow(true)}
              >
                Invoice
              </button>
            </div>

            <div className="mt-3">
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
                    <th>Total(₹)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceDetail.map((rowData, index) => (
                    <tr key={index}>
                      <td>{rowData.GarmentName}</td>
                      <td>{rowData.Brand}</td>
                      <td>{rowData.Color}</td>
                      <td>{rowData.Size}</td>
                      <td>{formatCurrency(rowData.Rate)}</td>
                      <td>{rowData.GST}</td>
                      <td>{formatCurrency(rowData.GSTValue)}</td>
                      <td>{formatCurrency(rowData.Amount)}</td>
                      <td>
                        <div>
                          <span
                            className="btn btn-sm btn-danger"
                            onClick={() => handleQtyDecrease(index)}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </span>
                          <input
                            type="number"
                            className="form-control"
                            value={invoiceDetail[index]?.Qty || ""}
                            onChange={(e) => handleQtyChange(e, index)}
                            min="1"
                            max={rowData.Stock} // Set the max value to the stock
                            style={{ width: "80px", display: "inline-block" }}
                          />
                          <span
                            className="btn btn-sm btn-primary"
                            onClick={() => handleQtyIncrease(index)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </span>
                        </div>
                      </td>
                      <td>
                        <b>{invoiceDetail[index]?.Total || ""}</b>
                      </td>
                      <td>
                        <span
                          className="btn btn-circle btn-shadow btn-danger text-center btn-lg m-1"
                          onClick={() => handleDelete(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={9} style={{ textAlign: "right" }}>
                      <b>Total Amount:</b>
                    </td>
                    <td>
                      <b>{calculateTotalAmount()}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-3">
                <div className="row">
                  <div className="col-md-3">
                    <b>Amount(₹)</b>
                    <input
                      type="number" // Ensure it's a number type input
                      name="Amount"
                      id="GrossAmount"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Amount"
                      max={
                        typeof calculateTotalAmount() === "number"
                          ? calculateTotalAmount()
                          : 0
                      } // Ensure it's a number
                      min={1}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-3">
                    <b>Payment Mode</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Paymentmode && touched.Paymentmode
                        ? errors.Paymentmode
                        : null}
                    </span>
                    <select
                      name="Paymentmode"
                      id="Paymentmode"
                      value={values.Paymentmode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Select Payment Mode</option>
                      <option value="credit card">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank transfer">Bank Transfer</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <b>Refno</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Refno && touched.Refno ? errors.Refno : null}
                    </span>
                    <input
                      type="text"
                      name="Refno"
                      id="Refno"
                      value={values.Refno}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Refno"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-2">
                    <b>Payment Date</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Paymentdate && touched.Paymentdate
                        ? errors.Paymentdate
                        : null}
                    </span>
                    <input
                      type="date"
                      name="Paymentdate"
                      id="Paymentdate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                      value={values.Paymentdate}
                    />
                  </div>
                  <div className="col-md-2 mt-3">
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => invoicePaymentdetal()}
                    >
                      Add Now
                    </button>
                  </div>
                  <div className="col-md-12 mb-3 mt-3">
                    <button
                      type="submit"
                      disabled={ButtonValues !== "Save"}
                      className="btn btn-success btn-lg"
                    >
                      <FontAwesomeIcon icon={faPrint} />
                      {ButtonValues !== "Save" ? <b>Please Wait...</b> : "Save"}
                    </button>
                    <table className="table table-bordered mt-3">
                      <thead>
                        <tr>
                          <th>Amount(₹)</th>
                          <th>Paymentmode</th>
                          <th>Refno</th>
                          <th>Date</th>
                          <th>Action</th> {/* New column for delete button */}
                        </tr>
                      </thead>
                      <tbody>
                        {invoicePayments.map((o, index) => (
                          <tr key={index}>
                            <td>{o.Amount}</td>
                            <td>{o.Paymentmode}</td>
                            <td>{o.Refno}</td>
                            <td>{o.Paymentdate}</td>
                            <td>
                              <span
                                onClick={() => RemovePayment(index)} // Call handleDelete with the row's index
                                className="btn btn-circle btn-shadow btn-danger text-center btn-lg m-1"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <InvoicePopup
            show={show}
            setShow={setShow}
            invoiceDetail={invoiceDetail}
            setInvoiceDetail={setInvoiceDetail}
          />
        </div>
      </div>
    </div>
  );
}
export default Invoice;
