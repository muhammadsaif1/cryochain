import { useEffect, useState, useCallback, useRef } from "react";
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

/* ── Reusable Custom Dropdown ── */
const CustomDropdown = ({ value, onChange, options, className }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value) || options[0];

  return (
    <div ref={ref} className={`np-custom-select ${className || ""}`}>
      <button
        type="button"
        className="np-custom-select__trigger"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="np-custom-select__label">{selected.label}</span>
        <span
          className="np-custom-select__arrow"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </button>

      {open && (
        <>
          {/* Invisible overlay to close on outside tap */}
          <div
            style={{ position: "fixed", inset: 0, zIndex: 98 }}
            onClick={() => setOpen(false)}
          />
          <ul className="np-custom-select__list">
            {options.map((opt) => (
              <li
                key={opt.value}
                className={`np-custom-select__option ${
                  opt.value === value
                    ? "np-custom-select__option--selected"
                    : ""
                }`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const NotesPanel = () => {
  const dispatch = useDispatch();
  const { notes, loading, error, pagination, filters } = useSelector(
    (s) => s.notes,
  );

  /* local filter bar state */
  const [localInterest, setLocalInterest] = useState("");
  const [localSort, setLocalSort] = useState("0");
  const [localOrg, setLocalOrg] = useState("");
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
      const { sortBy, sortOrder } = SORT_OPTIONS[Number(localSort)];
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
  const displayed = notes.filter((n) => {
    const searchQuery = search.toLowerCase().trim();
    const orgQuery = localOrg.toLowerCase().trim();

    const matchesSearch =
      !searchQuery ||
      n.firstName?.toLowerCase().includes(searchQuery) ||
      n.lastName?.toLowerCase().includes(searchQuery) ||
      n.email?.toLowerCase().includes(searchQuery) ||
      n.organisation?.toLowerCase().includes(searchQuery);

    const matchesOrg =
      !orgQuery || n.organisation?.toLowerCase().includes(orgQuery);

    const matchesInterest =
      !localInterest || n.areaOfInterest === localInterest;

    return matchesSearch && matchesOrg && matchesInterest;
  });

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

  /* ── scroll lock when any modal is open ── */
  useEffect(() => {
    const isOpen = modalOpen || !!deleteId;
    if (isOpen) {
      const scrollY = window.scrollY;
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
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
    };
  }, [modalOpen, deleteId]);

  /* ── dropdown option arrays ── */
  const interestDropdownOptions = INTEREST_OPTIONS.map((o) => ({
    label: o,
    value: o === "All" ? "" : o,
  }));

  const sortDropdownOptions = SORT_OPTIONS.map((o, i) => ({
    label: o.label,
    value: String(i),
  }));

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

        {/* Interest filter — custom dropdown */}
        <CustomDropdown
          value={localInterest}
          onChange={setLocalInterest}
          options={interestDropdownOptions}
          className="np-filter-dropdown"
        />

        {/* Org filter */}

        {/* Sort — custom dropdown */}
        <CustomDropdown
          value={localSort}
          onChange={setLocalSort}
          options={sortDropdownOptions}
          className="np-filter-dropdown"
        />

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
              <div className="np-row__name">
                <div className="np-row__avatar">
                  {(note.firstName?.[0] ?? "?").toUpperCase()}
                </div>
                <span className="np-row__fullname">
                  {note.firstName} {note.lastName}
                </span>
              </div>
              <span className="np-row__email np-col--email">{note.email}</span>
              <span className="np-row__org np-col--org">
                {note.organisation || <em style={{ opacity: 0.4 }}>—</em>}
              </span>
              <span className="np-col--interest">
                <span
                  className="np-badge"
                  style={{ "--badge-color": badgeColor(note.areaOfInterest) }}
                >
                  {note.areaOfInterest ?? "—"}
                </span>
              </span>
              <span className="np-row__date np-col--date">
                {fmt(note.createdAt)}
              </span>
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
                <div className="np-modal__message-wrap">
                  <p className="np-modal__message-label">Message</p>
                  <p className="np-modal__message">
                    {modalNote.message || (
                      <em style={{ opacity: 0.45 }}>No message provided.</em>
                    )}
                  </p>
                </div>
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

      {/* ══ Custom dropdown styles ══ */}
      <style>{`
        .np-custom-select {
          position: relative;
          width: 100%;
        }

        .np-custom-select__trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          padding: 0.45rem 0.75rem;
          background: var(--paper, #f7f5f0);
          border: 1.5px solid var(--slate-200, #e3e7ea);
          border-radius: 8px;
          font-family: inherit;
          font-size: 0.8rem;
          color: var(--ink, #1a2330);
          cursor: pointer;
          text-align: left;
          box-sizing: border-box;
          transition: border-color 0.2s, background 0.2s;
          white-space: nowrap;
          overflow: hidden;
        }

        .np-custom-select__trigger:hover {
          background: #fff;
          border-color: var(--cryo-blue, #1f78b4);
        }

        .np-custom-select__trigger:focus {
          outline: none;
          border-color: var(--cryo-blue, #1f78b4);
          box-shadow: 0 0 0 3px rgba(31, 120, 180, 0.1);
        }

        .np-custom-select__label {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .np-custom-select__arrow {
          font-size: 0.7rem;
          color: var(--slate-500, #6b7785);
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        .np-custom-select__list {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;           /* stays within parent width */
          width: 100%;
          background: #fff;
          border: 1.5px solid var(--slate-200, #e3e7ea);
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          z-index: 99;
          list-style: none;
          margin: 0;
          padding: 0.3rem 0;
          overflow: hidden;
          box-sizing: border-box;
        }

        .np-custom-select__option {
          padding: 0.55rem 0.9rem;
          font-size: 0.8rem;
          color: var(--ink, #1a2330);
          cursor: pointer;
          transition: background 0.12s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .np-custom-select__option:hover {
          background: var(--paper, #f7f5f0);
        }

        .np-custom-select__option--selected {
          background: rgba(31, 120, 180, 0.08);
          font-weight: 600;
          color: var(--cryo-blue, #1f78b4);
        }

        /* Mobile: stack filters vertically */
        @media (max-width: 768px) {
          .np-custom-select {
            width: 100%;
          }
          .np-filter-dropdown {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default NotesPanel;
