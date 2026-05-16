import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotes,
  deleteNote,
  getNoteById,
  clearCurrentNote,
  setFilters,
  clearFilters,
} from "../../redux/slices/noteSlice"; // adjust path

const INTEREST_OPTIONS = [
  "All",
  "Strategic partnership",
  "Family office / capital partner",
  "Development finance institution",
  "Government / sovereign engagement",
  "Industry / commercial partner",
  "Press / media inquiry",
  "Other",
];

const SORT_OPTIONS = [
  { label: "Newest first", sortBy: "createdAt", sortOrder: "desc" },
  { label: "Oldest first", sortBy: "createdAt", sortOrder: "asc" },
  { label: "Name A→Z", sortBy: "firstName", sortOrder: "asc" },
  { label: "Name Z→A", sortBy: "firstName", sortOrder: "desc" },
];

/* ── tiny date formatter ── */
const fmt = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const NotesPanel = () => {
  const dispatch = useDispatch();
  const { notes, loading, error, pagination, filters } = useSelector(
    (s) => s.notes,
  );

  /* local filter bar state (mirrors Redux filters) */
  const [localInterest, setLocalInterest] = useState("");
  const [localOrg, setLocalOrg] = useState("");
  const [localSort, setLocalSort] = useState(0); // index into SORT_OPTIONS
  const [search, setSearch] = useState("");

  /* detail modal */
  const [modalNote, setModalNote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailLoad, setDetailLoad] = useState(false);

  /* delete confirm */
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoad, setDeleteLoad] = useState(false);

  /* ── fetch ── */
  const fetchNotes = useCallback(
    (page = 1) => {
      const { sortBy, sortOrder } = SORT_OPTIONS[localSort];
      dispatch(
        getAllNotes({
          page,
          limit: 10,
          areaOfInterest: localInterest || undefined,
          organisation: localOrg || undefined,
          sortBy,
          sortOrder,
        }),
      );
    },
    [dispatch, localInterest, localOrg, localSort],
  );

  useEffect(() => {
    fetchNotes(1);
  }, [fetchNotes]);

  /* ── open detail modal ── */
  const openDetail = async (note) => {
    setModalNote(note);
    setModalOpen(true);
    setDetailLoad(true);
    const result = await dispatch(getNoteById(note._id));
    if (getNoteById.fulfilled.match(result)) {
      setModalNote(result.payload.data);
    }
    setDetailLoad(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalNote(null);
    dispatch(clearCurrentNote());
  };

  /* ── delete ── */
  const confirmDelete = (e, id) => {
    e.stopPropagation();
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoad(true);
    await dispatch(deleteNote(deleteId));
    setDeleteLoad(false);
    setDeleteId(null);
    if (modalNote?._id === deleteId) closeModal();
    fetchNotes(pagination.currentPage);
  };

  /* ── filter search (client-side on loaded page) ── */
  const displayed = search.trim()
    ? notes.filter((n) => {
        const q = search.toLowerCase();
        return (
          n.firstName?.toLowerCase().includes(q) ||
          n.lastName?.toLowerCase().includes(q) ||
          n.email?.toLowerCase().includes(q) ||
          n.organisation?.toLowerCase().includes(q)
        );
      })
    : notes;

  /* ── badge colour by interest ── */
  const badgeColor = (interest) => {
    const map = {
      "Strategic partnership": "#1F78B4",
      "Family office / capital partner": "#3DAB6B",
      "Development finance institution": "#E0A92B",
      "Government / sovereign engagement": "#E05C5C",
      "Industry / commercial partner": "#6B5CE7",
      "Press / media inquiry": "#E05C5C",
    };
    return map[interest] ?? "#6B7785";
  };

  return (
    <div className="np-root">
      {/* ══ Header ══ */}
      <div className="np-header">
        <div>
          <h1 className="np-header__title">Messages</h1>
          <p className="np-header__sub">
            {pagination.totalItems ?? notes.length} enquir
            {(pagination.totalItems ?? notes.length) === 1 ? "y" : "ies"}{" "}
            received
          </p>
        </div>
      </div>

      {/* ══ Filter bar ══ */}
      <div className="np-filters">
        {/* Search */}
        <div className="np-filter-search">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
            placeholder="Search name, email, org…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="np-filter-search__clear"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>

        {/* Interest filter */}
        <select
          className="np-filter-select"
          value={localInterest}
          onChange={(e) => {
            setLocalInterest(e.target.value === "All" ? "" : e.target.value);
          }}
        >
          {INTEREST_OPTIONS.map((o) => (
            <option key={o} value={o === "All" ? "" : o}>
              {o}
            </option>
          ))}
        </select>

        {/* Org filter */}
        <input
          className="np-filter-input"
          type="text"
          placeholder="Filter by organisation…"
          value={localOrg}
          onChange={(e) => setLocalOrg(e.target.value)}
        />

        {/* Sort */}
        <select
          className="np-filter-select"
          value={localSort}
          onChange={(e) => setLocalSort(Number(e.target.value))}
        >
          {SORT_OPTIONS.map((o, i) => (
            <option key={o.label} value={i}>
              {o.label}
            </option>
          ))}
        </select>

        {/* Clear */}
        {(localInterest || localOrg || search) && (
          <button
            className="np-filter-clear"
            onClick={() => {
              setLocalInterest("");
              setLocalOrg("");
              setSearch("");
              dispatch(clearFilters());
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ══ States ══ */}
      {loading && !notes.length && (
        <div className="np-state">
          <div className="np-spinner" />
          <p>Loading notes…</p>
        </div>
      )}

      {!loading && error && (
        <div className="np-state np-state--error">
          <span>⚠</span>
          <p>{typeof error === "string" ? error : "Failed to load notes."}</p>
          <button className="np-retry" onClick={() => fetchNotes(1)}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && displayed.length === 0 && (
        <div className="np-state">
          <span style={{ fontSize: "2rem" }}>✉</span>
          <p>No notes found.</p>
        </div>
      )}

      {/* ══ Notes list ══ */}
      {displayed.length > 0 && (
        <div className="np-list">
          {/* List header */}
          <div className="np-list__head">
            <span>Sender</span>
            <span className="np-col--email">Email</span>
            <span className="np-col--org">Organisation</span>
            <span className="np-col--interest">Interest</span>
            <span className="np-col--date">Date</span>
            <span />
          </div>

          {displayed.map((note, idx) => (
            <div
              key={note._id}
              className="np-row"
              onClick={() => openDetail(note)}
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              {/* Name */}
              <div className="np-row__name">
                <div className="np-row__avatar">
                  {(note.firstName?.[0] ?? "?").toUpperCase()}
                </div>
                <span className="np-row__fullname">
                  {note.firstName} {note.lastName}
                </span>
              </div>

              {/* Email */}
              <span className="np-row__email np-col--email">{note.email}</span>

              {/* Org */}
              <span className="np-row__org np-col--org">
                {note.organisation || <em style={{ opacity: 0.4 }}>—</em>}
              </span>

              {/* Interest badge */}
              <span className="np-col--interest">
                <span
                  className="np-badge"
                  style={{ "--badge-color": badgeColor(note.areaOfInterest) }}
                >
                  {note.areaOfInterest ?? "—"}
                </span>
              </span>

              {/* Date */}
              <span className="np-row__date np-col--date">
                {fmt(note.createdAt)}
              </span>

              {/* Delete */}
              <button
                className="np-row__delete"
                onClick={(e) => confirmDelete(e, note._id)}
                aria-label="Delete note"
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

      {/* ══ Pagination ══ */}
      {pagination.totalPages > 1 && (
        <div className="np-pagination">
          <button
            className="np-page-btn"
            disabled={pagination.currentPage === 1}
            onClick={() => fetchNotes(pagination.currentPage - 1)}
          >
            ← Prev
          </button>
          <span className="np-page-info">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            className="np-page-btn"
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => fetchNotes(pagination.currentPage + 1)}
          >
            Next →
          </button>
        </div>
      )}

      {/* ══ Detail Modal ══ */}
      {modalOpen && modalNote && (
        <div className="np-modal-overlay" onClick={closeModal}>
          <div className="np-modal" onClick={(e) => e.stopPropagation()}>
            <button className="np-modal__close" onClick={closeModal}>
              ✕
            </button>

            {detailLoad ? (
              <div className="np-state" style={{ padding: "3rem" }}>
                <div className="np-spinner" />
              </div>
            ) : (
              <>
                {/* Modal header */}
                <div className="np-modal__header">
                  <div className="np-modal__avatar">
                    {(modalNote.firstName?.[0] ?? "?").toUpperCase()}
                  </div>
                  <div>
                    <h2 className="np-modal__name">
                      {modalNote.firstName} {modalNote.lastName}
                    </h2>
                    <a
                      className="np-modal__email"
                      href={`mailto:${modalNote.email}`}
                    >
                      {modalNote.email}
                    </a>
                  </div>
                </div>

                {/* Meta grid */}
                <div className="np-modal__meta">
                  {[
                    {
                      label: "Organisation",
                      value: modalNote.organisation || "—",
                    },
                    { label: "Role", value: modalNote.role || "—" },
                    {
                      label: "Interest",
                      value: modalNote.areaOfInterest || "—",
                    },
                    { label: "Received", value: fmt(modalNote.createdAt) },
                  ].map(({ label, value }) => (
                    <div key={label} className="np-modal__meta-item">
                      <span className="np-modal__meta-label">{label}</span>
                      <span className="np-modal__meta-value">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div className="np-modal__message-wrap">
                  <p className="np-modal__message-label">Message</p>
                  <p className="np-modal__message">
                    {modalNote.message || (
                      <em style={{ opacity: 0.45 }}>No message provided.</em>
                    )}
                  </p>
                </div>

                {/* Modal footer */}
                <div className="np-modal__footer">
                  <a
                    className="np-modal__reply"
                    href={`mailto:${modalNote.email}`}
                  >
                    Reply by email
                  </a>
                  <button
                    className="np-modal__delete"
                    onClick={() => {
                      setDeleteId(modalNote._id);
                      setModalOpen(false);
                    }}
                  >
                    Delete note
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ══ Delete Confirm Modal ══ */}
      {deleteId && (
        <div className="np-modal-overlay" onClick={() => setDeleteId(null)}>
          <div
            className="np-modal np-modal--confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="np-confirm__icon">🗑</div>
            <h3 className="np-confirm__title">Delete this note?</h3>
            <p className="np-confirm__body">
              This action cannot be undone. The note will be permanently
              removed.
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
    </div>
  );
};

export default NotesPanel;
