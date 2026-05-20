import { useState } from "react";

const ICONS = [
  <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="8" y="44" width="12" height="28" rx="1.5" />
    <rect x="28" y="28" width="12" height="44" rx="1.5" />
    <rect x="48" y="16" width="12" height="56" rx="1.5" />
    <rect x="68" y="36" width="12" height="36" rx="1.5" />
  </svg>,
  <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.3">
    <polyline points="8,64 24,48 40,52 56,28 72,16" strokeLinejoin="round" />
    <circle cx="8" cy="64" r="3" fill="currentColor" />
    <circle cx="24" cy="48" r="3" fill="currentColor" />
    <circle cx="40" cy="52" r="3" fill="currentColor" />
    <circle cx="56" cy="28" r="3" fill="currentColor" />
    <circle cx="72" cy="16" r="3" fill="currentColor" />
  </svg>,
  <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M12 68 C12 68 16 20 64 12 C64 12 68 56 20 68 Z" />
    <line x1="12" y1="68" x2="64" y2="12" />
  </svg>,
  <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="4" y="24" width="44" height="32" rx="2" />
    <path d="M48 36 L72 36 L72 56 L48 56 Z" />
    <path d="M48 36 L60 24 L72 36" />
    <circle cx="16" cy="60" r="6" />
    <circle cx="60" cy="60" r="6" />
  </svg>,
  <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.3">
    <rect x="8" y="20" width="64" height="36" rx="2" />
    <line x1="8" y1="38" x2="72" y2="38" />
    <line x1="29" y1="20" x2="29" y2="56" />
    <line x1="51" y1="20" x2="51" y2="56" />
    <line x1="40" y1="56" x2="40" y2="68" />
    <line x1="24" y1="68" x2="56" y2="68" />
  </svg>,
  <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.3">
    <circle cx="40" cy="40" r="28" />
    <ellipse cx="40" cy="40" rx="14" ry="28" />
    <line x1="12" y1="40" x2="68" y2="40" />
    <path d="M14 24 Q40 32 66 24" />
    <path d="M14 56 Q40 48 66 56" />
  </svg>,
];

const getIcon = (i) => ICONS[i % ICONS.length];

/**
 * BlogImage — reusable across Insights index, detail, and cards.
 *
 * Props:
 *   url        — coverImage.url from the blog object (optional)
 *   title      — used as alt text
 *   idx        — index for deterministic icon/gradient variation
 *   height     — css string, default "320px"
 *   borderRadius — css string, default "var(--radius-xl, 16px)"
 *   objectFit  — css string, default "cover"
 */
const BlogImage = ({
  url,
  title = "",
  idx = 0,
  height = "320px",
  borderRadius = "var(--radius-xl, 16px)",
  objectFit = "fill",
}) => {
  const [failed, setFailed] = useState(false);

  const gradients = [
    "linear-gradient(135deg, #0f1e2e 0%, #1a3a4a 50%, #0d2d3a 100%)",
    "linear-gradient(135deg, #0d2d1a 0%, #1a3a2a 50%, #0d2d1a 100%)",
    "linear-gradient(135deg, #1a1a0f 0%, #2a2a1a 50%, #1a2d0d 100%)",
    "linear-gradient(135deg, #1a0f2e 0%, #2a1a4a 50%, #0d0d3a 100%)",
  ];

  if (url && !failed) {
    return (
      <div
        style={{
          width: "100%",
          height,
          borderRadius,
          overflow: "hidden",
          background: "#1a2330",
          flexShrink: 0,
        }}
      >
        <img
          src={url}
          alt={title}
          onError={() => setFailed(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit,
            display: "block",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius,
        background: gradients[idx % gradients.length],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(31,120,180,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(31,120,180,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* glow */}
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(31,120,180,0.18) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* icon */}
      <div
        style={{
          width: 64,
          height: 64,
          color: "rgba(255,255,255,0.45)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {getIcon(idx)}
      </div>
      <p
        style={{
          color: "rgba(255,255,255,0.3)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 600,
          position: "relative",
          zIndex: 1,
          margin: 0,
        }}
      >
        {failed ? "Image unavailable" : "CryoChain Insights"}
      </p>
    </div>
  );
};

export default BlogImage;
