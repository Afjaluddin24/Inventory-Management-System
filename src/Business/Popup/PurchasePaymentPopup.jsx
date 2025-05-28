import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { PurchasePaymentSchema } from "../../schemas";
import { postData } from "../../APIConfig/ConfigAPI";
import { useState } from "react";
import { successAlert } from "../../Message/SweetAlert";

const PurchasePaymentPopup = (props) => {
  const [ButtonValue, setButtonValue] = useState("Save");

  // Clear form fields
  const clearForm = () => {
    props.setinitialValues({
      PurchaseId: "",
      Paymentmode: "",
      Refno: "",
      Paymentdate: "",
      Amount: "", // Reset Amount as well
    });
    props.setpurchId(0);
  };
  const { values, errors, handleBlur, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValues,
    validationSchema: PurchasePaymentSchema,
    onSubmit: async (values) => {
      const saveData = {
        PurchaseId: props.purchId,
        Amount: values.Amount,
        Paymentmode: values.Paymentmode,
        Refno: values.Refno,
        Paymentdate: values.Paymentdate,
        BusinessId: localStorage.getItem("businessId"),
      };
      console.log(saveData);
      setButtonValue("Please Wait...");
      try {
        const response = await postData("PurchasePayment/Insert", saveData);
        if (response.status === "Ok") {
          successAlert("Success", "Save Successfully");
          props.setShow(false);
          props.purchasedetal();
          setButtonValue("Save");
        } else {
          alert(response.result);
          setButtonValue("Save");
        }
      } catch (error) {
        console.log(error);
        setButtonValue("Save");
      }
    },
  });

  const handleFieldChange = (fieldName, value) => {
    setFieldValue(fieldName, value);
  };

  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="SupplieraddModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Purchase Payment</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close">
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <div className="card-body">
              <div className="col-md-12 text-left">
                <form onSubmit={handleSubmit} className="row">
                  <div className="col-md-6 mb-2">
                    <b>Amount(₹)</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Amount && touched.Amount ? errors.Amount : null}
                    </span>
                    <input
                      type="number"
                      value={values.Amount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Amount"
                      id="Amount"
                      className="form-control"
                      max={props.remainingAmount || 0}
                      min="0" // Optionally, set a minimum value of 0
                    />
                  </div>

                  <div className="col-md-6 mb-2">
                    <b>Payment Mode</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Paymentmode && touched.Paymentmode ? errors.Paymentmode : null}
                    </span>
                    <select
                      id="paymentMode"
                      className="form-control"
                      name="Paymentmode"
                      onBlur={handleBlur}
                      onChange={(e) => handleFieldChange("Paymentmode", e.target.value)}
                    >
                      <option value="creditCard">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bankTransfer">Bank Transfer</option>
                      <option value="cashOnDelivery">Cash</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-2">
                    <b>Refno</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Refno && touched.Refno ? errors.Refno : null}
                    </span>
                    <input
                      type="text"
                      value={values.Refno}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Refno"
                      id="Refno"
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6 mb-2">
                    <b>Payment Date</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Paymentdate && touched.Paymentdate ? errors.Paymentdate : null}
                    </span>
                    <input
                      type="date"
                      onBlur={handleBlur}
                      onChange={(e) => handleFieldChange("Paymentdate", e.target.value)}
                      name="Paymentdate"
                      id="Paymentdate"
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-6 mb-2">
                    <button type="submit" disabled={ButtonValue !== "Save"} className="btn btn-primary">
                      {ButtonValue !== "Save" ? <b>Please Wait...</b> : "Save"}
                    </button>
                    &nbsp;&nbsp;
                    <button type="button" onClick={clearForm} className="btn btn-danger">
                      Clear
                    </button>
                    &nbsp;&nbsp;
                    <button type="button" className="btn badge-dark" onClick={() => props.setShow(false)}>
                      Close
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

export default PurchasePaymentPopup;
