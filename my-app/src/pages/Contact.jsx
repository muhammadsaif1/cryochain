import React from "react";
import "../index.css";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you. We will respond within two business days.");
  };

  return (
    <>
      {/* HERO */}
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

      {/* TWO COLUMNS — FORM + CONTEXT */}
      <section className="tight">
        <div className="container">
          <div
            className="grid grid-2"
            style={{ gap: "var(--space-16)", alignItems: "flex-start" }}
          >
            {/* LEFT — FORM */}
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

              <form className="form" onSubmit={handleSubmit}>
                <div className="form-field-row">
                  <div className="form-field">
                    <label htmlFor="first">First Name</label>
                    <input id="first" name="first" type="text" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="last">Last Name</label>
                    <input id="last" name="last" type="text" required />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required />
                </div>

                <div className="form-field-row">
                  <div className="form-field">
                    <label htmlFor="org">Organisation</label>
                    <input id="org" name="org" type="text" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="role">Role</label>
                    <input id="role" name="role" type="text" />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="interest">Area of Interest</label>
                  <select id="interest" name="interest">
                    <option>Strategic partnership</option>
                    <option>Family office / capital partner</option>
                    <option>Development finance institution</option>
                    <option>Government / sovereign engagement</option>
                    <option>Industry / commercial partner</option>
                    <option>Press / media inquiry</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="What would you like to discuss?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-arrow"
                  style={{ justifySelf: "start", marginTop: "var(--space-2)" }}
                >
                  Send
                </button>

                <p className="small" style={{ marginTop: "var(--space-3)" }}>
                  By submitting, you agree to our{" "}
                  <a href="/privacy">Privacy Policy</a> and{" "}
                  <a href="/terms">Terms of Use</a>.
                </p>
              </form>
            </div>

            {/* RIGHT — CONTEXT */}
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
                  <div style={{ marginBottom: "var(--space-4)" }}>
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
                      General Inquiries
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 500,
                        color: "var(--slate-900)",
                      }}
                    >
                      hello@cryochain.com
                    </p>
                  </div>
                  <div style={{ marginBottom: "var(--space-4)" }}>
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
                      Partner Relations
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 500,
                        color: "var(--slate-900)",
                      }}
                    >
                      partners@cryochain.com
                    </p>
                  </div>
                  <div>
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
                      Press
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 500,
                        color: "var(--slate-900)",
                      }}
                    >
                      media@cryochain.com
                    </p>
                  </div>
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
                  <li
                    style={{
                      marginBottom: "var(--space-3)",
                      paddingLeft: "var(--space-2)",
                    }}
                  >
                    <strong style={{ color: "var(--slate-900)" }}>
                      Within 48 hours.
                    </strong>{" "}
                    We respond to your message and propose a time for a
                    30-minute call.
                  </li>
                  <li
                    style={{
                      marginBottom: "var(--space-3)",
                      paddingLeft: "var(--space-2)",
                    }}
                  >
                    <strong style={{ color: "var(--slate-900)" }}>
                      Within 2 weeks.
                    </strong>{" "}
                    Mutual NDA and access to the Phase I memorandum and
                    financial model.
                  </li>
                  <li style={{ paddingLeft: "var(--space-2)" }}>
                    <strong style={{ color: "var(--slate-900)" }}>
                      Within 30 days.
                    </strong>{" "}
                    Optional site visit and direct engagement with the team.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE NOTE */}
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
              agreement... See our <a href="/terms">Terms of Use</a> for further
              detail.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
