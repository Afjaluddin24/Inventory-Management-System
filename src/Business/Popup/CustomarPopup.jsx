import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useState } from "react";
import { CustomarSchema } from "../../schemas"; 
import { postData } from "../../APIConfig/ConfigAPI"; 
import { errorAlert, successAlert } from "../../Message/SweetAlert";

const CustomarPopup = (props) => {
  const [Buttonvalue, setButtonvalue] = useState("Save");

  const Clearform = () =>{
    props.setinitialValues({
      Customername: "",
      ContactNo: "",
      GSTNO: "",
      Email: "",
      Address: "",
    })
    props.setCustomerId(0);
  }
  const { values, errors, handleBlur, handleChange, handleSubmit,resetForm, touched, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValues,
    validationSchema: CustomarSchema,
    onSubmit: async (values) => {
      const Savedata = {
          Customername: values.Customername,
          ContactNo: values.ContactNo,  
          GSTNO: values.GSTNO,
          Email: values.Email,
          Address: values.Address,
          BusinessId: localStorage.getItem("businessId"),
          CustomerId: props.CustomerId,
      };
      console.log(Savedata);
      setButtonvalue("Please Wait...");
      try {
          const Path = props.CustomerId === 0 ? 'Customer/Insert' : 'Customer/Update';
          const response = await postData(Path, Savedata);
          if (response.status === "Ok") {
              props.CustomarDtals(); 
              successAlert("Sucess","Save Successfuly");
              resetForm();  
              setButtonvalue("Save");  
              props.setShow(false);     
          } else {
              errorAlert("Error","Something wrong");
              setButtonvalue("Save");   
          }
      } catch (error) {
          console.error("Error: ", error.message); 
          errorAlert("Error","Something wrong");
          setButtonvalue("Save");   
      }
  },
  
  });
  const handleContactNoChange = (e) => {
    const value = e.target.value;
    setFieldValue('ContactNo', value.toString()); 
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
              <h4 className="modal-title">Customar</h4>
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
                <form className="row" onSubmit={handleSubmit}>
                  <div className="col-md-6 mb-2">
                    <b>Customar Name</b>
                    <span className="text-danger">
                      &nbsp;*{errors.Customername && touched.Customername ? errors.Customername : null}
                    </span>
                    <input
                      type="text"
                      name="Customername"
                      id="Customername"
                      value={values.Customername}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Customer Name"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <b>GST No</b>
                    <span className="text-danger">
                      &nbsp;*{errors.GSTNO && touched.GSTNO ? errors.GSTNO : null}
                    </span>
                    <input
                      type="text"
                      name="GSTNO"
                      id="GSTNO"
                      value={values.GSTNO}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="00XXXXX0000XX0"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <b>Contact No</b>
                    <span className="text-danger">
                      &nbsp;*{errors.ContactNo && touched.ContactNo ? errors.ContactNo : null}
                    </span>
                    <input
                      type="text"  
                      name="ContactNo"
                      id="ContactNo"
                      value={values.ContactNo}
                      onBlur={handleBlur}
                      onChange={handleContactNoChange} 
                      className="form-control"
                      placeholder="0000000000"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <b>Email</b>
                    <span className="text-danger">
                      &nbsp;*{errors.Email && touched.Email ? errors.Email : null}
                    </span>
                    <input
                      type="text"
                      name="Email"
                      id="Email"
                      value={values.Email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Xxx0@xyz.com"
                    />
                  </div>
                  <div className="col-md-12 mb-2">
                    <b>Address</b>
                    <span className="text-danger">
                      &nbsp;*{errors.Address && touched.Address ? errors.Address : null}
                    </span>
                    <textarea
                      name="Address"
                      id="Address"
                      value={values.Address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Address..............."
                    ></textarea>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" disabled={Buttonvalue !== "Save"} className="btn btn-primary">
                      {Buttonvalue !== "Save" ? <b>Please Wait...</b> : "Save"}
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => Clearform()}
                    >
                      Clear
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      onClick={() => props.setShow(false)}
                      className="btn btn-dark"
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

export default CustomarPopup;
