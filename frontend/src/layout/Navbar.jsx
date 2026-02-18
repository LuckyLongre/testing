import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">BRD Generator</span>
      </div>
      <div className="navbar-right">
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
