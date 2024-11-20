import { useAppDispatch, useAppSelector } from "../store/store";
import { clearSearch, setSearch } from "../store/reducers/appReducer";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Clear, Search } from "@mui/icons-material";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.app.search);

  return (
    <TextField
      fullWidth
      sx={{ m: 1 }}
      placeholder="Search"
      value={search}
      autoComplete="off"
      onChange={(e) => dispatch(setSearch(e.target.value))}
      slotProps={{
        input: {
          endAdornment:
            search.trim().length <= 0 ? (
              <Search />
            ) : (
              <InputAdornment
                position="end"
                component={IconButton}
                onClick={() => dispatch(clearSearch())}
              >
                <Clear />
              </InputAdornment>
            ),
        },
      }}
    />
  );
}
