import { useState, useEffect, useRef } from "react";
import hubImage from "../assets/images/four-pillars.png"; // update path if different
import lineage from "../assets/images/lineage.jpeg";
import tesla from "../assets/images/tesla.jpeg";

const VERTICALS = {
  1: {
    title: "Cold Storage",
    color: "blue",
    body: "The anchor asset of every CryoChain hub. A 30,000 sqft multi-zone HACCP-grade facility built on NH₃/CO₂ cascade refrigeration — the gold standard for industrial cold chain efficiency.",
    spec: "30,000 sqft · NH₃/CO₂ cascade · six temperature zones from +2 °C to −80 °C · WHO GDP & GCCA compliant.",
  },
  2: {
    title: "Food Processing",
    color: "blue",
    body: "Value-add tenancy that converts raw agricultural inputs into branded, export-ready product. Co-located with the cold store so feedstock never leaves the controlled cold chain.",
    spec: "Anchor tenancies: cocoa butter · coconut oil · packaging & primary processing for AfCFTA export.",
  },
  3: {
    title: "Grocery & Retail",
    color: "green",
    body: "Fresh produce supply to urban grocery and quick-commerce channels — closing the gap between farm output and city consumers that drives the 37% post-harvest loss rate.",
    spec: "Channels: CryoChain Fresh Market storefronts · urban grocery wholesale · quick-commerce platform supply.",
  },
  4: {
    title: "Pharma & Health",
    color: "green",
    body: "WHO GDP-compliant pharmaceutical and vaccine cold chain. Dedicated zones at +2 to +8 °C, −20 °C, and −80 °C support routine immunisation, biologics, and ultra-cold mRNA logistics.",
    spec: "Compliance: WHO GDP · USP 1079 · FDA 21 CFR · validated temperature mapping & chain-of-custody.",
  },
  5: {
    title: "EV Logistics",
    color: "slate",
    body: "Refrigerated last-mile and inter-hub delivery on an all-electric fleet. Vehicle-to-grid capability turns idle trucks into grid-stabilising battery assets during peak demand.",
    spec: "Fleet: Yutong T7E refrigerated box trucks · ABB Terra 184/360 charging · V2G-capable · route-optimised AI dispatch.",
    img: lineage,
  },
  6: {
    title: "EV Manufacturing JV",
    color: "slate",
    body: "Local assembly of specialty electric trucks engineered for African road conditions, climate, and load profiles. A Phase II vertical that compounds off the EV logistics demand base.",
    spec: "Scope: joint-venture light-duty & medium-duty EV truck assembly · localised supply chain · Ghana Free Zone export base.",
    img: tesla,
  },
  7: {
    title: "Solar + BESS",
    color: "orange",
    body: "Behind-the-meter generation that powers the hub, cuts diesel dependence, and feeds surplus back to the grid. Battery storage smooths intermittency and provides grid stabilisation services.",
    spec: "System: 250 kW solar PV · 500 kWh LFP battery (BYD/Sungrow) · microgrid controller · grid-tied with islanding capability.",
  },
  8: {
    title: "Edge Data Centre",
    color: "blue",
    body: "Microsoft Azure Local sovereign-cloud node deployed inside every hub. Powers warehouse AI, runs latency-sensitive workloads for partners, and monetises spare compute as an enterprise tenant service.",
    spec: "Spec: 2,500 sqft Edge DC · Uptime Tier II Phase I, Tier III Phase II · Azure Local · NH₃/CO₂ cascade chilled-water loop shared with cold store.",
  },
  9: {
    title: "Warehouse AI / SCADA",
    color: "green",
    body: "Predictive operations layer running on the Edge DC. Automates cold chain monitoring, demand forecasting, and route optimisation — and delivers farmer-facing intelligence via SMS and USSD on basic phones.",
    spec: "Stack: SCADA automation · predictive maintenance ML · demand forecasting · multilingual SMS/USSD farmer interface.",
  },
};

const HOTSPOTS = [
  { id: 1, left: "42%", top: "23%" },
  { id: 2, left: "13%", top: "42%" },
  { id: 3, left: "6%", top: "56%" },
  { id: 4, left: "26%", top: "60%" },
  { id: 5, left: "20%", top: "82%" },
  { id: 6, left: "88%", top: "52%" },
  { id: 7, left: "73%", top: "45%" },
  { id: 8, left: "95%", top: "36%" },
  { id: 9, left: "68%", top: "22%" },
];

const HubInteractive = () => {
  const [activeId, setActiveId] = useState(null);
  const stageRef = useRef(null);
  const panelRef = useRef(null);

  const open = (id) => setActiveId(id);
  const close = () => setActiveId(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close when clicking outside the panel
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        close();
      }
    };

    if (activeId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeId]);

  const active = activeId ? VERTICALS[activeId] : null;

  return (
    <div className="cc-hub-wrap">
      {/* Stage / Backdrop */}
      <div
        ref={stageRef}
        className={`cc-stage ${activeId ? "cc-stage--dimmed" : ""}`}
        onClick={close} // Clicking anywhere on stage closes it
      >
        <img
          className="cc-stage__img"
          src={hubImage}
          alt="CryoChain Hub"
          draggable="false"
        />

        {/* Hotspots */}
        {HOTSPOTS.map(({ id, left, top }) => {
          const v = VERTICALS[id];
          return (
            <button
              key={id}
              className={`cc-hotspot cc-hotspot--${v.color} ${activeId === id ? "cc-hotspot--active" : ""}`}
              style={{ left, top }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent closing when clicking hotspot
                open(id);
              }}
              aria-label={v.title}
            >
              <span className="cc-hotspot__pulse" />
              <span className="cc-hotspot__dot">{id}</span>
              <span className="cc-hotspot__label">{v.title}</span>
            </button>
          );
        })}

        {/* Detail Panel */}
        {active && (
          <aside
            ref={panelRef}
            className="cc-panel cc-panel--open"
            onClick={(e) => e.stopPropagation()} // Important: prevent closing when clicking inside panel
          >
            <button
              className="cc-panel__close"
              onClick={close}
              aria-label="Close"
            >
              ×
            </button>

            <div className="cc-panel__head">
              <span className={`cc-panel__num cc-panel__num--${active.color}`}>
                {activeId}
              </span>
              <h3 className="cc-panel__title">{active.title}</h3>
            </div>
            {active.img && <img src={active.img} />}

            <div
              className={`cc-panel__stripe cc-panel__stripe--${active.color}`}
            />

            <p className="cc-panel__body">{active.body}</p>
            <p className="cc-panel__spec">
              <strong>Spec: </strong>
              {active.spec}
            </p>
          </aside>
        )}
      </div>

      {/* Caption */}
      <p className="cc-caption">
        9 revenue streams × 1 fixed cost ={" "}
        <strong className="cc-caption__highlight">
          the most diversified hub-asset thesis in African infrastructure.
        </strong>
      </p>
    </div>
  );
};

export default HubInteractive;
