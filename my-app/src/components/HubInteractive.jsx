import { useState, useEffect, useRef, useCallback } from "react";
import hubImage from "../assets/images/four-pillars.png";
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
  { id: 1, left: "42%", top: "23%", panelHeight: 300 },
  { id: 2, left: "56%", top: "27%", panelHeight: 280 },
  // { id: 2, left: "13%", top: "42%", panelWidth: 260 },
  // { id: 3, left: "6%", top: "56%" },
  { id: 3, left: "16%", top: "32%", panelHeight: 280 },
  { id: 4, left: "26%", top: "60%" },
  { id: 5, left: "20%", top: "82%" },
  {
    id: 6,
    left: "88%",
    top: "52%",
    panelAlign: "left-center",
    panelHeight: 300,
  }, // ← override for 6
  { id: 7, left: "73%", top: "45%", panelHeight: 300 },
  { id: 8, left: "95%", top: "36%", panelHeight: 300 },
  { id: 9, left: "68%", top: "22%", panelHeight: 300 },
];

const HubInteractive = () => {
  const [activeId, setActiveId] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const stageRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const open = useCallback((id) => {
    clearTimeout(closeTimer.current);
    setActiveId(id);
  }, []);

  const close = useCallback(() => setActiveId(null), []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveId(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!isTouch || !activeId) return;
    const handler = (e) => {
      if (!e.target.closest(".cc-panel") && !e.target.closest(".cc-hotspot")) {
        close();
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [isTouch, activeId, close]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [close]);

  const active = activeId ? VERTICALS[activeId] : null;
  const activeHotspot = activeId
    ? HOTSPOTS.find((h) => h.id === activeId)
    : null;

  const getPanelStyle = () => {
    if (!activeHotspot) return {};
    const leftPct = parseFloat(activeHotspot.left);
    const topPct = parseFloat(activeHotspot.top);
    const panelWidth = activeHotspot.panelWidth ?? 340;
    const panelHeight = activeHotspot.panelHeight;
    const style = {
      position: "absolute",
      width: `${panelWidth}px`,
      zIndex: 6,
      maxHeight: "85vh", // safety limit
      overflowY: "auto",
    };

    if (panelHeight) {
      style.height = `${panelHeight}px`;
      style.maxHeight = `${panelHeight}px`;
    }

    // Special override: open left and vertically centered on the hotspot
    if (activeHotspot.panelAlign === "left-center") {
      style.left = "55%"; // sits between hotspot 7 (73%) and center — adjust if needed
      style.top = "20%"; // aligns with hotspot 9's vertical position
      style.transform = "none";
      return style;
    }

    // Default logic for all other hotspots
    if (leftPct > 55) {
      style.right = `${100 - leftPct + 3}%`;
    } else {
      style.left = `${leftPct + 3}%`;
    }

    if (topPct > 45) {
      style.bottom = `${100 - topPct + 3}%`;
    } else {
      style.top = `${topPct + 3}%`;
    }

    return style;
  };

  const getHotspotHandlers = (id) => {
    if (isTouch) {
      return {
        onClick: (e) => {
          e.stopPropagation();
          activeId === id ? close() : open(id);
        },
      };
    }
    return {
      onMouseEnter: () => open(id),
      onMouseLeave: scheduleClose,
    };
  };

  const PanelContent = () => (
    <>
      <button className="cc-panel__close" onClick={close} aria-label="Close">
        ×
      </button>
      <div className="cc-panel__head">
        <span className={`cc-panel__num cc-panel__num--${active.color}`}>
          {activeId}
        </span>
        <h3 className="cc-panel__title">{active.title}</h3>
      </div>
      {/* {active.img && (
        <img
          src={active.img}
          alt={active.title}
          style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
        />
      )} */}
      <div className={`cc-panel__stripe cc-panel__stripe--${active.color}`} />
      <p className="cc-panel__body">{active.body}</p>
      <p className="cc-panel__spec">
        <strong>Spec: </strong>
        {active.spec}
      </p>
    </>
  );

  return (
    <div className="cc-hub-wrap">
      <div ref={stageRef} className="cc-stage">
        <img
          className="cc-stage__img"
          src={hubImage}
          alt="CryoChain Hub"
          draggable="false"
        />

        {HOTSPOTS.map(({ id, left, top }) => {
          const v = VERTICALS[id];
          return (
            <button
              key={id}
              className={`cc-hotspot cc-hotspot--${v.color} ${
                activeId === id ? "cc-hotspot--active" : ""
              }`}
              style={{ left, top }}
              aria-label={v.title}
              {...getHotspotHandlers(id)}
            >
              <span className="cc-hotspot__pulse" />
              <span className="cc-hotspot__dot">{id}</span>
              <span className="cc-hotspot__label">{v.title}</span>
            </button>
          );
        })}

        {/* Desktop only — absolute panel near the hotspot */}
        {active && !isTouch && (
          <aside
            className="cc-panel cc-panel--open cc-panel--desktop"
            style={getPanelStyle()}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            onClick={(e) => e.stopPropagation()}
          >
            <PanelContent />
          </aside>
        )}
      </div>

      {/* Mobile only — static panel below the image */}
      {active && isTouch && (
        <aside className="cc-panel cc-panel--open cc-panel--mobile">
          <PanelContent />
        </aside>
      )}

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
