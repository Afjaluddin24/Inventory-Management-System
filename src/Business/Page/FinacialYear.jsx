import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FinalcialYearPopup from "../Popup/FinalcialYearPopup";
import { getData } from "../../APIConfig/ConfigAPI";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { errorAlert,confirmationAlert } from "../../Message/SweetAlert";

function FinacialYear() {
  const [show, setShow] = useState(false);
  const [initialValues, setinitialValues] = useState({
    Name: "",
  });

  const [finacial, setfinacial] = useState([]);

  const finacialyearDitals = async () => {
    try {
      const response = await getData("FeyearsControler/Display");
      setfinacial(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  const [financialYearId, setfinancialYearId] = useState(0);
  const updateDetals = async (Id) => {
    try {
      const response = await getData("FeyearsControler/Display/" + Id);
      if (response.status == "Ok") {
        const data = response.result;
        console.log(response.result.name);
        setinitialValues({
          Name: data.name,
        });
        setfinancialYearId(data.financialYearId);
        setShow(true);
      } else {
        alert(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const iconEdit = (data) => {
    return (
      <button
        onClick={() => updateDetals(data.financialYearId)}
        className="btn  btn-circle btn-shadow btn-primary text-center btn-lg m-1"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
    );
  };

  const Delete = async (Id) => {
    const Confirm = await confirmationAlert('are you sure to delete');
    if (Confirm) {
      try {
        const response = await getData("FeyearsControler/Delete/" + Id);
        if (response.status == "Ok") {
          errorAlert("Delete","Delete Successfuly");
          finacialyearDitals();
        } else {
          console.log(response.result);
        }
      } catch (error) {
        console.log(error);
         errorAlert("Error","Something wrong");
      }
    }
  };

  const iconDelete = (data) => {
    return (
      <button
        onClick={() => Delete(data.financialYearId)}
        className="btn  btn-circle btn-shadow btn-danger text-center btn-lg m-1"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    );
  };

  useEffect(() => {
    finacialyearDitals();
  }, []);
  return (
    <div className="page-wrapper">
      <div className="col-12">
        <div className="portlet">
          <div className="portlet-head mb-4">
            <div className="portlet-title">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h2 className="page-title-text">Finacial Year</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/BuesinessDashbord">Home</Link>
                      </li>
                      <li>Finacial Year</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="row">
              <div className="col-sm-6 mb-4">
                <div className="breadcrumbs">
                  <button
                    type="button"
                    id="openPopup"
                    className="btn btn-primary"
                    onClick={() => setShow(true)}
                  >
                    Finacial Year
                  </button>
                  <FinalcialYearPopup
                    finacialyearDitals={finacialyearDitals}
                    financialYearId={financialYearId}
                    setfinancialYearId={setfinancialYearId}
                    show={show}
                    setShow={setShow}
                    initialValues={initialValues}
                    setinitialValues={setinitialValues}
                  />
                </div>
              </div>
            </div>
          </div>
          <DataTable
            value={finacial}
            removableSort
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column field="financialYearId" header="#" sortable />
            <Column field="name" header="Finacial Year" sortable />
            <Column
              style={{
                textAlign: "center",
                color: "red",
                fontSize: "25px",
                width: "50px",
              }}
              body={iconDelete}
            ></Column>
            <Column
              style={{
                textAlign: "center",
                color: "blue",
                fontSize: "25px",
                width: "50px",
              }}
              body={iconEdit}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
}
export default FinacialYear;
