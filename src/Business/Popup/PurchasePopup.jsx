import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { PurchasesSchemas } from "../../schemas";
import { getData, postData } from "../../APIConfig/ConfigAPI";
import { useEffect, useState } from "react";
import { errorAlert, successAlert } from "../../Message/SweetAlert";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

const PurchasePopup = (props) => {
  const [buttonvalues, setbuttonvalues] = useState("Save");
  const [lastDate, setLastDate] = useState(null); // State for Billdate
  const [noticeDate, setNoticeDate] = useState(null); // State for NoticePeriod

  const clearform = () => {
    props.setinitialValues({
      Billdate: "",
      BillNo: "",
      GSTValue: "",
      GSTAmount: "",
      GrossAmount: "",
      GrandAmount: "",
      NoticePeriod: "",
      SupplierId: "",
      Note: "",
    });
    props.setgetpurchaseId(0);
  };

  const [supplierId, setSupplierId] = useState([]);
  const Supplierget = async () => {
    try {
      const response = await getData("Supplier/DisplayUser");
      setSupplierId(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Supplierget();
    
    // Set default date to the current date or any other default date you want
    const defaultDate = new Date(); // For example, defaulting to current date
    setLastDate(defaultDate); // Set the default date for Billdate
    setNoticeDate(defaultDate); // Set default date for NoticePeriod
    setFieldValue("Billdate", defaultDate); // Set the default date in Formik's field
    setFieldValue("NoticePeriod", defaultDate); // Set the default date in Formik's field
  }, []);

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValues,
    validationSchema: PurchasesSchemas,
    onSubmit: async (values, action) => {
      const Savedata = {
        Billdate: values.Billdate,
        BillNo: values.BillNo,
        GSTValue: values.GSTValue,
        GSTAmount: values.GSTAmount,
        GrossAmount: values.GrossAmount,
        GrandAmount: values.GrandAmount,
        NoticePeriod: values.NoticePeriod,
        SupplierId: values.SupplierId,
        Note: values.Note,
        BusinessId: localStorage.getItem("businessId"),
        PurchaseId: props.PurchaseId,
      };
      console.log(Savedata);
      setbuttonvalues("Please Wait...");
      try {
        const response = await postData(
          props.PurchaseId === 0 ? "Purchase/Insert" : "Purchase/Update",
          Savedata
        );
        if (response.status == "Ok") {
          props.Purchasedate();
          successAlert("Success", "Save Successfully");
          props.setShow(false);
          setbuttonvalues("Save");
        } else {
          errorAlert("Error", "Something went wrong");
          setbuttonvalues("Save");
        }
      } catch (error) {
        console.log(error);
        errorAlert("Error", "Something went wrong");
      }
    },
  });

  const setcontentvalues = (fielName, value) => {
    setFieldValue(fielName, value);
  };

  const calculateGSTGrandAmount = () => {
    if (values.GrossAmount && values.GSTValue) {
      const Gstamount = (values.GrossAmount * values.GSTValue) / 100;
      const Grandamount = values.GrossAmount + Gstamount;
      setFieldValue("GSTAmount", Gstamount);
      setFieldValue("GrandAmount", Grandamount);
    }
  };

  useEffect(() => {
    calculateGSTGrandAmount();
  }, [values.GrossAmount, values.GSTValue]);

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
              <h4 className="modal-title">Purchase</h4>
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
                  {/* Supplier */}
                  <div className="col-md-6 mb-1">
                    <b>Supplier</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.SupplierId && touched.SupplierId
                        ? errors.SupplierId
                        : null}
                    </span>
                    <select
                      onChange={(e) =>
                        setcontentvalues("SupplierId", e.target.value)
                      }
                      name="SupplierId"
                      id="SupplierId"
                      className="form-control"
                    >
                      <option value="">Select Supplier</option>
                      {supplierId.map((o, index) => {
                        return (
                          <option key={o.SuppId} value={o.suppId}>
                            {o.businessname}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Bill No */}
                  <div className="col-md-6 mb-1">
                    <b>Bill No</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.BillNo && touched.BillNo ? errors.BillNo : null}
                    </span>
                    <input
                      type="number"
                      name="BillNo"
                      id="BillNo"
                      value={values.BillNo}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="0000"
                      className="form-control"
                    />
                  </div>

                  {/* Gross Amount */}
                  <div className="col-md-3 mb-1">
                    <b>Gross (₹)</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.GrossAmount && touched.GrossAmount
                        ? errors.GrossAmount
                        : null}
                    </span>
                    <input
                      type="number"
                      name="GrossAmount"
                      id="GrossAmount"
                      placeholder="₹"
                      value={values.GrossAmount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  {/* GST (%) */}
                  <div className="col-md-3 mb-1">
                    <b>GST (%)</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.GSTValue && touched.GSTValue
                        ? errors.GSTValue
                        : null}
                    </span>
                    <input
                      type="number"
                      name="GSTValue"
                      id="GSTValue"
                      value={values.GSTValue}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="%"
                      className="form-control"
                    />
                  </div>

                  {/* GST Amount */}
                  <div className="col-md-3 mb-1">
                    <b>GST (₹)</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.GSTAmount && touched.GSTAmount
                        ? errors.GSTAmount
                        : null}
                    </span>
                    <input
                      type="number"
                      name="GSTAmount"
                      id="GSTAmount"
                      placeholder="₹"
                      value={values.GSTAmount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  {/* Grand Amount */}
                  <div className="col-md-3 mb-1">
                    <b>Grand (₹)</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.GrandAmount && touched.GrandAmount
                        ? errors.GrandAmount
                        : null}
                    </span>
                    <input
                      type="number"
                      name="GrandAmount"
                      id="GrandAmount"
                      placeholder="₹"
                      value={values.GrandAmount}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  {/* Bill Date - Replaced with DatePicker */}
                  <div className="col-md-6 mb-1">
                    <b>Bill Date</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Billdate && touched.Billdate
                        ? errors.Billdate
                        : null}
                    </span>
                    <br />
                    <DatePicker
                      selected={lastDate}
                      id="Billdate"
                      onChange={(date) => {
                        setLastDate(date); // Update the local state for Billdate
                        setFieldValue("Billdate", date); // Update Formik's value for Billdate
                      }}
                      dateFormat="dd-MM-yyyy"
                      minDate={new Date()}
                      maxDate={new Date()}
                      className="form-control"
                      placeholderText="dd-MM-yyyy"
                    />
                  </div>

                  {/* Notice Period - Replaced with DatePicker */}
                  <div className="col-md-6 mb-1">
                    <b>Notice Period Date</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.NoticePeriod && touched.NoticePeriod
                        ? errors.NoticePeriod
                        : null}
                    </span>
                    <br />
                    <DatePicker
                      selected={noticeDate}
                      id="NoticePeriod"
                      onChange={(date) => {
                        setNoticeDate(date); // Update the local state for NoticePeriod
                        setFieldValue("NoticePeriod", date); // Update Formik's value for NoticePeriod
                      }}
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                      minDate={new Date()}
                      placeholderText="dd-MM-yyyy"
                    />
                  </div>

                  {/* Note */}
                  <div className="col-md-12 mb-1">
                    <b>Note</b>
                    <span className="text-danger">
                      &nbsp;*{errors.Note && touched.Note ? errors.Note : null}
                    </span>
                    <textarea
                      name="Note"
                      id="Note"
                      placeholder="Enter Note....."
                      value={values.Note}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                    ></textarea>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="submit"
                      disabled={buttonvalues !== "Save"}
                      className="btn btn-primary"
                    >
                      {buttonvalues !== "Save" ? <b>Please Wait...</b> : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => clearform()}
                      className="btn btn-danger"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => props.setShow(false)}
                      className="btn btn-default"
                    >
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

export default PurchasePopup;
