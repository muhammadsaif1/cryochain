import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice"; // adjust path if needed
import NotesPanel from "../../../components/admin/NotesPanel";
import "./dashboard.css";
import BlogPanel from "../../../components/admin/BlogPanel";

const NAV_ITEMS = [
  { id: "notes", label: "Messages", icon: "✉" },
  { id: "blogs", label: "Blogs", icon: "✦" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("notes");
  const [sidebarOpen, setSidebar] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth?.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : "AD";

  // Scroll lock when modal is open
  useEffect(() => {
    let scrollY = 0;

    if (sidebarOpen) {
      scrollY = window.scrollY;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.touchAction = "none";
    } else {
      const savedY = parseInt(document.body.style.top || "0", 10) * -1;

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";

      window.scrollTo({ top: savedY, behavior: "instant" });
    }

    return () => {
      // Cleanup
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="db-root">
      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div className="db-overlay" onClick={() => setSidebar(false)} />
      )}

      {/* ══════════════ SIDEBAR ══════════════ */}
      <aside className={`db-sidebar ${sidebarOpen ? "db-sidebar--open" : ""}`}>
        {/* Brand */}
        <div className="db-sidebar__brand">
          <span className="db-sidebar__brand-mark">❄</span>
          <span className="db-sidebar__brand-name">CryoChain</span>
        </div>

        {/* Section label */}
        <p className="db-sidebar__section-label">Content</p>

        {/* Nav tabs */}
        <nav className="db-sidebar__nav">
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`db-nav-item ${activeTab === id ? "db-nav-item--active" : ""}`}
              onClick={() => {
                setActiveTab(id);
                setSidebar(false);
              }}
            >
              <span className="db-nav-item__icon">{icon}</span>
              <span className="db-nav-item__label">{label}</span>
              {activeTab === id && <span className="db-nav-item__pip" />}
            </button>
          ))}
        </nav>

        {/* Spacer */}
        <div className="db-sidebar__spacer" />

        {/* Profile */}
        <button
          className="db-sidebar__profile"
          onClick={() => navigate("/admin/profile")}
        >
          <div className="db-avatar">{initials}</div>
          <div className="db-sidebar__profile-info">
            <span className="db-sidebar__profile-name">
              {user?.email ?? "Admin"}
            </span>
            <span className="db-sidebar__profile-role">Administrator</span>
          </div>
          <span className="db-sidebar__profile-arrow">›</span>
        </button>

        {/* Logout */}
        <button className="db-sidebar__logout" onClick={handleLogout}>
          <span className="db-sidebar__logout-icon">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M13 15l4-5-4-5M17 10H7m0 6H5a2 2 0 01-2-2V6a2 2 0 012-2h2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Sign out
        </button>
      </aside>

      {/* ══════════════ MAIN ══════════════ */}
      <div className="db-main">
        {/* Top bar (mobile) */}
        <header className="db-topbar">
          <button
            className="db-topbar__menu"
            onClick={() => setSidebar((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
          <span className="db-topbar__title">
            {NAV_ITEMS.find((n) => n.id === activeTab)?.label}
          </span>
          <div className="db-avatar db-avatar--sm">{initials}</div>
        </header>

        {/* Page content */}
        <div className="db-content">
          {activeTab === "notes" && <NotesPanel />}

          {activeTab === "blogs" && <BlogPanel />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
