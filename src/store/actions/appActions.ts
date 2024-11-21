import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchUserProfile = createAsyncThunk(
  "app/fetchUserProfile",
  async (_, { fulfillWithValue }) => {
    const response = await api("/me");

    fulfillWithValue(response);
    return response;
  }
);
