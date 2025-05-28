import React, { useEffect, useState } from "react";
import { getData } from "../../APIConfig/ConfigAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SupplierPopup from "../Popup/SupplierPopup";
import { errorAlert } from "../../Message/SweetAlert";

const Supplieradd = () => {
  const [show, setShow] = useState(false);

  const [Supplierdisplay, setSupplierdisplay] = useState([]);

  const [SupplierId, setSupplierId] = useState(0);

  const [initialValues, setinitialValues] = useState({
    Name: "",
    Contactperson: "",
    Phonenoone: "",
    AlternateNo: "",
    Email: "",
    Bankname: "",
    Holdername: "",
    Accountno: "",
    Ifsc: "",
    Gstno: "",
    Panno: "",
    Addres: "",
  });

  const Displaydata = async () => {
    try {
      const response = await getData("Supplier/DisplayUser");
      setSupplierdisplay(response.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Displaydata();
  }, []);

  const Supplierdetail = async (Id) => {
    try {
      const response = await getData("Supplier/Display/" + Id);
      if (response.status == "Ok") {
        const Data = response.result;
        console.log(Data);
        setinitialValues({
          SuppId: Data.suppId,
          Name: Data.businessname,
          Contactperson: Data.contactperson,
          Phonenoone: Data.contactno,
          AlternateNo: Data.alternateNo,
          Email: Data.email,
          Bankname: Data.bankname,
          Holdername: Data.accountholdername,
          Accountno: Data.accountno,
          Ifsc: Data.ifsc,
          Gstno: Data.gstno,
          Panno: Data.pan,
          BusinessId: localStorage.getItem("businessId"),
          Addres: Data.address,
        });
        setSupplierId(Data.suppId);
        setShow(true);
      } else {
        console.log(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Deletedata = async (Id) => {
    const Confirm = await confirmationAlert("are you sure to delete");
    if (Confirm) {
      try {
        const response = await getData("Supplier/Delete/" + Id);
        if (response.status == "Ok") {
          errorAlert("Delete", "Delete Successfully");
          Displaydata();
        } else {
          errorAlert("Error", "Something wrong");
        }
      } catch (error) {
        console.log(error);
        errorAlert("Error", "Something wrong");
      }
    }
  };

  // const iconTrash = (data) => {
  //   return (
  //     <button className="btn btn-circle btn-shadow btn-danger btn-lg m-1">
  //       <FontAwesomeIcon
  //         onClick={() => Deletedata(data.suppId)}
  //         icon={faTrash}
  //       />
  //     </button>
  //   );
  // };

  const iconEdit = (data) => {
    return (
      <button className="btn btn-circle btn-shadow btn-primary btn-lg m-1">
        <i class="fas fa-edit" onClick={() => Supplierdetail(data.suppId)}></i>
      </button>
    );
  };

  const [globalFilter, setGlobalFilter] = useState("");
  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="col-12">
          <div className="portlet">
            <div className="portlet-head ">
              <div className="portlet-title">
                <div class="col-12">
                  <div className="row align-items-center">
                    <div className="col-sm-6">
                      <h2 className="page-title-text">Supplier</h2>
                    </div>
                    <div className="col-sm-6 text-right">
                      <div className="breadcrumbs">
                        <ul>
                          <li>
                            <a href="#">Home</a>
                          </li>
                          <li>Supplier</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-4">
              <div className="row">
                <div className="col-sm-6  mb-4">
                  <input
                    type="text"
                    value={globalFilter}
                    onChange={onGlobalFilterChange}
                    className="form-control"
                    placeholder="Keyword Search"
                  />
                </div>
                <div className="col-sm-6 mb-4 text-right">
                  <div className="breadcrumbs">
                    <button
                      type="button"
                      id="openPopup"
                      className="btn btn-primary"
                      onClick={() => setShow(true)}
                    >
                      Show
                    </button>
                    <SupplierPopup
                      SupplierId={SupplierId}
                      Displaydata={Displaydata}
                      setSupplierId={setSupplierId}
                      initialValues={initialValues}
                      setinitialValues={setinitialValues}
                      show={show}
                      setShow={setShow}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DataTable
              value={Supplierdisplay}
              removableSort
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              globalFilter={globalFilter} // Apply the global filter to the table
            >
              <Column field="businessname" sortable header="Supplier Name" />
              <Column field="bankname" sortable header="Bank" />
              <Column
                field="accountholdername"
                sortable
                header="Account Holder Name"
              />
              <Column field="accountno" sortable header="AccountNo" />
              <Column field="contactno" sortable header="ContactNo" />
              <Column field="email" sortable header="Email" />
              <Column field="contactperson" sortable header="Contact Person" />
              {/* <Column
                style={{
                  textAlign: "center",
                  color: "red",
                  fontSize: "25px",
                  width: "50px",
                }}
                body={iconTrash}
              ></Column> */}
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
    </>
  );
};
export default Supplieradd;
