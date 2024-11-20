import { createBrowserRouter } from "react-router-dom";
import AuthCallback from "../pages/AuthCallback";
import AlbumPlaylist from "../pages/AlbumPlaylist";
import Artist from "../pages/Artist";
import UserHome from "../pages/UserHome";
import LoggedOut from "../pages/LoggedOut";
import AppLayout from "../pages/AppLayout";
import Queue from "../pages/Queue";

export const appRouter = createBrowserRouter([
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "/logged_out",
    element: <LoggedOut />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "queue",
        element: <Queue />,
      },
      {
        path: "artists/:id",
        element: <Artist />,
      },
      {
        path: ":type/:id",
        element: <AlbumPlaylist />,
      },
      {
        path: "/",
        element: <UserHome />,
      },
    ],
  },
]);
