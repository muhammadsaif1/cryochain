import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo-horizontal.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    let scrollY = 0;

    if (menuOpen) {
      scrollY = window.scrollY;

      // Strong mobile scroll lock
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.position = "relative";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.height = "100vh"; // Important
      document.body.style.touchAction = "none";
      document.body.style.overscrollBehavior = "none";
    } else {
      // Restore scroll
      const savedScrollY = parseInt(document.body.style.top || "0", 10) * -1;

      document.documentElement.style.overflow = "";
      document.documentElement.style.position = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";

      window.scrollTo({ top: savedScrollY, left: 0, behavior: "instant" });
    }

    return () => {
      // Cleanup
      document.documentElement.style.overflow = "";
      document.documentElement.style.position = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <NavLink to="/" className="nav-brand" onClick={closeMenu}>
            <img src={logo} alt="CryoChain" />
          </NavLink>

          <ul className="nav-links">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/opportunity">The Opportunity</NavLink>
            </li>
            <li>
              <NavLink to="/platform">The Platform</NavLink>
            </li>
            <li>
              <NavLink to="/vision">The Vision</NavLink>
            </li>

            <li>
              <NavLink to="/insights">Insights</NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="btn btn-primary nav-cta"
                style={{ padding: "10px 22px", fontSize: "0.88rem" }}
              >
                Start a Conversation
              </NavLink>
            </li>
          </ul>

          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && <div className="drawer-backdrop" onClick={closeMenu} />}

      <div className={`drawer ${menuOpen ? "drawer-open" : ""}`}>
        {/* Drawer content */}
        <div className="drawer-header">
          <img src={logo} alt="CryoChain" style={{ height: 32 }} />
          <button className="drawer-close" onClick={closeMenu}>
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
            <NavLink to="/opportunity" onClick={closeMenu}>
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
          <li>
            <NavLink to="/insights"> Insights</NavLink>
          </li>
          <li style={{ marginTop: "auto", paddingTop: "var(--space-8)" }}>
            <NavLink
              to="/contact"
              className="btn btn-primary nav-cta"
              onClick={closeMenu}
              style={{ width: "100%", justifyContent: "center" }}
            >
              Start a Conversation
            </NavLink>
          </li>
        </ul>
      </div>

      <style>{`
        /* Fix CTA button hover — lift instead of color change */
        .nav-cta {
          transition: transform 0.18s ease, box-shadow 0.18s ease !important;
           color: white !important;
        }
        .nav-cta:hover {
          background: inherit !important;
          color: inherit !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
        }
        .nav-cta:active {
          transform: translateY(0px) !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
};

export default Header;
