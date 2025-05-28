import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useState } from "react";
import { PackagePopupSchemas } from "../../schemas";
import { postData } from "../../APIConfig/ConfigAPI";
import { errorAlert, successAlert } from "../../Message/SweetAlert";

const PackagePopup = (props) => {

  const [ButtonValues, setButtonValues] = useState("Save");

 
  const { values, errors, handleBlur, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
    enableReinitialize:true,
    initialValues:props.initialValues,
    validationSchema: PackagePopupSchemas,
    onSubmit: async(values,action) => {
      const Savedata ={
        PackageId:props.PackageId,
        PackageName: values.Name,
        Description: values.Description,
        Status: values.Status,
        Month:values.Month,
        GST: values.GST,
        Price:values.Price
      }
      console.log(Savedata);
      setButtonValues("Please Wait...");
      try{
         const response = await postData(props.PackageId === 0 ? 'Package/InsertPackage' :'Package/UpdatePac',Savedata);
         if(response.status == "Ok")
         {
            successAlert("Success",response.result);
            action.resetForm();
            setButtonValues("Save");
            props.setShow(false);
            props.Display();
         }
         else{
           errorAlert("Error",response.result);
           setButtonValues("Save");
         }
      }
      catch(error){
         console.log(error.message);
         errorAlert("Error",error);
         setButtonValues("Save");
      }
    },
  });


  const setCheckValue = (value) => {
    if (value) {
      setFieldValue("Status", "Active");
    } else {
      setFieldValue("Status", "Not-Active");
    }
  };

  return (
    <>
      <div className={props.show ? "modal show" : "modal"} style={props.show ? { display: "block" } : null} id="SupplieraddModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Package</h4>
              <button type="button" onClick={() => props.setShow(false)} className="btn-close">
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <div className="card-body">
              <div className="col-md-12 text-left">
                <form onSubmit={handleSubmit} className="row">
                  {/* Package Name */}
                  <div className="col-md-6 mb-2">
                    <b>Package Name</b><span className="text-danger">&nbsp;*{errors.Name && touched.Name ? errors.Name : null}</span>
                    <input 
                      type="text" 
                      name="Name" 
                      id="Name" 
                      value={values.Name} 
                      onBlur={handleBlur} 
                      onChange={handleChange} 
                      className="form-control" 
                    />
                  </div>

                  {/* Description */}
                  <div className="col-md-6 mb-2">
                    <b>Description</b><span className="text-danger">&nbsp;*{errors.Description && touched.Description ? errors.Description : null}</span>
                    <input 
                      type="text" 
                      name="Description" 
                      id="Description" 
                      value={values.Description}
                      onBlur={handleBlur} 
                      onChange={handleChange} 
                      className="form-control" 
                    />
                  </div>

                  {/* Status Checkbox */}
                  <div className="col-md-6">
                    <b>Status</b>
                    <div className="form-control">
                      <label>
                        <input 
                          type="checkbox" 
                          name="Status" 
                          id="Status" 
                          onChange={(e) => setCheckValue(e.target.checked)} 
                        />
                        &nbsp; is Active
                      </label>
                    </div>
                  </div>

                  {/* Month */}
                  <div className="col-md-6 mb-2">
                    <b>Month</b><span className="text-danger">&nbsp;*{errors.Month && touched.Month ? errors.Month : null}</span>
                    <input 
                      type="number" 
                      name="Month" 
                      id="Month" 
                      value={values.Month} 
                      onBlur={handleBlur} 
                      onChange={handleChange} 
                      className="form-control" 
                    />
                  </div>

                  {/* GST */}
                  <div className="col-md-6 mb-2">
                    <b>GST</b><span className="text-danger">&nbsp;*{errors.GST && touched.GST ? errors.GST : null}</span>
                    <input 
                      type="number" 
                      name="GST" 
                      id="GST" 
                      value={values.GST} 
                      onBlur={handleBlur} 
                      onChange={handleChange} 
                      className="form-control" 
                    />
                  </div>

                  {/* Price */}
                  <div className="col-md-6 mb-2">
                    <b>Price</b><span className="text-danger">&nbsp;*{errors.Price && touched.Price ? errors.Price : null}</span>
                    <input 
                      type="number" 
                      name="Price" 
                      id="Price" 
                      value={values.Price} 
                      onBlur={handleBlur} 
                      onChange={handleChange} 
                      className="form-control" 
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="col-md-12">
                    <button type="submit" disabled={ButtonValues !== "Save"} className="btn btn-primary">{ButtonValues !== "Save"? <b>Please Wait...</b>:"Save"}</button>&nbsp;&nbsp;
                    <button type="reset" onClick={() => alert(props.PackageId)} className="btn btn-danger">Clear</button>
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

export default PackagePopup;
