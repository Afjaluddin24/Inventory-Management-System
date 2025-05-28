import {
  faClock,
  faCloud,
  faComment,
  faDesktop,
  faPeopleArrows,
  faTShirt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="menu-wrapper">
      <div className="menu">
        {/* Menu Container */}
        <ul>
          <li className="menu-title">Main</li>
          <li className="has-sub active">
            <a>
              <span><FontAwesomeIcon icon={faDesktop}/>&nbsp;&nbsp;Dashboard</span>
              <i className="arrow rotate" />
            </a>
            <ul className="sub-menu">
              <li>
                <Link to="/Admin/Home">Dashboard</Link>
              </li>
            </ul>
          </li>
          <li className="menu-title">Components</li>
          <li className="has-sub">
            <a>
            <span><FontAwesomeIcon icon={faCloud}/>&nbsp;&nbsp;Package</span>
            <i className="arrow rotate" />
            </a>
            <ul className="sub-menu">
              <li>
                <Link to="/Admin/Package">Package</Link>
              </li>
              <li>
                <Link to="/Admin/Customer/Package">Customer List</Link>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <a>
            <span><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;User</span>
            <i className="arrow rotate" />
            </a>
            <ul className="sub-menu">
              <li>
                <Link to="/Admin/User">User</Link>
              </li>
            </ul>
          </li>
          <li className="has-sub">
            <ul className="sub-menu">
              <li>
                <Link to="">Garment</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideMenu;
