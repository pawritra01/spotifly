import { Box, Button, Typography } from "@mui/material";
import { redirectAuth } from "../api/auth/login";

export default function LoggedOut() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        alignContent: "center",
        justifyItems: "center",
        bgcolor: "black",
        color: "white",
      }}
    >
      <Typography variant="h3" sx={{ letterSpacing: 8, fontWeight: 700 }}>
        SPOTIFLY
      </Typography>

      <Box sx={{ marginTop: 4, justifyItems: "center" }}>
        <Typography component="div" variant="caption">
          Please login to continue
        </Typography>
        <Button
          variant="contained"
          onClick={redirectAuth}
          sx={{ marginTop: 1 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
