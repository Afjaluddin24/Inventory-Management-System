import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useState } from "react";
import { postData } from '../../APIConfig/ConfigAPI';
import { errorAlert, successAlert } from "../../Message/SweetAlert";
import { CategoriesSchemas } from "../../schemas";

const CategoriesPopup = (props) => {
  const [buttonvalues,setbuttonvalues] = useState("Save");
  const Clearform = () =>{
    props.setinitialValues({
      Name:""
    })
    props.setcategoryId(0);
  }
  const { values, errors, handleBlur, handleChange, handleSubmit, touched,resetForm  } = useFormik({
    enableReinitialize:true,
    initialValues: props.initialValues,
    validationSchema:CategoriesSchemas,
    onSubmit: async(values) => {
      const Savedata = {
        Name: values.Name,
        CategoryId:props.categoryId
      };
      setbuttonvalues("Please Wait...")
      try{
        const response = await postData(props.categoryId === 0 ? 'Catgary/Insert' :'Catgary/Update',Savedata);
        if(response.status == "Ok"){
            props.Display();
            successAlert("Sucess","Save Successfully");
            setbuttonvalues("Save");
            Clearform()
            props.setShow(false);
        }
        else{
          errorAlert("Error","Something wrong");
          setbuttonvalues("Save");
        }
      }catch(errors){
        console.log(errors);
        errorAlert("Error","Something wrong");
        setbuttonvalues("Save");
      }
    }
  });

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
              <h4 className="modal-title">Categories</h4>
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
                  <div className="col-md-12 mb-2">
                    <b>Categories Name</b><span className="text-danger">&nbsp;{errors.Name && touched.Name ? errors.Name :null}</span>
                    <span className="text-danger">*
                    </span>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      className="form-control"
                      value={values.Name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="col-md-12">
                    <button type="submit" disabled={buttonvalues !=="Save"} className="btn btn-primary">
                      {buttonvalues !== "Save" ?<b>Please Wait</b>:"Save"}
                    </button>&nbsp;&nbsp;
                    <button type="button" onClick={() => Clearform()} className="btn btn-danger">
                      Clear
                    </button>&nbsp;&nbsp;
                    <button type="button" onClick={() => props.setShow(false)} className="btn btn-dark">
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

export default CategoriesPopup;
