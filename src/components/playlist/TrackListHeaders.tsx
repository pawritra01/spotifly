import { Box, styled, Typography } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.secondary.dark,
  fontWeight: 600,
}));

interface Props {
  isPlaylist: boolean;
  distribution: string;
}
export default function TaskListHeader({ isPlaylist, distribution }: Props) {
  const { isUpDesktop: isDesktop, isMobile, isTablet } = useResponsive();

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
      {isPlaylist && isDesktop && <Title>Added At</Title>}

      {isMobile && <Title>Duration</Title>}
    </Box>
  );
}
