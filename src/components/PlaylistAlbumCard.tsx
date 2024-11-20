import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  image: string;
  name: string;
  type: "album" | "playlist";
}
export default function PlaylistAlbumCard({ id, image, name, type }: Props) {
  return (
    <Box sx={{ flex: 1 }} component={Link} to={`/${type}s/${id}`}>
      <img
        src={image}
        style={{
          objectFit: "contain",
          width: "100%",
          aspectRatio: "1",
          borderRadius: 8,
        }}
      />
      <Typography
        variant="body2"
        fontSize={12}
        sx={{
          marginTop: 0.5,
          lineHeight: "1.3em",
          height: "2.6em",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        color="textSecondary"
      >
        {name}
      </Typography>
    </Box>
  );
}
