import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api/authApi";

export const loginThunk = createAsyncThunk(
  "authSlice/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const data = await api.loginUser(user);
      return data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);
