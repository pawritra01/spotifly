import { PlayCircleFilled } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useAppSelector } from "../../store/store";
import { api } from "../../api/api";

interface Props {
  name: string;
  author: string;
  image: string;
  uri: string;
}
export default function PageHeader({ name, image, uri, author }: Props) {
  const deviceId = useAppSelector((state) => state.app.deviceId);

  const play = () => {
    api(`/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({
        context_uri: uri,
        position_ms: 0,
      }),
    });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
        <Avatar
          src={image}
          variant="rounded"
          sx={{ height: "186px", width: "186px" }}
        />
        <Box>
          <Typography variant="h3" fontWeight={700}>
            {name}
          </Typography>
          <Box display="flex">
            <Typography variant="subtitle2" fontWeight={700}>
              {author}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ marginY: 2 }}>
        <IconButton onClick={play}>
          <PlayCircleFilled sx={{ fontSize: 64, color: "greenyellow" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
