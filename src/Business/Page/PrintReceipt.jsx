import React, { useEffect, useState } from "react";
import { getData } from "../../APIConfig/ConfigAPI";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faPrint } from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas"; // Import html2canvas for PDF generation

const PrintReceipt = () => {
  const [receipt, setReceipt] = useState(null);
  const { InvoiceId } = useParams();

  // Fetching the invoice details from API
  const DisplayReceipt = async (Id) => {
    try {
      const response = await getData(`InvoiceMaster/InvoiceDetails/${Id}`);
      if (response.status === "Ok") {
        setReceipt(response.result);
      } else {
        console.log(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Effect hook to trigger the invoice fetch when InvoiceId changes
  useEffect(() => {
    if (InvoiceId) {
      DisplayReceipt(InvoiceId);
    }
  }, [InvoiceId]);

  // Format date function
  const formatDate = (date) => new Date(date).toLocaleDateString();

  if (receipt === null) {
    return <div>Loading...</div>;
  }

  const {
    invoiceNo = "",
    biildate = "",
    customername = "",
    contactNo = "",
    email = "",
    details = [],
    grossAmount = 0,
    gst = 0,
    gstno = "",
    payments = [],
  } = receipt || {};

  // Calculate total paid from payments
  const totalPaid = payments.reduce((acc, payment) => acc + payment.amount, 0);

  // Calculate total bill amount (sum of item totals)
  const totalBillAmount = details.reduce((acc, item) => acc + item.total, 0);

  // Function to print the page
  const printReceipt = () => {
    window.print();
  };

  // Function to generate and download PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Invoice Receipt", 20, 10);
    doc.text(`Invoice No: ${invoiceNo}`, 20, 20);
    doc.text(`Invoice Date: ${formatDate(biildate)}`, 20, 30);
    doc.text(`Customer: ${customername}`, 20, 40);
    doc.text(`Contact: ${contactNo}`, 20, 50);
    doc.text(`Email: ${email}`, 20, 60);

    let yPosition = 70;
    details.forEach((item) => {
      doc.text(
        `Brand: ${item.brand}, Color: ${item.color}, Size: ${item.size}`,
        20,
        yPosition
      );
      doc.text(
        `GST Value: ${item.gstValue}, Qty: ${item.qty}`,
        20,
        yPosition + 10
      );
      doc.text(
        `Rate: ₹${item.rate}, Amount: ₹${item.amount}, Total: ₹${item.total}`,
        20,
        yPosition + 20
      );
      yPosition += 30;
    });

    doc.text(`GST No: ${gstno}`, 20, yPosition);
    doc.text(`Total Gross Amount: ₹${grossAmount}`, 20, yPosition + 10);
    doc.text(`GST Amount: ₹${gst}`, 20, yPosition + 20);

    doc.save(`${invoiceNo}_Receipt.pdf`);
  };

  // Function to download the receipt as PDF (using html2canvas)
  const downloadPDF = () => {
    const receiptRef = document.getElementById("receipt-container");

    if (!receiptRef) return;

    html2canvas(receiptRef, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`InvoiceReport_${new Date().toLocaleDateString()}.pdf`);
    });
  };

  return (
    <div className="container mt-4" id="receipt-container">
      <div className="card shadow-lg border-light rounded">
        <div className="card-body">
          <img
            src={`http://192.168.21.121:2025/Banner/${localStorage.getItem(
              "Baner"
            )}`}
            style={{ height: "150px", width: "100%" }}
            alt=""
          />
          <div className="col-md-12 py-3 bg-primary text-center mt-2 mb-4">
            <h6 className="text-white">Inventory Receipt</h6>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <p>
                <strong>Invoice No:</strong> {invoiceNo}
              </p>
              <p>
                <strong>Invoice Date:</strong> {formatDate(biildate)}
              </p>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4 text-end">
              <p>
                <strong>Customer:</strong> {customername}
              </p>
              <p>
                <strong>Contact:</strong> {contactNo}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
            </div>
          </div>

          {/* Invoice Details Table */}
          {Array.isArray(details) && details.length > 0 ? (
            <table className="table table-bordered table-striped mb-4">
              <thead className="table-light">
                <tr>
                  <th>Brand</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>GST Value</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Amount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {details.map((item, index) => (
                  <tr key={index}>
                    <td>{item.brand}</td>
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td>{item.gstValue}</td>
                    <td>{item.qty}</td>
                    <td>
                      {item.rate.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                    <td>
                      {item.amount.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                    <td>
                      {item.total.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7" className="text-right">
                    Total
                  </td>
                  <td>
                    {totalBillAmount.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <p>No invoice details available.</p>
          )}

          {/* Payments Section */}
          {Array.isArray(payments) && payments.length > 0 ? (
            <div className="payment-details">
              <h4 className="mb-3">Payment Details</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Payment Mode</th>
                    <th>Refno</th>
                    <th>Amount Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.paymentmode}</td>
                      <td>{payment.refno}</td>
                      <td>
                        {payment.amount.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className="text-right">
                      Total Paid
                    </td>
                    <td>
                      {totalPaid.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                  </tr>
                  <tr>
  <th rowSpan="8">Bill Amount</th>
  <td
    colSpan="2"
    className={`text-right ${
      totalBillAmount - totalPaid === 0 ? "text-success" : "text-danger"
    }`}
  >
    <b>
      {totalBillAmount - totalPaid === 0
        ? "Your bill is fully paid"
        : `Your remaining balance:${(totalBillAmount - totalPaid).toLocaleString(
            "en-IN",
            { style: "currency", currency: "INR" }
          )}`}
    </b>
  </td>
</tr>

                </tfoot>
              </table>
            </div>
          ) : (
            <p>No payment details available.</p>
          )}

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="small text-muted">Thank you for your business!</p>
            <button className="btn btn-primary" onClick={printReceipt}>
              <FontAwesomeIcon icon={faPrint} /> Print
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-danger" onClick={downloadPDF}>
              <FontAwesomeIcon icon={faFilePdf} /> Export to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintReceipt;
