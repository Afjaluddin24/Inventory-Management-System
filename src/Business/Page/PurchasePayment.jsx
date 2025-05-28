import React, { useEffect, useState } from "react";
import PurchasePaymentPopup from "../Popup/PurchasePaymentPopup";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getData, postData } from "../../APIConfig/ConfigAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PurchasePayment = () => {
  const [show, setShow] = useState(false);
  const [initialValues, setInitialValues] = useState({
    PurchaseId: "",
    Amount: "",
    Paymentmode: "",
    Refno: "",
    Paymentdate: "",
  });

  const [purchasedetals, setPurchasedetals] = useState([]);
  const [error, setError] = useState(null);
  const [grandAmount, setGrandAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [purchId, setPurchId] = useState(0);

  // Function to format the amount in ₹
  const formatAmount = (amount) => {
    return amount === null || amount === undefined
      ? "₹ 0.00"
      : `₹ ${amount.toLocaleString("en-IN")}`;
  };

  // Function to calculate remaining amount
  const calculateRemainingAmount = (grandAmount, paidAmount) => {
    return grandAmount - paidAmount;
  };

  const purchasedetal = async () => {
    try {
      const response = await getData("PurchasePayment/PurchasePayment");
      setPurchasedetals(response.result);
    } catch (error) {
      console.error(error);
      setError("Failed to load data, please try again.");
    }
  };

  useEffect(() => {
    purchasedetal();
  }, []);

  const displayBill = async (Id, amountToPass) => {
    try {
      const response = await getData("Purchase/Display/" + Id);
      if (response.status === "Ok") {
        const data = response.result;
        setInitialValues({
          Paymentmode: "",
          Refno: "",
          Paymentdate: "",
          PurchaseId: data.billNo,
          Amount: amountToPass, // Pass the correct amount here
        });
        setGrandAmount(data.grandAmount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const iconRupee = (data) => {
    const PurchaseId = data.purchaseId;
    const remainingAmount = calculateRemainingAmount(data.grandAmount, data.paid);

    return (
      <button
        onClick={() => {
          if (remainingAmount > 0) {
            setRemainingAmount(remainingAmount);
            setPurchId(PurchaseId);
            setShow(true);
          } else {
            alert("Remaining amount is 0");
          }
        }}
        className="btn btn-circle btn-shadow btn-primary btn-lg m-1"
      >
        <FontAwesomeIcon icon={faIndianRupeeSign} />
      </button>
    );
  };

  return (
    <div className="page-wrapper">
      <div className="col-12">
        <div className="portlet">
          <div className="portlet-head mb-4">
            <div className="portlet-title">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-sm-6">
                    <h2 className="page-title-text">Purchase Payment</h2>
                  </div>
                  <div className="col-sm-6 text-right">
                    <div className="breadcrumbs">
                      <ul>
                        <li>
                          <Link to="/BuesinessDashbord">Home</Link>
                        </li>
                        <li>Purchase Payment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error message if data fetch fails */}
          {error && <div className="error-message">{error}</div>}

          <div className="col-md-12 mt-3">
            <PurchasePaymentPopup
              show={show}
              setShow={setShow}
              initialValues={initialValues}
              setInitialValues={setInitialValues}
              setPurchId={setPurchId}
              purchasedetal={purchasedetal}
              setPurchasedetals={setPurchasedetals}
              remainingAmount={remainingAmount}
              purchId={purchId}
            />
          </div>

          <DataTable
            value={purchasedetals}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="billNo" header="Bill No" />
            <Column
              header="Bill Date"
              body={(rowData) => {
                const formatDate = rowData.billDate
                  ? new Date(rowData.billDate).toLocaleDateString("en-GB")
                  : "N/A";
                return <small>{formatDate}</small>;
              }}
            />
            <Column field="businessname" header="Supplier" />
            <Column
              field="grandAmount"
              header="Bill(₹)"
              body={(rowData) => formatAmount(rowData.grandAmount)}
            />
            <Column
              field="paid"
              header="Paid(₹)"
              body={(rowData) => formatAmount(rowData.paid)}
            />
            <Column
              field="remainingAmount"
              header="Remaining(₹)"
              body={(rowData) => {
                const remaining = calculateRemainingAmount(rowData.grandAmount, rowData.paid);
                return formatAmount(remaining);
              }}
            />
            <Column body={iconRupee} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default PurchasePayment;
