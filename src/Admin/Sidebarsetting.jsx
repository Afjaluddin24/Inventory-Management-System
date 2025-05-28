import React from "react";

export default function Sidebarsetting() {
  return (
    <div className="sidebar sidebar-right">
      <div className="sidebar-close">
        <i className="icon-close" />
      </div>
      <div className="content">
        <ul className="nav nav-tabs nav-tabs-line nav-tabs-line-primary">
          <li className="nav-item">
            <a
              className="nav-link active"
              href="#sidebar-member"
              data-toggle="tab"
            >
              Member
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#sidebar-setting" data-toggle="tab">
              Settings
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#sidebar-log" data-toggle="tab">
              Logs
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" id="sidebar-member">
            <div className="pl-2 pr-2">
              <div className="box-title pb-3">Premium Member</div>
              <div className="user-list br-bottom-1x pb-4">
                <ul>
                  <li>
                    <div className="tbl-cell image">
                      <img src="uploads/team-1.jpg" alt="" />
                    </div>
                    <div className="tbl-cell content">
                      <a>Steve Soren</a>
                      <p>Lead Developer at Ipos.</p>
                    </div>
                    <div className="tbl-cell follow">
                      <a
                        href="#"
                        className="btn btn-outline btn-info btn-pill btn-outline-1x btn-sm"
                      >
                        Follow
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="tbl-cell image">
                      <img src="uploads/team-2.jpg" alt="" />
                    </div>
                    <div className="tbl-cell content">
                      <a>Cheri Aria</a>
                      <p>Photographer and Lead Designer.</p>
                    </div>
                    <div className="tbl-cell follow">
                      <a href="#" className="btn btn-info btn-pill btn-sm">
                        Following
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="tbl-cell image">
                      <img src="uploads/team-3.jpg" alt="" />
                    </div>
                    <div className="tbl-cell content">
                      <a>Daniel Barnes</a>
                      <p>Manager at IT park.</p>
                    </div>
                    <div className="tbl-cell follow">
                      <a
                        href="#"
                        className="btn btn-outline btn-info btn-pill btn-outline-1x btn-sm"
                      >
                        Follow
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="tbl-cell image">
                      <img src="uploads/team-4.jpg" alt="" />
                    </div>
                    <div className="tbl-cell content">
                      <a>Janet Collins</a>
                      <p>Developer at atios.</p>
                    </div>
                    <div className="tbl-cell follow">
                      <a
                        href="#"
                        className="btn btn-outline btn-info btn-pill btn-outline-1x btn-sm"
                      >
                        Follow
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="box-title pt-3 pb-3">Users</div>
              <div className="user-list">
                <ul>
                  <li>
                    <div className="tbl-cell image">
                      <img src="uploads/team-1.jpg" alt="" />
                    </div>
                    <div className="tbl-cell content">
                      <a>Steve Soren</a>
                      <p>Lead Developer at Ipos.</p>
                    </div>
                  </li>
                  <li>
                    <div className="tbl-cell image">
                      <img src="uploads/team-2.jpg" alt="" />
                    </div>
                    <div className="tbl-cell content">
                      <a>Cheri Aria</a>
                      <p>Photographer and Lead Designer.</p>
                    </div>
                  </li>
                  <li>
                    <div className="tbl-cell image">
                      <img src="uploads/team-3.jpg" alt="" />
                    </div>
                    <div className="tbl-cell content">
                      <a>Daniel Barnes</a>
                      <p>Manager at IT park.</p>
                    </div>
                  </li>
                  <li>
                    <div className="tbl-cell image">
                      <img src="uploads/team-4.jpg" alt="" />
                    </div>
                    <div className="tbl-cell content">
                      <a>Janet Collins</a>
                      <p>Developer at atios.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="sidebar-setting">
            <div className="pl-2 pr-2">
              <div className="box-title pb-3">General Setting</div>
              <div className="setting-list">
                <ul>
                  <li className="item">
                    <div className="label">Email Notifications</div>
                    <div className="control">
                      <input
                        type="checkbox"
                        defaultChecked=""
                        className="js-switch"
                        data-color="#13dafe"
                      />
                    </div>
                  </li>
                  <li className="item">
                    <div className="label">Comment auto Publish</div>
                    <div className="control">
                      <input
                        type="checkbox"
                        className="js-switch"
                        data-color="#13dafe"
                      />
                    </div>
                  </li>
                  <li className="item">
                    <div className="label">Review Auto Publish</div>
                    <div className="control">
                      <input
                        type="checkbox"
                        defaultChecked=""
                        className="js-switch"
                        data-color="#13dafe"
                      />
                    </div>
                  </li>
                  <li className="item">
                    <div className="label">Post Setting</div>
                    <div className="control">
                      <input
                        type="checkbox"
                        className="js-switch"
                        data-color="#13dafe"
                      />
                    </div>
                  </li>
                  <li className="item">
                    <div className="label">Cron Log</div>
                    <div className="control">
                      <input
                        type="checkbox"
                        className="js-switch"
                        data-color="#13dafe"
                      />
                    </div>
                  </li>
                  <li className="item">
                    <div className="label">Email Log</div>
                    <div className="control">
                      <input
                        type="checkbox"
                        defaultChecked=""
                        className="js-switch"
                        data-color="#13dafe"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="sidebar-log">
            <div className="pl-2 pr-2">
              <div className="box-title pb-3">Server and Application Logs</div>
              <ul className="timeline">
                <li>
                  <div className="time">
                    <small>Just Now</small>
                  </div>
                  <a href="#" target="_blank" className="timeline-container">
                    <div className="arrow" />
                    <div className="description">21 new users registered </div>
                  </a>
                </li>
                <li>
                  <div className="time">
                    <small>11 mins</small>
                  </div>
                  <a href="#" target="_blank" className="timeline-container">
                    <div className="arrow" />
                    <div className="description">
                      New invoice generated{" "}
                      <span className="badge badge-danger badge-pill badge-sm">
                        Unpaid
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="time">
                    <small>15 mins</small>
                  </div>
                  <a href="#" target="_blank" className="timeline-container">
                    <div className="arrow" />
                    <div className="description">Cron Job Completed</div>
                  </a>
                </li>
                <li>
                  <div className="time">
                    <small>20 mins</small>
                  </div>
                  <a href="#" target="_blank" className="timeline-container">
                    <div className="arrow" />
                    <div className="description">
                      Server Restarted{" "}
                      <span className="badge badge-success badge-pill badge-sm">
                        Resolved
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="time">
                    <small>25 mins</small>
                  </div>
                  <a href="#" target="_blank" className="timeline-container">
                    <div className="arrow" />
                    <div className="description">New order received</div>
                  </a>
                </li>
                <li>
                  <div className="time">
                    <small>30 mins</small>
                  </div>
                  <a href="#" target="_blank" className="timeline-container">
                    <div className="arrow" />
                    <div className="description">
                      New ticket created{" "}
                      <span className="badge badge-warning badge-pill badge-sm">
                        High
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="time">
                    <small>35 mins</small>
                  </div>
                  <a href="#" target="_blank" className="timeline-container">
                    <div className="arrow" />
                    <div className="description">
                      Payment Made by client $350.
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
