import React from "react";
import "../index.css";

const Terms = () => {
  return (
    <>
      <main className="legal">
        <p className="updated">Effective Date · May 14, 2026</p>
        <h1>Terms of Use</h1>

        <p style={{ fontSize: "1.05rem", color: "var(--slate-700)" }}>
          Please read these Terms of Use (the “<strong>Terms</strong>”)
          carefully before accessing, browsing, or otherwise using this website
          (the “<strong>Site</strong>”), which is operated by{" "}
          <strong>CryoChain Inc.</strong>, a Delaware corporation, together with
          its affiliates and operating subsidiaries (collectively, “
          <strong>CryoChain</strong>,” “<strong>we</strong>,” “
          <strong>us</strong>,” or “<strong>our</strong>”). By accessing or
          using the Site, you acknowledge that you have read, understood, and
          agree to be bound by these Terms.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          Your access to and use of the Site is conditioned on your acceptance
          of and compliance with these Terms. These Terms apply to all visitors,
          users, and others who access or use the Site. If you do not agree with
          any part of these Terms, you must not access or use the Site.
        </p>

        <h2 id="disclaimer">2. No Offer or Solicitation of Securities</h2>
        <p>
          The Site is provided for general informational and discussion purposes
          only. Nothing on the Site constitutes, or shall be deemed to
          constitute, an offer to sell or the solicitation of an offer to buy
          any securities of CryoChain Inc., CryoChain West Africa Ltd., or any
          affiliate.
        </p>

        <h2>3. Accredited Investors Only · Regulation D Rule 506(c)</h2>
        <p>
          Any securities referenced on the Site, if and when offered, will be
          offered and sold only to “accredited investors” as defined in Rule
          501(a) of Regulation D under the U.S. Securities Act of 1933, as
          amended.
        </p>

        <h2>4. Forward-Looking Statements</h2>
        <p>
          Statements on the Site that are not historical facts — including
          projections, target internal-rate-of-return figures, revenue
          trajectories, valuation pathways, market sizes, compound annual growth
          rates, hub roll-out timelines, exit pathways, and references to a
          “$1B+ valuation pathway by 2031” — constitute forward-looking
          statements. These statements involve known and unknown risks,
          uncertainties, and other factors that may cause actual results to
          differ materially.
        </p>

        <h2>5. Not Investment, Legal, Tax, or Accounting Advice</h2>
        <p>
          Nothing on the Site constitutes investment, legal, tax, or accounting
          advice or a recommendation of any kind. You should consult your own
          independent professional advisors before making any investment
          decision.
        </p>

        <h2>6. Use of the Site</h2>
        <p>
          You agree to use the Site only for lawful purposes. You may not
          attempt to gain unauthorized access, use automated scraping tools,
          introduce malicious code, or exploit any portion of the Site for
          commercial purposes without our express written consent.
        </p>

        <h2>7. Intellectual Property</h2>
        <p>
          All content, logos, trademarks, and materials on the Site are the
          property of CryoChain or its licensors and are protected by
          intellectual property laws. You may not reproduce, distribute, or
          create derivative works without prior written permission.
        </p>

        <h2>8. Confidentiality</h2>
        <p>
          Certain portions of the Site (including data rooms or gated materials)
          contain confidential information. By accessing such materials, you
          agree to maintain them in strict confidence and use them solely to
          evaluate a potential relationship with CryoChain.
        </p>

        <h2>9. Third-Party Links and Content</h2>
        <p>
          We are not responsible for the content, privacy policies, or practices
          of any third-party websites linked from this Site.
        </p>

        <h2>10. Disclaimer of Warranties</h2>
        <p>
          THE SITE AND ALL CONTENT ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE”
          BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
        </p>

        <h2>11. Limitation of Liability</h2>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, CRYOCHAIN SHALL NOT BE LIABLE
          FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
          DAMAGES ARISING FROM YOUR USE OF THE SITE.
        </p>

        <h2>12. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless CryoChain and its affiliates
          from any claims, damages, or expenses arising from your violation of
          these Terms.
        </p>

        <h2>13. Governing Law and Jurisdiction</h2>
        <p>
          These Terms shall be governed by the laws of the State of Delaware,
          United States. Any disputes shall be resolved exclusively in the
          federal or state courts located in Delaware.
        </p>

        <h2>14. Changes to These Terms</h2>
        <p>
          We may revise these Terms from time to time. Your continued use of the
          Site after such changes constitutes acceptance of the new Terms.
        </p>

        <h2>15. Contact</h2>
        <p>
          For questions about these Terms, please contact:
          <br />
          <br />
          <strong>CryoChain Inc.</strong>
          <br />
          Attn: Legal Department
          <br />
          Email:{" "}
          <a
            href="mailto:legal@cryochain.com"
            style={{ color: "var(--cryo-blue)" }}
          >
            legal@cryochain.com
          </a>
          <br />
          Delaware, United States of America
        </p>

        <p
          style={{
            marginTop: "var(--space-12)",
            paddingTop: "var(--space-6)",
            borderTop: "1px solid var(--slate-100)",
            fontSize: "0.85rem",
            color: "var(--slate-500)",
            fontStyle: "italic",
          }}
        >
          © 2026 CryoChain Inc. All rights reserved. CryoChain®, the CryoChain
          leaf-snowflake mark, and “Infrastructure That Preserves and Connects.”
          are trademarks of CryoChain Inc.
        </p>
      </main>
    </>
  );
};

export default Terms;
