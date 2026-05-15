import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-horizontal.png";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        {/* Logo */}
        <img src={logo} alt="CryoChain" className="notfound-logo" />

        <div className="notfound-error">404</div>

        <h1 className="notfound-title">Destination Not Found</h1>

        <p className="notfound-subtitle">
          The infrastructure hub you're looking for seems to be offline.
          <br />
          Our cold chain doesn't reach this page.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary btn-arrow">
            Return to Homepage
          </Link>
          <Link to="/contact" className="btn btn-ghost">
            Contact the Team
          </Link>
        </div>

        <div className="notfound-footer">
          <p>Still lost? Try exploring our hubs:</p>
          <div className="notfound-links">
            <Link to="/crisis">The Opportunity</Link>
            <Link to="/platform">The Platform</Link>
            <Link to="/vision">The Vision</Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="notfound-bg">
        <div className="cold-dot"></div>
        <div className="solar-dot"></div>
        <div className="data-dot"></div>
      </div>
    </div>
  );
};

export default NotFound;
