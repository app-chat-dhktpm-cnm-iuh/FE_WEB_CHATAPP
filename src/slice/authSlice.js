import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/authThunk";
import { editUserThunk } from "../thunks/userThunk";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLoading: false,
    currentUser: null,
    token: null,
  },

  reducers: {
    logout: (state) => {
      (state.isLoading = false), (state.currentUser = null);
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.currentUser = action.payload.data.user),
          (state.token = action.payload.data.token);
      })

      .addCase(loginThunk.rejected, (state) => {
        (state.isLoading = false),
          (state.currentUser = null),
          (state.token = null);
      })

      .addCase(editUserThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload.data;
      }),
});
