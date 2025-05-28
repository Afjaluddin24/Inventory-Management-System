import React, { useEffect, useState } from "react";
import CategoriesPopup from "../Popup/CategoriesPopup";
import { getData } from "../../APIConfig/ConfigAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  successAlert,
  confirmationAlert,
  errorAlert,
} from "../../Message/SweetAlert";
import { Link } from "react-router-dom";

function Categories() {
  const [show, setShow] = useState(false);
  const [initialValues, setinitialValues] = useState({
    Name: "",
    CategoryId: "",
  });
  const [Categories, setCategories] = useState([]);

  const Display = async () => {
    try {
      const response = await getData("Catgary/Display");
      setCategories(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  const Delete = async (Id) => {
    const Confirm = await confirmationAlert("are you sure to delete");
    if (Confirm) {
      try {
        const response = await getData("Catgary/Delete/" + Id);
        if (response.status === "Ok") {
          errorAlert("Delete", "Delete Successfuly");
          Display();
        } else {
          errorAlert("Error", "Something wrong");
        }
      } catch (error) {
        console.log(error);
        errorAlert("Error", "Something wrong");
      }
    }
  };
  const iconDelete = (data) => {
    return (
      <button
        onClick={() => Delete(data.categoryId)}
        className="btn  btn-circle btn-shadow btn-danger text-center btn-lg m-1"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    );
  };

  const [categoryId, setcategoryId] = useState(0);

  const Displaydata = async (Id) => {
    try {
      const response = await getData("Catgary/Display/" + Id);
      if (response.status == "Ok") {
        const data = response.result;
        console.log(data);
        setinitialValues({
          Name: data.name,
          CategoryId: data.categoryId,
        });
        setcategoryId(data.categoryId);
        setShow(true);
      } else {
        console.log(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const iconEdit = (data) => {
    return (
      <button
        onClick={() => Displaydata(data.categoryId)}
        className="btn  btn-circle btn-shadow btn-primary text-center btn-lg m-1"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
    );
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
                  <h2 className="page-title-text">Categories</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <Link to="/BuesinessDashbord">Home</Link>
                      </li>
                      <li>Categories</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <button
              className="btn btn-primary"
              id="openPopup"
              onClick={() => setShow(true)}
            >
              Add Garment
            </button>
            <CategoriesPopup
              show={show}
              setShow={setShow}
              categoryId={categoryId}
              setcategoryId={setcategoryId}
              Display={Display}
              initialValues={initialValues}
              setinitialValues={setinitialValues}
            />
          </div>
          <DataTable
            value={Categories}
            removableSort
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column field="name" header="Category Name" sortable />
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

export default Categories;
