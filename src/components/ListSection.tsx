import { Box, Typography } from "@mui/material";
import { Album } from "../types/Album";
import { AlbumOrPlaylist } from "../types/AlbumOrPlaylist";
import { Artist } from "../types/Artist";
import ArtistCard from "./artist/ArtistCard";
import PlaylistAlbumCard from "./PlaylistAlbumCard";
import useResponsive from "../hooks/useResponsive";

interface Props {
  title?: string;
  items: Artist[] | AlbumOrPlaylist[] | Album[];
  type: "artist" | "album" | "playlist";
}
export default function ListSection({ items, type, title }: Props) {
  const { isUpDesktop: isDesktop, isTablet } = useResponsive();
  const renderCard = (data: Artist | AlbumOrPlaylist | Album) => {
    if (!data) return null;
    switch (type) {
      case "artist":
        return <ArtistCard artist={data as Artist} />;
      case "album":
        return (
          <PlaylistAlbumCard
            id={data.id}
            name={data.name}
            image={data.images[0]?.url}
            type="album"
          />
        );
      case "playlist":
        return (
          <PlaylistAlbumCard
            id={data.id}
            name={data.name}
            image={data.images[0]?.url}
            type="playlist"
          />
        );
      default:
        return null;
    }
  };

  const minWidth = isDesktop ? "200px" : isTablet ? "150px" : "100px";
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
          gap: 4,
          paddingBottom: "8px",
        }}
      >
        {items.map((item) => (
          <Box sx={{ minWidth }}>{renderCard(item)}</Box>
        ))}
      </Box>
    </Box>
  );
}
