import { useFormik } from "formik";
import React, { useState } from "react";
import { UserLoginSchemas } from "../schemas";
import { postData } from "../APIConfig/ConfigAPI";
import { Link, useNavigate } from "react-router-dom";
import { successAlert, errorAlert } from "../Message/SweetAlert"; // Make sure errorAlert is imported
import UserPasswordPopup from "./Popup/UserPasswordPopup";

const BusinessLogin = () => {
  const [show, setShow] = useState(false);
  const Navigate = useNavigate();
  const [buttonvalues, setButtonValues] = useState("Login Now");
  const [initialValues, setinitialValues] = useState({
    Username: "",
    password: "",
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: UserLoginSchemas,
      onSubmit: async (values) => {
        const Savedata = {
          Username: values.Username,
          Passwd: values.password,
        };
        setButtonValues("Please Wait...");

        try {
          const response = await postData("Business/Authentication", Savedata);

          if (response.status === "Ok" && response.result) {
            successAlert("Success", "Login Successfully");

            // Save to localStorage
            const {
              businessId,
              userName,
              email,
              finacialId,
              logo,
              banner,
              businessname,
            } = response.result;
            localStorage.setItem("businessId", businessId);
            localStorage.setItem("ShopName", businessname);
            localStorage.setItem("userName", userName);
            localStorage.setItem("email", email);
            localStorage.setItem("FinacialId", finacialId);
            localStorage.setItem("Logo", logo);
            localStorage.setItem("Baner", banner);
            Navigate("/BuesinessDashbord");
          } else {
            if (response.result?.status === "Expiry") {
              localStorage.setItem(
                "BusinessId",
                response.result.data.businessId
              );
              window.location.href = "/User/Package";
            } else {
              errorAlert("Error", "Try again now");
              setButtonValues("Login Now");
            }
          }
        } catch (error) {
          errorAlert("Error", "Something went wrong");
          console.log(error.message);
          setButtonValues("Login Now");
        }
      },
    });

  return (
    <section
      className="h-100 gradient-form mt-5"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-6">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-12">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <video
                        src="./Admin/images/profile.mp4"
                        style={{ width: 185 }}
                      ></video>
                      <h4 className="mt-1 mb-2 pb-1">Your Account Login</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p></p>
                      <div className="form-outline mb-4">
                        <h4 className="form-label" htmlFor="form2Example11">
                          Username
                          <small className="text-danger">
                            *&nbsp;
                            {errors.Username && touched.Username
                              ? errors.Username
                              : null}
                          </small>
                        </h4>
                        <input
                          type="text"
                          id="Username"
                          name="Username"
                          value={values.Username}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="User Name"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <h4 className="form-label" htmlFor="form2Example11">
                          Password
                          <small className="text-danger">
                            *&nbsp;
                            {errors.password && touched.password
                              ? errors.password
                              : null}
                          </small>
                        </h4>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Password"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-12 text-center">
                        <h6>
                          Change or reset your password &nbsp;
                          <Link
                            onClick={() => setShow(true)}
                            className="forget-password-link"  style={{color:"blue"}}
                          >
                            Forget Password
                          </Link>
                        </h6>
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                          disabled={buttonvalues !== "Login Now"}
                        >
                          {buttonvalues !== "Login Now" ? (
                            <b>Please Wait...</b>
                          ) : (
                            "Login Now"
                          )}
                        </button>
                        <h4>
                          Create a new Account &nbsp;
                          <Link to="/Registration" style={{color:"blue"}}>Sign up</Link>
                        </h4>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserPasswordPopup setShow={setShow} show={show} />
    </section>
  );
};

export default BusinessLogin;
