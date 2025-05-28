import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
 const  CustomerDetalsPopup = (props) => {
    
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
                  <h4 className="modal-title">User Detals</h4>
                  <button
                    type="button"
                    onClick={() => props.setShow(false)}
                    className="btn-close"
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
                <div className="card-body">
                  <table className='table table-border'>
                     <tr>
                        <th>Business Name</th>
                        <td>Ok</td>
                     </tr>
                     <tr>
                        <th>Owner Name</th>
                        <td>Ok</td>
                     </tr>
                     <tr>
                        <th>Name</th>
                        <td>Ok</td>
                     </tr>
                     <tr>
                        <th>Bank detals</th>
                        <td>Ok</td>
                     </tr>
                     <tr>
                       <th>Contact Detals</th>
                       <td>Ok</td>
                     </tr>
                     <tr>
                       <th>Address</th>
                       <td>Ok</td>
                     </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {props.show ? <div className="modal-backdrop show" /> : null}
        </>
  )
}
export default CustomerDetalsPopup;