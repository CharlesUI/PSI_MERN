import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { SlLogout } from "react-icons/sl";

export default function () {
  const { user } = useAuthContext();

  const { logout } = useLogout();

  const handleLogOut = () => {
    logout();
  };

  return (
    <header>
      <nav className="nav-container">
        <div className="home-logo">
          <Link to={"/"}>Home</Link>
        </div>
        {user && (
          <div className="user-nav nav">
            <div className="user-nav-links">
              <Link to={"/inventory"}>Inventory</Link>
              <Link to={"/pos"}>POS</Link>
              <Link to={"/sales-report"}>Sales Report</Link>
            </div>
            <div className="user-nav-profile">
              <p>{user.admin.adminUser}</p>
              <button className="log-out-btn" onClick={handleLogOut}><SlLogout /></button>
            </div>
          </div>
        )}
        {!user && (
          <div className="log-nav nav">
            <Link to={"/register"}>register</Link>
            <Link to={"/login"}>login</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
