import { Avatar, Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { registerDevice } from "../../store/reducers/appReducer";
import VolumeControl from "../player/VolumeControl";
import DeviceSelector from "../player/DeviceSelector";
import PlayerControls from "../player/PlayerControls";
import useResponsive from "../../hooks/useResponsive";
import { Track } from "../../types/Track";

export default function BottomBar() {
  const dispatch = useAppDispatch();

  const [player, setPlayer] = useState(undefined);
  const [currentSong, setCurrentSong] = useState<Track>(undefined);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(1000);
  const [position, setPosition] = useState(500);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    let instance;
    window.onSpotifyWebPlaybackSDKReady = () => {
      instance = new window.Spotify.Player({
        name: "New Player",
        getOAuthToken: (cb) => {
          cb(access_token);
        },
        volume: 0.5,
      });

      setPlayer(instance);

      instance.addListener("ready", ({ device_id }) => {
        dispatch(registerDevice(device_id));
      });

      instance.addListener("player_state_changed", (state) => {
        if (!state) return;

        const {
          position,
          duration,
          track_window: { current_track },
          paused,
        } = state;

        setPlaying(!paused);
        setPosition(position);
        setDuration(duration);
        setCurrentSong(current_track);
      });

      instance.activateElement();

      instance.connect();
    };

    return () => {
      instance.removeListener("ready");
      instance.removeListener("not_ready");
      instance.disconnect();

      setPlayer(undefined);
    };
  }, []);

  const toggle = useCallback(() => {
    if (!player) return;

    player.togglePlay();
  }, [player]);

  const nextTrack = useCallback(() => {
    if (!player) return;

    player.nextTrack();
  }, [player]);

  const prevTrack = useCallback(() => {
    if (!player) return;

    player.previousTrack();
  }, [player]);

  const seek = useCallback(
    (value: number) => {
      if (!player) return;

      const newPosition = (value / 100) * duration;
      player.seek(newPosition).then(() => {
        setPosition(value);
      });
    },
    [player, duration, position]
  );

  const setPlayerVolume = useCallback(
    (value: number) => {
      if (!player) return;

      player.setVolume(value).then(() => {
        setVolume(value);
      });
    },
    [player, duration, position]
  );

  const toggleMute = useCallback(() => {
    if (!player) return;

    const newVolume = volume > 0 ? 0 : 0.5;
    player.setVolume(newVolume).then(() => {
      setVolume(newVolume);
    });
  }, [player, volume]);

  const { isMaxDesktop } = useResponsive();

  return (
    <Box
      position="absolute"
      sx={{
        background: "#272727",
        bottom: 0,
        left: 0,
        width: "100%",
        paddingY: 2,
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box flex="1" marginLeft={2}>
        {currentSong && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              gap: 2,
            }}
          >
            <Avatar src={currentSong.album.images[0].url} />
            <Box>
              <Typography
                variant="body2"
                fontWeight={600}
                color="textDisabled"
                noWrap
              >
                {currentSong.name}
              </Typography>
              <Box component="div" overflow="hidden">
                {currentSong.artists.map((artist) => (
                  <Typography
                    key={artist.name}
                    component="span"
                    fontSize={12}
                    color="textDisabled"
                  >
                    {artist.name}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Box
        flex="1.5"
        minWidth={isMaxDesktop ? "90%" : "auto"}
        order={isMaxDesktop ? "2" : "0"}
        paddingX={2}
      >
        <PlayerControls
          playing={playing}
          position={position}
          duration={duration}
          seek={seek}
          toggle={toggle}
          nextTrack={nextTrack}
          prevTrack={prevTrack}
        />
      </Box>

      <Box
        display="flex"
        gap={1}
        justifyContent="flex-end"
        flex="1"
        marginRight={2}
      >
        <DeviceSelector />
        <VolumeControl
          volume={volume}
          setVolume={setPlayerVolume}
          toggleMute={toggleMute}
        />
      </Box>
    </Box>
  );
}
