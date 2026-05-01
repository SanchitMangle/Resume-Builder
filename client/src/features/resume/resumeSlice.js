import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createResume,
  deleteResume,
  getResumeById,
  getResumes,
  renameResume,
  updateResume,
} from "../../api/resumeApi";

const initialState = {
  list: [],
  current: null,
  loading: false,
  saving: false,
  error: "",
};

export const fetchResumesThunk = createAsyncThunk("resume/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getResumes();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createResumeThunk = createAsyncThunk("resume/create", async (title, { rejectWithValue }) => {
  try {
    return await createResume(title);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteResumeThunk = createAsyncThunk("resume/delete", async (resumeId, { rejectWithValue }) => {
  try {
    await deleteResume(resumeId);
    return resumeId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchResumeByIdThunk = createAsyncThunk(
  "resume/fetchById",
  async (resumeId, { rejectWithValue }) => {
    try {
      return await getResumeById(resumeId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateResumeThunk = createAsyncThunk(
  "resume/update",
  async ({ resumeId, body }, { rejectWithValue }) => {
    try {
      return await updateResume(resumeId, body);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const renameResumeThunk = createAsyncThunk(
  "resume/rename",
  async ({ resumeId, title }, { rejectWithValue }) => {
    try {
      return await renameResume(resumeId, title);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setCurrentResume(state, action) {
      state.current = action.payload;
    },
    clearResumeError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumesThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchResumesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.resumes || [];
      })
      .addCase(fetchResumesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load resumes";
      })
      .addCase(createResumeThunk.fulfilled, (state, action) => {
        state.list = [action.payload.resume, ...state.list];
      })
      .addCase(deleteResumeThunk.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item._id !== action.payload);
      })
      .addCase(fetchResumeByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchResumeByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.resume;
      })
      .addCase(fetchResumeByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load resume";
      })
      .addCase(updateResumeThunk.fulfilled, (state, action) => {
        state.saving = false;
        state.current = action.payload.resume;
        state.list = state.list.map((item) =>
          item._id === action.payload.resume._id ? action.payload.resume : item
        );
      })
      .addCase(renameResumeThunk.fulfilled, (state, action) => {
        if (state.current && state.current._id === action.payload.resume._id) {
          state.current = action.payload.resume;
        }
        state.list = state.list.map((item) =>
          item._id === action.payload.resume._id ? action.payload.resume : item
        );
      })
      .addCase(updateResumeThunk.pending, (state) => {
        state.saving = true;
      })
      .addCase(updateResumeThunk.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || "Failed to save resume";
      });
  },
});

export const { setCurrentResume, clearResumeError } = resumeSlice.actions;
export default resumeSlice.reducer;
