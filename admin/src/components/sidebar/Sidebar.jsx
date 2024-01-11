import "./sidebar.scss";
import React from "react";
import { LevelContext, Menu, MenuContext, MenuItem, MenuItemFR, Sidebar, SidebarContext, SubMenu, SubMenuFR, menuClasses, sidebarClasses, useProSidebar } from 'react-pro-sidebar';
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebars = () => {
  return (
    <div style={{ display: "flex" , background: '#1976d2'}}>
      <Sidebar className="app">
        <Menu>
          <Link to="/" style={{ textDecoration: "none" }}>
            <MenuItem className="menu1">
              <h2>SUPER HOTELS</h2>
            </MenuItem>
          </Link>
          <Menu iconShape="circle" style={{ textDecoration: "none" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <MenuItem icon={<DashboardIcon />}>
                  Dashboard
              </MenuItem>
            </Link>
            <hr />
            <SubMenu label="Users" icon={<PersonOutlineIcon />}>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <MenuItem>
                    User Manager
                </MenuItem>
              </Link>
            </SubMenu>
            <SubMenu label="Hotels" icon={<StoreIcon />}>
              <Link to="/hotels" style={{ textDecoration: "none" }}>
                  <MenuItem>
                      Hotels Manager
                  </MenuItem>
              </Link>
              <Link to="/rooms" style={{ textDecoration: "none" }}>
                  <MenuItem>
                      Rooms Manager
                  </MenuItem>
              </Link>
            </SubMenu>
            <SubMenu label="Product" icon={<StoreIcon />}>
              <Link to="/product" style={{ textDecoration: "none" }}>
                  <MenuItem>
                    Product Manager
                  </MenuItem>
              </Link>
              <Link to="/categories" style={{ textDecoration: "none" }}>
                  <MenuItem>
                    Categories Manager
                  </MenuItem>
              </Link>
            </SubMenu>
            <SubMenu label="Booking" icon={<StoreIcon />}>
              <Link to="/booking" style={{ textDecoration: "none" }}>
                  <MenuItem>
                      Booking Manager
                  </MenuItem>
              </Link>
              <Link to="/resource" style={{ textDecoration: "none" }}>
                  <MenuItem>
                    Resource Manager
                  </MenuItem>
              </Link>
            </SubMenu>
          </Menu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Sidebars;
