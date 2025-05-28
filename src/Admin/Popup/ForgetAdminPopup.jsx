import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AdminForgetPasSchemas } from "../../schemas";
import { postData } from "../../APIConfig/ConfigAPI";
import { errorAlert, successAlert } from "../../Message/SweetAlert";

function ForgetAdminPopup(props) {
  const [buttonValues, setbuttonValues] = useState("Forget Password");

  const Clearform = () => {
    props.setinitialValues({
      Passwd: "",
      Cpasword: "",
    });
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      enableReinitialize: true,
      initialValues: props.initialValues,
      validationSchema: AdminForgetPasSchemas,
      onSubmit: async (values) => {
        const Savedata = {
          AdminId: localStorage.getItem("UserId"),
          Passwd: values.Passwd,
        };
        setbuttonValues("Please Wait...");
        try {
          const response = await postData(
            "AdminLogin/ForgetPassword",
            Savedata
          );
          if (response.status == "Ok") {
            console.log(response.result);
            Clearform();
            props.setShow(false);
            successAlert("Success", response.result);
            setbuttonValues("Forget Password");
          } else {
            console.log(response.result);
            errorAlert(response.result);
            setbuttonValues("Forget Password");
          }
        } catch (error) {
          console.log(error);
          setbuttonValues("Forget Password");
        }
      },
    });

  return (
    <>
      <div
        className={props.show ? "modal show" : "modal"}
        style={props.show ? { display: "block" } : null}
        id="SupplieraddModal"
      >
        <div className="modal-dialog ">
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
              <form onSubmit={handleSubmit} className="col-md-12 text-left">
                <div className="col-md-12">
                  <b>New Password</b>
                  <span className="text-danger">
                    &nbsp;*
                    {errors.Passwd && touched.Passwd ? errors.Passwd : null}
                  </span>
                  <input
                    type="password"
                    value={values.Passwd}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="Passwd"
                    id="Passwd"
                    className="form-control"
                  />
                </div>
                <div className="col-md-12">
                  <b>Confirm Password</b>
                  <span className="text-danger">
                    &nbsp;*
                    {errors.Cpasword && touched.Cpasword
                      ? errors.Cpasword
                      : null}
                  </span>
                  <input
                    type="password"
                    value={values.Cpasword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="Cpasword"
                    id="Cpasword"
                    className="form-control"
                  />
                </div>
                <div className="col-md-12 mt-3">
                  <button
                    type="submit"
                    disabled={buttonValues !== "Forget Password"}
                    className="btn btn-primary col-md-12 btn-lg"
                  >
                    {buttonValues !== "Forget Password" ? (
                      <b>Please Wait...</b>
                    ) : (
                      "Forget Password"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {props.show ? <div className="modal-backdrop show" /> : null}
    </>
  );
}
export default ForgetAdminPopup;
