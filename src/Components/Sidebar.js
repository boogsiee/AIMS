import React from "react";
import { Link, useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const Sidebar = () => {
  const location = useLocation();
  const isVerificationPage = location.pathname.includes("/verification");
  if (isVerificationPage) {
    return null;
  }

  return (
    <>
      <div className="sidebar">
        <div class="nav">
          <Tooltip title="Home" placement="right">
            <div>
              <Link to="/home" type="button">
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/material-rounded/24/home.png"
                  alt="home"
                />
              </Link>
            </div>
          </Tooltip>

          <Tooltip title="Search" placement="right">
            <div>
              <Link to="/search" type="button">
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/material-rounded/48/search.png"
                  alt="search"
                />
              </Link>
            </div>
          </Tooltip>

          <Tooltip title="Dashboard" placement="right">
            <div>
              <a href="/dashboard">
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/ios-glyphs/30/control-panel--v1.png"
                  alt="control-panel--v1"
                />
              </a>
            </div>
          </Tooltip>

          <Tooltip title="Terminal" placement="right">
            <div>
              <Link to="/terminal" type="button">
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/sf-black-filled/64/pen.png"
                  alt="pen"
                />
              </Link>
            </div>
          </Tooltip>
        </div>

        <Tooltip title="Log out" placement="right">
          <div class="nav">
            <a href="/">
              <img
                width="50"
                height="40"
                src="https://img.icons8.com/pulsar-line/48/exit.png"
                alt="exit"
              />
            </a>
          </div>
        </Tooltip>
      </div>
    </>
  );
};

export default Sidebar;
