import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { SupplirsSchemas } from '../../schemas';
import { postData } from '../../APIConfig/ConfigAPI';
import { errorAlert, successAlert } from '../../Message/SweetAlert';

const SupplierPopup = (props) => {
  const [buttonValues, setButtonValues] = useState('Save');

  // Function to clear the form
  const cancelForm = () => {
    props.setinitialValues({
      Name: '',
      Contactperson: '',
      Phonenoone: '',
      AlternateNo: '',
      Email: '',
      Bankname: '',
      Holdername: '',
      Accountno: '',
      Ifsc: '',
      Gstno: '',
      Panno: '',
      Addres: '',
    });
    props.setSupplierId(0);
  };

  // Formik for handling form state and submission
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValues,
    validationSchema: SupplirsSchemas,
    onSubmit: async (values, action) => {
      const saveData = {  
         Businessname: values.Name,
         Accountno: values.Accountno,
         Bankname: values.Bankname,
         IFSC: values.Ifsc,
         Accountholdername: values.Holdername,
         GSTNO: values.Gstno,
        PAN: values.Panno,
        Contactno: values.Phonenoone,
        Address: values.Addres,
        Email: values.Email,
        AlternateNo: values.AlternateNo,
        Contactperson: values.Contactperson,
        BusinessId: localStorage.getItem('businessId'),
        SuppId: props.SupplierId,
      };
      console.log(saveData);
      setButtonValues('Please Wait...');
      try {
        const response = await postData(
          props.SupplierId === 0 ? 'Supplier/Insert' : 'Supplier/UpdateData',
          saveData
        );
        if (response.status === 'Ok') {
          console.log(response.result);
          successAlert("Sucess",response.result);
          action.resetForm()
          props.Displaydata();
          props.setShow(false)
          setButtonValues('Save');
        } else {
          errorAlert("Error",response.result);
          setButtonValues('Save');
          console.log(response.result);

        }
      } catch (error) {
        console.log(error);
        errorAlert("Error","Something wrong");
        setButtonValues('Save');
      }
    },
  });

  // Function to show a success toast message
  

  return (
    <>
      <div
        className={props.show ? 'modal show' : 'modal'}
        style={props.show ? { display: 'block' } : null}
        id="SupplieraddModal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Supplier</h4>
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
                <div className="row">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-1">
                        <b>Supplier Name</b>
                        <span className="text-danger">
                          *&nbsp;
                          {errors.Name && touched.Name ? errors.Name : null}
                        </span>
                        <input
                          type="text"
                          id="Name"
                          name="Name"
                          placeholder="Enter supplier name"
                          value={values.Name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-6 mb-1">
                        <b>Contact Person</b>
                        <span className="text-danger">
                          *&nbsp;
                          {errors.Contactperson && touched.Contactperson
                            ? errors.Contactperson
                            : null}
                        </span>
                        <input
                          type="text"
                          id="Contactperson"
                          name="Contactperson"
                          placeholder="Contact person name"
                          value={values.Contactperson}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-6 mb-1">
                        <b>Bank Name</b>
                        <span className="text-danger">
                          *&nbsp;
                          {errors.Bankname && touched.Bankname
                            ? errors.Bankname
                            : null}
                        </span>
                        <input
                          type="text"
                          id="Bankname"
                          name="Bankname"
                          placeholder="Bank name"
                          value={values.Bankname}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-6 mb-1">
                        <b>Account Holder Name</b>
                        <span className="text-danger">
                          *&nbsp;
                          {errors.Holdername && touched.Holdername
                            ? errors.Holdername
                            : null}
                        </span>
                        <input
                          type="text"
                          id="Holdername"
                          name="Holdername"
                          placeholder="Account holder name"
                          value={values.Holdername}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-6 mb-1">
                        <b>Account No</b>
                        <span className="text-danger">
                          *&nbsp;
                          {errors.Accountno && touched.Accountno
                            ? errors.Accountno
                            : null}
                        </span>
                        <input
                          type="text"
                          id="Accountno"
                          name="Accountno"
                          placeholder="0000000000000000"
                          value={values.Accountno}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-6 mb-1">
                        <b>IFSC</b>
                        <span className="text-danger">
                          *&nbsp;{errors.Ifsc && touched.Ifsc ? errors.Ifsc : null}
                        </span>
                        <input
                          type="text"
                          id="Ifsc"
                          name="Ifsc"
                          placeholder="XXXX0000000"
                          value={values.Ifsc}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-6 mb-1">
                        <b>GST No</b>
                        <span className="text-danger">
                          *&nbsp;
                          {errors.Gstno && touched.Gstno ? errors.Gstno : null}
                        </span>
                        <input
                          type="text"
                          id="Gstno"
                          name="Gstno"
                          placeholder="00XXXXX0000X0X0"
                          value={values.Gstno}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-6 mb-1">
                        <b>PAN No</b>
                        <span className="text-danger">
                          *&nbsp;
                          {errors.Panno && touched.Panno ? errors.Panno : null}
                        </span>
                        <input
                          type="text"
                          id="Panno"
                          name="Panno"
                          placeholder="XXXXX0000X"
                          value={values.Panno}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-4 mb-1">
                        <b>Contact No</b>
                        <span className="text-danger">
                          *&nbsp;
                          {errors.Phonenoone && touched.Phonenoone
                            ? errors.Phonenoone
                            : null}
                        </span>
                        <input
                          type="text"
                          id="Phonenoone"
                          name="Phonenoone"
                          placeholder="0000000000"
                          value={values.Phonenoone}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-4 mb-1">
                        <b>Alternate No</b>
                        <span className="text-danger">
                          *&nbsp;
                          {errors.AlternateNo && touched.AlternateNo
                            ? errors.AlternateNo
                            : null}
                        </span>
                        <input
                          type="text"
                          id="AlternateNo"
                          name="AlternateNo"
                          placeholder="0000000000"
                          value={values.AlternateNo}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-4 mb-1">
                        <b>Email </b>
                        <span className="text-danger">
                          *&nbsp;
                          {errors.Email && touched.Email ? errors.Email : null}
                        </span>
                        <input
                          type="email"
                          id="Email"
                          name="Email"
                          placeholder="Xxx00@email.com"
                          value={values.Email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="col-md-12 mb-1">
                        <b>Address</b>
                        <span className="text-danger">
                          *&nbsp;
                          {errors.Addres && touched.Addres ? errors.Addres : null}
                        </span>
                        <textarea
                          id="Addres"
                          name="Addres"
                          placeholder="Enter address..."
                          value={values.Addres}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="form-control"
                        ></textarea>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={buttonValues !== 'Save'}
                        >
                          {buttonValues !== 'Save' ? <b>Please Wait...</b> : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>cancelForm()}
                          className="btn btn-danger"
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          onClick={() => props.setShow(false)}
                          className="btn btn-default"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.show ? <div className="modal-backdrop show" /> : null}
    </>
  );
};

export default SupplierPopup;
