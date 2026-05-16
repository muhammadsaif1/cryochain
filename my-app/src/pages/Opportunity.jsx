import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

// Image Import
import azureRack from "../assets/images/azure-rack.png";
import Food from "../assets/images/crisis-01-farmer-loss.jpg";
import Refrigerator from "../assets/images/crisis-02-pharmacy.jpg";
import Logistics from "../assets/images/crisis-03-ev-logistics.jpg";

const Crisis = () => {
  return (
    <>
      {/* HERO */}
      <header className="hero" style={{ paddingBottom: "var(--space-12)" }}>
        <div className="hero-bg"></div>
        <div className="container">
          <div className="reveal" style={{ maxWidth: "900px" }}>
            <span className="eyebrow">The Opportunity</span>
            <h1>
              $4 billion lost every year.{" "}
              <span style={{ color: "var(--cryo-blue)", fontStyle: "italic" }}>
                Because the cold chain doesn't exist yet.
              </span>
            </h1>
            <p className="lede" style={{ maxWidth: "62ch" }}>
              West Africa is missing four pieces of infrastructure at once —
              food preservation, medical distribution, electrified logistics,
              and sovereign edge compute.
            </p>
          </div>
        </div>
      </header>

      {/* HEADLINE STATS */}
      <section className="tight" style={{ paddingTop: "var(--space-8)" }}>
        <div className="container">
          <div className="grid grid-4 reveal">
            <div className="stat-card">
              <div className="stat-num">40%</div>
              <div className="stat-label">
                of produce lost before reaching consumers in sub-Saharan Africa
              </div>
              <div className="stat-source">
                FAO
                <sup
                  className="cite"
                  data-src="FAO, The State of Food and Agriculture 2024."
                >
                  [1]
                </sup>
              </div>
            </div>
            <div className="stat-card green">
              <div className="stat-num">$4B+</div>
              <div className="stat-label">
                annual economic loss from food waste in West Africa
              </div>
              <div className="stat-source">
                World Bank
                <sup
                  className="cite"
                  data-src="World Bank, West Africa Food Security Outlook, 2023."
                >
                  [4]
                </sup>
              </div>
            </div>
            <div className="stat-card amber">
              <div className="stat-num">600M</div>
              <div className="stat-label">
                Africans without access to safe cold storage
              </div>
              <div className="stat-source">
                GCCA
                <sup
                  className="cite"
                  data-src="Global Cold Chain Alliance, Global Cold Chain Capacity Report, 2023."
                >
                  [12]
                </sup>
              </div>
            </div>
            <div className="stat-card coral">
              <div className="stat-num">2%</div>
              <div className="stat-label">
                cold storage penetration vs 15%+ in developed markets
              </div>
              <div className="stat-source">
                IFC
                <sup
                  className="cite"
                  data-src="IFC / World Bank Group, Cold Chain Development in Africa, 2023."
                >
                  [3]
                </sup>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 — FOOD */}
      <section>
        <div className="container">
          <div
            className="grid grid-2"
            style={{ alignItems: "center", gap: "var(--space-16)" }}
          >
            <div className="reveal">
              <span className="eyebrow">01 · Food</span>
              <h2>The harvest is the easy part.</h2>
              <p className="lede">
                West Africa grows enough food to feed itself and a meaningful
                share of the world. What it cannot do — yet — is preserve and
                move it.
              </p>
              <p style={{ color: "var(--slate-700)" }}>
                Approximately <strong>40% of all produce</strong> is lost before
                reaching a consumer.
              </p>
              <p style={{ color: "var(--slate-700)" }}>
                Africa holds roughly{" "}
                <strong>
                  60% of the world's remaining uncultivated arable land
                </strong>{" "}
                — the world's largest greenfield agricultural frontier.
              </p>
            </div>

            <div className="img-wrap reveal">
              <img src={Food} alt="Food That Cannot Wait" />
            </div>
          </div>
        </div>
      </section>

      {/* 02 — HEALTH */}
      <section
        style={{
          background: "var(--leaf-mint)",
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        }}
      >
        <div className="container">
          <div
            className="grid grid-2"
            style={{ alignItems: "center", gap: "var(--space-16)" }}
          >
            <div className="img-wrap reveal">
              <img src={Refrigerator} alt=" Medicine That Cannot Reach" />
            </div>

            <div className="reveal">
              <span className="eyebrow green">02 · Health</span>
              <h2>Vaccines fail in the last mile.</h2>
              <p className="lede">
                The World Health Organization requires pharmaceutical products
                to be moved within tight, validated temperature ranges.
              </p>
              <p style={{ color: "var(--slate-700)" }}>
                Vaccine wastage from temperature excursions is a chronic
                public-health risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — LOGISTICS */}
      <section>
        <div className="container">
          <div
            className="grid grid-2"
            style={{ alignItems: "center", gap: "var(--space-16)" }}
          >
            <div className="reveal">
              <span className="eyebrow" style={{ color: "var(--amber)" }}>
                03 · Movement
              </span>
              <h2>The fleet is diesel. The grid is intermittent.</h2>
              <p className="lede">
                Refrigerated transport in West Africa runs on diesel — expensive
                and volatile.
              </p>
              <p style={{ color: "var(--slate-700)" }}>
                The African EV market is projected to grow at roughly{" "}
                <strong>24% CAGR through 2030</strong>.
              </p>
            </div>

            <div className="img-wrap reveal">
              <img src={Logistics} alt=" Logistics That Cannot Move" />
            </div>
          </div>
        </div>
      </section>

      {/* 04 — DATA */}
      <section
        style={{
          background: "var(--sky-tint)",
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        }}
      >
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
              <span className="eyebrow" style={{ color: "var(--coral)" }}>
                04 · Data
              </span>
              <h2>Sovereign data needs somewhere to live.</h2>
              <p className="lede">
                African nations are mandating that citizen data, government
                workloads, and regulated industry compute remain on national
                soil.
                <sup
                  className="cite"
                  data-src="Republic of Ghana, Data Protection Act 2012 (Act 843); Cybersecurity Act 2020 (Act 1038)."
                >
                  [6]
                </sup>
              </p>
              <p style={{ color: "var(--slate-700)" }}>
                The African edge data centre market is projected to grow at
                roughly <strong>22% CAGR through 2030</strong>.
              </p>
              <p style={{ color: "var(--slate-700)" }}>
                Building in that already has a visible edge appliance on a
                sovereign-cloud node is, in effect, an enormous data centre
                facility to do effect, an enormous data centre node — remote
                control, piloted.
              </p>
              <p style={{ color: "var(--slate-700)" }}>
                Every hub has already a hyperscale-grade edge appliance on every
                facility data a sovereign-cloud node and is completing the
                highest margin vertical in modern infrastructure this is a
                sovereign-AI cold storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GREENFIELD CALLOUT */}
      <section>
        <div className="container">
          <div
            className="reveal"
            style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
          >
            <span className="eyebrow green">The Greenfield</span>
            <h2>The largest infrastructure opportunity left on the planet.</h2>
          </div>

          {/* Penetration Gap Chart */}
          <div
            className="reveal"
            style={{
              margin: "var(--space-12) auto 0",
              maxWidth: "880px",
              background: "var(--surface)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-12)",
              boxShadow: "var(--shadow)",
            }}
          >
            <h4
              style={{
                textAlign: "center",
                marginBottom: "var(--space-8)",
                fontSize: "0.78rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--slate-500)",
              }}
            >
              Cold Storage Penetration · By Market
            </h4>

            {/* Africa Bar */}
            <div style={{ marginBottom: "var(--space-8)" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "var(--space-2)",
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--slate-900)" }}>
                  Africa
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    color: "var(--coral)",
                    fontWeight: 500,
                  }}
                >
                  ~2%
                </span>
              </div>
              <div
                style={{
                  height: "16px",
                  background: "var(--slate-50)",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "2%",
                    background: "linear-gradient(90deg, var(--coral), #F58B73)",
                  }}
                ></div>
              </div>
            </div>

            {/* Developed Markets Bar */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "var(--space-2)",
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--slate-900)" }}>
                  Developed Markets (US, EU, Japan)
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    color: "var(--chain-green-deep)",
                    fontWeight: 500,
                  }}
                >
                  ~15%+
                </span>
              </div>
              <div
                style={{
                  height: "16px",
                  background: "var(--slate-50)",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "70%",
                    background:
                      "linear-gradient(90deg, var(--chain-green-deep), var(--chain-green))",
                  }}
                ></div>
              </div>
            </div>
            <br />
            <p style={{ margin: 0, textAlign: "center", fontWeight: 100 }}>
              Source: IFC, Cold Chain Development in Africa, 2023
              <sup className="cite">[3]</sup>
              Bars scaled for visual clarity.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== CAGR CHART SECTION ===================== */}
      <section
        style={{
          background: "var(--surface)",
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        }}
      >
        <div className="container">
          {/* Headline */}
          <div
            className="reveal text-center"
            style={{
              maxWidth: "720px",
              margin: "0 auto var(--space-12)",
            }}
          >
            <span className="eyebrow">Three Verticals · One Asset</span>
            <h2>Riding three high-growth curves at once.</h2>
            <p className="lede" style={{ marginTop: "var(--space-4)" }}>
              Cold chain. Edge data centres. Electric vehicles. These are the
              three highest-growth infrastructure categories on the continent —
              and the only platform serving all three on a single hub.
            </p>
          </div>

          {/* Bar chart */}
          {/* CAGR Chart - Fully Responsive */}
          <div
            className="reveal cagr-chart"
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              background: "#ffffff",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-12)",
              boxShadow: "var(--shadow)",
            }}
          >
            <p
              className="chart-title"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--slate-400)",
                marginBottom: "var(--space-8)",
                textAlign: "center",
              }}
            >
              Projected CAGR 2024 – 2030
            </p>

            <div
              className="chart-container"
              style={{
                position: "relative",
                height: "320px",
                marginBottom: "var(--space-8)",
              }}
            >
              {/* Grid Lines + Y Labels - Now goes to 30% */}
              <div
                className="grid-lines"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column-reverse",
                  justifyContent: "space-between",
                  pointerEvents: "none",
                }}
              >
                {[0, 5, 10, 15, 20, 25, 30].map((val) => (
                  <div
                    key={val}
                    className="grid-line"
                    style={{
                      borderTop:
                        val === 0
                          ? "2px solid var(--slate-300)"
                          : "1px dashed #d1d5db",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <span
                      className="y-label"
                      style={{
                        position: "absolute",
                        left: "-34px",
                        top: "-10px",
                        fontSize: "0.75rem",
                        color: "var(--slate-400)",
                        width: "28px",
                        textAlign: "right",
                      }}
                    >
                      {val}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Bars */}
              <div
                className="bars-wrapper"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  gap: "clamp(60px, 10vw, 100px)",
                }}
              >
                {/* Bar 1 - 17.7% */}
                <div
                  className="bar-item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <span
                    className="bar-value"
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 700,
                      color: "var(--cryo-blue)",
                    }}
                  >
                    17.7%
                  </span>
                  <div
                    className="bar"
                    style={{
                      width: "80px",
                      height: `${(17.7 / 30) * 100}%`,
                      background:
                        "linear-gradient(to top, var(--cryo-blue), #60a5fa)",
                      borderRadius: "8px 8px 0 0",
                      minHeight: "4px",
                    }}
                  />
                </div>

                {/* Bar 2 - 22% */}
                <div
                  className="bar-item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <span
                    className="bar-value"
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 700,
                      color: "var(--chain-green-deep)",
                    }}
                  >
                    22%
                  </span>
                  <div
                    className="bar"
                    style={{
                      width: "80px",
                      height: `${(22 / 30) * 100}%`,
                      background:
                        "linear-gradient(to top, var(--chain-green-deep), var(--chain-green))",
                      borderRadius: "8px 8px 0 0",
                      minHeight: "4px",
                    }}
                  />
                </div>

                {/* Bar 3 - 24% */}
                <div
                  className="bar-item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <span
                    className="bar-value"
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 700,
                      color: "var(--amber)",
                    }}
                  >
                    24%
                  </span>
                  <div
                    className="bar"
                    style={{
                      width: "80px",
                      height: `${(24 / 30) * 100}%`,
                      background:
                        "linear-gradient(to top, var(--amber), #fcd34d)",
                      borderRadius: "8px 8px 0 0",
                      minHeight: "4px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* X-Axis Labels */}
            <div
              className="x-axis"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "clamp(60px, 10vw, 100px)",
              }}
            >
              {[
                { label: "Cold Chain", desc: "Logistics" },
                { label: "Edge Data", desc: "Centres" },
                { label: "Electric", desc: "Logistics" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="x-label"
                  style={{ textAlign: "center" }}
                >
                  <span
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.label}
                    <br />
                    <span style={{ fontWeight: 400 }}>{item.desc}</span>
                  </span>
                </div>
              ))}
            </div>
            <br />
            <p style={{ margin: 0, textAlign: "center", fontWeight: 100 }}>
              Sources: Mordor Intelligence (Cold Chain)
              <sup className="cite">[7]</sup>, Arizton (Edge Data)
              <sup className="cite">[8]</sup>, McKinsey (EV)
              <sup className="cite">[9]</sup>.
            </p>
          </div>
        </div>

        <style>{`
    /* Mobile styles (up to 767px) */
    @media (max-width: 767px) {
      .cagr-chart {
        padding: var(--space-6) !important;
        max-width: 100% !important;
      }
      
      .chart-title {
        font-size: 0.6rem !important;
        margin-bottom: var(--space-4) !important;
      }
      
      .chart-container {
        height: 220px !important;
        margin-bottom: var(--space-4) !important;
      }
      
      .y-label {
        font-size: 0.55rem !important;
        left: -24px !important;
        width: 20px !important;
        top: -8px !important;
      }
      
      .grid-line {
        border-top-width: 0.5px !important;
      }
      
      .bars-wrapper {
        gap: 20px !important;
      }
      
      .bar-item {
        gap: 4px !important;
      }
      
      .bar-value {
        font-size: 0.85rem !important;
      }
      
      .bar {
        width: 40px !important;
        border-radius: 4px 4px 0 0 !important;
      }
      
      .x-axis {
        gap: 20px !important;
      }
      
      .x-label span {
        font-size: 0.65rem !important;
      }
    }
    
    /* Small mobile (up to 480px) */
    @media (max-width: 480px) {
      .bars-wrapper {
        gap: 12px !important;
      }
      
      .bar {
        width: 32px !important;
      }
      
      .bar-value {
        font-size: 0.7rem !important;
      }
      
      .x-axis {
        gap: 12px !important;
      }
      
      .x-label span {
        font-size: 0.55rem !important;
      }
      
      .y-label {
        font-size: 0.5rem !important;
        left: -20px !important;
        width: 16px !important;
      }
      
      .chart-container {
        height: 180px !important;
      }
    }
  `}</style>
      </section>
      {/* FINAL CTA */}
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
            The infrastructure to fix all four — built once, run nine ways.
          </h2>
          <p
            className="lede"
            style={{
              maxWidth: "56ch",
              margin: "var(--space-6) auto var(--space-8)",
            }}
          >
            See how nine compounding verticals fit on a single physical asset.
          </p>
          <div className="row" style={{ justifyContent: "center" }}>
            <Link to="/platform" className="btn btn-primary btn-arrow">
              Explore the platform
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Talk to the team
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== REFERENCES SECTION ===================== */}
      <section
        style={{
          background: "var(--paper)",
          paddingTop: "var(--space-16)",
          // margin: "0 auto",
          paddingBottom: "var(--space-16)",
          borderTop: "1px solid var(--slate-200)",
        }}
      >
        <div className="container">
          <div
            className="reveal"
            style={{
              maxWidth: "1000px",
              background: "var(--surface)",
              margin: "0 auto",

              border: "1px solid var(--slate-200)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-12)",
            }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--slate-500)",
                fontWeight: 600,
                marginBottom: "var(--space-6)",
                margin: "0 0 var(--space-6) 0",
              }}
            >
              SOURCES CITED ON THIS PAGE
            </p>

            <ol
              style={{
                listStyleType: "decimal",
                paddingLeft: "1.4rem",
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
              }}
              className="sources-list"
            >
              {/* Each item: number auto from <ol>, author normal, title italic, publisher normal */}
              {[
                <>
                  Food and Agriculture Organization.{" "}
                  <em>
                    The State of Food and Agriculture 2024: Agrifood Systems and
                    Post-Harvest Loss in Sub-Saharan Africa.
                  </em>{" "}
                  Rome: FAO, 2024.
                </>,
                <>
                  World Health Organization.{" "}
                  <em>
                    Good Distribution Practices for Pharmaceutical Products: WHO
                    Technical Report Series 1025, Annex 7.
                  </em>{" "}
                  WHO, 2023.
                </>,
                <>
                  International Finance Corporation.{" "}
                  <em>Cold Chain Development in Africa.</em> IFC / World Bank
                  Group, 2023.
                </>,
                <>
                  World Bank.{" "}
                  <em>
                    West Africa Food Security Outlook: Cold Chain and
                    Post-Harvest Loss Mitigation.
                  </em>{" "}
                  World Bank, 2023.
                </>,
                <>
                  FAO / UN Statistical Division.{" "}
                  <em>Africa's Uncultivated Arable Land Inventory.</em> 2023.
                </>,
                <>
                  Republic of Ghana.{" "}
                  <em>
                    Data Protection Act 2012 (Act 843); Cybersecurity Act 2020
                    (Act 1038).
                  </em>{" "}
                  Comparable frameworks exist across West African jurisdictions.
                </>,
                <>
                  Mordor Intelligence.{" "}
                  <em>
                    Africa Cold Chain Logistics Market — Growth, Trends, and
                    Forecasts (2024–2030).
                  </em>
                </>,
                <>
                  Arizton Advisory &amp; Intelligence.{" "}
                  <em>
                    Africa Data Center Market — Industry Outlook &amp; Forecast
                    2024–2030.
                  </em>
                </>,
                <>
                  McKinsey &amp; Company.{" "}
                  <em>
                    Power to Move: Accelerating the Electric Transition in
                    Africa.
                  </em>{" "}
                  2024.
                </>,
                <>
                  Global Cold Chain Alliance.{" "}
                  <em>Global Cold Chain Capacity Report.</em> GCCA, 2023.
                </>,
              ].map((content, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--slate-600)",
                    lineHeight: 1.65,
                    paddingLeft: "var(--space-2)",
                  }}
                >
                  {content}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===================== MOBILE RESPONSIVE OVERRIDES ===================== */}
      <style>{`
        @media (max-width: 768px) {
          /* Stack all two-col grids */
          .grid.grid-2 {
            grid-template-columns: 1fr !important;
          }
          /* Stack four-col stat cards to two */
          .grid.grid-4 {
            grid-template-columns: 1fr 1fr !important;
          }
          /* Footer nav grid 2-col on tablet */
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
          /* CTA buttons stack */
          .row {
            flex-wrap: wrap;
          }
          /* CAGR chart: shrink grid lines label */
          .cagr-y-label {
            display: none;
          }
        }

        @media (max-width: 480px) {
          /* Stat cards single col on small phones */
          .grid.grid-4 {
            grid-template-columns: 1fr !important;
          }
          /* Footer single col */
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
          /* Footer bottom row stack */
          footer .container > div:last-child {
            flex-direction: column;
            align-items: flex-start;
          }
          /* References grid single col */
          ol[style] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

/* ── tiny helper so footer columns stay DRY ── */
const FooterCol = ({ title, links }) => (
  <div>
    <p
      className="small"
      style={{
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#fff",
        marginBottom: "var(--space-4)",
      }}
    >
      {title}
    </p>
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
      }}
    >
      {links.map(([label, to]) => (
        <Link
          key={label}
          to={to}
          className="small"
          style={{
            color: "var(--slate-400)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--slate-400)")
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  </div>
);

export default Crisis;
