import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api/userApi";

export const editUserThunk = createAsyncThunk(
  "authSlice/editUser",
  async (user, { rejectWithValue }) => {
    try {
      const data = await api.editUser(user);
      return data;
    } catch (error) {
      return rejectWithValue(err.response.data);
    }
  }
);
