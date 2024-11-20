import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { getToken } from "../api/auth/login";

export default function AuthCallback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    if (!code) return;

    getToken(code).then((resp) => {
      localStorage.setItem("access_token", resp.access_token);
      localStorage.setItem("refresh_token", resp.refresh_token);

      window.location.href = "/";
    });
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
}
