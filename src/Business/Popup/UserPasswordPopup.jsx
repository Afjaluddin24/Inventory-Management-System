import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useState } from "react";
import { getData, postData } from "../../APIConfig/ConfigAPI";
import { errorAlert, successAlert } from "../../Message/SweetAlert";

const UserPasswordPopup = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to check if contact number exists
  const getDetails = async (contactNo) => {
    try {
      const response = await getData("Business/ContectNo/" + contactNo);
      return response;
    } catch (error) {
      console.error('Error fetching details:', error);
      return null; // Return null in case of error
    }
  };

  // Formik for form handling with validation
  const formik = useFormik({
    initialValues: {
      contactNo: "",
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await getDetails(values.contactNo.toString());

        if (response && response.status === "Ok") {
          console.log("Contact exists:", response.result);
          successAlert("Contact number exists, proceed with SMS or password reset.");
          props.setShow(false);
        } else {
          console.log("Contact not found:", response);
          errorAlert("Contact number does not exist.");
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        errorAlert("An error occurred while processing your request.");
      }
      setIsSubmitting(false);
    },
  });

  return (
    <>
      <div
        className={props.show ? "modal show" : "modal"}
        style={props.show ? { display: "block" } : null}
        id="SupplieraddModal"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Forget Password</h4>
              <button
                type="button"
                onClick={() => props.setShow(false)}
                className="btn-close"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <div className="card-body">
              <form className="col-md-12" onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <b>Contact No</b>
                    <input
                      type="number"
                      value={formik.values.contactNo}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="contactNo"
                      id="contactNo"
                      className="form-control"
                      placeholder="0000000000"
                    />
                    {formik.touched.contactNo && formik.errors.contactNo ? (
                      <div style={{ color: "red" }}>{formik.errors.contactNo}</div>
                    ) : null}
                  </div>
                  <div className="col-md-12 mt-2">
                    <button
                      type="submit"
                      className="btn btn-success col-md-12"
                      disabled={isSubmitting} // Disable the button while submitting
                    >
                      {isSubmitting ? "Sending..." : "Save"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {props.show ? <div className="modal-backdrop show" /> : null}
    </>
  );
};

export default UserPasswordPopup;
