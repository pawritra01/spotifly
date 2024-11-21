import { List, ListItemButton, Typography } from "@mui/material";
import { Track } from "../types/Track";
import { convertMsToMinutes } from "../utils/timeUtils";
import { useAppSelector } from "../store/store";
import playerApi from "../api/playerApi";

export default function TrackList({ items }: { items: Track[] }) {
  const deviceId = useAppSelector((state) => state.app.deviceId);

  const play = (uri: string) => {
    if(!deviceId) return;
    playerApi(deviceId).play('track', uri);
  };

  return (
    <List sx={{ maxWidth: "900px" }}>
      {items.map((item, index) => {
        return (
          <ListItemButton
            key={item.id}
            sx={{ gap: 2 }}
            onClick={() => play(item.uri)}
          >
            <Typography sx={{ width: "16px" }} fontSize={14}>
              {index + 1}
            </Typography>
            <Typography sx={{ flex: 1 }} noWrap>
              {item.name}
            </Typography>
            <Typography sx={{ flex: 1 }} noWrap>
              {item.album.name}
            </Typography>
            <Typography>{convertMsToMinutes(item.duration_ms)}</Typography>
          </ListItemButton>
        );
      })}
    </List>
  );
}
