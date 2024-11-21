import { Box, Typography } from "@mui/material";
import { Album } from "../types/Album";
import { AlbumOrPlaylist } from "../types/AlbumOrPlaylist";
import { Artist } from "../types/Artist";
import ItemCard from "./cards/ItemCard";

interface Props {
  title?: string;
  items: Artist[] | AlbumOrPlaylist[] | Album[];
  type: "artist" | "album" | "playlist";
}
export default function ListSection({ items, type, title }: Props) {
  return (
    <Box sx={{ marginY: 4 }}>
      {title && (
        <Typography variant="h6" sx={{ marginY: 2 }}>
          {title}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          overflow: "auto hidden",
          gap: 2,
          paddingBottom: "8px",
        }}
      >
        {/** Sometimes the array item returned by spotify is null */}
        {items.map((data) =>
          data ? (
            <ItemCard
              key={data.id}
              name={data.name}
              to={`/${type}s/${data.id}`}
              image={data.images[0]?.url}
              description=""
            />
          ) : null
        )}
      </Box>
    </Box>
  );
}
