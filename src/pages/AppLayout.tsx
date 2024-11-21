import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { Box } from "@mui/material";
import BottomBar from "../components/layout/BottomBar";
import Appbar from "../components/layout/Appbar";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  clearSearch,
  logoutUser,
} from "../store/reducers/appReducer";
import { updateToken } from "../api/auth/login";
import {
  fetchUserFeaturedPlaylists,
  fetchUserPlaylists,
} from "../store/actions/userActions";
import { useEffect } from "react";
import SearchResults from "./SearchResults";
import { useDebounce } from "../hooks/useDebounce";
import { fetchUserProfile } from "../store/actions/appActions";

export default function AppLayout() {
  const user = useAppSelector((state) => state.app.user);
  const search = useAppSelector((state) => state.app.search);

  const debouncedSearch = useDebounce(search, 400);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(clearSearch());
  }, [location]);

  useEffect(() => {
    let timer: number;

    if(user) {
      timer = setInterval(() => {
        updateToken();
      }, 1000 * 60 * 30);
    }

    return () => {
      if(timer) clearInterval(timer);
    }
  }, [user])

  useEffect(() => {
    const syncUser = () => {
      updateToken().then(() => {
        dispatch(fetchUserProfile());
        dispatch(fetchUserPlaylists());
        dispatch(fetchUserFeaturedPlaylists());
      }).catch(() => {
        dispatch(logoutUser());
      })
    }

    syncUser();
  }, [])

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
          {search.trim().length > 0 ? (
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
