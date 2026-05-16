import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/slices/authSlice"; // adjust path as needed
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="login-page">
      {/* ── Decorative background blobs ── */}
      <div className="login-blob login-blob--tl" aria-hidden="true" />
      <div className="login-blob login-blob--br" aria-hidden="true" />

      <div className="login-card">
        {/* ── Left panel ── */}
        <div className="login-panel login-panel--left">
          <div className="login-brand">
            <span className="login-brand__mark">❄</span>
            <span className="login-brand__name">CryoChain</span>
          </div>

          <div className="login-panel__body">
            <p className="login-panel__eyebrow">The Platform</p>
            <h2 className="login-panel__headline">
              Cold chain infrastructure for the next billion.
            </h2>
            <p className="login-panel__sub">
              Sign in to access your hub dashboard, fleet data, and edge
              analytics.
            </p>
          </div>

          {/* Stat pills */}
          <div className="login-stats">
            {[
              { num: "9", label: "Revenue verticals" },
              { num: "15", label: "Network hubs by 2031" },
              { num: "600M", label: "People served" },
            ].map(({ num, label }) => (
              <div key={label} className="login-stat">
                <span className="login-stat__num">{num}</span>
                <span className="login-stat__label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel: form ── */}
        <div className="login-panel login-panel--right">
          <div className="login-form-wrap">
            <h1 className="login-form__title">Welcome back</h1>
            <p className="login-form__sub">Sign in to your account</p>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="login-field">
                <label className="login-field__label" htmlFor="email">
                  Email address
                </label>
                <div className="login-field__input-wrap">
                  <svg
                    className="login-field__icon"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.5 6.5l7.5 5 7.5-5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <rect
                      x="1.5"
                      y="4"
                      width="17"
                      height="12"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                  <input
                    id="email"
                    type="email"
                    className="login-field__input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="login-field">
                <label className="login-field__label" htmlFor="password">
                  Password
                </label>
                <div className="login-field__input-wrap">
                  <svg
                    className="login-field__icon"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="9"
                      width="14"
                      height="9"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M6.5 9V6.5a3.5 3.5 0 017 0V9"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    className="login-field__input login-field__input--pad-right"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    className="login-field__toggle"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? (
                      <svg viewBox="0 0 20 20" fill="none">
                        <path
                          d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <circle
                          cx="10"
                          cy="10"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M3 3l14 14"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="none">
                        <path
                          d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <circle
                          cx="10"
                          cy="10"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="login-error" role="alert">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M10 6v4m0 3v1"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>
                    {typeof error === "string"
                      ? error
                      : "Invalid email or password. Please try again."}
                  </span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="login-submit"
                disabled={loading || !email || !password}
              >
                {loading ? (
                  <>
                    <span
                      className="login-submit__spinner"
                      aria-hidden="true"
                    />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path
                        d="M4 10h12m-5-5 5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <p className="login-footer-note">
              Don't have an account?{" "}
              <Link to="/contact" className="login-footer-note__link">
                Request access
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
