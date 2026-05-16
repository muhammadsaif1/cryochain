import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNote, clearError } from "../redux/slices/noteSlice"; // adjust path
import "../index.css";

const EMPTY_FORM = {
  first: "",
  last: "",
  email: "",
  org: "",
  role: "",
  interest: "Strategic partnership",
  message: "",
};

const Contact = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.notes);

  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [popup, setPopup] = useState(null); // null | "success" | "error"

  /* ── field change ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ── mark field touched on blur ── */
  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  /* ── inline validation ── */
  const validate = () => {
    const errs = {};
    if (!form.first.trim()) errs.first = "First name is required.";
    if (!form.last.trim()) errs.last = "Last name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (!form.message.trim()) errs.message = "Please write a short message.";
    return errs;
  };

  const errors = validate();
  const isInvalid = Object.keys(errors).length > 0;

  /* ── submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // touch all fields so errors show
    setTouched({
      first: true,
      last: true,
      email: true,
      org: true,
      role: true,
      message: true,
    });

    if (isInvalid) return;

    const noteData = {
      firstName: form.first,
      lastName: form.last,
      email: form.email,
      organisation: form.org,
      role: form.role,
      areaOfInterest: form.interest,
      message: form.message,
    };

    const result = await dispatch(createNote(noteData));

    if (createNote.fulfilled.match(result)) {
      setForm(EMPTY_FORM);
      setTouched({});
      dispatch(clearError());
      setPopup("success");
    } else {
      setPopup("error");
    }
  };

  const closePopup = () => {
    setPopup(null);
    dispatch(clearError());
  };

  /* ── helpers ── */
  const fieldErr = (name) => touched[name] && errors[name];
  const inputCls = (name) => `${fieldErr(name) ? "error-input" : ""}`;

  return (
    <>
      {/* ══════════════ SUCCESS / ERROR POPUP ══════════════ */}
      {popup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className={`popup-content ${popup}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-icon">
              {popup === "success" ? "✅" : "❌"}
            </div>
            <h3>
              {popup === "success" ? "Message sent!" : "Something went wrong"}
            </h3>
            <p>
              {popup === "success"
                ? "Thank you. We'll respond within two business days."
                : typeof error === "string"
                  ? error
                  : "We couldn't send your message. Please try again."}
            </p>
            <button className="popup-button" onClick={closePopup}>
              {popup === "success" ? "Done" : "Try again"}
            </button>
          </div>
        </div>
      )}

      {/* ══════════════ HERO ══════════════ */}
      <header className="hero" style={{ paddingBottom: "var(--space-12)" }}>
        <div className="hero-bg"></div>
        <div className="container">
          <div className="reveal" style={{ maxWidth: "900px" }}>
            <span className="eyebrow green">Get in Touch</span>
            <h1>Let's start a conversation.</h1>
            <p className="lede" style={{ maxWidth: "64ch" }}>
              Three things in the next thirty days. A 30-minute introductory
              call. Mutual NDA and a walkthrough of the materials. An optional
              site visit to West Africa with the team.
            </p>
          </div>
        </div>
      </header>

      {/* ══════════════ TWO COLUMNS ══════════════ */}
      <section className="tight">
        <div className="container">
          <div
            className="grid grid-2"
            style={{ gap: "var(--space-16)", alignItems: "flex-start" }}
          >
            {/* ── LEFT: FORM ── */}
            <div className="reveal">
              <span className="eyebrow">Send a Note</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>
                Tell us what's interesting.
              </h2>
              <p
                style={{
                  color: "var(--slate-700)",
                  marginBottom: "var(--space-8)",
                }}
              >
                We respond to every inquiry within two business days. For
                accredited partners, we can share the Phase I memorandum and
                financial model under mutual NDA.
              </p>

              <form className="form" onSubmit={handleSubmit} noValidate>
                {/* First + Last */}
                <div className="form-field-row">
                  <div className="form-field">
                    <label htmlFor="first">
                      First Name{" "}
                      <span style={{ color: "var(--coral)" }}>*</span>
                    </label>
                    <input
                      id="first"
                      name="first"
                      type="text"
                      className={inputCls("first")}
                      value={form.first}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      placeholder="Jane"
                    />
                    {fieldErr("first") && (
                      <span className="error-text">{errors.first}</span>
                    )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="last">
                      Last Name <span style={{ color: "var(--coral)" }}>*</span>
                    </label>
                    <input
                      id="last"
                      name="last"
                      type="text"
                      className={inputCls("last")}
                      value={form.last}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      placeholder="Smith"
                    />
                    {fieldErr("last") && (
                      <span className="error-text">{errors.last}</span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="form-field">
                  <label htmlFor="email">
                    Email <span style={{ color: "var(--coral)" }}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={inputCls("email")}
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    placeholder="jane@example.com"
                  />
                  {fieldErr("email") && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                {/* Org + Role */}
                <div className="form-field-row">
                  <div className="form-field">
                    <label htmlFor="org">Organisation</label>
                    <input
                      id="org"
                      name="org"
                      type="text"
                      value={form.org}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      placeholder="Acme Capital"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="role">Role</label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      value={form.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      placeholder="Managing Director"
                    />
                  </div>
                </div>

                {/* Area of interest — custom dropdown */}
                <div className="form-field" style={{ position: "relative" }}>
                  <label htmlFor="interest">Area of Interest</label>
                  <div
                    className="custom-select-wrapper"
                    style={{ position: "relative" }}
                  >
                    <button
                      type="button"
                      className="custom-select-trigger"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          _open: !prev._open,
                        }))
                      }
                      disabled={loading}
                    >
                      <span>{form.interest}</span>
                      <span
                        style={{
                          transition: "transform 0.2s",
                          transform: form._open
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          fontSize: "0.75rem",
                        }}
                      >
                        ▾
                      </span>
                    </button>

                    {form._open && (
                      <>
                        {/* invisible overlay to close on outside click */}
                        <div
                          style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 10,
                          }}
                          onClick={() =>
                            setForm((prev) => ({ ...prev, _open: false }))
                          }
                        />
                        <ul className="custom-select-list">
                          {[
                            "Strategic partnership",
                            "Family office / capital partner",
                            "Development finance institution",
                            "Government / sovereign engagement",
                            "Industry / commercial partner",
                            "Press / media inquiry",
                            "Other",
                          ].map((opt) => (
                            <li
                              key={opt}
                              className={`custom-select-option ${form.interest === opt ? "selected" : ""}`}
                              onClick={() => {
                                setForm((prev) => ({
                                  ...prev,
                                  interest: opt,
                                  _open: false,
                                }));
                              }}
                            >
                              {opt}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="form-field">
                  <label htmlFor="message">
                    Your Message{" "}
                    <span style={{ color: "var(--coral)" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={inputCls("message")}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    placeholder="What would you like to discuss?"
                  />
                  {fieldErr("message") && (
                    <span className="error-text">{errors.message}</span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary btn-arrow"
                  style={{ justifySelf: "start", marginTop: "var(--space-2)" }}
                  disabled={loading}
                >
                  {loading ? "Sending…" : "Send"}
                </button>

                <p className="small" style={{ marginTop: "var(--space-3)" }}>
                  By submitting, you agree to our{" "}
                  <a href="/privacy">Privacy Policy</a> and{" "}
                  <a href="/terms">Terms of Use</a>.
                </p>
              </form>
            </div>

            {/* ── RIGHT: CONTEXT ── */}
            <div>
              <div
                className="card-tinted reveal"
                style={{ marginBottom: "var(--space-6)" }}
              >
                <span className="eyebrow">Direct Contact</span>
                <h3 style={{ marginTop: "var(--space-2)", fontSize: "1.4rem" }}>
                  For strategic conversations
                </h3>
                <div style={{ marginTop: "var(--space-6)" }}>
                  {[
                    {
                      label: "General Inquiries",
                      email: "hello@cryochain.com",
                    },
                    {
                      label: "Partner Relations",
                      email: "partners@cryochain.com",
                    },
                    { label: "Press", email: "media@cryochain.com" },
                  ].map(({ label, email }) => (
                    <div key={label} style={{ marginBottom: "var(--space-4)" }}>
                      <p
                        className="small"
                        style={{
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          fontWeight: 600,
                          color: "var(--slate-500)",
                          marginBottom: "var(--space-2)",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 500,
                          color: "var(--slate-900)",
                        }}
                      >
                        {email}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-tinted green reveal" id="delegation">
                <span className="eyebrow green">Site Visits</span>
                <h3 style={{ marginTop: "var(--space-2)", fontSize: "1.4rem" }}>
                  Join the West Africa Delegation
                </h3>
                <p
                  style={{
                    color: "var(--slate-700)",
                    marginTop: "var(--space-4)",
                  }}
                >
                  We coordinate periodic curated visits to the Phase I site and
                  the surrounding region — with diplomatic coordination,
                  ministerial meetings, and direct engagement with national
                  agricultural and trade institutions.
                </p>
                <p style={{ color: "var(--slate-700)" }}>
                  Mention "delegation" in your message and we will share the
                  next available dates.
                </p>
              </div>

              <div
                className="reveal"
                style={{
                  marginTop: "var(--space-6)",
                  padding: "var(--space-6)",
                  background: "var(--surface)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--slate-100)",
                }}
              >
                <span className="eyebrow">What Happens Next</span>
                <ol
                  style={{
                    paddingLeft: "1.4em",
                    margin: "var(--space-4) 0 0",
                    color: "var(--slate-700)",
                  }}
                >
                  {[
                    {
                      bold: "Within 48 hours.",
                      text: "We respond to your message and propose a time for a 30-minute call.",
                    },
                    {
                      bold: "Within 2 weeks.",
                      text: "Mutual NDA and access to the Phase I memorandum and financial model.",
                    },
                    {
                      bold: "Within 30 days.",
                      text: "Optional site visit and direct engagement with the team.",
                    },
                  ].map(({ bold, text }) => (
                    <li
                      key={bold}
                      style={{
                        marginBottom: "var(--space-3)",
                        paddingLeft: "var(--space-2)",
                      }}
                    >
                      <strong style={{ color: "var(--slate-900)" }}>
                        {bold}
                      </strong>{" "}
                      {text}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ COMPLIANCE NOTE ══════════════ */}
      <section className="tight" style={{ paddingTop: "var(--space-8)" }}>
        <div className="container-narrow">
          <div
            className="reveal"
            style={{
              padding: "var(--space-6)",
              border: "1px solid var(--slate-100)",
              borderRadius: "var(--radius)",
              background: "var(--paper)",
            }}
          >
            <p
              className="small"
              style={{ margin: 0, color: "var(--slate-500)" }}
            >
              <strong style={{ color: "var(--slate-700)" }}>
                A note on confidentiality.
              </strong>{" "}
              Detailed financial information, the Phase I memorandum, and
              counterparty agreements are made available only to qualified
              strategic partners following execution of a mutual non-disclosure
              agreement. See our <a href="/terms">Terms of Use</a> for further
              detail.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════ MOBILE FIX ══════════════ */}
      <style>{`
        /* Center the full page on mobile */
        @media (max-width: 768px) {
          .grid.grid-2 {
            grid-template-columns: 1fr !important;
          }
          .container,
          .container-narrow {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
            margin-left: auto !important;
            margin-right: auto !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .form-field-row {
            grid-template-columns: 1fr !important;
          }
          .hero .container {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
        }
          /* Select wrapper — constrains dropdown to container */
.select-wrapper {
  position: relative;
  width: 100%;
}

.select-wrapper select {
  width: 100%;
  max-width: 100%;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
}

.select-arrow {
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--slate-500);
  font-size: 1rem;
  line-height: 1;
}

/* Prevent native dropdown from escaping on mobile */
@media (max-width: 768px) {
  .select-wrapper select {
    font-size: 16px; /* prevents iOS zoom on focus */
    max-width: 100%;
  }
}
  .custom-select-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.9rem;
  background: #fff;
  border: 1px solid var(--slate-200);
  border-radius: var(--radius);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  color: var(--ink);
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
}

.custom-select-trigger:focus {
  outline: 2px solid var(--cryo-blue);
  outline-offset: 2px;
}

.custom-select-list {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;           /* ← keys to staying in frame */
  width: 100%;
  max-width: 100%;
  background: #fff;
  border: 1px solid var(--slate-200);
  border-radius: var(--radius);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  z-index: 20;
  list-style: none;
  margin: 0;
  padding: 0.3rem 0;
  overflow: hidden;
  box-sizing: border-box;
}

.custom-select-option {
  padding: 0.65rem 1rem;
  font-size: 0.92rem;
  color: var(--ink);
  cursor: pointer;
  transition: background 0.15s;
}

.custom-select-option:hover {
  background: var(--sky-tint, #f0f7ff);
}

.custom-select-option.selected {
  background: var(--leaf-mint, #f0faf4);
  font-weight: 600;
  color: var(--chain-green-deep);
}
      `}</style>
    </>
  );
};

export default Contact;
