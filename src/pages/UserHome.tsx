import { Avatar, Box, Typography } from "@mui/material";
import { useAppSelector } from "../store/store";
import { Link } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";

export default function UserHome() {
  const playlists = useAppSelector((state) => state.user.playlists);

  return (
    <Box sx={{ marginY: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {playlists.items.slice(0, 8).map((item) => (
          <RecentPlaylistCard
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.images[item.images.length - 1].url}
          />
        ))}
      </Box>
    </Box>
  );
}

interface Props {
  id: string;
  image: string;
  name: string;
}
function RecentPlaylistCard({ image, name, id }: Props) {
  const { isUpDesktop: isDesktop } = useResponsive();

  return (
    <Box
      to={`/playlists/${id}`}
      component={Link}
      sx={{
        padding: 1,
        backgroundColor: "#3D3D3D",
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        width: isDesktop ? "calc(25% - 24px)" : "calc(50% - 24px)",
        borderRadius: 1,
      }}
    >
      <Avatar
        src={image}
        variant="rounded"
        style={{ objectFit: "contain", aspectRatio: "1" }}
      />
      <Typography
        variant="subtitle2"
        sx={{
          whiteSpace: "noWrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}
