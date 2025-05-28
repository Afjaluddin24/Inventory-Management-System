import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../../APIConfig/ConfigAPI';
import { DataTable } from 'primereact/datatable'; // Make sure you import DataTable and Column
import { Column } from 'primereact/column';

function DisplayCustomer() {
  const [detalsPackage, setDetalsPackage] = useState([]);
  
  const getPackage = async () => {
    try {
      const response = await getData("Package/UserPacakeg/");
      if (response.status === "Ok") { // Ensure this matches the API response structure
        setDetalsPackage(response.result);
        console.log(response.result);
      } else {
        console.log(response.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Improved error handling
    }
  };

  useEffect(() => {
    getPackage(); 
  }, []);

  return (
    <div className="page-wrapper">
      <div className="col-12">
        <div className="portlet">
          <div className="portlet-head mb-4">
            <div className="portlet-title">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h2 className="page-title-text">Customer List</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/Admin/Home">Home</Link>
                      </li>
                      <li>User</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <DataTable
              value={detalsPackage}
              removableSort
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
              <Column field="packageName" header="Package" sortable />
              <Column
                              field=""
                              header="Package(₹)"
                              body={(rowData) => {
                                const value = rowData.price;
                                if (value === null || value === undefined) {
                                  return "₹ 0.00";
                                }
                                return `₹ ${value.toLocaleString("en-IN")}`;
                              }}
                            />
              <Column field="userName" header="User Name" sortable />
              <Column field="gstno" header="GSTNO" />
              <Column
                header="Business"
                body={(rowData) => (
                  <div>
                    <span>Shop Name: <b>{rowData.businessname}</b></span><br />
                    <span>Owner Name: <b>{rowData.ownername}</b></span><br />
                    <span>Contact No: <b>{rowData.contactno}</b></span><br />
                    <span>Email: <b>{rowData.email}</b></span><br />
                  </div>
                )}
              />
              <Column
                header="Bank"
                body={(rowData) => (
                  <div>
                    <span>Bank Name: <b>{rowData.bankname}</b></span><br />
                    <span>Account Holder Name: <b>{rowData.accountholdername}</b></span><br />
                    <span>Account No: <b>{rowData.accountno}</b></span><br />
                    <span>IFSC: <b>{rowData.ifsc}</b></span>
                  </div>
                )}
              />
              <Column
                header="Package Details"
                body={(rowData) => (
                  <div>
                    <span>Establish date: <b>{rowData.establisdate ? new Date(rowData.establisdate).toLocaleDateString("en-GB") : "N/A"}</b></span><br />
                    <span>Expiry date: <b>{rowData.expirydate ? new Date(rowData.expirydate).toLocaleDateString("en-GB") : "N/A"}</b></span><br />
                  </div>
                )}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayCustomer;
