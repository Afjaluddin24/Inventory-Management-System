import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { FinalicayearSchema } from '../../schemas';
import { postData } from '../../APIConfig/ConfigAPI';
import { errorAlert, successAlert } from '../../Message/SweetAlert';

 const FinalcialYearPopup = (props) => {

  const [Buttonvalue,setButtonvalue] = useState("Save");

  const clearform = () =>{
    props.setinitialValues({
      Name:""
    })

  }

  const {values,errors,handleBlur,handleChange,handleSubmit,touched} = useFormik({
    enableReinitialize:true,
    initialValues:props.initialValues,
    validationSchema:FinalicayearSchema,
    onSubmit:async(values) =>{
      const Savedata ={
        financialYearId:props.financialYearId,
        Name:values.Name
      }
      console.log(Savedata);
      setButtonvalue("Please Wait.....");
      try {
        const response = await postData(props.financialYearId === 0 ? "FeyearsControler/Insert" : "FeyearsControler/Update",Savedata);
        console.log(response.result);
        if(response.status == "Ok")
        {
           successAlert("Sucess","Save Successfuly");
           console.log(response.result);
           clearform();
           props.finacialyearDitals();
           setButtonvalue("Save");
        }
        else{
            errorAlert("Error","Something wrong");
           console.log(response.result);
           setButtonvalue("Save");
        }
      } catch (error) {
        console.log(error);
         errorAlert("Error","Something wrong");
        setButtonvalue("Save");
      }
    }
  })
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
              <h4 className="modal-title">Finacial Year</h4>
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
                    <b>Finalcial Year</b><span className="text-danger">&nbsp;*{errors.Name && touched.Name ? errors.Name:null}</span>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      value={values.Name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-12">
                    <button type="submit" disabled={Buttonvalue !== "Save"} className="btn btn-primary">
                      {Buttonvalue !== "Save" ?<b>Please Wait.....</b>:"Save"}
                    </button>&nbsp;&nbsp;
                    <button type="button"  className="btn btn-danger">
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
  )
}
export default FinalcialYearPopup;