import React, { useState } from 'react'
import { useFormik } from 'formik';
import { BusinessregistrationSchemas } from '../schemas';
import { postData } from '../APIConfig/ConfigAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { errorAlert, successAlert } from '../Message/SweetAlert';
import { useNavigate } from 'react-router-dom';

 const BusinessRegistration = () => {
     const Navigate= useNavigate();

     const [Buttonvalues,setButtonvalues] = useState("Save");
      const [initialValues,setinitialValues] =useState({
        Bname:"",
        Oname:"",
        Contactno:"",
        Email:"",
        Gstno:"",
        Username:"",
        Password:"",
        Cpassword:""
      })
      const {values,errors,handleBlur,handleChange,handleSubmit,touched} = useFormik({
          initialValues:initialValues,
          validationSchema:BusinessregistrationSchemas,
          onSubmit:async(values,action) =>{
           var Savedata ={
            Businessname:values.Bname,
            Ownername:values.Oname,
            Contactno:values.Contactno,
            Email:values.Email,
            GSTNO:values.Gstno,
            Username:values.Username,
            Passwd:values.Password,
            FinacialId:1
           }
           console.log(Savedata);
           setButtonvalues("Please Wait....");
           try{
            const response = await postData("Business/Insert",Savedata)
            if(response.status == "Ok")
            {
              console.log(response.result);
              successAlert("Success","Registration Succesfully");
              action.resetForm();
              Navigate('/Login');
              setButtonvalues("Save");
            }
            else{
              errorAlert("Error","Something wrong");
              console.log(response.result);
              setButtonvalues("Save");
            }
           }
           catch(error){
             console.log(error.message);
             errorAlert("Error","Something wrong");
             setButtonvalues("Save");
           }
          },
      })

  return (
    <section className="text-center">
    {/* Background image */}
    <div
      className="p-5 bg-image"
      style={{
        backgroundImage:
          'url("https://mdbootstrap.com/img/new/textures/full/171.jpg")',
        height: 300
      }}
    />
    {/* Background image */}
    <div className="col-md-8 m-auto">
    <div
      className="card shadow-5-strong bg-body-tertiary"
      style={{ marginTop: "-100px", backdropFilter: "blur(30px)" }}
    >
      <div className="card-body">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-10">
            <h2 className="fw-bold mb-5">Sign up now</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
               
                <div className="col-md-12 text-left">
                    <b>Business Name</b><span className='text-danger'>*&nbsp;{errors.Bname && touched.Bname ? errors.Bname:null}</span>
                    <input type="text" name="Bname" id="Bname" value={values.Bname} onBlur={handleBlur} onChange={handleChange} className='form-control'/>
                </div>
                <div className="col-md-6 text-left">
                    <b>Owner Name</b><span className='text-danger'>*&nbsp;{errors.Oname && touched.Oname ? errors.Oname:null}</span>
                    <input type="text" name="Oname" id="Oname" value={values.Oname} onBlur={handleBlur} onChange={handleChange} className='form-control'/>
                </div>
                <div className="col-md-6 text-left">
                    <b>Contact No</b><span className='text-danger'>*&nbsp;{errors.Contactno && touched.Contactno ? errors.Contactno:null}</span>
                    <input type="text" name="Contactno" id="Contactno" value={values.Contactno} onBlur={handleBlur} onChange={handleChange} className='form-control'/>
                </div>
                <div className="col-md-6 mb-2 text-left">
                    <b>Email</b><span className='text-danger'>*&nbsp;{errors.Email && touched.Email ? errors.Email:null}</span>
                    <input type="email" name="Email" id="Email" value={values.Email} onBlur={handleBlur} onChange={handleChange} className='form-control'/>
                </div>
                <div className="col-md-6 mb-2 text-left">
                    <b>GST No</b><span className='text-danger'>*&nbsp;{errors.Gstno && touched.Gstno ? errors.Gstno:null}</span>
                    <input type="text" name="Gstno" id="Gstno" value={values.Gstno} onBlur={handleBlur} onChange={handleChange} className='form-control'/>
                </div>
                <div className="col-md-6 mb-2 text-left">
                    <b>User Name</b><span className='text-danger'>*&nbsp;{errors.Username && touched.Username ? errors.Username:null}</span>
                    <input type="text" name="Username" id="Username" value={values.Username} onBlur={handleBlur} onChange={handleChange} className='form-control'/>
                </div>
                <div className="col-md-3 mb-2 text-left">
                    <b>Password</b><span className='text-danger'>*&nbsp;{errors.Password && touched.Password ? errors.Password:null}</span>
                    <input type="password" name="Password" id="Password" value={values.Password} onBlur={handleBlur} onChange={handleChange} className='form-control'/>
                </div>
                <div className="col-md-3 mb-2 text-left">
                    <b>Confirm</b><span className='text-danger'>*&nbsp;{errors.Cpassword && touched.Cpassword ? errors.Cpassword:null}</span>
                    <input type="password" name="Cpassword" id="Cpassword" value={values.Cpassword} onBlur={handleBlur} onChange={handleChange}  className='form-control'/>
                </div>
                <div className="col-md-12 text-right">
                    <button type='submit' disabled={Buttonvalues !== "Save"} className='btn btn-success btn-lg'>{Buttonvalues !== "Save" ? <b>Please Wait....</b> :"Save" }</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
  )
}
export default BusinessRegistration;