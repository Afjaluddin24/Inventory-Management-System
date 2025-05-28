import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { GarmentProductPopupSchemas } from "../../schemas";
import { getData, postData } from "../../APIConfig/ConfigAPI";
import { errorAlert, successAlert } from "../../Message/SweetAlert";

const GarmentProductPopup = (props) => {

  const [categories,setCategories] = useState([]);

  const Clearform = () =>{
    props.setinitialValues({
      GarmentName: "",
      Description: "",
      Price: "", 
      Size: "",
      Color: "",
      CategoryId: "",
      Brand: "",
      DateAdded: ""
     })
     props.setgarmentsId(0);
  }
  const Displaycategories = async() =>{
    try {
      const response = await getData("Catgary/Display");
      setCategories(response.result);
    } catch (error) {
       console.log(error.message);
    }
  }

  useEffect(()=>{
    Displaycategories();
  },[])

  const { values, errors, handleBlur, handleChange, handleSubmit, touched,setFieldValue } =
    useFormik({
      enableReinitialize:true,
      initialValues: props.initialValues,
      validationSchema: GarmentProductPopupSchemas,
      onSubmit:async(values) => {
        const Savedata ={
          GarmentsId:props.garmentsId,
          GarmentName:values.GarmentName,
          Description:values.Description,
          Price:values.Price,
          Size:values.Size,
          Color:values.Color,
          CategoryId:values.CategoryId,
          Brand:values.Brand,
          DateAdded:values.DateAdded
        }
        console.log(Savedata);
        try {
          const response = await postData(props.garmentsId === 0 ? 'Garment/Insert' : 'Garment/Update',Savedata);
          if(response.status = "Ok")
          {
              console.log(response.result);
              successAlert("Sucess","Save Successfully");
              Clearform();
              props.Displaydata();
              props.setShow(false);
          }
          else{
              errorAlert("Error","Something wrong");
          }
        } catch (error) {
          console.log(error);
           errorAlert("Error","Something wrong");
        }
      },
    });

    const setcontentvalues = (fielName, value) => {
      setFieldValue(fielName, value);
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
              <h4 className="modal-title">Garment Details</h4>
              <button
                type="button"
                onClick={() => props.setShow(false)}
                className="btn-close"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="col-md-12 text-left">
                <div className="row">
                <div className="col-md-4 mb-2">
                    <b>Category</b>
                    <span className="text-danger">
                      &nbsp;*{errors.CategoryId && touched.CategoryId ? errors.CategoryId : null}
                    </span>
                    <select name="CategoryId" className="form-control" id="CategoryId" value={values.CategoryId} onBlur={handleBlur}  onChange={(e) =>setcontentvalues("CategoryId",e.target.value)}>
                      <option value="">Selete Category</option>
                      { categories.map((o,index) =>{
                         return <option value={o.categoryId}>{o.name}</option>
                      })}
                    </select>
                  </div>
                  <div className="col-md-4 mb-2">
                    <b>Garment Name</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.GarmentName && touched.GarmentName
                        ? errors.GarmentName
                        : null}
                    </span>
                    <input
                      type="text"
                      value={values.GarmentName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="GarmentName"
                      id="GarmentName"
                      placeholder="Garment Name"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4 mb-2">
                    <b>Brand Name</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Brand && touched.Brand ? errors.Brand : null}
                    </span>
                    <input
                      type="text"
                      value={values.Brand}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Brand"
                      id="Brand"
                      placeholder="Barnd Name"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <b>Size</b>
                    <span className="text-danger">
                      &nbsp;*{errors.Size && touched.Size ? errors.Size : null}
                    </span>
                    <input
                      type="text"
                      value={values.Size}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Size"
                      id="Size"
                      placeholder="Size"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <b>Color</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Color && touched.Color ? errors.Color : null}
                    </span>
                    <input
                      type="text"
                      value={values.Color}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Color"
                      name="Color"
                      id="Color"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <b>Date</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.DateAdded && touched.DateAdded
                        ? errors.DateAdded
                        : null}
                    </span>
                    <input
                      type="date"
                      value={values.DateAdded}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="DateAdded"
                      id="DateAdded"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <b>Price</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Price && touched.Price ? errors.Price : null}
                    </span>
                    <input
                      type="text"
                      value={values.Price}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Price"
                      id="Price"
                      placeholder="₹000"
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-12 mb-2">
                    <b>Description</b>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Description && touched.Description
                        ? errors.Description
                        : null}
                    </span>
                    <textarea
                      value={values.Description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="Description"
                      id="Description"
                      className="form-control"
                    ></textarea>
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                    &nbsp;&nbsp;
                    <button type="button" onClick={() => Clearform()} className="btn btn-danger">
                      Clear
                    </button>&nbsp;&nbsp;
                    <button
                      type="button"
                      onClick={() => props.setShow(false)}
                      className="btn btn-dark"
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
      {props.show ? <div className="modal-backdrop show" /> : null}
    </>
  );
};
export default GarmentProductPopup;
