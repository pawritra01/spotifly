import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
