import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { Box } from "@mui/material";
import BottomBar from "../components/layout/BottomBar";
import Appbar from "../components/layout/Appbar";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  clearSearch,
  loginUser,
  logoutUser,
} from "../store/reducers/appReducer";
import { updateToken } from "../api/auth/login";
import {
  fetchUserFeaturedPlaylists,
  fetchUserPlaylists,
} from "../store/actions/userActions";
import { api } from "../api/api";
import { useEffect } from "react";
import SearchResults from "./SearchResults";
import { useDebounce } from "../hooks/useDebounce";

export default function AppLayout() {
  const user = useAppSelector((state) => state.app.user);
  const search = useAppSelector((state) => state.app.search);

  const debouncedSearch = useDebounce(search, 400);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    dispatch(clearSearch());
  }, [location]);

  useEffect(() => {
    const syncUser = async () => {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");

      if (!access_token && !refresh_token) navigate("/logged_out");

      try {
        const userData = await api("/me");

        dispatch(loginUser(userData));
        dispatch(fetchUserPlaylists());
        dispatch(fetchUserFeaturedPlaylists());
      } catch (err) {
        if (err.status === 401) {
          try {
            const response = await updateToken();
            if (!response.ok()) return;

            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("refresh_token", response.refresh_token);

            window.location.reload();
          } catch (err) {
            dispatch(logoutUser());
            navigate("/logged_out");
          }
        }
      }
    };

    syncUser();
  }, []);

  const showSearchResults = search.trim().length > 3;
  return (
    <>
      <Appbar />
      <Box display="flex" height="100%">
        {user && <Sidebar />}

        <Box
          width="100%"
          overflow="hidden auto"
          padding={2}
          paddingBottom={16}
          bgcolor="black"
          color="white"
        >
          {showSearchResults ? (
            <SearchResults search={debouncedSearch} />
          ) : (
            <Outlet />
          )}
        </Box>
      </Box>

      {user && <BottomBar />}
    </>
  );
}
