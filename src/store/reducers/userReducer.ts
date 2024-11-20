import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserFeaturedPlaylists,
  fetchUserPlaylists,
} from "../actions/userActions";

export interface UserState {
  playlists: {
    href: string;
    limit: number;
    total: number;
    items: {
      id: string;
      images: { url: string }[];
      name: string;
      type: "playlist" | "artist" | "album";
    }[];
  };
  featured: {
    href: string;
    limit: number;
    total: number;
    items: {
      id: string;
      images: { url: string }[];
      name: string;
      description: string;
      type: "playlist" | "artist" | "album";
    }[];
  };
}

const initialState: UserState = {
  playlists: {
    href: "",
    limit: 0,
    total: 0,
    items: [],
  },
  featured: {
    href: "",
    limit: 0,
    total: 0,
    items: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPlaylists.fulfilled, (state, action) => {
      state.playlists = action.payload;
    });

    builder.addCase(fetchUserFeaturedPlaylists.fulfilled, (state, action) => {
      state.featured = action.payload;
    });
  },
});

export default userSlice.reducer;
