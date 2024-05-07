import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  // Check if token exists in localStorage
  const [token, setToken] = useState(null);
  const auth_token = localStorage.getItem("token");

  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  useEffect(() => {
    if (auth_token) {
      console.log(auth_token);
      setToken(auth_token);
    }
  }, [auth_token]);

  const location = useLocation();

  const logouthandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Daily Journal</div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          {!token && (
            <ul>
              <li>
                <Link
                  className={`nav_link ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                  to={"/login"}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className={`nav_link ${
                    location.pathname === "/signup" ? "active" : ""
                  }`}
                  to={"/signup"}
                >
                  Sign up
                </Link>
              </li>
            </ul>
          )}
          {token && (
            <ul>
              <li>
                <Link
                  className={`nav_link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`nav_link ${
                    location.pathname === "/journal-entries" ? "active" : ""
                  }`}
                  to={"/journal-entries"}
                >
                  Journal Entries
                </Link>
              </li>
              <li>
                <Link
                  className={`nav_link ${
                    location.pathname === "/create-journal-entry"
                      ? "active"
                      : ""
                  }`}
                  to={"/create-journal-entry"}
                >
                  New Journal
                </Link>
              </li>
              <li onClick={logouthandler}>
                <div style={{ cursor: "pointer" }} className="nav_link">
                  Logout
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
