import React from "react";
import { Link } from "react-router-dom";
import azureRack from "../assets/images/azure-rack.png";
import ProofSection from "./ProofSection";
import HomeInsights from "./HomeImsights";

/**
 * MissingSections — drop these three blocks AFTER the Greenfield section
 * inside CryoChain.jsx (before the closing </> fragment).
 *
 * Sections:
 *  1. THE PROOF      — "Two comparators. One playbook."
 *  2. THE WIND       — "Sovereign partners. Hyperscale cloud."
 *  3. THE INVITATION — "Africa is the last greenfield…" + Footer
 */

const MissingSections = () => {
  return (
    <>
      {/* ============================ THE PROOF ============================ */}
      <ProofSection />
      <HomeInsights />

      {/* ============================ THE WIND BEHIND THE SAIL ============================ */}
      <section
        style={{
          paddingTop: "var(--space-20)",
          paddingBottom: "var(--space-20)",
          background:
            "linear-gradient(180deg, var(--sky-tint) 0%, var(--paper) 100%)",
        }}
      >
        <div className="container">
          {/* eyebrow */}
          <div className="reveal" style={{ marginBottom: "var(--space-12)" }}>
            <span className="eyebrow">THE WIND BEHIND THE SAIL</span>
            <h2 style={{ maxWidth: "18ch", marginTop: "var(--space-3)" }}>
              Sovereign partners.{" "}
              <span style={{ color: "var(--cryo-blue)", fontStyle: "italic" }}>
                Hyperscale cloud.
              </span>
            </h2>
          </div>

          {/* Two-col: text left, image right */}
          <div
            className="grid grid-2"
            style={{ alignItems: "center", gap: "var(--space-16)" }}
          >
            {/* Text */}
            <div className="reveal">
              <p
                className="lede"
                style={{ marginBottom: "var(--space-6)", maxWidth: "56ch" }}
              >
                Every hub incorporates a localized edge computing and sovereign
                cloud infrastructure layer, transforming our cold-chain network
                into a distributed data platform that supports national data
                residency, AI-enabled operations, and secure in-country
                processing with minimal incremental capital expenditure.
                <sup
                  className="cite"
                  data-src="Microsoft Africa Local Initiative, 2024."
                >
                  [11]
                </sup>
              </p>
              <p
                className="lede"
                style={{ marginBottom: "var(--space-8)", maxWidth: "56ch" }}
              >
                Device-as-a-service infrastructure is embedded into farmer and
                cooperative onboarding, enabling digital access, logistics
                coordination, and real-time operational visibility across the
                network. Farmer cooperatives, health organizations, and a
                national strategic food reserve partnership are expected to
                anchor approximately 14% of facility utilization from Day 1.
                Government and diplomatic engagement is already underway, while
                free zone incentives provide long-term tax advantages and
                internationally recognized investor protections.
              </p>

              <Link to="/opportunity" className="btn btn-primary btn-arrow">
                See the path forward
              </Link>
            </div>

            {/* Azure rack image */}
            <div className="img-wrap reveal">
              <img
                src={azureRack}
                alt="Microsoft Azure Local edge appliance inside CryoChain hub"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ THE INVITATION (CTA) ============================ */}
      <section
        style={{
          paddingTop: "var(--space-24)",
          paddingBottom: "var(--space-24)",
          background: "var(--paper)",
          textAlign: "center",
        }}
      >
        <div className="container-narrow">
          <div className="reveal">
            <span className="eyebrow">THE INVITATION</span>
            <h2
              style={{
                maxWidth: "20ch",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "var(--space-4)",
                marginBottom: "var(--space-6)",
              }}
            >
              Africa is the last greenfield infrastructure frontier on Earth.
            </h2>
            <p
              className="lede"
              style={{
                maxWidth: "58ch",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "var(--space-10)",
              }}
            >
              Food is the entryway to all of it. We are inviting a small number
              of strategic parteners to anchor the build — and own
              infrastructure that will, by 2050, feed a continent and much of
              the world.
            </p>

            <div
              className="row"
              style={{ justifyContent: "center", gap: "var(--space-4)" }}
            >
              <Link to="/contact" className="btn btn-primary btn-arrow">
                Start a conversation
              </Link>
              <Link to="/opportunity" className="btn btn-ghost">
                See the 2031 path
              </Link>
            </div>
            <br />
            <br />
            <span>
              For qualified partners only. Detailed materials, the Phase l
            </span>
            <br />
            <span>
              memorandum, and financial model are available under mutual NDA.
            </span>
          </div>
        </div>
      </section>

      {/* ============================ MOBILE RESPONSIVE STYLES ============================ */}
      <style>{`
        @media (max-width: 768px) {
          /* Proof cards stack */
          .grid.grid-2 {
            grid-template-columns: 1fr !important;
          }

          /* Wind section: image below text */
          .grid.grid-2 > div:last-child {
            order: 1;
          }
          .grid.grid-2 > div:first-child {
            order: 0;
          }

          /* CTA buttons stack */
          section[style*="text-center"] .row {
            flex-direction: column;
            align-items: center;
          }

          /* Footer nav grid collapses to 2 cols on mobile */
          footer > .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }

          /* Footer bottom row stacks */
          footer > .container > div:last-child {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          footer > .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default MissingSections;
