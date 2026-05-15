import React from "react";
import logo from "../assets/images/logo-horizontal.png"; // Adjust path as needed

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="CryoChain" />
            <p
              style={{
                color: "var(--slate-300)",
                fontSize: "0.92rem",
                maxWidth: "36ch",
              }}
            >
              Cold storage. Clean energy. Connected future.
              <br />
              <em>Infrastructure that preserves and connects.</em>
            </p>
          </div>

          <div>
            <h4>The Platform</h4>
            <ul>
              <li>
                <a href="/opportunity">The Opportunity</a>
              </li>
              <li>
                <a href="/platform">The Platform</a>
              </li>
              <li>
                <a href="/vision">The Vision</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Engage</h4>
            <ul>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/contact#delegation">Site Visits</a>
              </li>
              <li>
                <a href="/contact">Partner Inquiries</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="/terms">Terms of Use</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms#disclaimer">Disclaimers</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 CryoChain Inc. All rights reserved.</span>
          <span>
            Delaware-governed parent · West Africa operating subsidiary
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
