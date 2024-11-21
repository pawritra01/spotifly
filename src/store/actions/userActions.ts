import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchUserPlaylists = createAsyncThunk(
  "user/fetchUserPlaylists",
  async (_, { fulfillWithValue }) => {
    const response = await api("/me/playlists");

    fulfillWithValue(response);
    return response;
  }
);

export const fetchUserFeaturedPlaylists = createAsyncThunk(
  "user/fetchUserFeaturedPlaylists",
  async (_, { fulfillWithValue }) => {
    const response = await api("/browse/featured-playlists");

    fulfillWithValue(response);
    return response.playlists;
  }
);

