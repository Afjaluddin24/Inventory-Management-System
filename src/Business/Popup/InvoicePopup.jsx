import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import { getData } from "../../APIConfig/ConfigAPI";

const InvoicePopup = (props) => {
  const [StockDispaly, setStockDispaly] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [GarmentDetail, setGarmentDetail] = useState({});

  

  const calculateExclusiveGST = (totalPrice, gstRate) => {
    // Calculate exclusive GST price
    const exclusiveGST = totalPrice / (1 + gstRate);
    
    // Calculate GST amount
    const gstAmount = totalPrice - exclusiveGST;
  
    return {
      exclusiveGST: exclusiveGST.toFixed(2),  // rounded to two decimal places
      gstAmount: gstAmount.toFixed(2)         // rounded to two decimal places
    };
  }

  const Displaygarment = async (Id) => {
    const detail = StockDispaly.find(o => o.garmentsId == Id);
    setGarmentDetail(detail);
    console.log(detail);
    const gstValues = calculateExclusiveGST(detail.price, 6);
  
    // Check if the garment is already in the invoice details
    const existingItemIndex = props.invoiceDetail.findIndex(item => item.GarmentsId === detail.garmentsId);
  
    if (existingItemIndex !== -1) {
      // If it exists, update the quantity and total price
      const updatedInvoiceDetail = [...props.invoiceDetail];
      updatedInvoiceDetail[existingItemIndex].Qty += 1;  // Increase the quantity by 1
      updatedInvoiceDetail[existingItemIndex].Total = updatedInvoiceDetail[existingItemIndex].Qty * detail.price;  // Update total
  
      props.setInvoiceDetail(updatedInvoiceDetail);
    } else {
      // If it doesn't exist, add a new item to the invoice
      const reqData = {
        GarmentsId: detail.garmentsId,
        Rate: parseFloat(gstValues.gstAmount).toFixed(2),
        GST: 6,
        GSTValue: gstValues.exclusiveGST,
        Amount: detail.price.toFixed(2),
        Qty: 1,
        Total: detail.price,
        Name: detail.name,
        GarmentName: detail.garmentName,
        Brand: detail.brand,
        Color: detail.color,
        Size: detail.size,
        Stock: detail.stock
      };
      props.setInvoiceDetail([...props.invoiceDetail, reqData]);
    }
  };
  const Customerstock = async () => {
    try {
      const response = await getData("Garment/StockGarment/" + localStorage.getItem("businessId"));
      setStockDispaly(response.result);
    } catch (error) {
      console.log(error);
    }
  };


  const iconEdit = (data) => {
    return (
      <button
        onClick={() => Displaygarment(data.garmentsId)}
        className="btn  btn-circle btn-shadow btn-primary text-center btn-lg m-1"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    );
  };

  useEffect(() => {
    Customerstock();
  }, [StockDispaly]);

  return (
    <>
      <div
        className={props.show ? "modal show" : "modal"}
        style={props.show ? { display: "block" } : null}
        id="SupplieraddModal"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Invoice</h4>
              <button
                type="button"
                onClick={() => props.setShow(false)}
                className="btn-close"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <div className="card-body">
              <div className="col-md-12">
                <input
                  type="text"
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="form-control"
                  placeholder="Search..."
                />
              </div>

              <DataTable
                value={StockDispaly}
                removableSort
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                globalFilter={globalFilter}
              >
                <Column field="brand" header="Brand"></Column>
                <Column field="garmentName" header="Garments"></Column>
                <Column field="color" header="Color"></Column>
                <Column field="size" header="Size"></Column>
                <Column field="name" header="Category"></Column>
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
      </div>
      {props.show ? <div className="modal-backdrop show" /> : null}
    </>
  );
};

export default InvoicePopup;
