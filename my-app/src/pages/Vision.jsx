import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Vision = () => {
  return (
    <>
      {/* ========================== HERO ========================== */}
      <header className="hero" style={{ paddingBottom: "var(--space-12)" }}>
        <div className="hero-bg"></div>
        <div className="container">
          <div className="reveal" style={{ maxWidth: "1000px" }}>
            <span className="eyebrow">The Vision</span>
            <h1>
              From one hub{" "}
              <span
                style={{
                  color: "var(--chain-green-deep)",
                  fontStyle: "italic",
                }}
              >
                to a continent.
              </span>
            </h1>
            <p className="lede" style={{ maxWidth: "64ch" }}>
              A fifteen-hub Pan-African network by 2031. Phased, self-financing
              from year three. Sequenced to follow the food, the energy, and the
              data — across the regions where they're needed most.
            </p>
          </div>
        </div>
      </header>

      {/* ========================== EXPANSION MAP ========================== */}
      <section className="tight">
        <div className="container">
          <div
            className="reveal text-center"
            style={{ maxWidth: "720px", margin: "0 auto var(--space-12)" }}
          >
            <span className="eyebrow green">The Footprint</span>
            <h2>Fifteen hubs. ~$122.5M of deployed network value.</h2>
          </div>

          <div
            className="reveal"
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              background:
                "linear-gradient(135deg, var(--sky-tint), var(--leaf-mint))",
              borderRadius: "var(--radius-xl)",
              padding: "var(--space-12)",
            }}
          >
            <svg
              viewBox="0 0 800 500"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "auto" }}
            >
              <path
                d="M 80 220 Q 120 160 200 150 L 280 130 Q 340 120 400 140 L 460 130 Q 540 140 600 180 L 660 220 Q 700 260 690 320 L 660 380 Q 600 420 540 410 L 460 400 Q 380 410 320 400 L 240 390 Q 160 380 120 340 L 90 290 Z"
                fill="#FFFFFF"
                stroke="#BAC2CC"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <g
                stroke="#E8ECEF"
                strokeWidth="1"
                strokeDasharray="3 4"
                fill="none"
                opacity="0.6"
              >
                <path d="M 200 150 L 220 380" />
                <path d="M 310 135 L 320 395" />
                <path d="M 420 135 L 430 405" />
                <path d="M 540 145 L 540 410" />
              </g>
              <g
                fill="#6B7785"
                fontFamily="Inter"
                fontSize="11"
                fontWeight="500"
                letterSpacing="1.5"
              >
                <text x="140" y="290" textAnchor="middle">
                  SENEGAL
                </text>
                <text x="260" y="290" textAnchor="middle">
                  CÔTE D'IVOIRE
                </text>
                <text x="370" y="290" textAnchor="middle">
                  GHANA
                </text>
                <text x="480" y="290" textAnchor="middle">
                  NIGERIA
                </text>
                <text x="600" y="290" textAnchor="middle">
                  CAMEROON
                </text>
              </g>
              <g>
                <circle
                  cx="380"
                  cy="310"
                  r="22"
                  fill="#1F78B4"
                  opacity="0.18"
                />
                <circle cx="380" cy="310" r="12" fill="#1F78B4" />
                <circle cx="380" cy="310" r="5" fill="#FFFFFF" />
                <text
                  x="380"
                  y="345"
                  textAnchor="middle"
                  fill="#1A2330"
                  fontFamily="Fraunces"
                  fontSize="13"
                  fontWeight="500"
                >
                  Phase I Anchor
                </text>
                <text
                  x="380"
                  y="360"
                  textAnchor="middle"
                  fill="#6B7785"
                  fontFamily="Inter"
                  fontSize="10"
                >
                  Eastern Region · 2026
                </text>
              </g>
              <circle cx="350" cy="300" r="7" fill="#4CAF50" />
              <circle cx="395" cy="290" r="7" fill="#4CAF50" />
              <circle cx="360" cy="270" r="7" fill="#4CAF50" />
              <circle cx="365" cy="220" r="7" fill="#A5D6A7" />
              <circle cx="375" cy="195" r="7" fill="#A5D6A7" />
              <circle cx="140" cy="260" r="6" fill="#E0A92B" />
              <circle cx="260" cy="320" r="6" fill="#E0A92B" />
              <circle cx="475" cy="320" r="6" fill="#E0A92B" />
              <circle cx="500" cy="350" r="6" fill="#E0A92B" />
              <circle cx="610" cy="340" r="6" fill="#E0A92B" />
              <g
                stroke="#1F78B4"
                strokeWidth="1"
                strokeDasharray="2 3"
                fill="none"
                opacity="0.4"
              >
                <path d="M 380 310 Q 270 280 140 260" />
                <path d="M 380 310 Q 350 340 260 320" />
                <path d="M 380 310 Q 430 320 475 320" />
                <path d="M 380 310 Q 500 320 500 350" />
                <path d="M 380 310 Q 510 320 610 340" />
              </g>
              <g transform="translate(80, 430)">
                <rect
                  x="0"
                  y="0"
                  width="640"
                  height="50"
                  rx="8"
                  fill="#FFFFFF"
                  opacity="0.9"
                />
                <circle cx="20" cy="25" r="6" fill="#1F78B4" />
                <text
                  x="34"
                  y="29"
                  fill="#2E3A46"
                  fontFamily="Inter"
                  fontSize="11"
                  fontWeight="600"
                >
                  Phase I (2026)
                </text>
                <circle cx="160" cy="25" r="6" fill="#4CAF50" />
                <text
                  x="174"
                  y="29"
                  fill="#2E3A46"
                  fontFamily="Inter"
                  fontSize="11"
                  fontWeight="600"
                >
                  Phase I+ &amp; II (2027–28)
                </text>
                <circle cx="340" cy="25" r="6" fill="#A5D6A7" />
                <text
                  x="354"
                  y="29"
                  fill="#2E3A46"
                  fontFamily="Inter"
                  fontSize="11"
                  fontWeight="600"
                >
                  Phase III &amp; IV (2028–30)
                </text>
                <circle cx="510" cy="25" r="6" fill="#E0A92B" />
                <text
                  x="524"
                  y="29"
                  fill="#2E3A46"
                  fontFamily="Inter"
                  fontSize="11"
                  fontWeight="600"
                >
                  Phase V — Pan-African
                </text>
              </g>
            </svg>

            <p
              className="small text-center"
              style={{ marginTop: "var(--space-6)", fontStyle: "italic" }}
            >
              Sequenced expansion across West Africa, with continental extension
              into Côte d'Ivoire, Nigeria, Senegal, and seven additional markets
              by 2031.
            </p>
          </div>
        </div>
      </section>

      {/* ========================== TIMELINE ========================== */}
      <section
        style={{
          background: "var(--surface)",
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        }}
      >
        <div className="container-narrow">
          <div className="reveal" style={{ marginBottom: "var(--space-12)" }}>
            <span className="eyebrow">The Path</span>
            <h2>Phased. Sequenced. Self-financing from year three.</h2>
          </div>

          <div className="timeline reveal">
            {/* Phase I */}
            <div className="timeline-item">
              <div className="timeline-year">2026 · Phase I</div>
              <h4>Anchor Hub — Eastern Region</h4>
              <p style={{ color: "var(--slate-700)" }}>
                The first 30,000-square-foot integrated hub. Sited at a
                strategic highway junction at the intersection of West Africa's
                cocoa, tomato, and export corridors. Anchored by the Ghana
                National Buffer Stock offtake (approximately 14% of facility
                utilisation from Day 1).
              </p>
            </div>
            {/* Phase I */}
            <div className="timeline-item">
              <div className="timeline-year">2027 · Phase I+</div>
              <h4>Cocoa — Belt Expansion</h4>
              <p style={{ color: "var(--slate-700)" }}>
                Two secondary hubs extending the network into the cocoa belt,
                with regional food-processing tenancy and pharma cold chain
                pre-committed
              </p>
            </div>

            {/* Phase II */}
            <div className="timeline-item">
              <div className="timeline-year">2027-28 · Phase II</div>
              <h4>Regional Anchor</h4>
              <p style={{ color: "var(--slate-700)" }}>
                Major regional anchor hub with full pharma-medical deployment,
                including the first embedded EV assembly line and full
                hyperscale-edge-cloud appliance.
              </p>
            </div>

            {/* Phase III */}
            <div className="timeline-item">
              <div className="timeline-year">2028–29 · Phase III</div>
              <h4>Northern Food Corridor</h4>
              <p style={{ color: "var(--slate-700)" }}>
                Expansion into the northern grain and pulse corridor — bringing
                cold storage, processing, and electric logistics to producers
                historically underserved by national infrastruture.
              </p>
            </div>

            {/* Phase IV */}
            <div className="timeline-item">
              <div className="timeline-year">2030 · Phase IV</div>
              <h4>Cross-Border Reach</h4>
              <p style={{ color: "var(--slate-700)" }}>
                Northern hub extending hub into neighbouring lanlocked markets —
                opening up cross-border export flows currently bottlenecked by
                the absence of temperature-controlled transit.
              </p>
            </div>

            {/* Phase V */}
            <div className="timeline-item">
              <div className="timeline-year">2030–31 · Phase V</div>
              <h4>Pan-African Network</h4>
              <p style={{ color: "var(--slate-700)" }}>
                Continent extension across Côte d'Ivoire, Nigeria, Senegal, and
                seven additional countries. Fifteen hubs total.
                <span style={{ fontWeight: 600 }}>
                  ~$122.5M of deployed network value, self-financing from Phase
                  II onwards.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== REVENUE CHART ========================== */}
      <section
        style={{
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        }}
      >
        <div className="container">
          <div
            className="reveal text-center"
            style={{ maxWidth: "720px", margin: "0 auto var(--space-12)" }}
          >
            <span className="eyebrow green">The Trajectory</span>
            <h2>Compounding revenue as the network compounds.</h2>
            <p className="lede" style={{ marginTop: "var(--space-4)" }}>
              Each new hub adds to an inter-vertical revenue base — and the
              network multiplies the value of the hubs already in operation.
            </p>
          </div>

          <div
            className="reveal"
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              background: "var(--surface)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-12)",
              boxShadow: "var(--shadow)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--slate-500)",
                textAlign: "center",
                marginBottom: "var(--space-8)",
              }}
            >
              Network Revenue Trajectory · $M
            </p>

            {/* Bar chart */}
            <div style={{ position: "relative", paddingLeft: "3rem" }}>
              {/* Y-axis grid lines + labels */}
              {[
                { val: "$120", pct: "0%" },
                { val: "$90", pct: "25%" },
                { val: "$60", pct: "50%" },
                { val: "$30", pct: "75%" },
              ].map(({ val, pct }) => (
                <div
                  key={val}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: pct,
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.68rem",
                      color: "var(--slate-400)",
                      width: "2.4rem",
                      textAlign: "right",
                      flexShrink: 0,
                    }}
                  >
                    {val}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      borderTop: "1px dashed var(--slate-100)",
                    }}
                  />
                </div>
              ))}

              {/* Bars container */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  gap: "clamp(var(--space-6), 5vw, var(--space-12))",
                  height: "240px",
                  borderBottom: "2px solid var(--slate-200)",
                  paddingBottom: "0",
                  paddingLeft: "var(--space-4)",
                }}
              >
                {[
                  {
                    label: "Y1",
                    value: 1,
                    display: "$1M",
                    color: "var(--cryo-blue)",
                    colorEnd: "#5aaee8",
                  },
                  {
                    label: "Y2",
                    value: 4,
                    display: "$4M",
                    color: "var(--cryo-blue)",
                    colorEnd: "#5aaee8",
                  },
                  {
                    label: "Y3",
                    value: 9,
                    display: "$13M",
                    color: "var(--chain-green-deep)",
                    colorEnd: "var(--chain-green)",
                  },
                  {
                    label: "Y4",
                    value: 49,
                    display: "$49M",
                    color: "var(--chain-green-deep)",
                    colorEnd: "var(--chain-green)",
                  },
                  {
                    label: "Y5",
                    value: 120,
                    display: "$102M",
                    color: "var(--amber)",
                    colorEnd: "#f5c842",
                  },
                ].map(({ label, value, display, color, colorEnd }) => {
                  const maxVal = 140;
                  const heightPct = (value / maxVal) * 100;
                  return (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "var(--space-1)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
                          fontWeight: 700,
                          color,
                        }}
                      >
                        {display}
                      </span>
                      <div
                        style={{
                          width: "clamp(36px, 6vw, 64px)",
                          height: `${(heightPct / 100) * 220}px`,
                          background: `linear-gradient(180deg, ${color} 0%, ${colorEnd} 100%)`,
                          borderRadius: "5px 5px 0 0",
                          transition: "height 0.3s ease",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* X-axis labels */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "clamp(var(--space-6), 5vw, var(--space-12))",
                  paddingLeft: "var(--space-4)",
                  marginTop: "var(--space-3)",
                }}
              >
                {["Y1", "Y2", "Y3", "Y4", "Y5"].map((l) => (
                  <div
                    key={l}
                    style={{
                      width: "clamp(36px, 6vw, 64px)",
                      textAlign: "center",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--slate-500)",
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
            </div>

            <p
              style={{
                fontSize: "0.68rem",
                color: "var(--slate-400)",
                textAlign: "center",
                marginTop: "var(--space-6)",
                fontStyle: "italic",
              }}
            >
              Internal financial model. Figures rounded; full model available
              under NDA
            </p>
          </div>
        </div>
      </section>

      {/* ========================== PARTNERS ========================== */}
      <section
        style={{
          background: "var(--leaf-mint)",
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        }}
      >
        <div className="container">
          <div
            className="reveal text-center"
            style={{ maxWidth: "720px", margin: "0 auto var(--space-12)" }}
          >
            <span className="eyebrow green">The Wind Behind the Sail</span>
            <h2>
              Sovereign offtake. Hyperscale cloud. Diplomatic coordination.
            </h2>
          </div>

          <div className="grid grid-4 reveal">
            {/* Microsoft */}
            <div
              className="card"
              style={{
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-8)",
                border: "1px solid var(--slate-200)",
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "var(--ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                Microsoft
              </p>
              <p
                className="small"
                style={{
                  color: "var(--cryo-blue)",
                  fontWeight: 600,
                  marginBottom: "var(--space-3)",
                }}
              >
                Hyperscale Cloud
              </p>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Each hub embeds a Microsoft Africa Local appliance — turning our
                edge-storage layer into a sovereign-cloud node and satisfying
                national data-residency requirements at near-zero incremental
                capital cost.
              </p>
            </div>

            {/* HP */}
            <div
              className="card"
              style={{
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-8)",
                border: "1px solid var(--slate-200)",
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "var(--ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                HP
              </p>
              <p
                className="small"
                style={{
                  color: "var(--chain-green-deep)",
                  fontWeight: 600,
                  marginBottom: "var(--space-3)",
                }}
              >
                Device-as-a-Service
              </p>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Hub operations run on HP Device-as-a-Service infrastructure —
                reducing capital expenditure and enabling fully managed endpoint
                compute across every node.
              </p>
            </div>

            {/* Sovereign */}
            <div
              className="card"
              style={{
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-8)",
                border: "1px solid var(--slate-200)",
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "var(--ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                Sovereign
              </p>
              <p
                className="small"
                style={{
                  color: "var(--amber)",
                  fontWeight: 600,
                  marginBottom: "var(--space-3)",
                }}
              >
                Government Anchor
              </p>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                National Buffer Stock organisations provide government offtake
                agreements that anchor each facility's baseline revenue from the
                point of commissioning.
              </p>
            </div>

            {/* Free Zone */}
            <div
              className="card"
              style={{
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-8)",
                border: "1px solid var(--slate-200)",
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "var(--ink)",
                  marginBottom: "var(--space-3)",
                }}
              >
                Free Zone
              </p>
              <p
                className="small"
                style={{
                  color: "var(--coral)",
                  fontWeight: 600,
                  marginBottom: "var(--space-3)",
                }}
              >
                Regulatory Protection
              </p>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Siting hubs inside designated Free Zones provides regulatory
                protection for foreign investment, tax advantages, and
                streamlined import and export processing at every node.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== TEAM ========================== */}
      <section
        style={{
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        }}
      >
        <div className="container">
          <div
            className="reveal"
            style={{ maxWidth: "760px", marginBottom: "var(--space-12)" }}
          >
            <span className="eyebrow">The Operators</span>
            <h2>
              A team that has built EV infrastructure, run global cold-chain
              standards, structured sovereign debt, and launched hyperscale
              cloud at country scale.
            </h2>
          </div>

          <div className="grid grid-3 reveal">
            {/* Will McCoy */}
            <div
              style={{
                padding: "var(--space-8)",
                border: "1px solid var(--slate-200)",
                borderRadius: "var(--radius-lg)",
                background: "var(--surface)",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--cryo-blue), #5aaee8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#fff",
                  marginBottom: "var(--space-5)",
                }}
              >
                WM
              </div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--ink)",
                  marginBottom: "var(--space-1)",
                }}
              >
                Will McCoy ll
              </p>
              <p
                className="small"
                style={{
                  color: "var(--cryo-blue)",
                  fontWeight: 600,
                  marginBottom: "var(--space-4)",
                }}
              >
                Founder &amp; Chief Executive Officer
              </p>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Founded Vehya, the Detriot EV charging platform that closed a
                $2.1M seed in 2024 with DTE Energy and Stellantis as strategic
                partners. 14+ years across EV, solar, and battery
                infrastructure.
              </p>
            </div>

            {/* Maabena Webb */}
            <div
              style={{
                padding: "var(--space-8)",
                border: "1px solid var(--slate-200)",
                borderRadius: "var(--radius-lg)",
                background: "var(--surface)",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--chain-green-deep), var(--chain-green))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#fff",
                  marginBottom: "var(--space-5)",
                }}
              >
                MW
              </div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--ink)",
                  marginBottom: "var(--space-1)",
                }}
              >
                Maabena A. Webb
              </p>
              <p
                className="small"
                style={{
                  color: "var(--chain-green-deep)",
                  fontWeight: 600,
                  marginBottom: "var(--space-4)",
                }}
              >
                Government Relations &amp; Policy
              </p>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Partner &amp; Director of Finance at Agilent Maritime.
                Founder/MD, brighter purpose Group. 20 years in project finance.
                MBA, American University Kogod.
              </p>
            </div>

            {/* Advisory Board */}
            <div
              style={{
                padding: "var(--space-8)",
                border: "1px solid var(--slate-200)",
                borderRadius: "var(--radius-lg)",
                background: "var(--surface)",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--amber), #f5c842)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#fff",
                  marginBottom: "var(--space-5)",
                }}
              >
                {/* ⚡ */}+
              </div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--ink)",
                  marginBottom: "var(--space-1)",
                }}
              >
                Advisory Board
              </p>
              <p
                className="small"
                style={{
                  color: "var(--amber)",
                  fontWeight: 600,
                  marginBottom: "var(--space-4)",
                }}
              >
                Institutional credibility{" "}
              </p>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Senior leadership from the Global Cold Chain Alliance, the shell
                Foundation, billion-dollar tech-facility delivery, marketing
                &amp; AI transformation at hyperscale, and former senior IMF
                legal counsel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== EXIT PATHWAYS ========================== */}
      <section
        style={{
          background: "var(--slate-900)",
          color: "var(--slate-100)",
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        }}
      >
        <div className="container">
          <div
            className="reveal text-center"
            style={{ maxWidth: "680px", margin: "0 auto var(--space-12)" }}
          >
            <span className="eyebrow" style={{ color: "var(--slate-400)" }}>
              The Long Game
            </span>
            <h2 style={{ color: "#fff" }}>
              Three pathways to a billion-dollar valuation by 2031.
            </h2>
            <p
              style={{ color: "var(--slate-400)", marginTop: "var(--space-4)" }}
            >
              The model is not built around a single exit. The network's value
              can be unlocked through whichever pathway the macro-environment
              favours.
            </p>
          </div>

          {/* Three pathway cards */}
          <div className="grid grid-3 reveal" style={{ gap: "var(--space-6)" }}>
            {/* Strategic M&A */}
            <div
              style={{
                padding: "var(--space-8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "var(--radius-lg)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <p
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--slate-400)",
                  fontWeight: 600,
                  marginBottom: "var(--space-4)",
                }}
              >
                Strategic M&amp;A
              </p>
              <p
                className="small"
                style={{ color: "var(--slate-300)", lineHeight: 1.65 }}
              >
                Acquisition by a global cold-chain consolidator, logistics
                major, or infrastucture platform. Comparatable transactions in
                the @$3-18B range{" "}
              </p>
            </div>

            {/* REIT Conversion */}
            <div
              style={{
                padding: "var(--space-8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "var(--radius-lg)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <p
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--slate-400)",
                  fontWeight: 600,
                  marginBottom: "var(--space-4)",
                }}
              >
                REIT Conversion
              </p>
              <p
                className="small"
                style={{ color: "var(--slate-300)", lineHeight: 1.65 }}
              >
                Conversion of the hub network into a real-state investment
                trust, with the cold-storage assets as the anchor portfolio
              </p>
            </div>

            {/* Public Listing */}
            <div
              style={{
                padding: "var(--space-8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "var(--radius-lg)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <p
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--slate-400)",
                  fontWeight: 600,
                  marginBottom: "var(--space-4)",
                }}
              >
                Public Listing
              </p>
              <p
                className="small"
                style={{ color: "var(--slate-300)", lineHeight: 1.65 }}
              >
                Local stock-exchange listing, regional dual-listing, or NASDAQ
                pathway ─ following the lineage logistics precedent.
                <sup style={{ color: "var(--cryo-blue)" }}>[10]</sup>
              </p>
            </div>
          </div>

          {/* $1B+ callout */}
          <div
            className="reveal"
            style={{
              marginTop: "var(--space-14)",
              textAlign: "center",
              paddingTop: "var(--space-10)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
                marginBottom: "var(--space-3)",
              }}
            >
              $1B+{" "}
              <span
                style={{
                  color: "var(--chain-green-light)",
                  fontStyle: "italic",
                }}
              >
                pathway by 2031
              </span>
            </p>
            <br />
            <p
              style={{
                // color: "var(--slate-400)",
                fontSize: "0.85rem",
                fontWeight: 200,
              }}
            >
              Following the Lineage Logistics trajectory at fifteen-hub
              Pan-African scale.
            </p>
          </div>
        </div>
      </section>

      {/* ========================== FINAL CTA ========================== */}
      <section>
        <div className="container-narrow text-center reveal">
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              maxWidth: "24ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Anchor the cold chain backbone of a continent.
          </h2>
          <p
            className="lede"
            style={{
              maxWidth: "56ch",
              margin: "var(--space-6) auto var(--space-8)",
            }}
          >
            A small number of strategic partners. A defined path. A 30-minute
            first conversation.
          </p>
          <div className="row" style={{ justifyContent: "center" }}>
            <Link to="/contact" className="btn btn-primary btn-arrow">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>

      {/* ========================== SOURCES ========================== */}
      <section
        style={{
          paddingTop: "var(--space-12)",
          paddingBottom: "var(--space-16)",
          borderTop: "1px solid var(--slate-200)",
        }}
      >
        <div className="container">
          <div
            className="reveal"
            style={{
              maxWidth: "780px",
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
                color: "var(--slate-400)",
                fontWeight: 600,
                margin: "0 0 var(--space-8) 0",
              }}
            >
              SOURCES CITED ON THIS PAGE
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              {[
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
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "var(--cryo-blue)",
                      minWidth: "1.8rem",
                      paddingTop: "1px",
                      lineHeight: 1.6,
                    }}
                  >
                    {num}.
                  </span>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--slate-600)",
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

      {/* ========================== MOBILE STYLES ========================== */}
      <style>{`
        /* Timeline */
        .timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-left: 2px solid var(--slate-200);
          padding-left: 0;
          margin-left: var(--space-4);
        }
        .timeline-item {
          position: relative;
          padding: 0 0 var(--space-10) var(--space-8);
        }
        .timeline-item::before {
          content: "";
          position: absolute;
          left: -7px;
          top: 6px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--cryo-blue);
          border: 2px solid #fff;
          box-shadow: 0 0 0 2px var(--cryo-blue);
        }
        .timeline-year {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cryo-blue);
          margin-bottom: var(--space-2);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .grid.grid-4 { grid-template-columns: 1fr 1fr !important; }
          .grid.grid-3 { grid-template-columns: 1fr 1fr !important; }
          .grid.grid-2 { grid-template-columns: 1fr !important; }
          .row { flex-wrap: wrap; }
        }
        @media (max-width: 480px) {
          .grid.grid-4 { grid-template-columns: 1fr !important; }
          .grid.grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default Vision;
