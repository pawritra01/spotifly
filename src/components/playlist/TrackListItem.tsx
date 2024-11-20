import { ListItemButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import dayjs from "dayjs";
import { convertMsToMinutes } from "../../utils/timeUtils";
import useResponsive from "../../hooks/useResponsive";
import TrackItem from "./TrackItem";
import { Track } from "../../types/Track";
import playerApi from "../../api/playerApi";

interface Props {
  data: any;
  isPlaylist: boolean;
  index: number;
  distribution: string;
}

export default function TrackListItem({
  index,
  data,
  isPlaylist = false,
  distribution,
}: Props) {
  const { isDesktop, isMobile, isTablet } = useResponsive();

  const deviceId = useAppSelector((state) => state.app.deviceId);

  const musicItem = {
    ...data,
    ...data.track,
  } as Track & { added_at: string };

  const play = () => {
    if (!deviceId) return;
    playerApi(deviceId).play("track", musicItem.uri);
  };

  return (
    <ListItemButton
      onClick={play}
      sx={{
        display: "grid",
        gridTemplateColumns: distribution,
        padding: 1,
        gap: 2,
      }}
    >
      <Typography fontSize={12} color="textSecondary">
        {index}
      </Typography>

      <TrackItem
        name={musicItem.name}
        artists={musicItem.artists}
        image={musicItem.images && musicItem.images[0].url}
      />

      {isPlaylist && isTablet && (
        <Typography
          to={`/albums/${musicItem.album.id}`}
          component={Link}
          onClick={(e) => e.stopPropagation()}
          fontSize={12}
          noWrap
          color="textSecondary"
        >
          {musicItem.album.name}
        </Typography>
      )}

      {isPlaylist && isDesktop && (
        <Typography
          textOverflow="ellipsis"
          fontSize={12}
          noWrap
          color="textSecondary"
        >
          {dayjs(new Date(musicItem.added_at)).format("MMM DD, YYYY")}
        </Typography>
      )}

      {isMobile && (
        <Typography fontSize={12} color="textSecondary">
          {convertMsToMinutes(musicItem.duration_ms)}
        </Typography>
      )}
    </ListItemButton>
  );
}
