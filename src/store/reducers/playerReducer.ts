import { createSlice } from "@reduxjs/toolkit";

export interface PlayerState {
  currentTrack: null | string;
}

const initialState: PlayerState = {
  currentTrack: null,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    logoutUser: () => initialState,
    setCurrentTrack: (state, { payload }) => {
      state.currentTrack = payload;
    },
  },
});

export const { setCurrentTrack } = playerSlice.actions;
export default playerSlice.reducer;
