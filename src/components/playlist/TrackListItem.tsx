import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AlbumTrackItem, PlaylistTrackItem } from "../../types/AlbumOrPlaylist";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { api } from "../../api/api";
import dayjs from "dayjs";
import { convertMsToMinutes } from "../../utils/timeUtils";
import { Fragment } from "react/jsx-runtime";
import useResponsive from "../../hooks/useResponsive";
import TrackItem from "./TrackItem";

interface Props {
  data: AlbumTrackItem | PlaylistTrackItem;
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
    ...(data as AlbumTrackItem),
    ...(data as PlaylistTrackItem).track,
  };

  const play = () => {
    api(`/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({
        uris: [musicItem.uri],
        position_ms: 0,
      }),
    });
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
