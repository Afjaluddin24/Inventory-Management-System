import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getData, postData } from "../../APIConfig/ConfigAPI";
import { useFormik } from "formik";
import { StockSchemas } from "../../schemas";
import { errorAlert, successAlert } from "../../Message/SweetAlert";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import styles for DatePicker

const StockPopup = (props) => {
  const Clearform = () => {
    props.setInitialValues({
      GarmentName: "",
      Description: "",
      Price: "",
      Size: "",
      Color: "",
      PurchaseId: "",
      CategoryId: "",
      Brand: "",
      DateAdded: "",
      LastUpdated: "",
      CostPrice: "",
      Stock: ""
    });
    props.setGarmentId(0);
  };

  const [Buttonvalue, setButtonvalue] = useState("Save");
  const { values, errors, handleBlur, handleChange, handleSubmit, touched, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: props.initialValues,
    validationSchema: StockSchemas,
    onSubmit: async (values) => {
      var Savedata = {
        GarmentsId: props.garmentId,
        GarmentName: values.GarmentName,
        Description: values.Description,
        Price: values.Price,
        Size: values.Size,
        Color: values.Color,
        BusinessId: localStorage.getItem("businessId"),
        PurchaseId: props.PutpurchaseId,
        CategoryId: values.CategoryId,
        Brand: values.Brand,
        DateAdded: values.DateAdded,
        LastUpdated: values.LastUpdated,
        CostPrice: values.CostPrice,
        Stock: values.Stock,
        NameModal: values.NameModal
      };
      console.log(Savedata);
      setButtonvalue("Please Wait....");
      try {
        const response = await postData(props.garmentId ? 'Garment/Insert' : 'Garment/Update', Savedata);
        if (response.status === "Ok") {
          props.stockDisplay();
          successAlert("Success", "Saved Successfully");
          console.log(response.result);
          setButtonvalue("Save");
          props.setShow(false);
        } else {
          errorAlert("Error", "Something went wrong");
          console.log(response.result);
          setButtonvalue("Save");
        }
      } catch (error) {
        console.log(error);
        errorAlert("Error", "Something went wrong");
        setButtonvalue("Save");
      }
    },
  });

  const [categories, setCategories] = useState([]);

  const Displaycategories = async () => {
    try {
      const response = await getData("Catgary/Display");
      setCategories(response.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (props.garmentId !== 0) {
      document.getElementById("CategoryId").value = values.CategoryId;
      document.getElementById("DateAdded").value = values.DateAdded;
      document.getElementById("LastUpdated").value = values.LastUpdated;
    }
    Displaycategories();
  }, []);

  const setcontentvalues = (fieldName, value) => {
    setFieldValue(fieldName, value);
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
              <h4 className="modal-title">Stock</h4>
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
                  <div className="col-md-6">
                    <label htmlFor="categoryId">Category ID</label>{" "}
                    <span className="text-danger">
                      &nbsp;*
                      {errors.CategoryId && touched.CategoryId ? errors.CategoryId : null}
                    </span>
                    <select
                      name="CategoryId"
                      className="form-control"
                      id="CategoryId"
                      value={values.CategoryId}
                      onBlur={handleBlur}
                      onChange={(e) => setcontentvalues("CategoryId", e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {categories.map((o, index) => {
                        return <option key={index} value={o.categoryId}>{o.name}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="garmentName">Garment Name</label>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.GarmentName && touched.GarmentName ? errors.GarmentName : null}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="garmentName"
                      name="GarmentName"
                      placeholder="Enter garment name"
                      value={values.GarmentName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="NameModal">Modal</label>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.NameModal && touched.NameModal ? errors.NameModal : null}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="NameModal"
                      name="NameModal"
                      placeholder="Modal"
                      value={values.NameModal}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="brand">Brand</label>{" "}
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Brand && touched.Brand ? errors.Brand : null}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="brand"
                      name="Brand"
                      placeholder="Enter brand"
                      value={values.Brand}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="description">Description</label>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Description && touched.Description ? errors.Description : null}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="Description"
                      placeholder="Enter description"
                      value={values.Description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="size">Size</label>{" "}
                    <span className="text-danger">
                      &nbsp;*{errors.Size && touched.Size ? errors.Size : null}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="size"
                      name="Size"
                      placeholder="Enter size"
                      value={values.Size}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="color">Color</label>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Color && touched.Color ? errors.Color : null}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="color"
                      name="Color"
                      placeholder="Enter color"
                      value={values.Color}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="Stock">Stock</label>
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Stock && touched.Stock ? errors.Stock : null}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="Stock"
                      name="Stock"
                      placeholder="Enter stock"
                      value={values.Stock}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="price">Price</label>{" "}
                    <span className="text-danger">
                      &nbsp;*
                      {errors.Price && touched.Price ? errors.Price : null}
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="Price"
                      placeholder="Enter price"
                      value={values.Price}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label htmlFor="costPrice">Cost Price</label>{" "}
                    <span className="text-danger">
                      &nbsp;*
                      {errors.CostPrice && touched.CostPrice ? errors.CostPrice : null}
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      id="costPrice"
                      name="CostPrice"
                      placeholder="Enter cost price"
                      value={values.CostPrice}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="DateAdded">Date Added</label>{" "}
                    <span className="text-danger">
                      &nbsp;*
                      {errors.DateAdded && touched.DateAdded ? errors.DateAdded : null}
                    </span><br/>
                    <DatePicker
                      selected={values.DateAdded ? new Date(values.DateAdded) : new Date()} // Default to today's date if no value
                      id="DateAdded"
                      onChange={(date) => {
                        setcontentvalues("DateAdded", date); // Update Formik's value for DateAdded
                      }}
                      dateFormat="dd-MM-yyyy"
                      minDate={new Date()} 
                      maxDate={new Date()}
                      className="form-control"
                      placeholderText="dd-MM-yyyy"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label htmlFor="LastUpdated">Last Updated</label>{" "}
                    <span className="text-danger">
                      &nbsp;*
                      {errors.LastUpdated && touched.LastUpdated ? errors.LastUpdated : null}
                    </span><br/>
                    <DatePicker
                      selected={values.LastUpdated ? new Date(values.LastUpdated) : new Date()} // Default to today's date if no value
                      id="LastUpdated"
                      onChange={(date) => {
                        setcontentvalues("LastUpdated", date); // Update Formik's value for LastUpdated
                      }}
                      dateFormat="dd-MM-yyyy"
                      minDate={new Date()} // Min date is today's date
                      className="form-control"
                      placeholderText="dd-MM-yyyy"
                    />
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary" disabled={Buttonvalue !== "Save"}>
                      {Buttonvalue !== "Save" ? <b>Please Wait....</b> : "Save"}
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
                      className="btn btn-dark"
                      onClick={() => props.setShow(false)}
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

export default StockPopup;
