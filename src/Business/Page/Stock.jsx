import React, { useEffect, useState } from "react";
import StockPopup from "../Popup/StockPopup";
import { getData, postData } from "../../APIConfig/ConfigAPI";
import Select from "react-select";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { errorAlert,confirmationAlert } from "../../Message/SweetAlert";

const Stock = () => {
  const [show, setShow] = useState(false);
  const [PutpurchaseId, setPutPurchaseId] = useState(0);
  const [purchaseDetail, setPurchaseDetail] = useState([]);
  const [stockDisplayGarment, setStockDisplayGarment] = useState([]);
  const [initialValues, setInitialValues] = useState({
    GarmentName: "",
    Description: "",
    Price: "",
    Size: "",
    Color: "",
    PurchaseId: "",
    CategoryId: "",
    Brand: "",
    DateAdded: "",
    LastUpdated: "",
    CostPrice: "",
    Stock: "",
    NameModal:""
  });
  const [globalFilter, setGlobalFilter] = useState(""); // State for global search
  const [filteredStock, setFilteredStock] = useState([]); // Stock data after filter applied
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const fetchPurchaseData = async () => {
    try {
      const response = await getData("Purchase/PurchaseSublier");
      setPurchaseDetail(response.result);
    } catch (error) {
      console.error("Error fetching purchase details:", error);
    }
  };

  const stockDisplay = async () => {
    try {
      const response = await getData("Garment/DisplayGarment");
      setStockDisplayGarment(response.result);
      setFilteredStock(response.result); // Initially set filteredStock to all stock data
    } catch (error) {
      console.log(error);
    }
  };

  const Delete = async (Id) => {
    const Confirm = await confirmationAlert('are you sure to delete');
    if (Confirm) {
      try {
        const response = await getData("Garment/Delete/" + Id);
        if (response.status == "Ok") {
          errorAlert()
          stockDisplay();
          alert(response.result);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [garmentId, setGarmentId] = useState(0);

  const Stockdisplay = async (Id) => {
    try {
      const response = await getData("Garment/Display/" + Id);
      if (response.status == "Ok") {
        const data = response.result;
        setInitialValues({
          GarmentName: data.garmentName,
          Description: data.description,
          Price: data.price,
          Size: data.size,
          Color: data.color,
          PurchaseId: data.purchaseId,
          CategoryId: data.categoryId,
          Brand: data.brand,
          DateAdded: data.dateAdded,
          LastUpdated: data.lastUpdated,
          CostPrice: data.costPrice,
          Stock: data.stock,
        });
        setPutPurchaseId(data.purchaseId);
        setGarmentId(data.garmentsId);
        setShow(true);
        console.log(data.garmentsId);
      } else {
        console.log(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const iconTrash = (data) => {
    return (
      <button
        onClick={() => Delete(data.garmentsId)}
        className="btn  btn-circle btn-shadow btn-danger text-center btn-lg m-1"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    );
  };

  const iconEdit = (data) => {
    return (
      <button
        onClick={() => Stockdisplay(data.garmentsId)}
        className="btn  btn-circle btn-shadow btn-primary text-center btn-lg m-1"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
    );
  };
  useEffect(() => {
    fetchPurchaseData();
    stockDisplay();
  }, []);

  const purchaseOptions = purchaseDetail.map((item) => ({
    value: item.purchaseId,
    label: item.billNo,
    description: item.businessname,
    billDate: item.billDate,
  }));

  const handleSelectChange = (selectedOption) => {
    console.log("Selected option:", selectedOption);
    setSelectedPurchase(selectedOption); // Store selected purchase
    setInitialValues({
      ...initialValues,
      PurchaseId: selectedOption.value,
    });
    setPutPurchaseId(selectedOption.value);

    // Filter stock based on selected purchaseId
    if (selectedOption) {
      const filteredData = stockDisplayGarment.filter(
        (garment) =>
          garment.purchaseId === selectedOption.value ||
          garment.billNo === selectedOption.label
      );
      setFilteredStock(filteredData);
    } else {
      setFilteredStock(stockDisplayGarment); // If no option is selected, display all stock
    }

    setGlobalFilter(""); // Reset global filter when purchase is selected
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: "10px",
      backgroundColor: state.isSelected
        ? "#f0f0f0"
        : state.isFocused
        ? "#e0e0e0"
        : "#ffffff",
      color: "#333333",
      "&:hover": {
        backgroundColor: "#dcdcdc",
        color: "#333",
      },
    }),
  };

  return (
    <div className="page-wrapper">
      <div className="page-title">
        <div className="row align-items-center">
          <div className="col-sm-6">
            <h2 className="page-title-text">Stock</h2>
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

      <div className="col-12">
        <div className="portlet portlet-primary">
          <div className="portlet-head">
            <div className="portlet-title">
              <div className="col-md-12">
                <Select
                  options={purchaseOptions}
                  value={selectedPurchase}
                  onChange={handleSelectChange}
                  placeholder="Select a purchase"
                  getOptionLabel={(e) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{e.label}</span>
                      <span>
                        {e.description} - {formatDate(e.billDate)}
                      </span>
                    </div>
                  )}
                  styles={customStyles}
                />
              </div>
            </div>
          </div>
          <div className="portlet-wrapper">
            <div className="portlet-body">
              <button
                type="button"
                id="openPopup"
                className="btn btn-primary"
                onClick={() => setShow(true)}
              >
                Add Stock
              </button>
              <StockPopup
                show={show}
                setShow={setShow}
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                PutpurchaseId={PutpurchaseId}
                setPutPurchaseId={setPutPurchaseId}
                stockDisplay={stockDisplay}
                garmentId={garmentId}
                setGarmentId={setGarmentId}
              />
            </div>
          </div>
          <DataTable
            value={filteredStock} // Display filtered stock
            removableSort
            tableStyle={{ minWidth: "50rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            globalFilter={globalFilter} // Apply global filter to the DataTable
          > 
          <Column field="nameModal" header="#" sortable></Column>
            <Column field="billNo" header="Bill No" sortable></Column>
            <Column
              header="Bill Date"
              body={(rowData) => {
                const formatDate = rowData.billDate
                  ? new Date(rowData.billDate).toLocaleDateString("en-GB")
                  : "N/A";
                return <small>{formatDate}</small>;
              }}
            />
            <Column field="brand" header="Brand" sortable></Column>
            <Column field="garmentName" header="Garments"></Column>
            <Column field="color" header="Color" ></Column>
            <Column field="size" header="Size"></Column>
            <Column field="name" header="Category"></Column>
            <Column field="stock" header="Stock" ></Column>
            <Column
                field=""
                header="Price(₹)"
                body={(rowData) => {
                  const value = rowData.price;
                  if (value === null || value === undefined) {
                    return "₹ 0.00";
                  }
                  return `₹ ${value.toLocaleString("en-IN")}`;
                }}
              />
              <Column
                field=""
                header="Cost(₹)"
                body={(rowData) => {
                  const value = rowData.costPrice;
                  if (value === null || value === undefined) {
                    return "₹ 0.00";
                  }
                  return `₹ ${value.toLocaleString("en-IN")}`;
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
            ></Column>
            <Column
              style={{
                textAlign: "center",
                color: "blue",
                fontSize: "25px",
                width: "50px",
              }}
              body={iconEdit}
            ></Column> */}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Stock;
