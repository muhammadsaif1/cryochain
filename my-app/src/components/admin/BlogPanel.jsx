import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  bulkDeleteBlogs,
  togglePublishStatus,
  clearCurrentBlog,
  clearError,
} from "../../redux/slices/blogSlice";
import RichEditor from "./RichEditor";
import { Link } from "react-router-dom";

/* ─── tiny helpers ─── */
const fmtDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");

/* ═══════════════════════════════════════════════════
   BLOG FORM (create / edit)
═══════════════════════════════════════════════════ */
const EMPTY_FORM = {
  title: "",
  author: "",
  readTime: "",
  description: "",
  isPublished: false,
};

const BlogForm = ({ editBlog, onSaved, onCancel }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.blogs ?? s.blog ?? {});

  const [form, setForm] = useState(
    editBlog
      ? {
          title: editBlog.title,
          author: editBlog.author,
          readTime: String(editBlog.readTime || ""),
          description: editBlog.description || "",
          isPublished: editBlog.isPublished || false,
        }
      : EMPTY_FORM,
  );
  const [touched, setTouched] = useState({});
  const [localErr, setLocalErr] = useState("");

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    if (!form.title.trim()) return "Title is required.";
    if (!form.author.trim()) return "Author name is required.";
    if (!stripHtml(form.description).trim())
      return "Description cannot be empty.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setLocalErr(err);
      return;
    }
    setLocalErr("");

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      readTime: Number(form.readTime) || 0,
      description: form.description,
      isPublished: form.isPublished,
    };

    let result;
    if (editBlog) {
      result = await dispatch(updateBlog({ id: editBlog._id, ...payload }));
    } else {
      result = await dispatch(createBlog(payload));
    }

    const actionCreator = editBlog ? updateBlog : createBlog;

    if (actionCreator.fulfilled.match(result)) {
      onSaved();
    } else if (actionCreator.rejected.match(result)) {
      // Catch duplicate title error from backend
      const errPayload = result.payload || result.error?.message || "";
      const errStr =
        typeof errPayload === "string"
          ? errPayload
          : errPayload?.message || JSON.stringify(errPayload);

      const duplicate = checkDuplicate(form.title);
      if (duplicate) {
        setLocalErr(`"${form.title.trim()}" is already posted.`);
        return;
      }
      if (isDuplicate) {
        setLocalErr(`"${form.title.trim()}" is already posted.`);
      } else {
        setLocalErr(
          typeof errPayload === "string" && errPayload
            ? errPayload
            : "Something went wrong. Please try again.",
        );
      }
    }
  };

  return (
    <form className="bf-form" onSubmit={handleSubmit} noValidate>
      <div className="bf-row">
        <div className="bf-field">
          <label>
            Title <span className="bf-req">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (localErr) setLocalErr("");
            }}
            placeholder="Article title"
            className={
              touched.title && !form.title.trim() ? "bf-input--err" : ""
            }
            onBlur={() => setTouched((p) => ({ ...p, title: true }))}
          />
        </div>
        <div className="bf-field">
          <label>
            Author <span className="bf-req">*</span>
          </label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
            placeholder="Author full name"
            onBlur={() => setTouched((p) => ({ ...p, author: true }))}
          />
        </div>
      </div>

      <div className="bf-row bf-row--short">
        <div className="bf-field">
          <label>Read Time (minutes)</label>
          <input
            type="number"
            min="1"
            value={form.readTime}
            onChange={(e) => set("readTime", e.target.value)}
            placeholder="e.g. 7"
          />
        </div>
        <div className="bf-field bf-field--check">
          <label className="bf-toggle">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => set("isPublished", e.target.checked)}
            />
            <span className="bf-toggle__track" />
            <span className="bf-toggle__label">Publish immediately</span>
          </label>
        </div>
      </div>

      <div className="bf-field">
        <label>
          Description <span className="bf-req">*</span>
        </label>
        <RichEditor
          value={form.description}
          onChange={(v) => set("description", v)}
          placeholder="Article Description"
        />
      </div>

      {(localErr || error) && (
        <p className="bf-error">
          {localErr ||
            (typeof error === "string" ? error : "Something went wrong.")}
        </p>
      )}

      <div className="bf-actions">
        <button
          type="button"
          className="bf-btn bf-btn--ghost"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bf-btn bf-btn--primary"
          disabled={loading}
        >
          {loading ? "Saving…" : editBlog ? "Save changes" : "Publish article"}
        </button>
      </div>
    </form>
  );
};

/* ═══════════════════════════════════════════════════
   MAIN BLOG PANEL
═══════════════════════════════════════════════════ */
const BlogPanel = () => {
  const dispatch = useDispatch();
  const rawState = useSelector((s) => s.blogs ?? s.blog ?? {});
  const blogs = rawState.blogs ?? [];
  const loading = rawState.loading ?? false;
  const error = rawState.error ?? null;
  const pagination = rawState.pagination ?? {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  };

  const checkDuplicate = (title) => {
    const normalized = title.trim().toLowerCase();
    return blogs.find(
      (b) =>
        b.title.trim().toLowerCase() === normalized && b._id !== editBlog?._id, // exclude current blog when editing
    );
  };

  const [tab, setTab] = useState("list"); // "list" | "new"
  const [editBlog, setEditBlog] = useState(null);
  const [selected, setSelected] = useState([]); // ids for bulk delete
  const [deleteId, setDeleteId] = useState(null);
  const [bulkConfirm, setBulkConfirm] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  /* scroll lock */
  useEffect(() => {
    const isOpen = !!deleteId || bulkConfirm;
    if (isOpen) {
      const y = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${y}px`;
      document.body.style.width = "100%";
    } else {
      const y = parseInt(document.body.style.top || "0", 10) * -1;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo({ top: y, behavior: "instant" });
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [deleteId, bulkConfirm]);

  const fetchBlogs = useCallback(
    (p = 1) => {
      dispatch(
        getAllBlogs({
          page: p,
          limit: 10,
          sortBy: "createdAt",
          sortOrder: "desc",
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    fetchBlogs(page);
  }, [fetchBlogs, page]);

  /* displayed (client search) */
  const displayed = search.trim()
    ? blogs.filter((b) => {
        const q = search.toLowerCase();
        return (
          b.title?.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q)
        );
      })
    : blogs;

  /* select helpers */
  const toggleSelect = (id, e) => {
    e.stopPropagation();
    setSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );
  };
  const toggleAll = () => {
    setSelected(
      selected.length === displayed.length ? [] : displayed.map((b) => b._id),
    );
  };

  /* delete single */
  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoad(true);
    await dispatch(deleteBlog(deleteId));
    setDeleteLoad(false);
    setDeleteId(null);
    fetchBlogs(page);
  };

  /* bulk delete */
  const handleBulkDelete = async () => {
    if (!selected.length) return;
    setDeleteLoad(true);
    await dispatch(bulkDeleteBlogs(selected));
    setDeleteLoad(false);
    setBulkConfirm(false);
    setSelected([]);
    fetchBlogs(1);
    setPage(1);
  };

  /* toggle publish */
  const handleTogglePublish = async (e, blog) => {
    e.stopPropagation();
    await dispatch(
      togglePublishStatus({ id: blog._id, isPublished: !blog.isPublished }),
    );
  };

  /* after save */
  const onSaved = () => {
    setTab("list");
    setEditBlog(null);
    setSelected([]);
    dispatch(clearError());
    fetchBlogs(1);
    setPage(1);
  };

  const openEdit = (blog) => {
    setEditBlog(blog);
    setTab("new");
    setSelected([]);
  };

  return (
    <div className="bp-root">
      {/* ── Header ── */}
      <div className="bp-header">
        <div>
          <h1 className="bp-header__title">Blogs</h1>
          <p className="bp-header__sub">
            {pagination.totalItems ?? blogs.length} article
            {(pagination.totalItems ?? blogs.length) !== 1 ? "s" : ""} total
          </p>
        </div>
        <div className="bp-header__actions">
          {selected.length > 0 && (
            <button
              className="bp-btn-danger"
              onClick={() => setBulkConfirm(true)}
            >
              Delete {selected.length} selected
            </button>
          )}
          <button
            className={`bp-tab-btn ${tab === "list" ? "bp-tab-btn--active" : ""}`}
            onClick={() => {
              setTab("list");
              setEditBlog(null);
              setSelected([]);
              dispatch(clearError());
            }}
          >
            All articles
          </button>
          <button
            className={`bp-tab-btn ${tab === "new" ? "bp-tab-btn--active" : ""}`}
            onClick={() => {
              setTab("new");
              setEditBlog(null);
              setSelected([]);
              dispatch(clearError());
            }}
          >
            + New article
          </button>
        </div>
      </div>

      {/* ── LIST TAB ── */}
      {tab === "list" && (
        <>
          {/* search */}
          <div className="bp-searchbar">
            <svg viewBox="0 0 20 20" fill="none">
              <circle
                cx="8.5"
                cy="8.5"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M13 13l4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search title or author…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="bp-search-clear" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>

          {/* loading */}
          {loading && !blogs.length && (
            <div className="np-state">
              <div className="np-spinner" />
              <p>Loading…</p>
            </div>
          )}

          {/* error */}
          {!loading && error && (
            <div className="np-state np-state--error">
              <span>⚠</span>
              <p>
                {typeof error === "string" ? error : "Failed to load blogs."}
              </p>
              <button className="np-retry" onClick={() => fetchBlogs(1)}>
                Retry
              </button>
            </div>
          )}

          {/* empty */}
          {!loading && !error && displayed.length === 0 && (
            <div className="np-state">
              <span style={{ fontSize: "2rem" }}>✦</span>
              <p>No articles yet. Create your first one.</p>
            </div>
          )}

          {/* table */}
          {displayed.length > 0 && (
            <div className="np-list">
              <div className="bp-list__head">
                <span>
                  <input
                    type="checkbox"
                    checked={
                      selected.length === displayed.length &&
                      displayed.length > 0
                    }
                    onChange={toggleAll}
                    className="bp-checkbox"
                  />
                </span>
                <span>Title</span>
                <span className="bp-col--view">View</span>
                <span className="bp-col--author">Author</span>
                <span className="bp-col--date">Date</span>
                <span className="bp-col--read">Read</span>
                <span className="bp-col--status">Status</span>
                <span />
              </div>

              {displayed.map((blog, idx) => (
                <div
                  key={blog._id}
                  className="bp-row"
                  onClick={() => openEdit(blog)}
                  style={{ animationDelay: `${idx * 25}ms` }}
                >
                  {/* checkbox */}
                  <span onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.includes(blog._id)}
                      onChange={(e) => toggleSelect(blog._id, e)}
                      className="bp-checkbox"
                    />
                  </span>

                  {/* title */}
                  <div className="bp-row__title-wrap">
                    <span className="bp-row__title">{blog.title}</span>
                  </div>

                  {/* ── VIEW icon ── */}
                  <span
                    className="bp-col--view"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      to={`/insights/${blog.slug}`}
                      className="bp-view-btn"
                      title="View article"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        width="16"
                        height="16"
                      >
                        <path
                          d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="10"
                          cy="10"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                      </svg>
                      <span>View</span>
                    </Link>
                  </span>

                  {/* author */}
                  <span className="bp-col--author bp-row__author">
                    {blog.author}
                  </span>

                  {/* date */}
                  <span className="bp-col--date bp-row__meta">
                    {fmtDate(blog.publishedAt || blog.createdAt)}
                  </span>

                  {/* read time */}
                  <span className="bp-col--read bp-row__meta">
                    {blog.readTime || "—"} min
                  </span>

                  {/* status toggle */}
                  <span
                    className="bp-col--status"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className={`bp-status ${blog.isPublished ? "bp-status--live" : "bp-status--draft"}`}
                      onClick={(e) => handleTogglePublish(e, blog)}
                      title={
                        blog.isPublished
                          ? "Click to unpublish"
                          : "Click to publish"
                      }
                    >
                      {blog.isPublished ? "Live" : "Draft"}
                    </button>
                  </span>

                  {/* delete */}
                  <button
                    className="np-row__delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(blog._id);
                    }}
                    aria-label="Delete"
                  >
                    <svg viewBox="0 0 20 20" fill="none">
                      <path
                        d="M5 5l10 10M15 5L5 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* pagination */}
          {pagination.totalPages > 1 && (
            <div className="np-pagination">
              <button
                className="np-page-btn"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Prev
              </button>
              <span className="np-page-info">
                Page {page} of {pagination.totalPages}
              </span>
              <button
                className="np-page-btn"
                disabled={page === pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {/* ── FORM TAB ── */}
      {tab === "new" && (
        <div className="bp-form-wrap">
          <div className="bp-form-header">
            <h2 className="bp-form-title">
              {editBlog ? `Editing: ${editBlog.title}` : "New article"}
            </h2>
            {editBlog && (
              <button
                className="bp-btn-danger bp-btn-danger--sm"
                onClick={() => setDeleteId(editBlog._id)}
              >
                Delete article
              </button>
            )}
          </div>
          <BlogForm
            editBlog={editBlog}
            onSaved={onSaved}
            onCancel={() => {
              setTab("list");
              setEditBlog(null);
              dispatch(clearError());
            }}
          />
        </div>
      )}

      {/* ── Delete single confirm ── */}
      {deleteId && (
        <div className="np-modal-overlay" onClick={() => setDeleteId(null)}>
          <div
            className="np-modal np-modal--confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="np-confirm__icon">🗑</div>
            <h3 className="np-confirm__title">Delete this article?</h3>
            <p className="np-confirm__body">
              This cannot be undone. The article will be permanently removed.
            </p>
            <div className="np-confirm__actions">
              <button
                className="np-confirm__cancel"
                onClick={() => setDeleteId(null)}
                disabled={deleteLoad}
              >
                Cancel
              </button>
              <button
                className="np-confirm__ok"
                onClick={handleDelete}
                disabled={deleteLoad}
              >
                {deleteLoad ? "Deleting…" : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Bulk delete confirm ── */}
      {bulkConfirm && (
        <div className="np-modal-overlay" onClick={() => setBulkConfirm(false)}>
          <div
            className="np-modal np-modal--confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="np-confirm__icon">🗑</div>
            <h3 className="np-confirm__title">
              Delete {selected.length} articles?
            </h3>
            <p className="np-confirm__body">
              This cannot be undone. All selected articles will be permanently
              removed.
            </p>
            <div className="np-confirm__actions">
              <button
                className="np-confirm__cancel"
                onClick={() => setBulkConfirm(false)}
                disabled={deleteLoad}
              >
                Cancel
              </button>
              <button
                className="np-confirm__ok"
                onClick={handleBulkDelete}
                disabled={deleteLoad}
              >
                {deleteLoad ? "Deleting…" : "Yes, delete all"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPanel;
