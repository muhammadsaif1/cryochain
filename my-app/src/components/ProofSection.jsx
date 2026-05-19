import React from "react";
import tesla from "../assets/images/tesla.jpeg";
import lineage from "../assets/images/lineage.jpeg";

function ProofSection() {
  return (
    <div>
      {" "}
      <section
        style={{
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
          background: "#e4eded64",
        }}
      >
        <div className="container">
          {/* eyebrow + headline */}
          <div
            className="reveal text-center"
            style={{ maxWidth: "680px", margin: "0 auto var(--space-12)" }}
          >
            <span className="eyebrow">The Proof</span>
            <h2>Two comparators. One playbook.</h2>
            <p className="lede" style={{ marginTop: "var(--space-4)" }}>
              The two highest-multiple infrastructure stories of the last two
              decades — run together, in a market 10× larger.
            </p>
          </div>

          {/* Two comparator cards */}
          <div
            className="grid grid-2 reveal"
            style={{ gap: "var(--space-8)", alignItems: "stretch" }}
          >
            {/* Card left — Cold Chain Infrastructure */}
            <div
              className="card"
              style={{
                padding: "var(--space-12)",
                border: "1px solid var(--slate-200)",
                borderRadius: "var(--radius-lg)",
                background: "#e4fafb99",
              }}
            >
              <span
                className="eyebrow"
                style={{
                  color: "var(--cryo-blue)",
                  marginBottom: "var(--space-4)",
                  display: "block",
                }}
              >
                COLD CHAIN INFRASTRUCTURE
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "var(--space-3)",
                  marginBottom: "var(--space-6)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  $20M
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    color: "var(--slate-400)",
                  }}
                >
                  →
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  $18B
                </span>
              </div>
              <div>
                <img
                  src={lineage}
                  alt="Tesla"
                  style={{
                    marginBottom: "20px",
                    display: "block",
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <p
                className="small"
                style={{
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--slate-600)",
                  marginBottom: "var(--space-3)",
                }}
              >
                LINEAGE LOGISTICS . Seed(2008) → NASDAQ IPO (2024)
                <sup className="cite" data-src="Lineage Logistics IPO, 2024.">
                  [10]
                </sup>
              </p>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Lineage built the world's largest cold-chain operator by
                consolidating fragmented temperature-controlled assets━in a
                market that was already 85%+ penetrated. We are running the same
                playbook in a market roughly 10x larger and starting from 2%
                penetration
              </p>
            </div>

            {/* Card right — Vertical Investment */}
            <div
              className="card"
              style={{
                padding: "var(--space-12)",
                border: "1px solid var(--slate-200)",
                borderRadius: "var(--radius-lg)",
                background: "#e4fafb99",
              }}
            >
              <span
                className="eyebrow green"
                style={{ marginBottom: "var(--space-4)", display: "block" }}
              >
                VERTICAL INTEGRATION
              </span>
              <div className="value-row">
                <span className="value">5 verticals</span>
                <span className="arrow">→</span>
                <span className="value">$700B+</span>
              </div>
              <div>
                <img
                  src={tesla}
                  alt="Lineage"
                  style={{
                    marginBottom: "20px",
                    display: "block",
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <p
                className="small"
                style={{
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--slate-600)",
                  marginBottom: "var(--space-3)",
                }}
              >
                Tesla . Vehicles . Autonomy . Storage . Solar . Charging
              </p>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Tesla stacked five adjacencies on a single platform. Each
                compunded the next. CryoChain launches with nine verticals on a
                single hub asset━more diversified than Tesla at its IPO
              </p>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .proof-card {
          padding: var(--space-12);
          border: 1px solid var(--slate-200);
          border-radius: var(--radius-lg);
          background: #e4fafb99;
          display: flex;
          flex-direction: column;
        }

        .value-row {
          display: flex;
          align-items: baseline;
          gap: var(--space-3);
          margin: var(--space-6) 0;
          flex-wrap: wrap;
        }

        .value {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          color: var(--ink);
          line-height: 1.1;
        }

        .arrow {
          font-family: var(--font-display);
          font-size: 1.4rem;
          color: var(--slate-400);
        }

        .proof-img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          margin-bottom: 20px;
          object-fit: cover;
        }

        .uppercase {
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--slate-600);
          margin-bottom: var(--space-3);
        }

        .description {
          color: var(--slate-700);
          margin-top: auto; /* pushes text to bottom */
        }

        /* ==================== MOBILE FIXES ==================== */
        @media (max-width: 768px) {
          .grid.grid-2 {
            display: flex !important;
            flex-direction: column !important;
            gap: 32px !important;
          }

          .proof-card {
            text-align: center;
            padding: 28px 20px;
          }

          .value-row {
            justify-content: center;
            margin: 24px 0;
          }

          .value-row .value {
            font-size: 2.1rem;
          }

          .proof-img {
            margin: 16px auto 20px;
          }

          .small {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default ProofSection;
