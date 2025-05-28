import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmationAlert } from "../Message/SweetAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCubesStacked,
  faDog,
  faDoorClosed,
  faFileInvoice,
  faInbox,
  faLock,
  faPeopleCarryBox,
  faRightToBracket,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import UserPasswordPopup from "./Popup/UserPasswordPopup";

const BuesinessHaiderMenu = () => {
 
  const Navigate = useNavigate();
  const Logout = async () => {
    const Confirm = await confirmationAlert("are you sure to logout?");
    if (Confirm) {
      localStorage.removeItem("businessId");
      localStorage.removeItem("userName");
      localStorage.removeItem("email");
      Navigate("/Login");
    }
  };

  return (
    <div className="page-hdr">
      <div className="row align-items-center">
        <div className="col-4 col-md-7 page-hdr-left">
          {/* Logo Container */}
          <div id="logo">
            <div className="tbl-cell logo-icon">
              <Link to="">
                <img
                  src="Admin/images/MyLogo.png"
                  style={{ width: "180px", height: "180px" }}
                  alt=""
                />
              </Link>
            </div>
            <div className="tbl-cell logo">
              <Link to="">
                <img
                  src="Admin/images/MyLogo.png"
                  style={{ width: "200px", height: "200px" }}
                />
              </Link>
            </div>
          </div>
          <div className="page-menu menu-icon">
            <a className="animated menu-close">
              <i className="far fa-hand-point-left" />
            </a>
          </div>
          <div className="page-menu page-fullscreen">
            <Link>
              <i className="fas fa-expand" />
            </Link>
          </div>
        </div>
        <div className="col-8 col-md-5 page-hdr-right">
          <div className="page-hdr-desktop">
            <div className="page-menu menu-dropdown-wrapper menu-user">
              <Link className="user-link">
                <span className="tbl-cell user-name pr-3">
                  Welcome,
                  <span className="pl-2">
                    {localStorage.getItem("userName")}
                  </span>
                </span>
                <span className="tbl-cell avatar">
                  <img
                    src={`http://192.168.21.121:2025/LOGO/${localStorage.getItem(
                      "Logo"
                    )}`}
                    alt=""
                  />
                </span>
              </Link>
              <div className="menu-dropdown menu-dropdown-right menu-dropdown-push-right">
                <div className="arrow arrow-right" />
                <div className="menu-dropdown-inner">
                  <div className="menu-dropdown-head pb-3">
                    <div className="tbl-cell">
                      <img
                        src={`http://192.168.21.121:2025/LOGO/${localStorage.getItem(
                          "Logo"
                        )}`}
                        alt=""
                      />
                      {/* <i class="fa fa-user-circle"></i> */}
                    </div>
                    <div className="tbl-cell pl-2 text-left">
                      <p className="m-0 font-18">
                        {localStorage.getItem("userName")}
                      </p>
                      <p className="m-0 font-14">
                        {localStorage.getItem("email")}
                      </p>
                    </div>
                  </div>
                  <div className="menu-dropdown-body">
                    <ul className="menu-nav">
                      <li>
                        <Link to="">
                          <i className="icon-user" />
                          <Link to="/Profile">My Profile</Link>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-dropdown-footer text-right">
                    <Link
                      onClick={() => Logout()}
                      className="btn btn-outline btn-primary btn-pill btn-outline-2x font-12 btn-sm"
                    >
                      <FontAwesomeIcon icon={faRightToBracket} style={{fontSize:"20px"}} />&nbsp;
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-menu menu-dropdown-wrapper menu-quick-links">
              <a>
                <i className="icon-grid" />
              </a>
              <div className="menu-dropdown menu-dropdown-right menu-dropdown-push-right">
                <div className="arrow arrow-right" />
                <div className="menu-dropdown-inner">
                  <div className="menu-dropdown-head">Quick Links</div>
                  <div className="menu-dropdown-body p-0">
                    <div className="row m-0 box">
                      <div className="col-6 p-0 box">
                        <Link to="/AvailableStock">
                          <FontAwesomeIcon
                            icon={faCubesStacked}
                            style={{ fontSize: "30px" }}
                          />
                          <span>Avilibal Stock</span>
                        </Link>
                      </div>
                      <div className="col-6 p-0 box">
                        <Link to="/Invoice">
                          <FontAwesomeIcon
                            icon={faFileInvoice}
                            style={{ fontSize: "30px" }}
                          />
                          <span>New Invoice</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="page-hdr-mobile">
            <div className="page-menu open-mobile-search">
              <Link to="">
                <i className="icon-magnifier" />
              </Link>
            </div>
            <div className="page-menu open-left-menu">
              <Link to="">
                <i className="icon-menu" />
              </Link>
            </div>
            <div className="page-menu oepn-page-menu-desktop">
              <Link to="">
                <i className="icon-options-vertical" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuesinessHaiderMenu;
