import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useState } from "react";
import { CustomarDues } from "../../schemas";
import { postData } from "../../APIConfig/ConfigAPI";
import { errorAlert, successAlert } from "../../Message/SweetAlert";

const CustomerDuesPopup = (props) => {
  console.log("Afjal",props.invoiceId);
  const [Buttonvalue, setButtonvalue] = useState("Save");
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: props.initialValues,
    validationSchema: CustomarDues,
    onSubmit: async (values) => {
      const Savedata = {
        InvoiceMasterId: props.invoiceId,
        Amount: values.Amount,
        Paymentmode: values.Paymentmode,
        Refno: values.Refno,
        Paymentdate: values.Paymentdate,
      };
      console.log(Savedata);
      setButtonvalue("Please Wait...");
      try {
        const response = await postData("InvoicePayment/Insert", Savedata);
        if (response.status == "Ok") {
          console.log(response.result);
          successAlert("Success", "Save Success");
          setButtonvalue("Save");
        } else {
          console.log(response.result);
          errorAlert("Error", "Try Agen now");
          setButtonvalue("Save");
        }
      } catch (error) {
        console.log(error);
        setButtonvalue("Save");
      }
    },
  });
  const hendalChane = (fileName, value) => {
    if (fileName === "Amount") {
      // Check if the value exceeds the remainingAmount
      if (parseFloat(value) > props.remainingAmount) {
        alert(`Amount cannot exceed ₹${props.remainingAmount}`);
        return; // Prevent updating the value if it exceeds the remainingAmount
      }
    }
    setFieldValue(fileName, value);
  };
  return (
    <>
      <div
        className={props.show ? "modal show" : "modal"}
        style={props.show ? { display: "block" } : null}
        id="SupplieraddModal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Customer Dues</h4>
              <button
                type="button"
                onClick={() => props.setShow(false)}
                className="btn-close"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <div className="card-body">
              <div className="col-md-12 text-left">
                <form onSubmit={handleSubmit} className="row">
                  <div className="col-md-6">
                    <b>Amount(₹)</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Amount && touched.Amount ? errors.Amount : null}
                    </span>
                    <input
                      type="text"
                      name="Amount"
                      id="Amount"
                      value={values.Amount}
                      onBlur={handleBlur}
                      onChange={(e) => hendalChane("Amount", e.target.value)} // Use the updated onChange handler
                      max={props.remainingAmount || 0}
                      min={1}
                      className="form-control"
                      placeholder="₹0000"
                    />
                  </div>
                  <div className="col-md-6">
                    <b>Payment Mode </b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Paymentmode && touched.Paymentmode
                        ? errors.Paymentmode
                        : null}
                    </span>
                    <select
                      name="Paymentmode"
                      id="Paymentmode"
                      onChange={(e) =>
                        hendalChane("Paymentmode", e.target.value)
                      }
                      className="form-control"
                    >
                      {" "}
                      <option value="creditCard">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bankTransfer">Bank Transfer</option>
                      <option value="cashOnDelivery">Cash</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <b>Refno</b>
                    <input
                      type="text"
                      name="Refno"
                      id="Refno"
                      value={values.Refno}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Refno"
                    />
                  </div>
                  <div className="col-md-6">
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
                      value={values.Paymentdate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-12">
                    <button
                      type="submit"
                      disabled={Buttonvalue !== "Save"}
                      className="btn btn-primary"
                    >
                      {Buttonvalue !== "Save" ? <b>Please Wait...</b> : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.show ? <div className="modal-backdrop show" /> : null}
    </>
  );
};
export default CustomerDuesPopup;
