import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ForgetAdminPopup from '../Admin/Popup/ForgetAdminPopup';

 const HaideMenu = () => {

  const [show,setShow] = useState(false);

  const [initialValues,setinitialValues] = useState({
    Passwd:"",
    Cpasword:""
  })

  const Navigate = useNavigate();
  const Logout = () => {
    if(window.confirm("are you sure to logout?"))
    {
       localStorage.removeItem("UserId");
       localStorage.removeItem("Username");
       localStorage.removeItem("Fullname");
       Navigate("/Logins");
    }
  }

  return (
    <>
    <div className="page-hdr">
    <div className="row align-items-center">
      <div className="col-4 col-md-7 page-hdr-left">
        {/* Logo Container */}
        <div id="logo">
          <div className="tbl-cell logo-icon">
            <Link to="../Admin/Home"> <img src="./Admin/images/logo.jpg" alt="" /></Link>
          </div>
          <div className="tbl-cell logo">
            <a href="#">
              <img src="../Admin/images/logo.png" />
            </a>
          </div>
        </div>
        <div className="page-menu menu-icon">
          <a className="animated menu-close">
            <i className="far fa-hand-point-left" />
          </a>
        </div>
        <div className="page-menu page-fullscreen">
          <a>
            <i className="fas fa-expand" />
          </a>
        </div>
      </div>
      <div className="col-8 col-md-5 page-hdr-right">
        <div className="page-hdr-desktop">
          <div className="page-menu menu-dropdown-wrapper menu-user">
            <a className="user-link">
              <span className="tbl-cell user-name pr-3">
                Hello,<span className="pl-2">{localStorage.getItem("Username")}</span>
              </span>
              <span className="tbl-cell avatar">
                <img src="../Admin/images/Admin.png" alt="" />
              </span>
            </a>
            <div className="menu-dropdown menu-dropdown-right menu-dropdown-push-right">
              <div className="arrow arrow-right" />
              <div className="menu-dropdown-inner">
                <div className="menu-dropdown-head pb-3">
                  <div className="tbl-cell">
                    <img src="./Admin/images/Admin.png" alt="" />
                    {/* <i class="fa fa-user-circle"></i> */}
                  </div>
                  <div className="tbl-cell pl-2 text-left">
                    <p className="m-0 font-18">{localStorage.getItem("Fullname")}</p>
                    <p className="m-0 font-14"></p>
                  </div>
                </div>
                <div className="menu-dropdown-body">
                  <ul className="menu-nav">
                    <li>
                      <Link to="" onClick={() => setShow(true)}>
                        <span>
                        <FontAwesomeIcon icon={faLock} style={{fontSize:"20px"}}/>&nbsp;&nbsp;Forget Password</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Admin/Profile">
                      <span>
                      <FontAwesomeIcon icon={faUser} style={{fontSize:"20px"}}/>&nbsp;&nbsp;My Profile</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-dropdown-footer text-right">
                  <a
                    href=""
                    onClick={() => Logout()}
                    className="btn btn-outline btn-primary btn-pill btn-outline-2x font-12 btn-sm"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page-hdr-mobile">
          <div className="page-menu open-mobile-search">
            <a href="#">
              <i className="icon-magnifier" />
            </a>
          </div>
          <div className="page-menu open-left-menu">
            <a href="#">
              <i className="icon-menu" />
            </a>
          </div>
          <div className="page-menu oepn-page-menu-desktop">
            <a href="#">
              <i className="icon-options-vertical" />
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
     <ForgetAdminPopup show={show} setShow={setShow} initialValues={initialValues} setinitialValues={setinitialValues} />
     </>
  )
}
export default HaideMenu;