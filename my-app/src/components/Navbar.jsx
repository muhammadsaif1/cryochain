import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo-horizontal.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <NavLink
            to="/"
            className="nav-brand"
            aria-label="CryoChain home"
            onClick={closeMenu}
          >
            <img src={logo} alt="CryoChain" />
          </NavLink>

          {/* Desktop links */}
          <ul className="nav-links">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/crisis">The Opportunity</NavLink>
            </li>
            <li>
              <NavLink to="/platform">The Platform</NavLink>
            </li>
            <li>
              <NavLink to="/vision">The Vision</NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="btn btn-primary"
                style={{ padding: "10px 22px", fontSize: "0.88rem" }}
              >
                Start a Conversation
              </NavLink>
            </li>
          </ul>

          {/* Hamburger — mobile only */}
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      {menuOpen && <div className="drawer-backdrop" onClick={closeMenu} />}

      {/* Slide-in Drawer */}
      <div className={`drawer ${menuOpen ? "drawer-open" : ""}`}>
        <div className="drawer-header">
          <img src={logo} alt="CryoChain" style={{ height: 32 }} />
          <button
            className="drawer-close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <X size={22} />
          </button>
        </div>

        <ul className="drawer-links">
          <li>
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/crisis" onClick={closeMenu}>
              The Opportunity
            </NavLink>
          </li>
          <li>
            <NavLink to="/platform" onClick={closeMenu}>
              The Platform
            </NavLink>
          </li>
          <li>
            <NavLink to="/vision" onClick={closeMenu}>
              The Vision
            </NavLink>
          </li>
          <li style={{ marginTop: "auto", paddingTop: "var(--space-8)" }}>
            <NavLink
              to="/contact"
              className="btn btn-primary"
              onClick={closeMenu}
              style={{ width: "100%", justifyContent: "center" }}
            >
              Start a Conversation
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
