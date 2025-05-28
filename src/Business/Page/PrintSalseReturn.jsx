import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../APIConfig/ConfigAPI';
import html2pdf from 'html2pdf.js'; // For exporting to PDF

const PrintSalesReturn = () => {
  const { SalseRetunId } = useParams();
  const [receipt, setReceipt] = useState(null); // State to store fetched receipt data

  // Fetch receipt data from the API
  const DisplayReceipt = async (Id) => {
    try {
      const response = await getData(`SalseReturn/SalesReturn/Detail/${Id}`);
      if (response.status === "Ok") {
        setReceipt(response.result); // Store the result in the state
        console.log(response.result);
      } else {
        console.log(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch receipt data when the component mounts or SalesReturnId changes
  useEffect(() => {
    if (SalseRetunId) {
      DisplayReceipt(SalseRetunId);
    }
  }, [SalseRetunId]);

  // Handle Print Receipt
  const handlePrint = () => {
    window.print();
  };

  // Handle Export to PDF
  const handleExportPDF = () => {
    const element = document.getElementById('receipt');
    html2pdf()
      .from(element)
      .save('Sales_Receipt.pdf');
  };

  // Handle Send via WhatsApp
  const handleSendWhatsApp = () => {
    const returnDue = Math.abs(receipt.total - totalProductAmount - totalPaidAmount); // Calculate Return Due
    const message = 
      `${localStorage.getItem("ShopName")}\n\n` +
      `Receipt Details:\n\n` +
      `Invoice ID: ${receipt.invoiceId}\n` +
      `Customer Name: ${receipt.customername}\n` +
      `Contact No: ${receipt.contactNo}\n` +
      `Total Amount: ₹${receipt.total}\n` +
      `Amount Paid: ₹${receipt.invoicePayment.reduce((total, payment) => total + payment.amount, 0)}\n` +
      `Balance Due: ₹${Math.abs(receipt.total - receipt.invoicePayment.reduce((total, payment) => total + payment.amount, 0))}\n\n` +
      `New Bill: ₹${receipt.total - totalProductAmount}\n\n` +
      `Return Due: ₹${returnDue}\n\n` + // Add the Return Due here
      `Thank you for your purchase!`;
  
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  
  

  // Render a loading message if the data is still being fetched
  if (!receipt) {
    return <div>Loading...</div>;
  }

  // Calculate the total amount of all return products
  const totalProductAmount = receipt.returnProducts.reduce((total, product) => total + (product.qty * product.amount), 0);

  // Calculate the overall paid amount
  const totalPaidAmount = receipt.invoicePayment.reduce((total, payment) => total + payment.amount, 0);

  // Calculate the balance due
  const balanceDue = Math.abs(receipt.total - totalPaidAmount);

  return (
    <div className="container my-5" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>

      {/* Receipt Content */}
      <div id="receipt" style={{ padding: '20px', borderRadius: '10px' }}>
        {/* Header with Logo and Sales Receipt Text */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#007bff', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
          <div>
            <img src={`http://192.168.21.121:2025/LOGO/${localStorage.getItem("Logo")}`} alt="Company Logo" style={{ width: '100px', height: 'auto' }} />
          </div>
          <div>
            <h2 style={{ color: '#000', margin: 0 }}>Sales Receipt</h2>
          </div>
        </div>

        {/* Default Invoice Details */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#333', marginBottom: '10px' }}><strong>Invoice ID:</strong> {receipt.invoiceId}</h4>
          <p style={{ margin: '5px 0', color: '#555' }}><strong>Customer Name:</strong> {receipt.customername}</p>
          <p style={{ margin: '5px 0', color: '#555' }}><strong>Contact No:</strong> {receipt.contactNo}</p>
        </div>

        {/* Products Table */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#333', marginBottom: '10px' }}>Products Return</h4>
          <table className="table table-bordered" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Brand</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Garment</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Model</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Rate</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>GST (%)</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>GST Value</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Quantity</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Amount</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {receipt.returnProducts.map((product, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{product.brand}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{product.garmentName}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{product.nameModal}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>₹{product.rate}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{product.gst}%</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>₹{product.gstValue}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{product.qty}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>₹{product.amount}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>₹{product.qty * product.amount}</td> {/* Product total */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payments Table */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#333', marginBottom: '10px' }}>Payments</h4>
          <table className="table table-bordered" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Payment Mode</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Reference No</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Amount Paid</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {receipt.invoicePayment.map((payment, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{payment.paymentmode}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>{payment.refno}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>₹{payment.amount}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>
                    {new Date(payment.paymentdate).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total, Paid, and Balance */}
        <div className="text-right mt-4" style={{ marginTop: '20px', textAlign: 'right' }}>
          <h4 style={{ color: '#333', marginBottom: '10px' }}>Total: ₹{receipt.total}</h4>
          <p style={{ margin: '5px 0', color: '#555' }}><strong>Amount Paid: ₹{totalPaidAmount}</strong></p>
          <p style={{ margin: '5px 0', color: '#555' }}><strong>Balance Due: ₹{balanceDue}</strong></p>
          <p style={{ margin: '5px 0', color: '#555' }}><strong>Total Return Amount: ₹{totalProductAmount}</strong></p> 
          <p style={{ margin: '5px 0', color: '#555' }}><strong>New Bill: ₹{receipt.total-totalProductAmount}</strong></p> 
          <p style={{ margin: '5px 0', color: '#555' }}>
  <strong>Return Due: ₹{Math.abs(receipt.total - totalProductAmount - totalPaidAmount)}</strong>
</p>


        </div>

        <hr />
        <div className='text-center' style={{ marginTop: '20px', padding: '10px', borderRadius: '5px' }}>
          <h5 style={{ color: '#333', marginBottom: '10px' }}>Terms & Conditions:</h5>
          <p style={{ margin: '5px 0', color: '#555', fontStyle: 'italic' }}>
            All claims relating to quantity or shipping errors shall be waived by Buyer unless made in writing to
            Seller within thirty (30) days after delivery of goods to the address stated.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px' }}>
        <button onClick={handlePrint} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Print Receipt
        </button>
        <button onClick={handleExportPDF} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Export PDF
        </button>
        <button onClick={handleSendWhatsApp} style={{ padding: '10px 20px', backgroundColor: '#25D366', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Send via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default PrintSalesReturn;
