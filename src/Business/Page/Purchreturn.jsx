import React from 'react'

 function Purchreturn() {
  return (
    <div className="page-wrapper">
    <div className="page-title">
      <div className="row align-items-center">
        <div className="col-sm-6">
          <h2 className="page-title-text">Purchereturn</h2>
        </div>
        <div className="col-sm-6 text-right">
          <div className="breadcrumbs">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>Purchereturn</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    {/* Page Body */}
    <div className="page-body">
      <div className="row">
        <div className="col-sm-6  mb-4">
          <h2 className="page-title-text"></h2>
        </div>
        <div className="col-sm-6 mb-4 text-right">
          <div className="breadcrumbs">
            <button
              className="btn btn-primary btn-pill btn-shadow"
              data-toggle="modal"
              data-target="#basicModal"
            >
              Add Purchereturn
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      className="modal fade"
      id="basicModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="basicModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="basicModalLabel">
              Purche Return 
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form  className="row">
              <div className="col-md-12 text-left">
                <label>
                  Name
                  <small className="text-danger">*&nbsp;</small>
                </label>
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 text-left">
                <label>
                  Price
                  <small className="text-danger">*&nbsp;</small>
                </label>
                <input
                  type="number"
                  name="Price"
                  id="Price"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 text-left">
                <label>
                  Month*
                  <small className="text-danger">*&nbsp;</small>
                </label>
                <input
                  type="number"
                  name="Month"
                  id="Month"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 text-left">
                <label>
                  Status
                  <small className="text-danger">*&nbsp;</small>
                </label>
              </div>
              <div className="col-md-6 text-left">
                <label>
                  GST Percentage
                  <small className="text-danger">*&nbsp;</small>
                </label>
                <input
                  type="number"
                  name="Gst"
                  id="Gst"
                  className="form-control"
                />
              </div>
              <div className="col-md-12 text-left">
                <label>
                  Description
                  <small className="text-danger">*&nbsp;</small>
                </label>
                <input
                  type="text"
                  name="Description"
                  id="Description"
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="submit"
                  className="btn btn-default"
                  data-dismiss="modal"
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
  )
}
export default Purchreturn;