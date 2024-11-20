import {
  PauseCircleFilled,
  PlayCircleFilled,
  SkipNextRounded,
  SkipPreviousRounded,
} from "@mui/icons-material";
import { Box, IconButton, Slider } from "@mui/material";

interface Props {
  playing: boolean;
  position: number;
  duration: number;
  toggle: VoidFunction;
  prevTrack: VoidFunction;
  nextTrack: VoidFunction;
  seek: (position: number) => void;
}
export default function PlayerControls({
  playing,
  position,
  duration,
  toggle,
  prevTrack,
  nextTrack,
  seek,
}: Props) {
  return (
    <Box alignContent="center">
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <IconButton style={{ padding: 0 }} onClick={prevTrack}>
          <SkipPreviousRounded fontSize="large" />
        </IconButton>
        <IconButton style={{ padding: 0 }} onClick={toggle}>
          {playing ? (
            <PauseCircleFilled fontSize="large" />
          ) : (
            <PlayCircleFilled fontSize="large" />
          )}
        </IconButton>
        <IconButton style={{ padding: 0 }} onClick={nextTrack}>
          <SkipNextRounded fontSize="large" />
        </IconButton>
      </Box>

      <Slider
        color="primary"
        size="small"
        sx={{ padding: 0 }}
        max={100}
        value={(position / duration) * 100}
        min={0}
        onChange={(_, value) => seek(value as number)}
      />
    </Box>
  );
}
