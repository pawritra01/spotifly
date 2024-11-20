import { Box, CircularProgress } from "@mui/material";

export default function FullPageLoader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CircularProgress />
    </Box>
  );
}
