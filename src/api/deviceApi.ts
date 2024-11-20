import { api } from "./api";

export default function deviceApi() {
  return {
    getDevices: () => api("/me/player/devices"),
    transferDevice: (deviceId: string) =>
      api("/me/player", {
        method: "PUT",
        body: JSON.stringify({
          device_ids: [deviceId],
        }),
      }),
  };
}
