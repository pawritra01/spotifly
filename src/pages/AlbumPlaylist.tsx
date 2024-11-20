import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { Box } from "@mui/material";
import { AlbumOrPlaylist } from "../types/AlbumOrPlaylist";
import TrackList from "../components/playlist/TrackList";
import FullPageLoader from "../components/FullPageLoader";
import PageHeader from "../components/layout/PageHeader";

export default function AlbumPlaylist() {
  const [data, setData] = useState<AlbumOrPlaylist>();
  const params = useParams();

  if (!params.id || !params.type) return;

  const getData = useCallback(() => {
    api(`/${params.type}/${params.id}`).then((data) => {
      setData(data);
    });
  }, [params]);

  useEffect(() => {
    getData();
  }, [getData]);

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
