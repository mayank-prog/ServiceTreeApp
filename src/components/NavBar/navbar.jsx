import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Navbar() {
  const [activeLink, setActiveLink] = useState("home");

  const handleClick = (event) => {
    setActiveLink(event.target.id);
  };



  return (
    <ul
      className="nav nav-pills nav-fill gap-2 p-1 small bg-warning  shadow-sm"
      id="pillNav2"
      role="tablist"
      style={{
        "--bs-nav-link-color": "var(--bs-white)",
        "--bs-nav-pills-link-active-color": "var(--bs-dark)",
        "--bs-nav-pills-link-active-bg": "var(--bs-white)",
        fontWeight: "bold",
      }}
    >
      <li className="nav-item " role="presentation">
        <Link style={{textDecoration: "none"}}
          to="/"
          >
        <button
          className={`nav-link  rounded-5 ${
            activeLink === "home" ? "active" : ""
          }`}
          id="home"
          onClick={handleClick}
          type="button "
          role="tab"
          aria-selected={activeLink === "home"}
        >
          Home
        </button>
        </Link>
      </li>
      <li className="nav-item" role="presentation">
      <Link style={{textDecoration: "none"}}
          to="/cart"
          >
        <button
          className={`nav-link rounded-5 ${
            activeLink === "cart" ? "active" : ""
          }`}
          id="cart"
          onClick={handleClick}
          type="button"
          role="tab"
          aria-selected={activeLink === "cart"}
        >
          Cart
        </button>
        </Link>
      </li>
      <li className="nav-item" role="presentation">
      <Link style={{textDecoration: "none"}}
          to="/requests"
          >
        <button
          className={`nav-link rounded-5 ${
            activeLink === "requests" ? "active" : ""
          }`}
          id="requests"
          onClick={handleClick}
          type="button"
          role="tab"
          aria-selected={activeLink === "requests"}
        >
          Requests
        </button>
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
