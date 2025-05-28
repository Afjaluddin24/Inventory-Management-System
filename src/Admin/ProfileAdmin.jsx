import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminProfilSchemas } from '../schemas';
import { getData, postData } from '../APIConfig/ConfigAPI';
import { errorAlert, successAlert } from '../Message/SweetAlert';

function ProfileAdmin() {
  const [ButtonValue,setButtonValue] = useState("Update");
  const [initialValues, setInitialValues] = useState({
    UserName: "",
    Fullname: "",
    ContactNo: "",
    Email: ""
  });

  const [loading, setLoading] = useState(true); // Loading state

  const getDetails = async () => {
    try {
      const response = await getData("AdminLogin/Display/" + localStorage.getItem("UserId"));
      if (response.status === "Ok") {
        const data = response.result;
        console.log("Fetched Data:", data); 
        setInitialValues({
          UserName: data.userName,
          Fullname: data.fullname,
          ContactNo: data.contactNo, 
          Email: data.email 
        });
        setLoading(false); 
      } else {
        console.log(response.result);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false on error
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: AdminProfilSchemas,
    onSubmit: async(values) => {
       const Savedata ={
        AdminId:localStorage.getItem("UserId"),
        UserName:values.UserName,
        Fullname:values.Fullname,
        ContactNo:values.ContactNo,
        Email:values.Email
       }
       setButtonValue("Please Wait...");
       try {
         const response = await  postData("AdminLogin/Update",Savedata);
         if(response.status == "Ok")
         {
             successAlert("Success",response.result);
             setButtonValue("Update");
         }
         else{
            console.log(response.result);
            errorAlert("Error",response.result);
            setButtonValue("Update");
         }
       } catch (error) {
        console.log(error)
        setButtonValue("Update");
       }
    }
  });

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="col-12">
          <div className="portlet">
            <div className="portlet-head mb-4">
              <div className="portlet-title">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <h2 className="page-title-text">Admin Profile</h2>
                  </div>
                  <div className="col-sm-6 text-right">
                    <div className="breadcrumbs">
                      <ul>
                        <li>
                          <Link to="/Admin/Home">Home</Link>
                        </li>
                        <li>Profile</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-wrapper">
        <div className="page-title">
          <div className="row">
            <div className="col-lg-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="user-avtar">
                    {/* User avatar */}
                  </div>
                  <div className="user-details text-center pt-3">
                    <h2>{localStorage.getItem("Fullname")}</h2>
                    <p>
                      <i className="icon-envelope" />{localStorage.getItem("Email")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="panel panel-default">
                <div className="panel-head">
                  <div className="panel-title">
                    <span className="panel-title-text">Admin details</span>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6 mt-3">
                        <b>User Name</b>
                        <span className='text-danger'>
                          &nbsp;*{errors.UserName && touched.UserName ? errors.UserName : null}
                        </span>
                        <input
                          type="text"
                          value={values.UserName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder='User Name'
                          name="UserName"
                          id="UserName"
                          className='form-control'
                        />
                      </div>
                      <div className="col-md-6 mt-3">
                        <b>Full Name</b>
                        <span className='text-danger'>
                          &nbsp;*{errors.Fullname && touched.Fullname ? errors.Fullname : null}
                        </span>
                        <input
                          type="text"
                          placeholder='Full Name'
                          name="Fullname"
                          value={values.Fullname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="Fullname"
                          className='form-control'
                        />
                      </div>
                      <div className="col-md-6">
                        <b>Email</b>
                        <span className='text-danger'>
                          &nbsp;*{errors.Email && touched.Email ? errors.Email : null}
                        </span>
                        <input
                          type="email"
                          placeholder='Email'
                          name="Email"
                          value={values.Email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="Email"
                          className='form-control'
                        />
                      </div>
                      <div className="col-md-6">
                        <b>Contact No</b>
                        <span className='text-danger'>
                          &nbsp;*{errors.ContactNo && touched.ContactNo ? errors.ContactNo : null}
                        </span>
                        <input
                          type="text"
                          placeholder='Contact No'
                          name="ContactNo"
                          value={values.ContactNo}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="ContactNo"
                          className='form-control'
                        />
                      </div>
                      <div className="col-md-12 mb-2">
                        <button type="submit" disabled={ButtonValue !=="Update"} className='btn btn-primary btn-lg'>
                          {ButtonValue !== "Update" ? <b>Please Wait...</b>:"Update"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileAdmin;
