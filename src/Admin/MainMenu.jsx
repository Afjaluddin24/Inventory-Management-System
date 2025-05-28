import { getData, postData } from "../APIConfig/ConfigAPI";
import React, { useEffect, useState } from "react";

export default function MainMenu() {
  const [DetalsCount,setDetalsCount] = useState(0);
  const CountDetals =  async() =>{
    try {
      const response = await getData("Desbord/SupplierCount/" + localStorage.getItem("UserId"));
      setDetalsCount(response.result);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() =>{
  CountDetals()
},[])
  return (
    <div className="page-wrapper">
      <div className="page-title">
        <div className="row align-items-center">
          <div className="col-sm-6">
            <h2 className="page-title-text">Hello,{localStorage.getItem("Fullname")}!</h2>
          </div>
          <div className="col-sm-6 text-right">
            <div className="breadcrumbs">
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Page Body */}
      <div className="page-body">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <div className="dashboard-stat bg-info">
              <div className="content">
                <h4>{DetalsCount.package}</h4> <span>Packeges</span>
              </div>
              <div className="icon">
              <img src="../Admin/Desbord/Pacakeg.png" alt="Packeges" style={{ width: "150px", height: "100px" }}/>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="dashboard-stat bg-primary">
              <div className="content">
                <h4>{DetalsCount.user}</h4> <span>User</span>
              </div>
              <div className="icon">
              <img src="../Admin/Desbord/User.png" alt="Packeges" style={{ width: "150px", height: "100px" }}/>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="dashboard-stat bg-danger">
              <div className="content">
                <h4>{DetalsCount.user}</h4> <span>Payment</span>
              </div>
              <div className="icon">
              <img src="../Admin/Desbord/Payment.png" alt="Packeges" style={{ width: "150px", height: "100px" }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
