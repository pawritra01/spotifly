import { Box, Typography } from "@mui/material";
import { Artist } from "../../types/Artist";
import { Link } from "react-router-dom";

export default function ArtistCard({ artist }: { artist: Artist }) {
  console.log(artist);
  return (
    <Box
      component={Link}
      to={`/artists/${artist.id}`}
      sx={{ background: "black" }}
    >
      <img
        src={artist?.images[0]?.url}
        style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: "100%" }}
      />
      <Typography variant="subtitle2">{artist.name}</Typography>
      <Typography variant="caption" color="textSecondary">
        Artist
      </Typography>
    </Box>
  );
}
