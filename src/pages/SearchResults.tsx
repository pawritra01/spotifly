import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import searchApi from "../api/searchApi";
import ListSection from "../components/ListSection";
import FullPageLoader from "../components/FullPageLoader";
import TrackList from "../components/TrackList";

export default function SearchResults({ search }: { search: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    tracks: { items: [] },
    playlists: { items: [] },
    albums: { items: [] },
    artists: { items: [] },
  });

  useEffect(() => {
    if (search.trim().length <= 0) return;

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
      <Typography variant="h6">Tracks</Typography>
      <TrackList items={searchResults.tracks.items.slice(10)} />

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
