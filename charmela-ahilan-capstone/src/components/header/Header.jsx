import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  // Check if token exists in localStorage
  const [token, setToken] = useState(null);
  const auth_token = localStorage.getItem("token");

  useEffect(() => {
    if (auth_token) {
      console.log("object");
      setToken(auth_token);
    }
  }, [auth_token]);

  const location = useLocation();

  const logouthandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <header className="header">
        <div className="nav_links">
          {!token && (
            <>
              <div>
                <Link
                  className={`nav_link ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                  to={"/login"}
                >
                  Login
                </Link>
              </div>
              <div>
                <Link
                  className={`nav_link ${
                    location.pathname === "/signup" ? "active" : ""
                  }`}
                  to={"/signup"}
                >
                  Sign up
                </Link>
              </div>
            </>
          )}
          {token && (
            <>
              <div>
                <Link
                  className={`nav_link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to={"/"}
                >
                  Home
                </Link>
              </div>
              <div>
                <Link
                  className={`nav_link ${
                    location.pathname === "/journal-entries" ? "active" : ""
                  }`}
                  to={"/journal-entries"}
                >
                  Journal Entries
                </Link>
              </div>
              <div>
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
              </div>
              <div onClick={logouthandler}>
                <div style={{ cursor: "pointer" }} className="nav_link">
                  Logout
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
