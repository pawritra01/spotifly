import { Box, Typography } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";

interface Props {
  isPlaylist: boolean;
  distribution: string;
}
export default function TaskListHeader({ isPlaylist, distribution }: Props) {
  const { isDesktop, isMobile, isTablet } = useResponsive();

  return (
    <Box
      padding={1}
      display="grid"
      gridTemplateColumns={distribution}
      gap={2}
      borderBottom="1px solid gray"
    >
      <Typography fontSize={12} color="textDisabled" fontWeight={700}>
        #
      </Typography>

      <Typography fontSize={11} noWrap color="textSecondary" fontWeight={600}>
        Title
      </Typography>

      {isPlaylist && isTablet && (
        <Typography fontSize={12} noWrap color="textSecondary" fontWeight={600}>
          Album
        </Typography>
      )}
      {isPlaylist && isDesktop && (
        <Typography
          textOverflow="ellipsis"
          fontSize={12}
          noWrap
          fontWeight={600}
          color="textSecondary"
        >
          Added At
        </Typography>
      )}

      {isMobile && (
        <Typography fontSize={12} color="textSecondary" fontWeight={600}>
          Duration
        </Typography>
      )}
    </Box>
  );
}
