import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import artistsApi from "../api/artistsApi";
import { Track } from "../types/Track";
import { Artist as IArtist } from "../types/Artist";
import { Album } from "../types/Album";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import ListSection from "../components/ListSection";
import FullPageLoader from "../components/FullPageLoader";
import PageHeader from "../components/layout/PageHeader";
import { convertMsToMinutes } from "../utils/timeUtils";

export default function Artist() {
  const params = useParams();
  const [artist, setArtist] = useState<IArtist>();
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [relatedArtists, setRelatedArtists] = useState<IArtist[]>([]);

  useEffect(() => {
    if (!params.id) return;

    Promise.all([
      artistsApi(params.id).getArtist(),
      artistsApi(params.id).getArtistAlbums(),
      artistsApi(params.id).getArtistTopTracks(),
      artistsApi(params.id).getRelatedArtists(),
    ]).then((data) => {
      setArtist(data[0]);
      setAlbums(data[1].items);
      setTopTracks(data[2].tracks);
      setRelatedArtists(data[3].artists);
    });
  }, [params.id]);

  if (!artist) return <FullPageLoader />;
  return (
    <Box>
      <PageHeader
        name={artist?.name}
        uri={artist?.uri}
        image={artist?.images[0].url}
        author={`${artist.followers.total} followers`}
      />

      <List>
        {topTracks.map((item, index) => {
          return (
            <ListItemButton key={item.id}>
              <Typography sx={{ paddingRight: 2 }} fontSize={14}>
                {index + 1}
              </Typography>
              <Typography sx={{ flex: 1 }}>{item.name}</Typography>
              <Typography sx={{ flex: 1 }}>{item.album.name}</Typography>
              <Typography sx={{ flex: 1 }}>
                {convertMsToMinutes(item.duration_ms)}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>

      <ListSection items={albums} type="album" title="Albums" />
      <ListSection
        items={relatedArtists}
        type="artist"
        title="Related Artists"
      />
    </Box>
  );
}
