import { Box, styled, Typography } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";

const Title = styled(Typography)(() => ({
  fontSize: 12,
  fontWeight: 600,
}));

interface Props {
  isPlaylist: boolean;
  distribution: string;
}
export default function TaskListHeader({ isPlaylist, distribution }: Props) {
  const { isUpDesktop, isMobile, isTablet } = useResponsive();

  return (
    <Box
      padding={1}
      display="grid"
      gridTemplateColumns={distribution}
      gap={2}
      borderBottom="1px solid gray"
    >
      <Title>#</Title>
      <Title>Title</Title>

      {isPlaylist && isTablet && <Title>Album</Title>}
      {isPlaylist && isUpDesktop && <Title>Added At</Title>}

      {isMobile && <Title>Duration</Title>}
    </Box>
  );
}
