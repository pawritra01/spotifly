import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import artistsApi from "../api/artistsApi";
import { Track } from "../types/Track";
import { Artist as IArtist } from "../types/Artist";
import { Album } from "../types/Album";
import { Box } from "@mui/material";
import ListSection from "../components/ListSection";
import FullPageLoader from "../components/FullPageLoader";
import PageHeader from "../components/layout/PageHeader";
import TrackList from "../components/TrackList";

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

      <TrackList items={topTracks} />

      <ListSection items={albums} type="album" title="Albums" />
      <ListSection
        items={relatedArtists}
        type="artist"
        title="Related Artists"
      />
    </Box>
  );
}
