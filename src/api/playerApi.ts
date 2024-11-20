import { api } from "./api";

export default function playerApi(deviceId: string) {
  return {
    play: (type: "album" | "playlist" | "track", uri: string) =>
      api("/me/player/play?device_id=" + deviceId, {
        method: "PUT",
        body: JSON.stringify(
          type === "track"
            ? {
                uris: [uri],
                position_ms: 0,
              }
            : {
                context_uri: uri,
                offset: {
                  position: 0,
                },
                position_ms: 0,
              }
        ),
      }),
  };
}
