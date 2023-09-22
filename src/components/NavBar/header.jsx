import React, { Fragment } from "react"
// import logo from '/vite.svg'
import logo from '../../assets/logo.png';

function Header() {
  return (
    <div 
    className="bg-warning border-dark border-bottom "
    style={{ backgroundColor: "#333", height: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={logo} alt="Logo" style={{ height: "70px", marginRight: "20px", marginTop: "10px", paddingBottom : "10px", }} />
    </div>
  );
}

export default Header;
