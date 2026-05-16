import React from "react";
import "../index.css"; // Your styles (converted from styles.css)
import logo from "../assets/images/logo-horizontal.png";
import hubVision from "../assets/images/hub-vision.png";
import MissingSections from "../components/HomeMissingSections";

const CryoChain = () => {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <header className="hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="reveal" style={{ maxWidth: "1100px" }}>
            <span className="pill">
              <span className="dot"></span>&nbsp;Now Building · Phase I · West
              Africa
            </span>
            <h1
              style={{
                marginTop: "var(--space-6)",
                marginBottom: "var(--space-8)",
              }}
            >
              Africa will feed the world.
              <br />
              <span style={{ color: "var(--cryo-blue)", fontStyle: "italic" }}>
                We are building
              </span>{" "}
              the infrastructure
              <br />
              to preserve and move it.
            </h1>
            <p className="lede" style={{ maxWidth: "64ch" }}>
              A vertically integrated platform — cold storage, electric
              logistics, solar microgrids, and edge-AI data — designed for the
              markets where 600 million people still live without reliable
              refrigeration.
            </p>
            <div className="row mt-8">
              <a href="/opportunity" className="btn btn-primary btn-arrow">
                See the opportunity
              </a>
              <a href="/platform" className="btn btn-ghost">
                How the platform works
              </a>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div
            className="img-wrap mt-12 reveal"
            style={{
              marginTop: "var(--space-16)",
              borderRadius: "var(--radius-xl)",
              aspectRatio: "16/9",
              position: "relative",
            }}
          >
            <img
              src={hubVision}
              alt="CryoChain integrated hub vision — cold storage, EV charging, solar microgrid, edge data centre"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </header>

      {/* ============================ THE STORY ============================ */}
      <section style={{ paddingTop: "var(--space-16)" }}>
        <div className="container-narrow">
          <div className="reveal text-center">
            <span className="eyebrow green">The Story</span>
            <h2
              style={{
                maxWidth: "22ch",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              A continent at an inflection point.
            </h2>
          </div>

          <div className="reveal" style={{ marginTop: "var(--space-12)" }}>
            <p
              className="lede"
              style={{ maxWidth: "62ch", margin: "0 auto var(--space-6)" }}
            >
              A smallholder cocoa farmer loses nearly half of her annual harvest
              before it ever reaches a buyer.
              <sup
                className="cite"
                data-src="FAO, The State of Food and Agriculture 2024."
              >
                [1]
              </sup>
            </p>
            <p
              className="lede"
              style={{ maxWidth: "62ch", margin: "0 auto var(--space-6)" }}
            >
              Multiply this across{" "}
              <strong>
                600 million Africans without access to safe cold storage
              </strong>
              <sup
                className="cite"
                data-src="IFC / World Bank Group, Cold Chain Development in Africa, 2023."
              >
                [3]
              </sup>
              and the loss is roughly{" "}
              <strong>$4 billion every year in West Africa alone</strong>.
              <sup
                className="cite"
                data-src="World Bank, West Africa Food Security Outlook, 2023."
              >
                [4]
              </sup>
            </p>
            <p className="lede" style={{ maxWidth: "62ch", margin: "0 auto" }}>
              Africa holds approximately{" "}
              <strong>
                60% of the world's remaining uncultivated arable land
              </strong>
              <sup
                className="cite"
                data-src="FAO / UN Statistical Division, Africa's Uncultivated Arable Land Inventory, 2023."
              >
                [5]
              </sup>{" "}
              — the largest greenfield agricultural frontier on Earth. The
              bottleneck is not growing the food.{" "}
              <em style={{ color: "var(--cryo-blue)" }}>
                The bottleneck is preserving and moving it.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* ============================ FOUR PILLARS ============================ */}
      <section
        style={{
          background:
            "linear-gradient(180deg, var(--paper), var(--sky-tint) 100%)",
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
        }}
      >
        <div className="container">
          <div className="reveal" style={{ maxWidth: "760px" }}>
            <span className="eyebrow">The Gap</span>
            <h2>Four broken systems. One missing layer of infrastructure.</h2>
            <p className="lede">
              West Africa is missing the connective tissue between what is
              grown, what is healed, what moves, and what is computed. CryoChain
              builds all four — on a single asset.
            </p>
          </div>

          <div className="grid grid-4 mt-12">
            <div className="card card-accent reveal">
              <span
                className="eyebrow"
                style={{ marginBottom: "var(--space-3)" }}
              >
                01 · Food
              </span>
              <h4>Post-Harvest Loss</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Up to <strong>40% of all produce is lost</strong> before it
                reaches a consumer in sub-Saharan Africa.
                <sup className="cite" data-src="FAO, 2024.">
                  [1]
                </sup>
              </p>
            </div>
            <div className="card card-accent green reveal">
              <span
                className="eyebrow green"
                style={{ marginBottom: "var(--space-3)" }}
              >
                02 · Health
              </span>
              <h4>Medical Cold Chain</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Vaccine wastage from temperature excursions remains a chronic
                public-health risk across the region.
                <sup
                  className="cite"
                  data-src="WHO Technical Report Series 1025, Annex 7, 2023."
                >
                  [2]
                </sup>
              </p>
            </div>
            <div className="card card-accent amber reveal">
              <span
                className="eyebrow"
                style={{
                  color: "var(--amber)",
                  marginBottom: "var(--space-3)",
                }}
              >
                03 · Movement
              </span>
              <h4>Logistics &amp; Energy</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Diesel-dependent fleets and unreliable grid power make every
                link in the supply chain fragile and expensive.
              </p>
            </div>
            <div className="card card-accent coral reveal">
              <span
                className="eyebrow"
                style={{
                  color: "var(--coral)",
                  marginBottom: "var(--space-3)",
                }}
              >
                04 · Data
              </span>
              <h4>Edge Compute</h4>
              <p className="small" style={{ color: "var(--slate-700)" }}>
                Sovereign-residency rules require local data processing — and
                most regions have nowhere to put it.
                <sup
                  className="cite"
                  data-src="Republic of Ghana, Data Protection Act 2012 (Act 843); Cybersecurity Act 2020 (Act 1038)."
                >
                  [6]
                </sup>
              </p>
            </div>
          </div>

          <div className="text-center mt-12 reveal">
            <a href="/opportunity" className="btn btn-ghost btn-arrow">
              Read the full diagnosis
            </a>
          </div>
        </div>
      </section>

      {/* ============================ THE SOLUTION ============================ */}
      <section>
        <div className="container">
          <div
            className="grid grid-2"
            style={{ alignItems: "center", gap: "var(--space-16)" }}
          >
            <div className="reveal">
              <span className="eyebrow green">The Platform</span>
              <h2>
                Nine compounding verticals.
                <br />
                <span
                  style={{ color: "var(--cryo-blue)", fontStyle: "italic" }}
                >
                  One physical asset.
                </span>
              </h2>
              <p className="lede">
                Cold storage anchors the hub. Eight adjacent verticals follow on
                the same building — food processing, fresh retail,
                pharmaceutical distribution, electric logistics, EV assembly,
                solar &amp; battery storage, edge data, and AI-driven
                operations.
              </p>
              <p style={{ color: "var(--slate-700)" }}>
                Each vertical compounds the next...{" "}
                <strong>
                  A more diversified vertical-integration thesis than Tesla's
                  five at the point of its 2010 IPO.
                </strong>
              </p>
              <div className="row mt-8">
                <a href="/platform" className="btn btn-green btn-arrow">
                  Explore the platform
                </a>
              </div>
            </div>

            {/* HUB DIAGRAM */}
            <div className="reveal">
              <div
                className="hub-diagram"
                aria-label="Nine verticals on one hub asset"
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
                className="small text-center mt-8"
                style={{ fontStyle: "italic" }}
              >
                Nine revenue streams. One fixed cost. One building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ MARKET DATA ============================ */}
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
            style={{ maxWidth: "760px", margin: "0 auto var(--space-12)" }}
          >
            <span className="eyebrow">The Greenfield</span>
            <h2>
              The fastest-growing infrastructure verticals on the continent —
              all sitting on one site.
            </h2>
          </div>

          <div className="grid grid-3">
            <div className="stat-card reveal">
              <div className="stat-num">~17.7%</div>
              <div className="stat-label">
                African cold chain logistics CAGR through 2030
              </div>
              <div className="stat-source">
                Mordor Intelligence
                <sup className="cite" data-src="Mordor Intelligence...">
                  [7]
                </sup>
              </div>
            </div>
            <div className="stat-card green reveal">
              <div className="stat-num">~22%</div>
              <div className="stat-label">
                African edge data centre CAGR through 2030
              </div>
              <div className="stat-source">
                Arizton
                <sup className="cite" data-src="Arizton...">
                  [8]
                </sup>
              </div>
            </div>
            <div className="stat-card amber reveal">
              <div className="stat-num">~24%</div>
              <div className="stat-label">
                African electric vehicle CAGR through 2030
              </div>
              <div className="stat-source">
                McKinsey
                <sup className="cite" data-src="McKinsey...">
                  [9]
                </sup>
              </div>
            </div>
          </div>

          {/* GREENFIELD CALLOUT */}
          <div
            className="reveal"
            style={{
              marginTop: "var(--space-16)",
              padding: "var(--space-12)",
              background:
                "linear-gradient(135deg, var(--sky-tint), var(--leaf-mint))",
              borderRadius: "var(--radius-lg)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: "var(--space-6)",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <div>
                <div className="bignum blue">2%</div>
                <div
                  className="small"
                  style={{ fontWeight: 600, color: "var(--slate-700)" }}
                >
                  Africa cold storage penetration
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  color: "var(--slate-300)",
                }}
              >
                vs.
              </div>
              <div>
                <div className="bignum green">15%+</div>
                <div
                  className="small"
                  style={{ fontWeight: 600, color: "var(--slate-700)" }}
                >
                  Developed-market penetration
                </div>
              </div>
            </div>
            <p
              style={{
                marginTop: "var(--space-6)",
                maxWidth: "60ch",
                marginLeft: "auto",
                marginRight: "auto",
                color: "var(--slate-700)",
              }}
            >
              <em>
                The largest greenfield infrastructure opportunity remaining
                anywhere on Earth.
              </em>
            </p>
          </div>
        </div>
      </section>

      {/* Add remaining sections (Proof, Microsoft Partners, CTA, Footer) similarly... */}
      <MissingSections />
    </>
  );
};

export default CryoChain;
