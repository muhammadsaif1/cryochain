import React from "react";
import "../index.css";

// Image Import
import azureRack from "../assets/images/azure-rack.png";

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

            {/* Food Image Placeholder */}
            <div className="img-placeholder reveal">
              <div className="ph-label">Image · Food</div>
              <div className="ph-title">"The harvest meets the cold chain"</div>
              <div className="ph-prompt">
                A West African farmer beside crates of fresh produce, with a
                refrigerated electric truck arriving.
              </div>
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
            {/* Health Image Placeholder */}
            <div className="img-placeholder reveal">
              <div className="ph-label">Image · Health</div>
              <div className="ph-title">"The last mile of medicine"</div>
              <div className="ph-prompt">
                A community pharmacist stocking a medical-grade refrigerator
                with vaccines.
              </div>
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

            {/* Logistics Image Placeholder */}
            <div className="img-placeholder reveal">
              <div className="ph-label">Image · Movement</div>
              <div className="ph-title">"The fleet powers itself"</div>
              <div className="ph-prompt">
                Electric box trucks charging under a solar canopy with battery
                storage.
              </div>
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
                African nations are mandating that citizen and government data
                remain on national soil.
              </p>
              <p style={{ color: "var(--slate-700)" }}>
                The African edge data centre market is projected to grow at
                roughly <strong>22% CAGR through 2030</strong>.
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
          </div>
        </div>
      </section>

      {/* CAGR CHART SECTION */}
      <section
        style={{
          background: "var(--surface)",
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        }}
      >
        <div className="container">
          <div
            className="reveal"
            style={{
              textAlign: "center",
              maxWidth: "720px",
              margin: "0 auto var(--space-12)",
            }}
          >
            <span className="eyebrow">Three Verticals · One Asset</span>
            <h2>Riding three high-growth curves at once.</h2>
          </div>

          {/* CAGR SVG Chart - You can keep the full <svg> code here (same as HTML) */}
          {/* ... Paste the full SVG from your original HTML ... */}
        </div>
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
            <a href="/platform" className="btn btn-primary btn-arrow">
              Explore the platform
            </a>
            <a href="/contact" className="btn btn-ghost">
              Talk to the team
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Crisis;
