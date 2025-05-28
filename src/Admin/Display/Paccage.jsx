import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getData } from "../../APIConfig/ConfigAPI";
import PackagePopup from "../Popup/PackagePopup";
import {
  confirmationAlert,
  errorAlert,
  successAlert,
} from "../../Message/SweetAlert";
import { Link } from "react-router-dom";

const Paccage = () => {
  const [show, setShow] = useState(false);
  const [Displaydata, setDisplaydata] = useState([]);

  const [initialValues, setinitialValues] = useState({
    Name: "",
    Description: "",
    Status: "",
    Month: "",
    GST: "",
    Price: "",
  });

  const Display = async () => {
    try {
      const response = await getData("Package/DisplayPackage");
      console.log(response);
      setDisplaydata(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  const [PackageId, setPackageId] = useState(0);

  const PackageDetail = async (Id) => {
    try {
      const response = await getData("Package/DisplayPac/" + Id);
      if (response.status == "Ok") {
        const data = response.result;
        console.log(data);
        setinitialValues({
          Name: data.packageName,
          Description: data.description,
          Status: data.status,
          Month: data.month,
          GST: data.gst,
          Price: data.price,
        });
        setPackageId(data.packageId);
        setShow(true);
      } else {
        console.log(response.result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const Delate = async (Id) => {
    const confirm = await confirmationAlert(
      "Warnin",
      "are you went to delete!"
    );
    if (confirm) {
      try {
        const response = await getData("Package/Delete/" + Id);
        if (response.status == "Ok") {
          errorAlert("Delete", response.result);
          Display();
        } else {
          errorAlert("Delete", response.result);
        }
      } catch (error) {
        errorAlert("Delete", error);
      }
    }
  };

  useEffect(() => {
    Display();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="col-12">
        <div className="portlet">
          <div className="portlet-head mb-4">
            <div className="portlet-title">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h2 className="page-title-text">Package</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/Admin/Home">Home</Link>
                      </li>
                      <li>Package</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 text-right mt-3">
            <button
              className="btn btn-primary"
              id="openPopup"
              onClick={() => setShow(true)}
            >
              Add Package
            </button>
            <PackagePopup
              show={show}
              setShow={setShow}
              PackageId={PackageId}
              setPackageId={setPackageId}
              initialValues={initialValues}
              setinitialValues={setinitialValues}
              Display={Display}
            />
            <div className="col-md-12 mt-4">
              <div className="row">
                {Displaydata.map((o, index) => {
                  return (
                    <div className="col-md-4 mb-2">
                      <div className="pricing01">
                        <div className="pricing-title">
                          <img
                            src="../Admin/images/Packeg.png"
                            style={{ width: "200px" }}
                            alt=""
                          />
                          <h2>{o.packageName}</h2>
                          <small>status is&nbsp;{o.status}</small>
                        </div>
                        <div className="pricing-box">
                          <span className="price">
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(o.price)}
                          </span>
                        </div>
                        <div className="pricing-body">
                          <p>{o.description}</p>
                        </div>
                        <h2>Month Package&nbsp;{o.month}</h2>
                        <div className="pricing-footer">
                          <button className="btn btn-primary btn-pill">
                            <FontAwesomeIcon
                              icon={faEdit}
                              onClick={() => PackageDetail(o.packageId)}
                              style={{ fontSize: "20px" }}
                            />
                          </button>
                          &nbsp;&nbsp;
                          <button
                            onClick={() => Delate(o.packageId)}
                            className="btn btn-primary btn-pill"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ fontSize: "20px" }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Paccage;
