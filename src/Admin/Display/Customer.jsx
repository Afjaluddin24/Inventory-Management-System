import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../APIConfig/ConfigAPI";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import CustomerDetalsPopup from "../Popup/CustomerDetalsPopup";

export default function Customer() {
  const [show, setShow] = useState(false);
  const [Userdetail, setUserdetail] = useState([]);
  const [Busiessid, setBusiessid] = useState(0);

  const Userdisplay = async () => {
    try {
      const response = await getData("Business/Display");
      setUserdetail(response.result);
      console.log(response.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Userdisplay();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="col-12">
        <div className="portlet">
          <div className="portlet-head mb-4">
            <div className="portlet-title">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h2 className="page-title-text">User</h2>
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
              value={Userdetail}
              removableSort
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
            >
              <Column field="businessname" header="Business Name" sortable />
              <Column field="userName" header="User Name" sortable />
              <Column field="gstno" header="GSTNO" />
              <Column
                header="Buesiness"
                body={(rowData) => (
                  <div>
                    <span>
                      Owner Name: <b>{rowData.ownername}</b>
                    </span>
                    <br />
                    <span>
                      Contact No: <b>{rowData.contactno}</b>
                    </span>
                    <br />
                    <span>
                      Email: <b>{rowData.email}</b>
                    </span>
                    <br />
                  </div>
                )}
              />
              <Column
                header="Bank"
                body={(rowData) => (
                  <div>
                    <span>
                      Bank Name: <b>{rowData.bankname}</b>
                    </span>
                    <br />
                    <span>
                      Account Hoder Name: <b>{rowData.accountholdername}</b>
                    </span>
                    <br />
                    <span>
                      Account No: <b>{rowData.alternateno}</b>
                    </span>
                    <br />
                    <span>
                      IFSC: <b>{rowData.ifsc}</b>
                    </span>
                  </div>
                )}
              />
              <Column
                header="Package"
                body={(rowData) => (
                  <div>
                    <span>
                      Establis date:{" "}
                      <b>
                        {rowData.establisdate
                          ? new Date(rowData.establisdate).toLocaleDateString(
                              "en-GB"
                            )
                          : "N/A"}
                      </b>
                    </span>
                    <br />
                    <span>
                      Expiry date:{" "}
                      <b>
                        {rowData.expirydate
                          ? new Date(rowData.establisdate).toLocaleDateString(
                              "en-GB"
                            )
                          : "N/A"}
                      </b>
                    </span>
                    <br />
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
