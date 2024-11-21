import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "../actions/appActions";

export interface AppState {
  sidebarExpanded: boolean;
  user: any | null;
  deviceId: null | string;
  search: string;
}

const initialState: AppState = {
  sidebarExpanded: true,
  user: null,
  deviceId: null,
  search: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarExpanded = !state.sidebarExpanded;
    },
    collapseSidebar: (state) => {
      state.sidebarExpanded = false;
    },
    loginUser: (state, { payload }) => {
      state.user = payload;
    },
    registerDevice: (state, { payload }) => {
      state.deviceId = payload;
    },
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    clearSearch: (state) => {
      state.search = "";
    },
    logoutUser: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
      state.user = payload;
    })
  }
});

export const {
  toggleSidebar,
  collapseSidebar,
  loginUser,
  logoutUser,
  registerDevice,
  setSearch,
  clearSearch,
} = appSlice.actions;
export default appSlice.reducer;
