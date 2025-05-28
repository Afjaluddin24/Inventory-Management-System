import React, { useEffect, useState } from "react";
import { getData, postData } from "../APIConfig/ConfigAPI";
import { errorAlert, successAlert } from "../Message/SweetAlert";
import { useNavigate } from "react-router-dom";

function ListPaceg() {
  const [Displaydata, setDisplaydata] = useState([]);
  const Navigate= useNavigate("");

  const Display = async () => {
    try {
      const response = await getData("Package/DisplayPackage");
      console.log(response);
      setDisplaydata(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  const PackageDetail = (detail) => {
    var options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Razorpay test key
      amount: ((detail.price * 100)), // Amount in paise (₹100)
      currency: "INR",
      name: "APRO DHANDHO",
      description: "Payment Transection",
      handler: async function (response) {
       
        
        const requestJSON = {
            BusinessId: localStorage.getItem("BusinessId"),
            PackageMasterId: detail.packageId,
            Amount: detail.price,
            TransactionNo: response.razorpay_payment_id
        };
        console.log(requestJSON);
        try {
            const response = await postData("SubPackage/Insert", requestJSON);
            if(response.status == "Ok")
            {
                successAlert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                Navigate("/Login");
            }
            else
            {
                errorAlert("Error",response.result);
                console.log("Afjal",response.result);
            }
        } 
        catch (error) 
        {
            errorAlert("Error",response.result);
        }
        
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp = new Razorpay(options);
    rzp.open();
  };



  useEffect(() => {
    Display();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", marginTop: "50px" }}
    >
      <div className="col-md-11">
        <div className="card">
          <div className="card-header text-center bg-primary">
            <h3 className="text-white">Packages</h3>
          </div>
          <div className="card-body">
            <div className="col-md-12 text-right m-auto mt-3">
              <div className="col-md-12 mt-4">
                <div className="row">
                  {Displaydata.length > 0 ? (
                    Displaydata.map((o, index) => (
                      <div className="col-md-4 mb-2" key={index}>
                        <div className="pricing01">
                          <div className="pricing-title">
                            <img
                              src="../Admin/images/Packeg.png"
                              style={{ width: "200px" }}
                              alt=""
                            />
                            <h2>{o.packageName}</h2>
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
                          <h2>Month Package {o.month}</h2>
                          <div className="pricing-footer">
                            <button
                              onClick={() => PackageDetail(o)}
                              className="btn btn-primary btn-pill"
                            >
                              Pay Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No packages available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPaceg;
