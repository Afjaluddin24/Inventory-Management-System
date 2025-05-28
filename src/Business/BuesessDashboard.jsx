import React, { useEffect, useState } from "react";
import { getData } from "../APIConfig/ConfigAPI";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import PieChartBrand from "./Chart/PieChartBrand";

// Register the necessary chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const BuesessDashboard = () => {
  const [Countdata, setCountdata] = useState({});
  const [salesData, setSalesData] = useState([]); // State to store sales data

  // Fetch dashboard data
  const DesbordTotal = async () => {
    try {
      const response = await getData(
        "Desbord/SupplierCount/" + localStorage.getItem("businessId")
      );
      setCountdata(response.result); // Set dashboard count data
      console.log("Dashboard Data:", response.result);
    } catch (error) {
      console.log("Error fetching dashboard data:", error);
    }
  };

  // Fetch sales data for the Pie chart
  const fetchSalesData = async () => {
    try {
      const response = await getData(
        "Desbord/SupplierCount/" + localStorage.getItem("businessId")
      ); // Replace with your actual endpoint
      if (response && response.result) {
        setSalesData(response.result); // Set the sales data (items sold)
        console.log("Sales Data:", response.result);
      }
    } catch (error) {
      console.log("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    DesbordTotal();
    fetchSalesData(); // Fetch sales data on component mount
  }, []);

  // Prepare data for Pie chart
  const pieChartData = {
    labels: salesData.length > 0 ? salesData.map((item) => item.fullName) : [], // Item names as labels
    datasets: [
      {
        data:
          salesData.length > 0
            ? salesData.map((item) => item.totalQtySold)
            : [], // Data (quantity sold)
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF", // Colors for each segment
        ],
      },
    ],
  };

  return (
    <div className="page-wrapper">
      <div className="page-title">
        <div className="row align-items-center">
          <div className="col-sm-6">
            <h2 className="page-title-text">
              <h1>Dashboard</h1>
            </h2>
          </div>
          <div className="col-sm-6 text-right">
            <div className="breadcrumbs">
              <ul>
                <li>
                  <Link to="/BuesinessDashbord">Home</Link>
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
            <div className="dashboard-stat bg-danger">
              <div className="content">
                <h4>{Countdata.supliers}</h4>
                <span>SUPPLIER</span>
              </div>
              <div className="icon">
                <img
                  src="./Admin/Desbord/supplier.png"
                  alt="Supplier"
                  style={{ width: "150px", height: "100px" }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="dashboard-stat bg-primary">
              <div className="content">
                <h4>{Countdata.stock}</h4> <span>STOCK</span>
              </div>
              <div className="icon">
                <img
                  src="./Admin/Desbord/Stock.png"
                  alt="Stock"
                  style={{ width: "150px", height: "100px" }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="dashboard-stat color-success">
              <div className="content">
                <h4>{Countdata.invoice}</h4> <span>CUSTOMER</span>
              </div>
              <div className="icon">
                <img
                  src="./Admin/Desbord/image.png"
                  alt="Customer"
                  style={{ width: "150px", height: "100px" }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="dashboard-stat bg-warning">
              <div className="content">
                <h4>
                  {(() => {
                    const value = Countdata.purchases;
                    if (value === null || value === undefined) {
                      return "₹ 0.00";
                    }
                    return `₹ ${value.toLocaleString("en-IN")}`;
                  })()}
                </h4>{" "}
                <span>PURCHASE</span>
              </div>
              <div className="icon">
                <img
                  src="./Admin/Desbord/pupprubi.png"
                  alt="Purchase"
                  style={{ width: "150px", height: "100px" }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="dashboard-stat bg-info">
              <div className="content">
                <h4>
                  {(() => {
                    const value = Countdata.stockCost;
                    if (value === null || value === undefined) {
                      return "₹ 0.00";
                    }
                    return `₹ ${value.toLocaleString("en-IN")}`;
                  })()}
                </h4>
                <span>GARMENT</span>
              </div>
              <div className="icon">
                <img
                  src="./Admin/Desbord/mani.png"
                  alt="GarnAmount"
                  style={{ width: "150px", height: "100px" }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="dashboard-stat bg-dark">
              <div className="content">
                <h4>
                  {(() => {
                    const value = Countdata.invoicePayment;
                    if (value === null || value === undefined) {
                      return "₹ 0.00";
                    }
                    return `₹ ${value.toLocaleString("en-IN")}`;
                  })()}
                </h4>{" "}
                <span>SALES</span>
              </div>
              <div className="icon">
                <img
                  src="./Admin/Desbord/Payment.png"
                  alt="Customer"
                  style={{ width: "150px", height: "100px" }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="panel panel-default">
              <div className="panel-head">
                <div className="panel-title">
                  <div className="panel-title-text">Sales</div>
                </div>
              </div>
              <div
                className="panel-body"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <PieChartBrand />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuesessDashboard;
