import { AppBar, Avatar, Box, Button, Icon, Toolbar } from "@mui/material";
import { redirectAuth } from "../../api/auth/login";
import { useAppSelector } from "../../store/store";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";

export default function Appbar() {
  const user = useAppSelector((state) => state.app.user);

  return (
    <AppBar position="relative">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Icon component={Link} to={{ pathname: "/" }}>
          <Home />
        </Icon>

        <Box
          width="50%"
          minWidth="250px"
          maxWidth="500px"
          display="flex"
          alignItems="center"
        >
          <SearchBar />
        </Box>

        {!user ? (
          <Button color="inherit" onClick={redirectAuth}>
            Login
          </Button>
        ) : (
          <Avatar src={user.images[0].url} />
        )}
      </Toolbar>
    </AppBar>
  );
}