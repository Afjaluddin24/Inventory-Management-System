import React, { useEffect, useState } from "react";
import CustomarPopup from "../Popup/CustomarPopup";
import { getData } from "../../APIConfig/ConfigAPI";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Customar = () => {
  const [show, setShow] = useState(false);
  const [initialValues, setinitialValues] = useState({
    Customername: "",
    ContactNo: "",
    GSTNO: "",
    Email: "",
    Address: "",
  });

  const [DetalsCustomar, setDetalsCustomar] = useState([]);
  const CustomarDtals = async () => {
    try {
      const response = await getData("Customer/Display");
      if (response.status == "Ok") {
        setDetalsCustomar(response.result);
      } else {
        console.log(response.result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const Delete = async (Id) => {
  //   if (window.confirm("are you sure to delete!")) {
  //     try {
  //       const response = await getData("Customer/Delete/" + Id);
  //       if (response.status == "Ok") {
  //         alert("Delete Successfully");
  //         CustomarDtals();
  //       } else {
  //         alert(response.result);
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  // };

  const [CustomerId, setCustomerId] = useState(0);
  const customerderails = async (Id) => {
    try {
      const response = await getData("Customer/Display/" + Id);
      if (response.status == "Ok") {
        const data = response.result;
        setinitialValues({
          Customername: data.customername,
          ContactNo: data.contactNo,
          GSTNO: data.gstno,
          Email: data.email,
          Address: data.address,
        });
        setCustomerId(data.customerId);
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
        onClick={() => customerderails(data.customerId)}
        className="btn  btn-circle btn-shadow btn-primary text-center btn-lg m-1"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
    );
  };

  // const iconDelete = (data) => {
  //   return (
  //     <button
  //       onClick={() => Delete(data.customerId)}
  //       className="btn  btn-circle btn-shadow btn-danger text-center btn-lg m-1"
  //     >
  //       {" "}
  //       <FontAwesomeIcon icon={faTrash} />
  //     </button>
  //   );
  // };

  useEffect(() => {
    CustomarDtals();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="col-12">
        <div className="portlet">
          <div className="portlet-head mb-4">
            <div className="portlet-title">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <h2 className="page-title-text">Customar</h2>
                </div>
                <div className="col-sm-6 text-right">
                  <div className="breadcrumbs">
                    <ul>
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>Stock</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <div className="row">
            <div className="col-sm-6  mb-4"></div>
            <div className="col-sm-6 mb-4 text-right">
              <div className="breadcrumbs">
                <button
                  type="button"
                  id="openPopup"
                  className="btn btn-primary"
                  onClick={() => setShow(true)}
                >
                  Add Customar
                </button>
                <CustomarPopup
                  show={show}
                  setShow={setShow}
                  initialValues={initialValues}
                  setinitialValues={setinitialValues}
                  CustomarDtals={CustomarDtals}
                  CustomerId={CustomerId}
                  setCustomerId={setCustomerId}
                />
              </div>
            </div>
            </div>
          </div>
          <DataTable
            value={DetalsCustomar}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="customername" header="Customer"></Column>
            <Column field="contactNo" header="ContactNo"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="gstno" header="GSTNO"></Column>
            <Column field="address" header="Address"></Column>
            <Column body={iconEdit}></Column>
            {/*  <Column body={iconDelete}></Column>*/}
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default Customar;
