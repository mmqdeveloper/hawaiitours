import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.css";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error("Error during logout:", error);
    }
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="navbar">
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <div className="logo">Super Tours</div>
      </Link>
      <div className="headerList">
        <a href="#" className="headerListItem active">
          <FontAwesomeIcon icon={faBed} />
          <span>Stays</span>
        </a>
        <a href="#" className="headerListItem">
          <FontAwesomeIcon icon={faPlane} />
          <span>Flights</span>
        </a>
        <a href="#" className="headerListItem">
          <FontAwesomeIcon icon={faCar} />
          <span>Car rentals</span>
        </a>
        <a href="#" className="headerListItem">
          <FontAwesomeIcon icon={faBed} />
          <span>Attractions</span>
        </a>
        <a href="#" className="headerListItem">
          <FontAwesomeIcon icon={faTaxi} />
          <span>Airport taxis</span>
        </a>
      </div>
      {user ? (
        <div className="navItems">
          <FontAwesomeIcon icon={faRightToBracket} className="navLogout" onClick={handleLogout} />
        </div>
      ) : (
        <div className="navItems">
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="navButton">Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
