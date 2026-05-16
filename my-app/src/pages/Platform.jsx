import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

import opsCollage from "../assets/images/ops-collage.png";
import azureRack from "../assets/images/azure-rack.png";
import ProofSection from "../components/ProofSection";

const Platform = () => {
  return (
    <>
      {/* ========================== HERO ========================== */}
      <header className="hero" style={{ paddingBottom: "var(--space-12)" }}>
        <div className="hero-bg"></div>
        <div className="container">
          <div className="reveal" style={{ maxWidth: "1000px" }}>
            <span className="eyebrow green">The Platform</span>
            <h1>
              Nine compounding verticals.
              <br />
              <span style={{ color: "var(--cryo-blue)", fontStyle: "italic" }}>
                One physical asset.
              </span>{" "}
              One fixed cost.
            </h1>
            <p className="lede" style={{ maxWidth: "62ch" }}>
              Cold storage anchors the hub. Eight adjacent verticals follow on
              the same building. Each compounds the next — solar feeds the cold
              rooms, the cold rooms anchor the building, the building hosts the
              data centre, the data centre runs the AI, the AI routes the fleet,
              the fleet moves the food.
            </p>
          </div>
        </div>
      </header>

      {/* ========================== HUB DIAGRAM ========================== */}
      <section className="tight">
        <div className="container">
          <div
            className="reveal text-center"
            style={{ marginBottom: "var(--space-12)" }}
          >
            <h2
              style={{
                maxWidth: "24ch",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              A single building. Nine revenue streams.
            </h2>
          </div>

          <div className="reveal">
            <div
              className="hub-diagram"
              style={{ maxWidth: "720px", margin: "0 auto" }}
            >
              <div className="hub-center">
                CryoChain
                <br />
                Hub
              </div>
              <div className="hub-spoke" style={{ top: "0%", left: "40%" }}>
                <span className="num">1</span>
                <span className="icon">❄️</span>Cold Storage
              </div>
              <div className="hub-spoke" style={{ top: "12%", left: "70%" }}>
                <span className="num">2</span>
                <span className="icon">🌾</span>Processing
              </div>
              <div className="hub-spoke" style={{ top: "40%", left: "80%" }}>
                <span className="num">3</span>
                <span className="icon">🛒</span>Fresh Retail
              </div>
              <div className="hub-spoke" style={{ top: "70%", left: "70%" }}>
                <span className="num">4</span>
                <span className="icon">💊</span>Pharma
              </div>
              <div className="hub-spoke" style={{ top: "82%", left: "40%" }}>
                <span className="num">5</span>
                <span className="icon">🚚</span>EV Logistics
              </div>
              <div className="hub-spoke" style={{ top: "70%", left: "8%" }}>
                <span className="num">6</span>
                <span className="icon">🔧</span>EV Assembly
              </div>
              <div className="hub-spoke" style={{ top: "40%", left: "0%" }}>
                <span className="num">7</span>
                <span className="icon">☀️</span>Solar + BESS
              </div>
              <div className="hub-spoke" style={{ top: "12%", left: "8%" }}>
                <span className="num">8</span>
                <span className="icon">🖥️</span>Edge Data
              </div>
            </div>
            <p
              className="small text-center"
              style={{
                marginTop: "var(--space-8)",
                fontStyle: "italic",
                maxWidth: "50ch",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              The ninth vertical — AI &amp; SCADA — is the connective layer that
              runs across all eight.
            </p>
          </div>
        </div>
      </section>

      {/* ========================== NINE VERTICALS GRID ========================== */}
      <section
        style={{
          background: "var(--surface)",
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        }}
      >
        <div className="container">
          <div
            className="reveal text-center"
            style={{ marginBottom: "var(--space-12)" }}
          >
            <span className="eyebrow">The Nine</span>
            <h2>Each vertical works on its own. Together, they compound.</h2>
          </div>

          <div className="grid grid-3">
            <div className="card card-accent reveal">
              <span
                className="eyebrow"
                style={{ marginBottom: "var(--space-2)" }}
              >
                01
              </span>
              <h4>Cold Storage</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Multi-zone, ammonia/CO₂ cascade refrigeration. HACCP-grade
                construction. The anchor tenant of every hub.{" "}
                <strong>30,000 sqft per facility</strong>.
              </p>
            </div>

            <div className="card card-accent green reveal">
              <span
                className="eyebrow green"
                style={{ marginBottom: "var(--space-2)" }}
              >
                02
              </span>
              <h4>Food Processing</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Value-add tenancy — cocoa butter, coconut oil, fruit packing,
                vacuum-pack export prep. Long-term industrial leases against the
                anchor cold rooms.
              </p>
            </div>

            <div className="card card-accent reveal">
              <span
                className="eyebrow"
                style={{ marginBottom: "var(--space-2)" }}
              >
                03
              </span>
              <h4>Grocery &amp; Fresh Retail</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Fresh produce supply to urban groceries and quick-commerce. The
                cold chain terminates on the consumer's plate, not the warehouse
                dock.
              </p>
            </div>

            <div className="card card-accent green reveal">
              <span
                className="eyebrow green"
                style={{ marginBottom: "var(--space-2)" }}
              >
                04
              </span>
              <h4>Pharma &amp; Health</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                WHO Good Distribution Practices–compliant cold chain for
                vaccines and temperature-sensitive medicines.
              </p>
            </div>

            <div className="card card-accent amber reveal">
              <span
                className="eyebrow"
                style={{
                  color: "var(--amber)",
                  marginBottom: "var(--space-2)",
                }}
              >
                05
              </span>
              <h4>EV Logistics</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Electric refrigerated box-truck fleet (Yutong T7E class).
                V2G-capable. Routes optimised by AI. Charges from the hub's own
                solar canopy.
              </p>
            </div>

            <div className="card card-accent amber reveal">
              <span
                className="eyebrow"
                style={{
                  color: "var(--amber)",
                  marginBottom: "var(--space-2)",
                }}
              >
                06
              </span>
              <h4>EV Manufacturing JV</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Local assembly of specialty electric trucks built for West
                African terrain. Joint-venture structure with established OEMs.
              </p>
            </div>

            <div className="card card-accent reveal">
              <span
                className="eyebrow"
                style={{ marginBottom: "var(--space-2)" }}
              >
                07
              </span>
              <h4>Solar + BESS Microgrid</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                <strong>250 kW solar, 500 kWh battery</strong> per facility. Hub
                independence from grid intermittency.
              </p>
            </div>

            <div className="card card-accent coral reveal">
              <span
                className="eyebrow"
                style={{
                  color: "var(--coral)",
                  marginBottom: "var(--space-2)",
                }}
              >
                08
              </span>
              <h4>Edge Data Centre</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Hyperscale-grade sovereign-cloud appliance per hub.
              </p>
            </div>

            <div className="card card-accent green reveal">
              <span
                className="eyebrow green"
                style={{ marginBottom: "var(--space-2)" }}
              >
                09
              </span>
              <h4>AI &amp; SCADA</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Predictive operations across cold rooms, fleet, and microgrid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== HOW IT COMPOUNDS ========================== */}
      <section>
        <div className="container">
          <div
            className="reveal text-center"
            style={{
              marginBottom: "var(--space-12)",
              maxWidth: "720px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <span className="eyebrow green">How It Compounds</span>
            <h2>The flow of value across the hub.</h2>
            <p className="lede">
              Each block feeds the next. Energy, goods, and intelligence flow in
              a closed loop.
            </p>
          </div>

          <div
            className="reveal"
            style={{
              background: "var(--surface)",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-12)",
              boxShadow: "var(--shadow-lg)",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            <div className="compounds-grid">
              {[
                {
                  emoji: "☀️",
                  bg: "linear-gradient(135deg, #FFF3C4, #F5C842)",
                  label: "Solar generates",
                  text: "Rooftop PV powers the building during daylight. Surplus is stored in the battery bank.",
                },
                {
                  emoji: "❄️",
                  bg: "linear-gradient(135deg, #D6EFFF, #4FA8DC)",
                  label: "Cold rooms preserve",
                  text: "Multi-zone storage holds produce, dairy, fish, and pharmaceuticals at validated temperature.",
                },
                {
                  emoji: "🚚",
                  bg: "linear-gradient(135deg, #D4F5E2, #3DAB6B)",
                  label: "EV fleet distributes",
                  text: "Battery-electric refrigerated trucks deliver to urban grocers, pharmacies, and export gateways.",
                },
                {
                  emoji: "🧠",
                  bg: "linear-gradient(135deg, #FFD6D6, #E05C5C)",
                  label: "AI optimises",
                  text: "The edge data layer runs the SCADA, predicts demand, and routes the fleet ─ feeding insight back upstream.",
                },
              ].map(({ emoji, bg, label, text }, idx, arr) => (
                <div key={label} className="compound-step">
                  <div
                    className="compound-icon-wrap"
                    style={{ background: bg }}
                  >
                    <span className="compound-emoji">{emoji}</span>
                  </div>
                  {/* {idx < arr.length - 1 && (
                    <span className="compound-arrow">→</span>
                  )} */}
                  <h4
                    style={{
                      marginBottom: "var(--space-2)",
                      marginTop: "var(--space-4)",
                    }}
                  >
                    {label}
                  </h4>
                  <p
                    className="small"
                    style={{ color: "var(--slate-600)", margin: 0 }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "var(--space-10)",
                paddingTop: "var(--space-8)",
                borderTop: "1px solid var(--slate-100)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontStyle: "italic",
                  color: "var(--slate-700)",
                  maxWidth: "60ch",
                  margin: "0 auto",
                }}
              >
                The loop closes when the AI's demand forecasts tell the cold
                rooms which crops to prioritise — and tell the farmer, by SMS,
                what to plant next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== IN OPERATION ========================== */}
      <section
        style={{
          background: "linear-gradient(180deg, var(--paper), var(--leaf-mint))",
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        }}
      >
        <div className="container">
          <div
            className="grid grid-2"
            style={{ alignItems: "center", gap: "var(--space-16)" }}
          >
            <div className="reveal">
              <span className="eyebrow green">In Operation</span>
              <h2>Built once. Run continuously.</h2>
              <p className="lede">
                Every link of the chain — from harvest, through processing and
                storage, to fresh retail and pharmaceutical distribution — runs
                on the same underlying asset.
              </p>
              <p
                style={{
                  color: "var(--slate-700)",
                  marginBottom: "var(--space-6)",
                }}
              >
                The hub is not a single business, it is five-acre operating
                system for everything that must be kept cold, moved efficiently,
                powered cleanly, and tracked digitally.
              </p>

              <ul className="op-list">
                <li>
                  Multi-Zone temperature cold storage (frozen, chilled,
                  controlled ambient)
                </li>
                <li>HACCP and WHO GDP-compliant pharmaceutical zones</li>
                <li>250 kW solar + 500 kWh BESS microgrid</li>
                <li>Sovereign-cloud edge appliance, hyperscale-grade</li>
                <li>V2G-capable electric refrigerated fleet, AI-routed</li>
              </ul>
            </div>

            <div className="img-wrap reveal">
              <img
                src={opsCollage}
                alt="CryoChain operations — cold storage, processing, fresh retail, medical distribution"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================== THE HIDDEN VERTICAL ========================== */}
      <section>
        <div className="container">
          <div
            className="grid grid-2"
            style={{ alignItems: "center", gap: "var(--space-16)" }}
          >
            <div className="img-wrap reveal">
              <img
                src={azureRack}
                alt="Microsoft Azure Local edge appliance inside CryoChain hub"
              />
            </div>

            <div className="reveal">
              <span className="eyebrow">The Hidden Vertical</span>
              <h2>Every hub is a sovereign-cloud node.</h2>
              <p className="lede">
                The highest-margin vertical in modern infrastructure — edge
                colocation — becomes a co-product of cold storage at near-zero
                incremental capital cost.
              </p>
              <p
                style={{
                  color: "var(--slate-700)",
                  marginBottom: "var(--space-8)",
                }}
              >
                Each hub embeds a hyperscale-grade edge appliances, satisfying
                national data-residency requirements and unlocking AI workloads
                that need to run close to where they are consumed
              </p>
              <div className="row" style={{ gap: "var(--space-4)" }}>
                <Link to="/contact" className="btn btn-primary btn-arrow">
                  See the rollout path
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== THE PROOF ========================== */}
      <ProofSection />

      {/* ========================== CTA ========================== */}
      <section>
        <div className="container-narrow text-center reveal">
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              maxWidth: "22ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            From one hub to fifteen — across a continent.
          </h2>
          <p
            className="lede"
            style={{
              maxWidth: "56ch",
              margin: "var(--space-6) auto var(--space-8)",
            }}
          >
            See the path from the first West African hub to the Pan-African
            network by 2031.
          </p>
          <div
            className="row"
            style={{ justifyContent: "center", gap: "var(--space-4)" }}
          >
            <Link to="/vision" className="btn btn-green btn-arrow">
              See the vision
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Talk to the team
            </Link>
          </div>
        </div>
      </section>

      {/* ========================== SOURCES ========================== */}
      <section
        style={{
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-20)",
          background: "var(--paper)",
        }}
      >
        <div className="container">
          <div
            className="reveal"
            style={{
              maxWidth: "980px",
              margin: "0 auto",
              background: "#fff",
              border: "1px solid var(--slate-200)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-12) var(--space-12)",
            }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--slate-500)",
                fontWeight: 600,
                margin: "0 0 var(--space-7) 0",
              }}
            >
              SOURCES CITED ON THIS PAGE
            </p>
            <br />

            {/* Reference rows — number in blue, rest in dark */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-6)",
              }}
            >
              {[
                {
                  num: 2,
                  text: (
                    <>
                      World Health Organization.{" "}
                      <em>
                        Good Distribution Practices for Pharmaceutical Products:
                        WHO Technical Report Series 1025, Annex 7.
                      </em>{" "}
                      WHO, 2023.
                    </>
                  ),
                },
                {
                  num: 10,
                  text: (
                    <>
                      Lineage, Inc.{" "}
                      <em>
                        Form S-1 Registration Statement and IPO Prospectus.
                      </em>{" "}
                      U.S. Securities and Exchange Commission / NASDAQ, 2024.
                    </>
                  ),
                },
                {
                  num: 11,
                  text: (
                    <>
                      Microsoft Corporation.{" "}
                      <em>
                        Microsoft Azure Local: Hybrid Cloud Infrastructure for
                        Sovereign and Edge Workloads.
                      </em>{" "}
                      Microsoft, 2024.
                    </>
                  ),
                },
              ].map(({ num, text }) => (
                <div
                  key={num}
                  style={{
                    display: "flex",
                    gap: "var(--space-3)",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--cryo-blue)",
                      minWidth: "2rem",
                      paddingTop: "1px",
                      lineHeight: 1.6,
                    }}
                  >
                    {num}.
                  </span>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--ink)",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================== STYLES ========================== */}
      <style>{`
        /* Compounds flow */
        .compounds-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-6);
          align-items: start;
        }
        .compound-step {
          position: relative;
          text-align: center;
        }
        .compound-icon-wrap {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .compound-emoji {
          font-size: 2.2rem;
          line-height: 1;
        }
        .compound-arrow {
          position: absolute;
          top: 30px;
          right: -14px;
          font-size: 1.3rem;
          color: var(--slate-300);
          z-index: 2;
          pointer-events: none;
        }

        /* Operation bullet list */
        .op-list {
          list-style: none;
          padding: 0;
          margin: var(--space-6) 0 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .op-list li {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          font-size: 0.9rem;
          color: var(--slate-700);
          line-height: 1.55;
        }
        .op-list li::before {
          content: "✓";
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--leaf-mint);
          color: var(--chain-green-deep);
          font-size: 0.72rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }

        /* Responsive */
        @media (max-width: 960px) {
          .compounds-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-8);
          }
          .compound-arrow { display: none !important; }
        }
        @media (max-width: 768px) {
          .grid.grid-2 { grid-template-columns: 1fr !important; }
          .grid.grid-3 { grid-template-columns: 1fr 1fr !important; }
          .row { flex-wrap: wrap; }
        }
        @media (max-width: 540px) {
          .compounds-grid { grid-template-columns: 1fr !important; }
          .grid.grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default Platform;
