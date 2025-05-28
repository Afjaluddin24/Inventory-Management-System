import React from "react";
import {
  faBagShopping,
  faBalanceScale,
  faCalendarAlt,
  faFile,
  faFileInvoice,
  faStore,
  faRecycle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function BusinessSidMenu() {
  return (
    <div className="menu-wrapper">
      <div className="menu">
        <ul>
          <li className="menu-title">Main</li>
          <li className="has-sub active">
            <a>
              <i className="icon-screen-desktop"  style={{fontSize:"20px"}}/>
              <span>DASHBOARD</span>
              <i className="arrow rotate" />
            </a>
            <ul className="sub-menu">
              <li>
                <Link to="/BuesinessDashbord"> Dashboard</Link>
              </li>
            </ul>
          </li>
          <li className="menu-title">Components</li>
          <li className="has-sub">
          <Link to="/FinacialYear">
              &nbsp;<span>
                <FontAwesomeIcon icon={faCalendarAlt}  style={{fontSize:"20px"}} />
                &nbsp;&nbsp;Finacial Year
              </span>
              <i className="arrow" />
              </Link>
          </li>
          <li className="has-sub">
            <a>
              <span>
                <FontAwesomeIcon icon={faStore} style={{fontSize:"20px"}} />
                &nbsp; SUPPLIER
              </span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <Link to="/Supplier">Supplier</Link>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <a>
              &nbsp;<span>
                <FontAwesomeIcon icon={faBagShopping}  style={{fontSize:"20px"}} />
                &nbsp; PURCHASE
              </span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <Link to="/Purchase">Purchase</Link>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <a>
              <span>
                <FontAwesomeIcon icon={faBalanceScale}  style={{fontSize:"20px"}} />
                &nbsp;STOCK/GARMENT
              </span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <Link to="/Categories">Categories</Link>
              </li>
              <li>
                <Link to="/Stock">Stock</Link>
              </li>
              <li>
                <Link to="/AvailableStock">Avelibal stock</Link>
              </li>
            </ul>
          </li>
          <li className="has-sub">
          <a>
              &nbsp;<span>
                <FontAwesomeIcon icon={faFileInvoice}  style={{fontSize:"20px"}} />
                &nbsp; INVOICE
              </span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <Link to="/Invoice">
                  <span>Invoice</span>
                </Link>
              </li>
              <li>
                <Link to="/DisplayInvoice">
                  <span>Invoice Details</span>
                </Link>
              </li> 
              <li>
                <Link to="/SalseReturn">
                  <span>Salse Return</span>
                </Link>
              </li>
              <li>
                <Link to="/CustomerDues">
                  <span>Return Dues</span>
                </Link>
              </li>
              <li>
                <Link to="/CustomerPayment">
                  <span>Customer Payment</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <a>
            &nbsp;<span>
                <FontAwesomeIcon icon={faFile} className="icon-layers"  style={{fontSize:"20px"}} />
                &nbsp; Report
              </span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
            <li>
                <Link to="/ReportSuppler">Suppler Report</Link>
              </li>
              <li>
                <Link to="/ReportPurchase">Purchase Report</Link>
              </li>
              <li>
                <Link to="/ReportStock">Stock Report</Link>
              </li>
              <li>
                <Link to="/ReportInvoie">Invoic Report</Link>
              </li>
              <li>
                <Link to="/ReportCustomerInstallment">Invoic Installment Report</Link>
              </li>
              <li>
                <Link to="/ReportStockSeal">Stock Seal Report</Link>
              </li>
            </ul>
          </li>
           <li className="has-sub">
            <a>
            <FontAwesomeIcon icon={faRecycle} style={{ fontSize: "20px" }} />

              &nbsp;<span>Sales Return</span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <Link to="/DisplaySalesReturn">
                  <span>Salse Detals</span>
                </Link>
              </li>
            </ul>
          {/* </li>
          <li className="has-sub">
            <a>
              <i className="icon-compass" />
              <span>Menu Level</span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <a>
                  <span>Second Level</span>
                </a>
              </li>
              <li className="has-sub">
                <a>
                  <span>Second Level Child</span>
                  <i className="arrow" />
                </a>
                <ul className="sub-menu">
                  <li>
                    <a>
                      <span>Third Level</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>Third Level</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="has-sub">
                <a>
                  <span>Second Level Child</span>
                  <i className="arrow" />
                </a>
                <ul className="sub-menu">
                  <li>
                    <a>
                      <span>Third Level</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>Third Level</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <a>
              <i className="icon-envelope-letter" />
              <span>Mail Box</span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="mailbox-main.html">
                  <span>Mail Box</span>
                </a>
              </li>
              <li>
                <a href="mailbox-compose.html">
                  <span>Compose Mail</span>
                </a>
              </li>
              <li>
                <a href="mailbox-details.html">
                  <span>Mail Detail</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <a>
              <i className="icon-emotsmile" />
              <span>Timeline</span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="timeline-1.html">
                  <span>Timeline 1</span>
                </a>
              </li>
              <li>
                <a href="timeline-2.html">
                  <span>Timeline 2</span>
                </a>
              </li>
              <li>
                <a href="timeline-3.html">
                  <span>Timeline 3</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <a>
              <i className="icon-people" />
              <span>User</span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="user-grid.html">
                  <span>Users</span>
                </a>
              </li>
              <li>
                <a href="user-details.html">
                  <span>User Details</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="pricing-table.html">
              <i className="icon-calculator" />
              <span>Pricing Table</span>
            </a>
          </li>
          <li>
            <a href="invoice.html">
              <i className="icon-wallet" />
              <span>Invoice</span>
            </a>
          </li>
          <li>
            <a href="faq.html">
              <i className="icon-plus" />
              <span>Faq</span>
            </a>
          </li>
          <li className="has-sub">
            <a>
              <i className="icon-compass" />
              <span>Custom Pages</span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="login-1.html">
                  <span>Login 1</span>
                </a>
              </li>
              <li>
                <a href="login-2.html">
                  <span>Login 2</span>
                </a>
              </li>
              <li>
                <a href="error-403.html">
                  <span>Error 403</span>
                </a>
              </li>
              <li>
                <a href="error-404.html">
                  <span>Error 404</span>
                </a>
              </li>
              <li>
                <a href="error-503.html">
                  <span>Error 503</span>
                </a>
              </li>
            </ul>
          </li> 
          <li className="menu-title">Layout</li>
          <li className="has-sub">
            <a>
              <i className="ti-layout-width-full" />
              <span>Layout</span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="layout-wide.html">
                  <span>Wide Layout</span>
                </a>
              </li>
              <li>
                <a href="layout-boxed.html">
                  <span>Boxed Layout</span>
                </a>
              </li>
              <li>
                <a href="layout-static.html">
                  <span>Static Layout</span>
                </a>
              </li>
              <li>
                <a href="layout-fixed.html">
                  <span>Fixed Layout</span>
                </a>
              </li>
              <li>
                <a href="layout-collapse.html">
                  <span>Collapsed Menu</span>
                </a>
              </li>
              <li>
                <a href="layout-light.html">
                  <span>Light Sidebar</span>
                </a>
              </li>
              <li>
                <a href="layout-dark.html">
                  <span>Dark Sidebar</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <a>
              <i className="ti-layout-sidebar-left" />
              <span>Header Color</span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="header-color-with-light-sidebar.html">
                  <span>Wide Light Sidebar</span>
                </a>
              </li>
              <li>
                <a href="header-color-with-dark-sidebar.html">
                  <span>Wide Dark Sidebar</span>
                </a>
              </li>
              <li>
                <a href="header-gradient.html">
                  <span>Gradient</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <a>
              <i className="ti-layout-media-overlay-alt" />
              <span>Footer</span>
              <i className="arrow" />
            </a>
            <ul className="sub-menu">
              <li>
                <a href="footer-light.html">
                  <span>Light Footer</span>
                </a>
              </li>
              <li>
                <a href="footer-dark.html">
                  <span>Dark Footer</span>
                </a>
              </li>
              <li>
                <a href="footer-transparent.html">
                  <span>Footer Transparent</span>
                </a>
              </li>
              <li>
                <a href="footer-fixed.html">
                  <span>Footer Fixed</span>
                </a>
              </li>
              <li>
                <a href="footer-components.html">
                  <span>Footer Components</span>
                </a>
              </li>
            </ul> */}
          </li>
        </ul>
      </div>
    </div>
  );
}
export default BusinessSidMenu;
