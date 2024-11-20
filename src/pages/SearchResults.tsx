import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import searchApi from "../api/searchApi";
import ListSection from "../components/ListSection";
import FullPageLoader from "../components/FullPageLoader";

export default function SearchResults({ search }: { search: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    tracks: { items: [] },
    playlists: { items: [] },
    albums: { items: [] },
    artists: { items: [] },
  });

  useEffect(() => {
    if (search.trim().length < 3) return;

    setIsLoading(true);
    searchApi()
      .search(search)
      .then((data) => setSearchResults(data))
      .finally(() => {
        setIsLoading(false);
      });
  }, [search]);

  if (isLoading) return <FullPageLoader />;
  return (
    <Box>
      {/** Tracks */}

      {/** Artist */}
      <ListSection
        items={searchResults.artists.items}
        type="artist"
        title="Artists"
      />

      {/** Albums */}
      <ListSection
        items={searchResults.albums.items}
        type="album"
        title="Artists"
      />

      {/** Playlist */}
      <ListSection
        items={searchResults.playlists.items}
        type="playlist"
        title="Playlists"
      />
    </Box>
  );
}
