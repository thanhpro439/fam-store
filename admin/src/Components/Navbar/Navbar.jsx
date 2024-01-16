import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import navProfile from "../../assets/nav-profile.svg";

function Navbar(props) {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <div className="nav-logo-name">
          <p>Fam Store</p>
          <p>Admin Panel</p>
        </div>
      </div>
      
      <img className="nav-profile" src={navProfile} alt="" />
    </div>
  );
}

export default Navbar;
