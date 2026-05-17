import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../redux/slices/blogSlice";

/* ── Small icons for the right-column list items ── */
const ICONS = [
  /* house/field */ <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <polygon points="20,4 36,18 36,36 4,36 4,18" />
    <rect x="14" y="24" width="12" height="12" rx="1" />
  </svg>,
  /* trend up */ <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <polyline points="4,32 14,20 22,26 36,10" strokeLinejoin="round" />
    <circle cx="36" cy="10" r="2.5" fill="currentColor" />
  </svg>,
  /* sun/solar */ <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <circle cx="20" cy="20" r="7" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
      const r1 = 11,
        r2 = 16,
        rad = (a * Math.PI) / 180;
      return (
        <line
          key={a}
          x1={20 + r1 * Math.cos(rad)}
          y1={20 + r1 * Math.sin(rad)}
          x2={20 + r2 * Math.cos(rad)}
          y2={20 + r2 * Math.sin(rad)}
        />
      );
    })}
  </svg>,
  /* grid/platform */ <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <rect x="4" y="4" width="14" height="14" rx="2" />
    <rect x="22" y="4" width="14" height="14" rx="2" />
    <rect x="4" y="22" width="14" height="14" rx="2" />
    <rect x="22" y="22" width="14" height="14" rx="2" />
  </svg>,
  /* bar chart */ <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <rect x="4" y="22" width="7" height="14" rx="1" />
    <rect x="16" y="14" width="7" height="22" rx="1" />
    <rect x="28" y="8" width="7" height="28" rx="1" />
  </svg>,
];

const getIcon = (i) => ICONS[i % ICONS.length];

const fmt = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");

const HomeInsights = () => {
  const dispatch = useDispatch();
  const rawState = useSelector((s) => s.blogs ?? s.blog ?? {});
  const blogs = rawState.blogs ?? [];
  const loading = rawState.loading ?? false;
  const error = rawState.error ?? null;

  useEffect(() => {
    dispatch(
      getAllBlogs({
        page: 1,
        limit: 5,
        isPublished: true,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
    );
  }, [dispatch]);

  const featured = blogs[0] ?? null;
  const sideList = blogs.slice(1, 5);

  return (
    <section className="hi-section">
      <div className="container">
        {/* Header */}
        <div className="hi-header reveal">
          <div className="hi-header__left">
            <p className="hi-eyebrow">
              <span className="hi-rule" />
              Insights &amp; Field Notes
            </p>
            <h2 className="hi-title">Dispatches from the build.</h2>
            <p className="hi-sub">
              Founder essays, field reports, and analysis on the cold chain, EV
              logistics, and sovereign edge compute — written by the team
              building it.
            </p>
          </div>
          <div className="hi-header__right">
            <Link to="/insights" className="hi-all-link">
              All insights →
            </Link>
          </div>
        </div>

        {/* Main Content */}
        {featured && (
          <div className="hi-grid reveal">
            {/* Featured */}
            <Link to={`/insights/${featured.slug}`} className="hi-featured">
              <div className="hi-feat__image">
                {featured.coverImage ? (
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="hi-feat__icon-wrap">{getIcon(0)}</div>
                )}
                <div className="hi-feat__image-bg" />
              </div>
              <div className="hi-feat__body">
                <div className="hi-feat__meta">
                  <span className="hi-feat__author">By {featured.author}</span>
                  <span className="hi-feat__dot" />
                  <span>{fmt(featured.publishedAt || featured.createdAt)}</span>
                  <span className="hi-feat__dot" />
                  <span>{featured.readTime || 1} min read</span>
                </div>
                <h3 className="hi-feat__title">{featured.title}</h3>
                <p className="hi-feat__excerpt">
                  {featured.excerpt ||
                    stripHtml(featured.description).substring(0, 180)}
                </p>
              </div>
            </Link>

            {/* Side List */}
            {sideList.length > 0 && (
              <div className="hi-list">
                {sideList.map((post, idx) => (
                  <Link
                    key={post._id}
                    to={`/insights/${post.slug}`}
                    className="hi-item"
                  >
                    <div className="hi-item__icon">{getIcon(idx + 1)}</div>
                    <div className="hi-item__body">
                      <h4 className="hi-item__title">{post.title}</h4>
                      <p className="hi-item__meta">
                        By {post.author} •{" "}
                        {fmt(post.publishedAt || post.createdAt)} •{" "}
                        {post.readTime || 1} min read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .hi-section {
          padding: var(--space-20) 0;
          background: var(--paper, #f7f5f0);
        }

        .hi-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: var(--space-8);
        }

        /* Featured Card */
        .hi-featured {
          display: block;
          text-decoration: none;
          color: inherit;
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hi-feat__image {
          position: relative;
          aspect-ratio: 16/9.5;
          background: #0f1c2a;
        }
        .hi-feat__icon-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.75);
        }
        .hi-feat__icon-wrap svg {
          width: 110px;
          height: 110px;
        }
        .hi-feat__image-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(31,120,180,0.6), rgba(46,125,50,0.5));
          z-index: 1;
        }
        .hi-feat__image img {
          position: relative;
          z-index: 2;
        }
          /* Featured Meta - FIXED */
        .hi-feat__meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--slate-500);
          margin-bottom: 12px;
        }
        .hi-feat__author {
          color: var(--cryo-blue);
          font-weight: 600;
          margin-left: 12px;
        }
        .hi-feat__dot {
          color: var(--slate-300);
        }
          .hi-feat__title {
          font-family: var(--font-display, "Fraunces", serif);
          font-size: clamp(1.35rem, 2.2vw, 1.75rem);
          font-weight: 700;
          line-height: 1.25;
          margin-bottom: 14px;
          color: #1a2330;
          margin-left: 12px;
        }

        .hi-feat__excerpt {
          font-size: 0.95rem;
          line-height: 1.55;
          color: var(--slate-600);
          margin: 0;
          margin-left: 12px;
        }


        /* List */
        .hi-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .hi-item {
          display: flex;
          gap: 18px;
          padding: 20px;
          background: white;
          border-radius: 16px;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: all 0.25s ease;
          min-height: 138px;           /* Reduced height */
        }

        .hi-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
        }

        .hi-item__icon {
          width: 68px;
          height: 68px;
          border-radius: 14px;
          background: linear-gradient(135deg, #eef4fb, #f0f8f3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cryo-blue);
          flex-shrink: 0;
        }

        .hi-item__icon svg {
          width: 32px;
          height: 32px;
        }

        .hi-item__body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hi-item__title {
          font-family: var(--font-display, "Fraunces", serif);
          font-size: 1.15rem;
          line-height: 1.3;
          font-weight: 600;
          margin-bottom: 10px;
          color: #1a2330;
        }

        .hi-item__meta {
          font-size: 0.8rem;
          color: var(--slate-500);
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .hi-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .hi-item {
            padding: 16px;
            gap: 14px;
            min-height: 120px;
          }
          .hi-item__icon {
            width: 58px;
            height: 58px;
          }
          .hi-item__icon svg {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </section>
  );
};

export default HomeInsights;
