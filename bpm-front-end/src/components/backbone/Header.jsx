import React, { useState, useEffect } from "react";
import brand from "../../assets/bpm-logo.png";
import NavItem from "./NavItem";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 992);
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <header className="header">
      <div className="d-flex justify-content-between align-items-center fixed-top p-1" style={{ backgroundColor: "#2654A1" }}>
        <div className="d-flex align-items-center">
          <img
            src={brand}
            alt="Logo AstraTech"
            className="navbar-brand"
            style={{ height: "60px", marginLeft: "30px" }}
          />
        </div>
        <div className={`navmenu ${isMobile ? "d-none" : "d-flex"}`}>
          <ul className="nav">
            <NavItem/>
          </ul>
        </div>
        {isMobile && (
          <button
          className="btn"
          onClick={toggleMobileMenu}
          style={{
            backgroundColor: "#2654A1",
            color: "#FFFFFF",
            border: "none",
            padding: "10px",
            borderRadius: "4px",  
          }}
        >
          <i
            className={`fi ${isMobileMenuOpen ? "fi-br-cross-small" : "fi-br-menu-burger"}`}
            style={{ color: "#FFFFFF", fontSize: "25px", margin: "10px 5px 10px", cursor: "pointer"}}
          ></i>
        </button>
        
        )}
      </div>
      {isMobile && isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="nav flex-column p-3" style={{ marginTop: '65px' }}>
            <NavItem/>
          </ul>
        </div>
      )}
    </header>
  );
}
