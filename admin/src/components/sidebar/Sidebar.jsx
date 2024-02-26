import "./sidebar.scss";
import React from "react";
import { LevelContext, Menu, MenuContext, MenuItem, MenuItemFR, Sidebar, SidebarContext, SubMenu, SubMenuFR, menuClasses, sidebarClasses, useProSidebar } from 'react-pro-sidebar';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
const Sidebars = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar className="app">
        <Menu>
          <Link to="/" style={{ textDecoration: "none" }}>
            <MenuItem className="menu1 logo">
              <h2>Hawaii Tours</h2>
            </MenuItem>
          </Link>
          <Menu iconShape="circle" style={{ textDecoration: "none" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <MenuItem icon={<SpaceDashboardOutlinedIcon />}>
                Dashboard
              </MenuItem>
            </Link>
            <SubMenu label="Users" icon={<PersonOutlineIcon />}>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <MenuItem>
                  User Manager
                </MenuItem>
              </Link>
            </SubMenu>
            <SubMenu label="Hotels" icon={<HotelOutlinedIcon />}>
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
            <SubMenu label="Product" icon={<Inventory2OutlinedIcon />}>
              <Link to="/product" style={{ textDecoration: "none" }}>
                <MenuItem>
                  Product Manager
                </MenuItem>
              </Link>
              <Link to="/category" style={{ textDecoration: "none" }}>
                <MenuItem>
                  Categories Manager
                </MenuItem>
              </Link>
            </SubMenu>
            <SubMenu label="Booking" icon={<AirplaneTicketOutlinedIcon />}>
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
    </div >
  );
};

export default Sidebars;
