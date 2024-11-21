import { Grid2, ListItemButton, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import dayjs from "dayjs";
import { convertMsToMinutes } from "../../utils/timeUtils";
import useResponsive from "../../hooks/useResponsive";
import TrackItem from "./TrackItem";
import { Track } from "../../types/Track";
import playerApi from "../../api/playerApi";

const Value = styled(Typography)(({ theme }) => ({
  textOverflow: "ellipsis",
  fontSize: 12,
  textWrap: "nowrap",
  color: "textSecondary",
  overflow: "hidden",
}));

const LinkValue = styled(Link)(({ theme }) => ({
  fontSize: 12,
  textWrap: "nowrap",
  color: "textSecondary",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",
}));

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
}: Props) {
  const { isUpDesktop: isDesktop, isMobile, isTablet } = useResponsive();

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
    <ListItemButton onClick={play}>
      <Grid2 container sx={{ width: "100%" }}>
        <Grid2 size={1}>
          <Value>{index}</Value>
        </Grid2>

        <Grid2 size={4}>
          <TrackItem
            name={musicItem.name}
            artists={musicItem.artists}
            image={musicItem.images && musicItem.images[0].url}
          />
        </Grid2>

        {isPlaylist && isTablet && (
          <Grid2 size={3}>
            <LinkValue
              to={`/albums/${musicItem.album.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              {musicItem.album.name}
            </LinkValue>
          </Grid2>
        )}

        {isPlaylist && isDesktop && (
          <Grid2 size={2}>
            <Value>
              {dayjs(new Date(musicItem.added_at)).format("MMM DD, YYYY")}
            </Value>
          </Grid2>
        )}

        {isMobile && (
          <Grid2 size={2}>
            <Value>
              <Value>{convertMsToMinutes(musicItem.duration_ms)}</Value>
            </Value>
          </Grid2>
        )}
      </Grid2>
    </ListItemButton>
  );
}
