import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchUserPlaylists = createAsyncThunk(
  "user/fetchUserPlaylists",
  async (_) => {
    const response = await api("/me/playlists");

    return {
      ...response,
      items: response.items.filter((item: unknown) => Boolean(item)),
    };
  }
);
