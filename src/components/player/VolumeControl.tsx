import { VolumeDown, VolumeMute, VolumeUp } from "@mui/icons-material";
import { Box, IconButton, Slider } from "@mui/material";

interface Props {
  volume: number;
  setVolume: (value: number) => void;
  toggleMute: () => void;
}
export default function VolumeControl({
  volume,
  setVolume,
  toggleMute,
}: Props) {
  const renderIcon = () => {
    if (volume > 0.8) {
      return <VolumeUp />;
    } else if (volume > 0) {
      return <VolumeDown />;
    } else {
      return <VolumeMute />;
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "130px",
        alignItems: "center",
        gap: 1,
      }}
    >
      <IconButton onClick={toggleMute}>{renderIcon()}</IconButton>
      <Slider
        size="small"
        min={0}
        value={volume}
        step={0.1}
        max={1}
        onChange={(_, value) => setVolume(value as number)}
      />
    </Box>
  );
}
