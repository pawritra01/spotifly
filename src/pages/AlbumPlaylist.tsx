import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import useQuery from "../hooks/useQuery";
import { Box } from "@mui/material";
import { AlbumOrPlaylist } from "../types/AlbumOrPlaylist";
import TrackList from "../components/playlist/TrackList";
import FullPageLoader from "../components/FullPageLoader";
import PageHeader from "../components/layout/PageHeader";

export default function AlbumPlaylist() {
  const params = useParams();

  if (!params.id || !params.type) return;

  const queryFn = useCallback(() => {
    return api(`/${params.type}/${params.id}`);
  }, [params.type, params.id]);
  const { data, refetch } = useQuery<AlbumOrPlaylist>({ queryFn });

  useEffect(() => {
    refetch();
  }, [params]);

  if (!data) return <FullPageLoader />;

  const author = data.owner
    ? data.owner.display_name
    : data.artists.reduce(
        (i, artist) => (i ? i + ", " + artist.name : i + artist.name),
        ""
      );
  return (
    <Box sx={{ paddingY: 8 }}>
      <PageHeader
        author={author}
        name={data.name}
        image={data.images[0].url}
        uri={data.uri}
      />
      <TrackList data={data} />
    </Box>
  );
}
