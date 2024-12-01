import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AlbumOrPlaylist } from "../../types/AlbumOrPlaylist";
import dayjs from "dayjs";
import { convertMsToMinutes } from "../../utils/timeUtils";
import playerApi from "../../api/playerApi";
import { useAppSelector } from "../../store/store";
import { Track } from "../../types/Track";
import { PlayArrow } from "@mui/icons-material";
import useResponsive from "../../hooks/useResponsive";

interface Props {
  data?: AlbumOrPlaylist;
}

export default function TrackList({ data }: Props) {
  if (!data) return;
  const deviceId = useAppSelector((state) => state.app.deviceId);
  const { isUpDesktop, isTablet } = useResponsive();

  const play = (uri: string) => {
    if (!deviceId) return;
    playerApi(deviceId).play("track", uri);
  };

  return (
    <Box width="100%">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              {isTablet && <TableCell align="left">Album</TableCell>}
              {isUpDesktop && <TableCell align="right">Added At</TableCell>}
              <TableCell align="right">Duration</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.tracks.items.map((row, index) => (
              // @ts-ignore
              <Row key={row.id} data={row} onPlay={play} index={index + 1} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function Row({
  data,
  onPlay,
  index,
}: {
  index: number;
  data: any;
  onPlay: (uri: string) => void;
}) {
  const currentTrack = useAppSelector((state) => state.player.currentTrack);
  const musicItem = {
    ...data,
    ...data.track,
  } as Track & { added_at: string };

  const selected = currentTrack === musicItem.uri;
  const { isUpDesktop, isTablet } = useResponsive();

  return (
    <TableRow
      onClick={() => onPlay(musicItem.uri)}
      key={musicItem.id}
      sx={{
        transition: "background-color 250ms",
        cursor: "pointer",
        borderRadius: 8,
        "th, td": { border: 0 },
        ":hover": { backgroundColor: "rgba(255,255,255,0.1)" },
        backgroundColor: selected ? "rgba(0,255,0,0.1)" : "transparent",
      }}
    >
      <TableCell component="th" scope="row" align="center">
        {!selected ? index : <PlayArrow />}
      </TableCell>
      <TableCell component="th" scope="row">
        {musicItem.name}
      </TableCell>

      {isTablet && (
        <TableCell component="th" scope="row">
          {musicItem.album.name}
        </TableCell>
      )}
      {isUpDesktop && (
        <TableCell align="right">
          {dayjs(new Date(musicItem.added_at)).format("MMM DD, YYYY")}
        </TableCell>
      )}
      <TableCell align="right">
        {convertMsToMinutes(musicItem.duration_ms)}
      </TableCell>
    </TableRow>
  );
}
