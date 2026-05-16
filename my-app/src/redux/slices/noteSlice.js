import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const API_URL = import.meta.env.VITE_API_BASE_URL;

// -----------------------------
// Helper: Auth headers
// -----------------------------
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// -----------------------------
// Initial State
// -----------------------------
const initialState = {
  notes: [],
  currentNote: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
  filters: {
    areaOfInterest: "",
    organisation: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
};

// ======================================================
// ASYNC THUNKS
// ======================================================

// ✅ Create a new note (Public)
export const createNote = createAsyncThunk(
  "notes/createNote",
  async (noteData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/notes`, noteData);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return rejectWithValue(message);
    }
  },
);

// ✅ Get all notes (Admin)
export const getAllNotes = createAsyncThunk(
  "notes/getAllNotes",
  async (
    {
      page = 1,
      limit = 10,
      areaOfInterest,
      organisation,
      sortBy,
      sortOrder,
    } = {},
    { rejectWithValue },
  ) => {
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);
      if (areaOfInterest) params.append("areaOfInterest", areaOfInterest);
      if (organisation) params.append("organisation", organisation);
      if (sortBy) params.append("sortBy", sortBy);
      if (sortOrder) params.append("sortOrder", sortOrder);

      const { data } = await axios.get(
        `${API_URL}/notes?${params.toString()}`,
        {
          headers: getAuthHeaders(),
        },
      );
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return rejectWithValue(message);
    }
  },
);

// ✅ Get single note by ID (Admin)
export const getNoteById = createAsyncThunk(
  "notes/getNoteById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/notes/${id}`, {
        headers: getAuthHeaders(),
      });
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return rejectWithValue(message);
    }
  },
);

// ✅ Update note (Admin)
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/notes/${id}`, updateData, {
        headers: getAuthHeaders(),
      });
      return data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return rejectWithValue(message);
    }
  },
);

// ✅ Delete note (Admin)
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${API_URL}/notes/${id}`, {
        headers: getAuthHeaders(),
      });
      return { id, ...data };
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return rejectWithValue(message);
    }
  },
);

// ✅ Bulk delete notes (Admin)
export const bulkDeleteNotes = createAsyncThunk(
  "notes/bulkDeleteNotes",
  async (ids, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${API_URL}/notes/bulk/delete`, {
        headers: getAuthHeaders(),
        data: { ids },
      });
      return { ids, ...data };
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return rejectWithValue(message);
    }
  },
);

// ======================================================
// SLICE
// ======================================================
const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentNote: (state) => {
      state.currentNote = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        areaOfInterest: "",
        organisation: "",
        sortBy: "createdAt",
        sortOrder: "desc",
      };
    },
    resetPagination: (state) => {
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
      };
    },
  },
  extraReducers: (builder) => {
    // --- CREATE NOTE ---
    builder.addCase(createNote.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes.unshift(action.payload.data);
      state.error = null;
    });
    builder.addCase(createNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // --- GET ALL NOTES ---
    builder.addCase(getAllNotes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload.data;
      state.pagination = action.payload.pagination;
      state.error = null;
    });
    builder.addCase(getAllNotes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // --- GET NOTE BY ID ---
    builder.addCase(getNoteById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getNoteById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentNote = action.payload.data;
      state.error = null;
    });
    builder.addCase(getNoteById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // --- UPDATE NOTE ---
    builder.addCase(updateNote.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.notes.findIndex(
        (note) => note._id === action.payload.data._id,
      );
      if (index !== -1) {
        state.notes[index] = action.payload.data;
      }
      if (state.currentNote?._id === action.payload.data._id) {
        state.currentNote = action.payload.data;
      }
      state.error = null;
    });
    builder.addCase(updateNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // --- DELETE NOTE ---
    builder.addCase(deleteNote.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = state.notes.filter(
        (note) => note._id !== action.payload.id,
      );
      if (state.currentNote?._id === action.payload.id) {
        state.currentNote = null;
      }
      state.error = null;
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // --- BULK DELETE NOTES ---
    builder.addCase(bulkDeleteNotes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(bulkDeleteNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = state.notes.filter(
        (note) => !action.payload.ids.includes(note._id),
      );
      state.error = null;
    });
    builder.addCase(bulkDeleteNotes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearError,
  clearCurrentNote,
  setFilters,
  clearFilters,
  resetPagination,
} = noteSlice.actions;

export default noteSlice.reducer;
