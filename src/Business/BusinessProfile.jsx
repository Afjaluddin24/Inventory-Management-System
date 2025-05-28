import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ProfileSchema } from "../schemas";
import { getData, postData } from "../APIConfig/ConfigAPI";
import { errorAlert, successAlert } from "../Message/SweetAlert";

const BusinessProfile = () => {
  let Id = localStorage.getItem("businessId");
  const [ButtonValue, setButtonValue] = useState("Save");
  const [initialValues, setInitialValues] = useState({
    FinacialYearId: "",
    Businessname: "",
    Ownername: "",
    Contactno: "",
    Alternateno: "",
    Email: "",
    Bankname: "",
    Accountno: "",
    IFSC: "",
    Accountholdername: "",
    Address: "",
    UserName: "",
    GSTNO: "",
    PAN: "",
    Logo: "",
    Banner: "",
  });

  const ProfileDetals = async () => {
    try {
      const responseresult = await getData(`Business/Display/${Id}`);
      if (responseresult.status === "Ok") {
        const data = responseresult.result;
        setInitialValues({
          FinacialYearId: data.financialYearId,
          Businessname: data.businessname,
          Ownername: data.ownername,
          Contactno: data.contactno,
          Alternateno: data.alternateno,
          Email: data.email,
          Bankname: data.bankname,
          Accountno: data.accountno,
          IFSC: data.ifsc,
          Accountholdername: data.accountholdername,
          Address: data.address,
          UserName: data.userName,
          GSTNO: data.gstno,
          PAN: data.pan,
          Logo: data.logo,
          Banner: data.banner,
        });
      } else {
        console.log(responseresult.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ProfileDetals();
  }, []);

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: ProfileSchema,
    onSubmit: async (values) => {
      const savedData = {
        BusinessId: Id,
        FinacialId: values.FinacialYearId,
        Businessname: values.Businessname,
        Ownername: values.Ownername,
        Contactno: values.Contactno,
        Alternateno: values.Alternateno.toString(),
        Email: values.Email,
        Bankname: values.Bankname,
        Accountno: values.Accountno.toString(),
        IFSC: values.IFSC,
        Accountholdername: values.Accountholdername,
        Address: values.Address,
        UserName: values.UserName,
        GSTNO: values.GSTNO,
        PAN: values.PAN,
        Logo: values.Logo,
        Banner: values.Banner,
      };
      console.log(savedData);
      setButtonValue("Please Wait...");
      try {
        const response = await postData("Business/Update", savedData);
        if (response.status == "Ok") {
          console.log(response.result);
          successAlert("Success", "Updated Successfully");
          setButtonValue("Save");
        } else {
          console.log(response.result);
          errorAlert("Error", "Try Again");
          setButtonValue("Save");
        }
      } catch (error) {
        console.log(error);
        setButtonValue("Save");
      }
    },
  });

  const [financial, setFinancial] = useState([]);

  const financialYearDetails = async () => {
    try {
      const response = await getData("FeyearsControler/Display");
      setFinancial(response.result);
      console.log(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    financialYearDetails();
  }, []);

  const handleImageChange = (event, fieldName) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1]; // Remove the base64 prefix
        setFieldValue(fieldName, base64);
        console.log("Base64 without prefix:", base64); // Log the base64 string without the prefix
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64)
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="col-12">
          <div className="portlet">
            <div className="portlet-head mb-4">
              <div className="portlet-title">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <h2 className="page-title-text">Business Profile</h2>
                  </div>
                  <div className="col-sm-6 text-right">
                    <div className="breadcrumbs">
                      <ul>
                        <li>
                          <a href="#">Home</a>
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
                    <img
                      className="img-fluid"
                      src={`http://192.168.21.121:2025/Banner/${localStorage.getItem("Baner")}`}
                      alt=""
                    />
                  </div>
                  <div className="user-details text-center pt-3">
                    <h2>{localStorage.getItem("userName")}</h2>
                    <p>
                      <i className="icon-envelope" /> {localStorage.getItem("email")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="panel panel-default">
                <div className="panel-head">
                  <div className="panel-title">
                    <span className="panel-title-text">Personal details</span>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="col-md-12 mt-3">
                  <div className="row">
                    <div className="col-md-12">
                      <b>Financial Year</b>
                      <span className="text-danger">
                        &nbsp;*
                        {errors.FinacialYearId && touched.FinacialYearId
                          ? errors.FinacialYearId
                          : null}
                      </span>
                      <select
                        name="FinacialYearId"
                        id="FinacialYearId"
                        value={values.FinacialYearId}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">Select Financial Year</option>
                        {financial.map((o, index) => (
                          <option key={index} value={o.financialYearId}>
                            {o.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <b>User Name</b>
                      <span className="text-danger">
                        &nbsp;*
                        {errors.UserName && touched.UserName
                          ? errors.UserName
                          : null}
                      </span>
                      <input
                        type="text"
                        placeholder="User Name"
                        name="UserName"
                        id="UserName"
                        value={values.UserName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-4">
                      <b>Business Name</b>
                      <span className="text-danger">
                        &nbsp;*
                        {errors.Businessname && touched.Businessname
                          ? errors.Businessname
                          : null}
                      </span>
                      <input
                        type="text"
                        placeholder="Business Name"
                        name="Businessname"
                        value={values.Businessname}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="Businessname"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-4">
                      <b>Owner Name</b>
                      <span className="text-danger">
                        &nbsp;*
                        {errors.Ownername && touched.Ownername
                          ? errors.Ownername
                          : null}
                      </span>
                      <input
                        type="text"
                        placeholder="Owner Name"
                        name="Ownername"
                        value={values.Ownername}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="Ownername"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-3">
                      <b>Contact No</b>
                      <span className="text-danger">
                        &nbsp;*
                        {errors.Contactno && touched.Contactno
                          ? errors.Contactno
                          : null}
                      </span>
                      <input
                        type="number"
                        placeholder="Contact No"
                        name="Contactno"
                        value={values.Contactno}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="Contactno"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-3">
                      <b>Alternate No</b>
                      <input
                        type="number"
                        placeholder="Alternate No"
                        name="Alternateno"
                        id="Alternateno"
                        value={values.Alternateno}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-3">
                      <b>Email</b>
                      <span className="text-danger">
                        &nbsp;*
                        {errors.Email && touched.Email ? errors.Email : null}
                      </span>
                      <input
                        type="email"
                        placeholder="Email"
                        name="Email"
                        value={values.Email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="Email"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-3">
                      <b>PAN</b>
                      <span className="text-danger">
                        &nbsp;*
                        {errors.PAN && touched.PAN ? errors.PAN : null}
                      </span>
                      <input
                        type="PAN"
                        placeholder="PAN"
                        name="PAN"
                        value={values.PAN}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="PAN"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <b>Bank Name</b>
                      <span className="text-danger">
                        &nbsp;*
                        {errors.Bankname && touched.Bankname
                          ? errors.Bankname
                          : null}
                      </span>
                      <input
                        type="text"
                        placeholder="Bank Name"
                        name="Bankname"
                        id="Bankname"
                        value={values.Bankname}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <b>Account holder Name</b>
                      <span className="text-danger">
                        &nbsp;*
                        {errors.Accountholdername && touched.Accountholdername
                          ? errors.Accountholdername
                          : null}
                      </span>
                      <input
                        type="text"
                        placeholder="Account holder name"
                        name="Accountholdername"
                        id="Accountholdername"
                        value={values.Accountholdername}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <b>Accountno</b>
                      <span className="text-danger">
                        &nbsp;*
                        {errors.Accountno && touched.Accountno
                          ? errors.Accountno
                          : null}
                      </span>
                      <input
                        type="number"
                        placeholder="Account No"
                        name="Accountno"
                        id="Accountno"
                        value={values.Accountno}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <b>IFSC Code</b>
                      <span className="text-danger">
                        &nbsp;*
                        {errors.IFSC && touched.IFSC ? errors.IFSC : null}
                      </span>
                      <input
                        type="text"
                        placeholder="IFSC"
                        name="IFSC"
                        id="IFSC"
                        value={values.IFSC}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <b>Logo</b>
                      <input
                        type="file"
                        name="Logo"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => handleImageChange(e, "Logo")}
                      />
                    </div>
                    <div className="col-md-6">
                      <b>Banner</b>
                      <input
                        type="file"
                        name="Banner"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "Banner")}
                      />
                    </div>
                    <div className="col-md-12">
                      <b>Address</b>
                      <span className="text-danger">
                        &nbsp;*
                        {errors.Address && touched.Address ? errors.Address : null}
                      </span>
                      <textarea
                        name="Address"
                        id="Address"
                        value={values.Address}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group text-left">
                    <button type="submit" className="btn btn-primary btn-lg mb-3">
                      {ButtonValue}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessProfile;
