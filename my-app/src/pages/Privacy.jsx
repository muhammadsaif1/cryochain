import React from "react";
import "../index.css";

const Privacy = () => {
  return (
    <>
      <main className="legal">
        <p className="updated">Effective Date · May 14, 2026</p>
        <h1>Privacy Policy</h1>

        <p style={{ fontSize: "1.05rem", color: "var(--slate-700)" }}>
          <strong>CryoChain Inc.</strong>, a Delaware corporation, together with
          its affiliates and operating subsidiaries (collectively, “
          <strong>CryoChain</strong>,” “<strong>we</strong>,” “
          <strong>us</strong>,” or “<strong>our</strong>”) respects your
          privacy. This Privacy Policy explains what information we collect when
          you visit this website (the “<strong>Site</strong>”), how we use it,
          with whom we share it, and the choices you have. By accessing or using
          the Site, you consent to the practices described below.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect information in three ways:</p>

        <p>
          <strong>(a) Information you give us directly.</strong> When you submit
          our contact form, request access to the data room, or inquire about an
          upcoming delegation or site visit, we collect the information you
          provide, which may include your first and last name, email address,
          organization name, professional role or title, the nature of your
          interest in CryoChain, and any message or attachment you choose to
          send.
        </p>

        <p>
          <strong>(b) Information collected automatically.</strong> When you
          visit the Site, we and our service providers automatically collect
          certain technical information, including IP address, browser type and
          version, device type and operating system, referring URL, pages
          viewed, time spent on pages, and approximate geographic location
          derived from IP.
        </p>

        <p>
          <strong>
            (c) Information from cookies and similar technologies.
          </strong>{" "}
          The Site uses a small number of cookies and similar local-storage
          technologies to remember your preferences, measure aggregate traffic
          patterns, and improve performance.
        </p>

        <h2>2. How We Use Information</h2>
        <p>
          We use the information we collect to respond to your inquiries,
          evaluate prospective commercial or financing relationships, operate
          and improve the Site, comply with legal obligations, and communicate
          with you about updates you have requested.
        </p>

        <h2>3. Legal Bases for Processing</h2>
        <p>
          Where applicable (e.g., under GDPR or similar laws), we process
          personal information based on consent, contractual necessity, legal
          obligations, or our legitimate business interests.
        </p>

        <h2>4. How We Share Information</h2>
        <p>We do not sell your personal information. We may share it with:</p>
        <ul>
          <li>
            Service providers (hosting, email, analytics, etc.) under strict
            confidentiality agreements.
          </li>
          <li>Professional advisors (legal, accounting, etc.).</li>
          <li>Government or regulators when legally required.</li>
          <li>
            In the event of a corporate transaction (merger, acquisition, etc.).
          </li>
        </ul>

        <h2>5. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in the United
          States and other countries. We use appropriate safeguards (such as
          Standard Contractual Clauses) to protect such transfers.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain your information only as long as necessary to fulfill the
          purposes outlined in this policy or as required by law.
        </p>

        <h2>7. Security</h2>
        <p>
          We implement reasonable administrative, technical, and physical
          safeguards to protect your information. However, no method of
          transmission over the internet is 100% secure.
        </p>

        <h2>8. Your Rights and Choices</h2>
        <p>
          Depending on your location, you may have rights to access, correct,
          delete, or restrict the processing of your personal information. To
          exercise these rights, please contact us at{" "}
          <a
            href="mailto:privacy@cryochain.com"
            style={{ color: "var(--cryo-blue)" }}
          >
            privacy@cryochain.com
          </a>
          .
        </p>

        <h2>9. Children</h2>
        <p>
          This Site is not directed at children under 16. We do not knowingly
          collect personal information from children.
        </p>

        <h2>10. Third-Party Sites</h2>
        <p>
          We are not responsible for the privacy practices of third-party
          websites linked from this Site.
        </p>

        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy. The “Effective Date” at the top
          will be revised accordingly. Material changes will be notified
          prominently.
        </p>

        <h2>12. Contact</h2>
        <p>
          For any questions regarding this Privacy Policy, please contact:
          <br />
          <br />
          <strong>CryoChain Inc.</strong>
          <br />
          Attn: Privacy Office
          <br />
          Email:{" "}
          <a
            href="mailto:privacy@cryochain.com"
            style={{ color: "var(--cryo-blue)" }}
          >
            privacy@cryochain.com
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
          © 2026 CryoChain Inc. All rights reserved.
        </p>
      </main>
    </>
  );
};

export default Privacy;
