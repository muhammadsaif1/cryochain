import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBlogs, clearError } from "../../redux/slices/blogSlice";
import fourPillars from "../../assets/images/four-pillars.png";

/* ── 35 rotating SVG icons for blog cards ── */
const ICONS = [
  /* 01 bar chart */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <rect x="8" y="44" width="12" height="28" rx="1.5" />
    <rect x="28" y="28" width="12" height="44" rx="1.5" />
    <rect x="48" y="16" width="12" height="56" rx="1.5" />
    <rect x="68" y="36" width="12" height="36" rx="1.5" />
  </svg>,
  /* 02 line trend */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <polyline points="8,64 24,48 40,52 56,28 72,16" strokeLinejoin="round" />
    <circle cx="8" cy="64" r="3" fill="currentColor" />
    <circle cx="24" cy="48" r="3" fill="currentColor" />
    <circle cx="40" cy="52" r="3" fill="currentColor" />
    <circle cx="56" cy="28" r="3" fill="currentColor" />
    <circle cx="72" cy="16" r="3" fill="currentColor" />
  </svg>,
  /* 03 snowflake */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <line x1="40" y1="8" x2="40" y2="72" />
    <line x1="8" y1="40" x2="72" y2="40" />
    <line x1="17" y1="17" x2="63" y2="63" />
    <line x1="63" y1="17" x2="17" y2="63" />
    <circle cx="40" cy="40" r="6" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
      const r = 26,
        rx = 40 + r * Math.cos((a * Math.PI) / 180),
        ry = 40 + r * Math.sin((a * Math.PI) / 180);
      return <circle key={a} cx={rx} cy={ry} r="3" fill="currentColor" />;
    })}
  </svg>,
  /* 04 truck */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <rect x="4" y="24" width="44" height="32" rx="2" />
    <path d="M48 36 L72 36 L72 56 L48 56 Z" />
    <path d="M48 36 L60 24 L72 36" />
    <circle cx="16" cy="60" r="6" />
    <circle cx="60" cy="60" r="6" />
  </svg>,
  /* 05 solar panel */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <rect x="8" y="20" width="64" height="36" rx="2" />
    <line x1="8" y1="38" x2="72" y2="38" />
    <line x1="29" y1="20" x2="29" y2="56" />
    <line x1="51" y1="20" x2="51" y2="56" />
    <line x1="40" y1="56" x2="40" y2="68" />
    <line x1="24" y1="68" x2="56" y2="68" />
  </svg>,
  /* 06 server/data */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <rect x="12" y="12" width="56" height="16" rx="2" />
    <rect x="12" y="32" width="56" height="16" rx="2" />
    <rect x="12" y="52" width="56" height="16" rx="2" />
    <circle cx="60" cy="20" r="3" fill="currentColor" />
    <circle cx="60" cy="40" r="3" fill="currentColor" />
    <circle cx="60" cy="60" r="3" fill="currentColor" />
  </svg>,
  /* 07 leaf/food */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M12 68 C12 68 16 20 64 12 C64 12 68 56 20 68 Z" />
    <line x1="12" y1="68" x2="64" y2="12" />
  </svg>,
  /* 08 battery */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <rect x="8" y="24" width="56" height="32" rx="3" />
    <rect x="64" y="32" width="8" height="16" rx="2" />
    <rect
      x="16"
      y="32"
      width="12"
      height="16"
      rx="1"
      fill="currentColor"
      opacity=".4"
    />
    <rect
      x="32"
      y="32"
      width="12"
      height="16"
      rx="1"
      fill="currentColor"
      opacity=".4"
    />
  </svg>,
  /* 09 map pin */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M40 8 C26 8 16 18 16 32 C16 50 40 72 40 72 C40 72 64 50 64 32 C64 18 54 8 40 8 Z" />
    <circle cx="40" cy="32" r="8" />
  </svg>,
  /* 10 network nodes */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <circle cx="40" cy="40" r="6" />
    <circle cx="16" cy="20" r="5" />
    <circle cx="64" cy="20" r="5" />
    <circle cx="16" cy="60" r="5" />
    <circle cx="64" cy="60" r="5" />
    <line x1="40" y1="40" x2="16" y2="20" />
    <line x1="40" y1="40" x2="64" y2="20" />
    <line x1="40" y1="40" x2="16" y2="60" />
    <line x1="40" y1="40" x2="64" y2="60" />
    <line x1="16" y1="20" x2="64" y2="20" />
    <line x1="16" y1="60" x2="64" y2="60" />
  </svg>,
  /* 11 pie chart */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <circle cx="40" cy="40" r="28" />
    <line x1="40" y1="40" x2="40" y2="12" />
    <line x1="40" y1="40" x2="68" y2="40" />
    <path d="M40 12 A28 28 0 0 1 68 40" strokeWidth="1.3" />
  </svg>,
  /* 12 lightning bolt */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <polyline
      points="48,8 24,44 40,44 32,72 56,36 40,36 48,8"
      strokeLinejoin="round"
    />
  </svg>,
  /* 13 thermometer */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M40 52 L40 16 A8 8 0 0 1 40 16" />
    <rect x="33" y="12" width="14" height="40" rx="7" />
    <circle cx="40" cy="58" r="12" />
    <line x1="47" y1="24" x2="52" y2="24" />
    <line x1="47" y1="34" x2="52" y2="34" />
    <line x1="47" y1="44" x2="52" y2="44" />
    <rect
      x="36"
      y="36"
      width="8"
      height="22"
      rx="4"
      fill="currentColor"
      opacity=".5"
    />
  </svg>,
  /* 14 warehouse */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <polygon points="8,36 40,12 72,36 72,68 8,68" />
    <rect x="28" y="44" width="24" height="24" rx="1" />
    <line x1="40" y1="44" x2="40" y2="68" />
  </svg>,
  /* 15 globe */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <circle cx="40" cy="40" r="28" />
    <ellipse cx="40" cy="40" rx="14" ry="28" />
    <line x1="12" y1="40" x2="68" y2="40" />
    <path d="M14 24 Q40 32 66 24" />
    <path d="M14 56 Q40 48 66 56" />
  </svg>,
  /* 16 pill/pharma */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <rect x="16" y="28" width="48" height="24" rx="12" />
    <line x1="40" y1="28" x2="40" y2="52" />
    <rect
      x="16"
      y="28"
      width="24"
      height="24"
      rx="12"
      fill="currentColor"
      opacity=".15"
    />
  </svg>,
  /* 17 EV charging */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <rect x="20" y="12" width="40" height="56" rx="4" />
    <line x1="32" y1="12" x2="32" y2="68" />
    <path d="M40 32 L32 48 L40 48 L32 64" strokeLinejoin="round" />
    <line x1="40" y1="68" x2="40" y2="76" />
  </svg>,
  /* 18 shield */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M40 8 L68 20 L68 44 C68 58 54 70 40 74 C26 70 12 58 12 44 L12 20 Z" />
    <polyline
      points="28,40 36,48 52,32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  /* 19 DNA/bio */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M28 8 C28 8 52 20 52 40 C52 60 28 72 28 72" />
    <path d="M52 8 C52 8 28 20 28 40 C28 60 52 72 52 72" />
    <line x1="28" y1="24" x2="52" y2="24" />
    <line x1="28" y1="40" x2="52" y2="40" />
    <line x1="28" y1="56" x2="52" y2="56" />
  </svg>,
  /* 20 compass */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <circle cx="40" cy="40" r="28" />
    <polygon
      points="40,16 46,40 40,48 34,40"
      fill="currentColor"
      opacity=".3"
    />
    <polygon points="40,64 34,40 40,32 46,40" />
    <circle cx="40" cy="40" r="4" fill="currentColor" />
  </svg>,
  /* 21 gear */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <circle cx="40" cy="40" r="10" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
      const r1 = 18,
        r2 = 26,
        rad = (a * Math.PI) / 180;
      return (
        <line
          key={a}
          x1={40 + r1 * Math.cos(rad)}
          y1={40 + r1 * Math.sin(rad)}
          x2={40 + r2 * Math.cos(rad)}
          y2={40 + r2 * Math.sin(rad)}
          strokeWidth="5"
          strokeLinecap="round"
        />
      );
    })}
  </svg>,
  /* 22 container/box */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <polygon points="40,8 72,24 72,56 40,72 8,56 8,24" />
    <line x1="40" y1="8" x2="40" y2="72" />
    <line x1="8" y1="24" x2="72" y2="24" />
    <line x1="8" y1="56" x2="72" y2="56" />
  </svg>,
  /* 23 signal/wifi */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M12 36 C12 36 24 20 40 20 C56 20 68 36 68 36" />
    <path d="M20 46 C20 46 28 36 40 36 C52 36 60 46 60 46" />
    <path d="M28 56 C28 56 32 50 40 50 C48 50 52 56 52 56" />
    <circle cx="40" cy="64" r="4" fill="currentColor" />
  </svg>,
  /* 24 chart area */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <polyline points="8,64 20,40 36,48 52,24 72,32" strokeLinejoin="round" />
    <polygon
      points="8,64 20,40 36,48 52,24 72,32 72,64"
      fill="currentColor"
      opacity=".1"
    />
    <line x1="8" y1="64" x2="72" y2="64" />
  </svg>,
  /* 25 money/coins */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <ellipse cx="32" cy="28" rx="20" ry="10" />
    <line x1="12" y1="28" x2="12" y2="44" />
    <line x1="52" y1="28" x2="52" y2="44" />
    <ellipse cx="32" cy="44" rx="20" ry="10" />
    <ellipse cx="48" cy="52" rx="20" ry="10" />
    <line x1="28" y1="44" x2="28" y2="52" />
    <line x1="68" y1="52" x2="68" y2="60" />
    <ellipse cx="48" cy="60" rx="20" ry="10" />
  </svg>,
  /* 26 factory */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <rect x="8" y="40" width="64" height="32" rx="1" />
    <path d="M8 40 L8 24 L28 40" />
    <path d="M28 40 L28 24 L48 40" />
    <path d="M48 40 L48 24 L68 40" />
    <rect x="32" y="52" width="16" height="20" rx="1" />
    <line x1="20" y1="8" x2="20" y2="24" />
    <line x1="40" y1="8" x2="40" y2="24" />
  </svg>,
  /* 27 handshake */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M8 44 L24 28 L36 36 L48 28 L72 44" />
    <path d="M24 28 L36 36 L48 28" />
    <line x1="8" y1="44" x2="8" y2="56" />
    <line x1="72" y1="44" x2="72" y2="56" />
    <path d="M8 56 Q40 68 72 56" />
  </svg>,
  /* 28 microscope */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <rect x="32" y="8" width="16" height="32" rx="2" />
    <circle cx="40" cy="48" r="16" />
    <line x1="24" y1="68" x2="56" y2="68" />
    <line x1="40" y1="64" x2="40" y2="68" />
    <circle cx="40" cy="48" r="6" />
  </svg>,
  /* 29 sun */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <circle cx="40" cy="40" r="14" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
      const r1 = 20,
        r2 = 28,
        rad = (a * Math.PI) / 180;
      return (
        <line
          key={a}
          x1={40 + r1 * Math.cos(rad)}
          y1={40 + r1 * Math.sin(rad)}
          x2={40 + r2 * Math.cos(rad)}
          y2={40 + r2 * Math.sin(rad)}
        />
      );
    })}
  </svg>,
  /* 30 layers */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <polygon points="40,8 72,24 40,40 8,24" />
    <polygon points="40,24 72,40 40,56 8,40" />
    <polygon points="40,40 72,56 40,72 8,56" />
  </svg>,
  /* 31 rocket */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M40 8 C40 8 56 20 56 44 L40 60 L24 44 C24 20 40 8 40 8 Z" />
    <circle cx="40" cy="36" r="6" />
    <path d="M24 44 L16 56 L28 52" />
    <path d="M56 44 L64 56 L52 52" />
    <line x1="40" y1="60" x2="40" y2="72" />
  </svg>,
  /* 32 lock */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <rect x="16" y="36" width="48" height="36" rx="4" />
    <path d="M24 36 L24 24 A16 16 0 0 1 56 24 L56 36" />
    <circle cx="40" cy="54" r="6" />
    <line x1="40" y1="60" x2="40" y2="66" />
  </svg>,
  /* 33 cloud */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M20 52 A16 16 0 0 1 20 20 A14 14 0 0 1 48 16 A18 18 0 0 1 64 52 Z" />
    <line x1="32" y1="60" x2="32" y2="68" />
    <line x1="40" y1="60" x2="40" y2="72" />
    <line x1="48" y1="60" x2="48" y2="66" />
  </svg>,
  /* 34 flag */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <line x1="16" y1="8" x2="16" y2="72" />
    <path d="M16 8 L64 20 L16 36 Z" />
  </svg>,
  /* 35 infinity */ <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
  >
    <path d="M16 40 C16 28 24 20 32 20 C40 20 40 40 40 40 C40 40 40 60 48 60 C56 60 64 52 64 40 C64 28 56 20 48 20 C40 20 40 40 40 40 C40 40 40 60 32 60 C24 60 16 52 16 40 Z" />
  </svg>,
];

const getIcon = (index) => ICONS[index % ICONS.length];

const fmt = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const PAGE_SIZE = 9;

const Insights = () => {
  const dispatch = useDispatch();
  //   const { blogs, loading, error, pagination } = useSelector((s) => s.blogs);

  const rawState = useSelector((s) => s.blogs ?? s.blog ?? {});
  const blogs = rawState.blogs ?? [];
  const loading = rawState.loading ?? false;
  const error = rawState.error ?? null;
  const pagination = rawState.pagination ?? {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  };

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getAllBlogs({
        page,
        limit: PAGE_SIZE,
        isPublished: true,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
    );
  }, [dispatch, page]);

  const featured = blogs[0] || null;
  const gridBlogs = blogs.slice(1); // rest go into grid

  const handleLoadMore = () => setPage((p) => p + 1);
  const hasMore = pagination.currentPage < pagination.totalPages;

  return (
    <>
      {/* ── HERO ── */}
      <header className="insights-hero">
        <div className="container">
          <div className="reveal" style={{ maxWidth: "900px" }}>
            <span className="kicker">
              <span className="dot" />
              &nbsp;The Magazine&nbsp;·&nbsp;Issue No. 1
            </span>
            <h1
              className="mag-h1"
              style={{
                marginTop: "var(--space-6)",
                fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)",
              }}
            >
              Insights &amp; <em>field notes</em>
              <br />
              from the build.
            </h1>
            <p className="lede" style={{ maxWidth: "64ch" }}>
              Founder essays, field reports, and analysis on cold chain
              infrastructure, EV logistics, solar microgrids, and sovereign edge
              compute — written by the team building it in West Africa.
            </p>
          </div>

          {/* ── FEATURED ── */}
          {loading && !featured && (
            <div className="ins-state">
              <div className="ins-spinner" />
              <p>Loading latest insight…</p>
            </div>
          )}

          {!loading && error && !featured && (
            <div className="ins-state ins-state--error">
              <span>⚠</span>
              <p>Could not load articles. Please try again later.</p>
              <button
                className="btn btn-ghost"
                onClick={() =>
                  dispatch(
                    getAllBlogs({
                      page: 1,
                      limit: PAGE_SIZE,
                      isPublished: true,
                    }),
                  )
                }
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="ins-empty">
              <div className="ins-empty__icon">{getIcon(0)}</div>
              <p className="ins-empty__text">
                No articles published yet. Check back soon.
              </p>
            </div>
          )}

          {featured && (
            <div className="insights-featured reveal">
              <Link
                to={`/insights/${featured.slug}`}
                style={{ display: "block", textDecoration: "none" }}
              >
                <div className="feat-image">
                  <div className="feat-icon-wrap">{getIcon(0)}</div>
                </div>
              </Link>
              <div>
                <h2 style={{ marginTop: "var(--space-4)" }}>
                  <Link
                    to={`/insights/${featured.slug}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="lede" style={{ marginBottom: "var(--space-6)" }}>
                  {featured.excerpt ||
                    featured.description
                      ?.replace(/<[^>]*>/g, "")
                      .substring(0, 160)}
                </p>

                <div className="feat-byline">
                  <div className="feat-avatar">
                    {featured.author?.slice(0, 2).toUpperCase() || "AU"}
                  </div>
                  <div>
                    <div className="feat-author-name">{featured.author}</div>
                    <div className="feat-author-role">Author</div>
                  </div>
                  <div className="feat-meta">
                    <div>{fmt(featured.publishedAt || featured.createdAt)}</div>
                    <div>{featured.readTime || 1} min read</div>
                  </div>
                </div>

                <Link
                  to={`/insights/${featured.slug}`}
                  className="btn btn-primary btn-arrow"
                  style={{
                    marginTop: "var(--space-6)",
                    display: "inline-flex",
                  }}
                >
                  Read the essay
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── GRID SECTION ── */}
      {blogs.length > 1 && (
        <section style={{ paddingTop: "var(--space-16)" }}>
          <div className="container">
            {/* Grid */}
            <div className="articles-grid reveal">
              {gridBlogs.map((blog, idx) => (
                <Link
                  key={blog._id}
                  to={`/insights/${blog.slug}`}
                  className="article-card"
                >
                  <div className="ac-image ill">{getIcon(idx + 1)}</div>
                  <div className="ac-body">
                    <h3>{blog.title}</h3>
                    <p className="ac-excerpt">
                      {blog.excerpt ||
                        blog.description
                          ?.replace(/<[^>]*>/g, "")
                          .substring(0, 120)}
                    </p>
                    <div className="ac-meta">
                      <span>{blog.author}</span>
                      <span className="sep" />
                      <span>{fmt(blog.publishedAt || blog.createdAt)}</span>
                      <span className="sep" />
                      <span>{blog.readTime || 1} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load more / end states */}
            <div className="text-center mt-12 reveal">
              {loading && (
                <div
                  className="ins-state"
                  style={{ padding: "var(--space-8) 0" }}
                >
                  <div className="ins-spinner" />
                </div>
              )}

              {!loading && hasMore && (
                <button
                  className="btn btn-ghost btn-arrow"
                  onClick={handleLoadMore}
                >
                  Load more insights
                </button>
              )}

              {!loading && !hasMore && blogs.length > 1 && (
                <p className="ins-end-note">
                  <span className="ins-end-rule" />
                  That's everything — {pagination.totalItems ||
                    blogs.length}{" "}
                  article
                  {(pagination.totalItems || blogs.length) !== 1
                    ? "s"
                    : ""}{" "}
                  published so far.
                  <span className="ins-end-rule" />
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── SUBSCRIBE BAND ── */}
      <section className="ins-subscribe">
        <div className="container-narrow text-center">
          <div className="reveal">
            <span className="eyebrow green">The Briefing</span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                maxWidth: "26ch",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              One signal a month.{" "}
              <em style={{ color: "var(--cryo-blue)", fontStyle: "italic" }}>
                Zero noise.
              </em>
            </h2>
            <p
              className="lede"
              style={{
                maxWidth: "52ch",
                margin: "var(--space-4) auto var(--space-8)",
              }}
            >
              Monthly briefing: build-progress updates, sector analysis, and
              field dispatches from the Phase I hub. Curated for partners and
              operators.
            </p>
            <form
              className="ins-subscribe-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscription stub.");
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="ins-email-input"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
            <p
              className="small mt-8"
              style={{
                maxWidth: "52ch",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              No marketing. No fundraising solicitation. Unsubscribe anytime.
              See our{" "}
              <Link to="/privacy" style={{ color: "var(--cryo-blue)" }}>
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <style>{`
        /* ── featured byline ── */
        .feat-byline {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4) 0;
          border-top: 1px solid var(--slate-100);
          border-bottom: 1px solid var(--slate-100);
        }
        .feat-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--cryo-blue), var(--chain-green));
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.88rem;
          flex-shrink: 0;
        }
        .feat-author-name {
          font-weight: 600;
          color: var(--slate-900);
          font-size: 0.9rem;
        }
        .feat-author-role {
          font-size: 0.78rem;
          color: var(--slate-500);
        }
        .feat-meta {
          margin-left: auto;
          text-align: right;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--slate-500);
        }

        /* ── featured icon ── */
        .feat-icon-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.6);
        }
        .feat-icon-wrap svg {
          width: 80px;
          height: 80px;
        }

        /* ── loading / error states ── */
        .ins-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-16) 0;
          color: var(--slate-500);
          font-size: 0.9rem;
          text-align: center;
        }
        .ins-state--error { color: #c62828; }
        .ins-spinner {
          width: 28px; height: 28px;
          border: 3px solid rgba(31,120,180,0.2);
          border-top-color: var(--cryo-blue);
          border-radius: 50%;
          animation: ins-spin 0.7s linear infinite;
        }
        @keyframes ins-spin { to { transform: rotate(360deg); } }

        /* ── empty state ── */
        .ins-empty {
          margin-top: var(--space-12);
          padding: var(--space-16);
          text-align: center;
          border: 1px dashed var(--slate-200);
          border-radius: var(--radius-lg);
          color: var(--slate-400);
        }
        .ins-empty__icon svg { width: 64px; height: 64px; }
        .ins-empty__text { margin-top: var(--space-4); font-size: 1rem; }

        /* ── end note ── */
        .ins-end-note {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          justify-content: center;
          font-size: 0.85rem;
          color: var(--slate-400);
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
        }
        .ins-end-rule {
          flex: 1;
          max-width: 80px;
          height: 1px;
          background: var(--slate-200);
          display: inline-block;
        }

        /* ── subscribe section ── */
        .ins-subscribe {
          background: linear-gradient(180deg, var(--paper) 0%, var(--leaf-mint) 100%);
          padding: var(--space-20) 0;
        }
        .ins-subscribe-form {
          display: flex;
          gap: var(--space-3);
          max-width: 460px;
          margin: 0 auto;
          flex-wrap: wrap;
        }
        .ins-email-input {
          flex: 1;
          min-width: 220px;
          padding: 14px 20px;
          border-radius: 999px;
          border: 1px solid var(--slate-300);
          font-size: 0.95rem;
          background: white;
          font-family: inherit;
        }
        .ins-email-input:focus {
          outline: 2px solid var(--cryo-blue);
          outline-offset: 2px;
        }

        /* ── article card icon size ── */
        .article-card .ac-image svg {
          width: 64px;
          height: 64px;
        }

        /* ── mobile ── */
        @media (max-width: 600px) {
          .ins-subscribe-form {
            flex-direction: column;
          }
          .ins-email-input {
            min-width: auto;
            width: 100%;
          }
          .ins-subscribe-form .btn {
            width: 100%;
            justify-content: center;
          }
          .feat-byline {
            flex-wrap: wrap;
            gap: var(--space-3);
          }
          .feat-meta {
            margin-left: 0;
            text-align: left;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Insights;
