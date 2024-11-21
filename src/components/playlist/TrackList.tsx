import { Box } from "@mui/material";
import { AlbumOrPlaylist } from "../../types/AlbumOrPlaylist";
import TrackListItem from "./TrackListItem";
import TaskListHeader from "./TrackListHeaders";
import { useMemo } from "react";
import useResponsive from "../../hooks/useResponsive";

interface Props {
  data?: AlbumOrPlaylist;
}

export default function TrackList({ data }: Props) {
  if (!data) return;

  const { isUpDesktop: isDesktop, isTablet, isMobile } = useResponsive();
  const distribution = useMemo(() => {
    if (data.type === "album") {
      if (isMobile) {
        return "12px 1fr 64px";
      } else {
        return "12px 1fr";
      }
    } else {
      if (isDesktop) {
        return "12px 1fr 1fr 0.5fr 64px";
      } else if (isTablet) {
        return "12px 1fr 1fr 64px";
      } else if (isMobile) {
        return "12px 1fr 64px";
      } else {
        return "12px 1fr";
      }
    }
  }, [data, isDesktop, isTablet, isMobile]);

  return (
    <Box width="100%">
      <TaskListHeader
        isPlaylist={data.type === "playlist"}
        distribution={distribution}
      />
      {data.tracks.items.map((item, index) => (
        <TrackListItem
          key={index}
          index={index + 1}
          distribution={distribution}
          data={item}
          isPlaylist={data.type === "playlist"}
        />
      ))}
    </Box>
  );
}
