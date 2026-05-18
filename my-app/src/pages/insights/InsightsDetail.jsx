import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogById,
  getAllBlogs,
  clearCurrentBlog,
} from "../../redux/slices/blogSlice";

/* ── same icon pool as Insights index ── */
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
    <rect x="12" y="12" width="56" height="16" rx="2" />
    <rect x="12" y="32" width="56" height="16" rx="2" />
    <rect x="12" y="52" width="56" height="16" rx="2" />
    <circle cx="60" cy="20" r="3" fill="currentColor" />
    <circle cx="60" cy="40" r="3" fill="currentColor" />
    <circle cx="60" cy="60" r="3" fill="currentColor" />
  </svg>,
  <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.3">
    <path d="M12 68 C12 68 16 20 64 12 C64 12 68 56 20 68 Z" />
    <line x1="12" y1="68" x2="64" y2="12" />
  </svg>,
];

const getIcon = (i) => ICONS[i % ICONS.length];

const fmt = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/* ── strip HTML tags for plain-text fallback ── */
const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");

const InsightsDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    currentBlog: blog,
    blogs: related,
    loading,
    error,
  } = useSelector((s) => s.blogs ?? s.blog ?? {});

  /* fetch the blog by slug */
  useEffect(() => {
    if (slug) dispatch(getBlogById(slug));
    /* fetch a few recent posts for "Continue Reading" */
    dispatch(
      getAllBlogs({
        page: 1,
        limit: 4,
        isPublished: true,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
    );

    return () => dispatch(clearCurrentBlog());
  }, [dispatch, slug]);

  /* ── Loading state ── */
  if (loading && !blog) {
    return (
      <div className="ins-detail-state">
        <div className="ins-spinner" />
        <p>Loading article…</p>
      </div>
    );
  }

  /* ── Error / not found ── */
  if (error || (!loading && !blog)) {
    return (
      <div className="ins-detail-state ins-detail-state--error">
        <span style={{ fontSize: "2rem" }}>⚠</span>
        <p>{error || "Article not found."}</p>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="btn btn-ghost"
          style={{ marginTop: "1rem" }}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  /* related = other published blogs excluding current */
  const relatedPosts = (related || [])
    .filter((b) => b._id !== blog?._id)
    .slice(0, 3);

  const initials = blog?.author
    ? blog.author
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AU";

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {/* ── ARTICLE HERO ── */}
      <header className="article-hero">
        <div className="container-narrow">
          <div className="reveal" style={{ marginBottom: "var(--space-6)" }}>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="btn btn-ghost"
              style={{ marginTop: "1rem" }}
            >
              ← Go Back
            </button>
          </div>

          <div className="reveal">
            <h1 style={{ marginTop: "var(--space-4)" }}>{blog.title}</h1>

            {blog.excerpt && <p className="deck">{blog.excerpt}</p>}

            <div className="byline">
              <div className="by-avatar">{initials}</div>
              <div>
                <div className="by-name">{blog.author}</div>
                <div className="by-role">Author</div>
              </div>
              <div className="by-meta">
                <div>{fmt(blog.publishedAt || blog.createdAt)}</div>
                {blog.readTime > 0 && <div>{blog.readTime} min read</div>}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── ARTICLE BODY ── */}
      <article className="article-body">
        {/* Render HTML from rich text editor safely */}
        {blog.description ? (
          <div dangerouslySetInnerHTML={{ __html: blog.description }} />
        ) : (
          <p style={{ color: "var(--slate-400)", fontStyle: "italic" }}>
            No content available.
          </p>
        )}

        <hr
          style={{
            margin: "var(--space-16) 0",
            border: "0",
            borderTop: "1px solid var(--slate-100)",
          }}
        />

        <p
          className="small"
          style={{
            color: "var(--slate-500)",
            fontStyle: "italic",
            lineHeight: "1.6",
          }}
        >
          <strong>About the author.</strong> {blog.author} is a contributor to
          the CryoChain build. CryoChain is a vertically integrated cold chain,
          EV logistics, solar microgrid, and edge-AI platform launching in West
          Africa.
        </p>
      </article>

      {/* ── RELATED ARTICLES ── */}
      {relatedPosts.length > 0 && (
        <section className="related-articles">
          <div className="container">
            <div
              className="reveal"
              style={{ textAlign: "center", marginBottom: "var(--space-12)" }}
            >
              <span className="eyebrow">Continue Reading</span>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
                More from the build.
              </h2>
            </div>

            <div className="grid grid-3 reveal">
              {relatedPosts.map((post, idx) => (
                <Link
                  key={post._id}
                  to={`/insights/${post.slug}`}
                  className="article-card"
                >
                  <div className="ac-image ill">{getIcon(idx + 2)}</div>
                  <div className="ac-body">
                    <h3 style={{ fontSize: "1.2rem" }}>{post.title}</h3>
                    <p className="ac-excerpt">
                      {post.excerpt ||
                        stripHtml(post.description).substring(0, 100)}
                    </p>
                    <div className="ac-meta">
                      <span>{post.author}</span>
                      <span className="sep" />
                      <span>{fmt(post.publishedAt || post.createdAt)}</span>
                      <span className="sep" />
                      <span>{post.readTime || 1} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ── */}
      <section
        style={{
          background:
            "linear-gradient(180deg, var(--paper) 0%, var(--leaf-mint) 100%)",
          padding: "var(--space-20) 0",
        }}
      >
        <div className="container-narrow text-center">
          <div className="reveal">
            <span className="eyebrow green">For Qualified Partners</span>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                maxWidth: "24ch",
                margin: "var(--space-4) auto var(--space-6)",
              }}
            >
              A small number of strategic partners.{" "}
              <em style={{ color: "var(--cryo-blue)", fontStyle: "italic" }}>
                A defined path.
              </em>
            </h2>
            <p
              className="lede"
              style={{ maxWidth: "56ch", margin: "0 auto var(--space-8)" }}
            >
              We are inviting a small number of strategic partners to anchor the
              build. Start with a 30-minute introductory call — no commitment.
            </p>
            <div className="row" style={{ justifyContent: "center" }}>
              <Link to="/contact" className="btn btn-primary btn-arrow">
                Start a conversation
              </Link>
              <Link to="/insights" className="btn btn-ghost">
                More insights
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ── detail loading / error ── */
        .ins-detail-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          gap: 1rem;
          color: var(--slate-500);
          font-size: 0.95rem;
          text-align: center;
          padding: 2rem;
        }
        .ins-detail-state--error { color: #c62828; }

        .ins-spinner {
          width: 28px; height: 28px;
          border: 3px solid rgba(31,120,180,0.2);
          border-top-color: var(--cryo-blue);
          border-radius: 50%;
          animation: ins-spin 0.7s linear infinite;
        }
        @keyframes ins-spin { to { transform: rotate(360deg); } }

        /* ── article body rich text ── */
        .article-body h1,
        .article-body h2,
        .article-body h3,
        .article-body h4 {
          color: var(--slate-900);
          letter-spacing: -0.02em;
          margin-top: var(--space-12);
          margin-bottom: var(--space-4);
        }
        .article-body img {
          max-width: 100%;
          border-radius: var(--radius-lg);
          margin: var(--space-8) 0;
        }
        .article-body blockquote {
          border-left: 3px solid var(--cryo-blue);
          padding: var(--space-3) 0 var(--space-3) var(--space-6);
          margin: var(--space-10) 0;
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          line-height: 1.35;
          color: var(--slate-900);
        }
        .article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: var(--space-8) 0;
          font-size: 0.95rem;
        }
        .article-body th,
        .article-body td {
          padding: var(--space-3) var(--space-4);
          border: 1px solid var(--slate-200);
          text-align: left;
        }
        .article-body th {
          background: var(--surface);
          font-weight: 600;
          color: var(--slate-900);
        }

        /* ── article card icon size in related ── */
        .article-card .ac-image svg {
          width: 60px;
          height: 60px;
        }
      `}</style>
    </>
  );
};

export default InsightsDetail;
