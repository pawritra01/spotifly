import { List, ListItemButton, Typography } from "@mui/material";
import { Track } from "../types/Track";
import { convertMsToMinutes } from "../utils/timeUtils";
import { api } from "../api/api";
import { useAppSelector } from "../store/store";

export default function TrackList({ items }: { items: Track[] }) {
  const deviceId = useAppSelector((state) => state.app.deviceId);

  const play = (uri: string) => {
    api(`/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({
        uris: [uri],
        position_ms: 0,
      }),
    });
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
