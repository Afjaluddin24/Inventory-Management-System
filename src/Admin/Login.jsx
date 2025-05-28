import { useFormik } from "formik";
import React, { useState } from "react";
import { AdminLoginSchemas } from "../schemas";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { postData } from "../APIConfig/ConfigAPI";
import { errorAlert, successAlert } from "../Message/SweetAlert";


const Login = () => {

  const [Buttonvalues,setButtonvalues] = useState("Login");
  const Navigate = useNavigate(); 
  const initialValues = {
    Username: "",
    password: "",
  };
  var { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: AdminLoginSchemas,
      onSubmit:async (values) => {
        var Savedata = {
          UserName: values.Username,
          Passwd: values.password,
        };
        console.log(Savedata);
        setButtonvalues("Please Wait...");
        try{
          const response = await postData("AdminLogin/Authentication",Savedata)
          if(response.status == "Ok")
          {
            const data = response.result;
            console.log(data);
            successAlert("Success","Login Successfully");
            localStorage.setItem("UserId",data.adminId);
            localStorage.setItem("Username",data.userName);
            localStorage.setItem("Fullname",data.fullname);
            localStorage.setItem("Email",data.email);
            localStorage.setItem("ContacNo",data.contactNo);
            Navigate("/Admin/Home");
          }
          else{
            errorAlert("Error",response.result);
            setButtonvalues("Login");
          }
        }catch(errors){
          console.log(errors.message);
          setButtonvalues("Login");
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
                      <video src="Admin/images/profile.mp4" style={{ width: 185 }} alt="Admin Login"></video>
                      <br/><h4><b>Admin Login</b></h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p></p>
                      <div data-mdb-input-init="" className="form-outline mb-4">
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
                      <div data-mdb-input-init="" className="form-outline mb-4">
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
                          placeholder="Password"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          data-mdb-button-init=""
                          data-mdb-ripple-init=""
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                          disabled={Buttonvalues !== "Login"}
                        >
                          {Buttonvalues !== "Login" ? <span><FontAwesomeIcon icon={faSpinner}/></span>:"Login"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
