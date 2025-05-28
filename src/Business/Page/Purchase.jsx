import React, { useEffect, useState } from "react";
import PurchasePopup from "../Popup/PurchasePopup";
import { getData } from "../../APIConfig/ConfigAPI";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { errorAlert } from "../../Message/SweetAlert";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker

const Purchase = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [show, setShow] = useState(false);
  const [Purchasedeatil, setPurchasedeatil] = useState([]);
  const [initialValues, setinitialValues] = useState({
    Billdate: "",
    BillNo: "",
    GSTValue: "",
    GSTAmount: "",
    GrossAmount: "",
    GrandAmount: "",
    NoticePeriod: "",
    SupplierId: "",
    Note: "",
  });
  const [startDate, setStartDate] = useState(null); // State for From Date
  const [endDate, setEndDate] = useState(null); // State for To Date

  const Purchasedate = async () => {
    try {
      const response = await getData("Purchase/PurchaseSublier");
      console.log(response.result);
      setPurchasedeatil(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Purchasedate();
  }, []);

  // const Delete = async (Id) => {
  //   const Confirm = await confirmationAlert('Are you sure you want to delete this item?');
  //   if (Confirm) {
  //     try {
  //       const response = await getData("Purchase/Delete/" + Id);
  //       if (response.status === "Ok") {
  //         errorAlert("Delete", "Deleted Successfully");
  //         console.log(response.result);
  //         Purchasedate();
  //       } else {
  //         alert(response.result);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // const iconTrash = (data) => {
  //   return (
  //     <button
  //       onClick={() => Delete(data.purchaseId)}
  //       className="btn btn-circle btn-shadow btn-danger text-center btn-lg m-1"
  //     >
  //       <FontAwesomeIcon icon={faTrash} />
  //     </button>
  //   );
  // };

  const [PurchaseId, setgetpurchaseId] = useState(0);

  const Purchasedetail = async (Id) => {
    try {
      const response = await getData("Purchase/Display/" + Id);
      if (response.status === "Ok") {
        const Data = response.result;
        setinitialValues({
          PurchaseId: Data.purchaseId,
          Billdate: Data.billDate,
          BillNo: Data.billNo,
          GSTValue: Data.gstValue,
          GSTAmount: Data.grandAmount,
          GrossAmount: Data.grossAmount,
          GrandAmount: Data.grandAmount,
          NoticePeriod: Data.noticePeriod,
          SupplierId: Data.supplierId,
          Note: Data.note,
        });
        setgetpurchaseId(Data.purchaseId);
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
        onClick={() => Purchasedetail(data.purchaseId)}
        className="btn btn-circle btn-shadow btn-primary text-center btn-lg m-1"
      >
        <i className="fas fa-edit"></i>
      </button>
    );
  };

  const handleFilter = () => {
    let filteredData = [...Purchasedeatil];

    if (startDate) {
      filteredData = filteredData.filter((item) => new Date(item.billDate) >= startDate);
    }

    if (endDate) {
      filteredData = filteredData.filter((item) => new Date(item.billDate) <= endDate);
    }

    setPurchasedeatil(filteredData);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="col-12">
          <div className="portlet">
            <div className="portlet-head">
              <div className="portlet-title">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <h2 className="page-title-text">Purchase</h2>
                  </div>
                  <div className="col-sm-6 text-right">
                    <div className="breadcrumbs">
                      <ul>
                        <li>
                          <a href="#">Home</a>
                        </li>
                        <li>Purchase</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-4">
              <div className="row">
                <div className="col-sm-4">
                  <input
                    type="text"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>
                <div className="col-sm-3">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                    placeholderText="dd-MM-yyyy"
                  />
                </div>
                <div className="col-sm-3">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                    placeholderText="dd-MM-yyyy"
                  />
                </div>
                <div className="col-md-2">
                  <button type="button" className="btn btn-info" onClick={handleFilter}>
                    Filter
                  </button>
                </div>
                <div className="col-sm-12 mb-3 text-right">
                  <div className="breadcrumbs">
                    <button
                      type="button"
                      id="openPopup"
                      className="btn btn-primary"
                      onClick={() => setShow(true)}
                    >
                      Add Purchase
                    </button>
                    <PurchasePopup
                      show={show}
                      setShow={setShow}
                      initialValues={initialValues}
                      setinitialValues={setinitialValues}
                      PurchaseId={PurchaseId}
                      setgetpurchaseId={setgetpurchaseId}
                      Purchasedate={Purchasedate}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DataTable
              value={Purchasedeatil}
              removableSort
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              globalFilter={globalFilter} // To apply the search query globally
            >
              <Column field="billNo" header="Bill No" sortable></Column>
              <Column field="businessname" header="Supplier"></Column>
              <Column field="note" header="Note" sortable></Column>
              <Column
                field="grandAmount"
                header="Gross(₹)"
                body={(rowData) => {
                  const value = rowData.grossAmount;
                  if (value === null || value === undefined) {
                    return "₹ 0.00";
                  }
                  return `₹ ${value.toLocaleString("en-IN")}`;
                }}
              />
              <Column field="gstValue" header="GST (%)"></Column>
              <Column
                field="gstAmount"
                header="GST(₹)"
                body={(rowData) => {
                  const value = rowData.gstAmount;
                  if (value === null || value === undefined) {
                    return "₹ 0.00";
                  }
                  return `₹ ${value.toLocaleString("en-IN")}`;
                }}
              />
              <Column
                field="grandAmount"
                header="Grand(₹)"
                body={(rowData) => {
                  const value = rowData.grandAmount;
                  if (value === null || value === undefined) {
                    return "₹ 0.00";
                  }
                  return `₹ ${value.toLocaleString("en-IN")}`;
                }}
              />
              <Column
                header="Bill Date"
                body={(rowData) => {
                  const formatDate = rowData.billDate
                    ? new Date(rowData.billDate).toLocaleDateString("en-GB") // Correctly format as dd/mm/yyyy
                    : "N/A"; // Default if no billDate
                  return <small>{formatDate}</small>;
                }}
              />
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

export default Purchase;
