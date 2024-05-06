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
        <div className="menu-icon" onClick={handleShowNavbar}>
          <svg
            className="my-svg"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 50 50"
          >
            <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
          </svg>
        </div>
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
