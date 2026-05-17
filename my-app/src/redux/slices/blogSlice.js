import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

/* ─────────────────────────────────────────────
   THUNKS
───────────────────────────────────────────── */

// GET /blogs  — public, supports page/limit/sort/search/isPublished/author
export const getAllBlogs = createAsyncThunk(
  "blogs/getAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/blogs`, { params });
      return res.data; // { success, data, pagination }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch blogs",
      );
    }
  },
);

// GET /blogs/stats/dashboard  — admin only
export const getBlogStats = createAsyncThunk(
  "blogs/getStats",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const res = await axios.get(`${API}/blogs/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch blog stats",
      );
    }
  },
);

// GET /blogs/:id  — public (id or slug)
export const getBlogById = createAsyncThunk(
  "blogs/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/blogs/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch blog",
      );
    }
  },
);

// GET /blogs/:id/related  — public
export const getRelatedBlogs = createAsyncThunk(
  "blogs/getRelated",
  async ({ id, limit = 3 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/blogs/${id}/related`, {
        params: { limit },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch related blogs",
      );
    }
  },
);

// POST /blogs  — admin
export const createBlog = createAsyncThunk(
  "blogs/create",
  async (blogData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const res = await axios.post(`${API}/blogs`, blogData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create blog",
      );
    }
  },
);

// PUT /blogs/:id  — admin
export const updateBlog = createAsyncThunk(
  "blogs/update",
  async ({ id, ...updateData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const res = await axios.put(`${API}/blogs/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update blog",
      );
    }
  },
);

// DELETE /blogs/:id  — admin
export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      await axios.delete(`${API}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id; // return id so we can remove it from state
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete blog",
      );
    }
  },
);

// PATCH /blogs/:id/publish  — admin
export const togglePublishStatus = createAsyncThunk(
  "blogs/togglePublish",
  async ({ id, isPublished }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const res = await axios.patch(
        `${API}/blogs/${id}/publish`,
        { isPublished },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to toggle publish status",
      );
    }
  },
);

// DELETE /blogs/bulk/delete  — admin
export const bulkDeleteBlogs = createAsyncThunk(
  "blogs/bulkDelete",
  async (ids, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.token;
      const res = await axios.delete(`${API}/blogs/bulk/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { ids }, // axios DELETE with body needs `data` key
      });
      return { ids, deletedCount: res.data.data.deletedCount };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to bulk delete blogs",
      );
    }
  },
);

/* ─────────────────────────────────────────────
   SLICE
───────────────────────────────────────────── */

const initialState = {
  // list
  blogs: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },

  // single blog
  currentBlog: null,

  // related
  relatedBlogs: [],

  // stats
  stats: null,

  // ui
  loading: false,
  statsLoading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearCurrentBlog(state) {
      state.currentBlog = null;
      state.relatedBlogs = [];
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* ── getAllBlogs ── */
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ── getBlogStats ── */
    builder
      .addCase(getBlogStats.pending, (state) => {
        state.statsLoading = true;
        state.error = null;
      })
      .addCase(getBlogStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(getBlogStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.error = action.payload;
      });

    /* ── getBlogById ── */
    builder
      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ── getRelatedBlogs ── */
    builder.addCase(getRelatedBlogs.fulfilled, (state, action) => {
      state.relatedBlogs = action.payload;
    });

    /* ── createBlog ── */
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload); // add to top of list
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ── updateBlog ── */
    builder
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        // replace the updated blog in list
        const idx = state.blogs.findIndex((b) => b._id === action.payload._id);
        if (idx !== -1) state.blogs[idx] = action.payload;
        // update currentBlog if it's open
        if (state.currentBlog?._id === action.payload._id) {
          state.currentBlog = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ── deleteBlog ── */
    builder
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
        if (state.currentBlog?._id === action.payload) {
          state.currentBlog = null;
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ── togglePublishStatus ── */
    builder
      .addCase(togglePublishStatus.fulfilled, (state, action) => {
        const idx = state.blogs.findIndex((b) => b._id === action.payload._id);
        if (idx !== -1) state.blogs[idx] = action.payload;
        if (state.currentBlog?._id === action.payload._id) {
          state.currentBlog = action.payload;
        }
      })
      .addCase(togglePublishStatus.rejected, (state, action) => {
        state.error = action.payload;
      });

    /* ── bulkDeleteBlogs ── */
    builder
      .addCase(bulkDeleteBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkDeleteBlogs.fulfilled, (state, action) => {
        state.loading = false;
        const { ids } = action.payload;
        state.blogs = state.blogs.filter((b) => !ids.includes(b._id));
      })
      .addCase(bulkDeleteBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentBlog, clearError } = blogSlice.actions;
export default blogSlice.reducer;
